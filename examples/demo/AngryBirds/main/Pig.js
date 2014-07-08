function Pig(){
	base(this,LSprite,[]);
	var self = this;
	self.hp = 200;
	self.name = "pig";
	self.list = ["pig01","pig02"];
	self.bitmap = new LBitmap(new LBitmapData(imglist[self.list[0]]));
	self.addChild(self.bitmap);
	self.addBodyCircle(24,self.bitmap.getHeight()*0.5,self.bitmap.getWidth()*0.5,1,5,.4,.13);
}
Pig.prototype.hit = function(value){
	var self = this;
	if(value < 10)return;
	if(self.hp == 200)self.bitmap.bitmapData = new LBitmapData(imglist[self.list[1]]);
	self.hp -= value;
}
