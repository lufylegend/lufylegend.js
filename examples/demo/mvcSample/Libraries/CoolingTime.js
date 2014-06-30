function CoolingTime(needTimes,sumTimes,msg){
	var self = this;
	base(self,LSprite,[]);
	self.needTimes = needTimes;
	self.sumTimes = sumTimes;
	self.msg = msg;
	self.initTime = new Date();
	var timeLabel = new LTextField();
	timeLabel.color = "#000000";
	//timeLabel.size = 20;
	timeLabel.x = 0;
	timeLabel.y = 3;
	self.addChild(timeLabel);
	self.timeLabel = timeLabel;

	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
CoolingTime.prototype.onframe=function(event){
	var self = event.target;
	var nowTime = new Date();
	var t = (nowTime.getTime() - self.initTime)/1000 >>> 0;
	self.timeLabel.text = self.msg+"："+(self.needTimes - t)+"秒";
	self.graphics.clear();
	self.graphics.drawRect(2,"yellow",[0,0,200,20],true,"#ffffff");
	self.graphics.drawRect(0,"#000000",[0,0,200*((self.sumTimes - self.needTimes + t)/self.sumTimes),20],true,"#FF0000");
	if(self.needTimes - t <= 0){
		self.removeEventListener(LEvent.ENTER_FRAME, self.onframe);
	}
};