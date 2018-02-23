
if(LGlobal.canTouch){
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LSystem.screen(LStage.FULL_SCREEN);
}
init(50,"mylegend",960,500,main);

var loadingLayer;
var backLayer;
var curtainLayer;
var backgroundimg;
var machine;
var list;
var lotteryMachineList = new Array();
var miniMachineList = new Array();
var miniButtonList = new Array();
var machineList = new Array();
var buttonList = new Array();
var capsule;
var playButton;
var prizeLayer;

var loader;
var loadIndex = 0;
var imglist = {};
var lightImg = new Array();
var doruken;
var curtainup;
var curtaindown;
var curtainMode = "";
var fadeMode = "";
var changeShow,changeShowOver;
var type="";
var imgData = new Array(
		{type:"js",path:"./js/CapsuleSprite.js"},
		{type:"js",path:"./js/MachineSprite.js"},
		{type:"js",path:"./js/TopMachine.js"},
		{type:"js",path:"./js/SelectMachine.js"},
		{type:"js",path:"./js/LotteryMachine.js"},
		{type:"js",path:"./js/goods.js"},
		{name:"title",path:"./images/title.png"},
		{name:"coin_back",path:"./images/coin_back.png"},
		{name:"elsenum_back",path:"./images/elsenum_back.png"},
		{name:"free_machine",path:"./images/free_machine.png"},
		{name:"m1_machine",path:"./images/m1_machine.png"},
		{name:"m2_machine",path:"./images/m2_machine.png"},
		{name:"m3_machine",path:"./images/m3_machine.png"},
		{name:"m4_machine",path:"./images/m4_machine.png"},
		{name:"ball_0",path:"./images/ball_0.png"},
		{name:"ball_1",path:"./images/ball_1.png"},
		{name:"ball_2",path:"./images/ball_2.png"},
		{name:"ball_3",path:"./images/ball_3.png"},
		{name:"ball_4",path:"./images/ball_4.png"},
		{name:"ball_5",path:"./images/ball_5.png"},
		{name:"light_0",path:"./images/light_0.png"},
		{name:"light_1",path:"./images/light_1.png"},
		{name:"light_2",path:"./images/light_2.png"},
		{name:"light_3",path:"./images/light_3.png"},
		{name:"light_4",path:"./images/light_4.png"},
		{name:"ctrl_bar",path:"./images/ctrl_bar.png"},
		{name:"free_m_bar",path:"./images/free_m_bar.png"},
		{name:"m1_m_bar",path:"./images/m1_m_bar.png"},
		{name:"m2_m_bar",path:"./images/m2_m_bar.png"},
		{name:"m3_m_bar",path:"./images/m3_m_bar.png"},
		{name:"m4_m_bar",path:"./images/m4_m_bar.png"},
		{name:"play_button_up",path:"./images/play_button_up.png"},
		{name:"play_button_over",path:"./images/play_button_over.png"},
		{name:"replay_button_up",path:"./images/replay_button_up.png"},
		{name:"replay_button_over",path:"./images/replay_button_over.png"},
		{name:"quit_button_up",path:"./images/quit_button_up.png"},
		{name:"quit_button_over",path:"./images/quit_button_over.png"},
		{name:"gotoTop_up",path:"./images/gotoTop_up.png"},
		{name:"gotoTop_over",path:"./images/gotoTop_over.png"},
		{name:"toTop_up",path:"./images/toTop_up.png"},
		{name:"toTop_over",path:"./images/toTop_over.png"},
		{name:"topGotoAd_up",path:"./images/topGotoAd_up.png"},
		{name:"topGotoAd_over",path:"./images/topGotoAd_over.png"},
		{name:"goods_show_up",path:"./images/goods_show_up.png"},
		{name:"goods_show_over",path:"./images/goods_show_over.png"},
		{name:"goods_view",path:"./images/goods_view.png"},
		{name:"item_show_up",path:"./images/item_show_up.png"},
		{name:"item_show_over",path:"./images/item_show_over.png"},
		{name:"coin_mask",path:"./images/coin_mask.png"},
		{name:"today",path:"./images/today.png"},
		{name:"state01",path:"./images/state01.png"},
		{name:"state02",path:"./images/state02.png"},
		{name:"state03",path:"./images/state03.png"},
		{name:"state04",path:"./images/state04.png"},
		{name:"coin",path:"./images/coin.png"}
		);

