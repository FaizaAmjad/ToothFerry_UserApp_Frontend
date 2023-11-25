import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Questionnaire from '../views/emergencyForm.vue'
import AppointmentView from '../views/AppointmentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    { 
      path: '/appointment',
      name: 'appointment',
      component: AppointmentView

    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: Questionnaire
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login-view',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
