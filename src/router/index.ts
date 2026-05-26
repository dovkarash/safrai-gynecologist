import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: async () => import('@/views/Home.vue'),
    },
    {
      path: '/sideList',
      name: 'SideList',
      component: async () => import('@/views/SideList.vue'),
    },
    {
      path: '/fullList',
      name: 'FullList',
      component: async () => import('@/views/FullList.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: async () => import('@/views/Settings.vue'),
    },
    {
      path: '/table',
      name: 'Table',
      component: async () => import('@/views/Table.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: async () => import('@/views/auth/Signup.vue'),
      meta: { hideMenu: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: async () => import('@/views/auth/Login.vue'),
      meta: { hideMenu: true },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: async () => import('@/views/auth/ForgotPassword.vue'),
      meta: { hideMenu: true },
    },
    {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: async () => import('@/views/auth/ResetPassword.vue'),
      meta: { hideMenu: true },
    },
    {
      // Always last route
      path: '/:catchAll(.*)*',
      name: '404',
      component: async () => import('@/views/404.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        behavior: 'smooth',
        el: to.hash,
        offset: { top: 0, left: 0 },
      }
    }
    return { top: 0, left: 0 }
  },
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    Object.assign(window, { location: to.fullPath })
  }
})

export default router
