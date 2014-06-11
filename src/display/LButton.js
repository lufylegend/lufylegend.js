/** @language chinese
 * 使用 LButton 类，您可以控制按钮元件的所有实例。
 * @class LButton
 * @extends LSprite
 * @constructor
 * @param {LDisplayObject} upState LButton 弹起状态的初始值。
 * @param {LDisplayObject} overState LButton 经过状态的初始值。
 * @param {LDisplayObject} upState LButton 按下状态的初始值。
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
 * @param {LDisplayObject} upState The initial value for the LButton down state.
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
 * @param {LDisplayObject} upState LButton のダウン状態用の初期値です。
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
		s.type = "LButton";
		s.buttonMode = true;
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
		s.overState.visible = false;
		s.downState.visible = false;
		s.upState.visible = true;
		s.staticMode = false;
		s.setState(LButton.STATE_ENABLE);
		if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE]) {
			LMouseEventContainer.pushButton(s);
		}
		s.addEventListener(LMouseEvent.MOUSE_DOWN, s.ll_modeDown);
	}
	LButton.STATE_DISABLE = "disable";
	LButton.STATE_ENABLE = "enable";
	var p = {
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
			e.clickTarget=this;
			this.ll_modeOut(e);
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
				s.tween = LTweenLite.to(s.downState, 0.3, {x : tx, y : ty, scaleX : 1.1, scaleY : 1.1, ease : Quart.easeOut})
				.to(s.downState, 0.1, {x : x, y : y, scaleX : 1, scaleY : 1, ease : Quart.easeOut,onComplete : onComplete});
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
		},
		clone : function (){
			var s = this;
			return new LButton(s.upState.clone(),s.overState.clone(),s.downState.clone(),s.disableState.clone());
		},
		die : function () {
			var s = this;
			if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE]) {
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