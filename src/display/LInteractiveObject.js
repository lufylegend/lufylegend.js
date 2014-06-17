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
		/** @language chinese
		 * 指定此对象是否接收鼠标或其他用户输入、消息。默认值为 true，这表示默认情况下，显示列表上的任何 LInteractiveObject 实例都会接收鼠标事件或其他用户输入事件。如果将 mouseEnabled 设置为 false，则实例将不接收任何鼠标事件（或其他用户输入事件，例如键盘事件）。显示列表上的该实例的任何子级都不会受到影响。要更改显示列表上对象的所有子级的 mouseEnabled 行为，请使用 LDisplayObjectContainer.mouseChildren。
		 * @property mouseEnabled
		 * @type Boolean
		 * @since 1.0.0
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("mouseEnabled=true");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("mouseEnabled=false");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.mouseEnabled = false;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LInteractiveObject/mouseEnabled.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Specifies whether this object receives mouse, or other user input, messages. The default value is true, which means that by default any InteractiveObject instance that is on the display list receives mouse events or other user input events. If mouseEnabled is set to false, the instance does not receive any mouse events (or other user input events like keyboard events). Any children of this instance on the display list are not affected. To change the mouseEnabled behavior for all children of an object on the display list, use LDisplayObjectContainer.mouseChildren.
		 * @property mouseEnabled
		 * @type Boolean
		 * @since 1.0.0
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("mouseEnabled=true");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("mouseEnabled=false");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.mouseEnabled = false;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LInteractiveObject/mouseEnabled.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このオブジェクトでマウスまたはその他のユーザー入力メッセージを受け取るかどうかを指定します。デフォルト値は true であり、これは表示リスト上の LInteractiveObject インスタンスがデフォルトでマウスイベントまたはその他のユーザー入力イベントを受け取ることを意味します。mouseEnabled を false に設定すると、インスタンスでは、マウスイベント（またはキーボードイベントなど、その他のユーザー入力イベント）を一切受け取りません。表示リスト上のこのインスタンスの子は影響を受けません。表示リスト上のオブジェクトのすべての子に関する mouseEnabled 動作を変更するには、LDisplayObjectContainer.mouseChildren を使用します。
		 * @property mouseEnabled
		 * @type Boolean
		 * @since 1.0.0
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("mouseEnabled=true");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("mouseEnabled=false");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.mouseEnabled = false;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LInteractiveObject/mouseEnabled.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.mouseEnabled = true;
		s.mouseList = new Array();
	}
	var p = {
		addEventListener : function (type, listener) {
			var s = this;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LMouseEventContainer.container[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE])) {
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
				if (LMouseEventContainer.container[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE])) {
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
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_DOWN]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_DOWN);
			}
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_UP]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_UP);
			}
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
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