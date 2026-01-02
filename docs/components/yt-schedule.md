# yt-schedule 课程表组件

## 属性

| 属性名       | 类型               | 默认值             | 说明                           |
| ------------ | ------------------ | ------------------ | ------------------------------ |
| `theme`      | `ThemeColor`       | `'classic'`        | 主题颜色/guide/theme-system.md |
| `width`      | `number \| string` | `'100vw'`          | 课表宽度                       |
| `height`     | `number \| string` | `'100vh'`          | 课表高度                       |
| `animation`  | `boolean`          | `true`             | 是否开启动画                   |
| `duration`   | `number`           | `300`              | 动画时长                       |
| `rows`       | `number`           | `6`                | 行数(课节数)                   |
| `weeks`      | `number`           | `20`               | 周数                           |
| `activeWeek` | `number`           | `0`                | 默认选中周索引(0 开始)         |
| `timeList`   | `TimeList`         | `[]`               | 时间列表                       |
| `colorList`  | `string[]`         | `defaultColorList` | 课程颜色列表                   |
| `data`       | `ScheduleData`     | `{...}`            | 课表数据                       |

## ScheduleData 类型

```typescript
interface ScheduleData {
  term: number
  termYear: string
  start: string
  course: Course[]
  agenda: Agenda[]
}

interface Course {
  type: 'course'
  name: string
  location?: string
  teacher?: string
  class?: string
  x: number
  y: number
  z: number[]
}

interface Agenda {
  type: 'agenda'
  name: string
  location?: string
  x: number
  y: number
  z: number[]
}
```

## TimeList 类型

```typescript
type TimeList = {
  first: { start: string; end: string }
  second: { start: string; end: string }
}[]
```

## 事件

| 事件名         | 参数                                                            | 说明     |
| -------------- | --------------------------------------------------------------- | -------- |
| `change`       | `weekIndex: number`                                             | 周数切换 |
| `courseClick`  | `course: CourseData & { weekIndex: number; gridIndex: number }` | 课程点击 |
| `agendaChange` | `agenda: Agenda[]`                                              | 日程变化 |

## 示例

### 基本课表

```vue
<yt-schedule :data="scheduleData" />
```

### 自定义主题

```vue
<yt-schedule theme="forest" :data="scheduleData" />

<yt-schedule theme="ocean" :data="scheduleData" />

<yt-schedule theme="magic" :data="scheduleData" />

<yt-schedule theme="blossom" :data="scheduleData" />

<yt-schedule theme="sunshine" :data="scheduleData" />

<yt-schedule theme="classic" :data="scheduleData" />

<yt-schedule theme="forest-sky" :data="scheduleData" />

<yt-schedule theme="ocean-sky" :data="scheduleData" />

<yt-schedule theme="magic-sky" :data="scheduleData" />

<yt-schedule theme="blossom-sky" :data="scheduleData" />

<yt-schedule theme="sunshine-sky" :data="scheduleData" />
```

### 自定义尺寸

```vue
<yt-schedule :width="375" :height="667" :data="scheduleData" />

<yt-schedule width="100%" height="600" :data="scheduleData" />
```

### 自定义行数列数

```vue
<yt-schedule :rows="8" :weeks="16" :data="scheduleData" />

<yt-schedule :rows="5" :weeks="10" :data="scheduleData" />
```

### 时间设置

```vue
<script setup>
  const timeList = [
    { first: { start: '08:00', end: '08:45' }, second: { start: '08:50', end: '09:35' } },
    { first: { start: '09:50', end: '10:35' }, second: { start: '10:40', end: '11:25' } },
    { first: { start: '11:30', end: '12:15' }, second: { start: '12:20', end: '13:05' } },
    { first: { start: '13:30', end: '14:15' }, second: { start: '14:20', end: '15:05' } },
    { first: { start: '15:20', end: '16:05' }, second: { start: '16:10', end: '16:55' } },
    { first: { start: '17:10', end: '17:55' }, second: { start: '18:00', end: '18:45' } }
  ]
</script>

<template>
  <yt-schedule
    :timeList="timeList"
    :data="scheduleData"
  />
</template>
```

### 自定义颜色

```vue
<script setup>
  const colorList = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
</script>

<template>
  <yt-schedule
    :colorList="colorList"
    :data="scheduleData"
  />
</template>
```

### 初始周数

