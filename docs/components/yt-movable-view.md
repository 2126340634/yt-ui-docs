# yt-movableView 可移动视图组件

## 属性

| 属性名        | 类型                                            | 默认值   | 说明             |
| ------------- | ----------------------------------------------- | -------- | ---------------- |
| `zIndex`      | `number`                                        | `2000`   | 层级             |
| `width`       | `number \| string`                              | `'100%'` | 可移动区域宽度   |
| `height`      | `number \| string`                              | `200`    | 可移动区域高度   |
| `innerWidth`  | `number \| string`                              | `'100%'` | 可移动视图宽度   |
| `innerHeight` | `number \| string`                              | `200`    | 可移动视图高度   |
| `direction`   | `'all' \| 'vertical' \| 'horizontal' \| 'none'` | `'all'`  | 移动方向限制     |
| `inertia`     | `boolean`                                       | `true`   | 是否有惯性       |
| `outOfBounds` | `boolean`                                       | `true`   | 是否超出边界     |
| `x`           | `number \| string`                              | `0`      | 初始 x 轴位置    |
| `y`           | `number \| string`                              | `0`      | 初始 y 轴位置    |
| `damping`     | `number`                                        | `20`     | 阻尼系数         |
| `friction`    | `number`                                        | `3`      | 摩擦系数         |
| `disabled`    | `boolean`                                       | `false`  | 是否禁用         |
| `scale`       | `boolean`                                       | `true`   | 是否支持缩放     |
| `scaleArea`   | `boolean`                                       | `true`   | 是否启用缩放区域 |
| `scaleMin`    | `number`                                        | `0.5`    | 最小缩放比例     |
| `scaleMax`    | `number`                                        | `10`     | 最大缩放比例     |
| `scaleValue`  | `number`                                        | `1`      | 初始缩放比例     |
| `animation`   | `boolean`                                       | `true`   | 是否使用动画     |

## 事件

| 事件名        | 参数                                                                                                        | 说明           |
| ------------- | ----------------------------------------------------------------------------------------------------------- | -------------- |
| `change`      | `{ x: number, y: number, source: 'touch' \| 'touch-out-of-bounds' \| 'out-of-bounds' \| 'friction' \| '' }` | 拖动过程中触发 |
| `scaleChange` | `{ x: number, y: number, scale: number }`                                                                   | 缩放过程中触发 |

## 示例

### 基本可移动视图

```vue
<yt-movableView>
  <view class="draggable-box">可拖拽区域</view>
</yt-movableView>
```

### 限制移动方向

```vue
<yt-movableView direction="vertical">
  <view class="vertical-drag">只能垂直拖拽</view>
</yt-movableView>

<yt-movableView direction="horizontal">
  <view class="horizontal-drag">只能水平拖拽</view>
</yt-movableView>

<yt-movableView direction="none">
  <view class="no-drag">不能拖拽</view>
</yt-movableView>
```

### 自定义尺寸

```vue
<yt-movableView :width="300" :height="300">
  <view class="custom-area">300x300区域</view>
</yt-movableView>

<yt-movableView width="80vw" height="60vh">
  <view class="responsive-area">响应式区域</view>
</yt-movableView>
```

### 初始位置

```vue
<yt-movableView :x="100" :y="50">
  <view class="positioned-box">初始位置(100,50)</view>
</yt-movableView>
```

### 缩放控制

```vue
<yt-movableView :scale="true" :scaleMin="0.5" :scaleMax="3" :scaleValue="1.5">
  <view class="zoomable-box">可缩放视图</view>
</yt-movableView>

<yt-movableView :scale="false">
  <view class="no-zoom-box">不可缩放</view>
</yt-movableView>
```

### 禁用拖拽

```vue
<yt-movableView :disabled="true">
  <view class="disabled-box">禁用拖拽</view>
</yt-movableView>

<yt-movableView :disabled="isLocked">
  <view class="conditional-drag">{{ isLocked ? '已锁定' : '可拖拽' }}</view>
</yt-movableView>
```

### 边界控制

```vue
<yt-movableView :outOfBounds="false">
  <view class="bounded-box">不超出边界</view>
</yt-movableView>

<yt-movableView :outOfBounds="true">
  <view class="unbounded-box">可超出边界</view>
</yt-movableView>
```

