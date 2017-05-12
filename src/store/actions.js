/**
 * Created by thejojo on 2017/5/9.
 */

import * as types from './mutations_type'
// import * as avs from '../config/leancloud'

export const newNote = ({ commit }) => {
  console.log('start newNote')
  commit(types.NEW_NOTE)
}

export const deleteNote = ({ commit }) => {
  console.log('start deleteNote')
  commit(types.DELETE_NOTE)
}

export const toggleFavorite = ({ commit }) => {
  console.log('start toggleFavorite')
  commit(types.TOGGLE_FAVORITE)
}

// 这是当设置show为all还是favorite的切换，更新show的值
export const setShowMode = ({ commit }, mode) => {
  console.log('start toggleFavorite')
  console.log(mode)
  commit(types.SET_SHOWMODE, mode)
}

//
export const updateActiveNote = ({ commit }, note) => {
  console.log('setUPDATA', note)
  commit('SET_ACTIVE_NOTE', note)
}

export const editNote = ({ commit }, note) => {
  console.log('editNote', note)
  commit('EDIT_NOTE', note)
}

// 注册相关，显示注册界面
export const setShowReg = ({ commit }) => {
  console.log('显示Reg界面')
  commit('SET_SHOW_REG')
}
export const setUnShowReg = ({ commit }) => {
  console.log('显示Reg界面')
  commit('SET_UNSHOW_REG')
}
// 用户注册
export const userRegister = ({ commit }, user) => {
  console.log('用户注册')
  console.log(user)
  commit('USER_REGISTER', user)
}

export const userLogin = ({ commit }, user) => {
  console.log('用户登录')
  console.log(user)
  // console.log(avs.APP_ID)
  commit('USER_LOGIN', user)
}
export const userLogout = ({ commit }) => {
  console.log('用户注销')
  commit('USER_LOGOUT')
}
