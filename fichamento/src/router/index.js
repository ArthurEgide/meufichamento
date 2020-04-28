import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BookRegister from '../views/RegisterBook.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requeresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/register/book',
    name: 'Register Book',
    component: BookRegister,
    meta: {
      requeresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  console.log("Navegando de: " , from)
  console.log("Navegando para: " , to)
  if (to.name !== 'Login' && !currentUser) next({ name: 'Login' })
  if ((to.name == 'Login' || to.name == 'Register') && currentUser) next({ name: 'Home' })
  else next()
})

export default router