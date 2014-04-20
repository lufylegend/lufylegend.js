/**
 * @author lufy
 */
function Star(){
	base(this,LSprite,[]);
	this.init();
}
Star.prototype.init = function(){
	var self = this;
	var Star_bg = new LBitmap(new LBitmapData(dataList["stage"],32*9,32*4,32*5,32));
	self.addChild(Star_bg);
	self.value = 0;
	self.maxValue = 50;
	self.Star_value = new LBitmap(new LBitmapData(dataList["stage"],32*9,32*3,32*5,32));
	self.addChild(self.Star_value);
	self.changeValue(49);
};
Star.prototype.changeValue = function(value){
	var self = this;
	self.value += value;
	self.Star_value.visible = true;
	if(self.value < 0){
		self.value = 0;
		self.Star_value.visible = false;
		return;
	}else if(self.value > self.maxValue){
		self.value = self.maxValue;
	}
	
	self.Star_value.bitmapData.setProperties(32*9,32*3,32*5*self.value/self.maxValue,32);
	if(self.value == self.maxValue && !runCharacter.invincible()){
		runCharacter.spiritCount = 4;
		runCharacter.hero.stop();
		runCharacter.spiritStart();
	}
};