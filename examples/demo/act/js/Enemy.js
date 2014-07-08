function Enemy(list,speed){
	var self = this;
	base(this,Character,[list,speed]);
	self.belong = "enemy";
	self.hp = 100;
};
Enemy.prototype.onjump = function (){
	var self = this;
	self.callParent("onjump",arguments);
	self.setLocation();
	var index = self.anime.colIndex;
	self.yArr = [0,-10,-20,-30,-40,-40,-30,-20,-10,0];
	self.anime.y += self.yArr[index];
};
Enemy.prototype.onjump_attack = function (){
	var self = this;
	self.callParent("onjump_attack",arguments);
	self.setLocation();
	var index = self.anime.colIndex;
	if(index >= self.yArr.length)return;
	self.anime.y += self.yArr[index];
};
Enemy.prototype.setAction = function (action,direction){
	var self = this,yArr = new Array();
	if(action == ACTION.MOVE && self.action == ACTION.JUMP)return;
	if(action == ACTION.JUMP_ATTACK){
		var index = self.anime.colIndex,i;
		for(i = index;i<self.yArr.length;i++)yArr.push(self.yArr[i]);
		self.yArr = yArr;
	}
	self.callParent("setAction",arguments);
	if(yArr.length > 0){
		self.anime.y += self.yArr[0];
	}
};
Enemy.prototype.overActionRun = function (lastAction,animeAction){
	var self = this;
	self.callParent("overActionRun",arguments);
	keylock = false;
	
	if(lastAction == ACTION.FALL){
		if(self.direction == DIRECTION.LEFT){
			self.x += 80;
		}else{
			self.x -= 80;
		}
	}
};
Enemy.prototype.move = function (){
	var self = this, mx = 0, my = 0;
	self.mx = mx;
	self.my = my;
	self.callParent("move",arguments);
};