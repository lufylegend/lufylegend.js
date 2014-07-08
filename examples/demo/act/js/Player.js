function Player(list,speed){
	var self = this;
	base(this,Character,[list,speed]);
	self.belong = "player";
};
Player.prototype.onjump = function (){
	var self = this;
	self.callParent("onjump",arguments);
	self.setLocation();
	var index = self.anime.colIndex;
	self.yArr = [0,-10,-20,-30,-40,-40,-30,-20,-10,0];
	self.anime.y += self.yArr[index];
};
Player.prototype.onjump_attack = function (){
	var self = this;
	self.callParent("onjump_attack",arguments);
	self.setLocation();
	var index = self.anime.colIndex;
	if(!self.yArr || index >= self.yArr.length)return;
	self.anime.y += self.yArr[index];
};
Player.prototype.setAction = function (action,direction){
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
Player.prototype.overActionRun = function (lastAction,animeAction){
	var self = this;
	self.callParent("overActionRun",arguments);
	keylock = false;
	
	if(keyCtrl[KEY.LEFT] || keyCtrl[KEY.RIGHT] || keyCtrl[KEY.UP] || keyCtrl[KEY.DOWN]){
		self.setAction(ACTION.MOVE,self.direction);
	}
};
Player.prototype.move = function (){
	var self = this, mx = 0, my = 0;
	if(keyCtrl[KEY.LEFT] && charaLayer.x + self.x > 0){
		mx = -1;
	}else if(keyCtrl[KEY.RIGHT] && charaLayer.x + self.x < LGlobal.width){
		mx = 1;
	}
	if(keyCtrl[KEY.UP]){
		my = -1;
	}else if(keyCtrl[KEY.DOWN]){
		my = 1;
	}
	self.mx = mx;
	self.my = my;
	if(self.action == ACTION.RUN){
		mx *= 2;
		my *= 2;
	}else if(self.action == ACTION.HIT){
		mx = 2*(self.direction == DIRECTION.RIGHT ? 1 : -1);
		my = 0;
	}
	if(back_run && mx > 0 && charaLayer.x + self.x > LGlobal.width * 0.5){
		var setX = mx*MOVE_STEP;
		if(backLayer.data.x + setX + backLayer.data.width > backLayer.data.image.width){
			back_run = false;
			setX = backLayer.data.image.width - backLayer.data.width - backLayer.data.x;
		}
		charaLayer.x -= setX;
		backLayer.data.setCoordinate(backLayer.data.x + setX,backLayer.data.y);
		addEnemy();
	}
	self.callParent("move",arguments);
};