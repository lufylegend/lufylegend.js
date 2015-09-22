function BuildTavernView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
}
BuildTavernView.prototype.set=function(){
	var self = this;
	self.x = 270;
	self.y = 350;
	var layer = new LSprite();
	var bitmapTavern = new LBitmap(new LBitmapData(LMvc.datalist["main-tavern"]));
	layer.addChild(bitmapTavern);
	
	var name = getStrokeLabel(Language.get("tavern"),25,"#FFFFFF","#000000",4);
	name.x = (bitmapTavern.getWidth() - name.getWidth())*0.5;
	name.y = bitmapTavern.getHeight() - name.getHeight();
	name.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	layer.addChild(name);
	self.addChild(getBitmap(layer));
	
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
BuildTavernView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.tavernShow();
};