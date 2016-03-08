function ItemsChildView(controller,itemModel){
	var self = this;
	base(self,LView,[controller]);
	self.itemModel = itemModel;
	self.set();
}
ItemsChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
ItemsChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var layer = new LSprite();
	self.layer.addChild(layer);
	
	var width = 100, height = 100;
	var item = self.itemModel.icon(new LPoint(width,height));
	layer.addChild(item);
};