### 惯性控制

```vue
<yt-movableView :inertia="true">
  <view class="inertia-box">有惯性</view>
</yt-movableView>

<yt-movableView :inertia="false">
  <view class="no-inertia-box">无惯性</view>
</yt-movableView>
```

### 物理参数

```vue
<yt-movableView :damping="10" :friction="1">
  <view class="physics-box">低阻尼低摩擦</view>
</yt-movableView>

<yt-movableView :damping="40" :friction="5">
  <view class="physics-box">高阻尼高摩擦</view>
</yt-movableView>
```

### 动画控制

```vue
<yt-movableView :animation="true">
  <view class="animated-box">带动画</view>
</yt-movableView>

<yt-movableView :animation="false">
  <view class="no-animation-box">无动画</view>
</yt-movableView>
```

### 事件处理

```vue
<yt-movableView @change="handleDragChange" @scaleChange="handleScaleChange">
  <view class="event-box">拖拽我</view>
</yt-movableView>

<script setup>
  function handleDragChange({ x, y, source }) {
    console.log('位置变化:', { x, y, source })
  }

  function handleScaleChange({ x, y, scale }) {
    console.log('缩放变化:', { x, y, scale })
  }
</script>
```

### 图片查看器

```vue
<yt-movableView
  :scale="true"
  :scaleMin="0.5"
  :scaleMax="5"
  :scaleValue="1"
  :damping="20"
  :friction="2"
  :animation="true"
  @scaleChange="handleImageZoom"
>
  <image
    :src="currentImage"
    mode="aspectFit"
    class="zoomable-image"
  />
</yt-movableView>
```

### 悬浮按钮

```vue
<yt-movableView
  :direction="'all'"
  :outOfBounds="false"
  :damping="30"
  :friction="3"
  :width="'100vw'"
  :height="'100vh'"
  :innerWidth="60"
  :innerHeight="60"
  :animation="true"
>
  <view class="floating-button" @click="handleFloatButtonClick">
    <yt-icon name="Plus" :size="24" />
  </view>
</yt-movableView>
```

### 可拖拽面板

```vue
<yt-movableView
  direction="vertical"
  :outOfBounds="false"
  :damping="25"
  :y="panelY"
  @change="handlePanelDrag"
>
  <view class="draggable-panel">
    <view class="panel-handle"></view>
    <view class="panel-content">
      <!-- 面板内容 -->
    </view>
  </view>
</yt-movableView>
```

### 完整示例

```vue
<script setup>
  import { ref } from 'vue'

  const imageScale = ref(1)
  const imagePosition = ref({ x: 0, y: 0 })
  const isDragging = ref(false)

  function handleImageDrag({ x, y, source }) {
    imagePosition.value = { x, y }
    isDragging.value = source === 'touch'
  }

  function handleImageZoom({ scale }) {
    imageScale.value = scale
  }

  function resetImage() {
    imageScale.value = 1
    imagePosition.value = { x: 0, y: 0 }
  }
</script>

<template>
  <view class="image-viewer">
    <h3>图片查看器</h3>
    <view class="viewer-container">
      <yt-movableView
        :width="400"
        :height="400"
        :innerWidth="300"
        :innerHeight="300"
        :x="imagePosition.x"
        :y="imagePosition.y"
        :scale="true"
        :scaleValue="imageScale"
        :scaleMin="0.5"
        :scaleMax="3"
        :damping="20"
        :friction="2"
        :animation="true"
        @change="handleImageDrag"
        @scaleChange="handleImageZoom"
      >
        <image
          src="https://example.com/image.jpg"
          mode="aspectFit"
          class="viewer-image"
        />
      </yt-movableView>
    </view>
    <view class="controls">
      <view class="info">
        <text>缩放: {{ imageScale.toFixed(2) }}</text>
        <text>位置: ({{ imagePosition.x }}, {{ imagePosition.y }})</text>
      </view>
      <view class="buttons">
        <yt-button
          @click="resetImage"
          size="small"
        >
          重置
        </yt-button>
      </view>
    </view>
  </view>
</template>
```
