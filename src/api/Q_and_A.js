/** @language chinese
 * <p>开发者常见问题</p>
 * @class Q & A
 */
/** @language english
 * <p>Development FAQ</p>
 * @class Q & A
 */
/** @language japanese
 * <p>開発者よくある質問</p>
 * @class Q & A
 */


/** @language chinese
 * 引擎提供了自动全屏适配的设置，请参考<a href="全屏设置.html">全屏设置</a>部分。
 * @property 如何自动适配不同大小的屏幕。
 */
/** @language english
 * ......
 * @property adapts to different screen sizes.
 */
/** @language japanese
 * ......
 * @property 異なる画面サイズおよびターゲットフォントサイズに適合することについて。
 */


/** @language chinese
 * 一般这个问题，都是因为将游戏的刷新速度当成了FPS来设置了，在引擎初始化函数LInit中设置的速度speed是游戏画面的刷新速度，这个速度speed与FPS之间的关系为FPS=1000/speed。
 * @property 游戏画面很简单，但是为什么FPS就是上不去？
 */


/** @language chinese
 * 这个一般是由LBitmap的旋转导致的，LBitmap对象默认是以自身的中心为参考点来进行旋转的，这个旋转会导致碰撞以及鼠标点击事件发生错位，解决的办法就是通过设置rotateCenter的值，取消LBitmap对象的旋转中心。
 * @property 为什么对象进行了旋转之后鼠标点击或者碰撞失效了？
 * @example
 * 	var bitmap = LBitmap(bitmapData);
 * 	bitmap.rotateCenter = false;
 */


/** @language chinese
 * <p>对象旋转一般是指LBitmap和LSprite对象的旋转，如果要改变旋转的中心点，请参考下面这个帖子中介绍的方法。</p>
 * <p><a href="http://lufylegend.com/forum/forum.php?mod=viewthread&tid=17755">关于对象的旋转中心和缩放中心的设置</a></p>
 * @property 关于旋转中心点的问题。
 */


/** @language chinese
 * 这是因为lufylegend中拦截了触屏事件导致的，可以通过设置LGlobal.preventDefault的值来禁止拦截触屏事件。
 * @property 移动开发中，页面引入lufylegend之后，页面的触屏事件失效了，链接也无法点击了，无法滚动屏幕了。
 * @example
 * 	LGlobal.preventDefault = false;
 */


/** @language chinese
 * 这可能是你音频加载完成之后，没有移除相应的加载事件导致的。
 * @property 有些浏览器中音频会不断的重复播放？
 */


/** @language chinese
 * 引擎提供了自动全屏适配的设置，请参考部分。
 * @property 不断的绘制图形，导致游戏越来越卡怎么办？
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 */