function ChapterStatusModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
}
ChapterStatusModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = ChapterMasterModel.getMaster(self.id());
	}
	return self._master;
};
ChapterStatusModel.prototype.id=function(){
	return this.data.id;
};
ChapterStatusModel.prototype.index=function(){
	return this.data.index;
};
ChapterStatusModel.prototype.name=function(){
	return this.master().name();
};
