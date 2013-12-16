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
			f();
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
	for(p in o)h[p]=1;
	for(p in b.prototype){
		if(!h[p])o[p] = b.prototype[p];
		o[p][SUPER] = b.prototype;
	}
	b.apply(d,a);
	if(Object.prototype.callParent){
		delete Object.prototype.callParent;
	}
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