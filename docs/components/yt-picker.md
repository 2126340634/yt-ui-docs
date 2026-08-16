# yt-picker 选择器组件

## 属性

| 属性名     | 类型                                        | 默认值     | 说明               |
| ---------- | ------------------------------------------- | ---------- | ------------------ |
| `name`     | `string`                                    | `''`       | 表单字段名         |
| `type`     | `'single' \| 'multi' \| 'date' \| 'region'` | `'single'` | 选择器类型         |
| `items`    | `any[]`                                     | `[]`       | 选项数据           |
| `itemKey`  | `string`                                    | `''`       | 对象数组的显示字段 |
| `start`    | `string`                                    | `''`       | 日期选择起始值     |
| `end`      | `string`                                    | `''`       | 日期选择结束值     |
| `disabled` | `boolean`                                   | `false`    | 是否禁用           |
| `fields`   | `'year' \| 'month' \| 'day'`                | `'day'`    | 日期选择粒度       |

## 事件

| 事件名         | 参数                             | 说明           |
| -------------- | -------------------------------- | -------------- |
| `change`       | `value: any`                     | 选择值变化     |
| `cancel`       | -                                | 取消选择       |
| `columnChange` | `{ column: number, value: any }` | 多列选择列变化 |

## 表单集成

支持通过表单上下文注入注册字段。

## 示例

### 单列选择器

```vue
<yt-picker :items="['选项1', '选项2', '选项3']" @change="handleChange" />

<yt-picker
  :items="[
    { id: 1, name: '北京' },
    { id: 2, name: '上海' }
  ]"
  item-key="name"
/>
```

### 多列选择器

```vue
<yt-picker
  type="multi"
  :items="[
    ['周一', '周二', '周三'],
    ['上午', '下午', '晚上']
  ]"
  @change="handleMultiChange"
  @columnChange="handleColumnChange"
/>
```

### 日期选择器

```vue
<yt-picker type="date" start="2020-01-01" end="2025-12-31" fields="month" />
```

### 地区选择器

```vue
<yt-picker type="region" />
```

### 表单字段

```vue
<yt-picker name="city" :items="cityList" item-key="label" />
```

### 禁用状态

```vue
<yt-picker :disabled="true" :items="items" />
```

### 事件处理

```vue
<yt-picker :items="options" @change="handleSelect" @cancel="handleCancel" />
```

### 完整示例

```vue
<yt-picker
  name="birthday"
  type="date"
  start="1990-01-01"
  end="2024-12-31"
  fields="day"
  :disabled="false"
  @change="handleDateChange"
  @cancel="handleDateCancel"
/>
```
