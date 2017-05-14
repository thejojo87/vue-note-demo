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


注册部分参考了下面博客：

http://www.jianshu.com/p/c6c0b50574d5

leancloud用了注册功能，这个以前做过todo，很简单。


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


3. 引用了bootstrap的导航条，但是不想固定在上面怎么办？

navbar 有个fix-top类
4. navbar有个白线，20px怎么消除？
试了各种办法，都无法覆盖。
只好去引用的sass源码修改了。

5. 修改了原来float方式，使用了flex方式

https://zhuanlan.zhihu.com/p/25303493

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

6.  这里因为position:relative，导致按钮会覆盖在所有层上面
.btn-group > .btn, .btn-group-vertical > .btn {
    /* position: relative; */
    float: left;
}
其实真实原因是active，按下按钮之后变成active
这个有毛病

7. 注册和登陆分别写在不同的组合里，要引用av，密码也一样，怎么引用？

很简单，一个component里，设置好data，然后另一个引用navbar主体。
之后用navbar.data().leancloud 就可以了。

8. vuex里参数我想多传几个但是发现第三个参数总是undefined

https://segmentfault.com/q/1010000007185702

只能传一个，所以要弄成集合的方式传过去所有参数。

9. 删除的时候遇到一个问题，症状就是，删除的promise返回值，总是提示，then 没有定义

一开始以为是es6语法不兼容问题，后来查看发现，我第一步先把本地的数据删除了。
然后activenote里的id，就消失了。
我拿着消失的数据去leancloud查询，出错。
而并不是本地问题。


## ToDo
 
 
 - [x] 1.添加login模块-完成 

 - [x] 2.用leancloud存储在云上。

 - [ ] 3.restfulapi

 - [ ] 4.手机上接收和读写

 - [ ] 5. 笔记何时保存？怎么检测变化？比如说简书，是随时更新并且保存，并且打开浏览器就回到原来的数据。
如何做得到的？
是不是该找找别人的思路？
之前百度的任务别人的思路是添加一个检测，一有变化就更新。
是不是应该找找别人的应用？
找了一圈并没有找到特别合适的demo。
localstorage是html5的新特性。
需要用这个吗？
这个和leancloud如何共存？

在哪里新建数据呢？
直接在vue界面？
还是mutation里？
因为如果从vue，那么还得从mutation里获取notes数据，是不是太麻烦了点？
但是这个是要更新云端的数据，没道理在mutation里修改呀。
还是在vue界面里吧。
mutation只放修改state的操作。
我首先在toolbar组件上添加了新建笔记的时候，如果检测到用户登陆，那么就上传到
leancloud里。

修改的时候怎么办呢？
editor里，有个input检测选项，正常只不过是保存罢了。
如果检测到这个事件，那么就该同时更新数据。
activenote里，可以找到这个笔记，可以用id值来更新。

https://leancloud.cn/docs/leanstorage_guide-js.html#%E6%9B%B4%E6%96%B0%E5%AF%B9%E8%B1%A1





http://chicheng.info/2016/05/19/vue-webpack-leancloud-login/

登陆模块

### 做法：

参考这个部分：

https://github.com/HZNU-QUANTA/NODE-ZMM/blob/master/job/src/components/home.vue


添加了一个navbar的组件。
navbar一直固定在窗口最高处。
因为note的其他界面都是float，所以这些往下移动了。
页面逻辑是：

1. store应该有个currentUser字段。
当login页面初始化的时候，查看当前用户是否为空，如果为空，那么显示注册
如果用户不为空，那么就显示用户名并且退出。

用javascript倒也不是不可以，

2. 点击注册按钮-弹出注册界面

点击按钮之后就应该改变store里的showReg字段。
然后原本homepage就应该包括注册界面，只不过v-if隐藏起来罢了。


### 登陆-leancloud
用户名和密码为空：
是否放在state里？还是直接在初始化的时候放在data里？

1. 先安装sdk

存储服务（包括推送和统计）
$ npm install leancloud-storage --save


```html
CDN 加速

<!-- 存储服务 -->
<script src="//cdn1.lncld.net/static/js/2.2.1/av-min.js"></script>
```

需要引用这个吗？还是装了sdk就不需要了？
实际上是不需要的，只要引用就可以了
import AV from 'leancloud-storage'


还有用户名和密码是不是需要写在别的地方？
src目录下新建了一个config的目录，新建了一个leancloud.js

在那里写上了。


