function Tutorial07Controller(){
	base(this,MyController,[]);
}
Tutorial07Controller.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.loadLibrary);
};
Tutorial07Controller.prototype.loadLibrary=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.library(["AttackCharacter","Hand","effects/Effect02"],self.init);
};
Tutorial07Controller.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
	self.view.handShow();
};

Tutorial07Controller.prototype.talkChange=function(){
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
Tutorial07Controller.prototype.toAttack=function(){
	var self = this;
	self.model.toAttack(self.attackInOver);
};
Tutorial07Controller.prototype.attackInOver=function(){
	var self = this;
	LGlobal.talkLayer.removeAllChild();
	self.view.die();
	self.view.handLayer.removeAllChild();
	self.view.parent.controller.checkStep();
};