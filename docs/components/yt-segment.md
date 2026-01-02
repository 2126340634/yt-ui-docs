# yt-segment 分段器组件

## 属性

| 属性名       | 类型         | 默认值      | 说明                           |
| ------------ | ------------ | ----------- | ------------------------------ |
| `theme`      | `ThemeColor` | `'classic'` | 主题颜色/guide/theme-system.md |
| `size`       | `SizeType`   | `'medium'`  | 尺寸大小                       |
| `list`       | `string[]`   | `[]`        | 分段选项列表                   |
| `modelValue` | `number`     | `0`         | 当前选中索引 (v-model)         |

## 主题颜色

```vue
<yt-segment theme="forest" :list="['选项1', '选项2']" />

<yt-segment theme="ocean" :list="['选项1', '选项2']" />

<yt-segment theme="magic" :list="['选项1', '选项2']" />

<yt-segment theme="blossom" :list="['选项1', '选项2']" />

<yt-segment theme="sunshine" :list="['选项1', '选项2']" />

<yt-segment theme="classic" :list="['选项1', '选项2']" />

<yt-segment theme="forest-sky" :list="['选项1', '选项2']" />

<yt-segment theme="ocean-sky" :list="['选项1', '选项2']" />

<yt-segment theme="magic-sky" :list="['选项1', '选项2']" />

<yt-segment theme="blossom-sky" :list="['选项1', '选项2']" />

<yt-segment theme="sunshine-sky" :list="['选项1', '选项2']" />
```

## 事件

| 事件名              | 参数                 | 说明         |
| ------------------- | -------------------- | ------------ |
| `update:modelValue` | `modelValue: number` | v-model 更新 |
| `change`            | `index: number`      | 选项变化     |

## 示例

### 基本使用

```vue
<yt-segment :list="['选项1', '选项2']" />
```

### 绑定值

```vue
<yt-segment v-model="currentIndex" :list="['全部', '进行中', '已完成']" />
```

### 尺寸控制

```vue
<yt-segment size="large" :list="['大', '中', '小']" />

<yt-segment size="medium" :list="['选项1', '选项2']" />

<yt-segment size="small" :list="['A', 'B', 'C']" />

<yt-segment size="mini" :list="['是', '否']" />
```

### 事件处理

```vue
<yt-segment :list="['最新', '最热', '推荐']" @change="handleSegmentChange" />
```

### 多选项

```vue
<yt-segment :list="['全部', '待付款', '待发货', '待收货', '已完成']" />
```

### 完整示例

```vue
<yt-segment
  v-model="selectedIndex"
  theme="forest-sky"
  size="medium"
  :list="['日', '周', '月', '年']"
  @change="handleTimeChange"
/>
```
