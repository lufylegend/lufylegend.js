/*
* LBitmapData.js
**/
function LBitmapData(image,x,y,width,height,dataType){
	base(this,LObject,[]);
	var s = this;
	s.type = "LBitmapData";
	if(typeof dataType == UNDEFINED){
		dataType = LBitmapData.DATA_IMAGE;
	}
	s.oncomplete = null;
	s._locked=false;
	s._setPixel=false;
	s.x = (x==null?0:x);  
	s.y = (y==null?0:y);
	if(image && typeof image == "object"){
		s.image = image; 
		s.dataType = LBitmapData.DATA_IMAGE;
		s.width = (width==null?s.image.width:width);  
		s.height = (height==null?s.image.height:height);
		s.setDataType(dataType);
	}else{
		s._createCanvas();
		s.dataType = LBitmapData.DATA_CANVAS;
		s._canvas.width = s.width = (width==null?1:width); 
		s._canvas.height = s.height = (height==null?1:height);
		var d = s._context.createImageData(s.width,s.height);
		if(typeof image == "string"){
			image = parseInt(image.replace("#","0x"));
		}
		if(typeof image == "number"){
			for (var i=0;i<d.data.length;i+=4){
				d.data[i+0]=image>>16 & 0xFF;;
				d.data[i+1]=image>>8 & 0xFF;
				d.data[i+2]=image & 0xFF;
				d.data[i+3]=255;
			}
		}
		s._context.putImageData(d,0,0);
		s.image = s._canvas;
		if(dataType == LBitmapData.DATA_IMAGE){
			s.setDataType(dataType);
		}
	}
	s.resize();
}
LBitmapData.DATA_IMAGE = "data_image";
LBitmapData.DATA_CANVAS = "data_canvas";
p = {
	setDataType:function(dataType){
		var s = this;
		if(s.dataType == dataType){
			return;
		}
		if(dataType == LBitmapData.DATA_CANVAS){
			s._createCanvas();
			s._canvas.width = s.image.width;
			s._canvas.height = s.image.height;
			s._context.clearRect(0,0,s._canvas.width,s._canvas.height);
			s._context.drawImage(s.image,0,0);
			s.image = s._canvas;
		}else if(dataType == LBitmapData.DATA_IMAGE){
			s.image = new Image();
			s.image.width = s._canvas.width;
			s.image.height = s._canvas.height;
			s.image.src = s._canvas.toDataURL();
		}
		s.dataType = dataType;
	}
	,_createCanvas:function(){
		var s = this;
		if(!s._canvas){
			s._canvas = document.createElement("canvas");
			s._context = s._canvas.getContext("2d");
		}
	}
	,setProperties:function (x,y,width,height){
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
		return new LBitmapData(s.image,s.x,s.y,s.width,s.height,s.dataType);
	}
	,ready:function(){
		var s = this;
		s._dataType=s.dataType;
		s.setDataType(LBitmapData.DATA_CANVAS);
		s._data = s._context.getImageData(s.x,s.y,s.width,s.height);
	}
	,update:function(){
		var s = this;
		s._context.putImageData(s._data,s.x,s.y,0,0,s.width,s.height);
		s.setDataType(s._dataType);
	}
	,getPixel:function(x,y,colorType){
		var s = this,i,d;
        x = x>>0;
        y = y>>0;
		if(!s._locked)s.ready();
		i = s._canvas.width*4*(s.y + y) + (s.x + x)*4;
		d = s._data.data;
		if(!s._locked)s.update();
		if(colorType == "number"){
			return d[i]<<16 | d[i+1]<<8 | d[i+2]
		}else{
			return [d[i],d[i+1],d[i+2],d[i+3]];
		}
	}
	,getPixels:function(rect){
		var s = this,r;
		if(!s._locked)s.ready();
		r = s._context.getImageData(rect.x,rect.y,rect.width,rect.height);
		if(!s._locked)s.update();
		return r;
	}
	,lock:function(){
		var s = this;
		s._locked=true;
		s.ready();
	}
	,unlock:function(){
		var s = this;
		s._locked=false;
		s.update();
	}
	,setPixel:function(x,y,data){
		var s = this;
        x = x>>0;
        y = y>>0;
		if(!s._locked)s.ready();
		var d = s._data,i = s._canvas.width*4*(s.y + y) + (s.x + x)*4;
		if(typeof data == "object"){
			d.data[i+0]=data[0];
			d.data[i+1]=data[1];
			d.data[i+2]=data[2];
			d.data[i+3]=255;
		}else{
			if(typeof data == "string"){
				data = parseInt(data.replace("#","0x"));
			}
			d.data[i+0]=data>>16 & 0xFF;;
			d.data[i+1]=data>>8 & 0xFF;
			d.data[i+2]=data & 0xFF;
			d.data[i+3]=255;
		}
		if(!s._locked)s.update();
	}
	,setPixels:function(rect, data){
		var s = this,i,j,d,w,sd;
		if(!s._locked)s.ready();
		d = s._data;
		if(typeof data == "object"){
			w = s._canvas.width;
			for(x = rect.x;x<rect.right;x++){
				for(y=rect.y;y<rect.bottom;y++){
					i = w*4*(s.y + y) + (s.x + x)*4;
					j = data.width*4*(y - rect.y) + (x - rect.x)*4;
					d.data[i+0]=data.data[j+0];
					d.data[i+1]=data.data[j+1];
					d.data[i+2]=data.data[j+2];
					d.data[i+3]=255;
				}
			}
		}else{
			if(typeof data == "string"){
				data = parseInt(data.replace("#","0x"));
			}
			data = [data>>16 & 0xFF,data>>8 & 0xFF,data & 0xFF];
			w = s._canvas.width;
			for(x = rect.x;x<rect.right;x++){
				for(y=rect.y;y<rect.bottom;y++){
					i = w*4*(s.y + y) + (s.x + x)*4;
					d.data[i+0]=data[0];
					d.data[i+1]=data[1];
					d.data[i+2]=data[2];
					d.data[i+3]=255;
				}
			}
		}
		if(!s._locked)s.update();
	}
	,draw:function(source){
		var s = this;
		if(s.dataType == LBitmapData.DATA_CANVAS){
			s._context.clearRect(0,0,s.width,s.height);
			s._context.drawImage(source.getDataCanvas(),0,0);
		}else if(s.dataType == LBitmapData.DATA_IMAGE){
			s.image.src = source.getDataURL();
		}
		s.resize();
	},
	resize:function(){
		var s = this,w=s.image.width-s.x,h=s.image.height-s.y;
		s.width = s.width<w?s.width:w;
		s.height = s.height<h?s.height:h;
	}
};
for(var k in p)LBitmapData.prototype[k]=p[k];