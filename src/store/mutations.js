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
  loginUser: '',
  todolists: [
  ],
  activeTodoLists: {
  },
  todoitems: [
  ],
  tododisplayitems: [],
  activeTodoItems: {
  }
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
  [types.SET_ACTIVE_TODOLIST] (state, list) {
    console.log('sasdfkasdkf')
    list.isActivelist = true
    state.activeTodoLists = list
    state.tododisplayitems = []
    // 顺便更新下要display的item数组
    for (var i in state.todoitems) {
      console.log('asdfasdfasdfasdf')
      console.log(list.objectId)
      console.log(i)
      console.log(state.todoitems[i].list)
      console.log(state.todoitems[i].list.id)
      if (list.objectId === state.todoitems[i].list.id) {
        console.log('yiyang')
        state.tododisplayitems.push(state.todoitems[i])
      }
    }
  },
  [types.SET_ACTIVE_TODOLISTCOUNT] (state, count) {
    state.activeTodoLists.count = count
    for (var i in state.todolists) {
      if (state.activeTodoLists.objectId === state.todolists[i].objectId) {
        state.todolists[i].count = count
      }
    }
  },
  [types.EDIT_NOTE] (state, note) {
    state.activeNote.content = note
  },
  [types.EDIT_TITLE] (state, note) {
    state.activeNote.title = note
  },
  [types.EDIT_TODOLIST_TITLE] (state, note) {
    state.activeTodoLists.title = note
    for (var i in state.todolists) {
      if (state.activeTodoLists.objectId === state.todolists[i].objectId) {
        state.todolists[i].title = note
      }
    }
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
  [types.INIT_TODOLIST] (state) {
    console.log('initTodo 开始了')
    state.todolists = []
    state.activeTodoLists = {}
    // state.activeNote = {}
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
  },
  [types.UPDATE_LOCAL_TODOLISTS] (state, lists) {
    console.log('登陆后更新本地数据todolosts')
    console.log(lists)
    state.todolists = lists
  },
  [types.UPDATE_LOCAL_TODOITEMS] (state, items) {
    console.log('登陆后更新本地数据todoitems')
    console.log(items)
    // 这里转换格式，统一比较好
    state.todoitems = items
  },
  [types.UPDATE_LOCAL_TODOITEMSADD] (state, items) {
    console.log('添加后更新本地数据todoitems')
    console.log(items)
    state.todoitems.push(items)
  },
  [types.UPDATE_TODO_ITEMS_DISPLAY] (state, item) {
    state.tododisplayitems.push(item)
  },
  [types.TOGGLE_TODO] (state, key) {
    console.log(key)
    var newState = state.tododisplayitems.filter(function (el) {
      return el.objectId === key
    })
    console.log(newState[0])
    newState[0].done = !newState[0].done
  },
  [types.DELETE_TODOITEM] (state, obj) {
    console.log('mutation里删除了')
    for (var i in state.todoitems) {
      console.log(i)
      state.todoitems = state.todoitems.filter(item => item.objectId !== obj.objectId)
      state.tododisplayitems = state.tododisplayitems.filter(item => item.objectId !== obj.objectId)
    }
  },
  [types.DELETE_TODOITEM_BYID] (state, id) {
    console.log('mutation里删除了')
    console.log('asdkljfh ajsdhf kjasdhf j')
    state.todoitems = state.todoitems.filter(item => item.list.id !== id)
  },
  [types.UPDATE_TODOITEM] (state, obj) {
    console.log('updateTodoitem')
    for (var i in state.todoitems) {
      console.log(i)
      if (obj.key === state.todoitems[i].objectId) {
        state.todoitems[i].title = obj.change
      }
    }
    for (var j in state.tododisplayitems) {
      console.log(i)
      if (obj.key === state.tododisplayitems[j].objectId) {
        state.tododisplayitems[j].title = obj.change
      }
    }
  }
}

