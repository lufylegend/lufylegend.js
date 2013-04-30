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