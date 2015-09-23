function Card(){
	var self = this;
	base(self,LSprite,[]);
	self.cardW = 224;
	self.cardH = 315;
	var backData = new LBitmapData(LMvc.datalist["face-background"]);
	var backBitmap = new LBitmap(backData);
	self.addChild(backBitmap);
	//arguments 
	//1 : bitmapData,name,starCount,fiveIndex
	//2 : Face,name,starCount,fiveIndex
	//3 : path,name,starCount,fiveIndex
	//3 : CharacterModel
	var strName,starCount,fiveIndex = 1;
	if(typeof arguments[0] == "object" && arguments[0].type == "LBitmapData"){
		var bitmap = new LBitmap(arguments[0]);
		self.addChild(bitmap);
		strName = arguments[1];
		starCount = arguments[2];
	}else if(typeof arguments[0] == "object" && arguments[0].type == "Face"){
		self.addChild(arguments[0]);
		strName = arguments[1];
		starCount = arguments[2];
	}else if(typeof arguments[0] == "object" && arguments[0].type == "CharacterModel"){
		var characterModel = arguments[0];
		self.addChild(characterModel.face());
		strName = characterModel.name() + " Lv." + characterModel.level();
		starCount = characterModel.star();
	}else if(typeof arguments[0] == "string"){
		self.cardLayer = new LSprite();
		self.addChild(self.cardLayer);
		strName = arguments[1];
		starCount = arguments[2];
		
		loader = new LLoader();
		loader.parent = self;
		loader.addEventListener(LEvent.COMPLETE,self.loadOver);
		loader.load(arguments[0],"bitmapData");
	}
	
	var name = getStrokeLabel(strName,15,"#FFFFFF","#000000",4);
	name.x = 10;
	name.y = 10;
	self.addChild(name);
		
	for(var i=0,l=starCount;i<l;i++){
		var star = getStar(1);
		star.x = self.cardW - star.getWidth() * (i + 1.5);
		star.y = self.cardH - star.getHeight() * 1.5;
		self.addChild(star);
	}
	
	var five = new BitmapSprite("five/"+fiveIndex+".png");
	five.scaleX = five.scaleY = 40/50;
	five.x = self.cardW - 40 - 5;
	five.y = 5;
	self.addChild(five);
	var win = new LPanel(new LBitmapData(LMvc.datalist["win06"]),224,315);
	self.addChild(win);
}
Card.prototype.loadOver = function(event){
	var self = event.currentTarget.parent;
	var bitmapData = new LBitmapData(event.target);
	var bitmap = new LBitmap(bitmapData);
	self.cardLayer.addChild(bitmap);
};
