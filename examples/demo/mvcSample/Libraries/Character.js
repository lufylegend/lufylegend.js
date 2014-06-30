function Character(chara,index){
	var self = this;
	base(self,LSprite,[]);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	loader.load(LMvc.IMG_PATH+"character/"+chara+"-"+index+".png","bitmapData");
}
Character.prototype.loadOver = function(event){
	var self = event.currentTarget.parent;
	var bitmapData = new LBitmapData(event.target);
	var bitmap = new LBitmap(bitmapData);
	self.addChild(bitmap);
};
