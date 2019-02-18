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

//安装Vuex并导入，注册
import Vuex from 'vuex'
Vue.use(Vuex)

//设置post请求体格式
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

let car = JSON.parse(localStorage.getItem('car') || '[]')
//创建vuex store实例，得到一个数据仓储对象
const store = new Vuex.Store({
  state:{
    //专门用来存储数据
  car    //商品的id，商品的单价prices，商品的购买数量count，商品是否被选中selected
  },
  mutations:{
    //如果要操作store中的state值，只能通过调用mutations提供的方法，才能操作对应的数据，
    //不推荐直接操作state中的数据因为万一导致了数据的紊乱，不能快速定位到错误的原因
    //注意：如果组件想要调用mutations中的方法，只能使用this.$store.commit('方法名')

    //加入购物车的业务逻辑：  1. 即将要加入的商品是否在购物车已存在,  2. 如果存在只需要更新数量信息即可 3. 如果不存在只需要push进car数组即可
    addTocar(state,price){
       let index =  state.car.findIndex(item=>  item.id === price.id)
        if(index === -1){
          state.car.push(price)
        }else{
          state.car[index].count += parseInt( price.count)
        }
        localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{
    //这里的getters，只负责对外提供数据，不复杂修改数据
    Totalcount(state){
      let total = 0
      state.car.forEach(item => {
        total += item.count
      });
      return total
    }
  }

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store, //将创建的store实例挂载到vm实例上，只要挂载到了vm上，任何组件都能使用store来存取数据
})
