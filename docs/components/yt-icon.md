# yt-icon 图标组件

## 属性

| 属性名   | 类型               | 默认值        | 说明         |
| -------- | ------------------ | ------------- | ------------ |
| `name`   | `string`           | `''`          | 图标名称     |
| `size`   | `number`           | `24`          | 图标大小     |
| `width`  | `number \| string` | `60`          | 图标宽度     |
| `height` | `number \| string` | `60`          | 图标高度     |
| `fit`    | `ImageMode`        | `'aspectFit'` | 图片适配模式 |

## 事件

| 事件名  | 参数     | 说明     |
| ------- | -------- | -------- |
| `click` | `e: any` | 点击图标 |

## 可用图标

以下为全部可用图标名称,可直接传给 `<yt-icon :name="图标名称" />` 使用。

<script setup>
import { ref, computed } from 'vue'

const ICON_BASE_URL = 'https://zjyt.cqytxy.edu.cn/static/yt-ui/icons'

const icons = {
  Home: 'home.png',
  Course: 'course.png',
  Community: 'community.png',
  Me: 'me.png',
  QRcode: 'QRcode.png',
  HomeActive: 'home_active.png',
  CourseActive: 'course_active.png',
  CommunityActive: 'community_active.png',
  MeActive: 'me_active.png',
  ArrowLeft: 'arrow_left.png',
  ArrowRight: 'arrow_right.png',
  ArrowUp: 'arrow_up.png',
  ArrowDown: 'arrow_down.png',
  ArrowLeftWhite: 'arrow_left_white.png',
  ArrowRightWhite: 'arrow_right_white.png',
  ArrowUpWhite: 'arrow_up_white.png',
  ArrowDownWhite: 'arrow_down_white.png',
  Calendar: 'calendar.png',
  DefaultAvatar: 'default_avatar.png',
  DoorEnter: 'door_enter.png',
  DoorExit: 'door_exit.png',
  Edit: 'edit.png',
  Identity: 'identity.png',
  Official: 'official.png',
  Passed: 'passed.png',
  Unpassed: 'unpassed.png',
  SuccessResult: 'success_result.png',
  FailResult: 'fail_result.png',
  InfoResult: 'info_result.png',
  Time: 'time.png',
  Slider: 'slider.png',
  Close: 'close.png',
  Search: 'search.png',
  Plus: 'plus.png',
  Fail: 'fail.png',
  Done: 'done.png',
  Empty: 'empty.png',
  Champion: 'champion.png',
  Error: 'error.png',
  FirstPlace: 'first_place.png',
  SecondPlace: 'second_place.png',
  ThirdPlace: 'third_place.png',
  Winner: 'winner.png',
  Read: 'read.png',
  About: 'about.png',
  AcademyAdministration: 'academy_administration.png',
  AcademyAdministrationFill: 'academy_administration_fill.png',
  AcademyApply: 'academy_apply.png',
  AcademyApplyFill: 'academy_apply_fill.png',
  Accredit: 'accredit.png',
  ActiveHome: 'active_home.png',
  ActiveLike: 'active_like.png',
  ActiveMy: 'active_my.png',
  ActivePosition: 'active_position.png',
  ActiveRecord: 'active_record.png',
  AdminGeneral: 'admin_general.png',
  AdminSuper: 'admin_super.png',
  Advice: 'advice.png',
  Arrow: 'arrow.png',
  Arrow1: 'arrow_1.png',
  BackIconDay: 'back_icon_day.png',
  Background: 'background.png',
  BelongIcon: 'belong_icon.png',
  BlackRadius: 'black_radius.png',
  CalendarIcon: 'calendar_icon.png',
  Card: 'card.png',
  Champ: 'champ.png',
  Charts: 'charts.png',
  Checked: 'checked.png',
  Circle: 'circle.png',
  CommitFail: 'commit_fail.png',
  Community1: 'community_1.png',
  Community1Active: 'community_1_active.png',
  CommunityLogo: 'community_logo.png',
  Contact: 'contact.png',
  Create: 'create.png',
  CurrentPage: 'current_page.png',
  Default: 'default.png',
  Door: 'door.png',
  Drafts: 'drafts.png',
  Electric: 'electric.png',
  EveryDepartmentIcon: 'every_department_icon.png',
  Exam: 'exam.png',
  ExamSchedule: 'exam_schedule.png',
  ExamSearch: 'exam_search.png',
  Exclude: 'exclude.png',
  ExitAndEntrance: 'exit_and_entrance.png',
  Export: 'export.png',
  ExportIcon: 'export_icon.png',
  Feedback: 'feedback.png',
  FillingIn: 'filling_in.png',
  Fingerprint: 'fingerprint.png',
  Firewood: 'firewood.png',
  FunctionIcon: 'function_icon.png',
  GateCheck: 'gate_check.png',
  Group01: 'group_01.png',
  Group02: 'group_02.png',
  Group03: 'group_03.png',
  Group1848: 'group_1848.png',
  Group2347: 'group_2347.png',
  GuanyunAcademy: 'guanyun_academy.png',
  GujianAcademy: 'gujian_academy.png',
  Hechuan: 'hechuan.png',
  History: 'history.png',
  Hot: 'hot.png',
  HotPost2: 'hot_post_2.png',
  HotTitle2: 'hot_title_2.png',
  HotRankIcon: 'hot_rank_icon.png',
  HotTitle: 'hot_title.png',
  HotPost: 'hot_post.png',
  HotTopic: 'hot_topic.png',
  Icon0: 'icon_0.png',
  Icon1: 'icon_1.png',
  Icon2: 'icon_2.png',
  Icon3: 'icon_3.png',
  Icon4: 'icon_4.png',
  Illustration: 'illustration.png',
  Index: 'index.png',
  IndexActive: 'index_active.png',
  InterButton: 'inter_button.png',
  Jiaob: 'jiaob.png',
  Left: 'left.png',
  LessonIcon: 'lesson_icon.png',
  LibraryReservation: 'library_reservation.png',
  Like: 'like.png',
  Logo: 'logo.png',
  Logo1: 'logo_1.png',
  LogoNoText: 'logo_no_text.png',
  Map: 'map.png',
  Message: 'message.png',
  My: 'my.png',
  MyActive: 'my_active.png',
  MyPage: 'my_page.png',
  MyPageActive: 'my_page_active.png',
  New: 'new.png',
  NoteTimeIcon: 'note_time_icon.png',
  Notice: 'notice.png',
  Orange1: 'orange_1.png',
  Orange2: 'orange_2.png',
  Outlet: 'outlet.png',
  Position: 'position.png',
  Post: 'post.png',
  QiheAcademy: 'qihe_academy.png',
  Qijiang: 'qijiang.png',
  Record: 'record.png',
  Report: 'report.png',
  ReservationTime: 'reservation_time.png',
  Right: 'right.png',
  RoundedTriangle: 'rounded_triangle.png',
  SearchIcon: 'search_icon.png',
  SearchIcon2: 'search_icon_2.png',
  Select: 'select.png',
  SelectStyle: 'select_style.png',
  SelectTime: 'select_time.png',
  Set: 'set.png',
  SetIcon: 'set_icon.png',
  Share: 'share.png',
  Stair: 'stair.png',
  Statistics: 'statistics.png',
  Status: 'status.png',
  StepActivate: 'step_activate.png',
  StudentManageLocation: 'student_manage_location.png',
  StudentSearcher: 'student_searcher.png',
  StudentStatus: 'student_status.png',
  SubmitApplyUnactivate: 'submit_apply_unactivate.png',
  SubmitError: 'submit_error.png',
  SubmitSuccess: 'submit_success.png',
  Subtract: 'subtract.png',
  Success: 'success.png',
  Swimming: 'swimming.png',
  TeacherManageLocation: 'teacher_manage_location.png',
  TeacherStatus: 'teacher_status.png',
  Telephone: 'telephone.png',
  TestArrangement: 'test_arrangement.png',
  TestLevel: 'test_level.png',
  Top1: 'top_1.png',
  Top2: 'top_2.png',
  Top3: 'top_3.png',
  Trophy: 'trophy.png',
  Unreviewed: 'unreviewed.png',
  UploadFile: 'upload_file.png',
  UploadImg: 'upload_img.png',
  UserBackground: 'user_background.png',
  Wait: 'wait.png',
  Walk: 'walk.png',
  WriteMsgUnactivate: 'write_msg_unactivate.png',
  YingxiAcademy: 'yingxi_academy.png',
  YutangAcademy: 'yutang_academy.png',
  ZjytLogo: 'zjyt_logo.png',
}

