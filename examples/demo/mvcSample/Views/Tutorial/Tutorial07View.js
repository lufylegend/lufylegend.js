function Tutorial07View(){
	base(this,LView,[]);
}
Tutorial07View.prototype.construct=function(){
};
Tutorial07View.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);

	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["world_bg"]));
	self.backLayer.addChild(bitmap);
	
	self.addArms();
	self.setMenu();
	
	self.handLayer = new LSprite();
	self.addChild(self.handLayer);
};
Tutorial07View.prototype.handShow=function(){
	var self = this;
	self.addHand(120,300);
	Talk(0,1,"请选择屏幕上的强盗。",function(){
		//self.addEvent();
	});
};

Tutorial07View.prototype.addHand=function(x,y){
	var self = this;
	var hand = new Hand();
	hand.x = x;
	hand.y = y;
	self.handLayer.addChild(hand);
};
Tutorial07View.prototype.addArms=function(){
	var self = this;
	var arm = new AttackCharacter(2);
	arm.x = 90;
	arm.y = 240;
	arm.anime.gotoAndPlay("down_stand");
	self.backLayer.addChild(arm);
	arm.addEventListener(LMouseEvent.MOUSE_UP,function(){
		self.controller.toAttack();
	});
};
Tutorial07View.prototype.talkChangeEvent=function(){
	var self = this;
	self.addEventListener(LMouseEvent.MOUSE_UP,self.talkChange);
};
Tutorial07View.prototype.talkChange=function(event){
	var self = event.clickTarget;
	self.removeEventListener(LMouseEvent.MOUSE_UP,self.talkChange);
	self.controller.talkChange();
};
Tutorial07View.prototype.setTalk=function(data){
	var self = this;
	Talk(self,data.index,data.sub_index,data.message,function(){
		self.talkChangeEvent();
	});
};
Tutorial07View.prototype.setAttackShow=function(data){
	var self = this;
	self.die();
	self.removeAllChild();
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.backLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	var effect = new Effect02();
	effect.addEventListener(LEvent.COMPLETE, self.attackShowComplete);
	self.backLayer.addChild(effect);
	effect.x = data.x;
	effect.y = data.y;
	self.effect =effect;
};
Tutorial07View.prototype.attackShowComplete=function(event){
	event.target.parent.removeChild(event.target);
};
Tutorial07View.prototype.setMenu=function(){
	var self = this;
	var menuLayer = new LSprite();
	
	var bLayer = new LSprite();
	bLayer.alpha = 0.8;
	bLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,100],true,"#000000");
	bLayer.y = LGlobal.height - bLayer.getHeight();
	menuLayer.addChild(bLayer);
	
	var menuBar = new Bar(LGlobal.width,100);
	menuLayer.addChild(menuBar);
	menuBar.y = LGlobal.height - menuBar.getHeight();
	self.addChild(menuLayer);
	
	var buttonMap = new LButtonSample2("作戦",26);
	buttonMap.backgroundCorl = "red";
	menuLayer.addChild(buttonMap);
	buttonMap.x = 50;
	buttonMap.y = menuBar.y + 20;
	var buttonMain = new LButtonSample2("メイン",26);
	buttonMain.backgroundCorl = "red";
	menuLayer.addChild(buttonMain);
	buttonMain.x = 300;
	buttonMain.y = menuBar.y + 20;
	
	self.menuLayer = menuLayer;
};