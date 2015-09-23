function ShopView(){
	base(this,LView,[]);
}
ShopView.prototype.construct=function(){
};
ShopView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.itemLayerInit();
	self.statusLayerInit();
	self.ctrlLayerInit();
};
ShopView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.itemLayer = new LSprite();
	self.addChild(self.itemLayer);
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win04"]),LGlobal.width,LGlobal.height);
	self.addChild(getBitmap(bitmapWin));
};
ShopView.prototype.backLayerInit=function(){
	var self = this;
	self.backLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
};
ShopView.prototype.statusLayerInit=function(){
	var self = this;
	var status = new HeaderStatusView(self.controller);
	self.statusLayer.addChild(status);
};
ShopView.prototype.itemLayerInit=function(){
	var self = this;
	var iconY = 60;
	var shopButton;
	shopButton = new ShopButtonView(self.controller,0,"60","6");
	shopButton.x = 50;
	shopButton.y = iconY;
	self.itemLayer.addChild(shopButton);
	
	shopButton = new ShopButtonView(self.controller,1,"1000","99");
	shopButton.x = 50 + 100 + 40;
	shopButton.y = iconY;
	self.itemLayer.addChild(shopButton);
	
	shopButton = new ShopButtonView(self.controller,2,"2000","199");
	shopButton.x = 50 + (100 + 40)*2;
	shopButton.y = iconY;
	self.itemLayer.addChild(shopButton);
	
	iconY = 210;
	shopButton = new ShopButtonView(self.controller,3,"5000","499");
	shopButton.x = 50;
	shopButton.y = iconY;
	self.itemLayer.addChild(shopButton);
	
	shopButton = new ShopButtonView(self.controller,4,"10000","999");
	shopButton.x = 50 + 100 + 40;
	shopButton.y = iconY;
	self.itemLayer.addChild(shopButton);
	
	shopButton = new ShopButtonView(self.controller,5,"20000","1999");
	shopButton.x = 50 + (100 + 40)*2;
	shopButton.y = iconY;
	self.itemLayer.addChild(shopButton);
};
ShopView.prototype.ctrlLayerInit=function(){
	var self = this;
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.x = 100;
	leftButton.y = 400;
	self.ctrlLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow);
	var rightBitmapData = new LBitmapData(null,0,0,leftBitmapData.width,leftBitmapData.height,LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.scale(-1,1);
	matrix.translate(leftBitmapData.width,0);
	rightBitmapData.draw(left, matrix);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
	rightButton.x = LGlobal.width - leftButton.x - leftBitmapData.width;
	rightButton.y = leftButton.y;
	self.ctrlLayer.addChild(rightButton);
	rightButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickRightArrow);
	
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.controller.returnToMain);
};