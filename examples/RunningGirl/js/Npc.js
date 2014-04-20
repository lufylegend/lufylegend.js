/**
 * @author lufy
 */
function Npc(name){
	base(this,LSprite,[]);
	this.init(name);
}
Npc.prototype.init = function(name){
	var self = this;
	self.name = name;
	var data = new LBitmapData(dataList[name],0,0,96,96);
	var list = LGlobal.divideCoordinate(384,96,1,4);
	self.hero = new LAnimationTimeline(data,list);
	self.hero.x = -48;
	self.hero.y = -90;
	self.hero.speed = 6;
	self.addChild(self.hero);
	self.vy = 0;
	self.g = 0;
	self.speedx = 0;
	if(self.name == "gui"){
		self.g = g;
		self.hero.y = -96;
		self.rect = new LRectangle(-48,-70,96,70);
	}else if(self.name == "bird"){
		self.hero.y = -64;
		self.speedx = 4;
		self.rect = new LRectangle(-32,-32,64,32);
	}
	//self.graphics.drawRect(2,"#ff0000",[self.rect.x,self.rect.y,self.rect.width,self.rect.height],true,"#880088");
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
Npc.prototype.onframe = function(event){
	var self = event.target;
	if(gameBody.isStop()){
		if(self.hero.mode != 0){
			self.hero.stop();
		}
		return;
	}else if(self.hero.mode == 0){
		self.hero.play();
	}
	self.checkHit();
	self.y += self.vy;
	self.vy += self.g;
	self.x -= (MOVE_STEP + self.speedx);
	
	if(self.vy <= 0)return;
	
	var checkList = runMap.childList,child;
	for(var i=0,l=checkList.length;i<l;i++){
		child = checkList[i];
		if(child.checkHitTestPoint(self.x,self.y)){
			self.y = child.y;
			self.vy = 0;
			break;
		}
	}
};
Npc.prototype.checkHit = function(){
	var self = this;
	if(self.x < -96)return;
	
	if(runCharacter.rect.action != Character.HERT){
		var ix = (self.x + self.rect.x) > (runCharacter.x + runCharacter.rect.x) ? (self.x + self.rect.x) : (runCharacter.x + runCharacter.rect.x);
		var iy = (self.y + self.rect.y) > (runCharacter.y + runCharacter.rect.y) ? (self.y + self.rect.y) : (runCharacter.y + runCharacter.rect.y);
		var ax = (self.x + self.rect.x + self.rect.width) > (runCharacter.x + runCharacter.rect.x + runCharacter.rect.width) ? (runCharacter.x + runCharacter.rect.x + runCharacter.rect.width) : (self.x + self.rect.x + self.rect.width);
		var ay = (self.y + self.rect.y + self.rect.height) > (runCharacter.y + runCharacter.rect.y + runCharacter.rect.height) ? (runCharacter.y + runCharacter.rect.y + runCharacter.rect.height) : (self.y + self.rect.y + self.rect.height);
		if(ix <= ax && iy <= ay){
			if(runCharacter.invincible()){
				self.removeEventListener(LEvent.ENTER_FRAME,self.onframe);
				LTweenLite.to(self,4,{y:Math.random()>0.5?-LGlobal.height:LGlobal.height*2,x:-200,ease:Elastic.easeOut});
			}else{
				runCharacter.hert();
			}
		}
	}
};
Npc.add = function(floor){
	if(floor.isStart)return;
	var npc;
	var randNum = Math.random();
	if(randNum > 0.8){
		npc = new Npc("gui");
		npc.y = floor.y - 32;
	}else if(randNum > 0.6){
		npc = new Npc("bird");
		npc.y = floor.y - npc.getHeight();
	}else{
		Item.add(floor);
	}
	if(npc){
		npc.x = 48 + floor.x + (floor.getWidth() - 96)*Math.random();
		npcLayer.addChild(npc);
	}
};
