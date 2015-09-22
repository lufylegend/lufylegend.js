function EquipmentsController(fromController){
	base(this,MyController,[]);
	this.fromController = fromController;
}
EquipmentsController.prototype.construct=function(){
	var self = this;
	self.libraryLoad();
};
EquipmentsController.prototype.libraryLoad=function(){
	var self = this;
	self.modelLoad();
};
EquipmentsController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Equipments/Equipment","User/Character"],self.viewLoad);
};
EquipmentsController.prototype.viewLoad=function(){
	var self = this;
	var views = ["Equipments/EquipmentsChild", "Equipments/EquipmentDetailed"];
	self.load.view(views,self.getEquipmentsData);
};
EquipmentsController.prototype.getEquipmentsData=function(){
	var self = this;
	self.model.getEquipmentsData(self.imageLoad);
};
EquipmentsController.prototype.imageLoad=function(){
	var self = this;
	console.log("EquipmentsController");
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
EquipmentsController.prototype.init=function(){
	var self = this;
	var user = UserModel.own(self);
	self.setValue("yuanbao",user.gold());
	self.setValue("yinzi",user.silver());
	self.setValue("tili",user.junling()+"/"+user.junlingMax());
	
	LMvc.changeLoading(Loading);
	LMvc.keepLoading(false);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
EquipmentsController.prototype.close = function(){
	var self = this;
	LTweenLite.removeAll();
	self.view.remove();
	if(self.fromController.constructor.name == "CharacterListController"){
		
	}else{
		LMvc.mainController.view.visible = true;
	}
};
EquipmentsController.prototype.sale = function(item_id, num, callback){
	this.model.sale(item_id, num, callback);
};
EquipmentsController.prototype.equip = function(equipmentModel, callback){
	var self = this;
	var character_id = self.fromController.character_id;
	self.model.equip(character_id, equipmentModel.id(), callback);
};
