<template>
  <div id="toolbar">
    <i class="glyphicon logo"><img src="../assets/logo.png" width="30" height="30"></i>
    <i @click="saveAndUpload" class="glyphicon glyphicon-plus"></i>
    <i @click="saveAndUploadFavorite" class="glyphicon glyphicon-star" :class="{starred: activeNote.favorite}"></i>
    <i @click="saveAndUploadDelete" class="glyphicon glyphicon-remove"></i>
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import AV from 'leancloud-storage'
  export default {
    name: 'Toolbar',
    computed: {
      ...mapGetters({
        // getCount return value 將會存在別名為 count 的 data 上
        activeNote: 'activeNote',
        currentUsername: 'getCurrentUserName'
      })
    },
    methods: {
      ...mapActions([
        'newNote',
        'deleteNote',
        'toggleFavorite',
        'setIsUploaded'
      ]),
      saveAndUploadDelete: function () {
        if (this.currentUsername) {
          // 第一个参数是 className，第二个参数是 objectId
          const deleteToUpdate = AV.Object.createWithoutData('notes', this.activeNote.id)
          console.log('开始删除')
          console.log(this.activeNote.id)
          deleteToUpdate.destroy().then(function () {
            // 删除成功
            console.log('删除成功了')
          }, function (error) {
            // 失败
            console.log(error)
          })
        }
        this.deleteNote()
      },
      saveAndUploadFavorite: function () {
        this.toggleFavorite()
        if (this.currentUsername) {
          // 第一个参数是 className，第二个参数是 objectId
          const favoriteToUpdate = AV.Object.createWithoutData('notes', this.activeNote.id)
          // 修改属性
          console.log(this.activeNote.id)
          favoriteToUpdate.set('favorite', this.activeNote.favorite)
          // 保存到云端
          favoriteToUpdate.save()
        }
      },
      saveAndUpload: function () {
        console.log('save and upload')
        console.log(this.currentUsername)
        const newNote = {
          id: +new Date(),
          title: 'title',
          content: 'new note',
          favorite: false,
          createdTime: new Date(),
          isUploaded: false,
          owner: ''
        }
        // 如果登陆了，那么就上传，要不然就不用上传了
        if (this.currentUsername) {
          const currentUser = AV.User.current()
          console.log(currentUser)
          const NotesClass = AV.Object.extend('notes')
          const notes = new NotesClass()
//          var ids = ''
          // 访问控制
          const acl = new AV.ACL()
          acl.setReadAccess(AV.User.current(), true) // 只有这个用户能读
          acl.setWriteAccess(AV.User.current(), true) // 只有这个用户能写
          notes.setACL(acl) // 设置访问控制
          // 设置数据
          notes.set('id', newNote.id)
          notes.set('title', newNote.title)
          notes.set('content', newNote.content)
          notes.set('favorite', newNote.favorite)
          notes.set('createdTime', newNote.createdTime)
          notes.set('isUploaded', newNote.isUploaded)
          notes.set('owner', AV.User.current())
          notes.save().then((notes) => {
            console.log(notes.id)
            const note = {
              note: newNote,
              id: notes.id
            }
            this.setIsUploaded(note)
          }, function (error) {
            alert(JSON.stringify(error))
          })
        }
        // 这里写上上传代码。上传成功后，upload这个字段修改下
        this.newNote(newNote)
      }
    }
  }
</script>

<style>


</style>
