function ShopController(){
	base(this,MyController,[]);
}
ShopController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.viewLoad);
};
ShopController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Shop/ShopButton"],self.init);
};
ShopController.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	self.setValue("yuanbao",30000);
	self.setValue("yinzi",11300000);
	self.setValue("tili","10/10");
	self.view.init();
	self.dispatchEvent(LController.NOTIFY);
};
ShopController.prototype.returnToMain=function(event){
	var self = event.currentTarget.parent.parent.controller;
	LTweenLite.removeAll();
	self.view.remove();
	LMvc.mainController.view.visible = true;
	LMvc.mainController.webview.show();
	delete LMvc.mainController;
};
ShopController.prototype.showArea=function(chapterId){
	var self = this;
	LMvc.chapterId = chapterId;
	LMvc.keepLoading(true);
	self.loadMvc("Area",self.areaLoadComplete);
};
ShopController.prototype.areaLoadComplete=function(){
	var self = this;
	LMvc.ShopController = self;
	self.view.visible = false;
	var area = new AreaController();
	self.view.parent.addChild(area.view);
};
