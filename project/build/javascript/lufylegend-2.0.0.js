/**
* lufylegend
* @version 1.10.2
* @Explain lufylegend是一个HTML5开源引擎，利用它可以快速方便的进行HTML5的开发
* @author lufy(lufy_legend)
* @blog http://blog.csdn.net/lufy_Legend
* @email lufy.legend@gmail.com
* @homepage http://lufylegend.com/lufylegend
* @github https://github.com/lufylegend/lufylegend.js
*/
var OS_PC = "pc",
OS_IPHONE = "iPhone",
OS_IPOD = "iPod",
OS_IPAD = "iPad",
OS_ANDROID = "Android",
OS_WINDOWS_PHONE = "Windows Phone",
OS_BLACK_BERRY = "BlackBerry",
NONE = "none",
UNDEFINED = "undefined",
LANDSCAPE = "landscape",
PORTRAIT = "portrait",
mouseX,
mouseY;
function LEvent(type){
	this.eventType = type;
	this._ll_preventDefault = false;
}
LEvent.prototype.preventDefault = function () {
	this._ll_preventDefault = true;
};
LEvent.INIT = "init";
LEvent.COMPLETE = "complete";
LEvent.ERROR = "error";
LEvent.PROGRESS = "progress";
LEvent.ENTER_FRAME = "enter_frame";
LEvent.WINDOW_RESIZE = "resize";
LEvent.WINDOW_ORIENTATIONCHANGE = "orientationchange";
LEvent.SOUND_COMPLETE = "sound_complete";
LEvent.END_CONTACT = "endContact";
LEvent.PRE_SOLVE = "preSolve";
LEvent.POST_SOLVE = "postSolve";
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.addEventListener = function (n, t, f, b) {
	if (b == null) {
		b = false;
	}
	if (n.addEventListener) {
		n.addEventListener(t, f, b);
	} else if (n.attachEvent) {
		n["e" + t + f] = f;
		n[t + f] = function () {
			n["e" + t + f]();
		};
		n.attachEvent("on" + t, n[t + f]);
	}
};
LEvent.removeEventListener = function (n, t, f, b) {
	if (b == null) {
		b = false;
	}
	if (n.removeEventListener) {
		n.removeEventListener(t, f, b);
	} else if (n.detachEvent) {
		n["e" + t + f] = f;
		n[t + f] = function () {
			n["e" + t + f]();
		};
		n.detachEvent("on" + t, n[t + f]);
	}
};
var LMouseEvent = function (){throw "LMouseEvent cannot be instantiated";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OVER = "mouseover";
LMouseEvent.MOUSE_OUT = "mouseout";
LMouseEvent.DOUBLE_CLICK = "dblclick";
var LMultitouchInputMode = function () {throw "LMultitouchInputMode cannot be instantiated";};
LMultitouchInputMode.NONE = "none";
LMultitouchInputMode.GESTURE = "gesture";
LMultitouchInputMode.TOUCH_POINT = "touchPoint";
var LMultitouch = function () {throw "LMultitouch cannot be instantiated";};
LMultitouch.inputMode = "none";
LMultitouch.touchs = [];
var LTimerEvent = function (){throw "LTimerEvent cannot be instantiated";};
LTimerEvent.TIMER = "timer";
LTimerEvent.TIMER_COMPLETE = "timerComplete";
var LTextEvent = function () {throw "LTextEvent cannot be instantiated";};
LTextEvent.TEXT_INPUT = "textInput";
LTextEvent.WIND_COMPLETE = "windComplete";
var LFocusEvent = function (){throw "LFocusEvent cannot be instantiated";};
LFocusEvent.FOCUS_IN = "focusIn";
LFocusEvent.FOCUS_OUT = "focusOut";
var LMouseEventContainer = (function () {
	function MouseEventContainer(){
		var s = this;
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
			var self = this, i, j, l = st.length;
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
var LKeyboardEvent = function () {throw "LKeyboardEvent cannot be instantiated";};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PRESS = "keypress";
var LAccelerometerEvent = function (){throw "LAccelerometerEvent cannot be instantiated";};
LAccelerometerEvent.DEVICEMOTION = "devicemotion";
function LStageAlign(){throw "LStageAlign cannot be instantiated";}
LStageAlign.TOP = "T";
LStageAlign.BOTTOM = "B";
LStageAlign.LEFT = "L";
LStageAlign.RIGHT = "Re";
LStageAlign.TOP_LEFT = "TL";
LStageAlign.TOP_RIGHT = "TR";
LStageAlign.TOP_MIDDLE = "TM";
LStageAlign.BOTTOM_LEFT = "BL";
LStageAlign.BOTTOM_RIGHT = "BR";
LStageAlign.BOTTOM_MIDDLE = "BM";
LStageAlign.MIDDLE = "M";
function LStageScaleMode () {throw "LStageScaleMode cannot be instantiated";}
LStageScaleMode.EXACT_FIT = "exactFit";
LStageScaleMode.SHOW_ALL = "showAll";
LStageScaleMode.NO_BORDER = "noBorder";
LStageScaleMode.NO_SCALE = "noScale";
var LGlobal = ( function () {
	function LGlobal () {
		throw "LGlobal cannot be instantiated";
	}
	LGlobal.FULL_SCREEN = "full_screen";
	LGlobal.traceDebug = false;
	LGlobal.displayState = NONE;
	LGlobal.aspectRatio = NONE;
	LGlobal.canvasObj = null;
	LGlobal.canvas = null;
	LGlobal.webAudio = true;
	LGlobal.objectIndex = 1;
	LGlobal.stage = null;
	LGlobal.width = 0;
	LGlobal.height = 0;
	LGlobal.box2d = null;
	LGlobal.speed = 50;
	LGlobal.IS_MOUSE_DOWN = false;
	LGlobal.stopPropagation = false;
	LGlobal.preventDefault = true;
	LGlobal.childList = new Array();
	LGlobal.dragList = new Array();
	LGlobal.excludingContainer = new Array();
	LGlobal.fpsStatus = null;
	LGlobal.stageScale = "noScale";
	LGlobal.align = "M";
	LGlobal.mobile = false;
	LGlobal.canTouch = false;
	LGlobal.os = OS_PC;
	LGlobal.ios = false;
	LGlobal.android = false;
	LGlobal.android_new = false;
	LGlobal.backgroundColor = null;
	LGlobal.destroy = true;
	LGlobal.forceRefresh = false;
	LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
	LGlobal.startTimer = 0;
	LGlobal.keepClear = true;
	LGlobal.top = 0;
	LGlobal.left = 0;
	LGlobal.enableWebGL = (function(){
		return typeof enableWebGLCanvas !== UNDEFINED;
	})();
	LGlobal.window = window;
	(function (n) {
		LGlobal.isOldFirefox = (function(un){
			var i = un.toLowerCase().indexOf('firefox');
			if (i < 0) {
				return false;
			}
			var v = un.substring(i + 8, un.length);
			return parseFloat(v) < 39.0;
		})(n);
		if (n.indexOf(OS_IPHONE) > 0) {
			LGlobal.os = OS_IPHONE;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPOD) > 0) {
			LGlobal.os = OS_IPOD;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPAD) > 0) {
			LGlobal.os = OS_IPAD;
			LGlobal.ios = true;
			LGlobal.canTouch = true;
		} else if (n.indexOf(OS_ANDROID) > 0) {
			LGlobal.os = OS_ANDROID;
			LGlobal.canTouch = true;
			LGlobal.android = true;
			var i = n.indexOf(OS_ANDROID);
			if(parseInt(n.substr(i + 8, 1)) > 3){
				LGlobal.android_new = true;
			}
		} else if (n.indexOf(OS_WINDOWS_PHONE) > 0) {
			LGlobal.os = OS_WINDOWS_PHONE;
			LGlobal.canTouch = true;
		} else if (n.indexOf(OS_BLACK_BERRY) > 0) {
			LGlobal.os = OS_BLACK_BERRY;
			LGlobal.canTouch = true;
		}
		if(LGlobal.ios){
			var v = n.match(/OS\s(\d+)_(\d+)_?(\d+)?/);
			LGlobal.iOSversion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		}
		LGlobal.mobile = LGlobal.canTouch;
	})(navigator.userAgent);
	LGlobal.setDebug = function (v) {
		LGlobal.traceDebug = v; 
	};
	LGlobal.setCanvas = function (id, w, h) {
		LGlobal.ll_createCanvas(id, w, h);
		LGlobal.ll_createStage();
		if(LGlobal.displayState == LStage.FULL_SCREEN){
			LGlobal.resize();
		}else if(typeof LGlobal.displayState == "number"){
			LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
		}
		if (LGlobal.canTouch) {
			LGlobal.ll_clicks = 0;
			LGlobal.ll_prev_clickTime = 0;
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START, LGlobal.ll_touchStart);
			LEvent.addEventListener(document, LMouseEvent.TOUCH_END, LGlobal.ll_touchEnd);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_MOVE, LGlobal.ll_touchMove);
		} else {
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.DOUBLE_CLICK, LGlobal.ll_mouseDbclick);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN, LGlobal.ll_mouseDown);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE, LGlobal.ll_mouseMove);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP, LGlobal.ll_mouseUp);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT, LGlobal.ll_mouseOut);
		}
	};
	LGlobal.ll_createCanvas = function (id, w, h) {
		LGlobal.id = id;
		LGlobal.object = document.getElementById(id);
		LGlobal.object.innerHTML = '<div style="position:absolute;margin:0;padding:0;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">' +
		'<canvas id="' + LGlobal.id + '_canvas" style="margin:0;padding:0;width:' + w + 'px;height:' + h + 'px;">' +
		'<div id="noCanvas">' +
		"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>" + 
		'</div>' +  
		'</canvas></div>' +
		'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0;padding:0;z-index:10;display:none;">' +
		'<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>' +
		'<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" />' +
		'<input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
		LGlobal.canvasObj = document.getElementById(LGlobal.id + "_canvas");
		LGlobal._canvas = document.createElement("canvas");
		LGlobal._context = LGlobal._canvas.getContext("2d");
		if (LGlobal._context) {
			LGlobal.canvasObj.innerHTML="";
		}
		LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
		LGlobal.inputTextareaBoxObj = document.getElementById(LGlobal.id + '_InputTextareaBox');
		LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
		LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
		LGlobal.inputTextField = null;
		if (w) {
			LGlobal.canvasObj.width = w;
		}
		if (h) {
			LGlobal.canvasObj.height = h;
		}
		LGlobal.width = LGlobal.canvasObj.width;
		LGlobal.height = LGlobal.canvasObj.height;
		LGlobal.canvasStyleWidth = LGlobal.width;
		LGlobal.canvasStyleHeight = LGlobal.height;
		if(typeof enableWebGLCanvas !== UNDEFINED){
			LGlobal.canvas = enableWebGLCanvas(LGlobal.canvasObj);
		}else{
			LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
		}
		LGlobal.offsetX = mouseX = 0;
		LGlobal.offsetY = mouseY = 0;
	};
	LGlobal.ll_createStage = function () {
		LGlobal.stage = new LSprite();
		LGlobal.stage.parent = "root";
		LGlobal.childList.push(LGlobal.stage);
		LGlobal.stage.baseAddEvent = LGlobal.stage.addEventListener;
		LGlobal.stage.baseRemoveEvent = LGlobal.stage.removeEventListener;
		LGlobal.stage.addEventListener = function (type, listener) {
			if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
				if(type == LEvent.WINDOW_RESIZE){
					LGlobal.stage.onresizeListener = listener;
				}else{
					LGlobal.stage.onorientationchangeListener = listener;
				}
				if(!LGlobal.stage.onresize){
					LGlobal.stage.onresize = function (e) {
						LGlobal.stage.onresizeEvent = e;
					};
					LEvent.addEventListener(LGlobal.window, type,LGlobal.stage.onresize);
				}
			} else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
				LEvent.addEventListener(LGlobal.window, type, listener);
			} else {
				LGlobal.stage.baseAddEvent(type, listener);
			}
		};
		LGlobal.stage.removeEventListener = function (type, listener) {
			if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
				if(type == LEvent.WINDOW_RESIZE){
					delete LGlobal.stage.onresizeListener;
					if(LGlobal.stage.onorientationchangeListener){
						return;
					}
				}else{
					delete LGlobal.stage.onorientationchangeListener;
					if(LGlobal.stage.onresizeListener){
						return;
					}
				}
				LEvent.removeEventListener(LGlobal.window, LEvent.WINDOW_RESIZE, LGlobal.stage.onresize);
				delete LGlobal.stage.onresize;
			} else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
				LEvent.removeEventListener(LGlobal.window, type, listener);
			} else {
				LGlobal.stage.baseRemoveEvent(type, listener);
			}
		};
		LGlobal.innerWidth = window.innerWidth;
		LGlobal.innerHeight = window.innerHeight;
		LEvent.addEventListener(LGlobal.window, "blur", function(){
			LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
		});
	};
	LGlobal.ll_touchStart = function (event) {
		LGlobal._outStageCheckCount = 1;
		LGlobal.IS_MOUSE_DOWN = true;
		LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
		if (LGlobal.inputBox.style.display != NONE) {
			LGlobal.inputTextField._ll_getValue();
		}
		var canvasX, canvasY, eve, k, i;
		canvasX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
		canvasY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
		if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
			eve = LGlobal.ll_touchStartEvent(event, 0, canvasX, canvasY);
		} else if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
			for (var i = 0,l = event.touches.length; i < l; i++) {
				if(!LMultitouch.touchs["touch" + event.touches[i].identifier]){
					eve = LGlobal.ll_touchStartEvent(event, i, canvasX, canvasY);
				}
			}
		}
		var date = new Date();
		var clickTime = date.getTime();
		LGlobal.ll_clicks = (clickTime <= (LGlobal.ll_prev_clickTime + 500)) ? (LGlobal.ll_clicks + 1) : 1;
		LGlobal.ll_prev_clickTime = clickTime;
		if (LGlobal.ll_clicks === 2) {
			LGlobal.mouseEvent(eve, LMouseEvent.DOUBLE_CLICK);
			LGlobal.ll_clicks = 0;
		}
		if (LGlobal.mouseJoint_start) {
			LGlobal.mouseJoint_start(eve);
		}
		LGlobal.touchHandler(event);
	};
	LGlobal.ll_touchStartEvent = function (event,eveIndex,canvasX,canvasY) {
		var eve = {offsetX : (event.touches[eveIndex].pageX - canvasX),
		offsetY : (event.touches[eveIndex].pageY - canvasY),
		touchPointID : event.touches[eveIndex].identifier,
		force : event.touches[eveIndex].force,
		rotationAngle : event.touches[eveIndex].rotationAngle,
		radiusX : event.touches[eveIndex].radiusX,
		radiusY : event.touches[eveIndex].radiusY};
		eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
		eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
		mouseX = LGlobal.offsetX = eve.offsetX;
		mouseY = LGlobal.offsetY = eve.offsetY;
		LMultitouch.touchs["touch" + eve.touchPointID] = eve;
		LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_DOWN);
		LGlobal.buttonStatusEvent = eve;
		return eve;
	};
	LGlobal.ll_touchEnd = function (event) {
		var e, eve, k, i, l, h;
		LGlobal.IS_MOUSE_DOWN = false;
		if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
			for (k in LMultitouch.touchs) {
				e = LMultitouch.touchs[k];
				h = false;
				for (i = 0,l = event.touches.length; i < l; i++) {
					if (event.touches[i].identifier == e.touchPointID) {
						h = true;
						break;
					}
				}
				if (!h) {
					eve = e;
					delete LMultitouch.touchs[k];
					LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
				}
			}
		}
		if (!eve) {
			eve = {offsetX : LGlobal.offsetX, offsetY : LGlobal.offsetY};
			LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
		}
		LGlobal.touchHandler(event);
		LGlobal.buttonStatusEvent = null;
		if (LGlobal.mouseJoint_end) {
			LGlobal.mouseJoint_end();
		}
		LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
	};
	LGlobal.ll_touchMove = function (e) {
		var cX, cY, eve, l, ll = e.touches.length;
		cX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
		cY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
		if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
			ll = 1;
		}
		for (i = 0, l = e.touches.length; i < l && i < ll; i++) {
			eve = {offsetX : (e.touches[i].pageX - cX), offsetY : (e.touches[i].pageY - cY), touchPointID : e.touches[i].identifier};
			eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
			eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
			mouseX = LGlobal.offsetX = eve.offsetX;
			mouseY = LGlobal.offsetY = eve.offsetY;
			if (LMultitouch.touchs["touch" + eve.touchPointID] && 
				LMultitouch.touchs["touch" + eve.touchPointID].offsetX == eve.offsetX && 
				LMultitouch.touchs["touch" + eve.touchPointID].offsetY == eve.offsetY){
				continue;	
			}
			LGlobal.buttonStatusEvent = eve;
			LMultitouch.touchs["touch" + eve.touchPointID] = eve;
			if(eve.offsetX <= 0 || eve.offsetX >= LGlobal.innerWidth || eve.offsetX >= LGlobal.width || eve.offsetY <= 0 || eve.offsetY >= LGlobal.innerHeight || eve.offsetY >= LGlobal.height){
				LGlobal._outStageCheckCount = 0;
			}else{
				LGlobal._outStageCheckCount = 1;
			}
			LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_MOVE);
		}
		LGlobal.touchHandler(e);
		if (LGlobal.mouseJoint_move) {
			LGlobal.mouseJoint_move(eve);
		}
	};
	LGlobal.ll_mouseDbclick = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.DOUBLE_CLICK);
	};
	LGlobal.ll_mouseDown = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		if (LGlobal.inputBox.style.display != NONE) {
			LGlobal.inputTextField._ll_getValue();
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_DOWN);
		LGlobal.IS_MOUSE_DOWN = true;
		if (LGlobal.mouseJoint_start) {
			LGlobal.mouseJoint_start(event);
		}
	};
	LGlobal.ll_mouseMove = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.buttonStatusEvent = event;
		mouseX = LGlobal.offsetX = event.offsetX;
		mouseY = LGlobal.offsetY = event.offsetY;
		LGlobal.cursor = "default";
		if(mouseX <= 0 || mouseX >= LGlobal.innerWidth || mouseX >= LGlobal.width || mouseY <= 0 || mouseY >= LGlobal.innerHeight || mouseY >= LGlobal.height){
			if(LGlobal._outStageCheckCount){
				LGlobal._outStageCheckCount = 0;
				LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
			}
		}else{
			if(!LGlobal._outStageCheckCount){
				LGlobal._outStageCheckCount = 1;
				LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
			}
		}
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_MOVE);
		document.body.style.cursor = LGlobal.cursor;
		if (LGlobal.mouseJoint_move) {
			LGlobal.mouseJoint_move(event);
		}
	};
	LGlobal.ll_mouseUp = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_UP);
		LGlobal.IS_MOUSE_DOWN = false;
		if (LGlobal.mouseJoint_end) {
			LGlobal.mouseJoint_end();
		}
	};
	LGlobal.ll_mouseOut = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_OUT);
		LGlobal.IS_MOUSE_DOWN = false;
	};
	LGlobal.touchHandler = function (e) {
		if (LGlobal.stopPropagation) {
			e.stopPropagation();
			if (e.stopImmediatePropagation) {
				e.stopImmediatePropagation();
			}
		}
		if (LGlobal.preventDefault) {
			e.preventDefault();
		}
		return e;
	};
	LGlobal.mouseEvent = function (e, t) {
		if (t == LMouseEvent.MOUSE_MOVE) {
			LGlobal.dragHandler(e);
		}
		if (LMouseEventContainer.container[t]) {
			LMouseEventContainer.dispatchMouseEvent(e, t);
			return;
		}
		for (var k = LGlobal.childList.length - 1; k >= 0; k--) {
			if (LGlobal.childList[k].mouseEvent && LGlobal.childList[k].mouseEvent(e, t)) {
				break;
			}
		}
	};
	LGlobal.dragHandler = function (e) {
		var i, s, c, d = LGlobal.dragList;
		for(i = d.length - 1; i >= 0; i--) {
			s = d[i];
			if (LGlobal.canTouch && s.ll_touchPointID != e.touchPointID) {
				continue;
			}
			c = s.parent.globalToLocal(new LPoint(e.offsetX - s.ll_dragMX + s.ll_dragGlobalPoint.x, e.offsetY - s.ll_dragMY + s.ll_dragGlobalPoint.y));
			s.x = c.x;
			s.y = c.y;
			if (s.dragRange) {
				if (s.x < s.dragRange.left) {
					s.x = s.dragRange.left;
				} else if(s.x > s.dragRange.right){
					s.x = s.dragRange.right;
				}
				if (s.y < s.dragRange.top) {
					s.y = s.dragRange.top;
				} else if(s.y > s.dragRange.bottom){
					s.y = s.dragRange.bottom;
				}
			}
			break;
		}
	};
	LGlobal._ll_mobile = function () {
		var w1 = LGlobal.width * 0.3, h1 = w1 * 1.5, s = LGlobal.width * 0.05, ss = w1 * 0.05, sm = w1 * 0.15, 
		sx = w1 * 0.3, sh = h1 * 0.20, c = '#cccccc', d = '#000000', f = '#ffffff', h = '#ff0000', b, w1, h1, m, m1, n, v;
		b = new LSprite();
		addChild(b);
		w1 = LGlobal.width * 0.3, h1 = w1 * 1.5;
		b.graphics.drawRoundRect(1, d, [s, s, w1, h1, s],true,c);
		b.graphics.drawRoundRect(1, d, [s + ss, s + ss, w1 - ss * 2, h1 - ss * 2, s], true, d);
		b.graphics.drawRect(1, f, [s + sm, s + sh, w1 - sm * 2, h1 - sh * 2], true, f);
		b.graphics.drawArc(1, f, [s + w1 * 0.5, s + h1 - ss * 3.5, ss * 1.5, 0, 2 * Math.PI]);
		b.graphics.drawRoundRect(1, f, [s + sx, s + sm, w1 - sx * 2, ss, ss * 0.5]);
		m = new LSprite();
		m.x = -(w1 - sm * 2) * 0.5;
		m.y = -ss * 0.5;
		m.graphics.drawRect(1, h, [0, 0, w1 - sm * 2, ss], true, h);
		m1 = new LSprite();
		m1.y = -(w1 - sm * 2) * 0.5;
		m1.x = -ss * 0.5;
		m1.graphics.drawRect(1, h, [0, 0, ss, w1 - sm * 2], true, h);
		n = new LSprite();
		n.x = s + sx + (w1 - sx * 2) * 0.5;
		n.y = s + sh + (h1 - sh * 2) * 0.5;
		n.rotate = 45;
		n.addChild(m);
		n.addChild(m1);
		b.addChild(n);
		v = new LSprite();
		v.graphics.drawVertices(2, d, [[0, 0], [sm, sm ], [0, sm * 2]], true, c);
		v.x = s * 1.5 + h1;
		v.y = s * 1.5 + h1 * 0.5;
		addChild(v);
		b.arrow = v;
		var fn = function () {
			setTimeout(function () {
				location.href = location.href;
			}, 100);
		};
		window.onorientationchange = fn;
		return b;
	};
	LGlobal.verticalError = function () {
		var w1 = LGlobal.width * 0.3, s = LGlobal.width * 0.05;
		var b = LGlobal._ll_mobile();
		var d = b.clone();
		d.getChildAt(0).visible = false;
		d.x = LGlobal.width * 0.5 + s;
		addChild(d);
		b.rotate = 90;
		b.x = LGlobal.width * 0.5 + s;
		b.y = w1 * 0.5;
	};
	LGlobal.horizontalError = function () {
		var w1 = LGlobal.width * 0.3, s = LGlobal.width * 0.05;
		var b = LGlobal._ll_mobile();
		var d = b.clone();
		d.getChildAt(0).visible = false;
		d.rotate = 90;
		d.x = LGlobal.width - s;
		d.y = w1 * 0.5;
		addChild(d);
		b.arrow.x = s * 1.5 + w1;
	};
	LGlobal.onShow = function () {
		if (LGlobal.canvas == null) {
			return;
		}
		if(LGlobal.canvas.start2D){
			LGlobal.canvas.start2D();
			LGlobal.canvas.globalAlpha = 1;
		}
		if(LGlobal._outStageCheckCount <= 0){
			LGlobal._outStageCheckCount--;
			if(LGlobal._outStageCheckCount < -2){
				LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
				LGlobal._outStageCheckCount = 1;
			}
		}
		if (LGlobal.fpsStatus) {
			LGlobal.fpsStatus.reset();
		}
		if (LGlobal.stage.onresizeEvent) {
			if(LGlobal.stage.onresizeListener){
				LGlobal.stage.onresizeListener(LGlobal.stage.onresizeEvent);
			}
			if(LGlobal.stage.onorientationchangeListener){
				LGlobal.stage.onorientationchangeListener({orientation:(window.innerWidth > window.innerHeight ? LANDSCAPE : PORTRAIT)});
			}
			delete LGlobal.stage.onresizeEvent;
		}
		if (LGlobal.forceRefresh) {
			LGlobal.canvasObj.width = LGlobal.canvasObj.width;
			LGlobal.forceRefresh = false;
		}
		LGlobal.canvas.beginPath();
		if (LGlobal.box2d != null) {
			LGlobal.box2d.ll_show();
			if (!LGlobal.traceDebug && LGlobal.keepClear) {
				LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
			}
		} else {
			if (LGlobal.keepClear) {
				LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
			}
			if (LGlobal.backgroundColor !== null) {
				LGlobal.canvas.fillStyle = LGlobal.backgroundColor;
				LGlobal.canvas.fillRect(0, 0, LGlobal.width, LGlobal.height);
			}
		}
		LGlobal.show(LGlobal.childList, LGlobal.canvas);
		if(LGlobal.canvas.finish2D){
			LGlobal.canvas.finish2D();
		}
	};
	LGlobal.show = function (s, ctx) {
		ctx = ctx || LGlobal.canvas;
		for (var i = 0, l = s.length, c; i < l; i++) {
			c = s[i];
			if (c && c.ll_show) {
				c.ll_show(ctx);
				if(c._ll_removeFromSelf){
					i--;
					l--;
				}
			}
		}
	};
	LGlobal.divideCoordinate = function (w, h, row, col) {
		var i, j, cw = w / col, ch = h / row, r = [], c;
		for (i = 0; i < row; i++) {
			c = [];
			for (j = 0; j < col; j++) {
				c.push({x : cw * j, y : ch * i, width : cw, height : ch});
			}
			r.push(c);
		}
		return r;
	};
	LGlobal._create_loading_color = function () {
		var co = LGlobal.canvas.createRadialGradient(LGlobal.width / 2, LGlobal.height, 0, LGlobal.width / 2, 0, LGlobal.height);  
		co.addColorStop(0, "red");  
		co.addColorStop(0.3, "orange");  
		co.addColorStop(0.4, "yellow");  
		co.addColorStop(0.5, "green");  
		co.addColorStop(0.8, "blue");  
		co.addColorStop(1, "violet");  
		return co;
	};
	LGlobal.hitPolygon = function (list, x, y) {
		var c = 0, p0 = list[0], b0x = (x <= p0[0]), b0y = (y <= p0[1]), i, l, p1, b1x, b1y;
		for (i = 1, l = list.length; i < l + 1; i++) {
			p1 = list[i % l];
			b1x = (x <= p1[0]);
			b1y = (y <= p1[1]);
			if (b0y != b1y) {
				if (b0x == b1x) {
					if (b0x) {
						c += (b0y ? -1 : 1);
					}
				} else {
					if (x <= (p0[0] + (p1[0] - p0[0]) * (y - p0[1] ) / (p1[1] - p0[1]))) {
						c += (b0y ? -1 : 1);
					}
				}
			}
			p0 = p1;
			b0x = b1x;
			b0y = b1y;
		}
		return 0 != c;
	};
	LGlobal.hitTestPolygon = function (p1, p2) {
		var i, j, l, listA, normals, vecs, list = [[p1, [], []], [p2, [], []]];
		for (j = 0; j < list.length; j++) {
			listA = list[j][0], normals = list[j][1];
			for (i = 0, l = listA.length; i < l; i++) {
				list[j][2].push(new LVec2(listA[i][0], listA[i][1]));
				if (i < l - 1) {
					normals.push((new LVec2(listA[i + 1][0] - listA[i][0], listA[i + 1][1] - listA[i][1])).normL());
				}
			}
			normals.push((new LVec2(listA[0][0] - listA[l - 1][0], listA[0][1] - listA[l - 1][1])).normL());
		}
		for (j = 0; j < list.length; j++) {
			normals = list[j][1];
			for (i = 0, l = normals.length; i < l; i++) {
				var r1 = LVec2.getMinMax(list[0][2], normals[i]);
				var r2 = LVec2.getMinMax(list[1][2], normals[i]);
				if (r1.max_o < r2.min_o || r1.min_o > r2.max_o) {
					return false;
				}
			}
		}
		return true;
	};
	LGlobal.hitTestPolygonArc = function (vs, arc) {
		if (LGlobal.hitPolygon(vs, arc[0], arc[1])) {
			return true;
		}
		var i, j, l, p1, p2, v1, v2, ext, inn, l2;
		for (i = 0, l = vs.length; i < l; i++) {
			j = i < l - 1 ? i + 1 : 0;
			p1 = vs[i], p2 = vs[j];
			v1 = new LVec2(arc[0] - p1[0], arc[1] - p1[1]), v2 = new LVec2(p2[0] - p1[0], p2[1] - p1[1]);
			l2 = v2.normalize();
			inn = LVec2.dot(v1, l2);
			if (inn <= 0) {
				if (v1.x * v1.x + v1.y * v1.y < arc[3]) {
					return true;
				}
			} else if (inn * inn < v2.x * v2.x + v2.y * v2.y) {
				ext = LVec2.cross(v1, l2);
				if (ext * ext < arc[3]) {
					return true;
				}
			}
		}
		return false;
	};
	LGlobal.hitTestArc = function (objA, objB, objAR, objBR) {
		var rA = objA.getWidth() * 0.5
		,rB = objB.getWidth() * 0.5
		,xA = objA._startX ? objA._startX() : objA.startX()
		,xB = objB._startX ? objB._startX() : objB.startX()
		,yA = objA._startY ? objA._startY() : objA.startY()
		,yB = objB._startY ? objB._startY() : objB.startY();
		if (typeof objAR != UNDEFINED) {
			xA += (rA - objAR);
			yA += (rA - objAR);
			rA = objAR;
		}
		if (typeof objBR != UNDEFINED) {
			xB += (rB - objBR);
			yB += (rB - objBR);
			rB = objBR;
		}
		var disx = xA + rA - xB - rB
		,disy = yA + rA - yB - rB;
		return disx * disx + disy * disy < (rA + rB) * (rA + rB);
	};
	LGlobal.hitTestRect = function (objA, objB, vecA, vecB) {
		var wA = objA.getWidth()
		,wB = objB.getWidth()
		,hA = objA.getHeight()
		,hB = objB.getHeight()
		,xA = objA._startX ? objA._startX() : objA.startX()
		,xB = objB._startX ? objB._startX() : objB.startX()
		,yA = objA._startY ? objA._startY() : objA.startY()
		,yB = objB._startY ? objB._startY() : objB.startY();
		if (typeof vecA != UNDEFINED) {
			xA += (wA - vecA[0]) * 0.5;
			yA += (hA - vecA[1]) * 0.5;
			wA = vecA[0];
			hA = vecA[1];
		}
		if (typeof vecB != UNDEFINED) {
			xB += (wB - vecB[0]) * 0.5;
			yB += (hB - vecB[1]) * 0.5;
			wB = vecB[0];
			hB = vecB[1];
		}
		var minx = xA > xB ? xA : xB
		,miny = yA > yB ? yA : yB
		,maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA)
		,maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
		return minx <= maxx && miny <= maxy;
	};
	LGlobal.hitTest = LGlobal.hitTestRect;
	LGlobal.setFrameRate = function (s) {
		if (LGlobal.frameRate) {
			clearInterval(LGlobal.frameRate);
		}
		LGlobal.speed = s;
		LGlobal.frameRate = setInterval(function () {
			LGlobal.onShow();
		}, s);
	};
	LGlobal.ll_scaleX = function (v) {
		return (v - LGlobal.left) * LGlobal.width/LGlobal.canvasStyleWidth;
	};
	LGlobal.ll_scaleY = function (v) {
		return (v - LGlobal.top) * LGlobal.height / LGlobal.canvasStyleHeight;
	};
	LGlobal.ll_setStageSize = function (w, h) {
		w =  Math.ceil(w);
		h =  Math.ceil(h);
		LGlobal.canvasObj.style.width = w + "px";
		LGlobal.canvasObj.style.height = h + "px";
		LGlobal.canvasStyleWidth = w;
		LGlobal.canvasStyleHeight = h;
	};
	LGlobal.resize = function (canvasW, canvasH) {
		var w, h, t = 0, l = 0, ww = window.innerWidth, wh = window.innerHeight;
		LGlobal.innerWidth = ww;
		LGlobal.innerHeight = wh;
		if (canvasW) {
			w = canvasW;
		}
		if (canvasH) {
			h = canvasH;
		}
		if (LGlobal.stageScale == "noScale") {
			w = canvasW || LGlobal.width;
			h = canvasH || LGlobal.height;
		}
		switch (LGlobal.stageScale) {
		case "exactFit":
			w = canvasW || ww;
			h = canvasH || wh;
			break;
		case "noBorder":
			w = canvasW || ww;
			h = canvasH || LGlobal.height*ww/LGlobal.width;
			switch (LGlobal.align) {
			case LStageAlign.BOTTOM:
			case LStageAlign.BOTTOM_LEFT:
			case LStageAlign.BOTTOM_RIGHT:
			case LStageAlign.BOTTOM_MIDDLE:
				t = wh - h;
				break;
			}
		break;
		case "showAll":
			if (ww / wh > LGlobal.width / LGlobal.height) {
				h = canvasH || wh;
				w = canvasW || LGlobal.width * wh / LGlobal.height;
			} else {
				w = canvasW || ww;
				h = canvasH || LGlobal.height * ww / LGlobal.width;
			}
		case "noScale":
		default:
			switch (LGlobal.align) {
			case LStageAlign.BOTTOM:
			case LStageAlign.BOTTOM_LEFT:
				t = wh - h;
				break;
			case LStageAlign.RIGHT:
			case LStageAlign.TOP_RIGHT:
				l = ww - w;
				break;
			case LStageAlign.TOP_MIDDLE:
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.BOTTOM_RIGHT:
				t = wh - h;
				l = ww - w;
				break;
			case LStageAlign.BOTTOM_MIDDLE:
				t = wh - h;
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.MIDDLE:
				t = (wh - h) * 0.5;
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.TOP:
			case LStageAlign.LEFT:
			case LStageAlign.TOP_LEFT:
			default:
			}
		}
		LGlobal.canvasObj.style.marginTop = t + "px";
		LGlobal.canvasObj.style.marginLeft = l + "px";
		if (LGlobal.isOldFirefox) {
			LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
			LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
		}
		LGlobal.ll_setStageSize(w, h);
	};
	LGlobal.sleep = function (s) {
		var d = new Date();   
		while ((new Date().getTime() - d.getTime()) < s) {}
	};
	LGlobal.screen = function (a) {
		LGlobal.displayState = a;
		if (LGlobal.stage) {
			if (typeof LGlobal.displayState == "number") {
				LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
			} else {
				LGlobal.resize();
			}
		}
	};
	return LGlobal;
})();
var LSystem = LGlobal;
var LStage = LGlobal;
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (elt) {
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}
		for (; from < len; from++){
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}
if (!Array.isArray){
	Array.isArray = function(value){
		return Object.prototype.toString.apply(value) == '[object Array]';
	};
}
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var aArgs = Array.prototype.slice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function () {},
			fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}
if (!Array.prototype.find) {
	Array.prototype.find = function (predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;
		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
}
if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function (predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if ( typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;
		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return i;
			}
		}
		return -1;
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ( typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if ( k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.prototype.every) {
	Array.prototype.every = function(callbackfn, thisArg) {
		'use strict';
		var T, k;
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ( typeof callbackfn !== 'function') {
			throw new TypeError();
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if ( k in O) {
				kValue = O[k];
				var testResult = callbackfn.call(T, kValue, k, O);
				if (!testResult) {
					return false;
				}
			}
			k++;
		}
		return true;
	};
}
if (!Array.prototype.some) {
	Array.prototype.some = function(fun) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}
		if ( typeof fun !== 'function') {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		var thisArg = arguments.length >= 2 ? arguments[1] :
		void 0;
		for (var i = 0; i < len; i++) {
			if ( i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}
		return false;
	};
}
if (!String.format) {
	String.format = function(format) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return format.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number] 
	        : match
	      ;
	    });
	};
}
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
	Object.defineProperty(Function.prototype, 'name', {
		get:function() {
			var funcNameRegex = /function\s([^(]{1,})\(/;
			var results = (funcNameRegex).exec((this).toString());
			return (results && results.length > 1) ? results[1].trim() : "";
		},
		set:function(value) {}
	});
}
function trace() {
	if (!LGlobal.traceDebug) return;
	var t = document.getElementById("traceObject"), i;
	if (trace.arguments.length > 0 && t == null) {
		var d = document.createElement("DIV");
		d.position=0;
		d.style.position = "absolute";
		document.body.appendChild(d);
		t = document.createElement("TEXTAREA");
		t.id = "traceObject";
		t.style.width = (window.innerWidth*0.5) + "px";
		t.style.height = "200px";
		var b = document.createElement("BUTTON");
		b.style.width = (window.innerWidth*0.25) + "px";
		b.innerHTML="Hide";
		d.appendChild(b);
		LEvent.addEventListener(b,LGlobal.mobile ? "touchstart":"click", function(e){
			t.style.display = (t.style.display == "none" ? "":"none");
		});
		b = document.createElement("BUTTON");
		b.style.width = (window.innerWidth*0.25) + "px";
		b.innerHTML="position";
		d.appendChild(b);
		var f = function(e){
			d.position++;
			if(d.position == 0){
				d.style.top = "5px";
				d.style.left = "5px";
			}else if(d.position == 1){
				d.style.top = (window.innerHeight - 20 - parseInt(t.style.height)) + "px";
				d.style.left = "5px";
			}else if(d.position == 2){
				d.style.top = "5px";
				d.style.left = (window.innerWidth - parseInt(t.style.width)) + "px";
			}else{
				d.style.top = (window.innerHeight - 20 - parseInt(t.style.height)) + "px";
				d.style.left = (window.innerWidth - parseInt(t.style.width)) + "px";
				d.position = -1;
			}
		};
		f();
		LEvent.addEventListener(b,LGlobal.mobile ? "touchstart":"click", f);
		d.appendChild(document.createElement("BR"));
		d.appendChild(t);
	}
	for (i = 0; i < trace.arguments.length; i++) {
		t.value = t.value + trace.arguments[i] + "\r\n";
		t.scrollTop = t.scrollHeight;
	}
}
if (!window.console) {
	window.console = {
		log : trace,
		warn : trace
	};
}
function addChild (o) {
	LGlobal.stage.addChild(o);
}
function removeChild (o) {
	LGlobal.stage.removeChild(o);
}
function init (s, c, w, h, f, t) {
	LGlobal.speed = s;
	var _f = function () {
		if (LGlobal.canTouch && LGlobal.aspectRatio == LANDSCAPE && window.innerWidth < window.innerHeight) {
			LGlobal.horizontalError();
		} else if (LGlobal.canTouch && LGlobal.aspectRatio == PORTRAIT && window.innerWidth > window.innerHeight) {
			LGlobal.verticalError();
		} else {
			setTimeout(f, 100);
		}
		LGlobal.startTimer = (new Date()).getTime();
	};
	var loop;
	if(typeof s == "function"){
		loop = function(){
			s(loop);
			LGlobal.onShow();
		};
		LGlobal.speed = 1000 / 60;
	}else{
		var _requestAF = (function() {
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback,  element) {
				window.setTimeout(callback, 1000/60);
			};
		})();
		LGlobal._requestAFBaseTime = (new Date()).getTime();
		loop = function(){
			var now = (new Date()).getTime();
			var check = now - LGlobal._requestAFBaseTime;
			if( check / s >= 1 ) {
				LGlobal._requestAFBaseTime += s;
				LGlobal.onShow();
			}
			_requestAF(loop, s);
		};
	}
	if (document.readyState === "complete") {
		LGlobal.setCanvas(c, w, h);
		loop();
	}else{
		LEvent.addEventListener(window, "load", function () {
			LGlobal._requestAFBaseTime = (new Date()).getTime();
			LGlobal.setCanvas(c, w, h);
			_f();
			loop();
		});
	}
}
var LInit = init;
function base (d, b, a) {
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	if (typeof d.__ll__parent__ == UNDEFINED) {
		d.__ll__parent__ = [];
		d.__ll__parent__ = [];
	}
	d.__ll__parent__.push(b.prototype);
	for (p in o) {
		h[p] = 1;
	}
	for (p in b.prototype) {
		if (!h[p]) {
			o[p] = b.prototype[p];
		}
	}
	if (o.toString == Object.prototype.toString) {
		o.toString = LObject.prototype.toString;
	}
	b.apply(d, a);
}
var LExtends = base;
function getTimer () {
	return (new Date()).getTime() - LGlobal.startTimer;
}
function getExtension (path) {
	var r, pattern = /([^#?]+\.)([^.#?]+)/;
	r = path.match(pattern);
	if (r.length >= 3) {
		return r[2].toLowerCase();
	}
	return null;
}
var LObject = (function () {
	function LObject () {
		this.type = "LObject";
		this.objectIndex = ++LGlobal.objectIndex;
		this.objectindex = this.objectIndex;
	}
	LObject.prototype = {
		callParent : function (f_n, args) {
			if (!f_n || !args) {
				return;
			}
			var s = this, init = false, r, k = "__ll__parent_call" + f_n;
			if (typeof s[k] == "undefined") {
				init = true;
				s[k] = 0;
			} else {
				s[k]++;
			}
			if (s[k] >= s.__ll__parent__.length) {
				return false;
			}
			if (!s.__ll__parent__[s[k]][f_n]) {
				r = s.callParent(f_n, args);
			} else {
				r = s.__ll__parent__[s[k]][f_n].apply(s, args);
			}
			if (init) {
				delete s[k];
			}
			return r;
		},
		copyProperty : function (a) {
			var s = this, k;
			for (k in a) {
				if (typeof a[k] == "number" || typeof a[k] == "string" || typeof a[k] == "boolean") {
					if (k == "objectindex" || k == "objectIndex") {
						continue;
					}
					s[k] = a[k];
				} else if (Array.isArray(a[k])) {
					s[k] = a[k].slice();
				} 
			}
			if (a.mask) {
				s.mask = a.mask.clone();
			}
		},
		toString : function () {
			return "[object " + this.constructor.name + "]";
		}
	};
	return LObject;
})();
var LTimer = (function () {
	function LTimer(delay, repeat) {
		var s = this;
		LExtends (s, LEventDispatcher, []);
		s.type = "LTimer";
		s.delay = delay;
		s.repeatCount = repeat ? repeat : Number.MAX_VALUE;
		s.running = false;
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
		start : function(){
			this.running = true;
		},
		stop : function(){
			this.running = false;
		},
		reset : function(){
			var s = this;
			s.currentTime = 0;
			s.currentCount = 0;
			s.stop();
		},
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
var LColorTransform = (function () {
	function LColorTransform (redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
		var s = this;
		LExtends (s, LObject, []);
		s.redMultiplier = redMultiplier;
		s.greenMultiplier = greenMultiplier;
		s.blueMultiplier = blueMultiplier;
		s.alphaMultiplier = alphaMultiplier;
		s.redOffset = redOffset;
		s.greenOffset = greenOffset;
		s.blueOffset = blueOffset;
		s.alphaOffset = alphaOffset;
	}
	return LColorTransform;
})();
var LTransform = (function () {
	function LTransform () {
		var s = this;
		LExtends (s, LObject, []);
		s.matrix = null;
	}
	return LTransform;
})();
var LMatrix = (function () {
	function LMatrix (a, b, c, d, tx, ty, u, v, w) {
		var s = this;
		LExtends (s, LObject, []);
		s.a = 1;
		s.b = 0;
		s.u = 0;
		s.c = 0;
		s.d = 1;
		s.v = 0;
		s.tx = 0;
		s.ty = 0;
		s.w = 1;
		if (typeof a != UNDEFINED) {
			s.a = a;
		}
		if (typeof b != UNDEFINED) {
			s.b = b;
		}
		if (typeof c != UNDEFINED) {
			s.c = c;
		}
		if (typeof d != UNDEFINED) {
			s.d = d;
		}
		if (typeof tx != UNDEFINED) {
			s.tx = tx;
		}
		if (typeof ty != UNDEFINED) {
			s.ty = ty;
		}
		if (typeof u != UNDEFINED) {
			s.u = u;
		}
		if (typeof v != UNDEFINED) {
			s.v = v;
		}
		if (typeof w != UNDEFINED) {
			s.w = w;
		}
	}
	var p = {
		setTo : function (a, b, c, d, tx, ty, u, v, w) {
			var s = this;
			if (typeof a != UNDEFINED) {
				s.a = a;
			}
			if (typeof b != UNDEFINED) {
				s.b = b;
			}
			if (typeof c != UNDEFINED) {
				s.c = c;
			}
			if (typeof d != UNDEFINED) {
				s.d = d;
			}
			if (typeof tx != UNDEFINED) {
				s.tx = tx;
			}
			if (typeof ty != UNDEFINED) {
				s.ty = ty;
			}
			if (typeof u != UNDEFINED) {
				s.u = u;
			}
			if (typeof v != UNDEFINED) {
				s.v = v;
			}
			if (typeof w != UNDEFINED) {
				s.w = w;
			}
			return s;
		},
		isIdentity : function () {
			var s = this;
			return (s.a == 1 && s.b == 0 && s.c == 0 && s.d == 1 && s.tx == 0 && s.ty == 0 && u == 0 && v == 0 && w == 1);
		},
		transform : function (c) {
			var s = this;
			c.transform(s.a, s.b, s.c, s.d, s.tx, s.ty);
			return s;
		},
		identity : function () {
			this.setTo(1, 0, 0, 1, 0, 0, 0, 0, 1);
		},
		rotate : function (q) {
			var s = this,
			radian = q * Math.PI / 180,
			cos = Math.cos(radian),
			sin = Math.sin(radian),
			mtx = new LMatrix(cos, sin, -sin, cos, 0, 0, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		scale : function (sx, sy) {
			var s = this,
			mtx = new LMatrix(sx, 0, 0, sy, 0, 0, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		translate : function (tx, ty) {
			var s = this,
			mtx = new LMatrix(1, 0, 0, 1, tx, ty, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		skew : function (kx, ky) {
			var s = this,
			mtx = new LMatrix(1, ky, kx, 1, 0, 0, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		add : function (mtx) {
			var s = this, a, b, c, d, tx, ty, u, v, w;
			a = s.a * mtx.a + s.b * mtx.c + s.u * mtx.tx;
			b = s.a * mtx.b + s.b * mtx.d + s.u * mtx.ty;
			u = s.a * mtx.u + s.b * mtx.v + s.u * mtx.w;
			c = s.c * mtx.a + s.d * mtx.c + s.v * mtx.tx;
			d = s.c * mtx.b + s.d * mtx.d + s.v * mtx.ty;
			v = s.c * mtx.u + s.d * mtx.v + s.v * mtx.w;
			tx = s.tx * mtx.a + s.ty * mtx.c + s.w * mtx.tx;
			ty = s.tx * mtx.b + s.ty * mtx.d + s.w * mtx.ty;
			w = s.tx * mtx.u + s.ty * mtx.v + s.w * mtx.w;
			s.setTo(a, b, c, d, tx, ty, u, v, w);
		},
		toArray : function (mtx) {
			var s = this;
			if (Array.isArray(mtx) && mtx.length == 3) {
				var m = mtx[0] * s.a + mtx[1] * s.c + mtx[2] * s.tx,
				n = mtx[0] * s.b + mtx[1] * s.d + mtx[2] * s.ty,
				k = mtx[0] * s.u + mtx[1] * s.v + mtx[2] * s.w;
				return [m, n, k];
			} else {
				var a = s.a * mtx.a + s.b * mtx.c + s.u * mtx.tx,
				b = s.a * mtx.b + s.b * mtx.d + s.u * mtx.ty,
				u = s.a * mtx.u + s.b * mtx.v + s.u * mtx.w,
				c = s.c * mtx.a + s.d * mtx.c + s.v * mtx.tx,
				d = s.c * mtx.b + s.d * mtx.d + s.v * mtx.ty,
				v = s.c * mtx.u + s.d * mtx.v + s.v * mtx.w,
				tx = s.tx * mtx.a + s.ty * mtx.c + s.w * mtx.tx,
				ty = s.tx * mtx.b + s.ty * mtx.d + s.w * mtx.ty,
				w = s.tx * mtx.u + s.ty * mtx.v + s.w * mtx.w;
				return [a, b, c, d, tx, ty, u, v, w];
			}
		},
		clone : function () {
			var s = this;
			return new LMatrix(s.a, s.b, s.c, s.d, s.tx, s.ty, s.u, s.v, s.w);
		}
	};
	for (var k in p) {
		LMatrix.prototype[k] = p[k];
	}
	return LMatrix;
})();
var LVec2 = (function () {
	function LVec2 (x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	LVec2.dot = function (a, b) {
		return a.x * b.x + a.y * b.y;
	};
	LVec2.cross = function (a, b) {
		return a.x * b.y - a.y * b.x;
	};
	LVec2.distance = function (a, b) {
		var x = a.x - b.x;
		var y = a.y - b.y;
		return Math.sqrt(x * x + y * y);
	};
	LVec2.getMinMax = function (vecs, axis) {
		var min_o = LVec2.dot(vecs[0], axis);
		var max_o = LVec2.dot(vecs[0], axis);
		var min_i = 0;
		var max_i = 0;
		for (var i = 1; i < vecs.length; i++) {
			var this_o = LVec2.dot(vecs[i], axis);
			if (min_o > this_o) {
				min_o = this_o;
				min_i = i;
			}
			if (max_o < this_o) {
				max_o = this_o;
				max_i = i;
			}
		}
		var r = {"min_o" : min_o, "min_i" : min_i, "max_o" : max_o, "max_i" : max_i};
		return r;
	};
	LVec2.prototype = {
		length : function () {
			var s = this;
			return Math.sqrt(s.x * s.x + s.y * s.y);
		},
		normalize : function () {
			var s = this, l = s.length();
			return new LVec2(s.x / l, s.y / l);
		},
		normR : function () {
			return new LVec2(-this.y, this.x);
		},
		normL : function () {
			return new LVec2(this.y, -this.x);
		}
	};
	return LVec2;
})();
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
				if (type == s._eventList[i].type && (!listener || s._eventList[i].listener == listener)) {
					s._eventList.splice(i, 1);
					return;
				}
			}
		},
		removeAllEventListener : function () {
			this._eventList = [];
		},
		dispatchEvent : function (event) {
			var s = this, i, length = s._eventList.length, ctype = (typeof event == "string") ? event : event.eventType;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (ctype == s._eventList[i].type) {
					if (typeof event == "string") {
						s.currentTarget = s.target = s;
						s.eventType = s.event_type = ctype;
						s._eventList[i].listener(s);
						delete s.currentTarget;
						delete s.target;
						delete s.eventType;
					}else{
						if (!event.target) {
							event.target = s;
						}
						if (!event.currentTarget) {
							event.currentTarget = event.target;
						}
						event._ll_preventDefault = false;
						s._eventList[i].listener(event);
						if (event._ll_preventDefault) {
							return false;
						}
					}
					return true;
				}
			}
			return false;
		},
		hasEventListener : function (type, listener) {
			var s = this, i, length = s._eventList.length;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (type == s._eventList[i].type) {
					if (typeof listener == UNDEFINED || listener == s._eventList[i].listener) {
						return true;
					}
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
var LDisplayObject = (function () {
	function LDisplayObject () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.name = "instance" + s.objectIndex;
		s.x = 0;
		s.y = 0;
		s.width = 0;
		s.height = 0;
		s.scaleX = 1;
		s.scaleY = 1;
		s.alpha = 1;
		s.visible = true;
		s.rotate = 0;
		s.mask = null;
		s.blendMode = null;
		s.filters = null;
		s.transform = new LTransform();
		s.parent = null;
	}
	var p = {
		_createCanvas:function(){
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		ll_show : function (c) {
			var s = this;
			c = c || LGlobal.canvas;
			if (!s._canShow()) {
				return;
			}
			s._ll_trans = false;
			if (!LGlobal.box2d && typeof s._ll_loopframe == "function") {
				s._ll_loopframe();
			}
			c.save();
			s._showReady(c);
			if (s.blendMode) {
				c.globalCompositeOperation = s.blendMode;
			}
			if (s.filters) {
				s._ll_setFilters(c);
			}
			s._rotateReady();
			if (s.mask != null && s.mask.ll_show && !s._ll_cacheAsBitmap) {
				s.mask.ll_show(c);
				c.clip();
			}
			s._transformRotate(c);
			s._transformScale(c);
			s._coordinate(c);
			if (s.transform.matrix) {
				s.transform.matrix.transform(c);
			}
			if (s.alpha < 1) {
				s._ll_trans = true;
				c.globalAlpha *= s.alpha;
			}
			if (LGlobal.fpsStatus) {
				LGlobal.fpsStatus.display++;
				if (s._ll_trans) {
					LGlobal.fpsStatus.transform++;
				}
			}
			if(s._ll_cacheAsBitmap){
				s._ll_cacheAsBitmap._ll_show(c);
			}else{
				s._ll_show(c);
			}
			c.restore();
			if (LGlobal.box2d != null && typeof s._ll_loopframe == "function") {
				s._ll_loopframe();
			}
		},
		_canShow : function () {
			return this.visible;
		},
		_coordinate : function (c) {
			var s = this;
			if (s.x != 0 || s.y != 0) {
				s._ll_trans = true;
				c.transform(1, 0, 0, 1, s.x, s.y);
			}
		},
		_rotateReady : function () {},
		_showReady : function (c) {},
		_ll_show : function (c) {},
		_ll_setFilters : function (c) {
			var s = this, f = s.filters, i, l;
			if (!f) {
				return;
			}
			for (i = 0, l = f.length; i < l; i++) {
				f[i].ll_show(s, c);
			}
		},
		startX : function(){return 0;},
		startY : function(){return 0;},
		getWidth : function(maskSize){return 1;},
		getHeight : function(maskSize){return 1;},
		_transformRotate : function (c) {
			var s = this;
			c = c || LGlobal.canvas;
			if (s.rotate == 0) {
				return;
			}
			s._ll_trans = true;
			rotateFlag = Math.PI / 180, rotateObj = new LMatrix();
			if ((typeof s.rotatex) == UNDEFINED) {
				s.rotatex = 0;
				s.rotatey = 0;
			}
			if (s.box2dBody) {
				rotateFlag = 1;
			}
			rotateObj.a = Math.cos(s.rotate * rotateFlag);
			rotateObj.b = Math.sin(s.rotate * rotateFlag);
			rotateObj.c = -rotateObj.b;
			rotateObj.d = rotateObj.a;
			rotateObj.tx = s.x + s.rotatex;
			rotateObj.ty = s.y + s.rotatey;
			rotateObj.transform(c).setTo(1, 0, 0, 1, -rotateObj.tx, -rotateObj.ty).transform(c);
		},
		_transformScale : function (c) {
			var s = this, scaleObj;
			c = c || LGlobal.canvas;
			if (s.scaleX == 1 && s.scaleY == 1) {
				return;
			}
			s._ll_trans = true;
			scaleObj = new LMatrix();
			if (s.scaleX != 1) {
				scaleObj.tx = s.x;
			}
			if (s.scaleY != 1) {
				scaleObj.ty = s.y;
			}
			scaleObj.a = s.scaleX;
			scaleObj.d = s.scaleY;
			scaleObj.transform(c).setTo(1, 0, 0, 1, -scaleObj.tx, -scaleObj.ty).transform(c);
		},
		getAbsoluteScale : function () {
			var s = this, sX, sY, p;
			sX = s.scaleX;
			sY = s.scaleY;
			p = s.parent;
			while (p && p != "root") {
				sX *= p.scaleX;
				sY *= p.scaleY;
				p = p.parent;
			}
			return {scaleX : sX, scaleY : sY};
		},
		getRootCoordinate : function () {
			return this.localToGlobal(new LPoint(0,0));
		},
		localToGlobal : function (point) {
			var s = this, x, y, p;
			m = s.getRootMatrix();
			p = m.toArray([point.x, point.y, 1]);
			return new LPoint(p[0], p[1]);
		},
		globalToLocal : function (point) {
			var s = this, x, y, p;
			m = s.getLocalMatrix();
			p = m.toArray([point.x, point.y, 1]);
			return new LPoint(p[0], p[1]);
		},
		getBounds : function (d) {
			if (typeof d == UNDEFINED) {
				return new LRectangle(0, 0, 0, 0);
			}
			var s = this, x = 0, y = 0, w = 0, h = 0, sp, dp;
			if (s.objectIndex != d.objectIndex) {
				sp = s.getRootCoordinate();
				dp = d.getRootCoordinate();
				x = sp.x - dp.x;
				y = sp.y - dp.y;
			}
			w = s.getWidth(true);
			h = s.getHeight(true);
			return new LRectangle(x, y, w, h);
		},
		cacheAsBitmap : function (value) {
			var s = this;
			if(!value){
				s._ll_cacheAsBitmap = null;
				return;
			}
			var sx = s.x - s.startX(true), sy = s.y - s.startY(true);
			var data = s.getDataCanvas(sx, sy, s.getWidth(true), s.getHeight(true));
			var b = new LBitmapData(data, 0, 0, null, null, LBitmapData.DATA_CANVAS);
			var cache = new LBitmap(b);
			cache.x = -sx;
			cache.y = -sy;
			s._ll_cacheAsBitmap = cache;
		},
		getDataCanvas : function (x,y,w,h) {
			var s = this, _o, o, _c, c, _x, _y;
			s._createCanvas();
			_x = s.x;
			_y = s.y;
			s.x = x || 0;
			s.y = y || 0;
			s.width = w || s.getWidth();
			s.height = h || s.getHeight();
			s._canvas.width = s.width;
			s._canvas.height = s.height;
			var mx, my;
			if(s.mask){
				mx = s.mask.x;
				my = s.mask.y;
				s.mask.x += (s.x - _x);
				s.mask.y += (s.y - _y);
			}
			s.ll_show(s._context);
			s.x = _x;
			s.y = _y;
			if(s.mask){
				s.mask.x = mx;
				s.mask.y = my;
			}
			return s._canvas;
		},
		getDataURL : function () {
			var s = this;
			var sx = s.x - s.startX(true), sy = s.y - s.startY(true);
			var r = s.getDataCanvas(sx, sy, s.getWidth(true), s.getHeight(true));
			return r.toDataURL.apply(r, arguments);
		},
		getParentByConstructor : function (value) {
			var parent = this.parent;
			while(typeof parent == "object"){
				if(parent instanceof value){
					return parent;
				}
				parent = parent.parent;
			}
			return null;
		},
		ismouseonShapes : function (shapes, mx, my) {
			var s = this, parent = s, m, child, j, v, arg;
			if (typeof shapes == UNDEFINED) {
				shapes = s.shapes;
			}
			m = s.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				arg = child.arg;
				v = s._changeShape(child.type, arg, m);
				if (child.type == LShape.VERTICES) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.RECT) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.ARC) {
					if ((v[0] - mx) * (v[0] - mx) + (v[1] - my) * (v[1] - my) < v[3]) {
						return true;
					}
				}
			}
			return false;
		},
		_changeShape : function (type, arg, m) {
			var v, arg = arg, r2, i, l, v1, v2;
			if (type == LShape.VERTICES) {
				v = [];
				for (i = 0, l = arg.length; i < l; i++) {
					v[i] = m.toArray([arg[i][0], arg[i][1], 1]);
				}
			} else if (type == LShape.RECT) {
				v = [[arg[0], arg[1]], [arg[0] + arg[2], arg[1]], [arg[0] + arg[2], arg[1] + arg[3]], [arg[0], arg[1] + arg[3]]];
				for (i = 0, l = v.length; i < l; i++) {
					v[i] = m.toArray([v[i][0], v[i][1],1]);
				}
			} else if (type == LShape.ARC) {
				v1 = m.toArray([arg[0], arg[1], 1]);
				v2 = m.toArray([arg[0] + arg[2], arg[1], 1]);
				r2 = (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
				v = [v1[0], v1[1], Math.sqrt(r2), r2];
			}
			return v;
		},
		getRootMatrix : function () {
			var parent = this, m = new LMatrix();
			while (parent && parent != "root") {
				if (parent.scaleX != 1 || parent.scaleY != 1) {
					m.scale(parent.scaleX, parent.scaleY);
				}
				if (parent.rotate != 0) {
					m.rotate(parent.rotate);
				}
				if (parent.x != 0 || parent.y != 0) {
					m.translate(parent.x, parent.y);
				}
				parent = parent.parent;
			}
			return m;
		},
		getLocalMatrix : function () {
			var parent = this, m = new LMatrix(), list = [];
			while (parent && parent != "root") {
				list.push(parent);
				parent = parent.parent;
			}
			for (var i = list.length - 1; i >= 0; i--) {
				parent = list[i];
				if (parent.x != 0 || parent.y != 0) {
					m.translate(-parent.x, -parent.y);
				}
				if (parent.rotate != 0) {
					m.rotate(-parent.rotate);
				}
				if (parent.scaleX != 1 || parent.scaleY != 1) {
					m.scale(1/parent.scaleX, 1/parent.scaleY);
				}
			}
			return m;
		},
		remove : function () {
			var s = this, p = s.parent;
			if (!p || p == "root") {
				return;
			}
			p.removeChild(s);
			s._ll_removeFromSelf = true;
		}
	};
	for (var k in p) {
		LDisplayObject.prototype[k] = p[k];
	}
	return LDisplayObject;
})();
var LInteractiveObject = (function() {
	function LInteractiveObject() {
		var s = this;
		LExtends(s, LDisplayObject, []);
		s.type = "LInteractiveObject";
		s.mouseEnabled = true;
		s.mouseList = new Array();
	}
	var p = {
		addEventListener : function(type, listener) {
			var s = this;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LMouseEventContainer.container[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.addMouseEvent(s, type, listener);
					return;
				}
				s.mouseList.push({
					listener : listener,
					type : type
				});
			} else {
				s._eventList.push({
					listener : listener,
					type : type
				});
			}
		},
		removeEventListener : function(type, listener) {
			var s = this, i, length;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LMouseEventContainer.container[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.removeMouseEvent(s, type, listener);
					return;
				}
				length = s.mouseList.length;
				for ( i = 0; i < length; i++) {
					if (!s.mouseList[i]) {
						continue;
					}
					if (type == s.mouseList[i].type && s.mouseList[i].listener == listener) {
						s.mouseList.splice(i, 1);
						return;
					}
				}
			} else {
				return s.callParent("removeEventListener", arguments);
			}
		},
		removeAllEventListener : function() {
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
		hasEventListener : function(type, listener) {
			var s = this, i, length;
			if (LMouseEventContainer.container[type]) {
				return LMouseEventContainer.hasEventListener(s, type, listener);
			}
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				length = s.mouseList.length;
				for ( i = 0; i < length; i++) {
					if (!s.mouseList[i]) {
						continue;
					}
					if (type == s.mouseList[i].type && (!listener || s.mouseList[i].listener == listener)) {
						return true;
					}
				}
			} else {
				return s.callParent("hasEventListener", arguments);
			}
			return false;
		}
	};
	for (var k in p) {
		LInteractiveObject.prototype[k] = p[k];
	}
	return LInteractiveObject;
})(); 
var LDisplayObjectContainer = (function () {
	function LDisplayObjectContainer () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		s.childList = new Array();
		s.numChildren = 0;
		s.mouseChildren = true;
	}
	LDisplayObjectContainer.destroy = function (d) {
		if (!LGlobal.destroy) {
			return;
		}
		if (d.die) {
			d.die();
		}
		if (d.removeAllChild) {
			d.removeAllChild();
		}
	};
	var p = {
		addChild : function (d) {
			var s  = this,t;
			if (d.parent) {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.parent.removeChild(d);
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.push(d);
			s.numChildren = s.childList.length;
			s._ll_removeFromSelf = false;
			return d;
		},
		addChildAt : function (d, i) {
			var s = this,t;
			if (i < 0 || i > s.childList.length) {
				return;
			}
			if (typeof d.remove == "function") {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.remove();
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.splice(i, 0, d);
			s.numChildren = s.childList.length;
			s._ll_removeFromSelf = false;
			return d;
		},
		removeChild : function (d) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					LDisplayObjectContainer.destroy(d);
					s.childList.splice(i, 1);
					break;
				}
			}
			s.numChildren = s.childList.length;
			delete d.parent;
			LTweenLite.removeTarget(d);
		},
		getChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length == 0 || c.length <= i) {
				return null;
			}
			return c[i];
		},
		getChildByName : function (n) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (!c[i]) {
					continue;
				}
				if (c[i].name == n) {
					return c[i];
				}
			}
			return null;
		},
		removeChildAt : function (i) {
			var s  = this, c = s.childList, d;
			if (c.length <= i || i < 0) {
				return;
			}
			d = c[i];
			LDisplayObjectContainer.destroy(d);
			s.childList.splice(i, 1);
			delete d.parent;
			LTweenLite.removeTarget(d);
			s.numChildren = s.childList.length;
			return d;
		},
		getChildIndex : function (child) {
			if (!child) {
				return -1;
			}
			var s = this, c = s.childList, i, l = c.length;
			for (i = 0; i < l; i++) {
				if (c[i].objectIndex == child.objectIndex) {
					return i;
				}
			}
			return -1;
		},
		setChildIndex : function (child, index) {
			var s = this, c = s.childList, i, l = c.length;
			if (child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l) {
				return -1;
			}
			for (i = 0; i < l; i++) {
				if(c[i].objectIndex == child.objectIndex){
					break;
				}
			}
			s.childList.splice(i,1);
			s.childList.splice(index, 0, child);
			return index;
		},
		resize : function () {
			var s  = this;
			s.width = s.getWidth();
			s.height = s.getHeight();
		},
		removeAllChild : function () {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				var d = c[i];
				LDisplayObjectContainer.destroy(d);
				delete d.parent;
				LTweenLite.removeTarget(d);
			}
			s.childList.length = 0;
			s.width = 0;
			s.height = 0;
			s.numChildren = 0;
		}
	};
	for (var k in p) {
		LDisplayObjectContainer.prototype[k] = p[k];
	}
	return LDisplayObjectContainer;
})();
var LLoader = (function () {
	function LLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LLoader";
	}
	LLoader.TYPE_BITMAPDATE = "bitmapData";
	LLoader.prototype.load = function (u, t, xhr) {
		var s = this;
		if (!t) {
			t = LLoader.TYPE_BITMAPDATE;
		}
		s.loadtype = t;
		s.useXHR = xhr && !LAjax.local && LAjax.canUseBlob;
		if (t == LLoader.TYPE_BITMAPDATE) {
			if(s.useXHR){
				LAjax.responseType = LAjax.ARRAY_BUFFER;
				LAjax.progress = function(e){
					var event = new LEvent(LEvent.PROGRESS);
					event.currentTarget = s;
					event.target = e.currentTarget;
					event.loaded = e.loaded;
					event.total = e.total;
					event.responseURL = e.responseURL;
					s.dispatchEvent(event);
				};
				LAjax.post(u, {}, function(response){
					var blob;
					try {
						blob = new Blob([response], {type : 'image/png'});
					} catch (e) {
						if(e.name === 'TypeError' && window.BlobBuilder){
							var builder = new BlobBuilder();
							builder.append(response);
							blob = builder.getBlob();
						}else{
							blob = null;
							s.useXHR = false;
						}
					}
					if(s.useXHR){
						u = s.createObjectURL(blob);
					}
					s.loadStart(u);
				}, function(request){
					var event = new LEvent(LEvent.ERROR);
					event.currentTarget = s;
					event.target = request;
					event.responseURL = request.responseURL;
					s.dispatchEvent(event);
				});
			}else{
				s.loadStart(u);
			}
		}
	};
	LLoader.prototype.loadStart = function(u){
		var s = this;
		s.content = new Image();
		s.content.onload = function () {
			s.content.onload = null;
			var event = new LEvent(LEvent.COMPLETE);
			event.currentTarget = s;
			event.target = s.content;
			if(s.useXHR){
				s.revokeObjectURL(s.content.src);
			}
			s.dispatchEvent(event);
			delete s.content;
		};
		if(!s.useXHR){
			s.content.onerror = function(e){
				var event = new LEvent(LEvent.ERROR);
				event.currentTarget = s;
				event.target = e.target;
				event.responseURL = e.target.src;
				s.dispatchEvent(event);
			};
		}
		s.content.src = u;
	};
	LLoader.prototype.createObjectURL = function(obj){
		var URL = window.URL || window.webkitURL;
		return URL.createObjectURL(obj);
	};
	LLoader.prototype.revokeObjectURL = function(src){
		var URL = window.URL || window.webkitURL;
		URL.revokeObjectURL(src);
	};
	return LLoader;
})();
var LURLLoader = (function () {
	function LURLLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LURLLoader";
		s.loadtype = "";
		s.content = null;
		s.event = {};
	}
	LURLLoader.TYPE_TEXT = "text";
	LURLLoader.TYPE_JS = "js";
	LURLLoader.prototype.load = function (u, t) {
		var s = this, event, ext;
		if (!t) {
			ext = getExtension(u);
			if (ext == "txt") {
				t = LURLLoader.TYPE_TEXT;
			} else if (ext == "js") {
				t = LURLLoader.TYPE_JS;
			}
		}
		s.loadtype = t;
		if (t == LURLLoader.TYPE_TEXT) {
			LAjax.progress = function(e){
				var event = new LEvent(LEvent.PROGRESS);
				event.currentTarget = s;
				event.target = e.currentTarget;
				event.loaded = e.loaded;
				event.total = e.total;
				event.responseURL = e.responseURL;
				s.dispatchEvent(event);
			};
			LAjax.get(u, {}, function (data) {
				event = new LEvent(LEvent.COMPLETE);
				s.data = data;
				event.currentTarget = s;
				event.target = data;
				s.dispatchEvent(event);
				delete s.content;
				delete s.data;
			}, function(request){
				var event = new LEvent(LEvent.ERROR);
				event.currentTarget = s;
				event.target = request;
				event.responseURL = request.responseURL;
				s.dispatchEvent(event);
			});
		} else if (t == LURLLoader.TYPE_JS) {
			var script = document.createElement("script");
			script.onerror = function(e){
				var event = new LEvent(LEvent.ERROR);
				event.currentTarget = s;
				event.target = e.target;
				event.responseURL = u;
				s.dispatchEvent(event);
			};
			script.onload = function () {
				event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = s;
				s.dispatchEvent(event);
				delete s.content;
			};
			script.src = u;
			script.type = "text/javascript";
			document.querySelector('head').appendChild(script);
		}
	};
	return LURLLoader;
})();
var LFontLoader = (function () {
	function LFontLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LFontLoader";
	}
	LFontLoader.TYPE_FONT = "font";
	LFontLoader.prototype.load = function (u, name) {
		var s = this, font, tff, eot, a, b, d, t = "";
		font = document.createElement("style");
		font.onerror = function(e){
			var event = new LEvent(LEvent.ERROR);
			event.currentTarget = s;
			event.target = e.target;
			event.responseURL = u;
			s.dispatchEvent(event);
		};
		a = u.split(',');
		for (var i = 0; i < a.length; i++) {
			b = a[i].split('.');
			d = b[b.length - 1];
			if(d == "ttf"){
				tff = a[i];
			}else if(d == "eot"){
				eot = a[i];
			}
		}
		t = "@font-face { font-family:'" + name + "';";
		if(eot){
			t += "src: url(" + eot + ");"; 
		}
		if(tff){
			t += "src: local('lufy'),url(" + tff + ") format('opentype');"; 
		}
		font.innerHTML = t;
		document.querySelector('head').appendChild(font);
		setTimeout(function(){
			var event = new LEvent(LEvent.COMPLETE);
			event.currentTarget = s;
			event.target = s;
			s.dispatchEvent(event);
		},1);
	};
	return LFontLoader;
})();
var LWebAudio = (function () {
	function LWebAudio () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.currentTime = 0;
		s.currentStart = 0;
		s.currentSave = 0;
		s.length = 0;
		s.loopStart = 0;
		s.loopEnd = 0;
		s.loopIndex = 0;
		s.loopLength = 1;
		s.playing = false;
		s.volume = 1;
		LSound.Container.add(s);
	}
	LWebAudio.container = [];
	LWebAudio.containerCount = 0;
	try {
		LWebAudio.audioTag = new Audio();
	} catch (e) {
		console.warn( "ReferenceError: Can't find variable: Audio");
		LWebAudio.audioTag = {canPlayType : function () { return false; }};
	}
	LWebAudio._context = null;
	var p = {
		getWebAudio : function () {
			var data;
			if(LWebAudio.containerCount > 0){
				data = LWebAudio.container.shift();
			} else {
				if (typeof AudioContext !== UNDEFINED) {
					try {
						data = new AudioContext();
					} catch (e) {
						LWebAudio.containerCount = LWebAudio.container.length;
						data = LWebAudio.container.shift();
					}
				} else if (typeof webkitAudioContext !== UNDEFINED) {
					try {
						data = new webkitAudioContext();
					} catch (e) {
						LWebAudio.containerCount = LWebAudio.container.length;
						data = LWebAudio.container.shift();
					}
				} else {
					throw "AudioContext not supported. :(";
				}
			}
			if(!data.createGainNode){
				data.createGainNode = data.createGain;
			}
			LWebAudio.container.push(data);
			return data;
		},
		onload : function (data) {
			var s = this;
			if (Object.prototype.toString.apply(data) !== '[object AudioBuffer]') {
				s.load(data);
				return;
			};
			if(!s.data){
				s.data = s.getWebAudio();
			}
			s.buffer = data;
			s.length = s.buffer.duration;
			var e = new LEvent(LEvent.COMPLETE);
			e.currentTarget = s;
			e.target = s.buffer;
			s.dispatchEvent(e);
		},
		_onended : function () {
			var s = this;
			s.dispatchEvent(LEvent.SOUND_COMPLETE);
			s.close();
			if (++s.loopIndex < s.loopLength) {
				s.play(s.currentStart, undefined, s.currentTimeTo);
			}
		},
		load : function (u) {
			var s = this;
			if (typeof u !== "string") {
				if (Object.prototype.toString.apply(u) == '[object AudioBuffer]') {
					s.onload(u);
				} else if (Object.prototype.toString.apply(u) == '[object ArrayBuffer]') {
					if(!s.data){
						s.data = s.getWebAudio();
					}
					s.data.decodeAudioData(u, s.onload.bind(s), function (error) {
						throw "AudioContext decodeAudioData error : " + error.toString();
					});
				}
				return;
			}
			var a, b, c, k, d, q = {"mov" : ["quicktime"], "3gp" : ["3gpp"], "midi" : ["midi"], "mid" : ["midi"], "ogv" : ["ogg"], "m4a" : ["acc"], "mp3" : ["mpeg"], "wav" : ["wav", "x-wav", "wave"], "wave" : ["wav", "x-wav", "wave"], "aac" : ["mp4", "aac"]};
			a = u.split(',');
			for (k = 0; k < a.length; k++) {
				b = a[k].split('.');
				d = b[b.length - 1];
				if (q[d]) {
					d = q[d];
				} else {
					d = [d];
				}
				c = d.some(function (element, index, array) {
					return LWebAudio.audioTag.canPlayType(s._type + "/" + element);
				});
				if (c) {
					LAjax.responseType = LAjax.ARRAY_BUFFER;
					LAjax.progress = function(e){
						var event = new LEvent(LEvent.PROGRESS);
						event.currentTarget = s;
						event.target = e.currentTarget;
						event.loaded = e.loaded * 0.5;
						event.total = e.total;
						event.responseURL = e.responseURL;
						s.dispatchEvent(event);
					};
					LAjax.get(a[k], {}, s.onload.bind(s), function(request){
						var event = new LEvent(LEvent.ERROR);
						event.currentTarget = s;
						event.target = request;
						event.responseURL = request.responseURL;
						s.dispatchEvent(event);
					});
					return;
				} else {
					console.warn( "Not support " + b[b.length - 1] + " : " + a[k]);
					var e = new LEvent(LEvent.COMPLETE);
					e.currentTarget = e.target = s;
					s.dispatchEvent(e);
				}
			}
		},
		getCurrentTime : function () {
			var s = this;
			if (s.playing) {
				return s.data.currentTime - s.currentSave + s.currentTime;
			} else {
				return s.currentSave;
			}
		},
		setVolume : function (v) {
			var s = this;
			s.volume = v;
			if (s.playing) {
				s.volumeNode.gain.value = v;
			}
		},
		getVolume : function () {
			return this.volume;
		},
		play : function (c, l, to) {
			var s = this;
			if (s.length == 0) {
				return;
			}
			if (typeof l !== UNDEFINED) {
				s.loopIndex = 0;
				s.loopLength = l;
			}
			if (typeof c !== UNDEFINED) {
				s.currentTime = c;
				s.currentStart = c;
			}
			if (typeof to !== UNDEFINED) {
				s.currentTimeTo = to > s.length ? s.length : to;
			} else {
				s.currentTimeTo = s.length;
			}
			s.data.loop = false;
			s.playing = true;
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			s.timeout = setTimeout(s._onended.bind(s), (s.currentTimeTo - s.currentTime) * 1000);
			s.bufferSource = s.data.createBufferSource();
			s.bufferSource.buffer = s.buffer;
			s.volumeNode = s.data.createGainNode();
			s.volumeNode.gain.setTargetAtTime = s.volumeNode.gain.setTargetAtTime || s.volumeNode.gain.setTargetValueAtTime || s._setTargetAtTime;
			s.volumeNode.gain.setValueAtTime(s.volume, s.currentTime, 0.5);
			//s.volumeNode.gain.value = s.volume;
			s.volumeNode.connect(s.data.destination);
			s.bufferSource.connect(s.volumeNode);
			s.currentSave = s.data.currentTime;
			if (s.bufferSource.start) {
				s.bufferSource.start(0, s.currentTime, s.length - s.currentTime);
			} else {
				s.bufferSource.noteGrainOn(0, s.currentTime, s.length - s.currentTime);
			}
		},
		_setTargetAtTime : function(target, startTime, timeConstant) {
			this.volumeNode.gain.value = target;
		},
		playSegment : function (c, seg, l) {
			this.playTo(c, c + seg, l);
		},
		playTo : function (c, to, l) {
			this.play(c, l, to);
		},
		stop : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			if (s.bufferSource.stop) {
				s.bufferSource.stop(0);
			} else {
				s.bufferSource.noteOff(0);
			}
			s.currentSave = s.getCurrentTime();
			s.currentTime = s.currentSave;
			s.playing = false;
		},
		close : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			if (s.bufferSource.stop) {
				s.bufferSource.stop(0);
			} else {
				s.bufferSource.noteOff(0);
			}
			s.playing = false;
			s.currentTime = 0;
			s.currentSave = 0;
		},
		ll_check : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.currentTimeTo < s.data.currentTime - s.currentSave + LSound.Container.time * 0.001) {
				s._onended();
			}
		},
		die : function () {
			LSound.Container.remove(this);
		}
	};
	for (var k in p) {
		LWebAudio.prototype[k] = p[k];
	}
	return LWebAudio;
})();
var LMedia = (function () {
	function LMedia () {
		var s = this;
		LExtends(s, LDisplayObject, []);
		s.length = 0;
		s.loopIndex = 0;
		s.loopLength = 1;
		s.playing = false;
		s.oncomplete = null;
		s.onsoundcomplete = null;
		s.currentStart = 0;
		LSound.Container.add(this);
	}
	var p = {
		onload : function () {
			var s = this;
			if (s.data.readyState) {
				s.length = s.data.duration - (LGlobal.android ? 0.1 : 0);
				var e = new LEvent(LEvent.COMPLETE);
				e.currentTarget = s;
				e.target = s.data;
				s.dispatchEvent(e);
				return;
			}
			s.data.addEventListener("error", function (e) {
				var event = new LEvent(LEvent.ERROR);
				event.currentTarget = s;
				event.target = e.target;
				event.responseURL = e.target.src;
				s.dispatchEvent(event);
			}, false);
			s.data.addEventListener("canplaythrough", function () {
				s.onload();
			}, false);
		},
		_onended : function () {
			var s = this, i, l;
			s.dispatchEvent(LEvent.SOUND_COMPLETE);
			if (++s.loopIndex < s.loopLength) {
				i = s.loopIndex;
				l = s.loopLength;
				s.close();
				s.play(s.currentStart, s.loopLength, s.currentTimeTo);
				s.loopIndex = i;
			} else {
				s.close();
			}
		},
		load : function (u) {
			var s = this;
			if (Object.prototype.toString.apply(u) == "[object HTMLAudioElement]") {
				s.data = u;
				s.onload();
				return;
			}
			var a, b, c, k, d, q = {"mov" : ["quicktime"], "3gp" : ["3gpp"], "midi" : ["midi"], "mid" : ["midi"], "ogv" : ["ogg"], "m4a" : ["acc"], "mp3" : ["mpeg"], "wav" : ["wav", "x-wav", "wave"], "wave" : ["wav", "x-wav", "wave"], "aac" : ["mp4", "aac"]};
			a = u.split(',');
			for (k = 0; k < a.length; k++) {
				b = a[k].split('.');
				d = b[b.length - 1];
				if (q[d]) {
					d = q[d];
				} else {
					d = [d];
				}
				c = d.some(function (element, index, array) {
					return s.data.canPlayType(s._type + "/" + element);
				});
				if (c) {
					s.data.src = a[k];
					s.onload();
					s.data.load();
					return;
				} else {
					console.warn( "Not support " + b[b.length - 1] + " : " + a[k]);
					var e = new LEvent(LEvent.COMPLETE);
					e.currentTarget = e.target = s;
					s.dispatchEvent(e);
				}
			}
			if (s.oncomplete) {
				s.oncomplete({});
			}
		},
		getCurrentTime : function () {
			return this.data.currentTime;
		},
		setVolume : function (v) {
			this.data.volume = v;
		},
		getVolume : function () {
			return this.data.volume;
		},
		play : function (c, l, to) {
			var s = this;
			if (s.length == 0) {
				return;
			}
			if (LGlobal.android) {
				LSound.Container.stopOther(this);
			}
			if (typeof c != UNDEFINED) {
				s.data.currentTime = c;
				s.currentStart = c;
			}
			if (typeof l != UNDEFINED) {
				s.loopLength = l;
			}
			if (typeof to !== UNDEFINED) {
				s.currentTimeTo = to > s.length ? s.length : to;
			} else {
				s.currentTimeTo = s.length;
			}
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			s.timeout = setTimeout(function(){
				s._onended();
			}, (s.currentTimeTo - s.data.currentTime) * 1000);
			s.data.loop = false;
			s.loopIndex = 0;
			s.playing = true;
			s.data.play();
		},
		playSegment : function (c, seg, l) {
			this.playTo(c, c + seg, l);
		},
		playTo : function (c, to, l) {
			this.play(c, l, to);
		},
		stop : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			s.playing = false;
			s.data.pause();
		},
		close : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			s.playing = false;
			s.data.pause();
			s.data.currentTime = 0;
			s.currentSave = 0;
		},
		ll_check : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if(s.data.duration != s._ll_duration){
				s._ll_duration = s.data.duration;
				s.length = s.data.duration - (LGlobal.android ? 0.1 : 0);
			}
			if (s.currentTimeTo < s.data.currentTime + LSound.Container.time * 0.005) {
				s._onended();
			}
		},
		die : function () {
			LSound.Container.remove(this);
		}
	};
	for (var k in p) {
		LMedia.prototype[k] = p[k];
	}
	return LMedia;
})();
var LSound = (function () {
	function LSound (u) {
		var s = this;
		s.type = "LSound";
		s._type = "audio";
		if (LSound.webAudioEnabled && LGlobal.webAudio) {
			LExtends(s, LWebAudio, []);
		} else {
			LExtends(s, LMedia, []);
			try {
				s.data = new Audio();
			} catch (e) {
				console.warn( "ReferenceError: Can't find variable: Audio");
				s.data = {};
			}
			s.data.loop = false;
			s.data.autoplay = false;
		}
		if (u) {
			s.load(u);
		}
	}
	LSound.TYPE_SOUND = "sound";
	LSound.webAudioEnabled = false;
	var protocol = location.protocol;
	if (protocol == "http:" || protocol == "https:") {
		if (typeof AudioContext !== UNDEFINED) {
			try {
				LWebAudio._context = new AudioContext();
			} catch (e) {
			}
		} else if (typeof webkitAudioContext !== UNDEFINED) {
			try {
				LWebAudio._context = new webkitAudioContext();
			} catch (e) {
			}
		}
		if (LWebAudio._context) {
			LWebAudio.container.push(LWebAudio._context);
			LSound.webAudioEnabled = true;
		}
	}
	LSound.Container = {
		ll_save : 0,
		time : 0,
		list : [],
		ll_show : function () {
			var c = LSound.Container;
			var t = (new Date()).getTime();
			c.time = t - (c.ll_save ? c.ll_save : t);
			c.ll_save = t;
			var l = c.list;
			for (var i = l.length - 1; i >= 0; i--) {
				if (l[i]) {
					l[i].ll_check();
				}
			}
		},
		add : function (obj) {
			if (LSound.Container.list.indexOf(obj) >= 0) {
				return;
			} 
			LSound.Container.list.push(obj);
		},
		remove : function (obj) {
			var l = LSound.Container.list;
			for (var i = l.length -1; i >= 0; i--) {
				if (l[i].objectIndex == obj.objectIndex) {
					l.splice(i,1);
					break;
				}
			}
		},
		stopOther : function (obj) {
			var l = LSound.Container.list;
			for (var i = l.length - 1; i >= 0; i--) {
				if (l[i].objectIndex != obj.objectIndex) {
					l[i].stop();
				}
			}
		}
	};
	LGlobal.childList.push(LSound.Container);
	return LSound;
})();
var LVideo = (function () {
	function LVideo (u) {
		var s = this;
		LExtends(s, LMedia, []);
		s.type = "LVideo";
		s._type = "video";
		s.rotatex = 0;
		s.rotatey = 0;
		var strTag = "";
		if(LGlobal.os == OS_IPHONE && LGlobal.iOSversion[0] >= 10){
			s.sound = new LSound();
			strTag = " muted playsinline ";
		}
		var div = document.createElement("div");
		div.id = "div_video_" + s.objectIndex;
		div.innerHTML = '<video id="video_'+s.objectIndex+'" '+strTag+' style="opacity: 1;width:0px;height:0px;position:absolute;index-z:-999;">';
		document.body.appendChild(div);
		s.data = document.getElementById("video_" + s.objectIndex);
		s.data.loop = false;
		s.data.autoplay = false;
		if (u) {
			s.load(u);
		}
	}
	var p = {
		_ll_show : function (c) {
			var s = this;
			c.drawImage(s.data, s.x, s.y);
		},
		load : function(u){
			var s = this;
			s.callParent("load", arguments);
			if(s.sound){
				s.sound.load(u);
			}
		},
		play : function (c, l, to) {
			var s = this;
			s.callParent("play", arguments);
			if(s.sound){
				s.sound.play(c, l, to);
			}
		},
		stop : function () {
			var s = this;
			s.callParent("stop", arguments);
			if(s.sound){
				s.sound.stop();
			}
		},
		setVolume : function (v) {
			var s = this;
			if(s.sound){
				s.sound.setVolume(v);
			}else{
				s.callParent("setVolume", arguments);
			}
		},
		getVolume : function () {
			var s = this;
			if(s.sound){
				return s.sound.getVolume();
			}else{
				return s.callParent("getVolume", arguments);
			}
		},
		close : function () {
			var s = this;
			s.callParent("close", arguments);
			if(s.sound){
				s.sound.close();
			}
		},
		die : function () {
			var s = this;
			document.body.removeChild(document.getElementById("div_video_" + s.objectIndex));
			delete s.data;
			delete s.sound;
		},
		getWidth : function () {
			return this.data.width;
		},
		getHeight : function () {
			return this.data.height;
		}
	};
	for (var k in p) {
		LVideo.prototype[k] = p[k];
	}
	return LVideo;
})();
var LPoint = (function () {
	function LPoint (x, y) {
		var s = this;
		s.x = x;
		s.y = y;
	}
	LPoint.distance = function (p1, p2) {
		return LPoint.distance2(p1.x, p1.y, p2.x, p2.y);
	};
	LPoint.distance2 = function (x1, y1, x2, y2) {
		var x = x1 - x2, y = y1 - y2;
		return Math.sqrt(x * x + y * y);
	};
	LPoint.interpolate = function (p1, p2, f) {
		return new LPoint(p1.x + (p2.x - p1.x) * (1 - f), p1.y + (p2.y - p1.y) * (1 - f));
	};
	LPoint.polar = function (l, a) {
		return new LPoint(l * Math.cos(a), l * Math.sin(a));
	};
	LPoint.prototype = {
		toString : function () {
			return '[object LPoint(' + this.x + ',' + this.y + ')]';
		},
		length : function () {
			return LPoint.distance2(this.x, this.y, 0, 0);
		},
		add : function (v) {
			return new LPoint(this.x + v.x, this.y + v.y);
		},
		clone : function () {
			return new LPoint(this.x, this.y);
		},
		setTo : function (x, y) {
			this.x = x, this.y = y;
		},
		copyFrom : function (s) {
			this.setTo(s.x, s.y);
		},
		equals : function (t) {
			return this.x == t.x && this.y == t.y;
		},
		normalize : function (t) {
			var s = this, scale = t / s.length();
			s.x *= scale, s.y *= scale;
		},
		offset : function (dx, dy) {
			this.x += dx;
			this.y += dy;
		},
		subtract : function (v) {
			return new LPoint(this.x  - v.x, this.y - v.y);
		}
	};
	return LPoint;
})();
var LRectangle = (function () {
	function LRectangle (x, y, w, h) {
		var s = this;
		s.x = x;
		s.y = y;
		s.width = w;
		s.height = h;
		s.setRectangle();
	}
	LRectangle.prototype = {
		setRectangle : function () {
			var s = this;
			s.bottom = s.y + s.height;
			s.right = s.x + s.width;
			s.left = s.x;
			s.top = s.y;
		},
		clone : function () {
			var s = this;
			return new LRectangle(s.x, s.y, s.width, s.height);
		},
		contains : function (x, y) {
			var s = this;
			return x >= s.x && x <= s.right && y >= s.y && y <= s.bottom;
		},
		containsRect : function (rect) {
			var s = this;
			return rect.x >= s.x && rect.right <= s.right && rect.y >= s.y && rect.bottom <= s.bottom;
		},
		equals : function (v) {
			var s = this;
			return v.x == s.x && v.width == s.width && v.y == s.y && v.height == s.height;
		},
		inflate : function (dx, dy) {
			var s = this;
			s.width += dx;
			s.height += dy;
			s.setRectangle();
		},
		intersection : function (t) {
			var s = this;
			var ix = s.x > t.x ? s.x : t.x;
			var iy = s.y > t.y ? s.y : t.y;
			var ax = s.right > t.right ? t.right : s.right;
			var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
			if (ix <= ax && iy <= ay) {
				return new LRectangle(ix, iy, ax, ay);
			}else{
				return new LRectangle(0, 0, 0, 0);
			}
		},
		intersects : function (t) {
			var s = this;
			var ix = s.x > t.x ? s.x : t.x;
			var iy = s.y > t.y ? s.y : t.y;
			var ax = s.right > t.right ? t.right : s.right;
			var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
			return ix <= ax && iy <= ay;
		},
		isEmpty : function () {
			var s = this;
			return s.x == 0 && s.y == 0 && s.width == 0 && s.height == 0;
		},
		offset : function (dx, dy) {
			var s = this;
			s.x += dx;
			s.y += dy;
			s.setRectangle();
		},
		setEmpty : function () {
			var s = this;
			s.x = 0;
			s.y = 0;
			s.width = 0;
			s.height = 0;
			s.setRectangle();
		},
		setTo : function (xa, ya, w, h) {
			var s = this;
			s.x = xa;
			s.y = ya;
			s.width = w;
			s.height = h;
			s.setRectangle();
		},
		toString : function () {
			var s = this;
			return "[object LRectangle(" + s.x + "," + s.y + "," + s.width + "," + s.height + ")]";
		},
		union : function (t) {
			var s = this;
			return new LRectangle(s.x > t.x ? t.x : s.x, s.y > t.y ? t.y : s.y, s.right > t.right ? s.right : t.right, s.bottom > t.bottom ? s.bottom : t.bottom);
		}
	};
	return LRectangle;
})();
var LGraphics = (function () {
	function LGraphics(){
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LGraphics";
		s.color = "#000000";
		s.alpha = 1;
		s.bitmap = null;
		s.setList = new Array();
		s.showList = new Array();
	}
	var p = {
		ll_show : function (ctx) {
			var s = this, k, l = s.setList.length;
			if (l == 0) {
				return;
			}
			for (k = 0; k < l; k++) {
				s.setList[k](ctx);
				if (LGlobal.fpsStatus) {
					LGlobal.fpsStatus.graphics++;
				}
			}
		},
		clone : function () {
			var s = this, a = new LGraphics(), i, l, c;
			a.color = s.color;
			a.alpha = s.alpha;
			a.bitmap = s.bitmap;
			for (i = 0, l = s.setList.length; i < l; i++) {
				c = s.setList[i];
				a.setList.push(c);
			}
			for (i = 0, l = s.showList.length; i < l; i++) {
				c = s.showList[i];
				a.showList.push(c);
			}
			return a;
		},
		lineCap : function (t) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineCap = t;
			});
		},
		lineJoin : function (t) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineJoin = t;
			});
		},
		lineWidth : function (t) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineWidth = t;
			});
		},
		strokeStyle : function (co) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.strokeStyle = co;
			});
		},
		stroke : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.stroke();
			});
		},
		beginPath : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.beginPath();
			});
		},
		closePath : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.closePath();
			});
		},
		moveTo : function (x, y) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.moveTo(x, y);
			});
			s.showList.push({type : LShape.POINT, arg : [x, y]});
		},
		lineTo : function (x, y) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineTo(x, y);
			});
			s.showList.push({type : LShape.POINT, arg : [x, y]});
		},
		rect : function (x, y, w, h) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.rect(x, y, w, h);
			});
			s.showList.push({type : LShape.RECT, arg : [x, y, w, h]});
		},
		fillStyle : function (co) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.fillStyle = co;
			});
		},
		fill : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.fill();
			});
		},
		arc : function (x, y, r, sa, ea, aw) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.arc(x, y, r, sa, ea, aw);
			});
			s.showList.push({type : LShape.ARC, arg : sa});
		},
		lineStyle : function (tn, co) {
			var s = this, c;
			if (co == null) {
				co = s.color;
			}
			s.color = co;
			s.setList.push(function (c) {
				c.lineWidth = tn;
				c.strokeStyle = co;
			});
		},
		clear : function () {
			var s = this;
			s.bitmap = null;
			s.setList.length = 0;
			s.showList.length = 0;
		},
		beginBitmapFill : function (b) {
			var s = this;
			s.setList.push(function () {
				s.bitmap = b;
			});
		},
		drawEllipse : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function (c) {
				var x, y, w, h, k, ox, oy, xe, ye, xm, ym;
				c.beginPath();
				k = 0.5522848;
				x = pa[0];
				y = pa[1];
				w = pa[2];
				h = pa[3];
				ox = (w / 2) * k;
				oy = (h / 2) * k;
				xe = x + w;
				ye = y + h;
				xm = x + w / 2;
				ym = y + h / 2;
				c.moveTo(x, ym);
				c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
				c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
				c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
				c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawArc : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function (c) {
				c.beginPath();
				if (pa.length > 6 && pa[6]) {
					c.moveTo(pa[0], pa[1]);
				}
				c.arc(pa[0], pa[1], pa[2], pa[3], pa[4], pa[5]);
				if (pa.length > 6 && pa[6]) {
					c.lineTo(pa[0], pa[1]);
				}
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.ARC, arg : pa});
		},
		drawRect : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function (c) {
				c.beginPath();
				c.rect(pa[0], pa[1], pa[2], pa[3]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawRoundRect : function (tn, lco, pa, isf, co) {
			var s = this;
			if(LGlobal.enableWebGL){
				s.drawRect(tn, lco, pa, isf, co);
				return;
			}
			s.setList.push(function (c) {
				c.beginPath();
				c.moveTo(pa[0] + pa[4], pa[1]);
				c.lineTo(pa[0] + pa[2] - pa[4], pa[1]);
				c.arcTo(pa[0] + pa[2], pa[1], pa[0] + pa[2], pa[1] + pa[4], pa[4]);
				c.lineTo(pa[0] + pa[2], pa[1] + pa[3] - pa[4]);
				c.arcTo(pa[0] + pa[2], pa[1] + pa[3], pa[0] + pa[2] - pa[4], pa[1] + pa[3], pa[4]);
				c.lineTo(pa[0] + pa[4], pa[1] + pa[3]);
				c.arcTo(pa[0], pa[1] + pa[3], pa[0], pa[1] + pa[3] - pa[4], pa[4]);
				c.lineTo(pa[0], pa[1] + pa[4]);
				c.arcTo(pa[0], pa[1], pa[0] + pa[4], pa[1], pa[4]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							0, 0,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawVertices : function (tn, lco, v, isf, co) {
			var s = this;
			if (v.length < 3) {
				return;
			}
			s.setList.push(function (c) {
				c.beginPath();
				c.moveTo(v[0][0], v[0][1]);
				var i, l = v.length, pa;
				for (i = 1; i < l; i++) {
					pa = v[i];
					c.lineTo(pa[0], pa[1]);
				}
				c.lineTo(v[0][0], v[0][1]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.closePath();
					c.stroke();
				}
			});
			s.showList.push({type : LShape.VERTICES, arg : v});
		},
		drawTriangles : function (ve, ind, u, tn, lco) {
			var s = this;
			var i, j, l = ind.length, c;
			s.setList.push(function (c) {
				var v = ve, a, k, sw;
				for (i = 0, j = 0; i < l; i += 3) {
					a = 0;
					c.save();
					c.beginPath();
					c.moveTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.lineTo(v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
					c.lineTo(v[ind[i + 2] * 2], v[ind[i + 2] * 2 + 1]);
					c.lineTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.closePath();
					if (tn) {
						c.lineWidth = tn;
						c.strokeStyle = lco;
						c.stroke();
					}
					c.clip();
					if (i % 6 == 0) {
						sw = -1;
						var w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						}
						if (i + j >= l) {
							w = (u[ind[i + j - l] * 2] - u[ind[i + 1] * 2]) * s.bitmap.width;
							sw = u[ind[i] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 1] * 2] - v[ind[i] * 2]) / w;
						var t2 = (v[ind[i + 1] * 2 + 1] - v[ind[i] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i] * 2], v[ind[i] * 2 + 1]);
						c.drawImage(s.bitmap.image,
									s.bitmap.x + sw,
									s.bitmap.y + sh,
									w, h,
									0, 0,
									w, h);
					} else {
						var w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						}
						if (i + 1 + j >= l) {
							w = (u[ind[i + 1 + j - l] * 2] - u[ind[i + 2] * 2]) * s.bitmap.width;
							sw = u[ind[i + 1] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i + 1] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + 1 + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 2] * 2] - v[ind[i + 1] * 2]) / w;
						var t2 = (v[ind[i + 2] * 2 + 1] - v[ind[i + 1] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
						c.drawImage(s.bitmap.image,
								s.bitmap.x + sw,
								s.bitmap.y + sh,
								w, h,
								0, -h,
								w, h);
					}
					c.restore();
				}
			});
		},
		drawLine : function (tn, lco, pa) {
			var s = this;
			s.setList.push(function (c) {
				c.beginPath();
				c.moveTo(pa[0], pa[1]);
				c.lineTo(pa[2], pa[3]);
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			});
			s.showList.push({type : LShape.LINE, arg : pa});
		},
		add : function (f) {
			this.setList.push(f);
		},
		ismouseon : function (e, co) {
			var s = this;
			if (e == null || e == UNDEFINED || s.showList.length == 0 || !s.parent) {
				return false;
			}
			return s.parent.ismouseonShapes(s.showList, e.offsetX, e.offsetY);
		},
		getWidth : function () {
			var s = this, k, k1, min, max, v, l, l1;
			for (k = 0, l = s.showList.length; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[0] - s.showList[k].arg[2] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[0] || typeof min == UNDEFINED) {
							min = v[0];
						}
						if (max < v[0] || typeof max == UNDEFINED) {
							max = v[0];
						}
					}
				} else if (s.showList[k].type == LShape.LINE) {
					if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0];
					}
					if (min > s.showList[k].arg[2] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[0] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.POINT) {
					if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[0] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0];
					}
				}
			}
			if (typeof min == UNDEFINED) {
				min = max = 0;
			}
			s.left = min;
			if (l > 0 && max == min) {
				max = min + 1;
			}
			return max - min;
		},
		getHeight : function () {
			var s = this, k = null, k1 = null, l, l1, min, max, v;
			for (k = 0, l = s.showList.length; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[3] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1] + s.showList[k].arg[3];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[1] - s.showList[k].arg[2] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[1] || typeof min == UNDEFINED) {
							min = v[1];
						}
						if (max < v[1] || typeof max == UNDEFINED) {
							max = v[1];
						}
					}
				} else if (s.showList[k].type == LShape.LINE) {
					if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1];
					}
					if (min > s.showList[k].arg[3] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[3];
					}
					if (max < s.showList[k].arg[1] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[3] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[3];
					}
				} else if (s.showList[k].type == LShape.POINT) {
					if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[1] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1];
					}
				}
			}
			if (typeof min == UNDEFINED) {
				min = max = 0;
			}
			s.top = min;
			if (l > 0 && max == min) {
				max = min + 1;
			}
			return max - min;
		},
		startX : function () {
			var s = this;
			s.getWidth();
			return s.left;
		},
		startY : function () {
			var s = this;
			s.getHeight();
			return s.top;
		}
	};
	for (var k in p) {
		LGraphics.prototype[k] = p[k];
	}
	return LGraphics;
})();
var LShape = (function () {
	function LShape () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		s.type = "LShape";
		s.graphics = new LGraphics();
		s.graphics.parent = s;
	}
	LShape.POINT = "point";
	LShape.LINE = "line";
	LShape.ARC = "arc";
	LShape.RECT = "rect";
	LShape.VERTICES = "vertices";
	var p = {
		_ll_show : function (c) {
			var s = this;
			s.graphics.ll_show(c);
		},
		getWidth : function (maskSize) {
			var s = this, mx, mw,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				mw = s.mask.getWidth();
				if (left < mx) {
					left = mx;
				}
				if (right > mx + mw) {
					right = mx + mw;
				}
			}
			s.ll_left = s.x + left;
			s.ll_right = s.x + right;
			return (right - left) * s.scaleX;
		},
		getHeight : function (maskSize) {
			var s = this, my, mh,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				mh = s.mask.getHeight();
				if (top < my) {
					top = my;
				}
				if (bottom > my + mh) {
					bottom = my + mh;
				}
			}
			s.ll_top = s.y + top;
			s.ll_bottom = s.y + bottom;
			return (bottom - top) * s.scaleY;
		},
		_startX : function () {
			var s = this;
			s.getWidth();
			return s.ll_left;
		},
		startX : function () {
			var s = this;
			return s._startX() * s.scaleX;
		},
		_startY : function () {
			var s = this;
			s.getHeight();
			return s.ll_top;
		},
		startY : function () {
			var s = this;
			return s._startY() * s.scaleY;
		},
		clone : function () {
			var s = this, a = new LShape(), c, o;
			a.copyProperty(s);
			a.graphics = s.graphics.clone();
			a.graphics.parent = a;
			return a;
		},
		ismouseon : function (e, cd) {
			var s = this, i = false, sc;
			if (!s.visible || e == null) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			sc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
			if (s.graphics) {
				i = s.graphics.ismouseon(e, sc);
			}
			return i;
		},
		die : function () {
			var s = this;
			s.graphics.clear();
			s.callParent("die",arguments);
		}
	};
	for (var k in p) {
		LShape.prototype[k] = p[k];
	}
	return LShape;
})();
var LSprite = (function () {
	function LSprite () {
		var s = this;
		LExtends(s, LDisplayObjectContainer, []);
		s.type = "LSprite";
		s.rotatex;
		s.rotatey;
		s.graphics = new LGraphics();
		s.graphics.parent = s;
		s.box2dBody = null;
		s.shapes = new Array();
		s.dragRange = null;
		s.useCursor = null;
	}
	var p = {
		setRotate : function (angle) {
			var s = this;
			if (s.box2dBody) {
				s.box2dBody.SetAngle(angle);
			} else {
				s.rotate = angle;
			}
		},
		_rotateReady : function () {
			var s = this;
			if (s.box2dBody) {
				if ((typeof s.rotatex) == UNDEFINED) {
					s.getRotateXY();
				}
				s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
				s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
				s.rotate = s.box2dBody.GetAngle();
			}
		},
		_ll_show : function (c) {
			var s = this;
			s.graphics.ll_show(c);
			LGlobal.show(s.childList, c);
			s._ll_debugShape(c);
		},
		startDrag : function (touchPointID) {
			var s = this;
			if (s.ll_dragStart) {
				return;
			}
			s.ll_touchPointID = touchPointID;
			s.ll_dragGlobalPoint = s.parent.localToGlobal(new LPoint(s.x, s.y));
			s.ll_dragMX = mouseX;
			s.ll_dragMY = mouseY;
			s.ll_dragStart = true;
			LGlobal.dragList.push(s);
		},
		stopDrag : function () {
			var s = this, i, l;
			for (i = 0, l = LGlobal.dragList.length; i < l; i++) {
				if (s.objectIndex == LGlobal.dragList[i].objectIndex) {
					s.ll_dragStart = false;
					LGlobal.dragList.splice(i, 1);
					break;
				}
			}
		},
		getRotateXY : function (w, h) {
			var s = this;
			if (!w || !h) {
				w = s.getWidth();
				h = s.getHeight();
			}
			s.rotatex = w / 2;
			s.rotatey = h / 2;
		},
		getWidth : function (maskSize) {
			var s = this, i, l, o, a, b, mx, mw,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.x;
				if (typeof o._startX == "function") {
					a=o._startX(maskSize);
				}
				b = a + o.getWidth(maskSize);
				if (a < left) {
					left = a;
				}
				if (b > right) {
					right = b;
				}
			}
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				mw = s.mask.getWidth();
				if (left < mx) {
					left = mx;
				}
				if (right > mx + mw) {
					right = mx + mw;
				}
				s.ll_left = left;
				s.ll_right = right;
			}else{
				s.ll_left = s.x + left;
				s.ll_right = s.x + right;
			}
			return (right - left) * s.scaleX;
		},
		getHeight : function (maskSize) {
			var s = this, i, l, o, a, b, my, mh,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.y;
				if (typeof o._startY == "function") {
					a=o._startY(maskSize);
				}
				b = a + o.getHeight(maskSize);
				if (a < top) {
					top = a;
				}
				if (b > bottom) {
					bottom = b;
				}
			}
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				mh = s.mask.getHeight();
				if (top < my) {
					top = my;
				}
				if (bottom > my + mh) {
					bottom = my + mh;
				}
				s.ll_top = top;
				s.ll_bottom = bottom;
			}else{
				s.ll_top = s.y + top;
				s.ll_bottom = s.y + bottom;
			}
			return (bottom - top) * s.scaleY;
		},
		_startX : function (maskSize) {
			var s = this;
			s.getWidth(maskSize);
			return s.ll_left;
		},
		startX : function (maskSize) {
			var s = this;
			return s._startX(maskSize) * s.scaleX;
		},
		_startY : function (maskSize) {
			var s = this;
			s.getHeight(maskSize);
			return s.ll_top;
		},
		startY : function (maskSize) {
			var s = this;
			return s._startY(maskSize) * s.scaleY;
		},
		_ll_loopframe : function () {
			this.dispatchEvent(LEvent.ENTER_FRAME);
		},
		clone : function () {
			var s = this, a = new LSprite(), c, o, i, l;
			a.copyProperty(s);
			a.graphics = s.graphics.clone();
			a.graphics.parent = a;
			a.childList.length = 0;
			for (i = 0, l = s.childList.length; i < l; i++) {
				c = s.childList[i];
				if (c.clone) {
					o = c.clone();
					o.parent = a;
					a.childList.push(o);
				}
			}
			return a;
		},
		_mevent : function (type) {
			var s = this, k;
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					return true;
				}
			}
			return false;
		},
		ll_dispatchMouseEvent : function (type, e, cd, ox, oy) {
			var s = this;
			if (!s.mouseEnabled) {
				return;
			}
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					e.selfX = (ox - (s.x * cd.scaleX + cd.x)) / (cd.scaleX * s.scaleX);
					e.selfY = (oy - (s.y * cd.scaleY + cd.y)) / (cd.scaleY * s.scaleY);
					e.currentTarget = e.clickTarget = s;
					if (!e.target) {
						e.target = s;
					}
					o.listener(e, s);
				}
			}
		},
		ll_mouseout : function (e, type, cd, ox, oy) {
			var s = this;
			if (type == LMouseEvent.MOUSE_MOVE && s.ll_mousein) {
				s.ll_mousein = false;
				if (s._mevent(LMouseEvent.MOUSE_OUT)) {
					s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OUT, e, cd, ox, oy);
				}
				if (s.mouseChildren) {
					for (var k = s.childList.length - 1; k >= 0; k--) {
						if (s.childList[k].mouseEvent && s.childList[k].ll_mouseout) {
							s.childList[k].ll_mouseout(e, type, cd, ox, oy);
						}
					}
				}
			}
		},
		mouseEvent : function (e, type, cd) {
			if (!e) {
				return false;
			}
			var s = this, i, k, ox = e.offsetX, oy = e.offsetY, on, mc;
			if (!s.visible) {
				return false;
			}
			if (cd == null) {
				cd = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			on = s.ismouseon(e, cd);
			if (on) {
				if(LGlobal.os == OS_PC && s.useCursor && type == LMouseEvent.MOUSE_MOVE){
					LGlobal.cursor = s.useCursor;
				}
				if (type == LMouseEvent.MOUSE_MOVE && !s.ll_mousein) {
					s.ll_mousein = true;
					if (s._mevent(LMouseEvent.MOUSE_OVER)) {
						s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OVER, e, cd, ox, oy);
					}
				}
				if (s.mouseChildren) {
					mc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
					for (k = s.childList.length - 1; k >= 0; k--) {
						if (s.childList[k].mouseEvent) {
							i = s.childList[k].mouseEvent(e, type, mc);
							if (i) {
								e.target = s.childList[k];
								if (type != LMouseEvent.MOUSE_MOVE) {
									break;
								}
							}
						}
					}
					if (s._mevent(type)) {
						s.ll_dispatchMouseEvent(type, e, cd, ox, oy);
					}
				}
				return true;
			} else {
				s.ll_mouseout(e, type, cd, ox, oy);
			}
			return false;
		},
		hitTestPoint : function (x, y) {
			var s = this, shapes = s.shapes;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			return s.ismouseonShapes(shapes, x, y);
		},
		hitTestObject : function (obj) {
			var s = this, shapes = s.shapes, shapes1 = obj.shapes, m, m1, j, child, j1, child1, vo1, v1;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			if (!shapes1 || shapes1.length == 0) {
				obj.getWidth();
				obj.getHeight();
				shapes1 = [{"type" : LShape.RECT, "arg" : [obj.ll_left - obj.x, obj.ll_top - obj.y, obj.ll_right - obj.ll_left, obj.ll_bottom - obj.ll_top]}];
			}
			m = s.getRootMatrix();
			m1 = obj.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				v1 = s._changeShape(child.type, child.arg, m);
				for (j1 = shapes1.length - 1; j1 >= 0; j1--) {
					child1 = shapes1[j1];
					vo1 = obj._changeShape(child1.type, child1.arg, m1);
					if (child.type == LShape.VERTICES || child.type == LShape.RECT) {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygon(v1, vo1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if(LGlobal.hitTestPolygonArc(v1, vo1)) {
								return true;
							}
						}
					} else {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygonArc(vo1, v1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if (Math.sqrt((v1[0] - vo1[0]) * (v1[0] - vo1[0]) + (v1[1] - vo1[1]) * (v1[1] - vo1[1])) < v1[2] + vo1[2]) {
								return true;
							}
						}
					}
				}
			}
			return false;
		},
		addShape : function (type, arg) {
			var s = this;
			if (type == LShape.VERTICES && arg.length < 3) {
				return;
			}
			s.shapes.push({"type" : type, "arg" : arg});
			return s.shapes;
		},
		addShapes : function (shapes) {
			var s = this;
			if(s.shapes.length == 0){
				s.shapes = shapes;
			}else{
				s.shapes = s.shapes.concat(shapes);
			}
		},
		clearShape : function () {
			this.shapes = [];
		},
		_ll_debugShape : function (c) {
			var s = this, i, l, child, arg, j, ll;
			if (!LGlobal.traceDebug || !s.shapes || s.shapes.length == 0) {
				return;
			}
			for (i = 0, l = s.shapes.length; i < l; i++) {
				child = s.shapes[i];
				c = c || LGlobal.canvas;
				arg = child.arg;
				c.beginPath();
				if (child.type == LShape.RECT) {
					c.rect(arg[0], arg[1], arg[2], arg[3]);
				}else if (child.type == LShape.ARC) {
					c.arc(arg[0], arg[1], arg[2], 0, 2*Math.PI);
				}else if (child.type == LShape.VERTICES) {
					c.moveTo(arg[0][0], arg[0][1]);
					for (j = 1, ll = arg.length; j < ll; j++) {
						c.lineTo(arg[j][0], arg[j][1]);
					};
					c.lineTo(arg[0][0], arg[0][1]);
				}
				c.closePath();
				c.strokeStyle = "#00FF00";
				c.stroke();
			}
		},
		ismouseon : function (e, cd) {
			var s = this;
			if (!s.visible || e==null) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			if(s.shapes && s.shapes.length > 0){
				return s.ismouseonShapes(s.shapes, e.offsetX, e.offsetY);
			}
			var k, i = false, l = s.childList, sc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
			for (k = l.length - 1; k >= 0; k--) {
				if (l[k].ismouseon) {
					i = l[k].ismouseon(e, sc);
				}
				if (i) {
					e.target = s.childList[k];
					break;
				}
			}
			if (!i) {
				i = s.graphics.ismouseon(e, sc);
			}
			return i;
		},
		die : function () {
			var s = this, i, c, l;
			s.graphics.clear();
			s.removeAllEventListener();
			s.stopDrag();
			if (s.box2dBody) {
				s.clearBody();
			}
			for (i = 0, c = s.childList, l = c.length; i < l; i++) {
				if (c[i].die) {
					c[i].die();
				}
			}
		}
	};
	for (var k in p) {
		LSprite.prototype[k] = p[k];
	}
	return LSprite;
})();
var LButton = (function () {
	function LButton (upState, overState, downState, disableState) {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LButton";
		s.addChild(upState);
		if (!overState) {
			overState = upState;
		} else {
			s.addChild(overState);
		}
		if (!downState) {
			downState = overState;
		} else {
			s.addChild(downState);
		}
		if (!disableState) {
			disableState = upState;
		} else {
			s.addChild(disableState);
		}
		s.upState = s.bitmap_up = upState;
		s.overState = s.bitmap_over = overState;
		s.downState = downState;
		s.disableState = disableState;
		s._ll_down_sx = s.downState.scaleX;
		s._ll_down_sy = s.downState.scaleY;
		s.overState.visible = false;
		s.downState.visible = false;
		s.upState.visible = true;
		s.buttonMode = true;
		s.staticMode = false;
		s.setState(LButton.STATE_ENABLE);
		if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
			LMouseEventContainer.pushButton(s);
		}
		s.addEventListener(LMouseEvent.MOUSE_DOWN, s.ll_modeDown);
		s.setCursorEnabled(true);
	}
	LButton.STATE_DISABLE = "disable";
	LButton.STATE_ENABLE = "enable";
	var p = {
		setState : function (state) {
			var s = this;
			if (state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				s.mouseEnabled = false;
			} else if (state == LButton.STATE_ENABLE) {
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = false;
				s.upState.visible = true;
				s.mouseEnabled = true;
			} else {
				return;
			}
			s.state = state;
		},
		ll_mouseout : function (e, type, cd, ox, oy) {
			var s = this;
			if (!s.ll_mousein) {
				return;
			}
			e.clickTarget=s;
			s.ll_modeOut(e);
			s.ll_mousein = false;
		},
		mouseEvent : function (e, type, cd) {
			if (!e) {
				return false;
			}
			var s = this;
			if (LGlobal.os == OS_PC && type == LMouseEvent.MOUSE_MOVE && s.ll_button_mode) {
				s.ll_button_mode(e);
			}
			return this.callParent("mouseEvent",arguments);
		},
		ll_button_mode : function(e){
			var s = this;
			if (!s.visible) {
				return;
			}
			e.clickTarget=s;
			if(s.hitTestPoint(e.offsetX,e.offsetY)){
				s.ll_modeOver(e);
			}else{
				s.ll_modeOut(e);
			}
		},
		ll_modeDown : function (e) {
			var s = e.clickTarget, w, h, tw, th, x, y, tx, ty, onComplete;
			if (!s.buttonMode || s.tween) {
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.upState.visible = false;
			s.overState.visible = false;
			s.downState.visible = true;	
			s._tweenOver = s.ll_modeOver;
			onComplete = function(obj){
				var s = obj.parent;
				if(!s || !s.tween){
					return;
				}
				delete s.tween;
				s._tweenOver({clickTarget : s});
				delete s._tweenOver;
			};
			if (s.staticMode) {
				s.tween = LTweenLiteTimeline.to(s.downState, 0.3, {}).to(s.downState, 0.1, {onComplete : onComplete});
			} else {
				w = s.downState.getWidth();
				h = s.downState.getHeight();
				tw = w * 1.1;
				th = h * 1.1;
				x = s.downState.x;
				y = s.downState.y;
				tx = x + (w - tw) * 0.5;
				ty = y + (h - th) * 0.5;
				s.tween = LTweenLiteTimeline.to(s.downState, 0.3, {x : tx, y : ty, scaleX : s._ll_down_sx*1.1, scaleY : s._ll_down_sy*1.1, ease : Quart.easeOut})
				.to(s.downState, 0.1, {x : x, y : y, scaleX : s._ll_down_sx, scaleY : s._ll_down_sy, ease : Quart.easeOut,onComplete : onComplete});
			}
		},
		ll_modeOver : function (e) {
			var s = e.clickTarget;
			if (!s.buttonMode) {
				return;
			}
			if (s.tween) {
				s._tweenOver = s.ll_modeOver;
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.upState.visible = false;
			s.downState.visible = false;
			s.overState.visible = true;
		},
		ll_modeOut : function (e){
			var s = e.clickTarget;
			if (!s.buttonMode) {
				return;
			}
			if (s.tween) {
				s._tweenOver = s.ll_modeOut;
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.overState.visible = false;
			s.downState.visible = false;
			s.upState.visible = true;
		},
		setCursorEnabled : function (value) {
			this.useCursor = value ? "pointer" : null;
		},
		clone : function () {
			var s = this;
			return new LButton(s.upState.clone(),s.overState.clone(),s.downState.clone(),s.disableState.clone());
		},
		die : function () {
			var s = this;
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
				LMouseEventContainer.removeButton(s);
			}
			s.callParent("die",arguments);
		}
	};
	for (var k in p) {
		LButton.prototype[k] = p[k];
	}
	return LButton;
})();
function LBlendMode () {throw "LBlendMode cannot be instantiated";}
LBlendMode.SOURCE_OVER = "source-over";
LBlendMode.SOURCE_ATOP = "source-atop";
LBlendMode.SOURCE_IN = "source-in";
LBlendMode.SOURCE_OUT = "source-out";
LBlendMode.DESTINATION_OVER = "destination-over";
LBlendMode.DESTINATION_ATOP = "destination-atop";
LBlendMode.DESTINATION_IN = "destination-in";
LBlendMode.DESTINATION_OUT = "destination-out";
LBlendMode.LIGHTER = "lighter";
LBlendMode.COPY = "copy";
LBlendMode.XOR = "xor";
LBlendMode.NONE = null;
LBlendMode.NORMAL = null;
var LTextFieldType = function (){throw "LTextFieldType cannot be instantiated";};
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;
LStyleSheet = (function() {
	function LStyleSheet() {
		var s = this;
		LExtends(s, LObject, []);
		s.styleIndex = 0;
		s.styleNames  = {};
	}
	LStyleSheet.prototype.clone = function() {
		var s = this, a = new s.constructor();
		a.copyProperty(s);
		return a;
	};
	LStyleSheet.prototype.setStyle = function(styleName, styleObject) {
		this.styleIndex++;
		if (styleObject === null) {
			if (this.styleNames[styleName]) {
				delete this.styleNames[styleName];
			}
			return;
		}
		var arr = styleObject.replace(/(^\{)|(\}$)/g, "").split(";"), i, styleObjects;
		styleObject = {};
		for ( i = 0; i < arr.length; i++) {
			if (!arr[i]) {
				continue;
			}
			var styleObjects = arr[i].split(":");
			if (!styleObjects[0]) {
				continue;
			}
			styleObject[styleObjects[0]] = styleObjects[1];
		}
		this.styleNames[styleName] = styleObject;
	};
	LStyleSheet.prototype.getStyle = function(styleName) {
		return this.styleNames[styleName];
	};
	return LStyleSheet;
})();
LTextFormat = (function() {
	function LTextFormat(font, size, color, bold, italic, underline) {
		var s = this;
		LExtends(s, LObject, []);
		s.font = font ? font : "Arial";
		s.size = size ? size : 15;
		s.color = color ? color : "#000000";
		s.bold = bold ? bold : false;
		s.italic = italic ? italic : false;
		s.underline = underline ? underline : false;
	}
	LTextFormat.prototype.clone = function() {
		var s = this, a = new s.constructor();
		a.copyProperty(s);
		return a;
	};
	LTextFormat.prototype.getFontText = function() {
		var s = this;
		return (s.italic ? "italic " : "") + (s.bold ? "bold " : "") + s.size + "px " + s.font;
	};
	LTextFormat.prototype.setCss = function(css) {
		var s = this, k;
		for (k in css) {
			switch (k) {
				case "color":
					s.color = css[k];
					break;
				case "font-family":
					s.font = css[k];
					break;
				case "font-size":
					s.size = css[k];
					break;
				case "font-style":
					s.italic = (css[k] == "italic");
					break;
				case "font-weight":
					s.bold = (css[k] == "bold");
					break;
				case "text-decoration":
					s.color = (css[k] == "underline");
					break;
			}
		}
	};
	return LTextFormat;
})();
var LTextField = (function () {
	function LTextField () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		s.type = "LTextField";
		s.texttype = null;
		s.text = "";
		s.htmlText = "";
		s.styleSheet = "";
		s.font = "Arial";
		s.size = 15;
		s.color = "#000000";
		s.weight = "normal";
		s.textAlign = "left";
		s.textBaseline = "top";
		s.heightMode = LTextField.HEIGHT_MODE_BOTTOM;
		s.stroke = false;
		s.lineWidth = 1;
		s.lineColor = "#000000";
		s.width = 150;
		s.height = s.size;
		s.displayAsPassword = false;
		s.wordWrap = false;
		s.multiline = false;
		s.numLines = 1;
		s.speed = 0;
		s._speedIndex = 100;
	}
	LTextField.HEIGHT_MODE_BOTTOM = "bottom";
	LTextField.HEIGHT_MODE_BASELINE = "baseline";
	var p = {
		_showReady : function (c) {
			var s = this;
			c.font = s.weight + " " + s.size + "px " + s.font;  
			c.textAlign = s.textAlign;
			c.textBaseline = s.textBaseline;
			c.fillStyle = s.color;
			if (s.stroke) {
				c.strokeStyle = s.lineColor;
				c.lineWidth = s.lineWidth + 1;  
			}
		},
		ll_getStyleSheet : function (textFormat, tabName, attribute, text) {
			var s = this, pattern, tf = textFormat.clone();
			if (tabName == "font") {
				var i = 0;
				while (attribute) {
					if (i++ > 4)
						break;
					pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
					var arr = pattern.exec(attribute);
					if (!arr || !arr[0]) {
						break;
					}
					switch(arr[2]) {
						case "face":
							tf.font = arr[6];
							break;
						case "color":
							tf.color = arr[6];
							break;
						case "size":
							tf.size = arr[6];
							break;
					}
					attribute = attribute.replace(arr[0], "").replace(/(^\s*)|(\s*$)|(\n)/g, "");
				}
			} else if (tabName == "b") {
				tf.bold = true;
			} else if (tabName == "u") {
				tf.underline = true;
			} else if (tabName == "i") {
				tf.italic = true;
			} else if (tabName == "p" && s.wordWrap) {
				text = "\n" + text + "\n";
			} else if(s.styleSheet){
				var sheetObj;
				if (tabName == "span"){
					pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
					var arr = pattern.exec(attribute);
					if (arr && arr[0]) {
						switch(arr[2]) {
							case "class":
								sheetObj = s.styleSheet.getStyle("." + arr[6]);
								break;
						}
					}
				}else if(s.styleSheet.getStyle(tabName)){
					sheetObj = s.styleSheet.getStyle(tabName);
				}
				if(sheetObj){
					tf.setCss(sheetObj);
				}
			}
			s.ll_getHtmlText(tf, text); 
		},
		ll_getHtmlText : function (tf, text) {
			if (!text) {
				return;
			}
			var s = this, tabName, content, start, end, pattern = /<(.*?)(\s*)(.*?)>(.*?)<\/\1>/g, arr = pattern.exec(text);
			if (!arr || !arr[0]) {
				s.ll_htmlTexts.push({
					textFormat : tf.clone(),
					text : text
				});
				return;
			}
			if (arr.index > 0) {
				s.ll_htmlTexts.push({
					textFormat : tf.clone(),
					text : text.substring(0, arr.index)
				});
			}
			tabName = arr[1];
			start = arr.index;
			end = start;
			do {
				end = text.indexOf("</" + tabName, end + 1);
				start = text.indexOf("<" + tabName, start + 1);
			} while(start > 0 && start < end);

			content = text.substring(text.indexOf(">", arr.index) + 1, end);
			s.ll_getStyleSheet(tf, tabName, arr[3], content);
			s.ll_getHtmlText(tf, text.substring(end + tabName.length + 3));
		},
		_ll_show : function (ctx) {
			var s = this, c, d, lbl, i, rc, j, l, k, m, b, h, enter, tf, underlineY;
			if (s.texttype == LTextFieldType.INPUT) {
				s.inputBackLayer.ll_show();
				rc = s.getRootCoordinate();
				if (LGlobal.inputBox.name == "input" + s.objectIndex) {
					LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
					LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
				}
				if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex == s.objectIndex) {
					return;
				}else{
					c.clip();
				}
			}
			if (LGlobal.fpsStatus) {
				LGlobal.fpsStatus.text++;
			}
			if(LGlobal.enableWebGL){
				s._createCanvas();
				s._canvas.width = LGlobal.width;
				s._canvas.height = LGlobal.height;
				s._showReady(s._context);
				c = s._context;
			}else{
				c = ctx;
			}
			if (s.htmlText) {
				if (s.ll_htmlText != s.htmlText || (s.styleSheet && (s.ll_style_objectIndex != s.styleSheet.objectIndex || s.ll_styleIndex == s.styleSheet.styleIndex))) {
					tf = new LTextFormat();
					s.ll_htmlTexts = [];
					s.ll_htmlText = s.htmlText;
					if(s.styleSheet){
						s.ll_style_objectIndex = s.styleSheet.objectIndex;
						s.ll_styleIndex = s.styleSheet.styleIndex;
					}
					s.ll_getHtmlText(tf, s.htmlText);
				}
				j = 0, k = 0, m = 0, b = 0;
				s._ll_height = s.wordHeight || 30;
				if(!LTextField.underlineY){
					LTextField.underlineY = {"alphabetic" : 0, "top" : 1, "bottom" : -0.2, "middle" : 0.4, "hanging" : 0.8};
				}
				s.ll_htmlTexts.forEach(function(element){
					var textFormat = element.textFormat, text = element.text;
					c.font = textFormat.getFontText();
					c.fillStyle = textFormat.color;
					for (i = 0, l = text.length; i < l; i++) {
						enter = /(?:\r\n|\r|\n|¥n)/.exec(text.substr(i, 1));
						if (enter) {
							j = 0;
							k = i + 1;
							m++;
						} else {
							h = c.measureText("O").width * 1.2;
							if (s.stroke) {
								c.strokeText(text.substr(i, 1), j, m * s._ll_height);
							}
							c.fillText(text.substr(i, 1), j, m * s._ll_height);
							if(textFormat.underline){
								c.beginPath();
								underlineY = m * s._ll_height + h * LTextField.underlineY[s.textBaseline];
								c.moveTo(j, underlineY);
								c.lineTo(j + c.measureText(text.substr(i, 1)).width, underlineY);
								c.stroke();
							}
						}
						j += c.measureText(text.substr(i, 1)).width;
						if (s.wordWrap && j + c.measureText(text.substr(i + 1, 1)).width > s.width) {
							j = 0;
							k = i + 1;
							m++;
						}
					}
					s.height = (m + 1) * s._ll_height;
				});
				if(LGlobal.enableWebGL){
					ctx.drawImage(s._canvas, 0, 0);
				}
				return;
			}
			lbl = s.text;
			if (s.displayAsPassword) {
				lbl = '';
				for (i=0, l = s.text.length; i < l; i++) {
					lbl += '*';
				}
			}
			if (s.wordWrap || s.multiline) {
				j = 0, k = 0, m = 0, b = 0;
				for (i = 0, l = s.text.length; i < l; i++) {
					enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i, 1));
					if (enter) {
						j = 0;
						k = i + 1;
						m++;
					} else {
						if (s.stroke) {
							c.strokeText(lbl.substr(i, 1), j, m * s.wordHeight);
						}
						c.fillText(lbl.substr(i, 1), j, m * s.wordHeight);
					}
					s.numLines = m;
					j = c.measureText(s.text.substr(k, i + 1 - k)).width;
					if (s.wordWrap && j + c.measureText(lbl.substr(i, 1)).width > s.width) {
						j = 0;
						k = i + 1;
						m++;
					}
				}
				s.height = (m + 1) * s.wordHeight;
			} else {
				s.numLines = 1;
				if (s.stroke) {
					c.strokeText(lbl, 0, 0, c.measureText(lbl).width);
				}
				c.fillText(lbl, 0, 0, c.measureText(lbl).width);
			}
			if(LGlobal.enableWebGL){
				ctx.drawImage(s._canvas, 0, 0);
			}
			if (s.windRunning) {
				s._ll_windRun();
			}
		},
		_wordHeight : function (h) {
			var s = this;
			if (h > 0) {
				s.wordHeight = h;
			} else {
				s.wordWrap = false;
				s.wordHeight = s.getHeight();
			}
			s.height = 0;
		},
		setMultiline : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.multiline = v;
		},
		setWordWrap : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.wordWrap = v;
		},
		setType : function (type, inputBackLayer) {
			var s = this;
			if (s.texttype != type && type == LTextFieldType.INPUT) {
				if (inputBackLayer == null || inputBackLayer.type != "LSprite") {
					s.inputBackLayer = new LSprite();
					s.inputBackLayer.graphics.drawRect(1, "#000000", [0, -s.getHeight() * 0.4, s.width, s.getHeight() * 1.5]);
				} else {
					s.inputBackLayer = inputBackLayer;
				}
				s.inputBackLayer.parent = s;
				if (LMouseEventContainer.container[LMouseEvent.MOUSE_DOWN]) {
					LMouseEventContainer.pushInputBox(s);
				}
			} else {
				s.inputBackLayer = null;
				LMouseEventContainer.removeInputBox(s);
			}
			s.texttype = type;
		},
		ismouseon : function (e, cood) {
			var s = this;
			if (!e) {
				return false;
			}
			if (!s.visible) {
				return false;
			}
			if (!cood) {
				cood = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cood)) {
					return false;
				}
			}
			if (s.inputBackLayer) {
				return s.inputBackLayer.ismouseon(e, {x : s.x * cood.scaleX + cood.x, y : s.y * cood.scaleY + cood.y, scaleX : cood.scaleX * s.scaleX, scaleY : cood.scaleY * s.scaleY});
			}
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s._getWidth(), s._getHeight()]}], e.offsetX, e.offsetY);
		},
		clone : function () {
			var s = this, a = new s.constructor();
			a.copyProperty(s);
			a.texttype = null;
			if (s.texttype ==  LTextFieldType.INPUT) {
				a.setType( LTextFieldType.INPUT);
			}
			return a;
		},
		mouseEvent : function (event, type, cood) {
			var s = this, on;
			if (s.inputBackLayer == null || type != LMouseEvent.MOUSE_DOWN) {
				return;
			}
			on = s.ismouseon(event, cood);
			if (!on) {
				return;
			}
			s.focus();
		},
		_ll_getValue : function () {
			if (LGlobal.inputBox.style.display != NONE) {
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LEvent.removeEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
				LGlobal.inputBox.style.display = NONE;
				if(typeof LGlobal.inputTextField.preventDefault != UNDEFINED){
					LGlobal.preventDefault=LGlobal.inputTextField.preventDefault;
				}
				LGlobal.inputTextField.dispatchEvent(LFocusEvent.FOCUS_OUT);
				LGlobal.inputTextField = null;
			}
		},
		updateInput : function () {
			var s = this;
			if (s.texttype == LTextFieldType.INPUT && LGlobal.inputTextField.objectIndex == s.objectIndex) {
				LGlobal.inputTextBox.value = LGlobal.inputTextField.text;
			}
		},
		_ll_input : function (e) {
			var event = new LEvent(LTextEvent.TEXT_INPUT);
			event.keyCode = e.keyCode;
			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
			if (LGlobal.inputTextField.hasEventListener(LTextEvent.TEXT_INPUT)) {
				e.returnValue = LGlobal.inputTextField.dispatchEvent(event);
			} else {
				e.returnValue = true;
			}
		},
		focus : function () {
			var s = this, sc, sx;
			if (!s.parent) {
				return;
			}
			if (s.texttype != LTextFieldType.INPUT) {
				return;
			}
			if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex != s.objectIndex) {
				s._ll_getValue();
			}
			s.dispatchEvent(LFocusEvent.FOCUS_IN);
			sc = s.getAbsoluteScale();
			LGlobal.inputBox.style.display = "";
			LGlobal.inputBox.name = "input" + s.objectIndex;
			LGlobal.inputTextField = s;
			LGlobal.inputTextareaBoxObj.style.display = NONE;
			LGlobal.inputTextBoxObj.style.display = NONE;
			LGlobal.passwordBoxObj.style.display = NONE;
			if (s.displayAsPassword) {
				LGlobal.inputTextBox = LGlobal.passwordBoxObj;
			} else if (s.multiline) {
				LGlobal.inputTextBox = LGlobal.inputTextareaBoxObj;
			} else {
				LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
			}
			sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width;
			sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
			LGlobal.inputTextBox.style.display = "";
			LGlobal.inputTextBox.value = s.text;
			LGlobal.inputTextBox.style.height = s.inputBackLayer.getHeight() * sc.scaleY * s.scaleY * sy + "px";
			LGlobal.inputTextBox.style.width = s.inputBackLayer.getWidth() * sc.scaleX * s.scaleX * sx + "px";
			LGlobal.inputTextBox.style.color = s.color;
			LGlobal.inputTextBox.style.fontSize = ((s.size * parseFloat(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >> 0) + "px";
			LGlobal.inputTextBox.style.fontFamily = s.font;
			LEvent.addEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
			if (s.texttype == LTextFieldType.INPUT) {
				rc = s.getRootCoordinate();
				if (LGlobal.inputBox.name == "input" + s.objectIndex) {
					LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
					LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
				}
			}
			setTimeout(function () {
				if(LGlobal.ios){
					s.preventDefault = LGlobal.preventDefault;
					LGlobal.preventDefault=false;
				}
				LGlobal.inputTextBox.focus();
			}, 0);
		},
		_getWidth : function () {
			var s = this;
			if (s.wordWrap) {
				return s.width;
			}
			if(typeof enableWebGLCanvas !== UNDEFINED){
				this._createCanvas();
			}
			var c = (typeof enableWebGLCanvas !== UNDEFINED) ? s._context : LGlobal.canvas;
			c.font = s.size + "px " + s.font;
			return c.measureText(s.text).width;
		},
		getWidth : function (maskSize) {
			var s = this, w, mx, mw;
			w = s._getWidth() * s.scaleX;
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				if (mx > w) {
					return 0;
				}
				mw = s.mask.getWidth();
				if (mx + mw > w) {
					return w - mx;
				} else {
					return mw;
				}
			}
			return w;
		},
		_startX : function (maskSize) {
			var s = this;
			if(s.textAlign == "left"){
				return s.x;
			}
			var w = s.getWidth(maskSize);
			return s.x + (s.textAlign == "right" ? -w : -w * 0.5);
		},
		_getHeight : function () {
			var s = this;
			if(typeof enableWebGLCanvas !== UNDEFINED){
				this._createCanvas();
			}
			var c = (typeof enableWebGLCanvas !== UNDEFINED) ? s._context : LGlobal.canvas, i, l, j, k, m, enter;
			if (s.wordWrap) {
				c.font = s.weight + " " + s.size + "px " + s.font;
				if (s.height == 0) {
					j = 0, k = 0, m = 0;
					for (i = 0, l = s.text.length; i < l; i++) {
						enter = /(?:\r\n|\r|\n|¥n)/.exec(s.text.substr(i, 1));
						if (enter) {
							j = 0;
							k = i + 1;
							m++;
						}
						j = c.measureText(s.text.substr(k, i + 1 - k)).width;
						if (s.wordWrap && j + c.measureText(s.text.substr(i + 1, 1)).width > s.width) {
							j = 0;
							k = i + 1;
							m++;
						}
					}
					s.height = (m + 1) * s.wordHeight;
				}
				return s.height;
			}
			c.font = s.weight + " " + s.size + "px " + s.font; 
			l = c.measureText("O").width * 1.2;
			if (s.heightMode == LTextField.HEIGHT_MODE_BASELINE) {
				l = l * 1.2;
			}
			return l;
		},
		getHeight : function (maskSize) {
			var s = this, h, my, mh;
			h = s._getHeight() * s.scaleY;
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				if (my > h) {
					return 0;
				}
				mh = s.mask.getHeight();
				if (my + mh > h) {
					return h - my;
				} else {
					return mh;
				}
			}
			return h;
		},
		wind : function (listener) {
			var s = this;
			s.wind_over_function = listener;
			s.windRunning = true;
			s._ll_wind_text = s.text;
			s.text = "";
			s._ll_wind_length = 0;
		},
		_ll_windRun : function () {
			var s = this;
			if (s._speedIndex++ < s.speed) {
				return;
			}
			s._speedIndex = 0;
			if (s._ll_wind_length > s._ll_wind_text.length) {
				s.windRunning = false;
				if (s.wind_over_function) {
					s.wind_over_function();
				}
				s.dispatchEvent(new LEvent(LTextEvent.WIND_COMPLETE));
				return;
			}
			s.text = s._ll_wind_text.substring(0, s._ll_wind_length);
			s._ll_wind_length++;
		},
		windComplete : function() {
			var s = this;
			s._speedIndex = s.speed;
			s.text = s._ll_wind_text;
			s._ll_wind_length = s._ll_wind_text.length + 1;
			s._ll_windRun();
		},
		die : function () {
			LMouseEventContainer.removeInputBox(this);
		}
	};
	for (var k in p) {
		LTextField.prototype[k] = p[k];
	}
	return LTextField;
})();
var LBitmap = (function () {
	function LBitmap (bitmapdata) {
		var s = this;
		LExtends(s, LDisplayObject, []);
		s.type = "LBitmap";
		s.rotateCenter = true;
		s.bitmapData = bitmapdata; 
		if (s.bitmapData) {
			s.width = s.bitmapData.width;
			s.height = s.bitmapData.height;
		}
	}
	var p = {
		_canShow : function () {
			return (this.visible && this.bitmapData);
		},
		_rotateReady : function () {
			var s = this;
			if (s.rotate != 0 && s.rotateCenter) {
				s.rotatex = s.getWidth() * 0.5;
				s.rotatey = s.getHeight() * 0.5;
			} else {
				s.rotatex = s.rotatey = 0;
			}
		},
		_coordinate : function (c) {},
		_ll_show : function (c) {
			this.ll_draw(c);
		},
		ll_draw : function (c) {
			var s = this;
			if (LGlobal.fpsStatus) {
				LGlobal.fpsStatus.bitmapData++;
			}
			c.drawImage(s.bitmapData.image,
				s.bitmapData.x,
				s.bitmapData.y,
				s.bitmapData.width,
				s.bitmapData.height,
				s.x,
				s.y,
				s.bitmapData.width,
				s.bitmapData.height
			);
		},
		clone : function () {
			var s = this, a = new LBitmap(s.bitmapData.clone());
			a.copyProperty(s);
			a.rotateCenter = s.rotateCenter;
			return a;
		},
		ismouseon : function (e, cood) {
			var s = this;
			if (!e) {
				return false;
			}
			if (!s.visible || !s.bitmapData) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cood)) {
					return false;
				}
			}
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s.bitmapData.width, s.bitmapData.height]}], e.offsetX, e.offsetY);
		},
		getWidth : function (maskSize) {
			var s = this, w, mx, mw;
			w = s.bitmapData != null ? s.bitmapData.width * (s.scaleX > 0 ? s.scaleX : -s.scaleX) : 0;
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				if (mx > w) {
					return 0;
				}
				mw = s.mask.getWidth();
				if (mx + mw > w) {
					return w - mx;
				}else{
					return mw;
				}
			}
			return w;
		},
		getHeight : function (maskSize) {
			var s = this, h, my, mh;
			h = s.bitmapData != null ? s.bitmapData.height * (s.scaleY > 0 ? s.scaleY : -s.scaleY) : 0;
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				if (my > h) {
					return 0;
				}
				mh = s.mask.getHeight();
				if (my + mh > h) {
					return h - my;
				}else{
					return mh;
				}
			}
			return h;
		},
		startX : function () {
			return this.x;
		},
		startY : function () {
			return this.y;
		},
		die : function () {}
	};
	for (var k in p) {
		LBitmap.prototype[k] = p[k];
	}
	return LBitmap;
})();
var LBitmapData = (function() {
	function LBitmapData(image, x, y, width, height, dataType) {
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LBitmapData";
		if ( typeof dataType == UNDEFINED) {
			dataType = LBitmapData.DATA_IMAGE;
		}
		s.oncomplete = null;
		s._locked = false;
		s._setPixel = false;
		s.x = (x == null ? 0 : x);
		s.y = (y == null ? 0 : y);
		s.width = 0;
		s.height = 0;
		s.dataType = null;
		if (image && typeof image == "object") {
			s.image = image;
			s.dataType = LBitmapData.DATA_IMAGE;
			s.width = (width == null ? s.image.width : width);
			s.height = (height == null ? s.image.height : height);
			s._setDataType(dataType);
		} else {
			s._createCanvas();
			s.dataType = LBitmapData.DATA_CANVAS;
			s._canvas.width = s.width = (width ? width : 1);
			s._canvas.height = s.height = (height ? height : 1);
			if ( typeof image == "string") {
				s._context.fillStyle = image;
				s._context.fillRect(0, 0, s.width, s.height);
			}else if ( typeof image == "number") {
				var d = s._context.createImageData(s.width, s.height);
				for (var i = 0; i < d.data.length; i += 4) {
					d.data[i + 0] = image >> 16 & 0xFF;
					d.data[i + 1] = image >> 8 & 0xFF;
					d.data[i + 2] = image & 0xFF;
					d.data[i + 3] = 255;
				}
				s._context.putImageData(d, 0, 0);
			}
			s.image = s._canvas;
			if (dataType == LBitmapData.DATA_IMAGE) {
				s._setDataType(dataType);
			}
		}
		s.resize();
	}
	LBitmapData.DATA_IMAGE = "data_image";
	LBitmapData.DATA_CANVAS = "data_canvas";
	var p = {
		_setDataType : function(dataType) {
			var s = this;
			if (s.dataType == dataType) {
				return;
			}
			if (dataType == LBitmapData.DATA_CANVAS) {
				s._createCanvas();
				s._canvas.width = s.image.width;
				s._canvas.height = s.image.height;
				s._context.clearRect(0, 0, s._canvas.width, s._canvas.height);
				s._context.drawImage(s.image, 0, 0);
				s.image = s._canvas;
			} else if (dataType == LBitmapData.DATA_IMAGE) {
				s.image = new Image();
				s.image.width = s._canvas.width;
				s.image.height = s._canvas.height;
				s.image.src = s._canvas.toDataURL();
			}
			s.dataType = dataType;
		},
		_createCanvas : function() {
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		clear : function(rectangle) {
			var s = this;
			s._createCanvas();
			if(rectangle){
				s._context.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
			}else{
				s._canvas.width = s.image.width;
			}
			if (s.dataType == LBitmapData.DATA_IMAGE) {
				s.image.src = s._canvas.toDataURL();
			}
		},
		setProperties : function(x, y, width, height) {
			var s = this;
			s.x = x;
			s.y = y;
			s.width = width;
			s.height = height;
			s.resize();
		},
		setCoordinate : function(x, y) {
			var s = this;
			s.x = x;
			s.y = y;
			s.resize();
		},
		clone : function() {
			var s = this;
			return new LBitmapData(s.image, s.x, s.y, s.width, s.height, s.dataType);
		},
		_ready : function() {
			var s = this;
			s._dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			s._data = s._context.getImageData(s.x, s.y, s.width, s.height);
		},
		_update : function() {
			var s = this;
			s._context.putImageData(s._data, s.x, s.y, 0, 0, s.width, s.height);
			s._setDataType(s._dataType);
			s._data = null;
		},
		applyFilter : function(sourceBitmapData, sourceRect, destPoint, filter, c) {
			var s = this;
			var r = s._context.getImageData(s.x + sourceRect.x, s.y + sourceRect.y, sourceRect.width, sourceRect.height);
			var data = filter.filter(r,sourceRect.width, c);
			s.putPixels(new LRectangle(destPoint.x, destPoint.y, sourceRect.width, sourceRect.height), data);
		},
		getPixel : function(x, y, colorType) {
			var s = this, i, d;
			x = x >> 0;
			y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			i = s.width * 4 * y + x * 4;
			d = s._data.data;
			if (!s._locked) {
				s._update();
			}
			if (colorType == "number") {
				return d[i] << 16 | d[i + 1] << 8 | d[i + 2];
			} else {
				return [d[i], d[i + 1], d[i + 2], d[i + 3]];
			}
		},
		setPixel : function(x, y, data) {
			var s = this;
			x = x >> 0;
			y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			var d = s._data, i = s.width * 4 * y + x * 4;
			if ( typeof data == "object") {
				d.data[i + 0] = data[0];
				d.data[i + 1] = data[1];
				d.data[i + 2] = data[2];
				d.data[i + 3] = data[3];
			} else {
				if ( typeof data == "string") {
					data = parseInt(data.replace("#", "0x"));
				}
				d.data[i + 0] = data >> 16 & 0xFF;
				d.data[i + 1] = data >> 8 & 0xFF;
				d.data[i + 2] = data & 0xFF;
				d.data[i + 3] = 255;
			}
			if (!s._locked) {
				s._update();
			}
		},
		getPixels : function(rect) {
			var s = this, r;
			if (!s._locked) {
				s._ready();
			}
			r = s._context.getImageData(s.x + rect.x, s.y + rect.y, rect.width, rect.height);
			if (!s._locked) {
				s._update();
			}
			return r;
		},
		setPixels : function(rect, data) {
			var s = this, i, j, d, w, sd, x, y;
			if (!s._locked) {
				s._ready();
			}
			d = s._data;
			if ( typeof data == "object") {
				w = s._canvas.width;
				for ( x = rect.x; x < rect.right; x++) {
					for ( y = rect.y; y < rect.bottom; y++) {
						i = w * 4 * (s.y + y) + (s.x + x) * 4;
						j = data.width * 4 * (y - rect.y) + (x - rect.x) * 4;
						d.data[i + 0] = data.data[j + 0];
						d.data[i + 1] = data.data[j + 1];
						d.data[i + 2] = data.data[j + 2];
						d.data[i + 3] = data.data[j + 3];
					}
				}
			} else {
				if ( typeof data == "string") {
					data = parseInt(data.replace("#", "0x"));
				}
				data = [data >> 16 & 0xFF, data >> 8 & 0xFF, data & 0xFF];
				w = s._canvas.width;
				for ( x = rect.x; x < rect.right; x++) {
					for ( y = rect.y; y < rect.bottom; y++) {
						i = w * 4 * (s.y + y) + (s.x + x) * 4;
						d.data[i + 0] = data[0];
						d.data[i + 1] = data[1];
						d.data[i + 2] = data[2];
						d.data[i + 3] = 255;
					}
				}
			}
			if (!s._locked) {
				s._update();
			}
		},
		putPixels : function(rect, data) {
			var s = this;
			if (s.dataType != LBitmapData.DATA_CANVAS || typeof data != "object") {
				return;
			}
			s._context.putImageData(data, s.x + rect.x, s.y + rect.y, 0, 0, rect.width, rect.height);
		},
		lock : function() {
			var s = this;
			s._locked = true;
			s._ready();
		},
		unlock : function() {
			var s = this;
			s._locked = false;
			s._update();
		},
		draw : function(source, matrix, colorTransform, blendMode, clipRect) {
			var s = this, c, bd = source, x, y, w, h, save = false;
			var _dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			if (matrix || colorTransform || blendMode || clipRect) {
				s._context.save();
				save = true;
			}
			if (clipRect) {
				if (!( bd instanceof LBitmapData)) {
					x = y = 0;
				} else {
					x = bd.x;
					y = bd.y;
				}
				bd = new LBitmapData(bd.getDataCanvas(), x + clipRect.x, y + clipRect.y, clipRect.width, clipRect.height, LBitmapData.DATA_CANVAS);
			}
			w = bd.getWidth() >>> 0;
			h = bd.getHeight() >>> 0;
			if (w == 0 || h == 0) {
				s._setDataType(_dataType);
				return;
			}
			c = bd.getDataCanvas();
			if (colorTransform) {
				bd.colorTransform(new LRectangle(0, 0, w, h), colorTransform);
				c = bd.image;
			}
			if (matrix) {
				s._context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
			}
			if (blendMode) {
				s._context.globalCompositeOperation = blendMode;
			}
			s._context.drawImage(c, bd.x, bd.y, w, h, 0, 0, w, h);
			if (save) {
				s._context.restore();
			}
			s._setDataType(_dataType);
			s.resize();
		},
		getDataCanvas : function() {
			var s = this;
			var _dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			s._setDataType(_dataType);
			return s._canvas;
		},
		getWidth : function() {
			return this.width;
		},
		getHeight : function() {
			return this.height;
		},
		resize : function() {
			var s = this, w = s.image.width - s.x, h = s.image.height - s.y;
			s.width = s.width < w ? s.width : w;
			s.height = s.height < h ? s.height : h;
		},
		colorTransform : function(rect, colorTransform) {
			var s = this;
			if (s.dataType != LBitmapData.DATA_CANVAS) {
				return;
			}
			var x = rect.x >> 0, y = rect.y >> 0, w = rect.width >> 0, h = rect.height >> 0;
			var img = s._context.getImageData(s.x + rect.x, s.y + rect.y, rect.width, rect.height);
			var data = img.data;
			for (var i = 0, l = data.length; i < l; i += 4) {
				var r = i, g = i + 1, b = i + 2, a = i + 3;
				data[r] = data[r] * colorTransform.redMultiplier + colorTransform.redOffset;
				data[g] = data[g] * colorTransform.greenMultiplier + colorTransform.greenOffset;
				data[b] = data[b] * colorTransform.blueMultiplier + colorTransform.blueOffset;
				data[a] = data[a] * colorTransform.alphaMultiplier + colorTransform.alphaOffset;
			}
			s._context.putImageData(img, s.x + rect.x, s.y + rect.y, 0, 0, rect.width, rect.height);
		},
		copyPixels : function(sourceBitmapData, sourceRect, destPoint) {
			var s = this, left, top, width, height, bd = sourceBitmapData;
			if (s.dataType != LBitmapData.DATA_CANVAS) {
				return;
			}
			left = bd.x;
			top = bd.y;
			width = bd.width;
			height = bd.height;
			bd.setProperties(sourceRect.x + bd.x, sourceRect.y + bd.y, sourceRect.width, sourceRect.height);
			s._context.drawImage(bd.image, bd.x, bd.y, bd.width, bd.height, destPoint.x, destPoint.y, bd.width, bd.height);
			bd.x = left;
			bd.y = top;
			bd.width = width;
			bd.height = height;
		}
	};
	for (var k in p) {
		LBitmapData.prototype[k] = p[k];
	}
	return LBitmapData;
})(); 
var LBitmapFilter = (function () {
	function LBitmapFilter () {
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LBitmapFilter";
	}
	LBitmapFilter.prototype.ll_show = function (displayObject, c) {
		var s = this;
		if(s.cacheMaking){
			return;
		}
		c = c || LGlobal.canvas;
		var d = displayObject, bitmapData;
		if(d.constructor.name == "LBitmap"){
			bitmapData = d.bitmapData;
		}else{
			if(!d._ll_cacheAsBitmap){
				s.cacheMaking = true;
				d.cacheAsBitmap(true);
				s.cacheMaking = false;
			}
			bitmapData = d._ll_cacheAsBitmap.bitmapData;
		}
		if(s.bitmapDataIndex === bitmapData.objectIndex){
			return;
		}
		s.bitmapDataIndex = bitmapData.objectIndex;
		bitmapData.applyFilter(bitmapData, new LRectangle(0,0,bitmapData.width,bitmapData.height), new LPoint(0,0), s, c);
	};
	return LBitmapFilter;
})();
var LDropShadowFilter = (function () {
	function LDropShadowFilter (distance, angle, color, blur) {
		var s = this;
		LExtends(s, LBitmapFilter, []);
		s.type = "LDropShadowFilter";
		s.distance = distance ? distance : 0;
		s.angle = angle ? angle : 0;
		s.shadowColor = color ? color : "#000000";
		s.shadowBlur = blur ? blur : 20;
		s.setShadowOffset();
	}
	var p = {
		setShadowOffset : function () {
			var s = this;
			var a = s.angle * Math.PI / 180;
			s.shadowOffsetX = s.distance * Math.cos(a);
			s.shadowOffsetY = s.distance * Math.sin(a);
		},
		ll_show : function (o, c) {
			var s = this;
			c = c || LGlobal.canvas;
			c.shadowColor = s.shadowColor;
			c.shadowBlur = s.shadowBlur;
			c.shadowOffsetX = s.shadowOffsetX;
			c.shadowOffsetY = s.shadowOffsetY;
		},
		setDistance : function (distance) {
			this.distance = distance;
			this.setShadowOffset();
		},
		setAngle : function (angle) {
			this.angle = angle;
			this.setShadowOffset();
		},
		setColor : function (color) {
			this.shadowColor = color;
		},
		setBlur : function (blur) {
			this.shadowBlur = blur;
		}
	};
	for (var k in p) {
		LDropShadowFilter.prototype[k] = p[k];
	}
	return LDropShadowFilter;
})();
var LColorMatrixFilter = (function () {
	function LColorMatrixFilter (matrix) {
		var s = this;
		LExtends(s, LBitmapFilter, []);
		s.type = "LColorMatrixFilter";
		s.matrix = matrix;
	}
	var p = {
		filter : function(olddata, w, c){
			var s = this;
			c = LGlobal.enableWebGL ? LGlobal._context : (c || LGlobal.canvas);
			var oldpx = olddata.data;
			var newdata = c.createImageData(olddata);
			var newpx = newdata.data;
			var len = newpx.length;
			var a = s.matrix;
			for (var i = 0; i < len; i+=4) {
				newpx[i] = (a[0]  * oldpx[i]) + (a[1]  * oldpx[i+1]) + (a[2]  * oldpx[i+2]) + (a[3]  * oldpx[i+3]) + a[4];
				newpx[i+1] = (a[5]  * oldpx[i]) + (a[6]  * oldpx[i+1]) + (a[7]  * oldpx[i+2]) + (a[8]  * oldpx[i+3]) + a[9];
				newpx[i+2] = (a[10]  * oldpx[i]) + (a[11]  * oldpx[i+1]) + (a[12]  * oldpx[i+2]) + (a[13]  * oldpx[i+3]) + a[14];
				newpx[i+3] = (a[15]  * oldpx[i]) + (a[16]  * oldpx[i+1]) + (a[17]  * oldpx[i+2]) + (a[18]  * oldpx[i+3]) + a[19];
			}
			return newdata;
		}
	};
	for (var k in p) {
		LColorMatrixFilter.prototype[k] = p[k];
	}
	return LColorMatrixFilter;
})();
var LConvolutionFilter = (function () {
	function LConvolutionFilter (matrixX, matrixY, matrix, divisor, bias, preserveAlpha, clamp, color, alpha) {
		var s = this;
		LExtends(s, LBitmapFilter, []);
		s.type = "LConvolutionFilter";
		s.matrixX = matrixX ? matrixX : 0;
		s.matrixY = matrixY ? matrixY : 0;
		s.matrix = matrix;
		if (!divisor) {
			divisor = matrix.reduce(function(a, b) {return a + b;}) || 1;
		}
		s.divisor = divisor;
		s.bias = bias ? bias : 0;
	}
	var p = {
		filter : function(olddata, w, c){
			var s = this;
			c = LGlobal.enableWebGL ? LGlobal._context : (c || LGlobal.canvas);
			var oldpx = olddata.data;
			var newdata = c.createImageData(olddata);
			var newpx = newdata.data;
			var len = newpx.length;
			for (var i = 0; i < len; i++) {
				if ((i + 1) % 4 === 0) {
					newpx[i] = oldpx[i];
					continue;
				}
				res = 0;
				var these = [
					oldpx[i - w * 4 - 4] || oldpx[i],
					oldpx[i - w * 4]     || oldpx[i],
					oldpx[i - w * 4 + 4] || oldpx[i],
					oldpx[i - 4]         || oldpx[i],
					oldpx[i],
					oldpx[i + 4]         || oldpx[i],
					oldpx[i + w * 4 - 4] || oldpx[i],
					oldpx[i + w * 4]     || oldpx[i],
					oldpx[i + w * 4 + 4] || oldpx[i]
				];
				for (var j = 0; j < 9; j++) {
					res += these[j] * s.matrix[j];
				}
				res /= s.divisor;
				if (s.bias) {
					res += s.bias;
				}
				newpx[i] = res;
			}
			return newdata;
		}
	};
	for (var k in p) {
		LConvolutionFilter.prototype[k] = p[k];
	}
	return LConvolutionFilter;
})();
var LAnimation = (function() {
	function LAnimation(layer, data, list) {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LAnimation";
		s.rowIndex = 0;
		s.colIndex = 0;
		s._ll_stepIndex = 0;
		s._ll_stepArray = [];
		s.mode = 1;
		s.isMirror = false;
		if (Array.isArray(data)) {
			s.bitmapList = data;
		} else {
			s.bitmapList = [data];
		}
		s.bitmap = new LBitmap(s.bitmapList[0]);
		s.imageArray = list;
		s.addChild(s.bitmap);
		if (layer != null) {
			layer.addChild(s);
		}
		s.onframe();
		s.colIndex = 0;
	}
	var p = {
		setAction : function(rowIndex, colIndex, mode, isMirror) {
			var s = this, changed = false;
			if (rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length) {
				s.rowIndex = rowIndex;
				changed = true;
			}
			if (colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length) {
				s.colIndex = colIndex;
				changed = true;
			}
			if (mode != null) {
				s.mode = mode;
				changed = true;
			}
			if (isMirror != null) {
				s.isMirror = isMirror;
				if (s.isMirror) {
					s.bitmap.x = s.bitmap.getWidth();
					s.bitmap.scaleX = -1 * Math.abs(s.bitmap.scaleX);
				} else {
					s.bitmap.x = 0;
					s.bitmap.scaleX = Math.abs(s.bitmap.scaleX);
				}
				changed = true;
			}
			if (changed) {
				s._ll_stepIndex = 0;
				s._send_complete = false;
			}
		},
		getAction : function() {
			var s = this;
			return [s.rowIndex, s.colIndex, s.mode, s.isMirror];
		},
		onframe : function() {
			var s = this, arr, sx = 0, stepFrame = null;
			if (s.colIndex >= s.imageArray[s.rowIndex].length) {
				s.colIndex = 0;
			}
			arr = s.imageArray[s.rowIndex][s.colIndex];
			if (s._ll_stepArray[s.rowIndex] && s._ll_stepArray[s.rowIndex][s.colIndex]) {
				stepFrame = s._ll_stepArray[s.rowIndex][s.colIndex];
			} else {
				stepFrame = 0;
			}
			if (s._ll_stepIndex == 0) {
				if ( typeof arr.dataIndex == "number" && Array.isArray(s.bitmapList) && arr.dataIndex < s.bitmapList.length) {
					s.bitmap.bitmapData = s.bitmapList[arr.dataIndex];
				}
				if (arr.script) {
					for(i = 0; i < arr.script.length; i++){
						obj = arr.script[i];
						l = s.ll_labelList[obj.name];
						if(l && l.rowIndex == s.rowIndex && l.colIndex == s.colIndex && l.mode == s.mode && l.isMirror == (s.bitmap.scaleX == -1)){
							obj.func(s, obj.params);
						}
					}
				}
				if ( typeof arr.width != UNDEFINED && typeof arr.height != UNDEFINED) {
					s.bitmap.bitmapData.setProperties(arr.x, arr.y, arr.width, arr.height);
				} else {
					s.bitmap.bitmapData.setCoordinate(arr.x, arr.y);
				}
				if ( typeof arr.sx != UNDEFINED) {
					sx = arr.sx;
				}
				if ( typeof arr.sy != UNDEFINED) {
					s.bitmap.y = arr.sy;
				}
				if ( typeof arr.mirror != UNDEFINED) {
					s.bitmap.rotateCenter = false;
					s.bitmap.scaleX = arr.mirror ? -1 : 1;
				}
				s.bitmap.x = sx + (s.bitmap.scaleX == 1 ? 0 : s.bitmap.getWidth());
			}
			if (s._ll_stepIndex++ < stepFrame) {
				return;
			}
			s._ll_stepIndex = 0;
			s.colIndex += s.mode;
			if (s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0) {
				s.colIndex = s.mode > 0 ? 0 : s.imageArray[s.rowIndex].length - 1;
				if (s.constructor.name == "LAnimationTimeline") {
					s._send_complete = true;
				} else {
					s.dispatchEvent(LEvent.COMPLETE);
				}
			}
		},
		clone : function() {
			var s = this, a = new s.constructor(null, s.bitmapList, s.imageArray.slice(0));
			a.copyProperty(s);
			a.childList.length = 0;
			a.bitmap = s.bitmap.clone();
			a.addChild(a.bitmap);
			return a;
		}
	};
	for (var k in p) {
		LAnimation.prototype[k] = p[k];
	}
	return LAnimation;
})();
var LAnimationTimeline = (function() {
	function LAnimationTimeline(data, list) {
		var s = this;
		LExtends(s, LAnimation, [null, data, list]);
		s.type = "LAnimationTimeline";
		s.speed = 0;
		s._speedIndex = 0;
		s.ll_labelList = {};
		for (var i = 0, sublist, j, child; i < list.length; i++) {
			sublist = list[i];
			for ( j = 0; j < sublist.length; j++) {
				child = sublist[j];
				if (child.label) {
					s.setLabel(child.label, i, j, 1, child.isMirror ? true : false);
				}
			}
		}
		s.addEventListener(LEvent.ENTER_FRAME, s._ll_onframe);
	};
	var p = {
		clone : function() {
			var s = this, k, o, a = new s.constructor(s.bitmapList, s.imageArray.slice(0));
			a.copyProperty(s);
			a.childList.length = 0;
			a.bitmap = s.bitmap.clone();
			a.addChild(a.bitmap);
			for (k in s.ll_labelList) {
				o = s.ll_labelList[k];
				a.ll_labelList[k] = {
					rowIndex : o.rowIndex,
					colIndex : o.colIndex,
					mode : o.mode,
					isMirror : o.isMirror
				};
			}
			return a;
		},
		setFrameSpeedAt : function(rowIndex, colIndex, speed) {
			var s = this;
			if (!s._ll_stepArray[rowIndex]) {
				s._ll_stepArray[rowIndex] = [];
			}
			s._ll_stepArray[rowIndex][colIndex] = speed;
		},
		_ll_onframe : function(event) {
			var self = event.target;
			if (self._ll_stop) {
				return;
			}
			if (self._speedIndex++ < self.speed) {
				return;
			}
			if(self._send_complete){
				self.dispatchEvent(LEvent.COMPLETE);
				self._send_complete = false;
				if (self._ll_stop) {
					return;
				}
			}
			self._speedIndex = 0;
			self.onframe();
		},
		setLabel : function(name, _rowIndex, _colIndex, _mode, _isMirror) {
			this.ll_labelList[name] = {
				rowIndex : _rowIndex,
				colIndex : _colIndex,
				mode : (typeof _mode == UNDEFINED ? 1 : _mode),
				isMirror : (typeof _isMirror == UNDEFINED ? false : _isMirror)
			};
		},
		play : function() {
			this._ll_stop = false;
		},
		stop : function() {
			this._ll_stop = true;
		},
		gotoAndPlay : function(name) {
			var s = this, l = s.ll_labelList[name];
			s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
			s.play();
			s.onframe();
		},
		gotoAndStop : function(name) {
			var s = this, l = s.ll_labelList[name];
			s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
			s.stop();
			s.onframe();
		},
		addFrameScript : function(name, func, params) {
			var l = this.ll_labelList[name];
			var arr = this.imageArray[l.rowIndex][l.colIndex];
			if (!arr.script) {
				arr.script = [];
			}
			arr.script.push({func : func, params : params, name : name});
		},
		removeFrameScript : function(name) {
			var l = this.ll_labelList[name], obj, script, i;
			script = this.imageArray[l.rowIndex][l.colIndex].script;
			if (!script) {
				return;
			}
			for(i = 0; i < script.length; i++){
				obj = script[i];
				if(obj.name == name){
					script.splice(i, 1);
					break;
				}
			}
		}
	};
	for (var k in p) {
		LAnimationTimeline.prototype[k] = p[k];
	}
	return LAnimationTimeline;
})(); 
var LLoadManage = (function () {
	function LLoadManage(){
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.llname="ll.file.";
		s.llload="ll.load.";
	}
	p = {
		load : function (l, u, c) {
			var s = this;
			if (!l || l.length == 0) {
				var event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = {};
				s.dispatchEvent(event);
				return;
			}
			s.list = l, s.onupdate = u, s.oncomplete = c;
			s.loader = s, s.index = 0, s.loadIndex = 0, s.result = [], s.lresult = [];
			s.loadInit();
		},
		loadInit : function () {
			var s = this;
			if(s.index >= s.list.length){
				return;
			}
			s.loadIndex = 0;
			s.loadStart();
			s.reloadtime = setTimeout(s.loadInit.bind(s), 10000);
		},
		loadStart : function () {
			var s = this, d, ph, phs, ext;
			if (s.loadIndex >= s.list.length) {
				return;
			}
			d = s.list[s.loadIndex];
			if(typeof d.progress == UNDEFINED){
				d.progress = 0;
			}
			if (!d.name) {
				d.name = s.llname + s.loadIndex;
			}
			if (!s.lresult[s.llload + d.name]) {
				if (!d["type"]) {
					ext = getExtension(d.path);
					if (ext == "txt") {
						d["type"] = LURLLoader.TYPE_TEXT;
					} else if (ext == "js") {
						d["type"] = LURLLoader.TYPE_JS;
					} else if ((new Array("mp3", "ogg", "wav", "m4a")).indexOf(ext) >= 0) {
						d["type"] = LSound.TYPE_SOUND;
					}
				}
				if (d["type"] == LURLLoader.TYPE_TEXT || d["type"] == LURLLoader.TYPE_JS) {
					s.loader = new LURLLoader();
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(s.url(d.path), d["type"]);
				} else if (d["type"] == LSound.TYPE_SOUND) {
					s.loader = new LSound();
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(d.path);
				} else if (d["type"] == LFontLoader.TYPE_FONT) {
					s.loader = new LFontLoader();
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(d.path, d.name);
				} else {
					s.loader = new LLoader();
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(s.url(d.path), LLoader.TYPE_BITMAPDATE, d.useXHR);
				}
				s.loader._loadIndex = s.loadIndex;
			}
			s.loadIndex++;
			s.loadStart();
		},
		_loadProgress : function (e) {
			var loader = e.currentTarget;
			var s = loader.parent;
			d = s.list[loader._loadIndex];
			d.progress = e.loaded / e.total;
			var progress = 0;
			for(var i = 0, l=s.list.length;i<l;i++){
				progress += s.list[i].progress;
			}
			var event = new LEvent(LEvent.PROGRESS);
			event.currentTarget = s;
			event.target = e.currentTarget;
			event.loaded = progress;
			event.total = s.list.length;
			event.responseURL = e.responseURL;
			s.dispatchEvent(event);
		},
		_loadError : function (e) {
			var loader = e.currentTarget;
			var s = loader.parent;
			delete loader.parent;
			loader.removeEventListener(LEvent.ERROR, s._loadError);
			var event = new LEvent(LEvent.ERROR);
			event.currentTarget = s;
			event.target = e.target;
			event.responseURL = e.responseURL;
			s.dispatchEvent(event);
		},
		_loadComplete : function (e) {
			var s = e.currentTarget.parent;
			if(!s){
				return;
			}
			if (e  && e.currentTarget.name) {
				e.currentTarget.removeEventListener(LEvent.COMPLETE, s._loadComplete);
				if (e.currentTarget.name.indexOf(s.llname) >= 0) {
					e.target = 1;
				}
				if (s.lresult[s.llload + e.currentTarget.name]) {
					return;
				}
				s.result[e.currentTarget.name] = e.target;
				s.lresult[s.llload + e.currentTarget.name] = 1;
			}
			s.index++;
			e.loaded = e.total = 1;
			s._loadProgress(e);
			delete e.currentTarget.parent;
			if (s.index >= s.list.length) {
				if (s.reloadtime) {
					clearTimeout(s.reloadtime);
				}
				var event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = s.result;
				s.dispatchEvent(event);
				LGlobal.forceRefresh = true;
			}
		},
		url : function (u) {
			if (!LGlobal.traceDebug) {
				return u;
			}
			return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + (new Date()).getTime();
		}
	};
	for (var k in p) {
		LLoadManage.prototype[k] = p[k];
	}
	LLoadManage.load = function(l, u, c, e){
		var loadObj = new LLoadManage();
		if(u){
			loadObj.addEventListener(LEvent.PROGRESS, function(event){
				u((event.loaded * 100 / event.total).toFixed(2));
			});
		}
		if(c){
			loadObj.addEventListener(LEvent.COMPLETE, function(event){
				c(event.target);
			});
		}
		if(e){
			loadObj.addEventListener(LEvent.ERROR, e);
		}
		loadObj.load(l);
	};
	return LLoadManage;
})();
var LEasing = {
	None : {
		easeIn : function (t, b, c, d) {
			return b + t * c / d;
		},
		easeOut : function (t, b, c, d) {
			return b + t * c / d;
		},
		easeInOut : function (t, b, c, d) {
			return b + t * c / d;
		}
	},
	Quad : {
		easeIn : function (t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOut : function (t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOut : function (t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t + b;
			}
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		}
	},
	Cubic : {
		easeIn : function (t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOut : function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOut : function (t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t + b;
			}
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		}
	},
	Quart : {
		easeIn : function (t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOut : function (t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOut : function (t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t * t + b;
			}
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		}
	},
	Quint : {
		easeIn : function (t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOut : function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOut : function (t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t * t * t + b;
			}
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		}
	},
	Sine : {
		easeIn : function (t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOut : function (t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOut : function (t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		}
	},
	Strong : {
		easeIn : function (t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOut : function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOut : function (t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t * t * t + b;
			}
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		}
	},
	Expo : {
		easeIn : function (t, b, c, d) {
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOut : function (t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOut : function (t, b, c, d) {
			if (t == 0) {
				return b;
			}
			if (t == d) {
				return b + c;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			}
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ : {
		easeIn : function (t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOut : function (t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOut : function (t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			}
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		}
	},
	Elastic : {
		easeIn : function (t, b, c, d, a, p) {
			var s;
			if (t == 0) {
				return b;
			}
			if ((t /= d) == 1) {
				return b + c;
			}
			if (!p) {
				p = d * .3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOut : function (t, b, c, d, a, p) {
			var s;
			if (t == 0) {
				return b;
			}
			if ((t /= d) == 1) {
				return b + c;
			}
			if (!p) {
				p = d * .3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		},
		easeInOut : function (t, b, c, d, a, p) {
			var s;
			if (t == 0) {
				return b;
			}
			if ((t /= d / 2) == 2) {
				return b + c;
			}
			if (!p) {
				p = d * (.3 * 1.5);
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			if (t < 1) {
				return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			}
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		}
	},
	Back : {
		easeIn : function (t, b, c, d, s) {
			if (typeof s == UNDEFINED) {
				s = 1.70158;
			}
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOut : function (t, b, c, d, s) {
			if (typeof s == UNDEFINED) {
				s = 1.70158;
			}
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOut : function (t, b, c, d, s) {
			if (typeof s == UNDEFINED) {
				s = 1.70158;
			} 
			if ((t /= d / 2) < 1) {
				return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			}
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		}
	},
	Bounce : {
		easeIn : function (t, b, c, d) {
			return c - LEasing.Bounce.easeOut(d - t, 0, c, d) + b;
		},
		easeOut : function (t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOut : function (t, b, c, d) {
			if (t < d / 2) {
				return LEasing.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
			}
			return LEasing.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	}
};
var Quad = LEasing.Quad,
Cubic = LEasing.Cubic,
Quart = LEasing.Quart,
Quint = LEasing.Quint,
Sine = LEasing.Sine,
Strong = LEasing.Strong,
Expo = LEasing.Expo,
Circ = LEasing.Circ,
Elastic = LEasing.Elastic,
Back = LEasing.Back,
Bounce = LEasing.Bounce;
var LTweenLiteTimeline;
var LTweenLite = (function () {
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
			if(!s.target.objectIndex){
				s.target.objectIndex = ++LGlobal.objectIndex;
			}
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
			if (typeof s.vars.onComplete == "function") {
				s.onComplete = s.vars.onComplete;
				delete s.vars.onComplete;
			}else{
				s.onComplete = null;
			}
			if (typeof s.vars.onUpdate == "function") {
				s.onUpdate = s.vars.onUpdate;
				delete s.vars.onUpdate;
			}else{
				s.onUpdate = null;
			}
			if (typeof s.vars.onStart == "function") {
				s.onStart = s.vars.onStart;
				delete s.vars.onStart;
			}else{
				s.onStart = null;
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
		pause : function () {
			this.stop = true;
		},
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
					s._dispatchEvent(s.onComplete, true);
				}
				return true;
			} else if (s.onUpdate) {
				s._dispatchEvent(s.onUpdate);
			}
			return false;
		},
		_dispatchEvent : function (f, wait) {
			var s = this;
			var target = s.target;
			var fun = function(){
				target.target = target;
				target.currentTarget = s;
				f(target);
				delete target.currentTarget;
				delete target.target;
			};
			if(wait){
				setTimeout(function(){
					fun();
				}, 1);
			}else{
				fun();
			}
		},
		to : function ($target, $duration, $vars, $data) {
			var s = this;
			s.toNew.push({target : $target, duration : $duration, vars : $vars, data : $data});
			return s;
		},
		keep : function () {
			var s = this, t, vs, k, d;
			if (s.toNew.length > 0) {
				t = s.toNew.shift();
				if (t.vars.loop) {
					s.loop = true;
				}
				if (s.loop) {
					d = {};
					vs = {};
					for (k in t.vars) {
						vs[k] = t.vars[k];
						if(typeof t.target[k] == UNDEFINED || t.vars.playStyle != LTweenLite.PlayStyle.Init){
							continue;
						}
						if(t.data){
							t.target[k] = t.data[k];
							continue;
						}
						d[k] = t.target[k];
					}
					if(!t.data){
						t.data = d;
					}
					s.to(t.target, t.duration, vs, t.data);
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
	function LTweenLite () {
		var s = this;
		LExtends (s, LObject, []);
		s.type = "LTweenLite";
		s.tweens = [];
	}
	LTweenLite.PlayStyle = {
		None : "none",
		Init : "init"
	};
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
		removeTarget : function (target) {
			var s = this;
			for (var i = 0, l = s.tweens.length; i < l; i++) {
				if (target.objectIndex == s.tweens[i].target.objectIndex) {
					s.tweens.splice(i, 1);
					break;
				}
			}
		},
		removeAll : function () {
			this.tweens.splice(0, this.tweens.length);
		},
		pauseAll : function () {
			for(var i = 0, l = this.tweens.length; i < l; i++){
				this.tweens[i].pause();
			}
		},
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
	tween.PlayStyle = LTweenLite.PlayStyle;
	LGlobal.childList.push(tween);
	return tween;
})();
var LAjax = (function () {
	function LAjax () {
		this.responseType = null;
		window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
		this.canUseBlob = window.Blob || window.BlobBuilder;
		var protocol = location.protocol;
		this.local = !(protocol == "http:" || protocol == "https:");
	}
	LAjax.prototype = {
		TEXT : "text",
		JSON : "json",
		ARRAY_BUFFER : "arraybuffer",
		BLOB : "blob",
		get : function (url, data, oncomplete, onerror) {
			this.getRequest("GET", url, data, oncomplete, onerror);
		},
		post : function (url, data, oncomplete, onerror) {
			this.getRequest("POST", url, data, oncomplete, onerror);
		},
		getRequest : function (t, url, d, oncomplete, err) {
			var s = this, k, data = "", a = "";
			s.err = err;
			var ajax = s.getHttp();
			if (!ajax) {
				return;
			}
			if (d) {
				for (k in d) {
					data += (a + k + "=" + d[k]);
					a = "&";	
				}
			}
			if (t.toLowerCase() == "get" && data.length > 0) {
				url += ((url.indexOf('?') >= 0 ? '&' : '?') + data);
				data = null;
			}
			ajax.onerror = function(e){
				if(err){
					err(e);
					err = null;
				}
			};
			var progress = s.progress;
			s.progress = null;
			ajax.addEventListener("progress", function(e){
				if(e.currentTarget.status == 404){
					if (err) {
						err(e.currentTarget);
						err = null;
					}
				}else if(e.currentTarget.status == 200){
					if(progress){
						progress(e);
					}
				}
			}, false);
			ajax.open(t, url, true);
			if (s.responseType) {
				if(s.responseType == s.JSON){
					try{
						ajax.responseType = s.responseType;
					}catch(e){
						ajax.responseType = s.TEXT;
						ajax._responseType = "json";
					}
				}else{
					ajax.responseType = s.responseType;
				}
				s.responseType = s.TEXT;
			}
			ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			ajax.onreadystatechange = function (e) {
				var request = e.currentTarget;
				if (request.readyState == 4) {
					if (request.status >= 200 && request.status < 300 || request.status === 304) {
						if (oncomplete) {
							if(request._responseType == s.JSON){
								request._responseType = s.TEXT;
								oncomplete(JSON.parse(request.responseText));
							}else if (request.responseType == s.ARRAY_BUFFER || request.responseType == s.BLOB || request.responseType == s.JSON) {
								oncomplete(request.response);
							} else if (request.responseText.length > 0) {
								oncomplete(request.responseText);
							} else {
								oncomplete(null);
							}
						}
					} else {
						if (err) {
							err(request);
							err = null;
						}
					}
		 		}
			};
			ajax.send(data);
		},
		getHttp : function () {
			if (typeof XMLHttpRequest != UNDEFINED) {
				return new XMLHttpRequest();
			}  
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					if (!this.err) {
						this.err(e);
					}
				}
			}
			return false;
		}
	};
	return new LAjax();
})();
var LStageWebView = (function () {
	function LStageWebView () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.display = document.createElement("div");
		s.iframe = document.createElement("iframe");
		s.display.style.position = "absolute";
		s.display.style.marginTop = "0px";
		s.display.style.marginLeft = "0px";
		s.display.style.zIndex = LStageWebView.START_INDEX++;
		if(LGlobal.ios){
			s.display.style.overflow = "auto";
			s.display.style.webkitOverflowScrolling = "touch";
		}
		s.display.appendChild(s.iframe);
		s.idAdded = false;
	}
	LStageWebView.START_INDEX = 11;
	var p = {
		loadURL : function (u) {
			var s = this;
			s.iframe.src = u;
			s.iframe.onload = function () {
				s.dispatchEvent(LEvent.COMPLETE);
			};
		},
		show : function () {
			var s = this;
			if (!s.idAdded) {
				LGlobal.object.appendChild(s.display);
				s.idAdded = true;
			}
			if (s.display.style.display == "none") {
				s.display.style.display = "";
			}
		},
		die : function () {
			LGlobal.object.removeChild(this.display);
			this.idAdded = false;
		},
		hide : function () {
			this.display.style.display = "none";
		},
		setViewPort : function (r) {
			var s = this, sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width, sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
			s.display.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + ((r.y * sy) >>> 0)) + "px";
			s.display.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + ((r.x * sx) >>> 0)) + "px";
			s.iframe.style.width = s.display.style.width = (r.width * sx >>> 0) + "px";
			s.iframe.style.height = s.display.style.height = (r.height * sy >>> 0) + "px";
		}
	};
	for (var k in p) {
		LStageWebView.prototype[k] = p[k];
	}
	return LStageWebView;
})();
var FPS = (function () {
	function FPS(){
		var s = this;
		LExtends(s,LSprite,[]);
		if (!LGlobal.fpsStatus) {
			LGlobal.fpsStatus = {
				a : 0,
				b : 0,
				c : 0,
				d : 0,
				e : 0,
				bitmapData : 0,
				display : 0,
				transform : 0,
				graphics : 0,
				text : 0,
				reset : function () {
					this.a = this.bitmapData;
					this.b = this.display - 1;
					this.c = this.transform - 1;
					this.d = this.graphics - 1;
					this.e = this.text - 5;
					this.bitmapData = 0;
					this.display = 0;
					this.transform = 0;
					this.graphics = 0;
					this.text = 0;
				}
			};
		}
		s.fps = [];
		s.back = new LShape();
		s.back.alpha = 0.5;
		s.addChild(s.back);
		for(var i=0;i<5;i++){
			var f = new LTextField();
			f.color = "#ffffff";
			f.y = i * 20;
			s.addChild(f);
			s.fps.push(f);
		}
		s.fpsCount = 0;
		s.fpsTime = (new Date()).getTime();
		s.addEventListener(LEvent.ENTER_FRAME,s.showFPS);
	}
	FPS.prototype.showFPS = function(e){
		var s = e.currentTarget, t, f;
		s.fpsCount++;
		t = (new Date()).getTime();
		if(t - s.fpsTime < 1000)return;
		s.fps[0].text = "FPS : " + Math.round(s.fpsCount*10000 / (t-s.fpsTime))/10;
		f = LGlobal.fpsStatus;
		s.fps[1].text = "DisplayObject : " + f.c + "/" + f.b; 
		s.fps[2].text = "Draw image : " + f.a; 
		s.fps[3].text = "Draw graphics : " + f.d; 
		s.fps[4].text = "Draw text : " + f.e; 
		s.fpsTime = t;
		s.fpsCount = 0;
		s.back.graphics.clear();
		s.back.graphics.drawRect(0,"#000000",[0,0,s.fps[1].getWidth(),100],true,"#000000");
	};
	FPS.prototype.die = function(){
		var s = this;
		LGlobal.fpsStatus = null;
		s.callParent("die",arguments);
	};
	return FPS;
})();
var LQuadTree = (function() {
	function LQuadTree(rect) {
		var s = this;
		LExtends (s, LObject, []);
		s.q1 = null;
		s.q2 = null;
		s.q3 = null;
		s.q4 = null;
		s.parent = null;
		s.data = [];
		s.rect = rect;
		s.root = s;
	}
	var p = {
		createChildren : function(deep) {
			if (deep == 0) {
				return;
			}
			var s = this;
			var hw = s.rect.width / 2, hh = s.rect.height / 2;
			s.q1 = new LQuadTree(new LRectangle(s.rect.x + hw, s.rect.y, hw, hh));
			s.q2 = new LQuadTree(new LRectangle(s.rect.x + hw, s.rect.y + hh, hw, hh));
			s.q3 = new LQuadTree(new LRectangle(s.rect.x, s.rect.y + hh, hw, hh));
			s.q4 = new LQuadTree(new LRectangle(s.rect.x, s.rect.y, hw, hh));
			s.q1.parent = s.q2.parent = s.q3.parent = s.q4.parent = s;
			s.q1.root = s.q2.root = s.q3.root = s.q4.root = s.root;
			s.q1.createChildren(deep - 1);
			s.q2.createChildren(deep - 1);
			s.q3.createChildren(deep - 1);
			s.q4.createChildren(deep - 1);
		},
		hasChildren : function() {
			var s = this;
			return s.q1 && s.q2 && s.q3 && s.q4;
		},
		clear : function() {
			var s = this;
			if (s.hasChildren()) {
				return s.q1.clear() || s.q2.clear() || s.q3.clear() || s.q4.clear();
			} else {
				s.q1 = null;
				s.q2 = null;
				s.q3 = null;
				s.q4 = null;
				s.parent = null;
				s.data = [];
				return s;
			}
		},
		add : function(v, x, y) {
			var s = this;
			if (!s.isIn(x, y)) {
				return null;
			}
			if (s.hasChildren()) {
				return s.q1.add(v, x, y) || s.q2.add(v, x, y) || s.q3.add(v, x, y) || s.q4.add(v, x, y);
			} else {
				s.data.push(v);
				return s;
			}
		},
		remove : function(v, x, y) {
			var s = this;
			if (!s.isIn(x, y)) {
				return null;
			}
			if (s.hasChildren()) {
				return s.q1.remove(v, x, y) || s.q2.remove(v, x, y) || s.q3.remove(v, x, y) || s.q4.remove(v, x, y);
			} else {
				var index = s.data.indexOf(v);
				if (index != -1) {
					s.data.splice(index, 1);
					return s;
				} else {
					return null;
				}
			}
		},
		isIn : function(x, y) {
			var s = this;
			return ( typeof x == UNDEFINED || (x >= s.rect.x && x < s.rect.right)) && ( typeof y == UNDEFINED || (y >= s.rect.y && y < s.rect.bottom));
		},
		getDataInRect : function(rect) {
			var s = this;
			if (!s.rect.intersects(rect)) {
				return [];
			}
			var r = s.data.concat();
			if (s.hasChildren()) {
				r.push.apply(r, s.q1.getDataInRect(rect));
				r.push.apply(r, s.q2.getDataInRect(rect));
				r.push.apply(r, s.q3.getDataInRect(rect));
				r.push.apply(r, s.q4.getDataInRect(rect));
			}
			return r;
		}
	};
	for (var k in p) {
		LQuadTree.prototype[k] = p[k];
	}
	return LQuadTree;
})();
var LoadingSample1 = (function() {
	function LoadingSample1(step, b, c) {
		base(this, LSprite, []);
		var s = this;
		s.numberList = new Array([1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]);
		s.backgroundColor = b == null ? "#000000" : b;
		s.color = c == null ? "#ffffff" : c;
		s.progress = 0;
		s.step = step == null ? LGlobal.width * 0.5 / 15 : step;
		s.back = new LSprite();
		s.addChild(s.back);
		s.num = new LSprite();
		s.addChild(s.num);
		s.num.mask = new LSprite();
		s.screenX = (LGlobal.width - s.step * 15) / 2;
		s.screenY = (LGlobal.height - s.step * 5) / 2;
		s.num.x = s.screenX;
		s.num.y = s.screenY;
		s.setProgress(s.progress);
	}
	LoadingSample1.prototype.setProgress = function(value) {
		var s = this, c = LGlobal.canvas;
		value = Math.floor(value);
		var num_0 = "", num_1, num_2, i;
		var s_x = s.step;
		if (value >= 100) {
			num_0 = s.getNumber(1);
			num_1 = s.getNumber(0);
			num_2 = s.getNumber(0);
			s_x = s.step * 3;
		} else if (value >= 10) {
			num_1 = s.getNumber(Math.floor(value / 10));
			num_2 = s.getNumber(value % 10);
		} else {
			num_1 = s.getNumber(0);
			num_2 = s.getNumber(value);
		}
		s.back.graphics.clear();
		s.back.graphics.add(function() {
			c.beginPath();
			c.fillStyle = s.backgroundColor;
			c.fillRect(0, 0, LGlobal.width, LGlobal.height);
			c.closePath();
			c.fillStyle = s.color;
			if (value >= 100) {
				for ( i = 0; i < num_0.length; i++) {
					if (num_0[i] == 0) {
						continue;
					}
					c.fillRect(s.screenX + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
				}
			}
			for ( i = 0; i < num_1.length; i++) {
				if (num_1[i] == 0) {
					continue;
				}
				c.fillRect(s.screenX + s_x + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
			for ( i = 0; i < num_2.length; i++) {
				if (num_2[i] == 0) {
					continue;
				}
				c.fillRect(s.screenX + s_x + Math.floor(i % 3) * s.step + s.step * 4, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
			c.moveTo(s.screenX + s_x + s.step * 9.7, s.screenY);
			c.lineTo(s.screenX + s_x + s.step * 10.5, s.screenY);
			c.lineTo(s.screenX + s_x + s.step * 9.3, s.screenY + s.step * 5);
			c.lineTo(s.screenX + s_x + s.step * 8.5, s.screenY + s.step * 5);
			c.lineTo(s.screenX + s_x + s.step * 9.7, s.screenY);
			c.fill();
			c.moveTo(s.screenX + s_x + s.step * 8.5, s.screenY + s.step);
			c.arc(s.screenX + s_x + s.step * 8.5, s.screenY + s.step, s.step * 0.6, 0, 360 + Math.PI / 180);
			c.moveTo(s.screenX + s_x + s.step * 10.5, s.screenY + s.step * 4);
			c.arc(s.screenX + s_x + s.step * 10.5, s.screenY + s.step * 4, s.step * 0.6, 0, 360 + Math.PI / 180);
			c.fill();
		});
		s.num.mask.graphics.clear();
		s.num.mask.graphics.add(function() {
			if (value >= 100) {
				for ( i = 0; i < num_0.length; i++) {
					if (num_0[i] == 0) {
						continue;
					}
					c.rect(s.screenX + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
				}
			}
			for (var i = 0; i < num_1.length; i++) {
				if (num_1[i] == 0) {
					continue;
				}
				c.rect(s.screenX + s_x + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
			for (var i = 0; i < num_2.length; i++) {
				if (num_2[i] == 0) {
					continue;
				}
				c.rect(s.screenX + s_x + Math.floor(i % 3) * s.step + s.step * 4, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
		});
		c.fillStyle = LGlobal._create_loading_color();
		s.num.graphics.clear();
		s.num.graphics.drawRect(1, c.fillStyle, [0, s.step * 5 * (100 - value) * 0.01, LGlobal.width, LGlobal.height], true, c.fillStyle);
	};
	LoadingSample1.prototype.getNumber = function(value) {
		return this.numberList[value];
	};
	return LoadingSample1;
})();
function LoadingSample2(size,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas,t = "Loading...",l;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.size = size==null?LGlobal.height*0.2:size;
	l = new LTextField();
	l.text = t;
	l.size = s.size;
	l.color = "#ffffff";
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2;
	s.addChild(l);
	s.backLabel = l;
	l = new LTextField();
	l.text = "***%";
	l.size = s.size*0.3;
	l.color = color;
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2 - s.size*0.4;
	s.addChild(l);
	s.progressLabel = l;
	l = new LTextField();
	l.text = t;
	l.size = s.size;
	l.color = s.color;
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2;
	l.mask = new LGraphics();
	s.screenX = l.x;
	s.screenY = l.y;
	s.screenWidth = l.getWidth();
	s.addChild(l);
	s.showLabel=l;
	c.shadowOffsetX = 2;  
	c.shadowOffsetY = 2;
	c.shadowColor = "blue"; 
	s.setProgress(s.progress);
}
LoadingSample2.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	s.progressLabel.text = value + "%";
	s.showLabel.mask.clear();
	s.showLabel.mask.drawRect(0,"#000000",[s.screenX,0,s.screenWidth*value*0.01,LGlobal.height]);
	if(value >= 100){
		c.shadowOffsetX = 0;
		c.shadowOffsetY = 0;
	}
};
function LoadingSample3(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.screenWidth = LGlobal.width*0.75;
	s.screenHeight = height==null?LGlobal.height*0.1:height;
	if(s.screenHeight > 5)s.screenHeight=5;
	s.screenX = (LGlobal.width - s.screenWidth)/2;
	s.screenY = (LGlobal.height - s.screenHeight)/2;
	s.back = new LSprite();
	s.addChild(s.back);
	s.label = new LTextField();
	s.label.color="#ffffff";
	s.label.weight="bolder";
	s.label.size = s.screenHeight * 2;
	s.label.x = s.screenX + (s.screenWidth - s.label.getWidth())*0.5;
	s.label.y = s.screenY - s.screenHeight * 4;
	s.addChild(s.label);
	s.star = new Array();
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample3.prototype.onframe = function(s){
	var i,star,l;
	if(s.progress>=100){
		if(s.star.length > 0){
			for(i=0,l=s.star.length;i<l;i++){
				s.removeChild(s.star[i]);
			}
			s.star.length = 0;
		}
		return;
	}
	for(i=0,l=s.star.length;i<l;i++){
		star = s.star[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			s.star.splice(i,1);
			s.removeChild(star);
			i--,l--;
		}
	}
	if(s.star.length < 10)s.addStar();
};
LoadingSample3.prototype.addStar = function(){
	var s = this,c = LGlobal.canvas;
	var star = new LSprite();
	var step = 1 + Math.floor(Math.random()*4);
	star.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#ffffff";
		c.lineTo(step*2,step);
		c.lineTo(step*4,0);
		c.lineTo(step*3,step*2);
		c.lineTo(step*4,step*4);
		c.lineTo(step*2,step*3);
		c.lineTo(0,step*4);
		c.lineTo(step,step*2);
		c.lineTo(0,0);
		c.fill();
	});
	star.x = s.screenX + s.screenWidth*s.progress*0.01;
	star.y=s.screenY;
	star.speedx = 4 - 8*Math.random();
	star.speedy = 4 - 8*Math.random();
	s.star.push(star);
	s.addChild(star);
};
LoadingSample3.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	if(value > 100)value=100;
	s.progress = value;
	s.back.graphics.clear();
	s.back.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#00FFFF";
		c.rect(s.screenX - 3, s.screenY - 3, s.screenWidth + 6, s.screenHeight + 6);
		c.fill();
		c.beginPath();
		c.fillStyle = "#990033";
		c.rect(s.screenX, s.screenY, s.screenWidth, s.screenHeight);
		c.fill();
		c.beginPath();
		c.fillStyle = s.color;
		c.rect(s.screenX, s.screenY, s.screenWidth*value*0.01, s.screenHeight);
		c.fill();
	});
	s.label.text = value + "%";
};
function LoadingSample4(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = "#FFFFFF";
	s.arc = new LSprite();
	s.arc.x = LGlobal.width*0.5;
	s.arc.y = LGlobal.height*0.5;
	s.addChild(s.arc);
	for(var i=0;i<360;i++){
		s.arc.graphics.drawArc(1+i/36,color,[0,0,50,(2*Math.PI/360)*i,(2*Math.PI/360)*(i+2)]);
	}
	s.progress = 0;
	s.label = new LTextField();
	s.label.color=color;
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.x = LGlobal.width*0.5;
	s.label.y = LGlobal.height*0.5-s.label.getHeight()*0.5;
	s.addChild(s.label);
	var shadow = new LDropShadowFilter(0,0,"#FFFFFF",30);
	s.arc.filters = [shadow];
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample4.prototype.onframe = function(event){
	event.target.arc.rotate += 20;
};
LoadingSample4.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.label.text = value + "%";
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};
function LoadingSample5(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = "#FFFFFF";
	s.arc = new LSprite();
	s.arc.x = LGlobal.width*0.5;
	s.arc.y = LGlobal.height*0.5;
	s.addChild(s.arc);
	var r = 50;
	for(var i=0;i<360;i+=30){
		var child = new LSprite();
		child.graphics.drawArc(0,color,[r,0,7,0,2*Math.PI],true,color);
		child.rotate = i;
		child.alpha = 0.1+i/360;
		s.arc.addChild(child);
	}
	s.index = 0;
	s.max = 3;
	s.progress = 0;
	s.label = new LTextField();
	s.label.color="#FFFFFF";
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.x = LGlobal.width*0.5;
	s.label.y = LGlobal.height*0.5-s.label.getHeight()*0.5;
	s.addChild(s.label);
	var shadow = new LDropShadowFilter(0,0,"#FFFFFF",30);
	s.arc.filters = [shadow];
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample5.prototype.onframe = function(event){
	var s = event.target;
	if(s.index++ < s.max)return;
	s.index = 0;
	s.arc.rotate += 30;
};
LoadingSample5.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.label.text = value + "%";
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};
function LoadingSample6(r,color,filterColor){
	var self = this;
	base(self,LSprite,[]);
	self.progress = 0;
	self.step = 0;
	self.holeR = r || 10;
	self.holeAmount = 5;
	self.holesx = 20;
	self.loadingBarWidth = self.holeR*2*self.holeAmount+self.holesx*(self.holeAmount-1);
	self.loadingBarHeight = self.holeR*2;
	self.progressColor = color || "#2187e7";
	self.filterColor = filterColor || "#00c6ff";
	self.backLayer = new LSprite();
	self.backLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"#161616");
	self.addChild(self.backLayer);
	self.holeLayer = new LSprite();
	self.holeLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.holeLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.holeLayer);
	self.progressLayer = new LSprite();
	self.progressLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.progressLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.progressLayer);
	self._addHole();
}
LoadingSample6.prototype._addHole = function(){
	var self = this;
	var amount=self.holeAmount,sx=self.holeR*2+self.holesx,r=self.holeR;
	for(var i=0; i<amount; i++){
		var holeObj = new LSprite();
		holeObj.x = i*sx;
		holeObj.graphics.drawArc(1,"#111",[0,0,r,0,2*Math.PI],true,"#000");
		holeObj.graphics.drawArc(1,"#333",[0,0,r,1.7*Math.PI,0.7*Math.PI],false);
		self.holeLayer.addChild(holeObj);
	}
};
LoadingSample6.prototype.setProgress = function(value){
	var self = this;
	var sx=self.holeR*2+self.holesx,r=self.holeR;
	self.progress = value/100;
	var tweenList = new Array();
	while(Math.floor(self.progress/0.2) > self.step){
		var cw = r*2;
		var ch = cw;
		var grd = LGlobal.canvas.createLinearGradient(0,-ch*2,0,ch);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,self.progressColor);
		var po = new LSprite();
		po.x = self.step*sx;
		po.scaleX = 0;
		po.scaleY = 0;
		po.graphics.drawArc(0,"",[0,0,r,0,2*Math.PI],true,grd);
		self.progressLayer.addChild(po);
		tweenList.push(po);
		self.step ++;
	}
	var completeFunc = function(o){
		var circleObj = new LSprite();
		circleObj.alpha = 0.9;
		circleObj.x = o.x;
		circleObj.graphics.drawArc(1,self.filterColor,[0,0,r,0,2*Math.PI],false);
		self.progressLayer.addChild(circleObj);
		var shadow = new LDropShadowFilter(0,5,self.filterColor,10);
		circleObj.filters = [shadow];
		LTweenLite.to(circleObj,0.5,{
			scaleX: 1.7,
			scaleY: 1.7,
			alpha: 0,
			onComplete:function(s){
				s.parent.removeChild(s);
			}
		});
	};
	for(var i=0; i<tweenList.length; i++){
		var o = tweenList[i];
		LTweenLite.to(o,1,{
			scaleX: 1,
			scaleY: 1,
			onComplete:completeFunc
		});
	}
};
function LoadingSample7(w,h,color){
	var self = this;
	base(self,LSprite,[]);
	self.progress = 0;
	self.step = 0;
	self.holeW = w || 10;
	self.holeH = h || 30;
	self.holeAmount = 10;
	self.holesx = 8;
	self.loadingBarWidth = self.holeW*self.holeAmount+self.holesx*(self.holeAmount-1);
	self.loadingBarHeight = self.holeH;
	self.progressColor = color || "#2187e7";
	self.backLayer = new LSprite();
	self.backLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"#161616");
	self.addChild(self.backLayer);
	self.holeLayer = new LSprite();
	self.holeLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.holeLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.holeLayer);
	self.progressLayer = new LSprite();
	self.progressLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.progressLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.progressLayer);
	self._addHole();
}
LoadingSample7.prototype._addHole = function(){
	var self = this;
	var amount=self.holeAmount,sx=self.holeW+self.holesx,w=self.holeW,h=self.holeH;
	for(var i=0; i<amount; i++){
		var holeObj = new LSprite();
		holeObj.x = i*sx;
		holeObj.graphics.drawRect(1,"#333",[1,1,self.holeW,self.holeH],false);
		holeObj.graphics.drawRect(1,"#111",[0,0,self.holeW,self.holeH],true,"#000");
		self.holeLayer.addChild(holeObj);
		var grd = LGlobal.canvas.createLinearGradient(0,-h,0,h);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,self.progressColor);
		var progressObj = new LSprite();
		progressObj.alpha = 0;
		progressObj.x = i*sx;
		progressObj.graphics.drawRect(0,"",[0,0,self.holeW,self.holeH],true,grd);
		self.progressLayer.addChild(progressObj);
	}
};
LoadingSample7.prototype.setProgress = function(value){
	var self = this;
	self.progress = value/100;
	if(Math.floor(self.progress/0.1) > self.step){
		var n = Math.ceil(self.progress/0.1);
		if(n > 10)n = 10;
		for(var i=0; i<n; i++){
			var sc = self.progressLayer.childList;
			if(sc[i].alpha > 0)continue;
			var o = self.progressLayer.childList[i];
			LTweenLite.to(o,1,{
				alpha: 1
			});
		}
		self.step ++;
	}
};
var LBox2d = (function() {
	function LBox2d(gravity, doSleep, drawScale) {
		var s = this;
		Box2D.Dynamics.b2World.prototype.LAddController = Box2D.Dynamics.b2World.prototype.AddController;
		Box2D.Dynamics.b2World.prototype.AddController = function(c) {
			var l = {}, k;
			for (k in c) {
				l[k] = c[k];
			}
			if (LBox2d) {
				LBox2d.m_controllerList = l;
			}
			return this.LAddController(c);
		};
		var i, j, b = Box2D, d, a = [b.Collision, b.Common, b.Common.Math, b.Dynamics, b.Dynamics.Contacts, b.Dynamics.Controllers, b.Dynamics.Joints, b.Collision.Shapes];
		for (i in a) {
			for (j in a[i]) {
				s[j] = a[i][j];
			}
		}
		if ( typeof drawScale == UNDEFINED) {
			drawScale = 30;
		}
		s.stop = false;
		s.drawScale = 30;
		s.selectedBody = null;
		s.mouseJoint = null;
		s.mousePVec = null;
		s.contactListener = null;
		if ( typeof gravity == UNDEFINED) {
			gravity = new s.b2Vec2(0, 9.8);
		} else {
			gravity = new s.b2Vec2(gravity[0], gravity[1]);
		}
		if ( typeof doSleep == UNDEFINED) {
			doSleep = true;
		}
		s.world = new s.b2World(gravity, doSleep);
		s.removeList = new Array();
		if (LGlobal.traceDebug) {
			d = new s.b2DebugDraw();
			d.SetSprite(LGlobal.canvas);
			d.SetLineThickness(1);
			d.SetFillAlpha(0.5);
			d.SetAlpha(1);
			d.SetDrawScale(s.drawScale);
			d.SetFlags(s.b2DebugDraw.e_shapeBit | s.b2DebugDraw.e_jointBit);
			s.world.SetDebugDraw(d);
		}
		LGlobal.destroy = true;
	}
	LBox2d.prototype = {
		setEvent : function(t_v, f_v) {
			var s = this;
			if (t_v == LEvent.ENTER_FRAME) {
				s.ll_enterFrame = f_v;
				return;
			}
			if (!s.contactListener) {
				s.contactListener = new s.b2ContactListener();
				s.world.SetContactListener(s.contactListener);
			}
			switch (t_v) {
				case LEvent.END_CONTACT:
					s.contactListener.EndContact = f_v;
					break;
				case LEvent.PRE_SOLVE:
					s.contactListener.PreSolve = f_v;
					break;
				case LEvent.POST_SOLVE:
					s.contactListener.PostSolve = f_v;
					break;
				case LEvent.BEGIN_CONTACT:
				default:
					s.contactListener.BeginContact = f_v;
			}
		},
		setWeldJoint : function(A, B) {
			var s = this;
			var j = new s.b2WeldJointDef();
			j.Initialize(B, A, B.GetWorldCenter());
			return s.world.CreateJoint(j);
		},
		setLineJoint : function(A, B, vec, t, m) {
			var s = this;
			var wa = new s.b2Vec2(vec[0], vec[1]);
			var j = new s.b2LineJointDef();
			j.Initialize(A, B, B.GetWorldCenter(), wa);
			if (t == null) {
				j.enableLimit = false;
			} else {
				j.lowerTranslation = t[0];
				j.upperTranslation = t[1];
				j.enableLimit = true;
			}
			if (m == null) {
				j.enableMotor = false;
			} else {
				j.maxMotorForce = m[0];
				j.motorSpeed = m[1];
				j.enableMotor = true;
			}
			return s.world.CreateJoint(j);
		},
		setGearJoint : function(A, B, ra, r, p) {
			var s = this;
			var j = new s.b2GearJointDef();
			j.joint1 = r;
			j.joint2 = p;
			j.bodyA = A;
			j.bodyB = B;
			j.ratio = ra * s.b2Settings.b2_pi / (300 / s.drawScale);
			return s.world.CreateJoint(j);
		},
		setPrismaticJoint : function(A, B, vec, t, m) {
			var s = this;
			var wa = new s.b2Vec2(vec[0], vec[1]);
			var j = new s.b2PrismaticJointDef();
			j.Initialize(B, A, B.GetWorldCenter(), wa);
			if (t == null) {
				j.enableLimit = false;
			} else {
				j.lowerTranslation = t[0];
				j.upperTranslation = t[1];
				j.enableLimit = true;
			}
			if (m == null) {
				j.enableMotor = false;
			} else {
				j.maxMotorForce = m[0];
				j.motorSpeed = m[1];
				j.enableMotor = true;
			}
			return s.world.CreateJoint(j);
		},
		setRevoluteJoint : function(A, B, a, m) {
			var s = this;
			var j = new s.b2RevoluteJointDef();
			j.Initialize(A, B, B.GetWorldCenter());
			if (a == null) {
				j.enableLimit = false;
			} else {
				j.lowerAngle = a[0] * s.b2Settings.b2_pi / 180;
				j.upperAngle = a[1] * s.b2Settings.b2_pi / 180;
				j.enableLimit = true;
			}
			if (m == null) {
				j.enableMotor = false;
			} else {
				j.maxMotorTorque = m[0];
				j.motorSpeed = m[1];
				j.enableMotor = true;
			}
			return s.world.CreateJoint(j);
		},
		setDistanceJoint : function(A, B) {
			var s = this;
			var j = new s.b2DistanceJointDef();
			j.Initialize(A, B, A.GetWorldCenter(), B.GetWorldCenter());
			return s.world.CreateJoint(j);
		},
		setPulleyJoint : function(A, B, vA, vB, ratio) {
			var s = this;
			var a1 = A.GetWorldCenter();
			var a2 = B.GetWorldCenter();
			var g1 = new s.b2Vec2(a1.x + (vA[0] / s.drawScale), a1.y + (vA[1] / s.drawScale));
			var g2 = new s.b2Vec2(a2.x + (vB[0] / s.drawScale), a2.y + (vB[1] / s.drawScale));
			var j = new s.b2PulleyJointDef();
			j.Initialize(A, B, g1, g2, a1, a2, ratio);
			j.maxLengthA = vA[2] / s.drawScale;
			j.maxLengthB = vB[2] / s.drawScale;
			return s.world.CreateJoint(j);
		},
		addCircle : function(r, cx, cy, t, d, f, e) {
			var s = this;
			s.bodyDef = new s.b2BodyDef;
			s.bodyDef.type = t;
			s.fixDef = new s.b2FixtureDef;
			s.fixDef.density = d;
			s.fixDef.friction = f;
			s.fixDef.restitution = e;
			s.fixDef.shape = new s.b2CircleShape(r);
			s.bodyDef.position.x = cx;
			s.bodyDef.position.y = cy;
			var shape = s.world.CreateBody(s.bodyDef);
			shape.CreateFixture(s.fixDef);
			return shape;
		},
		addPolygon : function(w, h, cx, cy, type, d, f, e) {
			var s = this;
			s.bodyDef = new s.b2BodyDef;
			s.bodyDef.type = type;
			s.fixDef = new s.b2FixtureDef;
			s.fixDef.density = d;
			s.fixDef.friction = f;
			s.fixDef.restitution = e;
			s.fixDef.shape = new s.b2PolygonShape;
			s.fixDef.shape.SetAsBox(w, h);
			s.bodyDef.position.x = cx;
			s.bodyDef.position.y = cy;
			var shape = s.world.CreateBody(s.bodyDef);
			shape.CreateFixture(s.fixDef);
			return shape;
		},
		addVertices : function(vertices, type, d, f, e) {
			var s = this, i, l;
			s.bodyDef = new s.b2BodyDef;
			s.bodyDef.type = type;
			var shape = s.world.CreateBody(s.bodyDef);
			for ( i = 0, l = vertices.length; i < l; i++) {
				s.createShapeAsArray(shape, vertices[i], type, d, f, e);
			}
			return shape;
		},
		createShapeAsArray : function(c, vertices, type, d, f, e) {
			var s = this;
			var shape = new s.b2PolygonShape();
			var sv = s.createVerticesArray(vertices);
			shape.SetAsArray(sv, 0);
			var def = new s.b2FixtureDef();
			def.shape = shape;
			def.density = d;
			def.friction = f;
			def.restitution = e;
			c.CreateFixture(def);
		},
		createVerticesArray : function(a) {
			var s = this, i, l;
			var v = new Array();
			if (a.length < 3) {
				return v;
			}
			for ( i = 0, l = a.length; i < l; i++) {
				v.push(new s.b2Vec2(a[i][0] / s.drawScale, a[i][1] / s.drawScale));
			}
			return v;
		},
		getBodyAtMouse : function(mouseX, mouseY) {
			var s = this;
			s.mousePVec = new s.b2Vec2(mouseX, mouseY);
			var aabb = new s.b2AABB();
			aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
			aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
			s.selectedBody = null;
			s.world.QueryAABB(s.getBodyCallBack, aabb);
			return s.selectedBody;
		},
		getBodyCallBack : function(fixture) {
			var s = LGlobal.box2d;
			if (fixture.GetBody().GetType() != s.b2Body.b2_staticBody) {
				if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), s.mousePVec)) {
					s.selectedBody = fixture.GetBody();
					return false;
				}
			}
			return true;
		},
		ll_show : function() {
			var s = this, k = null;
			for (k in s.removeList) {
				s.world.DestroyBody(s.removeList[k]);
			}
			s.removeList.splice(0, s.removeList.length);
			if (s.stop) {
				return;
			}
			if (s.ll_enterFrame) {
				s.ll_enterFrame({
					target : s
				});
			}
			s.world.Step(1 / 30, 10, 10);
			s.world.ClearForces();
			if (LGlobal.traceDebug) {
				s.world.DrawDebugData();
			}
		},
		synchronous : function() {
			var s = this;
			var parent = null, child, position = null, cx = 0, cy = 0, currentBody, joint;
			for ( currentBody = s.world.GetBodyList(); currentBody; currentBody = currentBody.GetNext()) {
				child = currentBody.GetUserData();
				if (child) {
					if (position == null) {
						parent = child.parent;
						cx = currentBody.GetPosition().x;
						cy = currentBody.GetPosition().y;
					}
					currentBody.SetPosition(new s.b2Vec2((child.x + child.rotatex + parent.x) / s.drawScale, (child.y + child.rotatey + parent.y) / s.drawScale));
					if (position == null) {
						position = {
							x : (currentBody.GetPosition().x - cx),
							y : (currentBody.GetPosition().y - cy)
						};
					}
				}
			}
			for ( joint = s.world.GetJointList(); joint; joint = joint.GetNext()) {
				if (joint.m_groundAnchor1) {
					joint.m_groundAnchor1.x += position.x;
					joint.m_groundAnchor1.y += position.y;
				}
				if (joint.m_groundAnchor2) {
					joint.m_groundAnchor2.x += position.x;
					joint.m_groundAnchor2.y += position.y;
				}
			}
			if (LBox2d.m_controllerList && s.world.m_controllerList && parent) {
				LGlobal.box2d.world.m_controllerList.offset = LBox2d.m_controllerList.offset - parent.y / LGlobal.box2d.drawScale;
			}
		}
	};
	return LBox2d;
})();
LSprite.prototype.setBodyMouseJoint = function(value) {
	var s = this;
	if (!s.box2dBody) {
		return;
	}
	s.box2dBody.mouseJoint = value;
};
LSprite.prototype.clearBody = function(value) {
	var s = this;
	if (!s.box2dBody) {
		return;
	}
	LGlobal.box2d.removeList.push(s.box2dBody);
	s.box2dBody = null;
};
LSprite.prototype.addBodyCircle = function(radius, cx, cy, type, density, friction, restitution) {
	var s = this;
	s.rotatex = radius;
	s.rotatey = radius;
	s.box2dBody = LGlobal.box2d.addCircle(radius / LGlobal.box2d.drawScale, (s.x + cx) / LGlobal.box2d.drawScale, (s.y + cy) / LGlobal.box2d.drawScale, (type == 1) ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density == null ? 0.5 : density, friction == null ? 0.4 : friction, restitution == null ? 0.8 : restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyPolygon = function(w, h, type, density, friction, restitution) {
	var s = this;
	s.rotatex = w / 2;
	s.rotatey = h / 2;
	s.box2dBody = LGlobal.box2d.addPolygon(w * 0.5 / LGlobal.box2d.drawScale, h * 0.5 / LGlobal.box2d.drawScale, s.x / LGlobal.box2d.drawScale, s.y / LGlobal.box2d.drawScale, (type == 1) ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density == null ? 0.5 : density, friction == null ? 0.4 : friction, restitution == null ? 0.8 : restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyVertices = function(vertices, cx, cy, type, density, friction, restitution) {
	var s = this;
	s.rotatex = 0;
	s.rotatey = 0;
	s.box2dBody = LGlobal.box2d.addVertices(vertices, (type == 1) ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density, friction, restitution);
	s.box2dBody.SetUserData(s);
	s.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((s.x + cx) / LGlobal.box2d.drawScale, (s.y + cy) / LGlobal.box2d.drawScale));
};
LGlobal.mouseJoint_start = function(eve) {
	if (!LGlobal.IS_MOUSE_DOWN || !LGlobal.box2d || LGlobal.box2d.mouseJoint || LGlobal.box2d.stop) {
		return;
	}
	var mX = eve.offsetX / LGlobal.box2d.drawScale, mY = eve.offsetY / LGlobal.box2d.drawScale, b = LGlobal.box2d.getBodyAtMouse(mX, mY);
	if (b && b.mouseJoint) {
		var m = new LGlobal.box2d.b2MouseJointDef();
		m.bodyA = LGlobal.box2d.world.GetGroundBody();
		m.bodyB = b;
		m.target.Set(mX, mY);
		m.collideConnected = true;
		m.maxForce = 300000.0 * b.GetMass();
		LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(m);
		b.SetAwake(true);
	};
};
LGlobal.mouseJoint_move = function(eve) {
	if (!LGlobal.IS_MOUSE_DOWN || !LGlobal.box2d || !LGlobal.box2d.mouseJoint) {
		return;
	}
	mX = eve.offsetX / LGlobal.box2d.drawScale, mY = eve.offsetY / LGlobal.box2d.drawScale;
	LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mX, mY));
};
LGlobal.mouseJoint_end = function() {
	if (LGlobal.box2d != null && LGlobal.box2d.mouseJoint) {
		LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
		LGlobal.box2d.mouseJoint = null;
	}
}; 
var LTransition = (function() {
	function LTransition(displayObject, transObj) {
		this.child = displayObject;
		this.trans = transObj;
	}
	LTransition.prototype = {
		startTransition : function() {
			var self = this;
			switch(self.trans.type) {
				case LTransition.Blinds:
					self.blinds();
					break;
				case LTransition.Fade:
					self.fade();
					break;
				case LTransition.Fly:
					self.fly();
					break;
				case LTransition.Iris:
					self.iris();
					break;
				case LTransition.Squeeze:
					self.squeeze();
					break;
				case LTransition.Wipe:
					self.wipe();
					break;
				case LTransition.Zoom:
					self.zoom();
					break;
				case LTransition.PixelDissolve:
					self.pixelDissolve();
					break;
				case LTransition.Curtain:
					self.curtain();
					break;
				default:
					throw ("the type is not exists.");
			}
		},
		blindsComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.blindsUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		blindsUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			if (self.trans.dimension) {
				g.add(function() {
					c.save();
					for (var i = 0; i < self.trans.numStrips; i++) {
						c.rect(i * self.maxSize, 0, self.blindsSize, self.child.getHeight());
					}
					c.restore();
				});
			} else {
				g.add(function() {
					c.save();
					for (var i = 0; i < self.trans.numStrips; i++) {
						c.rect(0, 0 + i * self.maxSize, self.child.getWidth(), self.blindsSize);
					}
					c.restore();
				});
			}
		},
		blindsUpdate : function(self) {
			self.blindsUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		blinds : function() {
			var self = this;
			if (!self.trans.numStrips)
				self.trans.numStrips = 1;
			self.blindsSize = 0;
			if (self.trans.dimension) {
				self.maxSize = self.child.getWidth() / self.trans.numStrips >> 0;
			} else {
				self.maxSize = self.child.getHeight() / self.trans.numStrips >> 0;
			}
			var g = new LGraphics();
			self.child.mask = g;
			var toSize = self.maxSize;
			if (self.trans.direction == LTransition.OUT) {
				self.blindsSize = self.maxSize;
				toSize = 0;
			}
			LTweenLite.to(self, self.trans.duration, {
				blindsSize : toSize,
				onComplete : self.blindsComplete,
				onUpdate : self.blindsUpdate,
				ease : self.trans.easing
			});
		},
		fadeComplete : function(self) {
			self.child.alpha = self.alpha;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		fadeUpdate : function(self) {
			self.child.alpha = self.alpha;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		fade : function() {
			var self = this;
			var toAlpha = 1;
			self.alpha = 0;
			if (self.trans.direction == LTransition.OUT) {
				self.alpha = 1;
				toAlpha = 0;
			}
			self.child.alpha = self.alpha;
			LTweenLite.to(self, self.trans.duration, {
				alpha : toAlpha,
				onComplete : self.fadeComplete,
				onUpdate : self.fadeUpdate,
				ease : self.trans.easing
			});
		},
		flyComplete : function(self) {
			self.child.x = self.x;
			self.child.y = self.y;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		flyUpdate : function(self) {
			self.child.x = self.x;
			self.child.y = self.y;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		fly : function() {
			var self = this;
			var toX = self.child.x;
			var toY = self.child.y;
			switch(self.trans.startPoint) {
				case 1:
					self.x = -self.child.getWidth();
					self.y = -self.child.getHeight();
					break;
				case 2:
					self.x = (LGlobal.width - self.child.getWidth()) * 0.5;
					self.y = -self.child.getHeight();
					break;
				case 3:
					self.x = LGlobal.width;
					self.y = -self.child.getHeight();
					break;
				case 4:
					self.x = -self.child.getWidth();
					self.y = (LGlobal.height - self.child.getHeight()) * 0.5;
					break;
				case 6:
					self.x = LGlobal.width;
					self.y = (LGlobal.height - self.child.getHeight()) * 0.5;
					break;
				case 7:
					self.x = -self.child.getWidth();
					self.y = LGlobal.height;
					break;
				case 8:
					self.x = (LGlobal.width - self.child.getWidth()) * 0.5;
					self.y = LGlobal.height;
					break;
				case 9:
					self.x = LGlobal.width;
					self.y = LGlobal.height;
					break;
				case 5:
				default:
					self.x = (LGlobal.width - self.child.getWidth()) * 0.5;
					self.y = (LGlobal.height - self.child.getHeight()) * 0.5;
			}
			if (self.trans.direction == LTransition.OUT) {
				var toX = self.x;
				var toY = self.y;
				self.x = self.child.x;
				self.y = self.child.y;
			} else {
				self.child.x = self.x;
				self.child.y = self.y;
			}
			LTweenLite.to(self, self.trans.duration, {
				x : toX,
				y : toY,
				onComplete : self.flyComplete,
				onUpdate : self.flyUpdate,
				ease : self.trans.easing
			});
		},
		irisComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.irisUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		irisUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			if (self.trans.shape == LIris.CIRCLE) {
				g.drawArc(0, "#000000", [self.x, self.y, self.r, 0, Math.PI * 2]);
			} else {
				g.drawRect(0, "#000000", [self.x + self.sLeft, self.y + self.sTop, self.width, self.height]);
			}
		},
		irisUpdate : function(self) {
			self.irisUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		iris : function() {
			var self = this;
			self.sLeft = 0;
			self.sTop = 0;
			self.width = 0;
			self.height = 0;
			self.x = 0;
			self.y = 0;
			self.r = 0;
			self.eWidth = self.child.getWidth();
			self.eHeight = self.child.getHeight();
			switch(self.trans.startPoint) {
				case 1:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					break;
				case 2:
					self.eR = Math.sqrt((self.eWidth * 0.5) * (self.eWidth * 0.5) + self.eHeight * self.eHeight);
					self.x = self.child.getWidth() * 0.5;
					break;
				case 3:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					self.x = self.child.getWidth();
					break;
				case 4:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + (self.eHeight * 0.5) * (self.eHeight * 0.5));
					self.y = self.child.getHeight() * 0.5;
					break;
				case 6:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + (self.eHeight * 0.5) * (self.eHeight * 0.5));
					self.x = self.child.getWidth();
					self.y = self.child.getHeight() * 0.5;
					break;
				case 7:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					self.y = self.child.getHeight();
					break;
				case 8:
					self.eR = Math.sqrt((self.eWidth * 0.5) * (self.eWidth * 0.5) + self.eHeight * self.eHeight);
					self.x = self.child.getWidth() * 0.5;
					self.y = self.child.getHeight();
					break;
				case 9:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					self.x = self.child.getWidth();
					self.y = self.child.getHeight();
					break;
				case 5:
				default:
					self.eR = Math.sqrt((self.eWidth * 0.5) * (self.eWidth * 0.5) + (self.eHeight * 0.5) * (self.eHeight * 0.5));
					self.x = self.child.getWidth() * 0.5;
					self.y = self.child.getHeight() * 0.5;
			}
			self.eLeft = -self.x;
			self.eTop = -self.y;
			var g = new LGraphics();
			self.child.mask = g;
			var toSize = self.maxSize;
			if (self.trans.direction == LTransition.OUT) {
				self.sLeft = self.eLeft;
				self.sTop = self.eTop;
				self.eLeft = 0;
				self.eTop = 0;
				self.width = self.eWidth;
				self.height = self.eHeight;
				self.eWidth = 0;
				self.eHeight = 0;
				self.r = self.eR;
				self.eR = 0;
			}
			LTweenLite.to(self, self.trans.duration, {
				width : self.eWidth,
				height : self.eHeight,
				sLeft : self.eLeft,
				sTop : self.eTop,
				r : self.eR,
				onComplete : self.irisComplete,
				onUpdate : self.irisUpdate,
				ease : self.trans.easing
			});
		},
		curtainComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.curtainUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		curtainUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			if (self.trans.dimension) {
				g.add(function() {
					c.beginPath();
					c.save();
					c.rect(0, 0, self.width, self.child.getHeight());
					c.rect(self.child.getWidth() - self.width, 0, self.width, self.child.getHeight());
					c.restore();
				});
			} else {
				g.add(function() {
					c.beginPath();
					c.save();
					c.rect(0, 0, self.child.getWidth(), self.height);
					c.rect(0, self.child.getHeight() - self.height, self.child.getWidth(), self.height);
					c.restore();
				});
			}
		},
		curtainUpdate : function(self) {
			self.curtainUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		curtain : function() {
			var self = this;
			var eW = self.child.getWidth() * 0.5;
			var eH = self.child.getHeight() * 0.5;
			if (self.trans.dimension) {
				eH = 0;
			} else {
				eW = 0;
			}
			self.width = 0;
			self.height = 0;
			var g = new LGraphics();
			self.child.mask = g;
			var toSize = self.maxSize;
			if (self.trans.direction == LTransition.OUT) {
				self.width = eW;
				self.height = eH;
				eW = 0;
				eH = 0;
			}
			LTweenLite.to(self, self.trans.duration, {
				width : eW,
				height : eH,
				onComplete : self.curtainComplete,
				onUpdate : self.curtainUpdate,
				ease : self.trans.easing
			});
		},
		squeezeComplete : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		squeezeUpdate : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		squeeze : function() {
			var self = this;
			var toScaleX = 1, toScaleY = 1;
			self.scaleX = 0, self.scaleY = 0;
			if (self.trans.dimension) {
				self.scaleX = 1;
			} else {
				self.scaleY = 1;
			}
			if (self.trans.direction == LTransition.OUT) {
				toScaleX = self.scaleX, toScaleY = self.scaleY;
				self.scaleX = 1, self.scaleY = 1;
			}
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			LTweenLite.to(self, self.trans.duration, {
				scaleX : toScaleX,
				scaleY : toScaleY,
				onComplete : self.squeezeComplete,
				onUpdate : self.squeezeUpdate,
				ease : self.trans.easing
			});
		},
		zoomComplete : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		zoomUpdate : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		zoom : function() {
			var self = this;
			var toScaleX = 1, toScaleY = 1;
			self.scaleX = 0, self.scaleY = 0;
			if (self.trans.direction == LTransition.OUT) {
				toScaleX = 0, toScaleY = 0;
				self.scaleX = 1, self.scaleY = 1;
			}
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			LTweenLite.to(self, self.trans.duration, {
				scaleX : toScaleX,
				scaleY : toScaleY,
				onComplete : self.zoomComplete,
				onUpdate : self.zoomUpdate,
				ease : self.trans.easing
			});
		},
		wipeComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.wipeUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		wipeUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			g.drawVertices(0, "#000000", [[self.leftTopX, self.leftTopY], [self.leftBottomX, self.leftBottomY], [self.rightBottomX, self.rightBottomY], [self.rightTopX, self.rightTopY]]);
		},
		wipeUpdate : function(self) {
			self.wipeUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		wipe : function() {
			var self = this, w = self.child.getWidth(), h = self.child.getHeight(), ltX = self.leftTopX = 0, ltY = self.leftTopY = 0, lbX = self.leftBottomX = 0, lbY = self.leftBottomY = h, rtX = self.rightTopX = w, rtY = self.rightTopY = 0, rbX = self.rightBottomX = w, rbY = self.rightBottomY = h;
			switch(self.trans.startPoint) {
				case 1:
					ltX = self.leftTopX = -w;
					lbX = self.leftBottomX = -w * 2;
					self.rightTopX = 0;
					rtX = w * 2;
					self.rightBottomX = -w;
					rbX = w;
					break;
				case 2:
					ltY = self.leftTopY = -h;
					self.leftBottomY = 0;
					lbY = h;
					rtY = self.rightTopY = -h;
					self.rightBottomY = 0;
					rbY = h;
					break;
				case 3:
					self.leftTopX = w;
					ltX = -w;
					self.leftBottomX = w * 2;
					lbX = 0;
					rtX = self.rightTopX = w * 2;
					rbX = self.rightBottomX = w * 3;
					break;
				case 4:
					self.rightTopX = 0;
					rtX = w;
					self.rightBottomX = 0;
					rbX = w;
					break;
				case 6:
					self.leftTopX = w;
					ltX = 0;
					self.leftBottomX = w;
					lbX = 0;
					break;
				case 7:
					lbX = self.leftBottomX = -w;
					ltX = self.leftTopX = -w * 2;
					self.rightBottomX = 0;
					rbX = w * 2;
					self.rightTopX = -w;
					rtX = w;
					break;
				case 8:
					lbY = self.leftBottomY = h;
					self.leftTopY = h;
					ltY = 0;
					rbY = self.rightBottomY = h;
					self.rightTopY = h;
					rtY = 0;
					break;
				case 9:
					self.leftBottomX = w;
					lbX = -w;
					self.leftTopX = w * 2;
					ltX = 0;
					rbX = self.rightBottomX = w * 2;
					rtX = self.rightTopX = w * 3;
					break;
				case 5:
				default:
					self.leftTopX = w * 0.5;
					self.leftTopY = h * 0.5;
					self.rightTopX = w * 0.5;
					self.rightTopY = h * 0.5;
					self.leftBottomX = w * 0.5;
					self.leftBottomY = h * 0.5;
					self.rightBottomX = w * 0.5;
					self.rightBottomY = h * 0.5;
					ltX = 0, ltY = 0;
					lbX = 0, lbY = h;
					rtX = w, rtY = 0;
					rbX = w, rbY = h;
			}
			var g = new LGraphics();
			self.child.mask = g;
			if (self.trans.direction == LTransition.OUT) {
				var oltX = ltX, oltY = ltY, olbX = lbX, olbY = lbY, ortX = rtX, ortY = rtY, orbX = rbX, orbY = rbY;
				ltX = self.leftTopX, ltY = self.leftTopY, lbX = self.leftBottomX, lbY = self.leftBottomY, rtX = self.rightTopX, rtY = self.rightTopY, rbX = self.rightBottomX, rbY = self.rightBottomY;
				self.leftTopX = oltX, self.leftTopY = oltY, self.leftBottomX = olbX, self.leftBottomY = olbY, self.rightTopX = ortX, self.rightTopY = ortY, self.rightBottomX = orbX, self.rightBottomY = orbY;
			}
			LTweenLite.to(self, self.trans.duration, {
				leftTopX : ltX,
				leftTopY : ltY,
				leftBottomX : lbX,
				leftBottomY : lbY,
				rightTopX : rtX,
				rightTopY : rtY,
				rightBottomX : rbX,
				rightBottomY : rbY,
				onComplete : self.wipeComplete,
				onUpdate : self.wipeUpdate,
				ease : self.trans.easing
			});
		},
		pixelDissolveComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.pixelDissolveUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		pixelDissolveUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas, list;
			g.clear();
			g.add(function() {
				c.beginPath();
				c.save();
				for (var i = 0; i < self.index; i++) {
					list = self.list[i];
					c.rect(list[0] * self.w, list[1] * self.h, self.w, self.h);
				}
				c.restore();
			});
		},
		pixelDissolveUpdate : function(self) {
			self.pixelDissolveUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		pixelDissolve : function() {
			var self = this;
			var g = new LGraphics();
			self.child.mask = g;
			LGlobal.mg = g;
			self.w = self.child.getWidth() / self.trans.xSections, self.h = self.child.getHeight() / self.trans.ySections;
			self.list = [];
			for (var i = 0; i < self.trans.xSections; i++) {
				for (var j = 0; j < self.trans.ySections; j++) {
					self.list.push([i, j]);
				}
			}
			self.index = 0;
			var to = self.trans.xSections * self.trans.ySections;
			if (self.trans.direction == LTransition.OUT) {
				self.index = to;
				to = 0;
			}
			self.list = self.list.sort(function(a, b) {
				return Math.random() > 0.5;
			});
			self.pixelDissolveUpdateRun();
			LTweenLite.to(self, self.trans.duration, {
				index : to,
				onComplete : self.pixelDissolveComplete,
				onUpdate : self.pixelDissolveUpdate,
				ease : self.trans.easing
			});
		}
	};
	LTransition.IN = "in";
	LTransition.OUT = "out";
	LTransition.Blinds = 1;
	LTransition.Fade = 2;
	LTransition.Fly = 3;
	LTransition.Iris = 4;
	LTransition.Curtain = 5;
	LTransition.PixelDissolve = 6;
	LTransition.Squeeze = 7;
	LTransition.Wipe = 8;
	LTransition.Zoom = 9;
	return LTransition;
})();
var LIris = (function() {
	function LIris() {
	}
	LIris.SQUARE = 0;
	LIris.CIRCLE = 1;
	return LIris;
})();
var LTransitionManager = (function() {
	function LTransitionManager(displayObject) {
		this.child = displayObject;
	}
	LTransitionManager.prototype = {
		startTransition : function(transParams) {
			return LTransitionManager.start(this.child, transParams);
		}
	};
	LTransitionManager.start = function(displayObject, transParams) {
		var trans = new LTransition(displayObject, transParams);
		trans.startTransition();
		return trans;
	};
	return LTransitionManager;
})(); 
var LFlash = (function () {
	function LFlash(){}
	LFlash.SpriteSheetConvert = function(frames){
		var result = [],child;
		for(var i=0;i<frames.length;i++){
			child = frames[i];
			result.push({x:child.frame.x,sx:child.spriteSourceSize.x,y:child.frame.y,sy:child.spriteSourceSize.y,width:child.frame.w,height:child.frame.h});
		}
		return result;
	};
	return LFlash;
})();
var LString = {
	trim:function (s){
		return s.replace(/(^\s*)|(\s*$)|(\n)/g, "");
	},
	leftTrim:function (s){
		return s.replace(/(^\s*)|(^\n)/g, "");
	},
	rightTrim:function (s){
		return s.replace(/(\s*$)|(\n$)/g, "");
	},
	numberFormat:function (s,l){
		if (!l || l < 1) {
			l = 3;
		}
		s=String(s).split(".");
		s[0]=s[0].replace(new RegExp('(\\d)(?=(\\d{'+l+'})+$)','ig'),"$1,");
		return s.join(".");
	},
	isString:function (s){
		var p=/^([a-z]|[A-Z])+$/;
		return p.exec(s); 
	},
	isNumber:function (s){
		var p=/^\d+\.\d+$/;
		return p.exec(s); 
	},
	isInt:function (s){
		var p=/^\d+$/;
		return p.exec(s); 
	}
};
LMath = LString;

var LButtonSample1=(function(){function LButtonSample1(name,size,font,color){var s=this;if(!size){size=16;}if(!color){color="#FFFFFF";}if(!font){font="Arial";}s.backgroundColor="#000000";var btn_up=new LSprite();btn_up.shadow=new LSprite();btn_up.back=new LSprite();btn_up.addChild(btn_up.shadow);btn_up.addChild(btn_up.back);labelText=new LTextField();labelText.color=color;labelText.font=font;labelText.size=size;labelText.x=size*0.5;labelText.y=size*0.5;labelText.text=name;s.labelText=labelText;btn_up.back.addChild(labelText);var shadow=new LDropShadowFilter(4,45,"#000000",10);btn_up.shadow.filters=[shadow];var btn_down=new LSprite();btn_down.x=btn_down.y=1;labelText=labelText.clone();btn_down.addChild(labelText);var btn_disable=btn_down.clone();btn_disable.alpha=0.5;LExtends(s,LButton,[btn_up,btn_down,null,btn_disable]);s.type="LButtonSample1";s.baseWidth=s.width=labelText.getWidth()+size;s.baseHeight=s.height=2.2*size;s.backgroundSet=null;s.widthSet=null;s.heightSet=null;s.xSet=null;s.ySet=null;s.addEventListener(LEvent.ENTER_FRAME,s._onDraw);}LButtonSample1.prototype.clone=function(){var s=this,name=s.labelText.text,size=s.labelText.size,font=s.labelText.font,color=s.labelText.color,a=new LButtonSample1(name,size,font,color);a.backgroundColor=s.backgroundColor;a.x=s.x;a.y=s.y;return a;};LButtonSample1.prototype.setLabel=function(text){var s=this;s.bitmap_over.getChildAt(0).text=s.bitmap_up.back.getChildAt(0).text=text;s.baseWidth=s.width=s.bitmap_up.back.getChildAt(0).getWidth()+s.bitmap_up.back.getChildAt(0).size;s.backgroundSet=null;};LButtonSample1.prototype._onDraw=function(s){var co=s.getRootCoordinate(),labelText;if(s.backgroundSet==s.backgroundColor&&s.widthSet==s.width&&s.heightSet==s.height&&s.xSet==co.x&&s.ySet==co.y){return;}s.backgroundSet=s.backgroundColor;s.widthSet=s.width>s.baseWidth?s.width:s.baseWidth;s.heightSet=s.height>s.baseHeight?s.height:s.baseHeight;s.width=s.widthSet;s.height=s.heightSet;s.xSet=co.x;s.ySet=co.y;labelText=s.bitmap_up.back.getChildAt(0);labelText.x=(s.width-s.baseWidth+labelText.size)*0.5;labelText.y=(s.height-s.baseHeight+labelText.size)*0.5;labelText=s.bitmap_over.getChildAt(0);labelText.x=(s.width-s.baseWidth+labelText.size)*0.5;labelText.y=(s.height-s.baseHeight+labelText.size)*0.5;var grd=LGlobal.canvas.createLinearGradient(0,-s.height*0.5,0,s.height*2);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,s.backgroundColor);var grd2=LGlobal.canvas.createLinearGradient(0,-s.height,0,s.height*2);grd2.addColorStop(0,"#FFFFFF");grd2.addColorStop(1,s.backgroundColor);s.bitmap_up.back.graphics.clear();s.bitmap_over.graphics.clear();s.bitmap_up.shadow.graphics.clear();s.bitmap_up.shadow.graphics.drawRoundRect(0,"#000000",[1,1,s.widthSet-2,s.heightSet-2,s.heightSet*0.1],true,"#000000");s.bitmap_up.back.graphics.drawRect(1,s.backgroundColor,[0,0,s.widthSet,s.heightSet],true,grd);s.bitmap_up.back.graphics.drawRect(0,s.backgroundColor,[1,s.heightSet*0.5,s.widthSet-2,s.heightSet*0.5-1],true,grd2);s.bitmap_over.graphics.drawRect(1,s.backgroundColor,[0,0,s.widthSet,s.heightSet],true,grd);s.bitmap_over.graphics.drawRect(0,s.backgroundColor,[1,s.heightSet*0.5,s.widthSet-2,s.heightSet*0.5-1],true,grd2);s.disableState.graphics.drawRect(1,s.backgroundColor,[0,0,s.widthSet,s.heightSet],true,grd);s.disableState.graphics.drawRect(0,s.backgroundColor,[1,s.heightSet*0.5,s.widthSet-2,s.heightSet*0.5-1],true,grd2);};return LButtonSample1;})();var LButtonSample2=(function(){function LButtonSample2(name,size,font,color){var s=this;LExtends(s,LButtonSample1,[name,size,font,color]);s.type="LButtonSample2";}LButtonSample2.prototype.clone=function(){var s=this,name=s.labelText.text,size=s.labelText.size,font=s.labelText.font,color=s.labelText.color,a=new LButtonSample2(name,size,font,color);a.backgroundColor=s.backgroundColor;a.x=s.x;a.y=s.y;return a;};LButtonSample2.prototype._onDraw=function(s){var co=s.getRootCoordinate(),labelText;if(s.backgroundSet==s.backgroundColor&&s.widthSet==s.width&&s.heightSet==s.height&&s.xSet==co.x&&s.ySet==co.y){return;}s.backgroundSet=s.backgroundColor;s.widthSet=s.width>s.baseWidth?s.width:s.baseWidth;s.heightSet=s.height>s.baseHeight?s.height:s.baseHeight;s.width=s.widthSet;s.height=s.heightSet;s.xSet=co.x;s.ySet=co.y;labelText=s.bitmap_up.back.getChildAt(0);labelText.x=(s.width-s.baseWidth+labelText.size)*0.5;labelText.y=(s.height-s.baseHeight+labelText.size)*0.5;labelText=s.bitmap_over.getChildAt(0);labelText.x=(s.width-s.baseWidth+labelText.size)*0.5;labelText.y=(s.height-s.baseHeight+labelText.size)*0.5;var grd=LGlobal.canvas.createLinearGradient(0,-s.height*0.5,0,s.height*2);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,s.backgroundColor);var grd2=LGlobal.canvas.createLinearGradient(0,-s.height,0,s.height*2);grd2.addColorStop(0,"#FFFFFF");grd2.addColorStop(1,s.backgroundColor);s.bitmap_up.back.graphics.clear();s.bitmap_over.graphics.clear();s.bitmap_up.shadow.graphics.clear();s.bitmap_up.back.graphics.drawRoundRect(1,s.backgroundColor,[0,0,s.width,s.height,s.height*0.1],true,grd);s.bitmap_up.back.graphics.drawRoundRect(0,s.backgroundColor,[1,s.height*0.5,s.width-2,s.height*0.5-1,s.height*0.1],true,grd2);s.bitmap_over.graphics.drawRoundRect(1,s.backgroundColor,[0,0,s.width,s.height,s.height*0.1],true,grd);s.bitmap_over.graphics.drawRoundRect(0,s.backgroundColor,[1,s.height*0.5,s.width-2,s.height*0.5-1,s.height*0.1],true,grd2);s.disableState.graphics.drawRoundRect(1,s.backgroundColor,[0,0,s.width,s.height,s.height*0.1],true,grd);s.disableState.graphics.drawRoundRect(0,s.backgroundColor,[1,s.height*0.5,s.width-2,s.height*0.5-1,s.height*0.1],true,grd2);};return LButtonSample2;})();var LCheckBox=(function(){function LCheckBox(layer,layerSelect){var s=this,grd;LExtends(s,LSprite,[]);s.type="LCheckBox";if(!layer){grd=LGlobal.canvas.createLinearGradient(0,-20,0,40);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#CCCCCC");layer=new LSprite();layer.graphics.drawRoundRect(1,"#CCCCCC",[0,0,20,20,4],true,grd);}else{layer=layer.clone();}if(!layerSelect){grd=LGlobal.canvas.createLinearGradient(0,-20,0,20);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#008000");layerSelect=new LSprite();layerSelect.graphics.drawLine(5,grd,[4,10,12,16]);layerSelect.graphics.drawLine(5,grd,[10,16,16,4]);}else{layerSelect=layerSelect.clone();}s.layer=layer;s.layerSelect=layerSelect;s.addChild(s.layer);s.addChild(s.layerSelect);s.layerSelect.visible=s.checked=false;s.addEventListener(LMouseEvent.MOUSE_UP,s._onChange);}LCheckBox.ON_CHANGE="onchange";LCheckBox.prototype._onChange=function(e){var s=e.clickTarget;s.checked=!s.checked;s.layerSelect.visible=s.checked;s.dispatchEvent(LCheckBox.ON_CHANGE);};LCheckBox.prototype.setChecked=function(value){var s=this;s.checked=value;s.layerSelect.visible=s.checked;};LCheckBox.prototype.clone=function(){var s=this,a=new LCheckBox(s.layer.clone(),s.layerSelect.clone());a.setChecked(s.checked);return a;};return LCheckBox;})();var LComboBox=(function(){function LComboBox(size,color,font,layerBack,layerUp,layerOver){var s=this;LExtends(s,LSprite,[]);s.type="LComboBox";s.list=[];s.selectIndex=-1;s.value=null;s.selectWidth=100;var params;if(typeof size!="object"){params={size:size,color:color,font:font,layerBack:layerBack,layerUp:layerUp,layerOver:layerOver};}s.size=params.size?params.size:16;s.font=params.font?params.font:"Arial";s.color=params.color?params.color:"#000000";layerBack=params.layerBack;layerUp=params.layerUp;layerOver=params.layerOver;s.params=params;s.maxIndex=5;if(!layerBack){layerBack=new LSprite();layerBack.graphics.drawRoundRect(1,"#999999",[0,0,200,30,4],true,"#f5f5f9");}s.listView=new LListView();s.listView.dragEffect=LListView.DragEffects.Momentum;s.listView.cellWidth=s.minWidth=layerBack.getWidth();s.listView.cellHeight=s.minHeight=layerBack.getHeight();var layer;if(!layerUp||!layerOver){var up,down,data;grd=LGlobal.canvas.createLinearGradient(0,-20,0,40);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#CCCCCC");up=new LSprite();up.graphics.drawRoundRect(1,"#CCCCCC",[0,0,22,22,2],true,grd);up.graphics.drawVertices(1,"#CCCCCC",[[6,6],[16,6],[11,18]],true,"#008000");data=new LBitmapData(null,0,0,22,22,LBitmapData.DATA_CANVAS);data.draw(up);layerUp=new LBitmap(data);down=new LSprite();down.graphics.drawRoundRect(1,"#CCCCCC",[0,0,22,22,2],true,grd);down.graphics.drawVertices(1,"#CCCCCC",[[6,6],[16,6],[11,18]],true,"#32CD32");data=new LBitmapData(null,0,0,22,22,LBitmapData.DATA_CANVAS);data.draw(down);layerOver=new LBitmap(data);}var layer1=layerBack.clone();layerUp.x=layer1.getWidth()-layerUp.getWidth()-4;layerUp.y=4;layer1.arraw=layerUp;layer1.addChild(layerUp);layer1.cacheAsBitmap(true);var layer2=layerBack.clone();layerOver.x=layer2.getWidth()-layerOver.getWidth()-4;layerOver.y=4;layer2.arraw=layerOver;layer2.addChild(layerOver);layer2.cacheAsBitmap(true);layer=new LButton(layer1,layer2);layer.setCursorEnabled(false);layer.staticMode=true;s.addChild(layer);var label=new LTextField();label.x=4;label.y=4;label.text="";label.size=s.size;label.color=s.color;label.font=s.font;layer.addChild(label);s.label=label;s.layer=layer;s.listChildView=LComboBoxChild;s.addEventListener(LMouseEvent.MOUSE_UP,s._showChildList);}LComboBox.ON_CHANGE="onchange";LComboBox.PRE_OPEN="pre_open";LComboBox.END_OPEN="end_open";LComboBox.prototype.deleteChild=function(value){var s=this,i,l,delIndex=-1;for(i=0,l=s.list.length; i<l; i++){if(s.list[i].value===value){delIndex=i;break;}}if(delIndex==-1){return;}s.list.splice(delIndex,1);if(s.value!==value){return;}if(s.list.length>0){s.setValue(s.list[delIndex>0?delIndex-1:0].value);}else{s.selectIndex=-1;s.label.text="";s.value=null;}};LComboBox.prototype.setChild=function(child){var s=this,i,l;if(!child||typeof child.value==UNDEFINED||typeof child.label==UNDEFINED){throw "the child must be an object like:{label:a,value:b}";}for(i=0,l=s.list.length; i<l; i++){if(s.list[i].value===child.value){return;}}s.list.push(child);if(s.list.length==1){s.setValue(child.value);}};LComboBox.prototype.die=function(){var self=this;self.listView.die();self.listView.removeAllChild();self.callParent("die",arguments);};LComboBox.prototype._showChildList=function(event){var s=event.currentTarget;if(!s.list||s.list.length==0){return;}s.dispatchEvent(LComboBox.PRE_OPEN);setTimeout(function(){s.showChildList();},0);};LComboBox.prototype.setListChildView=function(childClass){this.listChildView=childClass;};LComboBox.prototype.showChildList=function(list,index){var s=this,i,l,child,w;if(!list){var translucent=new LSprite();translucent.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");translucent.alpha=0;LGlobal.stage.addChild(translucent);translucent.addEventListener(LMouseEvent.MOUSE_UP,function(e){var cnt=LGlobal.stage.numChildren;if(e.target.constructor.name=="LListView"){return;}var destroy=LGlobal.destroy;LGlobal.destroy=false;LGlobal.stage.removeChildAt(cnt-1);LGlobal.destroy=destroy;LGlobal.stage.removeChildAt(cnt-2);});translucent.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){});translucent.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){});translucent.addEventListener(LMouseEvent.MOUSE_OVER,function(e){});translucent.addEventListener(LMouseEvent.MOUSE_OUT,function(e){});var coordinate=s.getRootCoordinate();s.listView.x=coordinate.x;s.listView.y=coordinate.y+s.layer.getHeight();LGlobal.stage.addChild(s.listView);if(typeof s.listView._ll_saveY!=UNDEFINED){s.listView.clipping.y=s.listView._ll_saveY;}list=[];index=0;}i=index;var selected=s.value===s.list[i].value;child=new s.listChildView(s.list[i],s,selected);if(selected){s.listView._ll_selectedChild=child;}list.push(child);if(index<s.list.length-1){setTimeout(function(){s.showChildList(list,index+1);},0);return;}s.listView.resize(s.listView.cellWidth,s.listView.cellHeight*(s.list.length>s.maxIndex?s.maxIndex:s.list.length));s.listView.updateList(list);s.dispatchEvent(LComboBox.END_OPEN);};LComboBox.prototype.setValue=function(value,noEvent){var s=this,c,i,l;if(s.value==value){return;}c=s.list;for(i=0,l=c.length; i<l; i++){if(c[i].value==value){s.selectIndex=i;s.value=s.list[s.selectIndex].value;s.label.text=s.list[s.selectIndex].label;if(!noEvent){s.dispatchEvent(LComboBox.ON_CHANGE);}break;}}};LComboBox.prototype.clone=function(){var s=this,a=new LComboBox(),k,c;for(k in s.list){c=s.list[k];a.setChild({label:c.label,value:c.value});}a.setValue(s.value);return a;};return LComboBox;})();var LComboBoxChild=(function(){function LComboBoxChild(content,comboBox,selected){var self=this;base(self,LListChildView,[]);self.content=content;self.comboBox=comboBox;if(selected){self.setSelectStatus(content,comboBox);}else{self.setStatus(content,comboBox);}}LComboBoxChild.prototype.setStatus=function(content,comboBox){var self=this;var listView=comboBox.listView;self.graphics.drawRect(0,"#f5f5f9",[0,0,listView.cellWidth,listView.cellHeight],true,"#f5f5f9");var text=new LTextField();text.size=comboBox.size;text.color=comboBox.color;text.font=comboBox.font;text.text=content.label;text.x=text.y=5;self.addChild(text);self.updateView();};LComboBoxChild.prototype.setSelectStatus=function(content,comboBox){var self=this;var listView=comboBox.listView;self.graphics.clear();self.graphics.drawRect(0,"#CCCCCC",[0,0,listView.cellWidth,listView.cellHeight],true,"#CCCCCC");var text=new LTextField();text.size=comboBox.size;text.color=comboBox.color;text.font=comboBox.font;text.text=content.label;text.x=text.y=5;self.addChild(text);self.updateView();};LComboBoxChild.prototype.onTouch=function(event){var self=event.target;var listView=event.currentTarget;if(listView._ll_selectedChild){listView._ll_selectedChild.removeAllChild();listView._ll_selectedChild.cacheAsBitmap(false);listView._ll_selectedChild.setStatus(listView._ll_selectedChild.content,listView._ll_selectedChild.comboBox);}self.removeAllChild();self.cacheAsBitmap(false);self.setSelectStatus(self.content,self.comboBox);listView._ll_selectedChild=self;};LComboBoxChild.prototype.onClick=function(event){var self=event.target;var listView=event.currentTarget,i,v;var comboBox=self.comboBox;var listViewIndex;comboBox.setValue(self.content.value);for(var i=LGlobal.stage.numChildren-1;i>=0;i--){if(LGlobal.stage.childList[i].constructor.name=="LListViewDragObject"){LGlobal.stage.removeChildAt(i);LGlobal.listViewDragObject=null;continue;}if(LGlobal.stage.childList[i].objectIndex!=listView.objectIndex){continue;}var destroy=LGlobal.destroy;LGlobal.destroy=false;LGlobal.stage.removeChildAt(i);LGlobal.destroy=destroy;LGlobal.stage.removeChildAt(i-1);listView._ll_saveY=listView.clipping.y;break;}};return LComboBoxChild;})();var LMenubar=(function(){function LMenubar(list,style){var s=this;LExtends(s,LSprite,[]);s.type="LMenubar";if(!style){style={};}if(!style.textSize){style.textSize=20;}if(!style.horizontalIndent){style.horizontalIndent=10;}if(!style.verticalIndent){style.verticalIndent=5;}if(!style.textColor){style.textColor="#000000";}if(!style.lineColor){style.lineColor="#CCCCCC";}if(!style.backgroundColor){style.backgroundColor="#FFFFFF";}if(!style.itemBackgroundColor){style.itemBackgroundColor=style.backgroundColor;}if(!style.selectColor){style.selectColor="#1E90FF";}s.style=style;var back=new LSprite();back.graphics.drawRect(0,"#ffffff",[-LGlobal.width,-LGlobal.height,LGlobal.width*2,LGlobal.height*2]);s.addChild(back);s.back=back;s.back.root=s;s.back.mainMenu=true;s.back.background=true;s.back.addEventListener(LMouseEvent.MOUSE_UP,function(e){});s.back.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){});s.back.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){var root=e.clickTarget.root;for(var j=0; j<root.childList.length; j++){if(root.childList[j].mainMenu){if(root.childList[j].background){continue;}var rW=root.childList[j].getWidth();var rH=root.childList[j].getHeight();root.childList[j].graphics.clear();root.childList[j].graphics.drawRect(0,root.style.lineColor,[0,0,rW,rH],true,root.style.backgroundColor);continue;}root.childList[j].visible=false;}root.open=false;setTimeout(function(){root.back.visible=false;root.dispatchEvent(LMenubar.MENU_CLOSE);},100);});s.back.visible=false;s.setList(s,list,0,0,0);}LMenubar.MENU_CLOSE="menu_close";LMenubar.prototype.openMainMenu=function(index){var self=this;self.mousedown({clickTarget:self.getChildAt(index+1)});};LMenubar.prototype.mousedown=function(e){var target=e.clickTarget;var root=target.root;if(target.mainMenu){if(root.open){return;}root.open=true;root.back.visible=true;root.select=target;var sW=target.getWidth();var sH=target.getHeight();target.graphics.clear();target.graphics.drawRect(0,root.style.selectColor,[0,0,sW,sH],true,root.style.selectColor);if(target.menuList&&target.menuList.length){for(var j=0; j<target.menuList.length; j++){target.menuList[j].visible=true;target.menuList[j].graphics.clear();target.menuList[j].graphics.drawRect(1,root.style.lineColor,[0,0,target.childWidth,target.childHeight],true,root.style.itemBackgroundColor);if(target.menuList[j].arrow){target.menuList[j].arrow.x=target.childWidth-root.style.horizontalIndent*2;}}}return;}if(!target.menuList){if(target.click){target.click({target:root});root.open=false;setTimeout(function(){root.back.visible=false;},100);}for(var j=0; j<root.childList.length; j++){if(root.childList[j].mainMenu){continue;}root.childList[j].visible=false;}}};LMenubar.prototype.mousemove=function(e){var target=e.clickTarget;var root=target.root;if(!root.open){return;}if(root.select&&root.select.objectIndex==target.objectIndex){return;}if(root.select){var rW=root.select.getWidth();var rH=root.select.getHeight();root.select.graphics.clear();root.select.graphics.drawRect(root.select.mainMenu?0:1,root.style.lineColor,[0,0,rW,rH],true,root.select.mainMenu?root.style.backgroundColor:root.style.itemBackgroundColor);}var sW=target.getWidth();var sH=target.getHeight();target.graphics.clear();target.graphics.drawRect(0,root.style.selectColor,[0,0,sW,sH],true,root.style.selectColor);if(target.mainMenu){for(var j=0; j<root.childList.length; j++){if(root.childList[j].mainMenu){continue;}root.childList[j].visible=false;}}else if(root.select.depth==target.depth){if(root.select.menuList&&root.select.menuList.length){for(var j=0; j<root.select.menuList.length; j++){root.select.menuList[j].visible=false;}}}else if(root.select.depth>target.depth){if(root.select.upper.menuList&&root.select.upper.menuList.length){for(var j=0; j<root.select.upper.menuList.length; j++){root.select.upper.menuList[j].visible=false;}}}if(target.menuList&&target.menuList.length){for(var j=0; j<target.menuList.length; j++){target.menuList[j].visible=true;target.menuList[j].graphics.clear();target.menuList[j].graphics.drawRect(1,root.style.lineColor,[0,0,target.childWidth,target.childHeight],true,target.menuList[j].mainMenu?root.style.backgroundColor:root.style.itemBackgroundColor);if(!target.mainMenu){target.menuList[j].x=target.x+target.getWidth();}if(target.menuList[j].arrow){target.menuList[j].arrow.x=target.childWidth-root.style.horizontalIndent*2;}}}root.select=target;};LMenubar.prototype.mainMenuHide=function(value){var self=this;for(var j=0; j<self.childList.length; j++){if(self.childList[j].mainMenu){self.childList[j].visible=false;}}};LMenubar.prototype.setList=function(layer,list,depth,sx,sy){var s=this,w=0,h=0,menuList=[];layer.childWidth=0;layer.childHeight=0;for(var i=0; i<list.length; i++){var child=list[i];var menu=new LSprite();menu.depth=depth;menuList.push(menu);var label=new LTextField();menu.root=s;menu.upper=layer;menu.click=child.click;label.size=s.style.textSize;label.color=s.style.textColor;label.text=child.label;label.x=s.style.horizontalIndent;label.y=s.style.verticalIndent;menu.addChild(label);menu.graphics.drawRect(0,s.style.backgroundColor,[0,0,label.getWidth()+s.style.horizontalIndent*2,label.getHeight()+s.style.verticalIndent*2],true,s.style.backgroundColor);menu.addEventListener(LMouseEvent.MOUSE_DOWN,s.mousedown);menu.addEventListener(LMouseEvent.MOUSE_MOVE,s.mousemove);if(LGlobal.mobile){menu.addEventListener(LMouseEvent.MOUSE_DOWN,s.mousemove);}if(s.objectIndex==layer.objectIndex){menu.x=w+sx;menu.y=0+sy;menu.mainMenu=true;w+=label.getWidth()+s.style.horizontalIndent*2;h=label.getHeight()+s.style.verticalIndent*2;if(layer.childWidth<label.getWidth()+s.style.horizontalIndent*2){layer.childWidth=label.getWidth()+s.style.horizontalIndent*2;}if(layer.childHeight<label.getHeight()+s.style.verticalIndent*2){layer.childHeight=label.getHeight()+s.style.verticalIndent*2;}}else{menu.x=0+sx;menu.y=h+sy;w=w>label.getWidth()+s.style.horizontalIndent*4?w:label.getWidth()+s.style.horizontalIndent*4;h+=label.getHeight()+s.style.verticalIndent*2;if(layer.childWidth<label.getWidth()+s.style.horizontalIndent*4){layer.childWidth=label.getWidth()+s.style.horizontalIndent*4;}if(layer.childHeight<label.getHeight()+s.style.verticalIndent*2){layer.childHeight=label.getHeight()+s.style.verticalIndent*2;}}s.addChild(menu);if(child.list&&child.list.length>0){if(s.objectIndex==layer.objectIndex){s.setList(menu,child.list,depth+1,menu.x,menu.y+menu.getHeight());}else{var arrow=new LSprite();menu.arrow=arrow;menu.addChild(arrow);arrow.x=label.getWidth()+s.style.horizontalIndent*2;arrow.y=label.y;arrow.graphics.drawVertices(0,s.style.textColor,[[0,0],[0,label.getHeight()],[s.style.horizontalIndent,label.getHeight()*0.5]],true,s.style.textColor);s.setList(menu,child.list,depth+1,menu.x+menu.getWidth()+s.style.horizontalIndent*2,menu.y);}}if(s.objectIndex!=layer.objectIndex){menu.visible=false;}}layer.menuList=menuList;};return LMenubar;})();var LMessageBox=(function(){function LMessageBox(){}LMessageBox.show=function(properties){if(!properties.width){properties.width=500;}if(!properties.height){properties.height=300;}if(!properties.title){properties.title="";}if(!properties.size){properties.size=16;}if(!properties.textHeight){properties.textHeight=35;}if(properties.displayObject){properties.width=properties.displayObject.getWidth();properties.height=properties.displayObject.getHeight();}var translucent=new LSprite();translucent.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");translucent.alpha=0.5;LGlobal.stage.addChild(translucent);translucent.addEventListener(LMouseEvent.MOUSE_UP,function(e){});translucent.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){});translucent.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){});translucent.addEventListener(LMouseEvent.MOUSE_OVER,function(e){});translucent.addEventListener(LMouseEvent.MOUSE_OUT,function(e){});var myWindow=new LWindow(properties.width,properties.height,properties.title);myWindow.x=(LGlobal.width-myWindow.getWidth())*0.5;myWindow.y=(LGlobal.height-myWindow.getHeight())*0.5;LGlobal.stage.addChild(myWindow);myWindow.addEventListener(LWindow.CLOSE,function(e){translucent.die();translucent.remove();});if(properties.displayObject){myWindow.layer.addChild(properties.displayObject);return;}var msgLabel=new LTextField();msgLabel.width=properties.width-100;msgLabel.setWordWrap(true,properties.textHeight);msgLabel.text=properties.message;msgLabel.size=properties.size;msgLabel.x=(properties.width-msgLabel.width)*0.5;msgLabel.y=(properties.height-myWindow.bar.getHeight()-msgLabel.getHeight())*0.5;myWindow.layer.addChild(msgLabel);};return LMessageBox;})();var LPanel=(function(){function LPanel(bitmapData,w,h,x1,x2,y1,y2,overlapping){var s=this;LExtends(s,LSprite,[]);s.type="LPanel";if(typeof overlapping==UNDEFINED){overlapping=0;}self.overlapping=overlapping;if(typeof bitmapData=="string"){var d=new LShape();if(typeof w==UNDEFINED){w=20;}if(typeof h==UNDEFINED){h=20;}d.graphics.drawRoundRect(1,"#000000",[0,0,w,h,w<10?w*0.5:5],true,bitmapData);bitmapData=new LBitmapData(null,0,0,w,h,LBitmapData.DATA_CANVAS);bitmapData.draw(d);}s.x1=x1?x1:bitmapData.width*0.4;s.x2=x2?x2:bitmapData.width*0.6;s.y1=y1?y1:bitmapData.height*0.4;s.y2=y2?y2:bitmapData.height*0.6;s.bitmapData=bitmapData;var ltData=new LBitmapData(bitmapData.image,bitmapData.x,bitmapData.y,s.x1,s.y1);var mtData=new LBitmapData(bitmapData.image,bitmapData.x+s.x1,bitmapData.y,s.x2-s.x1,s.y1);var rtData=new LBitmapData(bitmapData.image,bitmapData.x+s.x2,bitmapData.y,bitmapData.width-s.x2,s.y1);var lmData=new LBitmapData(bitmapData.image,bitmapData.x,bitmapData.y+s.y1,s.x1,s.y2-s.y1);var mmData=new LBitmapData(bitmapData.image,bitmapData.x+s.x1,bitmapData.y+s.y1,s.x2-s.x1,s.y2-s.y1);var rmData=new LBitmapData(bitmapData.image,bitmapData.x+s.x2,bitmapData.y+s.y1,bitmapData.width-s.x2,s.y2-s.y1);var lbData=new LBitmapData(bitmapData.image,bitmapData.x,bitmapData.y+s.y2,s.x1,bitmapData.height-s.y2);var mbData=new LBitmapData(bitmapData.image,bitmapData.x+s.x1,bitmapData.y+s.y2,s.x2-s.x1,bitmapData.height-s.y2);var rbData=new LBitmapData(bitmapData.image,bitmapData.x+s.x2,bitmapData.y+s.y2,bitmapData.width-s.x2,bitmapData.height-s.y2);s.ltBitmap=new LBitmap(ltData);s.addChild(s.ltBitmap);s.mtBitmap=new LBitmap(mtData);s.mtBitmap.x=s.x1-overlapping;s.addChild(s.mtBitmap);s.rtBitmap=new LBitmap(rtData);s.addChild(s.rtBitmap);s.lmBitmap=new LBitmap(lmData);s.lmBitmap.y=s.y1-overlapping;s.addChild(s.lmBitmap);s.mmBitmap=new LBitmap(mmData);s.mmBitmap.x=s.x1-overlapping;s.mmBitmap.y=s.y1-overlapping;s.addChild(s.mmBitmap);s.rmBitmap=new LBitmap(rmData);s.rmBitmap.y=s.y1-overlapping;s.addChild(s.rmBitmap);s.lbBitmap=new LBitmap(lbData);s.addChild(s.lbBitmap);s.mbBitmap=new LBitmap(mbData);s.mbBitmap.x=s.x1-overlapping;s.addChild(s.mbBitmap);s.rbBitmap=new LBitmap(rbData);s.addChild(s.rbBitmap);s.resize(w,h);}LPanel.prototype.resize=function(w,h){var s=this;s._ll_w=w;s._ll_h=h;s.rtBitmap.x=s.rmBitmap.x=s.rbBitmap.x=w-(s.bitmapData.width-s.x2);s.lbBitmap.y=s.mbBitmap.y=s.rbBitmap.y=h-(s.bitmapData.height-s.y2);s.lmBitmap.scaleY=s.mmBitmap.scaleY=s.rmBitmap.scaleY=(h-s.y1-(s.bitmapData.height-s.y2)+self.overlapping*2)/(s.y2-s.y1);s.mtBitmap.scaleX=s.mmBitmap.scaleX=s.mbBitmap.scaleX=(w-s.x1-(s.bitmapData.width-s.x2)+self.overlapping*2)/(s.x2-s.x1);};LPanel.prototype.getSize=function(){return{width:this._ll_w,height:this._ll_h};};LPanel.prototype.clone=function(){var s=this;return new LPanel(s.bitmapData.clone(),s._ll_w,s._ll_h,s.x1,s.x2,s.y1,s.y2,self.overlapping);};return LPanel;})();var LRadioChild=(function(){function LRadioChild(value,layer,layerSelect){var s=this,grd;LExtends(s,LSprite,[]);s.type="LRadioChild";s.value=value;if(!layer){grd=LGlobal.canvas.createLinearGradient(0,-20,0,40);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#CCCCCC");layer=new LSprite();layer.graphics.drawArc(1,"#CCCCCC",[0,0,10,0,2*Math.PI],true,grd);}else{layer=layer.clone();}if(!layerSelect){grd=LGlobal.canvas.createLinearGradient(0,-20,0,20);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#008000");layerSelect=new LSprite();layerSelect.graphics.drawArc(1,grd,[0,0,5,0,2*Math.PI],true,grd);}else{layerSelect=layerSelect.clone();}s.layer=layer;s.layerSelect=layerSelect;s.addChild(s.layer);s.addChild(s.layerSelect);s.layerSelect.visible=false;s.checked=false;s.addEventListener(LMouseEvent.MOUSE_UP,s._onChange);}LRadioChild.prototype.clone=function(){var s=this,a=new LRadioChild(s.value,s.layer,s.layerSelect);a.copyProperty(s);return a;};LRadioChild.prototype._onChange=function(e){var s=e.clickTarget;s.parent.setValue(s.value);};LRadioChild.prototype.setChecked=function(v){this.layerSelect.visible=this.checked=v;};return LRadioChild;})();var LRadio=(function(){function LRadio(){var s=this;LExtends(s,LSprite,[]);s.type="LRadio";s.value=null;}LRadio.ON_CHANGE="onchange";LRadio.prototype.setChildRadio=function(value,x,y,layer,layerSelect){var s=this;var child=new LRadioChild(value,layer,layerSelect);child.x=x;child.y=y;s.addChild(child);return child;};LRadio.prototype.push=function(value){this.addChild(value);};LRadio.prototype.setValue=function(value){var s=this,child,k;var saveValue=s.value;for(k in s.childList){child=s.childList[k];if(child.setChecked){child.setChecked(false);}if(child.value==value){s.value=value;child.setChecked(true);}}if(saveValue!=s.value){s.dispatchEvent(LRadio.ON_CHANGE);}};LRadio.prototype.clone=function(){var s=this,a=new LRadio(),child,k;for(k in s.childList){child=s.childList[k].clone();a.push(child);}a.setValue(s.value);return a;};return LRadio;})();var LRange=(function(){function LRange(){var s=this,w,h,param;LExtends(s,LSprite,[]);s.type="LRange";s.value=0;if(arguments.length==0){param={width:200};}else if(arguments.length==1&&typeof arguments[0]=="number"){param={width:arguments[0]};}else if(arguments.length==2){param={backLayer:arguments[0],selectLayer:arguments[1]};}else{throw "LRange's param is wrong";}if(param["backLayer"]&&param["selectLayer"]){var backLayer=param["backLayer"];s.sign=param["selectLayer"];h=backLayer.getHeight()>s.sign.getHeight()?backLayer.getHeight():s.sign.getHeight();backLayer.y=(h-backLayer.getHeight())*0.5;s.w=backLayer.getWidth();s.graphics.drawRect(0,"#FFFFFF",[-50,0,s.w+100,h]);s.addChild(backLayer);}else{s.w=param["width"];s.graphics.drawRect(0,"#FFFFFF",[-50,0,s.w+100,s.w*0.13]);var grd=LGlobal.canvas.createLinearGradient(0,0,0,s.w*0.13);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#CCCCCC");s.color=grd;s.graphics.drawRect(1,"#CCCCCC",[0,s.w*0.04,s.w,s.w*0.03],true,s.color);s.sign=new LSprite();s.sign.graphics.drawVertices(1,"#CCCCCC",[[0,0],[s.w*0.05,0],[s.w*0.05,s.w*0.1],[s.w*0.025,s.w*0.13],[0,s.w*0.1]],true,s.color);}s.addChild(s.sign);s.sign.x=-s.sign.getWidth()*0.5;s.addEventListener(LMouseEvent.MOUSE_DOWN,s._onDown);}LRange.ON_CHANGE="onchange";LRange.prototype.clone=function(){var s=this,a=new LRange(s.w);a.copyProperty(s);return a;};LRange.prototype._onDown=function(event){var s=event.clickTarget;if(event.selfX<-s.sign.getWidth()*0.5||event.selfX>s.w+s.sign.getWidth()*0.5){return;}if(s.down){return;}s.down=true;s.sign.x=event.selfX-s.sign.getWidth()*0.5;if(s.sign.x<-s.sign.getWidth()*0.5){s.sign.x=-s.sign.getWidth()*0.5;}if(s.sign.x>s.w-s.sign.getWidth()*0.5){s.sign.x=s.w-s.sign.getWidth()*0.5;}s._DownX=s.sign.x;s._OffsetX=event.selfX;s._getValue();s.addEventListener(LMouseEvent.MOUSE_MOVE,s._onMove);LGlobal.stage._ll_range=s;LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s._onUp);};LRange.prototype._getValue=function(){var s=this;var value=s.value;s.value=Math.floor((s.sign.x+s.sign.getWidth()*0.5)*100/s.w);if(value!=s.value){s.dispatchEvent(LRange.ON_CHANGE);}};LRange.prototype.setValue=function(value){var s=this;s.sign.x=s.w*value*0.01-s.sign.getWidth()*0.5;s._getValue();};LRange.prototype._onMove=function(event){var s=event.clickTarget;s.sign.x=s._DownX+event.selfX-s._OffsetX;if(s.sign.x<-s.sign.getWidth()*0.5){s.sign.x=-s.sign.getWidth()*0.5;}if(s.sign.x>s.w-s.sign.getWidth()*0.5){s.sign.x=s.w-s.sign.getWidth()*0.5;}s._getValue();};LRange.prototype._onUp=function(event){var s=LGlobal.stage._ll_range;s.down=false;s.removeEventListener(LMouseEvent.MOUSE_MOVE,s._onMove);LGlobal.stage.removeEventListener(LMouseEvent.MOUSE_UP,s._onUp);};return LRange;})();var LScrollbar=(function(){function LScrollbar(showObject,maskW,maskH,param,wVisible,hVisible){var s=this;LExtends(s,LSprite,[]);s.type="LScrollbar";s._showLayer=new LSprite();s._mask=new LGraphics();s._mask.drawRect(0,"#ffffff",[0,0,maskW,maskH]);s._showLayer.graphics.drawRect(0,"#ffffff",[0,0,maskW,maskH]);s._wVisible=typeof wVisible==UNDEFINED?true:wVisible;s._hVisible=typeof hVisible==UNDEFINED?true:wVisible;s.addChild(s._showLayer);s._width=0;s._height=0;s._speed=0;s._showObject=showObject;s._showLayer.addChild(showObject);s.mode=LGlobal.mobile?LScrollbar.NEED_MODE:LScrollbar.ALWAY_MODE;s._showObject.mask=s._mask;if(!param){s._scrollWidth=20;s._selectHeight=s._scrollWidth*1.5;}else if(typeof param=="number"){s._scrollWidth=param;s._selectHeight=s._scrollWidth*1.5;}else if(typeof param=="object"){if(typeof param["back"]!=UNDEFINED&&typeof param["select"]!=UNDEFINED&&typeof param["arraw"]!=UNDEFINED){s._ll_bar_back=param["back"];s._ll_bar_select=param["select"];s._ll_bar_arraw=param["arraw"];s._scrollWidth=s._ll_bar_back.getWidth();s._selectHeight=s._ll_bar_select.getHeight();}else if(typeof param["scrollbarWidth"]!=UNDEFINED){s._scrollWidth=param["scrollbarWidth"];s._selectHeight=s._scrollWidth*1.5;}else{s._scrollWidth=20;s._selectHeight=s._scrollWidth*1.5;}if(typeof param["overflowX"]!=UNDEFINED){s._wVisible=param["overflowX"];}if(typeof param["overflowY"]!=UNDEFINED){s._hVisible=param["overflowY"];}if(typeof param["mode"]!=UNDEFINED){s.mode=param["mode"];}}if(LGlobal.mobile){s._showObject.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){e.currentTarget.startDrag(e.touchPointID);});s._showObject.addEventListener(LMouseEvent.MOUSE_UP,function(e){e.currentTarget.stopDrag();});}s._target={x:0,y:0};s._maskW=maskW;s._maskH=maskH;s.excluding=false;s.addEventListener(LEvent.ENTER_FRAME,s.onFrame);s.dispatchEvent(LEvent.ENTER_FRAME);s.dragRangeUpdate();}LScrollbar.ALWAY_MODE="alway";LScrollbar.HIDE_MODE="hide";LScrollbar.NEED_MODE="need";LScrollbar.prototype.clone=function(){var s=this,a=new LScrollbar(s._showObject.clone(),s._maskW,s._maskH,s._scrollWidth,s._wVisible,s._hVisible);a.copyProperty(s);return a;};LScrollbar.prototype.dragRangeUpdate=function(w,h){var s=this;if(typeof w==UNDEFINED){w=s._showObject.getWidth();}if(typeof h==UNDEFINED){h=s._showObject.getHeight();}s._showObject.dragRange=new LRectangle(!s._wVisible||w<s._maskW?0:s._maskW-w,!s._hVisible||h<s._maskH?0:s._maskH-h,s._wVisible&&w>s._maskW?w-s._maskW:0,s._hVisible&&h>s._maskH?h-s._maskH:0);};LScrollbar.prototype.onFrame=function(event){var s=event.currentTarget,w,h,i,l,child,m;w=s._showObject.getWidth();h=s._showObject.getHeight();if(s._wVisible&&s._width!=w){s._width=w;if(s._width>s._maskW){s.resizeWidth(true);s.moveLeft();}else{s.resizeWidth(false);}s.dragRangeUpdate(w,h);}if(s._hVisible&&s._height!=h){s._height=h;if(s._height>s._maskH){s.resizeHeight(true);s.moveUp();}else{s.resizeHeight(false);}s.dragRangeUpdate(w,h);}if(s.excluding){for(i=0,l=s._showObject.numChildren; i<l; i++){child=s._showObject.getChildAt(i);if(child.x+s._showObject.x>s._maskW||child.x+child.getWidth()+s._showObject.x<0||child.y+s._showObject.y>s._maskH||child.y+child.getHeight()+s._showObject.y<0){child.visible=false;}else{child.visible=true;}}}if(s._key==null){return;}if(s._key["up"]){s.moveUp();}if(s._key["down"]){s.moveDown();}if(s._key["left"]){s.moveLeft();}if(s._key["right"]){s.moveRight();}if(LGlobal.mobile){m=LGlobal.IS_MOUSE_DOWN;if(s.mode==LScrollbar.ALWAY_MODE){m=true;}else if(s.mode==LScrollbar.HIDE_MODE){m=false;}if(s._scroll_h){s._scroll_h.visible=s._scroll_h_bar.visible=m;}if(s._scroll_w){s._scroll_w.visible=s._scroll_w_bar.visible=m;}if(m){s.setScroll_h();s.setScroll_w();}}};LScrollbar.prototype.resizeWidth=function(value){var s=this,grd,grdb;if(!value){if(s._scroll_w!=null){s._scroll_w.parent.removeChild(s._scroll_w);s._scroll_w_bar.parent.removeChild(s._scroll_w_bar);s._scroll_w=null;s._scroll_w_bar=null;}return;}var i;if(s._scroll_w_bar==null){if(s._key==null){s._key=[];}s._scroll_w=new LSprite();s._scroll_w_bar=new LSprite();s.addChild(s._scroll_w);s.addChild(s._scroll_w_bar);var ny=s._scrollWidth*1.5;s._scroll_w.x=0;s._scroll_w.y=s._maskH;s._scroll_w_bar.x=s._scrollWidth;s._scroll_w_bar.y=s._maskH;grd=LGlobal.canvas.createLinearGradient(0,0,s._scrollWidth,0);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#008000");grdb=LGlobal.canvas.createLinearGradient(0,0,0,s._scrollWidth);grdb.addColorStop(0,"#FFFFFF");grdb.addColorStop(1,"#CCCCCC");if(s._ll_bar_select){s._ll_bar_select_w=s._ll_bar_select.clone();s._ll_bar_select_w.rotateCenter=false;s._ll_bar_select_w.x=s._selectHeight;s._ll_bar_select_w.rotate=90;s._scroll_w_bar.addChild(s._ll_bar_select_w);}else{s._scroll_w_bar.graphics.drawRoundRect(1,"#CCCCCC",[0,0,s._scrollWidth*1.5,s._scrollWidth,s._scrollWidth*0.5],true,grd);}if(s._ll_bar_back){s._ll_bar_back_w=s._ll_bar_back.clone();s._ll_bar_back_w.rotateCenter=false;s._ll_bar_back_w.x=s._maskW-s._scrollWidth;s._ll_bar_back_w.rotate=90;s._scroll_w.addChild(s._ll_bar_back_w);}else{s._scroll_w.graphics.drawRoundRect(1,"#CCCCCC",[s._scrollWidth,0,s._mask.getWidth()-s._scrollWidth*2,s._scrollWidth,s._scrollWidth*0.5],true,grdb);}if(s._ll_bar_back){s._ll_bar_arraw_left=s._ll_bar_arraw.clone();s._ll_bar_arraw_left.rotateCenter=false;s._ll_bar_arraw_left.y=s._scrollWidth;s._ll_bar_arraw_left.rotate=-90;s._scroll_w.addChild(s._ll_bar_arraw_left);}else{s._scroll_w.graphics.drawRect(0,"#000000",[0,0,s._scrollWidth,s._scrollWidth]);s._scroll_w.graphics.drawVertices(1,"#CCCCCC",[[s._scrollWidth*0.75,s._scrollWidth*0.25],[s._scrollWidth*0.75,s._scrollWidth*0.75],[s._scrollWidth*0.25,s._scrollWidth*0.5]],true,grd);}if(s._ll_bar_back){s._ll_bar_arraw_left=s._ll_bar_arraw.clone();s._ll_bar_arraw_left.rotateCenter=false;s._ll_bar_arraw_left.x=s._maskW;s._ll_bar_arraw_left.rotate=90;s._scroll_w.addChild(s._ll_bar_arraw_left);}else{s._scroll_w.graphics.drawRect(0,"#000000",[s._mask.getWidth()-s._scrollWidth,0,s._scrollWidth,s._scrollWidth]);s._scroll_w.graphics.drawVertices(1,"#CCCCCC",[[s._mask.getWidth()-s._scrollWidth*0.75,s._scrollWidth*0.25],[s._mask.getWidth()-s._scrollWidth*0.75,s._scrollWidth*0.75],[s._mask.getWidth()-s._scrollWidth*0.25,s._scrollWidth*0.5]],true,grd);}if(LGlobal.mobile&&s.mode!=LScrollbar.ALWAY_MODE){return;}if(!s.hasEventListener(LMouseEvent.MOUSE_DOWN)){s.addEventListener(LMouseEvent.MOUSE_DOWN,s.mouseDown);}}};LScrollbar.prototype.resizeHeight=function(value){var s=this,grd,grdb;if(!value){if(s._scroll_h!=null){s._scroll_h.parent.removeChild(s._scroll_h);s._scroll_h_bar.parent.removeChild(s._scroll_h_bar);s._scroll_h=null;s._scroll_h_bar=null;}return;}var i;if(s._scroll_h_bar==null){if(s._key==null){s._key=[];}s._scroll_h=new LSprite();s._scroll_h_bar=new LSprite();s.addChild(s._scroll_h);s.addChild(s._scroll_h_bar);var ny=s._scrollWidth*1.5;s._scroll_h.x=s._maskW;s._scroll_h.y=0;s._scroll_h_bar.x=s._maskW;s._scroll_h_bar.y=s._scrollWidth;grd=LGlobal.canvas.createLinearGradient(0,0,s._scrollWidth*((LGlobal.mobile&&s.mode=="touch")?1:2),0);grd.addColorStop(0,"#FFFFFF");grd.addColorStop(1,"#008000");grdb=LGlobal.canvas.createLinearGradient(0,0,s._scrollWidth,0);grdb.addColorStop(0,"#FFFFFF");grdb.addColorStop(1,"#CCCCCC");if(s._ll_bar_select){s._scroll_h_bar.addChild(s._ll_bar_select);}else{s._scroll_h_bar.graphics.drawRoundRect(1,"#CCCCCC",[0,0,s._scrollWidth,s._scrollWidth*1.5,s._scrollWidth*0.5],true,grd);}if(s._ll_bar_back){s._ll_bar_back_h=s._ll_bar_back.clone();s._ll_bar_back_h.y=(s._mask.getHeight()-s._ll_bar_back_h.getHeight())*0.5;s._scroll_h.addChild(s._ll_bar_back_h);}else{s._scroll_h.graphics.drawRoundRect(1,"#CCCCCC",[0,s._scrollWidth,s._scrollWidth,s._mask.getHeight()-s._scrollWidth*2,s._scrollWidth*0.5],true,grdb);}if(s._ll_bar_back){s._ll_bar_arraw_up=s._ll_bar_arraw.clone();s._scroll_h.addChild(s._ll_bar_arraw_up);}else{s._scroll_h.graphics.drawRect(0,"#000000",[0,0,s._scrollWidth,s._scrollWidth]);s._scroll_h.graphics.drawVertices(1,"#CCCCCC",[[s._scrollWidth/4,s._scrollWidth*0.75],[s._scrollWidth/2,s._scrollWidth/4],[s._scrollWidth*0.75,s._scrollWidth*0.75]],true,grd);}if(s._ll_bar_back){s._ll_bar_arraw_down=s._ll_bar_arraw.clone();s._ll_bar_arraw_down.scaleY=-1;s._ll_bar_arraw_down.y=s._mask.getHeight();s._scroll_h.addChild(s._ll_bar_arraw_down);}else{s._scroll_h.graphics.drawRect(0,"#000000",[0,s._mask.getHeight()-s._scrollWidth,s._scrollWidth,s._scrollWidth]);s._scroll_h.graphics.drawVertices(1,"#CCCCCC",[[s._scrollWidth/4,s._mask.getHeight()-s._scrollWidth*0.75],[s._scrollWidth/2,s._mask.getHeight()-s._scrollWidth*0.25],[s._scrollWidth*0.75,s._mask.getHeight()-s._scrollWidth*0.75]],true,grd);}if(LGlobal.mobile&&s.mode!=LScrollbar.ALWAY_MODE){return;}if(!s.hasEventListener(LMouseEvent.MOUSE_DOWN)){s.addEventListener(LMouseEvent.MOUSE_DOWN,s.mouseDown);}}};LScrollbar.prototype.moveLeft=function(){var s=this;if(!s._key["Dkey"]&&s._showObject.x>=s._target.x){s._key["left"]=false;s.setScroll_w();return;}else if(s._showObject.x>=0){s._showObject.x=0;s._key["left"]=false;s.setScroll_w();return;}if(s._key["Dkey"]){s._speed=5;}s._showObject.x+=s._speed;s.setScroll_w();s.setSpeed();};LScrollbar.prototype.setScroll_h=function(){var s=this;var sy=(s._mask.getHeight()-s._scrollWidth*2-s._selectHeight)*s._showObject.y/(s._mask.getHeight()-s._showObject.getHeight());if(s._scroll_h_bar){s._scroll_h_bar.x=s._mask.getWidth();s._scroll_h_bar.y=s._scrollWidth+sy;}};LScrollbar.prototype.setScroll_w=function(){var s=this;var sx=(s._mask.getWidth()-s._scrollWidth*2-s._selectHeight)*s._showObject.x/(s._mask.getWidth()-s._showObject.getWidth());if(s._scroll_w_bar){s._scroll_w_bar.x=s._scrollWidth+sx;s._scroll_w_bar.y=s._mask.getHeight();}};LScrollbar.prototype.moveUp=function(){var s=this;if(!s._key["Dkey"]&&s._showObject.y>=s._target.y){s._key["up"]=false;s.setScroll_h();return;}else if(s._showObject.y>=0){s._showObject.y=0;s._key["up"]=false;s.setScroll_h();return;}if(s._key["Dkey"]){s._speed=5;}s._showObject.y+=s._speed;s.setScroll_h();s.setSpeed();};LScrollbar.prototype.moveDown=function(){var s=this;if(!s._key["Dkey"]&&s._showObject.y<=s._target.y){s._key["down"]=false;s.setScroll_h();return;}else if(s._showObject.y<=s._mask.getHeight()-s._showObject.getHeight()){s._showObject.y=s._mask.getHeight()-s._showObject.getHeight();s._key["down"]=false;s.setScroll_h();return;}if(s._key["Dkey"]){s._speed=5;}s._showObject.y-=s._speed;s.setScroll_h();s.setSpeed();};LScrollbar.prototype.getScrollY=function(){return this._showObject.y;};LScrollbar.prototype.setScrollY=function(value){var s=this;s._showObject.y=s._mask.getHeight()-s._showObject.getHeight();if(s._showObject.y<-value){s._showObject.y=-value;}else if(value<0){s._showObject.y=0;}this.setScroll_h();};LScrollbar.prototype.getScrollX=function(){return this._showObject.x;};LScrollbar.prototype.setScrollX=function(value){this._showObject.x=value;this.setScroll_w();};LScrollbar.prototype.scrollToTop=function(){this._showObject.y=0;this.setScroll_h();};LScrollbar.prototype.scrollToBottom=function(){var s=this,h1=s._showObject.getHeight(),h2=s._mask.getHeight();s._showObject.y=h1>h2?h2-h1:0;s.setScroll_h();};LScrollbar.prototype.scrollToLeft=function(){this._showObject.x=0;this.setScroll_w();};LScrollbar.prototype.scrollToRight=function(){var s=this,w1=s._showObject.getWidth(),w2=s._mask.getWidth();s._showObject.x=w1>w2?w2-w1:0;s.setScroll_w();};LScrollbar.prototype.moveRight=function(){var s=this;if(!s._key["Dkey"]&&s._showObject.x<=s._target.x){s._key["right"]=false;s.setScroll_w();return;}else if(s._showObject.x<=s._mask.getWidth()-s._showObject.getWidth()){s._showObject.x=s._mask.getWidth()-s._showObject.getWidth();s._key["right"]=false;s.setScroll_w();return;}if(s._key["Dkey"]){s._speed=5;}s._showObject.x-=s._speed;s.setScroll_w();s.setSpeed();};LScrollbar.prototype.mouseUp=function(event){};LScrollbar.prototype.mouseDown=function(event){var s=event.clickTarget;if(s._scroll_h!=null&&event.selfX>=s._scroll_h.x&&event.selfX<=s._scroll_h.x+s._scrollWidth){s.mouseDownH(event,s);}if(s._scroll_w!=null&&event.selfY>=s._scroll_w.y&&event.selfY<=s._scroll_w.y+s._scrollWidth){s.mouseDownW(event,s);}};LScrollbar.prototype.mouseMoveH=function(event){var s=event.clickTarget;if(event.selfY<s._scrollWidth||event.selfY>s._mask.getHeight()){return;}var mx=event.selfY-s._key["scroll_y"];s._key["up"]=false;s._key["down"]=false;s._target.y=(s._mask.getHeight()-s._showObject.getHeight())*(mx-s._scrollWidth)/(s._mask.getHeight()-s._scrollWidth*3.5);if(s._target.y>s._showObject.y){s._key["up"]=true;}else{s._key["down"]=true;}s._speed=Math.abs(s._target.y-s._showObject.y);s.setSpeed();};LScrollbar.prototype.mouseUpH=function(event){var s=LGlobal.stage._ll_scrollbar;delete LGlobal.stage._ll_scrollbar;LGlobal.stage.removeEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);if(s._key["Dkey"]){s._key["Dkey"]=false;}else{s.removeEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveH);if(s._key["scroll_h"]){s._key["scroll_h"]=false;}}};LScrollbar.prototype.mouseUpW=function(event){var s=LGlobal.stage._ll_scrollbar;delete LGlobal.stage._ll_scrollbar;LGlobal.stage.removeEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);if(s._key["Dkey"]){s._key["Dkey"]=false;}else{s.removeEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveW);if(s._key["scroll_w"]){s._key["scroll_w"]=false;}}};LScrollbar.prototype.mouseMoveW=function(event){var s=event.clickTarget;if(event.selfX<s._scrollWidth||event.selfX>s._mask.getWidth()){return;}var my=event.selfX-s._key["scroll_x"];s._key["left"]=false;s._key["right"]=false;s._target.x=(s._mask.getWidth()-s._showObject.getWidth())*(my-s._scrollWidth)/(s._mask.getWidth()-s._scrollWidth*3.5);if(s._target.x>s._showObject.x){s._key["left"]=true;}else{s._key["right"]=true;}s._speed=Math.abs(s._target.x-s._showObject.x);s.setSpeed();};LScrollbar.prototype.setSpeed=function(){var s=this;s._speed=Math.floor(s._speed/2);if(s._speed==0){s._speed=1;}};LScrollbar.prototype.mouseDownW=function(event){var s=event.clickTarget;if(event.selfX>=0&&event.selfX<=s._scrollWidth){if(s._showObject.x>=0||s._key["left"]){return;}s._distance=10;if(s._showObject.x+s._distance>0){s._distance=s._showObject.x;}s._target.x=s._showObject.x+s._distance;s._key["left"]=true;s._key["right"]=false;s._key["Dkey"]=true;s._speed=s._distance;s.setSpeed();if(!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW)){LGlobal.stage._ll_scrollbar=s;LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);}}else if(event.selfX>=s._mask.getWidth()-s._scrollWidth&&event.selfX<=s._mask.getWidth()){if(s._showObject.x<=s._mask.getWidth()-s._showObject.getWidth()||s._key["left"]){return;}s._distance=10;if(s._showObject.x-s._distance<s._mask.getWidth()-s._showObject.getWidth()){s._distance=s._showObject.x-s._mask.getWidth()+s._showObject.getWidth();}s._target.x=s._showObject.x-s._distance;s._key["right"]=true;s._key["left"]=false;s._key["Dkey"]=true;s._speed=this._distance;s.setSpeed();if(!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW)){LGlobal.stage._ll_scrollbar=s;LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);}}else if(event.selfX>=s._scroll_w_bar.x&&event.selfX<=s._scroll_w_bar.x+s._scroll_w_bar.getWidth()&&!s._key["scroll_w"]){s._key["scroll_w"]=true;s._key["scroll_x"]=event.selfX-s._scroll_w_bar.x;s._key["mouseX"]=event.selfX;s.addEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveW);if(!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW)){LGlobal.stage._ll_scrollbar=s;LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);}}else if(event.selfX>0&&event.selfX<s._mask.getWidth()){s._key["left"]=false;s._key["right"]=false;s._target.x=(s._mask.getWidth()-s._showObject.getWidth())*(event.selfX-s._scrollWidth)/(s._mask.getWidth()-s._scrollWidth*3.5);if(s._target.x>s._showObject.x){s._key["left"]=true;}else{s._key["right"]=true;}s._speed=Math.abs(s._target.x-s._showObject.x);s.setSpeed();}};LScrollbar.prototype.mouseDownH=function(event){var s=event.clickTarget;if(event.selfY>=0&&event.selfY<=s._scrollWidth){if(s._showObject.y>=0){return;}s._distance=10;if(s._showObject.y+s._distance>0){s._distance=s._showObject.y;}s._target.y=s._showObject.y+s._distance;s._key["up"]=true;s._key["down"]=false;s._key["Dkey"]=true;s._speed=s._distance;s.setSpeed();if(!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH)){LGlobal.stage._ll_scrollbar=s;LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);}}else if(event.selfY>=s._mask.getHeight()-s._scrollWidth&&event.selfY<=s._mask.getHeight()){if(s._showObject.y<=s._mask.getHeight()-s._showObject.getHeight()){return;}s._distance=10;if(s._showObject.y-s._distance<s._mask.getHeight()-s._showObject.getHeight()){s._distance=s._showObject.y-s._mask.getHeight()+s._showObject.getHeight();}s._target.y=s._showObject.y-s._distance;s._key["down"]=true;s._key["up"]=false;s._key["Dkey"]=true;s._speed=s._distance;s.setSpeed();if(!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH)){LGlobal.stage._ll_scrollbar=s;LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);}}else if(event.selfY>=s._scroll_h_bar.y&&event.selfY<=s._scroll_h_bar.y+s._scroll_h_bar.getHeight()&&!s._key["scroll_h"]){s._key["scroll_h"]=true;s._key["scroll_y"]=event.selfY-s._scroll_h_bar.y;s._key["mouseY"]=event.selfY;s.addEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveH);if(!LGlobal.stage.hasEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH)){LGlobal.stage._ll_scrollbar=s;LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);}}else if(event.selfY>0&&event.selfY<s._mask.getHeight()){s._key["up"]=false;s._key["down"]=false;s._target.y=(s._mask.getHeight()-s._showObject.getHeight())*(event.selfY-s._scrollWidth)/(s._mask.getHeight()-s._scrollWidth*3.5);if(s._target.y>s._showObject.y){s._key["up"]=true;}else{s._key["down"]=true;}s._speed=Math.abs(s._target.y-s._showObject.y);s.setSpeed();}};return LScrollbar;})();var LWindow=(function(){function LWindow(){var s=this;LExtends(s,LSprite,[]);s.type="LWindow";var style;if(typeof arguments[0]=="object"){style=arguments[0];}else{style={width:arguments[0],height:arguments[1],title:arguments[2]};}s.style=style;s.w=style.width;s.h=style.height;if(style.header){if(style.header.type=="LBitmapData"){var bitmapBar=new LBitmap(style.header);var bar=new LSprite();bar.addChild(bitmapBar);s.bar=bar;}else{s.bar=style.header;}s.bar.w=s.bar.getWidth();s.bar.h=s.bar.getHeight();}else{s.bar=new LSprite();style.header=s.bar;s.bar.alpha=0.7;s.barColor="#0000FF";s.bar.w=s.w;s.bar.h=30;var barGrd=LGlobal.canvas.createLinearGradient(0,-s.bar.h*0.5,0,s.bar.h*2);barGrd.addColorStop(0,"#FFFFFF");barGrd.addColorStop(1,s.barColor);s.bar.graphics.drawRoundRect(1,s.barColor,[0,0,s.bar.w,s.bar.h,s.bar.h*0.1],true,barGrd);}s.addChild(s.bar);s.bar.addEventListener(LMouseEvent.MOUSE_DOWN,s._onBarDown);if(style.title&&typeof style.title=="object"&&style.title.type=="LTextField"){s.title=style.title;}else{s.title=new LTextField();if(style.font){s.title.font=style.font;}s.title.size=style.size?style.size:16;s.title.color=style.color?style.color:"#000000";s.title.text=style.title?style.title:"";}s.title.x=s.title.getHeight()*0.5;s.title.y=(s.bar.h-s.title.getHeight())*0.5;s.bar.addChild(s.title);if(style.closeButton){if(style.closeButton.type=="LBitmapData"){var bitmapClose=new LBitmap(style.closeButton);var closeButton=new LSprite();closeButton.addChild(bitmapClose);s.closeObj=closeButton;}else{s.closeObj=style.closeButton;}s.closeObj.x=s.w-s.closeObj.getWidth();}else{s.closeObj=new LSprite();style.closeButton=s.closeObj;s.closeObj.w=50;s.closeObj.h=25;s.closeObj.x=s.w-s.closeObj.w;var closeGrd=LGlobal.canvas.createLinearGradient(0,-s.closeObj.h*0.5,0,s.closeObj.h*2);closeGrd.addColorStop(0,"#FFFFFF");closeGrd.addColorStop(1,"#800000");s.closeObj.graphics.drawRoundRect(1,"#800000",[0,0,s.closeObj.w,s.closeObj.h,s.closeObj.h*0.1],true,closeGrd);s.closeObj.graphics.drawLine(4,"#FFFFFF",[15,5,s.closeObj.w-15,s.closeObj.h-5]);s.closeObj.graphics.drawLine(4,"#FFFFFF",[15,s.closeObj.h-5,s.closeObj.w-15,5]);}s.addChild(s.closeObj);s.closeObj.addEventListener(LMouseEvent.MOUSE_UP,s._onClose);s.layer=new LSprite();s.layer.y=s.bar.h;if(style.background){if(style.background.type=="LBitmapData"){var bitmapBackground=new LBitmap(style.background);var background=new LSprite();background.addChild(bitmapBackground);s.background=background;}else{s.background=style.background;}s.layer.h=s.background.getHeight();}else{s.layerColor="#FFFFFF";s.layer.h=s.h-s.bar.h;s.background=new LSprite();style.background=s.background;s.background.graphics.drawRect(1,s.barColor,[0,0,s.w,s.layer.h],true,s.layerColor);}s.background.y=s.bar.h;s.addChild(s.background);s.addChild(s.layer);var g=new LGraphics();g.rect(0,0,s.w,s.layer.h);s.layer.mask=g;s.addEventListener(LMouseEvent.MOUSE_UP,function(e){});s.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){});s.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){});s.addEventListener(LMouseEvent.MOUSE_OVER,function(e){});s.addEventListener(LMouseEvent.MOUSE_OUT,function(e){});}LWindow.CLOSE="close";LWindow.prototype.clone=function(){var s=this,a=new LWindow({width:s.style.width,height:s.style.height,title:s.style.title,header:s.style.header.clone(),closeButton:s.style.closeButton.clone(),background:s.style.background.clone()});var mask=a.layer.mask;a.removeChild(a.layer);a.layer=s.layer.clone();a.layer.mask=mask;a.addChild(a.layer);a.bar.addEventListener(LMouseEvent.MOUSE_DOWN,a._onBarDown);a.close.addEventListener(LMouseEvent.MOUSE_UP,a._onClose);return a;};LWindow.prototype._onClose=function(event){event.clickTarget.parent.close();};LWindow.prototype.close=function(){var s=this;s.dispatchEvent(LWindow.CLOSE);s.parent.removeChild(s);};LWindow.prototype._onBarDown=function(event){var s=event.clickTarget.parent;s.bar.addEventListener(LMouseEvent.MOUSE_UP,s._onBarUp);s.startDrag(event.touchPointID);};LWindow.prototype._onBarUp=function(event){var s=event.clickTarget.parent;s.stopDrag();s.bar.removeEventListener(LMouseEvent.MOUSE_UP,s._onBarUp);};return LWindow;})();function LTable(row,col,style){var s=this;base(s,LSprite,[]);s.type="LTable";s.row=row||0;s.col=col||0;if(!style)style={};if(!style.cellWidth)style.cellWidth=100;if(!style.cellHeight)style.cellHeight=30;if(!style.borderWidth)style.borderWidth=1;if(!style.borderColor)style.borderColor="black";if(!style.backgroundColor)style.backgroundColor="white";if(!style.selectColor)style.selectColor="#E0E0E0";if(!style.indentX)style.indentX=10;if(!style.indentY)style.indentY=10;s.style=style;s._tableSizeData=new Array();s._createTableData();s._isChange=true;s._createOriginalTable();s.addEventListener(LEvent.ENTER_FRAME,s._onDraw);}LTable.prototype.addRow=function(){var s=this;var t=s._tableSizeData;var st=s.style;var rowItem=new Array();var rowLayer=new LSprite();rowLayer.y=s.getHeight();s.addChild(rowLayer);var toX=0;var w=0,h=0;for(var i=0; i<s.col; i++){w=t[s.row-1][i].width,h=st.cellHeight;var upLayer=new LSprite();upLayer.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.backgroundColor);var overLayer=new LSprite();overLayer.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.selectColor);var colLayer=new LButton(upLayer,overLayer);colLayer.setCursorEnabled(false);colLayer.staticMode=true;colLayer.x=toX;rowLayer.addChild(colLayer);colLayer.child=new LSprite();colLayer.addChild(colLayer.child);var colItem={width:w,height:h,};rowItem.push(colItem);toX+=w;}t.push(rowItem);s.row++;};LTable.prototype.addCol=function(){var s=this;var t=s._tableSizeData;var st=s.style;var w=0,h=0;for(var i=0; i<s.row; i++){var rowLayer=s.getChildAt(i);w=st.cellWidth,h=t[i][s.col-1].height;var upLayer=new LSprite();upLayer.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.backgroundColor);var overLayer=new LSprite();overLayer.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.selectColor);var colLayer=new LButton(upLayer,overLayer);colLayer.setCursorEnabled(false);colLayer.staticMode=true;colLayer.x=rowLayer.getWidth();rowLayer.addChild(colLayer);colLayer.child=new LSprite();colLayer.addChild(colLayer.child);var colItem={width:w,height:h,};t[i].push(colItem);}s.col++;};LTable.prototype.setCell=function(child,row,col){var s=this;if(!child||!s.childList[row]||!s.childList[row].childList[col])return-1;s.childList[row].childList[col].child.addChild(child);var t=s._tableSizeData;if(child.getWidth()>=t[row][col].width){for(var i=0,l=t.length; i<l; i++){t[i][col].width=child.getWidth()+s.style.indentX*2;}}if(child.getHeight()>=t[row][col].height){for(var i=0,l=t[row].length; i<l; i++){t[row][i].height=child.getHeight()+s.style.indentY*2;}}};LTable.prototype._onDraw=function(e){var s=e.target;if(!s.childList.length>0)return;var st=s.style;var t=s._tableSizeData;var toY=0;for(var i=0; i<s.row; i++){var w=0,h=0;var rowLayer=s.getChildAt(i);rowLayer.y=toY;if(rowLayer.childList.length>0){var toX=0;for(var j=0; j<s.col; j++){w=t[i][j].width,h=t[i][j].height;var colLayer=rowLayer.getChildAt(j);if(w!=colLayer.getWidth()||h!=colLayer.getHeight()){colLayer.bitmap_up.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.backgroundColor);colLayer.bitmap_over.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.selectColor);}colLayer.x=toX;var child=colLayer.child;if(child){if(child.getWidth()>=w){for(var k=0,l=t.length; k<l; k++){t[k][j].width=child.getWidth()+s.style.indentX*2;}}if(child.getHeight()>=h){for(var k=0,l=t[row].length; k<l; k++){t[i][k].height=child.getHeight()+s.style.indentY*2;}}w=t[i][j].width,h=t[i][j].height;child.x=(w-child.getWidth())*0.5;child.y=(h-child.getHeight())*0.5;}toX+=w;}}toY+=h;}};LTable.prototype._createOriginalTable=function(){var s=this;var st=s.style;var t=s._tableSizeData;var toY=0;for(var i=0; i<s.row; i++){var w=0,h=0;var rowLayer=new LSprite();rowLayer.y=toY;s.addChild(rowLayer);var toX=0;for(var j=0; j<s.col; j++){w=t[i][j].width,h=t[i][j].height;var upLayer=new LSprite();upLayer.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.backgroundColor);var overLayer=new LSprite();overLayer.graphics.drawRect(st.borderWidth,st.borderColor,[0,0,w,h],true,st.selectColor);var colLayer=new LButton(upLayer,overLayer);colLayer.setCursorEnabled(false);colLayer.staticMode=true;colLayer.x=toX;rowLayer.addChild(colLayer);colLayer.child=new LSprite();colLayer.addChild(colLayer.child);toX+=w;}toY+=h;}};LTable.prototype._createTableData=function(){var s=this;for(var i=0; i<s.row; i++){var rowItem=new Array();for(var j=0; j<s.col; j++){var colItem={width:s.style.cellWidth,height:s.style.cellHeight,};rowItem.push(colItem);}s._tableSizeData.push(rowItem);}};function LTreeWidget(list,style){var s=this;base(s,LSprite,[]);s.list=list;if(!style){style={};}if(!style.textColor){style.textColor="black";}if(!style.textSize){style.textSize=11;}if(!style.textFont){style.textFont="Arial";}if(!style.textWeight){style.textWeight="normal";}if(!style.branchIndent){style.branchIndent=10;}if(!style.branchButtonColor){style.branchButtonColor="black";}s.style=style;s._branchBtnSize=style.textSize-1;s._createBranch(s,s,0,s.list);};LTreeWidget.BRANCH_OPEN="branch_open";LTreeWidget.BRANCH_CLOSE="branch_close";LTreeWidget.prototype._createBranch=function(layer,parentBranch,deep,list){var s=this;var toY=0;for(var i=0,l=list.length; i<l; i++){var item=list[i];var branchLayer=new LSprite();branchLayer.parentBranch=parentBranch;branchLayer.y=toY;layer.addChild(branchLayer);var textLayer=new LSprite();textLayer.x=s._branchBtnSize+5;branchLayer.addChild(textLayer);if(item.click){textLayer.addEventListener(LMouseEvent.MOUSE_UP,item.click);}var textObj=new LTextField();textObj.text=item.label;textObj.color=s.style.textColor;textObj.size=s.style.textSize;textObj.weight=s.style.textWeight;textObj.font=s.style.textFont;textLayer.addChild(textObj);if(item.branch&&item.branch.length>0){branchLayer.branch=new LSprite();branchLayer.branch.x=30;branchLayer.branch.y=branchLayer.getHeight()+s.style.branchIndent;branchLayer.branch.visible=false;branchLayer.addChild(branchLayer.branch);var branchBtn=new LSprite();branchBtn.root=s;branchBtn.status=LTreeWidget.BRANCH_CLOSE;branchBtn.y=(textLayer.getHeight()-s._branchBtnSize)/2;branchBtn.graphics.drawRect(0,"",[0,0,s._branchBtnSize,s._branchBtnSize]);branchBtn.graphics.drawVertices(0,"",[[0,0],[s._branchBtnSize,s._branchBtnSize/2],[0,s._branchBtnSize]],true,s.style.branchButtonColor);branchLayer.addChild(branchBtn);branchBtn.addEventListener(LMouseEvent.MOUSE_UP,s._openOrCloseBranch);s._createBranch(branchLayer.branch,branchLayer,deep+1,item.branch);}toY+=branchLayer.getHeight()+s.style.branchIndent;}};LTreeWidget.prototype._openOrCloseBranch=function(event){var branchBtn=event.currentTarget;var s=branchBtn.root;var branchLayer=branchBtn.parent;var p=branchLayer.parent;var currentBranchIndex=p.getChildIndex(branchLayer);if(branchBtn.status==LTreeWidget.BRANCH_CLOSE){branchLayer.branch.visible=true;branchBtn.graphics.clear();branchBtn.graphics.drawRect(0,"",[0,0,s._branchBtnSize,s._branchBtnSize]);branchBtn.graphics.drawVertices(0,"",[[0,0],[s._branchBtnSize,0],[s._branchBtnSize/2,s._branchBtnSize]],true,s.style.branchButtonColor);branchBtn.status=LTreeWidget.BRANCH_OPEN;}else{branchLayer.branch.visible=false;branchBtn.graphics.clear();branchBtn.graphics.drawRect(0,"",[0,0,s._branchBtnSize,s._branchBtnSize]);branchBtn.graphics.drawVertices(0,"",[[0,0],[s._branchBtnSize,s._branchBtnSize/2],[0,s._branchBtnSize]],true,s.style.branchButtonColor);branchBtn.status=LTreeWidget.BRANCH_CLOSE;}while(p.objectIndex!=s.parent.objectIndex){var toY=branchLayer.y;for(var i=currentBranchIndex; i<p.childList.length; i++){var currentBranch=p.childList[i];currentBranch.y=toY;toY+=currentBranch.getHeight()+s.style.branchIndent;}branchLayer=branchLayer.parentBranch;p=branchLayer.parent;currentBranchIndex=p.getChildIndex(branchLayer);}};var LListView=(function(){function LListView(){var self=this;base(self,LSprite,[]);var bitmapData=new LBitmapData(null,0,0,100,100,LBitmapData.DATA_CANVAS);self.bitmap=new LBitmap(bitmapData);self.addChild(self.bitmap);self.clipping=new LRectangle(0,0,100,100);self.clipping.parent=self;self.cellWidth=100;self.cellHeight=100;self.arrangement=LListView.Direction.Horizontal;self.movement=LListView.Direction.Vertical;self.dragEffect=LListView.DragEffects.MomentumAndSpring;self.centerOn=false;self.scrollBarVertical=new LListScrollBar();self.addChild(self.scrollBarVertical);self.scrollBarHorizontal=new LListScrollBar();self.addChild(self.scrollBarHorizontal);self.maxPerLine=1;self._ll_items=[];self._ll_x=Number.MAX_VALUE;self._ll_y=0;self.addEventListener(LEvent.ENTER_FRAME,self._ll_onframe);self.addEventListener(LMouseEvent.MOUSE_DOWN,self._ll_ondown);}LListView.PULL_TO_REFRESH="pull_to_refresh";LListView.DragEffects={None:"none",Momentum:"momentum",MomentumAndSpring:"momentumAndSpring"};LListView.Direction={Horizontal:"horizontal",Vertical:"vertical",Unrestricted:"unrestricted"};LListView.ScrollBarCondition={Always:"always",OnlyIfNeeded:"onlyIfNeeded",WhenDragging:"whenDragging"};LListView.prototype.setVerticalScrollBar=function(value){var self=this;self.scrollBarVertical.remove();self.scrollBarVertical=value;self.addChild(self.scrollBarVertical);self.scrollBarVertical.resizeHeight(self.clipping.height);};LListView.prototype.setHorizontalScrollBar=function(value){var self=this;self.scrollBarHorizontal.remove();self.scrollBarHorizontal=value;self.addChild(self.scrollBarHorizontal);self.scrollBarHorizontal.resizeWidth(self.clipping.width);};LListView.prototype.resize=function(w,h){var self=this;w=w>>>0;h=h>>>0;var bitmapData=self.bitmap.bitmapData;bitmapData.image.height=bitmapData.height=h;bitmapData.image.width=bitmapData.width=w;self.clipping.width=w;self.clipping.height=h;self.scrollBarVertical.x=self.clipping.width;self.scrollBarHorizontal.y=self.clipping.height;self.scrollBarVertical.resizeHeight(self.clipping.height);self.scrollBarHorizontal.resizeWidth(self.clipping.width);self.resizeScrollBar();};LListView.prototype._ll_ondown=function(event){var self=event.currentTarget;var dragObject=new LListViewDragObject(self,event.selfX,event.selfY);LGlobal.stage.addChild(dragObject);dragObject.startDrag(event.touchPointID);self.clickOnChild(event.selfX,event.selfY,"touch");};LListView.prototype.updateView=function(){var self=this;self._ll_x=Number.MAX_VALUE;};LListView.prototype.getItems=function(){return this._ll_items;};LListView.prototype.isInClipping=function(index){var self=this,x,y;if(self.arrangement==LListView.Direction.Horizontal){x=(index % self.maxPerLine)*self.cellWidth;y=(index/self.maxPerLine>>>0)*self.cellHeight;}else{x=(index/self.maxPerLine>>>0)*self.cellWidth;y=(index % self.maxPerLine)*self.cellHeight;}return self.clipping.x<=x&&self.clipping.x+self.clipping.width>x&&self.clipping.y<=y&&self.clipping.y+self.clipping.height>y;};LListView.prototype._ll_onframe=function(event){var self=event.currentTarget;if(self.clipping.x==self._ll_x&&self.clipping.y==self._ll_y){return;}self.bitmap.bitmapData.clear();var length=self._ll_items.length;var startX=self.clipping.x/self.cellWidth>>0;var startY=self.clipping.y/self.cellHeight>>0;var addX;var addY;addX=addY=1;if(self.arrangement==LListView.Direction.Horizontal){for(var i=0,l=Math.ceil(self.clipping.height/self.cellHeight)+addY; i<l; i++){var xIndex=(startY+i)*self.maxPerLine+startX;for(var j=0,jl=Math.ceil(self.clipping.width/self.cellWidth)+addX;j<self.maxPerLine&&j<jl; j++){var index=xIndex+j;if(index<0)continue;if(index>=length){break;}var item=self._ll_items[index];var x=(index % self.maxPerLine)*self.cellWidth;var y=(index/self.maxPerLine>>>0)*self.cellHeight;item.updateView(self.bitmap,new LRectangle(0,0,self.cellWidth,self.cellHeight),new LPoint(x-self.clipping.x,y-self.clipping.y));}}}else{for(var i=0,l=Math.ceil(self.clipping.width/self.cellWidth)+addX; i<l; i++){var yIndex=(startX+i)*self.maxPerLine+startY;for(var j=0,jl=Math.ceil(self.clipping.height/self.cellHeight)+addY;j<self.maxPerLine&&j<jl; j++){var index=yIndex+j;if(index<0)continue;if(index>=length){break;}var item=self._ll_items[index];var y=(index % self.maxPerLine)*self.cellHeight;var x=(index/self.maxPerLine>>>0)*self.cellWidth;item.updateView(self.bitmap,new LRectangle(0,0,self.cellWidth,self.cellHeight),new LPoint(x-self.clipping.x,y-self.clipping.y));}}}self.setScrollBarsPositon();self._ll_x=self.clipping.x;self._ll_y=self.clipping.y;};LListView.prototype.clickOnChild=function(selfX,selfY,type){var self=this;var x=self.clipping.x+selfX;var y=self.clipping.y+selfY;var index;if(self.arrangement==LListView.Direction.Horizontal){index=(y/self.cellHeight>>>0)*self.maxPerLine+(x/self.cellWidth>>>0);}else{index=(y/self.cellHeight>>>0)+(x/self.cellWidth>>>0)*self.maxPerLine;}if(index<self._ll_items.length){var child=self._ll_items[index];var event={currentTarget:self,target:child,offsetX:mouseX,offsetY:mouseY,selfX:(x % self.cellWidth),selfY:(y % self.cellHeight)};if(type=="touch"){child.onTouch(event);}else{child.onClick(event);}}};LListView.prototype.insertChildView=function(child,index){var self=this;if(typeof index==UNDEFINED){self._ll_items.push(child);}else{self._ll_items.splice(index,0,child);}self.resizeScrollBar();};LListView.prototype.clear=function(){var self=this;for(var i=0,l=self._ll_items.length; i<l; i++){self._ll_items[i].die();self._ll_items[i].removeAllChild();}self._ll_items.length=0;self.resizeScrollBar();};LListView.prototype.deleteChildView=function(child){var self=this,c=self._ll_items,i,l;for(i=0,l=c.length; i<l; i++){if(child.objectIndex==c[i].objectIndex){c[i].die();c[i].removeAllChild();self._ll_items.splice(i,1);break;}}self.resizeScrollBar();};LListView.prototype.updateList=function(list){var self=this;self._ll_items=list;self.resizeScrollBar();};LListView.prototype.setScrollBarsPositon=function(){var self=this;if(self.allWidth>0){self.scrollBarHorizontal.setX(self.clipping.x/self.allWidth);}if(self.allHeight>0){self.scrollBarVertical.setY(self.clipping.y/self.allHeight);}};LListView.prototype.dragStart=function(){var self=this;if(self.scrollBarHorizontal.showCondition==LListView.ScrollBarCondition.WhenDragging){self.scrollBarHorizontal.visible=true;}if(self.scrollBarVertical.showCondition==LListView.ScrollBarCondition.WhenDragging){self.scrollBarVertical.visible=true;}};LListView.prototype.dragEnd=function(){var self=this;if(self.scrollBarHorizontal.showCondition==LListView.ScrollBarCondition.WhenDragging){self.scrollBarHorizontal.visible=false;}if(self.scrollBarVertical.showCondition==LListView.ScrollBarCondition.WhenDragging){self.scrollBarVertical.visible=false;}};LListView.prototype.resizeScrollBar=function(){var self=this,scaleX,scaleY,w,h;var length=self._ll_items.length;if(self.arrangement==LListView.Direction.Horizontal){w=self.cellWidth*(length>self.maxPerLine?self.maxPerLine:length);h=self.cellHeight*Math.ceil(length/self.maxPerLine);}else{h=self.cellHeight*(length>self.maxPerLine?self.maxPerLine:length);w=self.cellWidth*Math.ceil(length/self.maxPerLine);}scaleX=self.clipping.width<w?self.clipping.width/w:1;scaleY=self.clipping.height<h?self.clipping.height/h:1;self.allWidth=w-self.clipping.width;self.allHeight=h-self.clipping.height;self.scrollBarHorizontal.setWidthScale(scaleX);self.setScrollBarVisible(self.scrollBarHorizontal,scaleX);self.scrollBarVertical.setHeightScale(scaleY);self.setScrollBarVisible(self.scrollBarVertical,scaleY);self.updateView();};LListView.prototype.setScrollBarVisible=function(bar,scale){if(bar.showCondition==LListView.ScrollBarCondition.Always){bar.visible=true;}else if(bar.showCondition==LListView.ScrollBarCondition.OnlyIfNeeded){if(scale>=1){bar.visible=false;}else{bar.visible=true;}}else{bar.visible=false;}};LListView.prototype.die=function(){var self=this;for(var i=0,l=self._ll_items.length;i<l;i++){self._ll_items[i].die();self._ll_items[i].removeAllChild();}self._ll_items=null;self.callParent("die",arguments);};return LListView;})();var LListScrollBar=(function(){function LListScrollBar(background,foreground,showCondition){var self=this;base(self,LSprite,[]);self.background=background?background:new LPanel("#333333",8,8);self.addChild(self.background);self.foreground=foreground?foreground:new LPanel("#CCCCCC",8,8);self.addChild(self.foreground);self.showCondition=showCondition?showCondition:LListView.ScrollBarCondition.OnlyIfNeeded;}LListScrollBar.prototype.resizeWidth=function(value){var self=this;self.background.cacheAsBitmap(false);self.background.resize(value,self.background.getSize().height);self.background.cacheAsBitmap(true);};LListScrollBar.prototype.resizeHeight=function(value){var self=this;self.background.cacheAsBitmap(false);self.background.resize(self.background.getSize().width,value);self.background.cacheAsBitmap(true);};LListScrollBar.prototype.setWidthScale=function(value){var self=this;self.foreground.cacheAsBitmap(false);self.foreground.resize(self.background.getSize().width*value,self.foreground.getSize().height);self.foreground.cacheAsBitmap(true);};LListScrollBar.prototype.setHeightScale=function(value){var self=this;self.foreground.cacheAsBitmap(false);self.foreground.resize(self.foreground.getSize().width,self.background.getSize().height*value);self.foreground.cacheAsBitmap(true);};LListScrollBar.prototype.setX=function(scaleX){var self=this;if(scaleX<0){scaleX=0;}else if(scaleX>1){scaleX=1;}self.foreground.x=(self.background.getSize().width-self.foreground.getSize().width)*scaleX;};LListScrollBar.prototype.setY=function(scaleY){var self=this;if(scaleY<0){scaleY=0;}else if(scaleY>1){scaleY=1;}self.foreground.y=(self.background.getSize().height-self.foreground.getSize().height)*scaleY;};return LListScrollBar;})();var LListChildView=(function(){function LListChildView(){var self=this;base(self,LSprite,[]);}LListChildView.prototype.die=function(){var self=this;self.cacheAsBitmap(false);self.removeAllChild();self.ll_baseBitmap=null;self.ll_baseRectangle=null;self.ll_basePoint=null;self._ll_cacheAsBitmap=null;self._canvas=null;self._context=null;self.callParent("die",arguments);};LListChildView.prototype.updateView=function(bitmap,rectangle,point){var self=this;if(!self._ll_cacheAsBitmap){self.cacheAsBitmap(true);}if(bitmap){self.ll_baseBitmap=bitmap;self.ll_baseRectangle=rectangle;self.ll_basePoint=point;}if(!self.ll_baseBitmap){return;}if(self.ll_basePoint.x>self.ll_baseBitmap.bitmapData.width||self.ll_basePoint.y>self.ll_baseBitmap.bitmapData.height||self.ll_basePoint.x+self.ll_baseRectangle.width<0||self.ll_basePoint.y+self.ll_baseRectangle.height<0){return;}if(!bitmap){var listView=self.ll_baseBitmap.parent;var index=-1,items=listView.getItems(),x,y;for(var i=0,l=items.length;i<l;i++){if(items[i]&&items[i].objectIndex==self.objectIndex){index=i;break;}}if(index<0){return;}if(listView.arrangement==LListView.Direction.Horizontal){x=(index % listView.maxPerLine)*listView.cellWidth;y=(index/listView.maxPerLine>>>0)*listView.cellHeight;}else{x=(index/listView.maxPerLine>>>0)*listView.cellWidth;y=(index % listView.maxPerLine)*listView.cellHeight;}var isIn=(listView.clipping.x<=x&&listView.clipping.x+listView.clipping.width>x&&listView.clipping.y<=y&&listView.clipping.y+listView.clipping.height>y);if(!isIn){return;}self.ll_basePoint.x=x-listView.clipping.x;self.ll_basePoint.y=y-listView.clipping.y;self.ll_baseBitmap.bitmapData.clear(new LRectangle(self.ll_basePoint.x,self.ll_basePoint.y,self.ll_baseRectangle.width,self.ll_baseRectangle.height));}self.ll_baseBitmap.bitmapData.copyPixels(self._ll_cacheAsBitmap.bitmapData,self.ll_baseRectangle,self.ll_basePoint);};LListChildView.prototype.onClick=function(event){};LListChildView.prototype.onTouch=function(event){};return LListChildView;})();var LListViewDragObject=(function(){function LListViewDragObject(listView,selfX,selfY){var self=this;base(self,LSprite,[]);self.graphics.drawRect(0,"#000000",[-10,-10,20,20]);self.listView=listView;self.sx=self.x=mouseX;self.sy=self.y=mouseY;self.vx=self.listView.clipping.x;self.vy=self.listView.clipping.y;self.pullToRefreshX=self.pullToRefreshY=0;var m=self.listView.getRootMatrix();self.needChangeToLocal=(m.b!=0||m.c!=0);self.vPoint=new LPoint(self.x,self.y);if(self.needChangeToLocal){self.vPoint=self.listView.globalToLocal(self.vPoint);}self.selfX=selfX;self.selfY=selfY;if(LGlobal.listViewDragObject){LGlobal.listViewDragObject.remove();}self.horizontalStop=true,self.verticalStop=true;if(listView.movement==LListView.Direction.Unrestricted){self.horizontalStop=self.verticalStop=false;}else if(listView.movement==LListView.Direction.Horizontal){self.horizontalStop=false;self.verticalStop=true;}else if(listView.movement==LListView.Direction.Vertical){self.horizontalStop=true;self.verticalStop=false;}listView.dragStart();LGlobal.listViewDragObject=self;self.addEventListener(LMouseEvent.MOUSE_UP,self._ll_onup);self.addEventListener(LEvent.ENTER_FRAME,self._ll_onframe);LGlobal.stage.addEventListener(LFocusEvent.FOCUS_OUT,self._ll_focusout);}LListViewDragObject.prototype._ll_onup=function(event){var self=event.currentTarget;self._ll_stop();};LListViewDragObject.prototype._ll_focusout=function(event){var self=LGlobal.listViewDragObject;if(self){self._ll_stop();}};LListViewDragObject.prototype._ll_stop=function(){var self=this;if(self.isDeleted){return;}var listView=self.listView;listView.dragEnd();self.stopDrag();self.isDeleted=true;if(Math.abs(mouseX-self.sx)<5&&Math.abs(mouseY-self.sy)<5){listView.clickOnChild(mouseX-self.sx+self.selfX,mouseY-self.sy+self.selfY);}if(listView.dragEffect==LListView.DragEffects.None){return;}var move=self.inertia();if(self.pullToRefreshX!=0||self.pullToRefreshY!=0){var event=new LEvent(LListView.PULL_TO_REFRESH);event.pullToRefreshX=self.pullToRefreshX;event.pullToRefreshY=self.pullToRefreshY;listView.dispatchEvent(event);}if(move){return;}self._ll_tween();};LListViewDragObject.prototype.inertia=function(){var self=this;var listView=self.listView;if(typeof self.fX==UNDEFINED){self.fX=listView.clipping.x;self.fY=listView.clipping.y;}var mx=listView.clipping.x-self.fX;var my=listView.clipping.y-self.fY;if(Math.abs(mx)<5){mx=0;}if(Math.abs(my)<5){my=0;}if(mx==0&&my==0){return false;}var tx=listView.clipping.x;var ty=listView.clipping.y;if(mx!=0){tx+=mx*5;}if(my!=0){ty+=my*5;}if(listView.dragEffect==LListView.DragEffects.Momentum){if(tx<0){tx=0;}else if(tx>listView.allWidth){tx=listView.allWidth;}if(ty<0){ty=0;}else if(ty>listView.allHeight){ty=listView.allHeight;}}LListViewDragObject.listToPosition(listView,tx,ty,self.tweenComplete);return true;};LListViewDragObject.prototype.tweenComplete=function(event){var self=event.target;LListViewDragObject.prototype.dragAmend.apply(self,[]);};LListViewDragObject.prototype._ll_tween=function(){var self=this;LListViewDragObject.listToPosition(self.listView,self.toX,self.toY);};LListViewDragObject.listToPosition=function(listView,tx,ty,tweenComplete){if(listView.centerOn){var centerX=-(listView.clipping.width % listView.cellWidth)/2;var centerY=-(listView.clipping.height % listView.cellHeight)/2;var px,py;if(tx % listView.cellWidth>listView.cellWidth*0.5){px=Math.ceil(tx/listView.cellWidth);}else{px=Math.floor(tx/listView.cellWidth);}if(ty % listView.cellHeight>listView.cellHeight*0.5){py=Math.ceil(ty/listView.cellHeight);}else{py=Math.floor(ty/listView.cellHeight);}tx=centerX+px*listView.cellWidth;ty=centerY+py*listView.cellHeight;}LTweenLite.to(listView.clipping,0.3,{x:tx,y:ty,ease:LEasing.Sine.easeOut,onComplete:tweenComplete});};LListViewDragObject.prototype._ll_onframe=function(event){var self=event.currentTarget;if(self.isDeleted){self.remove();LGlobal.listViewDragObject=null;return;}var listView=self.listView;self.fX=self.toX=listView.clipping.x;self.fY=self.toY=listView.clipping.y;self.nPoint=new LPoint(self.x,self.y);if(self.needChangeToLocal){self.nPoint=self.listView.globalToLocal(self.nPoint);}if(!self.horizontalStop){listView.clipping.x=self.vPoint.x-self.nPoint.x+self.vx;}if(!self.verticalStop){listView.clipping.y=self.vPoint.y-self.nPoint.y+self.vy;}LListViewDragObject.prototype.dragAmend.apply(self,[]);};LListViewDragObject.prototype.dragAmend=function(){var self=this,listView,dragObject=false;if(self.listView){listView=self.listView;dragObject=true;}else{listView=self.parent;}var tx=listView.clipping.x;var ty=listView.clipping.y;self.pullToRefreshX=self.pullToRefreshY=0;if(listView.clipping.x<0){if(!dragObject){tx=0;}else if(listView.dragEffect==LListView.DragEffects.MomentumAndSpring){listView.clipping.x*=0.5;self.toX=0;self.pullToRefreshX=listView.clipping.x-tx;}else{listView.clipping.x=0;}}else{var length=listView._ll_items.length,width;if(listView.arrangement==LListView.Direction.Horizontal){width=(length>listView.maxPerLine?listView.maxPerLine:length)*listView.cellWidth;}else{width=Math.ceil(length/listView.maxPerLine)*listView.cellWidth;}if(width<=listView.clipping.width){if(dragObject){listView.clipping.x=0;}else{tx=0;}}else if(listView.clipping.x>width-listView.clipping.width){if(!dragObject){tx=width-listView.clipping.width;}else if(listView.dragEffect==LListView.DragEffects.MomentumAndSpring){self.toX=width-listView.clipping.width;listView.clipping.x=self.toX+(listView.clipping.x-width+listView.clipping.width)*0.5;self.pullToRefreshX=listView.clipping.x-tx;}else{listView.clipping.x=width-listView.clipping.width;}}}if(listView.clipping.y<0){if(!dragObject){ty=0;}else if(listView.dragEffect==LListView.DragEffects.MomentumAndSpring){listView.clipping.y*=0.5;self.toY=0;self.pullToRefreshY=listView.clipping.y-ty;}else{listView.clipping.y=0;}}else{var length=listView._ll_items.length,height;if(listView.arrangement==LListView.Direction.Horizontal){height=Math.ceil(length/listView.maxPerLine)*listView.cellHeight;}else{height=(length>listView.maxPerLine?listView.maxPerLine:length)*listView.cellHeight;}if(height<=listView.clipping.height){if(dragObject){listView.clipping.y=0;}else{ty=0;}}else if(listView.clipping.y>height-listView.clipping.height){if(!dragObject){ty=height-listView.clipping.height;}else if(listView.dragEffect==LListView.DragEffects.MomentumAndSpring){self.toY=height-listView.clipping.height;listView.clipping.y=self.toY+(listView.clipping.y-height+listView.clipping.height)*0.5;self.pullToRefreshY=listView.clipping.y-ty;}else{listView.clipping.y=height-listView.clipping.height;}}}if(!dragObject&&(tx!=listView.clipping.x||ty!=listView.clipping.y)){LListViewDragObject.listToPosition(listView,tx,ty);}};return LListViewDragObject;})();

/** @language chinese
 * <p>lufylegend.js专用UI，list列表。</p>
 * <p>※此组件不可以添加LMouseEvent事件，如果需要使用点击事件，需要重写子项的onClick函数，具体做法参照 LListChildView。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListView
 * @constructor
 * @extends LSprite
 * @since 1.10.0
 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
 * @public
 */
var LListView = (function () {
	function LListView(){
		var self = this;
		base(self,LSprite,[]);
		/** @language chinese
		 * [只读]LListView列表的画布，为了提升LListView的效率，LListView的所有子项都会被draw到这个LBitmapData对象上，由LListView内部控制刷新，所以是只读属性，外部不可操作。
		 * @property bitmapData
		 * @type LBitmapData
		 * @since 1.10.0
		 * @public
		 */
		var bitmapData = new LBitmapData(null, 0, 0, 100, 100, LBitmapData.DATA_CANVAS);
		self.bitmap = new LBitmap(bitmapData);
		self.addChild(self.bitmap);
		self.clipping = new LRectangle (0, 0, 100, 100);
		self.clipping.parent = self;
		if(LGlobal.enableWebGL){
			self.childLayer = new LSprite();
			self.addChild(self.childLayer);
		}
		/** @language chinese
		 * LListView列表的可视范围，即大小。
		 * @property clipping
		 * @type LRectangle
		 * @default new LRectangle (0, 0, 100, 100)
		 * @since 1.10.0
		 * @public
		 */
		/** @language chinese
		 * 单位宽度
		 * @property cellWidth
		 * @type float
		 * @default 100
		 * @since 1.10.0
		 * @public
		 */
		self.cellWidth = 100;
		/** @language chinese
		 * 单位高度
		 * @property cellHeight
		 * @type float
		 * @default 100
		 * @since 1.10.0
		 * @public
		 */
		self.cellHeight = 100;
		/** @language chinese
		 * 子单位平铺方向（只能是LListView.Direction.Horizontal或者LListView.Direction.Vertical中的一个）
		 * @property arrangement
		 * @type LListView.Direction
		 * @default LListView.Direction.Horizontal
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_arrangement.html" target="_blank">测试链接</a></p>
		 */
		self.arrangement = LListView.Direction.Horizontal;
		/** @language chinese
		 * 可拖动的方向
		 * @property movement
		 * @type LListView.Direction
		 * @default LListView.Direction.Vertical
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_movement.html" target="_blank">测试链接</a></p>
		 */
		self.movement = LListView.Direction.Vertical;
		/** @language chinese
		 * 拖动时的效果
		 * @property dragEffect
		 * @type LListView.DragEffects
		 * @default LListView.DragEffects.MomentumAndSpring
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_DragEffects.html" target="_blank">测试链接</a></p>
		 */
		self.dragEffect = LListView.DragEffects.MomentumAndSpring;
		/** @language chinese
		 * 拖动子物体后保持一个子物体位于中心位置
		 * @property centerOn
		 * @type bool
		 * @default false
		 * @since 1.10.2
		 * @public
		 */
		self.centerOn = false;
		self.scrollBarVertical = new LListScrollBar();
		self.addChild(self.scrollBarVertical);
		self.scrollBarHorizontal = new LListScrollBar();
		self.addChild(self.scrollBarHorizontal);
		/** @language chinese
		 * <p>每行(列)的单位个数</p>
		 * <p>如果arrangement为LListView.Direction.Horizontal，则表示每行的单位个数</p>
		 * <p>如果arrangement为LListView.Direction.Vertical，则表示每列的单位个数</p>
		 * @property maxPerLine
		 * @type int
		 * @default 1
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_maxPerLine.html" target="_blank">测试链接</a></p>
		 */
		self.maxPerLine = 1;/*每组长度*/
		self._ll_items = [];
		self._ll_x = Number.MAX_VALUE;
		self._ll_y = 0;
		self.addEventListener(LEvent.ENTER_FRAME,self._ll_onframe);
		self.addEventListener(LMouseEvent.MOUSE_DOWN,self._ll_ondown);
	}
	LListView.PULL_TO_REFRESH = "pull_to_refresh";
	LListView.DragEffects = {
		None:"none",/*无效果*/
		Momentum:"momentum",/*拖动惯性*/
		MomentumAndSpring:"momentumAndSpring"/*拖动惯性+边界惯性*/
	};
	LListView.Direction = {
		Horizontal:"horizontal",/*水平*/
		Vertical:"vertical",/*垂直*/
		Unrestricted:"unrestricted"/*无限制*/
	};
	LListView.ScrollBarCondition = {
		Always:"always",
		OnlyIfNeeded:"onlyIfNeeded",
		WhenDragging:"whenDragging"
	};
	/** @language chinese
	 * 定义LListView 列表的垂直方向的滚动条。
	 * @method setVerticalScrollBar
	 * @param {LListScrollBar} scrollBar 滚动条
	 * @examplelink <p><a href="../../../api/ui/LListScrollBar.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.setVerticalScrollBar = function(value){
		var self = this;
		self.scrollBarVertical.remove();
		self.scrollBarVertical = value;
		self.addChild(self.scrollBarVertical);
		self.scrollBarVertical.resizeHeight(self.clipping.height);
	};
	/** @language chinese
	 * 定义LListView 列表的水平方向的滚动条。
	 * @method setHorizontalScrollBar
	 * @param {LListScrollBar} scrollBar 滚动条
	 * @examplelink <p><a href="../../../api/ui/LListScrollBar.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.setHorizontalScrollBar = function(value){
		var self = this;
		self.scrollBarHorizontal.remove();
		self.scrollBarHorizontal = value;
		self.addChild(self.scrollBarHorizontal);
		self.scrollBarHorizontal.resizeWidth(self.clipping.width);
	};
	/** @language chinese
	 * 设置LListView 列表的显示范围。
	 * @method resize
	 * @param {int} width 宽
	 * @param {int} height 高
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.resize = function(w, h){
		var self = this;
		w = w >>> 0;
		h = h >>> 0;
		var bitmapData = self.bitmap.bitmapData;
		bitmapData.image.height = bitmapData.height = h;
		bitmapData.image.width = bitmapData.width = w;
		self.clipping.width = w;
		self.clipping.height = h;
		self.scrollBarVertical.x = self.clipping.width;
		self.scrollBarHorizontal.y = self.clipping.height;
		self.scrollBarVertical.resizeHeight(self.clipping.height);
		self.scrollBarHorizontal.resizeWidth(self.clipping.width);
		self.resizeScrollBar();
	};
	LListView.prototype._ll_ondown = function(event){
		var self = event.currentTarget;
		var dragObject = new LListViewDragObject(self, event.selfX, event.selfY);
		LGlobal.stage.addChild(dragObject);
		dragObject.startDrag(event.touchPointID);
		self.clickOnChild(event.selfX, event.selfY, "touch");
	};
	/** @language chinese
	 * 刷新LListView 列表
	 * @method updateView
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.updateView = function(){
		var self = this;
		self._ll_x = Number.MAX_VALUE;
	};
	/** @language chinese
	 * 获取LListView 列表的所有子项。
	 * @method getItems
	 * @public
	 * @since 1.10.1
	 */
	LListView.prototype.getItems = function(){
		return this._ll_items;
	};
	/** @language chinese
	 * 判断LListView 列表的子项是否处于有效的显示范围之内。
	 * @method isInClipping
	 * @param {int} index 子项的索引号
	 * @public
	 * @since 1.10.1
	 */
	LListView.prototype.isInClipping = function(index){
		var self = this, x, y;
		if(self.arrangement == LListView.Direction.Horizontal){
			x = (index % self.maxPerLine) * self.cellWidth;
			y = (index / self.maxPerLine >>> 0) * self.cellHeight;
		}else{
			x = (index / self.maxPerLine >>> 0) * self.cellWidth;
			y = (index % self.maxPerLine) * self.cellHeight;
		}
		return self.clipping.x <= x && self.clipping.x + self.clipping.width > x && self.clipping.y <= y && self.clipping.y + self.clipping.height > y;
	};
	LListView.prototype._ll_onframe = function(event){
		var self = event.currentTarget;
		if(self.clipping.x == self._ll_x && self.clipping.y == self._ll_y){
			return;
		}
		if(LGlobal.enableWebGL){
			self.childLayer.x = -self.clipping.x;
			self.childLayer.y = -self.clipping.y;
			for(var i=0;i<self.childLayer.childList.length;i++){
				self.childLayer.childList[i].visible = false;
			}
		}else{
			self.bitmap.bitmapData.clear();
		}
		var length = self._ll_items.length;
		var startX = self.clipping.x / self.cellWidth >> 0;
		var startY = self.clipping.y / self.cellHeight >> 0;
		var addX;
		var addY;
		addX = addY = 1;
		if(self.arrangement == LListView.Direction.Horizontal){
			for(var i = 0, l = Math.ceil(self.clipping.height / self.cellHeight) + addY; i < l; i++){
				var xIndex = (startY + i) * self.maxPerLine + startX;
				for(var j = 0, jl = Math.ceil(self.clipping.width / self.cellWidth) + addX;j < self.maxPerLine && j < jl; j++){
					var index = xIndex + j;
					if(index < 0)continue;
					if(index >= length){
						break;
					}
					var item = self._ll_items[index];
					var x = (index % self.maxPerLine) * self.cellWidth;
					var y = (index / self.maxPerLine >>> 0) * self.cellHeight;
					item.updateView(self.bitmap, new LRectangle(0, 0, self.cellWidth, self.cellHeight), new LPoint(x - self.clipping.x, y - self.clipping.y));
				}
			}
		}else{
			for(var i = 0, l = Math.ceil(self.clipping.width / self.cellWidth) + addX; i < l; i++){
				var yIndex = (startX + i) * self.maxPerLine + startY;
				for(var j = 0, jl = Math.ceil(self.clipping.height / self.cellHeight) + addY;j < self.maxPerLine && j < jl; j++){
					var index = yIndex + j;
					if(index < 0)continue;
					if(index >= length){
						break;
					}
					var item = self._ll_items[index];
					var y = (index % self.maxPerLine) * self.cellHeight;
					var x = (index / self.maxPerLine >>> 0) * self.cellWidth;
					item.updateView(self.bitmap, new LRectangle(0, 0, self.cellWidth, self.cellHeight), new LPoint(x - self.clipping.x, y - self.clipping.y));
				}
			}
		}
		self.setScrollBarsPositon();
		self._ll_x = self.clipping.x;
		self._ll_y = self.clipping.y;
	};
	LListView.prototype.clickOnChild = function(selfX, selfY, type){
		var self = this;
		var x = self.clipping.x + selfX;
		var y = self.clipping.y + selfY;
		var index;
		if(self.arrangement == LListView.Direction.Horizontal){
			index = (y / self.cellHeight >>> 0) * self.maxPerLine + (x / self.cellWidth >>> 0);
		}else{
			index = (y / self.cellHeight >>> 0) + (x / self.cellWidth >>> 0) * self.maxPerLine;
		}
		if(index < self._ll_items.length){
			var child = self._ll_items[index];
			var event = {currentTarget:self,target:child,offsetX:mouseX,offsetY:mouseY,selfX:(x % self.cellWidth),selfY:(y % self.cellHeight)};
			if(type == "touch"){
				child.onTouch(event);
			}else{
				child.onClick(event);
			}
		}
	};
	/** @language chinese
	 * 为LListView 列表增加一个子项。
	 * @method insertChildView
	 * @param {LListChildView} child 单元子项
	 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.insertChildView = function(child, index){
		var self = this;
		if(LGlobal.enableWebGL){
			if(typeof index == UNDEFINED){
				self.childLayer.addChild(child);
			}else{
				self.childLayer.addChildAt(child, index);
			}
		}
		if(typeof index == UNDEFINED){
			self._ll_items.push(child);
		}else{
			self._ll_items.splice(index, 0, child);
		}
		self.resizeScrollBar();
	};
	/** @language chinese
	 * 删除LListView列表中的所有子项。
	 * @method clear
	 * @public
	 * @since 1.10.2
	 */
	LListView.prototype.clear = function() {
		var self = this;
		for (var i = 0, l = self._ll_items.length; i < l; i++) {
			self._ll_items[i].die();
			self._ll_items[i].removeAllChild();
		}
		self._ll_items.length = 0;
		self.resizeScrollBar();
	};
	/** @language chinese
	 * 从LListView 列表中删除一个子项。
	 * @method deleteChildView
	 * @param {LListChildView} child 单元子项
	 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.deleteChildView = function(child){
		var self = this, c = self._ll_items, i, l;
		for (i = 0, l = c.length; i < l; i++) {
			if (child.objectIndex == c[i].objectIndex) {
				c[i].die();
				c[i].removeAllChild();
				self._ll_items.splice(i, 1);
				break;
			}
		}
		self.resizeScrollBar();
	};
	/** @language chinese
	 * LListView 列表不可以添加LMouseEvent事件，如果需要使用点击事件，需要重写子项的onClick函数。
	 * @method updateList
	 * @param {Array} list 单元子项的数组
	 * @example
	 * 	var list = [new ListChildView()];
	 * 	var listView = new LListView();
	 * 	listView.updateList(list);
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.updateList = function(list){
		var self = this;
		self._ll_items = list;
		self.resizeScrollBar();
	};
	LListView.prototype.setScrollBarsPositon = function(){
		var self = this;
		if(self.allWidth > 0){
			self.scrollBarHorizontal.setX(self.clipping.x / self.allWidth);
		}
		if(self.allHeight > 0){
			self.scrollBarVertical.setY(self.clipping.y / self.allHeight);
		}
	};
	LListView.prototype.dragStart = function(){
		var self = this;
		if(self.scrollBarHorizontal.showCondition == LListView.ScrollBarCondition.WhenDragging){
			self.scrollBarHorizontal.visible = true;
		}
		if(self.scrollBarVertical.showCondition == LListView.ScrollBarCondition.WhenDragging){
			self.scrollBarVertical.visible = true;
		}
	};
	LListView.prototype.dragEnd = function(){
		var self = this;
		if(self.scrollBarHorizontal.showCondition == LListView.ScrollBarCondition.WhenDragging){
			self.scrollBarHorizontal.visible = false;
		}
		if(self.scrollBarVertical.showCondition == LListView.ScrollBarCondition.WhenDragging){
			self.scrollBarVertical.visible = false;
		}
	};
	LListView.prototype.resizeScrollBar = function(){
		var self = this, scaleX, scaleY, w, h;
		var length = self._ll_items.length;
		if(self.arrangement == LListView.Direction.Horizontal){
			w = self.cellWidth * (length > self.maxPerLine ? self.maxPerLine : length);
			h = self.cellHeight * Math.ceil(length / self.maxPerLine);
		}else{
			h = self.cellHeight * (length > self.maxPerLine ? self.maxPerLine : length);
			w = self.cellWidth * Math.ceil(length / self.maxPerLine);
		}
		scaleX = self.clipping.width < w ? self.clipping.width / w : 1;
		scaleY = self.clipping.height < h ? self.clipping.height / h : 1;
		self.allWidth = w - self.clipping.width;
		self.allHeight = h - self.clipping.height;
		self.scrollBarHorizontal.setWidthScale(scaleX);
		self.setScrollBarVisible(self.scrollBarHorizontal, scaleX);
		self.scrollBarVertical.setHeightScale(scaleY);
		self.setScrollBarVisible(self.scrollBarVertical, scaleY);
		self.updateView();
	};
	LListView.prototype.setScrollBarVisible = function(bar, scale){
		if(bar.showCondition == LListView.ScrollBarCondition.Always){
			bar.visible = true;
		}else if(bar.showCondition == LListView.ScrollBarCondition.OnlyIfNeeded){
			if(scale >= 1){
				bar.visible = false;
			}else{
				bar.visible = true;
			}
		}else{
			bar.visible = false;
		}
	};
	LListView.prototype.die = function(){
		var self = this;
		for (var i = 0, l = self._ll_items.length; i < l; i++) {
			self._ll_items[i].die();
			self._ll_items[i].removeAllChild();
		}
		self._ll_items.length = 0;
		self.callParent("die",arguments);
	};
	return LListView;
})();
/** @language chinese
 * <p>lufylegend.js专用UI，LListView 列表的专用滚动条。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListScrollBar
 * @constructor
 * @extends LSprite
 * @since 1.10.0
 * @param {LPanel} background 滚动条背景。
 * @param {LPanel} foreground 滚动条样式。
 * @param {LListView.ScrollBarCondition} showCondition 滚动条的种类。
 * @examplelink <p><a href="../../../api/ui/LListScrollBar.html" target="_blank">测试链接</a></p>
 * @public
 */
var LListScrollBar = (function () {
	function LListScrollBar(background, foreground, showCondition){
		var self = this;
		base(self,LSprite,[]);
		self.background = background ? background : new LPanel("#333333", 8, 8);
		self.addChild(self.background);
		self.foreground = foreground ? foreground : new LPanel("#CCCCCC", 8, 8);
		self.addChild(self.foreground);
		self.showCondition = showCondition ? showCondition : LListView.ScrollBarCondition.OnlyIfNeeded;
	}
	LListScrollBar.prototype.resizeWidth = function(value){
		var self = this;
		self.background.cacheAsBitmap(false);
		self.background.resize(value, self.background.getSize().height);
		self.background.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.resizeHeight = function(value){
		var self = this;
		self.background.cacheAsBitmap(false);
		self.background.resize(self.background.getSize().width, value);
		self.background.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.setWidthScale = function(value){
		var self = this;
		self.foreground.cacheAsBitmap(false);
		self.foreground.resize(self.background.getSize().width * value, self.foreground.getSize().height);
		self.foreground.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.setHeightScale = function(value){
		var self = this;
		self.foreground.cacheAsBitmap(false);
		self.foreground.resize(self.foreground.getSize().width, self.background.getSize().height * value);
		self.foreground.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.setX = function(scaleX){
		var self = this;
		if(scaleX < 0){
			scaleX = 0;
		}else if(scaleX > 1){
			scaleX = 1;
		}
		self.foreground.x = (self.background.getSize().width - self.foreground.getSize().width) * scaleX;
	};
	LListScrollBar.prototype.setY = function(scaleY){
		var self = this;
		if(scaleY < 0){
			scaleY = 0;
		}else if(scaleY > 1){
			scaleY = 1;
		}
		self.foreground.y = (self.background.getSize().height - self.foreground.getSize().height) * scaleY;
	};
	return LListScrollBar;
})();
/** @language chinese
 * <p>lufylegend.js专用UI，LListView 列表的一个单元子项。</p>
 * <p>在使用LListView的子项的时候，需要先从LListChildView继承。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListChildView
 * @constructor
 * @extends LSprite
 * @since 1.10.0
 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
 * @public
 */
var LListChildView = (function () {
	function LListChildView(){
		var self = this;
		base(self,LSprite,[]);
	}
	/** @language chinese
	 * 当LListView 列表的子项LListChildView内容有改变的时候，需要使用调用updateView来刷新，如果被改变的对象在LListView的可视范围以外的话，则无需刷新。
	 * @method updateView
	 * @examplelink <p><a href="../../../api/ui/LListView_onClick.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListChildView.prototype.die = function(){
		var self = this;
		self.cacheAsBitmap(false);
		self.removeAllChild();
		self.ll_baseBitmap = null;
		self.ll_baseRectangle = null;
		self.ll_basePoint = null;
		self._ll_cacheAsBitmap = null;
		self._canvas = null;
		self._context = null;
		self.callParent("die",arguments);
	};
	LListChildView.prototype.updateView = function(bitmap, rectangle, point){
		var self = this;
		if(!self._ll_cacheAsBitmap && !LGlobal.enableWebGL){
			self.cacheAsBitmap(true);
		}
		if(LGlobal.enableWebGL){
			self.mask = self.mask || new LSprite();
		}
		if(bitmap){
			self.ll_baseBitmap = bitmap;
			self.ll_baseRectangle = rectangle;
			self.ll_basePoint = point;
		}
		if(!self.ll_baseBitmap){
			return;
		}
		if(self.ll_basePoint.x > self.ll_baseBitmap.bitmapData.width || self.ll_basePoint.y > self.ll_baseBitmap.bitmapData.height || self.ll_basePoint.x + self.ll_baseRectangle.width < 0 || self.ll_basePoint.y + self.ll_baseRectangle.height < 0){
			return;
		}
		if(!bitmap){
			var listView = self.ll_baseBitmap.parent;
			var index = -1, items = listView.getItems(), x, y;
			for(var i=0,l=items.length;i<l;i++){
				if(items[i] && items[i].objectIndex == self.objectIndex){
					index = i;
					break;
				}
			}
			if(index < 0){
				return;
			}
			if(listView.arrangement == LListView.Direction.Horizontal){
				x = (index % listView.maxPerLine) * listView.cellWidth;
				y = (index / listView.maxPerLine >>> 0) * listView.cellHeight;
			}else{
				x = (index / listView.maxPerLine >>> 0) * listView.cellWidth;
				y = (index % listView.maxPerLine) * listView.cellHeight;
			}
			var isIn = (listView.clipping.x <= x && listView.clipping.x + listView.clipping.width > x && listView.clipping.y <= y && listView.clipping.y + listView.clipping.height > y);
			if(!isIn){
				return;
			}
			self.ll_basePoint.x = x - listView.clipping.x;
			self.ll_basePoint.y = y - listView.clipping.y;
			if(!LGlobal.enableWebGL){
				self.ll_baseBitmap.bitmapData.clear(new LRectangle(self.ll_basePoint.x, self.ll_basePoint.y, self.ll_baseRectangle.width, self.ll_baseRectangle.height));
			}
		}
		if(LGlobal.enableWebGL){
			var listView = self.ll_baseBitmap.parent;
			self.x = self.ll_basePoint.x;
			self.y = self.ll_basePoint.y;
			self.mask.graphics.clear();
			self.mask.graphics.drawRect(0, "#ff0000", 
			[Math.max(self.ll_basePoint.x, 0), Math.max(self.ll_basePoint.y, 0), 
				listView.clipping.x + listView.clipping.width - self.ll_basePoint.x, 
				listView.clipping.y + listView.clipping.height - self.ll_basePoint.y]);
			//[self.x + self.ll_baseRectangle.x, self.y + self.ll_baseRectangle.y, self.ll_baseRectangle.width, self.ll_baseRectangle.height]);
			self.visible = true;
			return;
		}
		self.ll_baseBitmap.bitmapData.copyPixels(self._ll_cacheAsBitmap.bitmapData, self.ll_baseRectangle, self.ll_basePoint);
	};
	/** @language chinese
	 * LListView 列表不可以添加LMouseEvent事件，如果需要使用点击事件，需要重写子项的onClick函数。
	 * @method onClick
	 * @param {Object} event {currentTarget:LListView对象,target:LListChildView自身,offsetX:同LMouseEvent,offsetY:同LMouseEvent,selfX:同LMouseEvent,selfY:同LMouseEvent}
	 * @example
	 * 	function MyListChildView(){
	 * 		var self = this;
	 * 		base(self,LListChildView,[]);
	 * 		//处理
	 * 	}
	 * 	MyListChildView.prototype.onClick = function(event){
	 * 		var self = event.target;
	 * 		//处理
	 * 	}
	 * @examplelink <p><a href="../../../api/ui/LListView_onClick.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListChildView.prototype.onClick = function(event){};
	LListChildView.prototype.onTouch = function(event){};
	return LListChildView;
})();
var LListViewDragObject = (function () {
	function LListViewDragObject(listView, selfX, selfY){
		var self = this;
		base(self,LSprite,[]);
		self.graphics.drawRect(0, "#000000", [-10, -10, 20, 20]);
		self.listView = listView;
		self.sx = self.x = mouseX;
		self.sy = self.y = mouseY;
		self.vx = self.listView.clipping.x;
		self.vy = self.listView.clipping.y;
		self.pullToRefreshX = self.pullToRefreshY = 0;
		var m = self.listView.getRootMatrix();
		self.needChangeToLocal = (m.b != 0 || m.c != 0);
		self.vPoint = new LPoint(self.x, self.y);
		if(self.needChangeToLocal){
			self.vPoint = self.listView.globalToLocal(self.vPoint);
		}
		self.selfX = selfX;
		self.selfY = selfY;
		if(LGlobal.listViewDragObject){
			LGlobal.listViewDragObject.remove();
		}
		self.horizontalStop = true, self.verticalStop = true;
		if(listView.movement == LListView.Direction.Unrestricted){
			self.horizontalStop = self.verticalStop = false;
		}else if(listView.movement == LListView.Direction.Horizontal){
			self.horizontalStop = false;
			self.verticalStop = true;
		}else if(listView.movement == LListView.Direction.Vertical){
			self.horizontalStop = true;
			self.verticalStop = false;
		}
		listView.dragStart();
		LGlobal.listViewDragObject = self;
		self.addEventListener(LMouseEvent.MOUSE_UP, self._ll_onup);
		self.addEventListener(LEvent.ENTER_FRAME,self._ll_onframe);
		LGlobal.stage.addEventListener(LFocusEvent.FOCUS_OUT, self._ll_focusout);
	}
	LListViewDragObject.prototype._ll_onup = function(event){
		var self = event.currentTarget;
		self._ll_stop();
	};
	LListViewDragObject.prototype._ll_focusout = function(event){
		var self = LGlobal.listViewDragObject;
		if(self){
			self._ll_stop();
		}
	};
	LListViewDragObject.prototype._ll_stop = function(){
		var self = this;
		if(self.isDeleted){
			return;
		}
		var listView = self.listView;
		listView.dragEnd();
		self.stopDrag();
		self.isDeleted = true;
		if(Math.abs(mouseX - self.sx) < 5 && Math.abs(mouseY - self.sy) < 5){
			listView.clickOnChild(mouseX - self.sx + self.selfX, mouseY - self.sy + self.selfY);
		}
		
		if(listView.dragEffect == LListView.DragEffects.None){
			return;
		}
		var move = self.inertia();
		if(self.pullToRefreshX != 0 || self.pullToRefreshY != 0){
			var event = new LEvent(LListView.PULL_TO_REFRESH);
			event.pullToRefreshX = self.pullToRefreshX;
			event.pullToRefreshY = self.pullToRefreshY;
			listView.dispatchEvent(event);
		}
		if(move){
			return;
		}
		self._ll_tween();
	};
	LListViewDragObject.prototype.inertia = function(){
		var self = this;
		var listView = self.listView;
		if(typeof self.fX == UNDEFINED){
			self.fX = listView.clipping.x;
			self.fY = listView.clipping.y;
		}
		var mx = listView.clipping.x - self.fX;
		var my = listView.clipping.y - self.fY;
		if(Math.abs(mx) < 5){
			mx = 0;
		}
		if(Math.abs(my) < 5){
			my = 0;
		}
		if(mx == 0 && my == 0){
			return false;
		}
		var tx = listView.clipping.x;
		var ty = listView.clipping.y;
		if(mx != 0){
			tx += mx * 5;
		}
		if(my != 0){
			ty += my * 5;
		}
		if(listView.dragEffect == LListView.DragEffects.Momentum){
			if(tx < 0){
				tx = 0;
			}else if(tx > listView.allWidth){
				tx = listView.allWidth;
			}
			if(ty < 0){
				ty = 0;
			}else if(ty > listView.allHeight){
				ty = listView.allHeight;
			}
		}
		LListViewDragObject.listToPosition(listView, tx, ty, self.tweenComplete);
		return true;
	};
	LListViewDragObject.prototype.tweenComplete = function(event){
		var self = event.target;
		LListViewDragObject.prototype.dragAmend.apply(self, []);
	};
	LListViewDragObject.prototype._ll_tween = function(){
		var self = this;
		LListViewDragObject.listToPosition(self.listView, self.toX, self.toY);
	};
	LListViewDragObject.listToPosition = function(listView, tx, ty, tweenComplete){
		if(listView.centerOn){
			var centerX = -(listView.clipping.width % listView.cellWidth) / 2;
			var centerY = -(listView.clipping.height % listView.cellHeight) / 2;
			var px, py;
			if(tx % listView.cellWidth > listView.cellWidth * 0.5){
				px = Math.ceil(tx / listView.cellWidth);
			}else{
				px = Math.floor(tx / listView.cellWidth);
			}
			if(ty % listView.cellHeight > listView.cellHeight * 0.5){
				py = Math.ceil(ty / listView.cellHeight);
			}else{
				py = Math.floor(ty / listView.cellHeight);
			}
			tx = centerX + px * listView.cellWidth;
			ty = centerY + py * listView.cellHeight;
		}
		LTweenLite.to(listView.clipping,0.3,{x:tx,y:ty,ease:LEasing.Sine.easeOut, onComplete:tweenComplete});
	};
	LListViewDragObject.prototype._ll_onframe = function(event){
		var self = event.currentTarget;
		if(self.isDeleted){
			self.remove();
			LGlobal.listViewDragObject = null;
			return;
		}
		var listView = self.listView;
		self.fX = self.toX = listView.clipping.x;
		self.fY = self.toY = listView.clipping.y;
		
		self.nPoint = new LPoint(self.x, self.y);
		if(self.needChangeToLocal){
			self.nPoint = self.listView.globalToLocal(self.nPoint);
		}
		if(!self.horizontalStop){
			listView.clipping.x = self.vPoint.x - self.nPoint.x + self.vx;
		}
		if(!self.verticalStop){
			listView.clipping.y = self.vPoint.y - self.nPoint.y + self.vy;
		}
		LListViewDragObject.prototype.dragAmend.apply(self, []);
	};
	LListViewDragObject.prototype.dragAmend = function(){
		var self = this, listView, dragObject = false;
		if(self.listView){
			listView = self.listView;
			dragObject = true;
		}else{
			listView = self.parent;
		}
		var tx = listView.clipping.x;
		var ty = listView.clipping.y;
		self.pullToRefreshX = self.pullToRefreshY = 0;
		if(listView.clipping.x < 0){
			if(!dragObject){
				tx = 0;
			}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
				listView.clipping.x *= 0.5;
				self.toX = 0;
				self.pullToRefreshX = listView.clipping.x - tx;
			}else{
				listView.clipping.x = 0;
			}
		}else{
			var length = listView._ll_items.length, width;
			if(listView.arrangement == LListView.Direction.Horizontal){
				width = (length > listView.maxPerLine ? listView.maxPerLine : length) * listView.cellWidth;
			}else{
				width = Math.ceil(length / listView.maxPerLine) * listView.cellWidth;
			}
			if(width <= listView.clipping.width){
				if(dragObject){
					listView.clipping.x = 0;
				}else{
					tx = 0;
				}
			}else if(listView.clipping.x > width - listView.clipping.width){
				if(!dragObject){
					tx = width - listView.clipping.width;
				}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
					self.toX = width - listView.clipping.width;
					listView.clipping.x = self.toX + (listView.clipping.x - width + listView.clipping.width) * 0.5;
					self.pullToRefreshX = listView.clipping.x - tx;
				}else{
					listView.clipping.x = width - listView.clipping.width;
				}
			}
		}
		if(listView.clipping.y < 0){
			if(!dragObject){
				ty = 0;
			}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
				listView.clipping.y *= 0.5;
				self.toY = 0;
				self.pullToRefreshY = listView.clipping.y - ty;
			}else{
				listView.clipping.y = 0;
			}
		}else{
			var length = listView._ll_items.length, height;
			if(listView.arrangement == LListView.Direction.Horizontal){
				height = Math.ceil(length / listView.maxPerLine) * listView.cellHeight;
			}else{
				height = (length > listView.maxPerLine ? listView.maxPerLine : length) * listView.cellHeight;
			}
			if(height <= listView.clipping.height){
				if(dragObject){
					listView.clipping.y = 0;
				}else{
					ty = 0;
				}
			}else if(listView.clipping.y > height - listView.clipping.height){
				if(!dragObject){
					ty = height - listView.clipping.height;
				}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
					self.toY = height - listView.clipping.height;
					listView.clipping.y = self.toY + (listView.clipping.y - height + listView.clipping.height) * 0.5;
					self.pullToRefreshY = listView.clipping.y - ty;
				}else{
					listView.clipping.y = height - listView.clipping.height;
				}
			}
		}
		if(!dragObject && (tx != listView.clipping.x || ty != listView.clipping.y)){
			LListViewDragObject.listToPosition(listView, tx, ty);
		}
	};
	return LListViewDragObject;
})();

var ll = {};
 //utils
ll.OS_PC = OS_PC;
ll.OS_IPHONE = OS_IPHONE;
ll.OS_IPOD = OS_IPOD;
ll.OS_IPAD = OS_IPAD;
ll.OS_ANDROID = OS_ANDROID;
ll.OS_WINDOWS_PHONE = OS_WINDOWS_PHONE;
ll.OS_BLACK_BERRY = OS_BLACK_BERRY;
ll.NONE = NONE;
ll.UNDEFINED = UNDEFINED;
ll.LANDSCAPE = LANDSCAPE;
ll.PORTRAIT = PORTRAIT;
ll.mouseX = mouseX;
ll.mouseY = mouseY;

ll.trace = trace;
ll.addChild = addChild;
ll.removeChild = removeChild;
ll.init = init;
ll.LInit = LInit;
ll.base = base;
ll.LExtends = LExtends;
ll.getTimer = getTimer;
ll.getExtension = getExtension;
ll.getTimer = getTimer;

ll.LStage = ll.LSystem = ll.LGlobal = LGlobal;
ll.LObject = LObject;
ll.LTimer = LTimer;

//events
ll.LAccelerometerEvent = LAccelerometerEvent;
ll.LEvent = LEvent;
ll.LEventDispatcher = LEventDispatcher;
ll.LFocusEvent = LFocusEvent;
ll.LKeyboardEvent = LKeyboardEvent;
ll.LMouseEvent = LMouseEvent;
ll.LMouseEventContainer = LMouseEventContainer;
ll.LTextEvent = LTextEvent;
ll.LTimerEvent = LTimerEvent;

//display
ll.FPS = FPS;
ll.LAnimation = LAnimation;
ll.LAnimationTimeline = LAnimationTimeline;
ll.LBitmap = LBitmap;
ll.LBitmapData = LBitmapData;
ll.LBlendMode = LBlendMode;
ll.LButton = LButton;
ll.LDisplayObject = LDisplayObject;
ll.LDisplayObjectContainer = LDisplayObjectContainer;
ll.LGraphics = LGraphics;
ll.LInteractiveObject = LInteractiveObject;
ll.LLoader = LLoader;
ll.LShape = LShape;
ll.LSprite = LSprite;
ll.LStageAlign = LStageAlign;
ll.LStageScaleMode = LStageScaleMode;

//filters
ll.LBitmapFilter = LBitmapFilter;
ll.LColorMatrixFilter = LColorMatrixFilter;
ll.LConvolutionFilter = LConvolutionFilter;
ll.LDropShadowFilter = LDropShadowFilter;

//geom
ll.LColorTransform = LColorTransform;
ll.LMatrix = LMatrix;
ll.LPoint = LPoint;
ll.LRectangle = LRectangle;
ll.LTransform = LTransform;
ll.LVec2 = LVec2;

//lib
if(typeof InteractivePNG !== UNDEFINED){
	ll.InteractivePNG = InteractivePNG;
}
ll.LBox2d = LBox2d;
ll.LFlash = LFlash;
if(typeof LoadingSample1 !== UNDEFINED){
	ll.LoadingSample1 = LoadingSample1;
	ll.LoadingSample2 = LoadingSample2;
	ll.LoadingSample3 = LoadingSample3;
	ll.LoadingSample4 = LoadingSample4;
	ll.LoadingSample5 = LoadingSample5;
	ll.LoadingSample6 = LoadingSample6;
	ll.LoadingSample7 = LoadingSample7;
}
ll.LQuadTree = LQuadTree;
ll.LString = LString;
ll.LTransition = LTransition;
ll.LIris = LIris;
ll.LTransitionManager = LTransitionManager;

if(typeof LButtonSample1 !== UNDEFINED){
ll.LButtonSample1 = LButtonSample1;
ll.LButtonSample2 = LButtonSample2;
ll.LCheckBox = LCheckBox;
ll.LComboBox = LComboBox;
ll.LListView = LListView;
ll.LListChildView = LListChildView;
ll.LMenubar = LMenubar;
ll.LMessageBox = LMessageBox;
ll.LPanel = LPanel;
ll.LRadioChild = LRadioChild;
ll.LRadio = LRadio;
ll.LRange = LRange;
ll.LScrollbar = LScrollbar;
ll.LTable = LTable;
ll.LTreeWidget = LTreeWidget;
ll.LWindow = LWindow;
}
//media
ll.LMedia = LMedia;
ll.LSound = LSound;
ll.LWebAudio = LWebAudio;
ll.LStageWebView = LStageWebView;
ll.LVideo = LVideo;

//net
ll.LAjax = LAjax;
ll.LFontLoader = LFontLoader;
ll.LURLLoader = LURLLoader;

//system
ll.LLoadManage = LLoadManage;

//text
ll.LStyleSheet = LStyleSheet;
ll.LTextField = LTextField;
ll.LTextFieldType = LTextFieldType;
ll.LTextFormat = LTextFormat;

//transitions
ll.LEasing = LEasing;
ll.LTweenLite = LTweenLite;

//ui
ll.LMultitouch = LMultitouch;
ll.LMultitouchInputMode = LMultitouchInputMode;

var lufylegend = ll;
let LClass = (function(){
	function LClass(_super, name, params){
		params = params || {};
		var Class = (function () {
			function Class () {
				LExtends(this, _super, arguments);
				for(let key in params){
					let value = params[key];
					if(typeof value === 'function'){
						continue;
					}
					this[key] = value;
				}
			}
			for(let key in params){
				let value = params[key];
				if(typeof value !== 'function'){
					continue;
				}
				Class.prototype[key] = value;
				/*if(_super.prototype[key]){
					Class.prototype[key] = function(){
						console.log(name + "Class key="+key + ", " + value);
						value.apply(this, arguments)
						return this.callParent(key,arguments);
					};
				}else{
					Class.prototype[key] = value;
				}*/
			}
			Class.prototype['_ll_className'] = name;
			return Class;
		})();
		ll[name] = Class;
		return Class;
	}
	return LClass;
})();
ll.LClass = LClass;
let LNode = (function () {
	function LNodeInit(node, data){
		if(!node._ll_isNode()){
			return;
		}
		node._initDataProperty(data);
		if(typeof node.init === 'function'){
			node.init();
		}
		node._initDataChildNodes(data);
	};
	function LNode () {
		LExtends(this, LSprite, []);
		this.type = "LNode";
	}
	LNode.create = function(data){
		let className = data.class;
		let node;
		if(typeof ll[className] !== 'function'){
			node = new LNode(data);
		}else{
			node = new ll[className](data);
		}
		LNodeInit(node, data);
		return node;
	};
	LNode.prototype._ll_className = "LNode";
	LNode.prototype._ll_isNode = function () {
		return true;
	};
	LNode.prototype._initDataProperty = function (data) {
		let property = data.property;
		if(!property){
			return;
		}
		for(let key in property){
			this[key] = property[key];
		}
	};
	LNode.prototype._initDataChildNodes = function (data) {
		if(!data.childNodes){
			return;
		}
		for(let childNode of data.childNodes){
			let className = childNode.class;
			if(typeof ll[className] !== 'function'){
				continue;
			}
			let child = new ll[className]();
			LNodeInit(child, childNode);
			this.addChild(child);
			if(child._ll_isNode()){
				if(typeof child.lateInit === 'function'){
					child.lateInit();
				}
			}
		}
	};
	return LNode;
})();
ll.LNode = LNode;

let LAtlas = (function () {
	function LAtlas () {
		LExtends(this, LEventDispatcher, []);
		this.type = "LAtlas";
	};
	LAtlas._container = {};
	LAtlas.get = function (name){
		return LAtlas._container[name] || new LAtlas();
	};
	LAtlas.prototype.destroy = function () {
		delete LAtlas._container[name]
	};
	LAtlas.prototype.load = function (path, name) {
		let loadData = [
			{name:`${path}/${name}.png`,path:`${path}/${name}.png`},
			{name:`${path}/${name}.plist`,path:`${path}/${name}.plist`,type:"text"}
		];
		LLoadManage.load( 
			loadData,null,(datalist)=>{
				this._loadComplete(datalist, path, name);
			}
		);
	}
	LAtlas.prototype._loadComplete = function (datalist, path, name) {
		let resourcesPath = "resources/";
		let resourcesIndex = path.indexOf(resourcesPath);
		this._atlasKey = path.substring(resourcesIndex + resourcesPath.length) + "/" + name;
		LAtlas._container[this._atlasKey] = this;
		let texture = datalist[`${path}/${name}.png`];
		let xml = datalist[`${path}/${name}.plist`];
		this.set(xml, texture);
		let event = new LEvent(LEvent.COMPLETE);
		event.currentTarget = this;
		event.target = this;
		this.dispatchEvent(event);
	};
	LAtlas.prototype.set = function (xml, texture) {
		this._texture = texture;
		this._initData(xml);
	};
	LAtlas.prototype._initData = function (xml) {
		let parser = new DOMParser();
		this.xmlDom = parser.parseFromString(xml, 'text/xml');
		let plistDom = this.xmlDom.querySelector("plist").querySelector("dict");
		let children = plistDom.children;
		let frames;
		for(let i = 0;i < children.length; i++){
			let child = children[i];
			if(child.tagName === "key" && child.textContent === "frames"){
				frames = children[i + 1].children;
				break;
			}
		}
		this._textureData = {};
		for(let i = 0;i < frames.length; i+=2){
			let key = frames[i].textContent.replace(".png", "");
			let value = frames[i + 1];
			let data = this._getTextureData(value.children);
			this._textureData[key] = this._textureToSprite(data);
		}
	};
	LAtlas.prototype.getSprite = function (name) {
		return this._textureData[name];
	};
	LAtlas.prototype._textureToSprite = function (data) {
		let bitmapData = new LBitmapData(this._texture, data.frame[0][0], data.frame[0][1], data.frame[1][0], data.frame[1][1]);
		let bitmap = new LBitmap(bitmapData);
		if(data.rotated){
			bitmap.rotate = -90;
		}
		let sprite = new LSprite();
		sprite.addChild(bitmap);
		return sprite;
	};
	LAtlas.prototype._getTextureData = function (children) {
		let data = {};
		for(let i = 0;i < children.length; i+=2){
			let key = children[i].textContent;
			let tict = children[i + 1];
			let value = JSON.parse(tict.tagName === "string" ? tict.textContent.replace(/\{/g, "[").replace(/\}/g, "]") : tict.tagName);
			data[key] = value;
		}
		return data;
	};
	return LAtlas;
})();
ll.LAtlas = LAtlas;
