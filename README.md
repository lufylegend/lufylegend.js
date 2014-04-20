lufylegend.js
=============

lufylegend是一个HTML5开源引擎， 它实现了利用仿ActionScript3.0的语法进行HTML5的开发，包含了LSprite，LBitmapData，LBitmap，LLoader，LURLLoader，LTextField，LEvent等多个AS开发人员熟悉的类， 支持Google Chrome，Firefox，Opera，IE9，IOS，Android等多种热门环境。利用lufylegend可以轻松的使用面向对象编程，并且可以配合Box2dWeb制作物理游戏， 另外它还内置了LTweenLite缓动类等非常实用的功能，现在开始使用它吧，它可以让你更快的进入HTML5的世界！

=============
开源协议 <a target='_blank' href="http://en.wikipedia.org/wiki/MIT_License">MIT License</a>
=============

=============
官网 <a target='_blank' href="http://lufylegend.com/lufylegend">http://lufylegend.com/lufylegend</a>
=============

※1.8.9版更新内容

1，修正了对象没有显示时鼠标容器报错的bug（感谢Yorhom提供bug）

2，修正了LLoadManage读取文件时，无法使用数组关键字作为名字的bug

3，修正了游戏居中全屏显示后Firefox浏览器鼠标失效的bug

4，扩展了鼠标事件部分，支持多次加载同类型事件

5，扩展了鼠标事件部分，扩展后，即使父容器注册了事件，子对象的事件监听依然有效（感谢张晓龙帮助修改）。（注：该扩展对鼠标容器无效）

6，提供了多边形检测，修正了绘制的多边形无法响应鼠标事件的bug

7，为LSprite增加拖拽功能startDrag和stopDrag，优化了ui组建中LWindow的拖拽

8，修正了不全屏无法居中的问题

9，修改了内部比较敏感的函数名

10，修正了无法使用多点触摸的问题

11，修正了DisplayObject及其子对象的数组属性无法clone的bug