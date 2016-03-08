function ItemDetailedView(controller,itemModel){
	var self = this;
	base(self,LView,[controller]);
	self.itemModel = itemModel;
	self.set();
}
ItemDetailedView.prototype.layerInit=function(){
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
ItemDetailedView.prototype.click=function(event){};
ItemDetailedView.prototype.close=function(event){
	event.currentTarget.parent.remove();
};
ItemDetailedView.prototype.set=function(){
	var self = this;
	self.layerInit();
	var title = getStrokeLabel(self.itemModel.name(),20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = self.backLayer.getChildByName("windowBackground").y + 8;
	self.backLayer.addChild(title);
	
	
	var layer = new LSprite();
	
	var width = 100, height = 100;
	var item = self.itemModel.master().icon(new LPoint(width,height));
	item.x = 20;
	item.y = 50;
	layer.addChild(item);
	
	self.explanation = self.itemModel.explanation();
	var detailedLayer, canUse = false;
	switch(self.itemModel.type()){
		case ItemType.CHARACTER_STONE:
			detailedLayer = self.showCharacterStone();
			canUse = true;
			break;
		case ItemType.CHARACTER_FRAGMENT:
			detailedLayer = self.showCharacterFragment();
			canUse = true;
			break;
		case ItemType.EXP:
			detailedLayer = self.showExp();
			canUse = true;
			break;
	}
	detailedLayer.x = item.x + width + 10;
	detailedLayer.y = item.y;
	layer.addChild(detailedLayer);
	
	var lblExplanation = getStrokeLabel(self.explanation,20,"#FFFFFF","#000000",4);
	lblExplanation.width = 280;
	lblExplanation.setWordWrap(true, 25);
	lblExplanation.x = item.x;
	lblExplanation.y = item.y + height + 10;
	layer.addChild(lblExplanation);
	
	var btnSale = getButton("出售", 120);
	btnSale.x = (320 - btnSale.getWidth())*0.5;
	btnSale.y = 280;
	layer.addChild(btnSale);
	btnSale.addEventListener(LMouseEvent.MOUSE_UP, self.sale.bind(self));
	if(canUse){
		btnSale.x = (320 - btnSale.getWidth())*0.5 - btnSale.getWidth()*0.5 - 5;
		
		var btnUse = getButton("使用", 120);
		btnUse.x = (320 - btnUse.getWidth())*0.5 + btnUse.getWidth()*0.5 + 5;
		btnUse.y = btnSale.y;
		layer.addChild(btnUse);
		btnUse.addEventListener(LMouseEvent.MOUSE_UP, self.use.bind(self));
	}
	
	self.layer.addChild(layer);
};
ItemDetailedView.prototype.use=function(event){
	var self = this;
	self.controller.useItem(self.itemModel.id(), 1, self.useComplete.bind(self));
};
ItemDetailedView.prototype.sale=function(event){
	var self = this;
	self.controller.view.itemSaleDialog(self.itemModel);
	self.remove();
};
ItemDetailedView.prototype.showExp=function(){
	var self = this;
	var layer = new LSprite();
	var expMaster = ExpMasterModel.getMaster(self.itemModel.child_id());
	var lblCount = getStrokeLabel("数量：" + self.itemModel.count(),20,"#FFFFFF","#000000",4);
	layer.addChild(lblCount);
	var lblExp = getStrokeLabel("经验：" + expMaster.value(),20,"#FFFFFF","#000000",4);
	lblExp.y = 30;
	layer.addChild(lblExp);
	return layer;
};
ItemDetailedView.prototype.showCharacterFragment=function(){
	var self = this;
	var layer = new LSprite();
	var chara = CharacterMasterModel.getMaster(self.itemModel.child_id());
	var lblHero = getStrokeLabel("英雄：" + chara.name(),20,"#FFFFFF","#000000",4);
	layer.addChild(lblHero);
	var lblFive = getStrokeLabel("五行：" + chara.five(),20,"#FFFFFF","#000000",4);
	lblFive.y = 30;
	layer.addChild(lblFive);
	var lblCount = getStrokeLabel("数量：" + self.itemModel.count(),20,"#FFFFFF","#000000",4);
	lblCount.y = 60;
	layer.addChild(lblCount);
	return layer;
};
ItemDetailedView.prototype.showCharacterStone=function(){
	var self = this;
	var layer = new LSprite();
	var chara = CharacterMasterModel.getMaster(self.itemModel.child_id());
	self.explanation = String.format(self.explanation,chara.name());
	var lblHero = getStrokeLabel("英雄：" + chara.name(),20,"#FFFFFF","#000000",4);
	layer.addChild(lblHero);
	var lblFive = getStrokeLabel("五行：" + chara.five(),20,"#FFFFFF","#000000",4);
	lblFive.y = 30;
	layer.addChild(lblFive);
	var chara_id = self.itemModel.child_id();
	return layer;
};
ItemDetailedView.prototype.useComplete=function(data){
	var self = this;
	var controller = self.controller;
	switch(data.type){
	case ItemType.CHARACTER_STONE:
			self.getCard(data.character);
			break;
		case ItemType.CHARACTER_FRAGMENT:
			break;
		case ItemType.EXP:
			break;
	}
	return;
	self.remove();
	controller.dispatchEvent(LController.NOTIFY);
};
ItemDetailedView.prototype.getCard=function(characterData){
	var self = this;
	var characterModel = UserModel.own().addCharacter(characterData);
	var animeW = 960;
	var animeH = 960;
	var list = LGlobal.divideCoordinate(animeW,animeH,1,2);
	var bitmapDataGet = new LBitmapData(LMvc.datalist["tavern-getBackground"],0,0,animeW*0.5,animeH);
	var getAnimation = new LAnimationTimeline(bitmapDataGet,list);
	getAnimation.onframe();
	getAnimation.speed = 8;
	getAnimation.y = (LGlobal.height - animeH)*0.5;
	self.addChild(getAnimation);
	
	var card = new Card(characterModel);
	card.x = -card.cardW*0.5;
	card.y = -card.cardH*0.5;
	var cardLayer = new LSprite();
	cardLayer.x = LGlobal.width*0.5;
	cardLayer.y = LGlobal.height*0.5;
	cardLayer.scaleX = cardLayer.scaleY = 0.1;
	cardLayer.rotate = -360*3;
	self.addChild(cardLayer);
	cardLayer.addChild(card);
	
	LTweenLite.to(cardLayer,1,{rotate:0,scaleX:1,scaleY:1,onComplete:self.addClickEvent});
	
};
ItemDetailedView.prototype.addClickEvent=function(event){
	var self = event.target.parent;
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
ItemDetailedView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.remove();
};
