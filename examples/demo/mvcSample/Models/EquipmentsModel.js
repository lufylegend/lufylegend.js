function EquipmentsModel(){
	base(this,MyModel,[]);
}
EquipmentsModel.prototype.construct=function(){
	this.equipmentList = [];
};
EquipmentsModel.prototype.getImages=function(){
	var self = this;
	var list = [
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win07.png"},
		{name:"tavern-getBackground",path:LMvc.IMG_PATH+"tavern/get_background.jpg"},
	];
	return list;
};
EquipmentsModel.prototype.getEquipmentsData=function(callback){
	var self = this;
	self.callback = callback;
	LRequestEquipmentList({},self.getEquipmentsDataComplete.bind(self));
};
EquipmentsModel.prototype.sale=function(item_id, num, callback){
	var self = this;
	self.callback = callback;
	LRequestEquipmentSale({"item_id":item_id, "number":num},self.getItemsDataComplete.bind(self));
};
EquipmentsModel.prototype.equip=function(character_id, equipment_id, callback){
	var self = this;
	self.callback = callback;
	LRequestEquipmentEquip({"character_id":character_id, "e_id":equipment_id},self.getEquipmentsDataComplete.bind(self));
};
EquipmentsModel.prototype.getEquipmentsDataComplete=function(data){
	var self = this;
	console.log("getEquipmentsDataComplete",data);
	if(data.characters){
		UserModel.own().updateCharacters(data.characters);
	}
	if(data.equipments){
		self.equipmentList.length = 0;
		for(var i=0,l=data.equipments.length;i<l;i++){
			var equipment = new EquipmentModel(self.controller,data.equipments[i]);
			self.equipmentList.push(equipment);
		}
		self.controller.setValue("equipmentList",self.equipmentList);
	}
	var callback = self.callback;
	delete self.callback;
	//"get":{"type":"character_stone","character":{"id":"6","character_id":"51","exp":"0","level":"1","star":"1"}
	callback.apply(self.controller,[]);
};

