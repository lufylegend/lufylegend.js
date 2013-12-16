function GameLogo(){
	base(this,LSprite,[]);
	var self = this;
	
	var logolist = [[1,1,1,1],[1,2,4,1],[1,4,2,1],[1,1,1,1]];
	var bitmap,logoLayer;
	
	logoLayer = new LSprite();
	logoLayer.graphics.drawRect(6,"#FF7F50",[0,0,LGlobal.width,LGlobal.height],true,"#FFDAB9");
	self.addChild(logoLayer);
	
	logoLayer = new LSprite();
	logoLayer.x = 50;
	logoLayer.y = 50;
	for(var i=0;i<logolist.length;i++){
		for(var j=0;j<logolist.length;j++){
			bitmap = new LBitmap(bitmapDataList[logolist[i][j]]);
			bitmap.x = j*STEP;
			bitmap.y = i*STEP;
			logoLayer.addChild(bitmap);
		}
	}
	bitmap = new LBitmap(new LBitmapData(imglist["player"],0,0,STEP,STEP));
	bitmap.x = STEP;
	bitmap.y = 2*STEP;
	logoLayer.addChild(bitmap);
	self.addChild(logoLayer);
	
	labelText = new LTextField();
	labelText.rotate = -20;
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 100;
	labelText.x = 300;
	labelText.y = 50;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "推";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 100;
	labelText.x = 450;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "箱";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.rotate = 20;
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 100;
	labelText.x = 600;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "子";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#B22222";
	labelText.font = "HG行書体";
	labelText.size = 40;
	labelText.x = 100;
	labelText.y = 250;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "Click to Start Game !!";
	self.addChild(labelText);
	
	var social = new Social();
	social.x = 220;
	social.y = 330;
	self.addChild(social);
	
	labelText = new LTextField();
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 400;
	labelText.y = 390;
	labelText.text = "- Html5 Game Engine lufylegend.js";
	self.addChild(labelText);
	labelText = new LTextField();
	labelText.color = "#006400";
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 400;
	labelText.y = 410;
	labelText.text = "http://www.lufylegend.com/lufylegend";
	self.addChild(labelText);
	self.addEventListener(LMouseEvent.MOUSE_UP,menuShow);
};