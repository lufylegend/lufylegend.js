/*
* LRectangle.js
**/
function LRectangle(x,y,w,h){
	var s = this;
	s.x = x;
	s.y = y;
	s.width = w;
	s.height=h;
	s.setRectangle();
}
LRectangle.prototype = {
	setRectangle:function(){
		var s = this;
		s.bottom = s.y + s.height;
		s.right = s.x + s.width;
		s.left = s.x;
		s.top = s.y;
	},
	clone:function(){
		var s = this;
		return new LRectangle(s.x,s.y,s.width,s.height);
	},
	contains:function(x, y){
		var s = this;
		return x>=s.x && x <= s.right && y>= s.y && y <= s.bootom;
	},
	containsRect:function(rect){
		var s = this;
		return rect.x>=s.x && rect.right <= s.right && rect.y>= s.y && rect.bootom <= s.bootom;
	},
	equals:function(v){
		var s = this;
		return v.x==s.x && v.width == s.width && v.y== s.y && v.height == s.height;
	},
	inflate:function(dx,dy){
		var s = this;
		s.width += dx;
		s.height += dy;
		s.setRectangle();
	},
	intersection:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		if(ix <= ax && iy <= ay){
			return new LRectangle(ix,iy,ax,ay);
		}else{
			return new LRectangle(0,0,0,0);
		}
	},
	intersects:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		return ix <= ax && iy <= ay;
	},
	isEmpty:function(){
		var s = this;
		return s.x==0 && s.y==0 && s.width==0 && s.height==0;
	},
	offset:function(dx,dy){
		var s = this;
		s.x += dx;
		s.y += dy;
		s.setRectangle();
	},
	setEmpty:function(){
		var s = this;
		s.x = 0;
		s.y = 0;
		s.width = 0;
		s.height = 0;
		s.setRectangle();
	},
	setTo:function(xa, ya, w, h){
		var s = this;
		s.x = xa;
		s.y = ya;
		s.width = w;
		s.height = h;
		s.setRectangle();
	},
	toString:function(){
		var s = this;
		return "[LRectangle("+s.x+","+s.y+","+s.width+","+s.height+")]";
	},
	union:function(t){
		var s=this;
		return new LRectangle(s.x>t.x?t.x:s.x,s.y>t.y?t.y:s.y,s.right>t.right?s.right:t.right,s.bottom>t.bottom?s.bottom:t.bottom);
	}
};