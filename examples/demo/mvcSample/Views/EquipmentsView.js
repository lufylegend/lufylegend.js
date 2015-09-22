function EquipmentsView() {
	base(this, LView, []);
}

EquipmentsView.prototype.construct = function() {
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
EquipmentsView.prototype.layerInit = function() {
	var self = this;
	//var bitmapData = new LBitmapData(LMvc.datalist["common-black"]);
	var bitmapData = new LBitmapData(LMvc.datalist["translucent"]);
	var panel = new LPanel(bitmapData,LGlobal.width, LGlobal.height);
	self.addChild(getBitmap(panel));
	//self.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);

	self.equipmentListLayer = new LSprite();
	self.baseLayer.addChild(self.equipmentListLayer);
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	if(self.controller.fromController.constructor.name == "CharacterListController"){
		return;
	}
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
};
EquipmentsView.prototype.updateView = function() {
	var self = this;
	self.setEquipmentList();
};
EquipmentsView.prototype.init = function() {
	var self = this;
	self.layerInit();
	self.ctrlLayerInit();
	self.statusLayerInit();
};
EquipmentsView.prototype.ctrlLayerInit = function() {
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP, self.controller.close.bind(self.controller));
};
EquipmentsView.prototype.setEquipmentList = function() {
	var self = this;
	self.equipmentListLayer.removeAllChild();
	var equipmentList = self.controller.getValue("equipmentList");
	var backLayer = new LSprite();
	for (var i = 0, l = equipmentList.length; i < l; i++) {
		var child = new EquipmentsChildView(self.controller, equipmentList[i]);
		child.x = 110 * (i % 4);
		child.y = 110 * (i / 4 >>> 0);
		backLayer.addChild(child);
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, 430, 110 * ((equipmentList.length / 4 >>> 0) + 1) - 10]);
	self.equipmentListLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, 430, 440, 10);
	sc.x = 25;
	sc.y = 120;
	self.equipmentListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.equipmentClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.equipmentClickUp.bind(self));
};
EquipmentsView.prototype.equipmentClickDown = function(event) {
	var item = event.target;
	item.offsetX = event.offsetX;
	item.offsetY = event.offsetY;
};
EquipmentsView.prototype.equipmentClickUp = function(event) {
	if(event.target.constructor.name != "EquipmentsChildView"){
		return;
	}
	var equipment = event.target, self = this;
	if (equipment.offsetX && equipment.offsetY && Math.abs(equipment.offsetX - event.offsetX) < 5 && Math.abs(equipment.offsetY - event.offsetY) < 5) {
		self.equipmentDetailedDialog(equipment.equipmentModel);
	}
};
EquipmentsView.prototype.equipmentDetailedDialog = function(equipmentModel) {
	var self = this;
	var equipmentDetailed = new EquipmentDetailedView(self.controller,equipmentModel);
	self.addChild(equipmentDetailed);
};
EquipmentsView.prototype.equipmentSaleDialog = function(equipmentModel) {
	var self = this;
	var equipmentSale = new EquipmentSaleView(self.controller,equipmentModel);
	self.addChild(equipmentSale);
	
};
EquipmentsView.prototype.statusLayerInit=function(){
	var self = this;
	if(!self.statusLayer){
		return;
	}
	var status = new HeaderStatusView(self.controller);
	self.statusLayer.addChild(status);
};
