/**
 * Created by thejojo on 2017/5/9.
 */
import * as types from './mutations_type'

export const newNote = ({ commit }, newNote) => {
  console.log('start newNote')
  commit(types.NEW_NOTE, newNote)
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

export const updateActiveTodolist = ({ commit }, list) => {
  console.log('setUPDATAActiveTodolist', list)
  console.log(list)
  console.log(list.isActivelist)
  commit('SET_ACTIVE_TODOLIST', list)
}

export const updateActiveTodolistCount = ({ commit }, count) => {
  // console.log('setUPDATAActiveTodolist', list)
  console.log(count)
  commit('SET_ACTIVE_TODOLISTCOUNT', count)
}

export const editNote = ({ commit }, note) => {
  console.log('editNote', note)
  commit('EDIT_NOTE', note)
}

export const editTodolistTitle = ({ commit }, note) => {
  console.log('editTodolistTitle', note)
  commit('EDIT_TODOLIST_TITLE', note)
}

export const editTitle = ({ commit }, note) => {
  console.log('ediTitle', note)
  commit('EDIT_TITLE', note)
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

// 注册后初始化note列表
export const initNotelist = ({ commit }) => {
  console.log('init notelist')
  commit('INIT_NOTELIST')
}
// 注册后初始化todo列表
export const initTodolist = ({ commit }) => {
  console.log('init todolist')
  commit('INIT_TODOLIST')
}
// 注册后必须要初始化myday列表
export const initMyDaylist = ({ commit }, mydaylist) => {
  console.log('init mydaylist')
  commit('INIT_MYDAYLIST', mydaylist)
}
// 上传结束之后，要把已经上传的值修改一下
export const setIsUploaded = ({ commit }, notes) => {
  console.log('上传完毕了，要去修改了')
  commit('SET_ISUPLOADED', notes)
}
// 登陆结束之后，从leancloud获取note列表，然后更新到本地数据
export const updateLocalNotes = ({ commit }, notes) => {
  console.log('登陆结束之后，从leancloud获取note列表，然后更新到本地数据')
  commit('UPDATE_LOCAL_NOTES', notes)
}

// 登陆结束之后，从leancloud获取todolist列表，然后更新到本地数据
export const updateTodoNotes = ({ commit }, lists) => {
  console.log('登陆结束之后，从leancloud获取todo列表，然后更新到本地数据')
  commit('UPDATE_LOCAL_TODOLISTS', lists)
}
// 更新myday数据
export const updateLocalMyday = ({ commit }, myDay) => {
  console.log('登陆结束之后，myDay，然后更新到本地数据')
  commit('UPDATE_LOCAL_MYDAY', myDay)
}
// 更新todoitems
export const updateTodoItems = ({ commit }, items) => {
  console.log('登陆结束之后，从leancloud获取item列表，然后更新到本地数据')
  commit('UPDATE_LOCAL_TODOITEMS', items)
}
// 更新todoitems，这个和上一个不一样，上一个是直接赋值，这个只是插入
export const updateTodoItemsAdd = ({ commit }, items) => {
  console.log('登陆结束之后，从leancloud获取item列表，然后更新到本地数据')
  commit('UPDATE_LOCAL_TODOITEMSADD', items)
}
// 更新display数组
export const updateTodoItemsDisplay = ({ commit }, item) => {
  commit('UPDATE_TODO_ITEMS_DISPLAY', item)
}
// tod 反转数值
export const toggleTodo = ({ commit }, key) => {
  console.log('toggleTodo', key)
  commit(types.TOGGLE_TODO, key)
}
// 删除item
export const deleteTodoitem = ({ commit }, item) => {
  console.log('删除todoitem')
  commit(types.DELETE_TODOITEM, item)
}
export const deleteTodoitemById = ({ commit }, id) => {
  console.log('删除todoitembyid')
  console.log(id)
  commit(types.DELETE_TODOITEM_BYID, id)
}
// 修改todoitems
export const updateTodoItem = ({ commit }, obj) => {
  console.log('updateTodoItem')
  console.log(obj)
  commit(types.UPDATE_TODOITEM, obj)
}
