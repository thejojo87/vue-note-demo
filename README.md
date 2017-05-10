# vue-note

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 说明

四个部分：
app toolbar noteslist editor

https://segmentfault.com/a/1190000005863691

这个教程。

修改了这个教程里一些部分。
比如说，设置显示所有笔记和favorites笔记的字段，写在了store里。


http://www.cnblogs.com/libin-1/p/6753399.html

在这个项目中，我们将总共使用四个组件：根组件 App.vue，操作栏组件 Toolbar.vue，别表组件 NotesList.vue，笔记编辑组件 Editor.vue。

![](https://sfault-image.b0.upaiyun.com/125/390/1253908380-5779006fccd67_articlex)


## 问题

问题1：disptach能用么？

问题2： 引用 ruter怎么办？

```javascript
import VueRouter from '../node_modules/vue-router';
```
必须得这么干



1. 引用bootstrap

在index.html里

```javascript
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
```

或者说可以用sass版本。
这里有说明

http://ithelp.ithome.com.tw/articles/10187723

2. 所有的入口逻辑卸载main.js里


## ToDo

1.添加login模块
2.用leancloud存储在云上。

