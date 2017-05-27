<template>
  <nav class="navbar navbar-inverse navbar-default">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">vuex 2.0 欢迎你！ {{ currentUser }} {{ error }} </a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <form class="navbar-form navbar-right">
          <router-link :to="{name: 'Hello'}">Hello</router-link>
          <router-link :to="{name: 'note'}">Note</router-link>
          <router-link :to="{name: 'todo'}">Todo</router-link>
          <!--<div class="form-group" v-show="error">{{ error }}</div>-->
          <div v-show="currentUser===''" class="form-group">
            <input type="text" v-model="user.name" placeholder="用户名" class="form-control">
          </div>
          <div v-show="currentUser===''" class="form-group">
            <input type="password" v-model="user.password" placeholder="密码" class="form-control">
          </div>
          <div v-if="currentUser===''" class="form-group">
          <button type="submit" class="btn btn-success" v-on:click="login">登陆</button>
          <button type="submit" class="btn btn-success" v-on:click="setShowReg">注册</button>
          </div>
          <div v-else class="form-group">
            <!--<a class="navbar-brand">欢迎你！ {{ currentUser }}</a>-->
            <button type="submit" class="btn btn-success" v-on:click="logout">退出</button>
          </div>
        </form>
      </div><!--/.navbar-collapse -->
    </div>

  </nav>

</template>


<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as avs from '../config/leancloud'
  import AV from 'leancloud-storage'

  const APP_ID = avs.APP_ID
  const APP_KEY = avs.APP_KEY
  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  })

  export default {
    name: 'NavBar',
    data () {
      return {
        error: '',
        user: {
          name: '',
          password: '',
          leancloudid: ''
        },
        leancloud: AV
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'getCurrentUserName',
        loginUser: 'getLoginUser'
      })
    },
    methods: {
      ...mapActions([
        'setShowReg',
        'userLogin',
        'userLogout',
        'updateLocalNotes',
        'updateTodoNotes',
        'updateTodoItems',
        'initNotelist',
        'initTodolist',
        'updateLocalMyday'
      ]),
      login: function () {
        console.log('login函数开始了')
        console.log(this.user)
        if (!this.user.name || !this.user.password) {
          this.error = '输入不能为空'
        } else {
          // 注册成功，去注册
          // 这里应该给leancloud发送代码，如果正确，就储存数据资料
          console.log('去登陆')
          AV.User.logIn(this.user.name, this.user.password).then((loginedUser) => {
            console.log('登录成功')
            console.log(loginedUser.id)
            this.user.leancloudid = loginedUser.id
            this.userLogin(this.user)
            this.updateNotelist()
            this.updateTodolist()
            this.updateTodoItemlist()
          }, function (error) {
            alert(error)
          })
        }
      },
      updateTodoItemlist: function () {
        const query = new AV.Query('todoitems')
        query.descending('createdAt')
        const owner = AV.Object.createWithoutData('_User', this.loginUser.leancloudid)
        query.equalTo('owner', owner)
        query.find().then((lists) => {
          const itemsToUpdate = []
          lists.forEach(function (list, i, a) {
            let value = {}
            value = list.attributes
            value['objectId'] = list.id
            itemsToUpdate.push(value)
          })
          this.updateTodoItems(itemsToUpdate)
        })
      },
      updateTodolist: function () {
        const query = new AV.Query('todolist')
        query.descending('createdAt')
        const owner = AV.Object.createWithoutData('_User', this.loginUser.leancloudid)
        query.equalTo('owner', owner)
        let mydaytopush = []
        query.find().then((lists) => {
          const listsToUpdate = []
//          let mydaytopush = []
          lists.forEach(function (list, i, a) {
            let value = {}
            value = list.attributes
            value['objectId'] = list.id
            if (!value['isMyday']) {
              listsToUpdate.push(value)
            } else {
              console.log('需要更新isMyday')
              console.log(value)
              var myDay = {
                title: '我的一天',
                count: 0,
                objectId: '',
                isActivelist: false,
                owner: {
                  objectId: ''
                },
                isMyday: true
              }
              myDay.objectId = value['objectId']
              console.log(value['owner']['id'])
              myDay.count = value['count']
              myDay.owner.objectId = value['owner']['id']
              console.log(myDay)
              mydaytopush = myDay
            }
          })
          // 这个只操作一次，而且用了异步操作
          this.updateLocalMyday(mydaytopush)
          this.updateTodoNotes(listsToUpdate)
        })
      },
      updateNotelist: function () {
        const query = new AV.Query('notes')
        query.descending('createdAt')
        const owner = AV.Object.createWithoutData('_User', this.loginUser.leancloudid)
        query.equalTo('owner', owner)
        query.find().then((notes) => {
          const notesToUpdate = []
          notes.forEach(function (note, i, a) {
            let value = {}
            value = note.attributes
            notesToUpdate.push(value)
          })
          this.updateLocalNotes(notesToUpdate)
        })
      },
      logout: function () {
        console.log('开始logout')
        AV.User.logOut()
        this.userLogout()
        this.initNotelist()
        this.initTodolist()
      }
    }
  }
</script>

<style>
  .error{
    background-color: #66afe9;
    color: #c7254e;
    font-size: 15px;
  }
</style>
