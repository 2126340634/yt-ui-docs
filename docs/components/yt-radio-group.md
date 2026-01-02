# yt-radio-group 单选框组组件

## 属性

| 属性名 | 类型          | 默认值 | 说明       |
| ------ | ------------- | ------ | ---------- |
| `name` | `string`      | `''`   | 表单字段名 |
| `list` | `RadioItem[]` | `[]`   | 单选框选项 |

## RadioItem 类型

```typescript
interface RadioItem {
  label?: string | number // 显示文本
  value?: string | number // 选项值
  checked?: boolean // 是否选中
  disabled?: boolean // 是否禁用
}
```

## 事件

| 事件名   | 参数         | 说明       |
| -------- | ------------ | ---------- |
| `change` | `value: any` | 选中值变化 |

## 表单集成

支持表单字段注册。

## 示例

### 基本使用

```vue
<yt-radio-group
  :list="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 }
  ]"
  @change="handleChange"
/>
```

### 默认选中

```vue
<yt-radio-group
  :list="[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana', checked: true },
    { label: '橙子', value: 'orange' }
  ]"
/>
```

### 禁用选项

```vue
<yt-radio-group
  :list="[
    { label: '公开', value: 'public' },
    { label: '私密', value: 'private', disabled: true },
    { label: '仅好友', value: 'friends' }
  ]"
/>
```

### 表单字段

```vue
<yt-radio-group
  name="gender"
  :list="[
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
  ]"
/>
```

### 动态选项

```vue
<script setup>
  const options = ref([
    { label: '选项A', value: 'A' },
    { label: '选项B', value: 'B' }
  ])

  function addOption() {
    options.value.push({
      label: `选项${options.value.length + 1}`,
      value: options.value.length + 1
    })
  }
</script>

<template>
  <yt-radio-group :list="options" />
  <button @click="addOption">添加选项</button>
</template>
```

### 事件处理

```vue
<yt-radio-group
  :list="[
    { label: '是', value: true },
    { label: '否', value: false }
  ]"
  @change="handleSelection"
/>
```

### 完整示例

```vue
<yt-radio-group
  name="payment"
  :list="[
    { label: '微信支付', value: 'wechat', checked: true },
    { label: '支付宝', value: 'alipay' },
    { label: '银行卡', value: 'card', disabled: true },
    { label: '现金', value: 'cash' }
  ]"
  @change="handlePaymentChange"
/>
```
