function CharacterSelectController(fromController){
	base(this,MyController,[]);
	this.fromController = fromController;
}
CharacterSelectController.prototype.construct=function(){
	var self = this;
	self.libraryLoad();
};
CharacterSelectController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["characterSetting","Character","SingleCombatCharacter","HpBar","Face"],self.modelLoad);
};
CharacterSelectController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["User/User","User/Character","User/Skill"],self.viewLoad);
};
CharacterSelectController.prototype.viewLoad=function(){
	var self = this;
	var views = ["CharacterSelect/CharacterSelectChild"];
	self.load.view(views,self.getCharacters);
};
CharacterSelectController.prototype.getCharacters=function(){
	var self = this;
	UserModel.own(self).getCharacters(self.imageLoad.bind(self));
};
CharacterSelectController.prototype.imageLoad=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
CharacterSelectController.prototype.init=function(){
	var self = this;
	self.model.setArms();
	LMvc.keepLoading(false);
	self.view.init();
	self.fromController.view.visible = false;
};
CharacterSelectController.prototype.close = function(){
	var self = this;
	var fromController = self.fromController;
	LTweenLite.removeAll();
	self.view.remove();
	fromController.view.visible = true;
};