function MainView(){
	base(this,LView,[]);
}
MainView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
MainView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.backLayer = new LSprite();
	self.baseLayer.addChild(self.backLayer);
	self.buildLayer = new LSprite();
	self.baseLayer.addChild(self.buildLayer);
	
	self.menuLayer = new LSprite();
	self.addChild(self.menuLayer);
	
	self.menuListLayer = new LSprite();
	self.addChild(self.menuListLayer);
};
MainView.prototype.backLayerInit=function(){
	var self = this;
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["main-background"]));
	self.backLayer.addChild(bitmap);
};
MainView.prototype.buildLayerInit=function(){
	var self = this;
	var bitmapOfficial = new BuildOfficialView(self.controller);
	self.buildLayer.addChild(bitmapOfficial);
	var bitmapTavern = new BuildTavernView(self.controller);
	self.buildLayer.addChild(bitmapTavern);
	var bitmapShop = new BuildShopView(self.controller);
	self.buildLayer.addChild(bitmapShop);
};
MainView.prototype.statusLayerInit=function(){
	var self = this;
	var status = new HeaderStatusView(self.controller,true);
	self.baseLayer.addChild(status);
};
MainView.prototype.menuLayerInit=function(){
	var self = this;
	var menu = new MainmenuView(self.controller);
	self.baseLayer.addChild(menu);
};
MainView.prototype.menuListShow=function(){
	var self = this;
	self.controller.webview.die();
	//self.baseLayer.visible = false;
	self.menuLayer.visible = false;
	if(!self.menulist){
		var menulist = new MenuListView(self.controller);
		self.menuListLayer.addChild(menulist);
		self.menulist = menulist;
	}
	self.menuListLayer.visible = true;
};
MainView.prototype.menuListClose=function(){
	var self = this;
	self.menuListLayer.visible = false;
	//self.baseLayer.visible = true;
	self.menuLayer.visible = true;
	self.controller.webview.show();
};
MainView.prototype.chatLayerInit=function(){
	var self = this;
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win03"]),300,200);
	bitmapWin.y = LGlobal.height - 250;
	self.menuLayer.addChild(bitmapWin);
	
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win03"]),230,50);
	bitmapWin.y = LGlobal.height - 50;
	self.menuLayer.addChild(bitmapWin);
	var inputText = new LTextField();
	inputText.size = 20;
	var inputLayer = new LSprite();
	inputLayer.graphics.drawRect(0,"#000000",[0, 0, 224, 40]);
	inputText.setType(LTextFieldType.INPUT,inputLayer);
	inputText.x = 3;
	inputText.y = bitmapWin.y + 5;
	self.menuLayer.addChild(inputText);
	var bitmapWin = new LButtonSample1(Language.get("send"));
	bitmapWin.x = 230;
	bitmapWin.y = LGlobal.height - 50;
	self.menuLayer.addChild(bitmapWin);
	var webview = new LStageWebView();
	webview.setViewPort(new LRectangle(0,LGlobal.height - 245,290,190));
	webview.loadURL("./chat.html");
	webview.show();
	self.controller.webview = webview;
	webview.display.style.border = 0;
	webview.iframe.style.border = 0;
};
MainView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.buildLayerInit();
	self.statusLayerInit();
	
	self.chatLayerInit();
	
	self.menuLayerInit();
};