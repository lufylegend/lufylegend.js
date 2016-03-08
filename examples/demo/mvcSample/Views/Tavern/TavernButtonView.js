function TavernButtonView(controller,index,ingot,liqueur){
	var self = this;
	base(self,LView,[controller]);
	self.ingot = ingot;
	self.liqueur = liqueur;
	self.set(index,name);
}
TavernButtonView.prototype.set=function(index){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["tavern-tavernButton"],index*120,0,120,265);
	var bitmap = new LBitmap(bitmapData);
	self.addChild(bitmap);
	
	var bitmapDataIngot = new LBitmapData(LMvc.datalist["icon-header"],0,0,40,40);
	var bitmapIngot = new LBitmap(bitmapDataIngot);
	bitmapIngot.x = 20;
	bitmapIngot.y = 20;
	self.addChild(bitmapIngot);
	var label = getStrokeLabel(self.ingot,15,"#FFFFFF","#000000",2);
	label.x = bitmapIngot.x + bitmapIngot.getWidth();
	label.y = bitmapIngot.y + (bitmapIngot.getHeight() - label.getHeight())*0.5;
	self.addChild(label);
	var lblLiquor = getStrokeLabel(self.liqueur,20,"#FFFFFF","#000000",4);
	lblLiquor.x = (bitmap.getWidth() - lblLiquor.getWidth())*0.5;
	lblLiquor.y = bitmap.getHeight() - 50;
	self.addChild(lblLiquor);
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
TavernButtonView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.view.getConfirm(self.ingot,self.liqueur);
	//self.controller.getCharacter();
	
	//self.controller.view.getCharacter();
};