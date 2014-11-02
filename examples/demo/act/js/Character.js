function Character(list,speed){
	base(this,LSprite,[]);
	var self = this;
	//初始化
	//动作
	self.action = ACTION.STAND;
	//方向
	self.direction = DIRECTION.RIGHT;
	//保存参数
	self.coordinateList = list[1];
	self.locationList = list[2];
	self.dataList = list[0];
	self.hertList = list[3];
	self.attackList = list[4];
	self.speed = speed==null?1:speed;
	//保存初始化动作的图片
	self.data = self.dataList[ACTION.STAND];
	self.speedIndex = 0;
	self.yArr = new Array();
	//利用LAnimation对象来显示连贯的动作
	self.anime = new LAnimation(self,self.data,self.coordinateList[0]);
	self.anime.setAction(0);
	self.anime.x = -self.data.width*0.5;
	self.anime.y = -self.data.height;
};
Character.prototype.onframe = function (){
	var self = this,key = null,chara=null;
	//人物动作速度控制
	if(self.speedIndex++ < self.speed)return;
	self.speedIndex = 0;
	//人物动画播放
	self.anime.onframe();
	self.move();

	if(self.action == ACTION.JUMP){
		self.onjump();
	}else if(self.action == ACTION.JUMP_ATTACK){
		self.onjump_attack();
	}
	if(self.action == ACTION.ATTACK || self.action == ACTION.BIG_ATTACK || self.action == ACTION.HIT || 
			self.action == ACTION.JUMP_ATTACK || self.action == ACTION.SKILL || self.action == ACTION.BIG_SKILL){
		for(var i=0;i<charaLayer.childList.length;i++){
			chara = charaLayer.childList[i];
			if(self.belong == chara.belong)continue;
			self.checkAction(chara);
		}
	}
};
Character.prototype.checkAction = function (chara){
	var self = this;
	var attack_rect = self.getAttackRect();
	var hert_rect = chara.getHertRect();
	if(!attack_rect || !hert_rect)return;
	if(attack_rect.intersects(hert_rect) && Math.abs(self.y - chara.y) < 30){
		if(self.action == ACTION.ATTACK){
			chara.setAction(ACTION.HERT,chara.direction);
		}else{
			var dir = DIRECTION.RIGHT;
			if(self.x < chara.x)dir = DIRECTION.LEFT;
			chara.setAction(ACTION.FALL,dir);
		}
	}
}
Character.prototype.getAttackRect = function(){
	var self = this;
	attackList = self.attackList[self.action];
	if(self.anime.colIndex >= attackList.length)return false;
	var rect = attackList[self.anime.colIndex];
	var x = rect[0],y=rect[1],w=rect[2],h=rect[3];
	if(x == 0 && y == 0 && w == 0 && h == 0)return false;
	y += self.y;
	if(self.direction == DIRECTION.LEFT){
		x = self.x - x - w;
	}else{
		x = self.x +x;
	}
	return new LRectangle(x,y,w,h);
}
Character.prototype.getHertRect = function(){
	var self = this;
	var hertList = self.hertList[self.action];
	if(self.anime.colIndex >= hertList.length)return false;
	var rect = hertList[self.anime.colIndex];
	var x = rect[0],y=rect[1],w=rect[2],h=rect[3];
	if(x == 0 && y == 0 && w == 0 && h == 0)return false;
	y += self.y;
	if(self.direction == DIRECTION.LEFT){
		x = self.x - x - w;
	}else{
		x = self.x +x;
	}
	return new LRectangle(x,y,w,h);
}
Character.prototype.onjump = function (){};
Character.prototype.onjump_attack = function (){};
Character.prototype.move = function (){
	var self = this, mx = self.mx, my = self.my;
	if(self.action == ACTION.MOVE || self.action == ACTION.JUMP || self.action == ACTION.JUMP_ATTACK){
		mx *= MOVE_STEP;
		my *= MOVE_STEP;
	}else if(self.action == ACTION.RUN){
		mx *= MOVE_STEP*2;
		my *= MOVE_STEP*2;
	}else if(self.action == ACTION.HIT){
		mx = MOVE_STEP*2*(self.direction == DIRECTION.RIGHT ? 1 : -1);
		my = 0;
	}else{
		mx = my = 0;
	}
	if(mx == 0 && my == 0)return;
	self.x += mx;
	self.y += my;
	if(self.y < 250){
		self.y = 250;
	}else if(self.y > 448){
		self.y = 448;
	}
};
/**
 * 动作变换
 * @param action 动作
 * @param direction 方向
 */
Character.prototype.setAction = function (action,direction){
	var self = this;
	//动作和方向都没有改变，则不做变换
	if(self.action == action && self.direction == direction)return;
	//重新设定保存在LAnimation对象中的图片和坐标数组
	self.data = self.dataList[action];
	self.anime.bitmap.bitmapData = self.data;
	self.anime.bitmap.bitmapData.setCoordinate(0,0);
	self.anime.imageArray = self.coordinateList[action];
	self.action = action;
	self.direction = direction;
	//如果方向向左则必须使用镜像
	self.anime.setAction(0,0,null,self.direction == DIRECTION.LEFT);
	//调整位置
	self.setLocation();
	//如果被添加了事件，则将事件移除
	self.anime.removeEventListener(LEvent.COMPLETE,self.overAction);
	//除了走和跑，其他动作要保持连贯性，在一个动作结束之前，不能再次变换，所以添加动画播放结束事件，来控制keylock的值
	if(self.action != ACTION.MOVE && self.action != ACTION.RUN){
		self.anime.addEventListener(LEvent.COMPLETE,self.overAction);
	}
};
Character.prototype.setLocation = function (){
	var self = this;
	self.anime.x = self.locationList[self.action].x*(self.direction == DIRECTION.LEFT ? -1 : 1)-self.data.width*0.5;
	self.anime.y = self.locationList[self.action].y-self.data.height;
};
Character.prototype.overAction = function (e){
	var anime = e.target;
	var self = anime.parent;
	self.anime.removeEventListener(LEvent.COMPLETE,self.overAction);
	var lastAction = self.action;
	var animeAction = anime.getAction();
	self.setAction(ACTION.STAND,self.direction);
	self.overActionRun(lastAction,animeAction);
};
Character.prototype.overActionRun = function (lastAction,animeAction){};
