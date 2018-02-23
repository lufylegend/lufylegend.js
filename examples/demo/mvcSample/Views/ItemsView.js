function ItemsView() {
	base(this, LView, []);
}

ItemsView.prototype.construct = function() {
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
ItemsView.prototype.layerInit = function() {
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["common-black"]);
	var panel = new LPanel(bitmapData,LGlobal.width, LGlobal.height);
	self.addChild(getBitmap(panel));
	//self.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);

	self.itemListLayer = new LSprite();
	self.baseLayer.addChild(self.itemListLayer);
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
ItemsView.prototype.updateView = function() {
	var self = this;
	self.setItemList();
};
ItemsView.prototype.init = function() {
	var self = this;
	self.layerInit();
	self.ctrlLayerInit();
};
ItemsView.prototype.ctrlLayerInit = function() {
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP, self.controller.close.bind(self.controller));
};
ItemsView.prototype.setItemList = function() {
	var self = this;
	self.itemListLayer.removeAllChild();
	var itemList = self.controller.getValue("itemList");
	var backLayer = new LSprite();
	for (var i = 0, l = itemList.length; i < l; i++) {
		var child = new ItemsChildView(self.controller, itemList[i]);
		child.x = 110 * (i % 4);
		child.y = 110 * (i / 4 >>> 0);
		backLayer.addChild(child);
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, 430, 110 * ((itemList.length / 4 >>> 0) + 1) - 10]);
	self.itemListLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, 430, 330, 10);
	sc.x = 25;
	sc.y = 20;
	self.itemListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.itemClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.itemClickUp.bind(self));
};
ItemsView.prototype.itemClickDown = function(event) {
	var item = event.target;
	item.offsetX = event.offsetX;
	item.offsetY = event.offsetY;
};
ItemsView.prototype.itemClickUp = function(event) {
	if(event.target.constructor.name != "ItemsChildView"){
		return;
	}
	var item = event.target, self = this;
	if (item.offsetX && item.offsetY && Math.abs(item.offsetX - event.offsetX) < 5 && Math.abs(item.offsetY - event.offsetY) < 5) {
		self.itemDetailedDialog(item.itemModel);
	}
};
ItemsView.prototype.itemDetailedDialog = function(itemModel) {
	var self = this;
	var itemDetailed = new ItemDetailedView(self.controller,itemModel);
	self.addChild(itemDetailed);
};
ItemsView.prototype.itemSaleDialog = function(itemModel) {
	var self = this;
	var itemSale = new ItemSaleView(self.controller,itemModel);
	self.addChild(itemSale);
	
};
