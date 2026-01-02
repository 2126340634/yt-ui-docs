# yt-badge 徽标组件

## 属性

| 属性名          | 类型         | 默认值      | 说明                           |
| --------------- | ------------ | ----------- | ------------------------------ |
| `theme`         | `ThemeColor` | `'classic'` | 主题颜色/guide/theme-system.md |
| `count`         | `number`     | `0`         | 徽标数字                       |
| `overflowCount` | `number`     | `99`        | 徽标封顶数字                   |
| `dot`           | `boolean`    | `false`     | 是否显示小红点                 |
| `offset`        | `number[]`   | `[]`        | 徽标偏移量 [left, top]         |
| `zIndex`        | `number`     | `100`       | 徽标层级                       |

## 示例

### 基本使用

```vue
<yt-badge />
<yt-badge theme="forest" />
<yt-badge theme="ocean" />
<yt-badge theme="magic" />
<yt-badge theme="blossom" />
<yt-badge theme="sunshine" />
<yt-badge theme="classic" />
<yt-badge theme="forest-sky" />
<yt-badge theme="ocean-sky" />
<yt-badge theme="magic-sky" />
<yt-badge theme="blossom-sky" />
<yt-badge theme="sunshine-sky" />
```

### 数字徽标

```vue
<yt-badge :count="5" theme="forest" />
<yt-badge :count="12" theme="ocean" />
<yt-badge :count="99" theme="magic" />
<yt-badge :count="100" theme="blossom" />
<yt-badge :count="100" :overflowCount="99" theme="sunshine" />
```

### 点状徽标

```vue
<yt-badge :dot="true" theme="forest" />
<yt-badge :dot="true" theme="ocean" />
<yt-badge :dot="true" theme="magic" />
```

### 偏移位置

```vue
<yt-badge :count="8" :offset="[10, 5]" theme="forest" />
<yt-badge :count="3" :offset="[-5, 10]" theme="ocean" />
<yt-badge :dot="true" :offset="[5, -5]" theme="magic" />
```

### 星空主题

```vue
<yt-badge :count="5" theme="forest-sky" />
<yt-badge :dot="true" theme="ocean-sky" />
<yt-badge :count="12" :offset="[8, 8]" theme="magic-sky" />
<yt-badge :count="100" :overflowCount="99" theme="blossom-sky" />
<yt-badge :count="3" theme="sunshine-sky" />
```

### 层级控制

```vue
<yt-badge :count="5" :zIndex="200" theme="forest" />
<yt-badge :dot="true" :zIndex="150" theme="ocean" />
```

### 完整示例

```vue
<yt-badge
  theme="forest-sky"
  :count="3"
  :overflowCount="99"
  :dot="false"
  :offset="[5, 5]"
  :zIndex="100"
/>
```
