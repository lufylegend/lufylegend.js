function CharacterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "CharacterModel";
	self.update(data);
}

CharacterModel.prototype.master = function() {
	var self = this;
	if(!self._master){
		self._master = CharacterMasterModel.getMaster(self.character_id() );
	}
	return self._master;
};
CharacterModel.prototype.update = function(data) {
	var self = this;
	self.data = data;
	//console.log("CharacterModel update:"+data.character_id);
	self.equipments(self.data.equipments);
	//console.log("CharacterModel eq");
	var growing = self.growing();
	self._hp = self._maxHp = self.master().initialHp() + growing.strength() * self.data.level;
	self._attack = self.master().initialAttack() + growing.force() * self.data.level;
	self._magicAttack = self.master().initialMagic() + growing.strategy() * self.data.level;
	self._defense = self.master().initialDef() + growing.command() * self.data.level;
	self._magicDefense = self.master().initialMagicDef() + growing.intelligence() * self.data.level;
	self._breakout = self.master().initialBreakout() + growing.agility() * self.data.level;
	self._dodge = self.master().initialDodge();
	self._speed = self.master().initialSpeed();
	self._cost = self.master().cost() + (self.character_id() < 50 ? (self.level() * 0.5 >>> 0) : (self.level() * 2));
	self._costPlus = 0;
	//console.log("CharacterModel gr");
	self.skills(self.data.skill_levels);
};
CharacterModel.prototype.growing = function(value) {
	var self = this;
	if(!self._growing || value){
		self._growing = GrowingMasterModel.getMaster(self.character_id(), self.star());
	}
	return self._growing;
};
CharacterModel.prototype.skillLevels = function(value) {
	var self = this;
	if(value){
		self._skill_levels = JSON.parse(value);
	}
	return self._skill_levels;
};
CharacterModel.prototype.skills = function() {
	var self = this;
	if(!self._skills){
		self._skills = [];
		if(self.data.skill_levels){
			var skill_levels = JSON.parse(self.data.skill_levels);
			var skillMasters = self.master().skills();
			for(var i=0;i<skillMasters.length;i++){
				var skillMaster = skillMasters[i];
				var level = skill_levels[i];
				var skill = new SkillModel(null,skillMaster,level,self);
				self._skills.push(skill);
			}
		}
	}
	return self._skills;
};
CharacterModel.prototype.equipments = function(data) {
	if(data){
		this._equipments = [];
		for(var i=0,l=data.length;i<l;i++){
			var equipment = EquipmentMasterModel.getMaster(data[i].equipment_id);
			this._equipments.push(equipment);
		}
	}
	return this._equipments;
};
CharacterModel.prototype.character_id = function() {
	return this.data.character_id;
};
CharacterModel.prototype.getSkill = function() {
	var self = this;
	if (self.skills.length == 0){
		return null;
	}
	return self.skills[0];
};
CharacterModel.prototype.clone = function() {
	var chara = new CharacterModel(this.controller, this.data);
	chara._costPlus = this._costPlus;
	return chara;
};
CharacterModel.prototype.characterSetting = function() {
	return characterSetting[this.master.actions];
};
CharacterModel.prototype.actions = function() {
	return this.master().actions();
};
CharacterModel.prototype.soldiers = function(value) {
	return this.master().soldiers(value);
};
CharacterModel.prototype.lineups = function(lineups) {
	return this.master().lineups(lineups);
};
CharacterModel.prototype.five = function() {
	return this.master().five();
};
CharacterModel.prototype.id = function() {
	return this.data.id;
};
CharacterModel.prototype.level = function() {
	return this.data.level;
};
CharacterModel.prototype.attack = function() {
	return this._attack;
};
CharacterModel.prototype.magicAttack = function() {
	return this._magicAttack;
};
CharacterModel.prototype.defense = function() {
	return this._defense;
};
CharacterModel.prototype.magicDefense = function() {
	return this._magicDefense;
};
CharacterModel.prototype.breakout = function() {
	return this._breakout;
};
CharacterModel.prototype.dodge = function() {
	return this._dodge;
};
CharacterModel.prototype.speed = function() {
	return this._speed;
};
CharacterModel.prototype.hp = function(value) {
	if ( typeof value == UNDEFINED) {
		return this._hp;
	} else {
		this._hp += value;
		if (this._hp < 0) {
			this._hp = 0;
		} else if (this._hp > this.maxHp()) {
			this._hp = this.maxHp();
		}
	}
};
CharacterModel.prototype.maxHp = function() {
	return this._maxHp;
};
CharacterModel.prototype.cost = function() {
	return this._cost + this._costPlus;
};
CharacterModel.prototype.costPlus = function() {
	this._costPlus += this._cost;
};
/*CharacterModel.prototype.moveType=function(){
 return this.data.moveType;
 };
 CharacterModel.prototype.size=function(){
 return this.data.imgSize;
 };*/
CharacterModel.prototype.arms = function() {
	return this.master().arms();
};
CharacterModel.prototype.armsKind = function() {
	return this.master().armsKind();
};
CharacterModel.prototype.star = function() {
	return this.data.star;
};
CharacterModel.prototype.name = function() {
	return this.master().name();
};
CharacterModel.prototype.faceImg = function() {
	return this.master().faceImg();
};
CharacterModel.prototype.actionImg = function() {
	return this.master().actionImg();
};
CharacterModel.prototype.actionImgPath = function() {
	return LMvc.IMG_PATH + "character/" + this.data.actionImg + ".png";
};
CharacterModel.prototype.face = function() {
	return new Face(LMvc.IMG_PATH + "face/" + this.master().faceImg() + ".png");
};
CharacterModel.prototype.minFace = function(size) {
	return this.master().minFace(size);
	
	var self = this;
	var face = new Face(self.id() < 50 ? LMvc.datalist["face-1"] : LMvc.IMG_PATH + "face/" + self.master().faceImg() + ".png", self.master().minFace());
	if ( typeof size == UNDEFINED) {
		size = 100;
	}
	face.layer.scaleX = size / self.master().minFace()[2];
	face.layer.scaleY = size / self.master().minFace()[3];
	if(self.id() >= 50){
		var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
		var background = new LBitmap(backgroundData);
		background.scaleX = size / backgroundData.width;
		background.scaleY = size * 0.2 / backgroundData.height;
		background.y = size * 0.8;
		face.addChild(background);
		
		var star = new Star(self.star(),self.star(),Star.TYPE_CARD);
		star.scaleX = star.scaleY = size * 0.15 / star.getHeight();
		star.x = (size - star.getWidth()) * 0.5;
		star.y = background.y + size * 0.025;
		face.addChild(star);
		
		var dataWin = new LBitmapData(LMvc.datalist["win06"]);
		var winPanel = getBitmap(new LPanel(dataWin,size,size));
		face.addChild(winPanel);
	}
	return face;
};
CharacterModel.prototype.minFaceRect = function() {
	return this.master().minFaceRect();
}; 
