function StageController(){
	base(this,MyController,[]);
	console.log("StageController load");
}
StageController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.modelLoad);
};
StageController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Stage/StageStatus","User/Character","User/Skill"],self.libraryLoad);
};
StageController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["BitmapSprite","Face"];
	self.load.library(libraris,self.viewLoad);
};
StageController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Stage/StageChild"],self.getStageData);
};
StageController.prototype.getStageData=function(){
	var self = this;console.log("getStageData");
	self.model.getStageData(self.init);
};
StageController.prototype.init=function(status){
	var self = this;console.log("init");
	LMvc.areaController.view.visible = false;
	LMvc.changeLoading(Loading);
	LMvc.keepLoading(false);
	
	self.dispatchEvent(LEvent.COMPLETE);
};
StageController.prototype.closeStage=function(event){
	var self = event.currentTarget.parent.parent.controller;
	LTweenLite.removeAll();
	self.view.remove();
	LMvc.areaController.view.visible = true;
	delete LMvc.areaController;
	LMvc.changeLoading(TranslucentLoading);
	LMvc.keepLoading(false);
};
StageController.prototype.gotoSelect=function(stageId){
	//select
	var self = this;
	LMvc.stageId = stageId;
	LMvc.keepLoading(true);
	self.loadMvc("CharacterSelect",self.characterSelectLoadComplete);
	
};
StageController.prototype.characterSelectLoadComplete=function(){
	var self = this;
	var characterSelect = new CharacterSelectController(self);
	self.view.parent.addChild(characterSelect.view);
};