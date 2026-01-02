# yt-avatar 头像组件

## 属性

| 属性名             | 类型                   | 默认值         | 说明                           |
| ------------------ | ---------------------- | -------------- | ------------------------------ |
| `url`              | `string`               | `''`           | 头像图片地址                   |
| `theme`            | `ThemeColor \| 'none'` | `'none'`       | 主题颜色/guide/theme-system.md |
| `circle`           | `boolean`              | `true`         | 是否为圆形头像                 |
| `size`             | `number`               | `60`           | 头像尺寸（单位：px）           |
| `fit`              | `ImageMode`            | `'aspectFill'` | 图片裁剪模式                   |
| `showBadge`        | `boolean`              | `false`        | 是否显示徽标                   |
| `enableBadgeTheme` | `boolean`              | `true`         | 徽标是否使用头像主题           |
| `count`            | `number`               | `0`            | 徽标数字                       |
| `overflowCount`    | `number`               | `99`           | 徽标封顶数字                   |
| `dot`              | `boolean`              | `false`        | 是否显示小红点                 |
| `offset`           | `number[]`             | `[]`           | 徽标偏移量                     |

## 事件

| 事件名  | 参数                                | 说明         |
| ------- | ----------------------------------- | ------------ |
| `click` | `e: Event`                          | 点击头像     |
| `load`  | `{ height: string; width: string }` | 图片加载完成 |
| `error` | `errMsg: string`                    | 图片加载失败 |

## 示例

### 基本使用

```vue
<yt-avatar url="/avatar.png" />
<yt-avatar theme="forest" />
<yt-avatar theme="ocean" />
<yt-avatar theme="magic" />
<yt-avatar theme="blossom" />
<yt-avatar theme="sunshine" />
<yt-avatar theme="classic" />
<yt-avatar theme="forest-sky" />
<yt-avatar theme="ocean-sky" />
<yt-avatar theme="magic-sky" />
<yt-avatar theme="blossom-sky" />
<yt-avatar theme="sunshine-sky" />
```

### 尺寸和形状

```vue
<yt-avatar :size="100" theme="forest" />
<yt-avatar :size="80" :circle="true" theme="ocean" />
<yt-avatar :size="120" :circle="false" theme="magic" />
```

### 带徽标

```vue
<yt-avatar theme="blossom" :showBadge="true" :count="5" />
<yt-avatar theme="sunshine" :showBadge="true" :dot="true" />
<yt-avatar theme="classic" :showBadge="true" :count="120" :overflowCount="99" />
```

### 星空主题徽标

```vue
<yt-avatar theme="forest-sky" :showBadge="true" />
<yt-avatar theme="ocean-sky" :showBadge="true" :count="3" />
<yt-avatar theme="magic-sky" :showBadge="true" :enableBadgeTheme="false" />
<yt-avatar theme="blossom-sky" :showBadge="true" :dot="true" />
<yt-avatar theme="sunshine-sky" :showBadge="true" :count="8" />
```

### 事件处理

```vue
<yt-avatar
  theme="forest"
  @click="handleAvatarClick"
  @load="handleImageLoad"
  @error="handleImageError"
/>
```

### 完整示例

```vue
<yt-avatar
  url="https://example.com/user.jpg"
  theme="forest-sky"
  :size="80"
  :circle="true"
  fit="aspectFill"
  :showBadge="true"
  :count="3"
  :dot="false"
  :overflowCount="99"
  :offset="[5, 5]"
  :enableBadgeTheme="true"
  @click="onAvatarClick"
  @load="onImageLoad"
  @error="onImageError"
/>
```

### 偏移徽标

```vue
<yt-avatar theme="ocean" :showBadge="true" :count="8" :offset="[10, 5]" />
```

### 方形头像

```vue
<yt-avatar url="/avatar.jpg" :circle="false" :size="100" theme="magic" />
```
