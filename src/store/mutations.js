/**
 * Created by thejojo on 2017/5/9.
 */
import * as types from './mutations_type'

// state
export const state = {
  notes: [],
  activeNote: {},
  show: 'all'
}

export const mutations = {
  // 新增笔记
  [types.NEW_NOTE] (state) {
    var newNote = {
      id: +new Date(),
      title: 'title',
      content: 'new note',
      favorite: false
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },
  // 删除笔记
  [types.DELETE_NOTE] (state) {
    state.notes.splice(state.notes.indexOf(state.activeNote), 1)
    state.activeNote = state.notes[0] || {}
  },
  // 添加收藏
  [types.TOGGLE_FAVORITE] (state) {
    state.activeNote.favorite = !state.activeNote.favorite
  },
  // 设置show模式
  [types.SET_SHOWMODE] (state, mode) {
    console.log('setshowmode')
    state.show = mode
  },
  // 点击笔记列表，设置当前笔记
  [types.SET_ACTIVE_NOTE] (state, note) {
    state.activeNote = note
  },
  [types.EDIT_NOTE] (state, note) {
    state.activeNote.content = note
  }
}

