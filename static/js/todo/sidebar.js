/**
 * Created by thejojo on 2017/5/16.
 */
export default {
  sidebar_js: function () {
  /*
   在注释下方写下代码
   给按钮button绑定一个点击事件
   其实这只是一次尝试，实际上，使用v-show。v-bind我觉得没必要再操作js的必要了。
   */
    let lists = document.getElementById("lists")
    let value = document.getElementById("lists").className
    let usertoolbar = document.getElementById("usertoolbar")

    console.log(lists)
    if (value === 'collapsed') {
      console.log(value)
      document.getElementById("lists").className = ''
    } else {
      document.getElementById("lists").className = 'collapsed'
    }
  }
}


