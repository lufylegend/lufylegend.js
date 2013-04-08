function gameInit(){
	stageLayer = new LSprite();
	addChild(stageLayer);
	addGameLogo();
}
function addGameLogo(){
	var layer = new GameLogo();
	stageLayer.addChild(layer);
}
function addGameClear(){
	stageLayer.removeAllChild();
	var layer = new GameClear();
	stageLayer.addChild(layer);
}
function gameStart(){
	stageLayer.removeAllChild();
	var clearList,i,g,num;
	backLayer = new LSprite();
	stageLayer.addChild(backLayer);
	gemLayer = new LSprite();
	stageLayer.addChild(gemLayer);
	bulletLayer = new LSprite();
	stageLayer.addChild(bulletLayer);
	getLayer = new LSprite();
	stageLayer.addChild(getLayer);
	direction = "";
	//背景
	var bitmap = new LBitmap(new LBitmapData(datalist["back"]));
	backLayer.addChild(bitmap);
	//宝石范围上边界
	var bitmapLine = new LBitmap(new LBitmapData(datalist["line"]));
	bitmapLine.y = 100;
	backLayer.addChild(bitmapLine);
	//宝石范围下边界
	var bitmapLine = new LBitmap(new LBitmapData(datalist["line"]));
	bitmapLine.y = 600;
	backLayer.addChild(bitmapLine);
	
	point = new Point();
	point.x = 220;
	point.y = 60;
	backLayer.addChild(point);
	
	stage = new Stage();
	stage.x = 20;
	stage.y = 630;
	backLayer.addChild(stage);
	//添加宝石
	addGem();
	
	clock = new Clock();
	clock.x = LGlobal.width*0.5;
	clock.y = 700;
	backLayer.addChild(clock);
	
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,onUp);
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
}
function addGem(){
	stage.setStage(stage.num + 1);
	gemLayer.removeAllChild();
	list = [];
	//添加宝石
	for(i=0;i<8;i++){
		list.push([]);
		for(var j=0;j<8;j++){
			num = (Math.random()*9 >>> 0)+1;
			g = new Gem(num);
			g.x = j*60;
			g.y = i*60+120;
			gemLayer.addChild(g);
			list[i].push(g);
		}
	}
	//检验重复宝石
	do{
		clearList = checkClear();
		if(clearList.length > 0){
			for(i=0;i<clearList.length;i++){
				g = clearList[i];
				num = (Math.random()*9 >>> 0)+1;
				g.change(num);
			}
		}
	}while(clearList.length > 0);
}
function onframe(){
	clock.onframe();
	if(clock.timer >= 360){
		addGameClear();
	}
}
