function Tutorial03Controller(){
	base(this,MyController,[]);
}
Tutorial03Controller.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.loadLibrary);
};
Tutorial03Controller.prototype.loadLibrary=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.library(["AttackCharacter","effects/Effect02"],self.init);
};
Tutorial03Controller.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
	self.view.setTalk(self.model.getTalkMessage());
};

Tutorial03Controller.prototype.talkChange=function(){
	var self = this;
	var msg = self.model.getTalkMessage();
	if(msg){
		self.view.setTalk(msg);
	}else{
		LGlobal.talkLayer.removeAllChild();
		LTweenLite.to({},1,{delay:0,onComplete:function(){
			self.view.setAttackShow({x:100,y:100});
		}});
		LTweenLite.to({},1,{delay:0.5,onComplete:function(){
			self.view.setAttackShow({x:200,y:200});
		}});
		LTweenLite.to({},1,{delay:1,onComplete:function(){
			self.view.setAttackShow({x:150,y:150});
		}});
		LTweenLite.to({},1,{delay:1.5,onComplete:function(){
			self.model.setAttackShowOver(self.attackshowOver);
		}});
	}
};
Tutorial03Controller.prototype.attackshowOver=function(){
	var self = this;
	self.view.parent.controller.checkStep();
};