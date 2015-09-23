function GrowingMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "GrowingMasterModel";
	self.data = data;
}
GrowingMasterModel.master = [];
GrowingMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var growing = new GrowingMasterModel(null,list[i]);
		GrowingMasterModel.master.push(growing);
	}
};
GrowingMasterModel.getMaster=function(character_id, star){
	var self = this;
	for(var i=0,l=GrowingMasterModel.master.length;i<l;i++){
		var growing = GrowingMasterModel.master[i];
		if(growing.character_id() != character_id || growing.star() != star){
			continue;
		}
		return growing;
	}
	return null;
};
GrowingMasterModel.prototype.character_id = function() {
	return this.data.character_id;
};
GrowingMasterModel.prototype.star = function() {
	return this.data.star;
};
GrowingMasterModel.prototype.strength = function() {
	return this.data.strength;
};
GrowingMasterModel.prototype.force = function() {
	return this.data.force;
};
GrowingMasterModel.prototype.strategy = function() {
	return this.data.strategy;
};
GrowingMasterModel.prototype.command = function() {
	return this.data.command;
};
GrowingMasterModel.prototype.intelligence = function() {
	return this.data.intelligence;
};
GrowingMasterModel.prototype.agility = function() {
	return this.data.agility;
};
