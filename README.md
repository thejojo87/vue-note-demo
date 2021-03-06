# vue-note

> A Vue.js project-note

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


![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170515/051602160.png)

## 说明
在前人的基础上，写成vue2.0 ，css样式，原来是用float写的。
改成了flex。
增加了注册登陆，云端保存功能。
注册需要邮箱格式正确，用户名需要大于3个字符。

保存用的是leancloud。
如果想用自己的leancloud，需要去注册leancloud。
然后新建一个应用，替换src/config里的key。


note 分为四个部分：
app toolbar noteslist editor

https://segmentfault.com/a/1190000005863691

这个教程。

修改了这个教程里一些部分。
比如说，设置显示所有笔记和favorites笔记的字段，写在了store里。
因为这个笔记是一点点增加功能的，而且增加了在leancloud里注册，保存笔记
等内容，所以store字段有点混乱，本来可以减小很多。
留待以后再重构。

http://www.cnblogs.com/libin-1/p/6753399.html

在这个项目中，我们将总共使用四个组件：根组件 App.vue，操作栏组件 Toolbar.vue，别表组件 NotesList.vue，笔记编辑组件 Editor.vue。

![](https://sfault-image.b0.upaiyun.com/125/390/1253908380-5779006fccd67_articlex)


注册部分参考了下面博客：

http://www.jianshu.com/p/c6c0b50574d5




## 问题

问题1：disptach能用么？

问题2： 引用 router怎么办？

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

10. v-for 和v-show 后者会失效的问题

还没想好这个问题怎么解决。

11. 随着高度flex部分会被压缩的问题。
flex：none就可以了。

12. 超出高度的时候如何才能显示滚动条呢？
overflow：auto就可以了

13. 如何在vue的一个模块里，使用另外一个vue文件里的方法？mixin？ 插件？
貌似这个必须用插件方式来做成。
我面对的问题是，当用户登陆的时候，需要从服务器接收数据，并且更新。
然后当用户新建的时候，也需要从服务器更新数据，并更新本地数据列表。
我需要复用这个功能。

https://www.zhihu.com/question/40508884

https://github.com/zhoou/vue-cli-multipage-bootstrap/blob/master/src/assets/js/common/util.js

第一步：新建一个js文

```javascript
const utilHelper = {

```

第二步: main.js引用
import util from './assets/js/util'

Vue.prototype.utilHelper = util

第三步：全局使用
this.utilHelper.get_Todolist()

下一个问题是，getters怎么才能在这里使用呢？


14. 右键自定义该怎么做？
在清单，点击右键，出现删除按钮。

```html
    <div class=" list_bar " v-for="item in this.getLists"
         :class="{listactive: getActiveTodolists === item}"
         @click="updateActiveTodolist(item)" @contextmenu.prevent = "test()">
```

这个能防止并且启动test方法。但是我依然不知道该怎么才能生成自定义组件


https://www.npmjs.com/package/vue-context-menu

试试这个插件？

15. 如何显示时间？
vue本质就是javascript。
所以可以使用momentjs这个库。
http://momentjs.cn/
npm install moment
使用的时候，import moment 就可以了。
本地化需要注意的是，format之前就使用locale
https://itbilu.com/nodejs/npm/V19hUlw9x.html

然后如何才能让时间刷新呢？
https://itbilu.com/nodejs/npm/V19hUlw9x.html

这里有个完美的demo
新建一个方法，获取时间。
然后created里，设置一个setInterval函数，每隔1秒启动上面的方法。

但是这个会导致一个问题，就是页面其实是每一秒都在刷新的。
比如checkbox，刷新时间导致checkbox总是为空。
不知道为什么。
具体有什么冲突呢？

16. 异步操作该怎么做？promise？
我才发现vuex本身就是有actions里设置异步操作的功能
http://www.cnblogs.com/wwlhome/p/6522853.html



## ToDo
 
 
 - [x] 1.添加login模块-完成 

 - [x] 2.用leancloud存储在云上。

 - [ ] 3.restfulapi

 - [ ] 4.手机上接收和读写

 - [x] 5.笔记何时保存？怎么检测变化？比如说简书，是随时更新并且保存，并且打开浏览器就回到原来的数据。
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


 - [ ] 6.第三方登陆微信之类的

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

## 更新记录

- [x] 1.sidebar左边数字，默认为10，要更改为真实数字
数字是一开始从云端里获取并且渲染到列表的，然后就是随着todoitem的增删而变化
这里遇到一个问题，我采取的方法是新建一个count 的query来计算列表的item，但是这个是需要时间的，
结果这个造成在vuex之外试图写入数据了。解决办法一个是使用promise，一个是重新更新
但是，也可以有另一种方式，直接添加.添加和删除todoitem的时候就保存数据，这样的话，接收只要接收count就可以了。

- [ ] 2.要做我的一天功能
并不像一开始想的那么容易，主要问题还是数据结构。
比如说清单里的item要添加到我的一天里。
那么这个item是同时处在我的一天和原来的list里的。
这就是多对多关系了，貌似需要用中间表来实现

https://leancloud.cn/docs/relation-guide.html#%E4%BD%BF%E7%94%A8%E4%B8%AD%E9%97%B4%E8%A1%A8%E5%AE%9E%E7%8E%B0%E5%A4%9A%E5%AF%B9%E5%A4%9A%E5%85%B3%E7%B3%BB_%E6%8E%A8%E8%8D%90

首先要获取av.object。获取list和item的objectid获取的object。


- [ ] 3.添加子任务很有意思-wunderlist，还有双击的话，会出现一个左边的详细栏目这个很好

- [x] 4.任务完成的时候应该有声音提示的
首先点击元素再绑定一个方法：;号分开就可以了。
然后new Audio就可以了。
但是有个问题，相对目录和绝对路径问题。
static才是绝对路径。
剩下的都会被webpack处理
http://hq5544.github.io/vue-webpack/static.html

http://www.jianshu.com/p/f82c5ecbd3a5


- [ ] 5.fetchWhenSave
用这个来更新本地数据，而不是直接增加
https://github.com/leancloud/docs/blob/master/archive/js_guide.md


## 更新进度

2017/5/25/ 更新了todo的左边数字模块

## bug列表

- [ x ] 注册第二次不知道为什么会出现输入不能为空