const keyword = ref('')
const filteredIcons = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return icons
  return Object.fromEntries(
    Object.entries(icons).filter(([name]) => name.toLowerCase().includes(kw)),
  )
})
</script>

<div class="yt-icon-search">
  <input
    v-model="keyword"
    class="yt-icon-search-input"
    type="search"
    placeholder="搜索图标名称，如 Home / arrow…"
  />
  <span v-if="keyword.trim()" class="yt-icon-search-count">
    匹配 {{ Object.keys(filteredIcons).length }} / {{ Object.keys(icons).length }} 个
  </span>
</div>

<div v-if="Object.keys(filteredIcons).length" class="yt-icon-gallery">
  <div v-for="(file, name) in filteredIcons" :key="name" class="yt-icon-item">
    <img :src="ICON_BASE_URL + '/' + file" :alt="name" loading="lazy" @click.stop/>
    <span>{{ name }}</span>
  </div>
</div>
<div v-else class="yt-icon-empty">未找到匹配的图标</div>

<style>
.yt-icon-search {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0 8px;
}
.yt-icon-search-input {
  box-sizing: border-box;
  flex: 1;
  max-width: 320px;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.yt-icon-search-input:focus {
  border-color: #3eaf7c;
}
.yt-icon-search-count {
  font-size: 13px;
  color: #909399;
}
.yt-icon-empty {
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #909399;
}
.yt-icon-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 14px;
  margin: 16px 0;
}
.yt-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #eee;
}
.yt-icon-item:hover {
  border-color: #3eaf7c;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.yt-icon-item img {
  cursor: initial;
  width: 44px;
  height: 44px;
  object-fit: contain;
}
.yt-icon-item span {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.4;
  color: #606266;
  word-break: break-all;
  text-align: center;
}
</style>

