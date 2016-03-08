function CharacterStarMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "CharacterStarMasterModel";
	self.data = data;
}
CharacterStarMasterModel.master = [];
CharacterStarMasterModel.maxModel = null;
CharacterStarMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var charastar = new CharacterStarMasterModel(null,list[i]);
		if(!CharacterStarMasterModel.maxModel || CharacterStarMasterModel.maxModel.star() < charastar.star()){
			CharacterStarMasterModel.maxModel = charastar;
		}
		CharacterStarMasterModel.master.push(charastar);
	}
};
CharacterStarMasterModel.getMaster=function(star){
	var self = this;
	for(var i=0,l=CharacterStarMasterModel.master.length;i<l;i++){
		var charastar = CharacterStarMasterModel.master[i];
		if(charastar.star() != star){
			continue;
		}
		return charastar;
	}
	return null;
};
CharacterStarMasterModel.prototype.grade = function() {
	return this.data.grade;
};
CharacterStarMasterModel.prototype.star = function() {
	return this.data.star;
};
CharacterStarMasterModel.prototype.cost = function() {
	return this.data.cost;
};
CharacterStarMasterModel.prototype.isMax = function() {
	return this.star() == CharacterStarMasterModel.maxModel.star();
};