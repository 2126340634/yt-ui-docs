# yt-empty 空状态组件

## 属性

| 属性名 | 类型                                                   | 默认值    | 说明       |
| ------ | ------------------------------------------------------ | --------- | ---------- |
| `type` | `'fail' \| 'empty' \| 'done' \| 'champion' \| 'error'` | `'empty'` | 空状态类型 |
| `size` | `number`                                               | `24`      | 图标大小   |

## 类型说明

| 类型       | 对应图标   | 使用场景      |
| ---------- | ---------- | ------------- |
| `fail`     | `Fail`     | 操作失败      |
| `empty`    | `Empty`    | 数据为空      |
| `done`     | `Done`     | 操作完成      |
| `champion` | `Champion` | 优胜/冠军状态 |
| `error`    | `Error`    | 错误状态      |

## 示例

### 基本空状态

```vue
<yt-empty />

<yt-empty type="empty" />
```

### 不同状态类型

```vue
<yt-empty type="fail" />

<yt-empty type="done" />

<yt-empty type="champion" />

<yt-empty type="error" />
```

### 自定义尺寸

```vue
<yt-empty :size="32" />

<yt-empty type="fail" :size="40" />

<yt-empty type="done" :size="48" />

<yt-empty type="champion" :size="60" />
```

### 数据为空页面

```vue
<template>
  <view
    v-if="list.length === 0"
    class="empty-page"
  >
    <yt-empty
      type="empty"
      :size="80"
    />
    <text class="empty-text">暂无数据</text>
    <yt-button @click="refresh">刷新</yt-button>
  </view>
  <view v-else>
    <!-- 正常内容 -->
  </view>
</template>
```

### 操作失败状态

```vue
<template>
  <view
    v-if="isError"
    class="error-state"
  >
    <yt-empty
      type="fail"
      :size="60"
    />
    <text class="error-text">加载失败，请重试</text>
    <yt-button @click="retry">重试</yt-button>
  </view>
</template>
```

### 完成状态

```vue
<template>
  <view
    v-if="isComplete"
    class="complete-state"
  >
    <yt-empty
      type="done"
      :size="72"
    />
    <text class="complete-text">任务已完成！</text>
  </view>
</template>
```

### 优胜/冠军状态

```vue
<template>
  <view
    v-if="isWinner"
    class="winner-state"
  >
    <yt-empty
      type="champion"
      :size="100"
    />
    <text class="winner-text">恭喜您获得第一名！</text>
  </view>
</template>
```

### 错误状态

```vue
<template>
  <view
    v-if="hasError"
    class="error-state"
  >
    <yt-empty
      type="error"
      :size="64"
    />
    <text class="error-text">系统错误，请联系管理员</text>
  </view>
</template>
```

### 响应式空状态

```vue
<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    state: {
      type: String,
      default: 'empty',
      validator: value => ['empty', 'loading', 'error', 'success'].includes(value)
    }
  })

  const emptyType = computed(() => {
    switch (props.state) {
      case 'error':
        return 'error'
      case 'success':
        return 'done'
      default:
        return 'empty'
    }
  })

  const emptySize = computed(() => {
    return window.innerWidth < 768 ? 60 : 80
  })
</script>

<template>
  <view
    v-if="state !== 'loading'"
    class="state-container"
  >
    <yt-empty
      :type="emptyType"
      :size="emptySize"
    />
    <text>{{ getStateText(state) }}</text>
  </view>
  <view v-else>
    <yt-loading />
  </view>
</template>
```

### 完整示例

```vue
<script setup>
  import { ref } from 'vue'

  const dataState = ref('empty') // 'empty' | 'success' | 'error' | 'fail'
  const emptySize = ref(80)

  function loadData() {
    dataState.value = 'loading'
    // 模拟数据加载
    setTimeout(() => {
      const result = Math.random()
      if (result > 0.7) {
        dataState.value = 'success'
      } else if (result > 0.3) {
        dataState.value = 'empty'
      } else {
        dataState.value = 'error'
      }
    }, 1000)
  }
</script>

<template>
  <view class="data-container">
    <view v-if="dataState === 'loading'">
      <yt-loading />
    </view>
    <view
      v-else-if="dataState === 'empty'"
      class="state-view"
    >
      <yt-empty
        type="empty"
        :size="emptySize"
      />
      <text>暂无数据</text>
      <yt-button @click="loadData">重新加载</yt-button>
    </view>
    <view
      v-else-if="dataState === 'success'"
      class="state-view"
    >
      <yt-empty
        type="done"
        :size="emptySize"
      />
      <text>数据加载成功！</text>
    </view>
    <view
      v-else-if="dataState === 'error'"
      class="state-view"
    >
      <yt-empty
        type="error"
        :size="emptySize"
      />
      <text>数据加载失败</text>
      <yt-button @click="loadData">重试</yt-button>
    </view>
  </view>
</template>
```
