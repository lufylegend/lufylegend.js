function StageMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "StageMasterModel";
	self.data = data;
	
}

StageMasterModel.master = [];
StageMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var stage = new StageMasterModel(null,list[i]);
		StageMasterModel.master.push(stage);
	}
};
StageMasterModel.getMaster=function(stage_id){
	var self = this;
	for(var i=0,l=StageMasterModel.master.length;i<l;i++){
		var stage = StageMasterModel.master[i];
		if(stage.id() != stage_id){
			continue;
		}
		return stage;
	}
	return null;
};
StageMasterModel.prototype.name = function(){
console.log("stage_name_"+this.data.id);
	return Language.get("stage_name_"+this.data.id);
};
StageMasterModel.prototype.id = function(){
	return this.data.id;
};
StageMasterModel.prototype.items = function(){
	return this.data.items;
};
StageMasterModel.prototype.characters = function(){
	return this.data.characters;
};
StageMasterModel.prototype.img=function(){
	var icon = new BitmapSprite(LMvc.IMG_PATH + "Stage/Stage-" + this.id() + ".png", null,null);
	return icon;
};