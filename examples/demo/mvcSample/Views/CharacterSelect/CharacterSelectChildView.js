function CharacterSelectChildView(controller,characterModel){
	var self = this;
	base(self,LView,[controller]);
	self.characterModel = characterModel;
	self.set();
	//self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	//self.addEventListener(LMouseEvent.MOUSE_DOWN, self.onDown);
	//self.addEventListener(LMouseEvent.MOUSE_UP, self.onUp);
}
CharacterSelectChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
CharacterSelectChildView.prototype.loadOver=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.loadCompleteCount++;
	if(self.loadCompleteCount < 2){
		return;
	}
	var layer = self.layer.getChildAt(0);
	layer.visible = true;
	var bitmap = getBitmap(layer);
	layer.remove();
	self.layer.addChildAt(bitmap, 0);
};
CharacterSelectChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	self.loadCompleteCount = 0;
	
	var width = 100, height = 100;
	var layer = new LSprite();
	layer.visible = false;
	self.layer.addChild(layer);
	
	
	var chara = self.characterModel.minFace();
	chara.addEventListener(LEvent.COMPLETE,self.loadOver);
	layer.addChild(chara);
	
	var name = getStrokeLabel("Lv." + self.characterModel.level(),11,"#FFFFFF","#000000",2);
	name.x = 10;
	name.y = 10;
	layer.addChild(name);
	
	
	var backgroundStar = new LBitmap(new LBitmapData(LMvc.datalist["translucent"]));
	backgroundStar.scaleX = width / backgroundStar.getWidth();
	backgroundStar.scaleY = 20 / backgroundStar.getHeight();
	backgroundStar.x = chara.x;
	backgroundStar.y = chara.y + width - 20;
	layer.addChild(backgroundStar);
	
	var starLayer = new LSprite();
	for(var i=0,l=self.characterModel.star();i<l;i++){
		var star = getStar(1);
		star.scaleX = star.scaleY = 0.5;
		star.x = star.getWidth() * i * 0.95;
		starLayer.addChild(star);
	}
	starLayer.x = (width - starLayer.getWidth()) * 0.5;
	//console.log(panel.getWidth()+ "-" +starLayer.getWidth(),starLayer.x);
	starLayer.y = height - starLayer.getHeight() * 1.2;
	layer.addChild(starLayer);
	
	var five = new BitmapSprite("five/"+self.characterModel.five()+".png");
	five.addEventListener(LEvent.COMPLETE,self.loadOver);
	five.scaleX = five.scaleY = 30/50;
	five.x = width - 30 - 5;
	five.y = 5;
	layer.addChild(five);
	
	var bitmapData = new LBitmapData(LMvc.datalist["win06"]);
	var panel = new LPanel(bitmapData,100,100);
	layer.addChild(panel);
	
	var bitmapDataCheck = new LBitmapData(LMvc.datalist["select-checkIcon"]);
	self.checkIcon = new LBitmap(bitmapDataCheck);
	self.layer.addChild(self.checkIcon);
	self.checkIcon.visible = false;
	
	//panel = getBitmap(panel);
};
CharacterSelectChildView.prototype.isChecked=function(){
	return this.checkIcon.visible;
};
CharacterSelectChildView.prototype.check=function(){
	var self = this;
	self.checkIcon.visible = !self.checkIcon.visible;
};
CharacterSelectChildView.prototype.onDown=function(event){
	var self = event.currentTarget;
	self.onTouching = true;
	self.saveTouch = {x:mouseX,y:mouseY,dx:mouseX,dy:mouseY,speed:0,touchMove:false};
	var parent = self.parent;
	parent.startDrag(event.touchPointID);
};
CharacterSelectChildView.prototype.onUp=function(event){
	var self = event.currentTarget;
	self.onTouching = false;
	var parent = self.parent;
	parent.stopDrag();
	if(!self.saveTouch.touchMove){
		self.controller.view.showCharacterDetail(self.characterModel.id());
	}/*else{
		self.controller.view.centerOnChild();
	}*/
};
CharacterSelectChildView.prototype.onframe=function(event){
	var self = event.currentTarget;
	var point = self.getRootCoordinate();
	if(point.y > LGlobal.height - 100 || point.y < -90){
		self.layer.visible = false;
	}else{
		self.layer.visible = true;
	}
	if(!self.onTouching){
		return;
	}
	if(!self.saveTouch.touchMove && (Math.abs(self.saveTouch.dx - mouseX) > 5 || Math.abs(self.saveTouch.dy - mouseY) > 5)){
		self.saveTouch.touchMove = true;
	}
	self.saveTouch.speed = self.saveTouch.y - mouseY;
	self.saveTouch.x = mouseX;
	self.saveTouch.y = mouseY;
};