/**
* lufylegend
* @version 1.7.6
* @Explain lufylegend是一个HTML5开源引擎，利用它可以快速方便的进行HTML5的开发
* @author lufy(lufy_legend)
* @blog http://blog.csdn.net/lufy_Legend
* @email lufy.legend@gmail.com
* @homepage http://lufylegend.com/lufylegend
* @svn http://lufylegend.googlecode.com/svn/trunk/
* @github https://github.com/lufylegend/lufylegend.js
*/
var OS_PC = "pc",
OS_IPHONE = "iPhone",
OS_IPOD = "iPod",
OS_IPAD = "iPad",
OS_ANDROID = "Android",
STR_ZERO = "0",
ON = "on",
E = "e",
NONE = "none",
SUPER = "super",
UNDEFINED = "undefined";

var LAjax,LTweenLite,LLoadManage,p;
/*
 * LEvent.js
 **/
var LEvent = function (){this.type="LEvent";};
LEvent.INIT = "init",
LEvent.COMPLETE = "complete",
LEvent.ENTER_FRAME = "enter_frame",
LEvent.SOUND_COMPLETE = "sound_complete",
LEvent.END_CONTACT = "endContact",
LEvent.PRE_SOLVE = "preSolve",
LEvent.POST_SOLVE = "postSolve",
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.currentTarget = null;
LEvent.addEventListener = function (n, t, f,b){
	if(b==null)b=false;
	if(n.addEventListener){
		n.addEventListener(t, f, b);
	}else if(n.attachEvent){
		n[E + t + f] = f;
		n[t + f] = function(){n[E + t + f]();};
		n.attachEvent(ON + t, n[t + f]);
	}
};

/*
 * LMouseEvent.js
 **/
var LMouseEvent = function (){this.type="LMouseEvent";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OUT = "mouseout";

/*
 * LKeyboardEvent.js
 **/
var LKeyboardEvent = function (){this.type="LKeyboardEvent";};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PASS = "keypass";

/*
 * LAccelerometerEvent.js
 **/
var LAccelerometerEvent = function (){this.type="LAccelerometerEvent";};
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
/*
 * LGlobal.js
 **/
var LGlobal = function (){};
LGlobal.FULL_SCREEN="full_screen";
LGlobal.type = "LGlobal";
LGlobal.traceDebug = false;
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
LGlobal.stageScale = false;
LGlobal.canTouch = false;
LGlobal.os = OS_PC;
LGlobal.ios = false;
LGlobal.android = false;
(function(n){
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
	}
})(navigator.userAgent);
LGlobal.setDebug = function (v){
	LGlobal.traceDebug = v; 
};
LGlobal.setCanvas = function (id,w,h){
	LGlobal.id = id;
	LGlobal.window = window;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div style="position:absolute;margin:0px 0px 0px 0px;width:'+w+'px;height:'+h+'px;z-index:0;"><canvas id="' + LGlobal.id + '_canvas">'+
	'<div id="noCanvas">'+
	"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>"+ 
	'<p>'+ 
		'To play this game you need a good Browser, like'+ 
		'<a href="http://www.opera.com/">Opera</a>,'+ 
		'<a href="http://www.google.com/chrome">Chrome</a>,'+ 
		'<a href="http://www.mozilla.com/firefox/">Firefox</a> or'+ 
		'<a href="http://www.apple.com/safari/">Safari</a>.'+ 
	'</p>'+  
	'</div>'+  
	'</canvas></div>'+
	'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0px 0px 0px 0px;z-index:10;display:none;"><textarea rows="1" id="' + LGlobal.id + '_InputTextBox" /></div>';
	LGlobal.canvasObj = document.getElementById(LGlobal.id+"_canvas");
	LGlobal._canvas=document.createElement("canvas");
	LGlobal._context=LGlobal._canvas.getContext("2d");
	LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
	LGlobal.inputTextBox = document.getElementById(LGlobal.id + '_InputTextBox');
	LGlobal.inputTextField = null;
	if(w)LGlobal.canvasObj.width = w;
	if(h)LGlobal.canvasObj.height = h;
	LGlobal.width = LGlobal.canvasObj.width;
	LGlobal.height = LGlobal.canvasObj.height;
	LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
	LGlobal.offsetX = 0;
	LGlobal.offsetY = 0;
    if(LGlobal.canTouch){
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START,function(event){
    		if(LGlobal.inputBox.style.display != NONE){
    			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
    			LGlobal.inputBox.style.display = NONE;
    		}
    		var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left),
    		canvasY = parseInt(STR_ZERO+LGlobal.object.style.top),
    		scale = 1,eve;
    		if(LGlobal.stageScale){
				if(LGlobal.os == OS_ANDROID){
	        	    h = window.screen.height;
	        	    w = window.screen.width;
				}else{
	                var de=document.documentElement;
	                var db=document.body;
	                w=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
	                h=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
				}
	    	   
	    	    if(w > h)scale = 320/width;
    		}
    		eve = {offsetX:(event.touches[0].pageX*scale - canvasX),offsetY:(event.touches[0].pageY*scale - canvasY)};
    		
        	LGlobal.offsetX = eve.offsetX;
        	LGlobal.offsetY = eve.offsetY;
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_DOWN);
        	LGlobal.buttonStatusEvent = eve;
        	LGlobal.IS_MOUSE_DOWN = true;
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
        		if(!LGlobal.box2d.mouseJoint){
        			var mX = eve.offsetX / LGlobal.box2d.drawScale,
						mY = eve.offsetY / LGlobal.box2d.drawScale;
    		        var b = LGlobal.box2d.getBodyAtMouse(mX, mY);
    		        if(b && b.mouseJoint) {
    		        	var m = new LGlobal.box2d.b2MouseJointDef();
    		        	m.bodyA = LGlobal.box2d.world.GetGroundBody();
    		        	m.bodyB = b;
    		        	m.target.Set(mouseX, mouseY);
    		        	m.collideConnected = true;
    		        	m.maxForce = 300000.0 * b.GetMass();
    		        	LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(m);
    		        	b.SetAwake(true);
    		        };
        		}
        	}
        	LGlobal.touchHandler(event);
    	});
	    LEvent.addEventListener(document,LMouseEvent.TOUCH_END,function(event){
    		var eve = {offsetX:LGlobal.offsetX,offsetY:LGlobal.offsetY};
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_UP);
        	LGlobal.touchHandler(event);
        	LGlobal.IS_MOUSE_DOWN = false;
        	LGlobal.buttonStatusEvent = null;
        	if(LGlobal.box2d != null){
			    if(LGlobal.box2d.mouseJoint) {
			    	LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
			    	LGlobal.box2d.mouseJoint = null;
			    }
		    }
    	});
        LEvent.addEventListener(document,LMouseEvent.TOUCH_MOVE,function(e){
    		var cX = parseInt(STR_ZERO+LGlobal.object.style.left),
    		cY = parseInt(STR_ZERO+LGlobal.object.style.top),
    		scale = 1,
    		eve,h,w,de,db,mX,mY;
    		if(LGlobal.stageScale){
				if(LGlobal.os == OS_ANDROID){
	        	    h = window.screen.height;
	        	    w = window.screen.width;
				}else{
	                de=document.documentElement;
	                db=document.body;
	                w=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
	                h=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
				}
	    	    if(w > h)scale = 320/width;
    	    }
    		eve = {offsetX:(e.touches[0].pageX*scale - cX),offsetY:(e.touches[0].pageY*scale - cY)};
        	LGlobal.buttonStatusEvent = eve;
        	LGlobal.offsetX = eve.offsetX;
        	LGlobal.offsetY = eve.offsetY;
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_MOVE);
        	LGlobal.touchHandler(e);
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
				mX = eve.offsetX / LGlobal.box2d.drawScale,
				mY = eve.offsetY / LGlobal.box2d.drawScale;
			    if(LGlobal.box2d.mouseJoint) {
			    	LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mX, mY));
			    }
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
        	LGlobal.mouseEvent(e,LMouseEvent.MOUSE_DOWN);
        	LGlobal.IS_MOUSE_DOWN = true;
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
        		if(!LGlobal.box2d.mouseJoint){
        			var mX = e.offsetX / LGlobal.box2d.drawScale,
						mY = e.offsetY / LGlobal.box2d.drawScale;
    		        var body = LGlobal.box2d.getBodyAtMouse(mX, mY);
    		        if(body && body.mouseJoint) {
    		        	var md = new LGlobal.box2d.b2MouseJointDef();
    		        	md.bodyA = LGlobal.box2d.world.GetGroundBody();
    		        	md.bodyB = body;
    		        	md.target.Set(mX, mY);
    		        	md.collideConnected = true;
    		        	md.maxForce = 300000.0 * body.GetMass();
    		        	LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(md);
    		        	body.SetAwake(true);
    		        };
        		}
        	}
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE,function(e){
        	if(e.offsetX == null && e.layerX != null){
        		e.offsetX = e.layerX;
        		e.offsetY = e.layerY;
        	}
        	LGlobal.buttonStatusEvent = e;
        	LGlobal.offsetX = e.offsetX;
        	LGlobal.offsetY = e.offsetY;
        	LGlobal.mouseEvent(e,LMouseEvent.MOUSE_MOVE);
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.box2d.mouseJoint)LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(e.offsetX / LGlobal.box2d.drawScale, e.offsetY / LGlobal.box2d.drawScale));
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP,function(e){
        	if(e.offsetX == null && e.layerX != null){
        		e.offsetX = e.layerX;
        		e.offsetY = e.layerY;
        	}
        	LGlobal.mouseEvent(e,LMouseEvent.MOUSE_UP);
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
        	LGlobal.mouseEvent(e,LMouseEvent.MOUSE_OUT);
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
	var k = null;
	for(k in LGlobal.childList){
		if(LGlobal.childList[k].mouseEvent){
			LGlobal.childList[k].mouseEvent(e,t);
		}
	}
};
LGlobal.horizontalError = function(){
	var b = new LSprite();
	b.graphics.drawRoundRect(4,'#cccccc',[5,5,70,100,5]);
	b.graphics.drawRect(4,'#cccccc',[30,15,20,10]);
	b.graphics.drawRoundRect(4,'#000000',[125,25,100,70,5]);
	b.graphics.drawRect(4,'#000000',[200,50,10,20]);
	b.graphics.drawRect(4,'#000000',[80,50,20,20]);
	b.graphics.drawVertices(4,'#000000',[[100,40],[120,60],[100,80]]);
	addChild(b);
	window.onorientationchange = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
};
LGlobal.verticalError = function(){
	var b = new LSprite();
	b.graphics.drawRoundRect(4,'#cccccc',[5,25,100,70,5]);
	b.graphics.drawRect(4,'#cccccc',[80,50,10,20]);
	b.graphics.drawRoundRect(4,'#000000',[155,5,70,100,5]);
	b.graphics.drawRect(4,'#000000',[180,15,20,10]);
	b.graphics.drawRect(4,'#000000',[110,50,20,20]);
	b.graphics.drawVertices(4,'#000000',[[130,40],[150,60],[130,80]]);
	addChild(b);
	window.onorientationchange = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
};
LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
	if(LGlobal.box2d != null){
		LGlobal.box2d.show();
		if(!LGlobal.traceDebug)LGlobal.canvas.clearRect(0,0,LGlobal.width,LGlobal.height);	
	}else{
		LGlobal.canvas.clearRect(0,0,LGlobal.width,LGlobal.height);	
	}
	LGlobal.buttonShow(LGlobal.buttonList);    
	LGlobal.show(LGlobal.childList);
};
LGlobal.buttonShow = function(b){
	var k = null;
	for(k in b){
		if(b[k].buttonModeChange)b[k].buttonModeChange();
   }
};
LGlobal.show = function(s,cood){
	if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
	var k = null;
	for(k in s){
		if(s[k].show)s[k].show(cood);
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
	,xA = objA.x
	,xB = objB.x
	,yA = objA.y
	,yB = objB.y;
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
	var minx = xA > xB ? xA : xB;
	var miny = yA > yB ? yA : yB;
	var maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA);
	var maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
	return minx <= maxx && miny <= maxy;
};
LGlobal.hitTest = LGlobal.hitTestRect;
LGlobal.setFrameRate = function(s){
	if(LGlobal.frameRate)clearInterval(LGlobal.frameRate);
	LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
};
var LStage = LGlobal;
LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
LGlobal.innerWidth=window.innerWidth;
LGlobal.innerHeight=window.innerHeight;
var LSystem = {
	sv:0,
	sleep:function(s){
		var d = new Date();   
		while((new Date().getTime()-d.getTime()) < s){}
	},
	screen:function(a){
		LSystem.sv = a;
	},
	screenInit:function(){
		if(!LGlobal.canTouch)return 0;
		var is,ns,xs,d='',w,v = "meta[name=viewport]",meta = document.querySelector(v),content = 'width=device-width, height=device-height, user-scalable=no, minimum-scale=1, maximum-scale=1, initial-scale=1, target-densitydpi=device-dpi';
		if(!meta){
			meta = document.createElement("meta");
			meta.setAttribute("name", "viewport");
			document.head.appendChild(meta);
		}
		w = window.innerWidth;
		if(LSystem.sv == LStage.FULL_SCREEN){
			if(LGlobal.width > LGlobal.height && w < window.innerHeight){
				meta.setAttribute("content", content);
				return 1;
			}else if(LGlobal.width < LGlobal.height && w > window.innerHeight){
				meta.setAttribute("content", content);
				return 2;
			}
			if(LGlobal.ios){
				is = ns = xs = 1 / window.devicePixelRatio;
			}else if(LGlobal.android){
				if(window.name && window.name.indexOf(location.href)){
					w = parseInt(window.name.split(location.href).join(''));
				}else{
					setTimeout(function(){
						window.name = window.innerWidth+location.href;
						location.href=location.href;
					},100);
					meta.setAttribute("content", content);
					return 3;
				}
				is = ns = xs = 1;
				if(w<=LGlobal.width){
					d=',target-densitydpi=device-dpi';
					is = ns = xs = (w/LGlobal.width);
				}
			}
		}else if(LSystem.sv > 0){
			is = ns = xs = LSystem.sv;
		}else{
			is = ns = xs = 1;
		}
		content =  'width=device-width,initial-scale='+is+', minimum-scale='+ns+', maximum-scale='+xs+',user-scallable=no'+d;
		meta.setAttribute("content", content);
		return 0;
	}
};

