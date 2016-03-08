function CharacterListChildView(controller,characterModel,width){
	var self = this;
	base(self,LView,[controller]);
	self.characterModel = characterModel;
	self.set(width);
}
CharacterListChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
CharacterListChildView.prototype.set=function(width){
	var self = this;
	self.layerInit();

	var bitmapData = new LBitmapData(LMvc.datalist["win03"]);
	var panel = new LPanel(bitmapData,width,150);
	self.layer.addChild(panel);
	
	var faceSize = 100;
	var chara = self.characterModel.minFace(faceSize);
	chara.x = 10;
	chara.y = 10;
	self.addChild(chara);
	
	var name = getStrokeLabel(self.characterModel.name(),18,"#FFFFFF","#000000",2);
	name.x = chara.x + (faceSize - name.getWidth())*0.5;
	name.y = chara.y + faceSize;
	self.layer.addChild(name);
	
	//equipment
	var dataWin = new LBitmapData(LMvc.datalist["win06"]);
	for(var i=0,l=PositionConfig.positions.length;i<l;i++){
		var position = PositionConfig.positions[i];
		var equipment = self.characterModel.equipments().find(function(child){
			return child.position() == position;
		});
		var icon;
		if(equipment){
			icon = equipment.icon(new LPoint(40,40));
		}else{
			icon = new LPanel(new LBitmapData(LMvc.datalist["win06"]),40,40);
		}
		icon.x = chara.x + faceSize + 5 + i*45;
		icon.y = chara.y;
		self.layer.addChild(icon);
	}
	//skill
	var skills = self.characterModel.skills();
	for(var i=0,l=skills.length;i<l;i++){
		var skill = skills[i];
		var icon = skill.icon(new LPoint(40,40));
		icon.x = chara.x + faceSize + 5 + i*45;
		icon.y = chara.y + 45;
		self.layer.addChild(icon);
	}
	//arms
	for (var i = 0; i < ArmsConfig.Arms.length; i++) {
		var armId = ArmsConfig.Arms[i].id;
		var arm = {character_id:armId,star:1,level:1};
		var charaArm = new CharacterModel(self.controller,arm);
		var face = charaArm.minFace(35);
		if(self.characterModel.soldiers().indexOf(armId) >= 0){
			face.bitmapData.setCoordinate(0,face.bitmapData.y);
		}else{
			face.bitmapData.setCoordinate(60,face.bitmapData.y);
		}
		face.x = chara.x + faceSize + 5 + i*35;
		face.y = chara.y + 90;
		self.layer.addChildAt(face);
	}
};