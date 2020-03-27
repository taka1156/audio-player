import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'audio',
      component: require('@/components/pages/Audio/AudioMain').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
