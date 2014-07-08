function Face(index){
	var self = this;
	base(self,LSprite,[]);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	loader.load(LMvc.IMG_PATH+"face/face-"+index+".png","bitmapData");
}
Face.prototype.loadOver = function(event){
	var self = event.target.parent;
	var bitmapData = new LBitmapData(event.currentTarget);
	var bitmap = new LBitmap(bitmapData);
	self.addChild(bitmap);
};
