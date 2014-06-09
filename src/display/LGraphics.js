/** @language chinese
 * LGraphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 LSprite 和 LShape 对象。这些类中的每一个类都包括 graphics 属性，该属性是一个 LGraphics 对象。
 * 以下是为便于使用而提供的一些辅助函数：drawRect()、drawRoundRect()、drawArc() 和 drawEllipse()。
 * @class LGraphics
 * @extends LObject
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var shape = new LShape();
 * 		addChild(shape);
 * 		shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
 * 	}
 * @examplelink <p><a href="../../../api/LGraphics/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * The LGraphics class contains a set of methods that you can use to create a vector shape. Display objects that support drawing include LSprite and LShape objects. Each of these classes includes a graphics property that is a LGraphics object. 
 * The following are among those helper functions provided for ease of use: drawRect(), drawRoundRect(), drawArc(), and drawEllipse().
 * @class LGraphics
 * @extends LObject
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var shape = new LShape();
 * 		addChild(shape);
 * 		shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
 * 	}
 * @examplelink <p><a href="../../../api/LGraphics/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * LGraphics クラスには、ベクターシェイプの作成に使用できる一連のメソッドがあります。描画をサポートする表示オブジェクトには、LSprite および LShape オブジェクトがあります。これらの各クラスには、LGraphics オブジェクトである graphics プロパティがあります。
 * 以下は、簡単に使用できるように用意されているヘルパー関数の一例です。drawRect()、drawRoundRect()、drawArc()、および drawEllipse()。
 * @class LGraphics
 * @extends LObject
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var shape = new LShape();
 * 		addChild(shape);
 * 		shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
 * 	}
 * @examplelink <p><a href="../../../api/LGraphics/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LGraphics = (function () {
	function LGraphics(){
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LGraphics";
		s.color = "#000000";
		s.alpha = 1;
		s.bitmap = null;
		s.setList = new Array();
		s.showList = new Array();
	}
	var p = {
		ll_show : function () {
			var s = this, k, l = s.setList.length;
			if (l == 0) {
				return;
			}
			for (k = 0; k < l; k++) {
				s.setList[k]();
			}
		},
		clone : function () {
			var s = this, a = new LGraphics(), i, l, c;
			a.color = s.color;
			a.alpha = s.alpha;
			a.bitmap = s.bitmap;
			for (i = 0, l = s.setList.length; i < l; i++) {
				c = s.setList[i];
				a.setList.push(c);
			}
			for (i = 0, l = s.showList.length; i < l; i++) {
				c = s.showList[i];
				a.showList.push(c);
			}
			return a;
		},
		/** @language chinese
		 * 定线段如何结束。只有绘制较宽线段时，它才有效。
		 * @method lineCap
		 * @param {String} value 可以使用下面三个值butt, round, square。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineCap("butt");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,20);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("round");
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("square");
		 * 	shape.graphics.moveTo(20,60);
		 * 	shape.graphics.lineTo(200,60);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineCap.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Sets or returns the style of the end caps for a line
		 * @method lineCap
		 * @param {String} value The value "round" and "square" make the lines slightly longer.
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineCap("butt");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,20);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("round");
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("square");
		 * 	shape.graphics.moveTo(20,60);
		 * 	shape.graphics.lineTo(200,60);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineCap.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * ユーザーエージェントが線の端に置く終端のタイプを定義します。
		 * @method lineCap
		 * @param {String} value butt, round, square の 3 つの値が妥当な値として利用可能です。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineCap("butt");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,20);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("round");
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("square");
		 * 	shape.graphics.moveTo(20,60);
		 * 	shape.graphics.lineTo(200,60);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineCap.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		lineCap : function (t) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineCap = t;
			});
		},
		/** @language chinese
		 * 当一个路径包含了线段或曲线相交的交点的时候，lineJoin 属性说明如何绘制这些交点。只有当绘制具有宽度的线条的时候，这一属性的效果才能表现出来。
		 * @method lineJoin
		 * @param {String} value 可以使用下面三个值bevel, round, miter。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(100,50);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineJoin.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * The lineJoin property sets or returns the type of corner created, when two lines meet.
		 * @method lineJoin
		 * @param {String} value bevel|round|miter.
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(100,50);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineJoin.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * ユーザーエージェントが 2 直線の接続する角をどう扱うかを考慮するタイプを定義します。
		 * @method lineJoin
		 * @param {String} value bevel, round, miter の3タイプの値をセットすることができます。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(100,50);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineJoin.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		lineJoin : function (t) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineJoin = t;
			});
		},
		/** @language chinese
		 * 指定线条的宽度。
		 * @method lineWidth
		 * @param {float} value 线条的宽度。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(2);
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,50);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineWidth.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Sets or returns the current line width
		 * @method lineWidth
		 * @param {String} value the current line width.
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(2);
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,50);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineWidth.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 座標系の単位で、線の幅を与えます。
		 * @method lineWidth
		 * @param {float} value 線の幅。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(2);
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,50);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineWidth.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		lineWidth : function (t) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineWidth = t;
			});
		},
		/** @language chinese
		 * 指定了用于画笔（绘制）路径的颜色、模式和渐变。这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。
		 * @method strokeStyle
		 * @param {String} value 可以使用下面三个值color|gradient|pattern。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Sets or returns the color, gradient, or pattern used for strokes.
		 * @method strokeStyle
		 * @param {String} value color|gradient|pattern.
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 形状の輪郭に使う色やスタイルを表します。
		 * @method strokeStyle
		 * @param {String} value color|gradient|pattern。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		strokeStyle : function (co) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.strokeStyle = co;
			});
		},
		/** @language chinese
		 * 沿着当前路径绘制或画一条直线。
		 * @method stroke
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Actually draws the path you have defined
		 * @method stroke
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 現在のストローク・スタイルを使って、サブパスに線を引きます。
		 * @method stroke
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		stroke : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.stroke();
			});
		},
		beginPath : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.beginPath();
			});
		},
		closePath : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.closePath();
			});
		},
		moveTo : function (x, y) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.moveTo(x, y);
			});
		},
		lineTo : function (x, y) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineTo(x, y);
			});
		},
		clear : function () {
			var s = this;
			s.bitmap = null;
			s.setList.length = 0;
			s.showList.length = 0;
		},
		rect : function (x, y, w, h) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.rect(x, y, w, h);
			});
			s.showList.push({type : LShape.RECT, arg : [x, y, w, h]});
		},
		fillStyle : function (co) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.fillStyle = co;
			});
		},
		fill : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.fill();
			});
		},
		arc : function (x, y, r, sa, ea, aw) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.arc(x, y, r, sa, ea, aw);
			});
			s.showList.push({type : LShape.ARC, arg : sa});
		},
		beginBitmapFill : function (b) {
			var s = this;
			s.setList.push(function () {
				s.bitmap = b;
			});
		},
		drawEllipse : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c, x, y, w, h, k, ox, oy, xe, ye, xm, ym;
				c = LGlobal.canvas;
				c.beginPath();
				k = 0.5522848;
				x = pa[0];
				y = pa[1];
				w = pa[2];
				h = pa[3];
				ox = (w / 2) * k;
				oy = (h / 2) * k;
				xe = x + w;
				ye = y + h;
				xm = x + w / 2;
				ym = y + h / 2;
				c.moveTo(x, ym);
				c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
				c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
				c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
				c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawArc : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				if (pa.length > 6 && pa[6]) {
					c.moveTo(pa[0], pa[1]);
				}
				c.arc(pa[0], pa[1], pa[2], pa[3], pa[4], pa[5]);
				if (pa.length > 6 && pa[6]) {
					c.lineTo(pa[0], pa[1]);
				}
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.ARC, arg : pa});
		},
		drawRect : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.rect(pa[0], pa[1], pa[2], pa[3]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawRoundRect : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.moveTo(pa[0] + pa[4], pa[1]);
				c.lineTo(pa[0] + pa[2] - pa[4], pa[1]);
				c.arcTo(pa[0] + pa[2], pa[1], pa[0] + pa[2], pa[1] + pa[4], pa[4]);
				c.lineTo(pa[0] + pa[2], pa[1] + pa[3] - pa[4]);
				c.arcTo(pa[0] + pa[2], pa[1] + pa[3], pa[0] + pa[2] - pa[4], pa[1] + pa[3], pa[4]);
				c.lineTo(pa[0] + pa[4], pa[1] + pa[3]);
				c.arcTo(pa[0], pa[1] + pa[3], pa[0], pa[1] + pa[3] - pa[4], pa[4]);
				c.lineTo(pa[0], pa[1] + pa[4]);
				c.arcTo(pa[0], pa[1], pa[0] + pa[4], pa[1], pa[4]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							0, 0,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawVertices : function (tn, lco, v, isf, co) {
			var s = this;
			if (v.length < 3) {
				return;
			}
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.moveTo(v[0][0], v[0][1]);
				var i, l = v.length, pa;
				for (i = 1; i < l; i++) {
					pa = v[i];
					c.lineTo(pa[0], pa[1]);
				}
				c.lineTo(v[0][0], v[0][1]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.closePath();
					c.stroke();
				}
			});
			s.showList.push({type : LShape.VERTICES, arg : v});
		},
		drawTriangles : function (ve, ind, u, tn, lco) {
			var s = this;
			var i, j, l = ind.length, c;
			s.setList.push(function () {
				c = LGlobal.canvas;
				var v = ve, a, k, sw;
				for (i = 0, j = 0; i < l; i += 3) {
					a = 0;
					c.save();
					c.beginPath();
					c.moveTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.lineTo(v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
					c.lineTo(v[ind[i + 2] * 2], v[ind[i + 2] * 2 + 1]);
					c.lineTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.closePath();
					if (tn) {
						c.lineWidth = tn;
						c.strokeStyle = lco;
						c.stroke();
					}
					c.clip();
					if (i % 6 == 0) {
						sw = -1;
						var w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						}
						if (i + j >= l) {
							w = (u[ind[i + j - l] * 2] - u[ind[i + 1] * 2]) * s.bitmap.width;
							sw = u[ind[i] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 1] * 2] - v[ind[i] * 2]) / w;
						var t2 = (v[ind[i + 1] * 2 + 1] - v[ind[i] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i] * 2], v[ind[i] * 2 + 1]);
						c.drawImage(s.bitmap.image,
									s.bitmap.x + sw,
									s.bitmap.y + sh,
									w, h,
									0, 0,
									w, h);
					} else {
						var w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						}
						if (i + 1 + j >= l) {
							w = (u[ind[i + 1 + j - l] * 2] - u[ind[i + 2] * 2]) * s.bitmap.width;
							sw = u[ind[i + 1] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i + 1] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + 1 + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 2] * 2] - v[ind[i + 1] * 2]) / w;
						var t2 = (v[ind[i + 2] * 2 + 1] - v[ind[i + 1] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
						c.drawImage(s.bitmap.image,
								s.bitmap.x + sw,
								s.bitmap.y + sh,
								w, h,
								0, -h,
								w, h);
					}
					c.restore();
				}
			});
		},
		drawLine : function (tn, lco, pa) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.moveTo(pa[0], pa[1]);
				c.lineTo(pa[2], pa[3]);
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			});
		},
		lineStyle : function (tn, co) {
			var s = this, c;
			if (co == null) {
				co = s.color;
			}
			s.color = co;
			s.setList.push(function () {
				c = LGlobal.canvas;
				c.lineWidth = tn;
				c.strokeStyle = co;
			});
		},
		add : function (f) {
			this.setList.push(f);
		},
		ismouseon : function (e, co) {
			var s = this;
			if (e == null || e == UNDEFINED || s.showList.length == 0 || !s.parent) {
				return false;
			}
			return s.parent.ismouseonShapes(s.showList, e.offsetX, e.offsetY);
		},
		getWidth : function () {
			var s = this, k = null, k1 = null, min = 0, max = 0, v, l, l1;
			for (k = 0, l = s.showList; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[0]) {
						min = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2]) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[0] - s.showList[k].arg[2]) {
						min = s.showList[k].arg[0] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2]) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[0]) {
							min = v[0];
						}
						if (max < v[0]) {
							max = v[0];
						}
					}
				}
			}
			s.left = min;
			return max - min;
		},
		getHeight : function () {
			var s = this, k = null, k1 = null, l, l1, min = 0, max = 0, v;
			for (k = 0, l = s.showList; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[1]) {
						min = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[3]) {
						max = s.showList[k].arg[1] + s.showList[k].arg[3];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[1] - s.showList[k].arg[2]) {
						min = s.showList[k].arg[1] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[2]) {
						max = s.showList[k].arg[1] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[1]) {
							min = v[1];
						}
						if (max < v[1]) {
							max = v[1];
						}
					}
				}
			}	
			s.top = min;	
			return max - min;
		},
		startX : function () {
			var s = this;
			s.getWidth();
			return s.left;
		},
		startY : function () {
			var s = this;
			s.getHeight();
			return s.top;
		}
	};
	for (var k in p) {
		LGraphics.prototype[k] = p[k];
	}
	return LGraphics;
})();