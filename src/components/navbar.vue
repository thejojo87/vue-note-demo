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
        <a class="navbar-brand" href="#">vuex 2.0 {{ error }}</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <form class="navbar-form navbar-right">
          <router-link :to="{name: 'Hello'}">Hello</router-link>
          <router-link :to="{name: 'note'}">Note</router-link>
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
            <a class="navbar-brand">欢迎你！ {{ currentUser }}</a>
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
          password: ''
        },
        leancloud: AV
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'getCurrentUserName'
      })
    },
    methods: {
      ...mapActions([
        'setShowReg',
        'userLogin',
        'userLogout'
      ]),
      login: function () {
        if (!this.user.name || !this.user.password) {
          this.error = '输入不能为空'
        } else {
          // 注册成功，去注册
          // 这里应该给leancloud发送代码，如果正确，就储存数据资料
          console.log('去登陆')
          AV.User.logIn(this.user.name, this.user.password).then((loginedUser) => {
            console.log('登录成功')
            this.userLogin(this.user)
            this.user = ''
            // TODO: 这里应该读取笔记列表
          }, function (error) {
            alert(error)
          })
        }
      },
      logout: function () {
        console.log('开始logout')
        AV.User.logOut()
        this.userLogout()
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
