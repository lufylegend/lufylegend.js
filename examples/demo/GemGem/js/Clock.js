
function Clock(){
	var self = this;
	base(self,LSprite,[]);
	self.timer = 0;
	self.addTimer = 0.05;
	self.graphics.drawArc(5,"#333333",[0,0,70,0,2*Math.PI]);
	
}
Clock.prototype.onframe = function (){
	var self = this;
	self.timer += self.addTimer;
	self.graphics.clear();
	self.graphics.drawArc(10,"#333333",[0,0,70,0,2*Math.PI]);
	self.graphics.drawArc(5,"#ffffff",[0,0,70,-Math.PI*0.5,Math.PI*self.timer/180-Math.PI*0.5]);
}