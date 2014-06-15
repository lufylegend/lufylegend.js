/** @language chinese
 * LMultitouchInputMode 类提供 LMultitouch 类的 inputMode 属性值。这些值设置用户与启用触屏的设备交互时canvas运行时调度的接触事件类型。
 * @class LMultitouchInputMode
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language english
 * The LMultitouchInputMode class provides values for the inputMode property in the LMultitouch class. These values set the type of touch events the canvas runtime dispatches when the user interacts with a touch-enabled device.
 * @class LMultitouchInputMode
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * LMultitouchInputMode クラスは、LMultitouch クラスの inputMode プロパティの値を提供します。これらの値には、ユーザーがタッチ対応デバイスで操作したときに canvas ランタイムが送出するタッチイベントのタイプを設定します。
 * @class LMultitouchInputMode
 * @constructor
 * @since 1.0.0
 * @public
 */
var LMultitouchInputMode = function () {throw "LMultitouchInputMode cannot be instantiated";};
/** @language chinese
 * [静态] 指定将用户触摸启用触摸设备的所有行为解释为鼠标事件类型。
 * @property NONE
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language english
 * [static] Specifies that all user contact with a touch-enabled device is interpreted as a type of mouse event.
 * @property NONE
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * [静的] タッチ対応デバイスでユーザーが行う操作をすべてマウスイベントのタイプとして解釈することを指定します。
 * @property NONE
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
LMultitouchInputMode.NONE = "none";
LMultitouchInputMode.GESTURE = "gesture";
/** @language chinese
 * [静态] 指定仅为基本触摸事件调度事件，如单个手指点击。
 * @property TOUCH_POINT
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language english
 * [static] Specifies that events are dispatched only for basic touch events, such as a single finger tap.
 * @property TOUCH_POINT
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * [静的] 一本指タップなどの基本タッチイベントの場合のみ、イベントを送出することを指定します。
 * @property TOUCH_POINT
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
LMultitouchInputMode.TOUCH_POINT = "touchPoint";