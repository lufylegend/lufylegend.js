function EquipmentsChildView(controller,equipmentModel){
	var self = this;
	base(self,LView,[controller]);
	self.equipmentModel = equipmentModel;
	self.set();
}
EquipmentsChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
EquipmentsChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var layer = new LSprite();
	self.layer.addChild(layer);
	
	var width = 100, height = 100;
	var equipment = self.equipmentModel.icon(new LPoint(width,height));
	layer.addChild(equipment);
	
	
	//var bitmapData = new LBitmapData(LMvc.datalist["win06"]);
	//var panel = new LPanel(bitmapData,width,height);
	/*
	var lblCount = getStrokeLabel(self.equipmentModel.count(),25,"#FFFFFF","#000000",3);
	lblCount.x = width - 5 - lblCount.getWidth();
	lblCount.y = 5;
	layer.addChild(lblCount);
	*/
	//layer.addChild(getBitmap(panel));
};