<template>
  <div id="sidebar">
    <div id="todo-user-toolbar">
      <i  class="glyphicon glyphicon-user list_icon"></i>
      <div class="userToolbar-name">你好~ {{ currentUsername }}</div>
    </div>
    <div id="my_today_bar" class="list_bar">
      <i  class="glyphicon glyphicon-certificate list_icon"></i>
      <div class="list_bar_title" >
        <span>我的一天</span>
      </div>
      <div class="list_bar_count" aria-hidden="true" >2</div>
    </div>
    <div id="todo_bar" class="list_bar">
      <i  class="glyphicon glyphicon-list-alt list_icon"></i>
      <div class="list_bar_title" >
        <span>To-Do</span>
      </div>
      <div class="list_bar_count" aria-hidden="true" >10</div>
    </div>
    <hr id="line">

    <div id="add_bar" class="list_bar" v-on:click="newList">
      <i  class="glyphicon glyphicon-plus list_icon"></i>
      <div class="list_bar_title" >
        <span>新建清单</span>
      </div>
    </div>

    <hr id="line2">
    <context-menu id="context-menu" ref="ctxMenu">
      <li @click="">重命名清单</li>
      <li @click="">复制清单</li>
      <hr id="line3">
      <li @click="deleteList()" class="">删除清单</li>
    </context-menu>

    <div class=" list_bar " v-for="item in this.getLists"
         :class="{listactive: getActiveTodolists.objectId === item.objectId}"
         @click="updateActiveTodolist(item)" @contextmenu="updateActiveTodolist(item)" @contextmenu.prevent = "$refs.ctxMenu.open">
      <i  class="glyphicon glyphicon-list list_icon"></i>
      <div class="list_bar_title" >
        <span>{{ item.title }}</span>
      </div>
      <span aria-hidden="true" class="list_bar_count">{{ item.count }}</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import contextMenu from 'vue-context-menu'
  //  import AV from 'leancloud-storage'
  import navbar from '../navbar.vue'
  export default {
    name: 'sidebar',
    components: { contextMenu },
    data () {
      return {
        viewMenu: false,
        top: '0px',
        left: '0px',
        isShowSidebar: false,
        av: navbar.data().leancloud
      }
    },
    computed: {
      ...mapGetters({
        currentUsername: 'getCurrentUserName',
        getLists: 'getTodolists',
        getLoginUsername: 'getLoginUser',
        getActiveTodolists: 'activeTodolists'
      })
    },
    methods: {
      ...mapActions([
        'updateTodoNotes',
        'updateActiveTodolist',
        'deleteTodoitemById'
      ]),
      newList: function () {
        console.log('新建一个清单')
        const sex = this.getLists
        console.log(this.getActiveTodolists)
        console.log(sex)
        console.log('这是测试')
        if (this.getLoginUsername.leancloudid) {
          console.log('开始创建新清单')
          const newList = {
            title: 'title',
            count: 0,
            objectId: '',
            isActivelist: false,
            owner: {
              objectId: ''
            }
          }
          const AV = this.av
//          const currentUser = AV.User.current()
          const ListClass = AV.Object.extend('todolist')
          const todolist = new ListClass()
          // 访问控制
          const acl = new AV.ACL()
          acl.setReadAccess(AV.User.current(), true) // 只有这个用户能读
          acl.setWriteAccess(AV.User.current(), true) // 只有这个用户能写
          todolist.setACL(acl) // 设置访问控制
          todolist.set('title', newList.title)
          todolist.set('count', newList.count)
          todolist.set('isActivelist', newList.isActivelist)
          todolist.set('owner', AV.User.current())
          todolist.save().then((list) => {
            console.log(list)
            newList.objectId = list.id
            newList.owner.objectId = list.attributes.owner.id
            console.log(newList.owner.objectId)
            console.log(newList)
            this.updateTodolist()
            this.updateActiveTodolist(newList)
//            this.utilHelper.get_Todolist()
            // 应该更新一下list视图,要么把newList塞进去，要么重新获取列表
          }, function (error) {
            alert(JSON.stringify(error))
          })
        }
      },
      // 这里服用了navbar里，当登陆的时候更新todolist的模块，应该用插件的方式的
      updateTodolist: function () {
        const AV = this.av
        const query = new AV.Query('todolist')
        query.descending('createdAt')
        const owner = AV.Object.createWithoutData('_User', this.getLoginUsername.leancloudid)
        query.equalTo('owner', owner)
        query.find().then((lists) => {
          const listsToUpdate = []
          lists.forEach(function (list, i, a) {
            let value = {}
            value = list.attributes
            value['objectId'] = list.id
            listsToUpdate.push(value)
          })
          this.updateTodoNotes(listsToUpdate)
        })
      },
      deleteList: function () {
        console.log('delete')
        console.log(this.getActiveTodolists.objectId)
        const AV = this.av
        const activeTodolist = this.getActiveTodolists
        // 删除todo，先获取所有以listid为list的todoitem值
        const query = new AV.Query('todoitems')
        const list = AV.Object.createWithoutData('todolist', activeTodolist.objectId)
        query.equalTo('list', list)
        query.find().then((results) => {
          for (let i = 0; i < results.length; i++) {
            results[i].destroy() // 使用destroy方法对返回来的数据进行删除
          }
          // 删除成功,更新本地列表，initactivelist
          console.log('删除成功了listitems')
          console.log(this.getActiveTodolists)
          this.deleteTodoitemById(activeTodolist.objectId)
//          this.updateTodolist()
//          this.updateActiveTodolist({})
        }, function (error) {
          // 失败
          console.log(error)
        })
        // 删除list
        const deleteToUpdate = AV.Object.createWithoutData('todolist', activeTodolist.objectId)
        console.log('开始删除')
        deleteToUpdate.destroy().then(() => {
          // 删除成功,更新本地列表，initactivelist
          console.log('删除成功了')
          this.updateTodolist()
          this.updateActiveTodolist({})
        }, function (error) {
          // 失败
          console.log(error)
        })
      },
      test: function (e) {
        console.log('asdfasdf')
        console.log(e)
//        e.preventDefault()
      }
    }
  }
</script>

<style>
#sidebar {
  padding: 0;
  margin: 0;
  display: flex;
  width: 280px;
  height: 100%;
  background-color: #f7f7f7;
  color: #262626;
  font-size: 14px;
  font-weight: 500;
  flex-direction: column;
  overflow: auto;
}
#todo-user-toolbar{
  width: 100%;
  display: flex;
  background-color: #5b7a59;
  align-items: center;
  height: 45px;
  flex: none;
}
.list_icon{
  color: white;
  font-size: 20px;
  padding: 0 10px;
}
.userToolbar-name {
  flex: 1;
  color: white;
}
  .list_bar{
    display: flex;
    align-items: center;
    margin: 0;
    width: 100%;
    height: 45px;
    flex: none;
    cursor: pointer;
  }
  .list_bar i {
    color: #00b3ee;
  }
  .list_bar_count{
    margin:0 15px;
  }
  .list_bar_title {
    flex: 1;
  }
  #line, #line2 ,#line3{
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0;
    border-top: 1px solid #d9534f;
  }
  .listactive {
    background-color: #66afe9;
  }
  #context-menu {
    /*width: 250px;*/
    /*margin: 20px;*/
    /*padding: 0 10px;*/
  }
  #context-menu li{
    background-color: #c0c0c0;
    padding: 10px;
    font-size: 15px;
    /*color: #000000;*/
  }
  #context-menu li:hover{
    background-color: #dddddd;
  /*color: #444444;*/
    /*opacity: 1;*/
  /*color: #000000;*/
  }


</style>
