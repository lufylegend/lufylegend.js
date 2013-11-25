function Tutorial05View(){
	base(this,LView,[]);
}
Tutorial05View.prototype.construct=function(){
};
Tutorial05View.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.backLayer.x = -100;
	self.backLayer.y = 140;
	self.addChild(self.backLayer);

	self.backgroundInit();
	
	self.statusInit();
	self.menuInit();
	
	
	self.cloudsInit();
	
	self.buildLayer = new LSprite();
	self.addChild(self.buildLayer);
	//buildLayer.x = LGlobal.width;
	
	self.handLayer = new LSprite();
	self.addChild(self.handLayer);
	
	//self.addEvent();
};
Tutorial05View.prototype.talkChangeEvent=function(){
	var self = this;
	self.addEventListener(LMouseEvent.MOUSE_UP,self.talkChange);
};
Tutorial05View.prototype.talkChange=function(event){
	var self = event.clickTarget;
	self.removeEventListener(LMouseEvent.MOUSE_UP,self.talkChange);
	self.controller.talkChange();
};
Tutorial05View.prototype.setTalk=function(data){
	var self = this;
	Talk(self,data.index,data.sub_index,data.message,function(){
		self.talkChangeEvent();
	});
};
Tutorial05View.prototype.handShow=function(){
	var self = this;
	self.addHand(220,250);
	Talk(0,1,"强盗马上要来了，快点去酒馆招聘一个武将吧。",function(){
		self.addEvent();
	});
};

Tutorial05View.prototype.addHand=function(x,y){
	var self = this;
	var hand = new Hand();
	hand.x = x;
	hand.y = y;
	self.handLayer.addChild(hand);
};
Tutorial05View.prototype.menuInit=function(){
	var self = this;
	var menuLayer = new LSprite();
	
	var bLayer = new LSprite();
	bLayer.alpha = 0.8;
	bLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,100],true,"#000000");
	bLayer.y = LGlobal.height - bLayer.getHeight();
	menuLayer.addChild(bLayer);
	
	var menuBar = new Bar(LGlobal.width,100);
	menuLayer.addChild(menuBar);
	menuBar.y = LGlobal.height - menuBar.getHeight();
	self.addChild(menuLayer);
	
	var buttonMap = new LButtonSample2("作戦",26);
	buttonMap.backgroundCorl = "red";
	menuLayer.addChild(buttonMap);
	buttonMap.x = 50;
	buttonMap.y = menuBar.y + 20;
	var buttonMain = new LButtonSample2("メイン",26);
	buttonMain.backgroundCorl = "red";
	menuLayer.addChild(buttonMain);
	buttonMain.x = 300;
	buttonMain.y = menuBar.y + 20;
	
	self.menuLayer = menuLayer;
};
/* 
 * 背景
 */
Tutorial05View.prototype.backgroundInit=function(){
	var self = this;
	var backgroundLayer = new LSprite();
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["background"]));
	backgroundLayer.addChild(bitmap);
	self.backLayer.addChild(backgroundLayer);
	self.backgroundLayer = backgroundLayer;
	
	self.buildInit();
};
Tutorial05View.prototype.buildInit = function(){
	var self = this,i,l,buildList,build;
	buildList = self.model.getBuildList();
	self.buildList = buildList;
	for(i=0,l=buildList.length;i<l;i++){
		build = buildList[i];
		self.setBuild(build.path,build.point.x,build.point.y,build.name,build.lv);
	}
};
Tutorial05View.prototype.setBuild=function(path,x,y,name,lv){
	var self = this;
	var layer = new LSprite();
	layer.x = x;
	layer.y = y;
	self.backLayer.addChild(layer);
	
	layer.addChild(new BitmapSprite(path));
	var nameLabel = new LTextField();
	nameLabel.text = name;
	nameLabel.color = "#FFFFFF";
	nameLabel.x = 50;
	layer.addChild(nameLabel);
	if(lv >= 0){
		var lvLabel = new LTextField();
		lvLabel.text = "Lv"+lv;
		lvLabel.color = "#FFFFFF";
		lvLabel.size = 9;
		lvLabel.x = nameLabel.x + nameLabel.getWidth();
		lvLabel.y = 3;
		layer.addChild(lvLabel);
	}
	return layer;
};
Tutorial05View.prototype.addEvent=function(){
	var self = this;
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self.onDown);
	self.addEventListener(LMouseEvent.MOUSE_MOVE,self.onMove);
	self.addEventListener(LMouseEvent.MOUSE_UP,self.onUp);
};
Tutorial05View.prototype.onDown=function(event){
	var self = event.clickTarget;
	self.downPoint = {x:event.offsetX,y:event.offsetY,bx:self.backLayer.x,by:self.backLayer.y};
};
Tutorial05View.prototype.onMove=function(event){
	var self = event.clickTarget;
	if(typeof self.downPoint == UNDEFINED)return;
	self.backLayer.x = event.offsetX - self.downPoint.x + self.downPoint.bx;
	self.backLayer.y = event.offsetY - self.downPoint.y + self.downPoint.by;
	if(self.backLayer.x > 0){
		self.backLayer.x = 0;
	}else if(self.backLayer.x <  LGlobal.width - self.backgroundLayer.getWidth()){
		self.backLayer.x = LGlobal.width - self.backgroundLayer.getWidth();
	}
	if(self.backLayer.y > 140){
		self.backLayer.y = 140;
	}else if(self.backLayer.y <  LGlobal.height - self.backgroundLayer.getHeight()){
		self.backLayer.y = LGlobal.height - self.backgroundLayer.getHeight();
	}
};
Tutorial05View.prototype.onUp=function(event){
	var self = event.clickTarget;
	var downPoint = self.downPoint;
	delete self.downPoint;
	if(Math.abs(event.offsetX - downPoint.x) > 2 || Math.abs(event.offsetY - downPoint.y) > 2){
		return;
	}
	
	var cx = event.selfX - self.backLayer.x,cy = event.selfY - self.backLayer.y;
	for(var i=0;i<self.buildList.length;i++){
		var obj = self.buildList[i];
		var rect = obj.rect;
		if(!obj.clickMode)continue;
		if(cx >= rect.x && cx <= rect.x + rect.width && cy >= rect.y && cy <= rect.y + rect.height){
			self.controller.selectBuild(obj.type);
		}
	}
};
Tutorial05View.prototype.cloudsInit=function(){
	var self = this;
	var cloud = new BitmapSprite(self.model.getCloudsPath());
	cloud.y = 300;
	self.addChild(cloud);
	self.cloud = cloud;
	self.controller.cloudsRun();
};
Tutorial05View.prototype.showBuild = function(buildType){
	var self = this;
	self.die();
	self.handLayer.removeAllChild();
	
	var bLayer = new LSprite();
	bLayer.alpha = 0.8;
	bLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	self.buildLayer.addChild(bLayer);
	var bBar = new Bar(LGlobal.width,LGlobal.height);
	self.buildLayer.addChild(bBar);
	
};

