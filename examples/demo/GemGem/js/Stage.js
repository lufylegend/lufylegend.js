
function Stage(){
	var self = this;
	base(self,LSprite,[]);
	self.num = 0;
	self.bitmap = [];
	for(var i=0;i<3;i++){
		var bitmap = new LBitmap(new LBitmapData(datalist["num.0"]));
		self.bitmap.push(bitmap);
		bitmap.x = i*30;
		self.addChild(bitmap);
	}
	
}
Stage.prototype.setStage = function (num){
	var self = this;
	self.num = num;
	var numString = "000"+self.num;
	numString = numString.substr(numString.length - 3);
	for(var i=0;i<numString.length;i++){
		self.bitmap[i].bitmapData = new LBitmapData(datalist["num."+numString.substr(i,1)]);
	}
}