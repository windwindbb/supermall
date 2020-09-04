import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'


Vue.config.productionTip = false

// 给$bus 赋值一个new Vue()实例  因此$bus 才能作为事件总线
Vue.prototype.$bus = new Vue()

// 挂载toast
Vue.use(toast)

// 解决移动端300ms的延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
