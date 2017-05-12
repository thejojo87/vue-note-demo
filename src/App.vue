<template>
  <div id="app">
    <nav-bar></nav-bar>
    <!--<div id="contain">-->
    <router-view></router-view>
    <!--</div>-->
  </div>
</template>

<script>
import NavBar from './components/navbar'

export default {
  components: {
    NavBar
  },
  name: 'app'
}
</script>

<style>
#contain{
  /*margin-top: 20px;*/
}
</style>
