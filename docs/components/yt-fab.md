# yt-fab 悬浮按钮组件

## 属性

| 属性名       | 类型                | 默认值      | 说明                           |
| ------------ | ------------------- | ----------- | ------------------------------ |
| `theme`      | `ThemeColor`        | `'classic'` | [主题颜色](/guide/theme-system.md) |
| `size`       | `SizeType`          | `'medium'`  | 按钮尺寸                       |
| `horizontal` | `'right' \| 'left'` | `'right'`   | 水平位置                       |
| `vertical`   | `'bottom' \| 'top'` | `'bottom'`  | 垂直位置                       |
| `zIndex`     | `number`            | `500`       | 层级                           |
| `offset`     | `number[]`          | `[]`        | 偏移量 [x, y]                  |
| `popMenu`    | `boolean`           | `false`     | 是否弹出菜单                   |
| `menuList`   | `MenuItem[]`        | `[]`        | 菜单项列表                     |

## MenuItem 类型

```typescript
interface MenuItem {
  text?: string // 菜单文本
  icon: string // 图标名称或图片地址
}
```

## 事件

| 事件名          | 参数                        | 说明       |
| --------------- | --------------------------- | ---------- |
| `fabClick`      | `e: Event`                  | 主按钮点击 |
| `menuItemClick` | `(e: Event, index: number)` | 菜单项点击 |

## 示例

### 基本悬浮按钮

```vue
<yt-fab />

<yt-fab theme="forest" />

<yt-fab theme="ocean" />

<yt-fab theme="magic" />

<yt-fab theme="blossom" />

<yt-fab theme="sunshine" />

<yt-fab theme="classic" />

<yt-fab theme="forest-sky" />

<yt-fab theme="ocean-sky" />

<yt-fab theme="magic-sky" />

<yt-fab theme="blossom-sky" />

<yt-fab theme="sunshine-sky" />
```

### 不同尺寸

```vue
<yt-fab size="large" theme="forest" />

<yt-fab size="medium" theme="ocean" />

<yt-fab size="small" theme="magic" />

<yt-fab size="mini" theme="blossom" />
```

### 不同位置

```vue
<yt-fab horizontal="left" vertical="top" theme="sunshine" />

<yt-fab horizontal="left" vertical="bottom" theme="classic" />

<yt-fab horizontal="right" vertical="top" theme="forest-sky" />

<yt-fab horizontal="right" vertical="bottom" theme="ocean-sky" />
```

### 偏移量

```vue
<yt-fab :offset="[20, 20]" theme="magic-sky" />

<yt-fab :offset="[-20, 30]" horizontal="left" theme="blossom-sky" />
```

### 弹出菜单

```vue
<yt-fab
  :popMenu="true"
  :menuList="[
    { text: '添加', icon: 'Add' },
    { text: '编辑', icon: 'Edit' },
    { text: '删除', icon: 'Delete' }
  ]"
  theme="sunshine-sky"
  @fabClick="handleFabClick"
  @menuItemClick="handleMenuItemClick"
/>
```

### 自定义图标菜单

```vue
<yt-fab
  :popMenu="true"
  :menuList="[
    { text: '拍照', icon: 'Camera' },
    { text: '相册', icon: 'Album' },
    { text: '文件', icon: 'File' },
    { text: '位置', icon: 'Location' }
  ]"
  theme="forest"
  @menuItemClick="handleMenuAction"
/>
```

### 图片菜单

```vue
<yt-fab
  :popMenu="true"
  :menuList="[
    { text: '微信', icon: '/icons/wechat.png' },
    { text: 'QQ', icon: '/icons/qq.png' },
    { text: '微博', icon: '/icons/weibo.png' }
  ]"
  theme="ocean"
  @menuItemClick="shareToApp"
/>
```

### 层级控制

```vue
<yt-fab :zIndex="1000" theme="magic" />

<yt-fab :zIndex="999" :popMenu="true" :menuList="menuItems" theme="blossom" />
```

### 事件处理

```vue
<script setup>
  function handleFabClick(e) {
    console.log('悬浮按钮被点击', e)
    // 处理主按钮点击逻辑
  }

  function handleMenuItemClick(e, index) {
    console.log('菜单项被点击', index, e)
    // 处理菜单项点击逻辑
    const actions = ['add', 'edit', 'delete']
    if (actions[index]) {
      executeAction(actions[index])
    }
  }
</script>

<template>
  <yt-fab
    :popMenu="true"
    :menuList="[
      { text: '新增', icon: 'Add' },
      { text: '修改', icon: 'Edit' },
      { text: '移除', icon: 'Delete' }
    ]"
    theme="sunshine-sky"
    @fabClick="handleFabClick"
    @menuItemClick="handleMenuItemClick"
  />
</template>
```

### 完整示例

```vue
<yt-fab
  theme="forest-sky"
  size="large"
  horizontal="right"
  vertical="bottom"
  :zIndex="1000"
  :offset="[16, 16]"
  :popMenu="true"
  :menuList="[
    { text: '新建任务', icon: 'Task' },
    { text: '添加成员', icon: 'UserAdd' },
    { text: '上传文件', icon: 'Upload' },
    { text: '分享', icon: 'Share' },
    { text: '设置', icon: 'Settings' }
  ]"
  @fabClick="handleMainButtonClick"
  @menuItemClick="handleMenuAction"
/>
```

### 响应式位置

```vue
<script setup>
  import { computed } from 'vue'

  const isMobile = computed(() => window.innerWidth < 768)
  const fabPosition = computed(() => ({
    horizontal: isMobile.value ? 'right' : 'left',
    vertical: isMobile.value ? 'bottom' : 'top',
    offset: isMobile.value ? [20, 20] : [40, 40]
  }))
</script>

<template>
  <yt-fab
    theme="ocean-sky"
    :horizontal="fabPosition.horizontal"
    :vertical="fabPosition.vertical"
    :offset="fabPosition.offset"
    :popMenu="!isMobile"
    :menuList="menuItems"
  />
</template>
```
