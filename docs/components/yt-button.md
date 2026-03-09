# yt-button 按钮组件

## 属性

| 属性名     | 类型         | 默认值      | 说明                           |
| ---------- | ------------ | ----------- | ------------------------------ |
| `theme`    | `ThemeColor` | `'classic'` | [主题颜色](/guide/theme-system.md) |
| `type`     | `ColorType`  | `'primary'` | 按钮类型                       |
| `size`     | `SizeType`   | `'medium'`  | 按钮尺寸                       |
| `plain`    | `boolean`    | `false`     | 是否朴素样式                   |
| `disabled` | `boolean`    | `false`     | 是否禁用                       |
| `loading`  | `boolean`    | `false`     | 是否加载中                     |
| `circle`   | `boolean`    | `false`     | 是否圆形按钮                   |
| `stretch`  | `boolean`    | `false`     | 是否拉伸宽度                   |

## 事件

| 事件名  | 参数       | 说明     |
| ------- | ---------- | -------- |
| `click` | `e: Event` | 点击按钮 |

## 示例

### 基本按钮

```vue
<yt-button>按钮</yt-button>
<yt-button theme="forest">森林绿</yt-button>
<yt-button theme="ocean">海洋蓝</yt-button>
<yt-button theme="magic">魔法紫</yt-button>
<yt-button theme="blossom">樱花粉</yt-button>
<yt-button theme="sunshine">阳光橙</yt-button>
<yt-button theme="classic">经典白</yt-button>
<yt-button theme="forest-sky">森林星空</yt-button>
<yt-button theme="ocean-sky">海洋星空</yt-button>
<yt-button theme="magic-sky">魔法星空</yt-button>
<yt-button theme="blossom-sky">樱花星空</yt-button>
<yt-button theme="sunshine-sky">阳光星空</yt-button>
```

### 按钮类型

```vue
<yt-button type="primary" theme="forest">主要按钮</yt-button>
<yt-button type="success" theme="forest">成功按钮</yt-button>
<yt-button type="warning" theme="forest">警告按钮</yt-button>
<yt-button type="danger" theme="forest">危险按钮</yt-button>
<yt-button type="info" theme="forest">信息按钮</yt-button>
```

### 按钮尺寸

```vue
<yt-button size="large" theme="ocean">大按钮</yt-button>
<yt-button size="medium" theme="ocean">中按钮</yt-button>
<yt-button size="small" theme="ocean">小按钮</yt-button>
<yt-button size="mini" theme="ocean">迷你按钮</yt-button>
```

### 朴素样式

```vue
<yt-button plain theme="magic">朴素按钮</yt-button>
<yt-button :plain="true" theme="blossom">朴素樱花粉</yt-button>
<yt-button :plain="true" theme="sunshine">朴素阳光橙</yt-button>
```

### 禁用状态

```vue
<yt-button disabled theme="classic">禁用按钮</yt-button>
<yt-button :disabled="true" theme="forest-sky">禁用星空</yt-button>
<yt-button disabled plain theme="ocean-sky">禁用朴素海洋星空</yt-button>
```

### 加载状态

```vue
<yt-button loading theme="magic-sky">加载中</yt-button>
<yt-button :loading="true" theme="blossom-sky">加载中按钮</yt-button>
<yt-button loading disabled theme="sunshine-sky">加载中禁用</yt-button>
```

### 圆形按钮

```vue
<yt-button circle theme="forest">圆形</yt-button>
<yt-button :circle="true" size="small" theme="ocean">小圆形</yt-button>
<yt-button circle plain theme="magic">朴素圆形</yt-button>
<yt-button circle loading theme="blossom">加载圆形</yt-button>
```

### 拉伸宽度

```vue
<yt-button stretch theme="sunshine">拉伸按钮</yt-button>
<yt-button :stretch="true" theme="classic">全宽按钮</yt-button>
<yt-button stretch plain theme="forest-sky">拉伸朴素星空</yt-button>
<yt-button stretch loading theme="ocean-sky">拉伸加载中</yt-button>
```

### 组合使用

```vue
<yt-button
  theme="forest-sky"
  type="primary"
  size="large"
  :plain="false"
  :disabled="false"
  :loading="false"
  :circle="false"
  :stretch="true"
  @click="handleClick"
>
  星空主题按钮
</yt-button>
```
