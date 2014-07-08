/** @language chinese
 * 可使用 DropShadowFilter 类向显示对象添加投影。阴影算法基于模糊滤镜使用的同一个框型滤镜。投影样式有多个选项，包括内侧或外侧阴影和挖空模式。您可以将滤镜应用于任何显示对象（即，从 DisplayObject 类继承的对象）。
 * @class LDropShadowFilter
 * @extends LObject
 * @constructor
 * @param {int} distance 阴影的偏移距离，以像素为单位。
 * @param {int} angle 阴影的角度。
 * @param {int} color 阴影的颜色。
 * @param {int} blur 模糊量。
 * @example
 * 	var bitmapdata = new LBitmapData(event.target);  
 * 	var bitmap = new LBitmap(bitmapdata);
 * 	addChild(bitmap);
 * 	var shadow = new LDropShadowFilter(5,45,"#000000");
 * 	bitmap.filters = [shadow];
 * @examplelink <p><a href="../../../api/LDropShadowFilter/index.html" target="_blank">测试链接</a></p>
 * @since 1.6.0
 * @public
 */
/** @language english
 * The DropShadowFilter class lets you add a drop shadow to display objects. The shadow algorithm is based on the same box filter that the blur filter uses. You have several options for the style of the drop shadow, including inner or outer shadow and knockout mode. You can apply the filter to any display object (that is, objects that inherit from the DisplayObject class).
 * @class LDropShadowFilter
 * @extends LObject
 * @constructor
 * @param {int} distance The offset distance for the shadow, in pixels.
 * @param {int} angle The angle of the shadow.
 * @param {int} color The color of the shadow.
 * @param {int} blur The amount of blur.
 * @example
 * 	var bitmapdata = new LBitmapData(event.target);  
 * 	var bitmap = new LBitmap(bitmapdata);
 * 	addChild(bitmap);
 * 	var shadow = new LDropShadowFilter(5,45,"#000000");
 * 	bitmap.filters = [shadow];
 * @examplelink <p><a href="../../../api/LDropShadowFilter/index.html" target="_blank">Try it »</a></p>
 * @since 1.6.0
 * @public
 */
/** @language japanese
 * DropShadowFilter クラスは、ドロップシャドウを表示オブジェクトに追加します。シャドウアルゴリズムは、ぼかしフィルターで使用するのと同じボックスフィルターに基づいています。ドロップシャドウのスタイルには複数のオプションがあり、内側シャドウ、外側シャドウ、ノックアウトモードなどがあります。。
 * @class LDropShadowFilter
 * @extends LObject
 * @constructor
 * @param {int} distance シャドウのオフセット距離（ピクセル単位）です。
 * @param {int} angle シャドウの角度です。
 * @param {int} color シャドウのカラーです。
 * @param {int} blur ぼかし量。
 * @example
 * 	var bitmapdata = new LBitmapData(event.target);  
 * 	var bitmap = new LBitmap(bitmapdata);
 * 	addChild(bitmap);
 * 	var shadow = new LDropShadowFilter(5,45,"#000000");
 * 	bitmap.filters = [shadow];
 * @examplelink <p><a href="../../../api/LDropShadowFilter/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.6.0
 * @public
 */
var LDropShadowFilter = (function () {
	function LDropShadowFilter (distance, angle, color, blur) {
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LDropShadowFilter";
		s.distance = distance ? distance : 0;
		s.angle = angle ? angle : 0;
		s.shadowColor = color ? color : "#000000";
		s.shadowBlur = blur ? blur : 20;
		s.setShadowOffset();
	}
	var p = {
		setShadowOffset : function () {
			var s = this;
			var a = s.angle * Math.PI / 180;
			s.shadowOffsetX = s.distance * Math.cos(a);
			s.shadowOffsetY = s.distance * Math.sin(a);
		},
		ll_show : function () {
			var s = this, c = LGlobal.canvas;
			c.shadowColor = s.shadowColor;
			c.shadowBlur = s.shadowBlur;
			c.shadowOffsetX = s.shadowOffsetX;
			c.shadowOffsetY = s.shadowOffsetY;
		},
		/** @language chinese
		 * 设定阴影的偏移距离
		 * @method setDistance
		 * @param {int} distance 阴影的偏移距离。
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Set the offset distance for the shadow.
		 * @method setDistance
		 * @param {int} distance the offset distance for the shadow.
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * シャドウのオフセット距離を設定する
		 * @method setDistance
		 * @param {int} distance シャドウのオフセット距離（ピクセル単位）です。
		 * @since 1.6.0
		 * @public
		 */
		setDistance : function (distance) {
			this.distance = distance;
			this.setShadowOffset();
		},
		/** @language chinese
		 * 设定阴影的角度
		 * @method setAngle
		 * @param {int} angle 阴影的角度。
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Set the angle of the shadow.
		 * @method setAngle
		 * @param {int} angle the angle of the shadow.
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * シャドウの角度を設定する
		 * @method setAngle
		 * @param {int} angle シャドウの角度です。
		 * @since 1.6.0
		 * @public
		 */
		setAngle : function (angle) {
			this.angle = angle;
			this.setShadowOffset();
		},
		/** @language chinese
		 * 设定阴影的颜色
		 * @method setColor
		 * @param {int} color 阴影的颜色。
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Set the color of the shadow.
		 * @method setColor
		 * @param {int} color the color of the shadow.
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * シシャドウのカラーを設定する
		 * @method setColor
		 * @param {int} color シャドウのカラーです。
		 * @since 1.6.0
		 * @public
		 */
		setColor : function (color) {
			this.shadowColor = color;
		},
		/** @language chinese
		 * 设定模糊量
		 * @method setBlur
		 * @param {int} blur 模糊量。
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Set the amount of blur.
		 * @method setBlur
		 * @param {int} blur the amount of blur。
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * ぼかし量を設定する
		 * @method setBlur
		 * @param {int} blur ぼかし量です。
		 * @since 1.6.0
		 * @public
		 */
		setBlur : function (blur) {
			this.shadowBlur = blur;
		}
	};
	for (var k in p) {
		LDropShadowFilter.prototype[k] = p[k];
	}
	return LDropShadowFilter;
})();