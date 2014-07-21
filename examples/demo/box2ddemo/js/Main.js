init(10,"mylegend",800,480,main);
var loadingLayer;
var backLayer;
var menuLayer;
var startBitmap;
var winTitle;
var stageIndex = 1;
var image;
var birdlist = [];
var stagelist = [];
var loader;
var loadIndex = 0;
var imglist = {};
var imgData = new Array(
		{name:"bird1",path:"./images/bird1.png"},
		{name:"bird2",path:"./images/bird2.png"},
		{name:"pig1",path:"./images/pig1.png"},
		{name:"pig2",path:"./images/pig2.png"},
		{name:"stage01",path:"./images/stage01.png"},
		{name:"stage02",path:"./images/stage02.png"},
		{name:"stage03",path:"./images/stage03.png"},
		{name:"stage04",path:"./images/stage04.png"},
		{name:"remove",path:"./images/remove.png"},
		{name:"start",path:"./images/start.png"}
		);
		
function main(){
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LSystem.screen(LStage.FULL_SCREEN); 
	//LGlobal.setDebug(true);	
	backLayer = new LSprite();	
	addChild(backLayer);	
	
	
	loadingLayer = new LoadingSample3();
	backLayer.addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result){
			imglist = result;
			backLayer.removeChild(loadingLayer);
			loadingLayer = null;
			gameInit();
		}
	);
}
function beginContact(contact){
	if(contact.GetFixtureA().GetBody().GetUserData().name == "pig2" || 
			contact.GetFixtureB().GetBody().GetUserData().name == "pig2"){

		winTitle.text = parseInt(winTitle.text) + 1;
	}
};
var cLayer,stageLayer,wallLayer,bitmap;
function gameInit(event){
	trace("gameinit");
	LGlobal.box2d = new LBox2d();
	cLayer = new LSprite();
	cLayer.x = 100;
	cLayer.name = "bird01";
	backLayer.addChild(cLayer);
	bitmap = new LBitmap(new LBitmapData(imglist["bird1"]));
	cLayer.addChild(bitmap);
	cLayer.addBodyCircle(bitmap.getWidth()*0.5,bitmap.getHeight()*0.5,bitmap.getWidth()*0.5,1,.5,.4,.5);
	cLayer.setBodyMouseJoint(true);
	birdlist.push(cLayer);
	
	cLayer = new LSprite();
	cLayer.x = 200;
	cLayer.name = "bird02";
	backLayer.addChild(cLayer);
	bitmap = new LBitmap(new LBitmapData(imglist["bird2"]));
	cLayer.addChild(bitmap);
	var shapeArray = [
		[[0,54],[27,0],[54,54]]
	];
	cLayer.addBodyVertices(shapeArray,27,27,1,.5,.4,.5);
	cLayer.setBodyMouseJoint(true);
	birdlist.push(cLayer);
	
	

	
	setStage("stage03",800 - 231,480 - 50,0,10);
	setStage("stage01",800 - 305,200,90,1);
	setStage("stage01",800 - 160,200,90,1);
	setStage("stage02",800 - 231,100,0,1.5);
	setStage("stage04",800 - 231,100,0,2);

	cLayer = new LSprite();
	cLayer.x = 800 - 280;
	cLayer.y = 480-130-50;
	cLayer.name = "pig2";
	backLayer.addChild(cLayer);
	bitmap = new LBitmap(new LBitmapData(imglist["pig2"]));
	cLayer.addChild(bitmap);
	cLayer.addBodyCircle(bitmap.getWidth()*0.5,bitmap.getHeight()*0.5,bitmap.getWidth()*0.5,1,.5,.4,.5);

	winTitle = new LTextField();
	winTitle.size = 30;
	winTitle.color = "#ff0000";
	winTitle.text = "0";
	backLayer.addChild(winTitle);
	
	menuLayer = new LSprite();
	menuLayer.graphics.drawRect(1,"#ffffff",[0, 0, 800, 480],true,"#ff0000");
	menuLayer.alpha = 0.5;
	backLayer.addChild(menuLayer);
	
	startBitmap = new LBitmap(new LBitmapData(imglist["start"]));
	startBitmap.x = (800-startBitmap.getWidth())/2;
	startBitmap.y = 100;
	backLayer.addChild(startBitmap);
	
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,testStart);	
	
	wallLayer = new LSprite();
	wallLayer.x = 400;
	wallLayer.y = 0;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(800,10,0);
	wallLayer = new LSprite();
	wallLayer.x = 0;
	wallLayer.y = 240;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(10,480,0);
	wallLayer = new LSprite();
	wallLayer.x = 400;
	wallLayer.y = 480;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(800,10,0);
	wallLayer = new LSprite();
	wallLayer.x = 800;
	wallLayer.y = 240;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(10,480,0);

	backLayer.graphics.drawRect(1,"#ffffff",[0, 0, 800, 5],true,"#000000");
	backLayer.graphics.drawRect(1,"#ffffff",[0, 475, 800, 5],true,"#000000");
	backLayer.graphics.drawRect(1,"#ffffff",[0, 0, 5, 480],true,"#000000");
	backLayer.graphics.drawRect(1,"#ffffff",[795,0, 5, 480],true,"#000000");
}
function testStart(event){
	trace("testStart");
	backLayer.removeEventListener(LMouseEvent.MOUSE_UP,testStart);	
	LGlobal.box2d.setEvent(LEvent.END_CONTACT,beginContact);
	backLayer.removeChild(menuLayer);
	backLayer.removeChild(startBitmap);
}
function setStage(img,x,y,rotate,m){
	stageLayer = new LSprite();
	stageLayer.name = "stage"+stageIndex++;
	backLayer.addChild(stageLayer);
	bitmap = new LBitmap(new LBitmapData(imglist[img]));
	stageLayer.addChild(bitmap);
	stageLayer.x = x;
	stageLayer.y = y;
	stageLayer.addBodyPolygon(bitmap.getWidth(),bitmap.getHeight(),1,m,.4,.2);
	if(rotate != 0)stageLayer.setRotate(rotate*Math.PI/180);
	stagelist.push(stageLayer);
}
