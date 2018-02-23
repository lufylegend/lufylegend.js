function HpBar(maxHp){
	var self = this;
	base(self,LSprite,[]);
	self.hp = self.maxHp = maxHp;
	self.maxLength = 46;
	self.step = 3;
	var backBitmapData = new LBitmapData(LMvc.datalist["hpBar"],0,0,48,5);
	var animeBitmapData = new LBitmapData(LMvc.datalist["hpBar"],51,0,3,3);
	var hpBitmapData = new LBitmapData(LMvc.datalist["hpBar"],48,0,3,3);
	var backBitmap = new LBitmap(backBitmapData);
	self.addChild(backBitmap);
	var animeBitmap = new LBitmap(animeBitmapData);
	animeBitmap.x = animeBitmap.y = 1;
	animeBitmap.scaleX = self.maxLength/self.step;
	self.addChild(animeBitmap);
	animeBitmap.visible = false;
	self.animeBitmap = animeBitmap;
	var hpBitmap = new LBitmap(hpBitmapData);
	hpBitmap.x = hpBitmap.y = 1;
	hpBitmap.scaleX = self.maxLength/self.step;
	self.hpBitmap = hpBitmap;
	self.addChild(hpBitmap);
	
}
HpBar.prototype.change = function(value){
	var self = this;return;
	if(value == 0)return;
	self.hp += value;
	if(value > 0){
		
	}else{
		if(self.hp < 0)self.hp = 0;
		self.hpBitmap.scaleX = (self.maxLength*self.hp)/(self.maxHp*self.step);
	}
	LTweenLite.to(self.animeBitmap,1,{scaleX:self.hpBitmap.scaleX});
};