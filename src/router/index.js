import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Contact',
      component: () => import('../views/contact/Index.vue')
    },
  ]
})

export default router
