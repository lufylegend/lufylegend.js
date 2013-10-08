/*
* LSprite.js
**/
function LSprite(){
	var s = this;
	base(s,LInteractiveObject,[]);
	s.type = "LSprite";
	s.x = 0;
	s.y = 0;
	s.rotatex;
	s.rotatey;
	s.rotate = 0;
	s.alpha = 1;
	s.visible=true;
	s.childList = new Array();
	s.graphics = new LGraphics();
	s.graphics.parent = s;
	s.width = 0;
	s.height = 0;
	s.scaleX=1;
	s.scaleY=1;
	s.box2d = null;
	s.mask = null;
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
	show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}
		if(s.filters){
			s.setShadow();
		}
		if(s.box2dBody){
			if((typeof s.rotatex) == "undefined"){
				s.getRotateXY();
			}
			s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
			s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
			s.rotate = s.box2dBody.GetAngle();
		}
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}
		//rotate
		s._transformRotate();
		//scale
		s._transformScale();
		//x,y
		if(s.x != 0 || s.y != 0)c.transform(1,0,0,1,s.x,s.y);
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		s.graphics.show();
		LGlobal.show(s.childList);
		c.restore();
		s.loopframe();
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
			a = o.x;
			if(typeof o.startX == "function")a=o.startX();
			b = a + o.getWidth();
			if(a < left)left = a;
			if(b > right)right = b;
		}
		s.left = s.x + left;
		return right - left;
	},
	getHeight:function(){
		var s=this,i,l,o,a,b,
		top = s.graphics.startY(),bottom = top + s.graphics.getHeight();
		for(i=0,l=s.childList.length;i<l;i++){
			o = s.childList[i];
			a = o.y;
			if(typeof o.startY == "function")a=o.startY();
			b = a + o.getHeight();
			if(a < top)top = a;
			if(b > bottom)bottom = b;
		}
		s.top = s.y + top;
		return bottom - top;
	},
	startX:function(){
		var s = this;
		s.getWidth();
		return s.left;
	},
	startY:function(){
		var s = this;
		s.getHeight();
		return s.top;
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
		s.resize();
	},
	addChildAt:function(d, i){
		var s = this;
		if(i < 0 || i > s.childList.length){
			return;
		}
		d.remove();
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
		s.resize();
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
		s.resize();
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
	mouseEvent:function (e,type,cd){
		if(e==null || e == UNDEFINED)return false;
		var s = this;
		if(!s.mouseChildren || !s.visible)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1};
		var i,k,ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		var mc = {x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
		for(k=s.childList.length-1;k>=0;k--){
			if(s.childList[k].mouseEvent){
				i = s.childList[k].mouseEvent(e,type,mc);
				if(i)return true;
			}
		}
		if(s.mouseList.length == 0){
			return false;
		}
		var i = s.ismouseon(e, cd);
		if(i){
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
			return false;
		}else{
			return false;
		}
	},
	ismouseon:function(e,cd){
		var s = this;
		if(!s.visible || e==null)return false;
		var k = null,i=false,l=s.childList;
		var sc={x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY,alpha:cd.alpha*s.alpha};
		for(k=l.length-1;k>=0;k--){
			if(l[k].ismouseon)i = l[k].ismouseon(e,sc);
			if(i)break;
		}
		if(!i && s.graphics)i = s.graphics.ismouseon(e,sc);
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
	},
	toString:function(){
		return "[LSprite]";
	}
};
for(var k in p)LSprite.prototype[k]=p[k];