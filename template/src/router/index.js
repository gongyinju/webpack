import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/products',
    component: function (resolve) {
      require(['@/views/Products'], resolve)
    }
  }
]

var router = new VueRouter({
  routes
})

export default router
