/** @language chinese
 * <p>LInteractiveObject 类是用户可以使用鼠标与之交互的所有显示对象的抽象基类。不能直接实例化 LInteractiveObject 类。</p>
 * @class LInteractiveObject
 * @extends LDisplayObject
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language english
 * <p>The LInteractiveObject class is the abstract base class for all display objects with which the user can interact, using the mouse.</p>
 * @class LInteractiveObject
 * @extends LDisplayObject
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * <p>LInteractiveObject クラスはマウスを使用してユーザーが操作できるすべての表示オブジェクトの抽象基本クラスです。LInteractiveObject クラスを直接インスタンス化することはできません。</p>
 * @class LInteractiveObject
 * @extends LDisplayObject
 * @constructor
 * @since 1.9.0
 * @public
 */
var LInteractiveObject = (function () {
	function LInteractiveObject () {
		var s = this;
		LExtends(s, LDisplayObject, []);
		s.type = "LInteractiveObject";
		s.mouseEnabled = true;
		s.mouseChildren = true;
		s.mouseList = new Array();
	}
	var p = {
		addEventListener : function (type, listener) {
			var s = this;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LGlobal.mouseEventContainer[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.addMouseEvent(s, type, listener);
					return;
				}
				s.mouseList.push({listener : listener, type : type});
			}else{
				s._eventList.push({listener : listener, type : type});
			}
		},
		removeEventListener : function (type, listener) {
			var s = this, i, length;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LGlobal.mouseEventContainer[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.removeMouseEvent(s, type, listener);
					return;
				}
				length = s.mouseList.length;
				for (i = 0; i < length; i++) {
					if (!s.mouseList[i]) {
						continue;
					}
					if (type == s.mouseList[i].type && s.mouseList[i].listener == listener) {
						s.mouseList.splice(i, 1);
						return;
					}
				}
			} else {
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
			}
		},
		removeAllEventListener : function () {
			var s = this;
			s.mouseList.length = 0;
			s._eventList.length = 0;
			if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_DOWN]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_DOWN);
			}
			if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_UP]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_UP);
			}
			if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_MOVE);
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OVER);
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OUT);
			}
		},
		hasEventListener : function (type) {
			var s = this, i, length;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				length = s.mouseList.length;
				for (i = 0; i < length; i++) {
					if (!s.mouseList[i]){
						continue;
					}
					if (type == s.mouseList[i].type) {
						return true;
					}
				}
			} else {
				length = s._eventList.length;
				for (i = 0; i < length; i++) {
					if (!s._eventList[i]) {
						continue;
					}
					if (type == s._eventList[i].type) {
						return true;
					}
				}
			}
			return false;
		}
	};
	for (var k in p) {
		LInteractiveObject.prototype[k] = p[k];
	}
	return LInteractiveObject;
})();