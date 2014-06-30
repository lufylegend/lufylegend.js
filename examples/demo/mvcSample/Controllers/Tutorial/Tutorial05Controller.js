function Tutorial05Controller(){
	base(this,MyController,[]);
}
Tutorial05Controller.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.getSatus);
};
Tutorial05Controller.prototype.getSatus=function(){
	var self = this;
	self.model.getStatus(self.libraryLoad);
};
Tutorial05Controller.prototype.libraryLoad=function(){
	var self = this;
	self.loadMvc("Build/Jiuguan",self.jiuguanLoad);
};
Tutorial05Controller.prototype.jiuguanLoad=function(){
	var self = this;
	self.load.library(["Hand"],self.init);
};
Tutorial05Controller.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
	self.view.handShow();
};
Tutorial05Controller.prototype.cloudsRun = function(){
	var self = this;
	LTweenLite.to(self.view.cloud,10,{x:300}).  
	to(self.view.cloud,10,{delay:1,x:0,onComplete:function(){  
        self.cloudsRun();  
    }});  
};
Tutorial05Controller.prototype.selectBuild = function(buildType){
	var self = this;
	LGlobal.talkLayer.removeAllChild();
	self.view.die();
	self.view.handLayer.removeAllChild();
	
	var build = new JiuguanController();
	self.view.buildLayer.addChild(build.view);
};

Tutorial05Controller.prototype.talkChange=function(){
	var self = this;
	var msg = self.model.getTalkMessage();
	if(msg){
		self.view.setTalk(msg);
	}else{
		LGlobal.talkLayer.removeAllChild();
		self.view.handShow();
	}
};
Tutorial05Controller.prototype.tutorialOver = function(){
	var self = this;
	self.view.parent.controller.checkStep();
};
