/* eslint-disable no-unused-vars */
import Vue from 'vue'

// Element UI
import ElementUI from 'element-ui'
import ElementUIStyles from 'element-ui/lib/theme-chalk/index.css'

// Vue Awesome
import Icon from 'vue-awesome/components/Icon'
import VueAwesomeIcons from 'vue-awesome/icons'

// Vue Analytics
import vueAnalytics from 'vue-analytics'
import router from '@/router'

Vue.use(ElementUI)
Vue.component('icon', Icon)
Vue.use(vueAnalytics, {
  id: 'UA-118476098-1',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  },
  router,
  autoTracking: {
    shouldRouterUpdate (to, from) { return to.path !== from.path }
  }
})
