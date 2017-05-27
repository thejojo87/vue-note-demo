/**
 * Created by thejojo on 2017/5/9.
 */
// 获取列表展示状态，all or favorite
export const getShow = state => {
  console.log('show 开始了')
  return state.show
}

export const activeNoteText = state => {
  console.log('get Active Note text 开始了')
  console.log(state.activeNote.content)
  return state.activeNote
}

// 获取当前激活note
export const activeNote = state => {
  console.log('activenote 开始了')
  return state.activeNote
}

// 获取当前激活todolist
export const activeTodolists = state => {
  console.log('activeTodolists 开始了')
  return state.activeTodoLists
}

// 获取 noteList,这里将会根据 state.show 的状态做数据过滤
export const getFilteredNotes = (state) => {
  console.log('notelist 开始了')
  if (state.show === 'all') {
    console.log('all')
    return state.notes
  } else if (state.show === 'favorites') {
    console.log('favorite')
    return state.notes.filter(note => note.favorite)
  }
}

// 注册相关模块
export const getIsShowReg = (state) => {
  console.log('get isShowReg')
  return state.isShowReg
}
// 登陆用户名字-用来判断是否登陆
export const getCurrentUserName = (state) => {
  console.log('get current username')
  return state.currentUser
}

export const getLoginUser = (state) => {
  console.log('getLoginUserId开始了')
  return state.loginUser
}

export const getTodolists = (state) => {
  console.log('todolists 开始了')
  // var stateWithoutMyday = state.todolists.filter(function (el) {
  //   return el.isMyday === true
  // })
  return state.todolists.filter(function (el) {
    return el.isMyday === false
  })
}

export const getMyDaylist = (state) => {
  console.log('getMyDaylist 开始了')
  return state.myDaylist
}

// export const getTodoItems = (state) => {
//   console.log('tododisplayitems 开始了')
//   return state.tododisplayitems
// }

// display数组里，done的数组
export const getDoneItems = (state) => {
  return state.tododisplayitems.filter((item) => {
    return item.done
  })
}

// display数组里，todone的数组
export const getToDoItems = (state) => {
  return state.tododisplayitems.filter((item) => {
    return !item.done
  })
}
