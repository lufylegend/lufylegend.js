/**
 * 游戏初始化设定
 * */
LSystem.screen(0.6);
function doScroll() {if(window.pageYOffset === 0)window.scrollTo(0, 1);}
window.onorientationchange = function(){setTimeout(doScroll, 100);};
window.onresize = function(){setTimeout(doScroll, 100);};
window.onload = function() {
	setTimeout(doScroll, 100);
	init(40,"mylegend",800,450,main,LEvent.INIT);
};

/**
 * 层变量
 * */
//显示进度条所用层
var loadingLayer;
//游戏底层
var baseLayer;
//背景层
var backLayer;
//人物层
var charaLayer;
var imglist = {};
var imgData = new Array(
		{type:"js",path:"./js/CharacterList.js"},
		{type:"js",path:"./js/Character.js"},
		{type:"js",path:"./js/Player.js"},
		{type:"js",path:"./js/Enemy.js"},
		{name:"player_stand",path:"./images/stand.png"},
		{name:"player_move",path:"./images/move.png"},
		{name:"player_run",path:"./images/run.png"},
		{name:"player_jump",path:"./images/jump.png"},
		{name:"player_attack",path:"./images/attack.png"},
		{name:"player_big_attack",path:"./images/big_attack.png"},
		{name:"player_jump_attack",path:"./images/jump_attack.png"},
		{name:"player_hit",path:"./images/hit.png"},
		{name:"player_skill",path:"./images/skill.png"},
		{name:"player_big_skill",path:"./images/big_skill.png"},
		{name:"player_hert",path:"./images/hert.png"},
		{name:"player_fall",path:"./images/fall.png"},
		{name:"sunji_stand",path:"./images/stand_sunji.png"},
		{name:"sunji_move",path:"./images/move_sunji.png"},
		{name:"sunji_run",path:"./images/run_sunji.png"},
		{name:"sunji_jump",path:"./images/jump_sunji.png"},
		{name:"sunji_attack",path:"./images/attack_sunji.png"},
		{name:"sunji_big_attack",path:"./images/big_attack_sunji.png"},
		{name:"sunji_jump_attack",path:"./images/jump_attack_sunji.png"},
		{name:"sunji_hit",path:"./images/hit_sunji.png"},
		{name:"sunji_skill",path:"./images/skill_sunji.png"},
		{name:"sunji_big_skill",path:"./images/big_skill_sunji.png"},
		{name:"sunji_hert",path:"./images/hert_sunji.png"},
		{name:"sunji_fall",path:"./images/fall_sunji.png"},
		{name:"back",path:"./images/back.png"}
		);
var hero = null;
//锁定按键
var keylock = false;
//按键
var KEY = {LEFT:65,RIGHT:68,UP:87,DOWN:83,ATTACK:74,JUMP:75};
//动作
var ACTION = {STAND:0,MOVE:1,RUN:2,JUMP:3,ATTACK:4,BIG_ATTACK:5,JUMP_ATTACK:6,HIT:7,SKILL:8,BIG_SKILL:9,HERT:10,FALL:11};
//方向
var DIRECTION = {RIGHT:"right",LEFT:"left"};
var MOVE_STEP = 6;
var keyCtrl = new Array();
var enemy_list = new Array(
	{name:"sunji",x:800,y:350,when_x:300,back_run:false},
	{name:"huangzhong",x:1200,y:280,when_x:800,back_run:true}
);

