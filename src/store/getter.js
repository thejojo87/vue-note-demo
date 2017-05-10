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
