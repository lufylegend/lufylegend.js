/**
 * Main类
 * @author lufy
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/

if(LGlobal.canTouch){
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LSystem.screen(LStage.FULL_SCREEN);
}

function doScroll() {
	if(window.pageYOffset === 0) {
		window.scrollTo(0, 1);
	}
}
window.onload = function() {
	setTimeout(doScroll, 100);
	init(50,"legend",800,450,main,LEvent.INIT);
}
window.onorientationchange = function() {
	setTimeout(doScroll, 100);
};
window.onresize = function() {
	setTimeout(doScroll, 100);
}


/**层变量*/
//显示进度条所用层
var loadingLayer;
//游戏底层
var backLayer;

//地图层
var mapLayer;
//箱子层
var boxLayer;
var labelLayer;
//人物层
var charaLayer;
//对话层
//控制层
var ctrlLayer;
//方向变量
var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
var STEP = 48;
//点击状态
var isKeyDown = false;
//玩家
var player,box;

/**数组变量*/
var imgData = [
{path:"./js/Character.js",type:"js"},
{path:"./js/Stage.js",type:"js"},
{path:"./js/GameLogo.js",type:"js"},
{path:"./js/GameMenu.js",type:"js"},
{path:"./js/GameClear.js",type:"js"},
{path:"./js/GameRanking.js",type:"js"},
{path:"./js/share.js",type:"js"},
{path:"./js/Social.js",type:"js"},
{name:"player",path:"./image/player.png"},
{name:"box",path:"./image/boxlist.png"},
{name:"ctrl",path:"./image/ctrl.png"},
{name:"ico_sina",path:"./image/ico_sina.gif"},
{name:"ico_qq",path:"./image/ico_qq.gif"},
{name:"ico_facebook",path:"./image/ico_facebook.png"},
{name:"ico_twitter",path:"./image/ico_twitter.png"}
];
//读取完的图片数组
var imglist = {};
var bitmapDataList = [];
var imageArray;
var labelText,nameText,btn_update,rankingLayer;
var stageIndex = 0;
var startTime,stages = 0,steps = 0,times = 0;
var btnReplayStage,btnReturn;

function main(){
	loadingLayer = new LoadingSample3();
	addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		gameInit
	);
}
function gameInit(result){
	LGlobal.setDebug(true);
	imglist = result;
	removeChild(loadingLayer);
	loadingLayer = null;
	for(var i=0;i<5;i++){
		bitmapDataList.push(new LBitmapData(imglist["box"],i*STEP,0,STEP,STEP));
	}
	//游戏底层添加
	backLayer = new LSprite();
	//backLayer.graphics.drawRect(1,"#000",[0,0,800,450],false);
	addChild(backLayer);
	gameLogoShow();
}
function gameLogoShow(){
	var layer = new GameLogo();
	backLayer.addChild(layer);
}

