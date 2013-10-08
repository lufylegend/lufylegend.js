/**
 * 共同类
 * */
var Global = function (){};
/**
 * 获取飞机属性
 * @param 飞机
 * */
Global.getPlainStatus = function(plainObject){
	var list,bitmapdata,bitmap;
	bitmapdata = new LBitmapData(imglist[plainObject.name]);
	bitmap = new LBitmap(bitmapdata);
	switch (plainObject.name){
		case "player":
			list = [bitmap,35,0,10,5];
			break;
		case "boss":
			list = [bitmap,138,240,2,50];
			break;
		case "enemy":
		default:
			list = [bitmap,25,45,2,1];
	}
	return list;
};

/**
 * 子弹类型数组
 * 【开始角度，增加角度，子弹速度，角度加速度，子弹总数，发动频率，枪口旋转】
 * */
Global.bulletList = new Array(
		{startAngle:0,angle:20,speed:5,aspeed:0,count:1,shootspeed:10,sspeed:0},//1发
		{startAngle:-20,angle:20,speed:5,aspeed:0,count:3,shootspeed:10,sspeed:0},//3发
		{startAngle:0,angle:20,speed:5,aspeed:0,count:1,shootspeed:1,sspeed:20},//1发旋转
		{startAngle:0,angle:20,speed:5,aspeed:0,count:18,shootspeed:3,sspeed:0},//环发
		{startAngle:0,angle:20,speed:5,aspeed:1,count:18,shootspeed:3,sspeed:0},//环发旋转
		{startAngle:180,angle:20,speed:5,aspeed:0,count:1,shootspeed:5,sspeed:0},//1发 up
		{startAngle:160,angle:20,speed:5,aspeed:0,count:3,shootspeed:5,sspeed:0}//3发 up
);
/**
 * 发射子弹
 * @param 飞机
 * */
Global.setBullet = function(plainObject){
	var i,j,obj,xspeed,yspeed,kaku;
	//获取子弹属性
	var bullet = Global.bulletList[plainObject.bullet];
	//设定枪口旋转
	plainObject.sspeed += bullet.sspeed;
	//开始发射
	for(i=0;i<bullet.count;i++){
		//发射角度
		kaku = i*bullet.angle + bullet.startAngle + plainObject.sspeed;
		//子弹xy轴速度
		xspeed = bullet.speed*Math.sin(kaku * Math.PI / 180);
		yspeed = barrageSpeed[0]*Math.cos(kaku * Math.PI / 180);
		//子弹实例化
		obj = new Bullet(plainObject.belong,plainObject.x+plainObject.shootx,plainObject.y+plainObject.shooty,kaku,xspeed,yspeed,bullet.aspeed,bullet.speed);
		//显示
		backLayer.addChild(obj);
		barrage.push(obj);
	}
};