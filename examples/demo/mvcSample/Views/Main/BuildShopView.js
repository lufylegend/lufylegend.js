function BuildShopView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
}
BuildShopView.prototype.set=function(){
	var self = this;
	self.x = 340;
	self.y = 210;
	var layer = new LSprite();
	var bitmapOfficial = new LBitmap(new LBitmapData(LMvc.datalist["main-shop"]));
	layer.addChild(bitmapOfficial);
	var name = getStrokeLabel(Language.get("shop"),25,"#FFFFFF","#000000",4);
	name.x = (bitmapOfficial.getWidth() - name.getWidth())*0.5;
	name.y = bitmapOfficial.getHeight() - name.getHeight();
	name.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	layer.addChild(name);
	self.addChild(getBitmap(layer));
	
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
BuildShopView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.shopShow();
};