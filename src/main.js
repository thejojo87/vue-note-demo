// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/bootstrap/stylesheets/_bootstrap.scss'
import util from './assets/js/util'

Vue.config.productionTip = false
Vue.prototype.utilHelper = util

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  store,
  template: '<App/>',
  components: { App }
})
