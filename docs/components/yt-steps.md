# yt-steps 步骤条组件

## 属性

| 属性名        | 类型                         | 默认值         | 说明                           |
| ------------- | ---------------------------- | -------------- | ------------------------------ |
| `theme`       | `ThemeColor`                 | `'classic'`    | 主题颜色/guide/theme-system.md |
| `activeIndex` | `number`                     | `0`            | 当前激活步骤索引               |
| `list`        | `StepItem[]`                 | `[]`           | 步骤列表                       |
| `gap`         | `number`                     | `8`            | 步骤间距                       |
| `direction`   | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向                       |

## StepItem 类型

```typescript
interface StepItem {
  text?: string // 步骤文本
  icon?: string // 图标名称或图片地址
}
```

## 主题颜色

```vue
<yt-steps theme="forest" :list="stepList" />

<yt-steps theme="ocean" :list="stepList" />

<yt-steps theme="magic" :list="stepList" />

<yt-steps theme="blossom" :list="stepList" />

<yt-steps theme="sunshine" :list="stepList" />

<yt-steps theme="classic" :list="stepList" />

<yt-steps theme="forest-sky" :list="stepList" />

<yt-steps theme="ocean-sky" :list="stepList" />

<yt-steps theme="magic-sky" :list="stepList" />

<yt-steps theme="blossom-sky" :list="stepList" />

<yt-steps theme="sunshine-sky" :list="stepList" />
```

## 示例

### 水平步骤条

```vue
<yt-steps :list="[{ text: '第一步' }, { text: '第二步' }, { text: '第三步' }]" />
```

### 垂直步骤条

```vue
<yt-steps
  direction="vertical"
  :list="[{ text: '提交订单' }, { text: '付款成功' }, { text: '商品出库' }, { text: '确认收货' }]"
/>
```

### 自定义激活步骤

```vue
<yt-steps
  :activeIndex="2"
  :list="[{ text: '已提交' }, { text: '审核中' }, { text: '已完成' }, { text: '已评价' }]"
/>
```

### 带图标步骤

```vue
<yt-steps
  :list="[
    { text: '购物车', icon: '/cart.png' },
    { text: '订单确认', icon: '/document.png' },
    { text: '支付', icon: '/payment.png' },
    { text: '完成', icon: '/check.png' }
  ]"
/>
```

### 自定义间距

```vue
<yt-steps :gap="20" :list="stepList" />

<yt-steps :gap="12" direction="vertical" :list="stepList" />
```

### 图片图标

```vue
<yt-steps
  :list="[
    { text: '申请', icon: '/icons/apply.png' },
    { text: '审核', icon: '/icons/review.png' },
    { text: '完成', icon: '/icons/complete.png' }
  ]"
/>
```

### 无文本步骤

```vue
<yt-steps :list="[{ icon: 'Home' }, { icon: 'Community' }, { icon: 'Me' }]" />
```

### 完整示例

```vue
<yt-steps
  theme="forest-sky"
  :activeIndex="currentStep"
  direction="horizontal"
  :gap="16"
  :list="[
    { text: '选择商品', icon: '/shop.png' },
    { text: '填写地址', icon: '/location.png' },
    { text: '支付订单', icon: '/payment.png' },
    { text: '等待发货', icon: '/delivery.png' },
    { text: '确认收货', icon: '/check.png' }
  ]"
/>
```