/*
* PageProperty.js
**/
function trace(){
	if(!LGlobal.traceDebug)return;
	var t = document.getElementById("traceObject"),i;
	if(trace.arguments.length > 0 && t == null){
		t = document.createElement("div");
		t.id = "traceObject";
		t.style.position = "absolute";
		t.style.top = (LGlobal.height + 20) + "px";
		document.body.appendChild(t);
	}
	for(i=0; i < trace.arguments.length; i++){
	   t.innerHTML=t.innerHTML+trace.arguments[i] + "<br />";
	}
}
function addChild(o){
	o.parent = "root";
	LGlobal.childList.push(o);
}
function removeChild(o){
	for(var i=0;i<LGlobal.childList.length;i++){
		if(o.objectindex == LGlobal.childList[i].objectindex){
			if(o.die)o.die();
			LGlobal.childList.splice(i,1);
			break;
		}
	}
}
function init(s,c,w,h,f,t){
	LGlobal.speed = s;
	var r;
	if(t != null && t == LEvent.INIT){
		LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
		LGlobal.setCanvas(c,w,h);
		r = LSystem.screenInit();
		if(r==0){f();}else if(r==1){LGlobal.horizontalError();}else if(r==2){LGlobal.verticalError();}
	}else{
		LEvent.addEventListener(window,"load",function(){
			LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
			LGlobal.setCanvas(c,w,h);
			r = LSystem.screenInit();
			if(r==0){f();}else if(r==1){LGlobal.horizontalError();}else if(r==2){LGlobal.verticalError();}
		});
	}
}
function base(d,b,a){
	b.apply(d,a);
	var p=null,o;
	for(p in b.prototype){
		o = d.constructor.prototype;
		if(!o[p])o[p] = b.prototype[p];
		o[p][SUPER] = b.prototype;
	}
}
/*
 * LObject.js
 **/
function LObject(){
	this.objectindex = ++LGlobal.objectIndex;
}
LObject.prototype = {};
/*
 * LDisplayObject.js
 **/
function LDisplayObject(){
	base(this,LObject,[]);
	this.mouseChildren = true;
}
LDisplayObject.prototype = {
	setShadow:function(){
		var s=this,f=s.filters;
		if(!f)return;
		for(var i=0;i<f.length;i++)f[i].show();
	}
};
/*
* LLoader.js
**/
function LLoader(){
	base(this,LObject,[]);
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
				if(s.oncomplete)s.oncomplete({});
			};
			script.src = u;
			script.type = "text/javascript";
			document.querySelector('head').appendChild(script);
		}
	},
	die:function (){
		
	}
};
for(var k in p)LURLLoader.prototype[k]=p[k];
/*
 * LMedia.js 
 **/
function LMedia(){
	var s = this;
	base(s,LObject,[]);
	s.length=0;
	s.loopIndex=0;
	s.loopLength = 1;
	s.playing=false;
	s.event = {};
	s.oncomplete = null;
	s.onsoundcomplete = null;
}
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}else if(t == LEvent.SOUND_COMPLETE){
			this.onsoundcomplete = l;
		}
	},
	removeEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = null;
		}else if(t == LEvent.SOUND_COMPLETE){
			this.onsoundcomplete = null;
		}
	},
	onload:function(){
		var s=this;
		if(s.data.readyState || (LGlobal.ios && LGlobal.canTouch)){
			s.length=s.data.duration;
			if(s.oncomplete){
				s.event.currentTarget = s;
				s.oncomplete(s.event);
			}
			return;
		}
		setTimeout(function(){s.onload();}, 100);
	},
	_onended:function(){
		var s=this;
		if(s.data.ended){
			if(s.onsoundcomplete)s.onsoundcomplete();
			if(++s.loopIndex < s.loopLength){
				s.data.currentTime=0;
				s.data.play();
			}else{
				s.close();
				return;
			}
		}
		setTimeout(function(){s._onended();}, 100);
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
				s.data.load();
				s.onload();
				s.data.play();
				s.data.pause();
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
	s.data = document.createElement("video");
	s.data.style.display = "none";
	document.body.appendChild(s.data);
	s.data.id="video_"+s.objectindex;
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
p = {
	show:function (cood){
		var s=this,c=LGlobal.canvas;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		if(!s.visible)return;
		s.save = false;
		if(s.alpha*cood.alpha < 1){
			c.save();
			s.save = true;
			c.globalAlpha = s.alpha*cood.alpha;
		}
		if(s.rotate != 0){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x, cood.y + s.y);
			c.rotate(s.rotate);
			c.translate(-(cood.x + s.x), -(cood.y + s.y));
		}
		if(s.scaleX*cood.scaleX != 1 || s.scaleY*cood.scaleY != 1){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x + s.data.videoWidth*0.5, cood.y + s.y + s.data.videoHeight*0.5);
			c.scale(s.scaleX*cood.scaleX,s.scaleY*cood.scaleY);
			c.translate(-(cood.x + s.x + s.data.videoWidth*0.5), -(cood.y + s.y + s.data.videoHeight*0.5));
		}
		if(s.mask != null && s.mask.show){
			s.mask.show(cood);
			c.clip();
		}
		c.drawImage(s.data,s.x+cood.x,s.y+cood.y);
		if(s.save){
			c.restore();
		}
	},
	die:function(){
		var s=this;
		document.body.removeChild(s.data);
		delete s.data;
	}
};
for(var k in p)LVideo.prototype[k]=p[k];
if (!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt){
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)from += len;
        for (; from < len; from++){
            if (from in this && this[from] === elt)return from;
        }
        return -1;
    };
}
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
		return x>=s.x && x <= s.right && y>= s.y && y <= s.bootom;
	},
	containsRect:function(rect){
		var s = this;
		return rect.x>=s.x && rect.right <= s.right && rect.y>= s.y && rect.bootom <= s.bootom;
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
		return "{"+s.x+","+s.y+","+s.width+","+s.height+"}";
	},
	union:function(t){
		var s=this;
		return new LRectangle(s.x>t.x?t.x:s.x,s.y>t.y?t.y:s.y,s.right>t.right?s.right:t.right,s.bottom>t.bottom?s.bottom:t.bottom);
	}
};

