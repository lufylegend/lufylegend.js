function Tutorial08View(){
	base(this,LView,[]);
}
Tutorial08View.prototype.construct=function(){
};
Tutorial08View.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	var bitmapBgBack = new LBitmap(new LBitmapData(LMvc.datalist["attack_back"]));
	self.backLayer.addChild(bitmapBgBack);
	self.addArms();
};

Tutorial08View.prototype.addArms=function(){
	var self = this,i,l,arms = self.model.arms,arm,data;
	console.log("arms.length"+arms.length);
	self.arms = [];
	for(i=0,l=arms.length;i<l;i++){
		data = arms[i];
		arm = new AttackCharacter(data.index);
		arm.x = data.x;
		arm.y = data.y;
		arm.anime.gotoAndPlay(data.action);
		self.backLayer.addChild(arm);
		self.arms.push(arm);
	}
	
};