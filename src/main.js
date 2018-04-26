// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import plugins from 'utils/plugins'
import filters from 'utils/filters'
import { objectsMatch } from 'utils/mixins'

import GlobalStyles from '@/assets/style/main.scss'
import GlobalComponents from 'utils/globalComponents'

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.mixin(objectsMatch)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
