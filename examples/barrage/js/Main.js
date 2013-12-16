/**
 * Main
 * */
//设定游戏速度，屏幕大小，回调函数
init(20,"mylegend",480,800,main);

/**层变量*/
//显示进度条所用层
var loadingLayer;
//游戏最底层
var backLayer;
//控制层
var ctrlLayer;

/**int变量*/
//读取图片位置
var loadIndex = 0;
//贞数
var frames = 0;
//BOOS START
var boosstart = false;
//GAME OVER
var gameover = false;
//GAME CLEAR 
var gameclear = false;
//得分
var point = 0;
/**对象变量*/
//玩家
var player;
//得分
var pointText;

/**数组变量*/
//图片path数组
var imgData = new Array();
//读取完的图片数组
var imglist = {};
//子弹数组
var barrage = new Array();
//子弹速度数组
var barrageSpeed = [5,10];
//储存所有敌人飞机的数组
var enemys = new Array();

function main(){
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	//准备读取图片
	imgData.push({type:"js",path:"./js/Global.js"});
	imgData.push({type:"js",path:"./js/Bullet.js"});
	imgData.push({type:"js",path:"./js/Plain.js"});
	imgData.push({name:"back",path:"./images/back.jpg"});
	imgData.push({name:"enemy",path:"./images/e.png"});
	imgData.push({name:"player",path:"./images/player.png"});
	imgData.push({name:"boss",path:"./images/boss.png"});
	imgData.push({name:"ctrl",path:"./images/ctrl.png"});
	imgData.push({name:"item1",path:"./images/1.png"});
	
	loadingLayer = new LoadingSample1();
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
	//游戏底层实例化
	backLayer = new LSprite();
	addChild(backLayer);
	ctrlLayer = new LSprite();
	addChild(ctrlLayer);
	//添加游戏背景
	bitmapdata = new LBitmapData(imglist["back"]);
	bitmap = new LBitmap(bitmapdata);
	backLayer.addChild(bitmap);
/*
	//添加控制按钮
	bitmapdata = new LBitmapData(imglist["ctrl"]);
	bitmap = new LBitmap(bitmapdata);
	ctrlLayer.addChild(bitmap);
	ctrlLayer.x = 90;
	ctrlLayer.y = 450;*/
	
	//得分显示
	pointText = new LTextField();
	pointText.color = "#ffffff";
	pointText.size = 20;
	pointText.text = point;
	backLayer.addChild(pointText);
	
	//加入玩家
	player = new Plain("player",0,200,600,[5]);
	backLayer.addChild(player);
	
	//添加贞事件，开始游戏循环
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	

	//添加控制事件
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);	/*
	if(!LGlobal.canTouch){
		//电脑的时候，添加键盘事件 【上 下 左 右 空格】
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
	}	*/
}
var monseIsDown = false;
function onup(event){	
	monseIsDown = false;
	player.move = [0,0];
	player.canshoot = false;
	player.shootctrl = player.shootspeed;
}
function ondown(event){	
	monseIsDown = true;	
	player.shootcount = 0;	
	player.shootctrl = player.shootspeed+1;	
	player.canshoot = true;
}
/**
 * 循环
 * */
function onframe(){
	if(gameover){//游戏结束
		backLayer.die();
		var txtOver = new LTextField();
		txtOver.text = "GAME OVER";
		txtOver.color = "#ffffff";
		txtOver.x = 100;
		txtOver.y = 200;
		txtOver.size = 40;
		backLayer.addChild(txtOver);
	}else if(gameclear){//游戏通关
		backLayer.die();
		var txtOver = new LTextField();
		txtOver.text = "GAME CLEAR";
		txtOver.color = "#ffffff";
		txtOver.x = 100;
		txtOver.y = 200;
		txtOver.size = 40;
		backLayer.addChild(txtOver);
	}
	if(monseIsDown){		
		if(player.x + 30 - player.speed > LGlobal.offsetX){//left
			player.move[0] = -1;		
		}else if(player.x + 30 + player.speed < LGlobal.offsetX){//right
			player.move[0] = 1;		
		}else{			
			player.move[0] = 0;		
		}		
		if(player.y + 30 - player.speed > LGlobal.offsetY){//up
			player.move[1] = -1;		
		}else if(player.y + 30 + player.speed < LGlobal.offsetY){//down
			player.move[1] = 1;		
		}else{			
			player.move[1] = 0;		
		}	
	}	
	var i;
	//循环子弹
	for(i=0;i<barrage.length;i++){
		barrage[i].onframe(i);
	}
	//循环敌机
	for(i=0;i<enemys.length;i++){
		enemys[i].onframe();
	}
	//自机循环
	player.onframe();
	//添加敌机
	addEnemy();
}
/**
 * 添加敌机
 * */
function addEnemy(){
	if(boosstart)return;
	var plain;
	if(point >= 10){//得到10分的话，添加boss
		//加入一个boss敌人
		plain = new Plain("boss",1,100,0,[2,3,4]);
		plain.move = [0,1];
		enemys.push(plain);
		backLayer.addChild(plain);
		boosstart = true;
		return;
	}
	if(frames++ % 100 > 0)return;//限制敌人出现频率
	var rand = Math.random();
	var b;
	if(rand < 0.5){
		if(rand < 0.3){
			b=0;
		}else{
			b=1;
		}
		//左边加入一个敌人
		plain = new Plain("enemy",1,0,100*Math.random(),[b]);
		plain.move = [0.6,1];
	}else{
		if(rand < 0.8){
			b=0;
		}else{
			b=1;
		}
		//右边加入一个敌人
		plain = new Plain("enemy",1,520,100*Math.random(),[b]);
		plain.move = [-0.6,1];
	}
	enemys.push(plain);
	backLayer.addChild(plain);
}