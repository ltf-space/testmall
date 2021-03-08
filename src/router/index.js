import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const home = ()=>import('../views/home/home')
const shopcar = ()=>import('../views/car/shopcar')
const category = ()=>import('../views/category/category')
const profile = ()=>import('../views/profile/profile')

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'home'
    },
    {
      path:'/home',
      component:home
    },
    {
      path:'/category',
      component:category
    },
    {
      path:'/shopcar',
      component:shopcar
    },
    {
      path:'/profile',
      component:profile
    }
  ],
  mode:'history'
})
