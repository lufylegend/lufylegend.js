function ShopModel(){
	base(this,MyModel,[]);
}
ShopModel.prototype.construct=function(){
	var self = this;
};
ShopModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	//list.push({name:"tavern-tavernButton",path:LMvc.IMG_PATH+"tavern/tavern_button.png"});
	list.push({name:"win04",path:LMvc.IMG_PATH+"win/win04.png"});
	list.push({name:"icon-return",path:LMvc.IMG_PATH+"icon/return.png"});
	list.push({name:"arrow",path:LMvc.IMG_PATH+"icon/arrow.png"});
	list.push({name:"icon-ingot",path:LMvc.IMG_PATH+"icon/ingot.png"});
		
		
	return list;
};