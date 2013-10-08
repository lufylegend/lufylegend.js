function MachineSprite(machinetype,ballArray,scale){
	base(this,LSprite,[]);
	var self = this;
	self.machinetype = machinetype;
	self.ballArray = ballArray;
	self.ballList = new Array();
	
	var arr = [[50,150],[5,130],[100,85],[80,110],[5,90],[60,85],
					[120,90],[150,115],[30,100],[20,155],[85,173],[98,150],
					[142,163],[155,167],[120,104],[50,133],[5,193],[60,193],
					[120,193],[150,193],[30,150],[90,153],[130,143],[170,160],
					[100,54],[140,63],[55,40],[80,48],[20,59],[160,70]];

	bitmapBall = new LBitmap(ballArray[5]);
	bitmapBall.scaleX = scale;
	bitmapBall.scaleY = scale;
	self.prize_back = new CapsuleSprite(bitmapBall);
	self.prize_back.x = 140*scale;
	self.prize_back.y = 310*scale;
	self.addChild(self.prize_back);
	
	self.machine = new LBitmap(new LBitmapData(imglist[machinetype+"_machine"]));
	self.machine.scaleX = scale;
	self.machine.scaleY = scale;
	self.addChild(self.machine);
	
	self.ctrl_bar = new LBitmap(new LBitmapData(imglist["ctrl_bar"]));
	self.ctrl_bar.scaleX = scale;
	self.ctrl_bar.scaleY = scale;
	self.ctrl_bar.x = 80*scale;
	self.ctrl_bar.y = 300*scale;
	self.addChild(self.ctrl_bar);

	self.lightList = new Array();
	
	var i,lightBit;
	for(i=0;i<5;i++){
		lightBit = new LBitmap(lightImg[0]);
		lightBit.x = (20 + i*20)*scale;
		lightBit.y = 350*scale;
		self.lightList.push(lightBit);
		self.addChild(lightBit);
	}
	
	
	bitmapBall = new LBitmap(ballArray[5]);
	bitmapBall.scaleX = scale;
	bitmapBall.scaleY = scale;
	self.prize = new CapsuleSprite(bitmapBall);
	self.prize.x = 140*scale;
	self.prize.y = 360*scale;
	self.prize.visible = false;
	self.addChild(self.prize);
	
	self.m_bar = new LBitmap(new LBitmapData(imglist[machinetype+"_m_bar"]));
	self.m_bar.scaleX = scale;
	self.m_bar.scaleY = scale;
	self.m_bar.x = 40*scale;
	self.m_bar.y = 390*scale;
	self.addChild(self.m_bar);

	var bitmapBall;
	var index;
	var capsule;
	for(i=0;i<arr.length;i++){
		index = parseInt(Math.random()*ballArray.length);
		bitmapBall = new LBitmap(ballArray[index]);
		bitmapBall.scaleX = scale;
		bitmapBall.scaleY = scale;
		bitmapBall.rotate = 180*Math.random();
		capsule = new CapsuleSprite(bitmapBall);
		capsule.mode = "dong";
		capsule.x = arr[i][0]*scale;
		capsule.y = (arr[i][1]+30)*scale;
		capsule.sx = capsule.x*scale;
		capsule.sy = capsule.y*scale;
		self.ballList.push(capsule);
		self.addChild(capsule);
	}

	if(type != ""){

		self.icon = new LBitmap(new LBitmapData(imglist[machinetype+"_icon"]));
		self.icon.scaleX = scale;
		self.icon.scaleY = scale;
		self.icon.x = 40*scale;
		self.icon.y = -50*scale;
		self.addChild(self.icon);
	}
	
	self.coin = new LBitmap(new LBitmapData(imglist["coin"]));
	self.coin.scaleX = scale;
	self.coin.scaleY = scale;
	self.coin.visible = false;
	self.addChild(self.coin);
	
	self.coinmask = new LBitmap(new LBitmapData(imglist["coin_mask"]));
	self.coinmask.scaleX = scale;
	self.coinmask.scaleY = scale;
	self.coinmask.x = 156*scale;
	self.coinmask.y = 319*scale;
	self.addChild(self.coinmask);

	
	self.mode = "";
}

MachineSprite.prototype.setOutFunction = function (fun){
	var self = this;
	self.outfunction = fun;
}
MachineSprite.prototype.startrun = function (){
	var self = this;
	self.coin.visible = true;
	self.coin.x = 80;
	self.coin.y = 150;
	self.coin.scaleX = 1;
	self.coin.scaleY = 1;
	self.stopIndex = 0;
	self.mode = "coin_r";
}
MachineSprite.prototype.onframe = function (){
	var self = this;
	var i;
	if(self.mode == "")return;
	if(self.mode == "coin_r"){
		if(self.stopIndex == 10){
			self.mode = "coin";
			return;
		}
		self.stopIndex += 1;
	}else if(self.mode == "coin"){
		self.coin.scaleX -= 0.03;
		self.coin.scaleY -= 0.03;
		self.coin.x += 5;
		self.coin.y += 8;
		if(self.coin.x >= 158)self.coin.x=158;
		if(self.coin.scaleX < 0.4){
			self.coin.scaleX = 0.4;
			self.coin.scaleY = 0.4;
		}
		if(self.coin.y >= 330){
			self.coin.y=330;
			self.mode = "start";
		}
	}else if(self.mode == "start"){
		if(self.ctrl_bar.rotate == 360){
			self.ctrl_bar.rotate = 0;
			self.mode = "start_stop";
			//self.mode = "out";
			self.stopIndex = 0;
			for(i=0;i<self.lightList.length;i++)self.lightList[i].bitmapData = lightImg[0];
			return;
		}
	}else if(self.mode == "start2"){
		if(self.ctrl_bar.rotate == 360){
			self.ctrl_bar.rotate = 0;
			for(i=0;i<self.lightList.length;i++)self.lightList[i].bitmapData = lightImg[0];
			self.mode = "out";
			return;
		}
	}else if(self.mode == "start_stop"){
		if(self.stopIndex == 10){
			self.mode = "start2";
			return;
		}
		self.stopIndex += 1;
	}else if(self.mode == "out"){
		if(self.prize_back.y >= 360){
			self.mode = "outleft";
			self.prize.bitmap.rotate = self.prize_back.bitmap.rotate;
			self.prize_back.visible = false;
			self.prize.visible = true;
			return;
		}
		self.prize_back.bitmap.rotate -= 10;
		self.prize_back.y += 5;
	}else if(self.mode == "outleft"){
		if(self.prize.x <= 50){
			self.mode = "outover";
			self.outfunction();
			return;
		}
		self.prize.bitmap.rotate -= 10;
		self.prize.x -= 5;
	}
	
	if(self.mode == "start" || self.mode == "start2"){
		var i,capsult,index;
		for(i=0;i<self.ballList.length;i++){
			capsule = self.ballList[i];
			capsule.onframe();
		}
		for(i=0;i<self.lightList.length;i++){
			index = 1+parseInt(Math.random()*4);
			self.lightList[i].bitmapData = lightImg[index];
		}
		self.ctrl_bar.rotate += 10;
	}
}