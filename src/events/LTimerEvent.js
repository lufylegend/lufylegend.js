/** @language chinese
 * <p>每当 LTimer 对象达到由 LTimer.delay 属性指定的间隔时，LTimer 对象即会调度 LTimerEvent 对象。</p>
 * @class LTimerEvent
 * @constructor
 * @since 1.9.0
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
 * @class LTimerEvent
 * @constructor
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
 * @examplelink <p><a href="../../../api/LTimerEvent/index.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * ......
 * @class LTimerEvent
 * @constructor
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
 * @examplelink <p><a href="../../../api/LTimerEvent/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LTimerEvent = function (){throw "LTimerEvent cannot be instantiated";};
/** @language chinese
 * [静态] 定义 timer 事件对象的 type 属性值。
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 LEvent 对象的对象。</td></tr>
 * <tr><td>target</td><td>已达到其间隔的 LTimer 对象。</td></tr>
 * </table>
 * @property TIMER
 * @type String
 * @static
 * @since 1.9.11
 * @public
 */
/** @language english
 * ......
 * @property TIMER
 * @type String
 * @static
 * @since 1.9.11
 * @public
 */
/** @language japanese
 * ......
 * @property TIMER
 * @type String
 * @static
 * @since 1.9.11
 * @public
 */
LTimerEvent.TIMER = "timer";
/** @language chinese
 * [静态] 定义 timerComplete 事件对象的 type 属性值。
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 LEvent 对象的对象。</td></tr>
 * <tr><td>target</td><td>已完成其请求的 LTimer 对象。</td></tr>
 * </table>
 * @property TIMER_COMPLETE
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language english
 * ......
 * @property TIMER_COMPLETE
 * @type String
 * @static
 * @since 1.9.11
 * @public
 */
/** @language japanese
 * ......
 * @property TIMER_COMPLETE
 * @type String
 * @static
 * @since 1.9.11
 * @public
 */
LTimerEvent.TIMER_COMPLETE = "timerComplete";