import Vue from 'vue'
import App from './App'
import router from './router'
//导入 vue-resource
import vueResource from 'vue-resource'
//安装 vue-resource
Vue.use(vueResource)
//配置vueresource根目录
Vue.http.options.root = 'http://www.lovegf.cn:8899/'
//按需引入mint-ui
// import {Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)   //app.vue中的header
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem) 
// Vue.component(Button.name, Button)  //按钮
// Vue.use(Lazyload) //懒加载
//懒加载必须全局引用才可以显示，按需引用无法显示懒加载图片
import mint from 'mint-ui'
Vue.use(mint)

//导入moment 时间格式化的插件
import moment from 'moment'

//定义一个全局过滤器
Vue.filter("datastr", function(data,parent = 'YYYY-MM-DD') { 
  return moment(data).format(parent)
})

//应用评论子组件
import component from './components/comment'
//定义一个全局组件
Vue.component('combox',component)

//引用清除公共css样式的模块
import './css/common.css'
//引用mui
import './lib/mui/css/mui.css'
import './lib/mui/js/mui.js'

//引用mui扩展字体图标
import './lib/mui/css/icons-extra.css'

//安装注册缩略图的插件
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

//设置post请求体格式
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  router:router
})
