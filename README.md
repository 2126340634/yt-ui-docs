# Yt-UI

轻量级 Uni-app 组件库，专为指尖移通 5.0 微信小程序打造，基于 Vue 3 Composition API + TypeScript。

## 项目结构

```
yt-ui-docs/
├── docs/                  # VuePress 组件文档源码
├── scripts/               # 构建脚本
│   ├── extract-components.js   # 从 .md 中提取组件数据 → components.json
│   ├── generate-llms.js       # 生成 LLM 可读的 llms.txt / llms-full.txt
│   └── deploy-build.js        # 一键构建 → deploy/
├── mcp-server/            # MCP Server，供 AI 编码助手查询组件文档
├── LLM-WIKI/              # 部署为静态资源
│   ├── llms.txt           # LLM 精简版
│   ├── llms-full.txt      # LLM 完整版
│   └── components/        # 组件 .md 源文件（AI 可直接读取，无 DOM 开销）
└── package.json
```

## 快速开始

```bash
pnpm install
```

### 本地开发文档站

```bash
pnpm docs:dev
```

### 构建文档站

```bash
pnpm docs:build
```

### 同步组件数据

从组件文档中提取数据，并生成 LLM 文件：

```bash
pnpm sync
```

等价于：

```bash
pnpm extract          # 提取 → scripts/output/components.json
pnpm generate-llms    # 生成 → LLM-WIKI/llms.txt, llms-full.txt, components/*.md
```

## 部署流程

### 方式一：一键构建 + 手动上传

```bash
# 1. 一键构建，所有产物输出到 deploy/
npm run build

# 2. 上传文档站（文件名可能变化，先清空再上传）
ssh root@server "rm -rf /www/server/nginx/html/yt-ui/docs/*"
scp -r deploy/docs/* root@server:/www/server/nginx/html/yt-ui/docs/

# 3. 上传 MCP Server（文件名不变，直接覆盖）
scp -r deploy/mcp-server/* root@server:/www/server/nginx/html/yt-ui/mcp-server/
# 如依赖有变动，服务器上执行：cd /www/server/nginx/html/yt-ui/mcp-server && npm install --omit=dev
```

构建完成后 `deploy/` 目录结构：

```
deploy/
├── docs/                    → rm -rf + scp to docs/
└── mcp-server/              → scp to mcp-server/
    ├── package.json
    ├── package-lock.json
    └── dist/
        ├── index.js
        └── components.json    (MCP 自动热加载)
```

### 方式二：分步执行

```bash
# 1. 构建文档站
npm run docs:build

# 2. 上传文档站到服务器（先清空再上传）
ssh root@server "rm -rf /www/server/nginx/html/yt-ui/docs/*"
scp -r docs/.vuepress/dist/* root@server:/www/server/nginx/html/yt-ui/docs/

# 3. 生成 LLM 文件 + 组件 .md 文件
npm run sync

# 4. 上传 LLM 文件和组件 .md 文件
scp -r LLM-WIKI/* root@server:/www/server/nginx/html/yt-ui/docs/

# 5. 上传 components.json（MCP 自动热加载）
scp scripts/output/components.json root@server:/www/server/nginx/html/yt-ui/mcp-server/dist/components.json
```

MCP 服务部署详见 [mcp-server/README.md](mcp-server/README.md)。

## 文档地址

- 组件文档（给人看）：https://zjyt.cqytxy.edu.cn/yt-ui/docs/
- 组件文档（给 AI 看）：https://zjyt.cqytxy.edu.cn/yt-ui/docs/components/yt-input.md
- LLM 精简版：https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms.txt
- LLM 完整版：https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms-full.txt

## MCP Server

MCP 服务让 AI 编码助手（Cursor、Claude Code 等）能直接查询组件文档。

- 服务地址：https://zjyt.cqytxy.edu.cn/yt-ui/mcp
- 详细说明：[mcp-server/README.md](mcp-server/README.md)

## License

MIT
