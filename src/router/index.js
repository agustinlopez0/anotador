import Vue from 'vue'
import VueRouter from 'vue-router'
import Events from '../views/Events.vue'
import Subjects from '../views/Subjects.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/events'
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: Subjects
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
