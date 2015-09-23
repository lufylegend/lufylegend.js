function HeaderStatusView(controller,showCharacter){
	var self = this;
	base(self,LView,[controller]);
	self.set(showCharacter);
}
HeaderStatusView.prototype.set=function(showCharacter){
	var self = this;
	self.x = 10;
	self.y = 10;
	self.statusLayer = new LSprite();
	self.setStatus(new LBitmapData(LMvc.datalist["icon-header"],0,0,40,40), "yuanbao", 0,120);
	self.setStatus(new LBitmapData(LMvc.datalist["icon-header"],40,0,40,40), "yinzi", 140,160);
	self.setStatus(new LBitmapData(LMvc.datalist["icon-header"],80,0,40,40), "tili", 320,110);
	self.addChild(self.statusLayer);
	if(showCharacter){
		self.showCharacter();
	}
};
HeaderStatusView.prototype.updateView = function(){
	var self = this;
	self.statusLayer.childList.forEach(function(child){
		child.text = self.controller.getValue(child.name);
	});
};
HeaderStatusView.prototype.showCharacter=function(){
	var self = this;
	var layer = new LSprite();
	var win02 = new LPanel(new LBitmapData(LMvc.datalist["win02"]),120,120);
	layer.addChild(win02);
	//var face = new Face(LMvc.IMG_PATH+"player/1.png");
	var faceData = new LBitmapData(LMvc.datalist["face-5"],5,35,100,100);
	var face = new LBitmap(faceData);
	face.x = 10;
	face.y = 10;
	layer.addChild(face);
	var name = getStrokeLabel("lufy",20,"#FFFFFF","#000000",3);
	name.x = (120 - name.getWidth())*0.5;
	if(name.x < 0)name.x = 0;
	name.y = 100;
	name.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	layer.addChild(name);
	var bitmapChara = getBitmap(layer);
	bitmapChara.y = 40;
	self.addChild(bitmapChara);
};
HeaderStatusView.prototype.setStatus=function(bitmapData,name,startX,width){
	var self = this;
	var layer = new LSprite();
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win03"]),width,40);
	layer.addChild(panel);
	var bitmapIcon = new LBitmap(bitmapData);
	layer.addChild(bitmapIcon);
	
	var bitmapWin = getBitmap(layer);
	
	bitmapWin.x = startX;
	self.addChild(bitmapWin);
	
	var label = getStrokeLabel("",15,"#FFFFFF","#000000",2);
	label.name = name;
	label.x = startX + bitmapData.width;
	label.y = (bitmapWin.getHeight() - label.getHeight())*0.5;
	self.statusLayer.addChild(label);
};