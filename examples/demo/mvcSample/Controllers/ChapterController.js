function ChapterController(){
	base(this,MyController,[]);
}
ChapterController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.modelLoad);
};
ChapterController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Chapter/ChapterStatus"],self.libraryLoad);
};
ChapterController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["BitmapSprite","Star"];
	self.load.library(libraris,self.viewLoad);
};
ChapterController.prototype.viewLoad=function(){
	var self = this;//console.log("Star",Star);
	self.load.view(["Chapter/ChapterIcon"],self.getChapterData);
};
ChapterController.prototype.getChapterData=function(){
	var self = this;
	self.model.getChapterData(self.init);
};
ChapterController.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
};
ChapterController.prototype.returnToMain=function(event){
	var self = event.currentTarget.parent.parent.controller;
	LTweenLite.removeAll();
	self.view.remove();
	LMvc.mainController.view.visible = true;
	LMvc.mainController.webview.show();
	delete LMvc.mainController;
};
ChapterController.prototype.showArea=function(chapterId){
	var self = this;
	LMvc.chapterId = chapterId;
	LMvc.keepLoading(true);
	self.loadMvc("Area",self.areaLoadComplete);
};
ChapterController.prototype.areaLoadComplete=function(){
	var self = this;
	LMvc.chapterController = self;
	self.view.visible = false;
	var area = new AreaController();
	self.view.parent.addChild(area.view);
};
