/**
 * @author lufy
 */
function Character(hp){
	base(this,LSprite,[]);
	this.init(hp);
}
Character.RUN = "run";
Character.FLY = "fly";
Character.HERT = "hert";
Character.JUMP = "jump";
Character.prototype.init = function(hp){
	var self = this;
	self.hp = hp;
	var effect = new LBitmap(new LBitmapData(dataList["effect"]));
	effect.x = -180;
	effect.y = -70;
	self.addChild(effect);
	self.effect = effect;
	self.effect.visible = false;
	var data = new LBitmapData(dataList["chara"],0,0,96,96);
	var list = LGlobal.divideCoordinate(384,384,4,4);
	self.action = Character.RUN;
	self.heroShadows = [new LBitmap(data),new LBitmap(data)];
	self.heroShadows[0].alpha = 0.7;
	self.heroShadows[1].alpha = 0.3;
	self.heroShadows[0].visible = false;
	self.heroShadows[1].visible = false;
	self.addChild(self.heroShadows[0]);
	self.addChild(self.heroShadows[1]);
	self.hero = new LAnimationTimeline(data,list);
	self.hero.setLabel(Character.RUN,0,0);
	self.hero.setLabel(Character.FLY,1,0);
	self.hero.setLabel(Character.HERT,2,0);
	self.hero.setLabel(Character.JUMP,3,0);
	self.hero.x = -48;
	self.hero.y = -90;
	self.hero.speed = 6;
	self.addChild(self.hero);
	self.heroShadows[0].x = self.hero.x - 20;
	self.heroShadows[0].y = self.hero.y;
	self.heroShadows[1].x = self.hero.x - 40;
	self.heroShadows[1].y = self.hero.y;
	self.vy = 0;
	self.jumpCount = 0;
	self.distance = 0;
	self.spiritCount = 0;
	self.countValue = MOVE_STEP*5;
	
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
Character.prototype.shadowsChange = function(value){
	var self = this;
	self.heroShadows[0].visible = value;
	self.heroShadows[1].visible = value;
};
Character.prototype.spiritEnd = function(){
	var self = runCharacter;
	self.spiritCount = 0;
	self.hero.play();
	self.hero.onframe();
	self.shadowsChange(true);
};
Character.prototype.spiritStart = function(){
	var self = this;
	if(self.spiritCount <= 1){
		runCharacter.effect.alpha = 0;
		runCharacter.effect.visible = true;
		MOVE_STEP = MOVE_STEP_FAST;
		LTweenLite.to(runCharacter.effect,1,{alpha:1,ease:LEasing.None,onComplete:self.spiritEnd});
		return;
	}
	self.spiritCount--;
	var spirit = new LSprite();
	var spiritBitmap = new LBitmap(new LBitmapData(dataList["spiritEffect"]));
	spiritBitmap.x = -spiritBitmap.getWidth()*0.5;
	spiritBitmap.y = -spiritBitmap.getHeight()*0.5;
	spirit.addChild(spiritBitmap);
	spirit.scaleX = spirit.scaleY = 5;
	self.spirit = spirit;
	self.addChild(spirit);
	LTweenLite.to(spirit,0.5,{scaleX:0.1,scaleY:0.1,rotate:360,ease:LEasing.None,onComplete:function(){
		self.spirit.remove();
		self.spiritStart();
	}});
};
Character.prototype.setRect = function(){
	var self = this;
	self.rect = new LRectangle(32 + self.hero.x,16 + self.hero.y,32,64);
};
Character.prototype.invincible = function(){
	return this.effect.visible;
};
Character.prototype.onframe = function(event){
	var self = event.target;
	if(gameBody.isStop()){
		if(self.hero.mode != 0){
			self.hero.stop();
		}
		return;
	}else if(self.hero.mode == 0){
		self.hero.play();
	}
	self.y += self.vy;
	self.vy += g;
	if(self.invincible()){
		starCtrl.changeValue(-0.1);
		if(starCtrl.value <= 0){
			self.effect.visible = false;
			self.shadowsChange(false);
		}
	}
	if(self.vy > 32)self.vy = 32;
	if(self.y > LGlobal.height + 100){
		self.die();
		MySoundPlayer.playSound("gameover");
		self.parent.gameOver();
		return;
	}
	self.distance += MOVE_STEP;
	var countValue = self.distance / self.countValue >>> 0;
	if(self.distanceObj && self.distanceObj.value < countValue){
		self.distanceObj.setValue(countValue);
	}
	if(self.action == Character.FLY){
		self.hp.changeValue(-0.5);
		if(self.hp.value <= 1){
			self.gotoJump();
		}else{
			MySoundPlayer.playSound("fly");
			self.vy = 0;
			self.y -= 4;
			if(self.y < 64)self.y = 64;
		}
		return;
	}else if(self.action == Character.HERT){
		if(self.hertCount-- < 0){
			self.gotoRun();
		}
	}else{
		self.hp.changeValue(0.05);
	}
	if(self.vy < 0)return;
	var checkList = runMap.childList,child;
	for(var i=0,l=checkList.length;i<l;i++){
		child = checkList[i];
		if(child.checkHitTestPoint(self.x,self.y)){
			self.y = child.y;
			self.vy = 0;
			self.jumpCount = 0;
			self.gotoRun();
			break;
		}
	}
};
Character.prototype.jump = function(){
	var self = this;
	if(self.action == Character.HERT)return;
	if(self.jumpCount < 2){
		MySoundPlayer.playSound("jump");
		self.vy = -30;
		self.jumpCount++;
		self.gotoJump();
	}else if(self.hp.value > 1){
		self.gotoFly();
	}
};
Character.prototype.jumpover = function(){
	var self = this;
	if(self.action == Character.HERT)return;
	self.gotoJump();
};
Character.prototype.gotoJump = function(){
	var self = this;
	if(self.action == Character.JUMP)return;
	self.action = Character.JUMP;
	self.hero.gotoAndPlay(Character.JUMP);
};
Character.prototype.gotoFly = function(){
	var self = this;
	if(self.action == Character.FLY)return;
	self.action = Character.FLY;
	self.hero.gotoAndPlay(Character.FLY);
	self.hero.onframe();
};
Character.prototype.gotoRun = function(){
	var self = this;
	if(self.action == Character.RUN)return;
	if(self.action == Character.HERT && self.hertCount>=0)return;
	
	self.action = Character.RUN;
	self.hero.gotoAndPlay(Character.RUN);
	self.hero.onframe();
};
Character.prototype.hert = function(){
	var self = this;
	if(self.action == Character.HERT)return;
	self.action = Character.HERT;
	self.hero.gotoAndPlay(Character.HERT);
	self.hertCount = 10;
	self.hp.changeValue(-20);
};

