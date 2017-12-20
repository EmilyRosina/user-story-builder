import Vue from 'vue'
import Router from 'vue-router'
import DataGroups from '@/pages/DataGroups'
import UserStories from '@/pages/UserStories'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DataGroups',
      component: DataGroups
    },
    {
      path: '/stories',
      name: 'UserStories',
      component: UserStories
    }
  ]
})
