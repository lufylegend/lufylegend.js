/*
* LSprite.js
**/
function LSprite(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LSprite";
	s.x = 0;
	s.y = 0;
	s.rotatex;
	s.rotatey;
	s.rotate = 0;
	s.alpha = 1;
	s.visible=true;
	s.childList = new Array();
	s.frameList = new Array();
	s.mouseList = new Array();
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
	show:function (cood){
		var s = this,rotateFlag = Math.PI / 180,c = LGlobal.canvas;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		if(!s.visible)return;
		s.save = false;
		if((s.mask != null && s.mask.show) || s.rotate != 0 || s.filters || s.box2dBody){
			c.save();
			s.save = true;
		}
		if(s.filters)s.setShadow();
		if(s.box2dBody){
			s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - cood.x - s.rotatex;
			s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - cood.y - s.rotatey;
			s.rotate = s.box2dBody.GetAngle();
			rotateFlag = 1;
		}
		if(s.mask != null && s.mask.show){
			s.mask.show(cood);
			c.clip();
		}
		if(s.rotate != 0){
			if(typeof(s.rotatex) == "undefined"){
				s.getRotateXY();
			}
			c.translate(cood.x + s.x + s.rotatex, cood.y + s.y + s.rotatey);
			c.rotate(s.rotate * rotateFlag);
			c.translate(-(cood.x + s.x + s.rotatex), -(cood.y + s.y + s.rotatey));
		}
		s.graphics.show({x:s.x+cood.x,y:s.y+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY,alpha:cood.alpha*s.alpha});
		LGlobal.show(s.childList,{x:s.x+cood.x,y:s.y+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY,alpha:cood.alpha*s.alpha});
		if(s.save)c.restore();
		s.loopframe();
	},
	getRotateXY:function(w,h){
		var s = this;
		if(w!=null && h!=null){
			s.rotatex = w/2;
			s.rotatey = h/2;
			return;
		}
		w=0;
		h=0;
		var k=null,w1,h1;
		for(k in s.childList){
			if(s.childList[k].getWidth){
				w1=s.childList[k].getWidth();
				w = w < w1?w1:w;
			}
			if(s.childList[k].getHeight){
				h1=s.childList[k].getHeight();
				h = h < h1?h1:h;
			}
		}
		s.rotatex = w/2;
		s.rotatey = h/2;
	},
	getWidth:function(){
		var s=this;
		var v=s.graphics.getWidth(),v1=0,k=null;
		for(k in s.childList){
			if(s.childList[k].getWidth){
				v1=s.childList[k].getWidth();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	getHeight:function(){
		var s=this;
		var v=s.graphics.getHeight(),v1=0,k=null;
		for(k in s.childList){
			if(s.childList[k].getHeight){
				v1=s.childList[k].getHeight();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	startX:function(){
		var s=this;
		var v=s.x + s.graphics.startX(),v1;
		for(k in s.childList){
			if(s.childList[k].startX){
				v1=s.x + s.childList[k].startX();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	startY:function(){
		var s=this;
		var v=s.y + s.graphics.startY(),v1;
		for(k in s.childList){
			if(s.childList[k].startY){
				v1=s.y + s.childList[k].startY();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	setBodyMouseJoint:function(value){
		var s = this;
		if(!s.box2dBody)return;
		s.box2dBody.mouseJoint = true;
	},
	clearBody:function(){
		var s = this;
		if(!s.box2dBody)return;
		LGlobal.box2d.removeList.push(s.box2dBody);
		s.box2dBody = null;
	},
	addBodyCircle:function(radius,cx,cy,type,density,friction,restitution){
		var s = this;
		s.rotatex = radius;
		s.rotatey = radius;
		s.box2dBody = LGlobal.box2d.addCircle(
			radius/LGlobal.box2d.drawScale,
			(s.x+cx)/LGlobal.box2d.drawScale,
			(s.y+cy)/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		s.box2dBody.SetUserData(s);
	},
	addBodyPolygon:function(w,h,type,density,friction,restitution){
		var s = this;
		s.rotatex = w/2;
		s.rotatey = h/2;
		s.box2dBody = LGlobal.box2d.addPolygon(
			w*0.5/LGlobal.box2d.drawScale,
			h*0.5/LGlobal.box2d.drawScale,
			s.x/LGlobal.box2d.drawScale,
			s.y/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		s.box2dBody.SetUserData(s);
	},
	addBodyVertices:function(vertices,cx,cy,type,density,friction,restitution){
		var s = this;
		s.rotatex = 0;
		s.rotatey = 0;
		s.box2dBody = LGlobal.box2d.addVertices(vertices,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
				density,friction,restitution);
		s.box2dBody.SetUserData(s);
		s.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((s.x+cx)/LGlobal.box2d.drawScale,(s.y+cy)/LGlobal.box2d.drawScale));
	},
	loopframe:function (){
		var s = this;
		var k = null;
		for(k in s.frameList){
			s.frameList[k](s);
		}
	},
	addChild:function (d){
		var s  = this;
		d.parent = s;
		s.childList.push(d);
		s.resize();
	},
	removeChild:function(d){
		var s  = this;
		for(var i=0;i<s.childList.length;i++){
			if(d.objectindex == s.childList[i].objectindex){
				if(d.die)d.die();
				s.childList.splice(i,1);
				break;
			}
		}
		s.resize();
	},
	getChildAt:function(i){
		var s  = this;
		if(s.childList.length == 0 || s.childList.length <= i)return null;
		return s.childList[i];
	},
	removeChildAt:function(i){
		var s  = this;
		if(s.childList.length >= i)return;
		s.childList[i].die();
		s.childList.splice(i,1);
		s.resize();
	},
	resize:function(){
		var s  = this;
		var sx = 0,sy = 0,ex = 0,ey = 0;
		for(var i=0;i<s.childList.length;i++){
			if(sx > s.childList[i].x){
				sx = s.childList[i].x;
			}
			if(ex < s.childList[i].width + s.childList[i].x){
				ex = s.childList[i].width + s.childList[i].x;
			}
			if(sy > s.childList[i].y){
				sy = s.childList[i].y;
			}
			if(ey < s.childList[i].height + s.childList[i].y){
				ey = s.childList[i].height + s.childList[i].y;
			}
		}
		s.width = ex - sx;
		s.height = ey - sy;
	},
	removeAllChild:function(){
		var s  = this;
		for(var i=0;i<s.childList.length;i++){
			if(s.childList[i].die)s.childList[i].die();
		}
		s.childList.splice(0,s.childList.length);
		s.width = 0;
		s.height = 0;
	},
	addEventListener:function (type,listener){
		var s = this;
		if(type == LEvent.ENTER_FRAME){
			s.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0){
			s.mouseList.push({listener:listener,type:type});
		}else if(type.indexOf("touch")>=0){
			s.mouseList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function (type,listener){
		var s = this;
		var i,length = s.frameList.length;
		for(i=0;i<length;i++){
			if(type == LEvent.ENTER_FRAME && s.frameList[i] == listener){
				s.frameList.splice(i,1);
				break;
			}
		}
		length = s.mouseList.length;
		for(i=0;i<length;i++){
			if(type == s.mouseList[i].type && s.mouseList[i].listener == listener){
				s.mouseList.splice(i,1);
				break;
			}
		}
	},
	mouseEvent:function (e,type,cd){
		if(e==null || e == UNDEFINED)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this;
		if(!s.mouseChildren)return false;
		var i,k,ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		for(k=s.childList.length-1;k>=0;k--){
			if(s.childList[k].mouseEvent){
				i = s.childList[k].mouseEvent(e,type,{x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY,alpha:cd.alpha*s.alpha});
				if(i)return true;
			}
		}
		if(s.mouseList.length == 0){
			return false;
		}
		var i = s.ismouseon(e, cd);
		if(i){
			for(k in s.mouseList){
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
		s.frameList.splice(0,s.frameList.length);
		s.mouseList.splice(0,s.mouseList.length);
		if(s.box2dBody)s.clearBody();
		var k = null,l=s.childList;
		for(k in l){
			if(l[k].die)l[k].die();
		}
	},
	callParent:function(f_n,args){
		args.callee[SUPER][f_n].call(this);
	}
};
for(var k in p)LSprite.prototype[k]=p[k];