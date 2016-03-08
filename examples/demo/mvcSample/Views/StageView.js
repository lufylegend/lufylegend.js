function StageView(){
	base(this,LView,[]);
}
StageView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
StageView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.stageLayerInit();
	self.titleLayerInit();
	self.ctrlLayerInit();
};
StageView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.stageLayer = new LSprite();
	self.addChild(self.stageLayer);
	self.titleLayer = new LSprite();
	self.addChild(self.titleLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
StageView.prototype.backLayerInit=function(){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = LGlobal.width / backgroundData.width;
	background.scaleY = LGlobal.height / backgroundData.height;
	self.backLayer.addChild(background);
};
StageView.prototype.centerOnChild=function(){
	var self = this;
	if(self.stageLayer.y > 100){
		LTweenLite.to(self.stageLayer,0.5,{y:100});
	}else if(self.stageLayer.y < LGlobal.height - 100 - self.stageLayer.getHeight()){
		LTweenLite.to(self.stageLayer,0.5,{y:LGlobal.height - 100 - self.stageLayer.getHeight()});
	}
};
StageView.prototype.stageLayerInit=function(){
	var self = this;
	var stageList = self.model.stageList;
	for(var i=0,l=stageList.length;i<l;i++){
		var stageStatus = stageList[i];
		var stage = new StageChildView(self.controller,stageStatus);
		stage.x = (LGlobal.width - stage.getWidth())*0.5;
		stage.y = stage.getHeight() * i;
		self.stageLayer.addChild(stage);
	}
	self.stageLayer.y = 100;
	self.stageLayer.alpha = 0;
	self.stageLayer.dragRange = new LRectangle(0,LGlobal.height * 0.5-self.stageLayer.getHeight(),0,self.stageLayer.getHeight());
	LTweenLite.to(self.stageLayer,0.5,{delay:0.5,alpha:1});
};
StageView.prototype.titleLayerInit=function(){
	var self = this;
	var titleLayerHeight = 100;
	var headerBitmapData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = new LPanel(headerBitmapData,LGlobal.width,titleLayerHeight);
	panel = getBitmap(panel);
	self.titleLayer.addChild(panel);
	
	var area = StageModel.getArea();
	var title = new LTextField();
	title.text = area.name();
	title.size = 25;
	title.color = "#FFFFFF";
	title.lineColor = "#FF0000";
	title.stroke = true;
	title.lineWidth = 2;
	title.x = 30;
	title.y = 30;
	self.titleLayer.addChild(title);
	
	//TODO::
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
	
	//TODO::
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
StageView.prototype.ctrlLayerInit=function(){
	var self = this;
	var ctrlLayerHeight = 100;
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width,ctrlLayerHeight);
	bitmapWin = getBitmap(bitmapWin);
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
	//TODO::
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