import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginVue from '@/components/Login.vue'
import PatientTableViewVue from '@/views/PatientTableView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/patients',
      name: 'patients',
      component: PatientTableViewVue
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
