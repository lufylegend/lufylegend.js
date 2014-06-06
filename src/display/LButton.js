/** @language chinese
 * 创建一个新的 LButton 实例。
 * @class LButton
 * @extends LSprite
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var layer = new LSprite();
 * 		addChild(layer);
 * 		
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer.addChild(bm);
 * 	}
 * @examplelink <p><a href="../../../api/LButton/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Creates a new LButton instance.
 * @class LButton
 * @extends LSprite
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var layer = new LSprite();
 * 		addChild(layer);
 * 		
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer.addChild(bm);
 * 	}
 * @examplelink <p><a href="../../../api/LButton/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 新しい LButton インスタンスを作成します。
 * @class LButton
 * @extends LSprite
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var layer = new LSprite();
 * 		addChild(layer);
 * 		
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer.addChild(bm);
 * 	}
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
		s.addEventListener(LMouseEvent.MOUSE_OVER, s.ll_modeOver);
		s.addEventListener(LMouseEvent.MOUSE_OUT, s.ll_modeOut);
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
			} else if (state == LButton.STATE_ENABLE) {
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = false;
				s.upState.visible = true;
			} else {
				return;
			}
			s.state = state;
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
		}
	};
	for (var k in p) {
		LButton.prototype[k] = p[k];
	}
	return LButton;
})();