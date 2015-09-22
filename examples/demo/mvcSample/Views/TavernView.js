function TavernView(){
	base(this,LView,[]);
}
TavernView.prototype.construct=function(){
};
TavernView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.buttonLayerInit();
	self.statusLayerInit();
	self.ctrlLayerInit();
};
TavernView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.buttonLayer = new LSprite();
	self.addChild(self.buttonLayer);
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win04"]),LGlobal.width,LGlobal.height);
	self.addChild(bitmapWin);
};
TavernView.prototype.backLayerInit=function(){
	var self = this;
	self.backLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
};
TavernView.prototype.buttonLayerInit=function(){
	var self = this;
	
	var name = getStrokeLabel(Language.get("tavern"),35,"#FFFFFF","#000000",4);
	name.x = (LGlobal.width - name.getWidth())*0.5;
	name.y = 50;
	self.backLayer.addChild(name);
	
	var ingot50 = new TavernButtonView(self.controller,0,"免费","烧刀子");
	ingot50.y = 100;
	self.buttonLayer.addChild(ingot50);
	
	var ingot100 = new TavernButtonView(self.controller,1,50,"竹叶青");
	ingot100.x = 120;
	ingot100.y = ingot50.y;
	self.buttonLayer.addChild(ingot100);
	
	var ingot100 = new TavernButtonView(self.controller,2,288,"女儿红");
	ingot100.x = 240;
	ingot100.y = ingot50.y;
	self.buttonLayer.addChild(ingot100);
	
	var ingotSpecial = new TavernButtonView(self.controller,3,2480,"杜康");
	ingotSpecial.x = 360;
	ingotSpecial.y = ingot50.y;
	self.buttonLayer.addChild(ingotSpecial);
	
	var strComment = "※ 每天可以免费请客喝五次「烧刀子」，有小几率可以得到三星武将" + 
	"\n※ 请喝「竹叶青」可以获得二星以下武将"+ 
	"\n※ 请喝「女儿红」有几率获得三星以上武将"+ 
	"\n※ 请喝「杜康」必定得一个三星以上武将";
	var lblComment = getStrokeLabel(strComment,15,"#FF0000","#FFFFFF",3);
	lblComment.width = LGlobal.width - 40;
	lblComment.setWordWrap(true,27);
	lblComment.x = 20;
	lblComment.y = ingotSpecial.y + ingotSpecial.getHeight() + 10;
	self.backLayer.addChild(lblComment);
};
TavernView.prototype.ctrlLayerInit=function(){
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.controller.returnToMain);
};
TavernView.prototype.getConfirm=function(ingot,liqueur){
	var self = this;
	var obj = {title:"购买",message:"要花费"+ingot+"元宝邀请英雄喝"+liqueur+"吗？",
	okText:"确定",okEvent:self.confirmOk,cancelText:"取消",cancelEvent:self.confirmCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
TavernView.prototype.confirmOk=function(event){
	var self = event.currentTarget.parent.parent;
	event.currentTarget.parent.remove();
	self.controller.getCharacter();
};
TavernView.prototype.confirmCancel=function(event){
	event.currentTarget.parent.remove();
};
TavernView.prototype.getCharacter=function(characterId){
	var self = this;
	var get = new GetCharacterView(self.controller,characterId);
	self.addChild(get);
};
TavernView.prototype.statusLayerInit=function(){
	var self = this;
	var status = new HeaderStatusView(self.controller);
	self.statusLayer.addChild(status);
};
