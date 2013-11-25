function JiuguanView(){
	base(this,LView,[]);
}
JiuguanView.prototype.init=function(){
	var self = this;
	self.backInit();
	self.titleInit();
	
	self.timeInit();
	self.listInit();
	//self.mobilityInit();
	self.closeInit();
	
	self.handLayer = new LSprite();
	self.addChild(self.handLayer);
};
JiuguanView.prototype.handShow=function(){
	var self = this;
	self.addHand(380,200);
	Talk(0,1,"点击「白銀で募集」按钮，用银子招募这个武将吧。",function(){
		//self.addEvent();
	});
};

JiuguanView.prototype.addHand=function(x,y){
	var self = this;
	var hand = new Hand();
	hand.x = x;
	hand.y = y;
	self.handLayer.addChild(hand);
};
JiuguanView.prototype.tutorialingGetComplete = function(){
	var self = this;
	self.handLayer.removeAllChild();
	self.listLayer.visible = false;
	var msgLvUp = new LTextField();
	msgLvUp.text = "孫尚香を募集しました！";
	msgLvUp.size = 24;
	msgLvUp.color = "#FF0000";
	msgLvUp.x = 100;
	msgLvUp.y = 300;
	self.addChild(msgLvUp);
	LTweenLite.to(msgLvUp,1,{y:250,alpha:0,onComplete:function(obj){
		self.tutorialToClose();
	}});
};
JiuguanView.prototype.tutorialToClose=function(){
	var self = this;
	
	Talk(0,1,"「閉じる」ボタンを押してください。",function(){
		LGlobal.talkLayer.removeAllChild();
		self.addHand(280,700);
	});
};
JiuguanView.prototype.closeInit=function(){
	var self = this;
	var bLayer = new LSprite();
	self.addChild(bLayer);
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["close-button"]));
	bLayer.addChild(bitmap);
	bLayer.x = (LGlobal.width - bitmap.getWidth())*0.5;
	bLayer.y = 700;
	bLayer.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(self.controller.tutorialing && !self.controller.tutorialingGet){
			return;
		}
		LTweenLite.to(self,1,{x:LGlobal.width,onComplete:function(obj){
			obj.parent.parent.controller.tutorialOver();
		}});
	});
};
JiuguanView.prototype.backInit=function(){
	var self = this;
	var bLayer = new LSprite();
	bLayer.alpha = 0.8;
	bLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	self.addChild(bLayer);
	var bBar = new Bar(LGlobal.width,LGlobal.height);
	self.addChild(bBar);
};
JiuguanView.prototype.titleInit=function(){
	var self = this;
	var titleLabel = new LTextField();
	titleLabel.color = "#FFFFFF";
	titleLabel.size = 20;
	titleLabel.text = "酒馆";
	titleLabel.x = (LGlobal.width - titleLabel.getWidth())*0.5;
	titleLabel.y = 50;
	self.addChild(titleLabel);
	var bBar = new Bar(200,70);
	bBar.x = (LGlobal.width - bBar.getWidth())*0.5;
	bBar.y = 30;
	self.addChild(bBar);
};
JiuguanView.prototype.timeInit=function(){
	var self = this;
	var coolingTime = new CoolingTime(0,200,"次回自動更新時間");
	self.addChild(coolingTime);
	coolingTime.x = 100;
	coolingTime.y = 110;
	var speedUp = new LButtonSample2("強制更新",12);
	speedUp.backgroundCorl = "red";
	self.addChild(speedUp);
	speedUp.x = 340;
	speedUp.y = 107;
};
JiuguanView.prototype.listInit=function(){
	var self = this;
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	var list = self.model.data;
	for(var i=0;i<list.length;i++){
		var obj = list[i];
		
		var bLayer = new LSprite();
		bLayer.graphics.drawRect(2,"#FFFFFF",[40,0,400,170]);
		bLayer.y = 150 + 180*i;
		self.listLayer.addChild(bLayer);
		var chara = new Character(obj.index,0);
		chara.scaleX = chara.scaleY = 0.5;
		chara.x = 50;
		chara.y = 150 + 180*i;
		self.listLayer.addChild(chara);
		
		var nameLabel = new LTextField();
		nameLabel.color = "#FFFFFF";
		nameLabel.size = 12;
		nameLabel.text = "名前："+obj.name;
		nameLabel.x = 160;
		nameLabel.y = 160 + 180*i;
		self.listLayer.addChild(nameLabel);
		
		var armLabel = new LTextField();
		armLabel.color = "#FFFFFF";
		armLabel.size = 12;
		armLabel.text = "種類："+obj.arm;
		armLabel.x = 160;
		armLabel.y = 180 + 180*i;
		self.listLayer.addChild(armLabel);
		
		var forceLabel = new LTextField();
		forceLabel.color = "#FFFFFF";
		forceLabel.size = 12;
		forceLabel.text = "武力："+obj.force;
		forceLabel.x = 160;
		forceLabel.y = 200 + 180*i;
		self.listLayer.addChild(forceLabel);
		
		var intelligenceLabel = new LTextField();
		intelligenceLabel.color = "#FFFFFF";
		intelligenceLabel.size = 12;
		intelligenceLabel.text = "智力："+obj.intelligence;
		intelligenceLabel.x = 160;
		intelligenceLabel.y = 220 + 180*i;
		self.listLayer.addChild(intelligenceLabel);
		
		var commandLabel = new LTextField();
		commandLabel.color = "#FFFFFF";
		commandLabel.size = 12;
		commandLabel.text = "統率："+obj.command;
		commandLabel.x = 160;
		commandLabel.y = 240 + 180*i;
		self.listLayer.addChild(commandLabel);
		
		var skillLabel = new LTextField();
		skillLabel.color = "#FFFFFF";
		skillLabel.size = 12;
		skillLabel.text = "スキル："+obj.skill;
		skillLabel.x = 160;
		skillLabel.y = 260 + 180*i;
		self.listLayer.addChild(skillLabel);
		
		var getLabel = new LTextField();
		getLabel.color = "#FFFFFF";
		getLabel.size = 12;
		getLabel.text = "募集：";
		getLabel.x = 160;
		getLabel.y = 280 + 180*i;
		self.listLayer.addChild(getLabel);
		
		var moneyLabel = new LTextField();
		moneyLabel.color = "#FFFFFF";
		moneyLabel.size = 12;
		moneyLabel.text = "黄金："+obj.gold+" / 白銀："+obj.silver;
		moneyLabel.x = 160;
		moneyLabel.y = 300 + 180*i;
		self.listLayer.addChild(moneyLabel);
		
		
		var goldGet = new LButtonSample2("黄金で募集",15);
		goldGet.backgroundCorl = "red";
		self.listLayer.addChild(goldGet);
		goldGet.x = 300;
		goldGet.y = 180 + 180*i;
		var silverGet = new LButtonSample2("白銀で募集",15);
		silverGet.backgroundCorl = "red";
		self.listLayer.addChild(silverGet);
		silverGet.x = 300;
		silverGet.y = 220 + 180*i;
		silverGet.addEventListener(LMouseEvent.MOUSE_UP,function(){console.log((self.controller.tutorialing +"&&"+ self.controller.tutorialingLvUp));
			if(self.controller.tutorialing && self.controller.tutorialingGet)return;
			self.controller.getChara();
		});
	}
};