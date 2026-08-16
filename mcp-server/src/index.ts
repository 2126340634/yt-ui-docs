import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { z } from 'zod'
import { readFileSync, watch } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer, ServerResponse } from 'node:http'
import { randomUUID } from 'node:crypto'

// ── types ────────────────────────────────────────────────────────────

interface Prop {
  name: string
  type: string
  default: string
  description: string
}

interface Event {
  name: string
  params: string
  description: string
}

interface Slot {
  name: string
  scope: string
  description: string
}

interface Method {
  name: string
  description: string
}

interface Component {
  name: string
  fileName: string
  filePath: string
  frontmatter: Record<string, unknown>
  description: string
  props: Prop[]
  events: Event[]
  slots: Slot[]
  methods: Method[]
  examples: string[]
}

// ── load data (with hot-reload) ──────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = resolve(__dirname, './components.json')

let components: Component[] = []
let nameIndex = new Map<string, Component>()

function loadAndIndex() {
  const raw = readFileSync(DATA_PATH, 'utf-8')
  components = JSON.parse(raw) as Component[]
  nameIndex = new Map()
  for (const c of components) {
    nameIndex.set(normalizeName(c.name), c)
    nameIndex.set(c.fileName.replace(/\.md$/, '').toLowerCase(), c)
  }
  console.error(`[hot-reload] Loaded ${components.length} components`)
}

loadAndIndex()

// watch for changes
watch(DATA_PATH, () => {
  try {
    loadAndIndex()
  } catch (e) {
    console.error('[hot-reload] Failed to reload:', e)
  }
})

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^yt-?/, '')
    .replace(/[\s\-_]/g, '')
}

function findComponent(name: string): Component | undefined {
  const key = normalizeName(name)
  if (nameIndex.has(key)) return nameIndex.get(key)
  for (const [k, v] of nameIndex) {
    if (k.includes(key) || key.includes(k)) return v
  }
  return undefined
}

// ── format helpers ───────────────────────────────────────────────────

function formatProps(props: Prop[]): string {
  if (props.length === 0) return '（无）'
  const lines: string[] = ['| 属性 | 类型 | 默认值 | 说明 |', '| --- | --- | --- | --- |']
  for (const p of props) {
    lines.push(`| ${p.name} | ${p.type} | ${p.default} | ${p.description} |`)
  }
  return lines.join('\n')
}

function formatEvents(events: Event[]): string {
  if (events.length === 0) return '（无）'
  const lines: string[] = ['| 事件 | 参数 | 说明 |', '| --- | --- | --- |']
  for (const e of events) {
    lines.push(`| ${e.name} | ${e.params} | ${e.description} |`)
  }
  return lines.join('\n')
}

function formatSlots(slots: Slot[]): string {
  if (slots.length === 0) return '（无）'
  const lines: string[] = ['| 插槽 | 作用域 | 说明 |', '| --- | --- | --- |']
  for (const s of slots) {
    lines.push(`| ${s.name} | ${s.scope} | ${s.description} |`)
  }
  return lines.join('\n')
}

function formatMethods(methods: Method[]): string {
  if (methods.length === 0) return '（无）'
  const lines: string[] = ['| 方法 | 说明 |', '| --- | --- |']
  for (const m of methods) {
    lines.push(`| ${m.name} | ${m.description} |`)
  }
  return lines.join('\n')
}

function formatComponentFull(c: Component): string {
  const sections: string[] = [
    `# ${c.name}`,
    '',
    c.description ? `描述：${c.description}` : '',
    `文件：${c.filePath}`,
    '',
    '## Props',
    '',
    formatProps(c.props),
    '',
    '## Events',
    '',
    formatEvents(c.events),
    '',
    '## Slots',
    '',
    formatSlots(c.slots),
    '',
    '## Methods',
    '',
    formatMethods(c.methods)
  ]

  if (c.examples.length > 0) {
    sections.push('', '## 代码示例', '')
    for (let i = 0; i < c.examples.length; i++) {
      sections.push(`### 示例 ${i + 1}`, '', '```vue', c.examples[i], '```', '')
    }
  }

  return sections.filter(Boolean).join('\n')
}

