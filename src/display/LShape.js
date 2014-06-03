/*
* LShape.js
**/
function LShape(){
	var s = this;
	base(s,LInteractiveObject,[]);
	s.type = "LShape";
	s.graphics = new LGraphics();
	s.graphics.parent = s;
}
LShape.ARC = "arc";
LShape.RECT = "rect";
LShape.VERTICES = "vertices";
p = {
	_ll_show:function(c){
		var s = this;
		s.graphics.ll_show();
	},
	getWidth:function(){
		var s=this, mx, mw,
		left = s.graphics.startX(),right = left + s.graphics.getWidth();
		if (s.mask) {
			mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
			mw = s.mask.getWidth();
			if (left < mx) {
				left = mx;
			}
			if (right > mx + mw) {
				right = mx + mw;
			}
		}
		s.ll_left = s.x + left;
		s.ll_right = s.x + right;
		return (right - left)*s.scaleX;
	},
	getHeight:function(){
		var s=this, my, mh,
		top = s.graphics.startY(),bottom = top + s.graphics.getHeight();
		if (s.mask) {
			my = s.mask._startY ? s.mask._startY() : s.mask.startY();
			mh = s.mask.getHeight();
			if (top < my) {
				top = my;
			}
			if (bottom > my + mh) {
				bottom = my + mh;
			}
		}
		s.ll_top = s.y + top;
		s.ll_bottom = s.y + bottom;
		return (bottom - top)*s.scaleY;
	},
	_startX:function(){
		var s = this;
		s.getWidth();
		return s.ll_left;
	},
	startX:function(){
		var s = this;
		return s._startX()*s.scaleX;
	},
	_startY:function(){
		var s = this;
		s.getHeight();
		return s.ll_top;
	},
	startY:function(){
		var s = this;
		return s._startY()*s.scaleY;
	},
	clone:function(){
		var s = this,a = new LShape(),c,o;
		a.copyProperty(s);
		a.graphics = s.graphics.clone();
		a.graphics.parent = a;
		return a;
	},
	ismouseon:function(e,cd){
		var s = this,i=false,sc;
		if(!s.visible || e==null)return false;
		if(s.mask){
			if(!s.mask.parent){
				s.mask.parent = s.parent;
			}
			if(!s.mask.ismouseon(e,cd)){
				return false;
			}
		}
		sc={x:s.x*cd.scaleX+cd.x,y:s.y*cd.scaleY+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
		if(s.graphics)i = s.graphics.ismouseon(e,sc);
		return i;
	},
	die:function (){
		var s = this;
		s.graphics.clear();
		s.removeAllEventListener();
	}
};
for(var k in p)LShape.prototype[k]=p[k];