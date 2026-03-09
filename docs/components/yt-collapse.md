# yt-collapse 折叠面板组件

## 属性

| 属性名      | 类型                | 默认值    | 说明             |
| ----------- | ------------------- | --------- | ---------------- |
| `titleList` | `string[]`          | `[]`      | 折叠面板标题列表 |
| `iconSide`  | `'left' \| 'right'` | `'right'` | 图标位置         |
| `gap`       | `number \| string`  | `8`       | 折叠项间距       |

## 插槽

| 插槽名                  | 作用域参数                         | 说明               |
| ----------------------- | ---------------------------------- | ------------------ |
| `collapse-item-{index}` | `{ title: string, index: number }` | 每个折叠面板的内容 |

## 事件

| 事件名   | 参数                                         | 说明              |
| -------- | -------------------------------------------- | ----------------- |
| `change` | `{ index: number, activeIndexes: number[] }` | 折叠面板展开/收起 |

## 示例

### 基本使用

```vue
<yt-collapse :titleList="['面板1', '面板2', '面板3']" @change="handleCollapseChange">
  <template v-slot:collapse-item-0>
    <view>面板1的内容</view>
  </template>
  <template v-slot:collapse-item-1>
    <view>面板2的内容</view>
  </template>
  <template v-slot:collapse-item-2>
    <view>面板3的内容</view>
  </template>
</yt-collapse>
```

### 图标在左侧

```vue
<yt-collapse
  :titleList="['左侧图标面板1', '左侧图标面板2']"
  icon-side="left"
  @change="handleCollapseChange"
>
  <template v-slot:collapse-item-0>
    <view>左侧图标面板1的内容</view>
  </template>
  <template v-slot:collapse-item-1>
    <view>左侧图标面板2的内容</view>
  </template>
</yt-collapse>
```

### 自定义间距

```vue
<yt-collapse :titleList="['面板A', '面板B', '面板C']" :gap="12" @change="handleCollapseChange">
  <template v-slot:collapse-item-0>
    <view>面板A的内容，间距12px</view>
  </template>
  <template v-slot:collapse-item-1>
    <view>面板B的内容</view>
  </template>
  <template v-slot:collapse-item-2>
    <view>面板C的内容</view>
  </template>
</yt-collapse>
```

### 复杂内容

```vue
<yt-collapse :titleList="['用户信息', '订单记录', '设置']" @change="handleCollapseChange">
  <template v-slot:collapse-item-0>
    <view class="user-info">
      <p>姓名：张三</p>
      <p>邮箱：zhangsan@example.com</p>
      <p>电话：13800138000</p>
    </view>
  </template>
  <template v-slot:collapse-item-1>
    <view class="order-list">
      <p>订单1：2024-01-15 已发货</p>
      <p>订单2：2024-01-10 已完成</p>
      <p>订单3：2024-01-05 已取消</p>
    </view>
  </template>
  <template v-slot:collapse-item-2>
    <view class="settings">
      <yt-button>修改密码</yt-button>
      <yt-button>通知设置</yt-button>
      <yt-button>隐私设置</yt-button>
    </view>
  </template>
</yt-collapse>
```

### 事件处理

```vue
<script setup>
  function handleCollapseChange({ index, activeIndexes }) {
    console.log('点击的面板索引:', index)
    console.log('当前展开的面板索引:', activeIndexes)
    // 处理面板展开/收起逻辑
  }
</script>

<template>
  <yt-collapse
    :titleList="['面板1', '面板2', '面板3']"
    @change="handleCollapseChange"
  >
    <template v-slot:collapse-item-0>
      <view>内容1</view>
    </template>
    <template v-slot:collapse-item-1>
      <view>内容2</view>
    </template>
    <template v-slot:collapse-item-2>
      <view>内容3</view>
    </template>
  </yt-collapse>
</template>
```

### 完整示例

```vue
<yt-collapse
  :titleList="['个人信息', '工作经历', '教育背景', '技能证书']"
  icon-side="left"
  :gap="10"
  @change="handleResumeChange"
>
  <template v-slot:collapse-item-0>
    <view class="personal-info">
      <p><strong>姓名：</strong>李四</p>
      <p><strong>年龄：</strong>28</p>
      <p><strong>职位：</strong>前端工程师</p>
      <p><strong>邮箱：</strong>lisi@example.com</p>
    </view>
  </template>
  <template v-slot:collapse-item-1>
    <view class="work-experience">
      <p>2020-至今：ABC公司 高级前端工程师</p>
      <p>2018-2020：XYZ公司 前端开发工程师</p>
      <p>2016-2018：123公司 Web开发实习生</p>
    </view>
  </template>
  <template v-slot:collapse-item-2>
    <view class="education">
      <p>2012-2016：XX大学 计算机科学与技术 本科</p>
      <p>2016-2018：XX大学 软件工程 硕士</p>
    </view>
  </template>
  <template v-slot:collapse-item-3>
    <view class="skills">
      <p>前端技能：Vue.js, React, TypeScript</p>
      <p>证书：PMP, AWS认证开发者</p>
      <p>语言：英语六级，日语N2</p>
    </view>
  </template>
</yt-collapse>
```
