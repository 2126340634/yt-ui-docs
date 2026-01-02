# yt-notice-bar 通告栏组件

## 属性

| 属性名       | 类型                   | 默认值   | 说明                           |
| ------------ | ---------------------- | -------- | ------------------------------ |
| `theme`      | `ThemeColor \| 'none'` | `'none'` | 主题颜色/guide/theme-system.md |
| `width`      | `number \| string`     | `'100%'` | 通告栏宽度                     |
| `height`     | `number \| string`     | `45`     | 通告栏高度                     |
| `textSize`   | `number`               | `12`     | 文字大小                       |
| `animation`  | `boolean`              | `true`   | 是否开启动画                   |
| `duration`   | `number`               | `12000`  | 动画时长(毫秒)                 |
| `prefixFlex` | `number`               | `0.3`    | 前缀区域占比(0-1)              |
| `suffixFlex` | `number`               | `0.3`    | 后缀区域占比(0-1)              |

## 插槽

| 插槽名    | 说明         |
| --------- | ------------ |
| `default` | 通告文本内容 |
| `prefix`  | 前缀内容     |
| `suffix`  | 后缀内容     |

## 示例

### 基本通告栏

```vue
<yt-notice-bar>欢迎来到我们的应用！</yt-notice-bar>

<yt-notice-bar theme="forest">森林主题通告</yt-notice-bar>

<yt-notice-bar theme="ocean">海洋主题通告</yt-notice-bar>

<yt-notice-bar theme="magic">魔法主题通告</yt-notice-bar>

<yt-notice-bar theme="blossom">樱花主题通告</yt-notice-bar>

<yt-notice-bar theme="sunshine">阳光主题通告</yt-notice-bar>

<yt-notice-bar theme="classic">经典主题通告</yt-notice-bar>

<yt-notice-bar theme="forest-sky">森林星空主题</yt-notice-bar>

<yt-notice-bar theme="ocean-sky">海洋星空主题</yt-notice-bar>

<yt-notice-bar theme="magic-sky">魔法星空主题</yt-notice-bar>

<yt-notice-bar theme="blossom-sky">樱花星空主题</yt-notice-bar>

<yt-notice-bar theme="sunshine-sky">阳光星空主题</yt-notice-bar>
```

### 自定义尺寸

```vue
<yt-notice-bar :width="300" :height="40">固定宽度通告</yt-notice-bar>

<yt-notice-bar width="90%" :height="50">相对宽度通告</yt-notice-bar>

<yt-notice-bar :width="400" :height="60" :textSize="16">大号文字通告</yt-notice-bar>
```

### 长文本滚动

```vue
<yt-notice-bar>
  这是一条很长很长的通告消息，会自动从右向左滚动显示，直到完整显示所有内容...
</yt-notice-bar>

<yt-notice-bar>
  【系统公告】尊敬的用户，系统将于今晚12点进行维护升级，预计持续2小时，给您带来不便敬请谅解！
</yt-notice-bar>
```

### 控制动画

```vue
<yt-notice-bar :animation="false">静态通告消息</yt-notice-bar>

<yt-notice-bar :animation="isScrolling" @click="toggleAnimation">
  {{ isScrolling ? '滚动中' : '已暂停' }}
</yt-notice-bar>

<yt-notice-bar :duration="20000">慢速滚动通告</yt-notice-bar>

<yt-notice-bar :duration="5000">快速滚动通告</yt-notice-bar>
```

### 带前缀后缀

```vue
<yt-notice-bar>
  <template #prefix>
    <yt-icon name="Speaker" :size="16" />
  </template>
  系统通知：新版本已发布，请及时更新！
  <template #suffix>
    <yt-line @click="viewDetails">查看详情</yt-line>
  </template>
</yt-notice-bar>
```

### 自定义占比

```vue
<yt-notice-bar :prefixFlex="0.2" :suffixFlex="0.4">
  <template #prefix>
    <view class="urgent-tag">紧急</view>
  </template>
  紧急通知：服务器将于5分钟后重启
  <template #suffix>
    <view class="actions">
      <yt-line @click="acknowledge">知道了</yt-line>
      <yt-line @click="dismiss">忽略</yt-line>
    </view>
  </template>
</yt-notice-bar>
```

### 不同类型通告