## 示例

### 基本图标

```vue
<yt-icon name="Home" />

<yt-icon name="Search" />

<yt-icon name="Close" />
```

### 不同大小

```vue
<yt-icon name="Home" :size="16" />

<yt-icon name="Home" :size="24" />

<yt-icon name="Home" :size="32" />

<yt-icon name="Home" :size="48" />
```

### 自定义宽高

```vue
<yt-icon name="DefaultAvatar" :width="80" :height="80" />

<yt-icon name="QRcode" width="100%" height="auto" />

<yt-icon name="ArrowLeft" :width="30" :height="30" />
```

### 图片模式

```vue
<yt-icon name="DefaultAvatar" fit="aspectFill" />

<yt-icon name="QRcode" fit="widthFix" />

<yt-icon name="Official" fit="scaleToFill" />
```

### 导航图标

```vue
<view class="nav-bar">
  <yt-icon name="Home" :size="20" />
  <yt-icon name="Course" :size="20" />
  <yt-icon name="Community" :size="20" />
  <yt-icon name="Me" :size="20" />
</view>
```

### 激活状态图标

```vue
<view class="tab-bar">
  <yt-icon :name="activeTab === 'home' ? 'HomeActive' : 'Home'" />
  <yt-icon :name="activeTab === 'course' ? 'CourseActive' : 'Course'" />
  <yt-icon :name="activeTab === 'community' ? 'CommunityActive' : 'Community'" />
  <yt-icon :name="activeTab === 'me' ? 'MeActive' : 'Me'" />
</view>
```

