function CharacterListModel(){
	base(this,MyModel,[]);
}
CharacterListModel.prototype.construct=function(){
	var self = this;
	self.stageList = [];
};
CharacterListModel.prototype.getImages=function(){
	var list = [];
	list.push({name:"win01",path:LMvc.IMG_PATH+"win/win01.png"});
	list.push({name:"win03",path:LMvc.IMG_PATH+"win/win03.png"});
	list.push({name:"win05",path:LMvc.IMG_PATH+"win/win05.png"});
	list.push({name:"win06",path:LMvc.IMG_PATH+"win/win06.png"});
	list.push({name:"icon-return",path:LMvc.IMG_PATH+"icon/return.png"});
	list.push({name:"arrow",path:LMvc.IMG_PATH+"icon/arrow.png"});
	list.push({name:"icon-star",path:LMvc.IMG_PATH+"icon/star.png"});
	list.push({name:"lineups",path:LMvc.IMG_PATH+"battle/lineups.png"});
	list.push({name:"common-loading",path:LMvc.IMG_PATH+"common/loading.png"});
	list.push({name:"face-1",path:LMvc.IMG_PATH+"face/1.png"});
	return list;
};
CharacterListModel.prototype.getCharacters=function(callback){
	var self = this;
	var characters = UserModel.own().characters();
	if(characters){
		callback.call(self.controller);
		return;
	}
	LRequestCharacterGet({},self.characterGetComplete.bind(self));
};
CharacterListModel.prototype.characterGetComplete=function(data){
	var self = this;
	console.log(data);
	return;
	var characters = UserModel.own().characters();
	if(data){
		callback.call(self.controller);
		return;
	}
	LRequestCharacterGet({},self.characterGetComplete.bind(self));
};
