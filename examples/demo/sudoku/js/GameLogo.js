function GameLogo(){
	base(this,LSprite,[]);
	var self = this;
	
	var logolist = [[1,1,1,1],[1,2,4,1],[1,4,2,1],[1,1,1,1]];
	var bitmap,logoLayer;
	logoLayer = new LSprite();
	bitmap = new LBitmap(new LBitmapData(imglist["logo"]));
	bitmap.scaleX = bitmap.scaleY = 2;
	logoLayer.addChild(bitmap);
	self.addChild(logoLayer);
	var social = new Social();
	social.x = 60;
	social.y = 500;
	self.addChild(social);
	
	labelText = new LTextField();
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 50;
	labelText.y = 650;
	labelText.text = "- Html5 Game Engine lufylegend.js";
	self.addChild(labelText);
	labelText = new LTextField();
	labelText.color = "#006400";
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 50;
	labelText.y = 700;
	labelText.text = "http://www.lufylegend.com/lufylegend";
	self.addChild(labelText);
	
	self.addEventListener(LMouseEvent.MOUSE_UP,menuShow);
};