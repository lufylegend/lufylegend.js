function addTopMiniMachine(){
	var i;
	if(miniMachineList.length > 0){
		for(i=0;i<miniMachineList.length;i++){
			miniMachineList[i].visible = true;
		}
		for(i=0;i<miniButtonList.length;i++){
			miniButtonList[i].visible = true;
		}
		return;
	}
	var startx = 50;
	var starty = 220;
	var addl = 180;
	var addx = 0;

	
	machine = new MachineSprite("free",list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	miniMachineList.push(machine);
	
	machine = new MachineSprite("m1",list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	miniMachineList.push(machine);

	machine = new MachineSprite("m2",list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	miniMachineList.push(machine);

	machine = new MachineSprite("m3",list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	miniMachineList.push(machine);

	machine = new MachineSprite("m4",list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	miniMachineList.push(machine);

	var title = new LBitmap(new LBitmapData(imglist["title"]));
	title.x = 250;
	title.y = 30;
	backLayer.addChild(title);
	miniButtonList.push(title);
	
	var today = new LBitmap(new LBitmapData(imglist["today"]));
	today.x = 240;
	today.y = 180;
	backLayer.addChild(today);
	miniButtonList.push(today);
	var today = new LBitmap(new LBitmapData(imglist["today"]));
	today.x = 420;
	today.y = 180;
	backLayer.addChild(today);
	miniButtonList.push(today);
	var today = new LBitmap(new LBitmapData(imglist["today"]));
	today.x = 600;
	today.y = 180;
	backLayer.addChild(today);
	miniButtonList.push(today);
	var today = new LBitmap(new LBitmapData(imglist["today"]));
	today.x = 780;
	today.y = 180;
	backLayer.addChild(today);
	miniButtonList.push(today);
	
	var coin_back = new LBitmap(new LBitmapData(imglist["coin_back"]));
	coin_back.x = 753;
	coin_back.y = 10;
	backLayer.addChild(coin_back);
	miniButtonList.push(coin_back);
	var coinTxt = new LTextField();
	coinTxt.text = "ゲームコイン";
	coinTxt.x = 760;
	coinTxt.y = 25;
	backLayer.addChild(coinTxt);
	miniButtonList.push(coinTxt);
	var coinLeftTxt = new LTextField();
	coinLeftTxt.text = "残り：　　　　　　　　　枚";
	coinLeftTxt.x = 760;
	coinLeftTxt.y = 45;
	backLayer.addChild(coinLeftTxt);
	miniButtonList.push(coinLeftTxt);
	var elsenum_back = new LBitmap(new LBitmapData(imglist["elsenum_back"]));
	elsenum_back.x = 753;
	elsenum_back.y = 75;
	backLayer.addChild(elsenum_back);
	miniButtonList.push(elsenum_back);
	
	startx = 45;
	starty = 50;
	addl = 180;
	addx = 0;
	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onmousedown01);
	miniButtonList.push(playButton);
	
	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onmousedown02);
	miniButtonList.push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onmousedown03);
	miniButtonList.push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onmousedown04);
	miniButtonList.push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onmousedown05);
	miniButtonList.push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["topGotoAd_up"])),new LBitmap(new LBitmapData(imglist["topGotoAd_over"])));
	playButton.x = 400;
	playButton.y = 130;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, function (){alert("開発中");});
	miniButtonList.push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["item_show_up"])),new LBitmap(new LBitmapData(imglist["item_show_over"])));
	playButton.x = 750;
	playButton.y = 105;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, function (){alert("開発中");});
	miniButtonList.push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["goods_show_up"])),new LBitmap(new LBitmapData(imglist["goods_show_over"])));
	playButton.x = 750;
	playButton.y = 140;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, function (){goodsShow();});
	miniButtonList.push(playButton);
	
	
}
function topMachineToHidden(){
	var i;
	for(i=0;i<miniMachineList.length;i++){
		miniMachineList[i].visible = false;
	}
	topButtonToHidden();
}
function topButtonToHidden(){
	var i;
	for(i=0;i<miniButtonList.length;i++){
		miniButtonList[i].visible = false;
	}
}
function onmousedown01(event){
	selectType = "free";
	addLotteryMachine();
	changeShow = function (){
		playRun();
	};
	topButtonToHidden();
	addLotteryMachine();
	fadeMode = "toplay";
}
function onmousedown02(event){
	changeShow = function (){
		topMachineToHidden();
		addSelectMachine("m1");
	};
	curtainMode = "toselect";
}
function onmousedown03(event){
	changeShow = function (){
		topMachineToHidden();
		addSelectMachine("m2");
	};
	curtainMode = "toselect";
}
function onmousedown04(event){
	changeShow = function (){
		topMachineToHidden();
		addSelectMachine("m3");
	};
	curtainMode = "toselect";
}
function onmousedown05(event){
	changeShow = function (){
		topMachineToHidden();
		addSelectMachine("m4");
	};
	curtainMode = "toselect";
}