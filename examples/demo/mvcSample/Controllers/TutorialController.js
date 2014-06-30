function TutorialController(){
	base(this,MyController,[]);
}
TutorialController.prototype.construct=function(){
	var self = this;
	//self.checkStep();
};
TutorialController.prototype.checkStep=function(){
	var self = this;
	self.model.getTutorialStep(self.toStep);
};
TutorialController.prototype.toStep=function(step){
	var self = this;
	self.step = step;
	console.log(self.view,step);
	console.log(self.view.parent);
	if(self.step > LMvc.tutorialMax){
		self.view.parent.controller.getTutorial();
	}else{
		self.stepLoadStart();
	}
};
TutorialController.prototype.stepLoadStart=function(){
	var self = this;
	self.loadMvc("Tutorial/Tutorial"+(self.step > 9 ? self.step : ("0"+self.step)),self.stepLoadComplete,self);
};
TutorialController.prototype.stepLoadComplete=function(){
	var self = this;
	self.view.removeAllChild();
	self.view.die();
	console.log("new Tutorial"+(self.step > 9 ? self.step : ("0"+self.step))+"Controller();");
	var stepController = eval("new Tutorial"+(self.step > 9 ? self.step : ("0"+self.step))+"Controller();");
	console.log("stepController=",stepController,stepController.view);
	self.view.addChild(stepController.view);
};