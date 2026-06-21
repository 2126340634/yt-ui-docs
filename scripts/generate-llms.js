/**
 * @fileoverview LLM 文档生成脚本 - 为 AI 生成优化的组件参考文档
 *
 * 该脚本读取 components.json，生成两个 LLM 友好的文档：
 * - llms.txt: 组件库概览和组件清单（精简版）
 * - llms-full.txt: 完整的组件参考文档，包含所有 Props、Events、Slots 等
 *
 * 同时将组件 .md 文件复制到 LLM-WIKI/components/ 目录
 *
 * 生成的文档可供 AI 助手（如 Claude、ChatGPT）理解组件库的使用方法
 *
 * @usage
 * ```bash
 * pnpm run generate-llms
 * # 或
 * node scripts/generate-llms.js
 * ```
 */

import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://zjyt.cqytxy.edu.cn/yt-ui/docs'
const INPUT_FILE = path.resolve('scripts/output/components.json')
const CONFIG_FILE = path.resolve('docs/.vuepress/config.js')
const MD_SOURCE_DIR = path.resolve('docs/components')
const OUTPUT_DIR = path.resolve('LLM-WIKI')
const MD_OUTPUT_DIR = path.join(OUTPUT_DIR, 'components')
const LLMS_TXT = path.join(OUTPUT_DIR, 'llms.txt')
const LLMS_FULL_TXT = path.join(OUTPUT_DIR, 'llms-full.txt')

// ── 从 VuePress config.js 自动解析分类 ────────────────────

