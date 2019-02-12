import Vue from 'vue'
import App from './App'
import router from './router'

//按需引入mint-ui
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
