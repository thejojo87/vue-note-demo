<template>
  <div id="toolbar">
    <i class="glyphicon logo"><img src="../assets/logo.png" width="30" height="30"></i>
    <i @click="newNote" class="glyphicon glyphicon-plus"></i>
    <i @click="toggleFavorite" class="glyphicon glyphicon-star" :class="{starred: activeNote.favorite}"></i>
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Toolbar',
    computed: {
      ...mapGetters({
        // getCount return value 將會存在別名為 count 的 data 上
        activeNote: 'activeNote'
      })
    },
    methods: {
      ...mapActions([
        'newNote',
        'deleteNote',
        'toggleFavorite'
      ])
    }
  }
</script>

<style>


</style>
