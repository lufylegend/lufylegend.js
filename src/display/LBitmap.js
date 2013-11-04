/*
* LBitmap.js
**/
function LBitmap(bitmapdata){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LBitmap";
	s.x = 0;  
	s.y = 0;  
	s.width = 0;  
	s.height = 0;  
	s.scaleX=1;
	s.scaleY=1;
	s.alpha = 1;
	s.visible=true;
	s.rotate = 0;
	s.rotateCenter = true;
	s.bitmapData = bitmapdata; 
	if(s.bitmapData){
		s.width = s.bitmapData.width;
		s.height = s.bitmapData.height;
	}
}
p = {
	show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s.visible || !s.bitmapData)return;
		c.save();
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}
		if(s.filters){
			s.setShadow();
		}
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}
		//scale
		s._transformScale();
		//rotate
		if(s.rotate != 0 && s.rotateCenter){
			s.rotatex = s.getWidth()*0.5;
			s.rotatey = s.getHeight()*0.5;
		}else{
			s.rotatex = s.rotatey = 0;
		}
		s._transformRotate();
		s.draw();
		c.restore(); 
	},
	draw:function(){
		var s=this;
		LGlobal.canvas.drawImage(s.bitmapData.image,
			s.bitmapData.x,s.bitmapData.y,
			s.bitmapData.width,s.bitmapData.height,
			s.x,s.y,
			s.bitmapData.width,s.bitmapData.height);
	},
	clone:function(){
		var s = this,a = new LBitmap(s.bitmapData.cline());
		a.copyProperty(s);
		a.rotateCenter = s.rotateCenter;
		return a;
	},
	ismouseon:function(e,cood){
		var s = this;
		if(e==null || e == UNDEFINED)return false;
		if(!s.visible || !s.bitmapData)return false;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1};
		var ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		if(ox >= s.x + cood.x && ox <= s.x + cood.x + s.bitmapData.width*s.scaleX*cood.scaleX && 
			oy >= s.y + cood.y && oy <= s.y + cood.y + s.bitmapData.height*s.scaleY*cood.scaleY){
			return true;
		}else{
			return false;
		}
	},
	getWidth:function(){
		var s = this;
		return s.bitmapData != null?s.bitmapData.width*(s.scaleX>0?s.scaleX:-s.scaleX):0;
	},
	getHeight:function(){
		var s = this;
		return s.bitmapData != null?s.bitmapData.height*(s.scaleY>0?s.scaleY:-s.scaleY):0;
	},
	startX:function(){
		return this.x;
	},
	startY:function(){
		return this.y;
	},
	toString:function(){
		return "[LBitmap]";
	}
};
for(var k in p)LBitmap.prototype[k]=p[k];