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
		var params;
		if(typeof size != "object"){
			params = {size:size,color:color,font:font,layerBack:layerBack,layerUp:layerUp,layerOver:layerOver};
		}
		s.size = params.size ? params.size : 16;
		s.font = params.font ? params.font : "Arial";
		s.color = params.color ? params.color : "#000000"; 
		layerBack = params.layerBack;
		layerUp = params.layerUp;
		layerOver = params.layerOver;

		s.params = params;
		s.maxIndex = 5;
		if (!layerBack) {
			layerBack = new LSprite();
			layerBack.graphics.drawRoundRect(1, "#999999", [0, 0, 200, 30, 4], true, "#f5f5f9");
		}
		s.listView = new LListView();
		s.listView.dragEffect = LListView.DragEffects.Momentum;
		s.listView.cellWidth = s.minWidth = layerBack.getWidth();
		s.listView.cellHeight = s.minHeight = layerBack.getHeight();
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
		
		var layer1 = layerBack.clone();
		layerUp.x = layer1.getWidth() - layerUp.getWidth() -4;
		layerUp.y = 4;
		layer1.arraw = layerUp;
		layer1.addChild(layerUp);
		layer1.cacheAsBitmap(true);
		var layer2 = layerBack.clone();
		layerOver.x = layer2.getWidth() - layerOver.getWidth() -4;
		layerOver.y = 4;
		layer2.arraw = layerOver;
		layer2.addChild(layerOver);
		layer2.cacheAsBitmap(true);
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
		s.listChildView = LComboBoxChild;
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
				delIndex = i;
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
			s.setValue(s.list[delIndex > 0 ? delIndex - 1 : 0].value);
		} else {
			s.selectIndex = -1;
			s.label.text = "";
			s.value = null;
		}
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
	};
	LComboBox.prototype.die = function () {
		var self = this;
		self.listView.die();
		self.listView.removeAllChild();
		self.callParent("die",arguments);
	};
	LComboBox.prototype._showChildList = function (event) {
		var s = event.currentTarget;
		s.showChildList();
	};
	LComboBox.prototype.setListChildView = function (childClass) {
		this.listChildView = childClass;
	};
	LComboBox.prototype.showChildList = function () {
		var s = this, i, l, child, w;
		
		var translucent = new LSprite();
		translucent.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
		translucent.alpha = 0;
		LGlobal.stage.addChild(translucent);
		translucent.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
			var cnt = LGlobal.stage.numChildren;
			if(e.target.constructor.name == "LListView"){
				return;
			}
			var destroy = LGlobal.destroy;
			LGlobal.destroy = false;
			LGlobal.stage.removeChildAt(cnt - 1);
			LGlobal.destroy = destroy;
			LGlobal.stage.removeChildAt(cnt - 2);
		});
		translucent.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {});
		translucent.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {});
		translucent.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {});
		translucent.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {});
		
		var coordinate = s.getRootCoordinate();
		s.listView.x = coordinate.x;
		s.listView.y = coordinate.y + s.layer.getHeight();
		LGlobal.stage.addChild(s.listView);
		if(typeof s.listView._ll_saveY != UNDEFINED){
			s.listView.clipping.y = s.listView._ll_saveY;
		}
		var list = [];
		for (i = 0, l = s.list.length; i < l; i++) {
			var selected = s.value === s.list[i].value;
			child = new s.listChildView(s.list[i], s, selected);
			if(selected){
				s.listView._ll_selectedChild = child;
			}
			list.push(child);
		}
		s.listView.resize(s.listView.cellWidth, s.listView.cellHeight * (s.list.length > s.maxIndex ? s.maxIndex : s.list.length));
		s.listView.updateList(list);
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
var LComboBoxChild = (function () {
	function LComboBoxChild(content, comboBox, selected){
		var self = this;
		base(self,LListChildView,[]);
		self.content = content;
		self.comboBox = comboBox;
		if(selected){
			self.setSelectStatus(content, comboBox);
		}else{
			self.setStatus(content, comboBox);
		}
	}
	LComboBoxChild.prototype.setStatus = function(content, comboBox){
		var self = this;
		var listView = comboBox.listView;
		self.graphics.drawRect(0,"#f5f5f9", [0, 0, listView.cellWidth, listView.cellHeight], true, "#f5f5f9");
		var text = new LTextField();
		text.size = comboBox.size;
		text.color = comboBox.color;
		text.font = comboBox.font;
		text.text = content.label;
		text.x = text.y = 5;
		self.addChild(text);
		self.updateView();
	};
	LComboBoxChild.prototype.setSelectStatus = function(content, comboBox){
		var self = this;
		var listView = comboBox.listView;
		self.graphics.clear();
		self.graphics.drawRect(0,"#CCCCCC", [0, 0, listView.cellWidth, listView.cellHeight], true, "#CCCCCC");
		var text = new LTextField();
		text.size = comboBox.size;
		text.color = comboBox.color;
		text.font = comboBox.font;
		text.text = content.label;
		text.x = text.y = 5;
		self.addChild(text);
		self.updateView();
	};
	LComboBoxChild.prototype.onTouch = function(event){
		var self = event.target;
		var listView = event.currentTarget;
		if(listView._ll_selectedChild){
			listView._ll_selectedChild.removeAllChild();
			listView._ll_selectedChild.cacheAsBitmap(false);
			listView._ll_selectedChild.setStatus(listView._ll_selectedChild.content, listView._ll_selectedChild.comboBox);
		}
		self.removeAllChild();
		self.cacheAsBitmap(false);
		self.setSelectStatus(self.content, self.comboBox);
		listView._ll_selectedChild = self;
	};
	LComboBoxChild.prototype.onClick = function(event){
		var self = event.target;
		var listView = event.currentTarget, i, v;
		var comboBox = self.comboBox;
		var listViewIndex;
		comboBox.setValue(self.content.value);
		for(var i=LGlobal.stage.numChildren-1;i>=0;i--){
			if(LGlobal.stage.childList[i].constructor.name == "LListViewDragObject"){
				LGlobal.stage.removeChildAt(i);
				LGlobal.listViewDragObject = null;
				continue;
			}
			if(LGlobal.stage.childList[i].objectIndex != listView.objectIndex){
				continue;
			}
			var destroy = LGlobal.destroy;
			LGlobal.destroy = false;
			LGlobal.stage.removeChildAt(i);
			LGlobal.destroy = destroy;
			LGlobal.stage.removeChildAt(i - 1);
			listView._ll_saveY = listView.clipping.y;
			break;
		}
	};
	return LComboBoxChild;
})();