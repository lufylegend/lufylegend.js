/** @language chinese
 * <p>用户将焦点从显示列表中的一个对象更改到另一个对象时，对象将调度 LFocusEvent 对象。</p>
 * @class LFocusEvent
 * @constructor
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField1 = new LTextField();
 * 		theTextField1.x = 20;
 * 		theTextField1.y = 20;
 * 		theTextField1.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField1);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 		var theTextField2 = new LTextField();
 * 		theTextField2.x = 20;
 * 		theTextField2.y = 100;
 * 		theTextField2.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField2);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 	}
 * 	function onfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_IN");
 * 	}
 * 	function outfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_OUT");
 * 	}
 * @examplelink <p><a href="../../../api/LFocusEvent/index.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * <p>An object dispatches a LFocusEvent object when the user changes the focus from one object in the display list to another.</p>
 * @class LFocusEvent
 * @constructor
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField1 = new LTextField();
 * 		theTextField1.x = 20;
 * 		theTextField1.y = 20;
 * 		theTextField1.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField1);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 		var theTextField2 = new LTextField();
 * 		theTextField2.x = 20;
 * 		theTextField2.y = 100;
 * 		theTextField2.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField2);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 	}
 * 	function onfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_IN");
 * 	}
 * 	function outfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_OUT");
 * 	}
 * @examplelink <p><a href="../../../api/LFocusEvent/index.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * <p>LFocusEvent オブジェクトは、ユーザーが表示リストの 1 つのオブジェクトから別のオブジェクトにフォーカスを変更したときに、オブジェクトによって送出されます。</p>
 * @class LFocusEvent
 * @constructor
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField1 = new LTextField();
 * 		theTextField1.x = 20;
 * 		theTextField1.y = 20;
 * 		theTextField1.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField1);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 		var theTextField2 = new LTextField();
 * 		theTextField2.x = 20;
 * 		theTextField2.y = 100;
 * 		theTextField2.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField2);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 	}
 * 	function onfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_IN");
 * 	}
 * 	function outfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_OUT");
 * 	}
 * @examplelink <p><a href="../../../api/LFocusEvent/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LFocusEvent = function (){throw "LFocusEvent cannot be instantiated";};
/** @language chinese
 * [静态] 定义 focusIn 事件对象的 type 属性值。(目前只有LTextField对象支持)
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。</td></tr>
 * <tr><td>target</td><td>在此事件中等同于currentTarget。</td></tr>
 * </table>
 * @property FOCUS_IN
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language english
 * [static] Defines the value of the type property of a focusIn event object.（It is only supported by the LTextField object）
 * <p>This event has the following properties:</p>
 * <table>
 * <tr><th>Property</th><th>Value</th></tr>
 * <tr><td>currentTarget</td><td>The object that is actively processing the Event object with an event listener.</td></tr>
 * <tr><td>target</td><td>In this Event, Equivalent to currentTarget.</td></tr>
 * </table>
 * @property FOCUS_IN
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * [静的] focusIn イベントオブジェクトの type プロパティ値を定義します。(今LTextField オブジェクトでしかサポートされていません)
 * <p>このイベントには、次のプロパティがあります。</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>イベントリスナーで Event オブジェクトをアクティブに処理しているオブジェクトです。</td></tr>
 * <tr><td>target</td><td>このイベントにcurrentTargetと同じです.</td></tr>
 * </table>
 * @property FOCUS_IN
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
LFocusEvent.FOCUS_IN = "focusIn";
/** @language chinese
 * [静态] 定义 focusOut 事件对象的 type 属性值。(目前只有LTextField对象支持)
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。</td></tr>
 * <tr><td>target</td><td>在此事件中等同于currentTarget。</td></tr>
 * </table>
 * @property FOCUS_OUT
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language english
 * [static] Defines the value of the type property of a focusOut event object.（It is only supported by the LTextField object）
 * <p>This event has the following properties:</p>
 * <table>
 * <tr><th>Property</th><th>Value</th></tr>
 * <tr><td>currentTarget</td><td>The object that is actively processing the Event object with an event listener.</td></tr>
 * <tr><td>target</td><td>In this Event, Equivalent to currentTarget.</td></tr>
 * </table>
 * @property FOCUS_OUT
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * [静的] focusOut イベントオブジェクトの type プロパティ値を定義します。(今LTextField オブジェクトでしかサポートされていません)
 * <p>このイベントには、次のプロパティがあります。</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>イベントリスナーで Event オブジェクトをアクティブに処理しているオブジェクトです。</td></tr>
 * <tr><td>target</td><td>このイベントにcurrentTargetと同じです.</td></tr>
 * </table>
 * @property FOCUS_OUT
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
LFocusEvent.FOCUS_OUT = "focusOut";