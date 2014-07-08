function MainController(){
	base(this,MyController,[]);
}
MainController.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.getSatus);
};
MainController.prototype.getSatus=function(){
	var self = this;
	self.model.getStatus(self.libraryLoad);
};
MainController.prototype.libraryLoad=function(){
	var self = this;
	self.loadMvc("Build/Official",self.officialLoad);
};
MainController.prototype.officialLoad=function(){
	var self = this;
	self.load.library(["Hand"],self.init);
};
MainController.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
};
MainController.prototype.cloudsRun = function(){
	var self = this;
	LTweenLite.to(self.view.cloud,10,{x:300}).  
	to(self.view.cloud,10,{delay:1,x:0,onComplete:function(){  
        self.cloudsRun();  
    }});  
};
MainController.prototype.selectBuild = function(buildType){
	var self = this;
	self.view.die();
	self.view.handLayer.removeAllChild();
	var build;
	switch(buildType){
		case "main":
			build = new OfficialController();
		break;
	}
	self.view.buildLayer.addChild(build.view);
};

MainController.prototype.talkChange=function(){
	var self = this;
	var msg = self.model.getTalkMessage();
	if(msg){
		self.view.setTalk(msg);
	}else{
		LGlobal.talkLayer.removeAllChild();
		self.view.handShow();
	}
};
MainController.prototype.tutorialOver = function(){
	var self = this;

};
