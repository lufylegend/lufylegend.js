/**
 * @author lufy
 */
function Num(direction,index,num_width){
	var self = this;
	base(self,LSprite,[]);
	self.num_width = num_width;
	self.init(direction,index);
}
Num.LEFT = "num_left";
Num.RIGHT = "num_right";
Num.MIDDLE = "num_middle";
Num.prototype.init = function(direction,index){
	var self = this;
	self.direction = direction;
	self.dataList = [];
	for(var i=0;i<10;i++){
		self.dataList.push(new LBitmapData(LMvc.datalist["num-"+index+"-"+i]));
	}
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
	}
	var sx,numBitmap;
	if(self.direction == Num.LEFT){
		sx = -length*self.num_width;
	}else if(self.direction == Num.RIGHT){
		sx = -self.num_width;
	}else{
		sx = -length*self.num_width*0.5;
	}
	for(var i=0,l=length;i<l;i++){
		if(i >= self.childList.length){
			numBitmap = new LBitmap(self.dataList[0]);
			self.addChild(numBitmap);
		}
		numBitmap = self.childList[i];
		sx += self.num_width;
		numBitmap.x = sx;
	}
};
