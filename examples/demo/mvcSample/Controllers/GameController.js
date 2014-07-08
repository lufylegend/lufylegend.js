function GameController(){
	base(this,MyController,[]);
}
GameController.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	var list = self.model.getCommonImages();
	self.load.image(list,self.libraryLoad);
};
GameController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["Character","AttackCharacter","Face","Bar","effects/Effect02","effects/Qinglong","effects/Baihu","BitmapSprite","CoolingTime"],self.helperLoad);
};
GameController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk","UI"],self.getTutorial);
};
GameController.prototype.getTutorial=function(){
	var self = this;
	self.model.getTutorialStep(self.checkTutorial);
};

GameController.prototype.checkTutorial=function(step){
	var self = this;
	if(parseInt(step) > LMvc.tutorialMax){
		self.loadMvc("Main",self.mainShow,self);
	}else{
		self.loadMvc("Tutorial",self.tutorialShow,self);
	}
};
GameController.prototype.mainShow=function(){
	var self = this;
	LMvc.keepLoading(false);
	var main = new MainController();
	self.view.addChild(main.view);
};
GameController.prototype.tutorialShow=function(){
	var self = this;
	LMvc.keepLoading(false);
	var tutorial = new TutorialController();
	self.view.addChild(tutorial.view);
	tutorial.checkStep();
};
GameController.prototype.attackLoad=function(){
	var self = this;
	self.loadMvc("Attack",self.attackShow);
};
GameController.prototype.attackShow=function(){
	var self = this;
	self.view.removeAllChild();
	var attack = new AttackController();
	self.view.addChild(attack.view);
};