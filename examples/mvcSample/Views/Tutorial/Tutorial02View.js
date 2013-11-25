function Tutorial02View(){
	base(this,LView,[]);
}
Tutorial02View.prototype.construct=function(){
};
Tutorial02View.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);

	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["bigmap"]));
	self.backLayer.addChild(bitmap);
	
	Talk(0,1,"从哪个方向开始作战？",function(){
		self.selectCityInit();
	});

	self.setMenu();
};
Tutorial02View.prototype.selectCityInit=function(){
	var self = this;
	self.cityLayer = new LSprite();
	self.addChild(self.cityLayer);
	
	var buttonWesternNorth = new LButtonSample2("西北");
	buttonWesternNorth.x = 150;
	buttonWesternNorth.y = 200;
	self.cityLayer.addChild(buttonWesternNorth);
	buttonWesternNorth.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.selectWesternNorth();
	});
	var buttonEastNorth = new LButtonSample2("东北");
	buttonEastNorth.x = 250;
	buttonEastNorth.y = 200;
	self.cityLayer.addChild(buttonEastNorth);
	buttonEastNorth.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.selectEastNorth();
	});
	var buttonWesternSouth = new LButtonSample2("西南");
	buttonWesternSouth.x = 150;
	buttonWesternSouth.y = 300;
	self.cityLayer.addChild(buttonWesternSouth);
	buttonWesternSouth.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.selectWesternSouth();
	});
	var buttonEastSouth = new LButtonSample2("东南");
	buttonEastSouth.x = 250;
	buttonEastSouth.y = 300;
	self.cityLayer.addChild(buttonEastSouth);
	buttonEastSouth.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.selectEastSouth();
	});
};
Tutorial02View.prototype.setMenu=function(){
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