### 箭头图标

```vue
<view class="arrow-buttons">
  <yt-icon name="ArrowLeft" @click="goBack" />
  <yt-icon name="ArrowRight" @click="goForward" />
  <yt-icon name="ArrowUp" @click="scrollToTop" />
  <yt-icon name="ArrowDown" @click="scrollToBottom" />
</view>

<view class="white-arrows">
  <yt-icon name="ArrowLeftWhite" />
  <yt-icon name="ArrowRightWhite" />
  <yt-icon name="ArrowUpWhite" />
  <yt-icon name="ArrowDownWhite" />
</view>
```

### 状态图标

```vue
<view v-if="status === 'passed'">
  <yt-icon name="Passed" />
  <span>已通过</span>
</view>

<view v-if="status === 'unpassed'">
  <yt-icon name="Unpassed" />
  <span>未通过</span>
</view>

<view v-if="isOfficial">
  <yt-icon name="Official" />
  <span>官方认证</span>
</view>
```

### 结果图标

```vue
<view v-if="result === 'success'">
  <yt-icon name="SuccessResult" :size="32" />
  <span>操作成功</span>
</view>

<view v-if="result === 'fail'">
  <yt-icon name="FailResult" :size="32" />
  <span>操作失败</span>
</view>

<view v-if="result === 'info'">
  <yt-icon name="InfoResult" :size="32" />
  <span>提示信息</span>
</view>
```

### 时间相关

```vue
<view class="time-info">
  <yt-icon name="Time" :size="16" />
  <span>{{ formatTime(time) }}</span>
</view>

<view class="calendar">
  <yt-icon name="Calendar" />
  <span>选择日期</span>
</view>
```

### 空状态图标

```vue
<view v-if="list.length === 0" class="empty-state">
  <yt-icon name="Empty" :size="60" />
  <span>暂无数据</span>
</view>

<view v-if="isWinner" class="winner">
  <yt-icon name="Winner" :size="80" />
  <span>冠军!</span>
</view>
```

### 排名图标

```vue
<view class="ranking">
  <view v-if="rank === 1">
    <yt-icon name="FirstPlace" />
    <span>第一名</span>
  </view>
  <view v-if="rank === 2">
    <yt-icon name="SecondPlace" />
    <span>第二名</span>
  </view>
  <view v-if="rank === 3">
    <yt-icon name="ThirdPlace" />
    <span>第三名</span>
  </view>
</view>
```

### 事件处理

```vue
<yt-icon name="Close" :size="20" @click="handleClose" />

<yt-icon name="Search" :size="24" @click="handleSearch" />
```

### 组合使用

```vue
<view class="action-buttons">
  <view class="button" @click="edit">
    <yt-icon name="Edit" :size="20" />
    <span>编辑</span>
  </view>
  <view class="button" @click="search">
    <yt-icon name="Search" :size="20" />
    <span>搜索</span>
  </view>
  <view class="button" @click="add">
    <yt-icon name="Plus" :size="20" />
    <span>添加</span>
  </view>
</view>
```

### 完整示例

```vue
<view class="user-card">
  <view class="header">
    <yt-icon name="DefaultAvatar" :width="60" :height="60" fit="aspectFill" />
    <view class="user-info">
      <view class="name">
        <span>张三</span>
        <yt-icon v-if="isOfficial" name="Official" :size="16" />
      </view>
      <view class="status">
        <yt-icon v-if="isPassed" name="Passed" :size="14" />
        <span v-else>未认证</span>
      </view>
    </view>
  </view>
  <view class="actions">
    <view class="action" @click="sendMessage">
      <yt-icon name="DoorEnter" :size="20" />
      <span>发消息</span>
    </view>
    <view class="action" @click="viewProfile">
      <yt-icon name="Identity" :size="20" />
      <span>查看资料</span>
    </view>
    <view class="action" @click="close">
      <yt-icon name="Close" :size="20" />
      <span>关闭</span>
    </view>
  </view>
</view>
```
