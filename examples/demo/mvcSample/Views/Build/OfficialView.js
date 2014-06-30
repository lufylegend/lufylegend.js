function OfficialView(){
	base(this,LView,[]);
}
OfficialView.prototype.init=function(){
	var self = this;
	self.backInit();
	self.titleInit();
	
	self.timeInit();
	self.conditionInit();
	self.mobilityInit();
	self.closeInit();
	
	self.handLayer = new LSprite();
	self.addChild(self.handLayer);
};
OfficialView.prototype.handShow=function(){
	var self = this;
	self.addHand(90,280);
	Talk(0,1,"请点击「升级」按钮，升级官府吧。",function(){
		//self.addEvent();
	});
};

OfficialView.prototype.addHand=function(x,y){
	var self = this;
	var hand = new Hand();
	hand.x = x;
	hand.y = y;
	self.handLayer.addChild(hand);
};
OfficialView.prototype.tutorialLvUpComplete = function(){
	var self = this;
	self.handLayer.removeAllChild();
	var msgLvUp = new LTextField();
	msgLvUp.text = "レベルアップしました！";
	msgLvUp.size = 24;
	msgLvUp.color = "#FF0000";
	msgLvUp.x = 100;
	msgLvUp.y = 300;
	self.addChild(msgLvUp);
	LTweenLite.to(msgLvUp,1,{y:250,alpha:0,onComplete:function(obj){
		self.tutorialToClose();
	}});
};
OfficialView.prototype.tutorialToClose=function(){
	var self = this;
	
	Talk(0,1,"请点击［閉じる］按钮，关闭页面。",function(){
		LGlobal.talkLayer.removeAllChild();
		self.addHand(280,700);
	});
};
OfficialView.prototype.closeInit=function(){
	var self = this;
	var bLayer = new LSprite();
	self.addChild(bLayer);
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["close-button"]));
	bLayer.addChild(bitmap);
	bLayer.x = (LGlobal.width - bitmap.getWidth())*0.5;
	bLayer.y = 700;
	bLayer.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(self.controller.tutorialing && !self.controller.tutorialingLvUp){
			return;
		}
		LTweenLite.to(self,1,{x:LGlobal.width,onComplete:function(obj){
			obj.parent.parent.controller.tutorialOver();
		}});
	});
};
OfficialView.prototype.backInit=function(){
	var self = this;
	var bLayer = new LSprite();
	bLayer.alpha = 0.8;
	bLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	self.addChild(bLayer);
	var bBar = new Bar(LGlobal.width,LGlobal.height);
	self.addChild(bBar);
};
OfficialView.prototype.titleInit=function(){
	var self = this;
	var titleLabel = new LTextField();
	titleLabel.color = "#FFFFFF";
	titleLabel.size = 20;
	titleLabel.text = "官府  Lv."+self.model.data.level;
	titleLabel.x = (LGlobal.width - titleLabel.getWidth())*0.5;
	titleLabel.y = 50;
	self.addChild(titleLabel);
	var bBar = new Bar(200,70);
	bBar.x = (LGlobal.width - bBar.getWidth())*0.5;
	bBar.y = 30;
	self.addChild(bBar);
};
OfficialView.prototype.timeInit=function(){
	var self = this;
	var coolingTime = new CoolingTime(0,200,"建築冷却時間");
	self.addChild(coolingTime);
	coolingTime.x = 100;
	coolingTime.y = 110;
	var speedUp = new LButtonSample2("加速",12);
	speedUp.backgroundCorl = "red";
	self.addChild(speedUp);
	speedUp.x = 340;
	speedUp.y = 107;
};
OfficialView.prototype.conditionInit=function(){
	var self = this;
	var bLayer = new LSprite();
	bLayer.alpha = 0.8;
	bLayer.graphics.drawRect(2,"#FFFFFF",[40,150,400,200]);
	self.addChild(bLayer);
	
	var titleLabel = new LTextField();
	titleLabel.color = "#FFFFFF";
	titleLabel.size = 16;
	titleLabel.text = "升级条件：";
	titleLabel.x = 50;
	titleLabel.y = 155;
	self.addChild(titleLabel);
	
	var silverLabel = new LTextField();
	silverLabel.color = "#FFFFFF";
	silverLabel.size = 12;
	silverLabel.text = "白銀："+self.model.data.cost_silver;
	silverLabel.x = 50;
	silverLabel.y = 195;
	self.addChild(silverLabel);
	
	var foodLabel = new LTextField();
	foodLabel.color = "#FFFFFF";
	foodLabel.size = 12;
	foodLabel.text = "粮："+self.model.data.cost_food;
	foodLabel.x = 50;
	foodLabel.y = 215;
	self.addChild(foodLabel);
	
	var woodLabel = new LTextField();
	woodLabel.color = "#FFFFFF";
	woodLabel.size = 12;
	woodLabel.text = "木材："+self.model.data.cost_wood;
	woodLabel.x = 190;
	woodLabel.y = 215;
	self.addChild(woodLabel);
	
	var ironLabel = new LTextField();
	ironLabel.color = "#FFFFFF";
	ironLabel.size = 12;
	ironLabel.text = "鉄："+self.model.data.cost_iron;
	ironLabel.x = 330;
	ironLabel.y = 215;
	self.addChild(ironLabel);
	
	var lvUp = new LButtonSample2("升级",15);
	lvUp.backgroundCorl = "red";
	self.addChild(lvUp);
	lvUp.x = 50;
	lvUp.y = 300;
	lvUp.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(self.controller.tutorialing && self.controller.tutorialingLvUp)return;
		self.controller.lvUp();
	});
};
OfficialView.prototype.mobilityInit=function(){
	var self = this;
	var bLayer = new LSprite();
	bLayer.alpha = 0.8;
	bLayer.graphics.drawRect(2,"#FFFFFF",[40,370,400,200]);
	self.addChild(bLayer);
	
	var titleLabel = new LTextField();
	titleLabel.color = "#FFFFFF";
	titleLabel.size = 16;
	titleLabel.text = "兵符：";
	titleLabel.x = 50;
	titleLabel.y = 375;
	self.addChild(titleLabel);
	
	var battleLabel = new LTextField();
	battleLabel.color = "#FFFFFF";
	battleLabel.size = 12;
	battleLabel.text = self.model.data.battle+"/20";
	battleLabel.x = 50;
	battleLabel.y = 415;
	self.addChild(battleLabel);
	
	var coolingTime = new CoolingTime(0,1800,"回復必要な時間");
	self.addChild(coolingTime);
	coolingTime.x = 50;
	coolingTime.y = 440;
	
	var lvUp = new LButtonSample2("兵符を買う",15);
	lvUp.backgroundCorl = "red";
	self.addChild(lvUp);
	lvUp.x = 50;
	lvUp.y = 480;
};
