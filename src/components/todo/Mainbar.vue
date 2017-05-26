<template>
  <div id="mainbar">
    <div id="mainheader">
      <div id="mainheader-left">
        <h1 id="mainheader-title"><input id="mainheader-listTitle" @input="editAndSaveTitle($event.target.value)"
                                         :value="getActiveTodoList.title"/>
        </h1>
        <h4 id="mainheader-time">{{ currentTime }}</h4>
      </div>
      <!--<div id="mainheader-right">-->
        <!--<h4 id="mainheader-time33">开始规划你的一天</h4>-->
      <!--</div>-->
    </div>
    <div id="main-container">
      <div id="addbar">
      <i  id="addTask-input-icon" class="glyphicon glyphicon-plus list_icon"></i>
      <input v-model="list_item" type="text" v-on:keyup.enter="addNew()" class="addTask-input chromeless" maxlength="255" data-key-placeholder="placeholder_add_task_mobile" data-key-aria-label="placeholder_add_task_to_$" data-placeholder="私人" data-aria-label="私人" placeholder="添加任务..." aria-label="在“私人”中添加一个任务...">
      </div>
      <ol class="main-items" v-if="this.getTodoItems.length">
        <todoitem v-for="(item, index) in this.getTodoItems" :key="item.objectId" :item="item"></todoitem>
      </ol>

      <ol class="main-items" id="main-items-deletelist" v-if="this.getDoneItems.length">
        <todoitem v-for="(item, index) in this.getDoneItems" :key="item.objectId" :item="item" ></todoitem>
      </ol>
    </div>
  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
import navbar from '../navbar.vue'
// import todoItem from './todoitem.vue'
import Todoitem from './todoitem'
export default {
  components: {Todoitem},
  name: 'mainbar',
  data () {
    return {
      list_title: '这里是列表清单',
      currentTime: null,
      av: navbar.data().leancloud,
      list_item: '',
      lists: []
    }
  },
  computed: {
    ...mapGetters({
      getActiveTodoList: 'activeTodolists',
      getLoginedUsername: 'getCurrentUserName',
      getTodoItems: 'getToDoItems',
      getDoneItems: 'getDoneItems'
    })
  },
  methods: {
    ...mapActions([
      'editTodolistTitle',
      'updateTodoItemsAdd',
      'updateTodoItemsDisplay',
      'toggleTodo',
      'deleteTodoitem',
      'updateActiveTodolistCount'
    ]),
    filterItems (items) {
      console.log('filter')
    },
    addNew () {
      console.log('addnewitem')
      console.log(this.list_item)
      // 第一：清空输入栏；第二：上传过去，第三，保存到本地
      const AV = this.av
      console.log('开始创建todo')
      const newTodoitem = {
        title: 'item',
        objectId: '',
        isActiveitem: false,
        done: false,
        owner: {
          objectId: ''
        },
        list: {
          objectId: ''
        }
      }
      const ListClass = AV.Object.extend('todoitems')
      const itemlist = new ListClass()
      // 访问控制
      const acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(), true) // 只有这个用户能读
      acl.setWriteAccess(AV.User.current(), true) // 只有这个用户能写
      itemlist.setACL(acl) // 设置访问控制
      itemlist.set('title', this.list_item)
      itemlist.set('isActiveitem', newTodoitem.isActiveitem)
      itemlist.set('done', newTodoitem.done)
      itemlist.set('owner', AV.User.current())
      const list = AV.Object.createWithoutData('todolist', this.getActiveTodoList.objectId)
      itemlist.set('list', list)
      itemlist.save().then((list) => {
        console.log(list)
        console.log('itemlistadded')
        newTodoitem.objectId = list.id
        newTodoitem.owner.objectId = list.attributes.owner.id
        newTodoitem.list.id = list.attributes.list.id
        newTodoitem.title = this.list_item
        // 更新state里总数据
        this.updateTodoItemsAdd(newTodoitem)
        // 更新display数据
        this.updateTodoItemsDisplay(newTodoitem)
        this.list_item = ''
      }, function (error) {
        alert(JSON.stringify(error))
      })
      // 更新count
      this.updateActiveTodolistCount(this.getActiveTodoList.count + 1)
      // count 数量也要上传才可以
      // 第一个参数是 className，第二个参数是 objectId
      const listCountToUpdate = AV.Object.createWithoutData('todolist', this.getActiveTodoList.objectId)
      // 修改属性
      listCountToUpdate.set('count', this.getActiveTodoList.count)
      // 保存到云端
      listCountToUpdate.save()
    },
    updateCurrentTime () {
      this.currentTime = moment().locale('zh-cn').format('MMMM Do YYYY, h:mm:ss a')
    },
    editAndSaveTitle: function (editedValue) {
      const AV = this.av
      if (this.getLoginedUsername) {
        console.log(editedValue)
        const titleToUpdate = AV.Object.createWithoutData('todolist', this.getActiveTodoList.objectId)
        // 修改属性
        titleToUpdate.set('title', editedValue)
        // 保存到云端
        titleToUpdate.save()
        // 修改本地activelist的数据，要么直接修改，要么从云端接收再刷新？
        // 直接修改算了。有个bug，todolists里的title没变的
        this.editTodolistTitle(editedValue)
      }
    }
  },
  created: function () {
    this.currentTime = moment().locale('zh-cn').format('MMMM Do YYYY, h:mm:ss a')
    console.log(this.currentTime)
//    setInterval(() => {
//      this.updateCurrentTime()
//    }, 1 * 1000)
  }
}
</script>

