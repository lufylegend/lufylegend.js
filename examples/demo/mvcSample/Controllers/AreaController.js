function AreaController(){
	base(this,MyController,[]);
}
AreaController.prototype.construct=function(){
	var self = this;
	self.modelLoad();
};
AreaController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Area/AreaStatus"],self.libraryLoad);
};
AreaController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["TranslucentLoading"];
	self.load.library(libraris,self.viewLoad);
};
AreaController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Area/AreaIcon","Common/Background"],self.getAreaData);
};
AreaController.prototype.getAreaData=function(){
	var self = this;
	self.model.getAreaData(self.getImages);
};
AreaController.prototype.getImages=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
AreaController.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
};
AreaController.prototype.returnToChapter=function(event){
	var self = event.currentTarget.parent.parent.controller;
	self.view.remove();
	LMvc.chapterController.view.visible = true;
	delete LMvc.chapterController;
	LMvc.changeLoading(Loading);
	LMvc.keepLoading(false);
};
AreaController.prototype.showStage=function(areaId){
	var self = this;
	LMvc.areaId = areaId;
	LMvc.changeLoading(TranslucentLoading);
	LMvc.keepLoading(true);
	self.loadMvc("Stage",self.stageLoadComplete);
};
AreaController.prototype.stageLoadComplete=function(){
	var self = this;
	LMvc.areaController = self;
	var stage = new StageController();
	self.view.parent.addChild(stage.view);
};
