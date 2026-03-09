# yt-loading 加载组件

## 属性

| 属性名      | 类型                   | 默认值        | 说明                           |
| ----------- | ---------------------- | ------------- | ------------------------------ |
| `theme`     | `ThemeColor \| 'none'` | `'classic'`   | [主题颜色](/guide/theme-system.md) |
| `visible`   | `boolean`              | `true`        | 是否显示                       |
| `textColor` | `string`               | `'#999'`      | 文本颜色                       |
| `zIndex`    | `number`               | `1000`        | 层级                           |
| `overlay`   | `boolean`              | `false`       | 是否显示遮罩层                 |
| `bgColor`   | `string`               | `'#ffffff80'` | 遮罩层背景颜色                 |
| `duration`  | `number`               | `200`         | 动画时长                       |

## 插槽

| 插槽名    | 说明         |
| --------- | ------------ |
| `default` | 加载文本内容 |

## 示例

### 基本加载

```vue
<yt-loading />

<yt-loading theme="forest" />

<yt-loading theme="ocean" />

<yt-loading theme="magic" />

<yt-loading theme="blossom" />

<yt-loading theme="sunshine" />

<yt-loading theme="classic" />

<yt-loading theme="forest-sky" />

<yt-loading theme="ocean-sky" />

<yt-loading theme="magic-sky" />

<yt-loading theme="blossom-sky" />

<yt-loading theme="sunshine-sky" />
```

### 带文本

```vue
<yt-loading>加载中...</yt-loading>

<yt-loading theme="forest">森林主题加载</yt-loading>

<yt-loading theme="ocean">海洋主题加载</yt-loading>
```

### 控制显示

```vue
<yt-loading :visible="isLoading" />

<yt-loading v-if="loading" theme="magic" />
```

### 自定义文本颜色

```vue
<yt-loading textColor="#3498db" />

<yt-loading theme="blossom" textColor="#e84393">加载中</yt-loading>
```

### 带遮罩层

```vue
<yt-loading :overlay="true" />

<yt-loading :overlay="true" theme="sunshine">页面加载中...</yt-loading>
```

### 自定义遮罩颜色

```vue
<yt-loading :overlay="true" bgColor="rgba(0,0,0,0.3)" />

<yt-loading :overlay="true" bgColor="#f8f9fa" theme="classic" />
```

### 层级控制

```vue
<yt-loading :zIndex="9999" :overlay="true" />

<yt-loading :zIndex="2000" theme="forest-sky" :overlay="true" />
```

### 页面加载

```vue
<template>
  <view
    v-if="loading"
    class="page-loading"
  >
    <yt-loading
      :overlay="true"
      :zIndex="10000"
      theme="ocean-sky"
    >
      页面加载中...
    </yt-loading>
  </view>
  <view v-else>
    <!-- 页面内容 -->
  </view>
</template>
```

### 按钮加载状态

```vue
<template>
  <yt-button
    :loading="isSubmitting"
    @click="submitForm"
  >
    提交
  </yt-button>
</template>

<script setup>
  const isSubmitting = ref(false)

  async function submitForm() {
    isSubmitting.value = true
    try {
      await api.submit()
    } finally {
      isSubmitting.value = false
    }
  }
</script>
```

### 列表加载更多

```vue
<template>
  <view class="list-container">
    <!-- 列表内容 -->
    <view
      v-if="loadingMore"
      class="load-more"
    >
      <yt-loading
        theme="magic-sky"
        :visible="loadingMore"
      >
        加载更多...
      </yt-loading>
    </view>
  </view>
</template>
```

### 表单提交加载

```vue
<template>
  <view class="form-container">
    <yt-form>
      <!-- 表单字段 -->
    </yt-form>
    <view
      v-if="submitting"
      class="submit-loading"
    >
      <yt-loading
        :overlay="true"
        bgColor="rgba(255,255,255,0.7)"
        theme="blossom-sky"
      >
        提交中...
      </yt-loading>
    </view>
  </view>
</template>
```

### 骨架屏加载

