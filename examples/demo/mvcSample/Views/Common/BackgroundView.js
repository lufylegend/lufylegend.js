function BackgroundView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
}
BackgroundView.prototype.set = function(bitmapData,dragRange){
	var self = this;
	self.map = new LBitmap(bitmapData);
	self.addChild(self.map);

	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
BackgroundView.prototype.onframe = function(event){
	var self = event.currentTarget;
	var point = self.getRootCoordinate();
	self.map.x = -point.x;
	self.map.y = -point.y;
	self.map.bitmapData.setProperties(self.map.x,self.map.y,LGlobal.width,LGlobal.height);
};