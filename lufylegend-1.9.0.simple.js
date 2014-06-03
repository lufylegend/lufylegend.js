/**
* lufylegend
* @version 1.9.0
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
STR_ZERO = "0",
NONE = "none",
SUPER = "super",
UNDEFINED = "undefined",
LANDSCAPE = "landscape",/*横向*/
PORTRAIT = "portrait",/*纵向*/
LAjax,LTweenLite,LLoadManage,p,mouseX,mouseY;
/*
 * LEvent.js
 **/
function LEvent(type){
	this.eventType = type;
};
LEvent.INIT = "init";
LEvent.COMPLETE = "complete";
LEvent.ENTER_FRAME = "enter_frame";
LEvent.WINDOW_RESIZE = "resize";
LEvent.SOUND_COMPLETE = "sound_complete";
LEvent.END_CONTACT = "endContact";
LEvent.PRE_SOLVE = "preSolve";
LEvent.POST_SOLVE = "postSolve";
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.currentTarget = null;
LEvent.addEventListener = function (n, t, f,b){
	if(b==null)b=false;
	if(n.addEventListener){
		n.addEventListener(t, f, b);
	}else if(n.attachEvent){
		n["e" + t + f] = f;
		n[t + f] = function(){n["e" + t + f]();};
		n.attachEvent("on" + t, n[t + f]);
	}
};
LEvent.removeEventListener = function (n, t, f,b){
	if(b==null)b=false;
	if(n.removeEventListener){
		n.removeEventListener(t, f, b);
	}else if(n.detachEvent){
		n["e" + t + f] = f;
		n[t + f] = function(){n["e" + t + f]();};
		n.detachEvent("on" + t, n[t + f]);
	}
};
/*
 * LMouseEvent.js
 **/
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

var LMultitouchInputMode = {"NONE":"none","GESTURE":"gesture","TOUCH_POINT":"touchPoint"};
var LMultitouch = function (){throw "LMultitouch cannot be instantiated";};
LMultitouch.inputMode = "none";
LMultitouch.touchs = [];

/*
 * LTextEvent.js
 **/
var LTextEvent = function (){throw "LTextEvent cannot be instantiated";};
LTextEvent.TEXT_INPUT = "textInput";
/*
 * LMouseEventContainer.js
 **/
function $LMouseEventContainer(){
	var s = this;
	s.dispatchAllEvent = false;
	s.mouseDownContainer = [];
	s.mouseUpContainer = [];
	s.mouseMoveContainer = [];
	s.mouseOverContainer = [];
	s.mouseOutContainer = [];
	s.mouseDblContainer = [];
	s.textFieldInputContainer = [];
};
$LMouseEventContainer.prototype = {
	pushInputBox:function(d){
		var s  = this,c = s.textFieldInputContainer;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex)return;
		}
		s.textFieldInputContainer.push(d);
	}
	,removeInputBox:function(d){
		var s  = this,c = s.textFieldInputContainer;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex){
				s.textFieldInputContainer.splice(i,1);
				break;
			}
		}
	}
	,addEvent:function(o,list,f){
		var s = this;
		list.push({container:o,listener:f});
	}
	,removeEvent:function(o,list,f){
		var s = this;
		for(var i=0,l=list.length;i<l;i++){
			if(list[i].container.objectIndex === o.objectIndex && (!f || list[i].listener == f)){
				list.splice(i,1);
				break;
			}
		}
	}
	,addMouseDownEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseDownContainer,f);
	}
	,addMouseUpEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseUpContainer,f);
	}
	,addMouseMoveEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseMoveContainer,f);
	}
	,addMouseOverEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseOverContainer,f);
	}
	,addMouseOutEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseOutContainer,f);
	}
	,addMouseDblEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseDblContainer,f);
	}
	,addMouseEvent:function(o,t,f){
		var s = this;
		if(t == LMouseEvent.MOUSE_DOWN){
			s.addMouseDownEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_UP){
			s.addMouseUpEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OVER){
			s.addMouseOverEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OUT){
			s.addMouseOutEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_MOVE){
			s.addMouseMoveEvent(o,f);
		}else{
			s.addMouseDblEvent(o,f);
		}
	}
	,hasEvent:function(o,list){
		for(var i=0,l=list.length;i<l;i++){
			if(list[i].container.objectIndex === o.objectIndex)return true;
		}
		return false;
	}
	,removeMouseDownEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseDownContainer,f);
	}
	,removeMouseUpEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseUpContainer,f);
	}
	,removeMouseMoveEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseMoveContainer,f);
	}
	,removeMouseOverEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseOverContainer,f);
	}
	,removeMouseOutEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseOutContainer,f);
	}
	,removeMouseDblEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseDblContainer,f);
	}
	,removeMouseEvent:function(o,t,f){
		var s = this;
		if(t == LMouseEvent.MOUSE_DOWN){
			s.removeMouseDownEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_UP){
			s.removeMouseUpEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OVER){
			s.removeMouseOverEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OUT){
			s.removeMouseOutEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_MOVE){
			s.removeMouseMoveEvent(o,f);
		}else{
			s.removeMouseDblEvent(o,f);
		}
	}
	,dispatchMouseEvent:function(event,type){
		var s = this;
		if(type == LMouseEvent.MOUSE_DOWN){
			s.dispatchEvent(event,s.mouseDownContainer,LMouseEvent.MOUSE_DOWN);
			s.dispatchEvent(event,s.textFieldInputContainer);
		}else if(type == LMouseEvent.MOUSE_UP){
			s.dispatchEvent(event,s.mouseUpContainer,LMouseEvent.MOUSE_UP);
		}else if(type == LMouseEvent.DOUBLE_CLICK){
			s.dispatchEvent(event,s.mouseDblContainer,LMouseEvent.DOUBLE_CLICK);
		}else{
			s.dispatchEvent(event,s.mouseOutContainer,LMouseEvent.MOUSE_OUT);
			s.dispatchEvent(event,s.mouseOverContainer,LMouseEvent.MOUSE_OVER);
			s.dispatchEvent(event,s.mouseMoveContainer,LMouseEvent.MOUSE_MOVE);
		}
	}
    ,getRootParams:function(s){
		var p = s.parent,r = {x:0,y:0,scaleX:1,scaleY:1};
		while(p != "root"){
			r.x *= p.scaleX;
			r.y *= p.scaleY;
			r.x += p.x;
			r.y += p.y;
			r.scaleX *= p.scaleX;
			r.scaleY *= p.scaleY;
			p = p.parent;
		}
		return r;
    }
    ,_mouseEnabled:function(sp){
    	var self = this;
    	if(!sp || !sp.parent || sp.parent == "root"){
    		return false;
    	}
    	if(!sp.visible || (typeof sp.mouseEnabled != UNDEFINED && !sp.mouseEnabled)){
    		return false;
    	}
    	var p = sp.parent;
		while(p != "root"){
			if(!p.mouseEnabled || !p.mouseChildren)return false;
			p = p.parent;
			if(!p)return false;
		}
		return true;
    }
	,dispatchEvent:function(event,list,type){
		var self = this,sp,co,st=[],o,i,l;
		for(i=0,l=list.length;i<l;i++){
			sp = list[i].container || list[i];
			if(!self._mouseEnabled(sp))continue;
            co = self.getRootParams(sp);
            if(!type && sp.mouseEvent){
				sp.mouseEvent(event,LMouseEvent.MOUSE_DOWN,co);
            	continue;
            }
            if(sp.ismouseon(event,co)){
            	if(type == LMouseEvent.MOUSE_OUT){
            		continue;
            	}
            	if(type==LMouseEvent.MOUSE_OVER){
            		if(sp.ll_mousein){
            			continue;
            		}
            	}
            	if(type != LMouseEvent.MOUSE_UP){
            		sp.ll_mousein = true;
            	}
            	st.push({sp:sp,co:co,listener:list[i].listener});
            }else{
            	if(type != LMouseEvent.MOUSE_OUT && type != LMouseEvent.MOUSE_OVER){
            		continue;
            	}
            	if(!sp.ll_mousein){
            		continue;
            	}
            	sp.ll_mousein = false;
            	st.push({sp:sp,co:co,listener:list[i].listener});
            }
		}
		if(st.length == 0)return;
		if(st.length > 1){
			st = st.sort(self._sort);
		}
		l = self.dispatchAllEvent?st.length:1;
		for(i=0;i<l&&i<st.length;i++){
			o = st[i];
			event.currentTarget = event.clickTarget = o.sp;
			if (!event.target) {
				event.target = o.sp;
			}
			event.event_type = type;
			event.selfX = (event.offsetX - o.co.x - o.sp.x)/(o.co.scaleX*o.sp.scaleX);
			event.selfY = (event.offsetY - o.co.y - o.sp.y)/(o.co.scaleY*o.sp.scaleY);
			o.listener(event);
			if(l==1 && i<st.length-1 && o.sp.objectIndex == st[i+1].sp.objectIndex){
				st.splice(i,1);
				i--;
			}
		}
	}
	,set:function(t,v){
		LGlobal.mouseEventContainer[t] = v;
	}
	,_sort:function(a,b){
		var s = LMouseEventContainer,o1,o2;
		var al=s._getSort(a.sp),bl=s._getSort(b.sp);
		for(var i=0,l1=al.length,l2=bl.length;i<l1 && i<l2;i++){
			o1 = al[i],o2 = bl[i];
			if(o1.objectIndex == o2.objectIndex){
				continue;
			}
			return o2.parent.getChildIndex(o2) - o1.parent.getChildIndex(o1);
		}
		return bl.length - al.length;
	}
	,_getSort:function(layer){
		var p = layer.parent,list=[layer];
		while(p != "root"){
	        list.unshift(p);
			p = p.parent;
		}
		return list;
	}
};
var LMouseEventContainer = new $LMouseEventContainer();

/*
 * LKeyboardEvent.js
 **/
var LKeyboardEvent = function (){throw "LKeyboardEvent cannot be instantiated";};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PASS = "keypass";
/*
 * LAccelerometerEvent.js
 **/
var LAccelerometerEvent = function (){throw "LAccelerometerEvent cannot be instantiated";};
LAccelerometerEvent.DEVICEMOTION = "devicemotion";
/*
 * LMath.js
 **/
