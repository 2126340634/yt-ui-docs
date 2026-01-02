# yt-calendar 日历组件

## 属性

| 属性名         | 类型                   | 默认值   | 说明                           |
| -------------- | ---------------------- | -------- | ------------------------------ |
| `monthData`    | `MonthData[]`          | `[]`     | 月份数据                       |
| `loading`      | `boolean`              | `false`  | 是否加载中                     |
| `theme`        | `ThemeColor \| 'none'` | `'none'` | 主题颜色/guide/theme-system.md |
| `width`        | `number \| string`     | `'100%'` | 日历宽度                       |
| `height`       | `number \| string`     | `'100%'` | 日历高度                       |
| `gap`          | `number \| string`     | `6`      | 日期项间距                     |
| `borderRadius` | `number \| string`     | `10`     | 圆角大小                       |
| `start`        | `string`               | `''`     | 可选开始日期 (YYYY-MM)         |
| `end`          | `string`               | `''`     | 可选结束日期 (YYYY-MM)         |

## 事件

| 事件名      | 参数                                                           | 说明     |
| ----------- | -------------------------------------------------------------- | -------- |
| `change`    | `{ year: number; month: number }`                              | 月份切换 |
| `dateClick` | `{ year: number; month: number; date: number; index: number }` | 日期点击 |

## MonthData 类型

```typescript
type MonthData = {
  date: number // 日期 (1-31)
  extra: string // 额外信息显示
  isHoliday: boolean // 是否节假日
}[]
```

## 示例

### 基本使用

```vue
<yt-calendar />
<yt-calendar theme="forest" />
<yt-calendar theme="ocean" />
<yt-calendar theme="magic" />
<yt-calendar theme="blossom" />
<yt-calendar theme="sunshine" />
<yt-calendar theme="classic" />
<yt-calendar theme="forest-sky" />
<yt-calendar theme="ocean-sky" />
<yt-calendar theme="magic-sky" />
<yt-calendar theme="blossom-sky" />
<yt-calendar theme="sunshine-sky" />
```

### 自定义尺寸

```vue
<yt-calendar :width="300" :height="400" theme="forest" />
<yt-calendar width="90vw" height="60vh" theme="ocean" />
<yt-calendar :gap="8" :borderRadius="12" theme="magic" />
```

### 日期范围

```vue
<yt-calendar start="2024-01" end="2024-12" theme="blossom" />
<yt-calendar start="2024-06" end="2024-12" theme="sunshine" />
<yt-calendar start="2024-01" end="2024-06" theme="classic" />
```

### 自定义月份数据

```vue
<script setup>
  const monthData = [
    { date: 1, extra: '元旦', isHoliday: true },
    { date: 10, extra: '加班', isHoliday: false },
    { date: 15, extra: '会议', isHoliday: false },
    { date: 20, extra: '春节', isHoliday: true }
  ]
</script>

<template>
  <yt-calendar
    :monthData="monthData"
    theme="forest-sky"
  />
</template>
```

### 加载状态

```vue
<yt-calendar :loading="true" theme="ocean-sky" />
<yt-calendar :loading="isLoading" theme="magic-sky" />
```

### 事件处理

```vue
<yt-calendar @change="handleMonthChange" @dateClick="handleDateClick" theme="blossom-sky" />
```

### 完整示例

```vue
<yt-calendar
  :monthData="holidayData"
  :loading="loading"
  theme="sunshine-sky"
  :width="350"
  :height="450"
  :gap="8"
  :borderRadius="12"
  start="2024-01"
  end="2024-12"
  @change="handleMonthChange"
  @dateClick="handleDateClick"
/>
```

### 响应式日历

```vue
<yt-calendar
  :width="isMobile ? '100%' : 400"
  :height="isMobile ? 'auto' : 500"
  theme="forest"
  @dateClick="selectDate"
/>
```