/*
* LQuadTree.js
**/
function LQuadTree(rect){
	var self = this;
	self.q1 = null;
	self.q2 = null;
	self.q3 = null;
	self.q4 = null;
	self.parent = null;
	self.data = [];
	self.rect = rect;
	self.root = self;
}
LQuadTree.prototype = {
	createChildren:function (deep){
        if (deep == 0){
        	return;
        }
		var self = this;
		var hw = self.rect.width / 2 , hh = self.rect.height / 2;
		self.q1 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y, hw, hh));
		self.q2 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y + hh, hw, hh));
		self.q3 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y + hh, hw, hh));
		self.q4 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y, hw, hh));
    
		self.q1.parent = self.q2.parent = self.q3.parent = self.q4.parent = self;
		self.q1.root = self.q2.root = self.q3.root = self.q4.root = self.root;
    
		self.q1.createChildren(deep - 1);
		self.q2.createChildren(deep - 1);
		self.q3.createChildren(deep - 1);
		self.q4.createChildren(deep - 1);
	},
	hasChildren:function(){
		var self = this;
		return self.q1 && self.q2 && self.q3 && self.q4;
	},
	clear:function(){
		var self = this;
	    if (self.hasChildren()){
	    	return self.q1.clear() || self.q2.clear()|| self.q3.clear() || self.q4.clear();
	    }else{
	    	self.q1 = null;
	    	self.q2 = null;
	    	self.q3 = null;
	    	self.q4 = null;
	    	self.parent = null;
	    	self.data = [];
	    	return self;
	    }
	},
	add:function(v, x, y){
		var self = this;
        if (!self.isIn(x,y))return null;
    
	    if (self.hasChildren()){
	    	return self.q1.add(v,x,y) || self.q2.add(v,x,y) || self.q3.add(v,x,y) || self.q4.add(v,x,y);
	    }else{
	    	self.data.push(v);
	    	return self;
	    }
	},
	remove:function(v, x, y){
		var self = this;
        if (!self.isIn(x,y))return null;
    
	    if (self.hasChildren()){
	    	return self.q1.remove(v,x,y) || self.q2.remove(v,x,y) || self.q3.remove(v,x,y) || self.q4.remove(v,x,y);
	    }else{
            var index = self.data.indexOf(v);
	        if (index!=-1){
	        	self.data.splice(index, 1);
	            return self;
	        }else{
	            return null;
	        }
	    }
	},
	isIn:function(x, y){
		var self = this;
		return (typeof x == UNDEFINED || (x >= self.rect.x && x < self.rect.right)) && (typeof y == UNDEFINED || (y >= self.rect.y && y < self.rect.bottom));
	},
	getDataInRect:function(rect){
		var self = this;
        if (!self.rect.intersects(rect))return [];
        var r = self.data.concat();
        if (self.hasChildren()){
            r.push.apply(r,self.q1.getDataInRect(rect));
            r.push.apply(r,self.q2.getDataInRect(rect));
            r.push.apply(r,self.q3.getDataInRect(rect));
            r.push.apply(r,self.q4.getDataInRect(rect));
	    }else{
        }
        
	    return r;
	}
};
/*
* LGraphics.js
**/
function LGraphics(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LGraphics";
	s.color = "#000";
	s.i = 0;
	s.alpha = 1;
	s.bitmap = null;
	s.setList = new Array();
	s.showList = new Array();
}
p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this,k=null;
		if(s.setList.length == 0)return;
		for(k in s.setList){
			s.setList[k](cood);
		}
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
		s.setList.splice(0,s.setList.length);
		s.showList.splice(0,s.showList.length);
	},
	rect:function (x,y,w,h){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.rect(x, y, w, h);});
		s.showList.push({type:"rect",value:[x,y,w,h]});
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
	},
	beginBitmapFill:function(b){
		var s = this;
		s.setList.push(function(cood){
			s.bitmap=b;
		});
	},
	drawArc:function(tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y;
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			c.beginPath();
			c.arc(pa[0]+cx,pa[1]+cy,pa[2],pa[3],pa[4],pa[5]);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						cx,cy,s.bitmap.width,s.bitmap.height);
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
			if(s.save)c.restore();
		});
		s.showList.push({type:"arc",value:pa});
	},
	drawRect:function (tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.rect((pa[0]+cx),(pa[1]+cy),pa[2],pa[3]);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						0,0,
						s.bitmap.width,s.bitmap.height,
						cx,cy,
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
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"rect",value:pa});
	},
	drawRoundRect:function(tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(pa[0]+cx+pa[4],pa[1]+cy);
			c.lineTo(pa[0]+cx+pa[2]-pa[4],pa[1]+cy);
			c.arcTo(pa[0]+cx+pa[2],pa[1]+cy,pa[0]+cx+pa[2],pa[1]+cy+pa[4],pa[4]);
			c.lineTo(pa[0]+cx+pa[2],pa[1]+cy+pa[3]-pa[4]);
			c.arcTo(pa[0]+cx+pa[2],pa[1]+cy+pa[3],pa[0]+cx+pa[2]-pa[4],pa[1]+cy+pa[3],pa[4]);
			c.lineTo(pa[0]+cx+pa[4],pa[1]+cy+pa[3]);
			c.arcTo(pa[0]+cx,pa[1]+cy+pa[3],pa[0]+cx,pa[1]+cy+pa[3]-pa[4],pa[4]);
			c.lineTo(pa[0]+cx,pa[1]+cy+pa[4]);
			c.arcTo(pa[0]+cx,pa[1]+cy,pa[0]+cx+pa[4],pa[1]+cy,pa[4]);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						0,0,
						s.bitmap.width,s.bitmap.height,
						cx,cy,
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
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"rect",value:pa});
	},
	drawVertices:function(tn,lco,v,isf,co){
		var s = this,c=LGlobal.canvas;
		if(v.length < 3)return;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(v[0][0]+cx,v[0][1]+cy);
			var i,l = v.length;
			for(i=1;i<l;i++){
				var pa = v[i];
				c.lineTo(pa[0]+cx,pa[1]+cy);
			};
			c.lineTo(v[0][0]+cx,v[0][1]+cy);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						cx,cy,s.bitmap.width,s.bitmap.height);
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
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"vertices",value:v});
	},
	drawTriangles:function(ve, ind, u ,tn,lco){
		var s = this;
		var i,j,l = ind.length,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y,v;
			if(cood.scaleX != 1 || cood.scaleY != 1){
				v = [];
				for(i=0;i<ve.length;i+=2){
					v[i] = ve[i]*cood.scaleX;
					v[i+1] = ve[i+1]*cood.scaleY;
				}
			}else{
				v = ve;
			}
			for(i=0,j=0;i<l;i+=3){
				a=0;
				c.save();
				if(cood.alpha < 1)c.globalAlpha = cood.alpha;
				c.beginPath();
				c.moveTo(v[ind[i]*2]+cx*cood.scaleX,v[ind[i]*2+1]+cy*cood.scaleY);
				c.lineTo(v[ind[i+1]*2]+cx*cood.scaleX,v[ind[i+1]*2+1]+cy*cood.scaleY);
				c.lineTo(v[ind[i+2]*2]+cx*cood.scaleX,v[ind[i+2]*2+1]+cy*cood.scaleY);
				c.lineTo(v[ind[i]*2]+cx*cood.scaleX,v[ind[i]*2+1]+cy*cood.scaleY);
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
					c.setTransform(t1,t2,t3,t4, v[ind[i]*2]+cx*cood.scaleX, v[ind[i]*2+1]+cy*cood.scaleY);
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
					c.setTransform(t1,t2,t3,t4, v[ind[i+1]*2]+cx*cood.scaleX, v[ind[i+1]*2+1]+cy*cood.scaleY);
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
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(pa[0]+cx,pa[1]+cy);
			c.lineTo(pa[2]+cx,pa[3]+cy);
			c.lineWidth = tn;
			c.strokeStyle = lco;
			c.closePath();
			c.stroke();
		});
	},
	lineStyle:function (tn,co,a){
		var s = this,c=LGlobal.canvas;
		if(color==null)co=s.color;
		if(alpha==null)a=s.alpha;
		s.color = co;
		s.alpha = a;
		s.setList.push(function(){
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
		if(e==null || e == UNDEFINED)return false;
		if(co==null)co={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(ox >= s.showList[k].value[0] + co.x && ox <= s.showList[k].value[0] + co.x + s.showList[k].value[2] && 
					oy >= s.showList[k].value[1] + co.y && oy <= s.showList[k].value[1] + co.y + s.showList[k].value[3]){
					return true;
				}
			}else if(s.showList[k].type == "arc"){
				var xl = s.showList[k].value[0] + co.x - ox;
				var yl = s.showList[k].value[1] + co.y - oy;
				return xl*xl+yl*yl <= s.showList[k].value[2]*s.showList[k].value[2];
			}
		}		
		return false;
	},
	getWidth:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[0])min = s.showList[k].value[0];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[0] - s.showList[k].value[2])min = s.showList[k].value[0] - s.showList[k].value[2];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[0])min = v[0];
					if(max < v[0])max = v[0];
				}
			}
		}		
		return max - min;
	},
	getHeight:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[1])min = s.showList[k].value[1];
				if(max < s.showList[k].value[1] + s.showList[k].value[3])max = s.showList[k].value[1] + s.showList[k].value[3];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[1] - s.showList[k].value[2])min = s.showList[k].value[1] - s.showList[k].value[2];
				if(max < s.showList[k].value[1] + s.showList[k].value[2])max = s.showList[k].value[1] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[1])min = v[1];
					if(max < v[1])max = v[1];
				}
			}
		}		
		return max - min;
	},
	startX:function(){
		var s=this;
		var k = null,k1=null;
		var v = 0,ve;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(v > s.showList[k].value[0])v = s.showList[k].value[0];
			}else if(s.showList[k].type == "arc"){
				if(v > s.showList[k].value[0] - s.showList[k].value[2])v = s.showList[k].value[0] - s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					ve = s.showList[k].value[k1];
					if(v > ve[0])v = ve[0];
				}
			}
		}		
		return v;
	},
	startY:function(){
		var s=this;
		var k = null,k1=null;
		var v = 0,ve;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(v > s.showList[k].value[1])v = s.showList[k].value[1];
			}else if(s.showList[k].type == "arc"){
				if(v > s.showList[k].value[1] - s.showList[k].value[2])v = s.showList[k].value[1] - s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					ve = s.showList[k].value[k1];
					if(v > ve[1])v = ve[1];
				}
			}
		}		
		return v;
	}
};
for(var k in p)LGraphics.prototype[k]=p[k];

