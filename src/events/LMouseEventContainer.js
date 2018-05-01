/** @language chinese
 * <p>LMouseEventContainer是一个鼠标事件监听器的容器，一般的鼠标事件监听需要遍历所有的可视对象，对程序消耗是比较大的，使用LMouseEventContainer后，鼠标监听对象变为只监听加载了鼠标事件的对象，可以大幅度提升鼠标事件监听的效率，但是，缺点是无法使用显示对象对鼠标事件进行遮挡。</p>
 * @class LMouseEventContainer
 * @constructor
 * @since 1.8.5
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
 * 		var layer01 = new LSprite();
 * 		layer01.x = 50;
 * 		layer01.y = 20;
 * 		addChild(layer01);
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer01.addChild(bm);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 		
 * 		var layer02 = new LSprite();
 * 		layer02.graphics.drawRect(1,"#008800",[0,0,100,100],true);
 * 		layer02.x = 200;
 * 		layer02.y = 20;
 * 		addChild(layer02);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 	}
 * 	function onmouse(event){
 * 		trace("event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("event.target : " + event.target + "(" + event.target.objectIndex + ")");
 * 		trace("event.clickTarget == event.currentTarget : " + (event.clickTarget == event.currentTarget));
 * 		trace("event.offsetX : " + event.offsetX, "event.offsetY : " + event.offsetY);
 * 		trace("event.selfX : " + event.selfX, "event.selfY : " + event.selfY, "");
 * 	}
 * 	function onmouseOther(event,object){
 * 		trace("onmouseOther event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("onmouseOther object : " + object + "(" + object.objectIndex + ")");
 * 		trace("onmouseOther object == event.currentTarget : " + (object == event.currentTarget), "");
 * 	}
 * @examplelink <p><a href="../../../api/LMouseEventContainer/index.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * <p>LMouseEventContainer is a mouse event listener container，mouse event listeners need to traverse all visual objects, consumption is relatively large, this object can greatly improve efficiency.</p>
 * @class LMouseEventContainer
 * @constructor
 * @since 1.8.5
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
 * 		var layer01 = new LSprite();
 * 		layer01.x = 50;
 * 		layer01.y = 20;
 * 		addChild(layer01);
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer01.addChild(bm);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 		
 * 		var layer02 = new LSprite();
 * 		layer02.graphics.drawRect(1,"#008800",[0,0,100,100],true);
 * 		layer02.x = 200;
 * 		layer02.y = 20;
 * 		addChild(layer02);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 	}
 * 	function onmouse(event){
 * 		trace("event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("event.target : " + event.target + "(" + event.target.objectIndex + ")");
 * 		trace("event.clickTarget == event.currentTarget : " + (event.clickTarget == event.currentTarget));
 * 		trace("event.offsetX : " + event.offsetX, "event.offsetY : " + event.offsetY);
 * 		trace("event.selfX : " + event.selfX, "event.selfY : " + event.selfY, "");
 * 	}
 * 	function onmouseOther(event,object){
 * 		trace("onmouseOther event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("onmouseOther object : " + object + "(" + object.objectIndex + ")");
 * 		trace("onmouseOther object == event.currentTarget : " + (object == event.currentTarget), "");
 * 	}
 * @examplelink <p><a href="../../../api/LMouseEventContainer/index.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * <p>LMouseEventContainer オブジェクトは、マウスイベントの容器になります、普通なマウスイベントが発生する時、全てのオブジェクトを確認しなければなりません、パフォーマンスが悪いです、LMouseEventContainerを使ったら、パフォーマンスをアップすることができます。</p>
 * @class LMouseEventContainer
 * @constructor
 * @since 1.8.5
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
 * 		var layer01 = new LSprite();
 * 		layer01.x = 50;
 * 		layer01.y = 20;
 * 		addChild(layer01);
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer01.addChild(bm);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 		
 * 		var layer02 = new LSprite();
 * 		layer02.graphics.drawRect(1,"#008800",[0,0,100,100],true);
 * 		layer02.x = 200;
 * 		layer02.y = 20;
 * 		addChild(layer02);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 	}
 * 	function onmouse(event){
 * 		trace("event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("event.target : " + event.target + "(" + event.target.objectIndex + ")");
 * 		trace("event.clickTarget == event.currentTarget : " + (event.clickTarget == event.currentTarget));
 * 		trace("event.offsetX : " + event.offsetX, "event.offsetY : " + event.offsetY);
 * 		trace("event.selfX : " + event.selfX, "event.selfY : " + event.selfY, "");
 * 	}
 * 	function onmouseOther(event,object){
 * 		trace("onmouseOther event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("onmouseOther object : " + object + "(" + object.objectIndex + ")");
 * 		trace("onmouseOther object == event.currentTarget : " + (object == event.currentTarget), "");
 * 	}
 * @examplelink <p><a href="../../../api/LMouseEventContainer/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LMouseEventContainer = (function () {
	function MouseEventContainer(){
		var s = this;
		/** @language chinese
		 * 设定是否触发所有范围内的鼠标事件，如果设定为false，则每次只触发最上层的一个鼠标事件。
		 * @property dispatchAllEvent
		 * @type Boolean
		 * @default false
		 * @since 1.8.5
		 * @example
		 * 	LInit(50, "legend", 800, 400, main);
		 * 	var label;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
		 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
		 * 		var backLayer = new LSprite();
		 * 		backLayer.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#cccccc");
		 * 		addChild(backLayer);
		 * 		label = new LTextField();
		 * 		label.text = "LMouseEventContainer.dispatchAllEvent = false;";
		 * 		label.size = 18;
		 * 		label.x = 10;
		 * 		label.y = 10;
		 * 		backLayer.addChild(label);
		 * 		var buttonChange = new LButtonSample1("Change dispatchAllEvent's value");
		 * 		buttonChange.x = 10;
		 * 		buttonChange.y = 40;
		 * 		backLayer.addChild(buttonChange);
		 * 		buttonChange.addEventListener(LMouseEvent.MOUSE_UP,dispatchAllEventChange);
		 * 		var layer = new LSprite();
		 * 		layer.name = "layer";
		 * 		layer.y = 100;
		 * 		layer.graphics.drawRect(2,"#ff0000",[0,0,500,200],true,"#880088");
		 * 		backLayer.addChild(layer);
		 * 		layer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		layer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 		var button01 = new LButtonSample1("button01",50);
		 * 		button01.name = "button01";
		 * 		button01.x = 10;
		 * 		button01.y = 10;
		 * 		layer.addChild(button01);
		 * 		button01.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		button01.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 		var button02 = new LButtonSample1("button02");
		 * 		button02.name = "button02";
		 * 		button02.x = 15;
		 * 		button02.y = 15;
		 * 		layer.addChild(button02);
		 * 		button02.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		button02.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 	}
		 * 	function dispatchAllEventChange(){
		 * 		LMouseEventContainer.dispatchAllEvent = !LMouseEventContainer.dispatchAllEvent;
		 * 		label.text = "LMouseEventContainer.dispatchAllEvent = "+LMouseEventContainer.dispatchAllEvent+";";
		 * 	}
		 * 	function mousedown(e){
		 * 		trace("mousedown e.currentTarget.name = " + e.currentTarget.name);
		 * 	}
		 * 	function mouseup(e){
		 * 		trace("mouseup e.currentTarget.name = " + e.currentTarget.name);
		 * 	}
		 * @examplelink <p><a href="../../../api/LMouseEventContainer/dispatchAllEvent.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Set whether Triggering all the mouse events can trigger.
		 * @property dispatchAllEvent
		 * @type Boolean
		 * @default false
		 * @since 1.8.5
		 * @example
		 * 	LInit(50, "legend", 800, 400, main);
		 * 	var label;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
		 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
		 * 		var backLayer = new LSprite();
		 * 		backLayer.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#cccccc");
		 * 		addChild(backLayer);
		 * 		label = new LTextField();
		 * 		label.text = "LMouseEventContainer.dispatchAllEvent = false;";
		 * 		label.size = 18;
		 * 		label.x = 10;
		 * 		label.y = 10;
		 * 		backLayer.addChild(label);
		 * 		var buttonChange = new LButtonSample1("Change dispatchAllEvent's value");
		 * 		buttonChange.x = 10;
		 * 		buttonChange.y = 40;
		 * 		backLayer.addChild(buttonChange);
		 * 		buttonChange.addEventListener(LMouseEvent.MOUSE_UP,dispatchAllEventChange);
		 * 		var layer = new LSprite();
		 * 		layer.name = "layer";
		 * 		layer.y = 100;
		 * 		layer.graphics.drawRect(2,"#ff0000",[0,0,500,200],true,"#880088");
		 * 		backLayer.addChild(layer);
		 * 		layer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		layer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 		var button01 = new LButtonSample1("button01",50);
		 * 		button01.name = "button01";
		 * 		button01.x = 10;
		 * 		button01.y = 10;
		 * 		layer.addChild(button01);
		 * 		button01.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		button01.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 		var button02 = new LButtonSample1("button02");
		 * 		button02.name = "button02";
		 * 		button02.x = 15;
		 * 		button02.y = 15;
		 * 		layer.addChild(button02);
		 * 		button02.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		button02.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 	}
		 * 	function dispatchAllEventChange(){
		 * 		LMouseEventContainer.dispatchAllEvent = !LMouseEventContainer.dispatchAllEvent;
		 * 		label.text = "LMouseEventContainer.dispatchAllEvent = "+LMouseEventContainer.dispatchAllEvent+";";
		 * 	}
		 * 	function mousedown(e){
		 * 		trace("mousedown e.currentTarget.name = " + e.currentTarget.name);
		 * 	}
		 * 	function mouseup(e){
		 * 		trace("mouseup e.currentTarget.name = " + e.currentTarget.name);
		 * 	}
		 * @examplelink <p><a href="../../../api/LMouseEventContainer/dispatchAllEvent.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * 発生できるマウスイベントが発生するかどうか設定します，falseの場合，イベントは一番トップにある一つしか発生しません。
		 * @property dispatchAllEvent
		 * @type Boolean
		 * @default false
		 * @since 1.8.5
		 * @example
		 * 	LInit(50, "legend", 800, 400, main);
		 * 	var label;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
		 * 		LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
		 * 		var backLayer = new LSprite();
		 * 		backLayer.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#cccccc");
		 * 		addChild(backLayer);
		 * 		label = new LTextField();
		 * 		label.text = "LMouseEventContainer.dispatchAllEvent = false;";
		 * 		label.size = 18;
		 * 		label.x = 10;
		 * 		label.y = 10;
		 * 		backLayer.addChild(label);
		 * 		var buttonChange = new LButtonSample1("Change dispatchAllEvent's value");
		 * 		buttonChange.x = 10;
		 * 		buttonChange.y = 40;
		 * 		backLayer.addChild(buttonChange);
		 * 		buttonChange.addEventListener(LMouseEvent.MOUSE_UP,dispatchAllEventChange);
		 * 		var layer = new LSprite();
		 * 		layer.name = "layer";
		 * 		layer.y = 100;
		 * 		layer.graphics.drawRect(2,"#ff0000",[0,0,500,200],true,"#880088");
		 * 		backLayer.addChild(layer);
		 * 		layer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		layer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 		var button01 = new LButtonSample1("button01",50);
		 * 		button01.name = "button01";
		 * 		button01.x = 10;
		 * 		button01.y = 10;
		 * 		layer.addChild(button01);
		 * 		button01.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		button01.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 		var button02 = new LButtonSample1("button02");
		 * 		button02.name = "button02";
		 * 		button02.x = 15;
		 * 		button02.y = 15;
		 * 		layer.addChild(button02);
		 * 		button02.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
		 * 		button02.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
		 * 	}
		 * 	function dispatchAllEventChange(){
		 * 		LMouseEventContainer.dispatchAllEvent = !LMouseEventContainer.dispatchAllEvent;
		 * 		label.text = "LMouseEventContainer.dispatchAllEvent = "+LMouseEventContainer.dispatchAllEvent+";";
		 * 	}
		 * 	function mousedown(e){
		 * 		trace("mousedown e.currentTarget.name = " + e.currentTarget.name);
		 * 	}
		 * 	function mouseup(e){
		 * 		trace("mouseup e.currentTarget.name = " + e.currentTarget.name);
		 * 	}
		 * @examplelink <p><a href="../../../api/LMouseEventContainer/dispatchAllEvent.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.container = {};
		s.dispatchAllEvent = false;
		s.mouseDownContainer = [];
		s.mouseUpContainer = [];
		s.mouseMoveContainer = [];
		s.mouseOverContainer = [];
		s.mouseOutContainer = [];
		s.mouseDblContainer = [];
		s.textFieldInputContainer = [];
		s.buttonContainer = [];
	};
	MouseEventContainer.prototype = {
		pushInputBox : function (d) {
			var s  = this, c = s.textFieldInputContainer, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					return;
				}
			}
			s.textFieldInputContainer.push(d);
		},
		removeInputBox : function (d) {
			var s  = this, c = s.textFieldInputContainer, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					s.textFieldInputContainer.splice(i, 1);
					break;
				}
			}
		},
		pushButton : function (d) {
			var s  = this, c = s.buttonContainer, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					return;
				}
			}
			s.buttonContainer.push(d);
		},
		removeButton : function (d) {
			var s  = this, c = s.buttonContainer, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					s.buttonContainer.splice(i, 1);
					break;
				}
			}
		},
		dispatchEventButton : function (e) {
			var s  = this, c = s.buttonContainer, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (typeof s.buttonContainer[i].ll_button_mode == "function") {
					s.buttonContainer[i].ll_button_mode(e);
				}
			}
		},
		addEvent : function (o, list, f) {
			var s = this;
			list.push({container : o, listener : f});
		},
		removeEvent : function (o, list, f) {
			var s = this, i, l;
			for (i = 0, l = list.length; i < l; i++) {
				if (list[i].container.objectIndex === o.objectIndex && (!f || list[i].listener == f)) {
					list.splice(i, 1);
					break;
				}
			}
		},
		addMouseDownEvent : function (o, f) {
			var s = this;
			s.addEvent(o, s.mouseDownContainer, f);
		},
		addMouseUpEvent : function (o, f) {
			var s = this;
			s.addEvent(o, s.mouseUpContainer, f);
		},
		addMouseMoveEvent : function (o, f) {
			var s = this;
			s.addEvent(o, s.mouseMoveContainer, f);
		},
		addMouseOverEvent : function (o, f) {
			var s = this;
			s.addEvent(o, s.mouseOverContainer, f);
		},
		addMouseOutEvent : function (o, f) {
			var s = this;
			s.addEvent(o, s.mouseOutContainer, f);
		},
		addMouseDblEvent : function (o, f) {
			var s = this;
			s.addEvent(o, s.mouseDblContainer, f);
		},
		addMouseEvent : function (o, t, f) {
			var s = this;
			if (t == LMouseEvent.MOUSE_DOWN) {
				s.addMouseDownEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_UP) {
				s.addMouseUpEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_OVER) {
				s.addMouseOverEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_OUT) {
				s.addMouseOutEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_MOVE) {
				s.addMouseMoveEvent(o, f);
			} else {
				s.addMouseDblEvent(o, f);
			}
		},
		hasEventListener : function(o, t, f){
			var s = this, list;
			if (t == LMouseEvent.MOUSE_DOWN) {
				list = s.mouseDownContainer;
			} else if (t == LMouseEvent.MOUSE_UP) {
				list = s.mouseUpContainer;
			} else if (t == LMouseEvent.MOUSE_OVER) {
				list = s.mouseOverContainer;
			} else if (t == LMouseEvent.MOUSE_OUT) {
				list = s.mouseOutContainer;
			} else if (t == LMouseEvent.MOUSE_MOVE) {
				list = s.mouseMoveContainer;
			} else {
				list = s.mouseDblContainer;
			}
			for (var i = 0, l = list.length; i < l; i++) {
				if (list[i].container.objectIndex === o.objectIndex && (!f || list[i].listener == f)) {
					return true;
				}
			}
			return false;
		},
		removeMouseDownEvent : function (o, f) {
			var s = this;
			s.removeEvent(o, s.mouseDownContainer, f);
		},
		removeMouseUpEvent : function (o, f) {
			var s = this;
			s.removeEvent(o, s.mouseUpContainer, f);
		},
		removeMouseMoveEvent : function (o, f) {
			var s = this;
			s.removeEvent(o, s.mouseMoveContainer, f);
		},
		removeMouseOverEvent : function (o, f) {
			var s = this;
			s.removeEvent(o, s.mouseOverContainer, f);
		},
		removeMouseOutEvent : function (o, f) {
			var s = this;
			s.removeEvent(o, s.mouseOutContainer, f);
		},
		removeMouseDblEvent : function (o, f) {
			var s = this;
			s.removeEvent(o, s.mouseDblContainer, f);
		},
		removeMouseEvent : function (o, t, f) {
			var s = this;
			if (t == LMouseEvent.MOUSE_DOWN) {
				s.removeMouseDownEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_UP) {
				s.removeMouseUpEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_OVER) {
				s.removeMouseOverEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_OUT) {
				s.removeMouseOutEvent(o, f);
			} else if (t == LMouseEvent.MOUSE_MOVE) {
				s.removeMouseMoveEvent(o, f);
			} else {
				s.removeMouseDblEvent(o, f);
			}
		},
		dispatchMouseEvent : function (event, type) {
			var s = this;
			if (type == LMouseEvent.MOUSE_DOWN) {
				s.dispatchEvent(event, s.mouseDownContainer, LMouseEvent.MOUSE_DOWN);
				s.dispatchEvent(event, s.textFieldInputContainer);
			} else if (type == LMouseEvent.MOUSE_UP) {
				s.dispatchEvent(event, s.mouseUpContainer, LMouseEvent.MOUSE_UP);
			} else if (type == LMouseEvent.DOUBLE_CLICK) {
				s.dispatchEvent(event, s.mouseDblContainer, LMouseEvent.DOUBLE_CLICK);
			} else {
				s.dispatchEventButton(event);
				s.dispatchEvent(event, s.mouseOutContainer, LMouseEvent.MOUSE_OUT);
				s.dispatchEvent(event, s.mouseOverContainer, LMouseEvent.MOUSE_OVER);
				s.dispatchEvent(event, s.mouseMoveContainer, LMouseEvent.MOUSE_MOVE);
			}
		},
		getRootParams : function (s) {
			var p = s.parent, r = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			while (p && p != "root") {
				r.x *= p.scaleX;
				r.y *= p.scaleY;
				r.x += p.x;
				r.y += p.y;
				r.scaleX *= p.scaleX;
				r.scaleY *= p.scaleY;
				p = p.parent;
			}
			return r;
		},
		_mouseEnabled : function (sp) {
			var self = this;
			if (!sp || !sp.parent) {
				return false;
			}
			if (!sp.visible || (typeof sp.mouseEnabled != UNDEFINED && !sp.mouseEnabled)) {
				return false;
			}
			var p = sp.parent;
			while (p && p != "root") {
				if (!p.mouseEnabled || !p.mouseChildren || !p.visible) {
					return false;
				}
				p = p.parent;
				if (!p) {
					return false;
				}
			}
			return true;
		},
		_dispatchEvent : function(event, type, st, index, fromIndex, endIndex) {
			var self = this, i, j, o, l = st.length;
			for (i = fromIndex; i <= endIndex && i < l; i++) {
				o = st[i];
				if (o.sp.objectIndex != index) {
					continue;
				}
				event.currentTarget = event.clickTarget = o.sp;
				if (!event.target) {
					event.target = o.sp;
				}
				event.event_type = type;
				event.selfX = (event.offsetX - o.co.x - o.sp.x) / (o.co.scaleX * o.sp.scaleX);
				event.selfY = (event.offsetY - o.co.y - o.sp.y) / (o.co.scaleY * o.sp.scaleY);
				o.listener(event, o.sp);
			}
		},
		dispatchEvent : function (event, list, type) {
			var self = this, sp, co, st = [], o, i, l;
			for (i = 0, l = list.length; i < l; i++) {
				sp = list[i].container || list[i];
				if (!self._mouseEnabled(sp)) {
					continue;
				}
				co = self.getRootParams(sp);
				if (!type && sp.mouseEvent) {
					sp.mouseEvent(event, LMouseEvent.MOUSE_DOWN, co);
					continue;
				}
				if (sp.ismouseon(event, co)) {
					if (type == LMouseEvent.MOUSE_OUT) {
						continue;
					}
					if (type == LMouseEvent.MOUSE_OVER) {
						if (sp.ll_mousein) {
							continue;
						}
					}
					if (type != LMouseEvent.MOUSE_UP) {
						sp.ll_mousein = true;
					}
					st.push({sp : sp, co : co, listener : list[i].listener});
				} else {
					if (type != LMouseEvent.MOUSE_OUT && type != LMouseEvent.MOUSE_OVER) {
						continue;
					}
					if (!sp.ll_mousein) {
						continue;
					}
					sp.ll_mousein = false;
					st.push({sp : sp, co : co, listener : list[i].listener});
				}
			}
			if (st.length == 0) {
				return;
			}
			if (st.length > 1) {
				st = st.sort(self._sort.bind(self));
			}
			l = st.length;
			for (i = 0; i < l; i++) {
				o = st[i];
				self._dispatchEvent(event, type, st, o.sp.objectIndex, i, self.dispatchAllEvent ? l - 1 : i);
				if (i < st.length - 1 && o.sp.objectIndex == st[i+1].sp.objectIndex){
					st.splice(i, 1);
					i--;
					continue;
				}
				var p;
				while (true) {
					if (!p) {
						p = o.sp.parent;
						event.target = o.sp;
					}
					if (!p || p == "root") {
						break;
					}
					self._dispatchEvent(event, type, st, p.objectIndex, i + 1, l);
					event.target = p;
					p = p.parent;
					if (!p || p == "root") {
						break;
					}
				}
				if (!self.dispatchAllEvent) {
					break;
				} else {
					continue;
				}
			}
		},
		/** @language chinese
		 * 设定是否鼠标事件监听器的容器。
		 * @method set
		 * @param {String} type 事件的类型。
		 * <p>可以设定的事件的类型有下面三种：</p>
		 * <table>
		 * <tr><th>事件的类型</th><th>值</th></tr>
		 * <tr><td>LMouseEvent.MOUSE_DOWN</td><td>可以将LMouseEvent.MOUSE_DOWN放入鼠标事件监听器容器。</td></tr>
		 * <tr><td>LMouseEvent.MOUSE_UP</td><td>可以将LMouseEvent.MOUSE_UP放入鼠标事件监听器容器。</td></tr>
		 * <tr><td>LMouseEvent.MOUSE_MOVE</td><td>可以将LMouseEvent.MOUSE_MOVE，LMouseEvent.MOUSE_OVER，LMouseEvent.MOUSE_OUT放入鼠标事件监听器容器。</td></tr>
		 * </table>
		 * @param {Boolean} value 是否鼠标事件监听器的容器。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var loader;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("lufylegend.js.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		trace(loader.objectIndex == event.target.objectIndex);//true
		 * 		trace(event.target.content == event.currentTarget);//true
		 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 		var bitmap = new LBitmap(bitmapdata);
		 * 		addChild(bitmap);
		 * 	}
		 * @examplelink <p><a href="../../../api/LMouseEventContainer/index.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.5
		 */
		/** @language english
		 * Set whether the mouse event listener container.
		 * @method set
		 * @param {String} type The type of event.
		 * <p>three events can be set：</p>
		 * <table>
		 * <tr><th>The type of event</th><th>value</th></tr>
		 * <tr><td>LMouseEvent.MOUSE_DOWN</td><td>set the LMouseEvent.MOUSE_DOWN event.</td></tr>
		 * <tr><td>LMouseEvent.MOUSE_UP</td><td>set the LMouseEvent.MOUSE_UP event.</td></tr>
		 * <tr><td>LMouseEvent.MOUSE_MOVE</td><td>set the LMouseEvent.MOUSE_MOVE，LMouseEvent.MOUSE_OVER，LMouseEvent.MOUSE_OUT events.</td></tr>
		 * </table>
		 * @param {Boolean} value Whether the mouse event listener container.
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var loader;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("lufylegend.js.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		trace(loader.objectIndex == event.target.objectIndex);//true
		 * 		trace(event.target.content == event.currentTarget);//true
		 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 		var bitmap = new LBitmap(bitmapdata);
		 * 		addChild(bitmap);
		 * 	}
		 * @examplelink <p><a href="../../../api/LMouseEventContainer/index.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.8.5
		 */
		/** @language japanese
		 * マウスイベントの容器を使うかどうか設定します。
		 * @method set
		 * @param {String} type イベントのタイプです。
		 * <p>設定できるイベントのタイプが三種類あります：</p>
		 * <table>
		 * <tr><th>イベントのタイプ</th><th>バリュー</th></tr>
		 * <tr><td>LMouseEvent.MOUSE_DOWN</td><td>LMouseEvent.MOUSE_DOWNをマウスイベントの容器に入れる</td></tr>
		 * <tr><td>LMouseEvent.MOUSE_UP</td><td>LMouseEvent.MOUSE_UPをマウスイベントの容器に入れる</td></tr>
		 * <tr><td>LMouseEvent.MOUSE_MOVE</td><td>LMouseEvent.MOUSE_MOVE，LMouseEvent.MOUSE_OVER，LMouseEvent.MOUSE_OUTをマウスイベントの容器に入れる</td></tr>
		 * </table>
		 * @param {Boolean} value マウスイベントの容器を使うかどうか。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var loader;
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("lufylegend.js.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		trace(loader.objectIndex == event.target.objectIndex);//true
		 * 		trace(event.target.content == event.currentTarget);//true
		 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 		var bitmap = new LBitmap(bitmapdata);
		 * 		addChild(bitmap);
		 * 	}
		 * @examplelink <p><a href="../../../api/LMouseEventContainer/index.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.8.5
		 */
		set : function (t, v) {
			this.container[t] = v;
		},
		_sort : function (a, b) {
			var s = this, o1, o2, al = s._getSort(a.sp), bl = s._getSort(b.sp), i, l1, l2;
			for (i = 0, l1 = al.length, l2 = bl.length; i < l1 && i < l2; i++) {
				o1 = al[i];
				o2 = bl[i];
				if (o1.objectIndex == o2.objectIndex) {
					continue;
				}
				return o2.parent.getChildIndex(o2) - o1.parent.getChildIndex(o1);
			}
			return bl.length - al.length;
		},
		_getSort : function (layer) {
			var p = layer.parent, list = [layer];
			while (p && p != "root") {
				list.unshift(p);
				p = p.parent;
			}
			return list;
		}
	};
	var container = new MouseEventContainer();
	container.set(LMouseEvent.MOUSE_DOWN,true);
	container.set(LMouseEvent.MOUSE_UP,true);
	container.set(LMouseEvent.MOUSE_MOVE,true);
	return container;
})();