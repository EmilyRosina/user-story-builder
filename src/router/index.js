import Vue from 'vue'
import Router from 'vue-router'
import DataGroups from '@/pages/DataGroups'
import UserStories from '@/pages/UserStories'
import UserJourney from '@/pages/UserJourney'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dataGroups',
      component: DataGroups
    },
    {
      path: '/stories',
      name: 'userStories',
      component: UserStories
    },
    {
      path: '/journey',
      name: 'userJourney',
      component: UserJourney
    }
  ]
})
