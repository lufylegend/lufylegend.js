/**
 * @author lufy
 */
function Num(direction){
	base(this,LSprite,[]);
	this.init(direction);
}
Num.LEFT = "num_left";
Num.RIGHT = "num_right";
Num.prototype.init = function(direction){
	var self = this;
	self.direction = direction;
	self.dataList = [
		new LBitmapData(dataList["num_0"]),
		new LBitmapData(dataList["num_1"]),
		new LBitmapData(dataList["num_2"]),
		new LBitmapData(dataList["num_3"]),
		new LBitmapData(dataList["num_4"]),
		new LBitmapData(dataList["num_5"]),
		new LBitmapData(dataList["num_6"]),
		new LBitmapData(dataList["num_7"]),
		new LBitmapData(dataList["num_8"]),
		new LBitmapData(dataList["num_9"])
	];
	self.list = [];
	self.setValue(0);
};
Num.prototype.setValue = function(value){
	var self = this;
	self.value = value;
	var strValue = self.value.toString(),numBitmap,sx;
	if(self.childList.length != strValue.length){
		self.setList(strValue.length);
	}
	
	for(var i=0,l=strValue.length;i<l;i++){
		numBitmap = self.childList[i];
		numBitmap.bitmapData = self.dataList[parseInt(strValue.charAt(i))];
	}
};
Num.prototype.setList = function(length){
	var self = this;
	if(self.childList.length > length){
		self.childList.splice(length - 1,self.childList.length - length);
		return;
	}
	var sx,numBitmap;
	if(self.direction == Num.LEFT){
		sx = -length*20;
	}else{
		sx = -20;
	}
	for(var i=0,l=length;i<l;i++){
		if(i >= self.childList.length){
			numBitmap = new LBitmap(self.dataList[0]);
			self.addChild(numBitmap);
		}
		numBitmap = self.childList[i];
		sx += 20;
		numBitmap.x = sx;
	}
};
