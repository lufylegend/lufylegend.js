function Tutorial08Controller(){
	base(this,MyController,[]);
}
Tutorial08Controller.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.run);
};
Tutorial08Controller.prototype.run=function(){
	var self = this;
	self.view.init();
	self.checkAction();
};
Tutorial08Controller.prototype.effectComplete=function(){
	var self = this;
	self.view.removeChild(self.ql);
};
Tutorial08Controller.prototype.checkAction=function(){
	var self = this;
	var action = self.model.getAction();
	if(action){
		switch(action.type){
			case "action":
				self.runAction(action);
				break;
			case "effect":
				self.runEffect(action);
				break;
			case "die":
				self.runDie(action);
				break;
			case "over":
				self.model.toAttack(self.attackOver);
				break;
		}
		
	}
};
Tutorial08Controller.prototype.attackOver=function(){
	var self = this;
	
	
	Talk(self.view,0,1,"好了，游戏教程部分就到这里了，本次游戏开发也暂时先到这里了。",function(){
		self.view.addEventListener(LMouseEvent.MOUSE_UP,function(event){
			LGlobal.talkLayer.removeAllChild();
			event.clickTarget.parent.controller.checkStep();
		});
		
	});
};
Tutorial08Controller.prototype.runDie=function(action){
	var self = this;
	var charas = action.chara;
	for(var i=0;i<charas.length;i++){
		var child = charas[i];
		var arm = self.view.arms[child.index];
		if(i==0){
			LTweenLite.to(arm,2,{alpha:0,onComplete:function(obj){
				self.checkAction();
			}});
		}else{
			LTweenLite.to(arm,2,{alpha:0});
		}
	}
	
};

Tutorial08Controller.prototype.runEffect=function(action){
	var self = this;console.log("runEffect");
	var arm = self.view.arms[action.chara];
	var effect = eval("new "+action.effect+"();");
	effect.x = arm.x - 100;
	effect.y = arm.y - 100;
	self.view.addChild(effect);
	effect.addEventListener(LEvent.COMPLETE,self.runEffectOver);
	if(action.effect == "Qinglong" || action.effect == "Baihu"){
		effect.x = (LGlobal.width - effect.getWidth())*0.5;
		effect.y = 100;
		
		effect.run();
	}
};
Tutorial08Controller.prototype.runEffectOver=function(event){
	var self = event.target.parent.controller;
	event.target.parent.removeChild(event.target);
	
	self.checkAction();
};

Tutorial08Controller.prototype.runAction=function(action){
	var self = this;
	var charas = action.chara;
	for(var i=0;i<charas.length;i++){
		var child = charas[i];
		var arm = self.view.arms[child.index];
		if(i==0)arm.main = true;
		arm.anime.addEventListener(LEvent.COMPLETE, self.runActionOver);
		arm.anime.gotoAndPlay(child.action);
		if(child.action == "hert"){
			self.addHert(arm,child.num);
		}
	}
	
};
Tutorial08Controller.prototype.addHert=function(arm,num){
	var self = this;console.log("Tutorial08Controller.prototype.addHert=");
	var text = new LTextField();
	text.color = "#FFFFFF";
	text.text = "-"+num;
	self.view.addChild(text);
	text.x = arm.x;
	text.y = arm.y;
	LTweenLite.to(text,2,{y:arm.y - 20,alpha:0,onComplete:function(obj){
		obj.parent.removeChild(obj);
	}});
};
Tutorial08Controller.prototype.runActionOver=function(anime){
	var arm = anime.parent;
	var self = arm.parent.parent.controller;
	arm.anime.removeEventListener(LEvent.COMPLETE, self.runActionOver);
	if(arm.main){
		arm.main = false;
		self.checkAction();
	}
};