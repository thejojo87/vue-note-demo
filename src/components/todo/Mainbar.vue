<template>
  <div id="mainbar">
    <div id="mainheader">
      <div id="mainheader-left">
        <h1 id="mainheader-title">{{ list_title }}</h1>
        <h4 id="mainheader-time">{{ list_time }}</h4>
      </div>
      <div id="mainheader-right">
        <h4 id="mainheader-time33">{{ currentTime }}</h4>
      </div>
    </div>
    <div id="main-container">
      <h1 id="mainheader-title2">{{ list_title }}main-container</h1>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
export default {
  name: 'mainbar',
  data () {
    return {
      list_title: '这里是列表清单',
      list_time: '五月19日星期五',
      currentTime: null
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions([]),
    updateCurrentTime () {
      this.currentTime = moment().locale('zh-cn').format('MMMM Do YYYY, h:mm:ss a')
    }
  },
  created: function () {
    console.log('sssasdfasdfasdfadsf')
    this.currentTime = moment().locale('zh-cn').fromNow()
    console.log(this.currentTime)
    setInterval(() => {
      this.updateCurrentTime()
    }, 1 * 1000)
  }

}
</script>

<style>
#mainbar {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-image: url("../../../static/jojo.png");
  background-size:100% 100%;
}
#main-container {
  opacity: 0.5;
  height: 100%;
  background-color: #66afe9;
}
  #mainheader {
    width: 100%;
    height: 140px;
    background-color: #7a43b6;
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    /*flex: 1;*/
  }
  #mainheader-title {
    color: #dddddd;
  }
  #mainheader-left {
    display: flex;
    flex-direction: column;
    color: #dddddd;
    /*width: 50%;*/
    width: 75%;
    /*flex: 8;*/
  }
  #mainheader-right {
    display: flex;
    background-color: #c7254e;
    width: 30%;
    color: #dddddd;
    align-items: flex-end;
    /*height: 100%;*/
    /*flex:2;*/
  }

</style>
