
function Gem(num){
	var self = this;
	base(self,LSprite,[]);
	self.num = num;
	self.bitmap = new LBitmap(new LBitmapData(datalist["gem0"+num]));
	self.bitmap.x=self.bitmap.y=10;
	self.addChild(self.bitmap);
	
}
Gem.prototype.change = function (num){
	var self = this;
	self.num = num;
	self.bitmap.bitmapData = new LBitmapData(datalist["gem0"+num]);
}