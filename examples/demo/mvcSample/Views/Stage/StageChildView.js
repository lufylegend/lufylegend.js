function StageChildView(controller,stageStatus){
	var self = this;
	base(self,LView,[controller]);
	self.stageStatus = stageStatus;
	
	self.leftLayer = new LSprite();
	self.setLeft();
	
	self.addChild(self.leftLayer);
	
	self.rightLayer = new LSprite();
	self.setRight();
	self.rightLayer.x = LGlobal.width;
	self.addChild(self.rightLayer);
	
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	self.addEventListener(LMouseEvent.MOUSE_DOWN, self.onDown);
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onUp);
}
StageChildView.prototype.onDown=function(event){
	var self = event.currentTarget;
	self.onTouching = true;
	self.saveTouch = {x:mouseX,y:mouseY,dx:mouseX,dy:mouseY,speed:0,touchMove:false};
	var parent = self.parent;
	parent.startDrag(event.touchPointID);
};
StageChildView.prototype.onUp=function(event){
	var self = event.currentTarget;
	self.onTouching = false;
	var parent = self.parent;
	parent.stopDrag();
	if(self.saveTouch && !self.saveTouch.touchMove){
		
		if(self.rightShowButton.hitTestPoint(event.offsetX,event.offsetY)){
			self.rightLayer.visible = true;
			LTweenLite.to(self,0.5,{x:-LGlobal.width,onComplete:self.leftToHide});
		}else if(self.leftShowButton.hitTestPoint(event.offsetX,event.offsetY)){
			self.leftLayer.visible = true;
			LTweenLite.to(self,0.5,{x:0,onComplete:self.rightToHide});
		}else if(self.toBattleLeft.hitTestPoint(event.offsetX,event.offsetY) || self.toBattleRight.hitTestPoint(event.offsetX,event.offsetY)){
			self.controller.gotoSelect(self.stageStatus.id());
		}else if(self.items.length > 0){
			var item = self.items.find(function(child){
				return child.hitTestPoint(event.offsetX,event.offsetY);
			});
			if(item){
				//TODO:显示item详细窗口
				console.log("click item",item.item_id);
			}
		}
	}else{
		self.controller.view.centerOnChild();
	}
};
StageChildView.prototype.leftToHide=function(event){
	var self = event.target;
	self.leftLayer.visible = false;
	self.x = -LGlobal.width;
};
StageChildView.prototype.rightToHide=function(event){
	var self = event.target;
	self.rightLayer.visible = false;
	self.x = 0;
};
StageChildView.prototype.onframe=function(event){
	var self = event.currentTarget;
	var point = self.getRootCoordinate();
	if(point.y > LGlobal.height - 100 || point.y < -90){
		self.leftLayer.visible = false;
	}else{
		self.leftLayer.visible = true;
	}
	if(!self.onTouching){
		return;
	}
	if(!self.saveTouch.touchMove && (Math.abs(self.saveTouch.dx - mouseX) > 5 || Math.abs(self.saveTouch.dy - mouseY) > 5)){
		self.saveTouch.touchMove = true;
	}
	self.saveTouch.speed = self.saveTouch.y - mouseY;
	self.saveTouch.x = mouseX;
	self.saveTouch.y = mouseY;
};
StageChildView.prototype.setLeft=function(){
	var self = this;
	var layer = new LSprite();
	var backgroundBitmapData = new LBitmapData(LMvc.datalist["stageBackground"]);
	var backgroundBitmap = new LBitmap(backgroundBitmapData);
	layer.addChild(backgroundBitmap);

	var title = getStrokeLabel(self.stageStatus.master().name(),20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth()) * 0.5;
	title.y = 15;
	layer.addChild(title);
	
	var booty = getStrokeLabel("可能获得",15,"#FFFFFF","#000000",4);
	booty.x = 130;
	booty.y = 55;
	layer.addChild(booty);
	
	var faceX = 20, faceY = 50;
	var chara = getStrokeLabel(self.stageStatus.enemy().name(),15,"#FFFFFF","#000000",4);
	chara.x = faceX + (100 - chara.getWidth()) * 0.5;
	chara.y = faceY + 102;
	layer.addChild(chara);
	
	layer = getBitmap(layer);
	self.leftLayer.addChild(layer);
	
	var buttonDetailed = getButton("侦察军情",120);
	buttonDetailed.x = backgroundBitmapData.width - buttonDetailed.getWidth() - 35;
	buttonDetailed.y = 65;
	self.leftLayer.addChild(buttonDetailed);
	self.rightShowButton = buttonDetailed;
	
	var buttonBattle = getButton("战斗",120);
	buttonBattle.x = backgroundBitmapData.width - buttonBattle.getWidth() - 35;
	buttonBattle.y = buttonDetailed.y + buttonDetailed.getHeight() + 5;
	self.leftLayer.addChild(buttonBattle);
	self.toBattleLeft = buttonBattle;
	
	var items = self.stageStatus.items();
	self.items = [];
	for(var i=0, l=items.length;i<l;i++){
		var item = items[i];
		var equ = item.icon(new LPoint(50, 50));
		equ.item_id = item.id();
		equ.x = 130 + (i % 3)*55;
		equ.y  = 75 + (i / 3 >> 0)*52;
		self.leftLayer.addChild(equ);
		self.items.push(equ);
	}
	
	var star = new Star(self.stageStatus.star(),3,Star.TYPE_RESULT);
	self.star = star;
	star.x = 335;
	star.y = 15;
	self.leftLayer.addChild(star);
	
	var face = self.stageStatus.enemy().minFace();
	face.x = faceX;
	face.y = faceY;
	self.leftLayer.addChild(face);
	
	if(self.stageStatus.lock()){
		var lockLayer = new LSprite();
		var bitmapData = new LBitmapData(LMvc.datalist["common-black"]);
		var bitmap = new LPanel(bitmapData,self.leftLayer.getWidth(),self.leftLayer.getHeight());
		bitmap.alpha = 0.5;
		lockLayer.addChild(bitmap);
		var lock = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
		lock.x = (self.leftLayer.getWidth() - lock.getWidth()) * 0.5;
		lock.y = (self.leftLayer.getHeight() - lock.getHeight()) * 0.5;
		lockLayer.addChild(lock);
		lockLayer = getBitmap(lockLayer);
		self.leftLayer.addChild(lockLayer);
		self.lock = lockLayer;
	}
};
StageChildView.prototype.setRight=function(){
	var self = this;
	self.rightLayer.visible = false;
	var layer = new LSprite();
	var backgroundBitmapData = new LBitmapData(LMvc.datalist["stageBackground"]);
	var backgroundBitmap = new LBitmap(backgroundBitmapData);
	self.rightLayer.addChild(backgroundBitmap);
	var characters = self.stageStatus.master().characters();
	for(var i = 0,l = characters.length;i<l;i++){
		var characterData = characters[i];
		var charaModel = new CharacterModel(self.controller,characterData);
		var face = charaModel.minFace(50);
		face.x = 20 + i*60;
		face.y = 20;
		self.rightLayer.addChild(face);
	}
	
	var buttonDetailed = getButton("返回",120);
	buttonDetailed.x = backgroundBitmapData.width - buttonDetailed.getWidth() - 35;
	buttonDetailed.y = 65;
	self.rightLayer.addChild(buttonDetailed);
	self.leftShowButton = buttonDetailed;
	
	var buttonBattle = getButton("战斗",120);
	buttonBattle.x = backgroundBitmapData.width - buttonBattle.getWidth() - 35;
	buttonBattle.y = buttonDetailed.y + buttonDetailed.getHeight() + 5;
	self.rightLayer.addChild(buttonBattle);
	self.toBattleRight = buttonBattle;
	self.rightLayer.x = 0;
};