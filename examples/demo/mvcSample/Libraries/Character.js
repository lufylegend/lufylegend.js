/*
士兵 ： 
只有刀，枪，弓，分骑兵和步兵
武将 ：
除了士兵的种类之外，增加一些特殊兵种
策士，投石车等

攻击范围
刀兵，范围最小，保持不变
枪兵，刀兵的1.5倍，保持不变
弓兵，刀兵的2倍，随官职上升增加刀3倍
*/

var CharacterAction = {
	STAND : "stand",
	MOVE : "move",
	ATTACK : "attack",
	DIE : "die",
	HERT : "hert"
};
var CharacterDirection = {
	DOWN : "down",
	LEFT : "left",
	RIGHT : "right",
	UP : "up",
	LEFT_DOWN : "left_down",
	RIGHT_DOWN : "right_down",
	LEFT_UP : "left_up",
	RIGHT_UP : "right_up"
};
function Character(characterModel,belong) {
	var self = this;
	base(self, LSprite, []);
	self.characterModel = characterModel;
	self.belong = belong;
	self.sleep = 0;
	self.list = {};
	self.to = new LPoint(self.x, self.y);
	self.readyMode = Character.READY_MODE_OUT;
	self.roads = [];
	self.layer = new LSprite();
	self.addChild(self.layer);
	//var r = [0, 0, characterModel.size(), characterModel.size()];
	//self.layer.x = (BattleMapConfig.STEP_WIDTH - characterModel.size()) * 0.5;
	//self.layer.y = (BattleMapConfig.STEP_HEIGHT - characterModel.size()) * 0.5;
	
	self.step = self.moveStep = 1.5;
	if (self.characterModel.armsKind() == ArmsConfig.INFANTRY) {
		self.step = self.moveStep = 1;
	}
	self.moveBevelStep = self.moveStep * Math.sin(45 * Math.PI / 180);
	self.moveBevelStep = (self.moveBevelStep * 100 >>> 0) / 100;

	self.directionList = {
		"-1,-1" : CharacterDirection.LEFT_UP,
		"-1,0" : CharacterDirection.LEFT,
		"-1,1" : CharacterDirection.LEFT_DOWN,
		"0,-1" : CharacterDirection.UP,
		"0,1" : CharacterDirection.DOWN,
		"1,-1" : CharacterDirection.RIGHT_UP,
		"1,0" : CharacterDirection.RIGHT,
		"1,1" : CharacterDirection.RIGHT_DOWN
	};
	self.coordinateRects = {};
	self.addAnimation();
	var hpBar = new HpBar(self.characterModel.maxHp());
	hpBar.y = BattleMapConfig.STEP_HEIGHT - hpBar.getHeight();
	//self.addChild(hpBar);
	self.hpBar = hpBar;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
}

