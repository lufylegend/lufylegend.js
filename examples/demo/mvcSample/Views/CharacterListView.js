function CharacterListView(){
	base(this,LView,[]);
}
CharacterListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CharacterListView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.charaLayerInit();
	self.ctrlLayerInit();
	self.statusLayerInit();
};
CharacterListView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.charaListLayer = new LSprite();
	self.addChild(self.charaListLayer);
	self.charaDetailedLayer = new LSprite();
	self.addChild(self.charaDetailedLayer);
	
	self.charaLayer = new LSprite();
	self.charaListLayer.addChild(self.charaLayer);
	self.ctrlLayer = new LSprite();
	self.charaListLayer.addChild(self.ctrlLayer);
	
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
};
CharacterListView.prototype.charaLayerInit=function(){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["win04"]);
	var panel = getBitmap(new LPanel(bitmapData,LGlobal.width - 100,LGlobal.height - 70));
	panel.x = 10;
	panel.y = 35;
	self.charaLayer.addChild(panel);
	
	var characterList = UserModel.own().characterList;
	var backLayer = new LSprite();
	for(var i=0,l=characterList.length;i<l;i++){
		var child = new CharacterListChildView(self.controller,characterList[i],panel.getWidth() - 30);
		child.y = child.getHeight() * i;
		backLayer.addChild(child);
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, panel.getWidth() - 30, 150 * characterList.length]);
	self.charaLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, panel.getWidth() - 30, LGlobal.height - 100, 10);
	sc.x = 25;
	sc.y = 50;
	self.charaLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.characterClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.characterClickUp.bind(self));
};
CharacterListView.prototype.characterClickDown = function(event) {
	var chara = event.target;
	chara.offsetX = event.offsetX;
	chara.offsetY = event.offsetY;
};
CharacterListView.prototype.characterClickUp = function(event) {
	if(event.target.constructor.name != "CharacterListChildView"){
		return;
	}
	var self = this;
	var chara = event.target;
	if (chara.offsetX && chara.offsetY && Math.abs(chara.offsetX - event.offsetX) < 5 && Math.abs(chara.offsetY - event.offsetY) < 5) {
		self.showCharacterDetailed(chara.characterModel);
	}
};
CharacterListView.prototype.backLayerInit=function(){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = LGlobal.width / backgroundData.width;
	background.scaleY = LGlobal.height / backgroundData.height;
	self.backLayer.addChild(background);
};
CharacterListView.prototype.showCharacterDetailed2 = function(characterModel){
	var self = this;
	var characterDetail = new CharacterDetailView(self.controller,characterModel);
	characterDetail.fromView = self;
	//self.charaListLayer.visible = false;
	self.charaDetailedLayer.addChild(characterDetail);
};
CharacterListView.prototype.showCharacterDetailed=function(characterModel){
	var self = this;
	var characterDetailed = new CharacterDetailedView(self.controller, characterModel);
	self.charaDetailedLayer.addChild(characterDetailed);
	self.charaListLayer.visible = false;
};
CharacterListView.prototype.showCharacterList=function(){
	var self = this;
	self.charaDetailedLayer.die();
	self.charaDetailedLayer.removeAllChild();
	self.charaListLayer.visible = true;
};
CharacterListView.prototype.ctrlLayerInit=function(){
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.controller.returnToMain.bind(self.controller));
};
CharacterListView.prototype.statusLayerInit=function(){
	var self = this;
	var status = new HeaderStatusView(self.controller);
	self.statusLayer.addChild(status);
};