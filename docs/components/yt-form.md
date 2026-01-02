# yt-form 表单组件

## 属性

| 属性名  | 类型                                                                   | 默认值 | 说明         |
| ------- | ---------------------------------------------------------------------- | ------ | ------------ |
| `rules` | `Record<string, { rule: (value: any) => boolean; message: string }[]>` | `{}`   | 表单验证规则 |

## 方法

| 方法名       | 参数                                  | 返回值                | 说明         |
| ------------ | ------------------------------------- | --------------------- | ------------ |
| `submitForm` | -                                     | `Record<string, any>` | 获取表单数据 |
| `resetForm`  | `names?: string[]`                    | -                     | 重置表单字段 |
| `validate`   | `callback?: (valid: boolean) => void` | `boolean`             | 验证表单     |

## 表单字段注册

组件通过 `provide` 提供以下方法供表单字段组件使用：

```typescript
registerField: (name: string, getValue: () => any, setValue: (value: any) => void) => void
unregisterField: (name: string) => void
```

## 验证规则格式

```typescript
interface Rule {
  rule: (value: any) => boolean // 验证函数，返回 true 表示验证通过
  message: string // 验证失败提示信息
}

type Rules = Record<string, Rule[]>
```

## 示例

### 基本表单

```vue
<script setup>
  import { ref } from 'vue'

  const formRef = ref()

  const formRules = {
    username: [
      {
        rule: value => !!value,
        message: '用户名不能为空'
      }
    ],
    email: [
      {
        rule: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: '请输入有效的邮箱地址'
      }
    ]
  }

  function submit() {
    if (formRef.value.validate()) {
      const formData = formRef.value.submitForm()
      console.log('表单数据:', formData)
    }
  }
</script>

<template>
  <yt-form
    :rules="formRules"
    ref="formRef"
  >
    <view class="form-group">
      <label>用户名</label>
      <yt-input name="username" />
    </view>
    <view class="form-group">
      <label>邮箱</label>
      <yt-input name="email" />
    </view>
    <yt-button @click="submit">提交</yt-button>
  </yt-form>
</template>
```

### 多字段验证

```vue
<script setup>
  const rules = {
    password: [
      {
        rule: value => value && value.length >= 6,
        message: '密码至少6位'
      },
      {
        rule: value => /[A-Z]/.test(value),
        message: '密码必须包含大写字母'
      }
    ],
    confirmPassword: [
      {
        rule: (value, allValues) => value === allValues.password,
        message: '两次密码不一致'
      }
    ],
    age: [
      {
        rule: value => value >= 18,
        message: '年龄必须满18岁'
      }
    ]
  }
</script>

<template>
  <yt-form
    :rules="rules"
    ref="form"
  >
    <!-- 表单字段 -->
  </yt-form>
</template>
```

### 获取表单数据

```vue
<script setup>
  const formRef = ref()

  function handleSubmit() {
    const formData = formRef.value.submitForm()
    console.log('表单提交数据:', formData)
    // 发送到服务器...
  }
</script>

<template>
  <yt-form ref="formRef">
    <yt-input name="name" />
    <yt-input name="phone" />
    <yt-checkbox-group name="hobbies" />
    <yt-button @click="handleSubmit">提交</yt-button>
  </yt-form>
</template>
```

### 重置表单

```vue
<script setup>
  const formRef = ref()

  function handleReset() {
    // 重置所有字段
    formRef.value.resetForm()

    // 重置指定字段
    formRef.value.resetForm(['username', 'email'])
  }
</script>

<template>
  <yt-form ref="formRef">
    <yt-input name="username" />
    <yt-input name="email" />
    <view class="button-group">
      <yt-button @click="handleSubmit">提交</yt-button>
      <yt-button @click="handleReset">重置</yt-button>
    </view>
  </yt-form>
</template>
```

### 表单验证

```vue
<script setup>
  const formRef = ref()

  function validateForm() {
    // 方式1：返回验证结果
    const isValid = formRef.value.validate()
    if (isValid) {
      console.log('验证通过')
    }

    // 方式2：使用回调函数
    formRef.value.validate(valid => {
      if (valid) {
        console.log('验证通过')
      } else {
        console.log('验证失败')
      }
    })
  }
</script>
```

### 动态规则

