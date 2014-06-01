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
		},
		/** @language chinese
		 * <p>从 LSprite 实例的子列表中删除指定的 child LDisplayObject 实例。将已删除子项的 parent 属性设置为 null；如果不存在对该子项的任何其它引用，则将该对象作为垃圾回收。LSprite 中该子项之上的任何显示对象的索引位置都减去 1。</p>
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
			delete d.parent;
		},
		getChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length == 0 || c.length <= i) {
				return null;
			}
			return c[i];
		},
		removeChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length <= i) {
				return;
			}
			if (LGlobal.destroy && c[i].die) {
				c[i].die();
			}
			s.childList.splice(i, 1);
		},
		getChildIndex : function (child) {
			var s = this, c = s.childList, i, l = c.length;
			for (i = 0; i < l; i++) {
				if (c[i].objectIndex == child.objectIndex) {
					return i;
				}
			}
			return -1;
		},
		setChildIndex : function (child, index) {
			var s = this, c = s.childList, i, l = c.length;
			if (child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l) {
				return;
			}
			for (i = 0; i < l; i++) {
				if(c[i].objectIndex == child.objectIndex){
					break;
				}
			}
			s.childList.splice(i,1);
			s.childList.splice(index, 0, child);
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
		},
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
					e.target = e.clickTarget = s;
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
		hitTestPoint : function (x, y) {
			var s = this, shapes = s.shapes;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			return s.ismouseonShapes(shapes, x, y);
		},
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
				for (j1 = obj.shapes.length - 1; j1 >= 0; j1--) {
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