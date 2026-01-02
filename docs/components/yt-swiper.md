# yt-swiper 轮播组件

## 属性

| 属性名              | 类型                         | 默认值         | 说明                           |
| ------------------- | ---------------------------- | -------------- | ------------------------------ |
| `theme`             | `ThemeColor \| 'none'`       | `'none'`       | 主题颜色/guide/theme-system.md |
| `disabled`          | `boolean`                    | `false`        | 是否禁用                       |
| `showBgColor`       | `boolean`                    | `false`        | 是否显示背景色                 |
| `list`              | `any[]`                      | `[]`           | 轮播数据列表                   |
| `modelValue`        | `number \| null`             | `null`         | 当前索引 (v-model)             |
| `width`             | `number \| string`           | `'100%'`       | 轮播宽度                       |
| `height`            | `number \| string`           | `'100%'`       | 轮播高度                       |
| `direction`         | `'horizontal' \| 'vertical'` | `'horizontal'` | 轮播方向                       |
| `duration`          | `number`                     | `500`          | 动画时长                       |
| `showArrow`         | `boolean`                    | `false`        | 是否显示箭头                   |
| `arrowColor`        | `'light' \| 'dark'`          | `'light'`      | 箭头颜色                       |
| `arrowSize`         | `number`                     | `16`           | 箭头大小                       |
| `showDots`          | `boolean`                    | `false`        | 是否显示指示点                 |
| `dotsSize`          | `number`                     | `32`           | 指示点大小                     |
| `maxDots`           | `number`                     | `7`            | 最大指示点数                   |
| `dotsSide`          | `'left' \| 'right'`          | `'right'`      | 垂直时指示点位置               |
| `dotsOffset`        | `number \| string`           | `'15%'`        | 指示点偏移                     |
| `loop`              | `boolean`                    | `true`         | 是否循环轮播                   |
| `autoplay`          | `boolean`                    | `false`        | 是否自动播放                   |
| `interval`          | `number`                     | `2000`         | 自动播放间隔                   |
| `type`              | `'default' \| 'card'`        | `'default'`    | 轮播类型                       |
| `activeCardScale`   | `number`                     | `0.8`          | 卡片激活缩放                   |
| `inactiveCardScale` | `number`                     | `0.6`          | 卡片非激活缩放                 |
| `cardGap`           | `number`                     | `25`           | 卡片间距                       |
| `borderRadius`      | `number \| string`           | `0`            | 圆角大小                       |

## 主题颜色

```vue
<yt-swiper theme="forest" :list="list" />

<yt-swiper theme="ocean" :list="list" />

<yt-swiper theme="magic" :list="list" />

<yt-swiper theme="blossom" :list="list" />

<yt-swiper theme="sunshine" :list="list" />

<yt-swiper theme="classic" :list="list" />

<yt-swiper theme="forest-sky" :list="list" />

<yt-swiper theme="ocean-sky" :list="list" />

<yt-swiper theme="magic-sky" :list="list" />

<yt-swiper theme="blossom-sky" :list="list" />

<yt-swiper theme="sunshine-sky" :list="list" />
```

## 插槽

| 插槽名        | 作用域参数                     | 说明       |
| ------------- | ------------------------------ | ---------- |
| `swiper-item` | `{ item: any, index: number }` | 轮播项内容 |

## 事件

| 事件名              | 参数                        | 说明         |
| ------------------- | --------------------------- | ------------ |
| `update:modelValue` | `modelValue: number`        | v-model 更新 |
| `click`             | `(e: Event, index: number)` | 点击轮播项   |
| `change`            | `index: number`             | 轮播切换     |

## 示例

### 基本轮播

```vue
<yt-swiper :list="list">
  <template v-slot:swiper-item="{ item }">
    <image :src="item.image" mode="aspectFill" />
  </template>
</yt-swiper>
```

### 水平轮播

```vue
<yt-swiper :list="list" direction="horizontal">
  <!-- 内容 -->
</yt-swiper>
```

### 垂直轮播

```vue
<yt-swiper :list="list" direction="vertical">
  <!-- 内容 -->
</yt-swiper>
```

### 显示箭头

```vue
<yt-swiper :list="list" :showArrow="true" />
```

### 浅色箭头

```vue
<yt-swiper :list="list" :showArrow="true" arrowColor="light" />
```

### 深色箭头

```vue
<yt-swiper :list="list" :showArrow="true" arrowColor="dark" />
```

### 显示指示点

```vue
<yt-swiper :list="list" :showDots="true" />
```

### 自动播放

```vue
<yt-swiper :list="list" :autoplay="true" :interval="3000" />
```

### 卡片轮播

```vue
<yt-swiper :list="list" type="card" :activeCardScale="0.9" :inactiveCardScale="0.7" />
```

### 非循环轮播

```vue
<yt-swiper :list="list" :loop="false" />
```

### 自定义尺寸

```vue
<yt-swiper :list="list" :width="300" :height="200" />
```

### 事件处理

```vue
<yt-swiper
  :list="list"
  v-model="currentIndex"
  @click="handleSwiperClick"
  @change="handleSwiperChange"
/>
```

### 完整示例

```vue
<yt-swiper
  theme="forest-sky"
  :list="bannerList"
  v-model="currentBanner"
  :autoplay="true"
  :interval="3000"
  :loop="true"
  :showArrow="true"
  :showDots="true"
  :dotsSize="24"
  :arrowColor="light"
  :type="default"
  :duration="500"
  @click="handleBannerClick"
  @change="handleBannerChange"
>
  <template v-slot:swiper-item="{ item, index }">
    <image :src="item.image" class="banner-image" mode="aspectFill" />
    <view class="banner-title">{{ item.title }}</view>
  </template>
</yt-swiper>
```
