import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/TasksPage.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
  { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue') },
  { path: '/mockups', name: 'mockups', component: () => import('../pages/Mockups.vue') },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../pages/NotFound.vue') }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router