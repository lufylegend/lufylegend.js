/*
* LPoint.js
**/
function LPoint(x,y){
	var s = this;
	s.x = x;
	s.y = y;
}
LPoint.prototype = {
	toString:function(){
		return '[LPoint('+this.x+','+this.y+')]';
	}
};