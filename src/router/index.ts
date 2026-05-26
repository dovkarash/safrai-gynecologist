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
