import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '@/components/layout/Base.vue'
import HumanityView from '@/views/Humanity.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Base,
    children: [
      {
        path: '',
        name: 'Humanity',
        component: HumanityView,
      },
      {
        path: '/settings',
        name: 'Settings',
        // route level code-splitting
        // this generates a separate chunk (settings.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "nav" */ '../views/Settings.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
