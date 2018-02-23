function StageStatusModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
	
	var characters = self.master().characters();
	var enemyData = characters[characters.length - 1];
	
	//self._enemy = new CharacterModel(self.controller,self.changeToCharacterData(enemyData));
	self._enemy = new CharacterModel(self.controller,enemyData);
	console.log("StageStatusModel");
	self._items = [];
	var items = self.master().items();
	if(!items)return;
	for(var i=0,l=items.length;i<l;i++){
		self._items.push(ItemMasterModel.getMaster(items[i].item_id));
	} 
}
StageStatusModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = StageMasterModel.getMaster(self.id());
	}
	return self._master;
};
StageStatusModel.prototype.id=function(){
	return this.data.id;
};
StageStatusModel.prototype.name=function(){
	return this.master().name();
};
StageStatusModel.prototype.isChallenged=function(){
	return this.data.challenged;
};
StageStatusModel.prototype.star=function(){
	return this.data.star;
};
StageStatusModel.prototype.lock=function(){
	return this.data.lock;
};
/*
StageStatusModel.prototype.img=function(){
	return LMvc.IMG_PATH + "area/area-" + this.data.imgIndex + ".png";
};*/
StageStatusModel.prototype.enemy=function(){
	return this._enemy;
};
/*
StageStatusModel.prototype.characters=function(){
	return this.data.characters;
};
StageStatusModel.prototype.changeToCharacterData=function(data){
	return {id:data.character_id,star:data.star,level:data.level};
};*/
StageStatusModel.prototype.items=function(){
	return this._items;
};