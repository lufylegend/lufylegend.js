function EquipmentDetailedView(controller,equipmentModel){
	var self = this;
	base(self,LView,[controller]);
	self.equipmentModel = equipmentModel;
	self.set();
}
EquipmentDetailedView.prototype.layerInit=function(){
	var self = this;
	self.translucentLayer = new LSprite();
	self.addChild(self.translucentLayer);
	self.translucentLayer.addChild(getTranslucentBitmap());
	self.translucentLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.click);
	self.translucentLayer.addEventListener(LMouseEvent.MOUSE_UP, self.close);
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	var backgroundData = new LBitmapData(LMvc.datalist["win07"]);
	var panel = getBitmap(new LPanel(backgroundData,320,340));
	panel.name = "windowBackground";
	panel.x = (LGlobal.width - panel.getWidth()) * 0.5;
	panel.y = (LGlobal.height - panel.getHeight()) * 0.5;
	self.backLayer.addChild(panel);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.click);
	
	self.layer = new LSprite();
	self.layer.x = panel.x;
	self.layer.y = panel.y;
	self.addChild(self.layer);
};
EquipmentDetailedView.prototype.click=function(event){};
EquipmentDetailedView.prototype.close=function(event){
	event.currentTarget.parent.remove();
};
EquipmentDetailedView.prototype.set=function(){
	var self = this;
	self.layerInit();
	var title = getStrokeLabel(self.equipmentModel.name(),20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = self.backLayer.getChildByName("windowBackground").y + 8;
	self.backLayer.addChild(title);
	
	
	var layer = new LSprite();
	
	var width = 100, height = 100;
	var equipment = self.equipmentModel.icon(new LPoint(width,height));
	equipment.x = 20;
	equipment.y = 50;
	layer.addChild(equipment);
	
	var explanation = self.equipmentModel.master().explanation();
	var lblExplanation = getStrokeLabel(explanation,20,"#FFFFFF","#000000",4);
	lblExplanation.width = 280;
	lblExplanation.setWordWrap(true, 25);
	lblExplanation.x = equipment.x;
	lblExplanation.y = equipment.y + height + 10;
	layer.addChild(lblExplanation);

	var conditionLayer = self.showCondition();
	conditionLayer.x = equipment.x + width + 10;
	conditionLayer.y = equipment.y;
	layer.addChild(conditionLayer);
	var additionLayer = self.showAddition();
	additionLayer.x = equipment.x + 10;
	additionLayer.y = lblExplanation.y + lblExplanation.getHeight() + 10;
	layer.addChild(additionLayer);
	
	var btnEquip = getButton(Language.get("label_equip"), 120);
	btnEquip.x = (320 - btnEquip.getWidth())*0.5;
	btnEquip.y = 280;
	layer.addChild(btnEquip);
	btnEquip.addEventListener(LMouseEvent.MOUSE_UP, self.equip.bind(self));
	if(self.controller.fromController.constructor.name != "CharacterListController"){
		btnEquip.x = (320 - btnEquip.getWidth())*0.5 - btnEquip.getWidth()*0.5 - 5;
		
		var btnSale = getButton(Language.get("label_sale"), 120);
		//btnUse.x = (320 - btnUse.getWidth())*0.5;
		btnSale.x = (320 - btnSale.getWidth())*0.5 + btnSale.getWidth()*0.5 + 5;
		btnSale.y = btnEquip.y;
		layer.addChild(btnSale);
		btnSale.addEventListener(LMouseEvent.MOUSE_UP, self.sale.bind(self));
	}
	
	self.layer.addChild(layer);
};
EquipmentDetailedView.prototype.equip=function(event){
	var self = this;
	if(self.controller.fromController.constructor.name == "CharacterListController"){
		self.controller.equip(self.equipmentModel, self.equipComplete.bind(self));
	}else{
		self.gotoCharacterList();
	}
};
EquipmentDetailedView.prototype.gotoCharacterList=function(characterData){
	var self = this;
	self.controller.view.remove();
	LMvc.mainController.characterListShow();
};
EquipmentDetailedView.prototype.sale=function(event){
	var self = this;
	self.controller.view.itemSaleDialog(self.equipmentModel);
	self.remove();
};
EquipmentDetailedView.prototype.showCondition=function(){
	var self = this;
	var layer = new LSprite();
	var lblLevel = getStrokeLabel("等级：" + self.equipmentModel.master().level(),20,"#FFFFFF","#000000",4);
	layer.addChild(lblLevel);
	var lblStar = getStrokeLabel("星级：" + self.equipmentModel.master().star(),20,"#FFFFFF","#000000",4);
	lblStar.y = 30;
	layer.addChild(lblStar);
	return layer;
};
EquipmentDetailedView.prototype.showAddition=function(){
	var self = this;
	var layer = new LSprite();
	var lblLevel = getStrokeLabel("攻击：" + self.equipmentModel.master().attack(),20,"#FFFFFF","#000000",4);
	layer.addChild(lblLevel);
	return layer;
};
EquipmentDetailedView.prototype.equipComplete=function(data){
	var self = this;
	var controller = self.controller;
	var fromController = controller.fromController;
	controller.view.remove();
};
EquipmentDetailedView.prototype.addClickEvent=function(event){
	var self = event.target.parent;
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
EquipmentDetailedView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.remove();
};
