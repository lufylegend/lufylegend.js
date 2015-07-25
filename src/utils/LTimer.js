/** @language chinese
 * <p>LTimer 类是计时器的接口，它使您能按指定的时间序列运行代码。使用 start() 方法来启动计时器。为 timer 事件添加事件侦听器，以便将代码设置为按计时器间隔运行。</p>
 * <p>可以创建 LTimer 对象以运行一次或按指定间隔重复运行，从而按计划执行代码。根据 帧速率或运行时环境（可用内存和其他因素），运行时调度事件的间隔可能稍有不同。例如，如果设置为以每秒 10 帧 (fps)（也就是 100 毫秒的间隔）的速度播放，但计时器设置为在 80 毫秒时触发事件，则将按接近于 100 毫秒的间隔触发事件。大量耗费内存的脚本也可能使事件发生偏差。</p>
 * @class LTimer
 * @extends LEventDispatcher
 * @constructor
 * @param {float} delay 计时器事件间的延迟（以毫秒为单位）。建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
 * @param {int} repeatCount 指定重复次数。如果为零，则计时器将持续不断重复运行，最长可运行 24.86 天 (int.MAX_VALUE + 1)。如果不为 0，则将运行计时器，运行次数为指定的次数，然后停止。
 * @since 1.9.11
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var myTimer = new LTimer(1000, 2);
 * 		myTimer.addEventListener(LTimerEvent.TIMER, timerHandler);
 * 		myTimer.start();
 * 	}
 * 	function timerHandler(e){
 * 		trace("timerHandler: " + event);
 * 	}
 * @examplelink <p><a href="../../../api/LTimerEvent/index.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * ......
 * @class LTimer
 * @extends LEventDispatcher
 * @constructor
 * @since 1.9.11
 * @public
 */
/** @language japanese
 * ......
 * @class LTimer
 * @extends LEventDispatcher
 * @constructor
 * @since 1.9.11
 * @public
 */
var LTimer = (function () {
	function LTimer(delay, repeat) {
		var s = this;
		LExtends (s, LEventDispatcher, []);
		s.type = "LTimer";
		/** @language chinese
		 * <p>计时器事件间的延迟（以毫秒为单位）。如果在计时器正在运行时设置延迟间隔，则计时器将按相同的 repeatCount 迭代重新启动。</p>
		 * <p>注意：建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。</p>
		 * @property delay
		 * @type int
		 * @since 1.9.11
		 * @public
		 */
		s.delay = delay;
		/** @language chinese
		 * <p>设置的计时器运行总次数。如果重复计数设置为 0，则计时器将持续不断运行，最长可运行 24.86 天，或直至调用了 stop() 方法或节目停止。如果重复计数不为 0，则将运行计时器，运行次数为指定的次数。如果设置的 repeatCount 总数等于或小于 currentCount，则计时器将停止并且不会再次触发。</p>
		 * @property repeatCount
		 * @type int
		 * @since 1.9.11
		 * @public
		 */
		s.repeatCount = repeat ? repeat : int.MAX_VALUE;
		/** @language chinese
		 * <p>计时器的当前状态；如果计时器正在运行，则为 true，否则为 false。</p>
		 * @property running
		 * @type Boolean
		 * @since 1.9.11
		 * @public
		 */
		s.running = false;
		/** @language chinese
		 * <p>计时器从 0 开始后触发的总次数。如果已重置了计时器，则只会计入重置后的触发次数。</p>
		 * @property currentCount
		 * @type int
		 * @since 1.9.11
		 * @public
		 */
		s.currentCount = 0;
		s.reset();
		LTimer.TimerManager.add(s);
	}
	LTimer.TimerManager = (function(){
		function TimerManager(){
			this.childList = [];
		}
		TimerManager.prototype = {
			ll_show : function(){
				var s = this, d;
				for(var i = 0;i<s.childList.length;i++){
					d = s.childList[i];
					if(d){
						d.ll_show();
					}
				}
			},
			add : function(child){
				this.childList.push(child);
			},
			remove : function(d){
				var s  = this, c = s.childList, i, l;
				for (i = 0, l = c.length; i < l; i++) {
					if (d.objectIndex == c[i].objectIndex) {
						s.childList.splice(i, 1);
						break;
					}
				}
			}
		};
		return new TimerManager();
	})();
	p = {
		/** @language chinese
		 * 如果计时器尚未运行，则启动计时器。
		 * @method start
		 * @since 1.9.11
		 * @public
		 */
		start : function(){
			this.running = true;
		},
		/** @language chinese
		 * 停止计时器。如果在调用 stop() 后调用 start()，则将继续运行计时器实例，运行次数为剩余的 重复次数（由 repeatCount 属性设置）。
		 * @method stop
		 * @since 1.9.11
		 * @public
		 */
		stop : function(){
			this.running = false;
		},
		/** @language chinese
		 * 如果计时器正在运行，则停止计时器，并将 currentCount 属性设回为 0，这类似于秒表的重置按钮。然后，在调用 start() 后，将运行计时器实例，运行次数为指定的重复次数（由 repeatCount 值设置）。
		 * @method reset
		 * @since 1.9.11
		 * @public
		 */
		reset : function(){
			var s = this;
			s.currentTime = 0;
			s.currentCount = 0;
			s.stop();
		},
		/** @language chinese
		 * 释放计时器，计时器释放后将不可以再次使用。
		 * @method destroy
		 * @since 1.9.11
		 * @public
		 */
		destroy : function(){
			LTimer.TimerManager.remove(this);
		},
		ll_show : function(){
			var s = this;
			if(!s.running || s.currentCount >= s.repeatCount){
				return;
			}
			s.currentTime += LGlobal.speed;
			if (s.currentTime < s.delay) {
				return;
			}
			s.currentTime = 0;
			s.currentCount++;
			s.dispatchEvent(LTimerEvent.TIMER);
			if(s.currentCount >= s.repeatCount){
				s.dispatchEvent(LTimerEvent.TIMER_COMPLETE);
			}
		}
	};
	for (var k in p) {
		LTimer.prototype[k] = p[k];
	}
	LGlobal.childList.push(LTimer.TimerManager);
	return LTimer;
})();
/** @language chinese
 * 每当 LTimer 对象达到根据 LTimer.delay 属性指定的间隔时调度。
 * <p><a href="LTimerEvent.html#property_TIMER">LTimerEvent.TIMER</a></p>
 * @event LTimerEvent.TIMER
 */
/** @language chinese
 * 每当它完成 LTimer.repeatCount 设置的请求数后调度。
 * <p><a href="LTimerEvent.html#property_TIMER_COMPLETE">LTimerEvent.TIMER_COMPLETE</a></p>
 * @event LTimerEvent.TIMER_COMPLETE
 */
