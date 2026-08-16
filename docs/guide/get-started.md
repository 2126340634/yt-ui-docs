# 快速开始

[所有组件](/components/yt-avatar.md)

---

## 配置

在项目的 `pages.json` 文件中配置 easycom：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^yt-(.*)": "yt-ui/src/components/yt-$1/yt-$1.vue"
    }
  }
}
```

---
