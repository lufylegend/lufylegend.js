function LogoController(){
	base(this,MyController,[]);
}
LogoController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.helperLoad);
};
LogoController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Label","Star","UI"],self.libraryLoad);
};
LogoController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["Loading","BitmapSprite"],self.modelLoad);
};
LogoController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["User/User"],self.startAnimation);
};
LogoController.prototype.startAnimation=function(){
	var self = this;
	LTweenLite.to(self.view.bitmapBgBack,1,{y:130,onStart:self.checkAuth});
	LTweenLite.to(self.view.layerBg,1,{scaleX:1,scaleY:1});
	LTweenLite.to(self.view.layerChara,1,{scaleX:1,scaleY:1,y:LGlobal.height - 220})
	.to(self.view.layerChara,2,{y:LGlobal.height - 200,loop:true})
	.to(self.view.layerChara,2,{y:LGlobal.height - 220});
};
LogoController.prototype.checkAuth=function(obj){
	var self = obj.parent.controller;
	self.dispatchEvent(LController.NOTIFY);
};
LogoController.prototype.onClick = function(event){
	var self = event.clickTarget.controller;
	self.view.removeEventListener(LMouseEvent.MOUSE_UP, self.onClick);
	LTweenLite.removeAll();
	LMvc.keepLoading(true);
	LMvc.changeLoading(Loading);
	
	self.view.parent.controller.mainLoad();
};
LogoController.prototype.toLogin = function(nameText, passText){
	var self = this;
	LRequestUserLogin({"name":nameText,"pass":passText},self.loginCallback.bind(self));
};
LogoController.prototype.loginCallback = function(data){
	var self = this;
	LMvc.ssid = data.ssid;
	UserModel.own(self).setPlayer(data.user);
	var new_versions = data.versions;
	self.new_versions = new_versions;
	var versions;
	var protocol = location.protocol;
	if (protocol == "http:" || protocol == "https:") {
		versions = GetData("versions");
	}else{
		versions = [];
	}
	var updateMasters;
	new_versions.forEach(function(new_child){
		if(!versions){
			updateMasters = updateMasters || {};
			updateMasters[new_child.name] = 1;
			return;
		}
		var child = versions.find(function(_){
			return _.name == new_child.name;
		});
	
		if(!child || child.ver < new_child.ver){
			updateMasters = updateMasters || {};
			updateMasters[new_child.name] = 1;
		}
	});
	
	if(updateMasters){
		LRequestMasterAll(updateMasters,self.masterModelLoad.bind(self));
	}else{
		self.masterModelLoad({master_data:{}});
	}
};
LogoController.prototype.masterModelLoad=function(data){
	var self = this;
	self.data = data;
	self.load.model(["Master/EquipmentMaster","Master/ItemMaster","Master/CharacterMaster","Master/CharacterStarMaster","Master/GrowingMaster","Master/ExpMaster","Master/SkillMaster","Master/ChapterMaster","Master/AreaMaster","Master/StageMaster"],self.setMaster);
};
LogoController.prototype.setMaster = function(){
	var self = this;
	var data = self.data;
	delete self.data;
	var character_master_data;
	if(data.master_data.character){
		character_master_data = data.master_data.character;
		SetData("character_master_data", character_master_data);
	}else{
		character_master_data = GetData("character_master_data");
	}
	CharacterMasterModel.setMaster(character_master_data);
	
	var growing_master_data;
	if(data.master_data.growing){
		growing_master_data = data.master_data.growing;
		SetData("growing_master_data", growing_master_data);
	}else{
		growing_master_data = GetData("growing_master_data");
	}
	GrowingMasterModel.setMaster(growing_master_data);
	
	var equipment_master_data;
	if(data.master_data.equipment){
		equipment_master_data = data.master_data.equipment;
		SetData("equipment_master_data", equipment_master_data);
	}else{
		equipment_master_data = GetData("equipment_master_data");
	}
	EquipmentMasterModel.setMaster(equipment_master_data);
	
	var item_master_data;
	if(data.master_data.item){
		item_master_data = data.master_data.item;
		SetData("item_master_data", item_master_data);
	}else{
		item_master_data = GetData("item_master_data");
	}
	ItemMasterModel.setMaster(item_master_data);
	
	var exp_master_data;
	if(data.master_data.exp){
		exp_master_data = data.master_data.exp;
		SetData("exp_master_data", exp_master_data);
	}else{
		exp_master_data = GetData("exp_master_data");
	}
	ExpMasterModel.setMaster(exp_master_data);
	
	var skill_master_data;
	if(data.master_data.skill){
		skill_master_data = data.master_data.skill;
		SetData("skill_master_data", skill_master_data);
	}else{
		skill_master_data = GetData("skill_master_data");
	}
	SkillMasterModel.setMaster(skill_master_data);
		
	var character_star_master_data;
	if(data.master_data.character_star){
		character_star_master_data = data.master_data.character_star;
		SetData("character_star_master_data", character_star_master_data);
	}else{
		character_star_master_data = GetData("character_star_master_data");
	}
	CharacterStarMasterModel.setMaster(character_star_master_data);

	var chapter_master_data;
	if(data.master_data.chapter){
		chapter_master_data = data.master_data.chapter;
		SetData("chapter_master_data", chapter_master_data);
	}else{
		chapter_master_data = GetData("chapter_master_data");
	}
	ChapterMasterModel.setMaster(chapter_master_data);
	
	var area_master_data;
	if(data.master_data.area){
		area_master_data = data.master_data.area;
		SetData("area_master_data", area_master_data);
	}else{
		area_master_data = GetData("area_master_data");
	}
	AreaMasterModel.setMaster(area_master_data);	
	
	var stage_master_data;
	if(data.master_data.stage){
		stage_master_data = data.master_data.stage;
		SetData("stage_master_data", stage_master_data);
	}else{
		stage_master_data = GetData("stage_master_data");
	}
	StageMasterModel.setMaster(stage_master_data);
		
	SetData("versions",self.new_versions);
	
	self.gotoMain();
};
LogoController.prototype.toRegister = function(nameText, passText){
	var self = this;
};
LogoController.prototype.gotoMain = function(){
	var self = this;
	LTweenLite.removeAll();
	LMvc.keepLoading(true);
	LMvc.changeLoading(Loading);
	self.view.parent.controller.mainLoad();
};