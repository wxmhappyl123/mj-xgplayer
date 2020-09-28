import Vue from 'vue'
import Router from 'vue-router'
import Demo from '../../packages/ourPlayer/demos/pcDemo'
import Mobile from '../../packages/ourPlayer/demos/mobileDemo'

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
