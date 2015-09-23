function ExpMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "ExpMasterModel";
	self.data = data;
}
ExpMasterModel.master = [];
ExpMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var exp = new ExpMasterModel(null,list[i]);
		ExpMasterModel.master.push(exp);
	}
};
ExpMasterModel.getMaster=function(type, level){
	var self = this;
	for(var i=0,l=ExpMasterModel.master.length;i<l;i++){
		var exp = ExpMasterModel.master[i];
		if(exp.expType() != type && exp.level() != level){
			continue;
		}
		return exp;
	}
	return null;
};
ExpMasterModel.prototype.expType = function() {
	return this.data.exp_type;
};
ExpMasterModel.prototype.level = function() {
	return this.data.level;
};
ExpMasterModel.prototype.value = function() {
	return this.data.value;
};