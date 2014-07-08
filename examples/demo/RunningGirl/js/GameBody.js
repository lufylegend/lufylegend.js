/**
 * @author lufy
 */
function GameBody(){
	base(this,LSprite,[]);
	this.init();
}
GameBody.prototype.init = function(){
	var self = this;
	self.moveStepCount = 0;
	self.gameover = false;
	var background = new Background();
	self.addChild(background);
	
	self.speedBitmap = new LBitmap(new LBitmapData(dataList["stage"],32*14,32*3,40,48));
	self.speedBitmap.x = 32;
	self.speedBitmap.y = 30;
	self.speedBitmap.visible = false;
	self.addChild(self.speedBitmap);
	
	itemLayer = new LSprite();
	npcLayer = new LSprite();
	
	runMap = new Map();
	self.addChild(runMap);
	
	self.addChild(itemLayer);
	self.addChild(npcLayer);
	
	var hp = new HP();
	hp.x = 16;
	hp.y = 10;
	
	starCtrl = new Star();
	starCtrl.x = 32 + hp.getWidth();
	starCtrl.y = 2;
	
	runCharacter = new Character(hp);
	runCharacter.x = 32 * 8;
	runCharacter.y = 32 * 4;
	runCharacter.setRect();
	self.addChild(runCharacter);
	self.character = runCharacter;
	
	self.addChild(hp);
	self.addChild(starCtrl);
	
	var num = new Num(Num.LEFT);
	num.x = LGlobal.width - 32;
	num.y = 32;
	self.addChild(num);
	runCharacter.distanceObj = num;
	
	self.stopBitmapData = new LBitmapData(dataList["stage"],32*23,32*3,64,64);
	self.playBitmapData = new LBitmapData(dataList["stage"],32*25,32*3,64,64);
	self.stopBitmap = new LBitmap(self.stopBitmapData);
	self.stopBitmap.x = 16;
	self.stopBitmap.y = LGlobal.height - 64 - 16;
	self.addChild(self.stopBitmap);
	
	
	self.addEventListener(LMouseEvent.MOUSE_UP, self.mouseup);
	self.addEventListener(LMouseEvent.MOUSE_DOWN, self.mousedown);
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
GameBody.prototype.isStop = function(){
	if(stopFlag || runCharacter.spiritCount > 0){
		return true;
	}
	return false;
};
GameBody.prototype.onframe = function(event){
	var self = event.target,child,i,l;
	if(gameBody.isStop())return;
	if(MOVE_STEP == MOVE_STEP_FAST){
		if(self.moveStepCount-- <= 0 && !runCharacter.invincible()){
			MOVE_STEP = MOVE_STEP_SLOW;
			self.speedBitmap.visible = false;
		}
	}

	for(i=0,l=npcLayer.childList.length;i<l;i++){
		child = npcLayer.childList[i];
		if(child.x < -96){
			child.remove();
			i--;
			l--;
		}
	}
	for(i=0,l=itemLayer.childList.length;i<l;i++){
		child = itemLayer.childList[i];
		if(child.x < -96){
			child.remove();
			i--;
			l--;
		}
	}
};
GameBody.prototype.mousedown = function(event){
	var self = event.clickTarget;
	if(event.selfX > self.stopBitmap.x && event.selfX < self.stopBitmap.x + self.stopBitmap.getWidth() && 
		event.selfY > self.stopBitmap.y && event.selfY < self.stopBitmap.y + self.stopBitmap.getHeight()){
		if(stopFlag){
			self.stopBitmap.bitmapData = self.stopBitmapData;
			MySoundPlayer.background.play();
		}else{
			self.stopBitmap.bitmapData = self.playBitmapData;
			MySoundPlayer.background.stop();
		}
		stopFlag = !stopFlag;
		return;
	}
	if(gameBody.isStop())return;
	MySoundPlayer.loadSound();
	self.character.jump();
};
GameBody.prototype.mouseup = function(event){
	var self = event.clickTarget;
	if(gameBody.isStop())return;
	self.character.jumpover();
};
GameBody.prototype.gameOver = function(event){
	var self = this;
	self.removeEventListener(LMouseEvent.MOUSE_UP, self.mouseup);
	self.removeEventListener(LMouseEvent.MOUSE_DOWN, self.mousedown);
	var overLayer = new GameOver();
	self.addChild(overLayer);
};