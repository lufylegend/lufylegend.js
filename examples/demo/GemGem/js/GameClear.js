function GameClear(){
	base(this,LSprite,[]);
	var self = this;
	var bitmap,layer;
	
	layer = new LSprite();
	layer.alpha = 0.7;
	layer.graphics.drawRect(6,"#FF7F50",[50,50,LGlobal.width-100,LGlobal.height-90],true,"#E0FFFF");
	self.addChild(layer);
	
	layer = new LSprite();
	labelText = new LTextField();
	labelText.color = "#FF0000";
	labelText.font = "HG行書体";
	labelText.size = 20;
	labelText.y = 40;
	labelText.weight = "bolder";
	labelText.text = "Point:"+point.num;
	layer.addChild(labelText);
	layer.x = 100;
	layer.y = 70;
	self.addChild(layer);
	
	/*if(stageMenu[stage.num].times==0 || stageMenu[stageIndex].times > parseInt(times.text))
	stageMenu[stageIndex].times = parseInt(times.text);
	if(stageIndex < stageMenu.length - 1)stageMenu[stageIndex + 1].open = true;
	window.localStorage.setItem("lufylegend_sudoku_stageMenu", JSON.stringify(stageMenu));
	*/
	var rank = new GameRanking();
	self.addChild(rank);
	
	var social = new Social();
	social.x = 70;
	social.y = 370;
	self.addChild(social);
	
	var btn_up = new LSprite();
	labelText = new LTextField();
	labelText.color = "#000";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 65;
	labelText.y = 8;
	labelText.text = "ReStart";
	btn_up.addChild(labelText);
	btn_up.graphics.drawRect(4,"#006400",[0,0,200,40]);
	var btn_down = new LSprite();
	labelText = new LTextField();
	labelText.color = "#000";
	labelText.font = "HG行書体";
	labelText.size = 16;
	labelText.x = 65;
	labelText.y = 8;
	labelText.text = "ReStart";
	btn_down.addChild(labelText);
	btn_down.graphics.drawRect(4,"#00FF00",[0,0,200,40]);
	btnReturn = new LButton(btn_up,btn_down);
	self.addChild(btnReturn);
	btnReturn.x = 140; 
	btnReturn.y = 300;
	btnReturn.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		//var index = stageIndex + 1;
		//if(index >= stageMenu.length)index=0;
		gameStart();
	});
};