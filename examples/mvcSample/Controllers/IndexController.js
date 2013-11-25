function IndexController(){
	base(this,MyController,[]);
}
IndexController.prototype.construct=function(){
	var self = this;
	self.loadMvc("Logo",self.logoLoad);
};
IndexController.prototype.logoLoad=function(){
	var self = this;
	var logo = new LogoController();
	self.view.addChild(logo.view);
};
IndexController.prototype.gameLoad=function(){
	var self = this;
	self.loadMvc("Game",self.gameStart);
};
IndexController.prototype.gameStart=function(){
	var self = this;
	self.view.removeAllChild();
	var gameBody = new GameController();
	self.view.addChild(gameBody.view);
};