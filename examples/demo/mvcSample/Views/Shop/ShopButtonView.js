function ShopButtonView(controller,index,ingot,money){
	var self = this;
	base(self,LView,[controller]);
	self.ingot = ingot;
	self.money = money;
	self.set(index);
}
ShopButtonView.prototype.set=function(index){
	var self = this;
	var layer = new LSprite();
	var bitmap = self.getIngotBitmap(index);
	bitmap.x = 0;
	bitmap.y = 20;
	layer.addChild(bitmap);
	var name = getStrokeLabel(self.ingot + "元宝",13,"#FF0000","#000000",2);
	name.x = (bitmap.getWidth() - name.getWidth()) * 0.5;
	layer.addChild(name);
	var label = getStrokeLabel(self.money + "元",13,"#FFFFFF","#000000",2);
	label.x = (bitmap.getWidth() - label.getWidth()) * 0.5;
	label.y = bitmap.y + bitmap.getHeight();
	label.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	layer.addChild(label);
	
	self.addChild(getBitmap(layer));
	return;
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
ShopButtonView.prototype.getIngotBitmap=function(index){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["icon-ingot"],index*100,0,100,100);
	var bitmap = new LBitmap(bitmapData);
	return bitmap;
};
ShopButtonView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.view.getConfirm(self.ingot,self.liqueur);
	//self.controller.getCharacter();
	
	//self.controller.view.getCharacter();
};