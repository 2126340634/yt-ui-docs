# yt-top-tabbar 顶部标签栏组件

## 属性

| 属性名       | 类型       | 默认值 | 说明                   |
| ------------ | ---------- | ------ | ---------------------- |
| `list`       | `string[]` | `[]`   | 标签列表               |
| `modelValue` | `number`   | `0`    | 当前激活索引 (v-model) |
| `zIndex`     | `number`   | `500`  | 层级                   |
| `fixed`      | `boolean`  | `true` | 是否固定定位           |

## 事件

| 事件名              | 参数                              | 说明         |
| ------------------- | --------------------------------- | ------------ |
| `update:modelValue` | `activeIndex: number`             | v-model 更新 |
| `change`            | `(e: Event, activeIndex: number)` | 标签切换     |

## 示例

### 基本顶部标签栏

```vue
<yt-top-tabbar :list="['推荐', '热门', '最新']" />
```

### 绑定值

```vue
<yt-top-tabbar v-model="currentTab" :list="tabList" />
```

### 非固定定位

```vue
<yt-top-tabbar :fixed="false" :list="['分类1', '分类2']" />
```

### 层级控制

```vue
<yt-top-tabbar :zIndex="1000" :list="['标签1', '标签2']" />
```

### 事件处理

```vue
<yt-top-tabbar
  v-model="currentTab"
  :list="['全部', '进行中', '已完成']"
  @change="handleTabChange"
/>
```

### 完整示例

```vue
<yt-top-tabbar
  v-model="activeTab"
  :list="['首页', '发现', '消息', '我的']"
  :fixed="true"
  :zIndex="999"
  @change="handleTabSwitch"
/>
```