```vue
<script setup>
  import { computed } from 'vue'

  const isRequired = ref(true)

  const dynamicRules = computed(() => ({
    username: isRequired.value ? [{ rule: value => !!value, message: '用户名必填' }] : []
  }))
</script>

<template>
  <yt-form
    :rules="dynamicRules"
    ref="form"
  >
    <view>
      <label>用户名（{{ isRequired ? '必填' : '选填' }}）</label>
      <yt-input name="username" />
    </view>
    <view>
      <label>
        <input
          type="checkbox"
          v-model="isRequired"
        />
        设为必填
      </label>
    </view>
  </yt-form>
</template>
```

### 复杂表单验证

```vue
<script setup>
  const complexRules = {
    startDate: [
      {
        rule: value => new Date(value) >= new Date(),
        message: '开始日期不能早于今天'
      }
    ],
    endDate: [
      {
        rule: (value, allValues) => new Date(value) > new Date(allValues.startDate),
        message: '结束日期必须晚于开始日期'
      }
    ],
    quantity: [
      {
        rule: value => value > 0 && value <= 100,
        message: '数量必须在1-100之间'
      }
    ],
    agree: [
      {
        rule: value => value === true,
        message: '请同意用户协议'
      }
    ]
  }
</script>

<template>
  <yt-form
    :rules="complexRules"
    ref="form"
  >
    <!-- 各种表单字段 -->
    <yt-checkbox
      name="agree"
      label="同意用户协议"
    />
    <yt-button @click="submitComplexForm">提交复杂表单</yt-button>
  </yt-form>
</template>
```

### 完整示例

```vue
<script setup>
  import { ref } from 'vue'

  const formRef = ref()

  const formRules = {
    username: [
      { rule: value => !!value, message: '请输入用户名' },
      { rule: value => value.length >= 3, message: '用户名至少3个字符' }
    ],
    email: [
      { rule: value => !!value, message: '请输入邮箱' },
      { rule: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: '邮箱格式不正确' }
    ],
    password: [
      { rule: value => !!value, message: '请输入密码' },
      { rule: value => value.length >= 6, message: '密码至少6位' }
    ],
    phone: [{ rule: value => /^1[3-9]\d{9}$/.test(value), message: '手机号格式不正确' }],
    gender: [{ rule: value => ['male', 'female'].includes(value), message: '请选择性别' }],
    hobbies: [
      { rule: value => value.length > 0, message: '请至少选择一个爱好' },
      { rule: value => value.length <= 3, message: '最多选择3个爱好' }
    ]
  }

  async function handleSubmit() {
    const isValid = await formRef.value.validate()
    if (!isValid) return

    const formData = formRef.value.submitForm()
    console.log('注册信息:', formData)

    // 发送注册请求
    try {
      await registerUser(formData)
      uni.showToast({ title: '注册成功' })
      formRef.value.resetForm()
    } catch (error) {
      uni.showToast({ title: '注册失败', icon: 'error' })
    }
  }
</script>

<template>
  <view class="register-form">
    <h2>用户注册</h2>
    <yt-form
      :rules="formRules"
      ref="formRef"
    >
      <view class="form-item">
        <label>用户名 *</label>
        <yt-input
          name="username"
          placeholder="请输入用户名"
        />
      </view>

      <view class="form-item">
        <label>邮箱 *</label>
        <yt-input
          name="email"
          placeholder="请输入邮箱"
          type="email"
        />
      </view>

      <view class="form-item">
        <label>密码 *</label>
        <yt-input
          name="password"
          placeholder="请输入密码"
          type="password"
        />
      </view>

      <view class="form-item">
        <label>手机号</label>
        <yt-input
          name="phone"
          placeholder="请输入手机号"
        />
      </view>

      <view class="form-item">
        <label>性别 *</label>
        <yt-radio-group
          name="gender"
          :list="[
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]"
        />
      </view>

      <view class="form-item">
        <label>爱好 (1-3个)</label>
        <yt-checkbox-group
          name="hobbies"
          :list="[
            { label: '阅读', value: 'reading' },
            { label: '运动', value: 'sport' },
            { label: '音乐', value: 'music' },
            { label: '旅行', value: 'travel' }
          ]"
        />
      </view>

      <view class="form-actions">
        <yt-button
          @click="handleSubmit"
          type="primary"
        >
          注册
        </yt-button>
        <yt-button
          @click="formRef.resetForm()"
          plain
        >
          重置
        </yt-button>
      </view>
    </yt-form>
  </view>
</template>
```
