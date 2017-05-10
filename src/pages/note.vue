<template>
  <div id="app">
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
  </div>
</template>

<script>
  import NotesList from '../components/NotesList.vue'
  import Toolbar from '../components/Toolbar.vue'
  import Editor from '../components/Editor.vue'

  export default {
    name: 'note',
    components: {
      Toolbar,
      NotesList,
      Editor
    }
  }
</script>

<style>


</style>
