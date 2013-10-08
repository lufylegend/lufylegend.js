function GameMenu(){
	base(this,LSprite,[]);
	var self = this;
	
	var menuLayer;
	menuLayer = new LSprite();
	menuLayer.graphics.drawRect(6,"#ADD8E6",[0,0,LGlobal.width,LGlobal.height],true,"#E6E6FA");
	self.addChild(menuLayer);
	
	labelText = new LTextField();
	labelText.color = "#B22222";
	labelText.font = "HG行書体";
	labelText.size = 40;
	labelText.x = 200;
	labelText.y = 30;
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
	
	var menuButton,btn_up;
	if(obj.open){
		btn_up = new LSprite();
		btn_up.graphics.drawRect(2,"#000",[0,0,150,90],true,"#191970");
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 20;
		labelText.x = 40;
		labelText.y = 5;
		btn_up.addChild(labelText)
		labelText.text = "第"+(obj.index+1)+"关";
		
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 12;
		labelText.x = 10;
		labelText.y = 40;
		btn_up.addChild(labelText)
		labelText.text = "step:"+obj.step;
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 12;
		labelText.x = 10;
		labelText.y = 60;
		btn_up.addChild(labelText)
		labelText.text = "times:"+obj.times;
		
		
		var btn_down = new LSprite();
		btn_down.graphics.drawRect(2,"#000",[0,0,150,90],true,"#2F4F4F");
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 20;
		labelText.x = 40;
		labelText.y = 5;
		labelText.text = "第"+(obj.index+1)+"关";
		btn_down.addChild(labelText);
		
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 12;
		labelText.x = 10;
		labelText.y = 40;
		btn_down.addChild(labelText)
		labelText.text = "step:"+obj.step;
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 12;
		labelText.x = 10;
		labelText.y = 60;
		btn_down.addChild(labelText)
		labelText.text = "times:"+obj.times;
		
		menuButton = new LButton(btn_up,btn_down);
		menuButton.obj = obj;
		menuButton.addEventListener(LMouseEvent.MOUSE_UP,function(event,self){
			gameStart(self.obj.index);
		});
	}else{
		btn_up = new LSprite();
		btn_up.graphics.drawRect(2,"#000",[0,0,150,90],true,"#708090");
		labelText = new LTextField();
		labelText.color = "#ffffff";
		labelText.font = "HG行書体";
		labelText.size = 20;
		labelText.x = 40;
		labelText.y = 5;
		btn_up.addChild(labelText)
		labelText.text = "???";
		menuButton = btn_up;
	};
	self.addChild(menuButton);
	menuButton.x = obj.x * 220 + 100; 
	menuButton.y = obj.y * 140 + 130;
}
