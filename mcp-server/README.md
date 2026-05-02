# Yt-UI MCP Server

为 Yt-UI 组件库提供 MCP (Model Context Protocol) 接入，让 AI 编码助手能直接查询组件文档。

## 提供的 Tools

| Tool | 说明 |
|------|------|
| `list_components` | 列出所有组件名称和简介 |
| `get_component` | 获取指定组件的完整文档（Props/Events/Slots/示例） |
| `search_component` | 按关键词搜索组件 |
| `get_component_example` | 只获取指定组件的代码示例 |

## 本地构建

```bash
cd mcp-server
npm install
npm run build
```

build 会自动将 `components.json` 打包到 `dist/` 目录。

## 本地运行

### stdio 模式（给 Cursor / Claude Desktop / Claude Code 用）

```bash
npm start
```

### HTTP 模式

```bash
npm run start:http
```

启动后暴露：
- `POST /mcp` — MCP 协议端点
- `GET /health` — 健康检查

---

## 接入配置

### Cursor（本地 stdio）

在项目根目录创建 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "yt-ui": {
      "command": "node",
      "args": ["mcp-server/dist/index.js"],
      "cwd": "/absolute/path/to/yt-ui-docs"
    }
  }
}
```

### Cursor（远程 HTTP）

```json
{
  "mcpServers": {
    "yt-ui": {
      "url": "https://zjyt.cqytxy.edu.cn/yt-ui/mcp"
    }
  }
}
```

### Claude Desktop

编辑配置文件：
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "yt-ui": {
      "command": "node",
      "args": ["/absolute/path/to/yt-ui-docs/mcp-server/dist/index.js"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add yt-ui -- node /absolute/path/to/yt-ui-docs/mcp-server/dist/index.js
```

项目根目录已有 `.mcp.json`，Claude Code 会自动加载。

---

## 部署到服务器（Docker）

MCP 服务部署地址：`https://zjyt.cqytxy.edu.cn/yt-ui/mcp`

### 1) 准备文件

将 build 后的文件上传到服务器：

```
/www/server/nginx/html/yt-ui/mcp-server/
├── package.json
└── dist/
    ├── index.js
    └── components.json
```

### 2) 启动容器

```bash
docker run -d --name yt-ui-mcp \
  -p 3005:3005 \
  -v /www/server/nginx/html/yt-ui/mcp-server:/app \
  -w /app \
  node:22-alpine \
  sh -c "npm install --omit=dev && node dist/index.js --transport http --port 3005"
```

### 3) Nginx 反向代理

在已有的 `zjyt.cqytxy.edu.cn` server 块中添加：

```nginx
location ^~ /yt-ui/mcp {
    proxy_pass http://127.0.0.1:3005/mcp;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header mcp-session-id $http_mcp_session_id;
    proxy_buffering off;
}

location ^~ /yt-ui/health {
    proxy_pass http://127.0.0.1:3005/health;
}
```

重载 Nginx：

```bash
nginx -t && nginx -s reload
```

### 4) 验证

```bash
# 检查容器状态
docker ps | grep yt-ui-mcp
# 健康检查
curl http://localhost:3005/health
```

---

## 常用管理命令

```bash
# 查看日志
docker logs -f yt-ui-mcp
# 重启
docker restart yt-ui-mcp
# 停止
docker stop yt-ui-mcp
# 删除容器
docker rm yt-ui-mcp
```

---

## 更新文档内容

MCP 服务内置了文件热监听，更新 `components.json` 后**无需重启容器**，自动加载新数据。

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

# 4. 验证
curl https://zjyt.cqytxy.edu.cn/yt-ui/health
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

# 6. 验证
curl https://zjyt.cqytxy.edu.cn/yt-ui/health
```

> **Nginx 配置**：确保 `.md` 文件能被正确下载（而非返回 403/404）。在 docs 的 server 块中添加：
>
> ```nginx
> location ~* \.md$ {
>     default_type text/plain; charset=utf-8;
> }
> ```

> **注意**：每次更新时记得同步修改以下三处的版本号：
> - `mcp-server/package.json` — `version` 字段
> - `mcp-server/src/index.ts` — `McpServer` 初始化处的 `version`
> - `mcp-server/src/index.ts` — `/health` 响应中的 `version`
>
> 修改后需要重新 `npm run build` 并重启容器才能生效。

---

## 使用示例

接入后在对话中直接说：

- "列出所有 yt-ui 组件"
- "yt-button 有哪些 props"
- "搜索跟表单相关的组件"
- "给我 yt-popup 的代码示例"
