function ItemsController(fromController){
	base(this,MyController,[]);
	this.fromController = fromController;
}
ItemsController.prototype.construct=function(){
	var self = this;
	self.libraryLoad();
};
ItemsController.prototype.libraryLoad=function(){
	var self = this;
	//self.load.library(["characterSetting","Character","SingleCombatCharacter","HpBar","Face"],self.modelLoad);
	self.modelLoad();
};
ItemsController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Items/Item","User/Character"],self.viewLoad);
};
ItemsController.prototype.viewLoad=function(){
	var self = this;
	var views = ["Items/ItemsChild", "Items/ItemDetailed", "Items/ItemSale"];
	self.load.view(views,self.getItemsData);
};
ItemsController.prototype.getItemsData=function(){
	var self = this;
	self.model.getItemsData(self.imageLoad);
};
ItemsController.prototype.imageLoad=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
ItemsController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
ItemsController.prototype.close = function(){
	var self = this;
	LTweenLite.removeAll();
	self.view.remove();
	LMvc.mainController.view.visible = true;
};
ItemsController.prototype.sale = function(item_id, num, callback){
	this.model.sale(item_id, num, callback);
};
ItemsController.prototype.useItem = function(item_id, num, callback){
	this.model.useItem(item_id, num, callback);
};
