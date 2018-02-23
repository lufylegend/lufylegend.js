/** @language chinese
 * <p>lufylegend.js专用UI，单选按钮的子元素。</p>
 * <p>需要和<a href="UI:LRadio.html">LRadio</a>一起使用。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LRadioChild
 * @constructor
 * @extends LSprite
 * @param {float|String} value 单选按钮的子元素的值。
 * @param {LDisplayObject} layer [可选]单选按钮的子元素的未选中状态。
 * @param {LDisplayObject} layerSelect [可选]单选按钮的子元素的选中状态。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Radio button's child
 * @class UI:LRadioChild
 * @constructor
 * @extends LSprite
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、ラジオボタンの子供オブジェクト
 * @class UI:LRadioChild
 * @constructor
 * @extends LSprite
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LRadioChild = (function () {
	function LRadioChild (value, layer, layerSelect) {
		var s = this, grd;
		LExtends(s, LSprite, []);
		s.type = "LRadioChild";
		s.value = value;
		
		if (!layer) {
			grd = LGlobal.canvas.createLinearGradient(0, -20, 0, 40);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#CCCCCC");
			layer = new LSprite();
			layer.graphics.drawArc(1, "#CCCCCC", [0, 0, 10, 0, 2 * Math.PI], true, grd);
		} else {
			layer = layer.clone();
		}
		if (!layerSelect) {
			grd = LGlobal.canvas.createLinearGradient(0, -20, 0, 20);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#008000");
			layerSelect = new LSprite();
			layerSelect.graphics.drawArc(1, grd, [0, 0, 5, 0, 2 * Math.PI], true, grd);
		} else {
			layerSelect = layerSelect.clone();
		}
		s.layer = layer;
		s.layerSelect = layerSelect;
		s.addChild(s.layer);
		s.addChild(s.layerSelect);
		s.layerSelect.visible = false;
		s.checked = false;
		s.addEventListener(LMouseEvent.MOUSE_UP, s._onChange);
	}
	LRadioChild.prototype.clone = function () {
		var s = this,
		a = new LRadioChild(s.value, s.layer, s.layerSelect);
		a.copyProperty(s);
		return a;
	};
	LRadioChild.prototype._onChange = function (e) {
		var s = e.clickTarget;
		s.parent.setValue(s.value);
	};
	LRadioChild.prototype.setChecked = function (v) {
		this.layerSelect.visible = this.checked = v;
	};
	return LRadioChild;
})();
/** @language chinese
 * <p>lufylegend.js专用UI，单选按钮</p>
 * <p>需要和<a href="UI:LRadioChild.html">LRadioChild</a>一起使用。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LRadio
 * @constructor
 * @extends LSprite
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Radio button
 * @class UI:LRadio
 * @constructor
 * @extends LSprite
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、ラジオボタン
 * @class UI:LRadio
 * @constructor
 * @extends LSprite
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LRadio = (function () {
	function LRadio () {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LRadio";
		/** @language chinese
		 * [只读]单选按钮的值
		 * @property value
		 * @type float|String
		 * @since 0.1.0
		 * @public
		 */
		s.value = null;
	}
	/** @language chinese
	 * 单选按钮的值改变时调用此事件。
	 * @event LRadio.ON_CHANGE
	 * @since 0.1.1
	*/
	/** @language english
	 * onchange event。
	 * @event LRadio.ON_CHANGE
	 * @since 0.1.1
	 */
	/** @language japanese
	 * onchangeイベント。
	 * @event LRadio.ON_CHANGE
	 * @since 0.1.1
	 */
	LRadio.ON_CHANGE = "onchange";
	/** @language chinese
	 * 添加单选按钮子元素。
	 * @method setChildRadio
	 * @param {float|String} value 单选按钮的子元素的值。
	 * @param {float} x 单选按钮子元素的x坐标。
	 * @param {float} y 单选按钮子元素的y坐标。
	 * @param {LDisplayObject} layer [可选]单选按钮的子元素的未选中状态。
	 * @param {LDisplayObject} layerSelect [可选]单选按钮的子元素的选中状态。
	 * @return {LRadioChild} 所添加的单选按钮子元素。
	 * @since 0.1.0
	 * @public
	 */
	LRadio.prototype.setChildRadio = function (value, x, y, layer, layerSelect) {
		var s = this;
		var child = new LRadioChild(value, layer, layerSelect);
		child.x = x;
		child.y = y;
		s.addChild(child);
		return child;
	};
	/** @language chinese
	 * 添加单选按钮子元素。
	 * @method push
	 * @param {LRadioChild} value 所添加的单选按钮子元素。
	 * @since 0.1.0
	 * @public
	 */
	LRadio.prototype.push = function (value) {
		this.addChild(value);
	};
	/** @language chinese
	 * 设定单选按钮的选中状态(值)。
	 * @method setValue
	 * @param {float|String} value 单选按钮的值。
	 * @since 0.1.0
	 * @public
	 */
	LRadio.prototype.setValue = function (value) {
		var s = this, child, k;
		var saveValue = s.value;
		for (k in s.childList) {
			child = s.childList[k];
		    if (child.setChecked) {
		     	child.setChecked(false);
			}
			if (child.value == value) {
				s.value = value;
				child.setChecked(true);
			}
		}
		if(saveValue != s.value){
			s.dispatchEvent(LRadio.ON_CHANGE);
		}
	};
	LRadio.prototype.clone = function () {
		var s = this, a = new LRadio(), child, k;
	    for (k in s.childList) {
	    	child = s.childList[k].clone();
	    	a.push(child);
	    }
		a.setValue(s.value);
		return a;
	};
	return LRadio;
})();