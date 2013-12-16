/*
* LShape.js
**/
function LShape(){
	var s = this;
	base(s,LDisplayObject,[]);
	s.type = "LShape";
	s.graphics = new LGraphics();
	s.graphics.parent = s;
}
p = {
	_show:function(c){
		var s = this;
		s.graphics.show();
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
	remove:function(){
		var s = this;
		if(!s.parent || s.parent == "root")return;
		s.parent.removeChild(s);
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
		if(!s.mouseChildren || !s.visible)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1};
		var i,k,ox,oy;
		if(typeof e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		var on = s.ismouseon(e,cd);
		if(on){
			if(s._mevent(type)){
				for(k=0;k<s.mouseList.length;k++){
					var o = s.mouseList[k];
					if(o.type == type){
						e.selfX = ox - (s.x+cd.x);
						e.selfY = oy - (s.y+cd.y);
						e.clickTarget = s;
						o.listener(e,s);
						return true;
					}
				}
			}else{
				var mc = {x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
				for(k=s.childList.length-1;k>=0;k--){
					if(s.childList[k].mouseEvent){
						i = s.childList[k].mouseEvent(e,type,mc);
						if(i)return true;
					}
				}
			}
			return true;
		}
		return false;
	},
	ismouseon:function(e,cd){
		var s = this;
		if(!s.visible || e==null)return false;
		var k = null,i=false,l=s.childList;
		var sc={x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
		if(s.mask && !s.mask.ismouseon(e,sc))return false;
		if(s.graphics)i = s.graphics.ismouseon(e,sc);
		if(!i){
			for(k=l.length-1;k>=0;k--){
				if(l[k].ismouseon)i = l[k].ismouseon(e,sc);
				if(i)break;
			}
		}
		return i;
	},
	die:function (){
		var s = this;
		s.graphics.clear();
		s.removeAllEventListener();
	}
};
for(var k in p)LShape.prototype[k]=p[k];