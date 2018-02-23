function GameLogo(){
	base(this,LSprite,[]);
	var self = this;
	
	var logolist = [[1,1,1,1],[1,2,4,1],[1,4,2,1],[1,1,1,1]];
	var bitmap,logoLayer;
	
	logoLayer = new LSprite();
	logoLayer.graphics.drawRect(6,"#FF7F50",[0,0,LGlobal.width,LGlobal.height],true,"#FFDAB9");
	self.addChild(logoLayer);
	
	logoLayer = new LSprite();
	logoLayer.x = 120;
	logoLayer.y = 300;
	for(var i=0;i<8;i++){
		g = new Gem(i+1);
		g.x = (i%4)*60;
		g.y = (i/4 >>> 0)*60;
		logoLayer.addChild(g);
	}
	self.addChild(logoLayer);
	
	labelText = new LTextField();
	labelText.rotate = -20;
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 80;
	labelText.x = 50;
	labelText.y = 100;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "Gem";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.rotate = -20;
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 80;
	labelText.x = 180;
	labelText.y = 140;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "Gem";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#B22222";
	labelText.font = "HG行書体";
	labelText.size = 30;
	labelText.x = 50;
	labelText.y = 550;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "Click to Start Game !!";
	self.addChild(labelText);
	
	var social = new Social();
	social.x = 50;
	social.y = 620;
	self.addChild(social);
	
	labelText = new LTextField();
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 70;
	labelText.y = 690;
	labelText.text = "- Html5 Game Engine lufylegend.js";
	self.addChild(labelText);
	labelText = new LTextField();
	labelText.color = "#006400";
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 70;
	labelText.y = 720;
	labelText.text = "http://www.lufylegend.com/lufylegend";
	self.addChild(labelText);
	
	self.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
};