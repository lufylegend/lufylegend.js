/**
 * @author lufy
 */
function Map(){
	base(this,LSprite,[]);
	this.init();
}
Map.prototype.init = function(){
	var self = this;
	self.dieFloorList = [];
	self.addFloor(2);
	self.floor.x = 0;
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
Map.prototype.onframe = function(event){
	var self = event.target;
	if(gameBody.isStop())return;
	while(self.dieFloorList.length > 0){
		var child = self.dieFloorList.shift();
		self.removeChild(child);
	}
};
Map.prototype.addFloor = function(index){
	var self = this;
	self.floor = StageData.getFloor(index);
	self.addChild(self.floor);
	self.floor.addEventListener(Floor.OUT_COMPLETE,self.getFloor);
	self.floor.addEventListener(Floor.OUT_DIE,self.addDieFloor);
};
Map.prototype.getFloor = function(event){
	var self = event.target.parent;
	self.floor.removeEventListener(Floor.OUT_COMPLETE,self.getFloor);
	
	self.addFloor(1);
};
Map.prototype.addDieFloor = function(event){
	var self = event.target.parent;
	self.dieFloorList.push(event.target);
};