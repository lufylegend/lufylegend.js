
function Bullet(x,y,flag){
	var self = this;
	base(self,LSprite,[]);
	self.x = x;
	self.y = y;
	self.flag = flag;
	self.bitmap = new LBitmap(new LBitmapData(datalist["clear"]));
	self.bitmap.scaleX = 0.4;
	self.bitmap.scaleY = 0.4;
	self.bitmap.x = self.bitmap.y = (60 - self.bitmap.getWidth()) * 0.5;
	self.addChild(self.bitmap);
	
}
Bullet.prototype.onframe = function (){
	var self = this;
	self.bitmap.scaleX += 0.2;
	self.bitmap.scaleY = self.bitmap.scaleX;
	self.bitmap.x = self.bitmap.y = (60 - self.bitmap.getWidth()) * 0.5;
	if(self.bitmap.scaleX > 1){
		self.bitmap.alpha -= 0.2;
	}
	if(self.bitmap.alpha <= 0 && self.flag){
		clearBullet();
	}
}