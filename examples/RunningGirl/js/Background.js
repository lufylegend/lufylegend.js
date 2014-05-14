/**
 * @author lufy
 */
function Background(){
	base(this,LSprite,[]);
	this.init();
}
Background.prototype.init = function(){
	var self = this;
	self.back = new LBitmap(new LBitmapData(dataList["b_background"],0,0,800,480));
	self.backX = 0;
	self.addChild(self.back);
	self.grass = new LBitmap(new LBitmapData(dataList["m_background"]));
	self.grass.y = LGlobal.height - self.grass.getHeight();
	self.addChild(self.grass);
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
Background.prototype.onframe = function(event){
	var self = event.target;
	if(gameBody.isStop())return;
	
	self.backX += MOVE_STEP*0.1;
	if(self.backX > LGlobal.width){
		self.backX -= LGlobal.width;
	}
	self.back.bitmapData.setCoordinate(self.backX,0);
	self.grass.x -= MOVE_STEP*0.5;
	if(self.grass.x + 960 < 0){
		self.grass.x = LGlobal.width;
	}
};
