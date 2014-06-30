function Effect02(controllerClass){
	var self = this;
	base(self,LSprite,[]);
	self.controllerClass = controllerClass;
	self.index = 1;
	self.length = 21;
	self.init();
}
Effect02.prototype.init=function(){
	var self = this;
	var list = LGlobal.divideCoordinate(1350,150,1,6);
	self.effect = new LAnimation(self,new LBitmapData(LMvc.datalist["effect02"],0,0,225,150),list);
	self.effect.addEventListener(LEvent.COMPLETE,self.onEffectComplete);
	self.speed = 0;
	self.speedIndex = 0;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
Effect02.prototype.onframe=function(event){
	var self = event.target;
	if(self.speedIndex++ <self.speed)return;
	self.speedIndex = 0;
	console.log(self.effect);
	self.effect.onframe();
};
Effect02.prototype.onEffectComplete=function(event){
	var self = event.target.parent;
	self.removeEventListener(LEvent.ENTER_FRAME, self.onframe);
	self.dispatchEvent(LEvent.COMPLETE);
};
