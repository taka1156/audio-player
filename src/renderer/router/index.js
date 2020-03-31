import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'help',
      component: require('@/components/pages/Help/Help').default
    },
    {
      path: '/music',
      name: 'audio',
      component: require('@/components/pages/Audio/AudioMain').default
    },
    {
      path: '/list',
      name: 'list',
      component: require('@/components/pages/List/List').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/components/pages/Setting/Setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
