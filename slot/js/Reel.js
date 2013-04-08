function Reel(combination,index){
	base(this,LSprite,[]);
	var self = this;

	//-------------------------------------------
	//実行側から操作可能なプロパティの初期設定
	//-------------------------------------------
	self.maxSpeed = 70;
	self.minSpeed = 10;
	self.currentNum = 1;
	self.stopNum = 0;
	self.maxNum = 6;
	self.speedUpStep = 2;
	self.speedDownStep = 2;
	self.combination = combination;
	self.stopFlag = true;
	self.currentSpeed = 0;
	self.startReel = false;
	self.index = index;
	//-------------------------------------------
	//準備
	//-------------------------------------------
	self.reels = [];
	self.indexs = [0,0,0,0];
	self.reels.push(new LBitmap(self.getReel()));
	self.reels.push(new LBitmap(self.getReel()));
	self.reels.push(new LBitmap(self.getReel()));
	self.reels.push(new LBitmap(self.reels[0].bitmapData));
	
	
	var i,sy;
	self.reels[0].height = 60;
	self.reels[0].bitmapData.height = self.reels[0].height;
	self.reels[0].bitmapData.setCoordinate(0,80-self.reels[0].height);
	self.reels[2].height = 60;
	self.reels[2].bitmapData.height = self.reels[2].height;
	self.reels[3].visible = false;
	sy = 0;
	for(i=0;i<self.reels.length;i++){
		self.reels[i].y = sy;
		sy += self.reels[i].height;
		self.addChild(self.reels[i]);
	}
	//self.startReel = true;
	//self.stopFlag = false;
}
Reel.prototype.onframe = function (){
	var self = this;

	if(self.startReel)self.wheel();
};
Reel.prototype.getReel = function (){
	var self = this;
	if(self.currentNum > self.maxNum)self.currentNum = 1;
	self.indexs[0] = self.currentNum;

	self.indexs.pop();
	self.indexs.unshift(self.currentNum);
	var nextReel = new LBitmapData(imglist["item"+self.currentNum++]);
	return nextReel;
};
Reel.prototype.wheel = function (){
	var self = this;
	
	//回転速度の調節
	if (self.stopFlag) {
		//スピードダウン
		if (self.currentSpeed > self.minSpeed) {
			self.currentSpeed -= self.speedDownStep;
		} else {
			self.currentSpeed = self.minSpeed;
		}
	} else {
		//スピードアップ
		if (self.currentSpeed < self.maxSpeed) {
			self.currentSpeed += self.speedUpStep;
		} else {
			self.currentSpeed = self.maxSpeed;
		}
	}
	if(self.stopFlag && self.currentSpeed <= self.minSpeed && self.indexs[1] == self.combination[self.stopNum][self.index] && self.reels[1].y + self.currentSpeed > 60){
		self.currentSpeed = 60 - self.reels[1].y; 
		self.startReel = false;
		
	}
	self.setY();
	if(!self.startReel)checkWin();
};
Reel.prototype.setY = function(){
	var self = this;
	self.reels[1].y += self.currentSpeed;
	if(self.reels[1].y + self.reels[1].height > 200){
		self.reels[1].height = 200 - self.reels[1].y;
		self.reels[1].bitmapData.height = self.reels[1].height;
	}
	if(self.reels[1].y > 80){
		self.reels[0].height = 80;
		self.reels[0].y = self.reels[1].y - 80;
	}else{
		self.reels[0].height = self.reels[1].y;
		self.reels[0].y = 0;
	}
	self.reels[0].bitmapData.height = self.reels[0].height;
	self.reels[0].bitmapData.setCoordinate(0,80-self.reels[0].height);
	
	self.reels[2].y = self.reels[1].y + self.reels[1].height;
	
	if(self.reels[2].y > 200){
		self.reels[2].visible = false;
	}else if(self.reels[2].y + 80 > 200){
		self.reels[2].height = 200 - self.reels[2].y;
		self.reels[2].bitmapData.height = self.reels[2].height;
	}else{
		self.reels[3].y = self.reels[2].y + self.reels[2].height;
		if(self.reels[3].y < 200){
			self.reels[3].height = 200 - self.reels[3].y;
			self.reels[3].bitmapData.height = self.reels[3].height;
		}
	}
	
	if(self.reels[0].y > 0){
		var child = self.reels.pop();
		child.bitmapData = self.getReel();
		child.visible = true;
		self.reels.unshift(child);
		child.y = 0;
		child.height = self.reels[1].y;
		child.bitmapData.height = child.height;
		child.bitmapData.setCoordinate(0,80-child.height);
	}
	if(self.reels[3].y >= 200){
		self.reels[3].visible = false;
	}
};