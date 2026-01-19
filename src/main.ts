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
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
