/*
* LPoint.js
**/
function LPoint(x,y){
	var s = this;
	s.x = x;
	s.y = y;
}
LPoint.distance = function(p1,p2){
	return LPoint.distance2(p1.x,p1.y,p2.x,p2.y);
};
LPoint.distance2 = function(x1,y1,x2,y2){
	var x = x1 - x2, y = x1 - x2;
	return Math.sqrt(x*x + y*y);
};
LPoint.interpolate = function(p1,p2,f){
	return new LPoint(p1.x+(p2.x-p1.x)*(1-f),p1.y+(p2.y-p1.y)*(1-f));
};
LPoint.polar = function(l, a){
	return new LPoint(l*Math.cos(a),l*Math.sin(a));
};
LPoint.prototype = {
	toString:function(){
		return '[object LPoint('+this.x+','+this.y+')]';
	},
	length:function(){
		return LPoint.distance2(this.x,this.y,0,0);
	},
	add:function(v){
		return LPoint(this.x+v.x,this.y+v.y);
	},
	clone:function(){
		return new LPoint(this.x,this.y);
	},
	setTo:function(x, y){
		this.x = x,this.y=y;
	},
	copyFrom:function(s){
		this.setTo(s.x,s.y);
	},
	equals:function(t){
		return this.x == t.x && this.y == t.y;
	},
	normalize:function(t){
		var s = this,scale = t/s.length();
		s.x *= scale,s.y *= scale;
	},
	offset:function(dx,dy){
		this.x += dx;
		this.y += dy;
	},
	subtract:function(v){
		return new LPoint(this.x  - v.x,this.y - v.y);
	}
};