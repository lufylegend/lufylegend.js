
function SingleCombatCharacter(characterModel) {
	var self = this;
	base(self, LSprite, []);
	self.characterModel = characterModel;
	self.list = {};
	self.to = new LPoint(self.x, self.y);
	self.readyMode = Character.READY_MODE_OUT;
	self.roads = [];
	self.layer = new LSprite();
	self.addChild(self.layer);
	var r = [0, 0, characterModel.size(), characterModel.size()];

	self.step = self.moveStep = 1.5;
	if (self.characterModel.moveType() == ArmsConfig.INFANTRY) {
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
	/*var hpBar = new HpBar(self.characterModel.maxHp());
	hpBar.y = BattleMapConfig.STEP_HEIGHT - hpBar.getHeight();
	self.addChild(hpBar);
	self.hpBar = hpBar;*/
	//self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
}

SingleCombatCharacter.prototype.addAnimation = function() {
	var self = this;
	var bitmapData,bitmapDataList = [];
	var characterSetting = self.characterModel.characterSetting();
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
SingleCombatCharacter.prototype.stop = function(event) {
	var self = this;
	self.anime.stop();
};
SingleCombatCharacter.prototype._animationComplete = function(event) {
	var self = this;
	self.dispatchEvent(LEvent.COMPLETE);
};
SingleCombatCharacter.prototype.setActionDirection = function(action, direction) {
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
		case ArmsConfig.INFANTRY:
		case ArmsConfig.CAVALRY:
		case ArmsConfig.AXEMAN:
		case ArmsConfig.CAVALRY_AXEMAN:
			self.attackShapes = self.addShape(LShape.RECT, [self.layer.x + data.sx, self.layer.y + data.sy, data.width, data.height]);
			//self.graphics.drawRect(2, "#ff0000", [self.layer.x + data.sx, self.layer.y + data.sy, data.width, data.height]);
			break;
		case ArmsConfig.ARCHER:
		case ArmsConfig.CAVALRY_ARCHER:
			self.attackShapes = self.addShape(LShape.ARC, [0, 0, BattleMapConfig.STEP_WIDTH*0.5]);
			//self.graphics.drawArc(2, "#000000", [0, 0, BattleMapConfig.STEP_WIDTH*0.5]);
			break;
	}console.log(data);
			self.graphics.drawRect(2, "#ff0000", [self.layer.x, self.layer.y, 320, 240]);
	self.leftX = self.layer.x + data.sx;
	self.topY = self.layer.y + data.sy;
	self.rightX = self.layer.x + data.sx + data.width;
	self.bottomY = self.layer.y + data.sy + data.height;
	self.clearShape();
	self.hertShapes = self.addShape(LShape.RECT, [self.layer.x + data.sx, self.layer.y + data.sy, data.width, data.height]);
	
	//self.hertShapes = self.addShape(LShape.RECT, [0, 0, 160, 120]);
	//self.hertShapes = self.addShape(LShape.RECT, [self.layer.x, self.layer.y, 320, 240]);
	
	self.action = action;
	self.direction = direction;
};
SingleCombatCharacter.prototype.changeAction = function(action) {
	this.setActionDirection(action, this.direction);
};
SingleCombatCharacter.prototype.changeDirection = function(direction) {
	this.setActionDirection(this.action, direction);
};
SingleCombatCharacter.prototype.setMoveDirection = function(x, y) {
	this.setActionDirection(CharacterAction.MOVE, this.directionList[x + "," + y]);
};
SingleCombatCharacter.prototype.setCoordinate = function(x, y) {
	var self = this;
	self.x = self.to.x = x;
	self.y = self.to.y = y;
};
SingleCombatCharacter.prototype.setTo = function(x, y) {
	var self = this;
	self.to.x = x;
	self.to.y = y;
};
SingleCombatCharacter.prototype.getValue = function(v1, v2) {
	if (v1 == v2){
		return 0;
	}
	return v1 < v2 ? 1 : -1;
};
