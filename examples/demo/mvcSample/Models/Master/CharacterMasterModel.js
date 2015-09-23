function CharacterMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "CharacterMasterModel";
	self.data = data;
}
CharacterMasterModel.master = [];
CharacterMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var chara = new CharacterMasterModel(null,list[i]);
		CharacterMasterModel.master.push(chara);
	}
};
CharacterMasterModel.getMaster=function(chara_id){
	var self = this;
	for(var i=0,l=CharacterMasterModel.master.length;i<l;i++){
		var chara = CharacterMasterModel.master[i];
		if(chara.id() != chara_id){
			continue;
		}
		return chara;
	}
	return null;
};
CharacterMasterModel.prototype.characterSetting = function() {
	return characterSetting[this.data.actions];
};
CharacterMasterModel.prototype.actions = function() {
	return this.data.actions;
};
CharacterMasterModel.prototype.soldiers = function(value) {
	var soldiers = [];
	if (!value) {
		value = [0, 0, 0, 0, 0, 0];
	}
	if(!this._soldiers){
		this._soldiers = JSON.parse(this.data.soldiers);
	}
	for (var i = 0; i < this._soldiers.length; i++) {
		soldiers[i] = value[i] || this._soldiers[i];
	}
	return soldiers;
};
CharacterMasterModel.prototype.lineups = function(lineups) {
	if (!lineups) {
		lineups = [];
	}
	if(!this._lineups){
		this._lineups = JSON.parse(this.data.lineups);
	}
	var masterLineups = this._lineups;
	for (var i = 0; i < masterLineups.length; i++) {
		var lineup = lineups.find(function(child){
			return child == masterLineups[i];
		});
		if(lineup){
			continue;
		}
		lineups.push(masterLineups[i]);
	}
	return lineups;
};
CharacterMasterModel.prototype.five = function() {
	return this.data.five;
};
CharacterMasterModel.prototype.id = function() {
	return this.data.id;
};
CharacterMasterModel.prototype.name = function() {
	return Language.get("character_name_"+this.data.id);
};
CharacterMasterModel.prototype.arms = function() {
	return this.data.arms;
};
CharacterMasterModel.prototype.armsKind = function() {
	return this.data.armsKind;
};
CharacterMasterModel.prototype.cost = function() {
	return  parseInt(this.data.cost, 10);
};
CharacterMasterModel.prototype.five = function() {
	return this.data.five;
};
CharacterMasterModel.prototype.start_star = function() {
	return this.data.start_star;
};
CharacterMasterModel.prototype.faceImg = function() {
	return this.data.faceImg;
};
CharacterMasterModel.prototype.actionImg = function() {
	return "character-" + this.data.actionImg;
};
CharacterMasterModel.prototype.actionImgPath = function() {
	return LMvc.IMG_PATH + "character/" + this.data.actionImg + ".png";
};
CharacterMasterModel.prototype.face = function() {
	return new Face(LMvc.IMG_PATH + "face/" + this.master.faceImg + ".png");
};
CharacterMasterModel.prototype.skills = function() {
	var self = this;
	if(!self._skills){
		self._skills = [];
		var skill_ids = JSON.parse(this.data.skills);
		for(var i=0;i<skill_ids.length;i++){
			var skill_id = skill_ids[i];
			if(skill_id == 0){
				continue;
			}
			var skill = SkillMasterModel.getMaster(skill_id);
			self._skills.push(skill);
		}
	}
	return self._skills;
};
CharacterMasterModel.prototype.minFace = function(size) {
	var self = this;
	if(!self._minFace){
		self._minFace = JSON.parse(this.data.minFace);
	}
	var face = new Face(self.id() < 50 ? LMvc.datalist["face-1"] : LMvc.IMG_PATH + "face/" + this.data.faceImg + ".png", self._minFace);
	if ( typeof size == UNDEFINED) {
		size = 100;
	}
	face.scaleX = size / self._minFace[2];
	face.scaleY = size / self._minFace[3];
	return face;
};
CharacterMasterModel.prototype.minFaceRect = function() {
	return this.data.minFace;
}; 
CharacterMasterModel.prototype.initialHp = function() {
	return parseInt(this.data.initialHp,10);
};
CharacterMasterModel.prototype.initialAttack = function() {
	return parseInt(this.data.initialAttack,10);
};
CharacterMasterModel.prototype.initialMagic = function() {
	return parseInt(this.data.initialMagic,10);
};
CharacterMasterModel.prototype.initialDef = function() {
	return parseInt(this.data.initialDef,10);
};
CharacterMasterModel.prototype.initialMagicDef = function() {
	return parseInt(this.data.initialMagicDef,10);
};
CharacterMasterModel.prototype.initialSpeed = function() {
	return parseInt(this.data.initialSpeed,10);
};
CharacterMasterModel.prototype.initialDodge = function() {
	return parseInt(this.data.initialDodge,10);
};
CharacterMasterModel.prototype.initialBreakout = function() {
	return parseInt(this.data.initialBreakout,10);
};