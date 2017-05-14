<template>
  <div id="note-editor">
    <h1 id="title"><input id="editor-title" :value="getActiveNoteText.title"
    @input="editAndSaveTitle($event.target.value)"
    /></h1>
    <textarea
      :value="getActiveNoteText.content"
      @input="editAndSave($event.target.value)"
      class="form-control">
</textarea>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import AV from 'leancloud-storage'
  export default {
    name: 'Editor',
    computed: {
      ...mapGetters({
        getActiveNoteText: 'activeNoteText'
      })
    },
    methods: {
      ...mapActions([
        'editNote',
        'editTitle'
      ]),
      editAndSave: function (editedValue) {
        this.editNote(editedValue)
        this.saveToLeancloud(editedValue)
      },
      editAndSaveTitle: function (editedValue) {
        this.editTitle(editedValue)
        this.saveToLeancloudTitle(editedValue)
      },
      saveToLeancloud: function (editedValue) {
        // 第一个参数是 className，第二个参数是 objectId
        const noteToUpdate = AV.Object.createWithoutData('notes', this.getActiveNoteText.id)
        // 修改属性
        noteToUpdate.set('content', editedValue)
        // 保存到云端
        noteToUpdate.save()
      },
      saveToLeancloudTitle: function (editedValue) {
        // 第一个参数是 className，第二个参数是 objectId
        const titleToUpdate = AV.Object.createWithoutData('notes', this.getActiveNoteText.id)
        // 修改属性
        titleToUpdate.set('title', editedValue)
        // 保存到云端
        titleToUpdate.save()
      }
    }
  }
</script>

<style>
#editor-title{
  text-align: center;
  background-color: #f0ad4e;
  height: 60px;
  margin-bottom: 0;
  width: 100%;
  padding: 0;
  margin: 0;
}
#title{
  margin-top: 0;
  margin-bottom: 0;
}

</style>
