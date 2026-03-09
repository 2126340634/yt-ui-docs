import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base: '/yt-ui/docs/',
  lang: 'zh-CN',
  title: 'Yt-UI',
  description: '一个简易的轻量级 Uni-app 组件库 for 指尖移通 5.0 微信小程序 ',
  theme: defaultTheme({
    logo: '/images/zjyt-logo-light.png',
    logoDark: '/images/zjyt-logo-dark.png',
    navbar: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/get-started.md' },
      { text: '组件文档', link: '/components/yt-avatar.md' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '导航',
          children: [
            { text: '快速开始', link: '/guide/get-started.md' },
            { text: '主题系统', link: '/guide/theme-system.md' },
            { text: '所有组件', link: '/components/yt-avatar.md' }
          ]
        }
      ],
      '/components/': [
        {
          text: '表单组件',
          children: [
            { text: '输入框 Input', link: '/components/yt-input.md' },
            { text: '多行输入框 Textarea', link: '/components/yt-textarea.md' },
            { text: '开关 Switch', link: '/components/yt-switch.md' },
            { text: '多选框组 CheckboxGroup', link: '/components/yt-checkbox-group.md' },
            { text: '单选框组 RadioGroup', link: '/components/yt-radio-group.md' },
            { text: '滑块 Slider', link: '/components/yt-slider.md' },
            { text: '选择器 Picker', link: '/components/yt-picker.md' },
            { text: '日历 Calendar', link: '/components/yt-calendar.md' },
            { text: '表单 Form', link: '/components/yt-form.md' }
          ]
        },
        {
          text: '展示组件',
          children: [
            { text: '头像 Avatar', link: '/components/yt-avatar.md' },
            { text: '徽标 Badge', link: '/components/yt-badge.md' },
            { text: '卡片 Card', link: '/components/yt-card.md' },
            { text: '标签 Tag', link: '/components/yt-tag.md' },
            { text: '步骤条 Steps', link: '/components/yt-steps.md' },
            { text: '结果页 Result', link: '/components/yt-result.md' },
            { text: '空状态 Empty', link: '/components/yt-empty.md' },
            { text: '虚拟列表 VirtualList', link: '/components/yt-virtual-list.md' }
          ]
        },
        {
          text: '交互组件',
          children: [
            { text: '按钮 Button', link: '/components/yt-button.md' },
            { text: '悬浮按钮 FAB', link: '/components/yt-fab.md' },
            { text: '图标 Icon', link: '/components/yt-icon.md' },
            { text: '搜索 Search', link: '/components/yt-search.md' },
            { text: '分段器 Segment', link: '/components/yt-segment.md' },
            { text: '轮播 Swiper', link: '/components/yt-swiper.md' },
            { text: '指示点 Dots', link: '/components/yt-dots.md' }
          ]
        },
        {
          text: '反馈组件',
          children: [
            { text: '加载 Loading', link: '/components/yt-loading.md' },
            { text: '弹窗 Popup', link: '/components/yt-popup.md' },
            { text: '遮罩层 Overlay', link: '/components/yt-overlay.md' },
            { text: '通告栏 NoticeBar', link: '/components/yt-notice-bar.md' }
          ]
        },
        {
          text: '导航组件',
          children: [
            { text: '标签栏 Tabbar', link: '/components/yt-tabbar.md' },
            { text: '顶部标签栏 TopTabbar', link: '/components/yt-top-tabbar.md' },
            { text: '折叠面板 Collapse', link: '/components/yt-collapse.md' },
            { text: '课程表 Schedule', link: '/components/yt-schedule.md' }
          ]
        },
        {
          text: '布局组件',
          children: [
            { text: '分割线 Divider', link: '/components/yt-divider.md' },
            { text: '链接 Line', link: '/components/yt-line.md' },
            { text: '可移动视图 MovableView', link: '/components/yt-movable-view.md' }
          ]
        }
      ]
    }
  }),

  bundler: viteBundler()
})
