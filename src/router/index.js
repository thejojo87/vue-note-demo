import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import note from '@/pages/note'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/note',
      name: 'note',
      component: note
    },
    { path: '/*', redirect: '/note' }
  ]
})
