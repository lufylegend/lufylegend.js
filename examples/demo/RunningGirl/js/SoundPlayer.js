/**
 * @author lufy
 */
function SoundPlayer(){
	var self = this;
	self.loadIndex = 0;
	self.get = new LSound();
	self.get.parent = self;
	self.fly = new LSound();
	self.fly.parent = self;
	self.jump = new LSound();
	self.jump.parent = self;
	self.gameover = new LSound();
	self.gameover.parent = self;
	self.background = new LSound();
	self.background.parent = self;
}
SoundPlayer.prototype.loadSound = function(){
	var self = this;
	if(LGlobal.canTouch && self.loadIndex > 0 && self.loadIndex < 4)self.loadIndex = 4;
	if(self.loadIndex == 0){
		self.loadIndex++;
		self.backgroundLoad();
	}else if(self.loadIndex == 1){
		self.loadIndex++;
		self.jump.addEventListener(LEvent.COMPLETE,self.jumpLoadComplete);
		self.jump.load("./sound/jump.mp3");
	}else if(self.loadIndex == 2){
		self.loadIndex++;
		self.get.addEventListener(LEvent.COMPLETE,self.getLoadComplete);
		self.get.load("./sound/get.mp3");
	}else if(self.loadIndex == 3){
		self.loadIndex++;
		self.fly.addEventListener(LEvent.COMPLETE,self.flyLoadComplete);
		self.fly.load("./sound/fly.mp3");
	}else if(self.loadIndex == 4){
		self.loadIndex++;
		self.gameover.addEventListener(LEvent.COMPLETE,self.gameoverLoadComplete);
		self.gameover.load("./sound/gameover.mp3");
	}
};
SoundPlayer.prototype.playSound = function(name){
	var self = this;
	switch(name){
		case "get":
			if(!self.getIsLoad)return;
			self.get.close();
			self.get.play(0,1);
			break;
		case "fly":
			if(!self.flyIsLoad || self.fly.playing)return;
			self.fly.close();
			self.fly.play(0,1);
			break;
		case "jump":
			if(!self.jumpIsLoad)return;
			self.jump.close();
			self.jump.play(0,1);
			break;
		case "gameover":
			if(!self.gameoverIsLoad)return;
			self.gameover.close();
			self.gameover.play(0,1);
			break;
		case "background":
			if(!self.backgroundIsLoad)return;
			self.background.close();
			self.background.play(0,100);
			break;
	}
};
SoundPlayer.prototype.backgroundLoad = function(){
	var self = this;
	self.background.addEventListener(LEvent.COMPLETE,self.backgroundLoadComplete);
	self.background.load("./sound/background.mp3");
};
SoundPlayer.prototype.backgroundLoadComplete = function(event){
	var self = event.currentTarget;
	self.parent.backgroundIsLoad = true;
	self.play(0,100);
};
SoundPlayer.prototype.getLoadComplete = function(event){
	var self = event.currentTarget;
	self.parent.getIsLoad = true;
};
SoundPlayer.prototype.flyLoadComplete = function(event){
	var self = event.currentTarget;
	self.parent.flyIsLoad = true;
};
SoundPlayer.prototype.jumpLoadComplete = function(event){
	var self = event.currentTarget;
	self.parent.jumpIsLoad = true;
};
SoundPlayer.prototype.gameoverLoadComplete = function(event){
	var self = event.currentTarget;
	self.parent.gameoverIsLoad = true;
};