function UserModel(controller){
	base(this,MyModel,[controller]);
	this.data = {};
	this.characterList = [];
}
UserModel.prototype.setPlayer=function(playerData){
	this.data = playerData;
};
UserModel._own = null;
UserModel.own=function(controller){
	if(UserModel._own == null){
		UserModel._own = new UserModel(null);
	}
	if(controller){
		UserModel._own.controller = controller;
	}
	return UserModel._own;
};
UserModel.prototype.id=function(){
	return this.data.id;
};
UserModel.prototype.name=function(){
	return this.data.name;
};
UserModel.prototype.nickname=function(){
	return this.data.nickname;
};
UserModel.prototype.level=function(){
	return this.data.level;
};
UserModel.prototype.gold=function(){
	return this.data.gold;
};
UserModel.prototype.silver=function(){
	return this.data.silver;
};
UserModel.prototype.junling=function(){
	return this.data.junling;
};
UserModel.prototype.junlingMax=function(){
	return this.level() + 10;
};
UserModel.prototype.characters=function(){
	return this.characterList;
};
UserModel.prototype.addCharacter=function(data){
	var self = this;
	var chara = this.characterList.find(function(child){
		return data.character_id == child.character_id();
	});
	if(chara){
		chara.data = data;
		chara.data.update();
	}else{
		chara = new CharacterModel(null,data);
		self.characterList.push(chara);
	}
	return chara;
};
UserModel.prototype.updateCharacters = function(characters){
	var self = this;
	for(var i=0,l=characters.length;i<l;i++){
		var data = characters[i];
		var chara = self.characterList.find(function(child){
			return child.character_id() == data.character_id;
		});
		if(!chara){
			continue;
		}
		chara.update(data);
	}
};
UserModel.prototype.getCharacters=function(callback){
	var self = this;
	if(self.characterList.length > 0){
		callback();
		return;
	}
	self.callback = callback;
	LRequestCharacterGet({},self.characterGetComplete.bind(self));
};
UserModel.prototype.characterGetComplete=function(data){
	var self = this;
	var list = data.characters;
	var charaList = [];
	for(var i=0;i<list.length;i++){
		var chara = new CharacterModel(self.controller,list[i]);
		charaList.push(chara);
	}
	self.characterList = charaList;
	callback = self.callback;
	delete self.callback;
	callback();
	return;
	if(data){
		callback.call(self.controller);
		return;
	}
	LRequestCharacterGet({},self.characterGetComplete.bind(self));
	//skills:[等级,等级,等级,等级,等级]
	var list = [
		{id:51,exp:10,star:3,level:5,skills:[]},
		{id:52,exp:10,star:5,level:10,skills:[]},
		{id:53,exp:10,star:2,level:4,skills:[]},
		{id:54,exp:10,star:5,level:6,skills:[]},
		{id:55,exp:10,star:7,level:1,skills:[]},
		{id:56,exp:10,star:7,level:1,skills:[]},
		{id:57,exp:10,star:6,level:1,skills:[]},
		{id:58,exp:10,star:2,level:1,skills:[]},
		{id:59,exp:10,star:1,level:1,skills:[]},
		{id:60,exp:10,star:3,level:1,skills:[]},
		{id:61,exp:10,star:4,level:1,skills:[]},
		{id:62,exp:10,star:2,level:1,skills:[]},
		{id:63,exp:10,star:1,level:1,skills:[]},
		{id:64,exp:10,star:1,level:1,skills:[]},
		{id:65,exp:10,star:2,level:1,skills:[]},
		{id:66,exp:10,star:5,level:1,skills:[]},
		{id:67,exp:10,star:5,level:1,skills:[]},
	];
	var charaList = [];
	for(var i=0;i<list.length;i++){
		var chara = new CharacterModel(self.controller,list[i]);
		charaList.push(chara);
	}
	self.characterList = charaList;
	self.callback();
};
UserModel.prototype.getArms=function(characterList, callback){
	var self = this;
	/*var soldiers = [0,0,0,0,0,0], lineups = [];
	characterList.forEach(function(child) {
		soldiers = child.soldiers(soldiers);
		lineups = child.lineups(lineups);
	});
	var charaList = [];
	for(var i=0;i<ArmsConfig.Arms.length;i++){
		if(!soldiers[i]){
			continue;
		}
		var child = ArmsConfig.Arms[i];
		var arm = {id:child.id,star:1,level:1,skills:[]};
		var chara = new CharacterModel(self.controller,arm);
		charaList.push(chara);
	}*/
	self.armsList = getArmsFromCharacters(characterList,self.controller);
	callback.apply(self.controller,[]);
	return;
	var list = [
		{id:1,name:"刀步兵",level:1,maxHp:100,cost:10,attack:11,defense:30,magicAttack:20,magicDefense:20,five:0,arms:0,armsKind:0,faceImg:1,minFace:[0,0,60,60],actionImg:1,imgSize:84,actions:"bu_dao"},
		{id:2,name:"刀骑兵",level:1,maxHp:100,cost:10,attack:15,defense:20,magicAttack:20,magicDefense:20,five:0,arms:0,armsKind:1,faceImg:1,minFace:[0,60,60,60],actionImg:2,imgSize:84,actions:"qi_dao"},
		{id:3,name:"枪步兵",level:1,maxHp:100,cost:10,attack:14,defense:24,magicAttack:20,magicDefense:20,five:0,arms:1,armsKind:0,faceImg:1,minFace:[0,120,60,60],actionImg:3,imgSize:64,actions:"bu_qiang"},
		{id:4,name:"枪骑兵",level:1,maxHp:100,cost:10,attack:18,defense:25,magicAttack:20,magicDefense:20,five:0,arms:1,armsKind:1,faceImg:1,minFace:[0,180,60,60],actionImg:4,imgSize:84,actions:"qi_qiang"},
		{id:5,name:"弓步兵",level:1,maxHp:100,cost:10,attack:10,defense:15,magicAttack:20,magicDefense:20,five:0,arms:2,armsKind:0,faceImg:1,minFace:[0,240,60,60],actionImg:5,imgSize:64,actions:"bu_gong"},
		{id:6,name:"弓骑兵",level:1,maxHp:100,cost:10,attack:13,defense:17,magicAttack:20,magicDefense:20,five:0,arms:2,armsKind:1,faceImg:1,minFace:[0,300,60,60],actionImg:6,imgSize:84,actions:"qi_gong"}
	];
	//skills:[等级,等级,等级,等级,等级]
	var list = [
		{id:1,exp:10,star:1,level:1,skills:[]},
		{id:2,exp:10,star:1,level:1,skills:[]},
		{id:3,exp:10,star:1,level:1,skills:[]},
		{id:4,exp:10,star:1,level:1,skills:[]},
		{id:5,exp:10,star:1,level:1,skills:[]},
		{id:6,exp:10,star:1,level:1,skills:[]}
	];
	var charaList = [];
	for(var i=0;i<list.length;i++){
		var chara = new CharacterModel(self.controller,list[i]);
		charaList.push(chara);
	}
	self.armsList = charaList;
	callback.apply(self.controller,[]);
};
