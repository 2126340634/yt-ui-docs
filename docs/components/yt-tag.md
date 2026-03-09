# yt-tag 标签组件

## 属性

| 属性名         | 类型               | 默认值      | 说明                           |
| -------------- | ------------------ | ----------- | ------------------------------ |
| `theme`        | `ThemeColor`       | `'classic'` | [主题颜色](/guide/theme-system.md) |
| `type`         | `ColorType`        | `'primary'` | 标签类型                       |
| `size`         | `SizeType`         | `'medium'`  | 标签尺寸                       |
| `plain`        | `boolean`          | `false`     | 是否朴素样式                   |
| `borderRadius` | `number \| string` | `20`        | 圆角大小                       |
| `disabled`     | `boolean`          | `false`     | 是否禁用                       |

## 主题颜色

```vue
<yt-tag theme="forest">森林标签</yt-tag>

<yt-tag theme="ocean">海洋标签</yt-tag>

<yt-tag theme="magic">魔法标签</yt-tag>

<yt-tag theme="blossom">樱花标签</yt-tag>

<yt-tag theme="sunshine">阳光标签</yt-tag>

<yt-tag theme="classic">经典标签</yt-tag>

<yt-tag theme="forest-sky">森林星空标签</yt-tag>

<yt-tag theme="ocean-sky">海洋星空标签</yt-tag>

<yt-tag theme="magic-sky">魔法星空标签</yt-tag>

<yt-tag theme="blossom-sky">樱花星空标签</yt-tag>

<yt-tag theme="sunshine-sky">阳光星空标签</yt-tag>
```

## 事件

| 事件名  | 参数       | 说明     |
| ------- | ---------- | -------- |
| `click` | `e: Event` | 点击标签 |

## 示例

### 基本标签

```vue
<yt-tag>标签</yt-tag>
```

### 标签类型

```vue
<yt-tag type="primary">主要</yt-tag>

<yt-tag type="success">成功</yt-tag>

<yt-tag type="warning">警告</yt-tag>

<yt-tag type="danger">危险</yt-tag>

<yt-tag type="info">信息</yt-tag>
```

### 不同尺寸

```vue
<yt-tag size="large">大标签</yt-tag>

<yt-tag size="medium">中标签</yt-tag>

<yt-tag size="small">小标签</yt-tag>

<yt-tag size="mini">迷你标签</yt-tag>
```

### 朴素样式

```vue
<yt-tag :plain="true">朴素标签</yt-tag>

<yt-tag type="success" :plain="true">朴素成功</yt-tag>
```

### 自定义圆角

```vue
<yt-tag :borderRadius="4">直角标签</yt-tag>

<yt-tag :borderRadius="30">圆形标签</yt-tag>

<yt-tag borderRadius="50%">圆形标签</yt-tag>
```

### 禁用状态

```vue
<yt-tag :disabled="true">禁用标签</yt-tag>

<yt-tag :disabled="isLoading" @click="handleTagClick">可切换标签</yt-tag>
```

### 事件处理

```vue
<yt-tag @click="handleTagClick">点击我</yt-tag>
```

### 组合使用

```vue
<view class="tag-group">
  <yt-tag type="primary" size="small">前端</yt-tag>
  <yt-tag type="success" size="small" :plain="true">Vue.js</yt-tag>
  <yt-tag type="warning" size="small">JavaScript</yt-tag>
  <yt-tag type="danger" size="small" :plain="true">TypeScript</yt-tag>
  <yt-tag type="info" size="small">CSS</yt-tag>
</view>
```

### 完整示例

```vue
<yt-tag
  theme="forest-sky"
  type="primary"
  size="medium"
  :plain="false"
  :borderRadius="20"
  :disabled="false"
  @click="handleTagClick"
>
  热门标签
</yt-tag>
```
