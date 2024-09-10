import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '',
    redirect: '/page/planet'
  },
  {
    path: '/page/planet',
    component: () => import ('../views/Planet.vue')
  },
  {
    path: '/page/character',
    component: () => import ('../views/Character.vue')
  },
  {
    path: '/page/movie',
    component: () => import ('../views/Film.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
