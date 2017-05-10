<template>
  <div id="note-editor">
    <h1>这是editor界面</h1>
    <textarea
      :value="getActiveNoteText.content"
      @input="editNote($event.target.value)"
      class="form-control">
</textarea>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Editor',
    computed: {
      ...mapGetters({
        getActiveNoteText: 'activeNoteText'
      })
    },
    methods: {
      ...mapActions([
        'editNote'
      ])
    }
  }
</script>

<style>


</style>
