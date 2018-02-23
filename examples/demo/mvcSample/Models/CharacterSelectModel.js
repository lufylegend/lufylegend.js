function CharacterSelectModel(){
	base(this,MyModel,[]);
}
CharacterSelectModel.prototype.construct=function(){
	this.arms = [];
	this.ourCharacterList = [];
	this.enemyCharacterList = [];
};
CharacterSelectModel.prototype.setArms=function(){
	var self = this;
	for(var i=0,l=ArmsConfig.Arms.length;i<l;i++){
	console.log("ArmsConfig.Arms[i].id="+ArmsConfig.Arms[i].id);
		var arm = {character_id:ArmsConfig.Arms[i].id,star:1,level:1,equipments:[]};
		var chara = new CharacterModel(self.controller,arm);
		self.arms.push(chara);
	}
};
CharacterSelectModel.prototype.getImages=function(){
	var self = this;
	console.log("CharacterSelectModel getImages");
	var i,list = [
		{name:"face-1",path:LMvc.IMG_PATH+"face/1.png"},
		{name:"lineups",path:LMvc.IMG_PATH+"battle/lineups.png"},
		{name:"arrow",path:LMvc.IMG_PATH+"icon/arrow.png"},
		{name:"underscore",path:LMvc.IMG_PATH+"icon/underscore.png"},
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"faceBackground",path:LMvc.IMG_PATH+"icon/faceBackground.png"},
		{name:"select-checkIcon",path:LMvc.IMG_PATH+"icon/checked.png"}
	];
	for(var i=0;i<10;i++){
		list.push({name:"num-1-"+i,path:LMvc.IMG_PATH+"num/1/num_"+i+".png"});
	}
	return list;
};
CharacterSelectModel.prototype.addCharacter = function(list,chara){
	list.push(chara);
	this.controller.quadTree.add(chara,chara.x,chara.y);
};
CharacterSelectModel.prototype.removeCharacter = function(list,chara){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		if(list[i].objectIndex == chara.objectIndex){
			list.splice(i, 1);
			self.controller.quadTree.remove(chara);
			break;
		}
	}
};

