/**
 * Created by thejojo on 2017/5/9.
 */
import * as types from './mutations_type'

// state
export const state = {
  notes: [],
  activeNote: {},
  show: 'all',
  // 注册相关
  isShowReg: false,
  currentUser: '',
  loginUser: ''
}

export const mutations = {
  // 新增笔记
  [types.NEW_NOTE] (state, newNote) {
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
  },
  [types.EDIT_TITLE] (state, note) {
    state.activeNote.title = note
  },
  // 注册与登陆相关模块
  // 显示注册界面
  [types.SET_SHOW_REG] (state) {
    state.isShowReg = !state.isShowReg
  },
  // 取消注册界面
  [types.SET_UNSHOW_REG] (state) {
    state.isShowReg = !state.isShowReg
  },
  // 用户注册
  [types.USER_REGISTER] (state, user) {
    console.log('注册结束')
    state.loginUser = user
    state.currentUser = state.loginUser.name
    state.isShowReg = false
  },
  [types.INIT_NOTELIST] (state) {
    console.log('initstate 开始了')
    state.notes = []
    state.activeNote = {}
  },
  // 用户登陆-虽然和用户注册完后登陆是一样的代码，但是为了逻辑，我还是保留了这段代码
  [types.USER_LOGIN] (state, user) {
    console.log('登陆成功')
    state.loginUser = user
    state.currentUser = state.loginUser.name
  },
  // 用户注销
  [types.USER_LOGOUT] (state) {
    console.log('注销成功')
    state.loginUser = ''
    state.currentUser = ''
  },
  // 上传结束之后要修改uploaded值,然后把id值换成leancloud里的id值
  [types.SET_ISUPLOADED] (state, notes) {
    console.log('上传结束之后要修改uploaded值')
    console.log(notes)
    notes.note.isUploaded = true
    notes.note.id = notes.id
  },
  //
  [types.UPDATE_LOCAL_NOTES] (state, notes) {
    console.log('登陆后更新本地数据')
    console.log(typeof notes)
    console.log(notes)
    state.notes = notes
  }
}

