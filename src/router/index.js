import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: layout,
      children: [{
        path: '/buttons',
        component: require('../views/buttons.vue').default
      },
      {
        path: '/typography',
        component: require('../views/typography.vue').default
      },
      {
        path: '/panel',
        component: require('../views/panel.vue').default
      }]
    }
  ]
})
