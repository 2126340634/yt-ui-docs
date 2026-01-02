# yt-textarea 多行输入框组件

## 属性

| 属性名           | 类型                   | 默认值         | 说明                           |
| ---------------- | ---------------------- | -------------- | ------------------------------ |
| `name`           | `string`               | `''`           | 表单字段名                     |
| `theme`          | `ThemeColor \| 'none'` | `'none'`       | 主题颜色/guide/theme-system.md |
| `width`          | `number \| string`     | `'100%'`       | 输入框宽度                     |
| `height`         | `number \| string`     | `30`           | 输入框高度                     |
| `padding`        | `number \| string`     | `'0 4px'`      | 内边距                         |
| `modelValue`     | `string`               | `''`           | 绑定值 (v-model)               |
| `value`          | `string`               | `''`           | 输入值                         |
| `type`           | `InputType`            | `'text'`       | 输入类型                       |
| `password`       | `boolean`              | `false`        | 是否为密码类型                 |
| `placeholder`    | `string`               | `'请输入内容'` | 占位文本                       |
| `disabled`       | `boolean`              | `false`        | 是否禁用                       |
| `maxlength`      | `number`               | `-1`           | 最大长度                       |
| `focus`          | `boolean`              | `false`        | 是否自动聚焦                   |
| `confirmType`    | `KeyboardConfirmType`  | `'done'`       | 键盘确认按钮类型               |
| `confirmHold`    | `boolean`              | `false`        | 点击确认是否保持键盘           |
| `adjustPosition` | `boolean`              | `true`         | 键盘弹起时自动上推             |
| `autoBlur`       | `boolean`              | `true`         | 点击页面是否自动收起键盘       |
| `holdKeyboard`   | `boolean`              | `false`        | 点击页面时保持键盘不收起       |
| `randomNumber`   | `boolean`              | `false`        | 是否随机数字                   |
| `autoFocus`      | `boolean`              | `false`        | 是否自动获得焦点               |
| `autoHeight`     | `boolean`              | `false`        | 是否自动增高                   |

## 主题颜色

```vue
<yt-textarea theme="forest" />

<yt-textarea theme="ocean" />

<yt-textarea theme="magic" />

<yt-textarea theme="blossom" />

<yt-textarea theme="sunshine" />

<yt-textarea theme="classic" />

<yt-textarea theme="forest-sky" />

<yt-textarea theme="ocean-sky" />

<yt-textarea theme="magic-sky" />

<yt-textarea theme="blossom-sky" />

<yt-textarea theme="sunshine-sky" />
```

## 事件

| 事件名                 | 参数                                                       | 说明               |
| ---------------------- | ---------------------------------------------------------- | ------------------ |
| `update:modelValue`    | `modelValue: string`                                       | v-model 更新       |
| `input`                | `{ value: any; cursor: number }`                           | 输入时触发         |
| `focus`                | `{ value: any; height: number }`                           | 获得焦点时触发     |
| `blur`                 | `{ value: any; cursor: number }`                           | 失去焦点时触发     |
| `confirm`              | `value: any`                                               | 点击完成按钮时触发 |
| `keyboardHeightChange` | `{ height: number; duration: number }`                     | 键盘高度变化时触发 |
| `lineChange`           | `{ height: number; heightRpx: number; lineCount: number }` | 行高变化时触发     |

## 表单集成

支持表单字段注册。

## 示例

### 基本多行输入

```vue
<yt-textarea />
```

### 绑定值

```vue
<yt-textarea v-model="content" />
```

### 自定义尺寸

```vue
<yt-textarea :width="300" :height="100" />

<yt-textarea width="90%" :height="150" />
```

### 自动增高

```vue
<yt-textarea :autoHeight="true" />
```

### 禁用状态

```vue
<yt-textarea :disabled="true" />
```

### 最大长度

```vue
<yt-textarea :maxlength="200" />
```

### 自动聚焦

```vue
<yt-textarea :autoFocus="true" />
```

### 表单字段

```vue
<yt-textarea name="description" />
```

### 事件处理

```vue
<yt-textarea
  v-model="content"
  @input="handleInput"
  @focus="handleFocus"
  @blur="handleBlur"
  @lineChange="handleLineChange"
/>
```

### 完整示例

```vue
<yt-textarea
  name="comment"
  v-model="comment"
  theme="forest-sky"
  :width="350"
  :height="120"
  placeholder="请输入评论"
  :maxlength="500"
  :autoHeight="true"
  :autoFocus="true"
  @focus="handleFocus"
  @blur="handleBlur"
  @lineChange="updateHeight"
/>
```
