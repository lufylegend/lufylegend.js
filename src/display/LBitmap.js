/*
* LBitmap.js
**/
function LBitmap(bitmapdata){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LBitmap";
	s.rotateCenter = true;
	s.bitmapData = bitmapdata; 
	if(s.bitmapData){
		s.width = s.bitmapData.width;
		s.height = s.bitmapData.height;
	}
}
p = {
	_canShow:function(){return (this.visible && this.bitmapData);},
	_rotateReady:function(){
		var s = this;
		if(s.rotate != 0 && s.rotateCenter){
			s.rotatex = s.getWidth()*0.5;
			s.rotatey = s.getHeight()*0.5;
		}else{
			s.rotatex = s.rotatey = 0;
		}
	},
	_coordinate:function(c){},
	_ll_show:function(){
		this.ll_draw();
	},
	ll_draw:function(){
		var s=this;
		LGlobal.canvas.drawImage(s.bitmapData.image,
			s.bitmapData.x,s.bitmapData.y,
			s.bitmapData.width,s.bitmapData.height,
			s.x,s.y,
			s.bitmapData.width,s.bitmapData.height);
	},
	clone:function(){
		var s = this,a = new LBitmap(s.bitmapData.clone());
		a.copyProperty(s);
		a.rotateCenter = s.rotateCenter;
		return a;
	},
	ismouseon:function(e,cood){
		var s = this;
		if(e==null || e == UNDEFINED)return false;
		if(!s.visible || !s.bitmapData)return false;
		if(s.mask && !s.mask.ismouseon(e,cd))return false;
		return s.ismouseonShapes([{type:LShape.RECT,arg:[0,0,s.bitmapData.width,s.bitmapData.height]}],e.offsetX,e.offsetY);
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
	die:function(){}
};
for(var k in p)LBitmap.prototype[k]=p[k];