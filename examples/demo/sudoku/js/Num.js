function Num(value,func){
	base(this,LSprite,[]);
	var self = this;
	self.value = value;
	var bitmap;
	if(value > 0){
		bitmap = new LBitmap(new LBitmapData(imglist["num_back"]));
	}else{
		bitmap = new LBitmap(new LBitmapData(imglist["focus"]));
	}
	self.addChild(bitmap);
	self.num = new LBitmap(new LBitmapData(imglist["num."+self.value]));
	self.num.x = 10;
	self.num.y = 7;
	self.addChild(self.num);
	if(self.value == 0)self.num.alpha = 0;
	if(func)self.addEventListener(LMouseEvent.MOUSE_UP,func);
};
Num.prototype.changeValue = function(value){
	var self = this;
	self.value = value;
	self.num.bitmapData = new LBitmapData(imglist["num."+self.value]);
	if(self.value == 0){
		self.num.alpha = 0;
	}else{
		self.num.alpha = 1;
	}
}