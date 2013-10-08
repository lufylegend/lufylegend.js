var selectType;
function addSelectMachine(type){
	selectType = type;
	var i;
	if(machineList[type] == null)machineList[type] = new Array();
	if(buttonList[type] == null)buttonList[type] = new Array();
	if(machineList[selectType].length > 0){
		for(i=0;i<machineList[selectType].length;i++){
			machineList[selectType][i].visible = true;
		}
		for(i=0;i<buttonList[selectType].length;i++){
			buttonList[selectType][i].visible = true;
		}
		return;
	}
	var startx = 100;
	var starty = 220;
	var addl = 200;
	var addx = 0;
		
	machine = new MachineSprite(type,list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	machineList[selectType].push(machine);
	
	machine = new MachineSprite(type,list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	machineList[selectType].push(machine);

	machine = new MachineSprite(type,list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	machineList[selectType].push(machine);

	machine = new MachineSprite(type,list,0.6);
	machine.x = startx + addl*(addx++);
	machine.y = starty;
	backLayer.addChild(machine);
	machineList[selectType].push(machine);


	var msg = new LSprite();
	msg.x = 280;
	msg.y = 80;
	msg.graphics.drawRect(1,"black",[0, 0, 400, 30],true,"#ffffff");
	backLayer.addChild(msg);
	buttonList[selectType].push(msg);
	var msgTxt = new LTextField();
	msgTxt.text = "プレイしたいポイガチャ台を選択してください";
	msgTxt.x = 350;
	msgTxt.y = 85;
	backLayer.addChild(msgTxt);
	buttonList[selectType].push(msgTxt);

	var coin_back = new LBitmap(new LBitmapData(imglist["coin_back"]));
	coin_back.x = 753;
	coin_back.y = 10;
	backLayer.addChild(coin_back);
	buttonList[selectType].push(coin_back);
	var coinTxt = new LTextField();
	coinTxt.text = "ゲームコイン";
	coinTxt.x = 760;
	coinTxt.y = 25;
	backLayer.addChild(coinTxt);
	buttonList[selectType].push(coinTxt);
	var coinLeftTxt = new LTextField();
	coinLeftTxt.text = "残り：　　　　　　　　　枚";
	coinLeftTxt.x = 760;
	coinLeftTxt.y = 45;
	backLayer.addChild(coinLeftTxt);
	buttonList[selectType].push(coinLeftTxt);
	var elsenum_back = new LBitmap(new LBitmapData(imglist["elsenum_back"]));
	elsenum_back.x = 753;
	elsenum_back.y = 75;
	backLayer.addChild(elsenum_back);
	buttonList[selectType].push(elsenum_back);

	startx = 100;
	starty = 180;
	addl = 200;
	addx = 0;
	var state = new LBitmap(new LBitmapData(imglist["state01"]));
	state.x = startx + addl*(addx++);
	state.y = starty;
	backLayer.addChild(state);
	buttonList[type].push(state);
	var state = new LBitmap(new LBitmapData(imglist["state02"]));
	state.x = startx + addl*(addx++);
	state.y = starty;
	backLayer.addChild(state);
	buttonList[type].push(state);
	var state = new LBitmap(new LBitmapData(imglist["state03"]));
	state.x = startx + addl*(addx++);
	state.y = starty;
	backLayer.addChild(state);
	buttonList[type].push(state);
	var state = new LBitmap(new LBitmapData(imglist["state04"]));
	state.x = startx + addl*(addx++);
	state.y = starty;
	backLayer.addChild(state);
	buttonList[type].push(state);
	
	startx = 95;
	starty = 50;
	addl = 200;
	addx = 0;
	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onselect01);
	buttonList[type].push(playButton);
	
	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onselect02);
	buttonList[type].push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onselect03);
	buttonList[type].push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["play_button_up"])),new LBitmap(new LBitmapData(imglist["play_button_over"])));
	playButton.x = startx + addl*(addx++);
	playButton.y = starty + 250;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, onselect04);
	buttonList[type].push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["gotoTop_up"])),new LBitmap(new LBitmapData(imglist["gotoTop_over"])));
	playButton.x = 400;
	playButton.y = 130;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, selectToTop);
	buttonList[type].push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["item_show_up"])),new LBitmap(new LBitmapData(imglist["item_show_over"])));
	playButton.x = 750;
	playButton.y = 105;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, function (){alert("開発中");});
	buttonList[type].push(playButton);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["goods_show_up"])),new LBitmap(new LBitmapData(imglist["goods_show_over"])));
	playButton.x = 750;
	playButton.y = 140;
	backLayer.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, function (){goodsShow();});
	buttonList[type].push(playButton);

}
function selectMachineToHidden(){
	var i;
	for(i=0;i<machineList[selectType].length;i++){
		machineList[selectType][i].visible = false;
	}
	selectButtonToHidden();
}
function selectButtonToHidden(){
	var i;
	for(i=0;i<buttonList[selectType].length;i++){
		buttonList[selectType][i].visible = false;
	}
}
function selectToTop(){
	changeShow = function (){
		selectMachineToHidden();
		addTopMiniMachine();
	};
	curtainMode = "toselect";
}
function onselect01(event){
	changeShow = function (){
		playRun();
	};
	selectButtonToHidden();
	addLotteryMachine();
	fadeMode = "toplay";
}
function onselect02(event){
	changeShow = function (){
		playRun();
	};
	selectButtonToHidden();
	addLotteryMachine();
	fadeMode = "toplay";
}
function onselect03(event){
	changeShow = function (){
		playRun();
	};
	selectButtonToHidden();
	addLotteryMachine();
	fadeMode = "toplay";
};
function onselect04(event){
	changeShow = function (){
		playRun();
	};
	selectButtonToHidden();
	addLotteryMachine();
	fadeMode = "toplay";
}