function JiuguanController(){
	base(this,MyController,[]);
}
JiuguanController.prototype.construct=function(){
	var self = this;
	//var list = self.model.getImages();
	//self.load.image(list,self.init);
	//self.init();
	self.model.getCharaList(self.getCharaListComplete);
};
JiuguanController.prototype.getCharaListComplete=function(){
	var self = this;
	self.model.getTutorialStep(self.init);
};
JiuguanController.prototype.init=function(step){
	var self = this;console.log(step , LMvc.tutorialMax);
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
JiuguanController.prototype.getChara = function(){
	var self = this;
	self.model.getChara(self.getCharaComplete);
};
JiuguanController.prototype.getCharaComplete = function(result){
	var self = this;
	if(result == true){
		if(self.tutorialing){
			self.tutorialingGet = true;
			self.view.tutorialingGetComplete();
		}
	}else{
		
	}
};

