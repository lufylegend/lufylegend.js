function ItemModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
}
ItemModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = ItemMasterModel.getMaster(self.id());
	}
	return self._master;
};
ItemModel.prototype.id = function(){
	return this.data.item_id;
};
ItemModel.prototype.count = function(){
	return this.data.cnt;
};
ItemModel.prototype.name = function(){
	return this.master().name();
};
ItemModel.prototype.type = function(){
	return this.master().type();
};
ItemModel.prototype.child_id = function(){
	return this.master().child_id();
};
ItemModel.prototype.price = function(){
	return this.master().price();
};
ItemModel.prototype.explanation = function(){
	return this.master().explanation();
};
ItemModel.prototype.icon=function(size){
	if(!size){
		size = new LPoint(100,100);
	}
	var icon = this.master().icon(size);
	var lblCount = getStrokeLabel(this.count(),25,"#FFFFFF","#000000",3);
	lblCount.x = size.x - 5 - lblCount.getWidth();
	lblCount.y = 5;
	icon.addChild(lblCount);
	return icon;
};