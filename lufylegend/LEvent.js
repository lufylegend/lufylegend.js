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