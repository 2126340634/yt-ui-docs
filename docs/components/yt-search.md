# yt-search 搜索组件

## 属性

| 属性名        | 类型                   | 默认值             | 说明                               |
| ------------- | ---------------------- | ------------------ | ---------------------------------- |
| `modelValue`  | `string`               | `''`               | 绑定值 (v-model)                   |
| `value`       | `string`               | `''`               | 搜索值                             |
| `placeholder` | `string`               | `'请输入搜索内容'` | 占位文本                           |
| `disabled`    | `boolean`              | `false`            | 是否禁用                           |
| `focus`       | `boolean`              | `false`            | 是否自动聚焦                       |
| `autoBlur`    | `boolean`              | `true`             | 点击页面是否自动收起键盘           |

## 事件

| 事件名                 | 参数                                   | 说明             |
| ---------------------- | -------------------------------------- | ---------------- |
| `update:modelValue`    | `modelValue: string`                   | v-model 更新     |
| `input`                | `value: any`                           | 输入时触发       |
| `focus`                | `{ value: any; height: number }`       | 获得焦点时触发   |
| `blur`                 | `value: any`                           | 失去焦点时触发   |
| `confirm`              | `value: any`                           | 点击键盘完成按钮 |
| `keyboardHeightChange` | `{ height: number; duration: number }` | 键盘高度变化     |

## 示例

### 基本搜索

```vue
<yt-search />
```

> 搜索框统一采用业界常用的浅灰填充样式，无需主题配置。

> 搜索动作通过键盘的「搜索」确认键触发(监听 `confirm` 事件)，组件本身不渲染搜索按钮。

### 绑定数据

```vue
<yt-search v-model="keyword" />
```

### 自定义提示

```vue
<yt-search placeholder="搜索商品、品牌..." />
```

### 禁用状态

```vue
<yt-search :disabled="true" />
```

### 自动聚焦

```vue
<yt-search :focus="true" />
```

### 事件处理

```vue
<yt-search v-model="keyword" @input="handleInput" @confirm="handleConfirm" />
```

### 完整示例

```vue
<yt-search
  v-model="searchText"
  placeholder="请输入搜索内容"
  :focus="true"
  @confirm="handleSearch"
/>
```
