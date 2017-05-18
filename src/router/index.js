import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import note from '@/pages/note'
import todo from '@/pages/todo'

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
    {
      path: '/todo',
      name: 'todo',
      component: todo
    },
    { path: '/*', redirect: '/note' }
  ]
})
