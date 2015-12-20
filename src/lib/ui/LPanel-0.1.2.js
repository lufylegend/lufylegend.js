/** @language chinese
 * <p>lufylegend.js专用UI，Panel。可以利用九宫格对图片进行缩放，实现图片缩放后不失真效果。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LPanel
 * @constructor
 * @extends LSprite
 * @param {LBitmapData|String} data 一个LBitmapData对象，或者是一个表示颜色的字符串，如“＃FF0000”。
 * @param {float} width 想要表示的Panel的宽。
 * @param {float} height 想要表示的Panel的高。
 * @param {float} x1 x方向上第一个分割线位置。
 * @param {float} x2 x方向上第二个分割线位置。
 * @param {float} y1 y方向上第一个分割线位置。
 * @param {float} y2 y方向上第二个分割线位置。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LPanel.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Panel
 * @class UI:LPanel
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LPanel.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、コントロールパネル
 * @class UI:LPanel
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LPanel.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LPanel = (function () {
	function LPanel (bitmapData, w, h, x1, x2, y1, y2, overlapping) {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LPanel";
		if(typeof overlapping == UNDEFINED){
			overlapping = 0;
		}
		self.overlapping = overlapping;
		if (typeof bitmapData == "string") {
			var d = new LShape();
			if(typeof w == UNDEFINED){
				w = 20;
			}
			if(typeof h == UNDEFINED){
				h = 20;
			}
			d.graphics.drawRoundRect(1, "#000000", [0, 0, w, h, w < 10 ? w * 0.5 : 5], true, bitmapData);
			bitmapData = new LBitmapData(null, 0, 0, w, h, LBitmapData.DATA_CANVAS);
			bitmapData.draw(d);
		}
		s.x1 = x1 ? x1 : bitmapData.width * 0.4;
		s.x2 = x2 ? x2 : bitmapData.width * 0.6;
		s.y1 = y1 ? y1 : bitmapData.height * 0.4;
		s.y2 = y2 ? y2 : bitmapData.height * 0.6;
		s.bitmapData = bitmapData;
		var ltData = new LBitmapData(bitmapData.image, bitmapData.x, bitmapData.y, s.x1, s.y1);
		var mtData = new LBitmapData(bitmapData.image, bitmapData.x + s.x1, bitmapData.y, s.x2 - s.x1, s.y1);
		var rtData = new LBitmapData(bitmapData.image, bitmapData.x + s.x2, bitmapData.y, bitmapData.width - s.x2, s.y1);
		var lmData = new LBitmapData(bitmapData.image, bitmapData.x, bitmapData.y + s.y1, s.x1, s.y2 - s.y1);
		var mmData = new LBitmapData(bitmapData.image, bitmapData.x + s.x1, bitmapData.y + s.y1, s.x2 - s.x1, s.y2 - s.y1);
		var rmData = new LBitmapData(bitmapData.image, bitmapData.x + s.x2, bitmapData.y + s.y1, bitmapData.width - s.x2, s.y2 - s.y1);
		var lbData = new LBitmapData(bitmapData.image, bitmapData.x, bitmapData.y + s.y2, s.x1, bitmapData.height - s.y2);
		var mbData = new LBitmapData(bitmapData.image, bitmapData.x + s.x1, bitmapData.y + s.y2, s.x2 - s.x1, bitmapData.height - s.y2);
		var rbData = new LBitmapData(bitmapData.image, bitmapData.x + s.x2, bitmapData.y + s.y2, bitmapData.width - s.x2, bitmapData.height - s.y2);
		s.ltBitmap = new LBitmap(ltData);
		s.addChild(s.ltBitmap);
		s.mtBitmap = new LBitmap(mtData);
		s.mtBitmap.x = s.x1 - overlapping;
		s.addChild(s.mtBitmap);
		s.rtBitmap = new LBitmap(rtData);
		s.addChild(s.rtBitmap);
		
		s.lmBitmap = new LBitmap(lmData);
		s.lmBitmap.y = s.y1 - overlapping;
		s.addChild(s.lmBitmap);
		s.mmBitmap = new LBitmap(mmData);
		s.mmBitmap.x = s.x1 - overlapping;
		s.mmBitmap.y = s.y1 - overlapping;
		s.addChild(s.mmBitmap);
		s.rmBitmap = new LBitmap(rmData);
		s.rmBitmap.y = s.y1 - overlapping;
		s.addChild(s.rmBitmap);
		
		s.lbBitmap = new LBitmap(lbData);
		s.addChild(s.lbBitmap);
		s.mbBitmap = new LBitmap(mbData);
		s.mbBitmap.x = s.x1 - overlapping;
		s.addChild(s.mbBitmap);
		s.rbBitmap = new LBitmap(rbData);
		s.addChild(s.rbBitmap);
		
		s.resize(w, h);
	}
	/** @language chinese
	 * 重新设定大小。
	 * @method resize
	 * @param {float} width 想要表示的Panel的宽。
	 * @param {float} height 想要表示的Panel的高。
	 * @since 0.1.0
	 * @public
	 */
	LPanel.prototype.resize = function (w,h) {
		var s = this;
		s._ll_w = w;
		s._ll_h = h;
		s.rtBitmap.x = s.rmBitmap.x = s.rbBitmap.x = w - (s.bitmapData.width - s.x2);
		s.lbBitmap.y = s.mbBitmap.y = s.rbBitmap.y = h - (s.bitmapData.height - s.y2);
		s.lmBitmap.scaleY = s.mmBitmap.scaleY = s.rmBitmap.scaleY = (h - s.y1 - (s.bitmapData.height - s.y2) + self.overlapping * 2) / (s.y2 - s.y1);
		s.mtBitmap.scaleX = s.mmBitmap.scaleX = s.mbBitmap.scaleX = (w - s.x1 - (s.bitmapData.width - s.x2) + self.overlapping * 2) / (s.x2 - s.x1);
	};
	LPanel.prototype.getSize = function () {
		return {width:this._ll_w, height:this._ll_h};
	};
	LPanel.prototype.clone = function () {
		var s = this;
		return new LPanel(s.bitmapData.clone(), s._ll_w, s._ll_h, s.x1, s.x2, s.y1, s.y2, self.overlapping);
	};
	return LPanel;
})();