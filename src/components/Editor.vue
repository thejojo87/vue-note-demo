<template>
  <div id="note-editor">
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
