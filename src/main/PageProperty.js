/*
* PageProperty.js
**/
function trace(){
	if(!LGlobal.traceDebug)return;
	var t = document.getElementById("traceObject"),i;
	if(trace.arguments.length > 0 && t == null){
		t = document.createElement("TEXTAREA");
		t.id = "traceObject";
		t.style.position = "absolute";
		t.style.top = (LGlobal.height + 20) + "px";
		t.style.width = LGlobal.width+"px";
		t.style.height = "200px";
		document.body.appendChild(t);
	}
	for(i=0; i < trace.arguments.length; i++){
		t.value=t.value+trace.arguments[i] + "\r\n";
		t.scrollTop = t.scrollHeight;
	}
}
function addChild(o){
	LGlobal.stage.addChild(o);
}
function removeChild(o){
	LGlobal.stage.removeChild(o);
}
function init(s,c,w,h,f,t){
	LGlobal.speed = s;
	var _f = function (){
		if(LGlobal.canTouch && LGlobal.aspectRatio == LANDSCAPE && window.innerWidth < window.innerHeight){
			LGlobal.horizontalError();
		}else if(LGlobal.canTouch && LGlobal.aspectRatio == PORTRAIT && window.innerWidth > window.innerHeight){
			LGlobal.verticalError();
		}else{
			setTimeout(f,100);
		}
		LGlobal.startTimer = (new Date()).getTime();
	};
	if(t != null && t == LEvent.INIT){
		LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
		LGlobal.setCanvas(c,w,h);
		_f();
	}else{
		LEvent.addEventListener(window,"load",function(){
			LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
			LGlobal.setCanvas(c,w,h);
			_f();
		});
	}
}
function base(d,b,a){
	var p=null,o=d.constructor.prototype,h={};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	for(p in o)h[p]=1;
	for(p in b.prototype){
		if(!h[p])o[p] = b.prototype[p];
		o[p][SUPER] = b.prototype;
	}
	b.apply(d,a);
}
function getTimer(){
	return (new Date()).getTime() - LGlobal.startTimer;
}
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
if (!Array.isArray){
	Array.isArray = function(value){
		return Object.prototype.toString.apply(value) == '[object Array]';
	};
}
