/** @language chinese
 * 创建一个新的 LSprite 实例。
 * LSprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。
 * @class LSprite
 * @extends LInteractiveObject
 * @constructor
 * @example
 *  LInit(50, "legend", 800, 480, main);
 *  function main () {
 *  	var layer = new LSprite();
 *  	addChild(layer);
 *  	
 *  	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 *  	var bm = new LBitmap(bmd);
 *  	layer.addChild(bm);
 *  }
 * @examplelink <p><a href="../../../api/LSprite/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Creates a new LSprite instance.
 * The LSprite class is a basic display list building block: a display list node that can display graphics and can also contain children.
 * @class LSprite
 * @extends LInteractiveObject
 * @constructor
 * @example
 *  LInit(50, "legend", 800, 480, main);
 *  function main () {
 *  	var layer = new LSprite();
 *  	addChild(layer);
 *  	
 *  	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 *  	var bm = new LBitmap(bmd);
 *  	layer.addChild(bm);
 *  }
 * @examplelink <p><a href="../../../api/LSprite/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 新しい LSprite インスタンスを作成します。
 * LSprite クラスは、表示リストの基本的要素です。つまり、グラフィックを表示でき、子を持つこともできる表示リストノードです。
 * @class LSprite
 * @extends LInteractiveObject
 * @constructor
 * @example
 *  LInit(50, "legend", 800, 480, main);
 *  function main () {
 *  	var layer = new LSprite();
 *  	addChild(layer);
 *  	
 *  	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 *  	var bm = new LBitmap(bmd);
 *  	layer.addChild(bm);
 *  }
 * @examplelink <p><a href="../../../api/LSprite/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LSprite = (function () {
	function LSprite () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LSprite
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * type of the object
		 * @property type
		 * @type String
		 * @default LSprite
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのタイプ
		 * @property type
		 * @type String
		 * @default LSprite
		 * @since 1.0.0
		 * @public
		 */
		s.type = "LSprite";
		s.rotatex;
		s.rotatey;
		/** @language chinese
		 * 子对象列表
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * the child display object list
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * 子表示オブジェクトのリスト
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		s.childList = new Array();
		/** @language chinese
		 * 返回此对象的子项数目。
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 *  var container1 = new LSprite();
		 *  var container2 = new LSprite();
		 *  var circle1 = new LSprite();
		 *  circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 *  var circle2 = new LSprite();
		 *  circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 *  container2.addChild(container1);
		 *  container1.addChild(circle1);
		 *  container1.addChild(circle2);
		 *  trace(container1.numChildren); // 2
		 *  trace(container2.numChildren); // 1
		 *  trace(circle1.numChildren); // 0
		 *  trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LSprite/numChildren.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Returns the number of children of this object.
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 *  var container1 = new LSprite();
		 *  var container2 = new LSprite();
		 *  var circle1 = new LSprite();
		 *  circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 *  var circle2 = new LSprite();
		 *  circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 *  container2.addChild(container1);
		 *  container1.addChild(circle1);
		 *  container1.addChild(circle2);
		 *  trace(container1.numChildren); // 2
		 *  trace(container2.numChildren); // 1
		 *  trace(circle1.numChildren); // 0
		 *  trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LSprite/numChildren.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このオブジェクトの子の数を返します。
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 *  var container1 = new LSprite();
		 *  var container2 = new LSprite();
		 *  var circle1 = new LSprite();
		 *  circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 *  var circle2 = new LSprite();
		 *  circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 *  container2.addChild(container1);
		 *  container1.addChild(circle1);
		 *  container1.addChild(circle2);
		 *  trace(container1.numChildren); // 2
		 *  trace(container2.numChildren); // 1
		 *  trace(circle1.numChildren); // 0
		 *  trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LSprite/numChildren.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.numChildren = 0;
		/** @language chinese
		 * [只读] 指定属于此 sprite 的 Graphics 对象，在此 sprite 中可执行矢量绘图命令。
		 * @property graphics
		 * @type LGraphics
		 * @since 1.0.0
		 * @example
		 *  var layer = new LSprite();
		 *  addChild(layer);
		 *  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LSprite/graphics.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * [read-only] Specifies the Graphics object that belongs to this sprite where vector drawing commands can occur.
		 * @property graphics
		 * @type LGraphics
		 * @since 1.0.0
		 * @example
		 *  var layer = new LSprite();
		 *  addChild(layer);
		 *  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LSprite/graphics.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * [読み取り専用] ベクターの描画コマンドが発生するこのスプライトに属する Graphics オブジェクトを指定します。
		 * @property graphics
		 * @type LGraphics
		 * @since 1.0.0
		 * @example
		 *  var layer = new LSprite();
		 *  addChild(layer);
		 *  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LSprite/graphics.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.graphics = new LGraphics();
		s.graphics.parent = s;
		s.box2dBody = null;
		/** @language chinese
		 * 用于碰撞的形状列表
		 * @property shapes
		 * @type Array
		 * @since 1.9.0
		 * @example
		 *  function loadBitmapdata (event) {
		 *  	var bitmapdata = new LBitmapData(event.currentTarget); 
		 *  	var bitmap = new LBitmap(bitmapdata);
		 *  
		 *  	layer = new LSprite();
		 *  	layer.addChild(bitmap);
		 *  	layer.x = 20;
		 *  	layer.y = 50;
		 *  	layer.addShape(LShape.VERTICES, [[180, 20], [210, 40], [210, 60], [120, 110], [35, 100]]);
		 *  	layer.addShape(LShape.VERTICES, [[120, 110], [140, 120], [140, 150], [110, 160], [35, 120], [35, 100]]);
		 *  	addChild(layer);
		 *  
		 *  	layer.addEventListener(LEvent.ENTER_FRAME, onframe);
		 *  }
		 *  function onframe (e) {
		 *  	if (layer.hitTestPoint(mouseX, mouseY)) {
		 *  		layer.alpha = 0.5;
		 *  	} else {
		 *  		layer.alpha = 1;
		 *  	}
		 *  }
		 * @examplelink <p><a href="../../../api/LSprite/shapes.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * The collider’s shape list
		 * @property shapes
		 * @type Array
		 * @since 1.9.0
		 * @example
		 *  function loadBitmapdata (event) {
		 *  	var bitmapdata = new LBitmapData(event.currentTarget); 
		 *  	var bitmap = new LBitmap(bitmapdata);
		 *  
		 *  	layer = new LSprite();
		 *  	layer.addChild(bitmap);
		 *  	layer.x = 20;
		 *  	layer.y = 50;
		 *  	layer.addShape(LShape.VERTICES, [[180, 20], [210, 40], [210, 60], [120, 110], [35, 100]]);
		 *  	layer.addShape(LShape.VERTICES, [[120, 110], [140, 120], [140, 150], [110, 160], [35, 120], [35, 100]]);
		 *  	addChild(layer);
		 *  
		 *  	layer.addEventListener(LEvent.ENTER_FRAME, onframe);
		 *  }
		 *  function onframe (e) {
		 *  	if (layer.hitTestPoint(mouseX, mouseY)) {
		 *  		layer.alpha = 0.5;
		 *  	} else {
		 *  		layer.alpha = 1;
		 *  	}
		 *  }
		 * @examplelink <p><a href="../../../api/LSprite/shapes.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * 衝突判定用形状リスト
		 * @property shapes
		 * @type Array
		 * @since 1.9.0
		 * @example
		 *  function loadBitmapdata (event) {
		 *  	var bitmapdata = new LBitmapData(event.currentTarget); 
		 *  	var bitmap = new LBitmap(bitmapdata);
		 *  
		 *  	layer = new LSprite();
		 *  	layer.addChild(bitmap);
		 *  	layer.x = 20;
		 *  	layer.y = 50;
		 *  	layer.addShape(LShape.VERTICES, [[180, 20], [210, 40], [210, 60], [120, 110], [35, 100]]);
		 *  	layer.addShape(LShape.VERTICES, [[120, 110], [140, 120], [140, 150], [110, 160], [35, 120], [35, 100]]);
		 *  	addChild(layer);
		 *  
		 *  	layer.addEventListener(LEvent.ENTER_FRAME, onframe);
		 *  }
		 *  function onframe (e) {
		 *  	if (layer.hitTestPoint(mouseX, mouseY)) {
		 *  		layer.alpha = 0.5;
		 *  	} else {
		 *  		layer.alpha = 1;
		 *  	}
		 *  }
		 * @examplelink <p><a href="../../../api/LSprite/shapes.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.shapes = new Array();
	}
	var p = {
		/** @language chinese
		 * 使用Box2dWeb的时候，需要用setRotate来设定角度
		 * @method setRotate
		 * @param {float} angle 角度。
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Rotates the object by an angle, when you use the Box2dWeb
		 * @method setRotate
		 * @param {float} angle angle。
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * Box2dWebを利用する時，setRotateを使って角度を設定する
		 * @method setRotate
		 * @param {float} angle 角度。
		 * @since 1.4.0
		 * @public
		 */
		setRotate : function (angle) {
			var s = this;
			if (s.box2dBody) {
				s.box2dBody.SetAngle(angle);
			} else {
				s.rotate = angle;
			}
		},
		_rotateReady : function () {
			var s = this;
			if (s.box2dBody) {
				if ((typeof s.rotatex) == UNDEFINED) {
					s.getRotateXY();
				}
				s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
				s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
				s.rotate = s.box2dBody.GetAngle();
			}
		},
		_ll_show : function (c) {
			var s = this;
			s.graphics.ll_show();
			LGlobal.show(s.childList);
			s.ll_debugShape();
		},
		/** @language chinese
		 * 允许用户拖动指定的 Sprite。Sprite 将一直保持可拖动，直到通过调用 Sprite.stopDrag() 方法来明确停止。
		 * @method startDrag
		 * @param {int} touchPointID 分配给触摸点的整数(触摸设备)。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/startDrag.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language english
		 * Lets the user drag the specified sprite. The sprite remains draggable until explicitly stopped through a call to the Sprite.stopDrag() method.
		 * @method startDrag
		 * @param {int} touchPointID An integer to assign to the touch point(a touch-enabled device).
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/startDrag.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language japanese
		 * 指定されたスプライトをユーザーがドラッグできるようにします。Sprite.stopDrag() メソッドを呼び出して明示的に停止する
		 * @method startDrag
		 * @param {int} touchPointID タッチポイントに割り当てる整数です(タッチ対応デバイス)。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/startDrag.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.8.9
		 */
		startDrag : function (touchPointID) {
			var s = this, r, c;
			if (s.ll_dragStart) {
				return;
			}
			s.ll_touchPointID = touchPointID;
			s.ll_dragStartX = s.x;
			s.ll_dragStartY = s.y;
			s.ll_dragMX = mouseX;
			s.ll_dragMY = mouseY;
			s.ll_dragStart = true;
			LGlobal.dragList.push(s);
		},
		/** @language chinese
		 * 结束 startDrag() 方法。
		 * @method stopDrag
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/stopDrag.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language english
		 * Ends the startDrag() method. 
		 * @method stopDrag
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/stopDrag.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language japanese
		 * startDrag() メソッドを終了します。
		 * @method stopDrag
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/stopDrag.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.8.9
		 */
		stopDrag : function () {
			var s = this, i, l;
			for (i = 0, l = LGlobal.dragList.length; i < l; i++) {
				if (s.objectIndex == LGlobal.dragList[i].objectIndex) {
					s.ll_dragStart = false;
					LGlobal.dragList.splice(i, 1);
					break;
				}
			}
		},
		getRotateXY : function (w, h) {
			var s = this;
			if (!w || !h) {
				w = s.getWidth();
				h = s.getHeight();
			}
			s.rotatex = w / 2;
			s.rotatey = h / 2;
		},
		/** @language chinese
		 * 获取显示对象的宽度，以像素为单位。
		 * @method getWidth
		 * @return {float} 显示对象的宽度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("width : " + layer.getWidth());
		 * @examplelink <p><a href="../../../api/LSprite/getWidth.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the width of the display object, in pixels.
		 * @method getWidth
		 * @return {float} the width of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("width : " + layer.getWidth());
		 * @examplelink <p><a href="../../../api/LSprite/getWidth.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの幅を取得します（ピクセル単位）。
		 * @method getWidth
		 * @return @return {float} オブジェクトの幅。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("width : " + layer.getWidth());
		 * @examplelink <p><a href="../../../api/LSprite/getWidth.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getWidth : function () {
			var s = this, i, l, o, a, b,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.x;
				if (typeof o._startX == "function") {
					a=o._startX();
				}
				b = a + o.getWidth();
				if (a < left) {
					left = a;
				}
				if (b > right) {
					right = b;
				}
			}
			s.ll_left = s.x + left;
			s.ll_right = s.x + right;
			return (right - left) * s.scaleX;
		},
		/** @language chinese
		 * 获取显示对象的高度，以像素为单位。
		 * @method getHeight
		 * @return {float} 显示对象的高度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("height : " + layer.getHeight());
		 * @examplelink <p><a href="../../../api/LSprite/getHeight.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the height of the display object, in pixels.
		 * @method getHeight
		 * @return {float} the height of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("height : " + layer.getHeight());
		 * @examplelink <p><a href="../../../api/LSprite/getHeight.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの高さを取得します（ピクセル単位）。
		 * @method getHeight
		 * @return @return {float} オブジェクトの高さ。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("height : " + layer.getHeight());
		 * @examplelink <p><a href="../../../api/LSprite/getHeight.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getHeight : function () {
			var s = this, i, l, o, a, b,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.y;
				if (typeof o._startY == "function") {
					a=o._startY();
				}
				b = a + o.getHeight();
				if (a < top) {
					top = a;
				}
				if (b > bottom) {
					bottom = b;
				}
			}
			s.ll_top = s.y + top;
			s.ll_bottom = s.y + bottom;
			return (bottom - top) * s.scaleY;
		},
		_startX : function () {
			var s = this;
			s.getWidth();
			return s.ll_left;
		},
		startX : function () {
			var s = this;
			return s._startX() * s.scaleX;
		},
		_startY : function () {
			var s = this;
			s.getHeight();
			return s.ll_top;
		},
		startY : function () {
			var s = this;
			return s._startY() * s.scaleY;
		},
		loopframe : function () {
			var s = this, k, l;
			for (k = 0, l = s.frameList.length; k < l; k++) {
				s.target = s;
				s.event_type = LEvent.ENTER_FRAME;
				s.frameList[k](s);
			}
		},
		/** @language chinese
		 * <p>将一个 DisplayObject 子实例添加到该 LSprite 实例中。子项将被添加到该 LSprite 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）</p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChild
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LSprite/addChild.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Adds a child DisplayObject instance to this LSprite instance. The child is added to the front (top) of all other children in this LSprite instance. (To add a child to a specific index position, use the addChildAt() method.)</p>
		 * <p>If you add a child object that already has a different display object container as a parent, the object is removed from the child list of the other display object container.</p>
		 * @method addChild
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LSprite/addChild.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>この DisplayObjectContainer インスタンスに子 LSprite インスタンスを追加します。子インスタンスは、この LSprite インスタンスにある他のすべての子の前（上）に追加されます（特定のインデックス位置に子を追加する場合は、addChildAt() メソッドを使用します）。</p>
		 * <p>既に異なる表示オブジェクトコンテナを親に持つ子オブジェクトを追加する場合は、もう一方の表示オブジェクトコンテナの子リストからそのオブジェクトが削除されます。</p>
		 * @method addChild
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LSprite/addChild.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		addChild : function (d) {
			var s  = this,t;
			if (d.parent) {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.parent.removeChild(d);
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.push(d);
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * <p>将一个 LDisplayObject 子实例添加到该 LSprite 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 LSprite 对象的显示列表的后（底）部。</p>
		 * <p>例如，下例在索引位置 0、2、1 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LSprite/LSprite_layers.jpg" /></p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChild
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);
		 * 	trace(container.getChildAt(0) == circle2); // true
		 * 	trace(container.getChildAt(1) == circle1); // true
		 * @examplelink <p><a href="../../../api/LSprite/addChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Adds a child LDisplayObject instance to this LSprite instance. The child is added at the index position specified. An index of 0 represents the back (bottom) of the display list for this LSprite object.</p>
		 * <p>For example, the following example shows three display objects, labeled a, b, and c, at index positions 0, 2, and 1, respectively:</p>
		 * <p><img src="../../../api/LSprite/LSprite_layers.jpg" /></p>
		 * <p>If you add a child object that already has a different display object container as a parent, the object is removed from the child list of the other display object container.</p>
		 * @method addChild
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);
		 * 	trace(container.getChildAt(0) == circle2); // true
		 * 	trace(container.getChildAt(1) == circle1); // true
		 * @examplelink <p><a href="../../../api/LSprite/addChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>この DisplayObjectContainer インスタンスに子 LDisplayObject インスタンスを追加します。子インスタンスは、指定されたインデックス位置に追加されます。インデックス 0 は、この LSprite オブジェクトの表示リストの背景または一番下を表します。</p>
		 * <p>例えば、a、b、c というラベルの 3 個の表示オブジェクトをインデックス位置 0、2、1 にそれぞれ配置すると、以下のようになります。</p>
		 * <p><img src="../../../api/LSprite/LSprite_layers.jpg" /></p>
		 * <p>既に異なる表示オブジェクトコンテナを親に持つ子オブジェクトを追加する場合は、もう一方の表示オブジェクトコンテナの子リストからそのオブジェクトが削除されます。</p>
		 * @method addChild
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);
		 * 	trace(container.getChildAt(0) == circle2); // true
		 * 	trace(container.getChildAt(1) == circle1); // true
		 * @examplelink <p><a href="../../../api/LSprite/addChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		addChildAt : function (d, i) {
			var s = this,t;
			if (i < 0 || i > s.childList.length) {
				return;
			}
			if (typeof d.remove == "function") {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.remove();
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.splice(i, 0, d);
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * <p>从 LSprite 实例的子列表中删除指定的 child LDisplayObject 实例。将已删除子项的 parent 属性设置为 null；如果不存在对该子项的任何其它引用，则将该对象作为垃圾回收。LSprite 中该子项之上的任何显示对象的索引位置都减去 1。</p>
		 * @method removeChild
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/removeChild.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Removes the specified child LDisplayObject instance from the child list of the LSprite instance. The parent property of the removed child is set to null , and the object is garbage collected if no other references to the child exist. The index positions of any display objects above the child in the LSprite are decreased by 1.</p>
		 * @method removeChild
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/removeChild.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>LSprite インスタンスの子リストから指定の child LDisplayObject インスタンスを削除します。削除された子の parent プロパティは null に設定されます。その子に対する参照が存在しない場合、そのオブジェクトはガベージコレクションによって収集されます。LSprite の子より上位にある表示オブジェクトのインデックス位置は 1 つ下がります。</p>
		 * @method removeChild
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/removeChild.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		removeChild : function (d) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					if (LGlobal.destroy && d.die) {
						d.die();
					}
					s.childList.splice(i, 1);
					break;
				}
			}
			s.numChildren = s.childList.length;
			delete d.parent;
		},
		/** @language chinese
		 * 返回位于指定索引处的子显示对象实例。
		 * @method getChildAt
		 * @param {int} index 子对象的索引位置。
		 * @return {LDisplayObject} 位于指定索引位置处的子显示对象。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);
		 * 	trace(container.getChildAt(0) == sprite3); // true
		 * 	trace(container.getChildAt(1) == sprite1); // true
		 * 	trace(container.getChildAt(2) == sprite2); // true
		 * @examplelink <p><a href="../../../api/LSprite/getChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns the child display object instance that exists at the specified index.
		 * @method getChildAt
		 * @param {int} index The index position of the child object.
		 * @return {LDisplayObject} The child display object at the specified index position.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);
		 * 	trace(container.getChildAt(0) == sprite3); // true
		 * 	trace(container.getChildAt(1) == sprite1); // true
		 * 	trace(container.getChildAt(2) == sprite2); // true
		 * @examplelink <p><a href="../../../api/LSprite/getChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 指定のインデックス位置にある子表示オブジェクトインスタンスを返します。
		 * @method getChildAt
		 * @param {int} index 子オブジェクトのインデックス位置です。
		 * @return {LDisplayObject} 指定されたインデックス位置にある子表示オブジェクトです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);
		 * 	trace(container.getChildAt(0) == sprite3); // true
		 * 	trace(container.getChildAt(1) == sprite1); // true
		 * 	trace(container.getChildAt(2) == sprite2); // true
		 * @examplelink <p><a href="../../../api/LSprite/getChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length == 0 || c.length <= i) {
				return null;
			}
			return c[i];
		},
		/** @language chinese
		 * 从 LSprite 的子列表中指定的 index 位置删除子 LDisplayObject。将已删除子项的 parent 属性设置为 null；如果没有对该子项的任何其他引用，则将该对象作为垃圾回收。LSprite 中该子项之上的任何显示对象的索引位置都减去 1。
		 * @method removeChildAt
		 * @param {int} index 要删除的 DisplayObject 的子索引。
		 * @return {LDisplayObject} 已删除的 DisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.numChildren) // 2
		 * 	container.removeChildAt(0); 
		 * 	trace(container.numChildren) // 1
		 * 	trace(container.getChildAt(0).name); // sprite2
		 * @examplelink <p><a href="../../../api/LSprite/removeChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Removes a child LDisplayObject from the specified index position in the child list of the LSprite. The parent property of the removed child is set to null, and the object is garbage collected if no other references to the child exist. The index positions of any display objects above the child in the LSprite are decreased by 1.
		 * @method removeChildAt
		 * @param {int} index The child index of the LDisplayObject to remove.
		 * @return {LDisplayObject} The LDisplayObject instance that was removed.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.numChildren) // 2
		 * 	container.removeChildAt(0); 
		 * 	trace(container.numChildren) // 1
		 * 	trace(container.getChildAt(0).name); // sprite2
		 * @examplelink <p><a href="../../../api/LSprite/removeChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LSprite の子リストの指定された index 位置から子 LDisplayObject を削除します。削除された子の parent プロパティは null に設定されます。その子に対する参照が存在しない場合、そのオブジェクトはガベージコレクションによって収集されます。LSprite の子より上位にある表示オブジェクトのインデックス位置は 1 つ下がります。
		 * @method removeChildAt
		 * @param {int} index 削除する LDisplayObject の子インデックスです。
		 * @return {LDisplayObject} 削除された LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.numChildren) // 2
		 * 	container.removeChildAt(0); 
		 * 	trace(container.numChildren) // 1
		 * 	trace(container.getChildAt(0).name); // sprite2
		 * @examplelink <p><a href="../../../api/LSprite/removeChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		removeChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length <= i) {
				return;
			}
			if (LGlobal.destroy && c[i].die) {
				c[i].die();
			}
			var d = s.childList.splice(i, 1);
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * 返回 LDisplayObject 的 child 实例的索引位置。
		 * @method getChildIndex
		 * @param {LDisplayObject} child 要标识的 LDisplayObject 实例。
		 * @return {int} 要标识的子显示对象的索引位置。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.getChildIndex(sprite1)); // 0
		 * @examplelink <p><a href="../../../api/LSprite/getChildIndex.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns the index position of a child LDisplayObject instance.
		 * @method getChildIndex
		 * @param {LDisplayObject} The DisplayObject instance to identify.
		 * @return {int} The index position of the child display object to identify.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.getChildIndex(sprite1)); // 0
		 * @examplelink <p><a href="../../../api/LSprite/getChildIndex.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * child LDisplayObject インスタンスのインデックス位置を返します
		 * @method getChildIndex
		 * @param {LDisplayObject} 特定する LDisplayObject インスタンスです。
		 * @return {int} 特定する子表示オブジェクトのインデックス位置です。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.getChildIndex(sprite1)); // 0
		 * @examplelink <p><a href="../../../api/LSprite/getChildIndex.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getChildIndex : function (child) {
			var s = this, c = s.childList, i, l = c.length;
			for (i = 0; i < l; i++) {
				if (c[i].objectIndex == child.objectIndex) {
					return i;
				}
			}
			return -1;
		},
		/** @language chinese
		 * <p>更改现有子项在显示对象容器中的位置。这会影响子对象的分层。例如，下例在索引位置 0、1、2 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>在使用 setChildIndex() 方法并指定一个已经占用的索引位置时，唯一发生更改的位置是显示对象先前的位置和新位置之间的位置。所有其他位置将保持不变。如果将一个子项移动到比它当前的索引更低的索引处，则这两个索引之间的所有子项的索引引用都将增加 1。如果将一个子项移动到比它当前的索引更高的索引处，则这两个索引之间的所有子项的索引引用都将减小 1。例如，如果上例中的显示对象容器名为 container，则可以通过调用以下代码来交换带有 a 和 b 标记的显示对象的位置：</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>该代码产生以下对象排列：</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child 要为其更改索引编号的 LDisplayObject 子实例。
		 * @return {int} 生成的 child 显示对象的索引编号。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/setChildIndex.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Changes the position of an existing child in the display object container. This affects the layering of child objects. For example, the following example shows three display objects, labeled a, b, and c, at index positions 0, 1, and 2, respectively:</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>When you use the setChildIndex() method and specify an index position that is already occupied, the only positions that change are those in between the display object's former and new position. All others will stay the same. If a child is moved to an index LOWER than its current index, all children in between will INCREASE by 1 for their index reference. If a child is moved to an index HIGHER than its current index, all children in between will DECREASE by 1 for their index reference. For example, if the display object container in the previous example is named container, you can swap the position of the display objects labeled a and b by calling the following code:</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>This code results in the following arrangement of objects:</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child The child LDisplayObject instance for which you want to change the index number.
		 * @return {int} The resulting index number for the child display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/setChildIndex.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>表示オブジェクトコンテナの既存の子の位置を変更します。これは、子オブジェクトのレイヤーに影響します。例えば、a、b、c というラベルの 3 個の表示オブジェクトをインデックス位置 0、1、2 にそれぞれ配置すると、以下のようになります。</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>setChildIndex() を使用し、既に占有されているインデックス位置を指定した場合、表示オブジェクトの前の位置と新しい位置の間にある位置だけが変化します。その他は変化しません。現在のインデックスよりも小さいインデックスに子を移動すると、その間のすべての子が、それぞれのインデックス参照について 1 増加します。現在のインデックスよりも大きいインデックスに子を移動すると、その間のすべての子が、それぞれのインデックス参照について 1 減少します。例えば、上記の例の表示オブジェクトコンテナの名前が container である場合、次に示すコードを呼び出すことによって、a および b というラベルが付けられた表示オブジェクトの位置を入れ替えることができます。</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>このコードによって、次に示すようなオブジェクトの配置になります。</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child インデックス番号を変更する子 LDisplayObject インスタンスです。
		 * @return {int} child 表示オブジェクトの結果のインデックス番号です。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/setChildIndex.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setChildIndex : function (child, index) {
			var s = this, c = s.childList, i, l = c.length;
			if (child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l) {
				return -1;
			}
			for (i = 0; i < l; i++) {
				if(c[i].objectIndex == child.objectIndex){
					break;
				}
			}
			s.childList.splice(i,1);
			s.childList.splice(index, 0, child);
			return index;
		},
		resize : function () {
			var s  = this;
			s.width = s.getWidth();
			s.height = s.getHeight();
		},
		removeAllChild : function () {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (LGlobal.destroy && c[i].die) {
					c[i].die();
				}
			}
			s.childList.length = 0;
			s.width = 0;
			s.height = 0;
			s.numChildren = 0;
		},
		/** @language chinese
		 * 返回一个LSprite的克隆对象。
		 * @method clone
		 * @return {LSprite} 一个新的 LSprite 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns a new LSprite object that is a clone of the original instance with an exact copy of the object.
		 * @method clone
		 * @return {LSprite} A new LSprite object that is identical to the original.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 新しい LSprite オブジェクトとして、元のインスタンスのクローンを返します。オブジェクトはまったく同じコピーになります。
		 * @method clone
		 * @return {LSprite} 元のオブジェクトと同一の新しい LSprite オブジェクトです。
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		clone : function () {
			var s = this, a = new LSprite(), c, o, i, l;
			a.copyProperty(s);
			a.graphics = s.graphics.clone();
			a.graphics.parent = a;
			a.childList.length = 0;
			for (i = 0, l = s.childList.length; i < l; i++) {
				c = s.childList[i];
				if (c.clone) {
					o = c.clone();
					o.parent = a;
					a.childList.push(o);
				}
			}
			return a;
		},
		_mevent : function (type) {
			var s = this, k;
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					return true;
				}
			}
			return false;
		},
		ll_dispatchMouseEvent : function (type, e, cd, ox, oy) {
			var s = this;
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					e.selfX = (ox - (s.x * cd.scaleX + cd.x)) / (cd.scaleX * s.scaleX);
					e.selfY = (oy - (s.y * cd.scaleY + cd.y)) / (cd.scaleY * s.scaleY);
					e.currentTarget = e.clickTarget = s;
					if (!e.target) {
						e.target = s;
					}
					o.listener(e, s);
				}
			}
		},
		mouseEvent : function (e, type, cd) {
			if (!e) {
				return false;
			}
			var s = this, i, k, ox = e.offsetX, oy = e.offsetY, on, mc;
			if (!s.mouseEnabled || !s.visible) {
				return false;
			}
			if (cd == null) {
				cd = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			on = s.ismouseon(e, cd);
			if (on) {
				if (type == LMouseEvent.MOUSE_MOVE && !s.ll_mousein) {
					s.ll_mousein = true;
					if (s._mevent(LMouseEvent.MOUSE_OVER)) {
						s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OVER, e, cd, ox, oy);
					}
				}
				if (s.mouseChildren) {
					mc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
					for (k = s.childList.length - 1; k >= 0; k--) {
						if (s.childList[k].mouseEvent) {
							i = s.childList[k].mouseEvent(e, type, mc);
							if (i) {
								e.target = s.childList[k];
								break;
							}
						}
					}
					if (s._mevent(type)) {
						s.ll_dispatchMouseEvent(type, e, cd, ox, oy);
					}
				}
				return true;
			} else {
				if (type == LMouseEvent.MOUSE_MOVE && s.ll_mousein) {
					s.ll_mousein = false;
					if (s._mevent(LMouseEvent.MOUSE_OUT)) {
						s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OUT, e, cd, ox, oy);
					}
				}
			}
			return false;
		},
		/** @language chinese
		 * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
		 * @method hitTestPoint
		 * @param {float} x 要测试的此对象的 x 坐标。
		 * @param {float} y 要测试的此对象的 y 坐标。
		 * @return {Boolean} 如果显示对象与指定的点重叠或相交，则为 true；否则为 false。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	var backLayer;
		 * 	var title;
		 * 	function main(){
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 		title = new LTextField();
		 * 		title.size = 18;
		 * 		title.x = 10;
		 * 		title.y = 5;
		 * 		title.text = "hitTestPoint:false";
		 * 		addChild(title);
		 * 		var layer = new LSprite();
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.graphics.drawRect(0,"#880088",[0,0,100,40],true,"#880088");
		 * 		layer.addShape(LShape.RECT,[0,0,100,40]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 200;
		 * 		layer.y = 100;
		 * 		layer.graphics.drawArc(0,"#880088",[0,0,30,0,2*Math.PI],true,"#880088");
		 * 		layer.addShape(LShape.ARC,[0,0,30]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 120;
		 * 		layer.y = 150;
		 * 		layer.graphics.drawVertices(0,"#880088",[[10,10],[50,100],[100,70]],true,"#880088");
		 * 		layer.addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]]);
		 * 		backLayer.addChild(layer);
		 * 	}
		 * 	function onframe(e){
		 * 		for(var i=0;i<backLayer.childList.length;i++){
		 * 			if(backLayer.childList[i].hitTestPoint(mouseX,mouseY)){
		 * 				title.text = "hitTestPoint:true";
		 * 				return;
		 * 			}
		 * 		}
		 * 		title.text = "hitTestPoint:false";
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/hitTestPoint.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Evaluates the display object to see if it overlaps or intersects with the point specified by the x and y parameters. The x and y parameters specify a point in the coordinate space of the Stage, not the display object container that contains the display object (unless that display object container is the Stage).
		 * @method hitTestPoint
		 * @param {float} x The x coordinate to test against this object.
		 * @param {float} y The y coordinate to test against this object.
		 * @return {Boolean} true if the display object overlaps or intersects with the specified point; false otherwise.
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	var backLayer;
		 * 	var title;
		 * 	function main(){
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 		title = new LTextField();
		 * 		title.size = 18;
		 * 		title.x = 10;
		 * 		title.y = 5;
		 * 		title.text = "hitTestPoint:false";
		 * 		addChild(title);
		 * 		var layer = new LSprite();
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.graphics.drawRect(0,"#880088",[0,0,100,40],true,"#880088");
		 * 		layer.addShape(LShape.RECT,[0,0,100,40]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 200;
		 * 		layer.y = 100;
		 * 		layer.graphics.drawArc(0,"#880088",[0,0,30,0,2*Math.PI],true,"#880088");
		 * 		layer.addShape(LShape.ARC,[0,0,30]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 120;
		 * 		layer.y = 150;
		 * 		layer.graphics.drawVertices(0,"#880088",[[10,10],[50,100],[100,70]],true,"#880088");
		 * 		layer.addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]]);
		 * 		backLayer.addChild(layer);
		 * 	}
		 * 	function onframe(e){
		 * 		for(var i=0;i<backLayer.childList.length;i++){
		 * 			if(backLayer.childList[i].hitTestPoint(mouseX,mouseY)){
		 * 				title.text = "hitTestPoint:true";
		 * 				return;
		 * 			}
		 * 		}
		 * 		title.text = "hitTestPoint:false";
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/hitTestPoint.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトを評価して、x および y パラメーターで指定されたポイントと重複または交差するかどうかを調べます。x および y パラメーターは、表示オブジェクトが含まれる表示オブジェクトコンテナではなく Stage の座標空間内のポイントを指定します（その表示オブジェクトコンテナが Stage の場合を除く）。
		 * @method hitTestPoint
		 * @param {float} x このオブジェクトの検査の基準となる x 座標です。
		 * @param {float} y このオブジェクトの検査の基準となる y 座標です。
		 * @return {Boolean} 指定されたポイントと表示オブジェクトが重複または交差する場合は true、そうでなければ false です。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	var backLayer;
		 * 	var title;
		 * 	function main(){
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 		title = new LTextField();
		 * 		title.size = 18;
		 * 		title.x = 10;
		 * 		title.y = 5;
		 * 		title.text = "hitTestPoint:false";
		 * 		addChild(title);
		 * 		var layer = new LSprite();
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.graphics.drawRect(0,"#880088",[0,0,100,40],true,"#880088");
		 * 		layer.addShape(LShape.RECT,[0,0,100,40]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 200;
		 * 		layer.y = 100;
		 * 		layer.graphics.drawArc(0,"#880088",[0,0,30,0,2*Math.PI],true,"#880088");
		 * 		layer.addShape(LShape.ARC,[0,0,30]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 120;
		 * 		layer.y = 150;
		 * 		layer.graphics.drawVertices(0,"#880088",[[10,10],[50,100],[100,70]],true,"#880088");
		 * 		layer.addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]]);
		 * 		backLayer.addChild(layer);
		 * 	}
		 * 	function onframe(e){
		 * 		for(var i=0;i<backLayer.childList.length;i++){
		 * 			if(backLayer.childList[i].hitTestPoint(mouseX,mouseY)){
		 * 				title.text = "hitTestPoint:true";
		 * 				return;
		 * 			}
		 * 		}
		 * 		title.text = "hitTestPoint:false";
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/hitTestPoint.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		hitTestPoint : function (x, y) {
			var s = this, shapes = s.shapes;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			return s.ismouseonShapes(shapes, x, y);
		},
		/** @language chinese
		 * 计算显示对象的边框，以确定它是否与 obj 显示对象的边框重叠或相交。
		 * @method hitTestObject
		 * @param {LDisplayObject} obj 要测试的显示对象。
		 * @return {Boolean} 如果显示对象的边框相交，则为 true；否则为 false。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = new LSprite();
		 * 	circle2.x = 120;
		 * 	circle2.graphics.drawRect(1,"#FF0000",[0,0,100,100],true,"#FF0000");
		 * 	var circle3 = new LSprite();
		 * 	circle3.x = 60;
		 * 	circle3.y = 60;
		 * 	circle3.graphics.drawRect(1,"#008800",[0,0,100,100],true,"#008800");
		 * 	container.addChild(circle1);
		 * 	container.addChild(circle2);
		 * 	container.addChild(circle3);
		 * 	trace(circle1.hitTestObject(circle2));//false
		 * 	trace(circle1.hitTestObject(circle3));//true
		 * 	trace(circle2.hitTestObject(circle3));//true
		 * @examplelink <p><a href="../../../api/LSprite/hitTestObject.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Evaluates the bounding box of the display object to see if it overlaps or intersects with the bounding box of the obj display object.
		 * @method hitTestObject
		 * @param {LDisplayObject} obj The display object to test against.
		 * @return {Boolean} true if the bounding boxes of the display objects intersect; false if not.
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = new LSprite();
		 * 	circle2.x = 120;
		 * 	circle2.graphics.drawRect(1,"#FF0000",[0,0,100,100],true,"#FF0000");
		 * 	var circle3 = new LSprite();
		 * 	circle3.x = 60;
		 * 	circle3.y = 60;
		 * 	circle3.graphics.drawRect(1,"#008800",[0,0,100,100],true,"#008800");
		 * 	container.addChild(circle1);
		 * 	container.addChild(circle2);
		 * 	container.addChild(circle3);
		 * 	trace(circle1.hitTestObject(circle2));//false
		 * 	trace(circle1.hitTestObject(circle3));//true
		 * 	trace(circle2.hitTestObject(circle3));//true
		 * @examplelink <p><a href="../../../api/LSprite/hitTestObject.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの境界ボックスを評価して、obj 表示オブジェクトの境界ボックスと重複または交差するかどうかを調べます。
		 * @method hitTestObject
		 * @param {LDisplayObject} obj 検査の対象となる表示オブジェクトです。
		 * @return {Boolean} 表示オブジェクトの境界ボックスが交差する場合は true を返します。交差しない場合は false を返します。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = new LSprite();
		 * 	circle2.x = 120;
		 * 	circle2.graphics.drawRect(1,"#FF0000",[0,0,100,100],true,"#FF0000");
		 * 	var circle3 = new LSprite();
		 * 	circle3.x = 60;
		 * 	circle3.y = 60;
		 * 	circle3.graphics.drawRect(1,"#008800",[0,0,100,100],true,"#008800");
		 * 	container.addChild(circle1);
		 * 	container.addChild(circle2);
		 * 	container.addChild(circle3);
		 * 	trace(circle1.hitTestObject(circle2));//false
		 * 	trace(circle1.hitTestObject(circle3));//true
		 * 	trace(circle2.hitTestObject(circle3));//true
		 * @examplelink <p><a href="../../../api/LSprite/hitTestObject.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		hitTestObject : function (obj) {
			var s = this, shapes = s.shapes, shapes1 = obj.shapes, m, m1, j, child, j1, child1, vo1, v1;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			if (!shapes1 || shapes1.length == 0) {
				obj.getWidth();
				obj.getHeight();
				shapes1 = [{"type" : LShape.RECT, "arg" : [obj.ll_left - obj.x, obj.ll_top - obj.y, obj.ll_right - obj.ll_left, obj.ll_bottom - obj.ll_top]}];
			}
			m = s.getRootMatrix();
			m1 = obj.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				v1 = s._changeShape(child.type, child.arg, m);
				for (j1 = shapes1.length - 1; j1 >= 0; j1--) {
					child1 = shapes1[j1];
					vo1 = obj._changeShape(child1.type, child1.arg, m1);
					if (child.type == LShape.VERTICES || child.type == LShape.RECT) {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygon(v1, vo1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if(LGlobal.hitTestPolygonArc(v1, vo1)) {
								return true;
							}
						}
					} else {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygonArc(vo1, v1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if (Math.sqrt((v1[0] - vo1[0]) * (v1[0] - vo1[0]) + (v1[1] - vo1[1]) * (v1[1] - vo1[1])) < v1[2] + vo1[2]) {
								return true;
							}
						}
					}
				}
			}
			return false;
		},
		addShape : function (type, arg) {
			var s = this;
			if (type == LShape.VERTICES && arg.length < 3) {
				return;
			}
			s.shapes.push({"type" : type, "arg" : arg});
		},
		clearShape : function () {
			var s = this;
			s.shapes.length = 0;
		},
		ll_debugShape : function () {
			var s = this, i, l, child, c, arg, j, ll;
			if (!LGlobal.traceDebug || s.shapes.length == 0) {
				return;
			}
			for (i = 0, l = s.shapes.length; i < l; i++) {
				child = s.shapes[i];
				c = LGlobal.canvas;
				arg = child.arg;
				c.beginPath();
				if (child.type == LShape.RECT) {
					c.rect(arg[0], arg[1], arg[2], arg[3]);
				}else if (child.type == LShape.ARC) {
					c.arc(arg[0], arg[1], arg[2], 0, 2*Math.PI);
				}else if (child.type == LShape.VERTICES) {
					c.moveTo(arg[0][0], arg[0][1]);
					for (j = 1, ll = arg.length; j < ll; j++) {
						c.lineTo(arg[j][0], arg[j][1]);
					};
					c.lineTo(arg[0][0], arg[0][1]);
				}
				c.closePath();
				c.strokeStyle = "#00FF00";
				c.stroke();
			}
		},
		ismouseon : function (e, cd) {
			var s = this;
			if (!s.visible || e==null) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			if(s.shapes && s.shapes.length > 0){
				return s.ismouseonShapes(s.shapes, e.offsetX, e.offsetY);
			}
			var k, i = false, l = s.childList, sc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
			if (s.graphics) {
				i = s.graphics.ismouseon(e, sc);
			}
			if (!i) {
				for (k = l.length - 1; k >= 0; k--) {
					if (l[k].ismouseon) {
						i = l[k].ismouseon(e, sc);
					}
					if (i) {
						e.target = s.childList[k];
						break;
					}
				}
			}
			return i;
		},
		die : function () {
			var s = this, i, c, l;
			s.graphics.clear();
			s.removeAllEventListener();
			s.stopDrag();
			if (s.box2dBody) {
				s.clearBody();
			}
			for (i = 0, c = s.childList, l = c.length; i < l; i++) {
				if (c[i].die) {
					c[i].die();
				}
			}
		}
	};
	for (var k in p) {
		LSprite.prototype[k] = p[k];
	}
	return LSprite;
})();