<template>
  <li class="main-items-todoli" >
  <div id="main-items-todoli-div" v-if="!updateMode">
    <label>
    <input
    type="checkbox"
    :checked="item.done"
    @click="updateDone(item); playAudio(); updateLocalTodoitemCount(item)"
    @change="toggleTodo(item.objectId)">
    {{ item.title }}
    </label>
    <button id="main-items-showeditmode-2" class="btn btn-xs btn-primary" @click="showEditMode">
    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    </button>
    <button id="main-items-delete" class="main-items-showeditmode btn btn-default btn-danger" @click="deleteTodo( item )">
    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
    </button>
  </div>
    <div id="editinput" v-if="updateMode" >
      <input
        class="edit-input"
        v-focus="updateMode"
        placeholder="edit Todo.."
        :value="item.title"
        @keyup.enter="actionEdit"
        @blur="cancelEdit"
        @keyup.esc="cancelEdit"/>
    </div>
  </li>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import navbar from '../navbar.vue'
    export default {
      name: 'todoitem',
      props: {
        item: Object
      },
      data () {
        return {
          updateMode: false,
          av: navbar.data().leancloud
        }
      },
      directives: {
        focus (el, { value }, { context }) {
          if (value) {
            context.$nextTick(() => {
              el.focus()
            })
          }
        }
      },
      computed: {
        ...mapGetters({
          getActiveTodoList: 'activeTodolists'
        })
      },
      methods: {
        ...mapActions([
          'toggleTodo',
          'deleteTodoitem',
          'updateTodoItem',
          'updateActiveTodolistCount',
          'updateLocalTodoitemCount'
        ]),
        playAudio () {
          console.log('playaudio')
          var audio = new Audio()
          audio.src = '../../../static/按钮铃.mp3'
          audio.play()
        },
        showEditMode () {
          this.updateMode = true
        },
        updateDone (item) {
          // 这里需要上传done的状态到leancloud
          const AV = this.av
          // 第一个参数是 className，第二个参数是 objectId
          const todoDoneToUpdate = AV.Object.createWithoutData('todoitems', item.objectId)
          // 修改属性
          todoDoneToUpdate.set('done', !item.done)
          // 保存到云端
          todoDoneToUpdate.save()
        },
        deleteTodo (item) {
          console.log('删除')
          console.log(item)
          const AV = this.av
          // 删除item
          const deleteToUpdate = AV.Object.createWithoutData('todoitems', item.objectId)
          console.log('开始删除')
          deleteToUpdate.destroy().then(() => {
            // 删除成功,更新本地列表，initactivelist
            console.log('删除成功了')
            // 更新count
            this.updateActiveTodolistCount(this.getActiveTodoList.count - 1)
//          // count 数量也要上传才可以
//          // 第一个参数是 className，第二个参数是 objectId
            const listCountToUpdate = AV.Object.createWithoutData('todolist', this.getActiveTodoList.objectId)
            // 修改属性
            listCountToUpdate.set('count', this.getActiveTodoList.count)
            // 保存到云端
            listCountToUpdate.save()
            this.deleteTodoitem(item)
          }, function (error) {
            // 失败
            console.log(error)
          })
        },
        actionEdit (e) {
          const userChange = e.target.value.trim()
          const AV = this.av
          console.log(userChange)
          const titleToUpdate = AV.Object.createWithoutData('todoitems', this.item.objectId)
          // 修改属性
          titleToUpdate.set('title', userChange)
          // 保存到云端
          titleToUpdate.save()
          // 修改本地activelist的数据，要么直接修改，要么从云端接收再刷新？
          // 直接修改算了。
          this.updateTodoItem({
            key: this.item.objectId,
            change: userChange
          })
          this.updateMode = false
        },
        cancelEdit (e) {
          e.target.value = this.item.title
          this.updateMode = false
        }
      }
    }
</script>

<style>
  #editinput {
    display: flex;
    flex: 1;
    margin: 20px;
  }
  .edit-input {
    /*width: 30px;*/
    font-size: 30px;
    flex: 1;
    height: 60px;
    margin-right: 30px;
    color: #dddddd;
    background-color: #444444;
  }
  #main-items-todoli{
    display: flex;
    /*align-items: center;*/
    justify-content:space-between;
  }
  .main-items-todoli label {
    margin: 0;
    /*padding-left: 15px;*/
    /*text-align: center;*/
    font-size: 30px;
    align-items: center;
    display: flex;
    flex: 1;
  }
  #main-items-todoli-div{
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .main-items-todoli label input {
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
