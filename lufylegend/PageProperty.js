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