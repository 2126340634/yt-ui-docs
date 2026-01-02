# yt-icon 图标组件

## 属性

| 属性名   | 类型               | 默认值        | 说明         |
| -------- | ------------------ | ------------- | ------------ |
| `name`   | `string`           | `''`          | 图标名称     |
| `size`   | `number`           | `24`          | 图标大小     |
| `width`  | `number \| string` | `60`          | 图标宽度     |
| `height` | `number \| string` | `60`          | 图标高度     |
| `fit`    | `ImageMode`        | `'aspectFit'` | 图片适配模式 |

## 事件

| 事件名  | 参数     | 说明     |
| ------- | -------- | -------- |
| `click` | `e: any` | 点击图标 |

## 可用图标

```typescript
type IconName =
  | 'Home'
  | 'Course'
  | 'Community'
  | 'Me'
  | 'QRcode'
  | 'HomeActive'
  | 'CourseActive'
  | 'CommunityActive'
  | 'MeActive'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeftWhite'
  | 'ArrowRightWhite'
  | 'ArrowUpWhite'
  | 'ArrowDownWhite'
  | 'Calendar'
  | 'DefaultAvatar'
  | 'DoorEnter'
  | 'DoorExit'
  | 'Edit'
  | 'HotTopic'
  | 'Identity'
  | 'Official'
  | 'Passed'
  | 'Unpassed'
  | 'SuccessResult'
  | 'FailResult'
  | 'InfoResult'
  | 'Time'
  | 'Slider'
  | 'Close'
  | 'Search'
  | 'Plus'
  | 'Fail'
  | 'Done'
  | 'Empty'
  | 'Champion'
  | 'Error'
  | 'FirstPlace'
  | 'SecondPlace'
  | 'ThirdPlace'
  | 'Winner'
  | 'Read'
```

## 示例

### 基本图标

```vue
<yt-icon name="Home" />

<yt-icon name="Search" />

<yt-icon name="Close" />
```

### 不同大小

```vue
<yt-icon name="Home" :size="16" />

<yt-icon name="Home" :size="24" />

<yt-icon name="Home" :size="32" />

<yt-icon name="Home" :size="48" />
```

### 自定义宽高

```vue
<yt-icon name="DefaultAvatar" :width="80" :height="80" />

<yt-icon name="QRcode" width="100%" height="auto" />

<yt-icon name="ArrowLeft" :width="30" :height="30" />
```

### 图片模式

```vue
<yt-icon name="DefaultAvatar" fit="aspectFill" />

<yt-icon name="QRcode" fit="widthFix" />

<yt-icon name="Official" fit="scaleToFill" />
```

### 导航图标

```vue
<view class="nav-bar">
  <yt-icon name="Home" :size="20" />
  <yt-icon name="Course" :size="20" />
  <yt-icon name="Community" :size="20" />
  <yt-icon name="Me" :size="20" />
</view>
```

### 激活状态图标

```vue
<view class="tab-bar">
  <yt-icon :name="activeTab === 'home' ? 'HomeActive' : 'Home'" />
  <yt-icon :name="activeTab === 'course' ? 'CourseActive' : 'Course'" />
  <yt-icon :name="activeTab === 'community' ? 'CommunityActive' : 'Community'" />
  <yt-icon :name="activeTab === 'me' ? 'MeActive' : 'Me'" />
</view>
```

### 箭头图标

```vue
<view class="arrow-buttons">
  <yt-icon name="ArrowLeft" @click="goBack" />
  <yt-icon name="ArrowRight" @click="goForward" />
  <yt-icon name="ArrowUp" @click="scrollToTop" />
  <yt-icon name="ArrowDown" @click="scrollToBottom" />
</view>

<view class="white-arrows">
  <yt-icon name="ArrowLeftWhite" />
  <yt-icon name="ArrowRightWhite" />
  <yt-icon name="ArrowUpWhite" />
  <yt-icon name="ArrowDownWhite" />
</view>
```

### 状态图标

```vue
<view v-if="status === 'passed'">
  <yt-icon name="Passed" />
  <span>已通过</span>
</view>

<view v-if="status === 'unpassed'">
  <yt-icon name="Unpassed" />
  <span>未通过</span>
</view>

<view v-if="isOfficial">
  <yt-icon name="Official" />
  <span>官方认证</span>
</view>
```

### 结果图标

```vue
<view v-if="result === 'success'">
  <yt-icon name="SuccessResult" :size="32" />
  <span>操作成功</span>
</view>

<view v-if="result === 'fail'">
  <yt-icon name="FailResult" :size="32" />
  <span>操作失败</span>
</view>

<view v-if="result === 'info'">
  <yt-icon name="InfoResult" :size="32" />
  <span>提示信息</span>
</view>
```

### 时间相关

```vue
<view class="time-info">
  <yt-icon name="Time" :size="16" />
  <span>{{ formatTime(time) }}</span>
</view>

<view class="calendar">
  <yt-icon name="Calendar" />
  <span>选择日期</span>
</view>
```

### 空状态图标

```vue
<view v-if="list.length === 0" class="empty-state">
  <yt-icon name="Empty" :size="60" />
  <span>暂无数据</span>
</view>

<view v-if="isWinner" class="winner">
  <yt-icon name="Winner" :size="80" />
  <span>冠军!</span>
</view>
```

### 排名图标

```vue
<view class="ranking">
  <view v-if="rank === 1">
    <yt-icon name="FirstPlace" />
    <span>第一名</span>
  </view>
  <view v-if="rank === 2">
    <yt-icon name="SecondPlace" />
    <span>第二名</span>
  </view>
  <view v-if="rank === 3">
    <yt-icon name="ThirdPlace" />
    <span>第三名</span>
  </view>
</view>
```

### 事件处理

```vue
<yt-icon name="Close" :size="20" @click="handleClose" />

<yt-icon name="Search" :size="24" @click="handleSearch" />
```

### 组合使用

```vue
<view class="action-buttons">
  <view class="button" @click="edit">
    <yt-icon name="Edit" :size="20" />
    <span>编辑</span>
  </view>
  <view class="button" @click="search">
    <yt-icon name="Search" :size="20" />
    <span>搜索</span>
  </view>
  <view class="button" @click="add">
    <yt-icon name="Plus" :size="20" />
    <span>添加</span>
  </view>
</view>
```

### 完整示例

```vue
<view class="user-card">
  <view class="header">
    <yt-icon name="DefaultAvatar" :width="60" :height="60" fit="aspectFill" />
    <view class="user-info">
      <view class="name">
        <span>张三</span>
        <yt-icon v-if="isOfficial" name="Official" :size="16" />
      </view>
      <view class="status">
        <yt-icon v-if="isPassed" name="Passed" :size="14" />
        <span v-else>未认证</span>
      </view>
    </view>
  </view>
  <view class="actions">
    <view class="action" @click="sendMessage">
      <yt-icon name="DoorEnter" :size="20" />
      <span>发消息</span>
    </view>
    <view class="action" @click="viewProfile">
      <yt-icon name="Identity" :size="20" />
      <span>查看资料</span>
    </view>
    <view class="action" @click="close">
      <yt-icon name="Close" :size="20" />
      <span>关闭</span>
    </view>
  </view>
</view>
```
