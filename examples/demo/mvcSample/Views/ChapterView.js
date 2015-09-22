function ChapterView(){
	base(this,LView,[]);
}
ChapterView.prototype.construct=function(){
};
ChapterView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.chapterLayer = new LSprite();
	self.addChild(self.chapterLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win04"]),LGlobal.width,LGlobal.height);
	self.addChild(getBitmap(bitmapWin));
};
ChapterView.prototype.backLayerInit=function(){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["common-black"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.scaleX = LGlobal.width / bitmapData.width;
	bitmap.scaleY = LGlobal.height / bitmapData.height;
	self.backLayer.addChild(bitmap);
};
ChapterView.prototype.chapterLayerInit=function(){
	var self = this;
	var chapters = self.model.chapters
	
	for(var i=0,l=chapters.length;i<l;i++){
		var chapterStatus = chapters[i];
		var chapter = new ChapterIconView(self.controller,chapterStatus);
		chapter.x = LGlobal.width * i;
		self.chapterLayer.addChild(chapter);
	}
	self.chapterLayer.dragRange = new LRectangle(-LGlobal.width * chapters.length,0,LGlobal.width * (chapters.length + 1),0);
};
ChapterView.prototype.ctrlLayerInit=function(){
	var self = this;
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.x = 10;
	leftButton.y = (LGlobal.height - leftBitmapData.height) * 0.5;
	self.ctrlLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow);
	var rightBitmapData = new LBitmapData(null,0,0,leftBitmapData.width,leftBitmapData.height,LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.scale(-1,1);
	matrix.translate(leftBitmapData.width,0);
	rightBitmapData.draw(left, matrix);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
	rightButton.x = LGlobal.width - leftButton.x - leftBitmapData.width;
	rightButton.y = leftButton.y;
	self.ctrlLayer.addChild(rightButton);
	rightButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickRightArrow);
	
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.controller.returnToMain);
};
ChapterView.prototype.clickLeftArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.chapterLayer.isMoving){
		return;
	}
	self.moveLeft();
};
ChapterView.prototype.clickRightArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.chapterLayer.isMoving){
		return;
	}
	self.moveRight();
};
ChapterView.prototype.centerOnChild=function(){
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
ChapterView.prototype.moveLeft=function(){
	var self = this;
	if(self.chapterLayer.x >= 0){
		return;
	}
	self.chapterLayer.isMoving = true;
	var tox = self.chapterLayer.x + LGlobal.width;
	tox = Math.floor(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.chapterLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
ChapterView.prototype.moveRight=function(){
	var self = this;
	if(self.chapterLayer.x <= -(self.chapterLayer.numChildren - 1)*LGlobal.width){
		return;
	}
	self.chapterLayer.isMoving = true;
	var tox = self.chapterLayer.x - LGlobal.width;
	tox = Math.ceil(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.chapterLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
ChapterView.prototype.moveComplete=function(event){
	event.target.isMoving = false;
};
ChapterView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.chapterLayerInit();
	self.ctrlLayerInit();
};