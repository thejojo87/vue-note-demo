<template>
<div id="todo">
  <register></register>
  <sidebar></sidebar>
  <mainbar></mainbar>
</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Register from '../components/register.vue'
    import Sidebar from '../components/todo/Sidebar.vue'
    import Mainbar from '../components/todo/Mainbar.vue'
    export default {
      name: 'todo',
      components: {
        Register,
        Sidebar,
        Mainbar
      },
      computed: {
        ...mapGetters({})
      },
      methods: {
        ...mapActions([])
      }
    }
</script>
<style>
#todo{
  background-color: #00b3ee;
  display: flex;
  width: 100%;
  height:100%;
}

</style>
