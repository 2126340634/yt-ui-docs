# yt-input 输入框组件

## 属性

| 属性名           | 类型                   | 默认值         | 说明                                              |
| ---------------- | ---------------------- | -------------- | ------------------------------------------------- |
| `name`           | `string`               | `''`           | 表单字段名                                        |
| `theme`          | `ThemeColor \| 'none'` | `'none'`       | 主题颜色/guide/theme-system.md                    |
| `width`          | `number \| string`     | `'100%'`       | 输入框宽度                                        |
| `height`         | `number \| string`     | `30`           | 输入框高度                                        |
| `padding`        | `number \| string`     | `'0 4px'`      | 内边距                                            |
| `modelValue`     | `string`               | `''`           | 绑定值 (v-model)                                  |
| `value`          | `string`               | `''`           | 输入值                                            |
| `type`           | `InputType`            | `'text'`       | 输入类型                                          |
| `password`       | `boolean`              | `false`        | 是否为密码类型                                    |
| `placeholder`    | `string`               | `'请输入内容'` | 占位文本                                          |
| `disabled`       | `boolean`              | `false`        | 是否禁用                                          |
| `maxlength`      | `number`               | `-1`           | 最大长度，-1 为不限制                             |
| `focus`          | `boolean`              | `false`        | 是否自动聚焦                                      |
| `confirmType`    | `KeyboardConfirmType`  | `'done'`       | 键盘确认按钮类型                                  |
| `confirmHold`    | `boolean`              | `false`        | 点击确认是否保持键盘不收起                        |
| `adjustPosition` | `boolean`              | `true`         | 键盘弹起时自动上推页面                            |
| `autoBlur`       | `boolean`              | `true`         | 点击页面非输入框区域时自动收起键盘                |
| `holdKeyboard`   | `boolean`              | `false`        | 点击页面时保持键盘不收起                          |
| `randomNumber`   | `boolean`              | `false`        | 是否随机数字 (type 为 number/digit/idcard 时有效) |

## 事件

| 事件名                 | 参数                                   | 说明               |
| ---------------------- | -------------------------------------- | ------------------ |
| `update:modelValue`    | `modelValue: string`                   | v-model 更新       |
| `input`                | `value: any`                           | 输入时触发         |
| `focus`                | `{ value: any; height: number }`       | 获得焦点时触发     |
| `blur`                 | `value: any`                           | 失去焦点时触发     |
| `confirm`              | `value: any`                           | 点击完成按钮时触发 |
| `keyboardHeightChange` | `{ height: number; duration: number }` | 键盘高度变化时触发 |

## 方法

| 方法名  | 说明       |
| ------- | ---------- |
| `clear` | 清空输入框 |

## 示例

### 基本输入框

```vue
<yt-input />

<yt-input placeholder="请输入用户名" />

<yt-input theme="forest" placeholder="森林主题" />

<yt-input theme="ocean" placeholder="海洋主题" />

<yt-input theme="magic" placeholder="魔法主题" />
```

### 绑定数据

```vue
<yt-input v-model="username" />

<yt-input :modelValue="email" @update:modelValue="email = $event" />
```

### 不同类型

```vue
<yt-input type="text" placeholder="文本输入" />

<yt-input type="number" placeholder="数字输入" />

<yt-input type="idcard" placeholder="身份证号" />

<yt-input type="digit" placeholder="数字键盘" />

<yt-input :password="true" placeholder="密码输入" />
```

### 禁用状态

```vue
<yt-input :disabled="true" value="禁用状态" />

<yt-input disabled placeholder="禁用输入" />
```

### 自定义尺寸

```vue
<yt-input :width="200" :height="40" />

<yt-input width="80%" :height="50" />

<yt-input :padding="10" />
```

### 最大长度

```vue
<yt-input :maxlength="10" placeholder="最多输入10个字符" />

<yt-input :maxlength="20" />
```

### 自动聚焦

```vue
<yt-input :focus="true" placeholder="自动获得焦点" />
```

### 确认按钮类型

```vue
<yt-input confirm-type="done" placeholder="完成按钮" />

<yt-input confirm-type="send" placeholder="发送按钮" />

<yt-input confirm-type="search" placeholder="搜索按钮" />

<yt-input confirm-type="next" placeholder="下一项按钮" />

<yt-input confirm-type="go" placeholder="前往按钮" />
```

### 随机数字

```vue
<yt-input type="number" :randomNumber="true" placeholder="随机数字" />

<yt-input type="digit" :randomNumber="true" placeholder="数字键盘随机" />
```

### 事件处理

```vue
<yt-input
  v-model="inputValue"
  @input="handleInput"
  @focus="handleFocus"
  @blur="handleBlur"
  @confirm="handleConfirm"
  @keyboardHeightChange="handleKeyboardChange"
/>
```

### 表单字段

```vue
<yt-input name="username" placeholder="用户名" />

<yt-input name="password" :password="true" placeholder="密码" />
```

### 清空输入框

```vue
<script setup>
  import { ref } from 'vue'

  const inputRef = ref()

  function clearInput() {
    inputRef.value.clear()
  }
</script>

<template>
  <yt-input
    ref="inputRef"
    v-model="text"
  />
  <button @click="clearInput">清空</button>
</template>
```

### 键盘控制

```vue
<yt-input :adjustPosition="true" placeholder="键盘弹起时自动上推" />

<yt-input :holdKeyboard="true" placeholder="点击页面保持键盘" />

<yt-input :autoBlur="false" placeholder="手动控制键盘收起" />

<yt-input :confirmHold="true" confirm-type="send" placeholder="保持键盘发送" />
```

### 完整示例

```vue
<script setup>
  import { ref } from 'vue'

  const username = ref('')
  const password = ref('')
  const phone = ref('')
  const email = ref('')
  const searchText = ref('')

  function handleSearchConfirm(value) {
    console.log('搜索:', value)
    // 执行搜索逻辑
  }

  function handlePhoneBlur(value) {
    console.log('手机号输入完成:', value)
    // 验证手机号格式
  }
</script>

<template>
  <view class="form-container">
    <view class="form-group">
      <label>用户名</label>
      <yt-input
        v-model="username"
        name="username"
        theme="forest"
        placeholder="请输入用户名"
        :maxlength="20"
        @blur="validateUsername"
      />
    </view>

    <view class="form-group">
      <label>密码</label>
      <yt-input
        v-model="password"
        name="password"
        :password="true"
        theme="ocean"
        placeholder="请输入密码"
        confirm-type="done"
      />
    </view>

    <view class="form-group">
      <label>手机号</label>
      <yt-input
        v-model="phone"
        name="phone"
        type="number"
        theme="magic"
        placeholder="请输入手机号"
        :maxlength="11"
        @blur="handlePhoneBlur"
      />
    </view>

    <view class="form-group">
      <label>邮箱</label>
      <yt-input
        v-model="email"
        name="email"
        type="text"
        theme="blossom"
        placeholder="请输入邮箱"
        confirm-type="next"
      />
    </view>

    <view class="search-box">
      <yt-input
        v-model="searchText"
        theme="sunshine"
        placeholder="搜索内容"
        confirm-type="search"
        :adjustPosition="true"
        @confirm="handleSearchConfirm"
      />
    </view>
  </view>
</template>
```
