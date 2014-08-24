/** @language chinese
 * <p>lufylegend.js专用UI，窗口</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LWindow
 * @constructor
 * @extends LSprite
 * @param {float} width 窗口的宽。
 * @param {float} height 窗口的高。
 * @param {String} title 窗口的标题。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LWindow.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Window
 * @class UI:LWindow
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LWindow.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、モーダルウィンドウ
 * @class UI:LWindow
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LWindow.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LWindow = (function () {
	function LWindow(width,height,title){
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LWindow";
		s.w = width;
		s.h = height;
		s.bar = new LSprite();
		s.bar.alpha = 0.7;
		s.barColor = "#0000FF";
		s.bar.w = s.w;
		s.bar.h = 30;
		s.addChild(s.bar);
		s.bar.addEventListener(LMouseEvent.MOUSE_DOWN, s._onBarDown);
		s.title = new LTextField();
		s.title.x = s.title.y = 3;
		s.title.size = 16;
		s.title.text = title ? title : "";
		s.bar.addChild(s.title);
		
		s.close = new LSprite();
		s.closeColor = "#800000";
		s.close.w = 50;
		s.close.h = 25;
		s.addChild(s.close);
		s.close.addEventListener(LMouseEvent.MOUSE_UP, s._onClose);
		s.sign = new LSprite();
		s.signColor = "#FFFFFF";
		s.addChild(s.sign);
	
		/** @language chinese
		 * [只读]窗口的根容器，在窗口中添加显示对象，都需要加在此容器或者它的子容器中。
		 * @property layer
		 * @type LSprite
		 * @since 0.1.0
		 * @public
		 */
		s.layer = new LSprite();
		s.addChild(s.layer);
		s.layerColor = "#FFFFFF";
		s.layer.y = s.bar.h;
		s.layer.h = s.h - s.bar.h;
		var g = new LGraphics();
		g.rect(0, 0, s.w, s.layer.h);
		s.layer.mask = g;
		s.graphics.drawRect(1, s.barColor, [0, s.bar.h, s.w, s.layer.h], true, s.layerColor);
	
		s.addEventListener(LMouseEvent.MOUSE_UP, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {});
		s.addEventListener(LEvent.ENTER_FRAME, s._onDraw);
	}
	/** @language chinese
	 * 窗口关闭时调用此事件。
	 * @event LWindow.CLOSE
	 * @since 0.1.0
	*/
	LWindow.CLOSE = "close";
	LWindow.prototype.clone = function () {
		var s = this, a = new LWindow(s.w, s.h);
		a.copyProperty(s);
		a.removeChild(a.bar);
		a.bar = s.bar.clone();
		a.addChild(a.bar);
		a.removeChild(a.close);
		a.close = s.close.clone();
		a.addChild(a.close);
		a.removeChild(a.sign);
		a.sign = s.sign.clone();
		a.addChild(a.sign);
		a.removeChild(a.layer);
		a.layer = s.layer.clone();
		a.addChild(a.layer);
		a.bar.addEventListener(LMouseEvent.MOUSE_DOWN, a._onBarDown);
		a.close.addEventListener(LMouseEvent.MOUSE_UP, a._onClose);
		return a;
	};
	LWindow.prototype._onClose = function (event) {
		var s = event.clickTarget.parent;
		s.dispatchEvent(LWindow.CLOSE);
		s.parent.removeChild(s);
	};
	LWindow.prototype._onDraw = function (event) {
		var s = event.target;
		var co = s.getRootCoordinate();
		if (s.barColorSet == s.barColor) {
			return;
		}
		s.barColorSet = s.barColor;
		s.xSet = co.x;
		s.ySet = co.y;
		var barGrd = LGlobal.canvas.createLinearGradient(0, -s.bar.h * 0.5, 0, s.bar.h * 2);
		barGrd.addColorStop(0, "#FFFFFF");
		barGrd.addColorStop(1, s.barColor);
		var closeGrd = LGlobal.canvas.createLinearGradient(0, -s.close.h * 0.5, 0, s.close.h * 2);
		closeGrd.addColorStop(0, "#FFFFFF");
		closeGrd.addColorStop(1, s.closeColor);
		s.bar.graphics.clear();
		s.bar.graphics.drawRoundRect(1, s.barColor, [0, 0, s.bar.w, s.bar.h, s.bar.h * 0.1], true, barGrd);
		s.close.graphics.clear();
		s.close.graphics.drawRoundRect(1, s.closeColor, [s.w - s.close.w, 0, s.close.w, s.close.h, s.close.h * 0.1], true, closeGrd);
		s.sign.graphics.clear();
		s.sign.graphics.drawLine(4, s.signColor, [s.w - s.close.w + 15, 5, s.w - 15, s.close.h - 5]);
		s.sign.graphics.drawLine(4, s.signColor, [s.w - s.close.w + 15, s.close.h - 5, s.w - 15, 5]);
	};
	LWindow.prototype._onBarDown = function (event) {
		var s = event.clickTarget.parent;
		s.bar.addEventListener(LMouseEvent.MOUSE_UP, s._onBarUp);
		s.startDrag();
	};
	LWindow.prototype._onBarUp = function (event) {
		var s = event.clickTarget.parent;
		s.stopDrag();
		s.bar.removeEventListener(LMouseEvent.MOUSE_UP, s._onBarUp);
	};
	return LWindow;
})();