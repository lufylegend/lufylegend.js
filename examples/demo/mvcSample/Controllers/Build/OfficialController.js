function OfficialController(){
	base(this,MyController,[]);
}
OfficialController.prototype.construct=function(){
	var self = this;
	//var list = self.model.getImages();
	//self.load.image(list,self.init);
	//self.init();
	self.model.getBuild(self.buildComplete);
};
OfficialController.prototype.buildComplete=function(){
	var self = this;
	self.model.getTutorialStep(self.init);
};
OfficialController.prototype.init=function(step){
	var self = this;
	if(step <= LMvc.tutorialMax){
		self.tutorialing = true;
	}else{
		self.tutorialing = false;
	}
	self.view.init();
	if(self.tutorialing){
		self.view.handShow();
	}
};
OfficialController.prototype.lvUp = function(){
	var self = this;
	self.model.lvUp(self.lvUpComplete);
};
OfficialController.prototype.lvUpComplete = function(result){
	var self = this;
	if(result == true){
		if(self.tutorialing){
			self.tutorialingLvUp = true;
			self.view.tutorialLvUpComplete();
		}
	}else{
		
	}
};

