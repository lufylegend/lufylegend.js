/*
* LBitmapData.js
**/
function LBitmapData(image,x,y,width,height){
	base(this,LObject,[]);
	var s = this;
	s.type = "LBitmapData";
	s.oncomplete = null;
	s._locked=false;
	s._setPixel=false;
	s.x = (x==null?0:x);  
	s.y = (y==null?0:y);
	if(image && typeof image == "object"){
		s.image = image; 
		s.width = (width==null?s.image.width:width);  
		s.height = (height==null?s.image.height:height);
	}else{
		s.image = new Image();	
		s.width = (width==null?1:width); 
		s.height = (height==null?1:height);
		var o = LGlobal._canvas,c = LGlobal._context;
		o.width = s.width;
		o.height = s.height;
		c.clearRect(0,0,s.width,s.height);
		if(typeof image == "string"){
			c.fillStyle = image;
			c.fillRect(0,0,s.width,s.height);
		}
		s.image.src = o.toDataURL();
	}
}
p = {
	setProperties:function (x,y,width,height){
		var s = this;
		s.x = x;
		s.y = y;
		s.width = width;
		s.height = height;
		s.resize();
	}
	,setCoordinate:function (x,y){
		var s = this;
		s.x = x;
		s.y = y;
		s.resize();
	}
	,clone:function(){
		var s = this;
		return new LBitmapData(s.image,s.x,s.y,s.width,s.height);
	}
	,ready:function(){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		o.width = s.width;
		o.height = s.height;
		c.clearRect(0,0,s.width,s.height);
		c.drawImage(s.image,0,0,s.width,s.height);
	}
	,getPixel:function(x,y){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		if(!s._locked)s.ready();
		return c.getImageData(x,y,1,1).data;
	}
	,getPixels:function(rect){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		if(!s._locked)s.ready();
		return c.getImageData(rect.x,rect.y,rect.width,rect.height);
	}
	,lock:function(){
		var s = this;
		s.ready();
		s._locked=true;
	}
	,unlock:function(){
		var s = this;
		if(s._setPixel)s.image.src = LGlobal._canvas.toDataURL();
		s._locked=false;
		s._setPixel=false;
	}
	,setPixel:function(x,y,data){
		var s = this;
		if(!s._locked)s.ready();
		var c = LGlobal._context;
		c.fillStyle = 'rgb('+data[0]+', '+data[1]+', '+data[2]+')';
		c.fillRect(x,y,1,1);
		s._setPixel=true;
	}
	,setPixels:function(rect, img){
		var s = this;
		if(!s._locked)s.ready();
		LGlobal._context.putImageData(img, rect.x, rect.y,0,0,rect.width,rect.height);
		s._setPixel=true;
	}
	,draw:function(source){
		var s = this;
		s.image.src = source.getDataURL();
		s.resize();
	},
	resize:function(){
		var s = this,w=s.image.width-s.x,h=s.image.height-s.y;
		s.width = s.width<w?s.width:w;
		s.height = s.height<h?s.height:h;
	},
	toString:function(){
		return "[LBitmapData]";
	}
};
for(var k in p)LBitmapData.prototype[k]=p[k];