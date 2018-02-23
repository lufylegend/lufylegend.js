function EquipmentMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "EquipmentMasterModel";
	self.data = data;
}
EquipmentMasterModel.master = [];
EquipmentMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var equipment = new EquipmentMasterModel(null,list[i]);
		EquipmentMasterModel.master.push(equipment);
	}
};
EquipmentMasterModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=EquipmentMasterModel.master.length;i<l;i++){
		var equipment = EquipmentMasterModel.master[i];
		if(equipment.id() != id){
			continue;
		}
		return equipment;
	}
	return null;
};
EquipmentMasterModel.prototype.id = function() {
	return this.data.id;
};
EquipmentMasterModel.prototype.name = function() {
	return Language.get("equipment_name_"+this.data.id);
};
EquipmentMasterModel.prototype.explanation = function(){
	return Language.get(this.data.explanation);
};
EquipmentMasterModel.prototype.arms = function() {
	if(!this._arms){
		this._arms = JSON.parse(this.data.arms);
	}
	return this._arms;
};
EquipmentMasterModel.prototype.level = function() {
	return this.data.level;
};
EquipmentMasterModel.prototype.star = function() {
	return this.data.star;
};
EquipmentMasterModel.prototype.position = function() {
	return this.data.position;
};
EquipmentMasterModel.prototype.img = function() {
	return this.data.img;
};
EquipmentMasterModel.prototype.five1 = function() {
	return this.data.five1;
};
EquipmentMasterModel.prototype.five2 = function() {
	return this.data.five2;
};
EquipmentMasterModel.prototype.five3 = function() {
	return this.data.five3;
};
EquipmentMasterModel.prototype.five4 = function() {
	return this.data.five4;
};
EquipmentMasterModel.prototype.five5 = function() {
	return this.data.five5;
};
EquipmentMasterModel.prototype.hp = function() {
	return this.data.hp;
};
EquipmentMasterModel.prototype.attack = function() {
	return this.data.attack;
};
EquipmentMasterModel.prototype.magic = function() {
	return this.data.magic;
};
EquipmentMasterModel.prototype.def = function() {
	return this.data.def;
};
EquipmentMasterModel.prototype.magicDef = function() {
	return this.data.magicDef;
};
EquipmentMasterModel.prototype.speed = function() {
	return this.data.speed;
};
EquipmentMasterModel.prototype.dodge = function() {
	return this.data.dodge;
};
EquipmentMasterModel.prototype.breakout = function() {
	return this.data.breakout;
};
EquipmentMasterModel.prototype.strength = function() {
	return this.data.strength;
};
EquipmentMasterModel.prototype.force = function() {
	return this.data.force;
};
EquipmentMasterModel.prototype.strategy = function() {
	return this.data.strategy;
};
EquipmentMasterModel.prototype.command = function() {
	return this.data.command;
};
EquipmentMasterModel.prototype.intelligence = function() {
	return this.data.intelligence;
};
EquipmentMasterModel.prototype.agility = function() {
	return this.data.agility;
};
EquipmentMasterModel.prototype.explanation = function(){
	return Language.get(this.data.explanation);
};
EquipmentMasterModel.prototype.icon=function(size){
	var self = this;
	if(!size){
		size = new LPoint(100,100);
	}
	var layer = new LSprite();
	var icon = new BitmapSprite(LMvc.IMG_PATH + "equipment/" + this.img() + ".png", null,size);
	layer.addChild(icon);
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	layer.addChild(getBitmap(winPanel));
	return layer;
};