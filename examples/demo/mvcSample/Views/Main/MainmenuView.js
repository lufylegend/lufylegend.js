function MainmenuView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
}
MainmenuView.prototype.set=function(){
	var self = this;
	var messageLayer = new LSprite();
	var messageData = new LBitmapData(LMvc.datalist["icon-mainMenu"],200,0,100,100);
	var messageBitmap = new LBitmap(messageData);
	messageLayer.addChild(messageBitmap);
	var txtMsg = getStrokeLabel("消息",18,"#FFFFFF","#000000",3);
	txtMsg.x = (100 - txtMsg.getWidth())*0.5;
	txtMsg.y = 100 - txtMsg.getHeight();
	txtMsg.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	messageLayer.addChild(txtMsg);
	var messageButton = new LButton(getBitmap(messageLayer));
	messageButton.y = 180;
	self.addChild(messageButton);
	
	var mainmenuLayer = new LSprite();
	var mainmenuData = new LBitmapData(LMvc.datalist["icon-mainMenu"],0,0,100,100);
	var mainmenuBitmap = new LBitmap(mainmenuData);
	mainmenuLayer.addChild(mainmenuBitmap);
	var txtMenu = getStrokeLabel("菜单",18,"#FFFFFF","#000000",3);
	txtMenu.x = mainmenuBitmap.x + (100 - txtMenu.getWidth())*0.5;
	txtMenu.y = mainmenuBitmap.y + 100 - txtMenu.getHeight();
	txtMenu.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	mainmenuLayer.addChild(txtMenu);
	var mainmenuButton = new LButton(getBitmap(mainmenuLayer));
	mainmenuButton.x = LGlobal.width - 100;
	mainmenuButton.y = LGlobal.height - 110;
	self.addChild(mainmenuButton);
	mainmenuButton.addEventListener(LMouseEvent.MOUSE_UP, self.mainmenuClick);
	
	var battleLayer = new LSprite();
	var battleData = new LBitmapData(LMvc.datalist["icon-mainMenu"],100,0,100,100);
	var battleBitmap = new LBitmap(battleData);
	battleLayer.addChild(battleBitmap);
	var txtBattle = getStrokeLabel("出征",18,"#FFFFFF","#000000",3);
	txtBattle.x = battleBitmap.x + (100 - txtBattle.getWidth())*0.5;
	txtBattle.y = battleBitmap.y + 100 - txtBattle.getHeight();
	txtBattle.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	battleLayer.addChild(txtBattle);
	var battleButton = new LButton(getBitmap(battleLayer));
	battleButton.x = LGlobal.width - 100;
	battleButton.y = LGlobal.height - 220;
	self.addChild(battleButton);
	
	battleButton.addEventListener(LMouseEvent.MOUSE_UP, self.battleClick);
};
MainmenuView.prototype.battleClick=function(event){
	var self = event.currentTarget.parent;
	self.controller.chapterShow();
};
MainmenuView.prototype.mainmenuClick=function(event){
	var self = event.currentTarget.parent;
	self.controller.view.menuListShow();
};