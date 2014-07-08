function RemoveObject(){
	base(this,LSprite,[]);
	var self = this;
	self.name = "remove";
	self.index = 0;
	self.bitmap = new LBitmap(new LBitmapData(imglist["remove"]));
	self.addChild(self.bitmap);
}
RemoveObject.prototype.run = function(){
	var self = this;
	if(self.index++ > 20){
		self.parent.removeChild(self);
	}	
}
