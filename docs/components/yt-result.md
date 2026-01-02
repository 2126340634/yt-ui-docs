# yt-result 结果页组件

## 属性

| 属性名 | 类型                            | 默认值      | 说明     |
| ------ | ------------------------------- | ----------- | -------- |
| `type` | `'success' \| 'fail' \| 'info'` | `'success'` | 结果类型 |
| `size` | `number`                        | `24`        | 图标大小 |

## 插槽

| 插槽名    | 说明         |
| --------- | ------------ |
| `default` | 结果文本内容 |

## 示例

### 成功结果

```vue
<yt-result type="success">操作成功</yt-result>
```

### 失败结果

```vue
<yt-result type="fail">操作失败</yt-result>
```

### 提示结果

```vue
<yt-result type="info">提示信息</yt-result>
```

### 自定义尺寸

```vue
<yt-result :size="32" type="success">成功</yt-result>

<yt-result :size="40" type="fail">失败</yt-result>

<yt-result :size="48" type="info">提示</yt-result>
```

### 页面结果

```vue
<template v-if="status === 'success'">
  <yt-result type="success">提交成功</yt-result>
  <yt-button @click="goBack">返回</yt-button>
</template>
```

### 加载后结果

```vue
<template v-if="loading">
  <yt-loading />
</template>
<template v-else-if="result === 'success'">
  <yt-result type="success">加载成功</yt-result>
</template>
<template v-else>
  <yt-result type="fail">加载失败</yt-result>
  <yt-button @click="retry">重试</yt-button>
</template>
```

### 表单结果

```vue
<template v-if="submitStatus === 'success'">
  <yt-result type="success">表单提交成功</yt-result>
  <p>我们会在24小时内处理您的请求</p>
</template>
<template v-else-if="submitStatus === 'fail'">
  <yt-result type="fail">提交失败</yt-result>
  <p>请检查网络后重试</p>
  <yt-button @click="resubmit">重新提交</yt-button>
</template>
<template v-else>
  <!-- 表单内容 -->
</template>
```

### 支付结果

```vue
<yt-result :type="paymentStatus" :size="60">
  {{ paymentStatus === 'success' ? '支付成功' : '支付失败' }}
</yt-result>
<view class="payment-info">
  <p>订单号: {{ orderId }}</p>
  <p>金额: ¥{{ amount }}</p>
</view>
<view class="actions">
  <yt-button @click="viewOrder">查看订单</yt-button>
  <yt-button @click="goHome">返回首页</yt-button>
</view>
```

### 完整示例

```vue
<yt-result type="success" :size="80">
  注册成功
</yt-result>
<view class="result-details">
  <p>您的账号已激活</p>
  <p>邮箱: {{ user.email }}</p>
  <p>欢迎加入我们！</p>
</view>
<view class="result-actions">
  <yt-button @click="completeSetup">完善资料</yt-button>
  <yt-button @click="skipToHome" plain>跳过</yt-button>
</view>
```
