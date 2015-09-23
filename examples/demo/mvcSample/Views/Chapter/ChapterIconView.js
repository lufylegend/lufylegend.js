function ChapterIconView(controller,chapterStatus){
	var self = this;
	base(self,LView,[controller]);
	self.chapterStatus = chapterStatus;
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN, self.onDown);
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onUp);
}
ChapterIconView.prototype.onDown=function(event){
	var self = event.currentTarget;
	self.onTouching = true;
	self.saveTouch = {x:mouseX,y:mouseY,dx:mouseX,dy:mouseY,speed:0,touchMove:false};
	var parent = self.parent;
	parent.startDrag(event.touchPointID);
	self.controller.view.ctrlLayer.visible = false;
};
ChapterIconView.prototype.onUp=function(event){
	var self = event.currentTarget;
	self.onTouching = false;
	var parent = self.parent;
	parent.stopDrag();
	self.controller.view.ctrlLayer.visible = true;
	if(!self.saveTouch.touchMove){
		self.controller.showArea(self.chapterStatus.id());
	}else if(parent.x > 0){
		self.controller.view.centerOnChild();
	}else if(parent.x < -(parent.numChildren - 1) * LGlobal.width){
		self.controller.view.centerOnChild();
	}else if(self.saveTouch.speed > 30){
		self.controller.view.moveRight();
	}else if(self.saveTouch.speed < -30){
		self.controller.view.moveLeft();
	}else{
		self.controller.view.centerOnChild();
	}
};
ChapterIconView.prototype.onframe=function(event){
	var self = event.currentTarget;
	var parent = self.parent;
	if(parent.x + self.x > -LGlobal.width && parent.x + self.x < LGlobal.width){
		self.layer.visible = true;
		if(self.layer.numChildren == 0){
			self.set();
		}
	}else{
		self.layer.visible = false;
	}
	if(!self.onTouching){
		return;
	}
	if(!self.saveTouch.touchMove && (Math.abs(self.saveTouch.dx - mouseX) > 5 || Math.abs(self.saveTouch.dy - mouseY) > 5)){
		self.saveTouch.touchMove = true;
	}
	self.saveTouch.speed = self.saveTouch.x - mouseX;
	self.saveTouch.x = mouseX;
	self.saveTouch.y = mouseY;
};
ChapterIconView.prototype.set=function(){
	var self = this;
	//var chapter = new BitmapSprite(self.chapterStatus.img());
	var chapter = self.chapterStatus.master().img();
	chapter.x = 40;
	chapter.y = (LGlobal.height - 400) * 0.5;
	self.layer.addChild(chapter);
	
	var layer = new LSprite();
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win04"]),400,400);
	//bitmapWin = getBitmap(bitmapWin);
	//bitmapWin.x = chapter.x;
	//bitmapWin.y = chapter.y;
	layer.addChild(bitmapWin);
	var txtChapter = getStrokeLabel("第" + (self.chapterStatus.index() + 1) + "章 " + self.chapterStatus.master().name()
		,30,"#FFFFFF","#CCCCCC",1);
	txtChapter.x = (bitmapWin.getWidth() - txtChapter.getWidth()) * 0.5;
	//txtChapter.y = chapter.y;
	//txtChapter.y = - txtChapter.getHeight() - 5;
	bitmapWin.y = txtChapter.getHeight();
	layer.addChild(txtChapter);
	
	layer = getBitmap(layer);
	layer.x = chapter.x;
	layer.y = chapter.y - txtChapter.getHeight() + 5;
	
	self.layer.addChild(layer);
	return;
	var txtChapter = getStrokeLabel("第" + self.chapterStatus.id() + "章 " + self.chapterStatus.name()
		,30,"#FFFFFF","#CCCCCC",1);
	txtChapter.x = (LGlobal.width - txtChapter.getWidth()) * 0.5;
	txtChapter.y = chapter.y - txtChapter.getHeight() - 5;
	self.layer.addChild(txtChapter);
};