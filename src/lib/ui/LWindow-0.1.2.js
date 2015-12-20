/** @language chinese
 * <p>lufylegend.js专用UI，窗口</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * <p>其中参数也可以是一个Object对象。</p>
 * <table>
 * <tr><th>对象</th><th>说明</th></tr>
 * <tr><td>LLoader</td><td>图片加载完成事件。</td></tr>
 * <tr><td>LURLLoader</td><td>js文件或者文本文件加载完成事件。</td></tr>
 * <tr><td>LMedia</td><td>多媒体文件加载完成事件。</td></tr>
 * <tr><td>LAnimation</td><td>一组动画播放完成事件。</td></tr>
 * <tr><td>LStageWebView</td><td>网页加载完成事件。</td></tr>
 * </table>
 * @class UI:LWindow
 * @constructor
 * @extends LSprite
 * @param {Object} style 窗口的样式和内容。
 * <table>
 * <tr><th>参数</th><th>类型</th><th>说明</th></tr>
 * <tr><td>width</td><td>float</td><td>窗口的宽</td></tr>
 * <tr><td>height</td><td>float</td><td>窗口的高</td></tr>
 * <tr><td>title</td><td>string | LTextField</td><td>窗口的标题(可选)</td></tr>
 * <tr><td>color</td><td>string</td><td>title为string的时候，可以用此属性设置标题颜色(可选)</td></tr>
 * <tr><td>size</td><td>int</td><td>title为string的时候，可以用此属性设置标题大小(可选)</td></tr>
 * <tr><td>font</td><td>string</td><td>title为string的时候，可以用此属性设置标题字体(可选)</td></tr>
 * <tr><td>header</td><td>LBitmapData | LSprite</td><td>窗口的拖动栏(可选)</td></tr>
 * <tr><td>closeButton</td><td>LBitmapData | LSprite</td><td>关闭按钮(可选)</td></tr>
 * <tr><td>background</td><td>LBitmapData | LSprite</td><td>窗口背景(可选)</td></tr>
 * </table>
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
	function LWindow(){
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LWindow";
		var style;
		/*{width:nunber,height:number,title:string,header:LSprite,closeButton:LSprite,background:LSprite}*/
		if(typeof arguments[0] == "object"){
			style = arguments[0];
		}else{
			/*width,height,title*/
			style = {width:arguments[0],height:arguments[1],title:arguments[2]};
		}
		s.style = style;
		s.w = style.width;
		s.h = style.height;
		if(style.header){
			if(style.header.type == "LBitmapData"){
				var bitmapBar = new LBitmap(style.header);
				var bar = new LSprite();
				bar.addChild(bitmapBar);
				s.bar = bar;
			}else{
				s.bar = style.header;
			}
			s.bar.w = s.bar.getWidth();
			s.bar.h = s.bar.getHeight();
		}else{
			s.bar = new LSprite();
			style.header = s.bar;
			s.bar.alpha = 0.7;
			s.barColor = "#0000FF";
			s.bar.w = s.w;
			s.bar.h = 30;
			var barGrd = LGlobal.canvas.createLinearGradient(0, -s.bar.h * 0.5, 0, s.bar.h * 2);
			barGrd.addColorStop(0, "#FFFFFF");
			barGrd.addColorStop(1, s.barColor);
			s.bar.graphics.drawRoundRect(1, s.barColor, [0, 0, s.bar.w, s.bar.h, s.bar.h * 0.1], true, barGrd);
		}
		s.addChild(s.bar);
		s.bar.addEventListener(LMouseEvent.MOUSE_DOWN, s._onBarDown);
		if(style.title && typeof style.title == "object" && style.title.type == "LTextField"){
			s.title = style.title;
		}else{
			s.title = new LTextField();
			if(style.font){
				s.title.font = style.font;
			}
			s.title.size = style.size ? style.size : 16;
			s.title.color = style.color ? style.color : "#000000";
			s.title.text = style.title ? style.title : "";
		}
		s.title.x = s.title.getHeight() * 0.5;
		s.title.y = (s.bar.h - s.title.getHeight()) * 0.5;
		s.bar.addChild(s.title);
		
		if(style.closeButton){
			if(style.closeButton.type == "LBitmapData"){
				var bitmapClose = new LBitmap(style.closeButton);
				var closeButton = new LSprite();
				closeButton.addChild(bitmapClose);
				s.closeObj = closeButton;
			}else{
				s.closeObj = style.closeButton;
			}
			s.closeObj.x = s.w - s.closeObj.getWidth();
		}else{
			s.closeObj = new LSprite();
			style.closeButton = s.closeObj;
			s.closeObj.w = 50;
			s.closeObj.h = 25;
			s.closeObj.x = s.w - s.closeObj.w;
			var closeGrd = LGlobal.canvas.createLinearGradient(0, -s.closeObj.h * 0.5, 0, s.closeObj.h * 2);
			closeGrd.addColorStop(0, "#FFFFFF");
			closeGrd.addColorStop(1, "#800000");
			s.closeObj.graphics.drawRoundRect(1, "#800000", [0, 0, s.closeObj.w, s.closeObj.h, s.closeObj.h * 0.1], true, closeGrd);
			s.closeObj.graphics.drawLine(4, "#FFFFFF", [15, 5, s.closeObj.w - 15, s.closeObj.h - 5]);
			s.closeObj.graphics.drawLine(4, "#FFFFFF", [15, s.closeObj.h - 5, s.closeObj.w - 15, 5]);
		}
		s.addChild(s.closeObj);
		s.closeObj.addEventListener(LMouseEvent.MOUSE_UP, s._onClose);
	
		/** @language chinese
		 * [只读]窗口的根容器，在窗口中添加显示对象，都需要加在此容器或者它的子容器中。
		 * @property layer
		 * @type LSprite
		 * @since 0.1.0
		 * @public
		 */
		s.layer = new LSprite();
		s.layer.y = s.bar.h;
		if(style.background){
			if(style.background.type == "LBitmapData"){
				var bitmapBackground = new LBitmap(style.background);
				var background = new LSprite();
				background.addChild(bitmapBackground);
				s.background = background;
			}else{
				s.background = style.background;
			}
			s.layer.h = s.background.getHeight();
		}else{
			s.layerColor = "#FFFFFF";
			s.layer.h = s.h - s.bar.h;
			s.background = new LSprite();
			style.background = s.background;
			s.background.graphics.drawRect(1, s.barColor, [0, 0, s.w, s.layer.h], true, s.layerColor);
		}
		s.background.y = s.bar.h;
		s.addChild(s.background);
		s.addChild(s.layer);
		var g = new LGraphics();
		g.rect(0, 0, s.w, s.layer.h);
		s.layer.mask = g;
	
		s.addEventListener(LMouseEvent.MOUSE_UP, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {});
		s.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {});
	}
	/** @language chinese
	 * 窗口关闭时调用此事件。
	 * @event LWindow.CLOSE
	 * @since 0.1.0
	*/
	LWindow.CLOSE = "close";
	LWindow.prototype.clone = function () {
		var s = this, a = new LWindow({width:s.style.width,height:s.style.height,title:s.style.title,header:s.style.header.clone(),closeButton:s.style.closeButton.clone(),background:s.style.background.clone()});
		var mask = a.layer.mask;
		a.removeChild(a.layer);
		a.layer = s.layer.clone();
		a.layer.mask = mask;
		a.addChild(a.layer);
		a.bar.addEventListener(LMouseEvent.MOUSE_DOWN, a._onBarDown);
		a.close.addEventListener(LMouseEvent.MOUSE_UP, a._onClose);
		return a;
	};
	LWindow.prototype._onClose = function (event) {
		event.clickTarget.parent.close();
	};
	LWindow.prototype.close = function () {
		var s = this;
		s.dispatchEvent(LWindow.CLOSE);
		s.parent.removeChild(s);
	};
	LWindow.prototype._onBarDown = function (event) {
		var s = event.clickTarget.parent;
		s.bar.addEventListener(LMouseEvent.MOUSE_UP, s._onBarUp);
		s.startDrag(event.touchPointID);
	};
	LWindow.prototype._onBarUp = function (event) {
		var s = event.clickTarget.parent;
		s.stopDrag();
		s.bar.removeEventListener(LMouseEvent.MOUSE_UP, s._onBarUp);
	};
	return LWindow;
})();