# yt-divider 分割线组件

## 属性

| 属性名      | 类型                              | 默认值         | 说明       |
| ----------- | --------------------------------- | -------------- | ---------- |
| `direction` | `'horizontal' \| 'vertical'`      | `'horizontal'` | 分割线方向 |
| `align`     | `AlignType`                       | `'center'`     | 对齐方式   |
| `type`      | `'solid' \| 'dashed' \| 'dotted'` | `'solid'`      | 线条类型   |
| `margin`    | `number \| string`                | `32`           | 外边距     |
| `lineColor` | `string`                          | `'#DCDFE6'`    | 线条颜色   |
| `textColor` | `string`                          | `'#3e3e3e60'`  | 文字颜色   |
| `textSize`  | `number \| string`                | `16`           | 文字大小   |

## 插槽

| 插槽名    | 说明             |
| --------- | ---------------- |
| `default` | 分割线中间的文字 |

## 示例

### 水平分割线

```vue
<yt-divider />

<yt-divider direction="horizontal" />
```

### 垂直分割线

```vue
<view class="flex-row">
  <span>左侧内容</span>
  <yt-divider direction="vertical" />
  <span>右侧内容</span>
</view>
```

### 带文字分割线

```vue
<yt-divider>中间文字</yt-divider>

<yt-divider>或者</yt-divider>

<yt-divider>查看更多</yt-divider>
```

### 虚线分割线

```vue
<yt-divider type="dashed" />

<yt-divider type="dashed">虚线分割</yt-divider>
```

### 点线分割线

```vue
<yt-divider type="dotted" />

<yt-divider type="dotted">点线分割</yt-divider>
```

### 对齐方式

```vue
<yt-divider align="left">左对齐</yt-divider>

<yt-divider align="center">居中对齐</yt-divider>

<yt-divider align="right">右对齐</yt-divider>
```

### 自定义颜色

```vue
<yt-divider lineColor="#FF6B6B" textColor="#4ECDC4">自定义颜色</yt-divider>

<yt-divider lineColor="#3498db" textColor="#2ecc71" type="dashed">蓝色虚线绿色文字</yt-divider>
```

### 自定义间距

```vue
<yt-divider :margin="16">小间距</yt-divider>

<yt-divider :margin="48">大间距</yt-divider>

<yt-divider margin="2em">em单位间距</yt-divider>
```

### 自定义文字大小

```vue
<yt-divider :textSize="12">小字</yt-divider>

<yt-divider :textSize="20">大字</yt-divider>

<yt-divider textSize="1.2em">相对大小</yt-divider>
```

### 垂直带文字分割线

```vue
<view class="flex-row">
  <span>菜单</span>
  <yt-divider direction="vertical">|</yt-divider>
  <span>设置</span>
  <yt-divider direction="vertical">|</yt-divider>
  <span>关于</span>
</view>
```

### 复杂布局中的分割线

```vue
<view class="card">
  <h3>标题</h3>
  <p>内容描述...</p>
  <yt-divider :margin="20" />
  <view class="action-buttons">
    <yt-button>确定</yt-button>
    <yt-divider direction="vertical" :margin="10" />
    <yt-button type="secondary">取消</yt-button>
  </view>
</view>
```

### 完整示例

```vue
<view class="form-section">
  <h4>个人信息</h4>
  <yt-divider
    direction="horizontal"
    type="dashed"
    :margin="10"
    lineColor="#ccc"
    align="left"
  />
  <p>姓名、年龄等信息...</p>
</view>

<view class="flex-container">
  <view class="left-panel">
    <h4>左侧面板</h4>
  </view>
  <yt-divider
    direction="vertical"
    :margin="20"
    lineColor="#999"
    type="dotted"
  />
  <view class="right-panel">
    <h4>右侧面板</h4>
  </view>
</view>

<view class="footer">
  <yt-divider
    align="center"
    :margin="30"
    :textSize="14"
    textColor="#666"
  >
    已到达底部
  </yt-divider>
</view>
```
