<template>
    <form  v-if="isShowReg" class="reg" method="post" @submit.prevent="reg" >
      <div class="blur" v-on:click="setUnShowReg"></div>
        <div class="g-login" >
        <a>注册</a>
        <div class="error" v-show="error">{{error}}</div>
        <input type="text" v-model="user.name" placeholder="用户名">
          <!--<div>-->
            <input class="email" type="text" v-model="user.email" placeholder="邮箱">
            <!--<a href="#" @click="send" >发送验证码</a>-->
          <!--</div>-->
        <!--<input v-if="sendEmail" type="text" v-model="user.code" placeholder="请输入验证码">-->
        <input type="password" v-model="user.password" placeholder="请输入密码">
        <input type="password" v-model="user.password_r" placeholder="再次输入密码">
        <input type="submit" value="注册" class="submit">

      </div>
    </form>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import navbar from './navbar.vue'
  export default {
    name: 'register',
    data () {
      return {
        error: false,
        isLogin: false,
        user: {
          name: '',
          email: '',
          password: '',
          password_r: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        isShowReg: 'getIsShowReg',
        currentUser: 'getCurrentUserName'
      })
    },
    methods: {
      ...mapActions([
        'setUnShowReg',
        'userRegister',
        'initNotelist'
      ]),
      reg: function () {
        if (!this.user.name || !this.user.password || !this.user.email || !this.user.password_r) {
          this.error = '输入不能为空'
        } else if (this.user.password !== this.user.password_r) {
          console.log('两次密码输入不一致')
          this.error = '两次密码输入不一致'
        } else if (this.user.password.length < 3) {
          console.log('3wei ')
          this.error = '密码长度不能小于3位'
        } else {
          // 注册成功，去注册
          // 这里应该给leancloud发送代码，如果正确，就储存数据资料
//          console.log(navbar.data().leancloud)
          const av = navbar.data().leancloud
          const user = new av.User()
          user.setUsername(this.user.name)
          user.setEmail(this.user.email)
          user.setPassword(this.user.password)
          user.signUp().then((loginedUser) => {
            alert('注册成功')
            this.error = ''
            console.log('注册成功了-去登陆了')
            this.userRegister(this.user)
            this.user = ''
          }, (error) => {
            alert(JSON.stringify(error))
            this.error = 'JSON.stringify(error)'
          })
        }
        // 注册完之后那么就是新的用户了，所以应该清空现有的笔记，初始化才可以
        this.initNotelist()
      }
    }
  }
</script>

<style>

.reg{
  width: 100%;
  transition: all ease .3s;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.g-login{
  width: 360px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  align-items:stretch;
  position: absolute;

  /*align-items: flex-end;*/
  border: 1px solid #aaa;
  padding: 0px 30px 0px 30px;
}
.g-login a{
  align-self: center;
  /*padding-left: 350px;*/
}
.g-login .reg{
  align-self: center;
  font-size: 5px;
  color: #ccc;
  cursor: pointer;
}
.blur{
  width: 100%;
  height: inherit;
  position: relative;
  /*z-index: -1;*/
  background: rgba(0, 0, 0,0.5);
  /*background: rgba(1,1,1,0.6);*/
  /*background: rgba(30%,0%,0%,0.6);*/
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-filter: blur(4px);
  -moz-filter: blur(4px);
  -ms-filter: blur(4px);
  -o-filter: blur(4px);
  filter: blur(4px);
}
.error{
  font-size: 15px;
}
input{
  /*width: 300px;*/
  height: 25px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px
}
.submit{
  background-color: rgba(236, 97, 73, 0.7);
  height: 38px;
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  color: white;
  font-size: 16px;
}
</style>
