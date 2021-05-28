import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.userInfo.userToken
  if (token) {
    next()
  } else {
    if (to.path.includes('login')) {
      next()
    } else {
      router.push('/login')
    }
  }
})

router.afterEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
