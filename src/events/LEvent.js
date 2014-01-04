/*
 * LEvent.js
 **/
var LEvent = function (){throw "LEvent cannot be instantiated";};
LEvent.INIT = "init",
LEvent.COMPLETE = "complete",
LEvent.ENTER_FRAME = "enter_frame",
LEvent.SOUND_COMPLETE = "sound_complete",
LEvent.END_CONTACT = "endContact",
LEvent.PRE_SOLVE = "preSolve",
LEvent.POST_SOLVE = "postSolve",
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.currentTarget = null;
LEvent.ADDED_TO_STAGE = "added_to_stage";
LEvent.REMOVED_FROM_STAGE = "removed_from_stage";
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
