function TavernModel(){
	base(this,MyModel,[]);
}
TavernModel.prototype.construct=function(){
	var self = this;
};
TavernModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"tavern-tavernButton",path:LMvc.IMG_PATH+"tavern/tavern_button.png"});
	list.push({name:"win01",path:LMvc.IMG_PATH+"win/win01.png"});
	list.push({name:"win04",path:LMvc.IMG_PATH+"win/win04.png"});
	list.push({name:"win07",path:LMvc.IMG_PATH+"win/win07.png"});
	list.push({name:"icon-return",path:LMvc.IMG_PATH+"icon/return.png"});
	list.push({name:"tavern-getBackground",path:LMvc.IMG_PATH+"tavern/get_background.jpg"});
	list.push({name:"icon-star",path:LMvc.IMG_PATH+"icon/star.png"});
	list.push({name:"tavern-face-1",path:LMvc.IMG_PATH+"face/2.png"});
	list.push({name:"tavern-face-2",path:LMvc.IMG_PATH+"face/3.png"});
	list.push({name:"tavern-face-3",path:LMvc.IMG_PATH+"face/4.png"});
	list.push({name:"tavern-face-4",path:LMvc.IMG_PATH+"face/5.png"});
		
	return list;
};