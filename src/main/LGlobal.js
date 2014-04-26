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
LGlobal.buttonList = new Array();
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
	LGlobal.window = window;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div style="position:absolute;margin:0px 0px 0px 0px;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">'+
	'<canvas id="' + LGlobal.id + '_canvas" style="margin:0px 0px 0px 0px;width:'+w+'px;height:'+h+'px;">'+
	'<div id="noCanvas">'+
	"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>"+ 
	'</div>'+  
	'</canvas></div>'+
	'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0px 0px 0px 0px;z-index:10;display:none;">'+
	'<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>'+
	'<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" /><input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
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
	if(LSystem.sv == LStage.FULL_SCREEN){LGlobal.resize();}
	if(LGlobal.canTouch){
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START,function(event){
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LGlobal.inputBox.style.display = NONE;
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
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LGlobal.inputBox.style.display = NONE;
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
	if(t == LMouseEvent.MOUSE_MOVE)LGlobal.dragHandler(e);
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
	if(LGlobal.box2d != null){
		LGlobal.box2d.ll_show();
		if(!LGlobal.traceDebug){
			LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);
		}
	}else{
		if(LGlobal.keepClear){LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);}
		if(LGlobal.backgroundColor !== null){
			LGlobal.canvas.fillStyle=LGlobal.backgroundColor;
			LGlobal.canvas.fillRect(0,0,LGlobal.width,LGlobal.height);
		}
	}
	LGlobal.buttonShow(LGlobal.buttonList);
	LGlobal.show(LGlobal.childList);
};
LGlobal.buttonShow = function(b){
	for(var i=0,l=b.length;i<l;i++){
		if(b[i].buttonModeChange)b[i].buttonModeChange();
	}
};
LGlobal.show = function(s){
	s.ll_cr = false;
	for(var i=0,l=s.length;i<l;i++){
		if(s[i].ll_show)s[i].ll_show();
		if(s.ll_cr){
			i--;
			l--;
			s.ll_cr =false;
		}
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
	var c = 0,p,p1,p2,i,l,a,b;
	for(i=0,l=list.length;i<l;i++){
		p1 = list[i];
		p2 = list[i+1 == list.length ? 0 : i+1];
		if((p1[0] == x && p1[1] ==y) || (p2[0] == x && p2[1] == y))return true;
		if(p1[0] > p2[0]){
			p = p1;
			p1 = p2;
			p2 = p;
		}
		if(p1[0]<x && x < p2[0]){
			a = (p1[1]-p2[1])/(p1[0]-p2[0]);
			b = p1[1] - a*p1[0];
			if(a*x + b < y)c++;
		}
	}
	return c % 2 == 1;
};
LGlobal.hitTestArc = function(objA,objB,objAR,objBR){
	var rA = objA.getWidth()*0.5
	,rB = objB.getWidth()*0.5
	,xA = objA.startX()
	,xB = objB.startX()
	,yA = objA.startY()
	,yB = objB.startY();
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
	,xA = objA.startX()
	,xB = objB.startX()
	,yA = objA.startY()
	,yB = objB.startY();
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
