import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const COMPONENTS_DIR = path.resolve('docs/components')
const OUTPUT_DIR = path.resolve('scripts/output')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'components.json')

// ── 辅助函数 ──────────────────────────────────────────────────────────

/**
 * 按 `|` 分割 Markdown 表格行，同时忽略反引号包裹内容中的 `|`。
 * 例如反引号中的 `ThemeColor | 'none'` 不会被误分割。
 */
function splitTableRow(line) {
  const cells = []
  let current = ''
  let inBacktick = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '`') {
      inBacktick = !inBacktick
      current += ch
    } else if (ch === '|' && !inBacktick) {
      cells.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  cells.push(current.trim())
  // 去掉由首尾外层管道符产生的空单元格
  if (cells.length > 0 && cells[0] === '') cells.shift()
  if (cells.length > 0 && cells[cells.length - 1] === '') cells.pop()
  // 还原 Markdown 中转义的管道符
  return cells.map(c => c.replace(/\\\|/g, '|'))
}

/** 将 Markdown 表格解析为以表头为键的对象数组。 */
function parseMarkdownTable(tableText) {
  const lines = tableText
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)

  if (lines.length < 2) return []

  const headers = splitTableRow(lines[0])

  const rows = []
  for (let i = 2; i < lines.length; i++) {
    const cells = splitTableRow(lines[i])
    if (cells.length === 0) continue
    const obj = {}
    headers.forEach((h, idx) => {
      obj[h] = cells[idx] || ''
    })
    rows.push(obj)
  }
  return rows
}

/** 将原始 props 行标准化为 { name, type, default, description }。 */
function normaliseProp(row) {
  const keys = Object.keys(row)
  return {
    name: stripCode(row[keys[0]] || ''),
    type: stripCode(row[keys[1]] || ''),
    default: stripCode(row[keys[2]] || ''),
    description: stripMarkdownLink(stripCode(row[keys[3]] || ''))
  }
}

/** 将原始 events 行标准化为 { name, params, description }。 */
function normaliseEvent(row) {
  const keys = Object.keys(row)
  return {
    name: stripCode(row[keys[0]] || ''),
    params: stripCode(row[keys[1]] || ''),
    description: stripCode(row[keys[2]] || '')
  }
}

/** 将原始 slots 行标准化为 { name, scope, description }。 */
function normaliseSlot(row) {
  const keys = Object.keys(row)
  return {
    name: stripCode(row[keys[0]] || ''),
    scope: stripCode(row[keys[1]] || ''),
    description: stripCode(row[keys[2]] || '')
  }
}

/** 去掉单元格外围的反引号代码标记。 */
function stripCode(s) {
  return s.replace(/^`(.+?)`$/, '$1').trim()
}

