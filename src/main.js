// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/main.scss'

Vue.use(ElementUI)
Vue.component('icon', Icon)
// require('element-ui/lib/theme-chalk/index.css')
// require('@/assets/main.scss')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