var LMath = {
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
function LStageScaleMode(){throw "LStageScaleMode cannot be instantiated";}
LStageScaleMode.EXACT_FIT = "exactFit";
LStageScaleMode.SHOW_ALL = "showAll";
LStageScaleMode.NO_BORDER = "noBorder";
LStageScaleMode.NO_SCALE = "noScale";
/*
 * LGlobal.js
 **/
var LGlobal = function (){throw "LGlobal cannot be instantiated";};
/*
设置全屏
*/
LGlobal.FULL_SCREEN="full_screen";
LGlobal.type = "LGlobal";
LGlobal.traceDebug = false;
LGlobal.aspectRatio = NONE;
LGlobal.script = null;
LGlobal.stage = null;
LGlobal.canvas = null;
LGlobal.width = 0;
LGlobal.height = 0;
LGlobal.box2d = null;
LGlobal.speed = 50;
LGlobal.IS_MOUSE_DOWN = false;
LGlobal.objectIndex = 0;
LGlobal.preventDefault = true;
LGlobal.childList = new Array();
LGlobal.dragList = new Array();
LGlobal.stageScale = "noScale";
LGlobal.align = "M";
LGlobal.canTouch = false;
LGlobal.os = OS_PC;
LGlobal.ios = false;
LGlobal.android = false;
LGlobal.android_new = false;
LGlobal.backgroundColor = null;
LGlobal.destroy = true;
LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
LGlobal.startTimer = 0;
LGlobal.mouseEventContainer = {};
LGlobal.keepClear = true;
LGlobal.top = 0;
LGlobal.left = 0;
LGlobal.window = window;
(function(n){
	LGlobal.isFirefox = (n.toLowerCase().indexOf('firefox') >= 0);
	if (n.indexOf(OS_IPHONE) > 0) {
		LGlobal.os = OS_IPHONE;
		LGlobal.canTouch = true;
		LGlobal.ios = true;
	}else if (n.indexOf(OS_IPOD) > 0) {
		LGlobal.os = OS_IPOD;
		LGlobal.canTouch = true;
		LGlobal.ios = true;
	}else if (n.indexOf(OS_IPAD) > 0) {
		LGlobal.os = OS_IPAD;
		LGlobal.ios = true;
		LGlobal.canTouch = true;
	}else if (n.indexOf(OS_ANDROID) > 0) {
		LGlobal.os = OS_ANDROID;
		LGlobal.canTouch = true;
		LGlobal.android = true;
		var i = n.indexOf(OS_ANDROID);
		if(parseInt(n.substr(i+8,1)) > 3){
			LGlobal.android_new = true;
		}
	}
})(navigator.userAgent);
LGlobal.setDebug = function (v){
	LGlobal.traceDebug = v; 
};
LGlobal.setCanvas = function (id,w,h){
	LGlobal.id = id;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div style="position:absolute;margin:0;padding:0;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">'+
	'<canvas id="' + LGlobal.id + '_canvas" style="margin:0;padding:0;width:'+w+'px;height:'+h+'px;">'+
	'<div id="noCanvas">'+
	"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>"+ 
	'</div>'+  
	'</canvas></div>'+
	'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0;padding:0;z-index:10;display:none;">'+
	'<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>'+
	'<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" />'+
	'<input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
	LGlobal.canvasObj = document.getElementById(LGlobal.id+"_canvas");
	LGlobal._canvas=document.createElement("canvas");
	LGlobal._context=LGlobal._canvas.getContext("2d");
	if(LGlobal._context){
		LGlobal.canvasObj.innerHTML="";
	}
	LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
	LGlobal.inputTextareaBoxObj = document.getElementById(LGlobal.id + '_InputTextareaBox');
	LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
	LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
	LGlobal.inputTextField = null;
	if(w){LGlobal.canvasObj.width = w;}
	if(h){LGlobal.canvasObj.height = h;}
	LGlobal.width = LGlobal.canvasObj.width;
	LGlobal.height = LGlobal.canvasObj.height;
	LGlobal.canvasStyleWidth = LGlobal.width;
	LGlobal.canvasStyleHeight = LGlobal.height;
	LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
	LGlobal.offsetX = 0;
	LGlobal.offsetY = 0;
	LGlobal.stage = new LSprite();
	LGlobal.stage.parent = "root";
	LGlobal.childList.push(LGlobal.stage);
	LGlobal.stage.baseAddEvent = LGlobal.stage.addEventListener;
	LGlobal.stage.baseRemoveEvent = LGlobal.stage.removeEventListener;
	LGlobal.stage.addEventListener = function(type,listener){
		if(type == LEvent.WINDOW_RESIZE){
			LGlobal.stage.onresizeListener = listener;
			LGlobal.stage.onresize = function(e){
				LGlobal.stage.onresizeEvent = e;
			};
			LEvent.addEventListener(LGlobal.window,type,LGlobal.stage.onresize);
		}else if(type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PASS){
			LEvent.addEventListener(LGlobal.window,type,listener);
		}else{
			LGlobal.stage.baseAddEvent(type,listener);
		}
	};
	LGlobal.stage.removeEventListener = function(type,listener){
		if(type == LEvent.WINDOW_RESIZE){
			LEvent.removeEventListener(LGlobal.window,LEvent.WINDOW_RESIZE,LGlobal.stage.onresize);
			delete LGlobal.stage.onresize;
			delete LGlobal.stage.onresizeListener;
		}else if(type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PASS){
			LEvent.removeEventListener(LGlobal.window,type,listener);
		}else{
			LGlobal.stage.baseRemoveEvent(type,listener);
		}
	};
	if(LSystem.sv == LStage.FULL_SCREEN){LGlobal.resize();}
	
	if(LGlobal.canTouch){
		LGlobal.ll_clicks = 0;
		LGlobal.ll_prev_clickTime = 0;
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START,function(event){
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField._ll_getValue();
			}
			var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left)+parseInt(LGlobal.canvasObj.style.marginLeft),
			canvasY = parseInt(STR_ZERO+LGlobal.object.style.top)+parseInt(LGlobal.canvasObj.style.marginTop),eve,k,i,eveIndex;
			if(LMultitouch.inputMode == LMultitouchInputMode.NONE){
				eveIndex = 0;
			}else if(LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT){
				eveIndex = event.touches.length - 1;
			}
			eve = {offsetX:(event.touches[eveIndex].pageX - canvasX)
			,offsetY:(event.touches[eveIndex].pageY - canvasY)
			,touchPointID:event.touches[eveIndex].identifier};
			eve.offsetX = LGlobal.scaleX(eve.offsetX);
			eve.offsetY = LGlobal.scaleY(eve.offsetY);
			mouseX = LGlobal.offsetX = eve.offsetX;
			mouseY = LGlobal.offsetY = eve.offsetY;
			LMultitouch.touchs["touch"+eve.touchPointID] = eve;
			LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_DOWN);
			LGlobal.buttonStatusEvent = eve;
			var date = new Date();
			var clickTime = date.getTime();
			LGlobal.ll_clicks = (clickTime <= (LGlobal.ll_prev_clickTime + 500)) ? (LGlobal.ll_clicks + 1) : 1;
			LGlobal.ll_prev_clickTime = clickTime;
			if(LGlobal.ll_clicks === 2){
				LGlobal.mouseEvent(eve,LMouseEvent.DOUBLE_CLICK);
				LGlobal.ll_clicks = 0;
			}
			LGlobal.IS_MOUSE_DOWN = true;
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start){
				LGlobal.mouseJoint_start(eve);
			}
			LGlobal.touchHandler(event);
		});
		LEvent.addEventListener(document,LMouseEvent.TOUCH_END,function(event){
			var e,eve,k,i,l,h;
			if(LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT){
				for(k in LMultitouch.touchs){
					e = LMultitouch.touchs[k];
					h = false;
					for(i=0,l=event.touches.length;i<l;i++){
						if(event.touches[i].identifier == e.touchPointID){
							h = true;
							break;
						}
					}
					if(!h){
						eve = e;
						delete LMultitouch.touchs[k];
						break;
					}
				}
			}
			if(!eve){
				eve = {offsetX:LGlobal.offsetX,offsetY:LGlobal.offsetY};
			}
			LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_UP);
			LGlobal.touchHandler(event);
			LGlobal.IS_MOUSE_DOWN = false;
			LGlobal.buttonStatusEvent = null;
			if(LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
				LGlobal.box2d.mouseJoint = null;
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_MOVE,function(e){
			var cX = parseInt(STR_ZERO+LGlobal.object.style.left)+parseInt(LGlobal.canvasObj.style.marginLeft),
			cY = parseInt(STR_ZERO+LGlobal.object.style.top)+parseInt(LGlobal.canvasObj.style.marginTop),
			eve,l,ll=e.touches.length;
			if(LMultitouch.inputMode == LMultitouchInputMode.NONE){
				ll = 1;
			}
			for(i=0,l=e.touches.length;i<l && i<ll;i++){
				eve = {offsetX:(e.touches[i].pageX - cX),offsetY:(e.touches[i].pageY - cY),touchPointID:e.touches[i].identifier};
				eve.offsetX = LGlobal.scaleX(eve.offsetX);
				eve.offsetY = LGlobal.scaleY(eve.offsetY);
				mouseX = LGlobal.offsetX = eve.offsetX;
				mouseY = LGlobal.offsetY = eve.offsetY;
				if(LMultitouch.touchs["touch"+eve.touchPointID] && 
					LMultitouch.touchs["touch"+eve.touchPointID].offsetX == eve.offsetX && 
					LMultitouch.touchs["touch"+eve.touchPointID].offsetY == eve.offsetY){
					continue;	
				}
				LGlobal.buttonStatusEvent = eve;
				LMultitouch.touchs["touch"+eve.touchPointID] = eve;
				LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_MOVE);
			}
			LGlobal.touchHandler(e);
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_move){
				LGlobal.mouseJoint_move(eve);
			}
		});
	}else{
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.DOUBLE_CLICK,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {button:e.button};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.DOUBLE_CLICK);
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField._ll_getValue();
			}
			var event = {button:e.button};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_DOWN);
			LGlobal.IS_MOUSE_DOWN = true;
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start){
				LGlobal.mouseJoint_start(e);
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.buttonStatusEvent = event;
			mouseX = LGlobal.offsetX = event.offsetX;
			mouseY = LGlobal.offsetY = event.offsetY;
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_MOVE);
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(e.offsetX / LGlobal.box2d.drawScale, e.offsetY / LGlobal.box2d.drawScale));
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {button:e.button};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_UP);
			LGlobal.IS_MOUSE_DOWN = false;
			if(LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
				LGlobal.box2d.mouseJoint = null;
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_OUT);
			LGlobal.IS_MOUSE_DOWN = false;
		});
	}
} ;
LGlobal.touchHandler = function(e){
	e.stopPropagation();
	if(LGlobal.preventDefault)e.preventDefault();
	if(e.stopImmediatePropagation){
		e.stopImmediatePropagation();
	}
	return e;
};
LGlobal.mouseEvent = function(e,t){
	if(t == LMouseEvent.MOUSE_MOVE){
		LGlobal.dragHandler(e);
	}
	if(LGlobal.mouseEventContainer[t]){
		LMouseEventContainer.dispatchMouseEvent(e,t);
		return;
	}
	for(var k = LGlobal.childList.length - 1; k >= 0; k--) {
		if(LGlobal.childList[k].mouseEvent && LGlobal.childList[k].mouseEvent(e,t)){
			break;
		}
	}
};
LGlobal.dragHandler = function(e){
	var i,s,c,d = LGlobal.dragList;
	for(i = d.length - 1; i >= 0; i--) {
		s = d[i];
		if(LGlobal.canTouch && s.ll_touchPointID != e.touchPointID)continue;
		c = s.getAbsoluteScale();
		s.x = s.ll_dragStartX + (e.offsetX - s.ll_dragMX)*s.scaleX/c.scaleX;
		s.y = s.ll_dragStartY + (e.offsetY - s.ll_dragMY)*s.scaleY/c.scaleY;
		break;
	}
};
LGlobal.horizontalError = function(){
	var b = new LSprite(),c='#cccccc',d='#000000';
	b.graphics.drawRoundRect(4,c,[5,5,70,100,5]);
	b.graphics.drawRect(4,c,[30,15,20,10]);
	b.graphics.drawRoundRect(4,d,[125,25,100,70,5]);
	b.graphics.drawRect(4,d,[200,50,10,20]);
	b.graphics.drawRect(4,d,[80,50,20,20]);
	b.graphics.drawVertices(4,d,[[100,40],[120,60],[100,80]]);
	addChild(b);
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};
LGlobal.verticalError = function(){
	var b = new LSprite(),c='#cccccc',d='#000000';
	b.graphics.drawRoundRect(4,c,[5,25,100,70,5]);
	b.graphics.drawRect(4,c,[80,50,10,20]);
	b.graphics.drawRoundRect(4,d,[155,5,70,100,5]);
	b.graphics.drawRect(4,d,[180,15,20,10]);
	b.graphics.drawRect(4,d,[110,50,20,20]);
	b.graphics.drawVertices(4,d,[[130,40],[150,60],[130,80]]);
	addChild(b);
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};
LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
	if(LGlobal.stage.onresizeEvent){
		LGlobal.stage.onresizeListener(LGlobal.stage.onresizeEvent);
		delete LGlobal.stage.onresizeEvent;
	}
	if(LGlobal.box2d != null){
		LGlobal.box2d.ll_show();
		if(!LGlobal.traceDebug && LGlobal.keepClear){
			LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);
		}
	}else{
		if(LGlobal.keepClear){LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);}
		if(LGlobal.backgroundColor !== null){
			LGlobal.canvas.fillStyle=LGlobal.backgroundColor;
			LGlobal.canvas.fillRect(0,0,LGlobal.width,LGlobal.height);
		}
	}
	LGlobal.show(LGlobal.childList);
};
LGlobal.show = function(s){
	for(var i=0,l=s.length;i<l;i++){
		if(s[i] && s[i].ll_show)s[i].ll_show();
	}
};
LGlobal.divideCoordinate = function (w,h,row,col){
	var i,j,cw = w/col,ch = h/row,r = [];
	for(i=0;i<row;i++){
		var c=[];
		for(j=0;j<col;j++){
			c.push({x:cw*j,y:ch*i});
		}
		r.push(c);
	}
	return r;
};
LGlobal._create_loading_color = function(){
	var co = LGlobal.canvas.createRadialGradient(LGlobal.width/2, LGlobal.height, 0, LGlobal.width/2, 0, LGlobal.height);  
	co.addColorStop(0, "red");  
	co.addColorStop(0.3, "orange");  
	co.addColorStop(0.4, "yellow");  
	co.addColorStop(0.5, "green");  
	co.addColorStop(0.8, "blue");  
	co.addColorStop(1, "violet");  
	return co;
};
LGlobal.hitPolygon = function(list,x,y){
	var c = 0,p0 = list[0],b0x = x <= p0[0],b0y = y <= p0[1],i,l,p1,b1x,b1y;
	for(i=1,l=list.length;i<l+1;i++){
		p1 = list[i%l];
		b1x = (x <= p1[0]);
		b1y = (y <= p1[1]);
		if( b0y != b1y ){
			if( b0x == b1x ){
				if( b0x )c += (b0y ? -1 : 1);
			}else{
				if( x <= ( p0[0] + (p1[0] - p0[0]) * (y - p0[1] ) / (p1[1] - p0[1]) ) )c += (b0y ? -1 : 1);
			}
		}
		p0 = p1;
		b0x = b1x;
		b0y = b1y;
	}
	return 0 != c;
};
LGlobal.hitTestPolygon = function(p1,p2){
	var i,j,l,listA,normals,vecs,list=[[p1,[],[]],[p2,[],[]]];
	for(j=0;j<list.length;j++){
		listA = list[j][0],normals = list[j][1];
		for(i=0,l=listA.length;i<l;i++){
			list[j][2].push(new LVec2(listA[i][0],listA[i][1]));
			if(i<l-1){
				normals.push((new LVec2(listA[i+1][0] - listA[i][0],listA[i+1][1]-listA[i][1])).normL());
			}
		}
		normals.push((new LVec2(listA[0][0] - listA[l-1][0],listA[0][1]-listA[l-1][1])).normL());
	}
	for(j=0;j<list.length;j++){
		normals = list[j][1];
		for(i=0,l=normals.length;i<l;i++){
			var r1 = LVec2.getMinMax(list[0][2],normals[i]);
			var r2 = LVec2.getMinMax(list[1][2],normals[i]);
			if(r1.max_o<r2.min_o || r1.min_o>r2.max_o)return false;
		}
	}
	return true;
};
LGlobal.hitTestPolygonArc = function(vs,arc){
	if(LGlobal.hitPolygon(vs,arc[0],arc[1])){
		return true;
	}	
	var i,j,l,p1,p2,v1,v2,ext,inn,l2;
	for(i=0,l=vs.length;i<l;i++){
		j=i<l-1?i+1:0;
		p1 = vs[i],p2 = vs[j];
		v1 = new LVec2(arc[0]-p1[0],arc[1]-p1[1]),v2 = new LVec2(p2[0]-p1[0],p2[1]-p1[1]);
		l2 = v2.normalize();
		inn = LVec2.dot(v1,l2);
		if(inn <= 0){
			if(v1.x*v1.x + v1.y*v1.y < arc[3]){
				return true;
			}
		}else if(inn*inn < v2.x*v2.x + v2.y*v2.y){
			ext = LVec2.cross(v1,l2);
			if(ext*ext < arc[3]){
				return true;
			}
		}
	}
	return false;
};
LGlobal.hitTestArc = function(objA,objB,objAR,objBR){
	var rA = objA.getWidth()*0.5
	,rB = objB.getWidth()*0.5
	,xA = objA._startX?objA._startX():objA.startX()
	,xB = objB._startX?objB._startX():objB.startX()
	,yA = objA._startY?objA._startY():objA.startY()
	,yB = objB._startY?objB._startY():objB.startY();
	if(typeof objAR != UNDEFINED){
		xA += (rA - objAR);
		yA += (rA - objAR);
		rA = objAR;
	}
	if(typeof objBR != UNDEFINED){
		xB += (rB - objBR);
		yB += (rB - objBR);
		rB = objBR;
	}
	var disx = xA + rA - xB - rB
	,disy = yA + rA - yB - rB;
	return disx*disx + disy*disy < (rA + rB)*(rA + rB);
};
LGlobal.hitTestRect = function(objA,objB,vecA,vecB){
	var wA = objA.getWidth()
	,wB = objB.getWidth()
	,hA = objA.getHeight()
	,hB = objB.getHeight()
	,xA = objA._startX?objA._startX():objA.startX()
	,xB = objB._startX?objB._startX():objB.startX()
	,yA = objA._startY?objA._startY():objA.startY()
	,yB = objB._startY?objB._startY():objB.startY();
	if(typeof vecA != UNDEFINED){
		xA += (wA - vecA[0])*0.5;
		yA += (hA - vecA[1])*0.5;
		wA = vecA[0];
		hA = vecA[1];
	}
	if(typeof vecB != UNDEFINED){
		xB += (wB - vecB[0])*0.5;
		yB += (hB - vecB[1])*0.5;
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
LGlobal.setFrameRate = function(s){
	if(LGlobal.frameRate)clearInterval(LGlobal.frameRate);
	LGlobal.speed = s;
	LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
};
LGlobal.scaleX = function(v){
	return (v - LGlobal.left)*LGlobal.width/LGlobal.canvasStyleWidth;
};
LGlobal.scaleY = function(v){
	return (v - LGlobal.top)*LGlobal.height/LGlobal.canvasStyleHeight;
};
/*
将canvas缩放为规定大小
*/
LGlobal.setStageSize = function(w,h){
	w =  Math.ceil(w);
	h =  Math.ceil(h);
	LGlobal.canvasObj.style.width = w+"px";
	LGlobal.canvasObj.style.height = h+"px";
	LGlobal.canvasStyleWidth = w;
	LGlobal.canvasStyleHeight = h;
};
LGlobal.resize = function(){
	var w,h,t=0,l=0,ww=window.innerWidth,wh=window.innerHeight;
	if(LGlobal.stageScale == "noScale"){
		w = LGlobal.width;
		h = LGlobal.height;
	}
	switch(LGlobal.stageScale){
		case "exactFit":
			w = ww;
			h = wh;
			break;
		case "noBorder":
			w = ww;
			h = LGlobal.height*ww/LGlobal.width;
			break;
		case "showAll":
			if(ww/wh > LGlobal.width/LGlobal.height){
				h = wh;
				w = LGlobal.width*wh/LGlobal.height;
			}else{
				w = ww;
				h = LGlobal.height*ww/LGlobal.width;
			}
		case "noScale":
		default:
			switch(LGlobal.align){
				case LStageAlign.BOTTOM:
				case LStageAlign.BOTTOM_LEFT:
					t = wh - h;
					break;
				case LStageAlign.RIGHT:
				case LStageAlign.TOP_RIGHT:
					l = ww - w;
					break;
				case LStageAlign.TOP_MIDDLE:
					l = (ww - w)*0.5;
					break;
				case LStageAlign.BOTTOM_RIGHT:
					t = wh - h;
					l = ww - w;
					break;
				case LStageAlign.BOTTOM_MIDDLE:
					t = wh - h;
					l = (ww - w)*0.5;
					break;
				case LStageAlign.MIDDLE:
					t = (wh - h)*0.5;
					l = (ww - w)*0.5;
					break;
				case LStageAlign.TOP:
				case LStageAlign.LEFT:
				case LStageAlign.TOP_LEFT:
				default:
			}
			LGlobal.canvasObj.style.marginTop = t + "px";
			LGlobal.canvasObj.style.marginLeft = l + "px";
			if(LGlobal.isFirefox){
				LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
				LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
			}
	}
	LGlobal.setStageSize(w,h);
};
var LStage = LGlobal;

var LSystem = {
	sv:0,
	sleep:function(s){
		var d = new Date();   
		while((new Date().getTime()-d.getTime()) < s){}
	},
	screen:function(a){
		LSystem.sv = a;
		if(LGlobal.stage){LGlobal.resize();}
	}
};
/** @language chinese
 * PageProperty
 * @class 全局函数
 */

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

/** @language chinese
 * 您可以在测试环境下捕获来自 trace() 函数的输出并显示结果。如果 trace 语句中的任何参数包含 String 之外的数据类型，则 trace 函数将调用与该数据类型关联的 toString() 方法。例如，如果该参数是一个布尔值，则跟踪函数将调用 Boolean.toString() 并显示返回值。
 * @method trace
 * @param {Object} expression 要计算的表达式。expression 参数的值显示在"输出"面板中。
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @since 1.0.0
 * @public
*/
/** @language english
 * You can use Debug Mode to capture output from the trace() function and display the result. If any argument in a trace statement includes a data type other than a String, the trace function invokes the associated toString() method for that data type. For example, if the argument is a Boolean value the trace function invokes Boolean.toString() and displays the return value.
 * @method trace
 * @param {Object} expression An expression to evaluate. the value of the expression parameter is displayed in the Output panel.
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Debugモード を使用すると、trace() 関数の出力を取得し、その結果を表示できます。trace ステートメント内の引数に String 以外のデータ型が含まれる場合、trace 関数はそのデータ型に関連した toString() メソッドを呼び出します。たとえば、引数がブール値の場合、trace 関数は Boolean.toString() を呼び出して戻り値を表示します。
 * @method trace
 * @param {Object} expression 評価する式。expression パラメータの値が [出力] パネルに表示されます。
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @since 1.0.0
 * @public
 */
function trace() {
	if (!LGlobal.traceDebug) return;
	var t = document.getElementById("traceObject"), i;
	if (trace.arguments.length > 0 && t == null) {
		t = document.createElement("TEXTAREA");
		t.id = "traceObject";
		t.style.position = "absolute";
		t.style.top = (LGlobal.height + 20) + "px";
		t.style.width = LGlobal.width + "px";
		t.style.height = "200px";
		document.body.appendChild(t);
	}
	for (i = 0; i < trace.arguments.length; i++) {
		t.value = t.value + trace.arguments[i] + "\r\n";
		t.scrollTop = t.scrollHeight;
	}
}

/** @language chinese
 * 将一个 DisplayObject 子实例添加到Stage。
 * @method addChild
 * @param {LDisplayObject} child 要添加的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language english
 * Adds a child DisplayObject instance to the Stage.
 * @method addChild
 * @param {Object} expression The DisplayObject instance that you pass in the child parameter.
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Stageに子 DisplayObject インスタンスを追加します。
 * @method addChild
 * @param {Object} expression 追加される DisplayObject インスタンスです。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * @since 1.0.0
 * @public
 */
function addChild (o) {
	LGlobal.stage.addChild(o);
}

/** @language chinese
 * 从 Stage 实例的子列表中删除指定的 child DisplayObject 实例。
 * @method removeChild
 * @param {LDisplayObject} child 要删除的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language english
 * Removes the specified child DisplayObject instance from the child list of the Stage instance. 
 * @method removeChild
 * @param {Object} expression The DisplayObject instance to remove.
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Stage インスタンスの子リストから指定の child DisplayObject インスタンスを削除します。
 * @method removeChild
 * @param {Object} expression 削除する DisplayObject インスタンスです。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
function removeChild (o) {
	LGlobal.stage.removeChild(o);
}

/** @language chinese
 * 引擎初始化函数。别名init
 * @method Linit
 * @param {Number} speed 游戏速度设定,每次页面刷新间隔（单位毫秒）。
 * @param {String} divid 传入一个div的id，库件进行初始化的时候，会自动将canvas加入到此div内部。
 * @param {int} width 游戏界面宽。
 * @param {int} height 游戏界面高。
 * @param {Function} callback 游戏初始化后，调用此函数。
 * @param {String} type 当为null时，会先进行页面的onload操作，如果你的init函数调用是在onload之后，那么需要将此参数设为LEvent.INIT。
 * @example
 * 	<!DOCTYPE html>
 * 	<html>
 * 	<head>
 * 	<meta charset="UTF-8">
 * 	<title>demo</title>
 * 	</head>
 * 	<body>
 * 	<div id="mylegend">loading……</div>
 * 	<script type="text/javascript" src="../lufylegend-x.x.x.min.js"></script> 
 * 	<script>
 * 	Linit(50,"mylegend",800,480,main);
 * 	function main(){
 * 	    alert("感谢您使用lufylegend库件");
 * 	}
 * 	</script>
 * 	</body>
 * 	</html>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Removes the specified child DisplayObject instance from the child list of the Stage instance. 
 * @method Linit
 * @param {Object} expression The DisplayObject instance to remove.
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Stage インスタンスの子リストから指定の child DisplayObject インスタンスを削除します。
 * @method Linit
 * @param {Object} expression 削除する DisplayObject インスタンスです。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
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
	if (t != null && t == LEvent.INIT) {
		LGlobal.frameRate = setInterval(function () {
			LGlobal.onShow();
		}, s);
		LGlobal.setCanvas(c, w, h);
		_f();
	}else{
		LEvent.addEventListener(window, "load", function () {
			LGlobal.frameRate = setInterval(function () {
				LGlobal.onShow();
			}, s);
			LGlobal.setCanvas(c, w, h);
			_f();
		});
	}
}
var LInit = init;

/** @language chinese
 * 从 Stage 实例的子列表中删除指定的 child DisplayObject 实例。
 * @method Lextends
 * @param {LDisplayObject} child 要删除的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language english
 * Removes the specified child DisplayObject instance from the child list of the Stage instance. 
 * @method Lextends
 * @param {Object} expression The DisplayObject instance to remove.
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Stage インスタンスの子リストから指定の child DisplayObject インスタンスを削除します。
 * @method Lextends
 * @param {Object} expression 削除する DisplayObject インスタンスです。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
function base (d, b, a) {
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	for (p in o) {
		h[p] = 1;
	}
	for (p in b.prototype) {
		if (!h[p]) {
			o[p] = b.prototype[p];
		}
		o[p][SUPER] = b.prototype;
	}
	b.apply(d, a);
}
var LExtends = base;

/** @language chinese
 * 从 Stage 实例的子列表中删除指定的 child DisplayObject 实例。
 * @method getTimer
 * @param {LDisplayObject} child 要删除的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language english
 * Removes the specified child DisplayObject instance from the child list of the Stage instance. 
 * @method getTimer
 * @param {Object} expression The DisplayObject instance to remove.
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Stage インスタンスの子リストから指定の child DisplayObject インスタンスを削除します。
 * @method getTimer
 * @param {Object} expression 削除する DisplayObject インスタンスです。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
function getTimer () {
	return (new Date()).getTime() - LGlobal.startTimer;
}

/*
 * LObject.js
 **/
function LObject(){
	this.type = "LObject";
	this.objectIndex = ++LGlobal.objectIndex;
	this.objectindex = this.objectIndex;
}
LObject.prototype = {
	callParent:function(f_n,args){
		if(!args || !f_n)return;
		return args.callee[SUPER][f_n].apply(this,args);
	},
	toString:function(){
		return "[object "+this.type+"]";
	}
};
function LMatrix(a,b,c,d,tx,ty,u,v,w){
	var s = this;
	s.a=1;
	s.b=0;
	s.u=0;
	s.c=0;
	s.d=1;
	s.v=0;
	s.tx=0;
	s.ty=0;
	s.w=1;
	if(typeof a != UNDEFINED)s.a = a;
	if(typeof b != UNDEFINED)s.b = b;
	if(typeof c != UNDEFINED)s.c = c;
	if(typeof d != UNDEFINED)s.d = d;
	if(typeof tx != UNDEFINED)s.tx = tx;
	if(typeof ty != UNDEFINED)s.ty = ty;
	if(typeof u != UNDEFINED)s.u = u;
	if(typeof v != UNDEFINED)s.v = v;
	if(typeof w != UNDEFINED)s.w = w;
}
LMatrix.prototype = {
	setTo:function(a,b,c,d,tx,ty,u,v,w){
		var s = this;
		if(typeof a != UNDEFINED)s.a = a;
		if(typeof b != UNDEFINED)s.b = b;
		if(typeof c != UNDEFINED)s.c = c;
		if(typeof d != UNDEFINED)s.d = d;
		if(typeof tx != UNDEFINED)s.tx = tx;
		if(typeof ty != UNDEFINED)s.ty = ty;
		if(typeof u != UNDEFINED)s.u = u;
		if(typeof v != UNDEFINED)s.v = v;
		if(typeof w != UNDEFINED)s.w = w;
		return s;
	},
	isIdentity:function(){
		var s = this;
		return (s.a == 1 && s.b == 0 && s.c == 0 && s.d == 1 && s.tx == 0 && s.ty == 0 && u == 0 && v == 0 && w == 1);
	},
	transform:function(c){
		var s = this;
		c.transform(s.a,s.b,s.c,s.d,s.tx,s.ty);
		return s;
	},
	toString:function(){
		return "[LMatrix]";
	},
	identity:function(){
		this.setTo(1,0,0,1,0,0,0,0,1);
	},
	rotate:function(q){
		var s = this,
		radian = q * Math.PI / 180,
        cos = Math.cos(radian),
        sin = Math.sin(radian),
        mtx = new LMatrix(cos,sin,-sin,cos,0,0,0,0,1);
        s.add(mtx);
	},
	scale:function(sx, sy){
		var s = this,
		mtx = new LMatrix(sx,0,0,sy,0,0,0,0,1);
        s.add(mtx);
	},
	translate:function(tx, ty){
		var s = this,
		mtx = new LMatrix(1,0,0,1,tx,ty,0,0,1);
        s.add(mtx);
	},
	skew:function(kx,ky){
		mtx = new LMatrix(0,ky,kx,0,0,0,0,0,1);
        s.add(mtx);
	},
	add:function(mtx){
		var s = this,a,b,c,d,tx,ty,u,v,w;
		
		a = s.a*mtx.a + s.b*mtx.c + s.u*mtx.tx;
		b = s.a*mtx.b + s.b*mtx.d + s.u*mtx.ty;
		u = s.a*mtx.u + s.b*mtx.v + s.u*mtx.w;
		
		c = s.c*mtx.a + s.d*mtx.c + s.v*mtx.tx;
		d = s.c*mtx.b + s.d*mtx.d + s.v*mtx.ty;
		v = s.c*mtx.u + s.d*mtx.v + s.v*mtx.w;
		
		tx = s.tx*mtx.a + s.ty*mtx.c + s.w*mtx.tx;
		ty = s.tx*mtx.b + s.ty*mtx.d + s.w*mtx.ty;
		w = s.tx*mtx.u + s.ty*mtx.v + s.w*mtx.w;
		s.setTo(a,b,c,d,tx,ty,u,v,w);
	},
	toArray:function(mtx){
		var s = this;
		if(Array.isArray(mtx) && mtx.length == 3){
			var m = mtx[0]*s.a + mtx[1]*s.c + mtx[2]*s.tx,
			n = mtx[0]*s.b + mtx[1]*s.d + mtx[2]*s.ty,
			k = mtx[0]*s.u + mtx[1]*s.v + mtx[2]*s.w;
			return [m,n,k];
		}else{
			var a = s.a*mtx.a + s.b*mtx.c + s.u*mtx.tx,
			b = s.a*mtx.b + s.b*mtx.d + s.u*mtx.ty,
			u = s.a*mtx.u + s.b*mtx.v + s.u*mtx.w,
			
			c = s.c*mtx.a + s.d*mtx.c + s.v*mtx.tx,
			d = s.c*mtx.b + s.d*mtx.d + s.v*mtx.ty,
			v = s.c*mtx.u + s.d*mtx.v + s.v*mtx.w,
			
			tx = s.tx*mtx.a + s.ty*mtx.c + s.w*mtx.tx,
			ty = s.tx*mtx.b + s.ty*mtx.d + s.w*mtx.ty,
			w = s.tx*mtx.u + s.ty*mtx.v + s.w*mtx.w;
			return [a,b,c,d,tx,ty,u,v,w];
		}
	},
	clone:function(){
		var s = this;
		return new LMatrix(s.a,s.b,s.c,s.d,s.tx,s.ty,s.u,s.v,s.w);
	}
};

function LVec2(x,y){
	this.x = x?x:0;
	this.y = y?y:0;
}
LVec2.prototype.length = function(){
	var s = this;
	return Math.sqrt(s.x * s.x + s.y * s.y);
};
LVec2.prototype.normalize = function(){
	var s = this,l=s.length();
	return new LVec2(s.x/l,s.y/l);
};

LVec2.prototype.normR = function(){
	return new LVec2(-this.y,this.x);
};
LVec2.prototype.normL = function(){
	return new LVec2(this.y,-this.x);
};

LVec2.dot = function(a,b){
	return a.x * b.x + a.y * b.y;
};

LVec2.cross = function(a,b){
	return a.x * b.y - a.y * b.x;
};
LVec2.distance = function(a,b){
	var x = a.x - b.x;
	var y = a.y - b.y;
	return Math.sqrt(x * x + y * y);
};
LVec2.getMinMax = function(vecs,axis){
	var min_o = LVec2.dot(vecs[0],axis);
	var max_o = LVec2.dot(vecs[0],axis);
	var min_i = 0;
	var max_i = 0;
	for(var i=1;i<vecs.length;i++){
		var this_o = LVec2.dot(vecs[i],axis);
		if(min_o > this_o){
			min_o = this_o;
			min_i = i;
		}
		if(max_o < this_o){
			max_o = this_o;
			max_i = i;
		}
	}
	return {"min_o":min_o,"min_i":min_i,"max_o":max_o,"max_i":max_i};
};
/*
 * LEventDispatcher.js
 **/
function LEventDispatcher(){
	var s = this;
	base(s,LObject,[]);
	s._eventList = new Array();
}
p = {
	addEventListener:function(type,listener){
		this._eventList.push({listener:listener,type:type});
	},
	removeEventListener:function(type,listener){
		var s = this,i,length;
		length = s._eventList.length;
		for(i=0;i<length;i++){
			if(!s._eventList[i])continue;
			if(type == s._eventList[i].type && s._eventList[i].listener == listener){
				s._eventList.splice(i,1);
				return;
			}
		}
	},
	removeAllEventListener:function (){
		this._eventList = [];
	},
	dispatchEvent:function(type){
		var s = this;
		var i,length = s._eventList.length,ctype = (typeof type == "string") ? type : type.eventType;
		for(i=0;i<length;i++){
			if(!s._eventList[i])continue;
			if(ctype == s._eventList[i].type){
				if(typeof type == "string"){
					s.target = s;
					s.eventType = s.event_type = ctype;
					s._eventList[i].listener(s);
				}else{
					type.target = s;
					s._eventList[i].listener(type);
				}
			}
		}
	},
	hasEventListener:function(type){
		var s = this,i,length = s._eventList.length;
		for(i=0;i<length;i++){
			if(!s._eventList[i])continue;
			if(type == s._eventList[i].type)return true;
		}
		return false;
	}
};
for(var k in p)LEventDispatcher.prototype[k]=p[k];
/*
 * LDisplayObject.js
 **/
function LDisplayObject(){
	var s = this;
	base(s,LEventDispatcher,[]);
	s.x = 0;  
	s.y = 0;  
	s.width = 0;  
	s.height = 0;  
	s.scaleX=1;
	s.scaleY=1;
	s.alpha = 1;
	s.visible=true;
	s.rotate = 0;
	s.mask = null;
	s.blendMode = null;
}
p = {
	_createCanvas:function(){
		var s = this;
		if(!s._canvas){
			s._canvas = document.createElement("canvas");
			s._context = s._canvas.getContext("2d");
		}
	}
	,ll_show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s._canShow())return;
		c.save();
		s._showReady(c);
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}
		if(s.filters){
			s.setShadow();
		}
		s._rotateReady();
		if(s.mask != null && s.mask.ll_show){
			s.mask.ll_show();
			c.clip();
		}

		s._transformRotate();

		s._transformScale();

		s._coordinate(c);
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		s._ll_show(c);
		c.restore();
		s.loopframe();
	},
	_canShow:function(){return this.visible;},
	_coordinate:function(c){
		var s = this;
		if(s.x != 0 || s.y != 0)c.transform(1,0,0,1,s.x,s.y);
	},
	_rotateReady:function(){},
	_showReady:function(c){},
	_ll_show:function(c){},
	loopframe:function(){},
	setShadow:function(){
		var s=this,f=s.filters;
		if(!f)return;
		for(var i=0,l=f.length;i<l;i++)f[i].ll_show();
	},
	_transformRotate:function(){
		var s = this;
		if(s.rotate == 0)return;
		var c = LGlobal.canvas,rotateFlag = Math.PI / 180,rotateObj = new LMatrix();
		if((typeof s.rotatex) == UNDEFINED){
			s.rotatex=s.rotatey=0;
		}
		if(s.box2dBody)rotateFlag=1;
		rotateObj.a = Math.cos(s.rotate * rotateFlag);
		rotateObj.b = Math.sin(s.rotate * rotateFlag);
		rotateObj.c = -rotateObj.b;
		rotateObj.d = rotateObj.a;
		rotateObj.tx = s.x + s.rotatex;
		rotateObj.ty = s.y + s.rotatey;
		rotateObj.transform(c).setTo(1,0,0,1,-rotateObj.tx,-rotateObj.ty).transform(c);
	},
	_transformScale:function(){
		var s = this,c = LGlobal.canvas;
		if(s.scaleX == 1 && s.scaleY == 1)return;
		var scaleObj = new LMatrix();
		if(s.scaleX != 1)scaleObj.tx = s.x;
		if(s.scaleY != 1)scaleObj.ty = s.y;
		scaleObj.a = s.scaleX;
		scaleObj.d = s.scaleY;
		scaleObj.transform(c).setTo(1,0,0,1,-scaleObj.tx,-scaleObj.ty).transform(c);
	},
	copyProperty:function(a){
		var s = this;
		for(var k in a){
			if(typeof a[k] == "number" || typeof a[k] == "string" || typeof a[k] == "boolean"){
				if(k == "objectindex" || k == "objectIndex"){continue;}
				s[k] = a[k];
			}else if(Object.prototype.toString.apply(a[k]) == '[object Array]'){
				s[k] = a[k].slice();
			}
		}
		if(a.mask)s.mask = a.mask.clone();
	},
	getAbsoluteScale:function(){
		var s = this;
		var sX=s.scaleX,sY=s.scaleY;
		var p = s.parent;
		while(p != "root"){
	        sX *= p.scaleX;
	        sY *= p.scaleY;
			p = p.parent;
		}
		return {scaleX:sX,scaleY:sY};
	},
	getRootCoordinate:function(){
		var s = this;
		var sx=s.x,sy=s.y;
		var p = s.parent;
		while(p != "root"){
	        sx *= p.scaleX;
	        sy *= p.scaleY;
			sx += p.x;
			sy += p.y;
			p = p.parent;
		}
		return new LPoint(sx,sy);
	},
	getBounds:function(d){
		if(typeof d == UNDEFINED)return new LRectangle(0,0,0,0);
		var s = this,x=0,y=0,w=0,h=0;
		if(s.objectIndex != d.objectIndex){
			var sp = s.getRootCoordinate();
			var dp = d.getRootCoordinate();
			x = sp.x - dp.x;
			y = sp.y - dp.y;
		}
		if(d.getWidth)w=d.getWidth();
		if(d.getHeight)h=d.getHeight();
		return new LRectangle(x,y,w,h);
	},
	getDataCanvas:function(){
		var s = this,_o,o,_c,c;
		s._createCanvas();
		o = LGlobal.canvasObj,c = LGlobal.canvas;
		_o = s._canvas,_c = s._context;
		s.width = s.getWidth();
		s.height = s.getHeight();
		_o.width = s.width;
		_o.height = s.height;
		_c.clearRect(0,0,s.width,s.height);
		LGlobal.canvasObj = s._canvas;
		LGlobal.canvas = s._context;
		s.ll_show();
		s._canvas = _o;
		s._context = _c;
		LGlobal.canvasObj = o;
		LGlobal.canvas = c;
		return s._canvas;
	},
	getDataURL:function(){
		var s = this,r = s.getDataCanvas();
		return r.toDataURL();
	},
	ismouseonShapes:function(shapes,mx,my){
		var s = this;
		var parent = s;
		if(typeof shapes == UNDEFINED){
			shapes = s.shapes;
		}
		var m = s.getRootMatrix();
		for(var j=shapes.length-1;j>=0;j--){
			var child = shapes[j],v,arg = child.arg;
			v = s._changeShape(child.type,arg,m);
			if(child.type == LShape.VERTICES){
				if(LGlobal.hitPolygon(v,mx,my))return true;
			}else if(child.type == LShape.RECT){
				if(LGlobal.hitPolygon(v,mx,my))return true;
			}else if(child.type == LShape.ARC){
				if((v[0] - mx)*(v[0] - mx) + (v[1] - my)*(v[1] - my) < v[3])return true;
			}
		}
		return false;
	},
	_changeShape:function(type,arg,m){
		var v,arg = arg,r2;
		if(type == LShape.VERTICES){
			v = [];
			for(var i=0,l=arg.length;i<l;i++){
				v[i]=m.toArray([arg[i][0],arg[i][1],1]);
			}
		}else if(type == LShape.RECT){
			v = [[arg[0],arg[1]],[arg[0]+arg[2],arg[1]],[arg[0]+arg[2],arg[1]+arg[3]],[arg[0],arg[1]+arg[3]]];
			for(var i=0,l=v.length;i<l;i++){
				v[i]=m.toArray([v[i][0],v[i][1],1]);
			}
		}else if(type == LShape.ARC){
			var v1 = m.toArray([arg[0],arg[1],1]),v2 = m.toArray([arg[0]+arg[2],arg[1],1]);
			r2 = (v1[0] - v2[0])*(v1[0] - v2[0]) + (v1[1] - v2[1])*(v1[1] - v2[1]);
			v = [v1[0],v1[1],Math.sqrt(r2),r2];
		}
		return v;
	},
	getRootMatrix:function(){
		var parent = this;
		var m = new LMatrix();
		while(parent && parent != "root"){
			if(parent.scaleX != 1 || parent.scaleY != 1)m.scale(parent.scaleX,parent.scaleY);
			if(parent.rotate != 0)m.rotate(parent.rotate);
			if(parent.x != 0 || parent.y != 0)m.translate(parent.x,parent.y);
			parent = parent.parent;
		}
		return m;
	},
	remove:function(){
		var s = this,p = s.parent;
		if(!p || p == "root")return;
		p.removeChild(s);
	}
};
for(var k in p)LDisplayObject.prototype[k]=p[k];
/*
 * LInteractiveObject.js
 **/