function menuShow(event){
	backLayer.removeAllChild();
	backLayer.die();
	
	var layer = new GameMenu();
	backLayer.addChild(layer);
}
function gameClearShow(){
	backLayer.removeChild(ctrlLayer);
	btnReplayStage.removeEventListener(LMouseEvent.MOUSE_UP,function (e){initStage();});
	btnReturn.removeEventListener(LMouseEvent.MOUSE_UP,menuShow);
	backLayer.removeEventListener(LEvent.ENTER_FRAME,onframe);
	var layer = new GameClear();
	backLayer.addChild(layer);
}
function gameStart(index){
	backLayer.removeAllChild();
	backLayer.die();
	stageIndex = index;
	
	//各个显示层初始化
	layerInit();
	initButton();
	initMap();
	initPlayer();
	initLabel();
	initCtrl();
	
	initStage();
	
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);

	ctrlLayer.addEventListener(LMouseEvent.MOUSE_UP,onCtrl);

	btnReplayStage.addEventListener(LMouseEvent.MOUSE_UP,function (e){initStage();});
	btnReturn.addEventListener(LMouseEvent.MOUSE_UP,menuShow);
}
function onframe(){
	player.onframe();
	var str = (new Date().getTime() - startTime) + "";
	times.text = str.substr(0,str.length - 3) + "." + str.substr(str.length - 3,1);
}
function onCtrl(event){
	var ctrlSize = 60;
	if(event.selfX >= ctrlSize && event.selfX <= ctrlSize*2){
		if(event.selfY >= 0 && event.selfY <= ctrlSize){
			player.changeDir(UP);
		}else if(event.selfY >= ctrlSize*2 && event.selfY <= ctrlSize*3){
			player.changeDir(DOWN);
		}
	}else if(event.selfY >= ctrlSize && event.selfY <= ctrlSize*2){
		if(event.selfX >= 0 && event.selfX <= ctrlSize){
			player.changeDir(LEFT);
		}else if(event.selfX >= ctrlSize*2 && event.selfX <= ctrlSize*3){
			player.changeDir(RIGHT);
		}
	}
}
function initPlayer(){
	player = new Character(new LBitmapData(imglist["player"],0,0,STEP,STEP),4,4);
	charaLayer.addChild(player);
}
function initStage(){
	nowBoxList = new Array();
	boxLayer.removeAllChild();
	startTime = new Date().getTime();
	stages.text = stageIndex+1;
	list = stageList[stageIndex];
	player.anime.setAction(DOWN);
	player.x = playerList[stageIndex].x*STEP;
	player.y = playerList[stageIndex].y*STEP;
	steps.text = "0";
	for(var i=0;i<list.length;i++)for(var j=0;j<list[0].length;j++)drawFloor(j,i);
	drawBox();
	checkBox();
}
function drawBox(){
	var bitmap;
	for(var i=0;i<boxList[stageIndex].length;i++){
		bitmap = new LBitmap(bitmapDataList[2]);
		bitmap.x = boxList[stageIndex][i].x*STEP;
		bitmap.y = boxList[stageIndex][i].y*STEP;
		boxLayer.addChild(bitmap);
		nowBoxList.push(bitmap);
	}
}
function getBox(x,y){
	var bitmap;
	for(var i=0;i<nowBoxList.length;i++){
		bitmap = nowBoxList[i];
		if(bitmap.x == x && bitmap.y == y)return bitmap;
	}
}
function drawFloor(x,y){
	if(list[y][x] < 0)return;
	var bitmap = new LBitmap(bitmapDataList[list[y][x]]);
	bitmap.x = x*STEP;
	bitmap.y = y*STEP;
	boxLayer.addChild(bitmap);
}
function checkBox(){
	var bitmap,x,y,win=true;
	list = [];
	for(var i=0;i<stageList[stageIndex].length;i++){
		list.push(stageList[stageIndex][i].join(",").split(","));
	}
	
	for(var i=0;i<nowBoxList.length;i++){
		bitmap = nowBoxList[i];
		x = bitmap.x / STEP;
		y = bitmap.y / STEP;
		if(list[y][x] == 4){
			bitmap.bitmapData = bitmapDataList[3];
		}else{
			bitmap.bitmapData = bitmapDataList[2];
			win = false;
		}
		list[y][x] += 10;
	}
	if(win)gameClearShow();
}
//游戏层显示初始化
function layerInit(){
	mapLayer = new LSprite();
	backLayer.addChild(mapLayer);
	//箱子层添加
	boxLayer = new LSprite();
	backLayer.addChild(boxLayer);
	boxLayer.x = boxLayer.y = 8;
	
	charaLayer = new LSprite();
	backLayer.addChild(charaLayer);
	charaLayer.x = boxLayer.x; 
	charaLayer.y = boxLayer.y;
	
	labelLayer = new LSprite();
	backLayer.addChild(labelLayer);

	ctrlLayer = new LSprite();
	backLayer.addChild(ctrlLayer);
	ctrlLayer.x = 20; 
	ctrlLayer.y = 250;
}
function initButton(){
	var btn_up = new LSprite();
	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 15;
	labelText.y = 5;
	labelText.text = "Replay";
	btn_up.addChild(labelText);
	btn_up.graphics.drawRect(1,"#000",[0,0,120,40],true,"#191970");
	var btn_down = new LSprite();
	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 15;
	labelText.y = 5;
	labelText.text = "Replay";
	btn_down.addChild(labelText);
	btn_down.graphics.drawRect(1,"#000",[0,0,120,40],true,"#2F4F4F");
	btnReplayStage = new LButton(btn_up,btn_down);
	backLayer.addChild(btnReplayStage);
	btnReplayStage.x = 600; 
	btnReplayStage.y = 300;

	var btn_up = new LSprite();
	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 25;
	labelText.y = 5;
	labelText.text = "Menu";
	btn_up.addChild(labelText);
	btn_up.graphics.drawRect(1,"#000",[0,0,120,40],true,"#191970");
	var btn_down = new LSprite();
	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 25;
	labelText.y = 5;
	labelText.text = "Menu";
	btn_down.addChild(labelText);
	btn_down.graphics.drawRect(1,"#000",[0,0,120,40],true,"#2F4F4F");
	btnReturn = new LButton(btn_up,btn_down);
	backLayer.addChild(btnReturn);
	btnReturn.x = 600; 
	btnReturn.y = 370;
}
function initCtrl(){
	var bitmap = new LBitmap(new LBitmapData(imglist["ctrl"]));
	ctrlLayer.addChild(bitmap);
}
function initMap(){
	mapLayer.x = mapLayer.y = 2;
	mapLayer.graphics.drawRect(1,"#000",[0,0,550,440],true,"#6A5ACD");
	mapLayer.graphics.drawRect(1,"#000",[570,0,200,440],true,"#6A5ACD");
	var shadow = new LDropShadowFilter(5,45,"#000000",10);
	//mapLayer.filters = [shadow];
	
}
function initLabel(){
	labelLayer.x = 580;
	labelLayer.y = 10;
	
	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 10;
	labelText.y = 10;
	labelText.text = "Stage:";
	labelLayer.addChild(labelText);
	stages = new LTextField();
	stages.color = "#ffffff";
	stages.font = "HG行書体";
	stages.size = 16;
	stages.x = 80;
	stages.y = 10;
	stages.text = "0";
	labelLayer.addChild(stages);

	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 10;
	labelText.y = 50;
	labelText.text = "Step:";
	labelLayer.addChild(labelText);
	steps = new LTextField();
	steps.color = "#ffffff";
	steps.font = "HG行書体";
	steps.size = 16;
	steps.x = 80;
	steps.y = 50;
	steps.text = "0";
	labelLayer.addChild(steps);

	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 10;
	labelText.y = 90;
	labelText.text = "Time:";
	labelLayer.addChild(labelText);
	times = new LTextField();
	times.color = "#ffffff";
	times.font = "HG行書体";
	times.size = 16;
	times.x = 80;
	times.y = 90;
	times.text = "0";
	labelLayer.addChild(times);
}