import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import menu from '@/components/menu'

Vue.use(Router)

export default new Router({
  mode :'history',
  routes: 
  [
    { 
      path: '/',
      name: 'menu',
      component: menu
    }
  ]
})
