# yt-popup 弹窗组件

## 属性

| 属性名                | 类型                                                 | 默认值          | 说明         |
| --------------------- | ---------------------------------------------------- | --------------- | ------------ |
| `width`               | `number \| string`                                   | `'70vw'`        | 弹窗宽度     |
| `height`              | `number \| string`                                   | `'70vh'`        | 弹窗高度     |
| `maxWidth`            | `number \| string`                                   | `'none'`        | 最大宽度     |
| `maxHeight`           | `number \| string`                                   | `'none'`        | 最大高度     |
| `bgColor`             | `string`                                             | `'#ffffff'`     | 背景颜色     |
| `overlayColor`        | `string`                                             | `'#00000080'`   | 遮罩颜色     |
| `visible`             | `boolean`                                            | `false`         | 是否显示     |
| `zIndex`              | `number`                                             | `1000`          | 层级         |
| `placement`           | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'`      | 弹出位置     |
| `borderRadius`        | `number \| string`                                   | `10`            | 圆角大小     |
| `duration`            | `number`                                             | `200`           | 动画时长     |
| `closeOnOverlayClick` | `boolean`                                            | `true`          | 点击遮罩关闭 |
| `destroyOnClose`      | `boolean`                                            | `false`         | 关闭时销毁   |
| `headerType`          | `'close-only' \| 'cancel-confirm' \| 'none'`         | `'none'`        | 头部类型     |
| `headerProps`         | `HeaderProps`                                        | `() => ({...})` | 头部配置     |

## HeaderProps 类型

```typescript
interface HeaderProps {
  title?: string           // 标题
  cancelName?: string      // 取消按钮文本
  confirmName?: string     // 确认按钮文本
  cancelFn?: () => void    // 取消回调
  confirmFn?: () => void   // 确认回调
  closeSide?: 'left' \| 'right'  // 关闭按钮位置
}
```

## 事件

| 事件名           | 参数             | 说明     |
| ---------------- | ---------------- | -------- |
| `update:visible` | `value: boolean` | 控制显示 |
| `overlayClick`   | `e: Event`       | 点击遮罩 |
| `open`           | -                | 开始打开 |
| `opened`         | -                | 打开完成 |
| `close`          | -                | 开始关闭 |
| `closed`         | -                | 关闭完成 |

## 示例

### 底部弹窗

```vue
<yt-popup :visible="show" placement="bottom">
  <view>内容</view>
</yt-popup>
```

### 顶部弹窗

```vue
<yt-popup :visible="show" placement="top">
  <view>顶部内容</view>
</yt-popup>
```

### 居中弹窗

```vue
<yt-popup :visible="show" placement="center" width="300" height="400">
  <view>居中弹窗</view>
</yt-popup>
```

### 侧边弹窗

```vue
<yt-popup :visible="show" placement="left" width="250">
  <view>左侧菜单</view>
</yt-popup>

<yt-popup :visible="show" placement="right" width="300">
  <view>右侧抽屉</view>
</yt-popup>
```

### 带标题弹窗

```vue
<yt-popup :visible="show" header-type="close-only" :header-props="{ title: '标题' }">
  <view>内容区</view>
</yt-popup>
```

### 带按钮弹窗

```vue
<yt-popup
  :visible="show"
  header-type="cancel-confirm"
  :header-props="{
    title: '确认删除',
    cancelFn: () => (show = false),
    confirmFn: handleDelete
  }"
>
  <view>确定要删除吗？</view>
</yt-popup>
```

### 自定义尺寸

```vue
<yt-popup :visible="show" :width="400" :height="300" maxWidth="90vw">
  <view>自定义尺寸</view>
</yt-popup>

<yt-popup :visible="show" width="80%" height="60vh">
  <view>百分比尺寸</view>
</yt-popup>
```

### 自定义样式

```vue
<yt-popup
  :visible="show"
  bgColor="#f8f9fa"
  overlayColor="rgba(0,0,0,0.4)"
  :borderRadius="20"
  :duration="300"
>
  <view>自定义样式</view>
</yt-popup>
```

### 事件处理

```vue
<yt-popup
  :visible="show"
  @overlayClick="handleOverlay"
  @open="handleOpen"
  @opened="handleOpened"
  @close="handleClose"
  @closed="handleClosed"
>
  <view>事件演示</view>
</yt-popup>
```

### 控制关闭

```vue
<yt-popup :visible="show" :closeOnOverlayClick="false">
  <view>点击遮罩不关闭</view>
  <yt-button @click="show = false">手动关闭</yt-button>
</yt-popup>
```

### 销毁控制

```vue
<yt-popup :visible="show" :destroyOnClose="true">
  <view>关闭时销毁</view>
</yt-popup>
```

### 完整示例

```vue
<yt-popup
  :visible="showModal"
  placement="center"
  :width="350"
  :height="450"
  :maxWidth="400"
  :maxHeight="500"
  bgColor="#fff"
  overlayColor="rgba(0,0,0,0.5)"
  :zIndex="1000"
  :borderRadius="12"
  :duration="300"
  :closeOnOverlayClick="true"
  :destroyOnClose="false"
  header-type="cancel-confirm"
  :header-props="{
    title: '编辑信息',
    cancelName: '取消',
    confirmName: '保存',
    cancelFn: () => (showModal = false),
    confirmFn: handleSave,
    closeSide: 'right'
  }"
  @overlayClick="handleOverlay"
  @opened="onModalOpened"
  @closed="onModalClosed"
>
  <view class="form">
    <yt-input v-model="form.name" placeholder="姓名" />
    <yt-input v-model="form.email" placeholder="邮箱" />
  </view>
</yt-popup>
```
