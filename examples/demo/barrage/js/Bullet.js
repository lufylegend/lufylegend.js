/**
 * 子弹类 
 * */
function Bullet(belong,x,y,angle,xspeed,yspeed,aspeed,speed){
	base(this,LSprite,[]);
	var self = this;
	//子弹所属
	self.belong = belong;
	//出现位置
	self.x = x;
	self.y = y;
	//角度
	self.angle = angle;
	//移动速度
	self.speed = speed;
	//xy轴速度
	self.xspeed = xspeed;
	self.yspeed = yspeed;
	//旋转角度加成
	self.aspeed = aspeed;
	//子弹图片
	var bitmapdata,bitmap;
	bitmapdata = new LBitmapData(imglist["item1"]);
	bitmap = new LBitmap(bitmapdata);
	self.bitmap = bitmap;
	//显示
	self.addChild(bitmap);
}

/**
 * 循环
 * @param 子弹序号
 * */
Bullet.prototype.onframe = function (index){
	var self = this;

	//子弹移动
	self.x += self.xspeed;
	self.y += self.yspeed;
	
	//子弹角度变更
	if(self.aspeed != 0){
		self.angle += self.aspeed;
		//子弹角度变更后，重新计算xy轴速度
		self.xspeed = self.speed*Math.sin(self.angle * Math.PI / 180);
		self.yspeed = self.speed*Math.cos(self.angle * Math.PI / 180);
	}
	//子弹位置检测
	if(self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height){
		//从屏幕移除
		backLayer.removeChild(self);
		//从子弹数组移除
		barrage.splice(index,1);
	}else{
		self.hitTest(index);
	}
	
};
/**
 * 子弹碰撞检测
 * @param 子弹序号
 * */
Bullet.prototype.hitTest = function (index){
	var self = this;
	var disx,disy,sw,ew,obj,i;
	if(self.belong == player.belong){
		//自机子弹
		for(i=0;i<enemys.length;i++){
			obj = enemys[i];
			sw = self.bitmap.getWidth()/2;
			ew = obj.bitmap.getWidth()/2;
			disx = self.x+sw - (obj.x + ew);
			disy = self.y+self.bitmap.getHeight()/2 - (obj.y + obj.bitmap.getHeight()/2);
			//距离检测
			if(disx*disx + disy*disy < ew*ew){
				obj.hp--;
				if(obj.hp == 0){
					point += 1;
					pointText.text = point;
					//从屏幕移除
					backLayer.removeChild(obj);
					//从敌机数组移除
					enemys.splice(i,1);
					if(obj.name == "boss"){
						gameclear = true;
					}
				}
				//从屏幕移除
				backLayer.removeChild(self);
				//从子弹数组移除
				barrage.splice(index,1);
			}
		}
	}else{
		//敌机子弹
		obj = player;
		sw = self.bitmap.getWidth()/2;
		ew = obj.bitmap.getWidth()/2;
		disx = self.x+sw - (obj.x + ew);
		disy = self.y+self.bitmap.getHeight()/2 - (obj.y + obj.bitmap.getHeight()/2);
		//距离检测
		if(disx*disx + disy*disy < ew*ew - 10){			obj.hp--;			if(obj.hp <=0){
				obj.visible = false;	
				gameover = true;			}
			//从屏幕移除
			backLayer.removeChild(self);
			//从子弹数组移除
			barrage.splice(index,1);
		}
	}
};