<style>
#mainbar {
  display: flex;
  flex-direction: column;
  flex: 1;
  /*background-image: url("../../../static/jojo.png");*/
}
#main-container {
  opacity: 1;
  height: 100%;
  background-color: #66afe9;
  background-image: url("../../../static/jojo.png");
  background-size: 100% 100%;
}
  #mainheader {
    width: 100%;
    height: 180px;
    background-color: #2f373d;
    padding: 16px;
    display: flex;
    /*justify-content: flex-end;*/
    /*flex: 1;*/
  }
  #mainheader-title {
    color: #dddddd;
  }
  #mainheader-left {
    display: flex;
    flex-direction: column;
    color: #dddddd;
    /*width: 50%;*/
    width: 100%;
    padding: 0;
    margin: 0;
    /*flex: 8;*/
  }
  #mainheader-right {
    display: flex;
    /*background-color: #c7254e;*/
    width: 30%;
    color: #dddddd;
    align-items: flex-end;
    /*height: 100%;*/
    /*flex:2;*/
  }
  #mainheader-listTitle {
    text-align: center;
    width: 100%;
    height: 60px;
    background-color: #26b064;
    color: #333333;
  }
  #addbar{
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 16px;
    align-items: center;
  }
  .addTask-input {
    /*width: calc(100% - 32px);*/
    height: 60px;
    /*margin-top: 20px;*/
    margin-left: 16px;
    /*margin-right: 16px;*/
    text-align: center;
    background-color: #26b064;
    color: #333333;
    font-size: 30px;
    flex: 1;
  }
  #addTask-input-icon{
    height: 30px;
    width: 30px;
    color: #333333;
  }
  .main-items {
    /*width: 100%;*/
    margin: 10px 16px;
    padding: 16px;
    background-color: #444444;
    color: #dddddd;
    /*display: flex;*/
  }
  .main-items li {
    display: flex;
    /*align-items: center;*/
    justify-content:space-between;
  }
  .main-items li label {
    margin: 0;
    /*padding-left: 15px;*/
    /*text-align: center;*/
    font-size: 30px;
    align-items: center;
    display: flex;
    flex: 1;
  }
  .main-items li label input {
    width: 30px;
    height: 30px;
    margin-right: 30px;
    /*margin: 0;*/
    /*padding: 0;*/
    /*flex: 1;*/
  }
  #main-items-delete {
    /*align-self: flex-end;*/
  }
  #main-items-deletelist {
    text-decoration: line-through;
  }
  #main-items-showeditmode, #main-items-showeditmode-2{
    width: 42.4px;
    /*flex: 1;*/
  }
</style>
