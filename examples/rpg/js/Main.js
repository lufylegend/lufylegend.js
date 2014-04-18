/**
 * Main类
 * @author lufy(lufy_legend)
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/
init(50,"mylegend",480,288,main);
/**层变量*/
//显示进度条所用层
var loadingLayer;
//游戏底层
var backLayer;

//地图层
var mapLayer;
//人物层
var charaLayer;
//效果层
var effectLayer;
//对话层
var talkLayer;
//控制层
var ctrlLayer;
//方向变量
var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
var STEP = 32;
//点击状态
var isKeyDown = false;
//地图滚动
var mapmove = false;
/**int变量*/
//读取图片位置
var loadIndex = 0;
/**对象变量*/
//玩家
var player;

/**数组变量*/
//图片path数组
var imgData = new Array();
//读取完的图片数组
var imglist = {};
var imageArray;
var stage;

LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
	if(LGlobal.box2d != null){
		LGlobal.box2d.ll_show();
		if(!LGlobal.traceDebug){
			LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);
		}
	}else{
		if(LGlobal.keepClear){
			LGlobal.canvas.setTransform(1, 0, 0, 1, 0, 0);
    var m = (LGlobal.width+255) >> 8;
    var n = (LGlobal.height+255) >> 8;
    for (var i = 0; i < m; ++i) {
        for (var j = 0; j < n; ++j) {
            LGlobal.canvas.clearRect(i << 8, j << 8, 256, 256);
        }
    }
			//LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);
			}
		if(LGlobal.backgroundColor !== null){
			LGlobal.canvas.fillStyle=LGlobal.backgroundColor;
			LGlobal.canvas.fillRect(0,0,LGlobal.width,LGlobal.height);
		}
	}
	LGlobal.buttonShow(LGlobal.buttonList);
	LGlobal.show(LGlobal.childList);
};
function main(){

	if(LGlobal.canTouch){
		LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
		LSystem.screen(LStage.FULL_SCREEN);
	}
	//准备读取图片
	imgData.push({type:"js",path:"./js/Map.js"});
	imgData.push({type:"js",path:"./js/Talk.js"});
	imgData.push({type:"js",path:"./js/Character.js"});
	imgData.push({type:"js",path:"./js/script.js"});
	imgData.push({name:"map",path:"./image/map.jpg"});
	imgData.push({name:"mingren",path:"./image/p0.png"});
	imgData.push({name:"npc1",path:"./image/p1.png"});
	imgData.push({name:"e1",path:"./image/e1.png"});
	imgData.push({name:"e2",path:"./image/e2.png"});
	imgData.push({name:"m",path:"./image/m.jpg"});
	imgData.push({name:"n",path:"./image/n.jpg"});
	imgData.push({name:"talk",path:"./image/back.png"});
	
	loadingLayer = new LoadingSample3();
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
	//游戏层显示初始化
	layerInit();	
	//地图图片初始化	
	initMap();		
	stage = script.stage01;	
	initScript(stage);

	//添加贞事件，开始游戏循环
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	//添加控制按钮
	bitmapdata = new LBitmapData(imglist["e1"]);
	bitmap = new LBitmap(bitmapdata);
	bitmap.x = 0;
	bitmap.y = 0;
	ctrlLayer.addChild(bitmap);
	bitmapdata = new LBitmapData(imglist["e2"]);
	bitmap = new LBitmap(bitmapdata);
	bitmap.x = 280;
	bitmap.y = 30;
	ctrlLayer.addChild(bitmap);
	ctrlLayer.x = 40;
	ctrlLayer.y = 160;
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	//添加点击控制事件
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
	
	if(!LGlobal.canTouch){
		//电脑的时候，添加键盘事件 【上 下 左 右 空格】
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
	}
}
var testLayer;
//游戏层显示初始化
function layerInit(){
	//游戏底层添加
	backLayer = new LSprite();
	addChild(backLayer);
	//地图层添加
	mapLayer = new LSprite();
	backLayer.addChild(mapLayer);
	//人物层添加
	charaLayer = new LSprite();
	backLayer.addChild(charaLayer);
	//效果层添加
	effectLayer = new LSprite();
	backLayer.addChild(effectLayer);
	//对话层添加
	talkLayer = new LSprite();
	backLayer.addChild(talkLayer);
	//控制层添加
	ctrlLayer = new LSprite();
	backLayer.addChild(ctrlLayer);
}
//地图图片初始化
function initMap(){	
	var bitmapdata;	
	if(imageArray == null){
		//地图图片数据
		bitmapdata = new LBitmapData(imglist["map"]);
		//将地图图片拆分，得到拆分后的各个小图片的坐标数组
		imageArray = LGlobal.divideCoordinate(bitmapdata.image.width,bitmapdata.image.height,10,10);
	}
}
//添加地图
function addMap(cx,cy){
	var i,j,index,indexX,indexY;
	var bitmapdata,bitmap;
	var mapX = mapLayer.x / STEP;
	var mapY = mapLayer.y / STEP;
	var mx = cx<0?-1:0,my = cy<0?-1:0;
	mapLayer.removeAllChild();	
	//在地图层上，画出15*10的小图片
	for(i=my;i<9 +Math.abs(cy) && i-mapY < map.length;i++){
		for(j=mx;j<15 +Math.abs(cx)&& j-mapX < map[0].length;j++){
			//从地图数组中得到相应位置的图片坐标
			index = map[i-mapY][j-mapX];
			//小图片的竖坐标
			indexY = Math.floor(index /10);
			//小图片的横坐标
			indexX = index - indexY*10;
			//得到小图片
			bitmapdata = new LBitmapData(imglist["map"],indexX*32,indexY*32,32,32);
			bitmap = new LBitmap(bitmapdata);
			//设置小图片的显示位置
			bitmap.x = j*STEP - mapLayer.x;
			bitmap.y = i*STEP - mapLayer.y;
			//将小图片显示到地图层
			mapLayer.addChild(bitmap);
		}
	}
}
//移除多余地图块
function delMap(){
	var bitmap,i;
	for(i=0;i<mapLayer.childList.length;i++){
		bitmap = mapLayer.childList[i];
		if(bitmap.x + mapLayer.x < 0 || bitmap.x + mapLayer.x >= 480 || 
				bitmap.y + mapLayer.y < 0 || bitmap.y + mapLayer.y >= 288){
			mapLayer.removeChild(bitmap);
			i--;
		}
	}
}
//添加人物
function addChara(){
	var charaList = stage.add;
	var chara,charaObj;
	for(var i=0;i<charaList.length;i++){
		charaObj = charaList[i];
		if(charaObj.chara == "player"){
			//加入英雄
			bitmapdata = new LBitmapData(imglist[charaObj.img]);
			chara = new Character(true,i,bitmapdata,4,4);
			player = chara;
		}else{
			//加入npc
			bitmapdata = new LBitmapData(imglist[charaObj.img]);
			chara = new Character(false,i,bitmapdata,4,4);
		}
		chara.x = charaObj.x * 32;
		chara.y = charaObj.y * 32;
		charaLayer.addChild(chara);
	}
}
function ondown(event){
	console.log("ondown",event.offsetX+">="+(ctrlLayer.x + 40) + "&&"+event.offsetX + "<="+(ctrlLayer.x+80));
	//根据点击位置，判断移动方向
	if(event.offsetX >= ctrlLayer.x + 40 && event.offsetX <= ctrlLayer.x+80){
		if(event.offsetY >= ctrlLayer.y && event.offsetY <= ctrlLayer.y+40){
			player.changeDir(UP);
		}else if(event.offsetY >= ctrlLayer.y+80 && event.offsetY <= ctrlLayer.y+120){
			player.changeDir(DOWN);
		}
	}else if(event.offsetX >= ctrlLayer.x && event.offsetX <= ctrlLayer.x+40){
		if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
			player.changeDir(LEFT);
		}
	}else if(event.offsetX >= ctrlLayer.x+80 && event.offsetX <= ctrlLayer.x+120){
		if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
			player.changeDir(RIGHT);
		}
	}
	isKeyDown = true;
}
function onup(event){
	isKeyDown = false;
	if(event.offsetX >= ctrlLayer.x + 280 && event.offsetX <= ctrlLayer.x+330){
		if(event.offsetY >= ctrlLayer.y+40 && event.offsetY <= ctrlLayer.y+100){
			//对话
			addTalk();
		}
	}
}
function onkeydown(event){
	if(event.keyCode == 37){//left
		player.changeDir(LEFT);
	}else if(event.keyCode == 38){//up
		player.changeDir(UP);
	}else if(event.keyCode == 39){//right
		player.changeDir(RIGHT);
	}else if(event.keyCode == 40){//down
		player.changeDir(DOWN);
	}
	isKeyDown = true;
}
function onkeyup(event){
	isKeyDown = false;
	return;
	if(event.keyCode == 37 && player.move[0] < 0){//left
		player.move[0] = 0;
	}else if(event.keyCode == 38 && player.move[1] < 0){//up
		player.move[1] = 0;
	}else if(event.keyCode == 39 && player.move[0] > 0){//right
		player.move[0] = 0;
	}else if(event.keyCode == 40 && player.move[1] > 0){//down
		player.move[1] = 0;
	}else{//shoot
		player.canshoot = false;
		player.shootctrl = player.shootspeed;
	}
}
/**
 * 循环
 * */
function onframe(){
	var key;
	for(key in charaLayer.childList)charaLayer.childList[key].onframe();
}