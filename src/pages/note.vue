<template>
  <div id="note">
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
    <register></register>
  </div>
</template>

<script>
  import NotesList from '../components/NotesList.vue'
  import Toolbar from '../components/Toolbar.vue'
  import Editor from '../components/Editor.vue'
  import Register from '../components/register.vue'

  export default {
    name: 'note',
    components: {
      Toolbar,
      NotesList,
      Editor,
      Register
    }
  }
</script>

<style>


</style>
