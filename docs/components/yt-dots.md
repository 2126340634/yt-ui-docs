# yt-dots 指示点组件

## 属性

| 属性名        | 类型                         | 默认值         | 说明                           |
| ------------- | ---------------------------- | -------------- | ------------------------------ |
| `total`       | `number`                     | `1`            | 指示点总数                     |
| `activeIndex` | `number`                     | `0`            | 当前激活的指示点索引           |
| `theme`       | `ThemeColor \| 'none'`       | `'none'`       | 主题颜色/guide/theme-system.md |
| `size`        | `number`                     | `24`           | 指示点整体缩放比例             |
| `direction`   | `'horizontal' \| 'vertical'` | `'horizontal'` | 指示点排列方向                 |

## 示例

### 基本指示点

```vue
<yt-dots :total="5" />

<yt-dots :total="3" :activeIndex="1" />
```

### 主题指示点

```vue
<yt-dots :total="4" theme="forest" />

<yt-dots :total="5" :activeIndex="2" theme="ocean" />

<yt-dots :total="6" :activeIndex="3" theme="magic" />

<yt-dots :total="4" :activeIndex="1" theme="blossom" />

<yt-dots :total="5" :activeIndex="4" theme="sunshine" />

<yt-dots :total="3" :activeIndex="0" theme="classic" />

<yt-dots :total="6" :activeIndex="2" theme="forest-sky" />

<yt-dots :total="5" :activeIndex="1" theme="ocean-sky" />

<yt-dots :total="4" :activeIndex="3" theme="magic-sky" />

<yt-dots :total="5" :activeIndex="0" theme="blossom-sky" />

<yt-dots :total="6" :activeIndex="5" theme="sunshine-sky" />
```

### 垂直排列

```vue
<yt-dots :total="3" direction="vertical" />

<yt-dots :total="5" :activeIndex="2" direction="vertical" theme="forest" />
```

### 缩放大小

```vue
<yt-dots :total="4" :size="16" />

<yt-dots :total="5" :activeIndex="3" :size="32" theme="ocean" />

<yt-dots :total="3" :size="20" direction="vertical" theme="magic" />
```

### 轮播指示器

```vue
<script setup>
  import { ref, onMounted } from 'vue'

  const activeIndex = ref(0)
  const totalSlides = 5

  onMounted(() => {
    setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % totalSlides
    }, 3000)
  })
</script>

<template>
  <div class="carousel-container">
    <div class="slide">幻灯片 {{ activeIndex + 1 }}</div>
    <yt-dots
      :total="totalSlides"
      :activeIndex="activeIndex"
      theme="forest-sky"
    />
  </div>
</template>
```

### 分页指示

```vue
<view class="pagination">
  <button @click="prevPage">上一页</button>
  <yt-dots 
    :total="totalPages" 
    :activeIndex="currentPage" 
    theme="sunshine"
  />
  <button @click="nextPage">下一页</button>
</view>
```

### 步骤指示器

```vue
<view class="step-indicator">
  <view class="step" :class="{ active: currentStep >= 0 }">步骤1</view>
  <yt-dots :total="1" :activeIndex="currentStep > 0 ? 0 : -1" theme="forest" />
  <view class="step" :class="{ active: currentStep >= 1 }">步骤2</view>
  <yt-dots :total="1" :activeIndex="currentStep > 1 ? 0 : -1" theme="forest" />
  <view class="step" :class="{ active: currentStep >= 2 }">步骤3</view>
</view>
```

### 超出边界效果

```vue
<!-- 当activeIndex大于总数时，最后一个点会有特殊效果 -->
<yt-dots :total="3" :activeIndex="5" theme="magic-sky" />
```

### 完整示例

```vue
<script setup>
  import { ref } from 'vue'

  const activeIndex = ref(0)
  const totalDots = 5
  const themes = ['forest', 'ocean', 'magic', 'blossom', 'sunshine']

  function nextDot() {
    activeIndex.value = (activeIndex.value + 1) % totalDots
  }
</script>

<template>
  <view class="demo-container">
    <h3>轮播演示</h3>
    <view class="carousel-wrapper">
      <view class="slide-content">当前幻灯片 {{ activeIndex + 1 }} / {{ totalDots }}</view>
      <yt-dots
        :total="totalDots"
        :activeIndex="activeIndex"
        :theme="themes[activeIndex]"
        :size="28"
      />
    </view>
    <view class="controls">
      <button @click="() => (activeIndex = Math.max(0, activeIndex - 1))">上一个</button>
      <button @click="nextDot">下一个</button>
    </view>
  </view>
</template>
```
