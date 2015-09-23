function EquipmentModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
}
EquipmentModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = EquipmentMasterModel.getMaster(self.equipment_id());
	}
	return self._master;
};
EquipmentModel.prototype.id = function(){
	return this.data.id;
};
EquipmentModel.prototype.count = function(){
	return this.data.cnt;
};
EquipmentModel.prototype.name = function(){
	return this.master().name();
};
EquipmentModel.prototype.equipment_id = function(){
	return this.data.equipment_id;
};
EquipmentModel.prototype.price = function(){
	return this.master().price();
};
EquipmentModel.prototype.icon=function(size){
	var self = this;
	if(!size){
		size = new LPoint(100,100);
	}
	var icon = self.master().icon(size);
	var name = new LTextField();
	name.text = self.id();
	icon.addChild(name);
	/*var lblCount = getStrokeLabel(this.count(),25,"#FFFFFF","#000000",3);
	lblCount.x = size.x - 5 - lblCount.getWidth();
	lblCount.y = 5;
	icon.addChild(lblCount);*/
	return icon;
};