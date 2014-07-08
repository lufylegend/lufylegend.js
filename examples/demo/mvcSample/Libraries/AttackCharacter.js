function AttackCharacter(index){
	var self = this;
	base(self,LSprite,[]);
		
	var list = LGlobal.divideCoordinate(64,960,15,1);
	self.list = [
	[list[0][0],list[1][0],list[2][0],list[3][0]],
	[list[4][0],list[5][0],list[6][0],list[7][0]],
	[list[8][0],list[9][0]],
	[list[10][0],list[11][0]],
	[list[12][0]],
	[list[13][0]],
	[list[14][0]]
	];
	self.anime = new LAnimationTimeline(new LBitmapData(LMvc.datalist["arm-"+index],0,0,64,64),self.list);
	self.anime.speed = 3;
	self.anime.setLabel("down_attack",0,0);
	self.anime.setLabel("up_attack",1,0);
	self.anime.setLabel("down_stand",2,0);
	self.anime.setLabel("up_stand",3,0);
	self.anime.setLabel("hert",4,0);
	self.anime.setLabel("down_block",5,0);
	self.anime.setLabel("up_block",6,0);
	self.addChild(self.anime);
}
AttackCharacter.prototype.loadOver = function(event){
	var self = event.target.parent;
	var bitmapData = new LBitmapData(event.currentTarget);
	var bitmap = new LBitmap(bitmapData);
	self.addChild(bitmap);
};
