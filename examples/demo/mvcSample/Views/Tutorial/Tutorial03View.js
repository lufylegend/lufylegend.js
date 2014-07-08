function Tutorial03View(){
	base(this,LView,[]);
}
Tutorial03View.prototype.construct=function(){
};
Tutorial03View.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);

	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["world_bg"]));
	self.backLayer.addChild(bitmap);
	
	self.addArms();
	self.setMenu();
};
Tutorial03View.prototype.addArms=function(){
	var self = this,i,l,arms = [
	{index:1,action:"down_attack",x:100,y:100},
	{index:2,action:"up_attack",x:100,y:150},
	{index:2,action:"down_attack",x:200,y:130},
	{index:1,action:"up_attack",x:200,y:180},
	{index:1,action:"down_attack",x:300,y:80},
	{index:2,action:"up_attack",x:300,y:130}
	],arm,data;
	for(i=0,l=arms.length;i<l;i++){
		data = arms[i];
		arm = new AttackCharacter(data.index);
		arm.x = data.x;
		arm.y = data.y;
		arm.anime.gotoAndPlay(data.action);
		self.backLayer.addChild(arm);
	}
	
};
Tutorial03View.prototype.talkChangeEvent=function(){
	var self = this;
	self.addEventListener(LMouseEvent.MOUSE_UP,self.talkChange);
};
Tutorial03View.prototype.talkChange=function(event){
	var self = event.clickTarget;
	self.removeEventListener(LMouseEvent.MOUSE_UP,self.talkChange);
	self.controller.talkChange();
};
Tutorial03View.prototype.setTalk=function(data){
	var self = this;
	Talk(self,data.index,data.sub_index,data.message,function(){
		self.talkChangeEvent();
	});
};
Tutorial03View.prototype.setAttackShow=function(data){
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
Tutorial03View.prototype.attackShowComplete=function(event){
	event.target.parent.removeChild(event.target);
};
Tutorial03View.prototype.setMenu=function(){
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