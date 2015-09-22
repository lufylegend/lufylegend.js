function BuildOfficialView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
}
BuildOfficialView.prototype.set=function(){
	var self = this;
	self.x = 130;
	self.y = 100;
	var layer = new LSprite();
	var bitmapOfficial = new LBitmap(new LBitmapData(LMvc.datalist["main-official"]));
	layer.addChild(bitmapOfficial);
	var name = getStrokeLabel(Language.get("official") + " Lv.2",25,"#FFFFFF","#000000",4);
	name.x = (bitmapOfficial.getWidth() - name.getWidth())*0.5;
	name.y = bitmapOfficial.getHeight() - name.getHeight();
	name.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	layer.addChild(name);
	self.addChild(getBitmap(layer));
	
	//self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
BuildOfficialView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.officialShow();
};