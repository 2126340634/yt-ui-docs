<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vuepress/client'
import { searchIndex } from '@temp/yt-search-index.js'

const router = useRouter()

const query = ref('')
const focused = ref(false)
const activeIndex = ref(-1)

const norm = (s) => s.toLowerCase()

// 模糊打分，0 表示不匹配
function score(q, item) {
  const qq = norm(q)
  if (!qq) return 0
  const name = norm(item.name) // yt-input
  const label = norm(item.label) // 输入框
  const title = norm(item.title) // yt-input 输入框组件

  if (name === qq) return 100
  if (name.startsWith(qq)) return 90
  if (name.includes(qq)) return 80
  if (label.includes(qq)) return 70
  if (title.includes(qq)) return 60
  // 兜底模糊：query 的每个字符都按顺序出现在标题中
  let i = 0
  for (const ch of qq) {
    i = title.indexOf(ch, i)
    if (i === -1) return 0
    i += 1
  }
  return 40
}

const results = computed(() => {
  const q = query.value.trim()
  if (!q) return []
  return searchIndex
    .map((item) => ({ item, s: score(q, item) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 8)
    .map((r) => r.item)
})

const showDropdown = computed(
  () => focused.value && query.value.trim() && results.value.length > 0,
)

function go(item) {
  query.value = ''
  activeIndex.value = -1
  router.push(item.path)
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    query.value = ''
  } else if (e.key === 'ArrowDown') {
    activeIndex.value = Math.min(results.value.length - 1, activeIndex.value + 1)
  } else if (e.key === 'ArrowUp') {
    activeIndex.value = Math.max(0, activeIndex.value - 1)
  } else if (e.key === 'Enter' && activeIndex.value >= 0) {
    go(results.value[activeIndex.value])
  }
}
</script>

<template>
  <div class="yt-search">
    <input
      v-model="query"
      class="yt-search-input"
      type="search"
      placeholder="搜索组件…"
      @focus="focused = true"
      @blur="focused = false"
      @keydown="onKeydown"
    />
    <ul v-if="showDropdown" class="yt-search-dropdown">
      <li
        v-for="(item, i) in results"
        :key="item.path"
        :class="{ active: i === activeIndex }"
        @mousedown.prevent
        @click="go(item)"
      >
        <span class="yt-search-name">{{ item.name }}</span>
        <span class="yt-search-label">{{ item.label }}</span>
      </li>
    </ul>
    <div
      v-else-if="focused && query.trim() && !results.length"
      class="yt-search-empty"
    >
      未找到匹配的组件
    </div>
  </div>
</template>

<style scoped>
.yt-search {
  position: relative;
  margin-inline-start: 1rem;
}

.yt-search-input {
  box-sizing: border-box;
  width: 10rem;
  height: var(--navbar-line-height);
  padding: 0 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font-size: 0.9rem;
  outline: none;
  transition:
    width 0.2s,
    border-color 0.2s;
}

.yt-search-input:focus {
  width: 13rem;
  border-color: var(--vp-c-accent);
}

.yt-search-input::placeholder {
  color: var(--vp-c-text-mute);
}

.yt-search-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 100;
  min-width: 14rem;
  max-height: 20rem;
  margin: 0;
  padding: 0.25rem 0;
  overflow: auto;
  list-style: none;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
}

.yt-search-dropdown li {
  padding: 0.35rem 0.75rem;
  cursor: pointer;
}

.yt-search-dropdown li:hover,
.yt-search-dropdown li.active {
  background: var(--vp-c-accent-soft);
}

.yt-search-name {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.85rem;
  color: var(--vp-c-accent);
}

.yt-search-label {
  margin-inline-start: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text);
}

.yt-search-empty {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 100;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-mute);
}

@media screen and (max-width: 719px) {
  .yt-search {
    display: none;
  }
}
</style>
