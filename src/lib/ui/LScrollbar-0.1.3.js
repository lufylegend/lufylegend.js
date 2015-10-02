
/** @language chinese
 * <p>lufylegend.js专用UI，滚动条</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LScrollbar
 * @constructor
 * @extends LSprite
 * @param {LDisplayObject} showObject 需要加入滚动条的对象。
 * @param {float} maskW 滚动条对象的可视大小的宽。
 * @param {float} maskH 滚动条对象的可视大小的高。
 * @param {float|Object} param 如果是float类型，则表示滚动条的宽。如果是Object类型，则为{back:滚动条的背景,select:滚动条,arraw:向上的箭头}。
 * @param {Boolean} wVisible 是否显示横向滚动条，未设定则为默认。
 * @param {Boolean} hVisible 是否显示纵向滚动条，未设定则为默认。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LScrollbar.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Scroll bar
 * @class UI:LScrollbar
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LScrollbar.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、スクロール バー
 * @class UI:LScrollbar
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LScrollbar.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LScrollbar = (function () {
	function LScrollbar (showObject, maskW, maskH, param, wVisible, hVisible) {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LScrollbar";
		s._showLayer = new LSprite();
		s._mask = new LGraphics();
		s._mask.drawRect(0, "#ffffff", [0, 0, maskW, maskH]);
		s._showLayer.graphics.drawRect(0, "#ffffff", [0, 0, maskW, maskH]);
		s._wVisible = typeof wVisible == UNDEFINED ? true : wVisible;
		s._hVisible = typeof hVisible == UNDEFINED ? true : wVisible;
		s.addChild(s._showLayer);
		s._width = 0;
		s._height = 0;
		s._speed = 0;
		s._showObject = showObject;
		s._showLayer.addChild(showObject);
		s.mode = "touch";
		s._showObject.mask = s._mask;
		if (!param) {
			s._scrollWidth = 20;
			s._selectHeight = s._scrollWidth * 1.5;
		} else if (typeof param == "number") {
			s._scrollWidth = param;
			s._selectHeight = s._scrollWidth * 1.5;
		} else if (typeof param == "object") {
			if(typeof param["back"] != UNDEFINED && typeof param["select"] != UNDEFINED && typeof param["arraw"] != UNDEFINED){
				s._ll_bar_back = param["back"];
				s._ll_bar_select = param["select"];
				s._ll_bar_arraw = param["arraw"];
				s._scrollWidth = s._ll_bar_back.getWidth();
				s._selectHeight = s._ll_bar_select.getHeight();
			}else if(typeof param["scrollbarWidth"] != UNDEFINED){
				s._scrollWidth = param["scrollbarWidth"];
				s._selectHeight = s._scrollWidth * 1.5;
			}else{
				s._scrollWidth = 20;
				s._selectHeight = s._scrollWidth * 1.5;
			}
			
			if(typeof param["overflowX"] != UNDEFINED){
				s._wVisible = param["overflowX"];
			}
			if(typeof param["overflowY"] != UNDEFINED){
				s._hVisible = param["overflowY"];
			}
			if(typeof param["mode"] != UNDEFINED){
				s.mode = param["mode"];
			}
		}
		if(LGlobal.mobile){
			s._showObject.addEventListener(LMouseEvent.MOUSE_DOWN, function(e){
				e.currentTarget.startDrag(e.touchPointID);
			});
			s._showObject.addEventListener(LMouseEvent.MOUSE_UP, function(e){
				e.currentTarget.stopDrag();
			});
		}
		s._target = {x : 0, y : 0};
		s._maskW = maskW;
		s._maskH = maskH;
		s.excluding = false;
		s.addEventListener(LEvent.ENTER_FRAME, s.onFrame);
		s.dispatchEvent(LEvent.ENTER_FRAME);
		s.dragRangeUpdate();
	}
	LScrollbar.prototype.clone = function () {
		var s = this, a = new LScrollbar(s._showObject.clone(), s._maskW, s._maskH, s._scrollWidth, s._wVisible, s._hVisible);
		a.copyProperty(s);
		return a;
	};
	LScrollbar.prototype.dragRangeUpdate = function (w,h) {
		var s = this;
		if(typeof w == UNDEFINED) {
			w = s._showObject.getWidth();
		}
		if(typeof h == UNDEFINED) {
			h = s._showObject.getHeight();
		}
		s._showObject.dragRange = new LRectangle(w < s._maskW ? 0 : s._maskW - w,
		h < s._maskH ? 0 : s._maskH - h,
		w > s._maskW ? w - s._maskW : 0, 
			h > s._maskH ? h - s._maskH : 0);
	};
	LScrollbar.prototype.onFrame = function (event) {
		var s = event.currentTarget, w, h, i, l, child, m;
		w = s._showObject.getWidth();
		h = s._showObject.getHeight();
		if (s._wVisible && s._width != w) {
			s._width = w;
			if (s._width > s._maskW) {
				s.resizeWidth(true);
				s.moveLeft();
			} else {
				s.resizeWidth(false);
			}
			s.dragRangeUpdate(w,h);
		}
		if (s._hVisible && s._height != h) {
			s._height = h;
			if (s._height > s._maskH) {
				s.resizeHeight(true);
				s.moveUp();
			} else {
				s.resizeHeight(false);
			}
			s.dragRangeUpdate(w,h);
		}
		if (s.excluding) {
			for (i = 0, l = s._showObject.numChildren; i < l; i++) {
				child = s._showObject.getChildAt(i);
				if (child.x + s._showObject.x > s._maskW || child.x + child.getWidth() + s._showObject.x < 0 || child.y + s._showObject.y > s._maskH || child.y + child.getHeight() + s._showObject.y < 0) {
					child.visible = false;
				} else {
					child.visible = true;
				}
			}
		}
		if (s._key == null) {
			return;
		}
		if (s._key["up"]) {
			s.moveUp();
		}
		if (s._key["down"]) {
			s.moveDown();
		}
		if (s._key["left"]) {
			s.moveLeft();
		}
		if (s._key["right"]) {
			s.moveRight();
		}
		if (LGlobal.mobile && s.mode == "touch") {
			m = LGlobal.IS_MOUSE_DOWN;
			if (s._scroll_h) {
				s._scroll_h.visible = s._scroll_h_bar.visible = m;
			}
			if (s._scroll_w) {
				s._scroll_w.visible = s._scroll_w_bar.visible = m;
			}
			if (m){
				s.setScroll_h();
				s.setScroll_w();
			}
		}
	};

	LScrollbar.prototype.resizeWidth = function (value) {
		var s = this, grd, grdb;
		if (!value) {
			if (s._scroll_w != null) {
				s._scroll_w.parent.removeChild(s._scroll_w);
				s._scroll_w_bar.parent.removeChild(s._scroll_w_bar);
				s._scroll_w = null;
				s._scroll_w_bar = null;
			}
			return;
		}
		var i;
		if (s._scroll_w_bar == null) {
			if (s._key == null) {
				s._key = [];
			}
			s._scroll_w = new LSprite();
			s._scroll_w_bar = new LSprite();
			s.addChild(s._scroll_w);
			s.addChild(s._scroll_w_bar);
			var ny = s._scrollWidth * 1.5;
			s._scroll_w.x = 0;
			s._scroll_w.y = s._maskH;
			s._scroll_w_bar.x = s._scrollWidth;
			s._scroll_w_bar.y = s._maskH;
			grd = LGlobal.canvas.createLinearGradient(0, 0, s._scrollWidth * ((LGlobal.mobile && s.mode == "touch") ? 1 : 2), 0);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#008000");
			grdb = LGlobal.canvas.createLinearGradient(0, 0, 0, s._scrollWidth);
			grdb.addColorStop(0, "#FFFFFF");
			grdb.addColorStop(1, "#CCCCCC");
			/*bar*/
			if (s._ll_bar_select) {
				s._ll_bar_select_w = s._ll_bar_select.clone();
				s._ll_bar_select_w.rotateCenter = false;
				s._ll_bar_select_w.x = s._selectHeight;
				s._ll_bar_select_w.rotate = 90;
				s._scroll_w_bar.addChild(s._ll_bar_select_w);
			} else {
				s._scroll_w_bar.graphics.drawRoundRect(1, "#CCCCCC", [0, 0, s._scrollWidth * 1.5, s._scrollWidth, s._scrollWidth * 0.5], true, grd);
			}
			
			/*middle*/
			if (s._ll_bar_back) {
				s._ll_bar_back_w = s._ll_bar_back.clone();
				s._ll_bar_back_w.rotateCenter = false;
				s._ll_bar_back_w.x = s._maskW - s._scrollWidth;
				s._ll_bar_back_w.rotate = 90;
				s._scroll_w.addChild(s._ll_bar_back_w);
			} else {
				s._scroll_w.graphics.drawRoundRect(1, "#CCCCCC", [s._scrollWidth, 0, s._mask.getWidth() - s._scrollWidth * 2, s._scrollWidth, s._scrollWidth * 0.5], true, grdb);
			}
			
			/*left*/
			if (s._ll_bar_back) {
				s._ll_bar_arraw_left = s._ll_bar_arraw.clone();
				s._ll_bar_arraw_left.rotateCenter = false;
				s._ll_bar_arraw_left.y = s._scrollWidth;
				s._ll_bar_arraw_left.rotate = -90;
				s._scroll_w.addChild(s._ll_bar_arraw_left);
			} else {
				s._scroll_w.graphics.drawRect(0, "#000000", [0, 0, s._scrollWidth, s._scrollWidth]);
				s._scroll_w.graphics.drawVertices(1, "#CCCCCC", [[s._scrollWidth * 0.75, s._scrollWidth * 0.25], [s._scrollWidth * 0.75, s._scrollWidth * 0.75], [s._scrollWidth * 0.25, s._scrollWidth * 0.5]], true, grd);
			}
			/*right*/
			if (s._ll_bar_back) {
				s._ll_bar_arraw_left = s._ll_bar_arraw.clone();
				s._ll_bar_arraw_left.rotateCenter = false;
				s._ll_bar_arraw_left.x = s._maskW;
				s._ll_bar_arraw_left.rotate = 90;
				s._scroll_w.addChild(s._ll_bar_arraw_left);
			} else {
				s._scroll_w.graphics.drawRect(0, "#000000", [s._mask.getWidth() - s._scrollWidth, 0, s._scrollWidth, s._scrollWidth]);
				s._scroll_w.graphics.drawVertices(1, "#CCCCCC", [[s._mask.getWidth() - s._scrollWidth * 0.75, s._scrollWidth * 0.25], [s._mask.getWidth() - s._scrollWidth * 0.75, s._scrollWidth * 0.75], [s._mask.getWidth() - s._scrollWidth * 0.25, s._scrollWidth * 0.5]], true, grd);
			}
			if (LGlobal.mobile && s.mode == "touch") {
				return;
			}
			if (!s.hasEventListener(LMouseEvent.MOUSE_DOWN)) {
				s.addEventListener(LMouseEvent.MOUSE_DOWN, s.mouseDown);
			}
		}
	};
	LScrollbar.prototype.resizeHeight = function (value) {
		var s = this, grd, grdb;
		if (!value) {
			if (s._scroll_h != null) {
				s._scroll_h.parent.removeChild(s._scroll_h);
				s._scroll_h_bar.parent.removeChild(s._scroll_h_bar);
				s._scroll_h = null;
				s._scroll_h_bar = null;
			}
			return;
		}
		var i;
		if (s._scroll_h_bar == null) {
			if (s._key == null) {
				s._key = [];
			}
			s._scroll_h = new LSprite();
			s._scroll_h_bar = new LSprite();
			s.addChild(s._scroll_h);
			s.addChild(s._scroll_h_bar);
			var ny = s._scrollWidth * 1.5;
			s._scroll_h.x = s._maskW;
			s._scroll_h.y = 0;
			s._scroll_h_bar.x = s._maskW;
			s._scroll_h_bar.y = s._scrollWidth;
			grd = LGlobal.canvas.createLinearGradient(0, 0, s._scrollWidth * ((LGlobal.mobile && s.mode == "touch") ? 1 : 2), 0);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#008000");
			grdb = LGlobal.canvas.createLinearGradient(0, 0, s._scrollWidth, 0);
			grdb.addColorStop(0, "#FFFFFF");
			grdb.addColorStop(1, "#CCCCCC");
			/*bar*/
			if (s._ll_bar_select) {
				s._scroll_h_bar.addChild(s._ll_bar_select);
			} else {
				s._scroll_h_bar.graphics.drawRoundRect(1, "#CCCCCC", [0, 0, s._scrollWidth, s._scrollWidth * 1.5, s._scrollWidth * 0.5], true, grd);
			}
			/*middle*/
			if (s._ll_bar_back) {
				s._ll_bar_back_h = s._ll_bar_back.clone();
				s._ll_bar_back_h.y = (s._mask.getHeight() - s._ll_bar_back_h.getHeight()) * 0.5;
				s._scroll_h.addChild(s._ll_bar_back_h);
			} else {
				s._scroll_h.graphics.drawRoundRect(1, "#CCCCCC", [0, s._scrollWidth, s._scrollWidth, s._mask.getHeight() - s._scrollWidth * 2, s._scrollWidth * 0.5], true, grdb);
			}
			/*up*/
			if (s._ll_bar_back) {
				s._ll_bar_arraw_up = s._ll_bar_arraw.clone();
				s._scroll_h.addChild(s._ll_bar_arraw_up);
			} else {
				s._scroll_h.graphics.drawRect(0, "#000000", [0, 0, s._scrollWidth, s._scrollWidth]);
				s._scroll_h.graphics.drawVertices(1, "#CCCCCC", [[s._scrollWidth / 4, s._scrollWidth * 0.75], [s._scrollWidth / 2, s._scrollWidth / 4], [s._scrollWidth * 0.75, s._scrollWidth * 0.75]], true, grd);
			}
			/*down*/
			if (s._ll_bar_back) {
				s._ll_bar_arraw_down = s._ll_bar_arraw.clone();
				s._ll_bar_arraw_down.scaleY = -1;
				s._ll_bar_arraw_down.y = s._mask.getHeight();
				s._scroll_h.addChild(s._ll_bar_arraw_down);
			} else {
				s._scroll_h.graphics.drawRect(0, "#000000", [0, s._mask.getHeight() - s._scrollWidth, s._scrollWidth, s._scrollWidth]);
				s._scroll_h.graphics.drawVertices(1, "#CCCCCC", [[s._scrollWidth / 4, s._mask.getHeight() - s._scrollWidth * 0.75], [s._scrollWidth / 2, s._mask.getHeight() - s._scrollWidth * 0.25], [s._scrollWidth * 0.75, s._mask.getHeight() - s._scrollWidth * 0.75]], true, grd);
			}
			if (LGlobal.mobile && s.mode == "touch") {
				return;
			}
			if (!s.hasEventListener(LMouseEvent.MOUSE_DOWN)) {
				s.addEventListener(LMouseEvent.MOUSE_DOWN, s.mouseDown);
			}
		}
	};
	LScrollbar.prototype.moveLeft = function () {
		var s = this;
		if (!s._key["Dkey"] && s._showObject.x >= s._target.x) {
			s._key["left"] = false;
			s.setScroll_w();
			return;
		} else if (s._showObject.x >= 0) {
			s._showObject.x = 0;
			s._key["left"] = false;
			s.setScroll_w();
			return;
		}
		if (s._key["Dkey"]) {
			s._speed = 5;
		}
		s._showObject.x += s._speed;
		s.setScroll_w();
		s.setSpeed();
	};
	LScrollbar.prototype.setScroll_h = function () {
		var s = this;
		var sy = (s._mask.getHeight() - s._scrollWidth * 2 - s._selectHeight) * s._showObject.y / (s._mask.getHeight() - s._showObject.getHeight());
		if (s._scroll_h_bar) {
			s._scroll_h_bar.x = s._mask.getWidth();
			s._scroll_h_bar.y = s._scrollWidth + sy;
		}
	};
	LScrollbar.prototype.setScroll_w = function () {
		var s = this;
		var sx = (s._mask.getWidth() - s._scrollWidth * 2 - s._selectHeight) * s._showObject.x / (s._mask.getWidth() - s._showObject.getWidth());
		if (s._scroll_w_bar) {
			s._scroll_w_bar.x = s._scrollWidth + sx;
			s._scroll_w_bar.y = s._mask.getHeight();
		}
	};
	LScrollbar.prototype.moveUp = function () {
		var s = this;
		if (!s._key["Dkey"] && s._showObject.y >= s._target.y) {
			s._key["up"] = false;
			s.setScroll_h();
			return;
		} else if (s._showObject.y >= 0) {
			s._showObject.y = 0;
			s._key["up"] = false;
			s.setScroll_h();
			return;
		}
		if (s._key["Dkey"]) {
			s._speed = 5;
		}
		s._showObject.y += s._speed;
		s.setScroll_h();
		s.setSpeed();
	};
	LScrollbar.prototype.moveDown = function () {
		var s = this;
		if (!s._key["Dkey"] && s._showObject.y <= s._target.y) {
			s._key["down"] = false;
			s.setScroll_h();
			return;
		} else if (s._showObject.y <= s._mask.getHeight() - s._showObject.getHeight()) {
			s._showObject.y = s._mask.getHeight() - s._showObject.getHeight();
			s._key["down"] = false;
			s.setScroll_h();
			return;
		}
		if (s._key["Dkey"]) {
			s._speed = 5;
		}
		s._showObject.y -= s._speed;
		s.setScroll_h();
		s.setSpeed();
	};
	LScrollbar.prototype.getScrollY = function () {
		return this._showObject.y;
	};
	LScrollbar.prototype.setScrollY = function (value) {
		var s = this;
		s._showObject.y = s._mask.getHeight() - s._showObject.getHeight();
		if (s._showObject.y < -value) {
			s._showObject.y = -value;
		} else if (value < 0) {
			s._showObject.y = 0;
		}
		this.setScroll_h();
	};
	LScrollbar.prototype.getScrollX = function () {
		return this._showObject.x;
	};
	LScrollbar.prototype.setScrollX = function (value) {
		this._showObject.x = value;
		this.setScroll_w();
	};
	LScrollbar.prototype.scrollToTop = function () {
		this._showObject.y = 0;
		this.setScroll_h();
	};
	LScrollbar.prototype.scrollToBottom = function () {
		var s = this, h1 = s._showObject.getHeight(), h2 = s._mask.getHeight();
		s._showObject.y = h1 > h2 ? h2 - h1 : 0;
		s.setScroll_h();
	};
	LScrollbar.prototype.scrollToLeft = function () {
		this._showObject.x = 0;
		this.setScroll_w();
	};
	LScrollbar.prototype.scrollToRight = function () {
		var s = this, w1 = s._showObject.getWidth(), w2 = s._mask.getWidth();
		s._showObject.x = w1 > w2 ? w2 - w1 : 0;
		s.setScroll_w();
	};
	LScrollbar.prototype.moveRight = function () {
		var s = this;
		if (!s._key["Dkey"] && s._showObject.x <= s._target.x) {
			s._key["right"] = false;
			s.setScroll_w();
			return;
		} else if (s._showObject.x <= s._mask.getWidth() - s._showObject.getWidth()) {
			s._showObject.x = s._mask.getWidth() - s._showObject.getWidth();
			s._key["right"] = false;
			s.setScroll_w();
			return;
		}
		if (s._key["Dkey"]) {
			s._speed = 5;
		}
		s._showObject.x -= s._speed;
		s.setScroll_w();
		s.setSpeed();
	};
	LScrollbar.prototype.mouseUp = function (event) {
	};
	LScrollbar.prototype.mouseDown = function (event) {
		var s = event.clickTarget;
		if (s._scroll_h != null && event.selfX >= s._scroll_h.x && event.selfX <= s._scroll_h.x + s._scrollWidth) {
			s.mouseDownH(event, s);
		}
		if (s._scroll_w != null && event.selfY >= s._scroll_w.y && event.selfY <= s._scroll_w.y + s._scrollWidth) {
			s.mouseDownW(event, s);
		}
	};
	LScrollbar.prototype.mouseMoveH = function (event) {
		var s = event.clickTarget;
		if (event.selfY < s._scrollWidth || event.selfY > s._mask.getHeight()) {
			return;
		}
		var mx = event.selfY - s._key["scroll_y"];
		s._key["up"] = false;
		s._key["down"] = false;
		s._target.y = (s._mask.getHeight() - s._showObject.getHeight()) * (mx - s._scrollWidth) / (s._mask.getHeight() - s._scrollWidth * 3.5);
		if (s._target.y > s._showObject.y) {
			s._key["up"] = true;
		} else {
			s._key["down"] = true;
		}
		s._speed = Math.abs(s._target.y - s._showObject.y);
		s.setSpeed();
	};
	LScrollbar.prototype.mouseUpH = function (event) {
		var s = LGlobal.stage._ll_scrollbar;
		delete LGlobal.stage._ll_scrollbar;
		LGlobal.stage.removeEventListener(LMouseEvent.MOUSE_UP, s.mouseUpH);
		if (s._key["Dkey"]) {
			s._key["Dkey"] = false;
		} else {
			s.removeEventListener(LMouseEvent.MOUSE_MOVE, s.mouseMoveH);
			if (s._key["scroll_h"]) {
				s._key["scroll_h"] = false;
			}
		}
	};
	LScrollbar.prototype.mouseUpW = function (event) {
		var s = LGlobal.stage._ll_scrollbar;
		delete LGlobal.stage._ll_scrollbar;
		LGlobal.stage.removeEventListener(LMouseEvent.MOUSE_UP, s.mouseUpW);
		if (s._key["Dkey"]) {
			s._key["Dkey"] = false;
		} else {
			s.removeEventListener(LMouseEvent.MOUSE_MOVE, s.mouseMoveW);
			if (s._key["scroll_w"]) {
				s._key["scroll_w"] = false;
			}
		}
	};
	LScrollbar.prototype.mouseMoveW = function (event) {
		var s = event.clickTarget;
		if (event.selfX < s._scrollWidth || event.selfX > s._mask.getWidth()) {
			return;
		}
		var my = event.selfX - s._key["scroll_x"];
		s._key["left"] = false;
		s._key["right"] = false;
		s._target.x = (s._mask.getWidth() - s._showObject.getWidth()) * (my - s._scrollWidth) / (s._mask.getWidth() - s._scrollWidth * 3.5);
		if (s._target.x > s._showObject.x) {
			s._key["left"] = true;
		} else {
			s._key["right"] = true;
		}
		s._speed = Math.abs(s._target.x - s._showObject.x);
		s.setSpeed();
	};
	LScrollbar.prototype.setSpeed = function () {
		var s = this;
		s._speed = Math.floor(s._speed / 2);
		if (s._speed == 0) {
			s._speed = 1;
		}
	};
	LScrollbar.prototype.mouseDownW = function (event) {
		var s = event.clickTarget;
		if (event.selfX >= 0 && event.selfX <= s._scrollWidth) {
			if (s._showObject.x >= 0 || s._key["left"]) {
				return;
			}
			s._distance = 10;
			if (s._showObject.x + s._distance > 0) {
				s._distance = s._showObject.x;
			}
			s._target.x = s._showObject.x + s._distance;
			s._key["left"] = true;
			s._key["right"] = false;
			s._key["Dkey"] = true;
			s._speed = s._distance;
			s.setSpeed();
			if (!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP, s.mouseUpW)) {
				LGlobal.stage._ll_scrollbar = s;
				LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP, s.mouseUpW);
			}
		} else if (event.selfX >= s._mask.getWidth() - s._scrollWidth && event.selfX <= s._mask.getWidth()) {
			if (s._showObject.x <= s._mask.getWidth() - s._showObject.getWidth() || s._key["left"]) {
				return;
			}
			s._distance = 10;
			if (s._showObject.x - s._distance < s._mask.getWidth() - s._showObject.getWidth()) {
				s._distance = s._showObject.x - s._mask.getWidth() + s._showObject.getWidth();
			}
			s._target.x = s._showObject.x - s._distance;
			s._key["right"] = true;
			s._key["left"] = false;
			s._key["Dkey"] = true;
			s._speed = this._distance;
			s.setSpeed();
			if (!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP, s.mouseUpW)) {
				LGlobal.stage._ll_scrollbar = s;
				LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP, s.mouseUpW);
			}
		} else if (event.selfX >= s._scroll_w_bar.x && event.selfX <= s._scroll_w_bar.x + s._scroll_w_bar.getWidth() && !s._key["scroll_w"]) {
			s._key["scroll_w"] = true;
			s._key["scroll_x"] = event.selfX - s._scroll_w_bar.x;
			s._key["mouseX"] = event.selfX;
			s.addEventListener(LMouseEvent.MOUSE_MOVE, s.mouseMoveW);
			if (!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP, s.mouseUpW)) {
				LGlobal.stage._ll_scrollbar = s;
				LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP, s.mouseUpW);
			}
		} else if (event.selfX > 0 && event.selfX < s._mask.getWidth()) {
			s._key["left"] = false;
			s._key["right"] = false;
			s._target.x = (s._mask.getWidth() - s._showObject.getWidth()) * (event.selfX - s._scrollWidth) / (s._mask.getWidth() - s._scrollWidth * 3.5);
			if (s._target.x > s._showObject.x) {
				s._key["left"] = true;
			} else {
				s._key["right"] = true;
			}
			s._speed = Math.abs(s._target.x - s._showObject.x);
			s.setSpeed();
		}
	};
	LScrollbar.prototype.mouseDownH = function (event) {
		var s = event.clickTarget;
		if (event.selfY >= 0 && event.selfY <= s._scrollWidth) {
			if (s._showObject.y >= 0) {
				return;
			}
			s._distance = 10;
			if (s._showObject.y + s._distance > 0) {
				s._distance = s._showObject.y;
			}
			s._target.y = s._showObject.y + s._distance;
			s._key["up"] = true;
			s._key["down"] = false;
			s._key["Dkey"] = true;
			s._speed = s._distance;
			s.setSpeed();
			if (!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP, s.mouseUpH)) {
				LGlobal.stage._ll_scrollbar = s;
				LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP, s.mouseUpH);
			}
		} else if (event.selfY >= s._mask.getHeight() - s._scrollWidth && event.selfY <= s._mask.getHeight()) {
			if (s._showObject.y <= s._mask.getHeight() - s._showObject.getHeight()) {
				return;
			}
			s._distance = 10;
			if (s._showObject.y - s._distance < s._mask.getHeight() - s._showObject.getHeight()) {
				s._distance = s._showObject.y - s._mask.getHeight() + s._showObject.getHeight();
			}
			s._target.y = s._showObject.y - s._distance;
			s._key["down"] = true;
			s._key["up"] = false;
			s._key["Dkey"] = true;
			s._speed = s._distance;
			s.setSpeed();
			if (!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP, s.mouseUpH)) {
				LGlobal.stage._ll_scrollbar = s;
				LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP, s.mouseUpH);
			}
		} else if (event.selfY >= s._scroll_h_bar.y && event.selfY <= s._scroll_h_bar.y + s._scroll_h_bar.getHeight() && !s._key["scroll_h"]) {
			s._key["scroll_h"] = true;
			s._key["scroll_y"] = event.selfY - s._scroll_h_bar.y;
			s._key["mouseY"] = event.selfY;
			s.addEventListener(LMouseEvent.MOUSE_MOVE, s.mouseMoveH);
			if (!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP, s.mouseUpH)) {
				LGlobal.stage._ll_scrollbar = s;
				LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP, s.mouseUpH);
			}
		} else if (event.selfY > 0 && event.selfY < s._mask.getHeight()) {
			s._key["up"] = false;
			s._key["down"] = false;
			s._target.y = (s._mask.getHeight() - s._showObject.getHeight()) * (event.selfY - s._scrollWidth) / (s._mask.getHeight() - s._scrollWidth * 3.5);
			if (s._target.y > s._showObject.y) {
				s._key["up"] = true;
			} else {
				s._key["down"] = true;
			}
			s._speed = Math.abs(s._target.y - s._showObject.y);
			s.setSpeed();
		}
	};
	return LScrollbar;
})();