function LBox2d(){
	var s = this,i,j,b=Box2D,
	a=[b.Collision,b.Common,b.Common.Math,
	b.Dynamics,b.Dynamics.Contacts,b.Dynamics.Controllers,b.Dynamics.Joints,b.Collision.Shapes];
	for(i in a)for(j in a[i])s[j]=a[i][j];
	s.drawScale = 30;
	s.selectedBody = null;
	s.mouseJoint = null;
	s.mousePVec = null;
	s.contactListener = null;
	s.world = new s.b2World(new s.b2Vec2(0, 9.8),true);
	s.removeList = new Array();
	if(LGlobal.traceDebug){
		var d = new s.b2DebugDraw();
		d.SetSprite(LGlobal.canvas);
		d.SetLineThickness(1);
		d.SetFillAlpha(0.5);
		d.SetAlpha(1);
		d.SetDrawScale(s.drawScale);
		d.SetFlags(s.b2DebugDraw.e_shapeBit | s.b2DebugDraw.e_jointBit);
		s.world.SetDebugDraw(d);
	}
}
LBox2d.prototype = {
	setEvent:function(t_v,f_v){
		var s = this;
		if(!s.contactListener){
			s.contactListener = new s.b2ContactListener();
			s.world.SetContactListener(s.contactListener);
		}
		switch(t_v){
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
	setWeldJoint:function(A,B){ 
		var s = this; 
	    var j = new s.b2WeldJointDef();
	    j.Initialize(B, A, B.GetWorldCenter());
	 
	    return s.world.CreateJoint(j);
	},
    setLineJoint:function(A,B,vec,t,m){
		var s = this; 
	    var wa = new s.b2Vec2(vec[0],vec[1]);
	    var j = new s.b2LineJointDef();
	    j.Initialize(A, B, B.GetWorldCenter(), wa);
	    if(t == null){
	    	j.enableLimit = false;
	    }else{
	    	j.lowerTranslation = t[0];
		    j.upperTranslation = t[1];
		    j.enableLimit = true;
	    }
	    if(m == null){
	    	j.enableMotor = false;
	    }else{
	    	j.maxMotorForce = m[0];
		    j.motorSpeed = m[1];
		    j.enableMotor = true;
		}
	     
	    return s.world.CreateJoint(j);
	},
	setGearJoint:function(A,B,ra,r,p){ 
		var s = this; 
	    var j = new s.b2GearJointDef();
	    j.joint1 = r;
	    j.joint2 = p;
	    j.bodyA = A;
	    j.bodyB = B;
	    j.ratio = ra * s.b2Settings.b2_pi / (300 / s.drawScale);
	     
	    return s.world.CreateJoint(j);
	},
	setPrismaticJoint:function(A,B,vec,t,m){
		var s = this;
	    var wa = new s.b2Vec2(vec[0],vec[1]);
	    var j = new s.b2PrismaticJointDef();
	    j.Initialize(B, A, B.GetWorldCenter(), wa);
	    if(t == null){
	    	j.enableLimit = false;
	    }else{
		    j.lowerTranslation = t[0];
		    j.upperTranslation = t[1];
		    j.enableLimit = true;
	    }
	    if(m == null){
	    	j.enableMotor = false;
	    }else{
		    j.maxMotorForce = m[0];
		    j.motorSpeed = m[1];
		    j.enableMotor = true;
		}
	    return s.world.CreateJoint(j);
	},
	setRevoluteJoint:function(A,B,a,m){
		var s = this;
		var j  = new s.b2RevoluteJointDef();
		j .Initialize(A, B, B.GetWorldCenter());
		if(a == null){
			j.enableLimit = false;
		}else{
		    j.lowerAngle = a[0] * s.b2Settings.b2_pi/180;
		    j.upperAngle = a[1] * s.b2Settings.b2_pi/180;
		    j.enableLimit = true;
		}
		if(m == null){
			j.enableMotor = false;
		}else{
			j.maxMotorTorque = m[0];
			j.motorSpeed = m[1];
			j.enableMotor = true;
		}
		return s.world.CreateJoint(j ); 
	},
	setDistanceJoint:function(A,B){
		var s = this;
		var j = new s.b2DistanceJointDef();
		j.Initialize(A, B, A.GetWorldCenter(), B.GetWorldCenter());
		return s.world.CreateJoint(j); 
	},
	setPulleyJoint:function(A,B,vA,vB,ratio){
		var s = this;
		var a1 = A.GetWorldCenter();  
	    var a2 = B.GetWorldCenter();
	    var g1 = new s.b2Vec2(a1.x + (vA[0] / s.drawScale), a1.y + (vA[1] / s.drawScale));
	    var g2 = new s.b2Vec2(a2.x + (vB[0] / s.drawScale), a2.y + (vB[1] / s.drawScale));
	    var j = new s.b2PulleyJointDef();  
	    j.Initialize(A, B, g1, g2, a1, a2,ratio);  
	    j.maxLengthA = vA[2] / s.drawScale;
	    j.maxLengthB = vB[2] / s.drawScale;
	    return s.world.CreateJoint(j);
	},
	addCircle:function(r,cx,cy,t,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		/*动态*/
		s.bodyDef.type = t;
		s.fixDef = new s.b2FixtureDef;
		/*密度*/
		s.fixDef.density = d;
		/*摩擦*/
		s.fixDef.friction = f;
		/*弹力*/
		s.fixDef.restitution = e;
		/*加入球*/
		s.fixDef.shape = new s.b2CircleShape( r );
		/*坐标*/
		s.bodyDef.position.x = cx;
		s.bodyDef.position.y = cy;
		var shape = s.world.CreateBody(s.bodyDef);
		shape.CreateFixture(s.fixDef);
		return shape;
	},
	addPolygon:function(w,h,cx,cy,type,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		/*动态*/
		s.bodyDef.type = type;
		s.fixDef = new s.b2FixtureDef;
		/*密度*/
		s.fixDef.density = d;
		/*摩擦*/
		s.fixDef.friction = f;
		/*弹力*/
		s.fixDef.restitution = e;
		/*加入球*/
		s.fixDef.shape = new s.b2PolygonShape;
		s.fixDef.shape.SetAsBox(w,h);
		s.bodyDef.position.x = cx;
		s.bodyDef.position.y = cy;
		var shape = s.world.CreateBody(s.bodyDef);
		shape.CreateFixture(s.fixDef);
		return shape;
	},
	addVertices:function(vertices,type,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		/*动态*/
		s.bodyDef.type = type;
		var shape = s.world.CreateBody(s.bodyDef);
        for(var i = 0; i<vertices.length; i++)
        {
			s.createShapeAsArray(shape,vertices[i],type,d,f,e);
        }
		return shape;
	},
	createShapeAsArray:function(c,vertices,type,d,f,e){
		var s = this;
        var shape = new s.b2PolygonShape();
        var sv = s.createVerticesArray(vertices);
        shape.SetAsArray(sv,0);
        var def = new s.b2FixtureDef();
        def.shape = shape;
		/*密度*/
		def.density = d;
		/*摩擦*/
		def.friction = f;
		/*弹力*/
		def.restitution = e;
        c.CreateFixture(def);
	},
	createVerticesArray:function(a){
		var s = this;
        var v = new Array();
        if(a.length < 3)return v;
        for (var i = 0; i<a.length ; i++)v.push(new s.b2Vec2(a[i][0]/s.drawScale, a[i][1]/s.drawScale));
        return v;
    }, 
	getBodyAtMouse:function (mouseX, mouseY) { 
 		var s = this;
		s.mousePVec = new s.b2Vec2(mouseX, mouseY);
		var aabb = new s.b2AABB();
		aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
		aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
		s.selectedBody = null;
		s.world.QueryAABB(s.getBodyCallBack, aabb);
		return s.selectedBody;
	},
	getBodyCallBack:function (fixture) {
		var s = LGlobal.box2d;
	    if(fixture.GetBody().GetType() != s.b2Body.b2_staticBody) {
	    	if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), s.mousePVec)) {
	    		s.selectedBody = fixture.GetBody();
	        	return false;
	    	}
	    }
	    return true;
	},
	show:function(){
		var s = this,k=null;
		for(k in s.removeList){
			s.world.DestroyBody(s.removeList[k]);
		}
		s.removeList.splice(0,s.removeList.length);
		s.world.Step(1 / 30,10,10);
		s.world.ClearForces();
		if(LGlobal.traceDebug){
			s.world.DrawDebugData();
		}
	},
	synchronous:function(){
		var s = this;
		var parent = null,child,position=null,cx=0,cy=0,currentBody,joint;
		for (currentBody=s.world.GetBodyList(); currentBody; currentBody=currentBody.GetNext()) {
			child = currentBody.GetUserData();
			if(child){
				if(position==null){
					parent = child.parent;
					cx = currentBody.GetPosition().x;
					cy = currentBody.GetPosition().y;
				}
				currentBody.SetPosition(new s.b2Vec2(
					(child.x + child.rotatex + parent.x)/s.drawScale,
					(child.y + child.rotatey + parent.y)/s.drawScale ));
				if(position==null){
					position = {x:(currentBody.GetPosition().x - cx),y:(currentBody.GetPosition().y - cy)};
				}
			}
		}
		for (joint=s.world.GetJointList(); joint; joint=joint.GetNext()) {
			if(joint.m_groundAnchor1){
				joint.m_groundAnchor1.x += position.x;
				joint.m_groundAnchor1.y += position.y;
			}
			if(joint.m_groundAnchor2){
				joint.m_groundAnchor2.x += position.x;
				joint.m_groundAnchor2.y += position.y;
			}
		}
	}
};

