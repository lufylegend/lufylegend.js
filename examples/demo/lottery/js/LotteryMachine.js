function addLotteryMachine(){
	if(lotteryMachineList[selectType] != null){
		lotteryMachineList[selectType].alpha = 0;
		return;
	}
	machine = new MachineSprite(selectType,list,1);
	machine.x = 360;
	machine.y = 50;
	machine.alpha = 0;
	machine.setOutFunction(outfunction);
	backLayer.addChild(machine);
	lotteryMachineList[selectType] = machine;
}

function playRun(){
	machine = lotteryMachineList[selectType];
	machine.prize_back.x = 140;
	machine.prize_back.y = 310;
	machine.visible = true;
	machine.prize.x = 140;
	machine.prize.y = 360;
	machine.prize.visible = false;
	machine.startrun();
	//machine.mode = "start";
}

function outfunction(){
	resultLayer();
}
function replay(){
	backLayer.removeChild(prizeLayer);
	playRun();
}
function resultLayer(){
	prizeLayer = new LSprite();
	prizeLayer.graphics.drawRect(1,"black",[0, 0, 360, 200],true,"#ffffff");
	prizeLayer.x = 300;
	prizeLayer.y = 100;

	var txt = new LTextField();
	txt.x = 80;
	txt.y = 20;
	txt.size = 20;
	txt.color = "#ff0000";
	txt.text = "おめでとう！５等賞";
	prizeLayer.addChild(txt);
	
	bitmapdata = new LBitmapData(imglist["ball_5"]);
	bitmap = new LBitmap(bitmapdata);
	capsule = new CapsuleSprite(bitmap);
	capsule.x = 150;
	capsule.y = 70;
	prizeLayer.addChild(capsule);

	var replayButton = new LButton(new LBitmap(new LBitmapData(imglist["replay_button_up"])),new LBitmap(new LBitmapData(imglist["replay_button_over"])));
	replayButton.x = 70;
	replayButton.y = 140;
	prizeLayer.addChild(replayButton);
	var quitButton = new LButton(new LBitmap(new LBitmapData(imglist["quit_button_up"])),new LBitmap(new LBitmapData(imglist["quit_button_over"])));
	quitButton.x = 185;
	quitButton.y = 140;
	prizeLayer.addChild(quitButton);

	replayButton.addEventListener(LMouseEvent.MOUSE_DOWN, replay);
	quitButton.addEventListener(LMouseEvent.MOUSE_DOWN, function(){alert("開発中");self.location = self.location;});
	
	backLayer.addChild(prizeLayer);
}