function LInteractiveObject(){
	var s = this;
	base(s,LDisplayObject,[]);
	s.type = "LInteractiveObject";
	s.mouseEnabled = true;
	s.mouseChildren = true;
	s.frameList = new Array();
	s.mouseList = new Array();
}
p = {
	addEventListener:function(type,listener){
		var s = this;
		if(type == LEvent.ENTER_FRAME){
			s.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0 || type.indexOf("touch")>=0 || type == LMouseEvent.DOUBLE_CLICK){
			if(LGlobal.mouseEventContainer[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE])){
				LMouseEventContainer.addMouseEvent(s,type,listener);
				return;
			}
			s.mouseList.push({listener:listener,type:type});
		}else{
			s._eventList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function(type,listener){
		var s = this,i,length;
		if(type == LEvent.ENTER_FRAME){
			length = s.frameList.length;
			for(i=0;i<length;i++){
				if(type == LEvent.ENTER_FRAME && s.frameList[i] == listener){
					s.frameList.splice(i,1);
					return;
				}
			}
		}else if(type.indexOf("mouse")>=0 || type.indexOf("touch")>=0 || type == LMouseEvent.DOUBLE_CLICK){
			if(LGlobal.mouseEventContainer[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE])){
				LMouseEventContainer.removeMouseEvent(s,type,listener);
				return;
			}
			length = s.mouseList.length;
			for(i=0;i<length;i++){
				if(!s.mouseList[i])continue;
				if(type == s.mouseList[i].type && s.mouseList[i].listener == listener){
					s.mouseList.splice(i,1);
					return;
				}
			}
		}else{
			length = s._eventList.length;
			for(i=0;i<length;i++){
				if(!s._eventList[i])continue;
				if(type == s._eventList[i].type && s._eventList[i].listener == listener){
					s._eventList.splice(i,1);
					return;
				}
			}
		}
	},
	removeAllEventListener:function (){
		var s = this;
		s.frameList.length = 0;
		s.mouseList.length = 0;
		s._eventList.length = 0;
		if(LGlobal.mouseEventContainer[LMouseEvent.MOUSE_DOWN]){
			LMouseEventContainer.removeMouseEvent(s,LMouseEvent.MOUSE_DOWN);
		}
		if(LGlobal.mouseEventContainer[LMouseEvent.MOUSE_UP]){
			LMouseEventContainer.removeMouseEvent(s,LMouseEvent.MOUSE_UP);
		}
		if(LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE]){
			LMouseEventContainer.removeMouseEvent(s,LMouseEvent.MOUSE_MOVE);
			LMouseEventContainer.removeMouseEvent(s,LMouseEvent.MOUSE_OVER);
			LMouseEventContainer.removeMouseEvent(s,LMouseEvent.MOUSE_OUT);
		}
	},
	hasEventListener:function(type){
		var s = this,i,length;
		if(type == LEvent.ENTER_FRAME && s.frameList.length > 0)return true;
		if(type.indexOf("mouse")>=0 || type.indexOf("touch")>=0 || type == LMouseEvent.DOUBLE_CLICK){
			length = s.mouseList.length;
			for(i=0;i<length;i++){
				if(!s.mouseList[i])continue;
				if(type == s.mouseList[i].type)return true;
			}
		}else{
			length = s._eventList.length;
			for(i=0;i<length;i++){
				if(!s._eventList[i])continue;
				if(type == s._eventList[i].type)return true;
			}
		}
		return false;
	}
};
for(var k in p)LInteractiveObject.prototype[k]=p[k];
/*
* LLoader.js
**/
function LLoader(){
	base(this,LEventDispatcher,[]);
	var s = this;
	s.type="LLoader";
	s.loadtype = "";
	s.content = null;
	s.oncomplete = null;
	s.event = {};
}
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}
	},
	load:function (u,t){
		var s = this;
		s.loadtype = t;
		if(!t || t == "bitmapData"){
			s.content = new Image();
			s.content.onload = function(){
				s.content.onload = null;
				if(s.oncomplete){
					s.event.currentTarget = s.content;
					s.event.target = s;
					s.oncomplete(s.event);
				}
			};
			s.content.src = u; 
		}
	}
};
for(var k in p)LLoader.prototype[k]=p[k];
/*
* LURLLoader.js
**/
function LURLLoader(){
	var s = this;
	base(s,LObject,[]);
	s.type="LURLLoader";
	s.loadtype = "";
	s.content = null;
	s.oncomplete = null;
	s.event = {};
}
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}
	},
	load:function (u,t){
		var s = this;
		s.loadtype = t;
		if(!t || t == "text"){
			LAjax.get(u,{},function(data){
				if(s.oncomplete){
					s.event.currentTarget = data;
					s.event.target = s;
					s.data = data;
					if(s.oncomplete)s.oncomplete(s.event);
				}
			});
		}else if(t=="js"){
			var script = document.createElement("script");
			script.onload = function (){
				s.event.target = s;
				if(s.oncomplete)s.oncomplete(s.event);
			};
			script.src = u;
			script.type = "text/javascript";
			document.querySelector('head').appendChild(script);
		}
	}
};
for(var k in p)LURLLoader.prototype[k]=p[k];
/*
 * LMedia.js 
 **/
function LMedia(){
	var s = this;
	base(s,LDisplayObject,[]);
	s.length=0;
	s.loopIndex=0;
	s.loopLength = 1;
	s.playing=false;
	s.event = {};
	s.oncomplete = null;
	s.onsoundcomplete = null;
}
LMedia.CANPLAYTHROUGH_EVENT = "canplaythrough";
LMedia.ENDED_EVENT = "ended";
p = {
	onload:function(){
		var s=this;
		if(s.data.readyState){
			s.length=s.data.duration;
			s.dispatchEvent(LEvent.COMPLETE);
			return;
		}
		s.data.addEventListener(LMedia.CANPLAYTHROUGH_EVENT, function () {
			s.onload();
		}, false);
	},
	_onended:function(){
		var s=this;
		if(s.data.ended){
			s.dispatchEvent(LEvent.SOUND_COMPLETE);
			if(++s.loopIndex < s.loopLength){
				s.data.currentTime=0;
				s.data.play();
			}else{
				s.close();
			}
		}
	},
	load:function(u){
		var s = this,a,b,k,d,q={"mov":"quicktime","3gp":"3gpp","ogv":"ogg","m4a":"mpeg","mp3":"mpeg","wave":"wav","aac":"mp4"};
		a = u.split(',');
		for(k in a){
			b = a[k].split('.');
			d=b[b.length-1];
			if(q[d])d=q[d];
			if(s.data.canPlayType(s._type+"/"+d)){
				s.data.src = a[k];
				s.onload();
				s.data.addEventListener(LMedia.ENDED_EVENT, function(){
					s._onended();
				}, false);
				s.data.load();
				return;
			}
		}
		if(s.oncomplete)s.oncomplete({});
	},
	setVolume:function(v){
		this.data.volume=v;
	},
	getVolume:function(){
		return this.data.volume;
	},
	play:function(c,l){
		var s=this;
		if(typeof l == UNDEFINED)l=1;
		if(typeof c == UNDEFINED)c=0;
		if(c>0)s.data.currentTime=c;
		s.data.loop = false;
		s.loopIndex=0;
		s.loopLength = l;
		s.playing=true;
		s.data.play();
		s._onended();
	},
	stop:function(){
		this.playing=false;
		this.data.pause();
	},
	close:function(){
		var s=this;
		s.playing=false;
		s.data.pause();
		s.data.currentTime=0;
	}
};
for(var k in p)LMedia.prototype[k]=p[k];
/*
 * LSound.js 
 **/
