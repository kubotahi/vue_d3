import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/01',
    name: '01',
    component: () => import('../views/01.vue')
  },
  {
    path: '/02',
    name: '02',
    component: () => import('../views/02.vue')
  },
  {
    path: '/03',
    name: '03',
    component: () => import('../views/03.vue')
  },
  {
    path: '/04',
    name: '04',
    component: () => import('../views/04.vue')
  },
  {
    path: '/05',
    name: '05',
    component: () => import('../views/05.vue')
  },
  {
    path: '/06',
    name: '06',
    component: () => import('../views/06.vue')
  },
  {
    path: '/07',
    name: '07',
    component: () => import('../views/07.vue')
  },
  {
    path: '/08',
    name: '08',
    component: () => import('../views/08.vue')
  },
  {
    path: '/09',
    name: '09',
    component: () => import('../views/09.vue')
  },
  {
    path: '/10',
    name: '10',
    component: () => import('../views/10.vue')
  },
  {
    path: '/11',
    name: '11',
    component: () => import('../views/11.vue')
  },
  {
    path: '/12',
    name: '12',
    component: () => import('../views/12.vue')
  },
  {
    path: '/13',
    name: '13',
    component: () => import('../views/13.vue')
  },
  {
    path: '/14',
    name: '14',
    component: () => import('../views/14.vue')
  },
  {
    path: '/15',
    name: '15',
    component: () => import('../views/15.vue')
  },
  {
    path: '/16',
    name: '16',
    component: () => import('../views/16.vue')
  },
  {
    path: '/17',
    name: '17',
    component: () => import('../views/17.vue')
  },
  {
    path: '/18',
    name: '18',
    component: () => import('../views/18.vue')
  },
  {
    path: '/19',
    name: '19',
    component: () => import('../views/19.vue')
  },
  {
    path: '/20',
    name: '20',
    component: () => import('../views/20.vue')
  },
  {
    path: '/21',
    name: '21',
    component: () => import('../views/21.vue')
  },
  {
    path: '/22',
    name: '22',
    component: () => import('../views/22.vue')
  },
  {
    path: '/23',
    name: '23',
    component: () => import('../views/23.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
