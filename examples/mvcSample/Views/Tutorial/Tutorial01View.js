function Tutorial01View(){
	base(this,LView,[]);
}
Tutorial01View.prototype.construct=function(){
};
Tutorial01View.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["bigmap"]));
	self.backLayer.addChild(bitmap);
	
	Talk(0,1,"欢迎来到「三国」世界，首先选一个自己的武将吧。",function(){
		self.selectCharacterInit();
	});
	self.setMenu();
};
Tutorial01View.prototype.selectCharacterInit=function(){
	var self = this;
	self.characterLayer = new LSprite();
	self.characterLayer.x = 128;
	self.characterLayer.y = 40;
	self.addChild(self.characterLayer);
	self.showCharacter(self.model.selectIndex);
	
	var leftArrow = new LSprite();
	leftArrow.x = 30;
	leftArrow.y = 200;
	leftArrow.addChild(new LBitmap(new LBitmapData(LMvc.datalist["arrow-left"])));
	self.addChild(leftArrow);
	leftArrow.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		self.controller.selectLeft();
	});
	
	var rightArrow = new LSprite();
	rightArrow.addChild(new LBitmap(new LBitmapData(LMvc.datalist["arrow-right"])));
	rightArrow.x = LGlobal.width - rightArrow.getWidth() - 30;
	rightArrow.y = 200;
	self.addChild(rightArrow);
	rightArrow.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.selectRight();
	});
	
	var selectButton = getButton01("選択");
	self.addChild(selectButton);
	selectButton.x = (LGlobal.width - selectButton.getWidth()) * 0.5;
	selectButton.y = 350;
	selectButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.selectCharacter();
	});
};
Tutorial01View.prototype.showCharacter=function(index){
	var self = this;
	self.characterLayer.removeAllChild();
	var character = new Character("player",index);
	self.characterLayer.addChild(character);
};
Tutorial01View.prototype.setMenu=function(){
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