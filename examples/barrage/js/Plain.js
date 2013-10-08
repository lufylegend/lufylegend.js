/**
 * 飞机类
 * */
function Plain(name,belong,x,y,bullets){
	base(this,LSprite,[]);
	var self = this;
	//飞机名称
	self.name = name;
	//飞机位置
	self.x = x;
	self.y = y;
	//飞机所属
	self.belong = belong;
	//子弹数组
	self.bullets = bullets;
	//初始子弹
	self.bullet = self.bullets[Math.floor(Math.random()*self.bullets.length)];
	self.shootspeed = Global.bulletList[self.bullet].shootspeed;
	//枪口旋转角度
	self.sspeed = 0;
	//射击频率控制
	self.shootctrl = 0;
	//获取飞机属性
	self.list = Global.getPlainStatus(self);
	//飞机图片
	self.bitmap = self.list[0];
	//显示
	self.addChild(self.bitmap);
	//枪口位置
	self.shootx = self.list[1];
	self.shooty = self.list[2];
	//移动速度
	self.speed = self.list[3];
	//飞机hp
	self.hp = self.list[4];
	//移动方向
	self.move = [0,0];
	//发射子弹数
	self.shootcount = 0;
	//是否发射子弹
	self.canshoot = true;
	if(name=="player")self.canshoot = false;
}

/**
 * 循环
 * */
Plain.prototype.onframe = function (){
	var self = this;
	//移动
	self.x += self.move[0]*self.speed;
	self.y += self.move[1]*self.speed;
	
	switch (self.name){
		case "player":
			//自机移动位置限制
			if(self.x < 0)self.x = 0;
			else if(self.x + self.bitmap.getWidth() > LGlobal.width)self.x = LGlobal.width-self.bitmap.getWidth();
			if(self.y < 0)self.y = 0;
			else if(self.y + self.bitmap.getHeight() > LGlobal.height)self.y = LGlobal.height-self.bitmap.getHeight();
			break;
		case "boss":
			//敌机BOSS移动
			if(self.y < 0){
				self.y = 0;
				self.move[1] = 1;
			}else if(self.y + self.bitmap.getHeight() > LGlobal.height){
				self.y = LGlobal.height-self.bitmap.getHeight() - 200;
				self.move[1] = -1;
			}
			//碰撞检测
			self.hitTest();
			break;
		case "enemy":
		default:
			//碰撞检测
			self.hitTest();
	}
	//射击
	if(self.canshoot)self.shoot();
};

/**
 * 碰撞检测
 * */
Plain.prototype.hitTest = function (){
	var self = this;
	var disx,disy,sw,ew;
	sw = (self.bitmap.getWidth() + self.bitmap.getHeight())/4;
	ew = (player.bitmap.getWidth() + player.bitmap.getHeight())/4;
	disx = self.x+sw - (player.x + ew);
	disy = self.y+self.bitmap.getHeight()/2 - (player.y + player.bitmap.getHeight()/2);
	if(disx*disx + disy*disy < (sw+ew)*(sw+ew)){		self.hp--;		player.hp--;		if(player.hp <= 0){
			player.visible = false;	
			gameover = true;		}
	}
};
/**
 * 射击
 * */
Plain.prototype.shoot = function (){
	var self = this;
	if(self.shootctrl++ < self.shootspeed)return;
	self.shootctrl = 0;
	if(self.name == "boss"){
		if(self.shootcount++ % 40 > 5)return;
	}else{
		if(self.shootcount++ % 10 > 5)return;
	}
	Global.setBullet(self);
	if(self.name == "boss"){
		if(self.shootcount % 40 < 5)return;
	}else{
		if(self.shootcount % 10 < 5)return;
	}
	if(self.bullets.length <= 1)return;
	self.bullet = self.bullets[Math.floor(Math.random()*self.bullets.length)];
	self.shootspeed = Global.bulletList[self.bullet].shootspeed;
};