```vue
<template>
  <view
    v-if="loading"
    class="skeleton-wrapper"
  >
    <yt-loading
      :overlay="false"
      theme="sunshine-sky"
    />
    <!-- 骨架屏内容 -->
  </view>
  <view v-else>
    <!-- 实际内容 -->
  </view>
</template>
```

### 全屏加载

```vue
<template>
  <view
    v-if="fullscreenLoading"
    class="fullscreen-loading"
  >
    <yt-loading
      :overlay="true"
      :zIndex="99999"
      bgColor="rgba(0,0,0,0.7)"
      textColor="#fff"
      theme="forest-sky"
    >
      正在初始化...
    </yt-loading>
  </view>
</template>
```

### 组合使用

```vue
<script setup>
  import { ref } from 'vue'

  const loading = ref({
    page: true,
    data: false,
    submit: false
  })

  function showLoading(type) {
    loading.value[type] = true
    setTimeout(() => {
      loading.value[type] = false
    }, 2000)
  }
</script>

<template>
  <view class="container">
    <!-- 页面加载 -->
    <yt-loading
      v-if="loading.page"
      :overlay="true"
      theme="forest"
    >
      页面加载中...
    </yt-loading>

    <!-- 数据加载 -->
    <view
      v-if="loading.data"
      class="data-loading"
    >
      <yt-loading theme="ocean">数据加载中...</yt-loading>
    </view>

    <!-- 提交加载 -->
    <view
      v-if="loading.submit"
      class="submit-loading"
    >
      <yt-loading
        :overlay="true"
        bgColor="rgba(255,255,255,0.9)"
        theme="magic-sky"
      >
        提交中，请稍候...
      </yt-loading>
    </view>
  </view>
</template>
```

### 完整示例

```vue
<script setup>
  import { ref, onMounted } from 'vue'

  const pageLoading = ref(true)
  const listLoading = ref(false)
  const submitLoading = ref(false)
  const data = ref([])

  onMounted(() => {
    // 模拟页面加载
    setTimeout(() => {
      pageLoading.value = false
      loadData()
    }, 1500)
  })

  async function loadData() {
    listLoading.value = true
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      data.value = ['项目1', '项目2', '项目3']
    } finally {
      listLoading.value = false
    }
  }

  async function handleSubmit() {
    submitLoading.value = true
    try {
      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log('提交成功')
    } finally {
      submitLoading.value = false
    }
  }
</script>

<template>
  <view class="app-container">
    <!-- 页面初始加载 -->
    <yt-loading
      v-if="pageLoading"
      :overlay="true"
      :zIndex="9999"
      bgColor="rgba(255,255,255,1)"
      theme="forest-sky"
      duration="300"
    >
      应用初始化中...
    </yt-loading>

    <!-- 主要内容 -->
    <view v-else>
      <view class="header">
        <h1>数据列表</h1>
        <yt-button
          :loading="listLoading"
          @click="loadData"
          theme="ocean"
        >
          刷新数据
        </yt-button>
      </view>

      <!-- 数据列表 -->
      <view
        v-if="listLoading"
        class="list-loading"
      >
        <yt-loading theme="magic-sky">正在加载数据...</yt-loading>
      </view>

      <view
        v-else-if="data.length > 0"
        class="data-list"
      >
        <view
          v-for="item in data"
          :key="item"
          class="data-item"
        >
          {{ item }}
        </view>
      </view>

      <view
        v-else
        class="empty-state"
      >
        <yt-empty
          type="empty"
          :size="60"
        />
        <span>暂无数据</span>
      </view>

      <!-- 提交表单 -->
      <view class="submit-section">
        <yt-button
          :loading="submitLoading"
          @click="handleSubmit"
          theme="blossom"
          :disabled="data.length === 0"
        >
          提交数据
        </yt-button>
      </view>

      <!-- 提交遮罩层 -->
      <yt-loading
        v-if="submitLoading"
        :overlay="true"
        bgColor="rgba(255,255,255,0.8)"
        textColor="#333"
        theme="sunshine-sky"
      >
        正在提交，请勿关闭页面...
      </yt-loading>
    </view>
  </view>
</template>
```
