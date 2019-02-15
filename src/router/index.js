import Vue from 'vue'
import Router from 'vue-router'

import homeContainer from '@/pages/homeContainer'
import memberContainer from '@/pages/memberContainer'
import shopcarContainer from '@/pages/shopcarContainer'
import searchContainer from '@/pages/searchContainer'
import newListContainer from '@/pages/newListContainer'
import newsinfoContainer from '@/pages/newsinfoContainer'
import photoInfoContainer from '@/pages/photoInfoContainer'
import imageInfoContainer from '../pages/imageInfoContainer'
Vue.use(Router)

export default new Router({
  routes: [
   {path:'/',redirect:'/home'},
   {path:'/home',component:homeContainer},
   {path:'/member',component:memberContainer},
   {path:'/shopcar',component:shopcarContainer},
   {path:'/search',component:searchContainer},
   { path:'/home/newList',component:newListContainer},
   { path:'/home/newList/newsinfo/:id',component:newsinfoContainer},
   { path:'/home/photoInfo',component:photoInfoContainer },
   { path:'/home/imageInfo/:id',component:imageInfoContainer }
  ],
  linkActiveClass:'mui-active'
})
