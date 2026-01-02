# yt-virtual-list 虚拟列表组件

## 属性

| 属性名             | 类型                           | 默认值       | 说明             |
| ------------------ | ------------------------------ | ------------ | ---------------- |
| `list`             | `any[]`                        | `[]`         | 数据列表         |
| `itemKey`          | `string`                       | `''`         | 列表项唯一键     |
| `width`            | `number \| string`             | `'100%'`     | 列表宽度         |
| `height`           | `number \| string`             | `'100%'`     | 列表高度         |
| `direction`        | `'vertical' \| 'horizontal'`   | `'vertical'` | 滚动方向         |
| `buffer`           | `number`                       | `5`          | 预渲染缓冲数量   |
| `estimatedSize`    | `number`                       | `30`         | 预估项大小       |
| `showScrollbar`    | `boolean`                      | `false`      | 是否显示滚动条   |
| `refresher`        | `boolean`                      | `false`      | 是否开启下拉刷新 |
| `threshold`        | `number`                       | `50`         | 下拉刷新阈值     |
| `triggered`        | `boolean`                      | `false`      | 是否触发刷新     |
| `refresherBgColor` | `string`                       | `'#fff'`     | 下拉刷新背景色   |
| `refresherStyle`   | `'black' \| 'white' \| 'none'` | `'black'`    | 下拉刷新样式     |

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

## 示例

### 基本虚拟列表

```vue
<yt-virtual-list :list="listData" itemKey="id" :height="500">
  <template v-slot:list-item="{ item, index }">
    <view class="list-item">{{ item.name }}</view>
  </template>
</yt-virtual-list>
```

### 水平虚拟列表

```vue
<yt-virtual-list :list="listData" itemKey="id" :width="500" :height="100" direction="horizontal">
  <template v-slot:list-item="{ item }">
    <view class="horizontal-item">{{ item.title }}</view>
  </template>
</yt-virtual-list>
```

### 自定义尺寸

```vue
<yt-virtual-list
  :list="listData"
  itemKey="id"
  :width="375"
  :height="600"
  :estimatedSize="50"
  :buffer="10"
>
  <template v-slot:list-item="{ item }">
    <view class="item">{{ item.content }}</view>
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
<yt-virtual-list
  :list="listData"
  itemKey="id"
  :refresher="true"
  :triggered="isRefreshing"
  @pull="handlePull"
  @refresh="handleRefresh"
  @restore="handleRestore"
>
  <template v-slot:list-item="{ item }">
    <!-- 内容 -->
  </template>
</yt-virtual-list>
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
  <!-- 内容 -->
</yt-virtual-list>
```

### 长列表性能优化

```vue
<yt-virtual-list
  :list="largeList"
  itemKey="id"
  :height="800"
  :estimatedSize="60"
  :buffer="8"
  :showScrollbar="false"
>
  <template v-slot:list-item="{ item, index }">
    <view class="list-row" :style="{ height: index % 2 ? '80px' : '60px' }">
      第{{ index + 1 }}项: {{ item.name }}
    </view>
  </template>
</yt-virtual-list>
```

### 完整示例

```vue
<yt-virtual-list
  :list="messages"
  itemKey="id"
  :height="600"
  :refresher="true"
  :triggered="refreshing"
  :estimatedSize="80"
  :buffer="6"
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
```
