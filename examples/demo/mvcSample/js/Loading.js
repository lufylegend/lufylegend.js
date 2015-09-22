function Loading(data){
	base(this,LSprite,[]);
	var s = this;
	s.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");return;
	s.progress = 0;
	s.label = new LTextField();
	s.label.color="#FFFFFF";
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.y = LGlobal.height-s.label.getHeight() - 50;
	s.addChild(s.label);
	s.setLabel("五星将可以扩展技能！");
	s.progessLabel = s.label.clone();
	s.label.y = LGlobal.height-s.label.getHeight() - 50;
	s.addChild(s.label);
	s.setProgress(0);
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
Loading.prototype.onframe = function(event){
	var s = event.target;
};
Loading.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.progessLabel.text = value + "%";
	s.progessLabel.x = LGlobal.width*0.5-s.progessLabel.getWidth()*0.5;
};
Loading.prototype.setLabel = function (value){
	var s = this;
	s.label.text = value;
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};