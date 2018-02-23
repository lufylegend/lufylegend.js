function CharacterDetailView(controller,characterModel){
	var self = this;
	base(self,LView,[controller]);
	self.characterModel = characterModel;
	self.set();
}
CharacterDetailView.prototype.set=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.charaInit();
	self.ctrlLayerInit();
	return;
	self.titleLayerInit();
};
CharacterDetailView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.charaLayer = new LSprite();
	self.addChild(self.charaLayer);
	self.titleLayer = new LSprite();
	self.addChild(self.titleLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
CharacterDetailView.prototype.charaInit=function(){
	var self = this;
	var characterModel = self.characterModel;
	var card = new Card(characterModel);
	card.x = card.y = 10;
	self.charaLayer.addChild(card);
	
	var dataWin = new LBitmapData(LMvc.datalist["win06"]);
	return;
	for(var i=0,l=6;i<l;i++){
		var equ = new BitmapSprite("equipment/weapon/1.png");
		equ.scaleX = equ.scaleY = 100/120;
		equ.x = 250 + 110*(i%2);
		equ.y = 10 + 105 * Math.floor(i/2);
		self.charaLayer.addChild(equ);
		var winPanelEqu = new LPanel(dataWin,100,100);
		winPanelEqu.x = equ.x;
		winPanelEqu.y = equ.y;
		self.charaLayer.addChild(winPanelEqu);
	}
	for(var i=0,l=4;i<l;i++){
		var skill = new BitmapSprite("skill/1.jpg");
		skill.x = 10 + i*55;
		skill.y = 330;
		self.charaLayer.addChild(skill);
		var winPanelSkill = new LPanel(dataWin,50,50);
		winPanelSkill.x = skill.x;
		winPanelSkill.y = skill.y;
		self.charaLayer.addChild(winPanelSkill);
	}
};
CharacterDetailView.prototype.backLayerInit=function(){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = LGlobal.width / backgroundData.width;
	background.scaleY = LGlobal.height / backgroundData.height;
	self.backLayer.addChild(background);
};
CharacterDetailView.prototype.centerOnChild=function(){
	var self = this;
	if(self.stageLayer.y > 100){
		LTweenLite.to(self.stageLayer,0.5,{y:100});
	}else if(self.stageLayer.y < LGlobal.height - 100 - self.stageLayer.getHeight()){
		LTweenLite.to(self.stageLayer,0.5,{y:LGlobal.height - 100 - self.stageLayer.getHeight()});
	}
};
CharacterDetailView.prototype.titleLayerInit=function(){
	var self = this;
	var titleLayerHeight = 100;
	var headerBitmapData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = new LPanel(headerBitmapData,LGlobal.width,titleLayerHeight);
	self.titleLayer.addChild(panel);
	var area = StageModel.getArea();
	var title = new LTextField();
	title.text = area.name;
	title.size = 25;
	title.color = "#FFFFFF";
	title.lineColor = "#FF0000";
	title.stroke = true;
	title.lineWidth = 2;
	title.x = 30;
	title.y = 30;
	self.titleLayer.addChild(title);
	
	var degree = new LTextField();
	degree.text = "完成度:30%";
	degree.size = 18;
	degree.color = "#FFFFFF";
	degree.lineColor = "#FFFF00";
	degree.stroke = true;
	degree.lineWidth = 1;
	degree.x = 300;
	degree.y = 20;
	self.titleLayer.addChild(degree);
	
	var starIconData = new LBitmapData(LMvc.datalist["icon-star"],0,0,29,29);
	starIconData.setProperties(0,29,29,29);
	var starIcon = new LBitmap(starIconData);
	starIcon.x = 300;
	starIcon.y = 50;
	self.titleLayer.addChild(starIcon);
	starIcon = starIcon.clone();
	starIcon.bitmapData.setProperties(0,0,29,29);
	starIcon.x = 335;
	starIcon.y = 50;
	self.titleLayer.addChild(starIcon);
	starIcon = starIcon.clone();
	starIcon.x = 370;
	starIcon.y = 50;
	self.titleLayer.addChild(starIcon);
	
	self.titleLayer.y = -titleLayerHeight;
	LTweenLite.to(self.titleLayer,0.5,{y:0});
};
CharacterDetailView.prototype.close = function(event){
	var self = event.currentTarget.parent.parent;
	var fromView = self.fromView;
	self.remove();
	fromView.visible = true;
};
CharacterDetailView.prototype.ctrlLayerInit=function(){
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.close);
	return;
	var ctrlLayerHeight = 100;
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width,ctrlLayerHeight);
	self.ctrlLayer.addChild(bitmapWin);
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = ctrlLayerHeight - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.controller.closeStage);
	
	var title = new LTextField();
	title.text = "奖励：";
	title.size = 25;
	title.color = "#FFFFFF";
	title.lineColor = "#FF0000";
	title.stroke = true;
	title.lineWidth = 2;
	title.x = 130;
	title.y = 30;
	self.ctrlLayer.addChild(title);
	var sprite = new LSprite();
	sprite.graphics.drawRect(1, "#ff0000", [0, 0, 50, 50], true, "#880088");
	sprite.graphics.drawRect(1, "#ff0000", [60, 0, 50, 50], true, "#880088");
	sprite.graphics.drawRect(1, "#ff0000", [120, 0, 50, 50], true, "#880088");
	sprite.x = 250;
	sprite.y = 30;
	self.ctrlLayer.addChild(sprite);
	
	self.ctrlLayer.y = LGlobal.height;
	LTweenLite.to(self.ctrlLayer,0.5,{y:LGlobal.height - ctrlLayerHeight});
};