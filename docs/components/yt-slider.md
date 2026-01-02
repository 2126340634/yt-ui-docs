# yt-slider 滑块组件

## 属性

| 属性名       | 类型             | 默认值  | 说明             |
| ------------ | ---------------- | ------- | ---------------- |
| `name`       | `string`         | `''`    | 表单字段名       |
| `modelValue` | `number \| null` | `null`  | 绑定值 (v-model) |
| `min`        | `number`         | `0`     | 最小值           |
| `max`        | `number`         | `100`   | 最大值           |
| `step`       | `number`         | `1`     | 步长             |
| `disabled`   | `boolean`        | `false` | 是否禁用         |
| `value`      | `number`         | `0`     | 当前值           |
| `showValue`  | `boolean`        | `true`  | 是否显示当前值   |
| `blockSize`  | `number`         | `20`    | 滑块大小(12-28)  |

## 事件

| 事件名              | 参数                 | 说明         |
| ------------------- | -------------------- | ------------ |
| `update:modelValue` | `modelValue: number` | v-model 更新 |
| `change`            | `value: number`      | 拖拽完成     |
| `changing`          | `value: number`      | 拖拽中       |

## 表单集成

支持表单字段注册。

## 示例

### 基本滑块

```vue
<yt-slider />
```

### 绑定值

```vue
<yt-slider v-model="value" />

<yt-slider :modelValue="progress" @update:modelValue="progress = $event" />
```

### 范围控制

```vue
<yt-slider :min="0" :max="100" />

<yt-slider :min="10" :max="50" />
```

### 步长控制

```vue
<yt-slider :step="5" />

<yt-slider :step="0.1" />
```

### 禁用状态

```vue
<yt-slider :disabled="true" />
```

### 隐藏数值

```vue
<yt-slider :showValue="false" />
```

### 滑块大小

```vue
<yt-slider :blockSize="12" />

<yt-slider :blockSize="20" />

<yt-slider :blockSize="28" />
```

### 表单字段

```vue
<yt-slider name="volume" :min="0" :max="100" />
```

### 事件处理

```vue
<yt-slider v-model="sliderValue" @change="handleChange" @changing="handleChanging" />
```

### 完整示例

```vue
<yt-slider
  name="brightness"
  v-model="brightness"
  :min="0"
  :max="100"
  :step="1"
  :blockSize="20"
  :showValue="true"
  @change="saveBrightness"
  @changing="updatePreview"
/>
```
