function Loading(data){
	base(this,LSprite,[]);
	var s = this;
	var background = new LSprite();
	background.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	s.addChild(background);
	var bitmap = new BitmapSprite("face/2.png");
	bitmap.x = 100;
	bitmap.y = 20;
	s.addChild(bitmap);
	for(var i=0;i<3;i++){
		var star = getStar(1);
		star.x = 100 + i*30;
		star.y = 20;
		s.addChild(star);
	}
	var label = new LTextField();
	label.color="#FFFFFF";
	label.weight="bolder";
	label.size = 18;
	label.text = "甄氏";
	s.addChild(label);
	label.x = 150;
	label.y = 350;
	
	label = new LTextField();
	label.color="#FFFFFF";
	label.weight="bolder";
	label.size = 18;
	label.text = "攻击：140";
	s.addChild(label);
	label.x = 300;
	label.y = 50;
	
	label = new LTextField();
	label.color="#FFFFFF";
	label.weight="bolder";
	label.size = 18;
	label.text = "防御：40";
	s.addChild(label);
	label.x = 300;
	label.y = 100;
	
	label = new LTextField();
	label.color="#FFFFFF";
	label.weight="bolder";
	label.size = 18;
	label.text = "技能：--";
	s.addChild(label);
	label.x = 300;
	label.y = 150;
	
	s.progress = 0;
	s.label = new LTextField();
	s.label.color="#FFFFFF";
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.y = LGlobal.height-s.label.getHeight() - 100;
	s.addChild(s.label);
	s.setLabel("五星将可以扩展技能");
	s.progessLabel = s.label.clone();
	s.progessLabel.y = s.label.y + s.progessLabel.getHeight() + 10;
	s.addChild(s.progessLabel);
	s.setProgress(s.progress);
}
Loading.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.progessLabel.text = "Loading..." + value + "%";
	s.progessLabel.x = LGlobal.width*0.5-s.progessLabel.getWidth()*0.5;
};
Loading.prototype.setLabel = function (value){
	var s = this;
	s.label.text = value;
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};