function LSound(u){
	var s = this;
	base(s,LMedia,[]);
	s.type = "LSound";
	s._type="audio";
	s.data = new Audio();
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
/*
 * LVideo.js 
 **/
function LVideo(u){
	var s = this;
	base(s,LMedia,[]);
	s.type = "LVideo";
	s._type="video";
	s.x=s.y=0;
	s.visible=true;
	s.alpha=1;
	s.scaleX=s.scaleY=1;
	s.rotatex = 0;
	s.rotatey = 0;
	s.rotate = 0;
	s.data = document.createElement("video");
	s.data.style.display = "none";
	document.body.appendChild(s.data);
	s.data.id="video_"+s.objectIndex;
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
p = {
	ll_show:function (){
		var s=this,c=LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}

		s._transformScale();

		s._transformRotate();
		if(s.mask != null && s.mask.ll_show){
			s.mask.ll_show();
			c.clip();
		}
		c.drawImage(s.data,s.x,s.y);
		c.restore();
	},
	die:function(){
		var s=this;
		document.body.removeChild(s.data);
		delete s.data;
	},
	getWidth:function(){
		return this.data.width;
	},
	getHeight:function(){
		return this.data.height;
	}
};
for(var k in p)LVideo.prototype[k]=p[k];
/*
* LPoint.js
**/
function LPoint(x,y){
	var s = this;
	s.x = x;
	s.y = y;
}
LPoint.distance = function(p1,p2){
	return LPoint.distance2(p1.x,p1.y,p2.x,p2.y);
};
LPoint.distance2 = function(x1,y1,x2,y2){
	var x = x1 - x2, y = x1 - x2;
	return Math.sqrt(x*x + y*y);
};
LPoint.interpolate = function(p1,p2,f){
	return new LPoint(p1.x+(p2.x-p1.x)*(1-f),p1.y+(p2.y-p1.y)*(1-f));
};
LPoint.polar = function(l, a){
	return new LPoint(l*Math.cos(a),l*Math.sin(a));
};
LPoint.prototype = {
	toString:function(){
		return '[object LPoint('+this.x+','+this.y+')]';
	},
	length:function(){
		return LPoint.distance2(this.x,this.y,0,0);
	},
	add:function(v){
		return LPoint(this.x+v.x,this.y+v.y);
	},
	clone:function(){
		return new LPoint(this.x,this.y);
	},
	setTo:function(x, y){
		this.x = x,this.y=y;
	},
	copyFrom:function(s){
		this.setTo(s.x,s.y);
	},
	equals:function(t){
		return this.x == t.x && this.y == t.y;
	},
	normalize:function(t){
		var s = this,scale = t/s.length();
		s.x *= scale,s.y *= scale;
	},
	offset:function(dx,dy){
		this.x += dx;
		this.y += dy;
	},
	subtract:function(v){
		return new LPoint(this.x  - v.x,this.y - v.y);
	}
};
/*
* LRectangle.js
**/
function LRectangle(x,y,w,h){
	var s = this;
	s.x = x;
	s.y = y;
	s.width = w;
	s.height=h;
	s.setRectangle();
}
LRectangle.prototype = {
	setRectangle:function(){
		var s = this;
		s.bottom = s.y + s.height;
		s.right = s.x + s.width;
		s.left = s.x;
		s.top = s.y;
	},
	clone:function(){
		var s = this;
		return new LRectangle(s.x,s.y,s.width,s.height);
	},
	contains:function(x, y){
		var s = this;
		return x>=s.x && x <= s.right && y>= s.y && y <= s.bottom;
	},
	containsRect:function(rect){
		var s = this;
		return rect.x>=s.x && rect.right <= s.right && rect.y>= s.y && rect.bottom <= s.bottom;
	},
	equals:function(v){
		var s = this;
		return v.x==s.x && v.width == s.width && v.y== s.y && v.height == s.height;
	},
	inflate:function(dx,dy){
		var s = this;
		s.width += dx;
		s.height += dy;
		s.setRectangle();
	},
	intersection:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		if(ix <= ax && iy <= ay){
			return new LRectangle(ix,iy,ax,ay);
		}else{
			return new LRectangle(0,0,0,0);
		}
	},
	intersects:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		return ix <= ax && iy <= ay;
	},
	isEmpty:function(){
		var s = this;
		return s.x==0 && s.y==0 && s.width==0 && s.height==0;
	},
	offset:function(dx,dy){
		var s = this;
		s.x += dx;
		s.y += dy;
		s.setRectangle();
	},
	setEmpty:function(){
		var s = this;
		s.x = 0;
		s.y = 0;
		s.width = 0;
		s.height = 0;
		s.setRectangle();
	},
	setTo:function(xa, ya, w, h){
		var s = this;
		s.x = xa;
		s.y = ya;
		s.width = w;
		s.height = h;
		s.setRectangle();
	},
	toString:function(){
		var s = this;
		return "[object LRectangle("+s.x+","+s.y+","+s.width+","+s.height+")]";
	},
	union:function(t){
		var s=this;
		return new LRectangle(s.x>t.x?t.x:s.x,s.y>t.y?t.y:s.y,s.right>t.right?s.right:t.right,s.bottom>t.bottom?s.bottom:t.bottom);
	}
};
/*
* LGraphics.js
**/
function LGraphics(){
	base(this,LObject,[]);
	var s = this;
	s.type = "LGraphics";
	s.color = "#000000";
	s.i = 0;
	s.alpha = 1;
	s.bitmap = null;
	s.setList = new Array();
	s.showList = new Array();
}
p = {
	ll_show:function (){
		var s = this,k,l=s.setList.length;
		if(l == 0)return;
		for(k=0;k<l;k++){
			s.setList[k]();
		}
	},
	clone:function(){
		var s = this,a = new LGraphics(),i,l,c;
		a.color = s.color;
		a.i = s.i;
		a.alpha = s.alpha;
		a.bitmap = s.bitmap;
		for(i=0,l=s.setList.length;i<l;i++){
			c = s.setList[i];
			a.setList.push(c);
		}
		for(i=0,l=s.showList.length;i<l;i++){
			c = s.showList[i];
			a.showList.push(c);
		}
		return a;
	},
	lineCap:function (t){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineCap = t;});
	},
	lineJoin:function (t){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineJoin = t;});
	},
	lineWidth:function (t){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineWidth = t;});
	},
	strokeStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.strokeStyle = co;});
	},
	stroke:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.stroke();});
	},
	beginPath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.beginPath();});
	},
	closePath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.closePath();});
	},
	moveTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.moveTo(x,y);});
	},
	lineTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineTo(x,y);});
	},
	clear:function (){
		var s = this;
		s.bitmap = null;
		s.setList.length = 0;
		s.showList.length = 0;
	},
	rect:function (x,y,w,h){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.rect(x, y, w, h);});
		s.showList.push({type:"rect",arg:[x,y,w,h]});
	},
	fillStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fillStyle = co;});
	},
	fill:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fill();});
	},
	arc:function(x,y,r,sa,ea,aw){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.arc(x,y,r,sa,ea,aw);});
		s.showList.push({type:"arc",arg:sa});
	},
	beginBitmapFill:function(b){
		var s = this;
		s.setList.push(function(){
			s.bitmap=b;
		});
	},
	drawEllipse:function(tn,lco,pa,isf,co){
		var s = this,c,x,y,w,h,k,ox,oy,xe,ye,xm,ym;
		s.setList.push(function(){
			c=LGlobal.canvas;
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
			c.bezierCurveTo(x, ym-oy, xm-ox, y, xm, y);
			c.bezierCurveTo(xm+ox, y, xe, ym-oy, xe, ym);
			c.bezierCurveTo(xe, ym+oy, xm+ox, ye, xm, ye);
			c.bezierCurveTo(xm-ox, ye, x, ym+oy, x, ym);
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						0,0,s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
		});
		s.showList.push({type:"rect",arg:pa});
	},
	drawArc:function(tn,lco,pa,isf,co){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			if(pa.length > 6 && pa[6]){
				c.moveTo(pa[0],pa[1]);
			}
			c.arc(pa[0],pa[1],pa[2],pa[3],pa[4],pa[5]);
			if(pa.length > 6 && pa[6]){
				c.lineTo(pa[0],pa[1]);
			}
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						0,0,s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
		});
		s.showList.push({type:"arc",arg:pa});
	},
	drawRect:function (tn,lco,pa,isf,co){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.rect(pa[0],pa[1],pa[2],pa[3]);
			c.closePath();
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,
						s.bitmap.width,s.bitmap.height,
						0,0,
						s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
		});
		s.showList.push({type:"rect",arg:pa});
	},
	drawRoundRect:function(tn,lco,pa,isf,co){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.moveTo(pa[0]+pa[4],pa[1]);
			c.lineTo(pa[0]+pa[2]-pa[4],pa[1]);
			c.arcTo(pa[0]+pa[2],pa[1],pa[0]+pa[2],pa[1]+pa[4],pa[4]);
			c.lineTo(pa[0]+pa[2],pa[1]+pa[3]-pa[4]);
			c.arcTo(pa[0]+pa[2],pa[1]+pa[3],pa[0]+pa[2]-pa[4],pa[1]+pa[3],pa[4]);
			c.lineTo(pa[0]+pa[4],pa[1]+pa[3]);
			c.arcTo(pa[0],pa[1]+pa[3],pa[0],pa[1]+pa[3]-pa[4],pa[4]);
			c.lineTo(pa[0],pa[1]+pa[4]);
			c.arcTo(pa[0],pa[1],pa[0]+pa[4],pa[1],pa[4]);
			c.closePath();
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						0,0,
						s.bitmap.width,s.bitmap.height,
						0,0,
						s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
		});
		s.showList.push({type:"rect",arg:pa});
	},
	drawVertices:function(tn,lco,v,isf,co){
		var s = this,c;
		if(v.length < 3)return;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.moveTo(v[0][0],v[0][1]);
			var i,l = v.length;
			for(i=1;i<l;i++){
				var pa = v[i];
				c.lineTo(pa[0],pa[1]);
			};
			c.lineTo(v[0][0],v[0][1]);
			c.closePath();
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						0,0,s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			}
		});
		s.showList.push({type:"vertices",arg:v});
	},
	drawTriangles:function(ve, ind, u ,tn,lco){
		var s = this;
		var i,j,l = ind.length,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			var v = ve;
			for(i=0,j=0;i<l;i+=3){
				a=0;
				c.save();
				c.beginPath();
				c.moveTo(v[ind[i]*2],v[ind[i]*2+1]);
				c.lineTo(v[ind[i+1]*2],v[ind[i+1]*2+1]);
				c.lineTo(v[ind[i+2]*2],v[ind[i+2]*2+1]);
				c.lineTo(v[ind[i]*2],v[ind[i]*2+1]);
				c.closePath();
				if(tn){
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
				c.clip();
				if(i%6==0){
					var sw = -1;
					var w = (u[ind[i+1 + j]*2]-u[ind[i + j]*2])*s.bitmap.width;
					var h = (u[ind[i+2]*2+1]-u[ind[i]*2+1])*s.bitmap.height;
					if(j==0 && w < 0){
						for(var k=i+9;k<l;k+=3){
							if(u[ind[i+2]*2+1] == u[ind[k+2]*2+1]){
								j = k - i;
								break;
							}
						}
						if(j==0)j=(l-i);
						w = (u[ind[i+1 + j]*2]-u[ind[i + j]*2])*s.bitmap.width;
					}
					if(i + j >= l){
						w = (u[ind[i + j - l]*2]-u[ind[i+1]*2])*s.bitmap.width;
						sw = u[ind[i]*2]==1?0:s.bitmap.width*u[ind[i]*2]+w;
						if(sw > s.bitmap.width)sw -= s.bitmap.width;
					}else{
						sw = s.bitmap.width*u[ind[i + j]*2];
					}
					sh = s.bitmap.height*u[ind[i]*2+1];
					if(h < 0){
						h = (u[ind[i+2 - (i > 0?6:-6)]*2+1]-u[ind[i - (i > 0?6:-6)]*2+1])*s.bitmap.height;
						sh = 0;
					}
					var t1 = (v[ind[i+1]*2]-v[ind[i]*2])/w;
					var t2 = (v[ind[i+1]*2+1]-v[ind[i]*2+1])/w;
					var t3 = (v[ind[i+2]*2]-v[ind[i]*2])/h;
					var t4 = (v[ind[i+2]*2+1]-v[ind[i]*2+1])/h;
					c.transform(t1,t2,t3,t4, v[ind[i]*2], v[ind[i]*2+1]);
					c.drawImage(s.bitmap.image,
								s.bitmap.x+sw,
								s.bitmap.y+sh,
								w,h,
								0,0,
								w,h);
				}else{
					var sw;
					var w = (u[ind[i+2 + j]*2]-u[ind[i+1 + j]*2])*s.bitmap.width;
					var h = (u[ind[i+2]*2+1]-u[ind[i]*2+1])*s.bitmap.height;
					if(j==0 && w < 0){
						for(var k=i+9;k<l;k+=3){
							if(u[ind[i+2]*2+1] == u[ind[k+2]*2+1]){
								j = k - i;
								break;
							}
						}
						if(j==0)j=(l-i);
						w = (u[ind[i+2 + j]*2]-u[ind[i+1 + j]*2])*s.bitmap.width;
					}
					if(i+1 + j >= l){
						w = (u[ind[i+1 + j - l]*2]-u[ind[i+2]*2])*s.bitmap.width;
						sw = u[ind[i+1]*2]==1?0:s.bitmap.width*u[ind[i+1]*2]+w;
						if(sw > s.bitmap.width)sw -= s.bitmap.width;
					}else{
						sw = s.bitmap.width*u[ind[i+1 + j]*2];
					}
					sh = s.bitmap.height*u[ind[i]*2+1];
					if(h < 0){
						h = (u[ind[i+2 - (i > 0?6:-6)]*2+1]-u[ind[i - (i > 0?6:-6)]*2+1])*s.bitmap.height;
						sh = 0;
					}
					var t1 = (v[ind[i+2]*2]-v[ind[i+1]*2])/w;
					var t2 = (v[ind[i+2]*2+1]-v[ind[i+1]*2+1])/w;
					var t3 = (v[ind[i+2]*2]-v[ind[i]*2])/h;
					var t4 = (v[ind[i+2]*2+1]-v[ind[i]*2+1])/h;
					c.transform(t1,t2,t3,t4, v[ind[i+1]*2], v[ind[i+1]*2+1]);
					c.drawImage(s.bitmap.image,
							s.bitmap.x+sw,
							s.bitmap.y+sh,
							w,h,
							0,-h,
							w,h);
				}
				c.restore();
			}
		});
	},
	drawLine:function (tn,lco,pa){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.moveTo(pa[0],pa[1]);
			c.lineTo(pa[2],pa[3]);
			c.lineWidth = tn;
			c.strokeStyle = lco;
			c.closePath();
			c.stroke();
		});
	},
	lineStyle:function (tn,co){
		var s = this,c;
		if(co==null)co=s.color;
		s.color = co;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.lineWidth = tn;
			c.strokeStyle = co;
		});
	},
	add:function (f){
		this.setList.push(f);
	},
	ismouseon:function(e,co){
		var s = this;
		var k = null;
		if(e==null || e == UNDEFINED || s.showList.length == 0 || !s.parent)return false;
		return s.parent.ismouseonShapes(s.showList,e.offsetX,e.offsetY);
	},
	getWidth:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].arg[0])min = s.showList[k].arg[0];
				if(max < s.showList[k].arg[0] + s.showList[k].arg[2])max = s.showList[k].arg[0] + s.showList[k].arg[2];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].arg[0] - s.showList[k].arg[2])min = s.showList[k].arg[0] - s.showList[k].arg[2];
				if(max < s.showList[k].arg[0] + s.showList[k].arg[2])max = s.showList[k].arg[0] + s.showList[k].arg[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].arg){
					v = s.showList[k].arg[k1];
					if(min > v[0])min = v[0];
					if(max < v[0])max = v[0];
				}
			}
		}
		s.left = min;
		return max - min;
	},
	getHeight:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].arg[1])min = s.showList[k].arg[1];
				if(max < s.showList[k].arg[1] + s.showList[k].arg[3])max = s.showList[k].arg[1] + s.showList[k].arg[3];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].arg[1] - s.showList[k].arg[2])min = s.showList[k].arg[1] - s.showList[k].arg[2];
				if(max < s.showList[k].arg[1] + s.showList[k].arg[2])max = s.showList[k].arg[1] + s.showList[k].arg[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].arg){
					v = s.showList[k].arg[k1];
					if(min > v[1])min = v[1];
					if(max < v[1])max = v[1];
				}
			}
		}	
		s.top = min;	
		return max - min;
	},
	startX:function(){
		var s=this;
		s.getWidth();
		return s.left;
	},
	startY:function(){
		var s=this;
		s.getHeight();
		return s.top;
	}
};
for(var k in p)LGraphics.prototype[k]=p[k];
/*
* LShape.js
**/
function LShape(){
	var s = this;
	base(s,LInteractiveObject,[]);
	s.type = "LShape";
	s.graphics = new LGraphics();
	s.graphics.parent = s;
}
LShape.ARC = "arc";
LShape.RECT = "rect";
LShape.VERTICES = "vertices";
p = {
	_ll_show:function(c){
		var s = this;
		s.graphics.ll_show();
	},
	getWidth:function(){
		var s=this,
		left = s.graphics.startX(),right = left + s.graphics.getWidth();
		s.left = s.x + left;
		return (right - left)*s.scaleX;
	},
	getHeight:function(){
		var s=this,
		top = s.graphics.startY(),bottom = top + s.graphics.getHeight();
		s.top = s.y + top;
		return (bottom - top)*s.scaleY;
	},
	_startX:function(){
		var s = this;
		s.getWidth();
		return s.left;
	},
	startX:function(){
		var s = this;
		return s._startX()*s.scaleX;
	},
	_startY:function(){
		var s = this;
		s.getHeight();
		return s.top;
	},
	startY:function(){
		var s = this;
		return s._startY()*s.scaleY;
	},
	clone:function(){
		var s = this,a = new LShape(),c,o;
		a.copyProperty(s);
		a.graphics = s.graphics.clone();
		a.graphics.parent = a;
		return a;
	},
	_mevent:function(type){
		var s = this;
		for(k=0;k<s.mouseList.length;k++){
			var o = s.mouseList[k];
			if(o.type == type){
				return true;
			}
		}
		return false;
	},
	mouseEvent:function (e,type,cd){
		if(!e)return false;
		var s = this;
		if(!s.visible)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1};
		var i,k,ox = e.offsetX,oy = e.offsetY;
		var on = s.ismouseon(e,cd);
		if(on){
			if(s._mevent(type)){
				for(k=0;k<s.mouseList.length;k++){
					var o = s.mouseList[k];
					if(o.type == type){
						e.selfX = (ox - (s.x*cd.scaleX+cd.x))/(cd.scaleX*s.scaleX);
						e.selfY = (oy - (s.y*cd.scaleY+cd.y))/(cd.scaleY*s.scaleY);
						e.target = e.clickTarget = s;
						o.listener(e,s);
						return true;
					}
				}
			}
			return true;
		}
		return false;
	},
	ismouseon:function(e,cd){
		var s = this,i=false,sc;
		if(!s.visible || e==null)return false;
		if(s.mask){
			if(!s.mask.parent){
				s.mask.parent = s.parent;
			}
			if(!s.mask.ismouseon(e,cd)){
				return false;
			}
		}
		sc={x:s.x*cd.scaleX+cd.x,y:s.y*cd.scaleY+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
		if(s.graphics)i = s.graphics.ismouseon(e,sc);
		return i;
	},
	die:function (){
		var s = this;
		s.graphics.clear();
		s.removeAllEventListener();
	}
};
for(var k in p)LShape.prototype[k]=p[k];
/** @language chinese
 * 创建一个新的 LSprite 实例。
 * LSprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。
 * @class LSprite
 * @extends LInteractiveObject
 * @constructor
 * @example
 *  LInit(50, "legend", 800, 480, main);
 *  function main () {
 *  	var layer = new LSprite();
 *  	addChild(layer);
 *  	
 *  	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 *  	var bm = new LBitmap(bmd);
 *  	layer.addChild(bm);
 *  }
 * @examplelink <p><a href="../../../api/LSprite/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Creates a new LSprite instance.
 * The LSprite class is a basic display list building block: a display list node that can display graphics and can also contain children.
 * @class LSprite
 * @extends LInteractiveObject
 * @constructor
 * @example
 *  LInit(50, "legend", 800, 480, main);
 *  function main () {
 *  	var layer = new LSprite();
 *  	addChild(layer);
 *  	
 *  	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 *  	var bm = new LBitmap(bmd);
 *  	layer.addChild(bm);
 *  }
 * @examplelink <p><a href="../../../api/LSprite/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 新しい LSprite インスタンスを作成します。
 * LSprite クラスは、表示リストの基本的要素です。つまり、グラフィックを表示でき、子を持つこともできる表示リストノードです。
 * @class LSprite
 * @extends LInteractiveObject
 * @constructor
 * @example
 *  LInit(50, "legend", 800, 480, main);
 *  function main () {
 *  	var layer = new LSprite();
 *  	addChild(layer);
 *  	
 *  	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 *  	var bm = new LBitmap(bmd);
 *  	layer.addChild(bm);
 *  }
 * @examplelink <p><a href="../../../api/LSprite/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LSprite = (function () {
	function LSprite () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LSprite
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * type of the object
		 * @property type
		 * @type String
		 * @default LSprite
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのタイプ
		 * @property type
		 * @type String
		 * @default LSprite
		 * @since 1.0.0
		 * @public
		 */
		s.type = "LSprite";
		s.rotatex;
		s.rotatey;
		/** @language chinese
		 * 子对象列表
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * the child display object list
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * 子表示オブジェクトのリスト
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		s.childList = new Array();
		/** @language chinese
		 * 返回此对象的子项数目。
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 *  var container1 = new LSprite();
		 *  var container2 = new LSprite();
		 *  var circle1 = new LSprite();
		 *  circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 *  var circle2 = new LSprite();
		 *  circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 *  container2.addChild(container1);
		 *  container1.addChild(circle1);
		 *  container1.addChild(circle2);




		 * @examplelink <p><a href="../../../api/LSprite/numChildren.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Returns the number of children of this object.
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 *  var container1 = new LSprite();
		 *  var container2 = new LSprite();
		 *  var circle1 = new LSprite();
		 *  circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 *  var circle2 = new LSprite();
		 *  circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 *  container2.addChild(container1);
		 *  container1.addChild(circle1);
		 *  container1.addChild(circle2);




		 * @examplelink <p><a href="../../../api/LSprite/numChildren.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このオブジェクトの子の数を返します。
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 *  var container1 = new LSprite();
		 *  var container2 = new LSprite();
		 *  var circle1 = new LSprite();
		 *  circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 *  var circle2 = new LSprite();
		 *  circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 *  container2.addChild(container1);
		 *  container1.addChild(circle1);
		 *  container1.addChild(circle2);




		 * @examplelink <p><a href="../../../api/LSprite/numChildren.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.numChildren = 0;
		/** @language chinese
		 * [只读] 指定属于此 sprite 的 Graphics 对象，在此 sprite 中可执行矢量绘图命令。
		 * @property graphics
		 * @type LGraphics
		 * @since 1.0.0
		 * @example
		 *  var layer = new LSprite();
		 *  addChild(layer);
		 *  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LSprite/graphics.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * [read-only] Specifies the Graphics object that belongs to this sprite where vector drawing commands can occur.
		 * @property graphics
		 * @type LGraphics
		 * @since 1.0.0
		 * @example
		 *  var layer = new LSprite();
		 *  addChild(layer);
		 *  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LSprite/graphics.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * [読み取り専用] ベクターの描画コマンドが発生するこのスプライトに属する Graphics オブジェクトを指定します。
		 * @property graphics
		 * @type LGraphics
		 * @since 1.0.0
		 * @example
		 *  var layer = new LSprite();
		 *  addChild(layer);
		 *  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LSprite/graphics.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.graphics = new LGraphics();
		s.graphics.parent = s;
		s.box2dBody = null;
		/** @language chinese
		 * 用于碰撞的形状列表
		 * @property shapes
		 * @type Array
		 * @since 1.9.0
		 * @example
		 *  function loadBitmapdata (event) {
		 *  	var bitmapdata = new LBitmapData(event.currentTarget); 
		 *  	var bitmap = new LBitmap(bitmapdata);
		 *  
		 *  	layer = new LSprite();
		 *  	layer.addChild(bitmap);
		 *  	layer.x = 20;
		 *  	layer.y = 50;
		 *  	layer.addShape(LShape.VERTICES, [[180, 20], [210, 40], [210, 60], [120, 110], [35, 100]]);
		 *  	layer.addShape(LShape.VERTICES, [[120, 110], [140, 120], [140, 150], [110, 160], [35, 120], [35, 100]]);
		 *  	addChild(layer);
		 *  
		 *  	layer.addEventListener(LEvent.ENTER_FRAME, onframe);
		 *  }
		 *  function onframe (e) {
		 *  	if (layer.hitTestPoint(mouseX, mouseY)) {
		 *  		layer.alpha = 0.5;
		 *  	} else {
		 *  		layer.alpha = 1;
		 *  	}
		 *  }
		 * @examplelink <p><a href="../../../api/LSprite/shapes.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * The collider’s shape list
		 * @property shapes
		 * @type Array
		 * @since 1.9.0
		 * @example
		 *  function loadBitmapdata (event) {
		 *  	var bitmapdata = new LBitmapData(event.currentTarget); 
		 *  	var bitmap = new LBitmap(bitmapdata);
		 *  
		 *  	layer = new LSprite();
		 *  	layer.addChild(bitmap);
		 *  	layer.x = 20;
		 *  	layer.y = 50;
		 *  	layer.addShape(LShape.VERTICES, [[180, 20], [210, 40], [210, 60], [120, 110], [35, 100]]);
		 *  	layer.addShape(LShape.VERTICES, [[120, 110], [140, 120], [140, 150], [110, 160], [35, 120], [35, 100]]);
		 *  	addChild(layer);
		 *  
		 *  	layer.addEventListener(LEvent.ENTER_FRAME, onframe);
		 *  }
		 *  function onframe (e) {
		 *  	if (layer.hitTestPoint(mouseX, mouseY)) {
		 *  		layer.alpha = 0.5;
		 *  	} else {
		 *  		layer.alpha = 1;
		 *  	}
		 *  }
		 * @examplelink <p><a href="../../../api/LSprite/shapes.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * 衝突判定用形状リスト
		 * @property shapes
		 * @type Array
		 * @since 1.9.0
		 * @example
		 *  function loadBitmapdata (event) {
		 *  	var bitmapdata = new LBitmapData(event.currentTarget); 
		 *  	var bitmap = new LBitmap(bitmapdata);
		 *  
		 *  	layer = new LSprite();
		 *  	layer.addChild(bitmap);
		 *  	layer.x = 20;
		 *  	layer.y = 50;
		 *  	layer.addShape(LShape.VERTICES, [[180, 20], [210, 40], [210, 60], [120, 110], [35, 100]]);
		 *  	layer.addShape(LShape.VERTICES, [[120, 110], [140, 120], [140, 150], [110, 160], [35, 120], [35, 100]]);
		 *  	addChild(layer);
		 *  
		 *  	layer.addEventListener(LEvent.ENTER_FRAME, onframe);
		 *  }
		 *  function onframe (e) {
		 *  	if (layer.hitTestPoint(mouseX, mouseY)) {
		 *  		layer.alpha = 0.5;
		 *  	} else {
		 *  		layer.alpha = 1;
		 *  	}
		 *  }
		 * @examplelink <p><a href="../../../api/LSprite/shapes.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.shapes = new Array();
	}
	var p = {
		/** @language chinese
		 * 使用Box2dWeb的时候，需要用setRotate来设定角度
		 * @method setRotate
		 * @param {float} angle 角度。
		 * @since 1.4.0
		 * @public
		 */
		/** @language english
		 * Rotates the object by an angle, when you use the Box2dWeb
		 * @method setRotate
		 * @param {float} angle angle。
		 * @since 1.4.0
		 * @public
		 */
		/** @language japanese
		 * Box2dWebを利用する時，setRotateを使って角度を設定する
		 * @method setRotate
		 * @param {float} angle 角度。
		 * @since 1.4.0
		 * @public
		 */
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
			s.graphics.ll_show();
			LGlobal.show(s.childList);
			s.ll_debugShape();
		},
		/** @language chinese
		 * 允许用户拖动指定的 Sprite。Sprite 将一直保持可拖动，直到通过调用 Sprite.stopDrag() 方法来明确停止。
		 * @method startDrag
		 * @param {int} touchPointID 分配给触摸点的整数(触摸设备)。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/startDrag.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language english
		 * Lets the user drag the specified sprite. The sprite remains draggable until explicitly stopped through a call to the Sprite.stopDrag() method.
		 * @method startDrag
		 * @param {int} touchPointID An integer to assign to the touch point(a touch-enabled device).
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/startDrag.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language japanese
		 * 指定されたスプライトをユーザーがドラッグできるようにします。Sprite.stopDrag() メソッドを呼び出して明示的に停止する
		 * @method startDrag
		 * @param {int} touchPointID タッチポイントに割り当てる整数です(タッチ対応デバイス)。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/startDrag.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.8.9
		 */
		startDrag : function (touchPointID) {
			var s = this, r, c;
			if (s.ll_dragStart) {
				return;
			}
			s.ll_touchPointID = touchPointID;
			s.ll_dragStartX = s.x;
			s.ll_dragStartY = s.y;
			s.ll_dragMX = mouseX;
			s.ll_dragMY = mouseY;
			s.ll_dragStart = true;
			LGlobal.dragList.push(s);
		},
		/** @language chinese
		 * 结束 startDrag() 方法。
		 * @method stopDrag
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/stopDrag.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language english
		 * Ends the startDrag() method. 
		 * @method stopDrag
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/stopDrag.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.8.9
		 */
		/** @language japanese
		 * startDrag() メソッドを終了します。
		 * @method stopDrag
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/stopDrag.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.8.9
		 */
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
		/** @language chinese
		 * 获取显示对象的宽度，以像素为单位。
		 * @method getWidth
		 * @return {float} 显示对象的宽度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("width : " + layer.getWidth());
		 * @examplelink <p><a href="../../../api/LSprite/getWidth.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the width of the display object, in pixels.
		 * @method getWidth
		 * @return {float} the width of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("width : " + layer.getWidth());
		 * @examplelink <p><a href="../../../api/LSprite/getWidth.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの幅を取得します（ピクセル単位）。
		 * @method getWidth
		 * @return @return {float} オブジェクトの幅。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("width : " + layer.getWidth());
		 * @examplelink <p><a href="../../../api/LSprite/getWidth.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getWidth : function () {
			var s = this, i, l, o, a, b,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.x;
				if (typeof o._startX == "function") {
					a=o._startX();
				}
				b = a + o.getWidth();
				if (a < left) {
					left = a;
				}
				if (b > right) {
					right = b;
				}
			}
			s.ll_left = s.x + left;
			s.ll_right = s.x + right;
			return (right - left) * s.scaleX;
		},
		/** @language chinese
		 * 获取显示对象的高度，以像素为单位。
		 * @method getHeight
		 * @return {float} 显示对象的高度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("height : " + layer.getHeight());
		 * @examplelink <p><a href="../../../api/LSprite/getHeight.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the height of the display object, in pixels.
		 * @method getHeight
		 * @return {float} the height of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("height : " + layer.getHeight());
		 * @examplelink <p><a href="../../../api/LSprite/getHeight.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの高さを取得します（ピクセル単位）。
		 * @method getHeight
		 * @return @return {float} オブジェクトの高さ。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 *  trace("height : " + layer.getHeight());
		 * @examplelink <p><a href="../../../api/LSprite/getHeight.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getHeight : function () {
			var s = this, i, l, o, a, b,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.y;
				if (typeof o._startY == "function") {
					a=o._startY();
				}
				b = a + o.getHeight();
				if (a < top) {
					top = a;
				}
				if (b > bottom) {
					bottom = b;
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
		loopframe : function () {
			var s = this, k, l;
			for (k = 0, l = s.frameList.length; k < l; k++) {
				s.target = s;
				s.event_type = LEvent.ENTER_FRAME;
				s.frameList[k](s);
			}
		},
		/** @language chinese
		 * <p>将一个 DisplayObject 子实例添加到该 LSprite 实例中。子项将被添加到该 LSprite 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）</p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChild
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LSprite/addChild.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Adds a child DisplayObject instance to this LSprite instance. The child is added to the front (top) of all other children in this LSprite instance. (To add a child to a specific index position, use the addChildAt() method.)</p>
		 * <p>If you add a child object that already has a different display object container as a parent, the object is removed from the child list of the other display object container.</p>
		 * @method addChild
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LSprite/addChild.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>この DisplayObjectContainer インスタンスに子 LSprite インスタンスを追加します。子インスタンスは、この LSprite インスタンスにある他のすべての子の前（上）に追加されます（特定のインデックス位置に子を追加する場合は、addChildAt() メソッドを使用します）。</p>
		 * <p>既に異なる表示オブジェクトコンテナを親に持つ子オブジェクトを追加する場合は、もう一方の表示オブジェクトコンテナの子リストからそのオブジェクトが削除されます。</p>
		 * @method addChild
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LSprite/addChild.html" target="_blank">実際のサンプルを見る</a></p>
		 */
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
			return d;
		},
		/** @language chinese
		 * <p>将一个 LDisplayObject 子实例添加到该 LSprite 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 LSprite 对象的显示列表的后（底）部。</p>
		 * <p>例如，下例在索引位置 0、2、1 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LSprite/LSprite_layers.jpg" /></p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChild
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);


		 * @examplelink <p><a href="../../../api/LSprite/addChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Adds a child LDisplayObject instance to this LSprite instance. The child is added at the index position specified. An index of 0 represents the back (bottom) of the display list for this LSprite object.</p>
		 * <p>For example, the following example shows three display objects, labeled a, b, and c, at index positions 0, 2, and 1, respectively:</p>
		 * <p><img src="../../../api/LSprite/LSprite_layers.jpg" /></p>
		 * <p>If you add a child object that already has a different display object container as a parent, the object is removed from the child list of the other display object container.</p>
		 * @method addChild
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);


		 * @examplelink <p><a href="../../../api/LSprite/addChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>この DisplayObjectContainer インスタンスに子 LDisplayObject インスタンスを追加します。子インスタンスは、指定されたインデックス位置に追加されます。インデックス 0 は、この LSprite オブジェクトの表示リストの背景または一番下を表します。</p>
		 * <p>例えば、a、b、c というラベルの 3 個の表示オブジェクトをインデックス位置 0、2、1 にそれぞれ配置すると、以下のようになります。</p>
		 * <p><img src="../../../api/LSprite/LSprite_layers.jpg" /></p>
		 * <p>既に異なる表示オブジェクトコンテナを親に持つ子オブジェクトを追加する場合は、もう一方の表示オブジェクトコンテナの子リストからそのオブジェクトが削除されます。</p>
		 * @method addChild
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);


		 * @examplelink <p><a href="../../../api/LSprite/addChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
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
			return d;
		},
		/** @language chinese
		 * <p>从 LSprite 实例的子列表中删除指定的 child LDisplayObject 实例。将已删除子项的 parent 属性设置为 null；如果不存在对该子项的任何其它引用，则将该对象作为垃圾回收。LSprite 中该子项之上的任何显示对象的索引位置都减去 1。</p>
		 * @method removeChild
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/removeChild.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Removes the specified child LDisplayObject instance from the child list of the LSprite instance. The parent property of the removed child is set to null , and the object is garbage collected if no other references to the child exist. The index positions of any display objects above the child in the LSprite are decreased by 1.</p>
		 * @method removeChild
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/removeChild.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>LSprite インスタンスの子リストから指定の child LDisplayObject インスタンスを削除します。削除された子の parent プロパティは null に設定されます。その子に対する参照が存在しない場合、そのオブジェクトはガベージコレクションによって収集されます。LSprite の子より上位にある表示オブジェクトのインデックス位置は 1 つ下がります。</p>
		 * @method removeChild
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/removeChild.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		removeChild : function (d) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					if (LGlobal.destroy && d.die) {
						d.die();
					}
					s.childList.splice(i, 1);
					break;
				}
			}
			s.numChildren = s.childList.length;
			delete d.parent;
		},
		/** @language chinese
		 * 返回位于指定索引处的子显示对象实例。
		 * @method getChildAt
		 * @param {int} index 子对象的索引位置。
		 * @return {LDisplayObject} 位于指定索引位置处的子显示对象。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);



		 * @examplelink <p><a href="../../../api/LSprite/getChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns the child display object instance that exists at the specified index.
		 * @method getChildAt
		 * @param {int} index The index position of the child object.
		 * @return {LDisplayObject} The child display object at the specified index position.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);



		 * @examplelink <p><a href="../../../api/LSprite/getChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 指定のインデックス位置にある子表示オブジェクトインスタンスを返します。
		 * @method getChildAt
		 * @param {int} index 子オブジェクトのインデックス位置です。
		 * @return {LDisplayObject} 指定されたインデックス位置にある子表示オブジェクトです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);



		 * @examplelink <p><a href="../../../api/LSprite/getChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length == 0 || c.length <= i) {
				return null;
			}
			return c[i];
		},
		/** @language chinese
		 * 从 LSprite 的子列表中指定的 index 位置删除子 LDisplayObject。将已删除子项的 parent 属性设置为 null；如果没有对该子项的任何其他引用，则将该对象作为垃圾回收。LSprite 中该子项之上的任何显示对象的索引位置都减去 1。
		 * @method removeChildAt
		 * @param {int} index 要删除的 DisplayObject 的子索引。
		 * @return {LDisplayObject} 已删除的 DisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);

		 * 	container.removeChildAt(0); 


		 * @examplelink <p><a href="../../../api/LSprite/removeChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Removes a child LDisplayObject from the specified index position in the child list of the LSprite. The parent property of the removed child is set to null, and the object is garbage collected if no other references to the child exist. The index positions of any display objects above the child in the LSprite are decreased by 1.
		 * @method removeChildAt
		 * @param {int} index The child index of the LDisplayObject to remove.
		 * @return {LDisplayObject} The LDisplayObject instance that was removed.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);

		 * 	container.removeChildAt(0); 


		 * @examplelink <p><a href="../../../api/LSprite/removeChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LSprite の子リストの指定された index 位置から子 LDisplayObject を削除します。削除された子の parent プロパティは null に設定されます。その子に対する参照が存在しない場合、そのオブジェクトはガベージコレクションによって収集されます。LSprite の子より上位にある表示オブジェクトのインデックス位置は 1 つ下がります。
		 * @method removeChildAt
		 * @param {int} index 削除する LDisplayObject の子インデックスです。
		 * @return {LDisplayObject} 削除された LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);

		 * 	container.removeChildAt(0); 


		 * @examplelink <p><a href="../../../api/LSprite/removeChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		removeChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length <= i) {
				return;
			}
			if (LGlobal.destroy && c[i].die) {
				c[i].die();
			}
			var d = s.childList.splice(i, 1);
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * 返回 LDisplayObject 的 child 实例的索引位置。
		 * @method getChildIndex
		 * @param {LDisplayObject} child 要标识的 LDisplayObject 实例。
		 * @return {int} 要标识的子显示对象的索引位置。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);

		 * @examplelink <p><a href="../../../api/LSprite/getChildIndex.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns the index position of a child LDisplayObject instance.
		 * @method getChildIndex
		 * @param {LDisplayObject} The DisplayObject instance to identify.
		 * @return {int} The index position of the child display object to identify.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);

		 * @examplelink <p><a href="../../../api/LSprite/getChildIndex.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * child LDisplayObject インスタンスのインデックス位置を返します
		 * @method getChildIndex
		 * @param {LDisplayObject} 特定する LDisplayObject インスタンスです。
		 * @return {int} 特定する子表示オブジェクトのインデックス位置です。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);

		 * @examplelink <p><a href="../../../api/LSprite/getChildIndex.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getChildIndex : function (child) {
			var s = this, c = s.childList, i, l = c.length;
			for (i = 0; i < l; i++) {
				if (c[i].objectIndex == child.objectIndex) {
					return i;
				}
			}
			return -1;
		},
		/** @language chinese
		 * <p>更改现有子项在显示对象容器中的位置。这会影响子对象的分层。例如，下例在索引位置 0、1、2 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>在使用 setChildIndex() 方法并指定一个已经占用的索引位置时，唯一发生更改的位置是显示对象先前的位置和新位置之间的位置。所有其他位置将保持不变。如果将一个子项移动到比它当前的索引更低的索引处，则这两个索引之间的所有子项的索引引用都将增加 1。如果将一个子项移动到比它当前的索引更高的索引处，则这两个索引之间的所有子项的索引引用都将减小 1。例如，如果上例中的显示对象容器名为 container，则可以通过调用以下代码来交换带有 a 和 b 标记的显示对象的位置：</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>该代码产生以下对象排列：</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child 要为其更改索引编号的 LDisplayObject 子实例。
		 * @return {int} 生成的 child 显示对象的索引编号。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/setChildIndex.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Changes the position of an existing child in the display object container. This affects the layering of child objects. For example, the following example shows three display objects, labeled a, b, and c, at index positions 0, 1, and 2, respectively:</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>When you use the setChildIndex() method and specify an index position that is already occupied, the only positions that change are those in between the display object's former and new position. All others will stay the same. If a child is moved to an index LOWER than its current index, all children in between will INCREASE by 1 for their index reference. If a child is moved to an index HIGHER than its current index, all children in between will DECREASE by 1 for their index reference. For example, if the display object container in the previous example is named container, you can swap the position of the display objects labeled a and b by calling the following code:</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>This code results in the following arrangement of objects:</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child The child LDisplayObject instance for which you want to change the index number.
		 * @return {int} The resulting index number for the child display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/setChildIndex.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>表示オブジェクトコンテナの既存の子の位置を変更します。これは、子オブジェクトのレイヤーに影響します。例えば、a、b、c というラベルの 3 個の表示オブジェクトをインデックス位置 0、1、2 にそれぞれ配置すると、以下のようになります。</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>setChildIndex() を使用し、既に占有されているインデックス位置を指定した場合、表示オブジェクトの前の位置と新しい位置の間にある位置だけが変化します。その他は変化しません。現在のインデックスよりも小さいインデックスに子を移動すると、その間のすべての子が、それぞれのインデックス参照について 1 増加します。現在のインデックスよりも大きいインデックスに子を移動すると、その間のすべての子が、それぞれのインデックス参照について 1 減少します。例えば、上記の例の表示オブジェクトコンテナの名前が container である場合、次に示すコードを呼び出すことによって、a および b というラベルが付けられた表示オブジェクトの位置を入れ替えることができます。</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>このコードによって、次に示すようなオブジェクトの配置になります。</p>
		 * <p><img src="../../../api/LSprite/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child インデックス番号を変更する子 LDisplayObject インスタンスです。
		 * @return {int} child 表示オブジェクトの結果のインデックス番号です。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/setChildIndex.html" target="_blank">実際のサンプルを見る</a></p>
		 */
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
				if (LGlobal.destroy && c[i].die) {
					c[i].die();
				}
			}
			s.childList.length = 0;
			s.width = 0;
			s.height = 0;
			s.numChildren = 0;
		},
		/** @language chinese
		 * 返回一个LSprite的克隆对象。
		 * @method clone
		 * @return {LSprite} 一个新的 LSprite 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns a new LSprite object that is a clone of the original instance with an exact copy of the object.
		 * @method clone
		 * @return {LSprite} A new LSprite object that is identical to the original.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 新しい LSprite オブジェクトとして、元のインスタンスのクローンを返します。オブジェクトはまったく同じコピーになります。
		 * @method clone
		 * @return {LSprite} 元のオブジェクトと同一の新しい LSprite オブジェクトです。
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">実際のサンプルを見る</a></p>
		 */
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
		mouseEvent : function (e, type, cd) {
			if (!e) {
				return false;
			}
			var s = this, i, k, ox = e.offsetX, oy = e.offsetY, on, mc;
			if (!s.mouseEnabled || !s.visible) {
				return false;
			}
			if (cd == null) {
				cd = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			on = s.ismouseon(e, cd);
			if (on) {
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
								break;
							}
						}
					}
					if (s._mevent(type)) {
						s.ll_dispatchMouseEvent(type, e, cd, ox, oy);
					}
				}
				return true;
			} else {
				if (type == LMouseEvent.MOUSE_MOVE && s.ll_mousein) {
					s.ll_mousein = false;
					if (s._mevent(LMouseEvent.MOUSE_OUT)) {
						s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OUT, e, cd, ox, oy);
					}
				}
			}
			return false;
		},
		/** @language chinese
		 * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
		 * @method hitTestPoint
		 * @param {float} x 要测试的此对象的 x 坐标。
		 * @param {float} y 要测试的此对象的 y 坐标。
		 * @return {Boolean} 如果显示对象与指定的点重叠或相交，则为 true；否则为 false。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	var backLayer;
		 * 	var title;
		 * 	function main(){
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 		title = new LTextField();
		 * 		title.size = 18;
		 * 		title.x = 10;
		 * 		title.y = 5;
		 * 		title.text = "hitTestPoint:false";
		 * 		addChild(title);
		 * 		var layer = new LSprite();
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.graphics.drawRect(0,"#880088",[0,0,100,40],true,"#880088");
		 * 		layer.addShape(LShape.RECT,[0,0,100,40]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 200;
		 * 		layer.y = 100;
		 * 		layer.graphics.drawArc(0,"#880088",[0,0,30,0,2*Math.PI],true,"#880088");
		 * 		layer.addShape(LShape.ARC,[0,0,30]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 120;
		 * 		layer.y = 150;
		 * 		layer.graphics.drawVertices(0,"#880088",[[10,10],[50,100],[100,70]],true,"#880088");
		 * 		layer.addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]]);
		 * 		backLayer.addChild(layer);
		 * 	}
		 * 	function onframe(e){
		 * 		for(var i=0;i<backLayer.childList.length;i++){
		 * 			if(backLayer.childList[i].hitTestPoint(mouseX,mouseY)){
		 * 				title.text = "hitTestPoint:true";
		 * 				return;
		 * 			}
		 * 		}
		 * 		title.text = "hitTestPoint:false";
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/hitTestPoint.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Evaluates the display object to see if it overlaps or intersects with the point specified by the x and y parameters. The x and y parameters specify a point in the coordinate space of the Stage, not the display object container that contains the display object (unless that display object container is the Stage).
		 * @method hitTestPoint
		 * @param {float} x The x coordinate to test against this object.
		 * @param {float} y The y coordinate to test against this object.
		 * @return {Boolean} true if the display object overlaps or intersects with the specified point; false otherwise.
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	var backLayer;
		 * 	var title;
		 * 	function main(){
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 		title = new LTextField();
		 * 		title.size = 18;
		 * 		title.x = 10;
		 * 		title.y = 5;
		 * 		title.text = "hitTestPoint:false";
		 * 		addChild(title);
		 * 		var layer = new LSprite();
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.graphics.drawRect(0,"#880088",[0,0,100,40],true,"#880088");
		 * 		layer.addShape(LShape.RECT,[0,0,100,40]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 200;
		 * 		layer.y = 100;
		 * 		layer.graphics.drawArc(0,"#880088",[0,0,30,0,2*Math.PI],true,"#880088");
		 * 		layer.addShape(LShape.ARC,[0,0,30]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 120;
		 * 		layer.y = 150;
		 * 		layer.graphics.drawVertices(0,"#880088",[[10,10],[50,100],[100,70]],true,"#880088");
		 * 		layer.addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]]);
		 * 		backLayer.addChild(layer);
		 * 	}
		 * 	function onframe(e){
		 * 		for(var i=0;i<backLayer.childList.length;i++){
		 * 			if(backLayer.childList[i].hitTestPoint(mouseX,mouseY)){
		 * 				title.text = "hitTestPoint:true";
		 * 				return;
		 * 			}
		 * 		}
		 * 		title.text = "hitTestPoint:false";
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/hitTestPoint.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトを評価して、x および y パラメーターで指定されたポイントと重複または交差するかどうかを調べます。x および y パラメーターは、表示オブジェクトが含まれる表示オブジェクトコンテナではなく Stage の座標空間内のポイントを指定します（その表示オブジェクトコンテナが Stage の場合を除く）。
		 * @method hitTestPoint
		 * @param {float} x このオブジェクトの検査の基準となる x 座標です。
		 * @param {float} y このオブジェクトの検査の基準となる y 座標です。
		 * @return {Boolean} 指定されたポイントと表示オブジェクトが重複または交差する場合は true、そうでなければ false です。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	var backLayer;
		 * 	var title;
		 * 	function main(){
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 		title = new LTextField();
		 * 		title.size = 18;
		 * 		title.x = 10;
		 * 		title.y = 5;
		 * 		title.text = "hitTestPoint:false";
		 * 		addChild(title);
		 * 		var layer = new LSprite();
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.graphics.drawRect(0,"#880088",[0,0,100,40],true,"#880088");
		 * 		layer.addShape(LShape.RECT,[0,0,100,40]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 200;
		 * 		layer.y = 100;
		 * 		layer.graphics.drawArc(0,"#880088",[0,0,30,0,2*Math.PI],true,"#880088");
		 * 		layer.addShape(LShape.ARC,[0,0,30]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 120;
		 * 		layer.y = 150;
		 * 		layer.graphics.drawVertices(0,"#880088",[[10,10],[50,100],[100,70]],true,"#880088");
		 * 		layer.addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]]);
		 * 		backLayer.addChild(layer);
		 * 	}
		 * 	function onframe(e){
		 * 		for(var i=0;i<backLayer.childList.length;i++){
		 * 			if(backLayer.childList[i].hitTestPoint(mouseX,mouseY)){
		 * 				title.text = "hitTestPoint:true";
		 * 				return;
		 * 			}
		 * 		}
		 * 		title.text = "hitTestPoint:false";
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/hitTestPoint.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		hitTestPoint : function (x, y) {
			var s = this, shapes = s.shapes;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			return s.ismouseonShapes(shapes, x, y);
		},
		/** @language chinese
		 * 计算显示对象的边框，以确定它是否与 obj 显示对象的边框重叠或相交。
		 * @method hitTestObject
		 * @param {LDisplayObject} obj 要测试的显示对象。
		 * @return {Boolean} 如果显示对象的边框相交，则为 true；否则为 false。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = new LSprite();
		 * 	circle2.x = 120;
		 * 	circle2.graphics.drawRect(1,"#FF0000",[0,0,100,100],true,"#FF0000");
		 * 	var circle3 = new LSprite();
		 * 	circle3.x = 60;
		 * 	circle3.y = 60;
		 * 	circle3.graphics.drawRect(1,"#008800",[0,0,100,100],true,"#008800");
		 * 	container.addChild(circle1);
		 * 	container.addChild(circle2);
		 * 	container.addChild(circle3);



		 * @examplelink <p><a href="../../../api/LSprite/hitTestObject.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Evaluates the bounding box of the display object to see if it overlaps or intersects with the bounding box of the obj display object.
		 * @method hitTestObject
		 * @param {LDisplayObject} obj The display object to test against.
		 * @return {Boolean} true if the bounding boxes of the display objects intersect; false if not.
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = new LSprite();
		 * 	circle2.x = 120;
		 * 	circle2.graphics.drawRect(1,"#FF0000",[0,0,100,100],true,"#FF0000");
		 * 	var circle3 = new LSprite();
		 * 	circle3.x = 60;
		 * 	circle3.y = 60;
		 * 	circle3.graphics.drawRect(1,"#008800",[0,0,100,100],true,"#008800");
		 * 	container.addChild(circle1);
		 * 	container.addChild(circle2);
		 * 	container.addChild(circle3);



		 * @examplelink <p><a href="../../../api/LSprite/hitTestObject.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの境界ボックスを評価して、obj 表示オブジェクトの境界ボックスと重複または交差するかどうかを調べます。
		 * @method hitTestObject
		 * @param {LDisplayObject} obj 検査の対象となる表示オブジェクトです。
		 * @return {Boolean} 表示オブジェクトの境界ボックスが交差する場合は true を返します。交差しない場合は false を返します。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = new LSprite();
		 * 	circle2.x = 120;
		 * 	circle2.graphics.drawRect(1,"#FF0000",[0,0,100,100],true,"#FF0000");
		 * 	var circle3 = new LSprite();
		 * 	circle3.x = 60;
		 * 	circle3.y = 60;
		 * 	circle3.graphics.drawRect(1,"#008800",[0,0,100,100],true,"#008800");
		 * 	container.addChild(circle1);
		 * 	container.addChild(circle2);
		 * 	container.addChild(circle3);



		 * @examplelink <p><a href="../../../api/LSprite/hitTestObject.html" target="_blank">実際のサンプルを見る</a></p>
		 */
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
		},
		clearShape : function () {
			var s = this;
			s.shapes.length = 0;
		},
		ll_debugShape : function () {
			var s = this, i, l, child, c, arg, j, ll;
			if (!LGlobal.traceDebug || s.shapes.length == 0) {
				return;
			}
			for (i = 0, l = s.shapes.length; i < l; i++) {
				child = s.shapes[i];
				c = LGlobal.canvas;
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
			if (s.graphics) {
				i = s.graphics.ismouseon(e, sc);
			}
			if (!i) {
				for (k = l.length - 1; k >= 0; k--) {
					if (l[k].ismouseon) {
						i = l[k].ismouseon(e, sc);
					}
					if (i) {
						e.target = s.childList[k];
						break;
					}
				}
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
/*
* LButton.js
**/
function LButton(upState,overState,downState,disableState){
	var s = this;
	base(s,LSprite,[]);
	s.type = "LButton";
	s.buttonMode = true;
	s.addChild(upState);
	if(!overState){
		overState = upState;
	}else{
		s.addChild(overState);
	}
	if(!downState){
		downState = overState;
	}else{
		s.addChild(downState);
	}
	if(!disableState){
		disableState = upState;
	}else{
		s.addChild(disableState);
	}
	s.upState = s.bitmap_up = upState;
	s.overState = s.bitmap_over = overState;
	s.downState = downState;
	s.disableState = disableState;
	
	s.overState.visible = false;
	s.downState.visible = false;
	s.upState.visible = true;
	s.staticMode = false;
	s.setState(LButton.STATE_ENABLE);
	s.addEventListener(LMouseEvent.MOUSE_OVER,s.ll_modeOver);
	s.addEventListener(LMouseEvent.MOUSE_OUT,s.ll_modeOut);
	s.addEventListener(LMouseEvent.MOUSE_DOWN,s.ll_modeDown);
}
LButton.STATE_DISABLE = "disable";
LButton.STATE_ENABLE = "enable";
LButton.prototype.setState = function (state){
	var s = this;
	if(state == LButton.STATE_DISABLE){
		s.upState.visible = false;
		s.overState.visible = false;
		s.downState.visible = false;
		s.disableState.visible = true;
	}else if(state == LButton.STATE_ENABLE){
		s.overState.visible = false;
		s.downState.visible = false;
		s.disableState.visible = false;
		s.upState.visible = true;
	}else{
		return;
	}
	s.state = state;
};
LButton.prototype.ll_modeDown = function (e){
	var s = e.clickTarget,w,h,tw,th,x,y,tx,ty,onComplete;
	if(!s.buttonMode || s.tween){
		return;
	}
	if(s.state == LButton.STATE_DISABLE){
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
		delete s.tween;
		s._tweenOver({clickTarget:s});
		delete s._tweenOver;
	};
	if(s.staticMode){
		s.tween = LTweenLite.to(s.downState,0.3,{})
		.to(s.downState,0.1,{onComplete:onComplete});
	}else{
		w = s.downState.getWidth();
		h = s.downState.getHeight();
		tw = w*1.1;
		th = h*1.1;
		x = s.downState.x;
		y = s.downState.y;
		tx = x+(w - tw)*0.5;
		ty = y+(h - th)*0.5;
		s.tween = LTweenLite.to(s.downState,0.3,{x:tx,y:ty,scaleX:1.1,scaleY:1.1,ease:Quart.easeOut})
		.to(s.downState,0.1,{x:x,y:y,scaleX:1,scaleY:1,ease:Quart.easeOut,onComplete:onComplete});
	}
};
LButton.prototype.ll_modeOver = function (e){
	var s = e.clickTarget;
	if(!s.buttonMode){
		return;
	}
	if(s.tween){
		s._tweenOver = s.ll_modeOver;
		return;
	}
	if(s.state == LButton.STATE_DISABLE){
		s.upState.visible = false;
		s.overState.visible = false;
		s.downState.visible = false;
		s.disableState.visible = true;
		return;
	}
	s.upState.visible = false;
	s.downState.visible = false;
	s.overState.visible = true;
};
LButton.prototype.ll_modeOut = function (e){
	var s = e.clickTarget;
	if(!s.buttonMode){
		return;
	}
	if(s.tween){
		s._tweenOver = s.ll_modeOut;
		return;
	}
	if(s.state == LButton.STATE_DISABLE){
		s.upState.visible = false;
		s.overState.visible = false;
		s.downState.visible = false;
		s.disableState.visible = true;
		return;
	}
	s.overState.visible = false;
	s.downState.visible = false;
	s.upState.visible = true;
};
LButton.prototype.clone = function (){
	var s = this;
	return new LButton(s.upState.clone(),s.overState.clone(),s.downState.clone(),s.disableState.clone());
};
function LBlendMode(){throw "LBlendMode cannot be instantiated";}
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
/*
* LTextFieldType.js
**/
var LTextFieldType = function (){throw "LTextFieldType cannot be instantiated";};
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;
/*
* LTextField.js
**/
function LTextField(){
	var s = this;
	base(s,LInteractiveObject,[]);
	s.type = "LTextField";
	s.texttype = null;
	s.text = "";
	s.font = "Arial";
	s.size = "11";
	s.color = "#000000";
	s.weight = "normal";
	s.textAlign = "left";
	s.textBaseline = "top";
	s.lineWidth = 1;
	s.width = 150;
	s.height = s.size;
	s.stroke = false;
	s.displayAsPassword = false;
	s.wordWrap=false;
	s.multiline = false;
	s.numLines = 1;
}
p = {
	_showReady:function(c){
		var s = this;
		c.font = s.weight + " " + s.size+"pt "+s.font;  
		c.textAlign = s.textAlign;
		c.textBaseline = s.textBaseline;
		c.lineWidth = s.lineWidth;  
	},
	_ll_show:function (c){
		var s = this;
		if(s.texttype == LTextFieldType.INPUT){
			s.inputBackLayer.ll_show();
			var rc = s.getRootCoordinate();
		    if(LGlobal.inputBox.name == "input"+s.objectIndex){
		    	LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY())*parseInt(LGlobal.canvasObj.style.height)/LGlobal.canvasObj.height) >>> 0)) + "px";
		    	LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX())*parseInt(LGlobal.canvasObj.style.width)/LGlobal.canvasObj.width) >>> 0)) + "px";
		    }
		}
		var lbl = s.text;
		if(s.displayAsPassword){
			lbl = '';
			for(var i=0,l=s.text.length;i<l;i++)lbl+='*';
		}
		var d;
		if(s.stroke){
			c.strokeStyle = s.color;
			d = c.strokeText;
		}else{
			c.fillStyle = s.color;
			d = c.fillText;
		}
		if(s.wordWrap || s.multiline){
			var i,l,j=0,k=0,m=0,b=0;
			for(i=0,l=s.text.length;i<l;i++){
				j = c.measureText(s.text.substr(k,i-k)).width;
				var enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i,1));
				if((s.wordWrap && j > s.width) || enter){
					j = 0;
					k = i;
					m++;
					if(enter)k++;
				}
				if(!enter)d.apply(c,[lbl.substr(i,1),j,m*s.wordHeight,c.measureText(lbl).width]);
				s.numLines = m;
			}
			s.height = (m+1)*s.wordHeight;
		}else{
			s.numLines = 1;
			d.apply(c,[lbl,0,0,c.measureText(lbl).width]);
		}
		if(s.wind_flag){
			s.windRun();
		}
	},
	_wordHeight:function(h){
		var s = this;
		if(h>0){
			s.wordHeight = h;
		}else{
			s.wordWrap = false;
			s.wordHeight = s.getHeight();
		}
		s.height = 0;
	},
	setMultiline:function(v,h){
		var s = this;
		if(v){s._wordHeight(h);}
		s.multiline = v;
	},
	setWordWrap:function(v,h){
		var s = this;
		if(v){s._wordHeight(h);}
		s.wordWrap = v;
	},
	setType:function(type,inputBackLayer){
		var s = this;
		if(s.texttype != type && type == LTextFieldType.INPUT){
			if(inputBackLayer==null || inputBackLayer.type != "LSprite"){
				s.inputBackLayer = new LSprite();
				s.inputBackLayer.graphics.drawRect(1,"#000000",[0, -s.getHeight()*0.4, s.width, s.getHeight()*1.5]);
			}else{
				s.inputBackLayer = inputBackLayer;
			}
			s.inputBackLayer.parent = s;
			if(LGlobal.mouseEventContainer[LMouseEvent.MOUSE_DOWN])LMouseEventContainer.pushInputBox(s);
		}else{
			s.inputBackLayer = null;
			LMouseEventContainer.removeInputBox(s);
		}
		s.texttype = type;
	},
	ismouseon:function(e,cood){
		var s = this,ox,oy;
		if(e==null || e == UNDEFINED)return false;
		if(!s.visible)return false;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1};
		if(s.mask){
			if(!s.mask.parent){
				s.mask.parent = s.parent;
			}
			if(!s.mask.ismouseon(e,cd)){
				return false;
			}
		}
		if(s.inputBackLayer){
			return s.inputBackLayer.ismouseon(e,{x:s.x*cood.scaleX+cood.x,y:s.y*cood.scaleY+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY});
		}
		return s.ismouseonShapes([{type:LShape.RECT,arg:[0,0,s._getWidth(),s._getHeight()]}],e.offsetX,e.offsetY);
	},
	clone:function(){
		var s = this,a = new LTextField();
		a.copyProperty(s);
		a.texttype = null;
		if(s.texttype ==  LTextFieldType.INPUT){
			a.setType( LTextFieldType.INPUT);
		}
		return a;
	},
	mouseEvent:function (event,type,cood){
		var s = this;
		if(s.inputBackLayer == null)return;
		var on = s.ismouseon(event,cood);
		if(type != LMouseEvent.MOUSE_DOWN || !on)return;
		s.focus();
	},
	_ll_getValue:function (){
		if(LGlobal.inputBox.style.display != NONE){
			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
			LEvent.removeEventListener(LGlobal.inputTextBox,LKeyboardEvent.KEY_DOWN,LGlobal.inputTextField._ll_input);
			LGlobal.inputBox.style.display = NONE;
		}
	},
	_ll_input:function(e){
		var event = new LEvent(LTextEvent.TEXT_INPUT);
		event.keyCode = e.keyCode;
		LGlobal.inputTextField.dispatchEvent(event);
	},
	focus:function(){
		var s = this;
		if(!s.parent){
			return;
		}
		s._ll_getValue();
		var sc = s.getAbsoluteScale();
		LGlobal.inputBox.style.display = "";
		LGlobal.inputBox.name = "input"+s.objectIndex;
		LGlobal.inputTextField = s;
		LGlobal.inputTextareaBoxObj.style.display = NONE;
		LGlobal.inputTextBoxObj.style.display = NONE;
		LGlobal.passwordBoxObj.style.display = NONE;
		if(s.displayAsPassword){
			LGlobal.inputTextBox = LGlobal.passwordBoxObj;
		}else if(s.multiline){
			LGlobal.inputTextBox = LGlobal.inputTextareaBoxObj;
		}else{
			LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
		}
		var sx = parseInt(LGlobal.canvasObj.style.width)/LGlobal.canvasObj.width,sy = parseInt(LGlobal.canvasObj.style.height)/LGlobal.canvasObj.height;
		LGlobal.inputTextBox.style.display = "";
		LGlobal.inputTextBox.value = s.text;
		LGlobal.inputTextBox.style.height = s.inputBackLayer.getHeight()*sc.scaleY*s.scaleY*sy+"px";
		LGlobal.inputTextBox.style.width = s.inputBackLayer.getWidth()*sc.scaleX*s.scaleX*sx+"px";
		s.text = "";
		LEvent.addEventListener(LGlobal.inputTextBox,LKeyboardEvent.KEY_DOWN,LGlobal.inputTextField._ll_input);
		setTimeout(function(){LGlobal.inputTextBox.focus();},50);
	},
	_getWidth:function(){
		var s = this;
		if(s.wordWrap)return s.width;
		LGlobal.canvas.font = s.size+"pt "+s.font;
		return LGlobal.canvas.measureText(s.text).width;
	},
	getWidth:function(){
		var s = this;
		return s._getWidth()*s.scaleX;
	},
	_getHeight:function(){
		var s = this,c = LGlobal.canvas;
		if(s.wordWrap){
			c.font = s.weight + " " + s.size+"pt "+s.font;
			if(s.height == 0){  
				var i,l,j=0,k=0,m=0;
				for(i=0,l=s.text.length;i<l;i++){
					j = c.measureText(s.text.substr(k,i-k)).width;
					var enter = /(?:\r\n|\r|\n|¥n)/.exec(s.text.substr(i,1));
					if((s.wordWrap && j > s.width) || enter){
						j = 0;
						k = i;
						m++;
						if(enter)k++;
					}
				}
				s.height = (m+1)*s.wordHeight;
			}
			return s.height;
		}
		c.font = s.weight + " " + s.size+"pt "+s.font; 
		return c.measureText("O").width*1.2;
	},
	getHeight:function(){
		var s = this;
		return s._getHeight()*s.scaleY;
	},
	wind:function(listener){
		var s = this;
		s.wind_over_function = listener;
		s.wind_flag = true;
		s.wind_text = s.text;
		s.text = "";
		s.wind_length = 0;
	},
	windRun:function(){
		var s = this;
		if(s.wind_length > s.wind_text.length){
			s.wind_flag = false;
			if(s.wind_over_function)s.wind_over_function();
			return;
		}
		s.text = s.wind_text.substring(0,s.wind_length);
		s.wind_length++;
	},
	die:function(){
		LMouseEventContainer.removeInputBox(this);
	}
};
for(var k in p)LTextField.prototype[k]=p[k];
/*
* LLabel.js
**/
function LLabel(){
	var s = this;
	base(s,LTextField,[]);
	s.width = LGlobal.width;
}
/** @language chinese
 * 初始化 LBitmap 对象以引用指定的 LBitmapData 对象。
 * LBitmap 类表示用于表示位图图像的显示对象。这些图像可以是使用 LLoader 类加载的图像，也可以是使用 LBitmap() 构造函数创建的图像。
 * 利用 LBitmap() 构造函数，可以创建包含对 LBitmapData 对象的引用的 LBitmap 对象。创建了 LBitmap 对象后，使用父实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中。
 * 一个 LBitmap 对象可在若干 LBitmap 对象之中共享其 LBitmapData 引用，与转换属性或旋转属性无关。由于能够创建引用相同 LBitmapData 对象的多个 LBitmap 对象，因此，多个显示对象可以使用相同的复杂 LBitmapData 对象，而不会因为每个显示对象实例使用一个 LBitmapData 对象而产生内存开销。
 * LBitmap 对象可通过以下两种方式之一将 LBitmapData 对象绘制到屏幕上：使用矢量渲染器作为填充位图形状，或使用更快的像素复制例程。像素复制例程的速度比矢量渲染器要快很多。
 * 注意：LBitmap 类不是 InteractiveObject 类的子类，因此它无法调度鼠标事件。但是，可以使用包含 LBitmap 对象的显示对象容器的 addEventListener() 方法。
 * @class LBitmap
 * @extends LDisplayObject
 * @constructor
 * @param {LBitmapData} bitmapData 被引用的 LBitmapData 对象。
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmap/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Initializes a LBitmap object to refer to the specified LBitmapData object.
 * The LBitmap class represents display objects that represent bitmap images. These can be images that you load with the LLoader class, or they can be images that you create with the LBitmap() constructor.
 * The LBitmap() constructor allows you to create a Bitmap object that contains a reference to a BitmapData object. After you create a LBitmap object, use the addChild() or addChildAt() method of the parent instance to place the bitmap on the display list.
 * A LBitmap object can share its BitmapData reference among several Bitmap objects, independent of translation or rotation properties. Because you can create multiple LBitmap objects that reference the same BitmapData object, multiple display objects can use the same complex BitmapData object without incurring the memory overhead of a BitmapData object for each display object instance.
 * A LBitmapData object can be drawn to the screen by a LBitmap object in one of two ways: by using the vector renderer as a fill-bitmap shape, or by using a faster pixel-copying routine. The pixel-copying routine is substantially faster than the vector renderer.
 * The LBitmap class is not a subclass of the InteractiveObject class, so it cannot dispatch mouse events. However, you can use the addEventListener() method of the display object container that contains the LBitmap object.
 * @class LBitmap
 * @extends LDisplayObject
 * @constructor
 * @param {LBitmapData} bitmapData The LBitmapData object being referenced.
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmap/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 指定された LBitmapData オブジェクトを参照するようにビットマップオブジェクトを初期化します。
 * LBitmap クラスはビットマップイメージを表す表示オブジェクトを表します。これらは LLoader クラスによってロードするイメージか、LBitmap() コンストラクターによって作成するイメージです。
 * LBitmap() コンストラクターを使用すると、LBitmapData オブジェクトへの参照を含んだビットマップオブジェクトを作成できます。ビットマップオブジェクトの作成後、親 DisplayObjectContainer インスタンスの addChild() メソッドまたは addChildAt() メソッドを使用して表示リスト上にビットマップを配置できます。
 * LBitmap オブジェクトの BitmapData への参照は、translation プロパティまたは rotation プロパティと関係なく、複数の LBitmap オブジェクトで共有できます。作成した複数のビットマップオブジェクトで同じ LBitmapData オブジェクトを参照することができるため、各表示オブジェクトインスタンスに関する LBitmapData オブジェクトのメモリのオーバーヘッドを避けつつ、複数の表示オブジェクトで同一の複雑な LBitmapData オブジェクトを使用することができます。
 * LBitmap オブジェクトを使用して LBitmapData オブジェクトを画面に描画するには、ベクターレンダラーをビットマップ塗りつぶしのシェイプとして使用するか、高速なピクセルコピールーチンを使用します。ピクセルコピールーチンはベクターレンダラーよりも高速です。
 * 注意：LBitmap クラスは InteractiveObject クラスのサブクラスではないため、マウスイベントを送出できません。しかし、ビットマップオブジェクトを格納した表示オブジェクトコンテナの addEventListener() メソッドを使用できます。
 * @class LBitmap
 * @extends LDisplayObject
 * @constructor
 * @param {LBitmapData} bitmapData LBitmapData オブジェクトが参照されます。
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmap/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LBitmap = (function () {
	function LBitmap (bitmapdata) {
		var s = this;
		LExtends(s, LDisplayObject, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LBitmap
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * type of the object
		 * @property type
		 * @type String
		 * @default LBitmap
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのタイプ
		 * @property type
		 * @type String
		 * @default LBitmap
		 * @since 1.0.0
		 * @public
		 */
		s.type = "LBitmap";
		/** @language chinese
		 * 对象的类型
		 * @property rotateCenter
		 * @type Boolean
		 * @default true
		 * @since 1.8.0
		 * @public
		 */
		/** @language english
		 * type of the object
		 * @property rotateCenter
		 * @type Boolean
		 * @default true
		 * @since 1.8.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのタイプ
		 * @property rotateCenter
		 * @type Boolean
		 * @default true
		 * @since 1.8.0
		 * @public
		 */
		s.rotateCenter = true;
		/** @language chinese
		 * 被引用的 LBitmapData 对象
		 * @property bitmapData
		 * @type LBitmapData
		 * @default true
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * The LBitmapData object being referenced.
		 * @property bitmapData
		 * @type LBitmapData
		 * @default true
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * LBitmapData オブジェクトが参照されます
		 * @property bitmapData
		 * @type LBitmapData
		 * @default true
		 * @since 1.0.0
		 * @public
		 */
		s.bitmapData = bitmapdata; 
		if (s.bitmapData) {
			s.width = s.bitmapData.width;
			s.height = s.bitmapData.height;
		}
	}
	var p = {
		_canShow : function () {
			return (this.visible && this.bitmapData);
		}
		, _rotateReady : function () {
			var s = this;
			if (s.rotate != 0 && s.rotateCenter) {
				s.rotatex = s.getWidth() * 0.5;
				s.rotatey = s.getHeight() * 0.5;
			} else {
				s.rotatex = s.rotatey = 0;
			}
		},
		_coordinate : function (c) {},
		_ll_show : function () {
			this.ll_draw();
		},
		ll_draw : function () {
			var s = this;
			LGlobal.canvas.drawImage(s.bitmapData.image,
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
		/** @language chinese
		 * 返回一个LBitmap的克隆对象。
		 * @method clone
		 * @return {LBitmap} 一个新的 LBitmap 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd);
		 * 	addChild(bm1);
		 * 	
		 * 	var bm2 = bm1.clone();
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmap/clone.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns a new LBitmap object that is a clone of the original instance with an exact copy of the contained bitmap.
		 * @method clone
		 * @return {LBitmap} A new LSprite object that is identical to the original.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd);
		 * 	addChild(bm1);
		 * 	
		 * 	var bm2 = bm1.clone();
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmap/clone.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 新しい LBitmap オブジェクトとして、元のインスタンスのクローンを返します。含まれるビットマップはまったく同じコピーになります。
		 * @method clone
		 * @return {LBitmap} 元のオブジェクトと同一の新しい LBitmap オブジェクトです。
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd);
		 * 	addChild(bm1);
		 * 	
		 * 	var bm2 = bm1.clone();
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmap/clone.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		clone : function () {
			var s = this, a = new LBitmap(s.bitmapData.clone());
			a.copyProperty(s);
			a.rotateCenter = s.rotateCenter;
			return a;
		},
		ismouseon : function (e, cood) {
			var s = this;
			if (e == null || e == UNDEFINED) {
				return false;
			}
			if (!s.visible || !s.bitmapData) {
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
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s.bitmapData.width, s.bitmapData.height]}], e.offsetX, e.offsetY);
		},
		/** @language chinese
		 * 获取显示对象的宽度，以像素为单位。
		 * @method getWidth
		 * @return {float} 显示对象的宽度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 *  trace("width : " + bitmap.getWidth());
		 * @examplelink <p><a href="../../../api/LBitmap/getWidth.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the width of the display object, in pixels.
		 * @method getWidth
		 * @return {float} the width of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 *  trace("width : " + bitmap.getWidth());
		 * @examplelink <p><a href="../../../api/LBitmap/getWidth.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの幅を取得します（ピクセル単位）。
		 * @method getWidth
		 * @return @return {float} オブジェクトの幅。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 *  trace("width : " + bitmap.getWidth());
		 * @examplelink <p><a href="../../../api/LBitmap/getWidth.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getWidth : function () {
			var s = this;
			return s.bitmapData != null ? s.bitmapData.width * (s.scaleX > 0 ? s.scaleX : -s.scaleX) : 0;
		},
		/** @language chinese
		 * 获取显示对象的高度，以像素为单位。
		 * @method getHeight
		 * @return {float} 显示对象的高度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 *  trace("height : " + bitmap.getHeight());
		 * @examplelink <p><a href="../../../api/LBitmap/getHeight.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the height of the display object, in pixels.
		 * @method getHeight
		 * @return {float} the height of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 *  trace("height : " + bitmap.getHeight());
		 * @examplelink <p><a href="../../../api/LBitmap/getHeight.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの高さを取得します（ピクセル単位）。
		 * @method getHeight
		 * @return @return {float} オブジェクトの高さ。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 *  trace("height : " + bitmap.getHeight());
		 * @examplelink <p><a href="../../../api/LBitmap/getHeight.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getHeight : function () {
			var s = this;
			return s.bitmapData != null ? s.bitmapData.height * (s.scaleY > 0 ? s.scaleY : -s.scaleY) : 0;
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

/** @language chinese
 * <p>创建一个具有指定的宽度和高度的 LBitmapData 对象。</p>
 * <p>使用 LBitmapData 类，您可以处理 LBitmap 对象的数据（像素）。可以使用 LBitmapData 类的方法创建任意大小的Image对象，并在运行时采用多种方式操作这些图像。也可以访问使用 LLoader 类加载的Image对象。</p>
 * @class LBitmapData
 * @extends LObject
 * @constructor
 * @param {Image} image 一个Image对象。
 * @param {float} x Image可视范围x坐标（该参数可省略）。
 * @param {float} y Image可视范围y坐标（该参数可省略）。
 * @param {float} width Image可视范围宽（该参数可省略）。
 * @param {float} height Image可视范围高（该参数可省略）。
 * @param {String} dataType 指定数据格式，可以使用LBitmapData.DATA_IMAGE（Image对象）和LBitmapData.DATA_CANVAS（Canvas对象）（该参数可省略）。
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 		
 * 		var bitmapdata2 = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bitmap2 = new LBitmap(bitmapdata2);
 * 		bitmap2.x = 200;
 * 		addChild(bitmap2);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmapData/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
*/
/** @language english
 * Creates a BitmapData object with a specified width and height.
 * The BitmapData class lets you work with the data (pixels) of a Bitmap object . You can use the methods of the BitmapData class to create arbitrarily sized an Image object. And You can use an Image object with LLoader。
 * @class LBitmapData
 * @extends LObject
 * @constructor
 * @param {Image} image The Image object。
 * @param {float} x The x coordinate of the image.(Optional).
 * @param {float} y The y coordinate of the image.(Optional).
 * @param {float} width The width of the bitmap image in pixels.(Optional).
 * @param {float} height The height of the bitmap image in pixels.(Optional).
 * @param {String} dataType You can use the type with LBitmapData.DATA_IMAGE（Image object）or LBitmapData.DATA_CANVAS（Canvas object）。(Optional).
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 		
 * 		var bitmapdata2 = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bitmap2 = new LBitmap(bitmapdata2);
 * 		bitmap2.x = 200;
 * 		addChild(bitmap2);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmapData/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 指定された幅と高さで BitmapData オブジェクトを作成します。
 * LBitmapData クラスを使用すると、LBitmap オブジェクトのデータ (ピクセル) を処理できます。LBitmapData クラスのメソッドを使用して、任意のサイズのImageを作成し、実行時に様々な方法で操作できます。LLoaderを使ってロードしたImageも利用することができます。
 * @class LBitmapData
 * @extends LObject
 * @constructor
 * @param {Image} image Image型オブジェクト。
 * @param {float} x Imageの表示範囲の座標x.(省略可).
 * @param {float} y Imageの表示範囲の座標y.(省略可).
 * @param {float} width Imageの表示範囲の幅。(省略可).
 * @param {float} height Imageの表示範囲の高さ。(省略可).
 * @param {String} dataType データータイプを指定する，使えるタイプはLBitmapData.DATA_IMAGE（Imageオブジェクト）とLBitmapData.DATA_CANVAS（Canvasオブジェクト）です。(省略可).
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 		
 * 		var bitmapdata2 = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bitmap2 = new LBitmap(bitmapdata2);
 * 		bitmap2.x = 200;
 * 		addChild(bitmap2);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmapData/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LBitmapData = (function () {
	function LBitmapData (image, x, y, width, height, dataType) {
		var s = this;
		LExtends (s, LObject, []);
		s.type = "LBitmapData";
		if (typeof dataType == UNDEFINED) {
			dataType = LBitmapData.DATA_IMAGE;
		}
		s.oncomplete = null;
		s._locked = false;
		s._setPixel = false;
		/** @language chinese
		 * 位图图像的位置x，以像素为单位。
		 * @property x
		 * @type float
		 * @public
		 */
		/** @language english
		 * The location x of the bitmap image in pixels.
		 * @property x
		 * @type float
		 * @public
		 */
		/** @language chinese
		 * ビットマップイメージの位置x（ピクセル単位）です。
		 * @property x
		 * @type float
		 * @public
		 */
		s.x = (x == null ? 0 : x);
		/** @language chinese
		 * 位图图像的位置y，以像素为单位。
		 * @property y
		 * @type float
		 * @public
		 */
		/** @language english
		 * The location y of the bitmap image in pixels.
		 * @property y
		 * @type float
		 * @public
		 */
		/** @language chinese
		 * ビットマップイメージの位置y（ピクセル単位）です。
		 * @property y
		 * @type float
		 * @public
		 */
		s.y = (y == null ? 0 : y);
		/** @language chinese
		 * 位图图像的宽度，以像素为单位。
		 * @property width
		 * @type float
		 * @public
		 */
		/** @language english
		 * The width of the bitmap image in pixels.
		 * @property width
		 * @type float
		 * @public
		 */
		/** @language chinese
		 * ビットマップイメージの幅（ピクセル単位）です。
		 * @property width
		 * @type float
		 * @public
		 */
		s.width = 0;
		/** @language chinese
		 * 位图图像的高度，以像素为单位。
		 * @property height
		 * @type float
		 * @public
		 */
		/** @language english
		 * The height of the bitmap image in pixels.
		 * @property height
		 * @type float
		 * @public
		 */
		/** @language chinese
		 * ビットマップイメージの高さ（ピクセル単位）です。
		 * @property height
		 * @type float
		 * @public
		 */
		s.height = 0;
		/** @language chinese
		 * 数据格式，LBitmapData.DATA_IMAGE（Image对象）或者LBitmapData.DATA_CANVAS（Canvas对象）
		 * @property dataType
		 * @type String
		 * @public
		 */
		/** @language english
		 * data type, LBitmapData.DATA_IMAGE（Image object）or LBitmapData.DATA_CANVAS（Canvas object）。
		 * @property dataType
		 * @type String
		 * @public
		 */
		/** @language chinese
		 * データータイプ，値はLBitmapData.DATA_IMAGE（Imageオブジェクト）またはLBitmapData.DATA_CANVAS（Canvasオブジェクト）です。
		 * @property dataType
		 * @type String
		 * @public
		 */
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
			s._canvas.width = s.width = (width == null ? 1 : width); 
			s._canvas.height = s.height = (height == null ? 1 : height);
			var d = s._context.createImageData(s.width, s.height);
			if (typeof image == "string") {
				image = parseInt(image.replace("#","0x"));
			}
			if (typeof image == "number") {
				for (var i = 0; i < d.data.length; i += 4) {
					d.data[i + 0] = image >> 16 & 0xFF;
					d.data[i + 1] = image >> 8 & 0xFF;
					d.data[i + 2] = image & 0xFF;
					d.data[i + 3] = 255;
				}
			}
			s._context.putImageData(d, 0, 0);
			s.image = s._canvas;
			if (dataType == LBitmapData.DATA_IMAGE) {
				s._setDataType(dataType);
			}
		}
		s.resize();
	}
	/** @language chinese
	 * LBitmapData数据保存形式的一种，以Image对象形式保存。
	 * @property LBitmapData.DATA_IMAGE
	 * @type String
	 * @final
	 * @static
	*/
	/** @language english
	 * data type of the LBitmapData. Image object。
	 * @property dataType
	 * @type String
	 * @public
	 */
	/** @language chinese
	 * LBitmapDataのデーターの保存形式です，Image オブジェクト。
	 * @property dataType
	 * @type String
	 * @public
	 */
	LBitmapData.DATA_IMAGE = "data_image";
	/** @language chinese
	 * LBitmapData数据保存形式的一种，以Canvas对象形式保存。
	 * @property LBitmapData.DATA_CANVAS
	 * @type String
	 * @final
	 * @static
	 * @readOnly
	*/
	/** @language english
	 * data type of the LBitmapData. Canvas object。
	 * @property dataType
	 * @type String
	 * @public
	 */
	/** @language chinese
	 * LBitmapDataのデーターの保存形式です，Canvas オブジェクト。
	 * @property dataType
	 * @type String
	 * @public
	 */
	LBitmapData.DATA_CANVAS = "data_canvas";
	var p = {
		_setDataType : function (dataType) {
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
		_createCanvas : function () {
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		/** @language chinese
		 * 用来改变LBitmapData内Image的可视范围
		 * @method setProperties
		 * @param {float} x Image可视范围x坐标。
		 * @param {float} y Image可视范围y坐标。
		 * @param {float} width Image可视范围宽。
		 * @param {float} height Image可视范围高。
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 0, 0, 200, 200);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget);
		 * 	bitmapdata2.setProperties(50, 100, 200, 50);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 240;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setProperties.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.0.0
		 */
		/** @language english
		 * Change the Image's visual range
		 * @method setProperties
		 * @param {float} x The x coordinate of the image.
		 * @param {float} y The y coordinate of the image.
		 * @param {float} width The width of the bitmap image in pixels.
		 * @param {float} height The height of the bitmap image in pixels.
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 0, 0, 200, 200);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget);
		 * 	bitmapdata2.setProperties(50, 100, 200, 50);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 240;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setProperties.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.0.0
		 */
		/** @language japanese
		 * LBitmapData内のImageの表示範囲を変更する
		 * @method setProperties
		 * @param {float} x Imageの表示範囲の座標x.
		 * @param {float} y Imageの表示範囲の座標y.
		 * @param {float} width Imageの表示範囲の幅。
		 * @param {float} height Imageの表示範囲の高さ。
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 0, 0, 200, 200);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget);
		 * 	bitmapdata2.setProperties(50, 100, 200, 50);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 240;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setProperties.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.0.0
		 */
		setProperties : function (x, y, width, height) {
			var s = this;
			s.x = x;
			s.y = y;
			s.width = width;
			s.height = height;
			s.resize();
		},
		/** @language chinese
		 * 用来改变LBitmapData内Image的可视范围的起点位置坐标
		 * @method setCoordinate
		 * @param {float} x Image可视范围x坐标。
		 * @param {float} y Image可视范围y坐标。
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	bitmapdata2.setCoordinate(100, 100);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 120;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setCoordinate.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * Change coordinate of the Image's visual range
		 * @method setCoordinate
		 * @param {float} x The x coordinate of the image.
		 * @param {float} y The y coordinate of the image.
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	bitmapdata2.setCoordinate(100, 100);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 120;
		 * 	addChild(bitmap2);
		 * @since 1.0.0
		 * @public
		 * @examplelink <p><a href="../../../api/LBitmapData/setCoordinate.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData内のImageの表示範囲の座標を変更する
		 * @method setCoordinate
		 * @param {float} x Imageの表示範囲の座標x.
		 * @param {float} y Imageの表示範囲の座標y.
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	bitmapdata2.setCoordinate(100, 100);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 120;
		 * 	addChild(bitmap2);
		 * @since 1.0.0
		 * @public
		 * @examplelink <p><a href="../../../api/LBitmapData/setCoordinate.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setCoordinate : function (x, y) {
			var s = this;
			s.x = x;
			s.y = y;
			s.resize();
		},
		/** @language chinese
		 * 返回一个LBitmapData的克隆对象。
		 * @method clone
		 * @return {LBitmapData} 一个新的 LBitmapData 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd1 = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd1);
		 * 	addChild(bm1);
		 * 	
		 * 	var bmd2 = bmd1.clone();
		 * 	var bm2 = new LBitmap(bmd2);
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmapData/clone.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns a new BitmapData object that is a clone of the original instance with an exact copy of the contained bitmap.
		 * @method clone
		 * @return {LBitmapData} A new BitmapData object that is identical to the original.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd1 = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd1);
		 * 	addChild(bm1);
		 * 	
		 * 	var bmd2 = bmd1.clone();
		 * 	var bm2 = new LBitmap(bmd2);
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmapData/clone.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 新しい BitmapData オブジェクトとして、元のインスタンスのクローンを返します。含まれるビットマップはまったく同じコピーになります。
		 * @method clone
		 * @return {LBitmapData} 元のオブジェクトと同一の新しい LBitmapData オブジェクトです。
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd1 = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd1);
		 * 	addChild(bm1);
		 * 	
		 * 	var bmd2 = bmd1.clone();
		 * 	var bm2 = new LBitmap(bmd2);
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmapData/clone.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		clone : function () {
			var s = this;
			return new LBitmapData(s.image, s.x, s.y, s.width, s.height, s.dataType);
		},
		_ready : function () {
			var s = this;
			s._dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			s._data = s._context.getImageData(s.x, s.y, s.width, s.height);
		},
		_update : function () {
			var s = this;
			s._context.putImageData(s._data, s.x, s.y, 0, 0, s.width, s.height);
			s._setDataType(s._dataType);
		},
		/** @language chinese
		 * 返回一个数组，它表示 LBitmapData 对象中在特定点 (x, y) 处的 RGB 像素数据。
		 * @method getPixel
		 * @param {int} x 指定坐标点x坐标。
		 * @param {int} y 指定坐标点y坐标。
		 * @param {String} colorType 指定获取的颜色种类。[number|array]（可省略）。
		 * @return {Array} 像素数据。
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img, imgs = [], arr;
		 *  bitmapData.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	 arr = [];
		 *  	 for (var j = 0; j < 50; j++) {
		 *  		img = bitmapData.getPixel(100 + i, 100 + j);
		 *  		arr.push(img);
		 *  	}
		 *  	imgs.push(arr);
		 *  }
		 *  bitmapData.unlock();
		 *  bitmapData2.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	arr = imgs[i];
		 *  	for (var j = 0; j < 50; j++) {
		 *  		img = arr[j];
		 *  		bitmapData2.setPixel(i, j, img);
		 *  	}
		 *  }
		 *  bitmapData2.unlock();
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.x = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixel.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns an integer that represents an RGB pixel value from a BitmapData object at a specific point (x, y).
		 * @method getPixel
		 * @param {int} x The x position of the pixel.
		 * @param {int} y The y position of the pixel.
		 * @param {String} colorType the color type. [number|array].(Optional).
		 * @return {Array} A array that represents an RGB pixel value.
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img, imgs = [], arr;
		 *  bitmapData.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	 arr = [];
		 *  	 for (var j = 0; j < 50; j++) {
		 *  		img = bitmapData.getPixel(100 + i, 100 + j);
		 *  		arr.push(img);
		 *  	}
		 *  	imgs.push(arr);
		 *  }
		 *  bitmapData.unlock();
		 *  bitmapData2.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	arr = imgs[i];
		 *  	for (var j = 0; j < 50; j++) {
		 *  		img = arr[j];
		 *  		bitmapData2.setPixel(i, j, img);
		 *  	}
		 *  }
		 *  bitmapData2.unlock();
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.x = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixel.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData オブジェクトの特定ポイント (x, y) の RGB ピクセル値を表す整数を返します。
		 * @method getPixel
		 * @param {int} x ピクセルの x 座標です。
		 * @param {int} y ピクセルの y 座標です。
		 * @param {String} colorType 取得するカラータイプを指定する。[number|array]（省略可）。
		 * @return {Array} RGB ピクセル値を表す数値。
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img, imgs = [], arr;
		 *  bitmapData.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	 arr = [];
		 *  	 for (var j = 0; j < 50; j++) {
		 *  		img = bitmapData.getPixel(100 + i, 100 + j);
		 *  		arr.push(img);
		 *  	}
		 *  	imgs.push(arr);
		 *  }
		 *  bitmapData.unlock();
		 *  bitmapData2.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	arr = imgs[i];
		 *  	for (var j = 0; j < 50; j++) {
		 *  		img = arr[j];
		 *  		bitmapData2.setPixel(i, j, img);
		 *  	}
		 *  }
		 *  bitmapData2.unlock();
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.x = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixel.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getPixel : function (x, y, colorType) {
			var s = this, i, d;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			i = s._canvas.width * 4 * (s.y + y) + (s.x + x) * 4;
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
		/** @language chinese
		 * 返回一个数组，它表示 LBitmapData 对象中在特定点 (x, y) 处的 RGB 像素数据。
		 * @method setPixel
		 * @param {int} x 指定坐标点x坐标。
		 * @param {int} y 指定坐标点y坐标。
		 * @param {Array} data 像素数据。
		 * @return {Array} 像素数据。
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img, imgs = [], arr;
		 *  bitmapData.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	 arr = [];
		 *  	 for (var j = 0; j < 50; j++) {
		 *  		img = bitmapData.getPixel(100 + i, 100 + j);
		 *  		arr.push(img);
		 *  	}
		 *  	imgs.push(arr);
		 *  }
		 *  bitmapData.unlock();
		 *  bitmapData2.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	arr = imgs[i];
		 *  	for (var j = 0; j < 50; j++) {
		 *  		img = arr[j];
		 *  		bitmapData2.setPixel(i, j, img);
		 *  	}
		 *  }
		 *  bitmapData2.unlock();
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.x = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixel.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns an integer that represents an RGB pixel value from a BitmapData object at a specific point (x, y).
		 * @method setPixel
		 * @param {int} x The x position of the pixel whose value changes.
		 * @param {int} y The y position of the pixel whose value changes.
		 * @param {Array} data The resulting pixel data for the pixel.
		 * @return {Array} A array that represents an RGB pixel value.
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img, imgs = [], arr;
		 *  bitmapData.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	 arr = [];
		 *  	 for (var j = 0; j < 50; j++) {
		 *  		img = bitmapData.getPixel(100 + i, 100 + j);
		 *  		arr.push(img);
		 *  	}
		 *  	imgs.push(arr);
		 *  }
		 *  bitmapData.unlock();
		 *  bitmapData2.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	arr = imgs[i];
		 *  	for (var j = 0; j < 50; j++) {
		 *  		img = arr[j];
		 *  		bitmapData2.setPixel(i, j, img);
		 *  	}
		 *  }
		 *  bitmapData2.unlock();
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.x = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixel.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData オブジェクトの特定ポイント (x, y) の RGB ピクセル値を表す整数を返します。
		 * @method setPixel
		 * @param {int} x 値が変更されるピクセルの x 座標です。
		 * @param {int} y 値が変更されるピクセルの y 座標です。
		 * @param {Array} data 結果として生成される、ピクセルの RGB カラーデータです。
		 * @return {Array} RGB ピクセル値を表す数値。
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img, imgs = [], arr;
		 *  bitmapData.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	 arr = [];
		 *  	 for (var j = 0; j < 50; j++) {
		 *  		img = bitmapData.getPixel(100 + i, 100 + j);
		 *  		arr.push(img);
		 *  	}
		 *  	imgs.push(arr);
		 *  }
		 *  bitmapData.unlock();
		 *  bitmapData2.lock();
		 *  for (var i = 0; i < 50; i++) {
		 *  	arr = imgs[i];
		 *  	for (var j = 0; j < 50; j++) {
		 *  		img = arr[j];
		 *  		bitmapData2.setPixel(i, j, img);
		 *  	}
		 *  }
		 *  bitmapData2.unlock();
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.x = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixel.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setPixel : function (x, y, data) {
			var s = this;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			var d = s._data, i = s._canvas.width * 4 * (s.y + y) + (s.x + x) * 4;
			if (typeof data == "object") {
				d.data[i + 0] = data[0];
				d.data[i + 1] = data[1];
				d.data[i + 2] = data[2];
				d.data[i + 3] = 255;
			} else {
				if (typeof data == "string") {
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
		/** @language chinese
		 * 返回一个数组，它表示 LBitmapData 对象中在特定矩形区域rect中的像素数据。
		 * @method getPixels
		 * @param {LRectangle} rect 指定矩形。
		 * @return {Array} 返回该矩形区域的像素数据。
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 *  bitmapData2.lock();
		 *  bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 *  bitmapData2.unlock(); 
		 *  
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.y = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixels.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Generates an array from a rectangular region of pixel data.
		 * @method getPixels
		 * @param {LRectangle} rect A rectangular area in the current BitmapData object.
		 * @return {Array} the pixels in the given Rectangle.
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 *  bitmapData2.lock();
		 *  bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 *  bitmapData2.unlock(); 
		 *  
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.y = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixels.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * ピクセルデータの矩形領域からバイト配列を生成します。
		 * @method getPixels
		 * @param {LRectangle} rect 現在の BitmapData オブジェクト内の矩形領域です。
		 * @return {Array} 特定の矩形内のピクセルを表す配列です
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 *  bitmapData2.lock();
		 *  bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 *  bitmapData2.unlock(); 
		 *  
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.y = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixels.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getPixels : function (rect) {
			var s = this, r;
			if (!s._locked) {
				s._ready();
			}
			r = s._context.getImageData(rect.x, rect.y, rect.width, rect.height);
			if (!s._locked) {
				s._update();
			}
			return r;
		},
		/** @language chinese
		 * 设置 LBitmapData 对象的单个像素数据。
		 * @method setPixels
		 * @param {LRectangle} rect 指定矩形。
		 * @param {Array} data 像素数据。（数组[0, 0, 0, 255, 255, 255] | 字符串"#000000" | 数值0x000000）
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 *  bitmapData2.lock();
		 *  bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 *  bitmapData2.unlock(); 
		 *  
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.y = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixels.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Sets a single pixel of a LBitmapData object.
		 * @method setPixels
		 * @param {LRectangle} rect Specifies the rectangular region of the BitmapData object.
		 * @param {Array} data the values to be used in the rectangular region.(Array[0, 0, 0, 255, 255, 255] | String"#000000" | Number0x000000)
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 *  bitmapData2.lock();
		 *  bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 *  bitmapData2.unlock(); 
		 *  
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.y = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixels.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData オブジェクトの 1 つのピクセルを設定します。
		 * @method setPixels
		 * @param {LRectangle} rect LBitmapData オブジェクトの矩形領域を指定します。
		 * @param {Array} data 矩形領域で使用されるピクセル値です。(Array[0, 0, 0, 255, 255, 255] | String"#000000" | Number0x000000)
		 * @since 1.5.1
		 * @public
		 * @example
		 *  var bitmapData = new LBitmapData(event.currentTarget);
		 *  bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 *  var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 *  bitmapData2.lock();
		 *  bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 *  bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 *  bitmapData2.unlock(); 
		 *  
		 *  var bitmap = new LBitmap(bitmapData);
		 *  addChild(bitmap);
		 *  
		 *  var bitmap2 = new LBitmap(bitmapData2);
		 *  bitmap2.y = 250;
		 *  addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixels.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setPixels : function (rect, data) {
			var s = this, i, j, d, w, sd, x, y;
			if (!s._locked) {
				s._ready();
			}
			d = s._data;
			if (typeof data == "object") {
				w = s._canvas.width;
				for (x = rect.x; x < rect.right; x++) {
					for (y = rect.y; y < rect.bottom; y++) {
						i = w * 4 * (s.y + y) + (s.x + x) * 4;
						j = data.width * 4 * (y - rect.y) + (x - rect.x) * 4;
						d.data[i + 0] = data.data[j + 0];
						d.data[i + 1] = data.data[j + 1];
						d.data[i + 2] = data.data[j + 2];
						d.data[i + 3] = 255;
					}
				}
			} else {
				if (typeof data == "string") {
					data = parseInt(data.replace("#", "0x"));
				}
				data = [data >> 16 & 0xFF, data >> 8 & 0xFF, data & 0xFF];
				w = s._canvas.width;
				for (x = rect.x; x < rect.right; x++) {
					for (y = rect.y; y < rect.bottom; y++) {
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
		/** @language chinese
		 * 此函数将操作对象锁定，保证操作对象在另一个临时操作的canvas上只绘制一遍。
		 * @method lock
		 * @since 1.5.1
		 * @public
		 */
		/** @language english
		 * Locks an image so that any objects that reference the BitmapData object, such as Bitmap objects, are not updated when this BitmapData object changes.
		 * @method lock
		 * @since 1.5.1
		 * @public
		 */
		/** @language japanese
		 * ピクセルデータを操作する時、もう一つの非表示canvasを使っています、この関数使うと、LBitmapDataをロックして、一回しか描けないですから、効率が高くすることができます。
		 * @method lock
		 * @since 1.5.1
		 * @public
		 */
		lock : function () {
			var s = this;
			s._locked = true;
			s._ready();
		},
		/** @language chinese
		 * 拷贝像素等操作结束后，解除对操作对象的锁定。
		 * @method unlock
		 * @since 1.5.1
		 * @public
		 */
		/** @language english
		 * Unlocks an image so that any objects that reference the BitmapData object, such as Bitmap objects, are updated when this BitmapData object changes.
		 * @method unlock
		 * @since 1.5.1
		 * @public
		 */
		/** @language japanese
		 * ピクセルデータの操作が終わったら、LBitmapDataのロックを解除します。
		 * @method unlock
		 * @since 1.5.1
		 * @public
		 */
		unlock : function () {
			var s = this;
			s._locked = false;
			s._update();
		},
		/** @language chinese
		 * 在LBitmapData位图图像上绘制 source 显示对象。
		 * @method draw
		 * @param {LDisplayObject} source 要绘制到 LBitmapData 对象的显示对象或 BitmapData 对象。
		 * @since 1.7.7
		 * @public
		 * @example
		 *  var layer = new LSprite();
		 *  layer.graphics.drawRect(1, "#000000", [0, 0, 100, 100], true, "#000000");
		 *  layer.graphics.drawRect(1, "#FF0000", [100, 0, 100, 100], true, "#FF0000");
		 *  addChild(layer);
		 *  
		 *  var bitmapData = new LBitmapData(null, 0, 0, 500, 400);
		 *  bitmapData.draw(layer);
		 *  var bitmap = new LBitmap(bitmapData);
		 *  bitmap.y = 150;
		 *  addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LBitmapData/draw.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Draws the source display object onto the bitmap image, using the Flash runtime vector renderer.
		 * @method draw
		 * @param {LDisplayObject} [source] The display object or BitmapData object to draw to the BitmapData object.
		 * @since 1.7.7
		 * @public
		 * @example
		 *  var layer = new LSprite();
		 *  layer.graphics.drawRect(1, "#000000", [0, 0, 100, 100], true, "#000000");
		 *  layer.graphics.drawRect(1, "#FF0000", [100, 0, 100, 100], true, "#FF0000");
		 *  addChild(layer);
		 *  
		 *  var bitmapData = new LBitmapData(null, 0, 0, 500, 400);
		 *  bitmapData.draw(layer);
		 *  var bitmap = new LBitmap(bitmapData);
		 *  bitmap.y = 150;
		 *  addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LBitmapData/draw.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * source 表示オブジェクトをビットマップイメージ上に描画します。
		 * @method draw
		 * @param {LDisplayObject} [source] LBitmapData オブジェクトに描画される表示オブジェクトまたは BitmapData オブジェクトです。
		 * @since 1.7.7
		 * @public
		 * @example
		 *  var layer = new LSprite();
		 *  layer.graphics.drawRect(1, "#000000", [0, 0, 100, 100], true, "#000000");
		 *  layer.graphics.drawRect(1, "#FF0000", [100, 0, 100, 100], true, "#FF0000");
		 *  addChild(layer);
		 *  
		 *  var bitmapData = new LBitmapData(null, 0, 0, 500, 400);
		 *  bitmapData.draw(layer);
		 *  var bitmap = new LBitmap(bitmapData);
		 *  bitmap.y = 150;
		 *  addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LBitmapData/draw.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		draw : function (source) {
			var s = this;
			if (s.dataType == LBitmapData.DATA_CANVAS) {
				s._context.clearRect(0, 0, s.width, s.height);
				s._context.drawImage(source.getDataCanvas(), 0, 0);
			} else if (s.dataType == LBitmapData.DATA_IMAGE) {
				s.image.src = source.getDataURL();
			}
			s.resize();
		},
		resize : function () {
			var s = this, w = s.image.width - s.x, h = s.image.height - s.y;
			s.width = s.width < w ? s.width : w;
			s.height = s.height < h ? s.height : h;
		}
	};
	for (var k in p) {
		LBitmapData.prototype[k] = p[k];
	}
	return LBitmapData;
})();
/*
 * LDropShadowFilter.js
 **/
function LDropShadowFilter(distance,angle,color,blur){
	var s = this;
	base(s,LObject,[]);
	s.type = "LDropShadowFilter";
	s.distance=distance?distance:0;
	s.angle=angle?angle:0;
	s.shadowColor=color?color:"#000000";
	s.shadowBlur=blur?blur:20;
	s.setShadowOffset();
}
p = {
	setShadowOffset:function(){
		var s = this;
		var a = s.angle*Math.PI/180;
		s.shadowOffsetX=s.distance*Math.cos(a);
		s.shadowOffsetY=s.distance*Math.sin(a);
	},
	ll_show:function(){
		var s = this,c = LGlobal.canvas;
		c.shadowColor=s.shadowColor;
		c.shadowBlur=s.shadowBlur;
		c.shadowOffsetX=s.shadowOffsetX;
		c.shadowOffsetY=s.shadowOffsetY;
	},
	setDistance:function(distance){
		this.distance=distance;
		this.setShadowOffset();
	},
	setAngle:function(angle){
		this.angle=angle;
		this.setShadowOffset();
	},
	setColor:function(color){
		this.shadowColor=color;
	},
	setBlur:function(blur){
		this.shadowBlur=blur;
	}
};
for(var k in p)LDropShadowFilter.prototype[k]=p[k];
/*
* LAnimation.js
**/
function LAnimation(layer,data,list){
	base(this,LSprite,[]);
	var s = this;
	s.type = "LAnimation";
	s.rowIndex = 0;
	s.colIndex = 0;
	s.mode = 1;
	s.isMirror = false;
	s.bitmap =  new LBitmap(data);
	s.imageArray = list;
	s.addChild(s.bitmap);
	if(layer != null)layer.addChild(s);
	s.onframe();
	s.colIndex = 0;
};
LAnimation.prototype.setAction = function (rowIndex,colIndex,mode,isMirror){
	var s = this;
	if(rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length)s.rowIndex = rowIndex;
	if(colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length)s.colIndex = colIndex;
	if(mode != null)s.mode = mode;
	if(isMirror != null){
		s.isMirror = isMirror;
		if(s.isMirror){
			s.bitmap.x = s.bitmap.getWidth();
			s.bitmap.scaleX = -1*Math.abs(s.bitmap.scaleX);
		}else{
			s.bitmap.x = 0;
			s.bitmap.scaleX = 1*Math.abs(s.bitmap.scaleX);
		}
	}
};
LAnimation.prototype.clone = function (){
	var s = this,cB = s.bitmap.bitmapData.clone(),cI = s.imageArray.slice(0),
	a = new LAnimation(null,cB,cI);
	a.copyProperty(s);
	return a;
};
LAnimation.prototype.getAction = function (){
	var s = this;
	return [s.rowIndex,s.colIndex,s.mode,s.isMirror];
};
LAnimation.prototype.onframe = function (){
	var s = this;
	var arr = s.imageArray[s.rowIndex][s.colIndex];
	if(typeof arr.width != UNDEFINED && typeof arr.height != UNDEFINED){
		s.bitmap.bitmapData.setProperties(arr.x,arr.y,arr.width,arr.height);
	}else{
		s.bitmap.bitmapData.setCoordinate(arr.x,arr.y);
	}
	if(typeof arr.sx != UNDEFINED){
		s.bitmap.x = arr.sx;
	}
	if(typeof arr.sy != UNDEFINED){
		s.bitmap.y = arr.sy;
	}
	if(typeof arr.script == "function"){
		arr.script(s,arr.params);
	}
	s.colIndex += s.mode;
	if(s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0){
		s.colIndex = s.mode>0?0:s.imageArray[s.rowIndex].length - 1;
		s.dispatchEvent(LEvent.COMPLETE);
	}
};
/*
* LAnimationTimeline.js
**/
function LAnimationTimeline(data,list){
	var s = this;
	base(s,LAnimation,[null,data,list]);
	s.type = "LAnimationTimeline";
	s.speed = 0;
	s._speedIndex = 0;
	s.labelList = {};
	s.addEventListener(LEvent.ENTER_FRAME,s._onframe);
};
LAnimationTimeline.prototype.clone = function (){
	var s = this,k,o,cB = s.bitmap.bitmapData.clone(),cI = s.imageArray.slice(0),
	a = new LAnimationTimeline(cB,cI);
	a.copyProperty(s);
	for(k in s.labelList){
		o = s.labelList[k];
		a.labelList[k] = {rowIndex:o.rowIndex,colIndex:o.colIndex,mode:o.mode,isMirror:o.isMirror};
	}
	return a;
};
LAnimationTimeline.prototype._onframe = function (event){
	var self = event.target;
	if(self._speedIndex++<self.speed)return;
	self._speedIndex = 0;
	self.onframe();
};
LAnimationTimeline.prototype.setLabel = function (name,_rowIndex,_colIndex,_mode,_isMirror){
	this.labelList[name] = {rowIndex:_rowIndex,colIndex:_colIndex,mode:_mode,isMirror:_isMirror};
};
LAnimationTimeline.prototype.play = function (){
	this.mode = this.saveMode;
};
LAnimationTimeline.prototype.stop = function (){
	this.saveMode = this.mode;
	this.mode = 0;
};
LAnimationTimeline.prototype.gotoAndPlay = function (name){
	var l = this.labelList[name];
	this.setAction(l.rowIndex,l.colIndex,l.mode,l.isMirror);
};
LAnimationTimeline.prototype.gotoAndStop = function (name){
	var l = this.labelList[name];
	this.setAction(l.rowIndex,l.colIndex,l.mode,l.isMirror);
	this.stop();
};
LAnimationTimeline.prototype.addFrameScript = function (name,func,params){
	var l = this.labelList[name];
	var arr = this.imageArray[l.rowIndex][l.colIndex];
	arr.script = func;
	arr.params = params?params:null;
};
LAnimationTimeline.prototype.removeFrameScript = function (name){
	var l = this.labelList[name];
	this.imageArray[l.rowIndex][l.colIndex].script = null;
};
function $LoadManage(){
	this.llname="ll.file.";
	this.llload="ll.load.";
}
$LoadManage.prototype={
	load:function(l,u,c){
		var s = this;
		s.list=l,s.onupdate=u,s.oncomplete=c;
		s.loader=s,s.index=0,s.loadIndex=0,s.result=[],s.lresult=[];
		s.loadInit();
	},
	loadInit:function(){
		var s = LLoadManage;
		if(s.index >= s.list.length){
			return;
		}
		s.loadIndex = 0;
		s.loadStart();
		s.reloadtime = setTimeout(s.loadInit,10000);
	},
	loadStart:function(){
		var s = LLoadManage,d;
		if(s.loadIndex >= s.list.length)return;
		d = s.list[s.loadIndex];
		if(!d.name){
			d.name = s.llname+s.loadIndex;
		}
		if(!s.lresult[s.llload+d.name]){
			if(d["type"] == "text" || d["type"] == "js"){
				s.loader = new LURLLoader();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path),d["type"]);
			}else if(d["type"] == "sound"){
				s.loader = new LSound();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path));
			}else{
				s.loader = new LLoader();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path),"bitmapData");
			}
		}
		s.loadIndex++;
		s.loadStart();
	},
	loadComplete:function(e){
		var s = LLoadManage;
		if(e  && e.target && e.target.name){
			if(e.target.name.indexOf(s.llname) >= 0){
				e.currentTarget = 1;
			}
			if(s.lresult[s.llload+e.target.name]){
				return;
			}
			s.result[e.target.name] = e.currentTarget;
			s.lresult[s.llload+e.target.name] = 1;
		}
		s.index++;
		if(s.onupdate){
			s.onupdate(Math.floor(s.index*100/s.list.length));
		}
		if(s.index >= s.list.length){
			if(s.reloadtime){
				clearTimeout(s.reloadtime);
			}
			s.loader = null;
			var r = s.result;
			s.oncomplete(r);
		}
	},
	url:function(u){
		if(!LGlobal.traceDebug)return u;
		return u+(u.indexOf('?')>=0?'&':'?')+'t='+(new Date()).getTime();
	}
};
var LEasing = {
	None:{
		easeIn:function(t,b,c,d){
			return b+t*c/d;
		}
	},
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Strong: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c;s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - LEasing.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return LEasing.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return LEasing.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};
var Quad = LEasing.Quad;
var Cubic = LEasing.Cubic;
var Quart = LEasing.Quart;
var Quint = LEasing.Quint;
var Sine = LEasing.Sine;
var Strong = LEasing.Strong;
var Expo = LEasing.Expo;
var Circ = LEasing.Circ;
var Elastic = LEasing.Elastic;
var Back = LEasing.Back;
var Bounce = LEasing.Bounce;
function $LTweenLiteChild($target,$duration,$vars){
	var s = this;
	s.objectIndex = s.objectindex = ++LGlobal.objectIndex;
	s.toNew=[];
	s.init($target,$duration,$vars);
}
$LTweenLiteChild.prototype = {
	init:function($target,$duration,$vars){
		var s = this,k=null;
		s.target=$target;s.duration=$duration || 0.001;s.vars=$vars;
		s.currentTime = (new Date()).getTime() / 1000;
		s.delay = s.vars.delay || 0;
		s.combinedTimeScale = s.vars.timeScale || 1;
		s.active = s.duration == 0 && s.delay == 0;
		s.varsto={};
		s.varsfrom={};
		if (typeof(s.vars.ease) != "function") {
			s.vars.ease = LEasing.None.easeIn;
		}
		s.ease = s.vars.ease;
		delete s.vars.ease;
		if(s.vars.onComplete){
			s.onComplete = s.vars.onComplete;
			delete s.vars.onComplete;
		}
		if(s.vars.onUpdate){
			s.onUpdate = s.vars.onUpdate;
			delete s.vars.onUpdate;
		}
		if(s.vars.onStart){
			s.onStart = s.vars.onStart;
			delete s.vars.onStart;
		}
		for(k in s.vars){
			s.varsto[k] = s.vars[k];
			s.varsfrom[k] = s.target[k];
		}
		s.initTime = s.currentTime;
		s.startTime = s.initTime + s.delay;
	},
	tween:function(){
		var s = this;
		var time = (new Date()).getTime() / 1000 , etime;
		etime = (time - s.startTime);
		if(etime < 0)return;
		var tweentype=null;
		for(tweentype in s.varsto){
			var v = s.ease(etime,s.varsfrom[tweentype],s.varsto[tweentype]-s.varsfrom[tweentype],s.duration);
			s.target[tweentype] = v;
		}
		if(s.onStart){
			s.onStart(s.target);
			delete s.onStart;
		}
		if (etime >= s.duration){
			for(tweentype in s.varsto)s.target[tweentype] = s.varsto[tweentype];
			if(s.onComplete)s.onComplete(s.target);
			return true;
		}else if(s.onUpdate){
			s.onUpdate(s.target);
		}
		return false;
	},
	to:function($target,$duration,$vars){
		var s = this;
		s.toNew.push({target:$target,duration:$duration,vars:$vars});
		return s;
	},
	keep:function(){
		var s = this;
		if(s.toNew.length > 0){
			var t = s.toNew.shift();
			if(t.vars.loop)s.loop = true;
			if(s.loop){
				var vs = {},k;
				for(k in t.vars)vs[k]=t.vars[k];
				s.to(t.target,t.duration,vs);
			}
			s.init(t.target,t.duration,t.vars);
			return true;
		}
		return false;
	}
};
function $LTweenLite(){}
$LTweenLite.prototype = {
	tweens:[],
	ll_show:null,
	frame:function(){
		var s = this;
		var i,length=s.tweens.length,t;
		for(i=0;i < length;i++){
			t = s.tweens[i];
			if(t && t.tween && t.tween()){
				s.tweens.splice(i,1);
				i--,length=s.tweens.length;
				if(t.keep())s.add(t);
			}
		}
		if(s.tweens.length == 0)s.ll_show = null;
	},
	to:function($target,$duration,$vars){
		if(!$target)return;
		var s = this;
		var tween = new $LTweenLiteChild({},0,{});
		s.tweens.push(tween);
		s.ll_show = s.frame;
		tween.to($target,$duration,$vars);
		return tween;
	},
	add:function(tween){
		this.tweens.push(tween);
	},
	remove:function(tween){
		var s = this;
		if(typeof tween == UNDEFINED)return;
		for(i=0,l=s.tweens.length;i < l;i++){
			if(tween.objectIndex == s.tweens[i].objectIndex){
				s.tweens.splice(i,1);
				break;
			}
		}
	},
	removeAll:function(){
		this.tweens.splice(0,this.tweens.length);
	}
};
function $Ajax(){}
$Ajax.prototype = {
	get:function(url, data, oncomplete,onerror){
		this.getRequest("GET",url, data, oncomplete,onerror);
	},
	post:function(url, data, oncomplete,onerror){
		this.getRequest("POST",url, data, oncomplete,onerror);
	},
	getRequest:function(t,url, d, oncomplete,err){
		var s = this,k,data="",a="";
		s.err = err;
		var ajax = s.getHttp();
		if (!ajax)return;
		if(d){
			for(k in d){
				data += (a+k+"="+d[k]);
				a="&";	
			}
		}
		if(t.toLowerCase() == "get"){
			url += ((url.indexOf('?')>=0?'&':'?')+data);
			data = null;
		}
		ajax.open(t, url, true);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.onreadystatechange = function(){
			if (ajax.readyState == 4){
				if(ajax.status >= 200 && ajax.status < 300 || ajax.status === 304){
					if (ajax.responseText.length > 0){
						oncomplete(ajax.responseText);
					}else{
						oncomplete(null);
					}
				}else{
					if(err)err(ajax);
				}
	 		}
		};
		ajax.send(data);
	},
	getHttp:function(){
		if (typeof XMLHttpRequest != UNDEFINED){
			return new XMLHttpRequest();
		}  
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e) {
				if(!this.err)this.err(e);
			}
		}
		return false;
	}
};
function LStageWebView(){
	var s = this;
	base(s,LEventDispatcher,[]);
	s.display = document.createElement("div");
	s.iframe = document.createElement("iframe");
	s.display.style.position = "absolute";
	s.display.style.marginTop = "0px";
	s.display.style.marginLeft = "0px";
	s.display.style.zIndex = 11;
	s.display.appendChild(s.iframe);
}
p = {
	loadURL:function(u){
		var s = this;
		s.iframe.src=u;
		s.iframe.onload=function(){
			s.dispatchEvent(LEvent.COMPLETE);
		};
	},
	show:function(){
		LGlobal.object.appendChild(this.display);
	},
	die:function(){
		LGlobal.object.removeChild(this.display);
	},
	setViewPort:function(r){
		var s = this,sx = parseInt(LGlobal.canvasObj.style.width)/LGlobal.canvasObj.width,sy = parseInt(LGlobal.canvasObj.style.height)/LGlobal.canvasObj.height;
		s.display.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + ((r.y*sy) >>> 0)) + "px";
		s.display.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + ((r.x*sx) >>> 0)) + "px";
		s.iframe.style.width = s.display.style.width = (r.width*sx >>> 0)+"px";
		s.iframe.style.height = s.display.style.height = (r.height*sy >>> 0)+"px";
	}
};
for(var k in p)LStageWebView.prototype[k]=p[k];
function FPS(){
        var s = this;
        base(s,LSprite,[]);
        s.fps = new LTextField();
        s.fpsCount = 0;
        s.fpsTime = (new Date()).getTime();
        s.fps.color = "#ffffff";
        s.addChild(s.fps);
        s.addEventListener(LEvent.ENTER_FRAME,s.showFPS);
}
FPS.prototype.showFPS = function(s){
        s.fpsCount++;
        var t = (new Date()).getTime();
        if(t - s.fpsTime < 1000)return;
        s.fpsTime = t;
        s.fps.text = s.fpsCount;
        s.fpsCount = 0;
        s.graphics.clear();
        s.graphics.drawRect(0,"#000000",[0,0,s.fps.getWidth(),20],true,"#000000");
};
(function(){
	LAjax = new $Ajax();
	LLoadManage = new $LoadManage();
	LTweenLite = new $LTweenLite();
	LGlobal.childList.push(LTweenLite);
})();