function parseCategories() {
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8')

  // 定位 '/components/' 侧边栏区域
  const sidebarMatch = content.match(/'\/components\/'\s*:\s*\[/)
  if (!sidebarMatch) {
    console.error('Failed to locate /components/ sidebar in config.js')
    process.exit(1)
  }

  const start = sidebarMatch.index + sidebarMatch[0].length
  // 找到对应的闭合 ]（跳过嵌套的 []）
  let depth = 1
  let end = start
  while (depth > 0 && end < content.length) {
    if (content[end] === '[') depth++
    else if (content[end] === ']') depth--
    end++
  }
  const sidebarBlock = content.slice(start, end - 1)

  // 解析每个分类
  const categories = []
  const catRegex = /text:\s*['"](.+?)['"],\s*children:\s*\[/g
  let catMatch
  while ((catMatch = catRegex.exec(sidebarBlock)) !== null) {
    const name = catMatch[1]
    const childrenStart = catMatch.index + catMatch[0].length
    // 找 children 数组的闭合 ]
    let d = 1, i = childrenStart
    while (d > 0 && i < sidebarBlock.length) {
      if (sidebarBlock[i] === '[') d++
      else if (sidebarBlock[i] === ']') d--
      i++
    }
    const childrenBlock = sidebarBlock.slice(childrenStart, i - 1)

    // 提取 link 中的文件名
    const files = []
    const linkRegex = /link:\s*['"].+?\/([^/']+\.md)['"]/g
    let linkMatch
    while ((linkMatch = linkRegex.exec(childrenBlock)) !== null) {
      files.push(linkMatch[1])
    }

    categories.push({ name, files })
  }

  return categories
}

const CATEGORIES = parseCategories()

// ── 辅助函数 ──────────────────────────────────────────────────────────

/** 构建组件索引映射：fileName → component */
function buildLookup(components) {
  const map = new Map()
  for (const c of components) map.set(c.fileName, c)
  return map
}

/** 从组件数据中提取简短的一行描述。 */
function shortDesc(component) {
  if (component.description) return component.description
  // 兜底：取第一个属性的描述，否则返回空字符串
  if (component.props.length > 0) return component.props[0].description
  return ''
}

/** 转义表格单元格内容中的管道符。 */
function escapeCell(s) {
  return s.replace(/\|/g, '\\|')
}

/** 将 props 表格格式化为 Markdown。 */
function formatPropsTable(props) {
  if (props.length === 0) return ''
  const lines = [
    '| 属性 | 类型 | 默认值 | 说明 |',
    '| --- | --- | --- | --- |',
  ]
  for (const p of props) {
    lines.push(`| ${escapeCell(p.name)} | ${escapeCell(p.type)} | ${escapeCell(p.default)} | ${escapeCell(p.description)} |`)
  }
  return lines.join('\n')
}

/** 将 events 表格格式化为 Markdown。 */
function formatEventsTable(events) {
  if (events.length === 0) return ''
  const lines = [
    '| 事件 | 参数 | 说明 |',
    '| --- | --- | --- |',
  ]
  for (const e of events) {
    lines.push(`| ${escapeCell(e.name)} | ${escapeCell(e.params)} | ${escapeCell(e.description)} |`)
  }
  return lines.join('\n')
}

/** 将 slots 表格格式化为 Markdown。 */
function formatSlotsTable(slots) {
  if (slots.length === 0) return ''
  const lines = [
    '| 插槽 | 作用域 | 说明 |',
    '| --- | --- | --- |',
  ]
  for (const s of slots) {
    lines.push(`| ${escapeCell(s.name)} | ${escapeCell(s.scope)} | ${escapeCell(s.description)} |`)
  }
  return lines.join('\n')
}

/** 将 methods 表格格式化为 Markdown。 */
function formatMethodsTable(methods) {
  if (methods.length === 0) return ''
  const lines = [
    '| 方法 | 说明 |',
    '| --- | --- |',
  ]
  for (const m of methods) {
    lines.push(`| ${escapeCell(m.name)} | ${escapeCell(m.description)} |`)
  }
  return lines.join('\n')
}

/** 格式化代码示例。 */
function formatExamples(examples) {
  if (examples.length === 0) return ''
  return examples.map((code) => '```vue\n' + code + '\n```').join('\n\n')
}

// ── 生成 llms.txt ───────────────────────────────────────────────

function generateLlmsTxt(components, lookup) {
  const lines = []

  lines.push(`# Yt-UI`)
  lines.push('')
  lines.push('Yt-UI 是一个轻量级 Uni-app 组件库，专为指尖移通 5.0 微信小程序打造，基于 Vue 3 Composition API + TypeScript 开发。')
  lines.push('')

  // 安装说明
  lines.push('## 安装')
  lines.push('')
  lines.push('```bash')
  lines.push('npm install @rao2126340634/yt-ui')
  lines.push('# 或')
  lines.push('pnpm add @rao2126340634/yt-ui')
  lines.push('```')
  lines.push('')

  // 使用约定说明
  lines.push('## 使用约定')
  lines.push('')
  lines.push('- 所有组件以 `yt-` 为前缀')
  lines.push('- 支持 uni-app 的 easycom 模式，配置后无需手动 import')
  lines.push('- 基于 Vue 3 `<script setup>` + TypeScript')
  lines.push('- 支持微信小程序等小程序平台')
  lines.push('')
  lines.push('easycom 配置：')
  lines.push('```json')
  lines.push('{')
  lines.push('  "easycom": {')
  lines.push('    "autoscan": true,')
  lines.push('    "custom": {')
  lines.push('      "^yt-(.*)": "@rao2126340634/yt-ui/src/components/yt-$1/yt-$1.vue"')
  lines.push('    }')
  lines.push('  }')
  lines.push('}')
  lines.push('```')
  lines.push('')

  // 组件清单
  lines.push('## 组件列表')
  lines.push('')

  for (const cat of CATEGORIES) {
    lines.push(`### ${cat.name}`)
    lines.push('')
    for (const fileName of cat.files) {
      const c = lookup.get(fileName)
      if (!c) continue
      const url = `${BASE_URL}/components/${fileName}`
      const desc = shortDesc(c)
      const shortName = c.name.split(' ')[0]
      const display = desc ? `${shortName} - ${desc}` : shortName
      lines.push(`- [${c.name}](${url}) - ${display}`)
    }
    lines.push('')
  }

  // 更多信息
  lines.push('## 更多')
  lines.push('')
  lines.push(`- 完整文档: ${BASE_URL}`)
  lines.push(`- 完整 AI 参考: ${BASE_URL}/llms-full.txt`)
  lines.push('')

  return lines.join('\n')
}

// ── 生成 llms-full.txt ──────────────────────────────────────────

function generateLlmsFullTxt(components, lookup) {
  const lines = []

  lines.push('# Yt-UI 完整组件参考')
  lines.push('')
  lines.push('Yt-UI 是一个轻量级 Uni-app 组件库，专为指尖移通 5.0 微信小程序打造。')
  lines.push('所有组件以 `yt-` 为前缀，支持 easycom 自动引入，基于 Vue 3 + TypeScript。')
  lines.push('')
  lines.push('---')
  lines.push('')

  for (const cat of CATEGORIES) {
    lines.push(`# ${cat.name}`)
    lines.push('')

    for (const fileName of cat.files) {
      const c = lookup.get(fileName)
      if (!c) continue

      lines.push(`## ${c.name}`)
      lines.push('')

      if (c.description) {
        lines.push(`描述：${c.description}`)
        lines.push('')
      }

      const docUrl = `${BASE_URL}/components/${fileName}`
      lines.push(`文档：${docUrl}`)
      lines.push('')

      // 属性（Props）
      if (c.props.length > 0) {
        lines.push('### Props')
        lines.push('')
        lines.push(formatPropsTable(c.props))
        lines.push('')
      }

      // 事件（Events）
      if (c.events.length > 0) {
        lines.push('### Events')
        lines.push('')
        lines.push(formatEventsTable(c.events))
        lines.push('')
      }

      // 插槽（Slots）
      if (c.slots.length > 0) {
        lines.push('### Slots')
        lines.push('')
        lines.push(formatSlotsTable(c.slots))
        lines.push('')
      }

      // 方法（Methods）
      if (c.methods.length > 0) {
        lines.push('### Methods')
        lines.push('')
        lines.push(formatMethodsTable(c.methods))
        lines.push('')
      }

      // 示例（仅取前 3 个，控制文件体积）
      if (c.examples.length > 0) {
        lines.push('### 示例')
        lines.push('')
        const examplesToShow = c.examples.slice(0, 3)
        lines.push(formatExamples(examplesToShow))
        if (c.examples.length > 3) {
          lines.push('')
          lines.push(`> 更多示例请参考完整文档`)
        }
        lines.push('')
      }

      lines.push('---')
      lines.push('')
    }
  }

  return lines.join('\n')
}

// ── 复制组件 .md 文件到 LLM-WIKI/components/ ────────────────────

function copyComponentMdFiles() {
  fs.mkdirSync(MD_OUTPUT_DIR, { recursive: true })
  const files = fs.readdirSync(MD_SOURCE_DIR).filter((f) => f.endsWith('.md'))
  for (const file of files) {
    fs.copyFileSync(path.join(MD_SOURCE_DIR, file), path.join(MD_OUTPUT_DIR, file))
  }
  return files.length
}

// ── 主流程 ─────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Input not found: ${INPUT_FILE}\nRun extract-components.js first.`)
    process.exit(1)
  }

  const components = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'))
  const lookup = buildLookup(components)

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // 生成 llms.txt
  const llmsTxt = generateLlmsTxt(components, lookup)
  fs.writeFileSync(LLMS_TXT, llmsTxt, 'utf-8')

  // 生成 llms-full.txt
  const llmsFullTxt = generateLlmsFullTxt(components, lookup)
  fs.writeFileSync(LLMS_FULL_TXT, llmsFullTxt, 'utf-8')

  // 复制组件 .md 文件
  const mdCount = copyComponentMdFiles()

  // 输出统计信息
  const llmsSize = fs.statSync(LLMS_TXT).size
  const llmsFullSize = fs.statSync(LLMS_FULL_TXT).size
  console.log(`Generated:`)
  console.log(`  ${LLMS_TXT}  (${(llmsSize / 1024).toFixed(1)} KB, ${llmsTxt.split('\n').length} lines)`)
  console.log(`  ${LLMS_FULL_TXT}  (${(llmsFullSize / 1024).toFixed(1)} KB, ${llmsFullTxt.split('\n').length} lines)`)
  console.log(`  ${MD_OUTPUT_DIR}/  (${mdCount} component .md files copied)`)
  console.log(`\nBase URL: ${BASE_URL}`)
}

main()
