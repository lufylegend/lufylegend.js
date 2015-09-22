function CharacterListController(){
	base(this,MyController,[]);
}
CharacterListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.modelLoad);
};
CharacterListController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["User/User","User/Character","User/Skill"],self.libraryLoad);
};
CharacterListController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["BitmapSprite","Face","Star","TranslucentLoading"];
	self.load.library(libraris,self.viewLoad);
};
CharacterListController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["CharacterList/CharacterListChild","CharacterList/CharacterDetailed"],self.getCharacters);
};

CharacterListController.prototype.getCharacters=function(){
	var self = this;
	var user = UserModel.own(self);
	user.getCharacters(self.init.bind(self));
};
CharacterListController.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	
	var user = UserModel.own(self);
	self.setValue("yuanbao",user.gold());
	self.setValue("yinzi",user.silver());
	self.setValue("tili",user.junling()+"/"+user.junlingMax());
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
CharacterListController.prototype.returnToMain=function(event){
	var self = this;
	LTweenLite.removeAll();
	self.view.remove();
	LMvc.mainController.view.visible = true;
	delete LMvc.mainController;
};
CharacterListController.prototype.equipmentsShow=function(character_id){
	var self = this;
	self.character_id = character_id;
	LMvc.changeLoading(TranslucentLoading);
	LMvc.keepLoading(true);
	self.loadMvc("Equipments",self.equipmentsLoadComplete);
};
CharacterListController.prototype.equipmentsLoadComplete=function(){
	var self = this;
	var equipments = new EquipmentsController(self);
	self.view.parent.addChild(equipments.view);
};