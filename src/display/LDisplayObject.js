/*
 * LDisplayObject.js
 **/
function LDisplayObject(){
	var s = this;
	base(s,LEventDispatcher,[]);
	s.x = 0;  
	s.y = 0;  
	s.width = 0;  
	s.height = 0;  
	s.scaleX=1;
	s.scaleY=1;
	s.alpha = 1;
	s.visible=true;
	s.rotate = 0;
	s.mask = null;
	s.blendMode = null;
}
p = {
	show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s._canShow())return;
		c.save();
		s._showReady(c);
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}
		if(s.filters){
			s.setShadow();
		}
		s._rotateReady();
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}
		//rotate
		s._transformRotate();
		//scale
		s._transformScale();
		//x,y
		s._coordinate(c);
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		s._show(c);
		c.restore();
		s.loopframe();
	},
	_canShow:function(){return this.visible;},
	_coordinate:function(c){
		var s = this;
		if(s.x != 0 || s.y != 0)c.transform(1,0,0,1,s.x,s.y);
	},
	_rotateReady:function(){},
	_showReady:function(c){},
	_show:function(c){},
	loopframe:function(){},
	setShadow:function(){
		var s=this,f=s.filters;
		if(!f)return;
		for(var i=0,l=f.length;i<l;i++)f[i].show();
	},
	_transformRotate:function(){
		var s = this;
		if(s.rotate == 0)return;
		var c = LGlobal.canvas,rotateFlag = Math.PI / 180,rotateObj = new LMatrix();
		if((typeof s.rotatex) == UNDEFINED){
			s.rotatex=s.rotatey=0;
		}
		if(s.box2dBody)rotateFlag=1;
		rotateObj.a = Math.cos(s.rotate * rotateFlag);
		rotateObj.b = Math.sin(s.rotate * rotateFlag);
		rotateObj.c = -rotateObj.b;
		rotateObj.d = rotateObj.a;
		rotateObj.tx = s.x + s.rotatex;
		rotateObj.ty = s.y + s.rotatey;
		rotateObj.transform(c).setTo(1,0,0,1,-rotateObj.tx,-rotateObj.ty).transform(c);
	},
	_transformScale:function(){
		var s = this,c = LGlobal.canvas;
		if(s.scaleX == 1 && s.scaleY == 1)return;
		var scaleObj = new LMatrix();
		if(s.scaleX != 1)scaleObj.tx = s.x;
		if(s.scaleY != 1)scaleObj.ty = s.y;
		scaleObj.a = s.scaleX;
		scaleObj.d = s.scaleY;
		scaleObj.transform(c).setTo(1,0,0,1,-scaleObj.tx,-scaleObj.ty).transform(c);
	},
	copyProperty:function(a){
		var s = this;
		for(var k in a){
			if(typeof a[k] == "number" || typeof a[k] == "string" || typeof a[k] == "boolean"){
				if(k == "objectindex" || k == "objectIndex"){continue;}
				s[k] = a[k];
			}
		}
		if(a.mask)s.mask = a.mask.clone();
	},
	getAbsoluteScale:function(){
		var s = this;
		var sX=s.scaleX,sY=s.scaleY;
		var p = s.parent;
		while(p != "root"){
	        sX *= p.scaleX;
	        sY *= p.scaleY;
			p = p.parent;
		}
		return {scaleX:sX,scaleY:sY};
	},
	getRootCoordinate:function(){
		var s = this;
		var sx=s.x,sy=s.y;
		var p = s.parent;
		while(p != "root"){
	        sx *= p.scaleX;
	        sy *= p.scaleY;
			sx += p.x;
			sy += p.y;
			p = p.parent;
		}
		return new LPoint(sx,sy);
	},
	getBounds:function(d){
		if(typeof d == UNDEFINED)return new LRectangle(0,0,0,0);
		var s = this,x=0,y=0,w=0,h=0;
		if(s.objectIndex != d.objectIndex){
			var sp = s.getRootCoordinate();
			var dp = d.getRootCoordinate();
			x = sp.x - dp.x;
			y = sp.y - dp.y;
		}
		if(d.getWidth)w=d.getWidth();
		if(d.getHeight)h=d.getHeight();
		return new LRectangle(x,y,w,h);
	},
	getDataURL:function(){
		var s = this,_o,o,_c,c;
		o = LGlobal.canvasObj,c = LGlobal.canvas;
		_o = LGlobal._canvas,_c = LGlobal._context;
		s.width = s.getWidth();
		s.height = s.getHeight();
		_o.width = s.width;
		_o.height = s.height;
		_c.clearRect(0,0,s.width,s.height);
		LGlobal.canvasObj = LGlobal._canvas;
		LGlobal.canvas = LGlobal._context;
		s.show();
		var data = LGlobal.canvasObj.toDataURL();
		LGlobal._canvas = _o;
		LGlobal._context = _c;
		LGlobal.canvasObj = o;
		LGlobal.canvas = c;
		return data;
	},
	remove:function(){
		var s = this;
		if(!s.parent)return;
		s.parent.removeChild(s);
	}
};
for(var k in p)LDisplayObject.prototype[k]=p[k];