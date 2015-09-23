function LogoView(){
	base(this,LView,[]);
}
LogoView.prototype.construct=function(){
	var self = this;
	//console.log(self.constructor.name);
	var bitmapBgBack = new LBitmap(new LBitmapData(LMvc.datalist["logo_bg_1"]));
	self.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height*0.5],true,"#000000");
	bitmapBgBack.y = LGlobal.height - bitmapBgBack.getHeight()+50;
	self.addChild(bitmapBgBack);
	self.bitmapBgBack = bitmapBgBack;
	
	var bitmapBg = new LBitmap(new LBitmapData(LMvc.datalist["logo_bg_2"]));
	bitmapBg.x = -bitmapBg.getWidth()*0.5;
	
	var layerBg = new LSprite();
	layerBg.x = LGlobal.width*0.5;
	self.addChild(layerBg);
	layerBg.y = LGlobal.height - bitmapBg.getHeight();
	layerBg.scaleX = layerBg.scaleY = 4;
	layerBg.addChild(bitmapBg);
	self.layerBg = layerBg;
	
	var bitmapChara = new LBitmap(new LBitmapData(LMvc.datalist["logo_ryofu"]));
	bitmapChara.x = -bitmapChara.getWidth()*0.5;
	bitmapChara.y = -bitmapChara.getHeight()*0.5;
	var layerChara = new LSprite();
	layerChara.x = LGlobal.width*0.5;
	self.addChild(layerChara);
	layerChara.y = LGlobal.height + bitmapChara.getHeight()*2;
	layerChara.scaleX = layerChara.scaleY = 5;
	layerChara.addChild(bitmapChara);
	self.layerChara = layerChara;
	
	return;
	var title = new LTextField();
	title.color="#FFFFFF";
	title.size = 50;
	title.lineColor = "#FF0000";
	title.stroke = true;
	title.lineWidth = 4;
	title.text = "三国攻防记";
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 150;
	
	var shadow = new LDropShadowFilter(5,45,"#00FF00");
	title.filters = [shadow];
	self.addChild(title);
	
};
LogoView.prototype.updateView = function(){
	var self = this;
	self.insertWindow();
};
LogoView.prototype.insertWindow=function(){
	var self = this;

	self.childWindow = new LSprite();
	self.childWindow.x = LGlobal.width*0.5;
	self.childWindow.y = LGlobal.height*0.5;
	self.addChild(self.childWindow);
	
	self.childWindowLayer  = new LSprite();
	self.childWindow.addChild(self.childWindowLayer);
	self.childWindowLayer.x = -200;
	self.childWindowLayer.y = -200;
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win02"]),400,400);
	self.childWindowLayer.addChild(bitmapWin);
	
	
	var titleLabel = getStrokeLabel("ログイン / 新規登録",25,"#FFFFFF","#000000",3,"bitmap");
	self.childWindowLayer.addChild(titleLabel);
	titleLabel.x = (400 - titleLabel.getWidth())*0.5;
	titleLabel.y = 40;
	
	var textLayer;
	textLayer = new LBitmap(new LBitmapData(LMvc.datalist["inputbox"]));
	self.childWindowLayer.addChild(textLayer);
	textLayer.x = (400-textLayer.getWidth())*0.5;
	textLayer.y = 120;
	
	var labelLayer;
	labelLayer = new LSprite();
	labelLayer.graphics.drawRect(0,"#FF0000",[0,0,270,40]);
	var nameText = new LTextField();
	nameText.size = 25;
	nameText.x = textLayer.x + 35;
	nameText.y = textLayer.y + 20;
	nameText.text = "aaa";
	nameText.setType(LTextFieldType.INPUT,labelLayer);
	self.nameText = nameText;
	self.childWindowLayer.addChild(nameText);
	var nameLabel = getStrokeLabel("名前",20,"#FFFFFF","#000000",3,"bitmap");
	self.childWindowLayer.addChild(nameLabel);
	nameLabel.x = 60;
	nameLabel.y = 100;
	
	textLayer = new LBitmap(new LBitmapData(LMvc.datalist["inputbox"]));
	self.childWindowLayer.addChild(textLayer);
	textLayer.x = (400-textLayer.getWidth())*0.5;
	textLayer.y = 220;
	
	labelLayer = new LSprite();
	labelLayer.graphics.drawRect(0,"#FF0000",[0,0,270,40]);
	var passText = new LTextField();
	passText.size = 25;
	passText.displayAsPassword = true;
	passText.x = textLayer.x + 35;
	passText.y = textLayer.y + 20;
	passText.text = "bbb";
	passText.setType(LTextFieldType.INPUT,labelLayer);
	self.passText = passText;
	self.childWindowLayer.addChild(passText);
	var passLabel = getStrokeLabel("パスワード",20,"#FFFFFF","#000000",3,"bitmap");
	self.childWindowLayer.addChild(passLabel);
	passLabel.x = 60;
	passLabel.y = 205;
	
	var buttonLogin = getButton("ログイン",150);
	buttonLogin.x = 50;
	buttonLogin.y = 310;
	self.childWindowLayer.addChild(buttonLogin);
	
	var buttonInsert = getButton("新規登録",150);
	buttonInsert.x = 200;
	buttonInsert.y = buttonLogin.y;
	self.childWindowLayer.addChild(buttonInsert);
	
	
	buttonLogin.addEventListener(LMouseEvent.MOUSE_UP, self.login);
	buttonInsert.addEventListener(LMouseEvent.MOUSE_UP,self.register);
};
LogoView.prototype.login = function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.toLogin(self.nameText.text, self.passText.text);
};
LogoView.prototype.register = function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.toRegister(self.nameText.text, self.passText.text);
};