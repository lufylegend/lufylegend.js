function CharacterSelectView() {
	base(this, LView, []);
}

CharacterSelectView.prototype.construct = function() {
};
CharacterSelectView.prototype.layerInit = function() {
	var self = this;
	self.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);

	self.characterListLayer = new LSprite();
	self.baseLayer.addChild(self.characterListLayer);

	self.characterCheckedBackgroundLayer = new LSprite();
	self.characterCheckedBackgroundLayer.x = 20;
	self.characterCheckedBackgroundLayer.y = 360;
	self.baseLayer.addChild(self.characterCheckedBackgroundLayer);
	self.armLayer = new LSprite();
	self.armLayer.x = self.characterCheckedBackgroundLayer.x;
	self.armLayer.y = self.characterCheckedBackgroundLayer.y + 70;
	self.baseLayer.addChild(self.armLayer);

	self.characterCheckedLayer = new LSprite();
	self.characterCheckedLayer.x = self.characterCheckedBackgroundLayer.x;
	self.characterCheckedLayer.y = self.characterCheckedBackgroundLayer.y;
	self.baseLayer.addChild(self.characterCheckedLayer);

	self.lineupsLayer = new LSprite();
	self.addChild(self.lineupsLayer);
		
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
CharacterSelectView.prototype.backLayerInit = function() {
	var self = this;
};
CharacterSelectView.prototype.init = function() {
	var self = this;
	self.layerInit();
	console.log("layerInit");
	self.backLayerInit();
	console.log("backLayerInit");
	self.setCharacterList();
	console.log("setCharacterList");
	self.setCharacterCheckedBackground();
	console.log("setCharacterCheckedBackground");
	self.setArms();
	console.log("setArms");
	self.ctrlLayerInit();
};
CharacterSelectView.prototype.ctrlLayerInit = function() {
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	var goBitmapData = new LBitmapData(LMvc.datalist["icon-go"]);
	var goBitmap = new LBitmap(goBitmapData);
	var goButton = new LButton(goBitmap);
	goButton.x = LGlobal.width - goBitmapData.width - 20;
	goButton.y = LGlobal.height - goBitmapData.height - 20;
	self.ctrlLayer.addChild(goButton);
	//returnButton.addEventListener(LMouseEvent.MOUSE_UP, self.controller.close);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP, self.cancelOnClick);
	goButton.addEventListener(LMouseEvent.MOUSE_UP, self.gotoBattleConfirm);
};
CharacterSelectView.prototype.cancelOnClick = function(event) {
	console.log("cancelOnClick LTweenLite",LTweenLite.count());
	if(LTweenLite.count() > 0){
		return;
	}
	var self = event.currentTarget.parent.parent;
	if(self.lineupsLayer.numChildren == 0){
		self.controller.close();
	}else{
		self.baseLayer.visible = true;
		LTweenLite.to(self.lineupsLayer, 0.5, {
			y : -self.baseLayer.y,
			alpha : 0
		});
		LTweenLite.to(self.baseLayer, 0.5, {
			y : 0,
			onComplete : self.clearLineupsLayer.bind(self)
		});
	}
};
CharacterSelectView.prototype.clearLineupsLayer = function() {
	var self = this;
	self.lineupsLayer.die();
	self.lineupsLayer.removeAllChild();
	self.lineupsLayer.y = 0;
	self.lineupsLayer.alpha = 1;
};
CharacterSelectView.prototype.gotoBattleConfirm = function(event) {
	console.log("gotoBattleConfirm LTweenLite",LTweenLite.count());
	if(LTweenLite.count() > 0){
		return;
	}
	var self = event.currentTarget.parent.parent, obj;
	if(self.lineupsLayer.numChildren > 0){
		self.gotoBattle();
		return;
	}
	if (self.characterCheckedLayer.numChildren == 6) {
		//self.gotoBattle();
		self.toSelectLineups();
		return;
	}else if (self.characterCheckedLayer.numChildren == 0) {
		obj = {
			title : "确认",
			message : "请选择武将出战！",
			okText : "确定",
			okEvent : self.confirmCancel
		};
	}else{
		obj = {
			title : "确认",
			message : "队伍中的武将人数不足六人，确定出战吗？",
			okText : "确定",
			okEvent : self.confirmOk,
			cancelText : "取消",
			cancelEvent : self.confirmCancel
		};
	}
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
CharacterSelectView.prototype.confirmOk = function(event) {
	var self = event.currentTarget.parent.parent;
	event.currentTarget.parent.remove();
	self.toSelectLineups();
};
CharacterSelectView.prototype.toSelectLineups = function() {
	var self = this;
	LTweenLite.to(self.baseLayer, 0.5, {
		y : -self.armLayer.y - 100,
		onComplete : self.lineupsSelect.bind(self)
	});
};
CharacterSelectView.prototype.lineupsSelect = function() {
	var self = this;
	self.baseLayer.visible = false;
	
	var soldiers = [0,0,0,0,0,0], lineups = [];
	self.characterCheckedLayer.childList.forEach(function(child) {
		soldiers = child.characterModel.soldiers(soldiers);
		lineups = child.characterModel.lineups(lineups);
	});
	for(var i=0;i<lineupsConfig.length;i++){
		var lineupChild = lineupsConfig[i];
		var lineup = lineups.find(function(child){
			return child == lineupChild.id;
		});
		if(lineup == null){
			continue;
		}
		var rect = lineupChild.rect;
		var lineupWidth = 100, lineupHeight = 100;
		var lineupBitmap = new LBitmap(new LBitmapData(LMvc.datalist["lineups"],rect[0],rect[1],rect[2],rect[3]));
		lineupBitmap.id = lineupChild.id;
		lineupBitmap.scaleX = lineupWidth/lineupBitmap.bitmapData.width;
		lineupBitmap.scaleY = lineupHeight/lineupBitmap.bitmapData.height;
		lineupBitmap.x = 25 + (lineupWidth + 10) * (i % 4);
		lineupBitmap.y = (lineupHeight + 10) * (i / 4 >>> 0);
		self.lineupsLayer.addChild(lineupBitmap);
	}
	self.setLineups(self.lineupsLayer.getChildAt(0).id);
	self.lineupsLayer.addEventListener(LMouseEvent.MOUSE_UP, self.lineupsOnClick);
};
CharacterSelectView.prototype.lineupsOnClick = function(event) {
	var self = event.currentTarget.parent;
	self.setLineups(event.target.id);
};
CharacterSelectView.prototype.setLineups = function(id) {
	var self = this;
	self.lineupsId = id;
	self.lineupsLayer.childList.forEach(function(child) {
		if(child.id == id){
			child.bitmapData.setCoordinate(child.bitmapData.x,child.bitmapData.height);
		}else{
			child.bitmapData.setCoordinate(child.bitmapData.x,0);
		}
	});
};
CharacterSelectView.prototype.confirmCancel = function(event) {
	event.currentTarget.parent.remove();
};
CharacterSelectView.prototype.gotoBattle = function() {
	var self = this;
	var obj = {
			title : "确认",
			message : "战斗画面没有做。",
			okText : "确定",
			okEvent : self.confirmOk
		};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
CharacterSelectView.prototype.setArms = function() {
	var self = this;
	var layer = new LSprite();
	var bitmapData = new LBitmapData(LMvc.datalist["win06"]);
	for (var i = 0; i < ArmsConfig.Arms.length; i++) {
		var panel = new LPanel(bitmapData, 70, 70);
		panel.x = 75 * i;
		layer.addChild(panel);
		var chara = self.model.arms.find(function(child){
			return child.character_id() == ArmsConfig.Arms[i].id;
		});
		console.log("chara="+chara);
		var face = chara.minFace(60);
		face.charaId = chara.character_id();
		face.bitmapData.setCoordinate(60,face.bitmapData.y);
		face.x = panel.x + 5;
		face.y = 5;
		self.armLayer.addChildAt(face);
	}
	layer = getBitmap(layer);
	self.armLayer.addChildAt(layer,0);
};
CharacterSelectView.prototype.setCharacterCheckedBackground = function() {
	var self = this;
	var layer = new LSprite();
	var bitmapData = new LBitmapData(LMvc.datalist["win06"]);
	for (var i = 0; i < 6; i++) {
		var panel = new LPanel(bitmapData, 70, 70);
		panel.x = 75 * i;
		layer.addChild(panel);
	}
	layer = getBitmap(layer);
	self.characterCheckedBackgroundLayer.addChild(layer);
};
CharacterSelectView.prototype.setCharacterList = function() {
	var self = this;
	var userModel = UserModel.own();
	var characterList = userModel.characters();

	var backLayer = new LSprite();
	//self.characterListLayer.addChild(backLayer);

	for (var i = 0, l = characterList.length; i < l; i++) {
		var child = new CharacterSelectChildView(self.controller, characterList[i]);
		child.x = 110 * (i % 4);
		child.y = 110 * (i / 4 >>> 0);
		backLayer.addChild(child);
		//child.addEventListener(LMouseEvent.MOUSE_DOWN, self.characterClickDown);
		//child.addEventListener(LMouseEvent.MOUSE_UP, self.characterClickUp);
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, 430, 110 * ((characterList.length / 4 >>> 0) + 1) - 10]);
	self.characterListLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, 430, 330, 10);
	sc.x = 25;
	sc.y = 20;
	self.characterListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.characterClickDown.bind(self));
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.characterClickUp.bind(self));
};
CharacterSelectView.prototype.characterClickDown = function(event) {
	var self = this;
	var chara = event.target;
	self.clickIndex = chara.objectIndex;
	chara.offsetX = event.offsetX;
	chara.offsetY = event.offsetY;
};
CharacterSelectView.prototype.characterClickUp = function(event) {
	console.log("characterClickUp LTweenLite="+LTweenLite.count());
	//console.log("characterClickUp =name "+event.target.constructor.name);
	if(event.target.constructor.name != "CharacterSelectChildView"/* || LTweenLite.count()>0*/){
		return;
	}
	var self = this;
	var chara = event.target;
	if(self.clickIndex != chara.objectIndex){
		return;
	}
	//var self = event.currentTarget.parent.parent.parent.parent.parent;
	
	//console.log("characterClickUp model id="+chara.characterModel.id());
	if (chara.isChecked()) {
		var cancelChara = self.characterCheckedLayer.childList.find(function(child) {
			return child.characterModel.id() == chara.characterModel.id();
		});
		self.characterCancelRun(cancelChara);
		return;
	}
	if (self.characterCheckedLayer.numChildren >= 6) {
		return;
	}
	if (chara.offsetX && chara.offsetY && Math.abs(chara.offsetX - event.offsetX) < 5 && Math.abs(chara.offsetY - event.offsetY) < 5) {
		chara.check();
		console.log("chara=",chara);
		//console.log("chara.characterModel=",chara.characterModel);
		var charaClone = new CharacterSelectChildView(self.controller, chara.characterModel);
		var root = chara.getRootCoordinate();
		charaClone.x = root.x - self.characterCheckedLayer.x;
		charaClone.y = root.y - self.characterCheckedLayer.y;
		var index = self.characterCheckedLayer.numChildren;
		self.characterCheckedLayer.addChild(charaClone);
		//console.log("charaClone=",charaClone);
		self.characterSelectedChange();
		
		LTweenLite.to(charaClone, 0.4, {
			x : index * 75,
			y : 0,
			scaleX : 0.7,
			scaleY : 0.7,
			onComplete : self.characterCancelEvent
		});
	}
};
CharacterSelectView.prototype.characterSelectedChange = function() {
	var self = this;
	var soldiers = [0,0,0,0,0,0], lineups = [];
	self.characterCheckedLayer.childList.forEach(function(child) {
		soldiers = child.characterModel.soldiers(soldiers);
		lineups = child.characterModel.lineups(lineups);
	});
	console.log("characterClickUp soldiers,lineups", soldiers, lineups);
	for(var i=0;i<soldiers.length;i++){
		var charaId = ArmsConfig.Arms[i].id;
		var face = self.armLayer.childList.find(function(child){
		//console.log("child.constructor.name=",child.constructor.name,child.charaId);
			return child.constructor.name == "Face" && child.charaId == charaId;
		});
		//console.log("characterSelectedChange face="+face);
		if(soldiers[i] == 0){
			face.bitmapData.setCoordinate(60,face.bitmapData.y);
		}else{
			face.bitmapData.setCoordinate(0,face.bitmapData.y);
		}
	}
	console.log("characterSelectedChange over");
};
CharacterSelectView.prototype.characterCancelEvent = function(event) {
console.log("characterCancelEvent");
	var chara = event.target;
	var self = chara.parent.parent.parent;
	chara.addEventListener(LMouseEvent.MOUSE_UP, self.characterCancel);
};
CharacterSelectView.prototype.characterCancel = function(event) {
	var chara = event.currentTarget;
	var self = chara.parent.parent.parent;
	self.characterCancelRun(chara);
};
CharacterSelectView.prototype.characterCancelRun = function(chara) {
	var self = this;
	var root = chara.getRootCoordinate();
	LGlobal.destroy = false;
	self.characterCheckedLayer.removeChild(event.currentTarget);
	LGlobal.destroy = true;
	chara.x = root.x;
	chara.y = root.y;
	self.addChild(chara);
	var selectChara = self.characterListLayer.listLayer.childList.find(function(element, index, array) {
		return element.characterModel.id() == chara.characterModel.id();
	});
	selectChara.check();
	LTweenLite.to(chara, 0.5, {
		y : root.y - 150,
		alpha : 0,
		onComplete : self.characterCancelOver
	});
	var list = self.characterCheckedLayer.childList;
	for (var i = 0; i < self.characterCheckedLayer.numChildren; i++) {
		chara = list[i];
		chara.x = i * 75;
	}

	self.characterSelectedChange();
};
CharacterSelectView.prototype.characterCancelOver = function(event) {
	//var chara = event.target;
	event.target.remove();
};
