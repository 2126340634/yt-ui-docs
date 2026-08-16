import { defineClientConfig } from 'vuepress/client'
import SearchBox from './components/SearchBox.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 注册为全局组件后，主题导航栏的 <SearchBox /> 会自动渲染
    app.component('SearchBox', SearchBox)
  },
})
