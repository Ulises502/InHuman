import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'UpgradeInfo',
        component: () => import('../components/UpgradeInfo.vue')
      },
      {
        path: 'survival',
        name: 'Survival',
        component: () => import('../components/Survival.vue')
      },
      {
        path: 'might',
        name: 'Might',
        component: () => import('../components/Might.vue')
      },
      {
        path: 'faith',
        name: 'Faith',
        component: () => import('../components/Faith.vue')
      },
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: () => import('../components/Knowledge.vue')
      },
      {
        path: 'cooperation',
        name: 'Cooperation',
        component: () => import('../components/Cooperation.vue')
      },
      {
        path: 'culture',
        name: 'Culture',
        component: () => import('../components/Culture.vue')
      },
      {
        path: 'ethics',
        name: 'Ethics',
        component: () => import('../components/Ethics.vue')
      }
 ]
  },
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" *//* '../views/About.vue')
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