/*
* LSprite.js
**/
function LSprite(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LSprite";
	s.x = 0;
	s.y = 0;
	s.rotatex;
	s.rotatey;
	s.rotate = 0;
	s.alpha = 1;
	s.visible=true;
	s.childList = new Array();
	s.frameList = new Array();
	s.mouseList = new Array();
	s.graphics = new LGraphics();
	s.graphics.parent = s;
	s.width = 0;
	s.height = 0;
	s.scaleX=1;
	s.scaleY=1;
	s.box2d = null;
	s.mask = null;
}
p = {
	setRotate:function (angle){
		var s = this;
		if(s.box2dBody){
			s.box2dBody.SetAngle(angle);
		}else{
			s.rotate = angle;
		}
	},
	show:function (cood){
		var s = this,rotateFlag = Math.PI / 180,c = LGlobal.canvas;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		if(!s.visible)return;
		s.save = false;
		if((s.mask != null && s.mask.show) || s.rotate != 0 || s.filters || s.box2dBody){
			c.save();
			s.save = true;
		}
		if(s.filters)s.setShadow();
		if(s.box2dBody){
			s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - cood.x - s.rotatex;
			s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - cood.y - s.rotatey;
			s.rotate = s.box2dBody.GetAngle();
			rotateFlag = 1;
		}
		if(s.mask != null && s.mask.show){
			s.mask.show(cood);
			c.clip();
		}
		if(s.rotate != 0){
			if(typeof(s.rotatex) == "undefined"){
				s.getRotateXY();
			}
			c.translate(cood.x + s.x + s.rotatex, cood.y + s.y + s.rotatey);
			c.rotate(s.rotate * rotateFlag);
			c.translate(-(cood.x + s.x + s.rotatex), -(cood.y + s.y + s.rotatey));
		}
		s.graphics.show({x:s.x+cood.x,y:s.y+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY,alpha:cood.alpha*s.alpha});
		LGlobal.show(s.childList,{x:s.x+cood.x,y:s.y+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY,alpha:cood.alpha*s.alpha});
		if(s.save)c.restore();
		s.loopframe();
	},
	getRotateXY:function(w,h){
		var s = this;
		if(w!=null && h!=null){
			s.rotatex = w/2;
			s.rotatey = h/2;
			return;
		}
		w=0;
		h=0;
		var k=null,w1,h1;
		for(k in s.childList){
			if(s.childList[k].getWidth){
				w1=s.childList[k].getWidth();
				w = w < w1?w1:w;
			}
			if(s.childList[k].getHeight){
				h1=s.childList[k].getHeight();
				h = h < h1?h1:h;
			}
		}
		s.rotatex = w/2;
		s.rotatey = h/2;
	},
	getWidth:function(){
		var s=this;
		var v=s.graphics.getWidth(),v1=0,k=null;
		for(k in s.childList){
			if(s.childList[k].getWidth){
				v1=s.childList[k].getWidth();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	getHeight:function(){
		var s=this;
		var v=s.graphics.getHeight(),v1=0,k=null;
		for(k in s.childList){
			if(s.childList[k].getHeight){
				v1=s.childList[k].getHeight();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	startX:function(){
		var s=this;
		var v=s.x + s.graphics.startX(),v1;
		for(k in s.childList){
			if(s.childList[k].startX){
				v1=s.x + s.childList[k].startX();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	startY:function(){
		var s=this;
		var v=s.y + s.graphics.startY(),v1;
		for(k in s.childList){
			if(s.childList[k].startY){
				v1=s.y + s.childList[k].startY();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	setBodyMouseJoint:function(value){
		var s = this;
		if(!s.box2dBody)return;
		s.box2dBody.mouseJoint = true;
	},
	clearBody:function(){
		var s = this;
		if(!s.box2dBody)return;
		LGlobal.box2d.removeList.push(s.box2dBody);
		s.box2dBody = null;
	},
	addBodyCircle:function(radius,cx,cy,type,density,friction,restitution){
		var s = this;
		s.rotatex = radius;
		s.rotatey = radius;
		s.box2dBody = LGlobal.box2d.addCircle(
			radius/LGlobal.box2d.drawScale,
			(s.x+cx)/LGlobal.box2d.drawScale,
			(s.y+cy)/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		s.box2dBody.SetUserData(s);
	},
	addBodyPolygon:function(w,h,type,density,friction,restitution){
		var s = this;
		s.rotatex = w/2;
		s.rotatey = h/2;
		s.box2dBody = LGlobal.box2d.addPolygon(
			w*0.5/LGlobal.box2d.drawScale,
			h*0.5/LGlobal.box2d.drawScale,
			s.x/LGlobal.box2d.drawScale,
			s.y/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		s.box2dBody.SetUserData(s);
	},
	addBodyVertices:function(vertices,cx,cy,type,density,friction,restitution){
		var s = this;
		s.rotatex = 0;
		s.rotatey = 0;
		s.box2dBody = LGlobal.box2d.addVertices(vertices,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
				density,friction,restitution);
		s.box2dBody.SetUserData(s);
		s.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((s.x+cx)/LGlobal.box2d.drawScale,(s.y+cy)/LGlobal.box2d.drawScale));
	},
	loopframe:function (){
		var s = this;
		var k = null;
		for(k in s.frameList){
			s.frameList[k](s);
		}
	},
	addChild:function (d){
		var s  = this;
		d.parent = s;
		s.childList.push(d);
		s.resize();
	},
	removeChild:function(d){
		var s  = this;
		for(var i=0;i<s.childList.length;i++){
			if(d.objectindex == s.childList[i].objectindex){
				if(d.die)d.die();
				s.childList.splice(i,1);
				break;
			}
		}
		s.resize();
	},
	getChildAt:function(i){
		var s  = this;
		if(s.childList.length == 0 || s.childList.length <= i)return null;
		return s.childList[i];
	},
	removeChildAt:function(i){
		var s  = this;
		if(s.childList.length >= i)return;
		s.childList[i].die();
		s.childList.splice(i,1);
		s.resize();
	},
	resize:function(){
		var s  = this;
		var sx = 0,sy = 0,ex = 0,ey = 0;
		for(var i=0;i<s.childList.length;i++){
			if(sx > s.childList[i].x){
				sx = s.childList[i].x;
			}
			if(ex < s.childList[i].width + s.childList[i].x){
				ex = s.childList[i].width + s.childList[i].x;
			}
			if(sy > s.childList[i].y){
				sy = s.childList[i].y;
			}
			if(ey < s.childList[i].height + s.childList[i].y){
				ey = s.childList[i].height + s.childList[i].y;
			}
		}
		s.width = ex - sx;
		s.height = ey - sy;
	},
	removeAllChild:function(){
		var s  = this;
		for(var i=0;i<s.childList.length;i++){
			if(s.childList[i].die)s.childList[i].die();
		}
		s.childList.splice(0,s.childList.length);
		s.width = 0;
		s.height = 0;
	},
	addEventListener:function (type,listener){
		var s = this;
		if(type == LEvent.ENTER_FRAME){
			s.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0){
			s.mouseList.push({listener:listener,type:type});
		}else if(type.indexOf("touch")>=0){
			s.mouseList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function (type,listener){
		var s = this;
		var i,length = s.frameList.length;
		for(i=0;i<length;i++){
			if(type == LEvent.ENTER_FRAME && s.frameList[i] == listener){
				s.frameList.splice(i,1);
				break;
			}
		}
		length = s.mouseList.length;
		for(i=0;i<length;i++){
			if(type == s.mouseList[i].type && s.mouseList[i].listener == listener){
				s.mouseList.splice(i,1);
				break;
			}
		}
	},
	mouseEvent:function (e,type,cd){
		if(e==null || e == UNDEFINED)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this;
		if(!s.mouseChildren)return false;
		var i,k,ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		for(k=s.childList.length-1;k>=0;k--){
			if(s.childList[k].mouseEvent){
				i = s.childList[k].mouseEvent(e,type,{x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY,alpha:cd.alpha*s.alpha});
				if(i)return true;
			}
		}
		if(s.mouseList.length == 0){
			return false;
		}
		var i = s.ismouseon(e, cd);
		if(i){
			for(k in s.mouseList){
				var o = s.mouseList[k];
				if(o.type == type){
					e.selfX = ox - (s.x+cd.x);
					e.selfY = oy - (s.y+cd.y);
					e.clickTarget = s;
					o.listener(e,s);
					return true;
				}
			}
			return false;
		}else{
			return false;
		}
	},
	ismouseon:function(e,cd){
		var s = this;
		if(!s.visible || e==null)return false;
		var k = null,i=false,l=s.childList;
		var sc={x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY,alpha:cd.alpha*s.alpha};
		for(k=l.length-1;k>=0;k--){
			if(l[k].ismouseon)i = l[k].ismouseon(e,sc);
			if(i)break;
		}
		if(!i && s.graphics)i = s.graphics.ismouseon(e,sc);
		return i;
	},
	die:function (){
		var s = this;
		s.graphics.clear();
		s.frameList.splice(0,s.frameList.length);
		s.mouseList.splice(0,s.mouseList.length);
		if(s.box2dBody)s.clearBody();
		var k = null,l=s.childList;
		for(k in l){
			if(l[k].die)l[k].die();
		}
	},
	callParent:function(f_n,args){
		args.callee[SUPER][f_n].call(this);
	}
};
for(var k in p)LSprite.prototype[k]=p[k];


/*
* LButton.js
**/
function LButton(d_up,d_over){
	base(this,LSprite,[]);
	var s = this;
	s.type = "LButton";
	s.bitmap_up = d_up;
	s.addChild(d_up);
	if(d_over == null){
		d_over = d_up;
	}else{
		s.addChild(d_over);
	}
	s.bitmap_over = d_over;
	s.bitmap_over.visible = false;
	s.bitmap_up.visible = true;
	LGlobal.buttonList.push(s);
}
LButton.prototype.buttonModeChange = function (){
	var s = this;
	var cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
	var parent = s.parent;
	while(parent != "root"){
		cood.x += parent.x;
		cood.y += parent.y;
		parent = parent.parent;
	}
	if(s.ismouseon(LGlobal.buttonStatusEvent,cood)){
		s.bitmap_up.visible = false;
		s.bitmap_over.visible = true;
	}else{
		s.bitmap_over.visible = false;
		s.bitmap_up.visible = true;
	}
};
LButton.prototype.die = function (){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	for(var i=0;i<LGlobal.buttonList.length;i++){
		if(LGlobal.buttonList[i].objectindex == s.objectindex){
			LGlobal.buttonList.splice(i,1);
			break;
		}
	}
};


/*
* LTextFieldType.js
**/
var LTextFieldType = function (){};
LTextFieldType.type = "LTextFieldType";
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;


/*
* LTextField.js
**/
function LTextField(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LTextField";
	s.texttype = null;
	s.x = 0;
	s.y = 0;
	s.text = "";
	s.font = "utf-8";
	s.size = "11";
	s.color = "#000000";
	s.weight = "normal";
	s.textAlign = "left";
	s.textBaseline = "top";
	s.lineWidth = 1;
	s.width = 150;
	s.height = s.size;
	s.stroke = false;
	s.visible=true;
	s.scaleX=1;
	s.sclaeY=1;
	s.alpha=1;
	s.rotate=0;
	s.wordWrap=false;
}
p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this,c = LGlobal.canvas,rotateFlag = Math.PI / 180;
		if(!s.visible)return;
		s.save = false;
		if(s.alpha*cood.alpha < 1){
			c.save();
			s.save = true;
			c.globalAlpha = s.alpha*cood.alpha;
		}
		c.font = s.weight + " " + s.size+"pt "+s.font;  
		c.textAlign = s.textAlign;
		c.textBaseline = s.textBaseline;
		c.lineWidth = s.lineWidth;  
		if(s.filters){
			if(!s.save)c.save();
			s.save = true;
			s.setShadow();
		}
		if(s.rotate != 0){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x + c.measureText(s.text).width*0.5, cood.y + s.y + s.size*0.5);
			c.rotate(s.rotate * rotateFlag);
			c.translate(-(cood.x + s.x + c.measureText(s.text).width*0.5), -(cood.y + s.y + s.size*0.5));
		}
		if(s.scaleX*cood.scaleX != 1 || s.scaleY*cood.scaleY != 1){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x + c.measureText(s.text).width*0.5, cood.y + s.y + s.size*0.5);
			c.scale(s.scaleX*cood.scaleX,s.scaleY*cood.scaleY);
			c.translate(-(cood.x + s.x + c.measureText(s.text).width*0.5), -(cood.y + s.y + s.size*0.5));
		}
		if(s.mask != null && s.mask.show){
			c.beginPath();
			if(!s.save)c.save();  
			s.mask.show(cood);
			c.clip();
		}
		if(s.texttype == LTextFieldType.INPUT){
			s.inputBackLayer.show({x:s.x+cood.x,y:s.y+cood.y});
	    	if(LGlobal.inputBox.name == "input"+s.objectindex){
	    		LGlobal.inputBox.style.marginTop = (s.y+cood.y) + "px";
	    		LGlobal.inputBox.style.marginLeft = (s.x+cood.x) + "px";
	    	}
		}

	    if(s.stroke){
		    c.strokeStyle = s.color;
		    if(s.wordWrap){
		    	var i,j=0,k=0,m=0;
		    	for(i=0;i<s.text.length;i++){
			    	j = c.measureText(s.text.substr(k,i-k)).width;
			    	if(j > s.width){
			    		j = 0;
			    		k = i;
			    		m++;
			    	}
	    			c.strokeText(s.text.substr(i,1),parseFloat(cood.x) + parseFloat(s.x) + j,
			    		parseFloat(cood.y) + parseFloat(s.y) + m*s.wordHeight,
			    		c.measureText(s.text).width);
		    	}
			s.height = m*s.wordHeight;
		    }else{
	    		c.strokeText(s.text,parseFloat(cood.x) + parseFloat(s.x),
		    		parseFloat(cood.y) + parseFloat(s.y),
		    		c.measureText(s.text).width);  
	    	}
	    }else{
		    c.fillStyle = s.color;
		    if(s.wordWrap){
		    	var i,j=0,k=0,m=0;
		    	for(i=0;i<s.text.length;i++){
			    	j = c.measureText(s.text.substr(k,i-k)).width;
			    	if(j > s.width){
			    		j = 0;
			    		k = i;
			    		m++;
			    	}
	    			c.fillText(s.text.substr(i,1),parseFloat(cood.x) + parseFloat(s.x) + j,
			    		parseFloat(cood.y) + parseFloat(s.y) + m*s.wordHeight,
			    		c.measureText(s.text).width);
		    	}
			s.height = m*s.wordHeight;
		    }else{
	    		c.fillText(s.text,parseFloat(cood.x) + parseFloat(s.x),
		    		parseFloat(cood.y) + parseFloat(s.y),
		    		c.measureText(s.text).width);
		    }
	    }
	    if(s.wind_flag){
	    	s.windRun();
	    }

		if(s.save){
			c.restore();
		}
	},
	setWordWrap:function(v,h){
		var s = this;
		s.wordWrap = v;
		s.wordHeight = h;
	},
	setType:function(type,inputBackLayer){
		var s = this;
		if(s.texttype != type && type == LTextFieldType.INPUT){
			if(inputBackLayer==null || inputBackLayer.type != "LSprite"){
				s.inputBackLayer = new LSprite();
				s.inputBackLayer.graphics.drawRect(1,"black",[0, 0, s.width, s.height],true,"#cccccc");
			}else{
				s.inputBackLayer = inputBackLayer;
			}
			s.inputBackLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
				if(s.texttype != LTextFieldType.INPUT)return;
				LGlobal.inputBox.style.display = "";
				LGlobal.inputBox.name = "input"+s.objectindex;
	    		LGlobal.inputTextField = s;
	    		LGlobal.inputTextBox.value = s.text;
	    		LGlobal.inputTextBox.style.height = s.height+"px";
	    		LGlobal.inputTextBox.style.width = s.width+"px";
			});
		}else{
			s.inputBackLayer = null;
		}
		s.texttype = type;
	},
	mouseEvent:function (event,type,cood){
		if(cood==null)cood={x:0,y:0};
		var s = this;
		if(s.inputBackLayer == null)return;
		s.inputBackLayer.mouseEvent(event,type,{x:s.x+cood.x,y:s.y+cood.y});
	},
	getWidth:function(){
		var s = this;
		if(s.wordWrap)return s.width;
		LGlobal.canvas.font = s.size+"pt "+s.font;
		return LGlobal.canvas.measureText(s.text).width;
	},
	getHeight:function(){
		var s = this;
		if(s.wordWrap)return s.height;
		return s.size;
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
	callParent:function(function_name,args){
		args.callee[SUPER][function_name].call(this);
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

/*
* LBitmap.js
**/
function LBitmap(bitmapdata){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LBitmap";
	s.x = 0;  
	s.y = 0;  
	s.width = 0;  
	s.height = 0;  
	s.scaleX=1;
	s.scaleY=1;
	s.alpha = 1;
	s.visible=true;
	s.rotate = 0;
	s.bitmapData = bitmapdata; 
	if(s.bitmapData){
		s.width = s.bitmapData.width;
		s.height = s.bitmapData.height;
	}
}
p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1};
		var s = this,c = LGlobal.canvas,a = s.alpha*cood.alpha;
		if(!s.visible || !s.bitmapData)return;
		s.save = false;

		if(a < 1 || s.rotate != 0 || s.scaleX == -1 || s.scaleY == -1 || s.filters){
			c.save();  
			s.save = true;
		} 
		if(s.filters)s.setShadow();
		if(s.rotate != 0){
			var rx,ry ;
			rx = cood.x + s.x+s.bitmapData.width*s.scaleX*cood.scaleX/2;
			ry = cood.y + s.y+s.bitmapData.height*s.scaleY*cood.scaleY/2;
			c.translate( rx, ry); 
			c.rotate(s.rotate * Math.PI / 180);
			c.translate(0-rx,0-ry);
			if(a < 1)c.globalAlpha = a;
			s.draw(cood);
		}else{
			if(a < 1)c.globalAlpha = a;
			s.draw(cood);
		}
		if(s.save)c.restore(); 
	},
	draw:function(cood){
		var s=this,c=LGlobal.canvas;
		if(s.scaleX == -1 || s.scaleY == -1){
			s.tX = (s.scaleX == -1)?-1:1;
			s.tY = (s.scaleY == -1)?-1:1;
			c.translate(cood.x + s.x , cood.y + s.y);
			c.scale(s.tX,s.tY);
			c.translate(-(cood.x + s.x + (s.tX==1?0:s.bitmapData.width)), -(cood.y + s.y + (s.tY==1?0:s.bitmapData.height)));
			c.drawImage(s.bitmapData.image,
				s.bitmapData.x,s.bitmapData.y,s.bitmapData.width,s.bitmapData.height,
				(cood.x + s.x),
				(cood.y + s.y),
				s.bitmapData.width*cood.scaleX,
				s.bitmapData.height*cood.scaleY);
		}else{
			c.drawImage(s.bitmapData.image,
				s.bitmapData.x,s.bitmapData.y,
				s.bitmapData.width,s.bitmapData.height,
				cood.x + s.x,cood.y + s.y,
				s.bitmapData.width*s.scaleX*cood.scaleX,s.bitmapData.height*s.scaleY*cood.scaleY);
		}
	},
	ismouseon:function(e,cood){
		var s = this;
		if(cood==null)cood={x:0,y:0};
		if(e==null || e == UNDEFINED)return false;
		if(!s.visible || !s.bitmapData)return false;
		var ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		if(ox >= s.x + cood.x && ox <= s.x + cood.x + s.bitmapData.width*s.scaleX*cood.scaleX && 
			oy >= s.y + cood.y && oy <= s.y + cood.y + s.bitmapData.height*s.scaleY*cood.scaleY){
			return true;
		}else{
			return false;
		}
	},
	getWidth:function(){
		var s = this;
		return s.bitmapData != null?s.bitmapData.width*(s.scaleX>0?s.scaleX:-s.scaleX):0;
	},
	getHeight:function(){
		var s = this;
		return s.bitmapData != null?s.bitmapData.height*(s.scaleY>0?s.scaleY:-s.scaleY):0;
	},
	startX:function(){
		return this.x;
	},
	startY:function(){
		return this.y;
	},
	callParent:function(f_n,args){
		args.callee[SUPER][f_n].call(this);
	}
};
for(var k in p)LBitmap.prototype[k]=p[k];


/*
* LBitmapData.js
**/
function LBitmapData(image,x,y,width,height){
	base(this,LObject,[]);
	var s = this;
	s.type = "LBitmapData";
	s.oncomplete = null;
	s._locked=false;
	s._setPixel=false;
	s.x = (x==null?0:x);  
	s.y = (y==null?0:y);
	if(image && typeof image == "object"){
		s.image = image; 
		s.width = (width==null?s.image.width:width);  
		s.height = (height==null?s.image.height:height);
	}else{
		s.image = new Image();	
		s.width = (width==null?1:width); 
		s.height = (height==null?1:height);
		var o = LGlobal._canvas,c = LGlobal._context;
		o.width = s.width;
		o.height = s.height;
		c.clearRect(0,0,s.width,s.height);
		if(typeof image == "string"){
			c.fillStyle = image;
			c.fillRect(0,0,s.width,s.height);
		}
		s.image.src = o.toDataURL();
	}
}
p = {
	setProperties:function (x,y,width,height){
		var s = this;
		s.x = x;
		s.y = y;
		s.width = width;
		s.height = height;
	},
	setCoordinate:function (x,y){
		var s = this;
		s.x = x;
		s.y = y;
	},
	callParent:function(function_name,args){
		args.callee[SUPER][function_name].call(this);
	}
	,ready:function(){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		o.width = s.width;
		o.height = s.height;
		c.clearRect(0,0,s.width,s.height);
		c.drawImage(s.image,0,0,s.width,s.height);
	}
	,getPixel:function(x,y){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		if(!s._locked)s.ready();
		return c.getImageData(x,y,1,1).data;
	}
	,getPixels:function(rect){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		if(!s._locked)s.ready();
		return c.getImageData(rect.x,rect.y,rect.width,rect.height);
	}
	,lock:function(){
		var s = this;
		s.ready();
		s._locked=true;
	}
	,unlock:function(){
		var s = this;
		if(s._setPixel)s.image.src = LGlobal._canvas.toDataURL();
		s._locked=false;
		s._setPixel=false;
	}
	,setPixel:function(x,y,data){
		var s = this;
		if(!s._locked)s.ready();
		var c = LGlobal._context;
		c.fillStyle = 'rgb('+data[0]+', '+data[1]+', '+data[2]+')';
		c.fillRect(x,y,1,1);
		s._setPixel=true;
	}
	,setPixels:function(rect, img){
		var s = this;
		if(!s._locked)s.ready();
		LGlobal._context.putImageData(img, rect.x, rect.y,0,0,rect.width,rect.height);
		s._setPixel=true;
	}
};
for(var k in p)LBitmapData.prototype[k]=p[k];

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
LDropShadowFilter.prototype = {
	setShadowOffset:function(){
		var s = this;
		var a = s.angle*Math.PI/180;
		s.shadowOffsetX=s.distance*Math.cos(a);
		s.shadowOffsetY=s.distance*Math.sin(a);
	},
	show:function(){
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
/*
* LAnimation.js
**/
function LAnimation(layer,data,list){
	base(this,LSprite,[]);
	var s = this;
	s.rowIndex = 0;
	s.colIndex = 0;
	s.overActionFun = null;
	s.mode = 1;
	s.isMirror = false;
	s.bitmap =  new LBitmap(data);
	s.imageArray = list;
	s.addChild(s.bitmap);
	if(layer != null)layer.addChild(s);
};
LAnimation.prototype.setAction = function (rowIndex,colIndex,mode,isMirror){
	var s = this;
	if(rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length)s.rowIndex = rowIndex;
	if(colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length)s.colIndex = colIndex;
	if(mode != null)s.mode = mode;
	if(isMirror != null){
		s.isMirror = isMirror;
		if(s.isMirror){
			s.bitmap.scaleX = -1*Math.abs(s.bitmap.scaleX);
		}else{
			s.bitmap.scaleX = 1*Math.abs(s.bitmap.scaleX);
		}
	}
};
LAnimation.prototype.getAction = function (){
	var s = this;
	return [s.rowIndex,s.colIndex,s.mode,s.isMirror];
};
LAnimation.prototype.onframe = function (){
	var s = this;
	s.bitmap.bitmapData.setCoordinate(s.imageArray[s.rowIndex][s.colIndex].x,s.imageArray[s.rowIndex][s.colIndex].y);
	s.colIndex += s.mode;
	if(s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0){
		s.colIndex = s.mode>0?0:s.imageArray[s.rowIndex].length - 1;
		if(s.overActionFun != null)s.overActionFun(s);
	}
};
LAnimation.prototype.addEventListener = function (type,listener){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	if(type == LEvent.COMPLETE){
		s.overActionFun = listener;
	}
};
LAnimation.prototype.removeEventListener = function (type,listener){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	if(type == LEvent.COMPLETE){
		s.overActionFun = null;
	}
};
function LoadingSample1(step,b,c){
	base(this,LSprite,[]);
	var s = this;
	s.numberList = new Array(
		[1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
		[0,1,0,1,1,0,0,1,0,0,1,0,0,1,0],
		[1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
		[1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],
		[1,0,1,1,0,1,1,1,1,0,0,1,0,0,1],
		[1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],
		[1,1,1,1,0,0,1,1,1,1,0,1,1,1,1],
		[1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],
		[1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
		[1,1,1,1,0,1,1,1,1,0,0,1,1,1,1]
	);
	s.backgroundColor = b==null?"#000000":b;
	s.color = c==null?"#ffffff":c;
	s.progress = 0;
	s.step = step==null?LGlobal.width*0.5/15:step;
	s.back = new LSprite();
	s.addChild(s.back);
	s.num = new LSprite();
	s.addChild(s.num);
	
	s.num.mask = new LSprite();
	s.screenX = (LGlobal.width - s.step*15)/2;
	s.screenY = (LGlobal.height - s.step*5)/2;
	s.back.x = s.screenX;
	s.back.y = s.screenY;
	s.num.x = s.screenX;
	s.num.y = s.screenY;
	s.setProgress(s.progress);
}
LoadingSample1.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	var num_0="" , num_1 , num_2 , i;
	var s_x = s.step;
	if(value >= 100){
		num_0 = s.getNumber(1);
		num_1 = s.getNumber(0);
		num_2 = s.getNumber(0);
		s_x = s.step*3;
	}else if(value >= 10){
		num_1 = s.getNumber(Math.floor(value/10));
		num_2 = s.getNumber(value%10);
	}else{
		num_1 = s.getNumber(0);
		num_2 = s.getNumber(value);
	}
	s.back.graphics.clear();
	s.back.graphics.add(function(){
		c.beginPath();
		c.fillStyle = s.backgroundColor;
		c.fillRect(0,0,LGlobal.width,LGlobal.height);
		c.beginPath();
		c.fillStyle = s.color;
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				c.fillRect(s.screenX + Math.floor(i%3)*s.step, 
				s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
			}
		}
		for(i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			c.fillRect(s.screenX + s_x + Math.floor(i%3)*s.step, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		for(i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			c.fillRect(s.screenX + s_x + Math.floor(i%3)*s.step + s.step*4, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		c.moveTo(s.screenX + s_x + s.step*9.7,s.screenY);
		c.lineTo(s.screenX + s_x + s.step*10.5,s.screenY);
		c.lineTo(s.screenX + s_x + s.step*9.3,s.screenY + s.step * 5);
		c.lineTo(s.screenX + s_x + s.step*8.5,s.screenY + s.step * 5);
		c.lineTo(s.screenX + s_x + s.step*9.7,s.screenY);
		c.fill();
		c.moveTo(s.screenX + s_x + s.step*8.5,s.screenY + s.step);
		c.arc(s.screenX + s_x + s.step*8.5,s.screenY + s.step
			,s.step*0.6,0,360+Math.PI/180);
		c.moveTo(s.screenX + s_x + s.step*10.5,s.screenY + s.step*4);
		c.arc(s.screenX + s_x + s.step*10.5,s.screenY + s.step*4
			,s.step*0.6,0,360+Math.PI/180);
		c.fill();
		
	});
	s.num.mask.graphics.clear();
	s.num.mask.graphics.add(function(){
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				c.rect(s.screenX + Math.floor(i%3)*s.step, 
				s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
			}
		}
		for(var i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			c.rect(s.screenX + s_x + Math.floor(i%3)*s.step, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		for(var i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			c.rect(s.screenX + s_x + Math.floor(i%3)*s.step + s.step*4, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
	});
    c.fillStyle = LGlobal._create_loading_color();
    s.num.graphics.clear();
    s.num.graphics.drawRect(1,c.fillStyle,[0,s.step*5*(100-value)*0.01,LGlobal.width,LGlobal.height],true,c.fillStyle);
};
LoadingSample1.prototype.getNumber = function (value){
	return this.numberList[value];
};
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
	s.showLabel.mask.add(function(){
		c.rect(s.screenX,0,s.screenWidth*value*0.01,LGlobal.height);
	});
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
	LGlobal.LoadingSample3 = s;
	s.interval = setInterval(s.onframe,LGlobal.speed<50?50:LGlobal.speed);
	s.setProgress(s.progress);
}
LoadingSample3.prototype.onframe = function(){
	var s = LGlobal.LoadingSample3;
	var i,star;
	if(s.progress>=100){
		if(s.star.length > 0){
			for(i=0;i<s.star.length;i++){
				s.removeChild(s.star[i]);
			}
			s.star.splice(0,s.star.length);
		}
		return;
	}
	for(i=0;i<s.star.length;i++){
		star = s.star[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			s.star.splice(i,1);
			s.removeChild(star);
			i--;
		}
	}
	if(s.star.length < 10)s.addStar();
};
LoadingSample3.prototype.die = function (){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	clearInterval(s.interval);
	LGlobal.LoadingSample3=null;
};
LoadingSample3.prototype.addStar = function(){
	var s = this,c = LGlobal.canvas;
	var star = new LSprite();
	var step = 1 + Math.floor(Math.random()*4);
	star.graphics.add(function (coodx,coody){
		c.beginPath();
		c.fillStyle = "#ffffff";
		c.lineTo(coodx + step*2,coody + step);
		c.lineTo(coodx + step*4,coody);
		c.lineTo(coodx + step*3,coody + step*2);
		c.lineTo(coodx + step*4,coody + step*4);
		c.lineTo(coodx + step*2,coody + step*3);
		c.lineTo(coodx,coody + step*4);
		c.lineTo(coodx + step,coody + step*2);
		c.lineTo(coodx,coody);
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
function $LoadManage(){};
$LoadManage.prototype={
	load:function(l,u,c){
		var s = this;
		s.list=l,s.onupdate=u,s.oncomplete=c;
		s.loader=s,s.index=0,s.loadIndex=0,s.result=[];
		s.loadStart();
	},
	loadStart:function(){
		var s = LLoadManage,d;
		if(s.loadIndex >= s.list.length)return;
		d = s.list[s.loadIndex];
		if(d["type"] == "text" || d["type"] == "js"){
			s.loader = new LURLLoader();
			s.loader.name = s.list[s.loadIndex].name;
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path),d["type"]);
		}else if(d["type"] == "sound"){
			s.loader = new LSound();
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path));
		}else{
			s.loader = new LLoader();
			s.loader.name = s.list[s.loadIndex].name;
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path),"bitmapData");
		}
		s.loadIndex++;
		s.loadStart();
	},
	loadComplete:function(e){
		var s = LLoadManage;
		if(e  && e.target && e.target.name)s.result[e.target.name] = e.currentTarget;
		s.index++;
		if(s.onupdate){
			s.onupdate(Math.floor(s.index*100/s.list.length));
		}
		if(s.index >= s.list.length){
			s.loader = null;
			s.oncomplete(s.result);
		}
	},
	url:function(u){
		if(!LGlobal.traceDebug)return u;
		return u+(u.indexOf('?')>=0?'&':'?')+'t='+(new Date()).getTime();
	}
};
var LEasing = {
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
	var s = this,k=null;
	s.target=$target;s.duration=$duration || 0.001;s.vars=$vars;
	s.currentTime = (new Date()).getTime() / 1000;
	s.delay = s.vars.delay || 0;
	s.combinedTimeScale = s.vars.timeScale || 1;
	s.active = s.duration == 0 && s.delay == 0;
	s.varsto={};
	s.varsfrom={};
	if (typeof(s.vars.ease) != "function") {
		s.vars.ease = Quad.easeOut;
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
}
$LTweenLiteChild.prototype = {
	init:function(){
	},
	initTweenVals:function(){
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
		if (etime >= s.duration){
			for(tweentype in s.varsto)s.target[tweentype] = s.varsto[tweentype];
			if(s.onComplete)s.onComplete(s.target);
			return true;
		}else if(s.onUpdate){
			s.onUpdate(s.target);
		}
		return false;
	}
};
function $LTweenLite(){}
$LTweenLite.prototype = {
	tweens:[],
	show:null,
	frame:function(){
		var s = this;
		var i,length=s.tweens.length;
		for(i=0;i < length;i++){
			if(s.tweens[i].tween()){
				s.tweens.splice(i,1);
				i--,length=s.tweens.length;
			}
		}
		if(length == 0)s.show = null;
	},
	to:function($target,$duration,$vars){
		if(!$target)return;
		var s = this;
		var tween = new $LTweenLiteChild($target,$duration,$vars);
		s.tweens.push(tween);
		s.show = s.frame;
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
	        }catch (e) {if(!this.err)this.err(e);}
	    }
	    return false;
	}
};
function LStageWebView(){
	var s = this;
	s.display = document.createElement("div");
	s.iframe = document.createElement("iframe");
	s.display.style.position = "absolute";
	s.display.style.marginTop = "0px";
	s.display.style.marginLeft = "0px";
	s.display.style["z-index"] = 11;
	s.display.style.overflow = "auto";
	s.display.appendChild(s.iframe);
}
LStageWebView.prototype = {
	loadURL:function(u){
		this.iframe.src=u;
	},
	show:function(){
		LGlobal.object.appendChild(this.display);
	},
	die:function(){
		LGlobal.object.removeChild(this.display);
	},
	setViewPort:function(r){
		var s = this;
		s.display.style.marginTop = r.y+"px";
		s.display.style.marginLeft = r.x+"px";
		s.display.style.width = r.width+"px";
		s.display.style.height = r.height+"px";
	}
};
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

