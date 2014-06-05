/** @language chinese
 * <p>LEventDispatcher 类是可调度事件的所有类的基类。</p>
 * @class LEventDispatcher
 * @extends LObject
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language english
 * <p>The LEventDispatcher class is the base class for all classes that dispatch events.</p>
 * @class LEventDispatcher
 * @extends LObject
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * <p>LEventDispatcher クラスは、イベントを送出するすべてのクラスの基本クラスです。</p>
 * @class LEventDispatcher
 * @extends LObject
 * @constructor
 * @since 1.9.0
 * @public
 */
var LEventDispatcher = (function () {
	function LEventDispatcher () {
		var s = this;
		LExtends(s, LObject, []);
		s._eventList = new Array();
	}
	var p = {
		addEventListener : function (type, listener) {
			this._eventList.push({listener : listener, type : type});
		},
		removeEventListener : function (type, listener) {
			var s = this, i, length;
			length = s._eventList.length;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (type == s._eventList[i].type && s._eventList[i].listener == listener) {
					s._eventList.splice(i, 1);
					return;
				}
			}
		},
		removeAllEventListener : function () {
			this._eventList = [];
		},
		dispatchEvent : function (type) {
			var s = this, i, length = s._eventList.length, ctype = (typeof type == "string") ? type : type.eventType;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (ctype == s._eventList[i].type) {
					if (typeof type == "string") {
						s.currentTarget = s.target = s;
						s.eventType = s.event_type = ctype;
						s._eventList[i].listener(s);
					}else{
						type.currentTarget = type.target = s;
						s._eventList[i].listener(type);
					}
				}
			}
		},
		hasEventListener : function (type) {
			var s = this, i, length = s._eventList.length;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (type == s._eventList[i].type) {
					return true;
				}
			}
			return false;
		}
	};
	for (var k in p) {
		LEventDispatcher.prototype[k] = p[k];
	}
	return LEventDispatcher;
})();