lufylegend.js
=============

lufylegend是一个HTML5开源引擎， 它实现了利用仿ActionScript3.0的语法进行HTML5的开发，包含了LSprite，LBitmapData，LBitmap，LLoader，LURLLoader，LTextField，LEvent等多个AS开发人员熟悉的类， 支持Google Chrome，Firefox，Opera，IE9，IOS，Android等多种热门环境。利用lufylegend可以轻松的使用面向对象编程，并且可以配合Box2dWeb制作物理游戏， 另外它还内置了LTweenLite缓动类等非常实用的功能，现在开始使用它吧，它可以让你更快的进入HTML5的世界！


=============
※1.8.6版更新内容

1.修改了三星等部分手机卡死的bug

2.为缓动对象增加了循环属性

3.完善了全屏属性

4.增加了游戏全屏时画面的algin属性

5.增加了两个loading效果（由网友yorhomwang提供，在此表示感谢）

新增功能的具体用法请看最新版的API文档

=============
※1.8.5版更新内容

1.完善了LPoint，感谢网友陈前帆帮忙一起完善

2.修正了当LDisplayObject对象缩放的时候，getRootCoordinate函数得不到正确坐标的bug

3.修改了引擎中的一些for循环，提高了效率

4.为LTextField和LBitmap对象提供了remove函数，LSprite对象中已有此函数，该函数从父容器中移除自己

5.增加了LShape类

6.为了降低鼠标事件的消耗，增加了LMouseEventContainer类。

7.为LTweenLite增加了onStart属性　

=============
※1.8.4版更新内容

1.修正了1.8.0以后LTextField变输入框的时候，在手机上位置错位的bug　

2.完善了base继承函数，特别感谢网友陈前帆和Predaking提供bug信息　

=============
※1.8.3版更新内容

1.修正了父容器缩放后对子对象的鼠标事件有影响的bug　

2.修正了父容器缩放后，对鼠标遮罩失效的bug　

3.修正了LSprite对象在使用addChildAt()方法时,无法添加子对象LTextField,LBitmap的bug

4.修正了LTextField在多行文本模式下,无法立刻获取正确高度的bug

5.修正了UI部分，LCheckBox的setChecked()方法时报错的bug　

6.修正了1.8.1之后LLoadManage无法重复使用的bug　

7.为了更好的释放内存，将引擎的LGlobal.destroy的默认值设置为true，也就是说对象在被removeChild的时候，子对象会自动被清空。　