/** 将 `[text](url)` 转换为纯文本 `text`。 */
function stripMarkdownLink(s) {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

// ── 主流程 ─────────────────────────────────────────────────────────────

function extractComponents() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error(`Components directory not found: ${COMPONENTS_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.md'))

  const components = []

  for (const file of files) {
    const filePath = path.join(COMPONENTS_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(raw)

    // 统一换行符 CRLF → LF，保证正则匹配一致
    const text = content.replace(/\r\n/g, '\n')

    // ── 组件名称 ────────────────────────────────────────────
    const titleMatch = text.match(/^#\s+(.+)$/m)
    const componentName = titleMatch ? titleMatch[1].trim() : file.replace(/\.md$/, '')

    // ── 组件描述（标题后第一个非空段落） ───
    const afterTitle = text.replace(/^#\s+.+$/m, '').trim()
    const paragraphs = afterTitle.split(/\n{2,}/)
    let description = ''
    for (const p of paragraphs) {
      const trimmed = p.trim()
      if (
        trimmed &&
        !trimmed.startsWith('|') &&
        !trimmed.startsWith('##') &&
        !trimmed.startsWith('```') &&
        !trimmed.startsWith('<') &&
        !trimmed.startsWith('interface ') &&
        !trimmed.startsWith('type ') &&
        !trimmed.startsWith('const ') &&
        !trimmed.startsWith('function ') &&
        !trimmed.startsWith('async ') &&
        !trimmed.startsWith('onMounted') &&
        !trimmed.includes('=>') &&
        !trimmed.includes('{{') &&
        !trimmed.includes('.value')
      ) {
        description = trimmed.replace(/\n/g, ' ')
        break
      }
    }

    // ── 按 H2 标题拆分章节 ────────────────────────────────────
    const sections = {}
    const sectionRegex = /^##\s+(.+)$/gm
    const sectionStarts = []
    let m
    while ((m = sectionRegex.exec(text)) !== null) {
      sectionStarts.push({ title: m[1].trim(), index: m.index })
    }
    for (let i = 0; i < sectionStarts.length; i++) {
      const start = sectionStarts[i].index
      const end = i + 1 < sectionStarts.length ? sectionStarts[i + 1].index : text.length
      sections[sectionStarts[i].title] = text.slice(start, end)
    }

    // ── 属性（props） ─────────────────────────────────────────────────────
    let props = []
    const propsSection = sections['属性'] || sections['Props'] || ''
    if (propsSection) {
      const tableMatch = propsSection.match(/\|[^\n]+\|[^\n]+\|[^\n]+\|[^\n]+\|[\s\S]*?(?=\n##|\n```|\n$)/)
      if (tableMatch) {
        props = parseMarkdownTable(tableMatch[0]).map(normaliseProp)
      }
    }

    // ── 事件（events） ────────────────────────────────────────────────────
    let events = []
    const eventsSection = sections['事件'] || sections['Events'] || ''
    if (eventsSection) {
      const tableMatch = eventsSection.match(/\|[^\n]+\|[^\n]+\|[^\n]+\|[\s\S]*?(?=\n##|\n```|\n$)/)
      if (tableMatch) {
        events = parseMarkdownTable(tableMatch[0]).map(normaliseEvent)
      }
    }

    // ── 插槽（slots） ─────────────────────────────────────────────────────
    let slots = []
    const slotsSection = sections['插槽'] || sections['Slots'] || ''
    if (slotsSection) {
      const tableMatch = slotsSection.match(/\|[^\n]+\|[^\n]+\|[^\n]+\|[\s\S]*?(?=\n##|\n```|\n$)/)
      if (tableMatch) {
        slots = parseMarkdownTable(tableMatch[0]).map(normaliseSlot)
      }
    }

    // ── 方法（methods） ───────────────────────────────────────────────────
    let methods = []
    const methodsSection = sections['方法'] || sections['Methods'] || ''
    if (methodsSection) {
      const tableMatch = methodsSection.match(/\|[^\n]+\|[^\n]+\|[\s\S]*?(?=\n##|\n```|\n$)/)
      if (tableMatch) {
        methods = parseMarkdownTable(tableMatch[0]).map(row => {
          const keys = Object.keys(row)
          return {
            name: stripCode(row[keys[0]] || ''),
            description: stripCode(row[keys[1]] || '')
          }
        })
      }
    }

    // ── 代码示例 ─────────────────────────────────────────────
    const examples = []
    const codeBlockRegex = /```(?:vue|html|typescript)\n([\s\S]*?)```/g
    let codeMatch
    while ((codeMatch = codeBlockRegex.exec(text)) !== null) {
      examples.push(codeMatch[1].trim())
    }

    // ── 组装组件条目 ─────────────────────────────────────────
    components.push({
      name: componentName,
      fileName: file,
      filePath: `docs/components/${file}`,
      frontmatter,
      description,
      props,
      events,
      slots,
      methods,
      examples
    })
  }

  // ── 写入输出文件 ────────────────────────────────────────────────
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(components, null, 2), 'utf-8')

  console.log(`Extracted ${components.length} components → ${OUTPUT_FILE}`)
}

extractComponents()