var back_run = true;
function main(){
	LGlobal.setDebug(true);
	LGlobal.destroy = true;
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
	imglist = result;
	removeChild(loadingLayer);
	loadingLayer = null;
	
	//初始化层
	baseLayer = new LSprite();
	addChild(baseLayer);
	
	//背景层
	backLayer = new LSprite();
	//backLayer.graphics.drawRect(1,"#000",[0,0,LGlobal.width,LGlobal.height],true,"#000");
	baseLayer.addChild(backLayer);
	backLayer.data = new LBitmapData(imglist["back"],0,0,LGlobal.width,LGlobal.height);
	var background = new LBitmap(backLayer.data);
	backLayer.addChild(background);
	
	//人物层
	charaLayer = new LSprite();	
	baseLayer.addChild(charaLayer);
	addHero();
	/*
	var heroData = CharacterList.huangzhong();
	hero = new Player(heroData);
	trace(hero.dataList.length);
	trace(hero.dataList);
	hero.x = 200;
	hero.y = 250;
	var m = ACTION.STAND;
	hero.setAction(m);
	//s.setAction(1);
	var l = 0;
	for(var i=0;i<l;i++)hero.anime.onframe();
	//hero.anime.bitmap.alpha = 0.1;
	baseLayer.addChild(hero);
	
	var heroData = CharacterList.huangzhong();
	hero = new Player(heroData);
	hero.x = 200;
	hero.y = 250;
	var m = ACTION.FALL;
	hero.setAction(m);
	//s.setAction(1);
	var l = 0;
	for(var i=0;i<l;i++)hero.anime.onframe();
	hero.anime.bitmap.alpha = 0.5;
	baseLayer.addChild(hero);
	return;*/
	/*
	var rect = hero.getHertRect();
	baseLayer.graphics.drawRect(2,"#000",[rect.x,rect.y,rect.width,rect.height]);
	var attackList = [[],
	          		[],
	          		[],
	          		[],
	          		[[0,0,0,0],[0,0,0,0],[30,-70,75,60],[30,-70,75,60]],
	          		[[0,0,0,0],[0,0,0,0],[20,-100,80,90],[20,-100,80,90]],
	          		[[0,0,0,0],[0,0,0,0],[-10,-90,100,80],[-10,-90,100,80]],
	          		[[10,-70,50,70],[10,-70,50,70],[10,-70,50,70],[10,-70,50,70],[10,-70,50,70],[10,-70,50,70]],
	          		[[0,0,0,0],[0,0,0,0],[-30,-70,90,60],[-90,-70,130,60],[-100,-80,140,70],[-40,-80,140,70]],
	          		[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,-100,100,40],[0,-110,100,50],[0,-110,100,50],
	          		[0,0,0,0],[20,-120,140,120],[20,-120,130,120],[-50,-120,160,120],[-60,-80,180,80],
	          		[-20,-50,150,60],[-10,-60,150,60],[50,-60,90,60],[50,-75,150,70],[50,-75,150,70],
	          		[50,-75,150,70],[50,-75,150,70]],
	          		];
	var test = attackList[m][l];
	baseLayer.graphics.drawRect(1,"#000",[hero.x + test[0],hero.y + test[1], + test[2], + test[3]],false);
	return;
	*/
	
	//添加贞事件
	baseLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	
	//添加键盘事件
	LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
	LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
}
function addHero(){
	var heroData = CharacterList.huangzhong();
	hero = new Player(heroData);
	//var heroData = CharacterList.sunji();
	//hero = new Enemy(heroData[0],heroData[1],heroData[2]);
	hero.x = 300;
	hero.y = 250;
	charaLayer.addChild(hero);
}
function onframe(){
	var key = null;
	charaLayer.childList = charaLayer.childList.sort(function(a,b){return a.y - b.y;});
	for(key in charaLayer.childList){
		charaLayer.childList[key].onframe();
	}
	/*
	for(var i=0,l=charaLayer.childList.length;i<l;i++){
		charaLayer.childList[i].onframe();
	}*/
}
function addEnemy(){
	if(enemy_list.length == 0)return;
	if(enemy_list[0].when_x > hero.x)return;
	var charadata = CharacterList[enemy_list[0].name]();
	var enemy = new Enemy(charadata);
	enemy.x = enemy_list[0].x;
	enemy.y = enemy_list[0].y;
	charaLayer.addChild(enemy);
	enemy_list.shift();
}
var lefttime = 0, righttime = 0;
var keyList = [{keyCode:0,time:0},{keyCode:0,time:0},{keyCode:0,time:0}];
function onkeydown(e){
	if(keylock || keyCtrl[e.keyCode])return;
	
	var keyThis = {keyCode:e.keyCode,time:(new Date()).getTime()};
	var keyLast01 = keyList[0];
	var keyLast02 = keyList[1];
	
	keyCtrl[e.keyCode] = true;
	keyList.unshift(keyThis);
	keyList.pop();
	
	switch(e.keyCode){
		case KEY.LEFT:
			if(keyLast01.keyCode == KEY.LEFT && keyThis.time - keyLast01.time < 200){
				hero.setAction(ACTION.RUN,DIRECTION.LEFT);
			}else{
				hero.setAction(ACTION.MOVE,DIRECTION.LEFT);
			}
			break;
		case KEY.RIGHT:
			if(keyLast01.keyCode == KEY.RIGHT && keyThis.time - keyLast01.time < 200){
				hero.setAction(ACTION.RUN,DIRECTION.RIGHT);
			}else{
				hero.setAction(ACTION.MOVE,DIRECTION.RIGHT);
			}
			break;
		case KEY.UP:
			hero.setAction(ACTION.MOVE,hero.direction);
			break;
		case KEY.DOWN:
			hero.setAction(ACTION.MOVE,hero.direction);
			break;
		case KEY.ATTACK:
			if(keyLast01.keyCode == KEY.ATTACK && keyLast02.keyCode == KEY.ATTACK && keyThis.time - keyLast02.time < 1000){
				keyList = [{keyCode:0,time:0},{keyCode:0,time:0},{keyCode:0,time:0}];
				keylock = true;
				hero.setAction(ACTION.BIG_ATTACK,hero.direction);
			}else if(keyLast01.keyCode == KEY.JUMP && keyThis.time - keyLast01.time < 50){
				keylock = true;
				hero.setAction(ACTION.BIG_SKILL,hero.direction);
			}else if(hero.action == ACTION.JUMP){
				hero.setAction(ACTION.JUMP_ATTACK,hero.direction);
			}else if(keyLast01.keyCode == KEY.UP && keyLast02.keyCode == KEY.DOWN && keyThis.time - keyLast02.time < 300){
				keylock = true;
				hero.setAction(ACTION.SKILL,hero.direction);
			}else{
				setTimeout("keylock = true;",50);
				hero.setAction(ACTION.ATTACK,hero.direction);
			}
			break;
		case KEY.JUMP:
			if(keyLast01.keyCode == KEY.ATTACK && keyThis.time - keyLast01.time < 50){
				keylock = true;
				hero.setAction(ACTION.BIG_SKILL,hero.direction);
			}else if(keyCtrl[KEY.DOWN]){
				hero.setAction(ACTION.HIT,hero.direction);
			}else{
				hero.setAction(ACTION.JUMP,hero.direction);
			}
			break;
	}
}
function onkeyup(e){
	keyCtrl[e.keyCode] = false;
	if(hero.action == ACTION.MOVE || hero.action == ACTION.RUN)hero.setAction(ACTION.STAND,hero.direction);
}
