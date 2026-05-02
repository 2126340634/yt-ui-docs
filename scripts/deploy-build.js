import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const ROOT = path.resolve('.')
const DEPLOY_DIR = path.resolve('deploy')
const DOCS_DIST = path.resolve('docs/.vuepress/dist')
const LLM_WIKI = path.resolve('LLM-WIKI')
const MCP_SERVER = path.resolve('mcp-server')
const COMPONENTS_JSON = path.resolve('scripts/output/components.json')

// mcp-server 中需要排除的目录/文件
const MCP_EXCLUDE = new Set(['node_modules', 'src', 'tsconfig.json', 'README.md'])

function clean(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
  fs.mkdirSync(dir, { recursive: true })
}

function copyDirSync(src, dest, exclude) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (exclude && exclude.has(entry.name)) continue
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// ── Step 1: docs:build ──────────────────────────────────────────────

console.log('Step 1/3: Building docs site...')
execSync('npm run docs:build', { cwd: ROOT, stdio: 'inherit' })

if (!fs.existsSync(DOCS_DIST)) {
  console.error(`Build output not found: ${DOCS_DIST}`)
  process.exit(1)
}

// ── Step 2: sync (extract + generate-llms) ──────────────────────────

console.log('\nStep 2/3: Syncing component data...')
execSync('npm run sync', { cwd: ROOT, stdio: 'inherit' })

// ── Step 3: Assemble deploy/ ────────────────────────────────────────

console.log('\nStep 3/3: Assembling deploy/ ...')

clean(DEPLOY_DIR)

const deployDocs = path.join(DEPLOY_DIR, 'docs')
const deployMcp = path.join(DEPLOY_DIR, 'mcp-server')

// 3a. VuePress dist → deploy/docs/
copyDirSync(DOCS_DIST, deployDocs)
console.log(`  docs site        → ${deployDocs}`)

// 3b. LLM-WIKI/* (excluding LLM-WIKI-README.md) → deploy/docs/
for (const entry of fs.readdirSync(LLM_WIKI, { withFileTypes: true })) {
  if (entry.name === 'LLM-WIKI-README.md') continue
  const src = path.join(LLM_WIKI, entry.name)
  const dest = path.join(deployDocs, entry.name)
  if (entry.isDirectory()) {
    copyDirSync(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}
console.log(`  LLM-WIKI/*       → ${deployDocs}`)

// 3c. mcp-server/* (excluding node_modules, src, etc.) → deploy/mcp-server/
copyDirSync(MCP_SERVER, deployMcp, MCP_EXCLUDE)
console.log(`  mcp-server/*     → ${deployMcp}`)

// 3d. 用最新的 components.json 覆盖 deploy/mcp-server/dist/
fs.copyFileSync(COMPONENTS_JSON, path.join(deployMcp, 'dist', 'components.json'))
console.log(`  components.json  → ${path.join(deployMcp, 'dist')}`)

// ── Summary ─────────────────────────────────────────────────────────

function countFiles(dir) {
  let count = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name))
    } else {
      count++
    }
  }
  return count
}

const totalFiles = countFiles(DEPLOY_DIR)
console.log(`\nDone! ${totalFiles} files in deploy/`)
console.log(`
deploy/
├── docs/                    → rm -rf + scp to /www/server/nginx/html/yt-ui/docs/
└── mcp-server/              → scp to /www/server/nginx/html/yt-ui/mcp-server/
    ├── package.json           (服务器上 npm install --omit=dev)
    ├── package-lock.json
    └── dist/
        ├── index.js
        └── components.json    (MCP 自动热加载)
`)
