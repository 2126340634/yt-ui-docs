# yt-virtual-list 虚拟列表组件



## 属性



| 属性名             | 类型                           | 默认值       | 说明                                                         |
| ------------------ | ------------------------------ | ------------ | ------------------------------------------------------------ |
| `list`             | `any[]`                        | `[]`         | 数据列表                                                     |
| `itemKey`          | `string`                       | `''`         | 列表项唯一键                                                 |
| `width`            | `number \| string`             | `'100%'`     | 列表宽度                                                     |
| `height`           | `number \| string`             | `'100%'`     | 列表高度                                                     |
| `chunkSize`        | `number`                       | `10`         | 每个分块的数量                                               |
| `estimatedSize`    | `number`                       | `1000`       | 每个分块的预估高度 (px)，用于非可见分块的占位                |
| `showScrollbar`    | `boolean`                      | `false`      | 是否显示滚动条                                               |
| `refresher`        | `boolean`                      | `false`      | 是否开启下拉刷新                                             |
| `threshold`        | `number`                       | `50`         | 下拉刷新阈值                                                 |
| `triggered`        | `boolean`                      | `false`      | 是否触发刷新                                                 |
| `refresherBgColor` | `string`                       | `'#fff'`     | 下拉刷新背景色                                               |
| `refresherStyle`   | `'black' \| 'white' \| 'none'` | `'black'`    | 下拉刷新样式                                                 |



## 插槽



| 插槽名      | 作用域参数                     | 说明       |
| ----------- | ------------------------------ | ---------- |
| `list-item` | `{ item: any, index: number }` | 列表项内容 |



## 事件



| 事件名          | 参数     | 说明         |
| --------------- | -------- | ------------ |
| `scroll`        | `e: any` | 滚动时触发   |
| `scrollToUpper` | -        | 滚动到顶部   |
| `scrollToLower` | -        | 滚动到底部   |
| `pull`          | -        | 下拉刷新触发 |
| `refresh`       | -        | 刷新状态     |
| `restore`       | -        | 刷新结束     |
| `abort`         | -        | 刷新中断     |



## 工作原理

本组件采用**分块虚拟化**策略优化长列表性能：
- 将列表按 `chunkSize` 切分为多个分块
- 通过 Intersection Observer 监测分块可见性
- 仅渲染视口内（及前后600px缓冲区）的分块
- 非可见分块使用 `estimatedSize` 高度占位



## 示例



### 基本虚拟列表



```vue

<yt-virtual-list :list="listData" itemKey="id" :height="500">

  <template v-slot:list-item="{ item, index }">

    <view class="list-item">{{ item.name }}</view>

  </template>

</yt-virtual-list>

```



### 自定义分块配置



```vue

<yt-virtual-list

  :list="largeList"

  itemKey="id"

  :chunkSize="20"

  :estimatedSize="1200"

  :height="600"

>

  <template v-slot:list-item="{ item, index }">

    <view class="custom-item">第{{ index + 1 }}项: {{ item.content }}</view>

  </template>

</yt-virtual-list>

```



### 显示滚动条



```vue

<yt-virtual-list :list="listData" itemKey="id" :showScrollbar="true">

  <!-- 内容 -->

</yt-virtual-list>

```



### 下拉刷新



```vue

<template>

  <yt-virtual-list

    :list="listData"

    itemKey="id"

    :refresher="true"

    :triggered="isRefreshing"

    @refresh="handleRefresh"

    @restore="handleRestore"

  >

    <template v-slot:list-item="{ item }">

      <view>{{ item.text }}</view>

    </template>

  </yt-virtual-list>

</template>



<script setup>

import { ref } from 'vue'



const isRefreshing = ref(false)

const listData = ref([/* 数据 */])



const handleRefresh = () => {

  isRefreshing.value = true

  // 执行刷新逻辑

  setTimeout(() => {

    // 更新数据

    isRefreshing.value = false

  }, 1000)

}



const handleRestore = () => {

  isRefreshing.value = false

}

</script>

```



### 事件处理



```vue

<yt-virtual-list

  :list="listData"

  itemKey="id"

  @scroll="handleScroll"

  @scrollToUpper="loadMoreTop"

  @scrollToLower="loadMoreBottom"

  @refresh="handleRefresh"

>

  <template v-slot:list-item="{ item, index }">

    <view>第{{ index }}项: {{ item.title }}</view>

  </template>

</yt-virtual-list>

```



### 长列表性能优化



```vue

<yt-virtual-list

  :list="largeList"

  itemKey="id"

  :height="800"

  :chunkSize="15"

  :estimatedSize="1500"

  :showScrollbar="false"

>

  <template v-slot:list-item="{ item, index }">

    <view class="list-row">

      第{{ index + 1 }}项: {{ item.name }}

    </view>

  </template>

</yt-virtual-list>

```



### 完整示例



```vue

<template>

  <yt-virtual-list

    :list="messages"

    itemKey="id"

    :height="600"

    :refresher="true"

    :triggered="refreshing"

    :chunkSize="10"

    :estimatedSize="1000"

    :showScrollbar="true"

    @scroll="handleScroll"

    @scrollToUpper="loadHistory"

    @refresh="refreshMessages"

    @restore="onRefreshRestore"

  >

    <template v-slot:list-item="{ item, index }">

      <view class="message-item" :class="{ 'own': item.isOwn }">

        <view class="avatar">{{ item.avatar }}</view>

        <view class="content">{{ item.content }}</view>

        <view class="time">{{ item.time }}</view>

      </view>

    </template>

  </yt-virtual-list>

</template>



<script setup>

import { ref } from 'vue'



const refreshing = ref(false)

const messages = ref([/* 消息列表 */])



const handleScroll = (e) => {

  console.log('滚动位置:', e.detail.scrollTop)

}



const loadHistory = () => {

  console.log('加载历史消息')

}



const refreshMessages = async () => {

  refreshing.value = true

  // 刷新数据逻辑

  setTimeout(() => {

    refreshing.value = false

  }, 1000)

}



const onRefreshRestore = () => {

  refreshing.value = false

}

</script>

```