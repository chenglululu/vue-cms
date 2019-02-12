import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import homeContainer from '@/pages/homeContainer'
import memberContainer from '@/pages/memberContainer'
import shopcarContainer from '@/pages/shopcarContainer'
import searchContainer from '@/pages/searchContainer'

Vue.use(Router)

export default new Router({
  routes: [
   {path:'/',redirect:'/home'},
   {path:'/home',component:homeContainer},
   {path:'/member',component:memberContainer},
   {path:'/shopcar',component:shopcarContainer},
   {path:'/search',component:searchContainer}
  ],
  linkActiveClass:'mui-active'
})
