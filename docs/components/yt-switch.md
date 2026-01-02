# yt-switch 开关组件

## 属性

| 属性名       | 类型                     | 默认值     | 说明             |
| ------------ | ------------------------ | ---------- | ---------------- |
| `name`       | `string`                 | `''`       | 表单字段名       |
| `modelValue` | `boolean \| null`        | `null`     | 绑定值 (v-model) |
| `checked`    | `boolean`                | `false`    | 是否选中         |
| `disabled`   | `boolean`                | `false`    | 是否禁用         |
| `type`       | `'switch' \| 'checkbox'` | `'switch'` | 开关类型         |

## 事件

| 事件名              | 参数                  | 说明         |
| ------------------- | --------------------- | ------------ |
| `update:modelValue` | `modelValue: boolean` | v-model 更新 |
| `change`            | `value: boolean`      | 开关变化     |

## 表单集成

支持表单字段注册。

## 示例

### 基本开关

```vue
<yt-switch />
```

### 绑定值

```vue
<yt-switch v-model="isActive" />

<yt-switch :modelValue="checked" @update:modelValue="checked = $event" />
```

### 默认选中

```vue
<yt-switch :checked="true" />

<yt-switch v-model="defaultOn" :checked="true" />
```

### 禁用状态

```vue
<yt-switch :disabled="true" />

<yt-switch :disabled="isLoading" />
```

### 复选框类型

```vue
<yt-switch type="checkbox" />

<yt-switch type="checkbox" v-model="agree" />
```

### 表单字段

```vue
<yt-switch name="notification" />
```

### 事件处理

```vue
<yt-switch v-model="switchValue" @change="handleSwitchChange" />
```

### 完整示例

```vue
<yt-switch
  name="autoSave"
  v-model="autoSave"
  :disabled="saving"
  type="switch"
  @change="savePreference"
/>
```
