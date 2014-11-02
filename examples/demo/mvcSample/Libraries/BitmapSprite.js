function BitmapSprite(src){
	var self = this;
	base(self,LSprite,[]);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	loader.load(LMvc.IMG_PATH+src,"bitmapData");
}
BitmapSprite.prototype.loadOver = function(event){
	var self = event.currentTarget.parent;
	self.addChild(new LBitmap(new LBitmapData(event.target)));
};