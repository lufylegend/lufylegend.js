function MainModel(){
	base(this,MyModel,[]);
}
MainModel.prototype.construct=function(){
	var self = this;
};
MainModel.prototype.getImages=function(){
	var list = [
		{name:"main-background",path:LMvc.IMG_PATH+"main/background.png"},
		{name:"main-official",path:LMvc.IMG_PATH+"main/official.png"},
		{name:"main-tavern",path:LMvc.IMG_PATH+"main/tavern.png"},
		{name:"main-shop",path:LMvc.IMG_PATH+"main/shop.png"},
		{name:"main-button",path:LMvc.IMG_PATH+"main/button.png"},
		{name:"icon-header",path:LMvc.IMG_PATH+"icon/header.png"},
		{name:"icon-mainMenu",path:LMvc.IMG_PATH+"icon/mainMenu.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"win07",path:LMvc.IMG_PATH+"win/win07.png"},
		{name:"icon-return",path:LMvc.IMG_PATH+"icon/return.png"}
	];
	//人物头像
	list.push({name:"face-5",path:LMvc.IMG_PATH+"face/5.png"});
	return list;
};
