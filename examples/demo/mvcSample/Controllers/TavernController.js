function TavernController(){
	base(this,MyController,[]);
}
TavernController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.viewLoad);
};
TavernController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Tavern/TavernButton","Tavern/GetCharacter","Common/HeaderStatus"],self.init);
};
TavernController.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	var user = UserModel.own(self);
	self.setValue("yuanbao",user.gold());
	self.setValue("yinzi",user.silver());
	self.setValue("tili",user.junling()+"/"+user.junlingMax());
	
	self.view.init();
};
TavernController.prototype.returnToMain=function(event){
	var self = event.currentTarget.parent.parent.controller;
	LTweenLite.removeAll();
	self.view.remove();
	LMvc.mainController.view.visible = true;
	LMvc.mainController.webview.show();
	delete LMvc.mainController;
};
TavernController.prototype.showArea=function(chapterId){
	var self = this;
	LMvc.chapterId = chapterId;
	LMvc.keepLoading(true);
	self.loadMvc("Area",self.areaLoadComplete);
};
TavernController.prototype.areaLoadComplete=function(){
	var self = this;
	LMvc.TavernController = self;
	self.view.visible = false;
	var area = new AreaController();
	self.view.parent.addChild(area.view);
};
TavernController.prototype.getCharacter=function(){
	var self = this;
	self.view.getCharacter(4);
};
