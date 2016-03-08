init(30,"mylegend",320,480,main);

var loadingLayer;
var backLayer;
var graphicsMap;
var loadIndex = 0;

var imglist = {};
var imgData = new Array(
		{name:"b0",path:"00.png"},
		{name:"b1",path:"f0.png"},
		{name:"b10",path:"ff.png"}
		);
function main(){	loadingLayer = new LoadingSample1();	addChild(loadingLayer);		LLoadManage.load(		imgData,		function(progress){			loadingLayer.setProgress(progress);		},		function(result){			imglist = result;			removeChild(loadingLayer);			loadingLayer = null;			gameInit();		}	);
}
function gameInit(event){
	backLayer = new LSprite();
	backLayer.graphics.drawRect(1,"black",[0, 0, 320, 480],true,"#cccccc");
	addChild(backLayer);
	var title = new LTextField();
	title.x = 50;
	title.y = 100;
	title.size = 30;
	title.text = "俄罗斯方块";
	backLayer.addChild(title);
	
	var startBtn = addButton("游戏开始",150,30,40,5);
	startBtn.x = 80;
	startBtn.y = 300;
	backLayer.addChild(startBtn);
	startBtn.addEventListener(LMouseEvent.MOUSE_DOWN, gameToStart);
}
var frameend = true;
var leftBtn;
var rightBtn;
var downBtn;
var changeBtn;
function gameToStart(){
        backLayer.removeAllChild();
        backLayer.die();
	_stop = false;
	frameend = true;
	speedLabel = new LTextField();
	speedLabel.x = 250;
	speedLabel.y = 200;
	backLayer.addChild(speedLabel);
	scoreLabel = new LTextField();
	scoreLabel.x = 250;
	scoreLabel.y = 250;
	backLayer.addChild(scoreLabel);
	
	leftBtn = addButton("←",60,60,20,20);
	leftBtn.x = 10;
	leftBtn.y = 390;
	backLayer.addChild(leftBtn);
	rightBtn = addButton("→",60,60,20,20);
	rightBtn.x = 80;
	rightBtn.y = 390;
	backLayer.addChild(rightBtn);
	
	downBtn = addButton("↓",60,60,20,20);
	downBtn.x = 150;
	downBtn.y = 390;
	backLayer.addChild(downBtn);
	changeBtn = addButton("change",70,60,10,20);
	changeBtn.x = 230;
	changeBtn.y = 390;
	backLayer.addChild(changeBtn);

	graphicsMap = new LSprite();
	backLayer.addChild(graphicsMap);
	gameStart();
	backLayer.addEventListener(LEvent.ENTER_FRAME, onframe)
	
	leftBtn.addEventListener(LMouseEvent.MOUSE_DOWN, moveleft);
	rightBtn.addEventListener(LMouseEvent.MOUSE_DOWN, moveright);
	downBtn.addEventListener(LMouseEvent.MOUSE_DOWN, movedown);
	changeBtn.addEventListener(LMouseEvent.MOUSE_DOWN, movechange);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, keyover);
}
function moveleft(){
	if(myKey.keyControl > 0)return;
	myKey.keyControl = 37;
}
function moveright(){
	if(myKey.keyControl > 0)return;
	myKey.keyControl = 39;
}
function movedown(){
	if(myKey.keyControl > 0)return;
	myKey.keyControl = 40;
}
function movechange(){
	if(myKey.keyControl > 0)return;
	myKey.keyControl = 32;
}
function keyover(){
	myKey.keyControl=0;
	myKey.speedCotrol = 0;
	myKey.changeOver=false;
}

function onframe(){
	if(!frameend)return;
	if(_stop)return;
	frameend = false;
	minusBox();

	if(myKey.keyControl==32 && !myKey.changeOver){
		changeBox();
	}
	
	if(myKey.keyControl==37 && checkPlus(-1,0)){
		if (myKey.speedCotrol==0||myKey.speedCotrol>=4){
			//alert("point.x--");
		point.x--;
		}
		myKey.speedCotrol++;
	}
	if(myKey.keyControl==39 && checkPlus(1,0)){
		if (myKey.speedCotrol==0||myKey.speedCotrol>=4){
		point.x++;
		}
		myKey.speedCotrol++;
	}
	if(speed == 0 || myKey.keyControl==40){
		if (checkPlus(0,1)){
			point.y++;
		}else {
			plusBox();
			if(point.y == 1){
				_stop = true;
				gameOver();
				return;
			}
			removeBox();
			
			getNewBox();
		}
		speed = speedMax;
	}else{
		speed --;
	}
	plusBox();
	
	drawMap();
	frameend = true;
}
function gameOver(){
	backLayer.removeChild(leftBtn);
	backLayer.removeChild(rightBtn);
	backLayer.removeChild(downBtn);
	backLayer.removeChild(changeBtn);

	var startBtn = addButton("重新开始",150,30,40,5);
	startBtn.x = 80;
	startBtn.y = 300;
	backLayer.addChild(startBtn);
	startBtn.addEventListener(LMouseEvent.MOUSE_DOWN, gameToStart);
}
function addButton(lbl,w,h,x,y){
	var up = new LSprite();
	up.graphics.drawRect(1,"black",[0, 0, w, h],true,"#999999");
	var txt = new LTextField();
	txt.x = x;
	txt.y = y;
	txt.text = lbl;
	up.addChild(txt);
	var over = new LSprite();
	over.graphics.drawRect(1,"black",[0, 0, w, h],true,"#cccccc");
	var txt1 = new LTextField();
	txt1.x = x;
	txt1.y = y;
	txt1.text = lbl;
	over.addChild(txt1);
	var btn = new LButton(up,over);
	return btn;
}