/**
 * 我军 
 * @param list 数组数据
 * @param data 图片数据
 * @param speed 人物速度
 **/
function AttackChara(list,data,speed){
	base(this,LSprite,[]);
	var self = this;
	self.index = 0;
	self.frameRun = false;
	//设定人物动作速度
	self.speed = speed==null?3:speed;
	self.speedIndex = 0;
	//设置攻击对象为空
	self.target = null;
	//设定人物动画
	self.anime = new LAnimation(this,data,list);
	self.moveIndex = 0;
	//初始人物方向
	self.direction = DOWN;
	//初始人物动作
	self.anime.setAction(self.direction);
};
/**
 * 循环事件 
 **/
AttackChara.prototype.onframe = function (){
	var self = this;
	//人物动作速度控制
	if(self.speedIndex++ < self.speed)return;

	//人物动画播放
	self.anime.onframe();
	self.speedIndex = 0;
	//避免重复攻击等，判断是否完成一个循环事件
	if(self.frameRun)return;
	//事件开始
	self.frameRun = true;
	if(self.target == null || self.target == "undefined"){
		self.findEnemy();
	}
	//事件结束
	self.frameRun = false;
};
/**
 * 获取可攻击敌军 
 **/
AttackChara.prototype.findEnemy = function (){
	var self = this;
	var i;
	for(i=0;i<enemylist.length;i++){
		//循环敌军，判断可攻击范围
		if(self.x >= enemylist[i].x  - STEP && self.x <= enemylist[i].x + STEP && self.y >= enemylist[i].y  - STEP && self.y <= enemylist[i].y + STEP){
			//设置攻击方向
			if(enemylist[i].x >= self.x - STEP && enemylist[i].x < self.x){
				self.direction = LEFT;
				self.target = enemylist[i];
				break;
			}else if(enemylist[i].x == self.x + STEP){
				self.direction = RIGHT;
				self.target = enemylist[i];
				break;
			}else if(enemylist[i].y >= self.y - STEP && enemylist[i].y < self.y){
				self.direction = UP;
				self.target = enemylist[i];
				break;
			}else{
				self.direction = DOWN;
				self.target = enemylist[i];
				break;
			}
		}
	}
	//获取敌军，进行攻击
	if(self.target != null){
		self.anime.setAction(self.direction + 4);
		//添加事件，当人物完成一个攻击动作后，进行敌军
		self.anime.addEventListener(LEvent.COMPLETE,self.hertCheck);
	}
};
/**
 * 对敌军进行攻击 
 **/
AttackChara.prototype.hertCheck = function (anime){
	var self = anime.parent;
	if(self.target == null)return;
	//判断敌军是否已经移除攻击范围
	if(self.target.isDie || self.target.x < self.x - STEP || self.target.x > self.x + STEP || self.target.y < self.y  - STEP || self.target.y > self.y + STEP){
		self.target = null;
		self.anime.setAction(self.direction);
		self.anime.removeEventListener(LEvent.COMPLETE,self.hertCheck);
	}else{ 
		//重设攻击方向
		if((self.direction == LEFT || self.direction == RIGHT) && self.target.x >= self.x && self.target.x < self.x + STEP){
			if(self.target.y < self.y){
				self.direction = UP;
				self.anime.setAction(self.direction + 4);
			}else{
				self.direction = DOWN;
				self.anime.setAction(self.direction + 4);
			}
		}else if((self.direction == UP || self.direction == DOWN) && self.target.y >= self.y && self.target.y < self.y + STEP){
			if(self.target.x < self.x){
				self.direction = LEFT;
				self.anime.setAction(self.direction + 4);
			}else{
				self.direction = RIGHT;
				self.anime.setAction(self.direction + 4);
			}
		}
		//进行攻击
		self.target.atHert(10);
	}
};
