/**
 * 循环事件 
 * @param isHero 是否英雄
 * @param index 人物编号
 * @param data 图片数据
 * @param row 图片分割行数
 * @param col 图片分割列数
 * @param speed 人物速度
 **/
function Character(isHero,index,data,row,col,speed){
	base(this,LSprite,[]);
	var self = this;
	self.isHero = isHero;
	self.index = index;
	//设定人物动作速度
	self.speed = speed==null?3:speed;
	self.speedIndex = 0;
	//设定人物大小
	data.setProperties(0,0,data.image.width/col,data.image.height/row);
	//得到人物图片拆分数组
	var list = LGlobal.divideCoordinate(data.image.width,data.image.height,row,col);
	//设定人物动画
	self.anime = new LAnimation(this,data,list);
	/*
	//调整人物位置
	//self.anime.y -= 16;
	*/
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
	//人物动作速度控制
	if(self.speedIndex++ < self.speed)return;
	self.speedIndex = 0;
	//当人物可移动，则开始移动
	if(self.move)self.onmove();
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
			if(mapmove){
				mapLayer.y += ml;
				charaLayer.y += ml;
			}
			self.y -= ml;
			break;
		case LEFT:
			if(mapmove){
				mapLayer.x += ml;
				charaLayer.x += ml;
			}
			self.x -= ml;
			break;
		case RIGHT:
			if(mapmove){
				mapLayer.x -= ml;
				charaLayer.x -= ml;
			}
			self.x += ml;
			break;
		case DOWN:
			if(mapmove){
				mapLayer.y -= ml;
				charaLayer.y -= ml;
			}
			self.y += ml;
			break;
	}
	self.moveIndex++;
	//当移动次数等于设定的次数，开始判断是否继续移动
	if(self.moveIndex >= ml_cnt){
		//一个地图步长移动完成后，判断地图是否跳转
		if(self.isHero && self.moveIndex > 0)checkJump();
		self.moveIndex = 0;
		//一个地图步长移动完成后，如果地图处于滚动状态，则移除多余地图块
		if(mapmove)delMap();
		//判断方向是否改变
		if(self.direction != self.direction_next){
			self.direction = self.direction_next;
			self.anime.setAction(self.direction);
		}
		//如果已经松开移动键，或者前方为障碍物，则停止移动，否则继续移动
		if(!isKeyDown || !self.checkRoad()){
			self.move = false;
			return;
		}
		//地图是否滚动
		self.checkMap(self.direction);
	}
};
/**
 * 障碍物判断
 * @param 判断方向 
 **/
Character.prototype.checkRoad = function (dir){
	var self = this;
	var tox,toy,myCoordinate;
	//当判断方向为空的时候，默认当前方向
	if(dir==null)dir=self.direction;
	//获取人物坐标
	myCoordinate = self.getCoordinate();
	//开始计算移动目的地的坐标
	switch (dir){
		case UP:
			tox = myCoordinate.x;
			toy = myCoordinate.y - 1;
			break;
		case LEFT:
			tox = myCoordinate.x - 1;
			toy = myCoordinate.y ;
			break;
		case RIGHT:
			tox = myCoordinate.x + 1;
			toy = myCoordinate.y;
			break;
		case DOWN:
			tox = myCoordinate.x;
			toy = myCoordinate.y + 1;
			break;
	}
	
	//如果移动的范围超过地图的范围，则不可移动
	if(toy <= 0 || tox <= 0)return false;
	if(toy >= mapdata.length || tox >= mapdata[0].length)return false;
	//如果目的地为障碍，则不可移动
	if(mapdata[toy][tox] == 1)return false;
	return true;
};
/**
 * 设定人物坐标
 * @param x方向坐标，y方向坐标 
 **/
Character.prototype.setCoordinate = function (sx,sy){
	var self = this;
	//根据人物坐标，计算人物显示位置
	self.x = sx*STEP;
	self.y = sy*STEP;
};
/**
 * 获取人物坐标
 **/
Character.prototype.getCoordinate = function (){
	var self = this;
	return {x:(self.x/STEP),y:(self.y/STEP)};
};
/**
 * 改变人物方向，并判断是否可移动
 **/
Character.prototype.changeDir = function (dir){
	var self = this;
	//如果正在移动，则无效
	if(!self.move){
		//设定人物方向
		self.direction = dir;
		self.direction_next = dir;
		//设定图片动画
		self.anime.setAction(dir);
		//判断是否可移动
		if(!self.checkRoad(dir))return;
		//地图是否滚动
		self.checkMap(dir);
		//如果可以移动，则开始移动
		self.move = true;
		self.moveIndex = 0;
	}else if(dir != self.direction){
		self.direction_next = dir;
	}
};
/**
 * 地图是否滚动
 **/
Character.prototype.checkMap = function (dir){
	var self = this;
	mapmove = false;
	//如果不是英雄，则地图不需要滚动
	if(!self.isHero)return;
	
	switch (dir){
		case UP:
			if(self.y + charaLayer.y> STEP)break;
			if(mapLayer.y >= 0)break;
			addMap(0,-1);
			mapmove = true;
			break;
		case LEFT:
			if(self.x + charaLayer.x > STEP)break;
			if(mapLayer.x >= 0)break;
			addMap(-1,0);
			mapmove = true;
			break;
		case RIGHT:
			if(self.x < 480 - 2*STEP)break;
			if(480 - mapLayer.x >= map[0].length*STEP)break;
			addMap(1,0);
			mapmove = true;
			break;
		case DOWN:
			if(self.y < 288 - 2*STEP)break;
			if(288 - mapLayer.y >= map.length*STEP)break;
			addMap(0,1);
			mapmove = true;
			break;
	}
};