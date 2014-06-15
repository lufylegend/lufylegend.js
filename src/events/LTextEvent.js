/** @language chinese
 * <p>用户在文本字段中输入文本或在启用 HTML 的文本字段中单击超链接时，对象将调度 LTextEvent 对象。有两种类型的文本事件：LTextEvent.TEXT_INPUT 和 LTextEvent.WIND_COMPLETE。</p>
 * @class LTextEvent
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language english
 * <p>An object dispatches a LTextEvent object when a user enters text in a text field or clicks a hyperlink in an HTML-enabled text field. There are two types of text events: LTextEvent.TEXT_INPUT and TextEvent.WIND_COMPLETE.</p>
 * @class LTextEvent
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * <p>LTextEvent オブジェクトは、ユーザーがテキストフィールドにテキストを入力するか、HTML 対応のテキストフィールドのハイパーリンクをクリックしたときに、オブジェクトによって送出されます。 次の 2 種類のテキストイベントがあります。LTextEvent.TEXT_INPUT および TextEvent.WIND_COMPLETE。</p>
 * @class LTextEvent
 * @constructor
 * @since 1.9.0
 * @public
 */
var LTextEvent = function () {throw "LTextEvent cannot be instantiated";};
/** @language chinese
 * <p>[静态] 定义 textInput 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。</td></tr>
 * <tr><td>target</td><td>在此事件中等同于currentTarget。</td></tr>
 * <tr><td>eventType</td><td>返回当前 Event 对象表示的事件的名称。</td></tr>
 * <tr><td>keyCode</td><td>该属性声明了被敲击的键生成的 Unicode 字符码。</td></tr>
 * <tr><td>preventDefault()</td><td>取消事件的默认动作。</td></tr>
 * </table>
 * @property TEXT_INPUT
 * @type String
 * @static
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField = new LTextField();
 * 		theTextField.x = 20;
 * 		theTextField.y = 20;
 * 		theTextField.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField);
 * 		theTextField.addEventListener(LTextEvent.TEXT_INPUT, textinput);
 * 	}
 * 	function textinput(event){
 * 		trace("event.keyCode=" + event.keyCode);
 * 	}
 * @examplelink <p><a href="../../../api/LTextEvent/textInput.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * <p>[static] Defines the value of the type property of a textInput event object.</p>
 * <p>This event has the following properties:</p>
 * <table>
 * <tr><th>Property</th><th>Value</th></tr>
 * <tr><td>currentTarget</td><td>The object that is actively processing the Event object with an event listener.</td></tr>
 * <tr><td>target</td><td>In this Event, Equivalent to currentTarget.</td></tr>
 * <tr><td>eventType</td><td>The type of the event.</td></tr>
 * <tr><td>keyCode</td><td>Returns the Unicode value of a non-character key in the keyboard event.</td></tr>
 * <tr><td>preventDefault()</td><td>To cancel the event if it is cancelable</td></tr>
 * </table>
 * @property TEXT_INPUT
 * @type String
 * @static
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField = new LTextField();
 * 		theTextField.x = 20;
 * 		theTextField.y = 20;
 * 		theTextField.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField);
 * 		theTextField.addEventListener(LTextEvent.TEXT_INPUT, textinput);
 * 	}
 * 	function textinput(event){
 * 		trace("event.keyCode=" + event.keyCode);
 * 	}
 * @examplelink <p><a href="../../../api/LTextEvent/textInput.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * <p>[静的] textInput イベントオブジェクトの type プロパティ値を定義します。</p>
 * <p>このイベントには、次のプロパティがあります。</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>イベントリスナーで Event オブジェクトをアクティブに処理しているオブジェクトです。</td></tr>
 * <tr><td>target</td><td>このイベントにcurrentTargetと同じです.</td></tr>
 * <tr><td>eventType</td><td>クリックされたハイパーリンクを含むテキストフィールドです。</td></tr>
 * <tr><td>keyCode</td><td>イベントを引き起こしたキーのUnicodeを指定する。</td></tr>
 * <tr><td>preventDefault()</td><td>イベントをキャンセルする</td></tr>
 * </table>
 * @property TEXT_INPUT
 * @type String
 * @static
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField = new LTextField();
 * 		theTextField.x = 20;
 * 		theTextField.y = 20;
 * 		theTextField.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField);
 * 		theTextField.addEventListener(LTextEvent.TEXT_INPUT, textinput);
 * 	}
 * 	function textinput(event){
 * 		trace("event.keyCode=" + event.keyCode);
 * 	}
 * @examplelink <p><a href="../../../api/LTextEvent/textInput.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
LTextEvent.TEXT_INPUT = "textInput";
/** @language chinese
 * <p>[静态] 定义 textInput 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。</td></tr>
 * <tr><td>target</td><td>在此事件中等同于currentTarget。</td></tr>
 * </table>
 * @property WIND_COMPLETE
 * @type String
 * @static
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField = new LTextField();
 * 		theTextField.x = 20;
 * 		theTextField.y = 20;
 * 		addChild(theTextField);
 * 		theTextField.text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 * 		theTextField.speed = 2;
 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windComplete);
 * 		theTextField.wind();
 * 	}
 * 	function windComplete(event){
 * 		trace("windComplete","event.currentTarget = " + event.currentTarget);
 * 	}
 * @examplelink <p><a href="../../../api/LTextEvent/windComplete.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * <p>[static] Defines the value of the type property of a textInput event object.</p>
 * <p>This event has the following properties:</p>
 * <table>
 * <tr><th>Property</th><th>Value</th></tr>
 * <tr><td>currentTarget</td><td>The object that is actively processing the Event object with an event listener.</td></tr>
 * <tr><td>target</td><td>In this Event, Equivalent to currentTarget.</td></tr>
 * </table>
 * @property WIND_COMPLETE
 * @type String
 * @static
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField = new LTextField();
 * 		theTextField.x = 20;
 * 		theTextField.y = 20;
 * 		addChild(theTextField);
 * 		theTextField.text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 * 		theTextField.speed = 2;
 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windComplete);
 * 		theTextField.wind();
 * 	}
 * 	function windComplete(event){
 * 		trace("windComplete","event.currentTarget = " + event.currentTarget);
 * 	}
 * @examplelink <p><a href="../../../api/LTextEvent/windComplete.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * <p>[静的] textInput イベントオブジェクトの type プロパティ値を定義します。</p>
 * <p>このイベントには、次のプロパティがあります。</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>イベントリスナーで Event オブジェクトをアクティブに処理しているオブジェクトです。</td></tr>
 * <tr><td>target</td><td>このイベントにcurrentTargetと同じです.</td></tr>
 * </table>
 * @property WIND_COMPLETE
 * @type String
 * @static
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField = new LTextField();
 * 		theTextField.x = 20;
 * 		theTextField.y = 20;
 * 		addChild(theTextField);
 * 		theTextField.text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 * 		theTextField.speed = 2;
 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windComplete);
 * 		theTextField.wind();
 * 	}
 * 	function windComplete(event){
 * 		trace("windComplete","event.currentTarget = " + event.currentTarget);
 * 	}
 * @examplelink <p><a href="../../../api/LTextEvent/windComplete.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
LTextEvent.WIND_COMPLETE = "windComplete";