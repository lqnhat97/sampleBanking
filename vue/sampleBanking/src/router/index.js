import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import HelloWorld from '@/components/HelloWorld'
import menu from '@/components/menu'
=======
import Login from '@/components/Login'
>>>>>>> e60b86b7a80670b0e3eba6c4da8763bcd789fa99

Vue.use(Router)

export default new Router({
  mode :'history',
  routes: 
  [
    { 
      path: '/',
<<<<<<< HEAD
      name: 'menu',
      component: menu
=======
      component: Login
>>>>>>> e60b86b7a80670b0e3eba6c4da8763bcd789fa99
    }
  ]
})
