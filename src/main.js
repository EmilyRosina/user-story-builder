// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import plugins from './store/utility/plugins'
import filters from './store/utility/filters'

import GlobalStyles from '@/assets/style/main.scss'
import GlobalComponents from './store/utility/globalComponents'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
