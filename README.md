lufylegend.js
=============

lufylegend是一个HTML5开源引擎， 它实现了利用仿ActionScript3.0的语法进行HTML5的开发，包含了LSprite，LBitmapData，LBitmap，LLoader，LURLLoader，LTextField，LEvent等多个AS开发人员熟悉的类， 支持Google Chrome，Firefox，Opera，IE9，IOS，Android等多种热门环境。利用lufylegend可以轻松的使用面向对象编程，并且可以配合Box2dWeb制作物理游戏， 另外它还内置了LTweenLite缓动类等非常实用的功能，现在开始使用它吧，它可以让你更快的进入HTML5的世界！

=============
开源协议 <a target='_blank' href="http://en.wikipedia.org/wiki/MIT_License">MIT License</a>
=============

=============
官网 <a target='_blank' href="http://lufylegend.com/lufylegend">http://lufylegend.com/lufylegend</a>
=============

※1.8.11版更新内容

1，修正了hitTest，hitTestRect和hitTestArc函数在对象缩放时检测会出现误差的bug。

2，修正了使用鼠标容器时无法单独添加MOUSE_OVER和MOUSE_OUT的bug。

3，修正了LSprite对象clone的时候，子对象重复复制的bug。

4，增加鼠标双击事件。

5，lufylegend.ui中追加了LMessageBox，类似于alert可用于弹出提示信息。

6，增加了对adobe flash cs导出纹理以及自设纹理的支持。

7，LBox2d提供消除重力和自由设定重力功能。