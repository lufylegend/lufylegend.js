var LTweenLiteTimeline;
var LTweenLite = (function () {
	/** @language chinese
	 * <p>LTweenLite用来控制动画的一个单位。</p>
	 * @class LTweenLiteChild
	 * @constructor
	 * @since 1.4.0
	 * @public
	 */
	function LTweenLiteChild ($target, $duration, $vars) {
		var s = this;
		LExtends (s, LObject, []);
		s.type = "LTweenLiteChild";
		s.toNew = [];
		s.init($target, $duration, $vars);
	}
	var p = {
		init : function($target, $duration, $vars) {
			var s = this, k = null;
			if (typeof $vars["tweenTimeline"] == UNDEFINED) {
				$vars["tweenTimeline"] = LTweenLite.TYPE_FRAME;
			}
			s.target = $target;
			s.duration = $duration || 0.001;
			s.vars = $vars;
			s.delay = s.vars.delay || 0;
			if(s.vars["tweenTimeline"] == LTweenLite.TYPE_TIMER){
				s.currentTime = (new Date()).getTime() / 1000;
				s.initTime = s.currentTime;
				s.startTime = s.initTime + s.delay;
			}else{
				s.currentTime = 0;
				s.duration *= 1000;
				s.currentTime -= s.delay * 1000;
			}
			s.combinedTimeScale = s.vars.timeScale || 1;
			s.active = s.duration == 0 && s.delay == 0;
			s.varsto = {};
			s.varsfrom = {};
			s.varsDiff = {};
			s.varsListIndex = {};
			s.varsListCurr = {};
			s.varsListTo = {};
			s.varsListLength = {};
			s.stop = false;
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
				if (k == "coordinate" && Array.isArray(s.vars[k])) {
					var diff = 0, curr = {x:s.target.x,y:s.target.y};
					for (var i = 0, l = s.vars[k].length; i < l; i++) {
						var p = s.vars[k][i];
						diff += LPoint.distance(p,curr);
						curr = p;
					}
					s.varsListIndex[k] = 0;
					s.varsListCurr[k] = 0;
					s.varsListTo[k] = diff;
					s.varsto[k] = s.vars[k];
					s.varsfrom[k] = {x:s.target.x,y:s.target.y};
					continue;
				} else if (typeof s.vars[k] != "number") {
					continue;
				}
				s.varsto[k] = s.vars[k];
				s.varsfrom[k] = s.target[k];
				s.varsDiff[k] = s.vars[k] - s.target[k];
			}
		},
		/** @language chinese
		 * 将动画暂停。
		 * @method pause
		 * @example
		 * 	var tween = LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut,tweenTimeline:LTweenLite.TYPE_FRAME})
		 * 	.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 	tween.pause();
		 * @examplelink <p><a href="../../../api/LTweenLite/pause_resume.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.9.1
		 */
		pause : function () {
			this.stop = true;
		},
		/** @language chinese
		 * 将暂停的动画重新播放。
		 * @method resume
		 * @example
		 * 	var tween = LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut,tweenTimeline:LTweenLite.TYPE_FRAME})
		 * 	.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 	tween.pause();
		 * 	tween.resume();
		 * @examplelink <p><a href="../../../api/LTweenLite/pause_resume.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.9.1
		 */
		resume : function () {
			this.stop = false;
		},
		tween : function () {
			var s = this, tweentype;
			var type_timer = (s.vars["tweenTimeline"] == LTweenLite.TYPE_TIMER);
			if (type_timer) {
				var time = (new Date()).getTime() / 1000, etime = time - s.startTime;
				if (etime < 0) {
					return;
				}
			} else {
				if (s.stop) {
					return;
				}
				s.currentTime += LGlobal.speed;
				if (s.currentTime < 0) {
					return;
				}
			}
			for (k in s.varsto) {
				if (typeof s.varsListTo[k] != UNDEFINED){
					var curr = s.ease(type_timer ? etime : s.currentTime, 0, s.varsListTo[k], s.duration);
					if(curr > s.varsListTo[k]){
						curr = s.varsListTo[k];
					}
					var c = s.varsListIndex[k] > 0 ? s.vars[k][s.varsListIndex[k] - 1] : s.varsfrom[k];
					var v = s.vars[k][s.varsListIndex[k]];
					var d = LPoint.distance(c,v);
					while(s.varsListCurr[k] + d < curr){
						s.varsListCurr[k] += d;
						c = v;
						s.varsListIndex[k]++;
						v = s.vars[k][s.varsListIndex[k]];
						d = LPoint.distance(c,v);
					}
					s.target.x = c.x;
					s.target.y = c.y;
					if(d != 0 && v.x - c.x != 0){
						s.target.x += (v.x - c.x)*(curr - s.varsListCurr[k])/d;
					}
					if(d != 0 && v.y - c.y != 0){
						s.target.y += (v.y - c.y)*(curr - s.varsListCurr[k])/d;
					}
					continue;
				}
				s.target[k] = s.ease(type_timer ? etime : s.currentTime, s.varsfrom[k], s.varsDiff[k], s.duration);
			}
			if (s.onStart) {
				s._dispatchEvent(s.onStart);
				delete s.onStart;
			}
			var e;
			if (type_timer) {
				e = (etime >= s.duration);
			} else {
				e = (s.currentTime >= s.duration);
			}
			if (e) {
				for (tweentype in s.varsto) {
					if (typeof s.varsListTo[tweentype] != UNDEFINED){
						var p = s.varsto[tweentype][s.vars[tweentype].length - 1];
						s.target.x = p.x;
						s.target.y = p.y;
						continue;
					}
					s.target[tweentype] = s.varsto[tweentype];
				}
				if (s.onComplete) {
					s._dispatchEvent(s.onComplete);
				}
				return true;
			} else if (s.onUpdate) {
				s._dispatchEvent(s.onUpdate);
			}
			return false;
		},
		_dispatchEvent : function (f) {
			var s = this;
			s.target.target = s.target;
			s.target.currentTarget = s;
			f(s.target);
			delete s.target.currentTarget;
			delete s.target.target;
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
	for (var k in p) {
		LTweenLiteChild.prototype[k] = p[k];
	}
	/** @language chinese
	 * <p>LTweenLite是比较常用的一个动画库，包含各种缓动效果，使用LTweenLite能够简化动画制作的代码编写工作。</p>
	 * @class LTweenLite
	 * @constructor
	 * @since 1.4.0
	 * @public
	 */
	/** @language english
	 * <p>LTweenLite is an extremely fast, lightweight, and flexible animation tool that serves as the foundation Animation Platform.</p>
	 * @class LTweenLite
	 * @constructor
	 * @since 1.4.0
	 * @public
	 */
	/** @language japanese
	 * <p>LTweenLiteはアニメーショントゥイーン用ライブラリです。高速・軽量がウリなんです。</p>
	 * @class LTweenLite
	 * @constructor
	 * @since 1.4.0
	 * @public
	 */
	function LTweenLite () {
		var s = this;
		LExtends (s, LObject, []);
		s.type = "LTweenLite";
		s.tweens = [];
	}
	LTweenLite.TYPE_FRAME = "type_frame";
	LTweenLite.TYPE_TIMER = "type_timer";
	p = {
		count : function(){
			return this.tweens.length;
		},
		ll_show : function(){
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
		},
		/** @language chinese
		 * ［静态方法］用于创建一个LTweenLiteChild实例动画，让某对象的某些属性缓动到指定的目标的值（从当前值）。
		 * @method LTweenLite.to
		 * @static
		 * @param {Object} target 要缓动的对象(这里注意类型是Object,并不仅仅是LSprite,LBitmap).
		 * @param {float} duration 持续的时间(单位是秒)
		 * @param {Object} vars <p>一个Object,包含你想要缓动的所有属性，比如 onComplete, ease, etc。举例, 将一个 对象mc.x 缓动到 100 ，将 mc.y 缓动到 200 ，缓动结束后执行一个函数 myFunction, 这时候，你可以这么写: TweenLite.to(mc, 1, {x:100, y:200, onComplete:myFunction});</p>
		 * <p>除了使用对象的属性之外，你也可以使用一些特殊的值:</p>
		 * <table>
		 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
		 * <tr><td>tweenTimeline</td><td>float</td><td><p>动画播放的类型，默认值为LTweenLite.TYPE_FRAME。</p><p>LTweenLite.TYPE_FRAME:用桢来播放动画。</p><p>LTweenLite.TYPE_TIMER：用时间来播放动画。</p><p>为了测试两者的区别，接下来的demo在进行缓动时首先延迟2秒钟，使用LTweenLite.TYPE_FRAME播放是无间断，而使用LTweenLite.TYPE_TIMER播放则会直接跳到结束。<a href="../../../api/LTweenLite/to2.html" target="_blank">测试链接</a></p></td></tr>
		 * <tr><td>delay</td><td>float</td><td>延时几秒后开始缓动，这在有先后顺序的缓动效果中很有用</td></tr>
		 * <tr><td>ease</td><td>LEasing (or Function)</td><td>应用在variables上的缓动函数，比如LEasing.Quad.easeIn or LEasing.Cubic.easeOut。默认值是LEasing.None.easeIn.</td></tr>
		 * <tr><td>onComplete</td><td>Function</td><td>在缓动效果结束时触发此方法。回调函数是有参数的，使用方法同下面的例子。</td></tr>
		 * <tr><td>onStart</td><td>Function</td><td>在缓动开始时触发此方法.回调函数是有参数的，使用方法同下面的例子。</td></tr>
		 * <tr><td>onUpdate</td><td>Function</td><td>当属性值发生改变时(缓动进行中的每一帧，每一秒)触发此方法。回调函数是有参数的，使用方法同下面的例子。</td></tr>
		 * <tr><td>loop</td><td>Boolean</td><td>如果设定为 true, 缓动就会持续循环.</td></tr>
		 * <tr><td>coordinate</td><td>Array</td><td>You can implement a custom path，The Array must be a LPoint Objects, or like the {x:1,y:2}，<a href="../../../api/LTweenLite/toList.html" target="_blank">测试链接</a></td></tr>
		 * </table>
		 * @return {LTweenLiteChild} 一个LTweenLiteChild的实例
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var circle = new LSprite();
		 * 		circle.x = 50;
		 * 		circle.y = 50;
		 * 		circle.graphics.drawArc("#FF0000",1,[0,0,20,0,Math.PI*2],true,"#FF0000");
		 * 		addChild(circle);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 100;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		LTweenLite.to(circle,2,{x:500,y:400,scaleX:3,scaleY:3,ease:LEasing.Strong.easeInOut})
		 * 		.to(circle,2,{x:700,y:50,scaleX:1,scaleY:1,ease:LEasing.Quint.easeIn,onComplete:function(e){
		 * 			trace(e.currentTarget);
		 * 			trace(e.target);//circle
		 * 		}});
		 * 		LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/to.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.4.0
		 */
		/** @language english
		 * Static method for creating a LTweenLiteChild instance that animates to the specified destination values (from the current values).
		 * @method LTweenLite.to
		 * @static
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
		 * <tr><td>coordinate</td><td>Array</td><td>move pathsパスを自由に定義することができます，配列のデータはLPointか{x:1,y:2}のようなオブジェクトになります，<a href="../../../api/LTweenLite/toList.html" target="_blank">Try it »</a></td></tr>
		 * </table>
		 * @return {LTweenLiteChild} LTweenLiteChild instance
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var circle = new LSprite();
		 * 		circle.x = 50;
		 * 		circle.y = 50;
		 * 		circle.graphics.drawArc("#FF0000",1,[0,0,20,0,Math.PI*2],true,"#FF0000");
		 * 		addChild(circle);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 100;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		LTweenLite.to(circle,2,{x:500,y:400,scaleX:3,scaleY:3,ease:LEasing.Strong.easeInOut})
		 * 		.to(circle,2,{x:700,y:50,scaleX:1,scaleY:1,ease:LEasing.Quint.easeIn,onComplete:function(e){
		 * 			trace(e.currentTarget);
		 * 			trace(e.target);
		 * 		}});
		 * 		LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/to.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.4.0
		 */
		/** @language japanese
		 * [静的]新しい LTweenLiteChild インスタンスを作成して，指定したオブジェクトのある属性を指定した値に変更する。
		 * @method LTweenLite.to
		 * @static
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
		 * <tr><td>coordinate</td><td>Array</td><td>移動するパスを自由に定義することができます，配列のデータはLPointか{x:1,y:2}のようなオブジェクトになります，<a href="../../../api/LTweenLite/toList.html" target="_blank">実際のサンプルを見る</a></td></tr>
		 * </table>
		 * @return {LTweenLiteChild} LTweenLiteChild instance
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var circle = new LSprite();
		 * 		circle.x = 50;
		 * 		circle.y = 50;
		 * 		circle.graphics.drawArc("#FF0000",1,[0,0,20,0,Math.PI*2],true,"#FF0000");
		 * 		addChild(circle);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 100;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		LTweenLite.to(circle,2,{x:500,y:400,scaleX:3,scaleY:3,ease:LEasing.Strong.easeInOut})
		 * 		.to(circle,2,{x:700,y:50,scaleX:1,scaleY:1,ease:LEasing.Quint.easeIn,onComplete:function(e){
		 * 			trace(e.currentTarget);
		 * 			trace(e.target);
		 * 		}});
		 * 		LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/to.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.4.0
		 */
		to : function ($target, $duration, $vars) {
			if (!$target) {
				return;
			}
			var s = this;
			var tween = new LTweenLiteChild({}, 0, {});
			s.tweens.push(tween);
			tween.to($target, $duration, $vars);
			return tween;
		},
		add : function (tween) {
			this.tweens.push(tween);
		},
		/** @language chinese
		 * ［静态方法］停止当前的缓动动画。
		 * @method LTweenLite.remove
		 * @static
		 * @param {LTweenLiteChild} tween 当前正在进行缓动的对象.
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var tween;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 50;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		tween = LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 		var stopButton = new LButtonSample1("stop");
		 * 		stopButton.x = 50;
		 * 		circle.y = 50;
		 * 		stopButton.y = 100;
		 * 		addChild(stopButton);
		 * 		stopButton.addEventListener(LMouseEvent.MOUSE_UP,stopTween);
		 * 	}
		 * 	function stopTween(e){
		 * 		LTweenLite.remove(tween);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/remove.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.0
		 */
		/** @language english
		 * Static method to stop a tween affect.
		 * @method LTweenLite.remove
		 * @static
		 * @param {LTweenLiteChild} tween a tween affect.
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var tween;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 50;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		tween = LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 		var stopButton = new LButtonSample1("stop");
		 * 		stopButton.x = 50;
		 * 		circle.y = 50;
		 * 		stopButton.y = 100;
		 * 		addChild(stopButton);
		 * 		stopButton.addEventListener(LMouseEvent.MOUSE_UP,stopTween);
		 * 	}
		 * 	function stopTween(e){
		 * 		LTweenLite.remove(tween);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/remove.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.8.0
		 */
		/** @language japanese
		 * [静的]トゥイーンをストップする。
		 * @method LTweenLite.remove
		 * @static
		 * @param {LTweenLiteChild} tween トゥイーン中のオブジェクト.
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var tween;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 50;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		tween = LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 		var stopButton = new LButtonSample1("stop");
		 * 		stopButton.x = 50;
		 * 		circle.y = 50;
		 * 		stopButton.y = 100;
		 * 		addChild(stopButton);
		 * 		stopButton.addEventListener(LMouseEvent.MOUSE_UP,stopTween);
		 * 	}
		 * 	function stopTween(e){
		 * 		LTweenLite.remove(tween);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/remove.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.8.0
		 */
		remove : function (tween) {
			var s = this;
			if (typeof tween == UNDEFINED) {
				return;
			}
			for (var i = 0, l = s.tweens.length; i < l; i++) {
				if (tween.objectIndex == s.tweens[i].objectIndex) {
					s.tweens.splice(i, 1);
					break;
				}
			}
		},
		/** @language chinese
		 * ［静态方法］停止所有正在进行的缓动动画。
		 * @method LTweenLite.removeAll
		 * @static
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var circle = new LSprite();
		 * 		circle.x = 50;
		 * 		circle.y = 50;
		 * 		circle.graphics.drawArc("#FF0000",1,[0,0,20,0,Math.PI*2],true,"#FF0000");
		 * 		addChild(circle);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 50;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		LTweenLite.to(circle,1,{x:500,y:400,scaleX:3,scaleY:3,loop:true,ease:LEasing.Strong.easeInOut})
		 * 		.to(circle,1,{x:700,y:50,scaleX:1,scaleY:1,ease:LEasing.Quint.easeIn})
		 * 		.to(circle,1,{x:50,y:50,ease:LEasing.Quint.easeIn});
		 * 		LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 		var stopButton = new LButtonSample1("stopAll");
		 * 		stopButton.x = 50;
		 * 		circle.y = 50;
		 * 		stopButton.y = 100;
		 * 		addChild(stopButton);
		 * 		stopButton.addEventListener(LMouseEvent.MOUSE_UP,stopTween);
		 * 	}
		 * 	function stopTween(e){
		 * 		LTweenLite.removeAll();
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/removeAll.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.0
		 */
		/** @language english
		 * Static method to stop all the tween affects.
		 * @method LTweenLite.removeAll
		 * @static
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var tween;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 50;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		tween = LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 		var stopButton = new LButtonSample1("stop");
		 * 		stopButton.x = 50;
		 * 		circle.y = 50;
		 * 		stopButton.y = 100;
		 * 		addChild(stopButton);
		 * 		stopButton.addEventListener(LMouseEvent.MOUSE_UP,stopTween);
		 * 	}
		 * 	function stopTween(e){
		 * 		LTweenLite.removeAll(tween);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/removeAll.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.8.0
		 */
		/** @language japanese
		 * [静的]全部のトゥイーンをストップする。
		 * @method LTweenLite.removeAll
		 * @static
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var tween;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var rect = new LSprite();
		 * 		rect.x = 50;
		 * 		rect.y = 50;
		 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
		 * 		addChild(rect);
		 * 		tween = LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
		 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
		 * 		var stopButton = new LButtonSample1("stop");
		 * 		stopButton.x = 50;
		 * 		circle.y = 50;
		 * 		stopButton.y = 100;
		 * 		addChild(stopButton);
		 * 		stopButton.addEventListener(LMouseEvent.MOUSE_UP,stopTween);
		 * 	}
		 * 	function stopTween(e){
		 * 		LTweenLite.removeAll(tween);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTweenLite/removeAll.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.8.0
		 */
		removeAll : function () {
			this.tweens.splice(0, this.tweens.length);
		},
		/** @language chinese
		 * ［静态方法］暂停所有正在进行的缓动动画。
		 * @method LTweenLite.pauseAll
		 * @static
		 * @example
		 * 	LTweenLite.pauseAll();
		 * @examplelink <p><a href="../../../api/LTweenLite/pauseAll_resumeAll.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.0
		 */
		pauseAll : function () {
			for(var i = 0, l = this.tweens.length; i < l; i++){
				this.tweens[i].pause();
			}
		},
		/** @language chinese
		 * ［静态方法］重新播放被暂停的所有缓动动画。
		 * @method LTweenLite.resumeAll
		 * @static
		 * @example
		 * 	LTweenLite.pauseAll();
		 * 	LTweenLite.resumeAll();
		 * @examplelink <p><a href="../../../api/LTweenLite/pauseAll_resumeAll.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.0
		 */
		resumeAll : function () {
			for(var i = 0, l = this.tweens.length; i < l; i++){
				this.tweens[i].resume();
			}
		}
	};
	for (var k in p) {
		LTweenLite.prototype[k] = p[k];
	}
	LTweenLiteTimeline = new LTweenLite();
	LGlobal.childList.push(LTweenLiteTimeline);
	var tween = new LTweenLite();
	tween.TYPE_FRAME = LTweenLite.TYPE_FRAME;
	tween.TYPE_TIMER = LTweenLite.TYPE_TIMER;
	LGlobal.childList.push(tween);
	return tween;
})();