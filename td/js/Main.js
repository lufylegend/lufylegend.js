init(50,"mylegend",800,480,main);
/**
 * 层变量
 * */
//显示进度条所用层
var loadingLayer;
//游戏底层
var baseLayer;
//背景层
var backLayer;
//右侧menu层
var charaMenuLayer;
//选择人物后的半透明显示层
var addLayer;

var loader;
var loadIndex = 0;
//图片date储存数组
var imglist = {};
//图片path
var imgData = new Array(
		{name:"c1",path:"./images/c1.png"},
		{name:"hp",path:"./images/hp.png"},
		{name:"b1",path:"./images/b1.png"}
		);
//敌人通路[x,y,上，下，左，右]
//上下左右表示坐标的四周，其中1表示可以设置我军，0表示不可设置
var road = [[2,11,0,0,1,1],[2,10,0,0,1,1],[2,9,0,0,1,1],[2,8,0,0,1,1],[2,7,0,0,1,1],[2,6,0,0,1,1],[2,5,0,0,1,1],[2,4,0,0,1,1],[2,3,0,0,1,1],[2,2,0,1,1,0]
,[3,2,1,1,0,0],[4,2,1,1,0,0],[5,2,0,1,0,1]
,[5,3,0,0,1,1],[5,4,0,0,1,1],[5,5,0,0,1,1],[5,6,1,0,1,0]
,[6,6,1,1,0,0],[7,6,1,1,0,0],[8,6,1,1,0,0],[9,6,1,1,0,0],[10,6,0,1,0,1]
,[10,7,0,0,1,1],[10,8,0,0,1,1],[10,9,1,0,1,0]
,[11,9,1,1,0,0],[12,9,1,1,0,0],[13,9,1,1,0,0],[14,9,1,1,0,0],[15,9,1,1,0,0],[16,9,1,1,0,0],[17,9,1,0,0,1]
,[17,8,0,0,1,1],[17,7,0,0,1,1],[17,6,0,0,1,1],[17,5,0,0,1,1],[17,4,0,0,1,1],[17,3,0,0,1,1],[17,2,0,0,1,1],[17,1,0,0,0,0]
];
//方向变量
var DOWN = 0;
var UP = 1;
var LEFT = 2;
var RIGHT = 3;
//步长
var STEP = 64;
//图片拆分坐标数组，用于显示人物动画
var animeList;
//敌军数组
var enemylist = [];
//我军数组
var attlist = [];
//敌军数量
var enemyNum = 0;
var enemyMax = 8;
//右侧我军可选人物
var attCharaBitmap;
//用于选择我军在屏幕上移动时用
var addBitmap;
//鼠标按下时坐标
var downPoint;
var startBtn;
var enemyMaxHp = 60;
var getpoint;
var getpointNum = 60;
var hpNum = 10;
var hp;
function main(){
	//实例化进度条层
	loadingLayer = new LSprite();
	loadingLayer.graphics.drawRect(1,"black",[200, 200, 400, 20],true,"#ffffff");
	addChild(loadingLayer);
	//开始读取图片
	loadImage();
}
function loadImage(){
	//图片全部读取完成，开始初始化游戏
	if(loadIndex >= imgData.length){
		removeChild(loadingLayer);
		gameInit();
		return;
	}
	//开始读取图片
	loader = new LLoader();
	loader.addEventListener(LEvent.COMPLETE,loadComplete);
	loader.load(imgData[loadIndex].path,"bitmapData");
}
function loadComplete(event){
	//进度条显示
	loadingLayer.graphics.clear();
	loadingLayer.graphics.drawRect(1,"black",[200, 200, 400, 20],true,"#ffffff");
	loadingLayer.graphics.drawRect(1,"black",[200, 203, 400*(loadIndex/imgData.length), 14],true,"#000000");
	//储存图片数据
	imglist[imgData[loadIndex].name] = loader.content;
	//读取下一张图片
	loadIndex++;
	loadImage();
}
function gameInit(event){
	//根据图片，得到拆分数组
	var list = LGlobal.divideCoordinate(STEP,1536,24,1);	
	//将拆分后的数组按照方向和动作重新设置
	animeList = [	
	    [list[0][0],list[1][0]],//下	
	    [list[2][0],list[3][0]],//上	
	    [list[4][0],list[5][0]],//左	
	    [list[6][0],list[7][0]],//右	
	    [list[8][0],list[9][0],list[10][0],list[11][0]],	//下攻
	    [list[12][0],list[13][0],list[14][0],list[15][0]],	//上攻
	    [list[16][0],list[17][0],list[18][0],list[19][0]],	//左攻
	    [list[20][0],list[21][0],list[22][0],list[23][0]]	//右攻
	];	
	//初始化层
	baseLayer = new LSprite();
	addChild(baseLayer);
	backLayer = new LSprite();	
	charaMenuLayer = new LSprite();	
	addLayer = new LSprite();
	addLayer.alpha = 0.5;
	//添加背景图片
	var backBit = new LBitmap(new LBitmapData(imglist["b1"],0,0,1280,768));
	backLayer.addChild(backBit);
	//添加右侧选择层
	charaMenuLayer.graphics.drawRect(1,"#000000",[700, 0, 100, 480],true,"#333333");
	baseLayer.addChild(backLayer);
	baseLayer.addChild(charaMenuLayer);
	//右侧可选我军列表
	attCharaBitmap = new LBitmap(new LBitmapData(imglist["c1"],0,0,STEP,STEP));
	attCharaBitmap.x = 716;
	attCharaBitmap.y = 10;
	charaMenuLayer.addChild(attCharaBitmap);
	baseLayer.addChild(addLayer);
	//添加贞事件
	baseLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	//添加鼠标事件-按下
	baseLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
	//添加鼠标事件-移动
	baseLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onMove);
	//添加鼠标事件-弹起
	baseLayer.addEventListener(LMouseEvent.MOUSE_UP,onUp);
	
	//创建一个开始按钮
	startBtn = addButton("開始",20);
	startBtn.x = 710;
	startBtn.y = 150;
	charaMenuLayer.addChild(startBtn);
	//点击按钮，则开始添加敌人
	startBtn.addEventListener(LMouseEvent.MOUSE_DOWN, startAddEnemy);
	

	var titleHp = new LTextField();
	titleHp.x = 710;
	titleHp.y = 240;
	titleHp.color = "#ffffff";
	titleHp.text = "HP";
	charaMenuLayer.addChild(titleHp);
	hp = new LTextField();
	hp.x = 710;
	hp.y = 260;
	hp.color = "#ffffff";
	hp.text = hpNum + "";
	charaMenuLayer.addChild(hp);	
	
	var title = new LTextField();
	title.x = 710;
	title.y = 300;
	title.color = "#ffffff";
	title.text = "得分";
	charaMenuLayer.addChild(title);
	getpoint = new LTextField();
	getpoint.x = 710;
	getpoint.y = 350;
	getpoint.color = "#ffffff";
	getpoint.text = getpointNum + "";
	charaMenuLayer.addChild(getpoint);	
}
//鼠标按下事件
function onDown(event){
	if(event.offsetX >= attCharaBitmap.x && event.offsetX < attCharaBitmap.x + attCharaBitmap.width && 
			event.offsetY >= attCharaBitmap.y && event.offsetY < attCharaBitmap.y + attCharaBitmap.height){
		//选择添加我军
		addBitmap = new LBitmap(new LBitmapData(imglist["c1"],0,0,STEP,STEP));
		addBitmap.x = attCharaBitmap.x;
		addBitmap.y = attCharaBitmap.y;
		addLayer.addChild(addBitmap);
	}else if(event.offsetX < 700){
		//选择移动地图，记录鼠标按下时的坐标
		downPoint = {x:event.offsetX,y:event.offsetY,bx:backLayer.x,by:backLayer.y};
	}
	
}
//鼠标移动事件
function onMove(event){
	var showStep = STEP;
	if(addBitmap != null){
		//移动所选择人物
		addBitmap.x = event.offsetX - showStep;
		addBitmap.y = event.offsetY - showStep;
	}else if(downPoint != null){
		//移动地图
		backLayer.x = event.offsetX - downPoint.x + downPoint.bx;
		backLayer.y = event.offsetY - downPoint.y + downPoint.by;
		if(backLayer.x > 20){
			backLayer.x = 20;
		}else if(backLayer.x < 680 - 1280 - showStep){
			backLayer.x = 680 - 1280 - showStep;
		}
		if(backLayer.y > 20){
			backLayer.y = 20;
		}else if(backLayer.y < 400 - 768 - showStep){
			backLayer.y = 400 - 768 - showStep;
		}
	}
}
//鼠标弹起事件
function onUp(event){
	if(addBitmap != null){
		//选择添加人物
		var addx = Math.floor((addBitmap.x + STEP - backLayer.x - 20)/STEP);
		var addy = Math.floor((addBitmap.y + STEP - backLayer.y - 20)/STEP);
		var canSet = false;
		var i;
		//判断是否可以添加人物
		for(i=0;getpointNum >= 20 && i<road.length;i++){
			if(road[i][2] == 1 && road[i][0] == addx && road[i][1] + 1 == addy){
				canSet = true;
				break;
			}else if(road[i][3] == 1 && road[i][0] == addx && road[i][1] - 1 == addy){
				canSet = true;
				break;
			}else if(road[i][4] == 1 && road[i][0] - 1 == addx && road[i][1] == addy){
				canSet = true;
				break;
			}else if(road[i][5] == 1 && road[i][0] + 1 == addx && road[i][1] == addy){
				canSet = true;
				break;
			}
		}
		var addX;
		var addY;
		//如果可以添加，则判断所添加位置是否已有我军
		if(getpointNum >= 20 && canSet){
			addX = addx*STEP;
			addY = addy*STEP;
			for(i=0;i<attlist.length;i++){
				if(attlist[i].x == addX && attlist[i].y == addY){
					canSet = false;
					break;
				}
			}
		}
		//如果可以添加，则添加一个我军
		if(getpointNum >= 20 && canSet){
			getpointNum -= 20;
			var attChara = new AttackChara(animeList,new LBitmapData(imglist["c1"],0,0,STEP,STEP),1);
			attChara.x = addX;
			attChara.y = addY;
			backLayer.addChild(attChara);
			attlist.push(attChara);
		}
		addLayer.removeChild(addBitmap);
		addBitmap = null;
	}else if(downPoint != null){
		//地图移动结束
		downPoint = null;
	}
}
//开始添加敌军
function startAddEnemy(){
	startBtn.visible = false;
	enemyNum = 0;
	addEnemy();
}
//添加敌军
function addEnemy(){
	//屏幕上的敌军少于规定数，则开始添加
	if(enemyNum < enemyMax){
		var enemy = new Enemy(animeList,new LBitmapData(imglist["c1"],0,0,STEP,STEP),1);
		backLayer.addChild(enemy);
		enemylist.push(enemy);
		enemyNum++;
	}
}
//贞事件
function onframe(){	
	if(hpNum == 0){
		alert("game over");
		hpNum = -1;
		return;
	}else if(hpNum < 0){
		return;
	}
	var i;
	for(i=0;i<attlist.length;i++)attlist[i].onframe();
	for(i=0;i<enemylist.length;i++){
		//判断敌军是否死亡，如果已经死亡，则移除
		if(enemylist[i].isDie){
			backLayer.removeChild(enemylist[i]);
			enemylist.splice(i,1);
			i-=1;
			continue;
		}
		enemylist[i].onframe();
	}
	if(enemylist.length == 0 && !startBtn.visible){
		enemyMaxHp += 10;
		startBtn.visible = true;
	}
	getpoint.text = getpointNum + "";
	hp.text = hpNum + "";
}
//创建一个按钮
function addButton(lbl,x){
	var up = new LSprite();
	up.graphics.drawRect(1,"black",[0, 0, 80, 50],true,"#999999");
	var txt = new LTextField();
	txt.x = x;
	txt.size = "15";
	txt.text = lbl;
	up.addChild(txt);
	var over = new LSprite();
	over.graphics.drawRect(1,"black",[0, 0, 80, 50],true,"#cccccc");
	var txt1 = new LTextField();
	txt1.x = x;
	txt1.size = "15";
	txt1.text = lbl;
	over.addChild(txt1);
	var btn = new LButton(up,over);
	return btn;

}