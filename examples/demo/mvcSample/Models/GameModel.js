function GameModel(){
	base(this,MyModel,[]);
}
GameModel.prototype.getCommonImages=function(){
	var list = [
		{name:"arm-1",path:LMvc.IMG_PATH+"attack/1.png"},
		{name:"arm-2",path:LMvc.IMG_PATH+"attack/2.png"},
		{name:"arm-3",path:LMvc.IMG_PATH+"attack/3.png"},
		{name:"arm-4",path:LMvc.IMG_PATH+"attack/4.png"},
		{name:"arm-5",path:LMvc.IMG_PATH+"attack/5.png"},
		{name:"bar-up",path:LMvc.IMG_PATH+"common/bar-up.png"},
		{name:"bar-right-up",path:LMvc.IMG_PATH+"common/bar-right-up.png"},
		{name:"bar-right-down",path:LMvc.IMG_PATH+"common/bar-right-down.png"},
		{name:"bar-right",path:LMvc.IMG_PATH+"common/bar-left.png"},
		{name:"bar-left-up",path:LMvc.IMG_PATH+"common/bar-left-up.png"},
		{name:"bar-left-down",path:LMvc.IMG_PATH+"common/bar-left-down.png"},
		{name:"bar-left",path:LMvc.IMG_PATH+"common/bar-left.png"},
		{name:"bar-down",path:LMvc.IMG_PATH+"common/bar-down.png"},
		{name:"talkbox",path:LMvc.IMG_PATH+"common/talk.png"},
		{name:"inputbox-1",path:LMvc.IMG_PATH+"common/inputbox-1.png"},
		{name:"close-button",path:LMvc.IMG_PATH+"common/close-button.png"}
	];
	return list;
};