// ── create MCP server (shared logic) ────────────────────────────────

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'yt-ui-mcp-server',
    version: '1.0.0'
  })

  // tool 1: list_components
  server.tool('list_components', '列出所有可用的 Yt-UI 组件名称和简介', {}, async () => {
    const lines = components.map(c => `- **${c.name.split(' ')[0]}**：${c.description || c.props[0]?.description || '暂无描述'}`)
    return {
      content: [
        {
          type: 'text' as const,
          text: `共 ${components.length} 个组件：\n\n${lines.join('\n')}`
        }
      ]
    }
  })

  // tool 2: get_component
  server.tool(
    'get_component',
    '获取指定组件的完整文档，包括 Props、Events、Slots、Methods 和代码示例',
    {
      name: z.string().describe('组件名称，如 yt-button、button、Button 均可')
    },
    async ({ name }) => {
      const c = findComponent(name)
      if (!c) {
        const available = components.map(x => x.name.split(' ')[0]).join('、')
        return {
          content: [
            {
              type: 'text' as const,
              text: `未找到组件「${name}」。可用组件：${available}`
            }
          ]
        }
      }
      return {
        content: [{ type: 'text' as const, text: formatComponentFull(c) }]
      }
    }
  )

  // tool 3: search_component
  server.tool(
    'search_component',
    '按关键词搜索组件，匹配组件名、描述、Props 名称。返回最多 5 个结果。',
    {
      query: z.string().describe('搜索关键词，如 theme、disabled、弹窗')
    },
    async ({ query }) => {
      const q = query.toLowerCase()
      const results: {
        score: number
        component: Component
        matchReason: string
      }[] = []

      for (const c of components) {
        let score = 0
        let reason = ''

        if (c.name.toLowerCase().includes(q)) {
          score += 10
          reason = '组件名匹配'
        }

        if (c.description && c.description.toLowerCase().includes(q)) {
          score += 5
          if (!reason) reason = '描述匹配'
        }

        const matchedProps = c.props.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
        if (matchedProps.length > 0) {
          score += matchedProps.length * 2
          if (!reason) reason = `Props 匹配：${matchedProps.map(p => p.name).join('、')}`
        }

        const matchedEvents = c.events.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
        if (matchedEvents.length > 0) {
          score += matchedEvents.length * 2
          if (!reason) reason = `Events 匹配：${matchedEvents.map(e => e.name).join('、')}`
        }

        if (score > 0) {
          results.push({ score, component: c, matchReason: reason })
        }
      }

      results.sort((a, b) => b.score - a.score)
      const top5 = results.slice(0, 5)

      if (top5.length === 0) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `未找到与「${query}」匹配的组件。`
            }
          ]
        }
      }

      const lines = top5.map((r, i) => {
        const c = r.component
        const shortName = c.name.split(' ')[0]
        const desc = c.description || c.props[0]?.description || ''
        return `${i + 1}. **${shortName}** — ${r.matchReason}\n   ${desc}`
      })

      return {
        content: [
          {
            type: 'text' as const,
            text: `搜索「${query}」找到 ${top5.length} 个组件：\n\n${lines.join('\n\n')}`
          }
        ]
      }
    }
  )

  // tool 4: get_component_example
  server.tool(
    'get_component_example',
    '只获取指定组件的代码示例',
    {
      name: z.string().describe('组件名称，如 yt-button、button 均可')
    },
    async ({ name }) => {
      const c = findComponent(name)
      if (!c) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `未找到组件「${name}」。`
            }
          ]
        }
      }

      if (c.examples.length === 0) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `${c.name} 暂无代码示例。`
            }
          ]
        }
      }

      const blocks = c.examples.map((code, i) => `### 示例 ${i + 1}\n\n\`\`\`vue\n${code}\n\`\`\``)

      return {
        content: [
          {
            type: 'text' as const,
            text: `# ${c.name} 代码示例\n\n${blocks.join('\n\n')}`
          }
        ]
      }
    }
  )

  return server
}

// ── transport: stdio ─────────────────────────────────────────────────

async function startStdio() {
  const server = createMcpServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

// ── transport: http (Streamable HTTP) ───────────────────────────────

async function startHttp(port: number) {
  const transports = new Map<string, StreamableHTTPServerTransport>()

  const httpServer = createServer(async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id, mcp-protocol-version, Accept')
    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }

    const url = new URL(req.url || '/', `http://localhost:${port}`)

    // ── GET /health ──────────────────────────────────────────────
    if (url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          status: 'ok',
          name: 'yt-ui-mcp-server',
          version: '1.0.0',
          activeSessions: transports.size
        })
      )
      return
    }

    if (url.pathname !== '/mcp') {
      res.writeHead(404)
      res.end()
      return
    }

    // ── read request body ────────────────────────────────────────
    let body = ''
    if (req.method === 'POST') {
      for await (const chunk of req) body += chunk
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(body)
    } catch {
      parsed = undefined
    }

    const isInit = parsed && typeof parsed === 'object' && 'method' in parsed && (parsed as Record<string, unknown>).method === 'initialize'

    const sessionId = req.headers['mcp-session-id'] as string | undefined

    let transport: StreamableHTTPServerTransport

    if (isInit) {
      // create new session
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID()
      })
      const server = createMcpServer()
      await server.connect(transport)

      // intercept writeHead to capture session ID from response headers
      const origWriteHead = res.writeHead.bind(res)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(res as any).writeHead = function (statusCode: number, ...args: any[]) {
        if (transport.sessionId && !transports.has(transport.sessionId)) {
          transports.set(transport.sessionId, transport)
          transport.onclose = () => transports.delete(transport.sessionId!)
        }
        return origWriteHead(statusCode, ...args)
      }
    } else if (sessionId && transports.has(sessionId)) {
      transport = transports.get(sessionId)!
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          jsonrpc: '2.0',
          error: { code: -32000, message: 'Unknown session' },
          id: null
        })
      )
      return
    }

    await transport.handleRequest(req, res, parsed)
  })

  httpServer.listen(port, () => {
    console.log(`yt-ui MCP Server listening on http://localhost:${port}`)
    console.log(`  MCP endpoint:  POST http://localhost:${port}/mcp`)
    console.log(`  Health check:  GET  http://localhost:${port}/health`)
  })
}

// ── CLI entry ────────────────────────────────────────────────────────

const args = process.argv.slice(2)

function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`)
  return idx !== -1 ? args[idx + 1] : undefined
}

const transport = getArg('transport') || 'stdio'

if (transport === 'http') {
  const port = parseInt(getArg('port') || '3000', 10)
  startHttp(port)
} else {
  startStdio()
}