```vue
<yt-schedule :activeWeek="4" :data="scheduleData" />

<yt-schedule :activeWeek="currentWeek - 1" :data="scheduleData" />
```

### 动画控制

```vue
<yt-schedule :animation="false" :data="scheduleData" />

<yt-schedule :animation="true" :duration="500" :data="scheduleData" />
```

### 事件处理

```vue
<yt-schedule
  :data="scheduleData"
  @change="handleWeekChange"
  @courseClick="handleCourseClick"
  @agendaChange="handleAgendaChange"
/>
```

### 课程数据

```vue
<script setup>
  const scheduleData = {
    term: 1,
    termYear: '23-24',
    start: '2023-09-01',
    course: [
      {
        type: 'course',
        name: '数学',
        location: '教学楼101',
        teacher: '张老师',
        class: '三年级一班',
        x: 1, // 周一
        y: 1, // 第一节
        z: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // 第1-10周
      },
      {
        type: 'course',
        name: '语文',
        location: '教学楼201',
        teacher: '李老师',
        class: '三年级一班',
        x: 2, // 周二
        y: 2, // 第二节
        z: [1, 3, 5, 7, 9] // 单周
      }
    ],
    agenda: [
      {
        type: 'agenda',
        name: '小组会议',
        location: '会议室A',
        x: 3, // 周三
        y: 3, // 第三节
        z: [1, 2, 3] // 第1-3周
      }
    ]
  }
</script>

<template>
  <yt-schedule :data="scheduleData" />
</template>
```

### 完整示例

```vue
<script setup>
  import { ref } from 'vue'

  const scheduleData = ref({
    term: 1,
    termYear: '24-25',
    start: '2024-09-02',
    course: [
      {
        type: 'course',
        name: '高等数学',
        location: 'A101',
        teacher: '王教授',
        class: '计科1班',
        x: 1,
        y: 1,
        z: [1, 2, 3, 4, 5]
      },
      {
        type: 'course',
        name: '数据结构',
        location: 'B201',
        teacher: '李老师',
        class: '计科1班',
        x: 2,
        y: 2,
        z: [1, 3, 5, 7, 9]
      },
      {
        type: 'course',
        name: '英语',
        location: 'C301',
        teacher: '张老师',
        class: '计科1班',
        x: 3,
        y: 3,
        z: [2, 4, 6, 8, 10]
      }
    ],
    agenda: [
      {
        type: 'agenda',
        name: '个人日程安排名称',
        location: '个人日程安排地点',
        x: 1,
        y: 1,
        z: [1, 2, 3, 4, 5, 6, 7, 8]
      },
      {
        type: 'agenda',
        name: '这是我的个人日程安排',
        x: 3,
        y: 1,
        z: [2, 4, 6, 8, 10]
      }
    ]
  })

  const timeList = [
    {
      first: { start: '08:00', end: '08:45' },
      second: { start: '08:55', end: '09:40' }
    },
    {
      first: { start: '10:05', end: '10:50' },
      second: { start: '11:00', end: '11:45' }
    },
    {
      first: { start: '14:00', end: '14:45' },
      second: { start: '14:55', end: '15:40' }
    },
    {
      first: { start: '16:05', end: '16:50' },
      second: { start: '17:00', end: '17:45' }
    },
    {
      first: { start: '19:00', end: '19:45' },
      second: { start: '19:55', end: '20:40' }
    },
    {
      first: { start: '20:50', end: '21:35' },
      second: { start: '21:45', end: '22:30' }
    }
  ]

  const colorList = [
    '#058F85',
    '#FDB537',
    '#EFC758',
    '#7D88BD',
    '#5497A7',
    '#4581B7',
    '#93C4C8',
    '#E8B080',
    '#81B1C7',
    '#DC514C'
  ]

  function handleWeekChange(weekIndex) {
    console.log('切换到第', weekIndex + 1, '周')
  }

  function handleCourseClick(course) {
    console.log('点击课程:', course)
  }

  function handleAgendaChange(agendas) {
    console.log('日程更新:', agendas)
    // 可进行保存
  }
</script>

<template>
  <yt-schedule
    theme="forest-sky"
    :data="scheduleData"
    :timeList="timeList"
    :colorList="colorList"
    :rows="6"
    :weeks="20"
    :activeWeek="currentWeek - 1"
    :animation="true"
    :duration="300"
    @change="handleWeekChange"
    @courseClick="handleCourseClick"
    @agendaChange="handleAgendaChange"
  />
</template>
```
