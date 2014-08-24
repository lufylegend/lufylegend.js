
/** @language chinese
 * <p>lufylegend.js专用UI，多选按钮。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LCheckBox
 * @constructor
 * @extends LSprite
 * @param {LDisplayObject} layer [可选]多选按钮的未选中状态样式。
 * @param {LDisplayObject} layerSelect [可选]多选按钮的选中状态样式。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LCheckBox.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, checkbox button
 * @class UI:LCheckBox
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LCheckBox.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、チェックボックス
 * @class UI:LCheckBox
 * @constructor
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LCheckBox.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LCheckBox = (function () {
	function LCheckBox (layer, layerSelect) {
		var s = this, grd;
		LExtends(s, LSprite, []);
		s.type = "LCheckBox";
		if (!layer) {
			grd = LGlobal.canvas.createLinearGradient(0, -20, 0, 40);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#CCCCCC");
			layer = new LSprite();
			layer.graphics.drawRoundRect(1, "#CCCCCC", [0, 0, 20, 20, 4], true, grd);
		} else {
			layer = layer.clone();
		}
		if (!layerSelect) {
			grd = LGlobal.canvas.createLinearGradient(0, -20, 0, 20);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#008000");
			layerSelect = new LSprite();
			layerSelect.graphics.drawLine(5, grd, [4, 10, 12, 16]);
			layerSelect.graphics.drawLine(5, grd, [10, 16, 16, 4]);
		} else {
			layerSelect = layerSelect.clone();
		}
		s.layer = layer;
		s.layerSelect = layerSelect;
		s.addChild(s.layer);
		s.addChild(s.layerSelect);
		/** @language chinese
		 * 按钮的是否选中
		 * @property checked
		 * @type Boolean
		 * @since 0.1.0
		 * @public
		 */
		/** @language english
		 * The button is selected
		 * @property checked
		 * @type Boolean
		 * @since 0.1.0
		 * @public
		 */
		/** @language japanese
		 * ボタンの選択する状態
		 * @property checked
		 * @type Boolean
		 * @since 0.1.0
		 * @public
		 */
		s.layerSelect.visible = s.checked = false;
		s.addEventListener(LMouseEvent.MOUSE_UP, s._onChange);
	}
	LCheckBox.prototype._onChange = function (e) {
		var s = e.clickTarget;
		s.checked = !s.checked;
		s.layerSelect.visible = s.checked;
	};
	/** @language chinese
	 * 设置按钮选中状态。
	 * @method setChecked
	 * @param {String} value 按钮选中状态。
	 * @since 0.1.0
	 * @public
	 */
	/** @language english
	 * Set the button's state.
	 * @method setChecked
	 * @param {String} value state。
	 * @since 0.1.0
	 * @public
	 */
	/** @language japanese
	 * ボタンの選択状態を設定する。
	 * @method setChecked
	 * @param {String} value ボタンの選択状態。
	 * @since 0.1.0
	 * @public
	 */
	LCheckBox.prototype.setChecked = function (value) {
		var s = this;
		s.checked = value;
		s.layerSelect.visible = s.checked;
	};
	LCheckBox.prototype.clone = function () {
		var s = this, a = new LCheckBox(s.layer.clone(), s.layerSelect.clone());
		a.setChecked(s.checked);
		return a;
	};
	return LCheckBox;
})();