/**
* lufylegend
* @version 1.4.1
* @Explain lufylegend是一个HTML5开源引擎，利用它可以快速方便的进行HTML5的开发
* @author lufy(lufy_legend)
* @blog http://blog.csdn.net/lufy_Legend
* @email lufy.legend@gmail.com
* @homepage http://lufy.netne.net/lufylegend-js.php
* @svn http://lufylegend.googlecode.com/svn/trunk/
*/

var LEGEND_FILE_PHP = './php/file.php',
OS_PC = "pc",
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

var LTweenLite=null,LLoadManage=null;

/*
 * LEvent.js
 **/
var LEvent = function (){this.type="LEvent";};
LEvent.INIT = "init",
LEvent.COMPLETE = "complete",
LEvent.ENTER_FRAME = "enter_frame",
LEvent.END_CONTACT = "endContact",
LEvent.PRE_SOLVE = "preSolve",
LEvent.POST_SOLVE = "postSolve",
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.currentTarget = null;
LEvent.addEventListener = function (node, type, fun,boo){
	if(boo==null)boo=false;
	if(node.addEventListener){
		node.addEventListener(type, fun, false);
	}else if(node.attachEvent){
		node[E + type + fun] = fun;
		node[type + fun] = function(){node[E + type + fun]();};
		node.attachEvent(ON + type, node[type + fun]);
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
	trim:function (str){
		return str.replace(/(^\s*)|(\s*$)|(\n)/g, "");
	},
	leftTrim:function (str){
		return str.replace(/(^\s*)|(^\n)/g, "");
	},
	rightTrim:function (str){
		return str.replace(/(\s*$)|(\n$)/g, "");
	},
	numberFormat:function (source,length){
		if (!length || length < 1) {
	        length = 3;
	    }
	    source=String(source).split(".");
	    source[0]=source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
	    return source.join(".");
	},
	isString:function (s){
		var patrn=/^([a-z]|[A-Z])+$/;
		return patrn.exec(s); 
	},
	isNumber:function (s){
		var patrn=/^\d+\.\d+$/;
		return patrn.exec(s); 
	},
	isInt:function (s){
		var patrn=/^\d+$/;
		return patrn.exec(s); 
	}
};

/*
 * LGlobal.js
 **/
var LGlobal = function (){};
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
LGlobal.setDebug = function (value){
	LGlobal.traceDebug = value; 
};
LGlobal.setCanvas = function (id,width,height){
	LGlobal.canTouch = false;
	LGlobal.os = OS_PC;
	if (navigator.userAgent.indexOf(OS_IPHONE) > 0) {
		LGlobal.os = OS_IPHONE;
		LGlobal.canTouch = true;
	}else if (navigator.userAgent.indexOf(OS_IPOD) > 0) {
		LGlobal.os = OS_IPOD;
		LGlobal.canTouch = true;
	}else if (navigator.userAgent.indexOf(OS_IPAD) > 0) {
		LGlobal.os = OS_IPAD;
		LGlobal.canTouch = true;
	}else if (navigator.userAgent.indexOf(OS_ANDROID) > 0) {
		LGlobal.os = OS_ANDROID;
		LGlobal.canTouch = true;
	}
	LGlobal.id = id;
	LGlobal.window = window;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div style="position:absolute;margin:0px 0px 0px 0px;width:'+width+'px;height:'+height+'px;z-index:0;"><canvas id="' + LGlobal.id + '_canvas">'+
	'<div id="noCanvas">'+
	"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsofthates the Web and doesn't support HTML5 :(</p>"+ 
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
	LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
	LGlobal.inputTextBox = document.getElementById(LGlobal.id + '_InputTextBox');
	LGlobal.inputTextField = null;
	if(width)LGlobal.canvasObj.width = width;
	if(height)LGlobal.canvasObj.height = height;
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
    		var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left);
    		var canvasY = parseInt(STR_ZERO+LGlobal.object.style.top);
    		var scale = 1;
    		var eve;
    		if(LGlobal.stageScale){
	    	    var height;
	    	    var width;
				if(LGlobal.os == OS_ANDROID){
	        	    height = window.screen.height;
	        	    width = window.screen.width;
				}else{
	                var de=document.documentElement;
	                var db=document.body;
	                width=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
	                height=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
				}
	    	   
	    	    if(width > height){
	    	    	scale = 320/width;
	    	    }
    		}
    		eve = {offsetX:(event.touches[0].pageX*scale - canvasX),offsetY:(event.touches[0].pageY*scale - canvasY)};
    		
        	LGlobal.offsetX = eve.offsetX;
        	LGlobal.offsetY = eve.offsetY;
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_DOWN);
        	LGlobal.IS_MOUSE_DOWN = true;
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
        		if(!LGlobal.box2d.mouseJoint){
        			var mouseX = eve.offsetX / LGlobal.box2d.drawScale,
						mouseY = eve.offsetY / LGlobal.box2d.drawScale;
    		        var body = LGlobal.box2d.getBodyAtMouse(mouseX, mouseY);
    		        if(body && body.mouseJoint) {
    		        	var md = new LGlobal.box2d.b2MouseJointDef();
    		        	md.bodyA = LGlobal.box2d.world.GetGroundBody();
    		        	md.bodyB = body;
    		        	md.target.Set(mouseX, mouseY);
    		        	md.collideConnected = true;
    		        	md.maxForce = 300000.0 * body.GetMass();
    		        	LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(md);
    		        	body.SetAwake(true);
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
        	if(LGlobal.box2d != null){
			    if(LGlobal.box2d.mouseJoint) {
			    	LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
			    	LGlobal.box2d.mouseJoint = null;
			    }
		    }
    	});
        LEvent.addEventListener(document,LMouseEvent.TOUCH_MOVE,function(event){
    		var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left);
    		var canvasY = parseInt(STR_ZERO+LGlobal.object.style.top);
    		var scale = 1;
    		var eve;
    		if(LGlobal.stageScale){
	    	    var height;
	    	    var width;
				if(LGlobal.os == OS_ANDROID){
	        	    height = window.screen.height;
	        	    width = window.screen.width;
				}else{
	                var de=document.documentElement;
	                var db=document.body;
	                width=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
	                height=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
				}
	    	    if(width > height){
	    	    	scale = 320/width;
	    	    }
    	    }
    		eve = {offsetX:(event.touches[0].pageX*scale - canvasX),offsetY:(event.touches[0].pageY*scale - canvasY)};
        	LGlobal.mouseMoveEvent = eve;
        	LGlobal.offsetX = eve.offsetX;
        	LGlobal.offsetY = eve.offsetY;
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_MOVE);
        	LGlobal.touchHandler(event);
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
				var mouseX = eve.offsetX / LGlobal.box2d.drawScale,
					mouseY = eve.offsetY / LGlobal.box2d.drawScale;
			    if(LGlobal.box2d.mouseJoint) {
			    	LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mouseX, mouseY));
			    }
		    }
    	});
    }else{
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(event){
        	if(event.offsetX == null && event.layerX != null){
        		event.offsetX = event.layerX;
        		event.offsetY = event.layerY;
        	}
    		if(LGlobal.inputBox.style.display != NONE){
    			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
    			LGlobal.inputBox.style.display = NONE;
    		}    		
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_DOWN);
        	LGlobal.IS_MOUSE_DOWN = true;
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
        		if(!LGlobal.box2d.mouseJoint){
        			var mouseX = event.offsetX / LGlobal.box2d.drawScale,
						mouseY = event.offsetY / LGlobal.box2d.drawScale;
    		        var body = LGlobal.box2d.getBodyAtMouse(mouseX, mouseY);
    		        if(body && body.mouseJoint) {
    		        	var md = new LGlobal.box2d.b2MouseJointDef();
    		        	md.bodyA = LGlobal.box2d.world.GetGroundBody();
    		        	md.bodyB = body;
    		        	md.target.Set(mouseX, mouseY);
    		        	md.collideConnected = true;
    		        	md.maxForce = 300000.0 * body.GetMass();
    		        	LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(md);
    		        	body.SetAwake(true);
    		        };
        		}
        	}
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE,function(event){
        	if(event.offsetX == null && event.layerX != null){
        		event.offsetX = event.layerX;
        		event.offsetY = event.layerY;
        	}
        	LGlobal.mouseMoveEvent = event;
        	LGlobal.offsetX = event.offsetX;
        	LGlobal.offsetY = event.offsetY;
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_MOVE);
        	if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
				var mouseX = event.offsetX / LGlobal.box2d.drawScale,
					mouseY = event.offsetY / LGlobal.box2d.drawScale;
			    if(LGlobal.box2d.mouseJoint) {
			    	LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mouseX, mouseY));
			    }
		    }
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP,function(event){
        	if(event.offsetX == null && event.layerX != null){
        		event.offsetX = event.layerX;
        		event.offsetY = event.layerY;
        	}
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_UP);
        	LGlobal.IS_MOUSE_DOWN = false;
        	if(LGlobal.box2d != null){
			    if(LGlobal.box2d.mouseJoint) {
			    	LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
			    	LGlobal.box2d.mouseJoint = null;
			    }
		    }
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT,function(event){
        	if(event.offsetX == null && event.layerX != null){
        		event.offsetX = event.layerX;
        		event.offsetY = event.layerY;
        	}
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_OUT);
        	LGlobal.IS_MOUSE_DOWN = false;
    	});
    }
} ;
LGlobal.touchHandler = function(event){
	event.stopPropagation();
	if(LGlobal.preventDefault)event.preventDefault();
	if(event.stopImmediatePropagation){
		event.stopImmediatePropagation();
	}
	return event;
};
LGlobal.mouseEvent = function(event,type){
	var key = null;
	for(key in LGlobal.childList){
		if(LGlobal.childList[key].mouseEvent){
			LGlobal.childList[key].mouseEvent(event,type);
		}
	}
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
LGlobal.buttonShow = function(buttonlist){
	var key = null;
	for(key in buttonlist){
		if(buttonlist[key].buttonModeChange){
			buttonlist[key].buttonModeChange();
		}
   }
};
LGlobal.show = function(showlist,cood){
	if(cood == null)cood={x:0,y:0};
	var key = null;
	for(key in showlist){
		if(showlist[key].show){
			showlist[key].show(cood);
		}
	}
};
LGlobal.divideCoordinate = function (w,h,row,col){
	var i,j;
	var cWidth = w/col;
	var cHeight = h/row;
	var resultArray = new Array();
	for(i=0;i<row;i++){
		var childArray=new Array();
		for(j=0;j<col;j++){
			childArray.push({x:cWidth*j,y:cHeight*i});
		}
		resultArray.push(childArray);
	}
	return resultArray;
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

/*
* PageProperty.js
**/
function legendLoadOver(){}
function trace(){
	if(!LGlobal.traceDebug)return;
	var traceObject = document.getElementById("traceObject");
	if(trace.arguments.length > 0 && traceObject == null){
		traceObject = document.createElement("div");
		traceObject.id = "traceObject";
		traceObject.style.position = "absolute";
		traceObject.style.top = (LGlobal.height + 20) + "px";
		document.body.appendChild(traceObject);
	}
	for(var i=0; i < trace.arguments.length; i++){
	   traceObject.innerHTML=traceObject.innerHTML+trace.arguments[i] + "<br />";
	}
}
function addChild(DisplayObject){
	DisplayObject.parent = "root";
	LGlobal.childList.push(DisplayObject);
}
function removeChild(DisplayObject){
	for(var i=0;i<LGlobal.childList.length;i++){
		if(DisplayObject.objectindex == LGlobal.childList[i].objectindex){
			if(DisplayObject.die)DisplayObject.die();
			LGlobal.childList.splice(i,1);
			break;
		}
	}
}
function init(speed,canvasname,width,height,func,type){
	LGlobal.speed = speed;
	if(type != null && type == LEvent.INIT){
		setInterval(function(){LGlobal.onShow();}, speed);
		LGlobal.setCanvas(canvasname,width,height);
		func();
	}else{
		LEvent.addEventListener(window,"load",function(){
			setInterval(function(){LGlobal.onShow();}, speed);
			LGlobal.setCanvas(canvasname,width,height);
			func();
		});
	}
}
function base(derive,baseSprite,baseArgs){
	baseSprite.apply(derive,baseArgs);
	for(prop in baseSprite.prototype){
		var proto = derive.constructor.prototype;
		if(!proto[prop]){
			proto[prop] = baseSprite.prototype[prop];
		}
		proto[prop][SUPER] = baseSprite.prototype;
	}
}

/*
* LLoader.js
**/
function LLoader(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type="LLoader";
	self.loadtype = "";
	self.content = null;
	self.oncomplete = null;
	self.event = {};
}
LLoader.prototype = {
	addEventListener:function(type,listener){
		var self = this;
		if(type == LEvent.COMPLETE){
			self.oncomplete = listener;
		}
	},
	load:function (src,loadtype){
		var self = this;
		self.loadtype = loadtype;
		if(self.loadtype == "bitmapData"){
			self.content = new Image();
			self.content.onload = function(){
				if(self.oncomplete){
					self.event.currentTarget = self.content;
					self.oncomplete(self.event);
				}
			};
			self.content.src = src; 
		}
	}
};


/*
* LURLLoader.js
**/
function LURLLoader(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type="LURLLoader";
	self.loadtype = "";
	self.content = null;
	self.oncomplete = null;
	self.event = {};
}
LURLLoader.prototype = {
	addEventListener:function(type,listener){
		var self = this;
		if(type == LEvent.COMPLETE){
			self.oncomplete = listener;
		}
	},
	load:function (path,loadtype){
		var self = this;
		self.loadtype = loadtype;
		if(self.loadtype == "text"){
			$.post(LEGEND_FILE_PHP, {
				flg:"read",
				file:path
			},function(data){
				if(self.oncomplete){
					self.event.currentTarget = data;
					self.event.target = self;
					self.data = data;
					self.oncomplete(self.event);
				}
			});
		}
	},
	die:function (){
		
	}
};
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
function LRectangle(x,y,width,height){
	var self = this;
	self.x = x;
	self.y = y;
	self.width = width;
	self.height=height;
	self.setRectangle();
}
LRectangle.prototype = {
	setRectangle:function(){
		var self = this;
		self.bottom = self.y + self.height;
		self.right = self.x + self.width;
		self.left = self.x;
		self.top = self.y;
	},
	clone:function(){
		var self = this;
		return new LRectangle(self.x,self.y,self.width,self.height);
	},
	contains:function(x, y){
		var self = this;
		return x>=self.x && x <= self.right && y>= self.y && y <= self.bootom;
	},
	containsRect:function(rect){
		var self = this;
		return rect.x>=self.x && rect.right <= self.right && rect.y>= self.y && rect.bootom <= self.bootom;
	},
	equals:function(toCompare){
		var self = this;
		return toCompare.x==self.x && toCompare.width == self.width && toCompare.y== self.y && toCompare.height == self.height;
	},
	inflate:function(dx,dy){
		var self = this;
		self.width += dx;
		self.height += dy;
		self.setRectangle();
	},
	intersection:function(toIntersect){
		var self = this;
		var self = this;
		var minx = self.x > toIntersect.x ? self.x : toIntersect.x;
		var miny = self.y > toIntersect.y ? self.y : toIntersect.y;
		var maxx = self.right > toIntersect.right ? toIntersect.right : self.right;
		var maxy = self.bottom > toIntersect.bottom ? toIntersect.bottom : self.bottom;
		if(minx <= maxx && miny <= maxy){
			return new LRectangle(minx,miny,maxx,maxy);
		}else{
			return new LRectangle(0,0,0,0);
		}
	},
	intersects:function(toIntersect){
		var self = this;
		var minx = self.x > toIntersect.x ? self.x : toIntersect.x;
		var miny = self.y > toIntersect.y ? self.y : toIntersect.y;
		var maxx = self.right > toIntersect.right ? toIntersect.right : self.right;
		var maxy = self.bottom > toIntersect.bottom ? toIntersect.bottom : self.bottom;
		return minx <= maxx && miny <= maxy;
	},
	isEmpty:function(){
		return this.x==0 && this.y==0 && this.width==0 && this.height==0;
	},
	offset:function(dx,dy){
		var self = this;
		self.x += dx;
		self.y += dy;
		self.setRectangle();
	},
	setEmpty:function(){
		var self = this;
		self.x = 0;
		self.y = 0;
		self.width = 0;
		self.height = 0;
		self.setRectangle();
	},
	setTo:function(xa, ya, widtha, heighta){
		var self = this;
		self.x = xa;
		self.y = ya;
		self.width = widtha;
		self.height = heighta;
		self.setRectangle();
	},
	toString:function(){
		return "{"+this.x+","+this.y+","+this.width+","+this.height+"}";
	},
	union:function(toUnion){
		var self=this;
		return new LRectangle(self.x>toUnion.x?toUnion.x:self.x,self.y>toUnion.y?toUnion.y:self.y,self.right>toUnion.right?self.right:toUnion.right,self.bottom>toUnion.bottom?self.bottom:toUnion.bottom);
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
        var result = self.data.concat();
        if (self.hasChildren()){
            result.push.apply(result,self.q1.getDataInRect(rect));
            result.push.apply(result,self.q2.getDataInRect(rect));
            result.push.apply(result,self.q3.getDataInRect(rect));
            result.push.apply(result,self.q4.getDataInRect(rect));
	    }else{
        }
        
	    return result;
	}
};
/*
* LGraphics.js
**/
function LGraphics(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LGraphics";
	self.color = "#000000";
	self.i = 0;
	self.alpha = 1;
	self.setList = new Array();
	self.showList = new Array();
}
LGraphics.prototype = {
	show:function (cood){
		if(cood==null || cood == UNDEFINED)cood={x:0,y:0};
		var self = this;
		if(self.setList.length == 0)return;
		var key = null;
		for(key in self.setList){
			self.setList[key](cood.x,cood.y);
		}
	},
	lineWidth:function (thickness){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.lineWidth = thickness;});
	},
	strokeStyle:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.strokeStyle = color;});
	},
	stroke:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.stroke();});
	},
	beginPath:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.beginPath();});
	},
	closePath:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.closePath();});
	},
	moveTo:function (x,y){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.moveTo(x,y);});
	},
	lineTo:function (x,y){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.lineTo(x,y);});
	},
	clear:function (){
		var self = this;
		self.setList.splice(0,self.setList.length);
		self.showList.splice(0,self.showList.length);
	},
	rect:function (x,y,width,height){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.rect(x, y, width, height);});
		self.showList.push({type:"rect",value:[x,y,width,height]});
	},
	fillStyle:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.fillStyle = color;});
	},
	fill:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.fill();});
	},
	arc:function(x,y,radius,startAngle,endAngle,anticlockwise){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.arc(x,y,radius,startAngle,endAngle,anticlockwise);});
	},
	drawArc:function(thickness,lineColor,pointArray,isfill,color){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.arc(pointArray[0]+cx,pointArray[1]+cy,pointArray[2],pointArray[3],pointArray[4],pointArray[5]);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"arc",value:pointArray});
	},
	drawRect:function (thickness,lineColor,pointArray,isfill,color){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.rect(pointArray[0]+cx,pointArray[1]+cy,pointArray[2],pointArray[3]);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"rect",value:pointArray});
	},
	drawVertices:function(thickness,lineColor,vertices,isfill,color){
		var self = this;
		if(vertices.length < 3)return;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.moveTo(vertices[0][0]+cx,vertices[0][1]+cy);
			var i,length = vertices.length;
			for(i=1;i<length;i++){
				pointArray = vertices[i];
				LGlobal.canvas.lineTo(pointArray[0]+cx,pointArray[1]+cy);
			};
			LGlobal.canvas.lineTo(vertices[0][0]+cx,vertices[0][1]+cy);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.closePath();
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"vertices",value:vertices});
	},
	drawLine:function (thickness,lineColor,pointArray){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.moveTo(pointArray[0]+cx,pointArray[1]+cy);
			LGlobal.canvas.lineTo(pointArray[2]+cx,pointArray[3]+cy);
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.closePath();
			LGlobal.canvas.stroke();
		});
	},
	lineStyle:function (thickness,color,alpha){
		var self = this; 
		if(color==null)color=self.color;
		if(alpha==null)alpha=self.alpha;
		self.color = color;
		self.alpha = alpha;
		self.setList.push(function(){
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = color;
		});
	},
	add:function (fun){
		var self = this;
		self.setList.push(fun);
	},
	ismouseon:function(event,cood){
		var self = this;
		var key = null;
		if(event==null || event == UNDEFINED)return false;
		if(cood==null || cood == UNDEFINED)cood={x:0,y:0};
		var ox,oy;
		if(event.offsetX == UNDEFINED){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(ox >= self.showList[key].value[0] + cood.x && ox <= self.showList[key].value[0] + cood.x + self.showList[key].value[2] && 
					oy >= self.showList[key].value[1] + cood.y && oy <= self.showList[key].value[1] + cood.y + self.showList[key].value[3]){
					return true;
				}
			}else if(self.showList[key].type == "arc"){
				var xl = self.showList[key].value[0] + cood.x - ox;
				var yl = self.showList[key].value[1] + cood.y - oy;
				return xl*xl+yl*yl <= self.showList[key].value[2]*self.showList[key].value[2];
			}
		}		
		return false;
	},
	getWidth:function(){
		var self = this;
		var key = null,key1=null;
		var min = 0,max = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(min > self.showList[key].value[0])min = self.showList[key].value[0];
				if(max < self.showList[key].value[0] + self.showList[key].value[2])max = self.showList[key].value[0] + self.showList[key].value[2];
			}else if(self.showList[key].type == "arc"){
				if(min > self.showList[key].value[0] - self.showList[key].value[2])min = self.showList[key].value[0] - self.showList[key].value[2];
				if(max < self.showList[key].value[0] + self.showList[key].value[2])max = self.showList[key].value[0] + self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(min > vertices[0])min = vertices[0];
					if(max < vertices[0])max = vertices[0];
				}
			}
		}		
		return max - min;
	},
	getHeight:function(){
		var self = this;
		var key = null,key1=null;
		var min = 0,max = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(min > self.showList[key].value[1])min = self.showList[key].value[1];
				if(max < self.showList[key].value[1] + self.showList[key].value[3])max = self.showList[key].value[1] + self.showList[key].value[3];
			}else if(self.showList[key].type == "arc"){
				if(min > self.showList[key].value[1] - self.showList[key].value[2])min = self.showList[key].value[1] - self.showList[key].value[2];
				if(max < self.showList[key].value[1] + self.showList[key].value[2])max = self.showList[key].value[1] + self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(min > vertices[1])min = vertices[1];
					if(max < vertices[1])max = vertices[1];
				}
			}
		}		
		return max - min;
	},
	startX:function(){
		var self=this;
		var key = null,key1=null;
		var v = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(v > self.showList[key].value[0])v = self.showList[key].value[0];
			}else if(self.showList[key].type == "arc"){
				if(v > self.showList[key].value[0] - self.showList[key].value[2])v = self.showList[key].value[0] - self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(v > vertices[0])v = vertices[0];
				}
			}
		}		
		return v;
	},
	startY:function(){
		var self=this;
		var key = null,key1=null;
		var v = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(v > self.showList[key].value[1])v = self.showList[key].value[1];
			}else if(self.showList[key].type == "arc"){
				if(v > self.showList[key].value[1] - self.showList[key].value[2])v = self.showList[key].value[1] - self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(v > vertices[1])v = vertices[1];
				}
			}
		}		
		return v;
	}
};

