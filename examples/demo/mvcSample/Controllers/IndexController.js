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
IndexController.prototype.mainLoad=function(){
	var self = this;
	self.view.removeAllChild();
	self.loadMvc("Main",self.mainLoadComplete);
};
IndexController.prototype.mainLoadComplete=function(){
	var self = this;
	var main = new MainController();
	self.view.addChild(main.view);
};
IndexController.prototype.battleLoad=function(){
	var self = this;
	self.view.removeAllChild();
	self.loadMvc("Battle",self.battleLoadComplete);
};
IndexController.prototype.battleLoadComplete=function(){
	var self = this;
	var battle = new BattleController();
	self.view.addChild(battle.view);
};