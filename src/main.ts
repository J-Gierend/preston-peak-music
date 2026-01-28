import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router'
import 'virtual:uno.css'
import './styles/base.css'
import './styles/themes.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Only scroll to top when navigating to a different page path
    // Don't scroll for hash changes (modal open/close) on same page
    if (to.path === from.path) {
      return false
    }
    // Use saved position (back/forward) or scroll to top for new pages
    return savedPosition || { top: 0 }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
