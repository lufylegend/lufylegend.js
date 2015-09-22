function MenuListView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
}
MenuListView.prototype.set=function(){
	var self = this;
	var translucentData = new LBitmapData(LMvc.datalist["translucent"]);
	var translucent = new LBitmap(translucentData);
	translucent.scaleX = LGlobal.width / translucentData.width;
	translucent.scaleY = LGlobal.height / translucentData.height;
	self.addChild(translucent);
	
	var charaSprite = new LSprite();
	charaSprite.x = 35;
	charaSprite.y = 35;
	self.addChild(charaSprite);
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	charaSprite.addChild(bitmap);
	var name = getStrokeLabel("武将",15,"#FFFFFF","#000000",2);
	name.x = (bitmap.getWidth() - name.getWidth()) * 0.5;
	name.y = (bitmap.getHeight() - name.getHeight()) * 0.5;
	charaSprite.addChild(name);
	charaSprite.addEventListener(LMouseEvent.MOUSE_UP,self.clickChara);
	
	var equipmentSprite = new LSprite();
	equipmentSprite.x = 140;
	equipmentSprite.y = 35;
	self.addChild(equipmentSprite);
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	equipmentSprite.addChild(bitmap);
	var name = getStrokeLabel("装备",15,"#FFFFFF","#000000",2);
	name.x = bitmap.x + (bitmap.getWidth() - name.getWidth()) * 0.5;
	name.y = bitmap.y + (bitmap.getHeight() - name.getHeight()) * 0.5;
	equipmentSprite.addChild(name);
	equipmentSprite.addEventListener(LMouseEvent.MOUSE_UP,self.clickEquipment);
	
	var itemSprite = new LSprite();
	itemSprite.x = 350;
	itemSprite.y = 35;
	self.addChild(itemSprite);
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	itemSprite.addChild(bitmap);
	var name = getStrokeLabel("道具",15,"#FFFFFF","#000000",2);
	name.x = (bitmap.getWidth() - name.getWidth()) * 0.5;
	name.y = (bitmap.getHeight() - name.getHeight()) * 0.5;
	itemSprite.addChild(name);
	itemSprite.addEventListener(LMouseEvent.MOUSE_UP,self.clickItems);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 35;
	bitmap.y = 140;
	self.addChild(bitmap);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 140;
	bitmap.y = 140;
	self.addChild(bitmap);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 245;
	bitmap.y = 140;
	self.addChild(bitmap);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 350;
	bitmap.y = 140;
	self.addChild(bitmap);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 35;
	bitmap.y = 245;
	self.addChild(bitmap);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 140;
	bitmap.y = 245;
	self.addChild(bitmap);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 245;
	bitmap.y = 245;
	self.addChild(bitmap);
	
	var bitmapData = new LBitmapData(LMvc.datalist["main-button"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = 350;
	bitmap.y = 245;
	self.addChild(bitmap);

	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	
	self.ctrlLayerInit();
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win04"]),LGlobal.width,LGlobal.width - 105);
	self.addChild(bitmapWin);
	self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){});
	self.addEventListener(LMouseEvent.MOUSE_UP,function(){});
};
MenuListView.prototype.clickItems=function(event){
	var self = event.currentTarget.parent;
	var controller = self.controller;
	//self.remove();
	controller.itemsShow();
};
MenuListView.prototype.clickChara=function(event){
	var self = event.currentTarget.parent;
	var controller = self.controller;
	//self.remove();
	controller.characterListShow();
};
MenuListView.prototype.clickEquipment=function(event){
	var self = event.currentTarget.parent;
	var controller = self.controller;
	controller.equipmentsShow();
};
MenuListView.prototype.ctrlLayerInit=function(){
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.close);
};
MenuListView.prototype.close=function(event){
	var self = event.currentTarget.parent.parent;
	self.controller.view.menuListClose();
}