function main(){
	imgData.push({name:"backimg_autumn2",path:"./images/backimg_autumn2.gif"});
	
	loadingLayer = new LoadingSample2();
	addChild(loadingLayer);
	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result){
			imglist = result;
			removeChild(loadingLayer);
			loadingLayer = null;
			gameInit();
		}
	);
}
function gameInit(event){
	var bitmapdata;
	
	lightImg.push(new LBitmapData(imglist["light_0"]));
	lightImg.push(new LBitmapData(imglist["light_1"]));
	lightImg.push(new LBitmapData(imglist["light_2"]));
	lightImg.push(new LBitmapData(imglist["light_3"]));
	lightImg.push(new LBitmapData(imglist["light_4"]));
	
	bitmapdata = new LBitmapData(imglist["backimg_autumn2"]);
	backgroundimg = new LBitmap(bitmapdata);
	//backgroundimg.rotate = 1;
	backLayer = new LSprite();
	addChild(backLayer);
	backLayer.addChild(backgroundimg);
	curtainLayer = new LSprite();
	addChild(curtainLayer);
	curtainup = new LSprite();
	curtainup.y = -250;
	curtainup.graphics.drawRect(1,"black",[0, 0, 960, 250],true,"#000000");
	curtaindown = new LSprite();
	curtaindown.y = 500;
	curtaindown.graphics.drawRect(1,"black",[0, 0, 960, 250],true,"#000000");
	curtainLayer.addChild(curtainup);
	curtainLayer.addChild(curtaindown);

	list = new Array(new LBitmapData(imglist["ball_0"]),
			new LBitmapData(imglist["ball_1"]),
			new LBitmapData(imglist["ball_2"]),
			new LBitmapData(imglist["ball_3"]),
			new LBitmapData(imglist["ball_4"]),
			new LBitmapData(imglist["ball_5"]));
	
	addTopMiniMachine();
	backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
}

function onframe(){
	machine.onframe();
	curtainRun();
	fadeRun();
}
function curtainRun(){
	if(curtainMode == "")return;
	if(curtainMode == "toselect"){
		curtainMode = "down";
		curtainup.y = -250;
		curtaindown.y = 500;
	}else if(curtainMode == "down"){
		curtainup.y += 10;
		curtaindown.y -= 10;
		if(curtainup.y >= 0){
			curtainMode = "up";
			changeShow();
		}
	}else if(curtainMode == "up"){
		curtainup.y -= 10;
		curtaindown.y += 10;
		if(curtainup.y <= -250){
			curtainMode = "";
		}
	}
}
function fadeRun(){
	if(fadeMode == "")return;
	var i;
	if(fadeMode == "toplay"){
		lotteryMachineList[selectType].alpha += 0.1;
		if(selectType == "free"){
			for(i=0;i<miniMachineList.length;i++){
				miniMachineList[i].alpha -= 0.1;
			}
		}else{
			for(i=0;i<machineList[selectType].length;i++){
				machineList[selectType][i].alpha -= 0.1;
			}
		}
		if(lotteryMachineList[selectType].alpha >= 1){
			fadeMode = "";
			if(selectType == "free"){
				for(i=0;i<miniMachineList.length;i++){
					miniMachineList[i].alpha = 1;
					miniMachineList[i].visible = false;
				}
			}else{
				for(i=0;i<machineList[selectType].length;i++){
					machineList[selectType][i].alpha = 1;
					machineList[selectType][i].visible = false;
				}
			}
			playRun();
		}
	}
	
}
