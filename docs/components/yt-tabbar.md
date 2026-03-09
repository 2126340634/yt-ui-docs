# yt-tabbar 标签栏组件

## 属性

| 属性名              | 类型               | 默认值        | 说明                           |
| ------------------- | ------------------ | ------------- | ------------------------------ |
| `theme`             | `ThemeColor`       | `'classic'`   | [主题颜色](/guide/theme-system.md) |
| `modelValue`        | `number`           | `0`           | 当前激活索引 (v-model)         |
| `centerIcon`        | `string`           | `''`          | 中间按钮图标                   |
| `centerBgColor`     | `string`           | `'#ffffff20'` | 中间按钮背景色                 |
| `centerBgColorLast` | `string`           | `'#000'`      | 中间按钮最后一个背景色         |
| `showText`          | `boolean`          | `false`       | 是否显示文字                   |
| `list`              | `TabItem[]`        | `[]`          | 标签列表                       |
| `zIndex`            | `number \| string` | `500`         | 层级                           |

## TabItem 类型

```typescript
interface TabItem {
  text?: string // 标签文本
  icon: string // 图标名称或图片地址
  activeIcon?: string // 激活图标
}
```

## 主题颜色

```vue
<yt-tabbar theme="forest" :list="tabList" />

<yt-tabbar theme="ocean" :list="tabList" />

<yt-tabbar theme="magic" :list="tabList" />

<yt-tabbar theme="blossom" :list="tabList" />

<yt-tabbar theme="sunshine" :list="tabList" />

<yt-tabbar theme="classic" :list="tabList" />

<yt-tabbar theme="forest-sky" :list="tabList" />

<yt-tabbar theme="ocean-sky" :list="tabList" />

<yt-tabbar theme="magic-sky" :list="tabList" />

<yt-tabbar theme="blossom-sky" :list="tabList" />

<yt-tabbar theme="sunshine-sky" :list="tabList" />
```

## 事件

| 事件名              | 参数                              | 说明         |
| ------------------- | --------------------------------- | ------------ |
| `update:modelValue` | `activeIndex: number`             | v-model 更新 |
| `change`            | `(e: Event, activeIndex: number)` | 标签切换     |
| `centerClick`       | `e: Event`                        | 中间按钮点击 |

## 示例

### 基本标签栏

```vue
<yt-tabbar :list="[{ icon: 'Home' }, { icon: 'Course' }, { icon: 'Community' }, { icon: 'Me' }]" />
```

### 带文字标签栏

```vue
<yt-tabbar
  :showText="true"
  :list="[
    { text: '首页', icon: 'Home' },
    { text: '课程', icon: 'Course' },
    { text: '社区', icon: 'Community' },
    { text: '我的', icon: 'Me' }
  ]"
/>
```

### 激活图标

```vue
<yt-tabbar
  :list="[
    { icon: 'Home', activeIcon: 'HomeActive' },
    { icon: 'Course', activeIcon: 'CourseActive' },
    { icon: 'Community', activeIcon: 'CommunityActive' },
    { icon: 'Me', activeIcon: 'MeActive' }
  ]"
/>
```

### 绑定值

```vue
<yt-tabbar v-model="currentTab" :list="tabList" />

<yt-tabbar :modelValue="activeIndex" @update:modelValue="activeIndex = $event" :list="tabList" />
```

### 中间按钮

```vue
<yt-tabbar
  centerIcon="Plus"
  :list="[{ icon: 'Home' }, { icon: 'Search' }, { icon: 'Bell' }, { icon: 'User' }]"
/>
```

### 图片图标

```vue
<yt-tabbar
  :list="[
    { text: '首页', icon: '/icons/home.png', activeIcon: '/icons/home-active.png' },
    { text: '消息', icon: '/icons/message.png', activeIcon: '/icons/message-active.png' },
    { text: '发现', icon: '/icons/explore.png', activeIcon: '/icons/explore-active.png' },
    { text: '我的', icon: '/icons/profile.png', activeIcon: '/icons/profile-active.png' }
  ]"
/>
```

### 事件处理

```vue
<yt-tabbar
  v-model="currentTab"
  :list="tabList"
  @change="handleTabChange"
  @centerClick="handleCenterClick"
/>
```

### 完整示例

```vue
<yt-tabbar
  theme="forest-sky"
  v-model="currentTab"
  centerIcon="Plus"
  :centerBgColor="'#4CAF50'"
  :centerBgColorLast="'#2E7D32'"
  :showText="true"
  :zIndex="1000"
  :list="[
    { text: '首页', icon: 'Home', activeIcon: 'HomeActive' },
    { text: '发现', icon: 'Explore', activeIcon: 'ExploreActive' },
    { text: '消息', icon: 'Message', activeIcon: 'MessageActive' },
    { text: '我的', icon: 'User', activeIcon: 'UserActive' }
  ]"
  @change="handleTabChange"
  @centerClick="handleCenterButton"
/>
```
