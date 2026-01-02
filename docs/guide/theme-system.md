# 主题系统 (Theme System)

## 概述

YtUI 统一主题系统，为所有组件提供一致的颜色主题支持。

## 主题色类型

```typescript
type ThemeColor =
  | 'forest' // 森林绿
  | 'ocean' // 海洋蓝
  | 'magic' // 魔法紫
  | 'blossom' // 樱花粉
  | 'sunshine' // 阳光橙
  | 'classic' // 经典白
  | 'forest-sky' // 森林星空
  | 'ocean-sky' // 海洋星空
  | 'magic-sky' // 魔法星空
  | 'blossom-sky' // 樱花星空
  | 'sunshine-sky' // 阳光星空
```

## 主题分类

### 基础主题色

- **forest** - 森林绿
- **ocean** - 海洋蓝
- **magic** - 魔法紫
- **blossom** - 樱花粉
- **sunshine** - 阳光橙
- **classic** - 经典白
- **none** - 无主题（部分组件默认无主题）

### 星空渐变主题色

- **forest-sky** - 森林星空渐变
- **ocean-sky** - 海洋星空渐变
- **magic-sky** - 魔法星空渐变
- **blossom-sky** - 樱花星空渐变
- **sunshine-sky** - 阳光星空渐变

## 特性

- ✅ 所有组件统一主题命名
- ✅ 支持基础色和渐变色
- ✅ 组件级别主题覆盖
- ✅ TypeScript 完全支持

## 使用方式

- 在组件中设置 theme 属性即可
