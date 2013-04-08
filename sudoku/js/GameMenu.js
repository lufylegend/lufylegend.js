function GameMenu(){
	base(this,LSprite,[]);
	var self = this;
	
	var menuLayer;
	menuLayer = new LSprite();
	bitmap = new LBitmap(new LBitmapData(imglist["menu_back"]));
	bitmap.scaleX = bitmap.scaleY = 2;
	menuLayer.addChild(bitmap);
	self.addChild(menuLayer);
	
	labelText = new LTextField();
	labelText.color = "#B22222";
	labelText.font = "HG行書体";
	labelText.size = 40;
	labelText.x = 30;
	labelText.y = 700;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "Please select !!";
	menuLayer.addChild(labelText);
	
	for(var i=0;i<stageMenu.length;i++){
		self.stageVsMenu(stageMenu[i]);
	}
};
GameMenu.prototype.stageVsMenu = function(obj){
	var self = this;
	
	var menuButton = new LSprite();
	var bitmap = new LBitmap(new LBitmapData(imglist["menu_stage"]));
	menuButton.addChild(bitmap);
	menuButton.x = obj.x * 220 + 30; 
	menuButton.y = obj.y * 200 + 50;
	self.addChild(menuButton);
	if(obj.open){
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 20;
		labelText.x = 50;
		labelText.y = 90;
		menuButton.addChild(labelText)
		labelText.text = "第"+(obj.index+1)+"关";
		
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 12;
		labelText.x = 30;
		labelText.y = 30;
		menuButton.addChild(labelText)
		labelText.text = "times:"+obj.times;
		menuButton.obj = obj;
		menuButton.addEventListener(LMouseEvent.MOUSE_UP,function(event,self){
			gameStart(self.obj.index);
		});
	}else{
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 20;
		labelText.x = 60;
		labelText.y = 40;
		menuButton.addChild(labelText)
		labelText.text = "???";
	};
}
