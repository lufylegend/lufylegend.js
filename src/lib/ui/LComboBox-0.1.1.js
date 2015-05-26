/** @language chinese
 * <p>lufylegend.js专用UI，组合框。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LComboBox
 * @constructor
 * @extends LSprite
 * @param {int} size [可选]组合框文字的大小。
 * @param {String} color [可选]组合框文字的颜色。
 * @param {String} font [可选]组合框文字的格式。
 * @param {LPanel} layer [可选]组合框的背景样式。
 * @param {LDisplayObject} layerUp [可选]组合框的按钮抬起状态样式。
 * @param {LDisplayObject} layerOver [可选]组合框的按钮抬起状态样式。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LComboBox.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, ComboBox
 * @class UI:LComboBox
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LComboBox.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、コンボボックス
 * @class UI:LComboBox
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LComboBox.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LComboBox = (function () {
	function LComboBox (size, color, font, layerBack, layerUp, layerOver) {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LComboBox";
		s.list = [];
		/** @language chinese
		 * [只读]组合框的值的索引
		 * @property selectIndex
		 * @type String
		 * @since 0.1.0
		 * @public
		 */
		/** @language english
		 * The index of LComboBox's value
		 * @property selectIndex
		 * @type String
		 * @since 0.1.0
		 * @public
		 */
		/** @language japanese
		 * コンボボックスの値のインデックス
		 * @property selectIndex
		 * @type String
		 * @since 0.1.0
		 * @public
		 */
		s.selectIndex = -1;
		/** @language chinese
		 * [只读]组合框的值
		 * @property value
		 * @type String
		 * @since 0.1.0
		 * @public
		 */
		/** @language english
		 * The LComboBox's value
		 * @property value
		 * @type String
		 * @since 0.1.0
		 * @public
		 */
		/** @language japanese
		 * コンボボックスの値
		 * @property value
		 * @type String
		 * @since 0.1.0
		 * @public
		 */
		s.value = null;
		s.selectWidth = 100;
		if (!size) {
			size = 16;
		}
		if (!color) {
			color = "#000000";
		}
		if (!font) {
			font = "Arial";
		}
		s.size = size;
		s.color = color;
		s.font = font;
		s.maxIndex = 5;
		if (!layerBack) {
			var back = new LSprite();
			back.graphics.drawRoundRect(1, "#999999", [0, 0, 12, 12, 4], true, "#f5f5f9");
			var bitBack = new LBitmapData(null, 0, 0, 12, 12, LBitmapData.DATA_CANVAS);
			bitBack.draw(back);
			layerBack = new LPanel(bitBack, 200, 30, 4, 8, 4, 8);
		}
		var layer;
		if (!layerUp || !layerOver) {
			var up, down, data;
			grd = LGlobal.canvas.createLinearGradient(0, -20, 0, 40);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#CCCCCC");
			up = new LSprite();
			up.graphics.drawRoundRect(1, "#CCCCCC", [0, 0, 22, 22, 2], true, grd);
			up.graphics.drawVertices(1, "#CCCCCC", [[6, 6], [16, 6], [11, 18]], true, "#008000");
			data = new LBitmapData(null, 0, 0, 22, 22, LBitmapData.DATA_CANVAS);
			data.draw(up);
			layerUp = new LBitmap(data);
			down = new LSprite();
			down.graphics.drawRoundRect(1, "#CCCCCC", [0, 0, 22, 22, 2], true, grd);
			down.graphics.drawVertices(1, "#CCCCCC", [[6, 6], [16, 6], [11, 18]], true, "#32CD32");
			data = new LBitmapData(null, 0, 0, 22, 22, LBitmapData.DATA_CANVAS);
			data.draw(down);
			layerOver = new LBitmap(data);
		}
		s.minWidth = layerBack.getWidth();
		s.minHeight = layerBack.getHeight();
		var layer1 = layerBack.clone();
		layerUp.x = layer1.getWidth() - layerUp.getWidth() -4;
		layerUp.y = 4;
		layer1.arraw = layerUp;
		layer1.addChild(layerUp);
		var layer2 = layerBack.clone();
		layerOver.x = layer2.getWidth() - layerOver.getWidth() -4;
		layerOver.y = 4;
		layer2.arraw = layerOver;
		layer2.addChild(layerOver);
		layer = new LButton(layer1, layer2);
		layer.setCursorEnabled(false);
		layer.staticMode = true;
		
		s.addChild(layer);
		var label = new LTextField();
		label.x = 4;
		label.y = 4;
		label.text = "";
		label.size = s.size;
		label.color = s.color;
		label.font = s.font;
		layer.addChild(label);
		s.label = label;
		s.layer = layer;
		s.addEventListener(LMouseEvent.MOUSE_UP, s._showChildList);
	}
	/** @language chinese
	 * 组合框的值改变时调用此事件。
	 * @event LComboBox.ON_CHANGE
	 * @since 0.1.0
	*/
	/** @language english
	 * onchange event。
	 * @event LComboBox.ON_CHANGE
	 * @since 0.1.0
	 */
	/** @language japanese
	 * onchangeイベント。
	 * @event LComboBox.ON_CHANGE
	 * @since 0.1.0
	 */
	LComboBox.ON_CHANGE = "onchange";
	LComboBox.prototype._ll_resize = function () {
		var s = this;
		if (s.list.length == 0) {
			return;
		}
		var txt = new LTextField();
		txt.text = s.list[0].label;
		txt.size = s.size;
		var w = txt.getWidth();
		var h = txt.getHeight();
		if (h + 8 < s.minHeight) {
			h = s.minHeight - 8;
			s.label.y = (h + 8 - txt.getHeight()) * 0.5;
		} else {
			s.label.y = 4;
		}
		if (w + h + 8 < s.minWidth) {
			w = s.minWidth - h - 8;
		}
		
		var arraw = s.layer.upState.arraw;
		arraw.scaleX = 1;
		arraw.scaleX = arraw.scaleY = h / arraw.getWidth();
		arraw.x = w + 4;
		arraw = s.layer.downState.arraw;
		arraw.scaleX = 1;
		arraw.scaleX = arraw.scaleY = h / arraw.getWidth();
		arraw.x = w + 4;
		s.layer.upState.resize(w + h + 8, h + 8);
		s.layer.downState.resize(w + h + 8, h + 8);
	},
	/** @language chinese
	 * 删除元素。
	 * @method deleteChild
	 * @param {String} value 删除元素的值。
	 * @since 0.1.0
	 * @public
	 */
	LComboBox.prototype.deleteChild = function (value) {
		var s = this, i, l, delIndex = -1;
		for (i = 0, l = s.list.length; i < l; i++) {
			if (s.list[i].value === value) {
				delIndex = i
				break;
			}
		}
		if (delIndex == -1) {
			return;
		}
		s.list.splice(delIndex, 1);
		if (s.value !== value) {
			return;
		}
		if (s.list.length > 0) {
			s.setValue(s.list[delIndex > 0 ? delIndex - 1 : 0]);
		} else {
			s.selectIndex = -1;
			s.value = null;
		}
		s._ll_resize();
	};
	/** @language chinese
	 * 增加元素。
	 * @method setChild
	 * @param {String} value 增加元素的值。
	 * @since 0.1.0
	 * @public
	 */
	LComboBox.prototype.setChild = function (child) {
		var s = this, i, l;
		if (!child || typeof child.value == UNDEFINED || typeof child.label == UNDEFINED) {
			throw "the child must be an object like:{label:a,value:b}";
		}
		
		for (i = 0, l = s.list.length; i < l; i++) {
			if (s.list[i].value === child.value) {
				return;
			}
		}
		s.list.push(child);
		if (s.list.length == 1) {
			s.setValue(child.value);
		}
		s._ll_resize();
	};
	LComboBox.prototype._showChildList = function (event) {
		var s = event.currentTarget;
		s.showChildList();
	};
	LComboBox.prototype.showChildList = function () {
		var s = this, i, l, child, w;
		var textLayer = new LSprite();
		selectLayer = new LSprite();
		textLayer.addChild(selectLayer);
		textLayer.selectLayer = selectLayer;
		textLayer.childHeight = s.size * 1.5 >>> 0;
		for (i = 0, l = s.list.length; i < l; i++) {
			child = s.list[i];
			var text = new LTextField();
			text.size = s.size;
			text.color = s.color;
			text.font = s.font;
			text.text = child.label;
			text.x = 5;
			text.y = 5 + textLayer.childHeight * i;
			textLayer.addChild(text);
		}
		w = textLayer.getWidth();
		if (w < 196) {
			w = 196;
		}
		textLayer.graphics.drawRect(1, "#999999", [0, 0, w + 4, textLayer.childHeight * s.list.length + 4], true, "#f5f5f9");
		selectLayer.graphics.drawRect(0, "#CCCCCC", [2, 2, w, textLayer.childHeight], true, "#CCCCCC");
		selectLayer.y = textLayer.childHeight * s.selectIndex;
		var coordinate = s.getRootCoordinate();
		textLayer.comboBox = s;
		var translucent = new LSprite();
		translucent.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
		translucent.alpha = 0;
		LGlobal.stage.addChild(translucent);
		translucent.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
			var cnt = LGlobal.stage.numChildren;
			LGlobal.stage.removeChildAt(cnt - 1);
			LGlobal.stage.removeChildAt(cnt - 2);
		});
		translucent.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {});
		translucent.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {});
		translucent.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {});
		translucent.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {});
		if (s.list.length > s.maxIndex) {
			var sc = new LScrollbar(textLayer, w, textLayer.childHeight * s.maxIndex, {overflowX:false,mode:"pc"});
			sc.mode = "pc";
			sc.x = coordinate.x;
			sc.y = coordinate.y + s.layer.getHeight();
			if (sc.y + textLayer.childHeight * s.maxIndex > LGlobal.height) {
				sc.y = LGlobal.height - textLayer.childHeight * s.maxIndex;
			}
			sc.resizeHeight(sc._maskH);
			sc._key["down"] = true;
			sc._key["up"] = false;
			sc._tager = {x : 0, y : 40};
			sc._speed = Math.abs(sc._tager.y - sc._showObject.y);
			sc.setSpeed();
			sc.setScrollY(textLayer.childHeight * s.selectIndex);
			LGlobal.stage.addChild(sc);
		} else {
			textLayer.x = coordinate.x;
			textLayer.y = coordinate.y + s.layer.getHeight();
			if (textLayer.y + textLayer.getHeight() > LGlobal.height) {
				textLayer.y = LGlobal.height - textLayer.getHeight();
			}
			LGlobal.stage.addChild(textLayer);
		}
		textLayer.addEventListener(LMouseEvent.MOUSE_MOVE, s._childSelecting);
		textLayer.addEventListener(LMouseEvent.MOUSE_UP, s._childSelected);
	};
	LComboBox.prototype._childSelecting = function (event) {
		var textLayer = event.currentTarget, i;
		i = event.selfY / textLayer.childHeight >>> 0;
		if (i >= textLayer.comboBox.list.length) {
			return;
		}
		textLayer.selectLayer.y = textLayer.childHeight * i;
	};
	LComboBox.prototype._childSelected = function (event) {
		var textLayer = event.currentTarget, i, v;
		i = event.selfY / textLayer.childHeight >>> 0;
		textLayer.comboBox.setValue(textLayer.comboBox.list[i].value);
		var cnt = LGlobal.stage.numChildren;
		LGlobal.stage.removeChildAt(cnt - 1);
		LGlobal.stage.removeChildAt(cnt - 2);
	};
	/** @language chinese
	 * 设置组合框的值。
	 * @method setValue
	 * @param {String} value 组合框的值。
	 * @since 0.1.0
	 * @public
	 */
	LComboBox.prototype.setValue = function (value, noEvent) {
		var s = this, c, i, l;
		if(s.value == value){
			return;
		}
		c = s.list;
		for (i = 0, l = c.length; i < l; i++) {
			if (c[i].value == value) {
				s.selectIndex = i;
				s.value = s.list[s.selectIndex].value;
				s.label.text = s.list[s.selectIndex].label;
				if (!noEvent) {
					s.dispatchEvent(LComboBox.ON_CHANGE);
				}
				break;
			}
		}
	};
	LComboBox.prototype.clone = function () {
		var s = this, a = new LComboBox(), k, c;
		for (k in s.list) {
			c = s.list[k];
			a.setChild({label : c.label, value : c.value});
		}	
		a.setValue(s.value);
		return a;
	};
	return LComboBox;
})();