/*
* LSprite.js
**/
function LSprite(){
	var s = this;
	base(s,LInteractiveObject,[]);
	s.type = "LSprite";
	s.rotatex;
	s.rotatey;
	s.childList = new Array();
	s.graphics = new LGraphics();
	s.graphics.parent = s;
	s.box2d = null;
}
p = {
	setRotate:function (angle){
		var s = this;
		if(s.box2dBody){
			s.box2dBody.SetAngle(angle);
		}else{
			s.rotate = angle;
		}
	},
	_rotateReady:function(){
		var s = this;
		if(s.box2dBody){
			if((typeof s.rotatex) == "undefined"){
				s.getRotateXY();
			}
			s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
			s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
			s.rotate = s.box2dBody.GetAngle();
		}
	},
	_ll_show:function(c){
		var s = this;
		s.graphics.ll_show();
		LGlobal.show(s.childList);
	},
	startDrag:function(){
		var s = this,r,c;
		if(s.ll_dragStart)return;
		s.ll_dragStartX = s.x;
		s.ll_dragStartY = s.y;
		s.ll_dragMX = mouseX;
		s.ll_dragMY = mouseY;
		s.ll_dragStart = true;
		LGlobal.dragList.push(s);
	},
	stopDrag:function(){
		var s = this,i,l;
		for(i=0,l=LGlobal.dragList.length;i<l;i++){
			if(s.objectIndex == LGlobal.dragList[i].objectIndex){
				s.ll_dragStart = false;
				LGlobal.dragList.splice(i,1);
				break;
			}
		}
	},
	getRotateXY:function(w,h){
		var s = this;
		if(!w || !h){
			w=s.getWidth();
			h=s.getHeight();
		}
		s.rotatex = w/2;
		s.rotatey = h/2;
	},
	getWidth:function(){
		var s=this,i,l,o,a,b,
		left = s.graphics.startX(),right = left + s.graphics.getWidth();
		for(i=0,l=s.childList.length;i<l;i++){
			o = s.childList[i];
			if(typeof o.visible == UNDEFINED || !o.visible)continue;
			a = o.x;
			if(typeof o._startX == "function")a=o._startX();
			b = a + o.getWidth();
			if(a < left)left = a;
			if(b > right)right = b;
		}
		s.left = s.x + left;
		return (right - left)*s.scaleX;
	},
	getHeight:function(){
		var s=this,i,l,o,a,b,
		top = s.graphics.startY(),bottom = top + s.graphics.getHeight();
		for(i=0,l=s.childList.length;i<l;i++){
			o = s.childList[i];
			if(typeof o.visible == UNDEFINED || !o.visible)continue;
			a = o.y;
			if(typeof o._startY == "function")a=o._startY();
			b = a + o.getHeight();
			if(a < top)top = a;
			if(b > bottom)bottom = b;
		}
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
	loopframe:function (){
		var s = this;
		for(var k=0,l=s.frameList.length;k<l;k++){
			s.target = s;
			s.event_type = LEvent.ENTER_FRAME;
			s.frameList[k](s);
		}
	},
	remove:function(){
		var s = this;
		if(!s.parent || s.parent == "root")return;
		s.parent.removeChild(s);
	},
	addChild:function (d){
		var s  = this;
		d.parent = s;
		s.childList.push(d);
	},
	addChildAt:function(d, i){
		var s = this;
		if(i < 0 || i > s.childList.length){
			return;
		}
		if(typeof d.remove == "function")d.remove();
		d.parent = s;
		s.childList.splice(i,0,d);
	},
	removeChild:function(d){
		var s  = this,c = s.childList;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex){
				if(LGlobal.destroy && d.die)d.die();
				s.childList.splice(i,1);
				break;
			}
		}
		delete d.parent;
	},
	getChildAt:function(i){
		var s  = this,c=s.childList;
		if(c.length == 0 || c.length <= i)return null;
		return c[i];
	},
	removeChildAt:function(i){
		var s  = this,c=s.childList;
		if(c.length <= i)return;
		if(LGlobal.destroy && c[i].die)c[i].die();
		s.childList.splice(i,1);
	},
	getChildIndex:function(child){
		var s = this,c=s.childList,i,l=c.length;
		for(i=0;i<l;i++){
			if(c[i].objectIndex == child.objectIndex){
				return i;
			}
		}
		return -1;
	},
	setChildIndex:function(child, index){
		var s = this,c=s.childList,i,l=c.length;
		if(child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l){
			return;
		}
		for(i=0;i<l;i++){
			if(c[i].objectIndex == child.objectIndex){
				break;
			}
		}
		s.childList.splice(i,1);
		s.childList.splice(index,0,child);
	},
	resize:function(){
		var s  = this;
		s.width = s.getWidth();
		s.height = s.getHeight();
	},
	removeAllChild:function(){
		var s  = this,c=s.childList;
		for(var i=0,l=c.length;i<l;i++){
			if(LGlobal.destroy && c[i].die)c[i].die();
		}
		s.childList.length = 0;
		s.width = 0;
		s.height = 0;
	},
	clone:function(){
		var s = this,a = new LSprite(),c,o;
		a.copyProperty(s);
		a.graphics = s.graphics.clone();
		a.graphics.parent = a;
		for(var i=0,l=s.childList.length;i<l;i++){
			c = s.childList[i];
			if(c.clone){
				o = c.clone();
				o.parent = a;
				a.childList.push(o);
			}
		}
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
		var i,k,ox = e.offsetX,oy = e.offsetY;
		var on = s.ismouseon(e,cd);
		if(on){
			var mc = {x:s.x*cd.scaleX+cd.x,y:s.y*cd.scaleY+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
			for(k=s.childList.length-1;k>=0;k--){
				if(s.childList[k].mouseEvent){
					i = s.childList[k].mouseEvent(e,type,mc);
					if(i)break;
				}
			}
			if(s._mevent(type)){
				for(k=0;k<s.mouseList.length;k++){
					var o = s.mouseList[k];
					if(o.type == type){
						e.selfX = (ox - (s.x*cd.scaleX+cd.x))/(cd.scaleX*s.scaleX);
						e.selfY = (oy - (s.y*cd.scaleY+cd.y))/(cd.scaleY*s.scaleY);
						e.clickTarget = s;
						o.listener(e,s);
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
		var sc={x:s.x*cd.scaleX+cd.x,y:s.y*cd.scaleY+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
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
		if(s.box2dBody)s.clearBody();
		for(var i=0,c=s.childList,l=c.length;i<l;i++){
			if(c[i].die)c[i].die();
		}
	}
};
for(var k in p)LSprite.prototype[k]=p[k];