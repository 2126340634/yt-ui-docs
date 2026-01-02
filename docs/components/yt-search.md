# yt-search 搜索组件

## 属性

| 属性名        | 类型                   | 默认值             | 说明                           |
| ------------- | ---------------------- | ------------------ | ------------------------------ |
| `theme`       | `ThemeColor \| 'none'` | `'none'`           | 主题颜色/guide/theme-system.md |
| `modelValue`  | `string`               | `''`               | 绑定值 (v-model)               |
| `value`       | `string`               | `''`               | 搜索值                         |
| `placeholder` | `string`               | `'请输入搜索内容'` | 占位文本                       |
| `disabled`    | `boolean`              | `false`            | 是否禁用                       |
| `focus`       | `boolean`              | `false`            | 是否自动聚焦                   |
| `autoBlur`    | `boolean`              | `true`             | 点击页面是否自动收起键盘       |
| `showButton`  | `boolean`              | `true`             | 是否显示搜索按钮               |

## 主题颜色

```vue
<yt-search theme="forest" />

<yt-search theme="ocean" />

<yt-search theme="magic" />

<yt-search theme="blossom" />

<yt-search theme="sunshine" />

<yt-search theme="classic" />

<yt-search theme="forest-sky" />

<yt-search theme="ocean-sky" />

<yt-search theme="magic-sky" />

<yt-search theme="blossom-sky" />

<yt-search theme="sunshine-sky" />
```

## 事件

| 事件名                 | 参数                                   | 说明             |
| ---------------------- | -------------------------------------- | ---------------- |
| `update:modelValue`    | `modelValue: string`                   | v-model 更新     |
| `input`                | `value: any`                           | 输入时触发       |
| `focus`                | `{ value: any; height: number }`       | 获得焦点时触发   |
| `blur`                 | `value: any`                           | 失去焦点时触发   |
| `confirm`              | `value: any`                           | 点击键盘完成按钮 |
| `keyboardHeightChange` | `{ height: number; duration: number }` | 键盘高度变化     |
| `search`               | `value: any`                           | 点击搜索按钮     |

## 示例

### 基本搜索

```vue
<yt-search />
```

### 无按钮搜索

```vue
<yt-search :showButton="false" />
```

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
<yt-search v-model="keyword" @input="handleInput" @search="handleSearch" @confirm="handleConfirm" />
```

### 完整示例

```vue
<yt-search
  v-model="searchText"
  theme="forest-sky"
  placeholder="请输入搜索内容"
  :showButton="true"
  :focus="true"
  @search="handleSearch"
  @confirm="handleSearch"
/>
```
