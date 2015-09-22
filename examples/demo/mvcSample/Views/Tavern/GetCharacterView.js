function GetCharacterView(controller,characterId){
	var self = this;
	base(self,LView,[controller]);
	self.characterId = characterId;
	self.set();
}
GetCharacterView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.cardListLayer = new LSprite();
	self.addChild(self.cardListLayer);
};
GetCharacterView.prototype.backLayerInit=function(){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = LGlobal.width / backgroundData.width;
	background.scaleY = LGlobal.height / backgroundData.height;
	self.backLayer.addChild(background);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP, function(){});
};
GetCharacterView.prototype.set=function(){
	var self = this;
	self.layerInit();
	var leftList = [
		{data:"tavern-face-1",fx:-300,fy:LGlobal.height*0.5 - 200,tx:LGlobal.width + 50,ty:LGlobal.height*0.5 + 200,name:"刘备",star:4},
		{data:"tavern-face-2",fx:-300,fy:LGlobal.height*0.5 - 200,tx:LGlobal.width + 50,ty:LGlobal.height*0.5 + 200,name:"张飞",star:4},
		{data:"tavern-face-3",fx:-300,fy:LGlobal.height*0.5 - 200,tx:LGlobal.width + 50,ty:LGlobal.height*0.5 + 200,name:"关羽",star:5},
		{data:"tavern-face-4",fx:-300,fy:LGlobal.height*0.5 - 200,tx:LGlobal.width + 50,ty:LGlobal.height*0.5 + 200,name:"吕布",star:5}
	];
	var rightList = [
		{data:"tavern-face-1",fx:LGlobal.width + 50,fy:LGlobal.height*0.5 - 200,tx:-300,ty:LGlobal.height*0.5 + 200,name:"刘备",star:4},
		{data:"tavern-face-2",fx:LGlobal.width + 50,fy:LGlobal.height*0.5 - 200,tx:-300,ty:LGlobal.height*0.5 + 200,name:"张飞",star:4},
		{data:"tavern-face-3",fx:LGlobal.width + 50,fy:LGlobal.height*0.5 - 200,tx:-300,ty:LGlobal.height*0.5 + 200,name:"关羽",star:5},
		{data:"tavern-face-4",fx:LGlobal.width + 50,fy:LGlobal.height*0.5 - 200,tx:-300,ty:LGlobal.height*0.5 + 200,name:"吕布",star:5}
	];
	
	for(var i=0,l=leftList.length;i<l;i++){
		var leftData = leftList[i];
		var cardBitmapDataLeft = new LBitmapData(LMvc.datalist[leftData.data]);
		var cardLeft = new Card(cardBitmapDataLeft,leftData.name,leftData.star);
		cardLeft.x = leftData.fx;
		cardLeft.y = leftData.fy - cardLeft.cardH * 0.5;
		self.cardListLayer.addChild(cardLeft);
		LTweenLite.to(cardLeft,0.5,{delay:0.3 * i,x:leftData.tx,y:leftData.ty - cardLeft.cardH * 0.5});
		
		var rightData = rightList[l-i-1];
		var cardBitmapDataRight = new LBitmapData(LMvc.datalist[rightData.data]);
		var cardRight = new Card(cardBitmapDataRight,rightData.name,rightData.star);
		cardRight.x = rightData.fx;
		cardRight.y = rightData.fy - cardRight.cardH * 0.5;
		self.cardListLayer.addChild(cardRight);
		
		if(i == 3){
			LTweenLite.to(cardRight,0.5,{delay:0.3 * i,x:rightData.tx,y:rightData.ty - cardRight.cardH * 0.5,onComplete:self.showCard});
		}else{
			LTweenLite.to(cardRight,0.5,{delay:0.3 * i,x:rightData.tx,y:rightData.ty - cardRight.cardH * 0.5});
		}
	}
};
GetCharacterView.prototype.showCard=function(event){
	var self = event.target.parent.parent;
	self.backLayer.remove();
	self.cardListLayer.remove();
	var animeW = 960;
	var animeH = 960;
	var list = LGlobal.divideCoordinate(animeW,animeH,1,2);
	var bitmapDataGet = new LBitmapData(LMvc.datalist["tavern-getBackground"],0,0,animeW*0.5,animeH);
	var getAnimation = new LAnimationTimeline(bitmapDataGet,list);
	getAnimation.onframe();
	getAnimation.speed = 8;
	getAnimation.y = (LGlobal.height - animeH)*0.5;
	self.addChild(getAnimation);
	
	var face = new Face(LMvc.IMG_PATH + "face/" + self.characterId + ".png");
	var card = new Card(face,"吕布",5);
	card.x = -card.cardW*0.5;
	card.y = -card.cardH*0.5;
	var cardLayer = new LSprite();
	cardLayer.x = LGlobal.width*0.5;
	cardLayer.y = LGlobal.height*0.5;
	cardLayer.scaleX = cardLayer.scaleY = 0.1;
	cardLayer.rotate = -360*3;
	self.addChild(cardLayer);
	cardLayer.addChild(card);
	
	LTweenLite.to(cardLayer,1,{rotate:0,scaleX:1,scaleY:1,onComplete:self.addClickEvent});
	
};
GetCharacterView.prototype.addClickEvent=function(event){
	var self = event.target.parent;
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
GetCharacterView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.remove();
};