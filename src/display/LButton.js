/** @language chinese
 * 使用 LButton 类，您可以控制按钮元件的所有实例。
 * @class LButton
 * @extends LSprite
 * @constructor
 * @param {LDisplayObject} upState LButton 弹起状态的初始值。
 * @param {LDisplayObject} overState LButton 经过状态的初始值。
 * @param {LDisplayObject} downState LButton 按下状态的初始值。
 * @param {LDisplayObject} disableState LButton 不可用状态的初始值。
 * @example
 * 	var bitmapDataUp = new LBitmapData(result["ok_button"],0,0,98,48);
 * 	var bitmapUp = new LBitmap(bitmapDataUp);
 * 	var bitmapDataOver = new LBitmapData(result["ok_button"],0,48,98,48);
 * 	var bitmapOver = new LBitmap(bitmapDataOver);
 * 	var button02 = new LButton(bitmapUp,bitmapOver);
 * 	backLayer.addChild(button02);
 * @examplelink <p><a href="../../../api/LButton/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * The LButton class lets you control all instances of button symbols.
 * @class LButton
 * @extends LSprite
 * @constructor
 * @param {LDisplayObject} upState The initial value for the LButton up state.
 * @param {LDisplayObject} overState The initial value for the LButton over state.
 * @param {LDisplayObject} downState The initial value for the LButton down state.
 * @param {LDisplayObject} disableState The initial value for the LButton disable state.
 * @example
 * 	var bitmapDataUp = new LBitmapData(result["ok_button"],0,0,98,48);
 * 	var bitmapUp = new LBitmap(bitmapDataUp);
 * 	var bitmapDataOver = new LBitmapData(result["ok_button"],0,48,98,48);
 * 	var bitmapOver = new LBitmap(bitmapDataOver);
 * 	var button02 = new LButton(bitmapUp,bitmapOver);
 * 	backLayer.addChild(button02);
 * @examplelink <p><a href="../../../api/LButton/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * LButton クラスを使用すると、ボタンシンボルのすべてのインスタンスを制御することができます。
 * @class LButton
 * @extends LSprite
 * @constructor
 * @param {LDisplayObject} upState LButton のアップ状態用の初期値です。
 * @param {LDisplayObject} overState LButton のオーバー状態用の初期値です。
 * @param {LDisplayObject} downState LButton のダウン状態用の初期値です。
 * @param {LDisplayObject} disableState LButton の不可用状態用の初期値です。
 * @example
 * 	var bitmapDataUp = new LBitmapData(result["ok_button"],0,0,98,48);
 * 	var bitmapUp = new LBitmap(bitmapDataUp);
 * 	var bitmapDataOver = new LBitmapData(result["ok_button"],0,48,98,48);
 * 	var bitmapOver = new LBitmap(bitmapDataOver);
 * 	var button02 = new LButton(bitmapUp,bitmapOver);
 * 	backLayer.addChild(button02);
 * @examplelink <p><a href="../../../api/LButton/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LButton = (function () {
	function LButton (upState, overState, downState, disableState) {
		var s = this;
		LExtends(s, LSprite, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LButton
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * type of the object
		 * @property type
		 * @type String
		 * @default LButton
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのタイプ
		 * @property type
		 * @type String
		 * @default LButton
		 * @since 1.0.0
		 * @public
		 */
		s.type = "LButton";
		s.addChild(upState);
		if (!overState) {
			overState = upState;
		} else {
			s.addChild(overState);
		}
		if (!downState) {
			downState = overState;
		} else {
			s.addChild(downState);
		}
		if (!disableState) {
			disableState = upState;
		} else {
			s.addChild(disableState);
		}
		s.upState = s.bitmap_up = upState;
		s.overState = s.bitmap_over = overState;
		s.downState = downState;
		s.disableState = disableState;
		s._ll_down_sx = s.downState.scaleX;
		s._ll_down_sy = s.downState.scaleY;
		s.overState.visible = false;
		s.downState.visible = false;
		s.upState.visible = true;
		/** @language chinese
		 * 指定此 LButton 的按钮模式。如果为 true，此 sprite 的行为方式就像按钮，这表示它可在指针经过 LButton 时触发显示手形光标(PC)。
		 * @property buttonMode
		 * @type Boolean
		 * @default true
		 * @since 1.8.10
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("buttonMode=true");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("buttonMode=false");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.buttonMode = false;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/buttonMode.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Specifies the button mode of this LButton. If true, this LButton behaves as a button, which means that it triggers the display of the hand cursor when the pointer passes over the LButton(PC).
		 * @property buttonMode
		 * @type Boolean
		 * @default true
		 * @since 1.8.10
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("buttonMode=true");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("buttonMode=false");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.buttonMode = false;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/buttonMode.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このLButtonのボタンモードを指定します。true の場合、このLButtonはボタンとして動作します。この場合(PCのみ)、このLButtonは、ポインターがこのスプライト上を通るとハンドカーソルの表示をトリガーします。
		 * @property buttonMode
		 * @type Boolean
		 * @default true
		 * @since 1.8.10
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("buttonMode=true");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("buttonMode=false");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.buttonMode = false;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/buttonMode.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.buttonMode = true;
		/** @language chinese
		 * LButton对象被点击时，是否使用动画显示。
		 * @property staticMode
		 * @type Boolean
		 * @default false
		 * @since 1.9.0
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("staticMode=false");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("staticMode=true");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.staticMode = true;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/staticMode.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Specifies use a Animation when the button is clicked..
		 * @property staticMode
		 * @type Boolean
		 * @default false
		 * @since 1.9.0
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("staticMode=false");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("staticMode=true");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.staticMode = true;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/staticMode.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このLButtonがクリックされた時、アニメーションを使うかどうか。
		 * @property staticMode
		 * @type Boolean
		 * @default false
		 * @since 1.9.0
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("staticMode=false");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("staticMode=true");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.staticMode = true;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/staticMode.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.staticMode = false;
		s._ll_cursorEnabled = true;
		s.setState(LButton.STATE_ENABLE);
		if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
			LMouseEventContainer.pushButton(s);
		}
		s.addEventListener(LMouseEvent.MOUSE_DOWN, s.ll_modeDown);
	}
	/** @language chinese
	 * [静态] 按钮的不可用状态
	 * @property STATE_DISABLE
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language english
	 * [static] unavailable state
	 * @property STATE_DISABLE
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language japanese
	 * [静的] ボタンの使えない状態
	 * @property STATE_DISABLE
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	LButton.STATE_DISABLE = "disable";
	/** @language chinese
	 * [静态] 按钮的可用状态
	 * @property STATE_ENABLE
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language english
	 * [static] available state
	 * @property STATE_ENABLE
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language japanese
	 * [静的] ボタンの使える状態
	 * @property STATE_ENABLE
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	LButton.STATE_ENABLE = "enable";
	var p = {
		/** @language chinese
		 * 设定按钮是否可用。
		 * @method setState
		 * @param {String} state LButton.STATE_DISABLE | LButton.STATE_ENABLE。
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("LButton.STATE_ENABLE");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("LButton.STATE_DISABLE");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.setState(LButton.STATE_DISABLE);
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/setState.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.9.0
		 */
		/** @language english
		 * Set whether the button is available 
		 * @method setState
		 * @param {String} state LButton.STATE_DISABLE | LButton.STATE_ENABLE。
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("LButton.STATE_ENABLE");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("LButton.STATE_DISABLE");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.setState(LButton.STATE_DISABLE);
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/setState.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.9.0
		 */
		/** @language japanese
		 * ボタンが使えるかどうか設定する
		 * @method setState
		 * @param {String} state LButton.STATE_DISABLE | LButton.STATE_ENABLE。
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("LButton.STATE_ENABLE");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("LButton.STATE_DISABLE");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.setState(LButton.STATE_DISABLE);
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LButton/setState.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.9.0
		 */
		setState : function (state) {
			var s = this;
			if (state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				s.mouseEnabled = false;
			} else if (state == LButton.STATE_ENABLE) {
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = false;
				s.upState.visible = true;
				s.mouseEnabled = true;
			} else {
				return;
			}
			s.state = state;
		},
		ll_mouseout : function (e, type, cd, ox, oy) {
			var s = this;
			if (!s.ll_mousein) {
				return;
			}
			e.clickTarget=s;
			s.ll_modeOut(e);
			s.ll_mousein = false;
		},
		mouseEvent : function (e, type, cd) {
			if (!e) {
				return false;
			}
			var s = this;
			if (type == LMouseEvent.MOUSE_MOVE && s.ll_button_mode) {
				s.ll_button_mode(e);
			}
			return this.callParent("mouseEvent",arguments);
		},
		ll_button_mode : function(e){
			var s = this;
			if (!s.visible) {
				return;
			}
			e.clickTarget=s;
			if(s.hitTestPoint(e.offsetX,e.offsetY)){
				s.ll_modeOver(e);
			}else{
				s.ll_modeOut(e);
			}
		},
		ll_modeDown : function (e) {
			var s = e.clickTarget, w, h, tw, th, x, y, tx, ty, onComplete;
			if (!s.buttonMode || s.tween) {
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.upState.visible = false;
			s.overState.visible = false;
			s.downState.visible = true;	
			s._tweenOver = s.ll_modeOver;
			onComplete = function(obj){
				var s = obj.parent;
				delete s.tween;
				s._tweenOver({clickTarget : s});
				delete s._tweenOver;
			};
			if (s.staticMode) {
				s.tween = LTweenLite.to(s.downState, 0.3, {}).to(s.downState, 0.1, {onComplete : onComplete});
			} else {
				w = s.downState.getWidth();
				h = s.downState.getHeight();
				tw = w * 1.1;
				th = h * 1.1;
				x = s.downState.x;
				y = s.downState.y;
				tx = x + (w - tw) * 0.5;
				ty = y + (h - th) * 0.5;
				s.tween = LTweenLite.to(s.downState, 0.3, {x : tx, y : ty, scaleX : s._ll_down_sx*1.1, scaleY : s._ll_down_sy*1.1, ease : Quart.easeOut})
				.to(s.downState, 0.1, {x : x, y : y, scaleX : s._ll_down_sx, scaleY : s._ll_down_sy, ease : Quart.easeOut,onComplete : onComplete});
			}
		},
		ll_modeOver : function (e) {
			var s = e.clickTarget;
			if (!s.buttonMode) {
				return;
			}
			if (s.tween) {
				s._tweenOver = s.ll_modeOver;
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.upState.visible = false;
			s.downState.visible = false;
			s.overState.visible = true;
			if (LGlobal.os == OS_PC && s._ll_cursorEnabled) {
				document.body.style.cursor = "pointer";
			}
		},
		ll_modeOut : function (e){
			var s = e.clickTarget;
			if (!s.buttonMode) {
				return;
			}
			if (s.tween) {
				s._tweenOver = s.ll_modeOut;
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.overState.visible = false;
			s.downState.visible = false;
			s.upState.visible = true;
			if (LGlobal.os == OS_PC && s._ll_cursorEnabled) {
				document.body.style.cursor = "default";
			}
		},
		setCursorEnabled : function (value) {
			s._ll_cursorEnabled = value;
			if(!value && document.body.style.cursor != "default"){
				document.body.style.cursor = "default";
			}
		},
		clone : function () {
			var s = this;
			return new LButton(s.upState.clone(),s.overState.clone(),s.downState.clone(),s.disableState.clone());
		},
		die : function () {
			var s = this;
			if (LGlobal.os == OS_PC && !s.upState.visible) {
				document.body.style.cursor = "default";
			}
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
				LMouseEventContainer.removeButton(s);
			}
			s.callParent("die",arguments);
		}
	};
	for (var k in p) {
		LButton.prototype[k] = p[k];
	}
	return LButton;
})();