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
		/** @language chinese
		 * 开始一个画布中的一条新路径（或者子路径的一个集合）。
		 * @method beginPath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.moveTo(0,75);
		 * 	shape.graphics.lineTo(250,75);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.strokeStyle("#00FF00");
		 * 	shape.graphics.moveTo(50,0);
		 * 	shape.graphics.lineTo(150,130);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/beginPath.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Begins a path, or resets the current path
		 * @method beginPath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.moveTo(0,75);
		 * 	shape.graphics.lineTo(250,75);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.strokeStyle("#00FF00");
		 * 	shape.graphics.moveTo(50,0);
		 * 	shape.graphics.lineTo(150,130);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/beginPath.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * サブパスのリストを空にして、コンテキストのサブパスが 0 個となるようにしなければいけません。
		 * @method beginPath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.moveTo(0,75);
		 * 	shape.graphics.lineTo(250,75);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.strokeStyle("#00FF00");
		 * 	shape.graphics.moveTo(50,0);
		 * 	shape.graphics.lineTo(150,130);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/beginPath.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		beginPath : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.beginPath();
			});
		},
		/** @language chinese
		 * 如果画布的子路径是打开的，closePath() 通过添加一条线条连接当前点和子路径起始点来关闭它。如果子路径已经闭合了，这个方法不做任何事情。
		 * @method closePath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.closePath();
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/closePath.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Creates a path from the current point back to the starting point
		 * @method closePath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.closePath();
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/closePath.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * コンテキストにサブパスがなければ何もしてはいけません。コンテキストにサブパスがあれば、最後のサブパスに、閉じられたことが記録され、前のサブパスの始点と同じ地点を始点とする新たなサブパスを生成し、最後に、そのパスに、この新たなサブパスを追加しなければいけません。
		 * @method closePath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.closePath();
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/closePath.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		closePath : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.closePath();
			});
		},
		/** @language chinese
		 * 设置当前位置并开始一条新的子路径。
		 * @method moveTo
		 * @param {float} x 新的当前点的坐标x。
		 * @param {float} y 新的当前点的坐标y。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Moves the path to the specified point in the canvas, without creating a line
		 * @method moveTo
		 * @param {float} x The x-coordinate of where to move the path to
		 * @param {float} y The x-coordinate of where to move the path to
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 指定の地点で新規のサブパスを生成します。
		 * @method moveTo
		 * @param {float} x 指定の地点の座標x
		 * @param {float} y 指定の地点の座標y
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		moveTo : function (x, y) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.moveTo(x, y);
			});
		},
		/** @language chinese
		 * 为当前的子路径添加一条直线线段。
		 * @method lineTo
		 * @param {float} x 直线的终点的坐标x。
		 * @param {float} y 直线的终点的坐标y。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Adds a new point and creates a line from that point to the last specified point in the canvas
		 * @method lineTo
		 * @param {float} x The x-coordinate of where to create the line to
		 * @param {float} y The y-coordinate of where to create the line to
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 現在のパスに指定の地点を加え、直前の地点を直線で接続します。
		 * @method lineTo
		 * @param {float} x 指定の地点の座標x
		 * @param {float} y 指定の地点の座標y
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		lineTo : function (x, y) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineTo(x, y);
			});
		},
		/** @language chinese
		 * 为当前路径添加一条矩形子路径。
		 * @method rect
		 * @param {float} x 矩形的左上角的坐标x。
		 * @param {float} y 矩形的左上角的坐标y。
		 * @param {float} width 矩形的宽。
		 * @param {float} height 矩形的高。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/rect.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Creates a rectangle
		 * @method rect
		 * @param {float} x The x-coordinate of the upper-left corner of the rectangle
		 * @param {float} y The y-coordinate of the upper-left corner of the rectangle
		 * @param {float} width The width of the rectangle, in pixels
		 * @param {float} height The height of the rectangle, in pixels
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/rect.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * パスに、指定の矩形を表す閉じたサブパスを新規に追加します。
		 * @method rect
		 * @param {float} x 矩形の左上の座標x
		 * @param {float} y 矩形の左上の座標y
		 * @param {float} width 矩形の横幅
		 * @param {float} height 矩形の縦幅
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/rect.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		rect : function (x, y, w, h) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.rect(x, y, w, h);
			});
			s.showList.push({type : LShape.RECT, arg : [x, y, w, h]});
		},
		/** @language chinese
		 * 用来填充路径的当前的颜色、模式或渐变。
		 * @method fillStyle
		 * @param {String} style 这个属性可以设置为一个字符串或者一个 CanvasGradient 对象 或 CanvasPattern 对象。当设置为一个字符串时，它被解析为一个 CSS 颜色值并且用来进行实心填充。当设置为一个 CanvasGradient 或 CanvasPattern 对象，通过使用指定的渐变或模式来完成填充。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Sets or returns the color, gradient, or pattern used to fill the drawing
		 * @method fillStyle
		 * @param {String} style color|gradient|pattern
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 値をセットして、塗りつぶしスタイルを変更することができます。
		 * @method fillStyle
		 * @param {String} style CSSカラーを含んだ文字列か、または、CanvasGradient や CanvasPattern オブジェクトを指定することができます。不正な値は無視されます。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		fillStyle : function (co) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.fillStyle = co;
			});
		},
		/** @language chinese
		 * 使用指定颜色、渐变或模式来绘制或填充当前路径的内部。
		 * @method fill
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Fills the current drawing (path)
		 * @method fill
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 現在の塗りつぶしスタイルで、サブパスを塗りつぶします。
		 * @method fill
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		fill : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.fill();
			});
		},
		/** @language chinese
		 * 用一个中心点和半径，为一个画布的当前子路径添加一条弧线。
		 * @method arc
		 * @param {float} x 描述弧的圆形的圆心的坐标x。
		 * @param {float} y 描述弧的圆形的圆心的坐标y。
		 * @param {float} radius 描述弧的圆形的半径。
		 * @param {float} startAngle 沿着圆指定弧的开始点点的一个角度。这个角度用弧度来衡量。
		 * @param {float} endAngle 沿着圆指定弧的结束点的一个角度。这个角度用弧度来衡量。
		 * @param {Boolean} counterclockwise 弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/arc.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Creates an arc/curve (used to create circles, or parts of circles)
		 * @method arc
		 * @param {float} x The x-coordinate of the center of the circle
		 * @param {float} y The y-coordinate of the center of the circle
		 * @param {float} radius The radius of the circle
		 * @param {float} startAngle The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
		 * @param {float} endAngle The ending angle, in radians
		 * @param {Boolean} counterclockwise Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/arc.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * サブパスにいくつかの地点を追加します。それらの地点は、引数によって描かれる円周によって描かれる円弧が、指定の開始角度ではじまり、指定の終了角度で終わり、指定の方向に行き、パスに加えられます。そして、直線で直前の地点に接続されます。
		 * @method arc
		 * @param {float} x 中心の座標x。
		 * @param {float} y 中心の座標y。
		 * @param {float} radius 半径。
		 * @param {float} startAngle 沿円周に沿って、x 軸の正方向から時計回りにラジアンで計測した開始地点
		 * @param {float} endAngle 沿円周に沿って、x 軸の正方向から時計回りにラジアンで計測した終了地点
		 * @param {Boolean} counterclockwise 引数が true なら反時計回りとなり、そうでなければ時計回りとなります。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/arc.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		arc : function (x, y, r, sa, ea, aw) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.arc(x, y, r, sa, ea, aw);
			});
			s.showList.push({type : LShape.ARC, arg : sa});
		},
		/** @language chinese
		 * 设置线条属性。
		 * @method lineStyle
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.lineStyle(5,"#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineStyle.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Sets the style of line
		 * @method lineStyle
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.lineStyle(5,"#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineStyle.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 線のスタイルを設定する。
		 * @method lineStyle
		 * @param {int} thickness 線の太さをポイント単位で示す整数。
		 * @param {String} color 線の色
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.lineStyle(5,"#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineStyle.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 删除所有矢量形状。
		 * @method rect
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.clear();
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/clear.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Clear all the vector shapes.
		 * @method clear
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.clear();
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/clear.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 全部のベクターシェイプをクリアする。
		 * @method clear
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.clear();
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/clear.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		clear : function () {
			var s = this;
			s.bitmap = null;
			s.setList.length = 0;
			s.showList.length = 0;
		},
		/** @language chinese
		 * 用位图图像填充绘图区。
		 * @method beginBitmapFill
		 * @param {LBitmapData} bitmap 包含要显示的位的透明或不透明位图图像。
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 		var backLayer;
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawArc(1,"#000000",[150,50,50,0,Math.PI*2]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawRect(1,"#000000",[10,100,70,100]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawVertices(1,"#000000",[[120,100],[100,200],[200,150]]);
		 * 	}
		 * @examplelink <p><a href="../../../api/LGraphics/beginBitmapFill.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Fills a drawing area with a bitmap image. 
		 * @method beginBitmapFill
		 * @param {LBitmapData} bitmap A transparent or opaque bitmap image that contains the bits to be displayed.
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 		var backLayer;
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawArc(1,"#000000",[150,50,50,0,Math.PI*2]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawRect(1,"#000000",[10,100,70,100]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawVertices(1,"#000000",[[120,100],[100,200],[200,150]]);
		 * 	}
		 * @examplelink <p><a href="../../../api/LGraphics/beginBitmapFill.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 描画領域をビットマップイメージで塗りつぶします。
		 * @method beginBitmapFill
		 * @param {LBitmapData} bitmap 表示されるビットを含む透明または不透明ビットマップイメージです。
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 		var backLayer;
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawArc(1,"#000000",[150,50,50,0,Math.PI*2]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawRect(1,"#000000",[10,100,70,100]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawVertices(1,"#000000",[[120,100],[100,200],[200,150]]);
		 * 	}
		 * @examplelink <p><a href="../../../api/LGraphics/beginBitmapFill.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
		beginBitmapFill : function (b) {
			var s = this;
			s.setList.push(function () {
				s.bitmap = b;
			});
		},
		/** @language chinese
		 * 绘制一个椭圆。
		 * @method drawEllipse
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [x,y,width,height]:[椭圆边框左上角相对于父显示对象注册点的 x 位置（以像素为单位）,椭圆边框左上角相对于父显示对象注册点的 y 位置（以像素为单位）,椭圆的宽度（以像素为单位）,椭圆的高度（以像素为单位）]。
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawEllipse(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawEllipse(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawEllipse.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Draws an ellipse. 
		 * @method drawEllipse
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @param {Array} param [x,y,width,height]:[The x location of the top-left of the bounding-box of the ellipse relative to the registration point of the parent display object (in pixels),The y location of the top left of the bounding-box of the ellipse relative to the registration point of the parent display object (in pixels),The width of the ellipse (in pixels),The height of the ellipse (in pixels)]。
		 * @param {Boolean} isFill Whether to Fills the current drawing
		 * @param {String} fillColor Fills color
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawEllipse(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawEllipse(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawEllipse.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 楕円を描画します。
		 * @method drawEllipse
		 * @param {int} thickness 線の太さをポイント単位で示す整数。
		 * @param {String} color 線の色
		 * @param {Array} param [x,y,width,height]:[親表示オブジェクトの基準点からの楕円の境界ボックスの左上の相対 x 座標（ピクセル単位）です,親表示オブジェクトの基準点に対して相対的な、楕円の境界ボックスの左上の y 座標（ピクセル単位）です,楕円の幅（ピクセル単位）,楕円の高さ（ピクセル単位）]。
		 * @param {Boolean} isFill サブパスを塗りつぶするかどうか
		 * @param {String} fillColor サブパスを塗りつぶする色
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawEllipse(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawEllipse(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawEllipse.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 绘制一个圆或者扇形。
		 * @method drawArc
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [x,y,r,sAngle,eAngle,counterclockwise,isSector]:[描述弧的圆形的圆心的坐标x,描述弧的圆形的圆心的坐标y,描述弧的圆形的半径,沿着圆指定弧的开始点点的一个角度,沿着圆指定弧的结束点的一个角度,弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历,是否绘制成扇形]。
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawArc(2, "#ff0000", [50, 50, 40, 0, 2*Math.PI]);
		 * 	shape.graphics.drawArc(1, "#000000", [50, 150, 40, 0, 2*Math.PI], true, "#880088");
		 * 	shape.graphics.drawArc(2, "#ff0000", [150, 50, 40, 0, 50*Math.PI/180,false,true]);
		 * 	shape.graphics.drawArc(1, "#000000", [150, 150, 40, 0, 230*Math.PI/180,false,true], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawArc.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Draws a Circle or Sector. 
		 * @method drawArc
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @param {Array} param [x,y,r,sAngle,eAngle,counterclockwise,isSector]:[The x-coordinate of the center of the circle,The y-coordinate of the center of the circle,radius The radius of the circle,startAngle The starting angle,endAngle The ending angle,Specifies whether the drawing should be counterclockwise or clockwise,whether the drawing should be a sector]。
		 * @param {Boolean} isFill Whether to Fills the current drawing
		 * @param {String} fillColor Fills color
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawArc(2, "#ff0000", [50, 50, 40, 0, 2*Math.PI]);
		 * 	shape.graphics.drawArc(1, "#000000", [50, 150, 40, 0, 2*Math.PI], true, "#880088");
		 * 	shape.graphics.drawArc(2, "#ff0000", [150, 50, 40, 0, 50*Math.PI/180,false,true]);
		 * 	shape.graphics.drawArc(1, "#000000", [150, 150, 40, 0, 230*Math.PI/180,false,true], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawArc.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 円か扇形を描画します。
		 * @method drawArc
		 * @param {int} thickness 線の太さをポイント単位で示す整数。
		 * @param {String} color 線の色
		 * @param {Array} param [x,y,r,sAngle,eAngle,counterclockwise,isSector]:[中心の座標x,中心の座標y,半径,開始地点,終了地点,反時計回りにするか,扇形にするか]。
		 * @param {Boolean} isFill サブパスを塗りつぶするかどうか
		 * @param {String} fillColor サブパスを塗りつぶする色
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawArc(2, "#ff0000", [50, 50, 40, 0, 2*Math.PI]);
		 * 	shape.graphics.drawArc(1, "#000000", [50, 150, 40, 0, 2*Math.PI], true, "#880088");
		 * 	shape.graphics.drawArc(2, "#ff0000", [150, 50, 40, 0, 50*Math.PI/180,false,true]);
		 * 	shape.graphics.drawArc(1, "#000000", [150, 150, 40, 0, 230*Math.PI/180,false,true], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawArc.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 绘制一个矩形。
		 * @method drawRect
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [x,y,width,height]:[矩形左上角的 x 位置,矩形左上角的 y 位置,矩形的宽度,矩形的高度]。
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawRect(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRect.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Draws a rectangle. 
		 * @method drawRect
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @param {Array} param [x,y,width,height]:[A number indicating the horizontal position relative to the registration point of the parent display object,A number indicating the vertical position relative to the registration point of the parent display object,The width of the rectangle,The height of the rectangle]。
		 * @param {Boolean} isFill Whether to Fills the current drawing
		 * @param {String} fillColor Fills color
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawRect(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRect.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 矩形を描画します。
		 * @method drawRect
		 * @param {int} thickness 線の太さをポイント単位で示す整数。
		 * @param {String} color 線の色
		 * @param {Array} param [x,y,width,height]:[親表示オブジェクトの基準点からの相対的な水平座標を示す数値,親表示オブジェクトの基準点からの相対的な垂直座標を示す数値,矩形の幅,矩形の高さ]。
		 * @param {Boolean} isFill サブパスを塗りつぶするかどうか
		 * @param {String} fillColor サブパスを塗りつぶする色
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawRect(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRect.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 绘制一个圆角矩形。
		 * @method drawRoundRect
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [x,y,width,height,size]:[矩形左上角的 x 位置,矩形左上角的 y 位置,矩形的宽度,矩形的高度,圆角的大小]。
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRoundRect(2, "#ff0000", [10, 10, 100, 50, 10]);
		 * 	shape.graphics.drawRoundRect(1, "#000000", [10, 100, 50, 100, 10], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRoundRect.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Draws a rounded rectangle. 
		 * @method drawRoundRect
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @param {Array} param [x,y,width,height,size]:[A number indicating the horizontal position relative to the registration point of the parent display object,A number indicating the vertical position relative to the registration point of the parent display object,The width of the rectangle,The height of the rectangle,The size of the ellipse used to draw the rounded corners]。
		 * @param {Boolean} isFill Whether to Fills the current drawing
		 * @param {String} fillColor Fills color
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRoundRect(2, "#ff0000", [10, 10, 100, 50, 10]);
		 * 	shape.graphics.drawRoundRect(1, "#000000", [10, 100, 50, 100, 10], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRoundRect.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 角丸矩形を描画します。
		 * @method drawRoundRect
		 * @param {int} thickness 線の太さをポイント単位で示す整数。
		 * @param {String} color 線の色
		 * @param {Array} param [x,y,width,height,size]:[親表示オブジェクトの基準点からの相対的な水平座標を示す数値,親表示オブジェクトの基準点からの相対的な垂直座標を示す数値,矩形の幅,矩形の高さ,丸角の描画に使用される楕円の大きさ]。
		 * @param {Boolean} isFill サブパスを塗りつぶするかどうか
		 * @param {String} fillColor サブパスを塗りつぶする色
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRoundRect(2, "#ff0000", [10, 10, 100, 50, 10]);
		 * 	shape.graphics.drawRoundRect(1, "#000000", [10, 100, 50, 100, 10], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRoundRect.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 使用顶点数组绘制一个多边形。
		 * @method drawVertices
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [[x1,y1],[x2,y2],[x3,y3],......]
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 10], [60, 100], [100, 50]]);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 160], [60, 250], [100, 200]], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawVertices.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Draws a Polygon. 
		 * @method drawVertices
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @param {Array} param [[x1,y1],[x2,y2],[x3,y3],......]
		 * @param {Boolean} isFill Whether to Fills the current drawing
		 * @param {String} fillColor Fills color
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 10], [60, 100], [100, 50]]);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 160], [60, 250], [100, 200]], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawVertices.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 多角形を描画します。
		 * @method drawVertices
		 * @param {int} thickness 線の太さをポイント単位で示す整数。
		 * @param {String} color 線の色
		 * @param {Array} param [[x1,y1],[x2,y2],[x3,y3],......]
		 * @param {Boolean} isFill サブパスを塗りつぶするかどうか
		 * @param {String} fillColor サブパスを塗りつぶする色
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 10], [60, 100], [100, 50]]);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 160], [60, 250], [100, 200]], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawVertices.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 呈现一组三角形（通常用于扭曲位图），并为其指定三维外观。drawTriangles() 方法使用一组 (u,v) 坐标将当前填充或位图填充映射到三角形面。
		 * @method drawTriangles
		 * @param {Array} vertices 由数字构成的矢量，其中的每一对数字将被视为一个坐标位置（一个 x, y 对）。vertices 参数是必需的。
		 * @param {Array} indices 一个由整数或索引构成的矢量，其中每三个索引定义一个三角形。如果 indexes 参数为 null，则每三个顶点（vertices 矢量中的 6 对 x,y）定义一个三角形。否则，每个索引将引用一个顶点，即 vertices 矢量中的一对数字。例如，indexes[1] 引用 (vertices[2], vertices[3])。indexes 参数是可选的，但 indexes 通常会减少提交的数据量和计算的数据量。
		 * @param {Array} uvtData 由用于应用纹理映射的标准坐标构成的矢量。每个坐标引用用于填充的位图上的一个点。每个顶点必须具有一个 UV 或一个 UVT 坐标。对于 UV 坐标，(0,0) 是位图的左上角，(1,1) 是位图的右下角。
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细,默认为0；
		 * @param {String} color 线的颜色
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var backLayer = new LSprite();
		 * 	addChild(backLayer);
		 * 	var vertices = new Array();
		 * 	vertices.push(0, 0);
		 * 	vertices.push(-40, 90);
		 * 	vertices.push(0, 200);
		 * 	vertices.push(80, 0);
		 * 	vertices.push(90, 30);
		 * 	vertices.push(70,200);
		 * 	vertices.push(130, 10);
		 * 	vertices.push(140, 40);
		 * 	vertices.push(120,220);
		 * 	var indices = new Array();
		 * 	indices.push(0, 3, 1);
		 * 	indices.push(3, 1, 4);
		 * 	indices.push(1, 4, 2);
		 * 	indices.push(4, 2, 5);
		 * 	indices.push(3, 6, 4);
		 * 	indices.push(6, 4, 7);
		 * 	indices.push(4, 7, 5);
		 * 	indices.push(7, 5, 8);
		 * 	var uvtData = new Array();
		 * 	uvtData.push(0, 0);
		 * 	uvtData.push(0, 0.5);
		 * 	uvtData.push(0, 1);
		 * 	uvtData.push(0.5, 0);
		 * 	uvtData.push(0.5, 0.5);
		 * 	uvtData.push(0.5, 1);
		 * 	uvtData.push(1, 0);
		 * 	uvtData.push(1, 0.5);
		 * 	uvtData.push(1, 1);
		 * 	backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 	backLayer.graphics.drawTriangles(vertices, indices, uvtData);
		 * @examplelink <p><a href="../../../api/LGraphics/drawTriangles.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Renders a set of triangles, typically to distort bitmaps and give them a three-dimensional appearance. The drawTriangles() method maps either the current fill, or a bitmap fill, to the triangle faces using a set of (u,v) coordinates.
		 * @method drawTriangles
		 * @param {Array} vertices A Vector of Numbers where each pair of numbers is treated as a coordinate location (an x, y pair). The vertices parameter is required.
		 * @param {Array} indices  A Vector of integers or indexes, where every three indexes define a triangle. If the indexes parameter is null then every three vertices (six x,y pairs in the vertices Vector) defines a triangle. Otherwise each index refers to a vertex, which is a pair of numbers in the vertices Vector. For example indexes[1] refers to (vertices[2], vertices[3]). The indexes parameter is optional, but indexes generally reduce the amount of data submitted and the amount of data computed.
		 * @param {Array} uvtData  A Vector of normalized coordinates used to apply texture mapping. Each coordinate refers to a point on the bitmap used for the fill. You must have one UV or one UVT coordinate per vertex. In UV coordinates, (0,0) is the upper left of the bitmap, and (1,1) is the lower right of the bitmap.
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var backLayer = new LSprite();
		 * 	addChild(backLayer);
		 * 	var vertices = new Array();
		 * 	vertices.push(0, 0);
		 * 	vertices.push(-40, 90);
		 * 	vertices.push(0, 200);
		 * 	vertices.push(80, 0);
		 * 	vertices.push(90, 30);
		 * 	vertices.push(70,200);
		 * 	vertices.push(130, 10);
		 * 	vertices.push(140, 40);
		 * 	vertices.push(120,220);
		 * 	var indices = new Array();
		 * 	indices.push(0, 3, 1);
		 * 	indices.push(3, 1, 4);
		 * 	indices.push(1, 4, 2);
		 * 	indices.push(4, 2, 5);
		 * 	indices.push(3, 6, 4);
		 * 	indices.push(6, 4, 7);
		 * 	indices.push(4, 7, 5);
		 * 	indices.push(7, 5, 8);
		 * 	var uvtData = new Array();
		 * 	uvtData.push(0, 0);
		 * 	uvtData.push(0, 0.5);
		 * 	uvtData.push(0, 1);
		 * 	uvtData.push(0.5, 0);
		 * 	uvtData.push(0.5, 0.5);
		 * 	uvtData.push(0.5, 1);
		 * 	uvtData.push(1, 0);
		 * 	uvtData.push(1, 0.5);
		 * 	uvtData.push(1, 1);
		 * 	backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 	backLayer.graphics.drawTriangles(vertices, indices, uvtData);
		 * @examplelink <p><a href="../../../api/LGraphics/drawTriangles.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 一連の三角形をレンダリングします。通常は、ビットマップを歪曲させて、3 次元の外観にします。drawTriangles() メソッドは、(u,v) 座標を使用して現在の塗りまたはビットマップ塗りを三角形の各面にマッピングします。 
		 * @method drawTriangles
		 * @param {Array} vertices Number の Vector で、数値の各ペアは座標位置（x と y のペア）として扱われます。vertices パラメーターを指定する必要があります。
		 * @param {Array} indices 整数またはインデックスの Vector です。3 つのインデックスごとに三角形が定義されます。indexes パラメーターが null の場合、3 つの頂点（vertices Vector 内の 6 つの x、y ペア）ごとに三角形が定義されます。null でない場合、各インデックスは頂点（vertices Vector 内の数値のペア）を参照します。例えば、indexes[1] は（vertices[2], vertices[3]）を参照します。indexes パラメーターはオプションですが、インデックスを使用すると、通常、送信されるデータ量と計算されるデータ量が減少します。
		 * @param {Array} uvtData テクスチャマッピングを適用するために使用される正規化座標の Vector です。各座標は、塗りに使用されるビットマップ上のポイントを参照します。頂点ごとに 1 つの UV 座標または 1 つの UVT 座標が必要です。UV 座標では、（0,0）はビットマップの左上隅で、（1,1）はビットマップの右下隅です。
		 * @param {int} thickness 線の太さをポイント単位で示す整数。ディフォルトは0；
		 * @param {String} color 線の色
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var backLayer = new LSprite();
		 * 	addChild(backLayer);
		 * 	var vertices = new Array();
		 * 	vertices.push(0, 0);
		 * 	vertices.push(-40, 90);
		 * 	vertices.push(0, 200);
		 * 	vertices.push(80, 0);
		 * 	vertices.push(90, 30);
		 * 	vertices.push(70,200);
		 * 	vertices.push(130, 10);
		 * 	vertices.push(140, 40);
		 * 	vertices.push(120,220);
		 * 	var indices = new Array();
		 * 	indices.push(0, 3, 1);
		 * 	indices.push(3, 1, 4);
		 * 	indices.push(1, 4, 2);
		 * 	indices.push(4, 2, 5);
		 * 	indices.push(3, 6, 4);
		 * 	indices.push(6, 4, 7);
		 * 	indices.push(4, 7, 5);
		 * 	indices.push(7, 5, 8);
		 * 	var uvtData = new Array();
		 * 	uvtData.push(0, 0);
		 * 	uvtData.push(0, 0.5);
		 * 	uvtData.push(0, 1);
		 * 	uvtData.push(0.5, 0);
		 * 	uvtData.push(0.5, 0.5);
		 * 	uvtData.push(0.5, 1);
		 * 	uvtData.push(1, 0);
		 * 	uvtData.push(1, 0.5);
		 * 	uvtData.push(1, 1);
		 * 	backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 	backLayer.graphics.drawTriangles(vertices, indices, uvtData);
		 * @examplelink <p><a href="../../../api/LGraphics/drawTriangles.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 绘制一条线段。
		 * @method drawLine
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [startX,startY,endX,endY]:[开始的 x 位置,开始的 y 位置,结束的 x 位置,结束的 y 位置]。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawLine(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawLine(1, "#000000", [10, 100, 50, 100]);
		 * @examplelink <p><a href="../../../api/LGraphics/drawLine.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Draw a line
		 * @method drawLine
		 * @param {int} thickness An integer that indicates the thickness of the line in points; 
		 * @param {String} color color|gradient|pattern
		 * @param {Array} param [startX,startY,endX,endY]:[The x-coordinate of the start,The y-coordinate of the start,The x-coordinate of the end,The y-coordinate of the end]。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawLine(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawLine(1, "#000000", [10, 100, 50, 100]);
		 * @examplelink <p><a href="../../../api/LGraphics/drawLine.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * 線を描画します。
		 * @method drawLine
		 * @param {int} thickness 線の太さをポイント単位で示す整数。
		 * @param {String} color 線の色
		 * @param {Array} param [startX,startY,endX,endY]:[開始の x,開始的 y,終了の x,終了の y]。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawLine(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawLine(1, "#000000", [10, 100, 50, 100]);
		 * @examplelink <p><a href="../../../api/LGraphics/drawLine.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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
		/** @language chinese
		 * 使用原生的canvas函数进行绘图。
		 * @method add
		 * @param {Function} func 一个函数
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.add(function(){
		 * 		var ctx = LGlobal.canvas;
		 * 		ctx.beginPath();
		 * 		ctx.strokeStyle = "#FF0000";
		 * 		ctx.lineWidth = 2;
		 * 		ctx.moveTo(10,10);
		 * 		ctx.lineTo(130,30);
		 * 		ctx.stroke();
		 * 	});
		 * @examplelink <p><a href="../../../api/LGraphics/add.html" target="_blank">测试链接</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * canvas's methods that you can use to create a vector shape.
		 * @method add
		 * @param {Function} func a function
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.add(function(){
		 * 		var ctx = LGlobal.canvas;
		 * 		ctx.beginPath();
		 * 		ctx.strokeStyle = "#FF0000";
		 * 		ctx.lineWidth = 2;
		 * 		ctx.moveTo(10,10);
		 * 		ctx.lineTo(130,30);
		 * 		ctx.stroke();
		 * 	});
		 * @examplelink <p><a href="../../../api/LGraphics/add.html" target="_blank">Try it »</a></p>
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * canvasの関数を使って、ベクターシェイプを作成する
		 * @method add
		 * @param {Function} func 一つの関数
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.add(function(){
		 * 		var ctx = LGlobal.canvas;
		 * 		ctx.beginPath();
		 * 		ctx.strokeStyle = "#FF0000";
		 * 		ctx.lineWidth = 2;
		 * 		ctx.moveTo(10,10);
		 * 		ctx.lineTo(130,30);
		 * 		ctx.stroke();
		 * 	});
		 * @examplelink <p><a href="../../../api/LGraphics/add.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.4.0
		 * @public
		 */
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