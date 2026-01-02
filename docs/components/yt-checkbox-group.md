# yt-checkbox-group 多选框组组件

## 属性

| 属性名 | 类型             | 默认值 | 说明           |
| ------ | ---------------- | ------ | -------------- |
| `name` | `string`         | `''`   | 表单字段名     |
| `list` | `CheckboxItem[]` | `[]`   | 多选框选项列表 |

## CheckboxItem 类型

```typescript
interface CheckboxItem {
  label?: string | number // 显示文本
  value?: string | number // 选项值
  checked?: boolean // 是否选中
  disabled?: boolean // 是否禁用
}
```

## 事件

| 事件名   | 参数           | 说明           |
| -------- | -------------- | -------------- |
| `change` | `value: any[]` | 选中值发生变化 |

## 表单集成

组件支持表单字段注入，可通过上下文与表单组件集成：

```typescript
// 表单上下文注入的方法
registerField: (name: string, getValue: () => any, setValue: (value: any) => void) => void
unregisterField: (name: string) => void
```

## 示例

### 基本使用

```vue
<yt-checkbox-group
  :list="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]"
  @change="handleChange"
/>
```

### 默认选中

```vue
<yt-checkbox-group
  :list="[
    { label: '苹果', value: 'apple', checked: true },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange', checked: true }
  ]"
  @change="handleChange"
/>
```

### 禁用选项

```vue
<yt-checkbox-group
  :list="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2, disabled: true },
    { label: '选项3', value: 3 },
    { label: '选项4', value: 4, disabled: true }
  ]"
  @change="handleChange"
/>
```

### 表单字段

```vue
<yt-checkbox-group
  name="hobbies"
  :list="[
    { label: '篮球', value: 'basketball' },
    { label: '足球', value: 'football' },
    { label: '游泳', value: 'swimming' },
    { label: '跑步', value: 'running' }
  ]"
  @change="handleHobbyChange"
/>
```

### 动态更新

```vue
<script setup>
  import { ref } from 'vue'

  const checkboxList = ref([
    { label: '选项A', value: 'A' },
    { label: '选项B', value: 'B' },
    { label: '选项C', value: 'C' }
  ])

  function updateList() {
    checkboxList.value.push({ label: '选项D', value: 'D' })
  }
</script>

<template>
  <yt-checkbox-group
    :list="checkboxList"
    @change="handleChange"
  />
  <button @click="updateList">添加选项</button>
</template>
```

### 事件处理

```vue
<script setup>
  function handleCheckboxChange(value) {
    console.log('选中值:', value)
    // 处理选中值变化逻辑
  }
</script>

<template>
  <yt-checkbox-group
    :list="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]"
    @change="handleCheckboxChange"
  />
</template>
```

### 完整示例

```vue
<yt-checkbox-group
  name="interests"
  :list="[
    { label: '音乐', value: 'music', checked: true },
    { label: '电影', value: 'movie' },
    { label: '阅读', value: 'reading', checked: true },
    { label: '运动', value: 'sport', disabled: true },
    { label: '游戏', value: 'game' },
    { label: '旅行', value: 'travel', disabled: true }
  ]"
  @change="handleInterestChange"
/>
```
