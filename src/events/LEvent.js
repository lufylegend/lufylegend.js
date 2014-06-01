/*
 * LEvent.js
 **/
var LEvent = function (){throw "LEvent cannot be instantiated";};
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