// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import Icon from 'vue-awesome/components/Icon'
import VueAwesomeIcons from 'vue-awesome/icons'
import ElementUIStyles from 'element-ui/lib/theme-chalk/index.css'
import GlobalStyles from '@/assets/style/main.scss'
import GlobalComponents from '@/components/_global'

Vue.use(ElementUI)
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
