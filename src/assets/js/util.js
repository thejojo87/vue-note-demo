/**
 * Created by thejojo on 2017/5/18.
 */

import AV from 'leancloud-storage'

const utilHelper = {
  updateTodolist: function () {
    const query = new AV.Query('todolist')
    query.descending('createdAt')
    const owner = AV.Object.createWithoutData('_User', this.loginUser.leancloudid)
    query.equalTo('owner', owner)
    query.find().then((lists) => {
      const listsToUpdate = []
      lists.forEach(function (list, i, a) {
        let value = {}
        value = list.attributes
        listsToUpdate.push(value)
      })
      this.updateTodoNotes(listsToUpdate)
    })
  },
  get_Todolist: function () {
    console.log('getTodolist')
  }
}

export default utilHelper
