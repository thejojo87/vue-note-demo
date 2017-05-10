/**
 * Created by thejojo on 2017/5/9.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations.js'
import * as getters from './getter'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  // 严格模式
  strict: true
})
