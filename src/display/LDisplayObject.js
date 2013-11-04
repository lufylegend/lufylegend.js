/*
 * LDisplayObject.js
 **/
function LDisplayObject(){
	base(this,LEventDispatcher,[]);
	this.blendMode = null;
}
p = {
	setShadow:function(){
		var s=this,f=s.filters;
		if(!f)return;
		for(var i=0,l=f.length;i<l;i++)f[i].show();
	},
	_transformRotate:function(){
		var s = this;
		if(s.rotate == 0)return;
		var c = LGlobal.canvas,rotateFlag = Math.PI / 180,rotateObj = new LMatrix();
		if((typeof s.rotatex) == "undefined"){
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
				s[k] = a[k];
			}
		}
		if(a.mask)s.mask = a.mask.clone();
	},
	getRootCoordinate:function(){
		var s = this;
		var sx=s.x,sy=s.y;
		var p = s.parent;
		while(p != "root"){
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
	toString:function(){
		return "[LDisplayObject]";
	}
};
for(var k in p)LDisplayObject.prototype[k]=p[k];