/**
 * 敌军 
 * @param list 数组数据
 * @param data 图片数据
 * @param speed 人物速度
 **/
function Enemy(list,data,speed){
	base(this,LSprite,[]);
	var self = this;
	self.index = 0;
	//敌军初始位置
	self.x = road[self.index][0]*STEP;
	self.y = road[self.index][1]*STEP;
	self.isDie = false;
	//设定人物动作速度
	self.speed = speed==null?3:speed;
	self.speedIndex = 0;
	//设定人物动画
	self.anime = new LAnimation(this,data,list);
	self.moveIndex = 0;
	//敌军默认方向
	self.direction = UP;
	self.anime.setAction(self.direction);
	//设置初始血条
	self.maxHp = enemyMaxHp;
	self.hp = enemyMaxHp;
	//血条显示
	self.hpBitmap = new LBitmap(new LBitmapData(imglist["hp"],0,0,5,5));
	self.hpBitmap.x = 2;
	self.hpBitmap.scaleX = 12*(self.hp/self.maxHp);
	self.addChild(self.hpBitmap);
};
/**
 * 循环事件 
 **/
Enemy.prototype.onframe = function (){
	var self = this;
	//人物动作速度控制
	if(self.speedIndex++ < self.speed)return;
	self.speedIndex = 0;
	//开始移动
	self.onmove();
	//人物动画播放
	self.anime.onframe();
	//血条长度变化
	self.hpBitmap.scaleX = 12*(self.hp/self.maxHp);
};
/**
 * 开始移动 
 **/
Enemy.prototype.onmove = function (){
	var self = this;
	//设定一个移动步长中的移动次数
	var ml_cnt = 8;
	//计算一次移动的长度
	var ml = STEP/ml_cnt;
	//根据移动方向，开始移动
	switch (self.direction){
		case UP:
			self.y -= ml;
			break;
		case LEFT:
			self.x -= ml;
			break;
		case RIGHT:
			self.x += ml;
			break;
		case DOWN:
			self.y += ml;
			break;
	}
	self.moveIndex++;
	//当移动次数等于设定的次数，开始判断是否继续移动
	if(self.moveIndex >= ml_cnt){
		//一个地图步长移动完成后，判断是否到达终点
		self.moveIndex = 0;
		self.index++;
		if(self.index == road.length - 1){
			self.isDie = true;
			hpNum -= 1;
			return;
		}
		//得到移向下一坐标的方向
		self.getDirection();
		//屏幕上的敌军人数判断
		if(self == enemylist[0])addEnemy();
	}
};
/**
 * 被攻击 
 **/
Enemy.prototype.atHert = function (value){
	var self = this;
	self.hp -= value;
	//判断是否死亡
	if(self.hp <= 0){
		getpointNum += self.maxHp/10;
		self.isDie=true;
	}
};
/**
 * 得到移向下一坐标的方向
 **/
Enemy.prototype.getDirection = function (){
	var self = this;
	if(road[self.index][0] > road[self.index + 1][0]){
		self.direction = LEFT;
	}else if(road[self.index][0] < road[self.index + 1][0]){
		self.direction = RIGHT;
	}else{
		if(road[self.index][1] > road[self.index + 1][1]){
			self.direction = UP;
		}else if(road[self.index][1] < road[self.index + 1][1]){
			self.direction = DOWN;
		}
	}
	self.anime.setAction(self.direction);
};