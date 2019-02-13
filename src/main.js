import Vue from 'vue'
import App from './App'
import router from './router'
//导入 vue-resource
import vueResource from 'vue-resource'
//安装 vue-resource
Vue.use(vueResource)
//配置vueresource根目录
Vue.http.options.root = 'http://www.lovegf.cn:8899'
//按需引入mint-ui
import {Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入moment 时间格式化的插件
import moment from 'moment'

//定义一个全局过滤器
Vue.filter("datastr", function(data,parent = 'YYYY-MM-DD') { 
  return moment(data).format(parent)
});
//引用清除公共css样式的模块
import './css/common.css'
//引用mui
import './lib/mui/css/mui.css'

//引用mui扩展字体图标
import './lib/mui/css/icons-extra.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  router:router
})
