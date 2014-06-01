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
		var s=this,
		left = s.graphics.startX(),right = left + s.graphics.getWidth();
		s.left = s.x + left;
		return (right - left)*s.scaleX;
	},
	getHeight:function(){
		var s=this,
		top = s.graphics.startY(),bottom = top + s.graphics.getHeight();
		s.top = s.y + top;
		return (bottom - top)*s.scaleY;
	},
	_startX:function(){
		var s = this;
		s.getWidth();
		return s.left;
	},
	startX:function(){
		var s = this;
		return s._startX()*s.scaleX;
	},
	_startY:function(){
		var s = this;
		s.getHeight();
		return s.top;
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
	_mevent:function(type){
		var s = this;
		for(k=0;k<s.mouseList.length;k++){
			var o = s.mouseList[k];
			if(o.type == type){
				return true;
			}
		}
		return false;
	},
	mouseEvent:function (e,type,cd){
		if(!e)return false;
		var s = this;
		if(!s.visible)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1};
		var i,k,ox = e.offsetX,oy = e.offsetY;
		var on = s.ismouseon(e,cd);
		if(on){
			if(s._mevent(type)){
				for(k=0;k<s.mouseList.length;k++){
					var o = s.mouseList[k];
					if(o.type == type){
						e.selfX = (ox - (s.x*cd.scaleX+cd.x))/(cd.scaleX*s.scaleX);
						e.selfY = (oy - (s.y*cd.scaleY+cd.y))/(cd.scaleY*s.scaleY);
						e.target = e.clickTarget = s;
						o.listener(e,s);
						return true;
					}
				}
			}
			return true;
		}
		return false;
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