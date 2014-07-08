
function Point(){
	var self = this;
	base(self,LSprite,[]);
	self.num = 0;
	self.bitmap = [];
	for(var i=0;i<8;i++){
		var bitmap = new LBitmap(new LBitmapData(datalist["num.0"]));
		self.bitmap.push(bitmap);
		bitmap.x = i*30;
		self.addChild(bitmap);
	}
	
}
Point.prototype.setPoint = function (num){
	var self = this;
	self.num = num;
	var numString = "00000000"+self.num;
	numString = numString.substr(numString.length - 8);
	for(var i=0;i<numString.length;i++){
		self.bitmap[i].bitmapData = new LBitmapData(datalist["num."+numString.substr(i,1)]);
	}
}