/* 
 * 上の顔画像や、ステータス部分
 */
Tutorial05View.prototype.statusInit=function(){
	var self = this;
	var statusLayer = new LSprite();
	self.addChild(statusLayer);
	self.statusLayer = statusLayer;
	
	var statusBack = new LBitmap(new LBitmapData(LMvc.datalist["statusBack"]));
	statusLayer.addChild(statusBack);
	var face = new Face(self.model.userStatus.face);
	face.x = face.y = 20;
	statusLayer.addChild(face);
	
	var nameLabel = new LTextField();
	nameLabel.text = "ニックネーム：" + self.model.userStatus.name;
	nameLabel.color = "#FFFFFF";
	nameLabel.x = 140;
	nameLabel.y = 20;
	statusLayer.addChild(nameLabel);
	
	var icon_gold = new LBitmap(new LBitmapData(LMvc.datalist["icon_gold"]));
	icon_gold.x = 130;
	icon_gold.y = 50;
	statusLayer.addChild(icon_gold);
	var goldLabel = new LTextField();
	goldLabel.text = self.model.userStatus.gold;
	goldLabel.color = "#FFFFFF";
	goldLabel.x = 180;
	goldLabel.y = 55;
	statusLayer.addChild(goldLabel);
	
	var icon_silver = new LBitmap(new LBitmapData(LMvc.datalist["icon_silver"]));
	icon_silver.x = 240;
	icon_silver.y = 50;
	statusLayer.addChild(icon_silver);
	var silverLabel = new LTextField();
	silverLabel.text = self.model.userStatus.silver;
	silverLabel.color = "#FFFFFF";
	silverLabel.x = 290;
	silverLabel.y = 55;
	statusLayer.addChild(silverLabel);

	var icon_food = new LBitmap(new LBitmapData(LMvc.datalist["icon_food"]));
	icon_food.x = 130;
	icon_food.y = 85;
	statusLayer.addChild(icon_food);
	var foodLabel = new LTextField();
	foodLabel.text = self.model.userStatus.food;
	foodLabel.color = "#FFFFFF";
	foodLabel.x = 180;
	foodLabel.y = 95;
	statusLayer.addChild(foodLabel);

	var icon_wood = new LBitmap(new LBitmapData(LMvc.datalist["icon_wood"]));
	icon_wood.x = 240;
	icon_wood.y = 85;
	statusLayer.addChild(icon_wood);
	var woodLabel = new LTextField();
	woodLabel.text = self.model.userStatus.wood;
	woodLabel.color = "#FFFFFF";
	woodLabel.x = 290;
	woodLabel.y = 95;
	statusLayer.addChild(woodLabel);

	var icon_iron = new LBitmap(new LBitmapData(LMvc.datalist["icon_iron"]));
	icon_iron.x = 350;
	icon_iron.y = 90;
	statusLayer.addChild(icon_iron);
	var ironLabel = new LTextField();
	ironLabel.text = self.model.userStatus.iron;
	ironLabel.color = "#FFFFFF";
	ironLabel.x = 390;
	ironLabel.y = 95;
	statusLayer.addChild(ironLabel);
};