Character.READY_MODE_OUT = 0;
Character.READY_MODE_WAITING = 1;
Character.READY_MODE_GO = 2;
Character.READY_MODE_FREEZE = 3;
Character.BELONG_OUR = "belong_our";
Character.BELONG_ENEMY = "belong_enemy";
Character.MOVE_COMPLETE = "move_complete";
Character.AI_SPEED = 10;
Character.prototype.addAnimation = function() {
	var self = this;
	var bitmapData,bitmapDataList = [];
	var characterSetting = self.characterModel.master().characterSetting();
	for(var i=0;i<characterImageSetting.length;i++){
		bitmapData = new LBitmapData(LMvc.datalist[characterSetting.index + "_" + characterImageSetting[i]]);
		bitmapDataList.push(bitmapData);
	}
	self.anime = new LAnimationTimeline(bitmapDataList, characterSetting.data);
	self.anime.gotoAndPlay("move_down");
	var data = self.anime.imageArray[self.anime.rowIndex][self.anime.colIndex];
	self.layer.x = - characterSetting.width * 0.5;
	self.layer.y = - data.sy - data.height*0.8;
	self.anime.addEventListener(LEvent.COMPLETE, self._animationComplete.bind(self));
	self.anime.speed = 1;
	self.aiSpeed = 0;
	self.layer.addChild(self.anime);
};
Character.prototype.hitTestObject = function(displayObject) {
	var self = this;
	self.clearShape();
	self.addShapes(self.attackShapes);
	var hit = self.callParent("hitTestObject",arguments);
	self.clearShape();
	self.addShapes(self.hertShapes);
	return hit;
};
Character.prototype._animationComplete = function(event) {
	var self = this;
	if(self.readyMode == Character.READY_MODE_OUT || self.readyMode == Character.READY_MODE_WAITING){
		return;
	}
	self.dispatchEvent(LEvent.COMPLETE);
	if(self.action == CharacterAction.ATTACK){
		if(self.hitTestObject(self.attackTarget)){
			if(self.characterModel.arms() == ArmsConfig.ARCHER){
				var arrow = new AttackArrowView(self.characterModel.controller,self,self.attackTarget);
				self.parent.addChild(arrow);
			}else{
				self.attackTarget.atHert(self);
			}
			self.changeAction(CharacterAction.STAND);
			self.readyMode = Character.READY_MODE_FREEZE;
		} else {
			self.changeAction(CharacterAction.STAND);
		}
		var skill = self.characterModel.getSkill();
		if(skill){
			var shockwave = new ShockwaveView(self.characterModel.controller,self);
			self.parent.addChild(shockwave);
		}
		self.sleep = 60;
		/*
	} else if(self.action == CharacterAction.STAND){
		if(self.readyMode == Character.READY_MODE_FREEZE){
			self.readyMode = Character.READY_MODE_GO;
		}
		*/
	} else if(self.action == CharacterAction.DIE){
		self.remove();
	} else if(self.action == CharacterAction.HERT){
		self.changeAction(CharacterAction.STAND);
	} else {
		self.readyMode = Character.READY_MODE_GO;
	}
};
Character.prototype.atHert = function(chara,skill) {
	var self = this;
	if(self.characterModel.controller.mode != BattleMapConfig.GameBattle){
		return;
	}
	if(self.readyMode == Character.READY_MODE_OUT){
		self.readyMode = Character.READY_MODE_GO;
	}else{
		self.go();
	}
	var v = NormalHert(chara.characterModel,self.characterModel);
	var num = new Num(v,1,20);
	num.setValue(v);
	num.x = self.x;
	num.y = self.y - num.getHeight();
	self.characterModel.controller.view.numLayer.addChild(num);
	LTweenLite.to(num,1,{alpha:0.2,y:num.y - 50,onComplete:function(event){
		event.target.remove();
	}})
	
	self.characterModel.hp(-v);
	self.hpBar.change(-v);
	if(self.characterModel.hp() <= 0){
		console.log("self.action = ",self.action);
		if(self.action == CharacterAction.DIE){
			return;
		}
		if(self.belong == Character.BELONG_OUR){
			self.characterModel.controller.model.removeOurCharacter(self);
		} else {
			self.characterModel.controller.model.removeEnemyCharacter(self);
		}
		self.changeAction(CharacterAction.DIE);
		console.log("self.action CharacterAction.DIE = ",self.action);
	}else{
		self.changeAction(CharacterAction.HERT);
	}
};
Character.prototype.setActionDirection = function(action, direction) {
	var self = this;
	if (self.action == action && self.direction == direction) {
		return;
	}

	var label = action + "_" + direction;
	//console.error("label",label);
	self.anime.gotoAndPlay(label);
	var data = self.anime.imageArray[self.anime.rowIndex][self.anime.colIndex];
	
	self.clearShape();
	switch(self.characterModel.arms()){
		case ArmsConfig.KNIFE:
		case ArmsConfig.AXEMAN:
			self.attackShapes = self.addShape(LShape.RECT, [self.layer.x + data.sx, self.layer.y + data.sy, data.width, data.height]);
			break;
		case ArmsConfig.ARCHER:
			self.attackShapes = self.addShape(LShape.ARC, [0, 0, BattleMapConfig.STEP_WIDTH*0.5]);
			break;
	}
	self.clearShape();
	self.hertShapes = self.addShape(LShape.RECT, [self.layer.x + data.sx, self.layer.y + data.sy, data.width, data.height]);
	self.action = action;
	self.direction = direction;
};
Character.prototype.changeAction = function(action) {
	this.setActionDirection(action, this.direction);
};
Character.prototype.changeDirection = function(direction) {
	this.setActionDirection(this.action, direction);
};
Character.prototype.setMoveDirection = function(x, y) {
	this.setActionDirection(CharacterAction.MOVE, this.directionList[x + "," + y]);
};
Character.prototype.setCoordinate = function(x, y) {
	var self = this;
	self.x = self.to.x = x;
	self.y = self.to.y = y;
};
Character.prototype.setTo = function(x, y) {
	var self = this;
	self.to.x = x;
	self.to.y = y;
};
Character.prototype.getValue = function(v1, v2) {
	if (v1 == v2){
		return 0;
	}
	return v1 < v2 ? 1 : -1;
};
Character.prototype.move = function() {
	var self = this, controller = self.parent.parent.parent.controller;
	if (self.x == self.to.x && self.y == self.to.y){
		if(self.action != CharacterAction.STAND){
			self.changeAction(CharacterAction.STAND);
			return;
		}
		return;
	}
	if (self.x != self.to.x && self.y != self.to.y) {
		self.step = self.moveBevelStep;
	} else {
		self.step = self.moveStep;
	}
	var mx = self.getValue(self.x, self.to.x), my = self.getValue(self.y, self.to.y);
	self.x += self.step * mx;
	self.y += self.step * my;
	var cx = self.getValue(self.x, self.to.x), cy = self.getValue(self.y, self.to.y);
	if (mx != cx) {
		self.x = self.to.x;
	}
	if (my != cy) {
		self.y = self.to.y;
	}
	if (self.readyMode == Character.READY_MODE_OUT && self.x == self.to.x && self.y == self.to.y) {
		if(self.belong == Character.BELONG_ENEMY){
			self.readyMode = Character.READY_MODE_GO;
		}else{
			self.readyMode = Character.READY_MODE_WAITING;
			self.changeAction(CharacterAction.STAND);
			/*
			var label = new LTextField();
			label.text = "Go";
			label.color = "#FFFFFF";
			label.stroke = true;
			label.lineWidth = 2;
			label.lineColor = "#FF0000";
			self.waitLabel = label;
			self.layer.addChild(label);*/
		}
	}
	self.quadTreeUpdate();
	self.setMoveDirection(mx, my);
};
Character.prototype.quadTreeUpdate = function() {
	var self = this;
	var quadTree = self.characterModel.controller.quadTree;
	quadTree.remove(self);
	quadTree.add(self, self.x, self.y);
};
Character.prototype.hideOrShow = function() {
	var self = this;
	var point = self.getRootCoordinate();
	if(point.y + 100 < 0 || point.y > LGlobal.height + 100){
		self.hpBar.visible = false;
		self.anime.bitmap.visible = false;
	}else{
		self.hpBar.visible = true;
		self.anime.bitmap.visible = true;
	}
}
Character.prototype.onframe = function(event) {
	var self = event.currentTarget;
	self.hideOrShow();
	if(self.characterModel.controller.mode != BattleMapConfig.GameBattle){
		return;
	}
	if(self.action != CharacterAction.MOVE && self.action != CharacterAction.STAND){
		return;
	}
	if(self.readyMode == Character.READY_MODE_FREEZ){
		return;
	}
	if(self.sleep > 0){
		self.sleep--;
		return;
	}
	var quadTree = self.characterModel.controller.quadTree;
	var queryArr;
	var arms = self.characterModel.arms();
	
	switch(arms){
		case ArmsConfig.ARCHER:
			queryArr = quadTree.getDataInRect(new LRectangle(0,self.y - (self.belong == Character.BELONG_OUR ? BattleMapConfig.STEP_HEIGHT : 0),LGlobal.width,BattleMapConfig.STEP_HEIGHT*2));
			break;
		case ArmsConfig.KNIFE:
		case ArmsConfig.AXEMAN:
		default:
		
			queryArr = quadTree.getDataInRect(new LRectangle(0,self.y,LGlobal.width,BattleMapConfig.STEP_HEIGHT));
			break;
		
	}
	//var queryArr = quadTree.getDataInRect(new LRectangle(0,self.y,LGlobal.width,BattleMapConfig.STEP_HEIGHT));
	//var queryArr = quadTree.getDataInRect(new LRectangle(0,self.y - (self.belong == Character.BELONG_OUR ? BattleMapConfig.STEP_HEIGHT : 0),LGlobal.width,BattleMapConfig.STEP_HEIGHT*2));
	self.queryArr = queryArr;
	
	var length = queryArr.length, diffBelongCount = 0;
	for (var i = 0; i < length; i++) {
		chara = queryArr[i];
		if(chara.objectIndex == self.objectIndex || chara.belong == self.belong){
			continue;
		}
		diffBelongCount++;
		if(self.hitTestObject(chara)){
			var direction = self.getDirection(chara);
			self.attackTarget = chara;
			self.setActionDirection(CharacterAction.ATTACK,direction);
			return;
		}
	}
	if(diffBelongCount == 0){
		if(self.belong == Character.BELONG_OUR){
			var enemyCastle = self.characterModel.controller.view.enemyCastle;
			if(self.hitTestObject(enemyCastle)){
				self.attackTarget = enemyCastle;
				var direction = self.getDirection(self.attackTarget);
				self.setActionDirection(CharacterAction.ATTACK,direction);
				return;
			}
		} else if(self.belong == Character.BELONG_ENEMY){
			var ourCastle = self.characterModel.controller.view.ourCastle;
			if(self.hitTestObject(ourCastle)){
				self.attackTarget = ourCastle;
				var direction = self.getDirection(self.attackTarget);
				self.setActionDirection(CharacterAction.ATTACK,direction);
				return;
			}
		}
	}
	
	self.move();
	if (self.readyMode == Character.READY_MODE_GO) {
		self.checkTarget();
	}
};
Character.prototype.getDirection = function(chara) {
	var self = this;
	var direction,angle = Math.atan2(chara.y - self.y,chara.x - self.x)*180/Math.PI + 180;
	if(angle <= 22.5 || angle >= 337.5){
		direction = CharacterDirection.LEFT;
	}else if(angle > 22.5 && angle <= 67.5){
		direction = CharacterDirection.LEFT_UP;
	}else if(angle > 67.5 && angle <= 112.5){
		direction = CharacterDirection.UP;
	}else if(angle > 112.5 && angle <= 157.5){
		direction = CharacterDirection.RIGHT_UP;
	}else if(angle > 157.5 && angle <= 202.5){
		direction = CharacterDirection.RIGHT;
	}else if(angle > 202.5 && angle <= 247.5){
		direction = CharacterDirection.RIGHT_DOWN;
	}else if(angle > 247.5 && angle <= 292.5){
		direction = CharacterDirection.DOWN;
	}else{
		direction = CharacterDirection.LEFT_DOWN;
	}
	return direction;
};
Character.prototype.go = function() {
	var self = this;
	if(self.readyMode != Character.READY_MODE_WAITING){
		return;
	}
	self.readyMode = Character.READY_MODE_GO;
	if(self.waitLabel){
		self.waitLabel.remove();
		delete self.waitLabel;
	}
};
Character.prototype.checkTarget = function() {
	var self = this;
	if(self.aiSpeed++ < Character.AI_SPEED){
		return;
	}
	self.aiSpeed = 0;
	
	var quadTree = self.characterModel.controller.quadTree;
	var queryArr = self.queryArr;
	var chara,targetCharacter,charaList = [];
	
	for (var i = 0; i < queryArr.length; i++) {
		chara = queryArr[i];
		if(chara.objectIndex == self.objectIndex || chara.belong == self.belong){
			continue;
		}
		charaList.push(chara);
	}
	if(charaList.length > 0){
		targetCharacter = charaList[Math.random()*charaList.length >>> 0];
	}
	if(targetCharacter){
		self.setTo(targetCharacter.x - 20 + Math.random()*40,targetCharacter.y - 20 + Math.random()*40);
		self.toPoint = null;
	} else if(self.belong == Character.BELONG_OUR){
		var enemyCastle = self.characterModel.controller.view.enemyCastle;
		if(self.y < enemyCastle.y + enemyCastle.getHeight()){
			self.setTo(enemyCastle.x,self.y);
			self.toPoint = null;
		}else{
			if(!self.toPoint || self.toPoint.y >= self.y){
				self.toPoint = new LPoint(LGlobal.width*Math.random(),self.y - LGlobal.width);
			}
			self.setTo(self.toPoint.x, self.toPoint.y);
		}
	} else if(self.belong == Character.BELONG_ENEMY){
		var ourCastle = self.characterModel.controller.view.ourCastle;
		if(self.y > ourCastle.y){
			self.setTo(ourCastle.x,self.y);
			self.toPoint = null;
		}else{
			if(!self.toPoint || self.toPoint.y <= self.y){
				self.toPoint = new LPoint(LGlobal.width*Math.random(),self.y + LGlobal.width);
			}
			self.setTo(self.toPoint.x, self.toPoint.y);
		}
	}
};
/*
Character.prototype.die = function() {
	var self = this;
	if(self.belong == Character.BELONG_OUR){
		self.characterModel.controller.model.removeOurCharacter(self);
	}else{
		self.characterModel.controller.model.removeEnemyCharacter(self);
	}
	self.callParent("die",arguments);
};*/

