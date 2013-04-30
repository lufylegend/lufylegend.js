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
	s.bitmapData = bitmapdata; 
	if(s.bitmapData){
		s.width = s.bitmapData.width;
		s.height = s.bitmapData.height;
	}
}
p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1};
		var s = this,c = LGlobal.canvas,a = s.alpha*cood.alpha;
		if(!s.visible || !s.bitmapData)return;
		s.save = false;

		if(a < 1 || s.rotate != 0 || s.scaleX == -1 || s.scaleY == -1 || s.filters){
			c.save();  
			s.save = true;
		} 
		if(s.filters)s.setShadow();
		if(s.rotate != 0){
			var rx,ry ;
			rx = cood.x + s.x+s.bitmapData.width*s.scaleX*cood.scaleX/2;
			ry = cood.y + s.y+s.bitmapData.height*s.scaleY*cood.scaleY/2;
			c.translate( rx, ry); 
			c.rotate(s.rotate * Math.PI / 180);
			c.translate(0-rx,0-ry);
			if(a < 1)c.globalAlpha = a;
			s.draw(cood);
		}else{
			if(a < 1)c.globalAlpha = a;
			s.draw(cood);
		}
		if(s.save)c.restore(); 
	},
	draw:function(cood){
		var s=this,c=LGlobal.canvas;
		if(s.scaleX == -1 || s.scaleY == -1){
			s.tX = (s.scaleX == -1)?-1:1;
			s.tY = (s.scaleY == -1)?-1:1;
			c.translate(cood.x + s.x , cood.y + s.y);
			c.scale(s.tX,s.tY);
			c.translate(-(cood.x + s.x + (s.tX==1?0:s.bitmapData.width)), -(cood.y + s.y + (s.tY==1?0:s.bitmapData.height)));
			c.drawImage(s.bitmapData.image,
				s.bitmapData.x,s.bitmapData.y,s.bitmapData.width,s.bitmapData.height,
				(cood.x + s.x),
				(cood.y + s.y),
				s.bitmapData.width*cood.scaleX,
				s.bitmapData.height*cood.scaleY);
		}else{
			c.drawImage(s.bitmapData.image,
				s.bitmapData.x,s.bitmapData.y,
				s.bitmapData.width,s.bitmapData.height,
				cood.x + s.x,cood.y + s.y,
				s.bitmapData.width*s.scaleX*cood.scaleX,s.bitmapData.height*s.scaleY*cood.scaleY);
		}
	},
	ismouseon:function(e,cood){
		var s = this;
		if(cood==null)cood={x:0,y:0};
		if(e==null || e == UNDEFINED)return false;
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
	callParent:function(f_n,args){
		args.callee[SUPER][f_n].call(this);
	}
};
for(var k in p)LBitmap.prototype[k]=p[k];