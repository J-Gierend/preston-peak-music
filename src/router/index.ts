import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/works',
    name: 'works',
    component: () => import('../pages/WorksPage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue')
  },
  {
    path: '/classical',
    redirect: '/works'
  },
  {
    path: '/classical/:category',
    redirect: '/works'
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
    path: '/status',
    name: 'status',
    component: () => import('../pages/StatusPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
