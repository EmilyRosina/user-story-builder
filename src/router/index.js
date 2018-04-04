import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import DataGroups from '@/pages/DataGroups'
import UserStories from '@/pages/UserStories'
import UserJourney from '@/pages/UserJourney'
import PageNotFound from '@/pages/PageNotFound'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/data',
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
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
