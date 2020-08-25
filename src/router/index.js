import Vue from 'vue'
import Router from 'vue-router'
import Demo from '../ourPlayer/demo'
import Mobile from '../ourPlayer/mobileDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: Demo
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: Mobile
    }
  ]
})
