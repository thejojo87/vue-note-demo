<template>
  <div id="notes-list">
    <div id="list-header">
      <h2>Notes | coligo</h2>
      <div class="btn-group btn-group-justified" role="group">
        <!-- All Notes button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
                  @click="setShowMode('all')"
                  >
            All Notes
          </button>
        </div>
        <!-- Favorites Button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
                  @click="setShowMode('favorites')"
                  >
            Favorites
          </button>
        </div>
      </div>
    </div>
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a v-for="note in filteredNotes"
           class="list-group-item" href="#/note"
           :class="{active: activeNote === note}"
           @click="updateActiveNote(note)">
          <h4 class="list-group-item-heading">
            这是-{{ note.content.trim().substring(0, 30)}}
          </h4>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'NotesList',
    computed: {
      ...mapGetters({
        filteredNotes: 'getFilteredNotes',
        show: 'getShow',
        activeNote: 'activeNote'
      })
    },
    methods: {
      ...mapActions([
        'setShowMode',
        'updateActiveNote'
      ])
    }
  }
</script>

<style>


</style>
