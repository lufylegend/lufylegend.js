function Box(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.box1=[[0,0,0,0],
		  [0,0,0,0],
		  [1,1,1,1],
		  [0,0,0,0]];
	self.box2=[[0,0,0,0],
		  [0,1,1,0],
		  [0,1,1,0],
		  [0,0,0,0]];
	self.box3=[[0,0,0,0],
		  [1,1,1,0],
		  [0,1,0,0],
		  [0,0,0,0]];
	self.box4=[[0,1,1,0],
		  [0,1,0,0],
		  [0,1,0,0],
		  [0,0,0,0]];
	self.box5=[[0,1,1,0],
		  [0,0,1,0],
		  [0,0,1,0],
		  [0,0,0,0]];
	self.box6=[[0,0,0,0],
		  [0,1,0,0],
		  [0,1,1,0],
		  [0,0,1,0]];
	self.box7=[[0,0,0,0],
		  [0,0,1,0],
		  [0,1,1,0],
		  [0,1,0,0]];
	self.box0=[self.box1,self.box2,self.box3,self.box3,self.box4,self.box5,self.box6,self.box7];
}
Box.prototype = {
		getBox:function (){
			var self = this;
			var num=7*Math.random();
			var index=parseInt(num);
			return self.box0[index];
		}
}