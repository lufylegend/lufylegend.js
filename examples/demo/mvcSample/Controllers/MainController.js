function MainController(){
	base(this,MyController,[]);
}
MainController.prototype.construct=function(){
	var self = this;
	//LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
	//self.load.image(list,self.getSatus);
};
MainController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["BattleMap","Arms","characterList","lineups","Item","Position"],self.helperLoad);
};
MainController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Label","Star","Cost"],self.libraryLoad);
};
MainController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face","Card"];
	libraris.push("language/chinese/Language");
	self.load.library(libraris,self.viewLoad);
};
MainController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Main/MenuList","Main/Mainmenu","Main/BuildOfficial","Main/BuildShop","Main/BuildTavern","Common/HeaderStatus"],self.init);
};
MainController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	var user = UserModel.own(self);
	self.setValue("yuanbao",user.gold());
	self.setValue("yinzi",user.silver());
	self.setValue("tili",user.junling()+"/"+user.junlingMax());
	
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
MainController.prototype.itemsShow=function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.mainController = self;
	self.view.visible = false;
	self.loadMvc("Items",self.itemsLoadComplete);
};
MainController.prototype.itemsLoadComplete=function(){
	var self = this;
	var items = new ItemsController();
	self.view.parent.addChild(items.view);
};
MainController.prototype.equipmentsShow=function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.mainController = self;
	self.view.visible = false;
	self.loadMvc("Equipments",self.equipmentsLoadComplete);
};
MainController.prototype.equipmentsLoadComplete=function(){
	var self = this;
	var equipments = new EquipmentsController(self);
	self.view.parent.addChild(equipments.view);
};
MainController.prototype.characterListShow=function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.mainController = self;
	self.view.visible = false;
	self.loadMvc("CharacterList",self.characterListLoadComplete);
};
MainController.prototype.characterListLoadComplete=function(){
	var self = this;
	var characterList = new CharacterListController();
	self.view.parent.addChild(characterList.view);
};
MainController.prototype.characterTestShow=function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.mainController = self;
	self.view.visible = false;
	self.loadMvc("CharacterTest",self.characterTestLoadComplete);
};
MainController.prototype.characterTestLoadComplete=function(){
	var self = this;
	var characterTest = new CharacterTestController();
	self.view.parent.addChild(characterTest.view);
};
MainController.prototype.officialShow=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.view.visible = false;
	self.loadMvc("Official",self.officialLoadComplete);
};
MainController.prototype.officialLoadComplete=function(){
	var self = this;
	var official = new OfficialController();
	self.view.addChild(official.view);
};
MainController.prototype.chapterShow=function(){
	var self = this;
	self.webview.die();
	LMvc.keepLoading(true);
	LMvc.mainController = self;
	self.view.visible = false;
	self.loadMvc("Chapter",self.chapterLoadComplete);
};
MainController.prototype.chapterLoadComplete=function(){
	var self = this;
	var chapter = new ChapterController();
	self.view.parent.addChild(chapter.view);
};
MainController.prototype.shopShow=function(){
	var self = this;
	self.webview.die();
	LMvc.keepLoading(true);
	LMvc.mainController = self;
	self.view.visible = false;
	self.loadMvc("Shop",self.shopLoadComplete);
};
MainController.prototype.shopLoadComplete=function(){
	var self = this;
	var shop = new ShopController();
	self.view.parent.addChild(shop.view);
};
MainController.prototype.tavernShow=function(){
	var self = this;
	self.webview.die();
	LMvc.keepLoading(true);
	LMvc.mainController = self;
	self.view.visible = false;
	self.loadMvc("Tavern",self.tavernLoadComplete);
};
MainController.prototype.tavernLoadComplete=function(){
	var self = this;
	var tavern = new TavernController();
	self.view.parent.addChild(tavern.view);
};
