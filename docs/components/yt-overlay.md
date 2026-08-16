# yt-overlay 遮罩层组件

## 属性

| 属性名     | 类型               | 默认值        | 说明     |
| ---------- | ------------------ | ------------- | -------- |
| `visible`  | `boolean`          | `false`       | 是否显示 |
| `duration` | `number`           | `200`         | 动画时长 |
| `zIndex`   | `number`           | `500`         | 层级     |
| `bgColor`  | `string`           | `'#00000080'` | 背景色   |
| `width`    | `number \| string` | `'100%'`      | 宽度     |
| `height`   | `number \| string` | `'100%'`      | 高度     |

## 事件

| 事件名  | 参数       | 说明     |
| ------- | ---------- | -------- |
| `click` | `e: Event` | 点击遮罩 |

## 示例

### 基本使用

```vue
<yt-overlay :visible="show" @click="show = false" />
```

### 控制显示

```vue
<yt-button @click="show = true">显示遮罩</yt-button>
<yt-overlay :visible="show" @click="show = false" />
```

### 自定义颜色

```vue
<yt-overlay :visible="show" bgColor="rgba(0,0,0,0.5)" />
<yt-overlay :visible="show" bgColor="#ffffff80" />
```

### 动画时长

```vue
<yt-overlay :visible="show" :duration="300" />
<yt-overlay :visible="show" :duration="100" />
```

### 弹窗遮罩

```vue
<yt-overlay :visible="showModal" @click="showModal = false" />
<view v-if="showModal" class="modal">弹窗内容</view>
```

### 侧边栏遮罩

```vue
<yt-overlay :visible="showSidebar" @click="showSidebar = false" />
<view v-if="showSidebar" class="sidebar">菜单</view>
```

### 加载遮罩

```vue
<yt-overlay :visible="loading" bgColor="rgba(255,255,255,0.7)">
  <view class="loading-content">
    <yt-loading />
  </view>
</yt-overlay>
```

### 图片预览

```vue
<yt-overlay :visible="showPreview" bgColor="rgba(0,0,0,0.9)" @click="showPreview = false" />
<view v-if="showPreview" class="preview">
  <image :src="imageUrl" mode="aspectFit" />
</view>
```

### 阻止滚动

```vue
<yt-overlay :visible="show" @touchmove.stop @click="show = false" />
```
