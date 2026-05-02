# LLM WIKI 使用说明

本项目提供纯文本文件，供 AI 模型直接读取 Yt-UI 组件库的完整文档。

## 文件说明

| 文件 | 地址 | 内容 |
|------|------|------|
| `llms.txt` | [llms.txt](https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms.txt) | 精简版：组件列表、安装方式、一句话描述 |
| `llms-full.txt` | [llms-full.txt](https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms-full.txt) | 完整版：每个组件的 Props/Events/Slots/代码示例 |
| `components/*.md` | [components/](https://zjyt.cqytxy.edu.cn/yt-ui/docs/components/yt-input.md) | 组件原始 Markdown 文档，AI 可按需读取单个组件 |

> **为什么用 `.md` 而不是 `.html`？** HTML 页面包含大量 DOM 结构和 VuePress 框架代码，AI 读取时会浪费大量 token。`.md` 文件是纯内容，token 消耗仅为 HTML 的 1/5 ~ 1/10。

## 使用方式

### 1. 在 ChatGPT / Claude 等 AI 对话中使用

直接告诉 AI 去读取 URL：

```
请阅读 https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms.txt，了解 Yt-UI 组件库有哪些组件。
```

```
请阅读 https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms-full.txt，然后帮我用 yt-popup 写一个确认弹窗。
```

按需读取单个组件（更省 token）：

```
请阅读 https://zjyt.cqytxy.edu.cn/yt-ui/docs/components/yt-popup.md，然后帮我写一个确认弹窗。
```

### 2. 在 Cursor 中使用

在项目根目录创建 `.cursorrules`，添加：

```
开发时请参考 Yt-UI 组件文档：https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms-full.txt
所有组件以 yt- 为前缀，使用 easycom 自动引入。
```

Cursor 会自动抓取 URL 内容作为上下文。

### 3. 在 Claude Projects 中使用

1. 打开 claude.ai → Projects → 你的项目
2. 点击 "Add Content" → "Add URL"
3. 输入 `https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms-full.txt`

之后该项目下的所有对话都会自动引用这个文档。

### 4. 在 AI Agent / 自动化流程中使用

```python
import requests

# 获取精简版
overview = requests.get("https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms.txt").text

# 获取完整版（用于 RAG 或直接塞进 prompt）
full_doc = requests.get("https://zjyt.cqytxy.edu.cn/yt-ui/docs/llms-full.txt").text
```

### 5. 本地使用（不部署服务器）

文件在项目的 `LLM-WIKI/` 目录下，可以直接读取：

```bash
cat LLM-WIKI/llms.txt
cat LLM-WIKI/llms-full.txt
```

## llms.txt 标准

本项目遵循 [llms.txt 标准](https://llmstxt.org/)——一种让网站向 AI 模型提供结构化信息的约定：

- `llms.txt`：网站概览，类似给 AI 看的 robots.txt
- `llms-full.txt`：完整参考文档，AI 可以一次性读取全部内容

## 更新文档

修改组件文档后，重新生成：

```bash
npm run sync
```

然后重新部署 `LLM-WIKI/` 目录即可（纯静态文件，不需要重启服务）。
