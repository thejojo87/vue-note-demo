/**
 * Created by thejojo on 2017/5/9.
 */

import * as types from './mutations_type'

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
