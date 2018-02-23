/**
 * @author lufy
 */
function HP(){
	base(this,LSprite,[]);
	this.init();
}
HP.prototype.init = function(){
	var self = this;
	var HP_bg = new LBitmap(new LBitmapData(dataList["HP_bg"]));
	HP_bg.x = -15;
	HP_bg.y = -2;
	self.addChild(HP_bg);
	self.value = self.maxValue = 100;
	self.HP_value = new LBitmap(new LBitmapData(dataList["HP_value"]));
	self.addChild(self.HP_value);
};
HP.prototype.changeValue = function(value){
	var self = this;
	self.value += value;
	if(self.value < 1){
		self.value = 1;
	}else if(self.value > 100){
		self.value = 100;
	}
	self.HP_value.scaleX = self.value/self.maxValue;
};