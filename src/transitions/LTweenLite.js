/** @language chinese
 * <p>LTweenLite是比较常用的一个动画库，包含各种缓动效果，使用LTweenLite能够简化动画制作的代码编写工作。</p>
 * @class LTweenLite
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language english
 * <p>LTweenLite is an extremely fast, lightweight, and flexible animation tool that serves as the foundation Animation Platform.</p>
 * @class LTweenLite
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * <p>LTweenLiteはアニメーショントゥイーン用ライブラリです。高速・軽量がウリなんです。</p>
 * @class LTweenLite
 * @constructor
 * @since 1.0.0
 * @public
 */
var LTweenLite = (function () {
	function LTweenLiteChild ($target, $duration, $vars) {
		var s = this;
		s.objectIndex = s.objectindex = ++LGlobal.objectIndex;
		s.toNew = [];
		s.init($target, $duration, $vars);
	}
	LTweenLiteChild.prototype = {
		init : function($target, $duration, $vars) {
			var s = this, k = null;
			s.target = $target;
			s.duration = $duration || 0.001;
			s.vars = $vars;
			s.currentTime = (new Date()).getTime() / 1000;
			s.delay = s.vars.delay || 0;
			s.combinedTimeScale = s.vars.timeScale || 1;
			s.active = s.duration == 0 && s.delay == 0;
			s.varsto = {};
			s.varsfrom = {};
			if (typeof(s.vars.ease) != "function") {
				s.vars.ease = LEasing.None.easeIn;
			}
			s.ease = s.vars.ease;
			delete s.vars.ease;
			if (s.vars.onComplete) {
				s.onComplete = s.vars.onComplete;
				delete s.vars.onComplete;
			}
			if (s.vars.onUpdate) {
				s.onUpdate = s.vars.onUpdate;
				delete s.vars.onUpdate;
			}
			if (s.vars.onStart) {
				s.onStart = s.vars.onStart;
				delete s.vars.onStart;
			}
			for (k in s.vars) {
				s.varsto[k] = s.vars[k];
				s.varsfrom[k] = s.target[k];
			}
			s.initTime = s.currentTime;
			s.startTime = s.initTime + s.delay;
		},
		tween : function () {
			var s = this, time = (new Date()).getTime() / 1000, etime, tweentype;
			etime = (time - s.startTime);
			if (etime < 0) {
				return;
			}
			for (tweentype in s.varsto) {
				var v = s.ease(etime, s.varsfrom[tweentype], s.varsto[tweentype] - s.varsfrom[tweentype], s.duration);
				s.target[tweentype] = v;
			}
			if (s.onStart) {
				s.onStart(s.target);
				delete s.onStart;
			}
			if (etime >= s.duration) {
				for (tweentype in s.varsto) {
					s.target[tweentype] = s.varsto[tweentype];
				}
				if (s.onComplete) {
					s.onComplete(s.target);
				}
				return true;
			} else if (s.onUpdate) {
				s.onUpdate(s.target);
			}
			return false;
		},
		to : function ($target, $duration, $vars) {
			var s = this;
			s.toNew.push({target : $target, duration : $duration, vars : $vars});
			return s;
		},
		keep : function () {
			var s = this, t, vs, k;
			if (s.toNew.length > 0) {
				t = s.toNew.shift();
				if (t.vars.loop) {
					s.loop = true;
				}
				if (s.loop) {
					vs = {};
					for (k in t.vars) {
						vs[k] = t.vars[k];
					}
					s.to(t.target, t.duration, vs);
				}
				s.init(t.target, t.duration, t.vars);
				return true;
			}
			return false;
		}
	};
	function LTweenLite () {
		
	}
	LTweenLite.prototype = {
		tweens : [],
		ll_show : null,
		frame : function(){
			var s = this;
			var i, length = s.tweens.length, t;
			for (i = 0; i < length; i++) {
				t = s.tweens[i];
				if (t && t.tween && t.tween()) {
					s.tweens.splice(i, 1);
					i--;
					length = s.tweens.length;
					if (t.keep()) {
						s.add(t);
					}
				}
			}
			if (s.tweens.length == 0) {
				s.ll_show = null;
			}
		},
		/** @language chinese
		 * ［静态方法］用于创建一个LTweenLiteChild实例动画，让某对象的某些属性缓动到指定的目标的值（从当前值）。
		 * @method to
		 * @param {Object} target 要缓动的对象(这里注意类型是Object,并不仅仅是LSprite,LBitmap).
		 * @param {float} duration 持续的时间(单位是秒)
		 * @param {Object} vars <p>一个Object,包含你想要缓动的所有属性，比如 onComplete, ease, etc。举例, 将一个 对象mc.x 缓动到 100 ，将 mc.y 缓动到 200 ，缓动结束后执行一个函数 myFunction, 这时候，你可以这么写: TweenLite.to(mc, 1, {x:100, y:200, onComplete:myFunction});</p>
		 * <p>除了使用对象的属性之外，你也可以使用一些特殊的值:</p>
		 * <table>
		 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
		 * <tr><td>delay</td><td>float</td><td>延时几秒后开始缓动，这在有先后顺序的缓动效果中很有用</td></tr>
		 * <tr><td>ease</td><td>LEasing (or Function)</td><td>应用在variables上的缓动函数，比如LEasing.Quad.easeIn or LEasing.Cubic.easeOut。默认值是LEasing.None.easeIn.</td></tr>
		 * <tr><td>onComplete</td><td>Function</td><td>在缓动效果结束时触发此方法</td></tr>
		 * <tr><td>onStart</td><td>Function</td><td>在缓动开始时触发此方法.</td></tr>
		 * <tr><td>onUpdate</td><td>Function</td><td>当属性值发生改变时(缓动进行中的每一帧，每一秒)触发此方法</td></tr>
		 * <tr><td>loop</td><td>Boolean</td><td>如果设定为 true, 缓动就会持续循环.</td></tr>
		 * </table>
		 * @return {LTweenLiteChild} 一个LTweenLiteChild的实例
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
		 * Static method for creating a LTweenLiteChild instance that animates to the specified destination values (from the current values).
		 * @method to
		 * @param {Object} target Target object (or array of objects) whose properties this tween affects.
		 * @param {float} duration Duration in seconds (or frames if useFrames:true is set in the vars parameter).
		 * @param {Object} vars <p>An object defining the end value for each property that should be tweened as well as any special properties like onComplete, ease, etc. For example, to tween mc.x to 100 and mc.y to 200 and then call myFunction, do this: TweenLite.to(mc, 1, {x:100, y:200, onComplete:myFunction});</p>
		 * <p>Typically the vars parameter is used to define ending values for tweening properties of the target like {x:100, y:200, alpha:0}, but the following optional special properties serve other purposes:</p>
		 * <table>
		 * <tr><th>Property</th><th>Type</th><th>Explanation</th></tr>
		 * <tr><td>delay</td><td>float</td><td>Amount of delay in seconds (or frames for frames-based tweens) before the tween should begin.</td></tr>
		 * <tr><td>ease</td><td>LEasing</td><td>LEasing (or Function) - You can choose from various eases to control the rate of change during the animation, giving it a specific "feel". For example, LEasing.Quad.easeIn or LEasing.Cubic.easeOut. For best performance, use one of the eases. The default is LEasing.None.easeIn.</td></tr>
		 * <tr><td>onComplete</td><td>Function</td><td>A function that should be called when the tween has completed</td></tr>
		 * <tr><td>onStart</td><td>Function</td><td>A function that should be called when the tween begins (when its time changes from 0 to some other value which can happen more than once if the tween is restarted multiple times).</td></tr>
		 * <tr><td>onUpdate</td><td>Function</td><td>A function that should be called every time the tween updates (on every frame while the tween is active)</td></tr>
		 * <tr><td>loop</td><td>Boolean</td><td>If true, the tween will loop when it reaches the end. Can be set via the props param.</td></tr>
		 * </table>
		 * @return {LTweenLiteChild} LTweenLiteChild instance
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
		 * [静的]新しい LTweenLiteChild インスタンスを作成して，指定したオブジェクトのある属性を指定した値に変更する。
		 * @method to
		 * @param {Object} target トゥイーンするオブジェクト
		 * @param {float} duration 時間
		 * @param {Object} vars <p>パラメータ。 x,y,onComplete, easeなど. 例えば, オブジェクト mc.x を 100にトゥイーンする 、mc.y　を 200にトゥイーンする 、トゥイーンが終わったら myFunction関数を呼び出す, やり方は: TweenLite.to(mc, 1, {x:100, y:200, onComplete:myFunction});</p>
		 * <p>オブジェクトの属性以外は、下記の特別な値も使えます:</p>
		 * <table>
		 * <tr><th>属性</th><th>タイプ</th><th>説明</th></tr>
		 * <tr><td>delay</td><td>float</td><td>遅延（単位：秒）</td></tr>
		 * <tr><td>ease</td><td>LEasing (or Function)</td><td>トゥイーンの効果，例えばLEasing.Quad.easeIn や LEasing.Cubic.easeOutなど。ディフォルト値はLEasing.None.easeInです。</td></tr>
		 * <tr><td>onComplete</td><td>Function</td><td>トゥイーンが終わったら、呼び出す関数</td></tr>
		 * <tr><td>onStart</td><td>Function</td><td>トゥイーンがスタートする時、呼び出す関数</td></tr>
		 * <tr><td>onUpdate</td><td>Function</td><td>トゥイーン中、呼び出す関数</td></tr>
		 * <tr><td>loop</td><td>Boolean</td><td>trueを設定したら、トゥイーンはループします</td></tr>
		 * </table>
		 * @return {LTweenLiteChild} LTweenLiteChild instance
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
		to : function ($target, $duration, $vars) {
			if (!$target) {
				return;
			}
			var s = this;
			var tween = new LTweenLiteChild({}, 0, {});
			s.tweens.push(tween);
			s.ll_show = s.frame;
			tween.to($target, $duration, $vars);
			return tween;
		},
		add : function (tween) {
			this.tweens.push(tween);
		},
		remove : function (tween) {
			var s = this;
			if (typeof tween == UNDEFINED) {
				return;
			}
			for (i = 0, l = s.tweens.length; i < l; i++) {
				if (tween.objectIndex == s.tweens[i].objectIndex) {
					s.tweens.splice(i, 1);
					break;
				}
			}
		},
		removeAll : function () {
			this.tweens.splice(0, this.tweens.length);
		}
	};
	var tween = new LTweenLite();
	LGlobal.childList.push(tween);
	return tween;
})();