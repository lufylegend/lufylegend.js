function ItemSaleView(controller,itemModel){
	var self = this;
	base(self,LView,[controller]);
	self.itemModel = itemModel;
	self.set();
}
ItemSaleView.prototype.layerInit=function(){
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
ItemSaleView.prototype.click=function(event){};
ItemSaleView.prototype.close=function(event){
	event.currentTarget.parent.remove();
};
ItemSaleView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var title = getStrokeLabel("出售",20,"#FFFFFF","#000000",4);
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
	
	var detailedLayer = new LSprite();
	var lblCount = getStrokeLabel("数量：" + self.itemModel.count(),20,"#FFFFFF","#000000",4);
	detailedLayer.addChild(lblCount);
	var lblPrice = getStrokeLabel("单价：" + self.itemModel.price(),20,"#FFFFFF","#000000",4);
	lblPrice.y = 30;
	detailedLayer.addChild(lblPrice);
	detailedLayer.x = item.x + width + 10;
	detailedLayer.y = item.y;
	layer.addChild(detailedLayer);
	
	var lblExplanation = getStrokeLabel("请选择出售个数：",20,"#FFFFFF","#000000",4);
	lblExplanation.x = 20;
	lblExplanation.y = item.y + height + 10;
	layer.addChild(lblExplanation);
	
	self.number = 1;
	var lblNumber = getStrokeLabel(String.format("{0}/{1}", self.number, self.itemModel.count()),24,"#FFFFFF","#000000",4);
	lblNumber.textAlign = "center";
	lblNumber.x = 120;
	lblNumber.y = 200;
	layer.addChild(lblNumber);
	self.lblNumber = lblNumber;
	
	var btnMinus = getButton("-", 60);
	btnMinus.x = 10;
	btnMinus.y = 190;
	layer.addChild(btnMinus);
	btnMinus.addEventListener(LMouseEvent.MOUSE_UP, self.minus.bind(self));
	var btnPlus = getButton("+", 60);
	btnPlus.x = 170;
	btnPlus.y = 190;
	layer.addChild(btnPlus);
	btnPlus.addEventListener(LMouseEvent.MOUSE_UP, self.plus.bind(self));
	var btnMax = getButton("最大", 80);
	btnMax.x = 230;
	btnMax.y = 190;
	layer.addChild(btnMax);
	btnMax.addEventListener(LMouseEvent.MOUSE_UP, self.plusMax.bind(self));
	
	var lblGet = getStrokeLabel("获取银子：0",20,"#FFFFFF","#000000",4);
	lblGet.x = 20;
	lblGet.y = 250;
	layer.addChild(lblGet);
	self.lblGet = lblGet;
	self.changeNumber(1);
	
	var btnSale = getButton("出售", 120);
	btnSale.x = (320 - btnSale.getWidth())*0.5;
	btnSale.y = 280;
	layer.addChild(btnSale);
	btnSale.addEventListener(LMouseEvent.MOUSE_UP, self.sale.bind(self));
	
	self.layer.addChild(layer);
};
ItemSaleView.prototype.minus=function(event){
	this.changeNumber(this.number - 1);
};
ItemSaleView.prototype.plus=function(event){
	this.changeNumber(this.number + 1);
};
ItemSaleView.prototype.plusMax=function(event){
	this.changeNumber(this.itemModel.count());
};
ItemSaleView.prototype.changeNumber=function(num){
	var self = this;
	self.number = num;
	if(self.number < 1){
		self.number = 1;
	}else if(self.number > self.itemModel.count()){
		self.number = self.itemModel.count();
	}
	self.lblNumber.text = String.format("{0}/{1}", self.number, self.itemModel.count());
	self.lblGet.text = String.format("获取银子：{0}", self.number*self.itemModel.price());
};
ItemSaleView.prototype.sale=function(event){
	var self = this;
	self.controller.sale(self.itemModel.id(), self.number, self.saleComplete.bind(self));
};
ItemSaleView.prototype.saleComplete=function(){
	var self = this;
	var controller = self.controller;
	self.remove();
	controller.dispatchEvent(LController.NOTIFY);
};