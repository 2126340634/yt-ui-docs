# yt-line 链接/文本组件

## 属性

| 属性名      | 类型                                                       | 默认值      | 说明           |
| ----------- | ---------------------------------------------------------- | ----------- | -------------- |
| `type`      | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | 链接类型       |
| `size`      | `number \| string`                                         | `16`        | 字体大小       |
| `disabled`  | `boolean`                                                  | `false`     | 是否禁用       |
| `underline` | `boolean`                                                  | `true`      | 是否显示下划线 |
| `padStart`  | `number \| string`                                         | `0`         | 左侧内边距     |
| `padEnd`    | `number \| string`                                         | `0`         | 右侧内边距     |

## 插槽

| 插槽名    | 说明         |
| --------- | ------------ |
| `default` | 链接文本内容 |
| `prefix`  | 前缀内容     |
| `suffix`  | 后缀内容     |

## 事件

| 事件名  | 参数     | 说明     |
| ------- | -------- | -------- |
| `click` | `e: any` | 点击事件 |

## 示例

### 基本链接

```vue
<yt-line>普通链接</yt-line>

<yt-line type="primary">主要链接</yt-line>

<yt-line type="success">成功链接</yt-line>

<yt-line type="warning">警告链接</yt-line>

<yt-line type="error">错误链接</yt-line>

<yt-line type="info">信息链接</yt-line>
```

### 无下划线

```vue
<yt-line :underline="false">无下划线链接</yt-line>

<yt-line type="success" :underline="false">成功无下划线</yt-line>
```

### 自定义大小

```vue
<yt-line :size="12">小号链接</yt-line>

<yt-line :size="20">大号链接</yt-line>

<yt-line :size="24">特大号链接</yt-line>

<yt-line size="1.2em">相对大小</yt-line>
```

### 禁用状态

```vue
<yt-line :disabled="true">禁用链接</yt-line>

<yt-line type="success" :disabled="true">禁用成功链接</yt-line>
```

### 间距控制

```vue
<yt-line :padStart="10">左侧间距</yt-line>

<yt-line :padEnd="20">右侧间距</yt-line>

<yt-line :padStart="8" :padEnd="8">两侧间距</yt-line>
```

### 带前后缀

```vue
<yt-line>
  <template #prefix>
    <yt-icon name="ArrowLeft" :size="12" />
  </template>
  返回
</yt-line>

<yt-line>
  更多
  <template #suffix>
    <yt-icon name="ArrowRight" :size="12" />
  </template>
</yt-line>

<yt-line>
  <template #prefix>
    <yt-icon name="Edit" :size="14" />
  </template>
  编辑
  <template #suffix>
    <span class="badge">3</span>
  </template>
</yt-line>
```

### 事件处理

```vue
<yt-line @click="handleLinkClick">点击我</yt-line>

<yt-line type="error" @click="handleDelete">删除</yt-line>

<yt-line :disabled="isLoading" @click="handleLoadMore">
  {{ isLoading ? '加载中...' : '加载更多' }}
</yt-line>
```

### 导航链接

```vue
<view class="nav-links">
  <yt-line @click="switchTab('home')">首页</yt-line>
  <yt-line @click="switchTab('about')">关于</yt-line>
  <yt-line @click="switchTab('contact')">联系</yt-line>
  <yt-line @click="switchTab('help')">帮助</yt-line>
</view>
```

### 操作链接

```vue
<view class="action-links">
  <yt-line type="primary" @click="editItem(item)">编辑</yt-line>
  <yt-line type="success" @click="viewDetails(item)">查看</yt-line>
  <yt-line type="warning" @click="archiveItem(item)">归档</yt-line>
  <yt-line type="error" @click="deleteItem(item)">删除</yt-line>
</view>
```

### 表单链接

```vue
<view class="form-footer">
  <yt-line @click="showForgotPassword">忘记密码？</yt-line>
  <yt-line type="primary" @click="showRegister">立即注册</yt-line>
</view>

<view class="agreement">
  <yt-line :underline="false">已阅读并同意</yt-line>
  <yt-line @click="showUserAgreement">《用户协议》</yt-line>
  <yt-line :underline="false">和</yt-line>
  <yt-line @click="showPrivacyPolicy">《隐私政策》</yt-line>
</view>
```

### 组合使用

```vue
<view class="card-footer">
  <view class="left-actions">
    <yt-line :size="14" @click="likeItem">
      <template #prefix>
        <yt-icon name="Plus" :size="12" />
      </template>
      赞
    </yt-line>
    <yt-line :size="14" @click="commentItem">
      <template #prefix>
        <yt-icon name="Edit" :size="12" />
      </template>
      评论
    </yt-line>
  </view>
  <view class="right-actions">
    <yt-line :size="14" @click="shareItem">分享</yt-line>
    <yt-line :size="14" @click="moreActions">更多</yt-line>
  </view>
</view>
```

### 完整示例

```vue
<script setup>
  function handleViewAll() {
    uni.navigateTo({ url: '/pages/list/index' })
  }

  function handleContactSupport() {
    uni.makePhoneCall({ phoneNumber: '400-123-4567' })
  }

  function handleReportIssue() {
    uni.navigateTo({ url: '/pages/report/index' })
  }
</script>

<template>
  <view class="page-footer">
    <view class="quick-links">
      <yt-line
        type="info"
        :size="14"
        :padStart="8"
        :padEnd="8"
        @click="handleViewAll"
      >
        <template #prefix>
          <yt-icon
            name="ArrowRight"
            :size="12"
          />
        </template>
        查看全部
      </yt-line>

      <yt-line
        type="success"
        :size="14"
        :padStart="8"
        :padEnd="8"
        :underline="false"
        @click="handleContactSupport"
      >
        <template #prefix>
          <yt-icon
            name="Phone"
            :size="12"
          />
        </template>
        联系客服
      </yt-line>

      <yt-line
        type="warning"
        :size="14"
        :padStart="8"
        :padEnd="8"
        @click="handleReportIssue"
      >
        <template #prefix>
          <yt-icon
            name="Alert"
            :size="12"
          />
        </template>
        问题反馈
      </yt-line>
    </view>

    <view class="legal-links">
      <yt-line
        :size="12"
        :underline="false"
        :disabled="true"
      >
        © 2024 版权所有
      </yt-line>
      <yt-line
        :size="12"
        @click="showTerms"
      >
        使用条款
      </yt-line>
      <yt-line
        :size="12"
        @click="showPrivacy"
      >
        隐私政策
      </yt-line>
      <yt-line
        :size="12"
        :disabled="!hasUpdate"
        @click="checkUpdate"
      >
        {{ hasUpdate ? '检查更新' : '已是最新版' }}
      </yt-line>
    </view>
  </view>
</template>
```
