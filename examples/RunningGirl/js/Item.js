/**
 * @author lufy
 */
function Item(name){
	base(this,LSprite,[]);
	this.init(name);
}
Item.MODE_LIVE = "live";
Item.MODE_GET = "get";
Item.MODE_DELETE = "delete";
Item.prototype.init = function(name){
	var self = this;
	self.name = name;
	if(self.name == "star"){
		self.bitmap = new LBitmap(new LBitmapData(dataList["stage"],32*9,32*3,32,32));
	}else if(self.name == "speed"){
		self.bitmap = new LBitmap(new LBitmapData(dataList["stage"],32*14,32*3,40,48));
		self.bitmap.x = -1;
		self.bitmap.y = -8;
	}else if(self.name == "solution"){
		self.bitmap = new LBitmap(new LBitmapData(dataList["stage"],32*16,32*3,40,48));
		self.bitmap.x = -4;
		self.bitmap.y = -8;
	}
	
	self.mode = Item.MODE_LIVE;
	self.addChild(self.bitmap);
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
Item.prototype.onframe = function(event){
	var self = event.target;
	if(gameBody.isStop())return;
	if(self.mode == Item.MODE_LIVE){
		self.checkHit();
	}
	self.x -= MOVE_STEP;
};
Item.prototype.checkHit = function(){
	var self = this;
	if(self.x < -96)return;

	if(runCharacter.rect.action != Character.HERT){
		var ix = self.x > (runCharacter.x + runCharacter.rect.x) ? self.x : (runCharacter.x + runCharacter.rect.x);
		var iy = self.y > (runCharacter.y + runCharacter.rect.y) ? self.y : (runCharacter.y + runCharacter.rect.y);
		var ax = (self.x + 32) > (runCharacter.x + runCharacter.rect.x + runCharacter.rect.width) ? (runCharacter.x + runCharacter.rect.x + runCharacter.rect.width) : (self.x + 32);
		var ay = (self.y + 32) > (runCharacter.y + runCharacter.rect.y + runCharacter.rect.height) ? (runCharacter.y + runCharacter.rect.y + runCharacter.rect.height) : (self.y + 32);
		if(ix <= ax && iy <= ay){
			if(self.name == "star"){
				starCtrl.changeValue(1);
			}else if(self.name == "speed"){
				gameBody.moveStepCount = 200;
				gameBody.speedBitmap.visible = true;
				MOVE_STEP = MOVE_STEP_FAST;
			}else if(self.name == "solution"){
				runCharacter.hp.changeValue(20);
			}
			MySoundPlayer.playSound("get");
			self.mode = Item.MODE_GET;
			LTweenLite.to(self.bitmap,0.2,{y:-10,scaleX:0.1,alpha:0.75,ease:LEasing.None})
		    .to(self.bitmap,0.2,{y:-20,scaleX:1,alpha:0.5,ease:LEasing.None})
		    .to(self.bitmap,0.2,{y:-30,scaleX:0.1,alpha:0.25,ease:LEasing.None})
		    .to(self.bitmap,0.2,{y:-40,scaleX:1,alpha:0,ease:LEasing.None});
		}
	}
};
Item.add = function(floor){
	var item,i;
	var randNum = Math.random();
	if(randNum > 0.7){
		return;
	}
	var maxnum = floor.getWidth()/32 >>> 0,addnum;
	if(maxnum > 5){
		addnum = 5 + ((maxnum - 5)*Math.random() >>> 0);
	}else{
		addnum = maxnum;
	}
	var sx = floor.x + (floor.getWidth() - addnum*32)*0.5;
	var specialItem = false;
	for(i=0;i<addnum;i++){
		if(i % 2 == 0)continue;
		randNum = Math.random();
		if(randNum > 0.95 && !specialItem){
			specialItem = true;
			item = new Item("speed");
		}else if(randNum > 0.9 && !specialItem){
			specialItem = true;
			item = new Item("solution");
		}else{
			item = new Item("star");
		}
		item.x = sx + i*32;
		item.y = floor.y - 32;
		itemLayer.addChild(item);
	}
};
