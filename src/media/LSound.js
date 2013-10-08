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
LSound.prototype.toString = function(){
	return "[LSound]";
};