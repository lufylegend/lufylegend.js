function ItemsModel(){
	base(this,MyModel,[]);
}
ItemsModel.prototype.construct=function(){
	this.itemList = [];
};
ItemsModel.prototype.getImages=function(){
	var self = this;
	var list = [
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win07.png"},
		{name:"tavern-getBackground",path:LMvc.IMG_PATH+"tavern/get_background.jpg"},
		{name:"item-character-stone",path:LMvc.IMG_PATH+"item/character_stone.png"},
		{name:"item-character-fragment",path:LMvc.IMG_PATH+"item/character_fragment.png"}
	];
	/*
	var itemModel;
	for(var i=0,l=self.itemList.length;i<l;i++){
		itemModel = self.itemList[i];
		list.push({name:"item-"+itemModel.id(),path:itemModel.img()});
	}*/
	
	return list;
};
ItemsModel.prototype.getItemsData=function(callback){
	var self = this;
	self.callback = callback;
	//LRequestItemItemList({"user_id":UserModel.own().id()},self.getItemsDataComplete.bind(self));
	LRequestItemItemList({},self.getItemsDataComplete.bind(self));
};
ItemsModel.prototype.sale=function(item_id, num, callback){
	var self = this;
	self.callback = callback;
	LRequestItemSale({"item_id":item_id, "number":num},self.getItemsDataComplete.bind(self));
};
ItemsModel.prototype.useItem=function(item_id, num, callback){
	var self = this;
	self.callback = callback;
	LRequestItemUse({"item_id":item_id, "number":num},self.getItemsDataComplete.bind(self));
};
ItemsModel.prototype.getItemsDataComplete=function(data){
	var self = this;
	if(data.user){
		UserModel.own().setPlayer(data.user);
	}
	self.itemList.length = 0;
	for(var i=0,l=data.items.length;i<l;i++){
		var area = new ItemModel(self.controller,data.items[i]);
		self.itemList.push(area);
	}
	self.controller.setValue("itemList",self.itemList);
	var callback = self.callback;
	delete self.callback;
	//"get":{"type":"character_stone","character":{"id":"6","character_id":"51","exp":"0","level":"1","star":"1"}
	callback.apply(self.controller,[data["get"]]);
};

