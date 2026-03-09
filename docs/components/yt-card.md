# yt-card 卡片组件

## 属性

| 属性名         | 类型               | 默认值                            | 说明                           |
| -------------- | ------------------ | --------------------------------- | ------------------------------ |
| `theme`        | `ThemeColor`       | `'classic'`                       | [主题颜色](/guide/theme-system.md) |
| `width`        | `number \| string` | `'100%'`                          | 卡片宽度                       |
| `height`       | `number \| string` | `200`                             | 卡片高度                       |
| `borderRadius` | `number \| string` | `10`                              | 圆角大小                       |
| `borderColor`  | `string`           | `'#eee'`                          | 边框颜色                       |
| `shadow`       | `string`           | `'0 1px 4px rgba(0, 0, 0, 0.25)'` | 阴影样式                       |
| `padding`      | `number \| string` | `8`                               | 内边距                         |
| `margin`       | `number \| string` | `8`                               | 外边距                         |
| `spacing`      | `number \| string` | `8`                               | 头部与内容间距                 |

## 插槽

| 插槽名    | 说明         |
| --------- | ------------ |
| `default` | 卡片主体内容 |
| `header`  | 卡片头部内容 |

## 事件

| 事件名  | 参数       | 说明     |
| ------- | ---------- | -------- |
| `click` | `e: Event` | 点击卡片 |

## 示例

### 基本卡片

```vue
<yt-card>卡片内容</yt-card>

<yt-card theme="forest">森林绿卡片</yt-card>

<yt-card theme="ocean">海洋蓝卡片</yt-card>

<yt-card theme="magic">魔法紫卡片</yt-card>

<yt-card theme="blossom">樱花粉卡片</yt-card>

<yt-card theme="sunshine">阳光橙卡片</yt-card>

<yt-card theme="classic">经典白卡片</yt-card>

<yt-card theme="forest-sky">森林星空卡片</yt-card>

<yt-card theme="ocean-sky">海洋星空卡片</yt-card>

<yt-card theme="magic-sky">魔法星空卡片</yt-card>

<yt-card theme="blossom-sky">樱花星空卡片</yt-card>

<yt-card theme="sunshine-sky">阳光星空卡片</yt-card>
```

### 带标题卡片

```vue
<yt-card theme="forest">
  <template #header>标题</template>
  卡片内容
</yt-card>

<yt-card theme="ocean">
  <template #header>海洋主题</template>
  这里是一些关于海洋的内容描述...
</yt-card>
```

### 自定义尺寸

```vue
<yt-card :width="300" :height="150" theme="magic">固定尺寸卡片</yt-card>

<yt-card width="80%" :height="200" theme="blossom">宽度百分比卡片</yt-card>
```

### 自定义样式

```vue
<yt-card
  :borderRadius="20"
  borderColor="#4CAF50"
  shadow="0 4px 12px rgba(0, 0, 0, 0.15)"
  theme="sunshine"
>
  自定义样式卡片
</yt-card>

<yt-card :padding="16" :margin="12" :spacing="12" theme="classic">
  <template #header>标题</template>
  增加间距的卡片
</yt-card>
```

### 事件处理

```vue
<yt-card @click="handleCardClick" theme="forest-sky">
  点击我
</yt-card>
```

### 复杂内容卡片

```vue
<yt-card theme="ocean-sky">
  <template #header>
    <view class="card-header">
      <text>重要通知</text>
      <yt-icon name="bell" size="16" />
    </view>
  </template>
  <view class="card-content">
    <text>这里是一段重要的通知内容...</text>
    <yt-button theme="ocean-sky" size="small">查看详情</yt-button>
  </view>
</yt-card>
```

### 完整示例

```vue
<yt-card
  theme="magic-sky"
  :width="350"
  :height="250"
  :borderRadius="15"
  borderColor="#7E57C2"
  shadow="0 6px 20px rgba(126, 87, 194, 0.2)"
  :padding="20"
  :margin="16"
  :spacing="12"
  @click="handleCardClick"
>
  <template #header>
    <view class="header-content">
      <text>魔法主题卡片</text>
      <yt-badge theme="magic-sky" :count="3" />
    </view>
  </template>
  <view class="main-content">
    <text>这是一个完整的卡片示例，包含了自定义尺寸、样式、间距和插槽内容。</text>
    <view class="actions">
      <yt-button theme="magic-sky" size="small">按钮1</yt-button>
      <yt-button theme="magic-sky" plain size="small">按钮2</yt-button>
    </view>
  </view>
</yt-card>
```
