import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'
import store from './store/'

// 把所有api接口，都挂在Vue原型链上
import http from '@/utils/api'
Vue.prototype.$http = http

import img from '@/utils/img'
Vue.prototype.$img = img


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
