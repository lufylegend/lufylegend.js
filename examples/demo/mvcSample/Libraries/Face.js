function Face(path,rect){
	var self = this;
	base(self,LSprite,[]);
	self.type = "Face";
	self.rect = rect;
	self.layer = new LSprite();
	self.addChild(self.layer);
	if(typeof path == "string"){
		loader = new LLoader();
		loader.parent = self;
		loader.addEventListener(LEvent.COMPLETE,self.loadOver);
		loader.load(path,"bitmapData");
	}else{
		var bitmapData = new LBitmapData(path);
		self.bitmapData = bitmapData;
		self.set(bitmapData);
	}
}
Face.prototype.loadOver = function(event){
	var self = event.currentTarget.parent;
	var bitmapData = new LBitmapData(event.target);
	self.set(bitmapData);
};
Face.prototype.set = function(bitmapData){
	var self = this;
	if(self.rect){
		bitmapData.setProperties(self.rect[0],self.rect[1],self.rect[2],self.rect[3]);
	}
	var bitmap = new LBitmap(bitmapData);
	self.layer.addChild(bitmap);
	self.dispatchEvent(LEvent.COMPLETE);
};