function LBox2d(){
	var self = this;
	self.IBroadPhase                   =  Box2D.Collision.IBroadPhase,
	self.b2AABB                        =  Box2D.Collision.b2AABB,
	self.b2ContactID                   =  Box2D.Collision.b2ContactID,
	self.b2ContactPoint                =  Box2D.Collision.b2ContactPoint,
	self.b2DistanceInput               =  Box2D.Collision.b2DistanceInput,
	self.b2DistanceOutput              =  Box2D.Collision.b2DistanceOutput,
	self.b2DistanceProxy               =  Box2D.Collision.b2DistanceProxy,
	self.b2DynamicTree                 =  Box2D.Collision.b2DynamicTree,
	self.b2DynamicTreeBroadPhase       =  Box2D.Collision.b2DynamicTreeBroadPhase,
	self.b2Manifold                    =  Box2D.Collision.b2Manifold,
	self.b2ManifoldPoint               =  Box2D.Collision.b2ManifoldPoint,
	self.b2OBB                         =  Box2D.Collision.b2OBB,
	self.b2RayCastInput                =  Box2D.Collision.b2RayCastInput,
	self.b2RayCastOutput               =  Box2D.Collision.b2RayCastOutput,
	self.b2Segment                     =  Box2D.Collision.b2Segment,
	self.b2SimplexCache                =  Box2D.Collision.b2SimplexCache,
	self.b2TOIInput                    =  Box2D.Collision.b2TOIInput,
	self.b2WorldManifold               =  Box2D.Collision.b2WorldManifold,
	self.Features                      =  Box2D.Collision.Features,
	self.b2CircleShape                 =  Box2D.Collision.Shapes.b2CircleShape,
	self.b2EdgeChainDef                =  Box2D.Collision.Shapes.b2EdgeChainDef,
	self.b2MassData                    =  Box2D.Collision.Shapes.b2MassData,
	self.b2PolygonShape                =  Box2D.Collision.Shapes.b2PolygonShape,
	self.b2Shape                       =  Box2D.Collision.Shapes.b2Shape,
	self.b2Color                       =  Box2D.Common.b2Color,
	self.b2Settings                    =  Box2D.Common.b2Settings,
	self.b2Mat22                       =  Box2D.Common.Math.b2Mat22,
	self.b2Mat33                       =  Box2D.Common.Math.b2Mat33,
	self.b2Sweep                       =  Box2D.Common.Math.b2Sweep,
	self.b2Transform                   =  Box2D.Common.Math.b2Transform,
	self.b2Vec2                        =  Box2D.Common.Math.b2Vec2,
	self.b2Vec3                        =  Box2D.Common.Math.b2Vec3,
	self.b2Body                        =  Box2D.Dynamics.b2Body,
	self.b2BodyDef                     =  Box2D.Dynamics.b2BodyDef,
	self.b2ContactFilter               =  Box2D.Dynamics.b2ContactFilter,
	self.b2ContactImpulse              =  Box2D.Dynamics.b2ContactImpulse,
	self.b2ContactListener             =  Box2D.Dynamics.b2ContactListener,
	self.b2DebugDraw                   =  Box2D.Dynamics.b2DebugDraw,
	self.b2DestructionListener         =  Box2D.Dynamics.b2DestructionListener,
	self.b2FilterData                  =  Box2D.Dynamics.b2FilterData,
	self.b2Fixture                     =  Box2D.Dynamics.b2Fixture,
	self.b2FixtureDef                  =  Box2D.Dynamics.b2FixtureDef,
	self.b2World                       =  Box2D.Dynamics.b2World,
	self.b2Contact                     =  Box2D.Dynamics.Contacts.b2Contact, 
	self.b2ContactEdge                 =  Box2D.Dynamics.Contacts.b2ContactEdge, 
	self.b2ContactResult               =  Box2D.Dynamics.Contacts.b2ContactResult, 
	self.b2BuoyancyController          =  Box2D.Dynamics.Controllers.b2BuoyancyController,
	self.b2ConstantAccelController     =  Box2D.Dynamics.Controllers.b2ConstantAccelController,
	self.b2ConstantForceController     =  Box2D.Dynamics.Controllers.b2ConstantForceController,
	self.b2Controller                  =  Box2D.Dynamics.Controllers.b2Controller,
	self.b2ControllerEdge              =  Box2D.Dynamics.Controllers.b2ControllerEdge,
	self.b2GravityController           =  Box2D.Dynamics.Controllers.b2GravityController,
	self.b2TensorDampingController     =  Box2D.Dynamics.Controllers.b2TensorDampingController,
	self.b2DistanceJoint               =  Box2D.Dynamics.Joints.b2DistanceJoint,
	self.b2DistanceJointDef            =  Box2D.Dynamics.Joints.b2DistanceJointDef,
	self.b2FrictionJoint               =  Box2D.Dynamics.Joints.b2FrictionJoint,
	self.b2FrictionJointDef            =  Box2D.Dynamics.Joints.b2FrictionJointDef,
	self.b2GearJoint                   =  Box2D.Dynamics.Joints.b2GearJoint,
	self.b2GearJointDef                =  Box2D.Dynamics.Joints.b2GearJointDef,
	self.b2Joint                       =  Box2D.Dynamics.Joints.b2Joint,
	self.b2JointDef                    =  Box2D.Dynamics.Joints.b2JointDef,
	self.b2JointEdge                   =  Box2D.Dynamics.Joints.b2JointEdge,
	self.b2LineJoint                   =  Box2D.Dynamics.Joints.b2LineJoint,
	self.b2LineJointDef                =  Box2D.Dynamics.Joints.b2LineJointDef,
	self.b2MouseJoint                  =  Box2D.Dynamics.Joints.b2MouseJoint,
	self.b2MouseJointDef               =  Box2D.Dynamics.Joints.b2MouseJointDef,
	self.b2PrismaticJoint              =  Box2D.Dynamics.Joints.b2PrismaticJoint,
	self.b2PrismaticJointDef           =  Box2D.Dynamics.Joints.b2PrismaticJointDef,
	self.b2PulleyJoint                 =  Box2D.Dynamics.Joints.b2PulleyJoint,
	self.b2PulleyJointDef              =  Box2D.Dynamics.Joints.b2PulleyJointDef,
	self.b2RevoluteJoint               =  Box2D.Dynamics.Joints.b2RevoluteJoint,
	self.b2RevoluteJointDef            =  Box2D.Dynamics.Joints.b2RevoluteJointDef,
	self.b2WeldJoint                   =  Box2D.Dynamics.Joints.b2WeldJoint,
	self.b2WeldJointDef                =  Box2D.Dynamics.Joints.b2WeldJointDef;

	self.drawScale = 30;
	self.selectedBody = null;
	self.mouseJoint = null;
	self.mousePVec = null;
	self.contactListener = null;
	self.world = new self.b2World(new self.b2Vec2(0, 9.8),true);
	
	if(LGlobal.traceDebug){
		var debug = new self.b2DebugDraw();
		debug.SetSprite(LGlobal.canvas);
		debug.SetLineThickness(1);
		debug.SetFillAlpha(0.5);
		debug.SetAlpha(1);
		debug.SetDrawScale(self.drawScale);
		debug.SetFlags(self.b2DebugDraw.e_shapeBit | self.b2DebugDraw.e_jointBit);
		self.world.SetDebugDraw(debug);
	}
}
LBox2d.prototype = {
	setEvent:function(type_value,fun_value){
		var self = this;
		if(!self.contactListener){
			self.contactListener = new self.b2ContactListener();
			self.world.SetContactListener(self.contactListener);
		}
		switch(type_value){
			case LEvent.END_CONTACT:
				self.contactListener.EndContact = fun_value;
				break;
			case LEvent.PRE_SOLVE:
				self.contactListener.PreSolve = fun_value;
				break;
			case LEvent.POST_SOLVE:
				self.contactListener.PostSolve = fun_value;
				break;
			case LEvent.BEGIN_CONTACT:
			default:
				self.contactListener.BeginContact = fun_value;
		}
	},
	setWeldJoint:function(bodyA,bodyB){ 
		var self = this; 
	    var weldJointDef = new self.b2WeldJointDef();
	    weldJointDef.Initialize(bodyB, bodyA, bodyB.GetWorldCenter());
	 
	    return self.world.CreateJoint(weldJointDef);
	},
    setLineJoint:function(bodyA,bodyB,vec,translation,motor){
		var self = this; 
	    var worldAxis = new self.b2Vec2(vec[0],vec[1]);
	    var lineJointDef = new self.b2LineJointDef();
	    lineJointDef.Initialize(bodyA, bodyB, bodyB.GetWorldCenter(), worldAxis);
	    if(translation == null){
	    	lineJointDef.enableLimit = false;
	    }else{
	    	lineJointDef.lowerTranslation = translation[0];
		    lineJointDef.upperTranslation = translation[1];
		    lineJointDef.enableLimit = true;
	    }
	    if(motor == null){
	    	lineJointDef.enableMotor = false;
	    }else{
	    	lineJointDef.maxMotorForce = motor[0];
		    lineJointDef.motorSpeed = motor[1];
		    lineJointDef.enableMotor = true;
		}
	     
	    return self.world.CreateJoint(lineJointDef);
	},
	setGearJoint:function(bodyA,bodyB,ratio,revoluteJoint,prismaticJoint){ 
		var self = this; 
	    var gearJointDef = new self.b2GearJointDef();
	    gearJointDef.joint1 = revoluteJoint;
	    gearJointDef.joint2 = prismaticJoint;
	    gearJointDef.bodyA = bodyA;
	    gearJointDef.bodyB = bodyB;
	    gearJointDef.ratio = ratio * self.b2Settings.b2_pi / (300 / self.drawScale);
	     
	    return self.world.CreateJoint(gearJointDef);
	},
	setPrismaticJoint:function(bodyA,bodyB,vec,translation,motor){
		var self = this;
	    var worldAxis = new self.b2Vec2(vec[0],vec[1]);
	    var prismaticJointDef = new self.b2PrismaticJointDef();
	    prismaticJointDef.Initialize(bodyB, bodyA, bodyB.GetWorldCenter(), worldAxis);
	    if(translation == null){
	    	prismaticJointDef.enableLimit = false;
	    }else{
		    prismaticJointDef.lowerTranslation = translation[0];
		    prismaticJointDef.upperTranslation = translation[1];
		    prismaticJointDef.enableLimit = true;
	    }
	    if(motor == null){
	    	prismaticJointDef.enableMotor = false;
	    }else{
		    prismaticJointDef.maxMotorForce = motor[0];
		    prismaticJointDef.motorSpeed = motor[1];
		    prismaticJointDef.enableMotor = true;
		}
	    return self.world.CreateJoint(prismaticJointDef);
	},
	setRevoluteJoint:function(bodyA,bodyB,angle,motor){
		var self = this;
		var revoluteJointDef  = new self.b2RevoluteJointDef();
		revoluteJointDef .Initialize(bodyA, bodyB, bodyB.GetWorldCenter());
		if(angle == null){
			revoluteJointDef.enableLimit = false;
		}else{
		    revoluteJointDef.lowerAngle = angle[0] * self.b2Settings.b2_pi;
		    revoluteJointDef.upperAngle = angle[1] * self.b2Settings.b2_pi;
		    revoluteJointDef.enableLimit = true;
		}
	    if(motor == null){
	    	revoluteJointDef.enableMotor = false;
	    }else{
	    	revoluteJointDef.maxMotorForce = motor[0];
	    	revoluteJointDef.motorSpeed = motor[1];
	    	revoluteJointDef.enableMotor = true;
		}
		return self.world.CreateJoint(revoluteJointDef ); 
	},
	setDistanceJoint:function(bodyA,bodyB){
		var self = this;
		var distanceJointDef = new self.b2DistanceJointDef();
		distanceJointDef.Initialize(bodyA, bodyB, bodyA.GetWorldCenter(), bodyB.GetWorldCenter());
		return self.world.CreateJoint(distanceJointDef); 
	},
	setPulleyJoint:function(bodyA,bodyB,verticesA,verticesB,ratio){
		var self = this;
		var anchor1 = bodyA.GetWorldCenter();  
	    var anchor2 = bodyB.GetWorldCenter();
	    var groundAnchor1 = new self.b2Vec2(anchor1.x + (verticesA[0] / self.drawScale), anchor1.y + (verticesA[1] / self.drawScale));
	    var groundAnchor2 = new self.b2Vec2(anchor2.x + (verticesB[0] / self.drawScale), anchor2.y + (verticesB[1] / self.drawScale));
	    var pulleyJointDef = new self.b2PulleyJointDef();  
	    pulleyJointDef.Initialize(bodyA, bodyB, groundAnchor1, groundAnchor2, anchor1, anchor2,ratio);  
	    pulleyJointDef.maxLengthA = verticesA[2] / self.drawScale;
	    pulleyJointDef.maxLengthB = verticesB[2] / self.drawScale;
	    return self.world.CreateJoint(pulleyJointDef);
	},
	addCircle:function(radius,cx,cy,type,density,friction,restitution){
		var self = this;
		self.bodyDef = new self.b2BodyDef;
		/*动态*/
		self.bodyDef.type = type;
		self.fixDef = new self.b2FixtureDef;
		if(type == self.b2Body.b2_dynamicBody){
			/*密度*/
			self.fixDef.density = density;
			/*摩擦*/
			self.fixDef.friction = friction;
			/*弹力*/
			self.fixDef.restitution = restitution;
		}
		/*加入球*/
		self.fixDef.shape = new self.b2CircleShape( radius );
		/*坐标*/
		self.bodyDef.position.x = cx;
		self.bodyDef.position.y = cy;
		var shape = self.world.CreateBody(self.bodyDef);
		shape.CreateFixture(self.fixDef);
		return shape;
	},
	addPolygon:function(w,h,cx,cy,type,density,friction,restitution){
		var self = this;
		self.bodyDef = new self.b2BodyDef;
		/*动态*/
		self.bodyDef.type = type;
		self.fixDef = new self.b2FixtureDef;
		if(type == self.b2Body.b2_dynamicBody){
			/*密度*/
			self.fixDef.density = density;
			/*摩擦*/
			self.fixDef.friction = friction;
			/*弹力*/
			self.fixDef.restitution = restitution;
		}
		/*加入球*/
		self.fixDef.shape = new self.b2PolygonShape;
		self.fixDef.shape.SetAsBox(w,h);
		self.bodyDef.position.x = cx;
		self.bodyDef.position.y = cy;
		var shape = self.world.CreateBody(self.bodyDef);
		shape.CreateFixture(self.fixDef);
		return shape;
	},
	addVertices:function(vertices,type,density,friction,restitution){
		var self = this;
		self.bodyDef = new self.b2BodyDef;
		/*动态*/
		self.bodyDef.type = type;
		var shape = self.world.CreateBody(self.bodyDef);
        for(var i = 0; i<vertices.length; i++)
        {
			self.createShapeAsArray(shape,vertices[i],type,density,friction,restitution);
        }
		return shape;
	},
	createShapeAsArray:function(container,vertices,type,density,friction,restitution){
		var self = this;
        var shape = new self.b2PolygonShape();
        var shapeVertices = self.createVerticesArray(vertices);
        shape.SetAsArray(shapeVertices,0);
        var shapeFixtureDef = new self.b2FixtureDef();
        shapeFixtureDef.shape = shape;
		if(type == self.b2Body.b2_dynamicBody){
			/*密度*/
			shapeFixtureDef.density = density;
			/*摩擦*/
			shapeFixtureDef.friction = friction;
			/*弹力*/
			shapeFixtureDef.restitution = restitution;
        }
        container.CreateFixture(shapeFixtureDef);
	},
	createVerticesArray:function(arr){
		var self = this;
        var vertices = new Array();
        if(arr.length < 3)return vertices;
        for (var i = 0; i<arr.length ; i++)
        {
            var vertice = new self.b2Vec2(arr[i][0]/self.drawScale, arr[i][1]/self.drawScale);
            vertices.push(vertice);
        }
        return vertices;
    }, 
	getBodyAtMouse:function (mouseX, mouseY) { 
 		var self = this;
		self.mousePVec = new self.b2Vec2(mouseX, mouseY);
		var aabb = new self.b2AABB();
		aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
		aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
		self.selectedBody = null;
		self.world.QueryAABB(self.getBodyCallBack, aabb);
		return self.selectedBody;
	},
	getBodyCallBack:function (fixture) {
		var self = LGlobal.box2d;
	    if(fixture.GetBody().GetType() != self.b2Body.b2_staticBody) {
	    	if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), self.mousePVec)) {
	    		self.selectedBody = fixture.GetBody();
	        	return false;
	    	}
	    }
	    return true;
	},
	show:function(){
		var self = this;
		self.world.Step(1 / 30,10,10);
		self.world.ClearForces();
		if(LGlobal.traceDebug){
			self.world.DrawDebugData();
		}
	}
};

