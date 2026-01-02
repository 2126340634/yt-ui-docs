# 快速开始

[所有组件](/components/yt-avatar.md)

## 特性

- 支持 easycom 自动导入
- 基于 Vue 3 `<script setup>` + TypeScript
- 支持微信小程序、Uni-app 等平台

## 安装

```bash
npm install yt-ui
# 或
pnpm add yt-ui
# 或
yarn add yt-ui
```

## 配置

在项目的 `pages.json` 文件中配置 easycom：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^yt-(.*)": "@rao2126340634/yt-ui/src/components/yt-$1/yt-$1.vue"
    }
  }
}
```

## 使用示例

在任意页面中直接使用：

```vue
<template>
  <yt-button>点击我</yt-button>
  <yt-avatar :url="avatarUrl" />
</template>
```

## 注意事项

1. 确保已安装 Vue 3
2. 确保配置 easycom
3. 所有组件以 `yt-` 开头
