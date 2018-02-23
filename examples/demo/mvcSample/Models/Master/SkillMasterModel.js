function SkillMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "SkillMasterModel";
	self.data = data;
}
SkillMasterModel.master = [];
SkillMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var skill = new SkillMasterModel(null,list[i]);
		SkillMasterModel.master.push(skill);
	}
};
SkillMasterModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=SkillMasterModel.master.length;i<l;i++){
		var skill = SkillMasterModel.master[i];
		if(skill.id() != id){
			continue;
		}
		return skill;
	}
	return null;
};
SkillMasterModel.prototype.id = function() {
	return this.data.id;
};
SkillMasterModel.prototype.name = function() {
	return Language.get("skill_name_"+this.data.id);
};
SkillMasterModel.prototype.explanation = function() {
	return Language.get("skill_explanation_"+this.data.id);
};
SkillMasterModel.prototype.five = function() {
	return this.data.five;
};
SkillMasterModel.prototype.icon=function(size, level){
	var self = this;
	if(!size){
		size = new LPoint(100,100);
	}
	if(!level){
		level = 0;
	}
	var layer = new LSprite();
	var icon = level > 0 ? new BitmapSprite(LMvc.IMG_PATH + "skill/" + this.id() + ".png", null,size) : new LSprite();
	layer.addChild(icon);
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	layer.addChild(getBitmap(winPanel));
	return layer;
};