/*
* LSprite.js
**/
function LSprite(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LSprite";
	self.x = 0;
	self.y = 0;
	self.rotatex;
	self.rotatey;
	self.rotate = 0;
	self.alpha = 1;
	self.visible=true;
	self.childList = new Array();
	self.frameList = new Array();
	self.mouseList = new Array();
	self.graphics = new LGraphics();
	self.graphics.parent = self;
	self.width = 0;
	self.height = 0;
	self.scaleX=1;
	self.scaleY=1;
	self.box2d = null;
	self.mask = null;
}
LSprite.prototype = {
	setRotate:function (angle){
		var self = this;
		if(self.box2dBody){
			self.box2dBody.SetAngle(angle);
		}else{
			self.rotate = angle;
		}
	},
	show:function (cood){
		if(cood==null)cood={x:0,y:0};
		var self = this,saveflg = false,rotateFlag = Math.PI / 180;
		if(!self.visible)return;
		if((self.mask != null && self.mask.show) || self.alpha < 1 || self.rotate != 0 || self.scaleX != 1 || self.scaleY != 1 || self.box2dBody){
			LGlobal.canvas.save();
			saveflg = true;
		}
		
		if(self.box2dBody){
			self.x = self.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - cood.x - self.rotatex;
			self.y = self.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - cood.y - self.rotatey;
			self.rotate = self.box2dBody.GetAngle();
			rotateFlag = 1;
		}
		if(self.mask != null && self.mask.show){
			self.mask.show();
			LGlobal.canvas.clip();
		}
		if(self.alpha < 1){
			LGlobal.canvas.globalAlpha = self.alpha;
		}
		if(self.rotate != 0){
			if(typeof(self.rotatex) == "undefined"){
				self.getRotateXY();
			}
			LGlobal.canvas.translate(cood.x + self.x + self.rotatex, cood.y + self.y + self.rotatey);
			LGlobal.canvas.rotate(self.rotate * rotateFlag);
			LGlobal.canvas.translate(-(cood.x + self.x + self.rotatex), -(cood.y + self.y + self.rotatey));
		}
		if(self.scaleX != 1 || self.scaleY != 1){
			LGlobal.canvas.scale(self.scaleX,self.scaleY);
		}
		self.graphics.show({x:self.x+cood.x,y:self.y+cood.y});
		LGlobal.show(self.childList,{x:self.x+cood.x,y:self.y+cood.y,scaleX:self.scaleX});
		
		if(saveflg){
			LGlobal.canvas.restore(); 
		}
		self.loopframe();
	},
	getRotateXY:function(w,h){
		var self = this;
		if(w!=null && h!=null){
			self.rotatex = w/2;
			self.rotatey = h/2;
			return;
		}
		w=0;
		h=0;
		var key=null,w1,h1;
		for(key in self.childList){
			if(self.childList[key].getWidth){
				w1=self.childList[key].getWidth();
				w = w < w1?w1:w;
			}
			if(self.childList[key].getHeight){
				h1=self.childList[key].getHeight();
				h = h < h1?h1:h;
			}
		}
		self.rotatex = w/2;
		self.rotatey = h/2;
	},
	getWidth:function(){
		var self=this;
		var v=self.graphics.getWidth(),v1=0,key=null;
		for(key in self.childList){
			if(self.childList[key].getWidth){
				v1=self.childList[key].getWidth();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	getHeight:function(){
		var self=this;
		var v=self.graphics.getHeight(),v1=0,key=null;
		for(key in self.childList){
			if(self.childList[key].getHeight){
				v1=self.childList[key].getHeight();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	startX:function(){
		var self=this;
		var v=self.x + self.graphics.startX(),v1;
		for(key in self.childList){
			if(self.childList[key].startX){
				v1=self.x + self.childList[key].startX();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	startY:function(){
		var self=this;
		var v=self.y + self.graphics.startY(),v1;
		for(key in self.childList){
			if(self.childList[key].startY){
				v1=self.y + self.childList[key].startY();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	setBodyMouseJoint:function(value){
		var self = this;
		if(!self.box2dBody)return;
		self.box2dBody.mouseJoint = true;
	},
	clearBody:function(){
		var self = this;
		if(!self.box2dBody)return;
		LGlobal.box2d.world.DestroyBody(self.box2dBody);
		self.box2dBody = null;
	},
	addBodyCircle:function(radius,cx,cy,type,density,friction,restitution){
		var self = this;
		self.rotatex = radius;
		self.rotatey = radius;
		self.box2dBody = LGlobal.box2d.addCircle(
			radius/LGlobal.box2d.drawScale,
			(self.x+cx)/LGlobal.box2d.drawScale,
			(self.y+cy)/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		self.box2dBody.SetUserData(self);
	},
	addBodyPolygon:function(w,h,type,density,friction,restitution){
		var self = this;
		self.rotatex = w/2;
		self.rotatey = h/2;
		self.box2dBody = LGlobal.box2d.addPolygon(
			w*0.5/LGlobal.box2d.drawScale,
			h*0.5/LGlobal.box2d.drawScale,
			self.x/LGlobal.box2d.drawScale,
			self.y/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		self.box2dBody.SetUserData(self);
	},
	addBodyVertices:function(vertices,cx,cy,type,density,friction,restitution){
		var self = this;
		self.rotatex = 0;
		self.rotatey = 0;
		self.box2dBody = LGlobal.box2d.addVertices(vertices,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
				density,friction,restitution);
		self.box2dBody.SetUserData(self);
		self.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((self.x+cx)/LGlobal.box2d.drawScale,(self.y+cy)/LGlobal.box2d.drawScale));
	},
	loopframe:function (){
		var self = this;
		var key = null;
		for(key in self.frameList){
			self.frameList[key]();
		}
	},
	addChild:function (DisplayObject){
		var self  = this;
		DisplayObject.parent = self;
		self.childList.push(DisplayObject);
		self.resize();
	},
	removeChild:function(DisplayObject){
		var self  = this;
		for(var i=0;i<self.childList.length;i++){
			if(DisplayObject.objectindex == self.childList[i].objectindex){
				if(DisplayObject.die)DisplayObject.die();
				self.childList.splice(i,1);
				break;
			}
		}
		self.resize();
	},
	getChildAt:function(i){
		var self  = this;
		if(self.childList.length == 0 || self.childList.length <= i)return null;
		return self.childList[i];
	},
	removeChildAt:function(i){
		var self  = this;
		if(self.childList.length >= i)return;
		self.childList[i].die();
		self.childList.splice(i,1);
		self.resize();
	},
	resize:function(){
		var self  = this;
		var sx = 0,sy = 0,ex = 0,ey = 0;
		for(var i=0;i<self.childList.length;i++){
			if(sx > self.childList[i].x){
				sx = self.childList[i].x;
			}
			if(ex < self.childList[i].width + self.childList[i].x){
				ex = self.childList[i].width + self.childList[i].x;
			}
			if(sy > self.childList[i].y){
				sy = self.childList[i].y;
			}
			if(ey < self.childList[i].height + self.childList[i].y){
				ey = self.childList[i].height + self.childList[i].y;
			}
		}
		self.width = ex - sx;
		self.height = ey - sy;
	},
	removeAllChild:function(){
		var self  = this;
		for(var i=0;i<self.childList.length;i++){
			if(self.childList[i].die)self.childList[i].die();
		}
		self.childList.splice(0,self.childList.length);
		self.width = 0;
		self.height = 0;
	},
	addEventListener:function (type,listener){
		var self = this;
		if(type == LEvent.ENTER_FRAME){
			self.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0){
			self.mouseList.push({listener:listener,type:type});
		}else if(type.indexOf("touch")>=0){
			self.mouseList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function (type,listener){
		var self = this;
		var i,length = self.frameList.length;
		for(i=0;i<length;i++){
			if(type == LEvent.ENTER_FRAME && self.frameList[i] == listener){
				self.frameList.splice(i,1);
				break;
			}
		}
		length = self.mouseList.length;
		for(i=0;i<length;i++){
			if(type == self.mouseList[i].type && self.mouseList[i].listener == listener){
				self.mouseList.splice(i,1);
				break;
			}
		}
	},
	mouseEvent:function (event,type,cood){
		if(event==null || event == UNDEFINED)return false;
		if(cood==null)cood={x:0,y:0};
		var self = this;
		var isok;
		var ox,oy;
		if(event.offsetX == UNDEFINED){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		for(key in self.childList){
			if(self.childList[key].mouseEvent){
				isok = self.childList[key].mouseEvent(event,type,{x:self.x+cood.x,y:self.y+cood.y});
				if(isok)return true;
			}
		}
		if(self.mouseList.length == 0){
			return false;
		}
		var key = null;
		var isclick = self.ismouseon(event, cood);
		if(isclick){
			for(key in self.mouseList){
				var obj = self.mouseList[key];
				if(obj.type == type){
					event.selfX = ox - (self.x+cood.x);
					event.selfY = oy - (self.y+cood.y);
					event.clickTarget = self;
					obj.listener(event,self);
					return true;
				}
			}
			return false;
		}else{
			return false;
		}
	},
	ismouseon:function(event,cood){
		var self = this;
		if(!self.visible || event==null )return false;
		var key = null;
		var isclick = false;
		for(key in self.childList){
			if(self.childList[key].ismouseon)isclick = self.childList[key].ismouseon(event,{x:self.x+cood.x,y:self.y+cood.y});
			if(isclick)break;
		}
		if(!isclick && self.graphics){
			isclick = self.graphics.ismouseon(event,{x:self.x+cood.x,y:self.y+cood.y});
		}
		return isclick;
	},
	die:function (){
		var self = this;
		self.graphics.clear();
		self.frameList.splice(0,self.frameList.length);
		self.mouseList.splice(0,self.mouseList.length);
		var key = null;
		for(key in self.childList){
			if(self.childList[key].die)self.childList[key].die();
		}
	}
};


/*
* LButton.js
**/
function LButton(DisplayObject_up,DisplayObject_over){
	base(this,LSprite,[]);
	var self = this;
	self.type = "LButton";
	self.bitmap_up = DisplayObject_up;
	self.addChild(DisplayObject_up);
	if(DisplayObject_over == null){
		DisplayObject_over = DisplayObject_up;
	}else{
		self.addChild(DisplayObject_over);
	}
	self.bitmap_over = DisplayObject_over;
	self.bitmap_over.visible = false;
	self.bitmap_up.visible = true;
	LGlobal.buttonList.push(self);
}
LButton.prototype.buttonModeChange = function (){
	var self = this;
	var cood={x:0,y:0};
	var parent = self.parent;
	while(parent != "root"){
		cood.x += parent.x;
		cood.y += parent.y;
		parent = parent.parent;
	}
	if(self.ismouseon(LGlobal.mouseMoveEvent,cood)){
		self.bitmap_up.visible = false;
		self.bitmap_over.visible = true;
	}else{
		self.bitmap_over.visible = false;
		self.bitmap_up.visible = true;
	}
};
LButton.prototype.die = function (){
	var self = this;
	arguments.callee[SUPER].die.call(this);
	for(var i=0;i<LGlobal.buttonList.length;i++){
		if(LGlobal.buttonList[i].objectindex == self.objectindex){
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
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LTextField";
	self.texttype = null;
	self.x = 0;
	self.y = 0;
	self.text = "";
	self.font = "utf-8";
	self.size = "11";
	self.color = "#000000";
	self.weight = "normal";
	self.textAlign = "left";
	self.textBaseline = "top";
	self.lineWidth = 1;
	self.width = 150;
	self.height = 20;
	self.stroke = false;
	self.visible=true;
}
LTextField.prototype = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(!self.visible)return;
		
		if(self.mask != null && self.mask.show){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.save();  
			self.mask.show();
			LGlobal.canvas.clip();
		}
		if(self.texttype == LTextFieldType.INPUT){
			self.inputBackLayer.show({x:self.x+cood.x,y:self.y+cood.y});
	    	if(LGlobal.inputBox.name == "input"+self.objectindex){
	    		LGlobal.inputBox.style.marginTop = (self.y+cood.y) + "px";
	    		LGlobal.inputBox.style.marginLeft = (self.x+cood.x) + "px";
	    	}
		}
	    LGlobal.canvas.font = self.weight + " " + self.size+"pt "+self.font;  
	    LGlobal.canvas.textAlign = self.textAlign;
	    LGlobal.canvas.textBaseline = self.textBaseline;
	    LGlobal.canvas.lineWidth = self.lineWidth;  

	    if(self.stroke){
		    LGlobal.canvas.strokeStyle = self.color;
	    	LGlobal.canvas.strokeText(self.text,parseFloat(cood.x) + parseFloat(self.x),
	    		parseFloat(cood.y) + parseFloat(self.y),
	    		LGlobal.canvas.measureText(self.text).width);  
	    }else{
		    LGlobal.canvas.fillStyle = self.color;
	    	LGlobal.canvas.fillText(self.text,parseFloat(cood.x) + parseFloat(self.x),
		    		parseFloat(cood.y) + parseFloat(self.y),
		    		LGlobal.canvas.measureText(self.text).width);
	    }
	    if(self.wind_flag){
	    	self.windRun();
	    }
		if(self.mask != null && self.mask.show){
			LGlobal.canvas.restore();
		}
	},
	setType:function(type){
		var self = this;
		if(self.texttype != type && type == LTextFieldType.INPUT){
			self.inputBackLayer = new LSprite();
			self.inputBackLayer.graphics.drawRect(1,"black",[0, 0, self.width, self.height],true,"#cccccc");
			self.inputBackLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
				if(self.texttype != LTextFieldType.INPUT)return;
				LGlobal.inputBox.style.display = "";
				LGlobal.inputBox.name = "input"+self.objectindex;
	    		LGlobal.inputTextField = self;
	    		LGlobal.inputTextBox.value = self.text;
	    		LGlobal.inputTextBox.style.height = self.height+"px";
	    		LGlobal.inputTextBox.style.width = self.width+"px";
			});
		}else{
			self.inputBackLayer = null;
		}
		self.texttype = type;
	},
	mouseEvent:function (event,type,cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(self.inputBackLayer == null)return;
		self.inputBackLayer.mouseEvent(event,type,{x:self.x+cood.x,y:self.y+cood.y});
	},
	getWidth:function(){
		var self = this;
	    LGlobal.canvas.font = self.size+"pt "+self.font;
		return LGlobal.canvas.measureText(self.text).width;
	},
	wind:function(listener){
		var self = this;
		self.wind_over_function = listener;
		self.wind_flag = true;
		self.wind_text = self.text;
		self.text = "";
		self.wind_length = 0;
	},
	windRun:function(){
		var self = this;
		if(self.wind_length > self.wind_text.length){
			self.wind_flag = false;
			if(self.wind_over_function)self.wind_over_function();
			return;
		}
		self.text = self.wind_text.substring(0,self.wind_length);
		self.wind_length++;
	}
};


/*
* LLabel.js
**/
function LLabel(){
	var self = this;
	base(self,LTextField,[]);
	self.width = LGlobal.width;
}

/*
* LBitmap.js
**/
function LBitmap(bitmapdata){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LBitmap";
	self.x = 0;  
	self.y = 0;  
	self.width = 0;  
	self.height = 0;  
	self.scaleX=1;
	self.scaleY=1;
	self.alpha = 1;
	self.visible=true;
	self.rotate = 0;
	self.bitmapData = bitmapdata; 
	if(self.bitmapData){
		self.width = self.bitmapData.width;
		self.height = self.bitmapData.height;
	}
}
LBitmap.prototype = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(!self.visible || !self.bitmapData)return;
		self.save = false;
		
		if(self.alpha < 1 || self.rotate != 0 || self.scaleX == -1 || self.scaleY == -1){
			LGlobal.canvas.save();  
			self.save = true;
		}
		if(self.rotate != 0){
			var rx,ry ;
			rx = cood.x + self.x+self.bitmapData.width*self.scaleX/2;
			ry = cood.y + self.y+self.bitmapData.height*self.scaleY/2;
			LGlobal.canvas.translate( rx, ry); 
			LGlobal.canvas.rotate(self.rotate * Math.PI / 180);
			LGlobal.canvas.translate(0-rx,0-ry); 
			if(self.alpha < 1){ 
				LGlobal.canvas.globalAlpha = self.alpha;
			}
			self.draw(cood);
		}else{
			if(self.alpha < 1){
				LGlobal.canvas.globalAlpha = self.alpha;
			}
			self.draw(cood);
		}
		if(self.save)LGlobal.canvas.restore(); 
	},
	draw:function(cood){
		var self=this;
		if(self.scaleX == -1 || self.scaleY == -1){
			self.tX = self.scaleX == -1?-1:1;
			self.tY = self.scaleY == -1?-1:1;
			LGlobal.canvas.scale(self.tX,self.tY);
			
			LGlobal.canvas.drawImage(self.bitmapData.image,
				self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
				self.tX * (cood.x + self.x),self.tY*(cood.y + self.y),self.bitmapData.width*self.scaleX,self.bitmapData.height*self.scaleY);
		}else{
			LGlobal.canvas.drawImage(self.bitmapData.image,
				self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
				cood.x + self.x,cood.y + self.y,self.bitmapData.width*self.scaleX,self.bitmapData.height*self.scaleY);
		}
	},
	ismouseon:function(event,cood){
		var self = this;
		if(cood==null)cood={x:0,y:0};
		if(event==null || event == UNDEFINED)return false;
		var ox,oy;
		if(event.offsetX == UNDEFINED){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		if(event.offsetX >= self.x + cood.x && ox <= self.x + cood.x + self.bitmapData.width*self.scaleX && 
			event.offsetY >= self.y + cood.y && oy <= self.y + cood.y + self.bitmapData.height*self.scaleY){
			return true;
		}else{
			return false;
		}
	},
	getWidth:function(){
		var self = this;
		return self.bitmapData != null?self.bitmapData.width*(self.scaleX>0?self.scaleX:-self.scaleX):0;
	},
	getHeight:function(){
		var self = this;
		return self.bitmapData != null?self.bitmapData.height*(self.scaleY>0?self.scaleY:-self.scaleY):0;
	},
	startX:function(){
		return this.x;
	},
	startY:function(){
		return this.y;
	}
};


/*
* LBitmapData.js
**/
function LBitmapData(image,x,y,width,height){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LBitmapData";
	self.oncomplete = null;
	if(image){
		self.image = image;
		self.x = (x==null?0:x);  
		self.y = (y==null?0:y);  
		self.width = (width==null?self.image.width:width);  
		self.height = (height==null?self.image.height:height);
	}else{
		self.x = 0;  
		self.y = 0;  
		self.width = 0;  
		self.height = 0;
		self.image = new Image();
	}
}
LBitmapData.prototype = {
	setProperties:function (x,y,width,height){
		var self = this;
		self.x = x;
		self.y = y;
		self.width = width;
		self.height = height;
	},
	setCoordinate:function (x,y){
		var self = this;
		self.x = x;
		self.y = y;
	}
};


/*
* LAnimation.js
**/
function LAnimation(layer,data,list){
	base(this,LSprite,[]);
	var self = this;
	self.rowIndex = 0;
	self.colIndex = 0;
	self.overActionFun = null;
	self.mode = 1;
	self.isMirror = false;
	self.bitmap =  new LBitmap(data);
	self.imageArray = list;
	self.addChild(self.bitmap);
	if(layer != null)layer.addChild(self);
};
LAnimation.prototype.setAction = function (rowIndex,colIndex,mode,isMirror){
	var self = this;
	if(rowIndex != null && rowIndex >= 0 && rowIndex < self.imageArray.length)self.rowIndex = rowIndex;
	if(colIndex != null && colIndex >= 0 && colIndex < self.imageArray[rowIndex].length)self.colIndex = colIndex;
	if(mode != null)self.mode = mode;
	if(isMirror != null){
		self.isMirror = isMirror;
		if(self.isMirror){
			self.bitmap.scaleX = -1*Math.abs(self.bitmap.scaleX);
		}else{
			self.bitmap.scaleX = 1*Math.abs(self.bitmap.scaleX);
		}
	}
};
LAnimation.prototype.getAction = function (){
	var self = this;
	return [self.rowIndex,self.colIndex];
};
LAnimation.prototype.onframe = function (){
	var self = this;
	self.bitmap.bitmapData.setCoordinate(self.imageArray[self.rowIndex][self.colIndex].x,self.imageArray[self.rowIndex][self.colIndex].y);
	self.colIndex += self.mode;
	if(self.colIndex >= self.imageArray[self.rowIndex].length || self.colIndex < 0){
		self.colIndex = self.mode>0?0:self.imageArray[self.rowIndex].length - 1;
		if(self.overActionFun != null)self.overActionFun(self);
	}
};
LAnimation.prototype.addEventListener = function (type,listener){
	var self = this;
	arguments.callee[SUPER].die.call(this);
	if(type == LEvent.COMPLETE){
		self.overActionFun = listener;
	}
};
LAnimation.prototype.removeEventListener = function (type,listener){
	var self = this;
	arguments.callee[SUPER].die.call(this);
	if(type == LEvent.COMPLETE){
		self.overActionFun = null;
	}
};

/*
* LAnimationMovie.js
**/
function LAnimationMovie(data,imgArray,speed){
	if(speed == null)speed = 1;
	base(this,LSprite,[]);
	var self = this;
	self.animation = new LAnimation(self,data,imgArray);
	self.speedIndex = 1;
	self.speed = speed;
	self.addEventListener(LEvent.ENTER_FRAME,self.onFrame);
};
LAnimationMovie.prototype.onFrame = function (event){
	var self = this;
	if(!(self.speedIndex++ % self.speed == 0))return;
	self.speedIndex -= self.speed;
	self.animation.onframe();
};
LAnimationMovie.prototype.action = function (value){
	var self = this;
	self.animation.setAction(value);
};

/*
* LDisplay.js
**/
function LDisplay(){}
LDisplay.drawRect = function (_target,pointArray,fill,color,alpha,thickness){
	if(fill==null)fill=false;
	if(color==null)color="#000000";
	if(alpha==null)alpha=1;
	if(thickness==null)thickness=1;
	_target.drawRect(1,color,pointArray,fill,color);
};
function LoadingSample1(step,background,color){
	base(this,LSprite,[]);
	var self = this;
	self.numberList = new Array(
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
	self.backgroundColor = background==null?"#000000":background;
	self.color = color==null?"#ffffff":color;
	self.progress = 0;
	self.step = step==null?LGlobal.width*0.5/15:step;
	self.back = new LSprite();
	self.addChild(self.back);
	self.num = new LSprite();
	self.addChild(self.num);
	
	self.num.mask = new LSprite();
	self.screenX = (LGlobal.width - self.step*15)/2;
	self.screenY = (LGlobal.height - self.step*5)/2;
	self.back.x = self.screenX;
	self.back.y = self.screenY;
	self.num.x = self.screenX;
	self.num.y = self.screenY;
	self.setProgress(self.progress);
}
LoadingSample1.prototype.setProgress = function (value){
	var self = this;
	var num_0="" , num_1 , num_2 , i;
	var s_x = self.step;
	if(value >= 100){
		num_0 = self.getNumber(1);
		num_1 = self.getNumber(0);
		num_2 = self.getNumber(0);
		s_x = self.step*3;
	}else if(value >= 10){
		num_1 = self.getNumber(Math.floor(value/10));
		num_2 = self.getNumber(value%10);
	}else{
		num_1 = self.getNumber(0);
		num_2 = self.getNumber(value);
	}
	self.back.graphics.clear();
	self.back.graphics.add(function(){
		LGlobal.canvas.beginPath();
		LGlobal.canvas.fillStyle = self.backgroundColor;
		LGlobal.canvas.fillRect(0,0,LGlobal.width,LGlobal.height);
		LGlobal.canvas.beginPath();
		LGlobal.canvas.fillStyle = self.color;
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				LGlobal.canvas.fillRect(self.screenX + Math.floor(i%3)*self.step, 
				self.screenY + Math.floor(i/3)*self.step, self.step, self.step);
			}
		}
		for(i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			LGlobal.canvas.fillRect(self.screenX + s_x + Math.floor(i%3)*self.step, 
			self.screenY + Math.floor(i/3)*self.step, self.step, self.step);
		}
		for(i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			LGlobal.canvas.fillRect(self.screenX + s_x + Math.floor(i%3)*self.step + self.step*4, 
			self.screenY + Math.floor(i/3)*self.step, self.step, self.step);
		}
		LGlobal.canvas.moveTo(self.screenX + s_x + self.step*9.7,self.screenY);
		LGlobal.canvas.lineTo(self.screenX + s_x + self.step*10.5,self.screenY);
		LGlobal.canvas.lineTo(self.screenX + s_x + self.step*9.3,self.screenY + self.step * 5);
		LGlobal.canvas.lineTo(self.screenX + s_x + self.step*8.5,self.screenY + self.step * 5);
		LGlobal.canvas.lineTo(self.screenX + s_x + self.step*9.7,self.screenY);
		LGlobal.canvas.fill();
		LGlobal.canvas.moveTo(self.screenX + s_x + self.step*8.5,self.screenY + self.step);
		LGlobal.canvas.arc(self.screenX + s_x + self.step*8.5,self.screenY + self.step
			,self.step*0.6,0,360+Math.PI/180);
		LGlobal.canvas.moveTo(self.screenX + s_x + self.step*10.5,self.screenY + self.step*4);
		LGlobal.canvas.arc(self.screenX + s_x + self.step*10.5,self.screenY + self.step*4
			,self.step*0.6,0,360+Math.PI/180);
		LGlobal.canvas.fill();
		
	});
	self.num.mask.graphics.clear();
	self.num.mask.graphics.add(function(){
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				LGlobal.canvas.rect(self.screenX + Math.floor(i%3)*self.step, 
				self.screenY + Math.floor(i/3)*self.step, self.step, self.step);
			}
		}
		for(var i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			LGlobal.canvas.rect(self.screenX + s_x + Math.floor(i%3)*self.step, 
			self.screenY + Math.floor(i/3)*self.step, self.step, self.step);
		}
		for(var i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			LGlobal.canvas.rect(self.screenX + s_x + Math.floor(i%3)*self.step + self.step*4, 
			self.screenY + Math.floor(i/3)*self.step, self.step, self.step);
		}
	});
	

    var grd = LGlobal.canvas.createRadialGradient(LGlobal.width/2, LGlobal.height, 0, LGlobal.width/2, 0, LGlobal.height);  
    grd.addColorStop(0, "red");  
    grd.addColorStop(0.3, "orange");  
    grd.addColorStop(0.4, "yellow");  
    grd.addColorStop(0.5, "green");  
    grd.addColorStop(0.8, "blue");  
    grd.addColorStop(1, "violet");  
    LGlobal.canvas.fillStyle = grd;
    self.num.graphics.clear();
    self.num.graphics.drawRect(1,grd,[0,self.step*5*(100-value)*0.01,LGlobal.width,LGlobal.height],true,grd);
};
LoadingSample1.prototype.getNumber = function (value){
	return this.numberList[value];
};
function LoadingSample2(size,background,color){
	base(this,LSprite,[]);
	var self = this;
	self.backgroundColor = background==null?"#000000":background;
	self.graphics.drawRect(1,self.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,self.backgroundColor);
	
	if(color==null){
	    color = LGlobal.canvas.createRadialGradient(LGlobal.width/2, LGlobal.height, 0, LGlobal.width/2, 0, LGlobal.height);  
	    color.addColorStop(0, "red");  
	    color.addColorStop(0.3, "orange");  
	    color.addColorStop(0.4, "yellow");  
	    color.addColorStop(0.5, "green");  
	    color.addColorStop(0.8, "blue");  
	    color.addColorStop(1, "violet");  
    }
	self.color = color;
	self.progress = 0;
	self.size = size==null?LGlobal.height*0.2:size;
	self.backLabel = new LTextField();
	self.backLabel.text = "Loading...";
	self.addChild(self.backLabel);
	self.backLabel.size = self.size;
	self.backLabel.color = "#ffffff";
	self.backLabel.x = (LGlobal.width - self.backLabel.getWidth())/2;
	self.backLabel.y = (LGlobal.height - self.size)/2;
	
	self.progressLabel = new LTextField();
	self.addChild(self.progressLabel);
	self.progressLabel.text = "***%";
	self.progressLabel.size = self.size*0.3;
	self.progressLabel.color = color;
	self.progressLabel.x = (LGlobal.width - self.progressLabel.getWidth())/2;
	self.progressLabel.y = (LGlobal.height - self.size)/2 - self.size*0.4;
	
	self.showLabel = new LTextField();
	self.showLabel.text = "Loading...";
	self.addChild(self.showLabel);
	self.showLabel.size = self.size;
	self.showLabel.color = self.color;
	self.showLabel.x = (LGlobal.width - self.showLabel.getWidth())/2;
	self.showLabel.y = (LGlobal.height - self.size)/2;
	self.showLabel.mask = new LGraphics();
	self.screenX = self.showLabel.x;
	self.screenY = self.showLabel.y;
	self.screenWidth = self.showLabel.getWidth();

	LGlobal.canvas.shadowOffsetX = 2;  
	LGlobal.canvas.shadowOffsetY = 2;
	LGlobal.canvas.shadowColor = "blue"; 
	self.setProgress(self.progress);
}
LoadingSample2.prototype.setProgress = function (value){
	var self = this;
	self.progressLabel.text = value + "%";
	self.showLabel.mask.clear();
	self.showLabel.mask.add(function(){
		LGlobal.canvas.rect(self.screenX,0,self.screenWidth*value*0.01,LGlobal.height);
	});
	if(value >= 100){
		LGlobal.canvas.shadowOffsetX = 0;
		LGlobal.canvas.shadowOffsetY = 0;
	}
};
function LoadingSample3(height,background,color){
	base(this,LSprite,[]);
	var self = this;
	self.backgroundColor = background==null?"#000000":background;
	self.graphics.drawRect(1,self.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,self.backgroundColor);
	
	if(color==null){
	    color = LGlobal.canvas.createRadialGradient(LGlobal.width/2, LGlobal.height, 0, LGlobal.width/2, 0, LGlobal.height);  
	    color.addColorStop(0, "red");  
	    color.addColorStop(0.3, "orange");  
	    color.addColorStop(0.4, "yellow");  
	    color.addColorStop(0.5, "green");  
	    color.addColorStop(0.8, "blue");  
	    color.addColorStop(1, "violet");  
    }
	self.color = color;
	self.progress = 0;
	self.screenWidth = LGlobal.width*0.75;
	self.screenHeight = height==null?LGlobal.height*0.1:height;
	if(self.screenHeight > 5)self.screenHeight=5;
	self.screenX = (LGlobal.width - self.screenWidth)/2;
	self.screenY = (LGlobal.height - self.screenHeight)/2;
	self.back = new LSprite();
	self.addChild(self.back);
	self.label = new LTextField();
	self.label.color="#ffffff";
	self.label.weight="bolder";
	self.label.size = self.screenHeight * 2;
	self.label.x = self.screenX + (self.screenWidth - self.label.getWidth())*0.5;
	self.label.y = self.screenY - self.screenHeight * 4;
	self.addChild(self.label);
	self.star = new Array();
	LGlobal.LoadingSample3 = self;
	self.interval = setInterval(self.onframe,LGlobal.speed<50?50:LGlobal.speed);
	self.setProgress(self.progress);
}
LoadingSample3.prototype.onframe = function(){
	var self = LGlobal.LoadingSample3;
	var i,star;
	if(self.progress>=100){
		if(self.star.length > 0){
			for(i=0;i<self.star.length;i++){
				self.removeChild(self.star[i]);
			}
			self.star.splice(0,self.star.length);
		}
		return;
	}
	for(i=0;i<self.star.length;i++){
		star = self.star[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			self.star.splice(i,1);
			self.removeChild(star);
			i--;
		}
	}
	if(self.star.length < 10)self.addStar();
};
LoadingSample3.prototype.die = function (){
	var self = this;
	arguments.callee[SUPER].die.call(this);
	clearInterval(self.interval);
	LGlobal.LoadingSample3=null;
};
LoadingSample3.prototype.addStar = function(){
	var self = this;
	var star = new LSprite();
	var step = 1 + Math.floor(Math.random()*4);
	star.graphics.add(function (coodx,coody){
		LGlobal.canvas.beginPath();
		LGlobal.canvas.fillStyle = "#ffffff";
		LGlobal.canvas.lineTo(coodx + step*2,coody + step);
		LGlobal.canvas.lineTo(coodx + step*4,coody);
		LGlobal.canvas.lineTo(coodx + step*3,coody + step*2);
		LGlobal.canvas.lineTo(coodx + step*4,coody + step*4);
		LGlobal.canvas.lineTo(coodx + step*2,coody + step*3);
		LGlobal.canvas.lineTo(coodx,coody + step*4);
		LGlobal.canvas.lineTo(coodx + step,coody + step*2);
		LGlobal.canvas.lineTo(coodx,coody);
		LGlobal.canvas.fill();
	});
	star.x = self.screenX + self.screenWidth*self.progress*0.01;
	star.y=self.screenY;
	star.speedx = 4 - 8*Math.random();
	star.speedy = 4 - 8*Math.random();
	self.star.push(star);
	self.addChild(star);
};
LoadingSample3.prototype.setProgress = function (value){
	var self = this;
	if(value > 100)value=100;
	self.progress = value;
	self.back.graphics.clear();
	self.back.graphics.add(function (){
		LGlobal.canvas.beginPath();
		LGlobal.canvas.fillStyle = "#00FFFF";
		LGlobal.canvas.rect(self.screenX - 3, self.screenY - 3, self.screenWidth + 6, self.screenHeight + 6);
		LGlobal.canvas.fill();
		LGlobal.canvas.beginPath();
		LGlobal.canvas.fillStyle = "#990033";
		LGlobal.canvas.rect(self.screenX, self.screenY, self.screenWidth, self.screenHeight);
		LGlobal.canvas.fill();
		LGlobal.canvas.beginPath();
		LGlobal.canvas.fillStyle = self.color;
		LGlobal.canvas.rect(self.screenX, self.screenY, self.screenWidth*value*0.01, self.screenHeight);
		LGlobal.canvas.fill();
	});
	self.label.text = value + "%";
};
function $LoadManage(){};
$LoadManage.prototype={
	load:function($list,$onupdate,$oncomplete){
		this.list=$list,this.onupdate=$onupdate,this.oncomplete=$oncomplete;
		this.loader=null,this.loadIndex=0,this.result=[];
		this.loadStart();
	},
	loadStart:function(){
		var self = LLoadManage;
		if(self.loadIndex >= self.list.length){
			self.oncomplete(self.result);
			return;
		}
		self.loader = new LLoader();
		self.loader.addEventListener(LEvent.COMPLETE,self.loadComplete);
		self.loader.load(self.list[self.loadIndex].path,"bitmapData");
	},
	loadComplete:function(){
		var self = LLoadManage;
		self.result[self.list[self.loadIndex].name] = self.loader.content;
		self.loadIndex++;
		if(self.onupdate){
			self.onupdate(Math.floor(self.loadIndex*100/self.list.length));
		}
		self.loadStart();
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
	var self = this,key=null;
	self.target=$target;self.duration=$duration || 0.001;self.vars=$vars;
	self.currentTime = (new Date()).getTime() / 1000;
	self.delay = self.vars.delay || 0;
	self.combinedTimeScale = self.vars.timeScale || 1;
	self.active = self.duration == 0 && self.delay == 0;
	self.varsto={};
	self.varsfrom={};
	if (typeof(self.vars.ease) != "function") {
		self.vars.ease = self.easeOut;
	}
	self.ease = self.vars.ease;
	delete self.vars.ease;
	if(self.vars.onComplete){
		self.onComplete = self.vars.onComplete;
		delete self.vars.onComplete;
	}
	if(self.vars.onUpdate){
		self.onUpdate = self.vars.onUpdate;
		delete self.vars.onUpdate;
	}
	if(self.vars.onStart){
		self.onStart = self.vars.onStart;
		delete self.vars.onStart;
	}
	for(key in self.vars){
		self.varsto[key] = self.vars[key];
		self.varsfrom[key] = self.target[key];
	}
	self.initTime = self.currentTime;
	self.startTime = self.initTime + self.delay;
}
$LTweenLiteChild.prototype = {
	init:function(){
	},
	initTweenVals:function(){
	},
	easeOut:function($t, $b, $c, $d) {
		return -$c * ($t /= $d) * ($t - 2) + $b;
	},
	tween:function(){
		var self = this;
		var time = (new Date()).getTime() / 1000 , etime;
		etime = (time - self.startTime);
		if(etime < 0)return;
		var tweentype=null;
		for(tweentype in self.varsto){
			var v = self.ease(etime,self.varsfrom[tweentype],self.varsto[tweentype]-self.varsfrom[tweentype],self.duration);
			self.target[tweentype] = v;
		}
		if (etime >= self.duration){
			if(self.onComplete)self.onComplete();
			return true;
		}else if(self.onUpdate){
			self.onUpdate();
		}
		return false;
	}
};
function $LTweenLite(){}
$LTweenLite.prototype = {
	tweens:[],
	show:null,
	frame:function(){
		var self = this;
		var i,length=self.tweens.length;
		for(i=0;i < length;i++){
			if(self.tweens[i].tween()){
				self.tweens.splice(i,1);
				i--;
			}
		}
		if(self.tweens.length == 0)self.show = null;
	},
	to:function($target,$duration,$vars){
		if(!$target)return;
		var self = this;
		var tween = new $LTweenLiteChild($target,$duration,$vars);
		self.tweens.push(tween);
		self.show = self.frame;
	}
};
(function(){
	LLoadManage = new $LoadManage();
	LTweenLite = new $LTweenLite();
	LGlobal.childList.push(LTweenLite);
})();