```vue
<!-- 促销通告 -->
<yt-notice-bar theme="sunshine">
  <template #prefix>
    <yt-icon name="Discount" :size="16" />
  </template>
  限时优惠：全场商品8折，仅限今天！
  <template #suffix>
    <yt-line @click="goToPromotion">立即抢购</yt-line>
  </template>
</yt-notice-bar>

<!-- 系统通告 -->
<yt-notice-bar theme="magic">
  <template #prefix>
    <yt-icon name="System" :size="16" />
  </template>
  【系统维护】今晚00:00-02:00系统升级，期间无法访问
  <template #suffix>
    <yt-line @click="viewSchedule">查看时间表</yt-line>
  </template>
</yt-notice-bar>

<!-- 活动通告 -->
<yt-notice-bar theme="blossom">
  <template #prefix>
    <yt-icon name="Gift" :size="16" />
  </template>
  新活动上线：邀请好友得积分，最高可获1000积分！
  <template #suffix>
    <yt-line @click="joinActivity">参与活动</yt-line>
  </template>
</yt-notice-bar>
```

### 多行通告

```vue
<view class="multi-notice">
  <yt-notice-bar :height="30" :textSize="12">
    第一条通告消息...
  </yt-notice-bar>
  <yt-notice-bar :height="30" :textSize="12" theme="ocean">
    第二条通告消息...
  </yt-notice-bar>
  <yt-notice-bar :height="30" :textSize="12" theme="forest">
    第三条通告消息...
  </yt-notice-bar>
</view>
```

### 可点击通告

```vue
<yt-notice-bar @click="handleNoticeClick">
  <template #prefix>
    <yt-icon name="Bell" :size="16" />
  </template>
  点击查看最新公告
  <template #suffix>
    <yt-icon name="ArrowRight" :size="12" />
  </template>
</yt-notice-bar>
```

### 完整示例

```vue
<script setup>
  import { ref } from 'vue'

  const notices = ref([
    {
      id: 1,
      theme: 'forest-sky',
      text: '欢迎新用户！首次登录赠送100积分',
      icon: 'Gift',
      action: '去领取'
    },
    {
      id: 2,
      theme: 'ocean-sky',
      text: '系统维护通知：今晚22:00-24:00进行数据库优化',
      icon: 'System',
      action: '查看详情'
    },
    {
      id: 3,
      theme: 'magic-sky',
      text: '限时优惠：购买会员享8折优惠，仅限今天',
      icon: 'Discount',
      action: '立即购买'
    }
  ])

  const currentNoticeIndex = ref(0)
  const noticeAnimation = ref(true)

  function nextNotice() {
    currentNoticeIndex.value = (currentNoticeIndex.value + 1) % notices.value.length
  }

  function pauseNotice() {
    noticeAnimation.value = false
  }

  function resumeNotice() {
    noticeAnimation.value = true
  }

  function handleNoticeAction() {
    const notice = notices.value[currentNoticeIndex.value]
    switch (notice.id) {
      case 1:
        navigateTo('/points')
        break
      case 2:
        showMaintenanceDetails()
        break
      case 3:
        navigateTo('/vip')
        break
    }
  }
</script>

<template>
  <view class="notice-container">
    <yt-notice-bar
      :theme="notices[currentNoticeIndex].theme"
      :animation="noticeAnimation"
      :duration="15000"
      :prefixFlex="0.2"
      :suffixFlex="0.3"
      @click="handleNoticeClick"
    >
      <template #prefix>
        <view class="notice-prefix">
          <yt-icon
            :name="notices[currentNoticeIndex].icon"
            :size="16"
          />
          <span class="notice-type">公告</span>
        </view>
      </template>

      {{ notices[currentNoticeIndex].text }}

      <template #suffix>
        <view class="notice-actions">
          <yt-line
            @click.stop="handleNoticeAction"
            :size="12"
          >
            {{ notices[currentNoticeIndex].action }}
          </yt-line>
          <view class="notice-controls">
            <yt-icon
              v-if="noticeAnimation"
              name="Pause"
              :size="12"
              @click.stop="pauseNotice"
            />
            <yt-icon
              v-else
              name="Play"
              :size="12"
              @click.stop="resumeNotice"
            />
            <yt-icon
              name="Next"
              :size="12"
              @click.stop="nextNotice"
            />
          </view>
        </view>
      </template>
    </yt-notice-bar>

    <view class="notice-indicator">
      <view
        v-for="(notice, index) in notices"
        :key="notice.id"
        class="indicator-dot"
        :class="{ active: index === currentNoticeIndex }"
        @click="currentNoticeIndex = index"
      />
    </view>
  </view>
</template>
```
