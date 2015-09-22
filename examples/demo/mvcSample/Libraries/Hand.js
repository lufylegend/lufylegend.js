function Hand(){
	var self = this;
	base(self,LSprite,[]);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	loader.load(LMvc.IMG_PATH+"common/click_hand.png","bitmapData");
}
Hand.prototype.loadOver = function(event){
	var self = event.currentTarget.parent;
	var bitmapData = new LBitmapData(event.target,0,0,105,109);
	
	var list = LGlobal.divideCoordinate(630,109,1,6);
	self.effect = new LAnimation(self,bitmapData,list);
	self.speed = 2;
	self.speedIndex = 0;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
Hand.prototype.onframe=function(event){
	var self = event.currentTarget;
	if(self.speedIndex++ <self.speed)return;
	self.speedIndex = 0;
	self.effect.onframe();
};