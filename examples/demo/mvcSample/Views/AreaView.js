function AreaView(){
	base(this,LView,[]);
}
AreaView.prototype.construct=function(){
};
AreaView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.backLayer = new LSprite();
	self.baseLayer.addChild(self.backLayer);
	self.areaLayer = new LSprite();
	self.baseLayer.addChild(self.areaLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	return;
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win04"]),LGlobal.width,LGlobal.height);
	self.addChild(bitmapWin);
};
AreaView.prototype.backLayerInit=function(){
	var self = this;
	//self.backLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	var bitmapData = new LBitmapData(LMvc.datalist["area-map-"+self.model.mapIndex]);
	var background = new BackgroundView();
	background.set(bitmapData);
	self.backLayer.addChild(background);
};
AreaView.prototype.areaDragStart=function(event){
	event.currentTarget.parent.startDrag(event.touchPointID);
};
AreaView.prototype.areaDragStop=function(event){
	event.currentTarget.parent.stopDrag();
};
AreaView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.areaLayerInit();
	self.ctrlLayerInit();
	self.baseLayer.dragRange = new LRectangle(LGlobal.width - self.baseLayer.getWidth(),LGlobal.height - self.baseLayer.getHeight(),self.baseLayer.getWidth() - LGlobal.width,self.baseLayer.getHeight() - LGlobal.height);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,self.areaDragStart);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP,self.areaDragStop);
};
AreaView.prototype.areaLayerInit=function(){
	var self = this;
	var areaList = self.model.areas;
	for(var i=0,l=areaList.length;i<l;i++){
		var areaStatus = areaList[i];
		var area = new AreaIconView(self.controller,areaStatus);
		self.areaLayer.addChild(area);
	}
};
AreaView.prototype.ctrlLayerInit=function(){
	var self = this;
	
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.controller.returnToChapter);
};
AreaView.prototype.clickLeftArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.chapterLayer.isMoving){
		return;
	}
	self.moveLeft();
};
AreaView.prototype.clickRightArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.chapterLayer.isMoving){
		return;
	}
	self.moveRight();
};
AreaView.prototype.centerOnChild=function(){
	var self = this;
	if(self.chapterLayer.x / LGlobal.width == 0){
		return;
	}
	if(self.chapterLayer.x > 0){
		self.moveRight();
		return;
	}else if(self.chapterLayer.x < -(self.chapterLayer.numChildren - 1) * LGlobal.width){
		self.moveLeft();
	}
	var nx = Math.abs(self.chapterLayer.x % LGlobal.width);
	if(nx > LGlobal.width * 0.5){
		self.moveRight();
	}else{
		self.moveLeft();
	}
};
AreaView.prototype.moveLeft=function(){
	var self = this;
	if(self.chapterLayer.x >= 0){
		return;
	}
	self.chapterLayer.isMoving = true;
	var tox = self.chapterLayer.x + LGlobal.width;
	tox = Math.floor(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.chapterLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
AreaView.prototype.moveRight=function(){
	var self = this;
	if(self.chapterLayer.x <= -(self.chapterLayer.numChildren - 1)*LGlobal.width){
		return;
	}
	self.chapterLayer.isMoving = true;
	var tox = self.chapterLayer.x - LGlobal.width;
	tox = Math.ceil(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.chapterLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
AreaView.prototype.moveComplete=function(event){
	event.target.isMoving = false;
};