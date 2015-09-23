function AreaStatusModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
}
AreaStatusModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = AreaMasterModel.getMaster(self.id());
	}
	return self._master;
};
AreaStatusModel.prototype.id=function(){
	return this.data.id;
};

AreaStatusModel.prototype.lock=function(){
	return this.data.lock;
};
