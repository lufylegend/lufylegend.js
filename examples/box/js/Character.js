/**
 * 循环事件 
 * @param data 图片数据
 * @param row 图片分割行数
 * @param col 图片分割列数
 **/
function Character(data,row,col){
	base(this,LSprite,[]);
	var self = this;
	//设定人物动作速度
	self.speed = 2;
	self.speedIndex = 0;
	//设定人物大小
	data.setProperties(0,0,data.image.width/col,data.image.height/row);
	//得到人物图片拆分数组
	var list = LGlobal.divideCoordinate(data.image.width,data.image.height,row,col);
	//设定人物动画
	self.anime = new LAnimation(this,data,list);
	//设定不移动
	self.move = false;
	//在一个移动步长中的移动次数设定
	self.moveIndex = 0;
};
/**
 * 循环事件 
 **/
Character.prototype.onframe = function (){
	var self = this;
	//当人物可移动，则开始移动
	if(self.move)self.onmove();
	//人物动作速度控制
	if(self.speedIndex++ < self.speed)return;
	self.speedIndex = 0;
	//人物动画播放
	self.anime.onframe();
};
/**
 * 开始移动 
 **/
Character.prototype.onmove = function (){
	var self = this;
	//设定一个移动步长中的移动次数
	var ml_cnt = 4;
	//计算一次移动的长度
	var ml = STEP/ml_cnt;
	//根据移动方向，开始移动
	switch (self.direction){
		case UP:
			self.y -= ml;
			if(box)box.y -= ml;
			break;
		case LEFT:
			self.x -= ml;
			if(box)box.x -= ml;
			break;
		case RIGHT:
			self.x += ml;
			if(box)box.x += ml;
			break;
		case DOWN:
			self.y += ml;
			if(box)box.y += ml;
			break;
	}
	self.moveIndex++;
	//当移动次数等于设定的次数，开始判断是否继续移动
	if(self.moveIndex >= ml_cnt){
		self.moveIndex = 0;
		box = null;
		self.move = false;
		checkBox();
	}
};
/**
 * 障碍物判断
 * @param 判断方向 
 **/
Character.prototype.checkRoad = function (dir){
	var self = this;
	var tox,toy;
	//开始计算移动目的地的坐标
	switch (dir){
		case UP:
			tox = 0;
			toy = -1;
			break;
		case LEFT:
			tox = -1;
			toy = 0;
			break;
		case RIGHT:
			tox = 1;
			toy = 0;
			break;
		case DOWN:
			tox = 0;
			toy = 1;
			break;
	}
	if(list[self.y/STEP + toy][self.x/STEP + tox]==1)return false;
	if(list[self.y/STEP + toy][self.x/STEP + tox]>4){
		if(list[self.y/STEP + toy*2][self.x/STEP + tox*2]==1 || list[self.y/STEP + toy*2][self.x/STEP + tox*2]>4)return false;
		box = getBox(self.x + tox*STEP,self.y + toy*STEP);
	}
	return true;
};
/**
 * 改变人物方向，并判断是否可移动
 **/
Character.prototype.changeDir = function (dir){
	var self = this;
	if(self.move)return;
	self.direction = dir;
	self.anime.setAction(dir);
	if(!self.checkRoad(dir))return;
	self.move = true;
	steps.text = parseInt(steps.text) + 1;
};