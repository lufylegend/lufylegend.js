function SkillModel(controller, skillMaster, skill_level, characterModel){
	var self = this;
	base(self,MyModel,[controller]);
	self._master = skillMaster;
	self.skill_level = skill_level;
	self.characterModel = characterModel;
}
SkillModel.prototype.id=function(){
	return this._master.id();
};
SkillModel.prototype.level=function(){
	return this.skill_level;
};
SkillModel.prototype.icon=function(size){
	return this._master.icon(size, this.skill_level);
};
SkillModel.prototype.launch=function(baseCharacter){
	var self = this;
	var shockwave = new ShockwaveView(self.controller,baseCharacter);
};