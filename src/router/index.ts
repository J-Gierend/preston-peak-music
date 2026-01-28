import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue')
  },
  {
    path: '/classical',
    redirect: '/'
  },
  {
    path: '/classical/:category',
    redirect: '/'
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('../pages/GamesPage.vue')
  },
  {
    path: '/listen',
    name: 'listen',
    component: () => import('../pages/ListenPage.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../pages/NewsPage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
