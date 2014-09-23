/**
 * @author lufy
 */
function GameOver(){
	base(this,LSprite,[]);
	this.init();
}
GameOver.prototype.init = function(){
	var self = this;
	self.overLayer = new LSprite();
	self.addChild(self.overLayer);
	var windowBitmap = new LBitmap(new LBitmapData(dataList["window"]));
	self.overLayer.addChild(windowBitmap);
	var gameText = new LTextField();
	gameText.text = "GAME OVER";
	gameText.color = "#FFFFFF";
	gameText.size = 18;
	gameText.x = (windowBitmap.getWidth() - gameText.getWidth())*0.5;
	gameText.y = 10;
	self.overLayer.addChild(gameText);
	self.overLayer.x = (LGlobal.width - self.overLayer.getWidth())*0.5;
	self.overLayer.y = (LGlobal.height - self.overLayer.getHeight())*0.5;
	
	var distanceText = new LTextField();
	distanceText.text = "DISTANCE : " + runCharacter.distanceObj.value;
	distanceText.color = "#FFFFFF";
	distanceText.size = 17;
	distanceText.weight = "bolder";
	distanceText.x = 50;
	distanceText.y = 60;
	self.overLayer.addChild(distanceText);
	
	var textLabel;
	textLabel = new LTextField();
	textLabel.size = 12;
	textLabel.x = 50;
	textLabel.y = 100;
	textLabel.color = "#FFFFFF";
	textLabel.text = "名前を入力して、成績を更新しましょう！";
	self.overLayer.addChild(textLabel);
	
	self.nameLabel = new LTextField();
	self.nameLabel.size = 15;
	self.nameLabel.x = 50;
	self.nameLabel.y = 130;
	self.nameLabel.color = "#FFFFFF";
	self.nameLabel.text = "NAME：";
	self.overLayer.addChild(self.nameLabel);
	
	self.ex = new LTextField();
	self.ex.size = 15;
	self.ex.x = 50;
	self.ex.y = 130;
	self.ex.color = "#FFFFFF";
	self.ex.text = "Update......";
	self.ex.visible = false;
	self.overLayer.addChild(self.ex);
	
	var inputLayer = new LSprite();
	var bitmap = new LBitmap(new LBitmapData(dataList["inputbox"]));
	inputLayer.addChild(bitmap);
	var inputOne = new LTextField();
	inputOne.x = 130;
	inputOne.y = 125;
	inputOne.setType(LTextFieldType.INPUT,inputLayer);
	self.overLayer.addChild(inputOne);
	self.inputOne = inputOne;
	
	var buttonUpdate = new LButtonSample1(" 成績更新 ");
	buttonUpdate.x = 70;
	buttonUpdate.y = 170;
	self.overLayer.addChild(buttonUpdate);
	buttonUpdate.addEventListener(LMouseEvent.MOUSE_UP,function(){
		self.updateDistance();
	});
	
	var buttonReplay = new LButtonSample1(" もう一度 ");
	buttonReplay.x = 220;
	buttonReplay.y = 170;
	self.overLayer.addChild(buttonReplay);
	buttonReplay.addEventListener(LMouseEvent.MOUSE_UP, gameStart);
	
	self.rankingLayer = new LSprite();
	self.rankingLayer.x = 50;
	self.rankingLayer.y = 210;
	self.overLayer.addChild(self.rankingLayer);
	
	self.getRank();
};
GameOver.prototype.updateDistance = function(event){
	var self = this;
	if(self.ex.visible){
		alert("updating...");
		return;
	}
	if(LMath.trim(self.inputOne.text+"").length == 0){
		alert("名前を入力してください。");
		return;
	}
	alert("这个只是本地demo，无法上传成绩。");
};
GameOver.prototype.getRank = function(){
	var self = this;
	self.rankingLayer.removeAllChild();
	var str = '[{"index":0,"name":"test1","value01":"100","value02":"0","value03":"0"},{"index":1,"name":"test2","value01":"90","value02":"0","value03":"0"},{"index":2,"name":"test3","value01":"80","value02":"0","value03":"0"},{"index":3,"name":"test4","value01":"70","value02":"0","value03":"0"},{"index":4,"name":"test5","value01":"60","value02":"0","value03":"0"}] ';
	self.rankShow(str);
};
GameOver.prototype.rankShow = function(data){
	var self = this;
	data = eval('(' + data + ')');
	var labelText,bitmap;
	for(var i=0;i<data.length;i++){
		var obj = data[i];
		bitmap = new LBitmap(new LBitmapData(dataList["stage"],32*18+i*32,32*3,32,32));
		bitmap.x = 0;
		bitmap.y = obj.index*32;
		self.rankingLayer.addChild(bitmap);
		
		labelText = new LTextField();
		labelText.color = "#FFFFFF";
		labelText.size = 15;
		labelText.weight = "bolder";
		labelText.text = obj.name;
		labelText.x = 50;
		labelText.y = obj.index*32+5;
		self.rankingLayer.addChild(labelText);
		labelText = new LTextField();
		labelText.color = "#FFFFFF";
		labelText.size = 15;
		labelText.weight = "bolder";
		labelText.text = obj.value01;
		labelText.x = 200;
		labelText.y = obj.index*32+5;
		self.rankingLayer.addChild(labelText);
	}
};