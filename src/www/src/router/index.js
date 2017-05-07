import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/modal'

const Main = Vue.extend(questionMain)
Vue.use(Router)

export default new Router({
  routess: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/test',
      name: 'test',
      component: Main
    }
  ]
})
