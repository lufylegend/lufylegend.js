lufylegend.js
=============

lufylegend是一个HTML5开源引擎， 它实现了利用仿ActionScript3.0的语法进行HTML5的开发，包含了LSprite，LBitmapData，LBitmap，LLoader，LURLLoader，LTextField，LEvent等多个AS开发人员熟悉的类， 支持Google Chrome，Firefox，Opera，IE9，IOS，Android等多种热门环境。利用lufylegend可以轻松的使用面向对象编程，并且可以配合Box2dWeb制作物理游戏， 另外它还内置了LTweenLite缓动类等非常实用的功能，现在开始使用它吧，它可以让你更快的进入HTML5的世界！


=============
※1.8.3版更新内容

1.修正了父容器缩放后对子对象的鼠标事件有影响的bug　

2.修正了父容器缩放后，对鼠标遮罩失效的bug　

3.修正了LSprite对象在使用addChildAt()方法时,无法添加子对象LTextField,LBitmap的bug

4.修正了LTextField在多行文本模式下,无法立刻获取正确高度的bug

5.修正了UI部分，LCheckBox的setChecked()方法时报错的bug　

6.修正了1.8.1之后LLoadManage无法重复使用的bug　

7.为了更好的释放内存，将引擎的LGlobal.destroy的默认值设置为true，也就是说对象在被removeChild的时候，子对象会自动被清空。　
