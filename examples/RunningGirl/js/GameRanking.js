function GameRanking(){
	base(this,LSprite,[]);
	var self = this;
	
	layer = new LSprite();
	layer.graphics.drawRect(4,"#000000",[0,0,350,250],true,"#FFFFFF");
	layer.x = (LGlobal.width -  350)*0.5;
	layer.y = 470;
	labelText = new LTextField();
	labelText.color = "#FF0000";
	labelText.size = 20;
	labelText.weight = "bolder";
	labelText.text = "Ranking";
	labelText.x = 120;
	labelText.y = 10;
	layer.addChild(labelText);
	labelText = new LTextField();
	labelText.color = "#006400";
	labelText.size = 20;
	labelText.weight = "bolder";
	labelText.text = "Name     Point";
	labelText.x = 60;
	labelText.y = 40;
	layer.addChild(labelText);
	
	self.addChild(layer);
	
	rankingLayer = new LSprite();
	rankingLayer.x = layer.x + 20;
	rankingLayer.y = layer.y + 70;
	self.addChild(rankingLayer);
	
	//在这里从服务器取得排名信息，调用rankShow函数显示
	//具体方法略
	getRank();
	
	layer = new LSprite();
	labelText = new LTextField();
	labelText.color = "#000000";
	labelText.size = 15;
	labelText.weight = "bolder";
	labelText.text = "您可以上传您的成绩，参与游戏排名";
	layer.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#000000";
	labelText.size = 15;
	labelText.y = 40;
	labelText.weight = "bolder";
	labelText.text = "尊姓大名：";
	layer.addChild(labelText);
	var labelLayer = new LSprite();
	labelLayer.graphics.drawRect(1,"#000000",[0,0,150,20],true,"#FFFFFF");
	nameText = new LTextField();
	nameText.x = 110;
	nameText.y = 40;
	nameText.setType(LTextFieldType.INPUT,labelLayer);
	layer.addChild(nameText);
	
	btn_update = new LSprite();
	btn_update.update_flag = 0;
	btn_update.graphics.drawRect(1,"#000000",[0,0,100,30],true,"#FFFFFF");
	labelText = new LTextField();
	labelText.size = 16;
	labelText.text = "点击上传";
	labelText.x = 10;
	labelText.y = 5;
	btn_update.y = 70;
	btn_update.addChild(labelText);
	layer.addChild(btn_update);
	
	layer.x = 80;
	layer.y = 160;
	self.addChild(layer);
	
	btn_update.addEventListener(LMouseEvent.MOUSE_UP,function(event,target){
		if(target.update_flag)return;
		if(LMath.trim(nameText.text+"").length == 0){
			alert("请输入您的尊姓大名。");
			return;
		}
		target.update_flag = 1;
		target.getChildAt(0).text = "上传中...";
		//这里开始是上传代码
		//具体方法略
	});
	
};
function getRank(){
	rankingLayer.removeAllChild();
}
function rankShow(data){
	data = eval('(' + data + ')');
	for(var i=0;i<data.length;i++){
		var obj = data[i];
		labelText = new LTextField();
		labelText.color = "#000000";
		labelText.size = 15;
		labelText.weight = "bolder";
		labelText.text = parseInt(obj.index)+1;
		labelText.x = 0;
		labelText.y = obj.index*30;
		rankingLayer.addChild(labelText);
		
		labelText = new LTextField();
		labelText.color = "#000000";
		labelText.size = 15;
		labelText.weight = "bolder";
		labelText.text = obj.name;
		labelText.x = 30;
		labelText.y = obj.index*30;
		rankingLayer.addChild(labelText);
		labelText = new LTextField();
		labelText.color = "#000000";
		labelText.size = 15;
		labelText.weight = "bolder";
		labelText.text = obj.value01;
		labelText.x = 170;
		labelText.y = obj.index*30;
		rankingLayer.addChild(labelText);
	}
}