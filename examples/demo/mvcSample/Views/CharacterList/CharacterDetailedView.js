function CharacterDetailedView(controller,characterModel){
	var self = this;
	base(self,LView,[controller]);
	self.nowTab = CharacterDetailedView.TAB_EQUIPMENT;
	self.set(characterModel);
}
CharacterDetailedView.prototype.layerInit=function(){
	var self = this;
	var backLayer = new LSprite();
	backLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#FFFFFF");
	self.addChild(getBitmap(backLayer));
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.tabLayer = new LSprite();
	self.tabLayer.x = 15;
	self.tabLayer.y = 375;
	self.addChild(self.tabLayer);
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
CharacterDetailedView.prototype.clickLeftArrow=function(event){
	this.changeCharacter(-1);
};
CharacterDetailedView.prototype.clickRightArrow=function(event){
	this.changeCharacter(1);
};
CharacterDetailedView.prototype.changeCharacter=function(value){
	var self = this;
	var characterList = UserModel.own().characterList;
	var index = characterList.findIndex(function(child){
		return child.id() == self.characterModel.id();
	});
	index = index + value;
	if(index < 0){
		index = characterList.length - 1;
	}else if(index >= characterList.length){
		index = 0;
	}
	var characterModel = characterList[index];
	self.set(characterModel);
};
CharacterDetailedView.prototype.set=function(characterModel){
	var self = this;
	self.die();
	self.removeAllChild();
	
	self.characterModel = characterModel;
	self.layerInit();

	var card = new Card(self.characterModel);
	card.x = (LGlobal.width - card.cardW) * 0.5;
	card.y = 50;
	self.layer.addChild(card);
	self.card = card;
	
	self.TabShow(self.nowTab);
	self.ctrlLayerInit();
};
CharacterDetailedView.TAB_EQUIPMENT = "tab_equipment";
CharacterDetailedView.TAB_SKILL = "tab_skill";
CharacterDetailedView.TAB_ARMS = "tab_arms";
CharacterDetailedView.TAB_LINEUPS = "tab_lineups";
CharacterDetailedView.TAB_STATUS = "tab_status";
CharacterDetailedView.prototype.TabClick=function(event){
	var self = this;
	self.TabShow(event.currentTarget.tabName);
};
CharacterDetailedView.prototype.TabShow=function(tab){
	var self = this, tabIcon, layer;
	self.tabLayer.removeAllChild();
	self.nowTab = tab;
	var tabs = [CharacterDetailedView.TAB_EQUIPMENT,CharacterDetailedView.TAB_SKILL,CharacterDetailedView.TAB_ARMS,CharacterDetailedView.TAB_LINEUPS,CharacterDetailedView.TAB_STATUS];
	for(var i=0,l=tabs.length;i<l;i++){
		tabIcon = new LSprite();
		if(tabs[i] == tab){
			layer = new LPanel(new LBitmapData(LMvc.datalist["win03"],0,0,27,22),90,50);
			tabIcon.y = -10;
		}else{
			layer = new LPanel(new LBitmapData(LMvc.datalist["win03"],0,0,27,22),90,40);
			tabIcon.tabName = tabs[i];
			tabIcon.addEventListener(LMouseEvent.MOUSE_UP,self.TabClick.bind(self));
		}
		var label = getStrokeLabel(Language.get(tabs[i]),22,"#FFFFFF","#000000",2);
		label.x = (90 - label.getWidth()) * 0.5;
		label.y = 10;
		layer.addChild(label);
		tabIcon.addChild(getBitmap(layer));
		tabIcon.x = 90 * i;
		self.tabLayer.addChild(tabIcon);
	}
	var back = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win03"]),450,LGlobal.height - self.tabLayer.y - 45));
	back.y = 35;
	self.tabLayer.addChild(back);
	switch(tab){
		case CharacterDetailedView.TAB_EQUIPMENT:
			self.showEquipment();
			break;
		case CharacterDetailedView.TAB_SKILL:
			self.showSkills();
			break;
		case CharacterDetailedView.TAB_ARMS:
			self.showArms();
			break;
		case CharacterDetailedView.TAB_LINEUPS:
			self.showLineups();
			break;
		case CharacterDetailedView.TAB_STATUS:
			self.showStatus();
			break;
	}
};
CharacterDetailedView.prototype.showEquipment=function(){
	var self = this;
	var dataWin = new LBitmapData(LMvc.datalist["win06"]);
	for(var i=0,l=PositionConfig.positions.length;i<l;i++){
		var position = PositionConfig.positions[i];
		var equipment = self.characterModel.equipments().find(function(child){
			return child.position() == position;
		});
		var icon,iconSize = 80;
		if(equipment){
			icon = equipment.icon(new LPoint(iconSize,iconSize));
		}else{
			icon = new LPanel(new LBitmapData(LMvc.datalist["win06"]),iconSize,iconSize);
		}
		icon.x = 10 + i*85;
		icon.y = 50;
		icon.position = position;
		self.tabLayer.addChild(icon);
		icon.addEventListener(LMouseEvent.MOUSE_UP,self.selectEquipment.bind(self));
	}
};
CharacterDetailedView.prototype.selectEquipment=function(event){
	var self = this;
	console.log(event.currentTarget);
	console.log(event.currentTarget.position);
	//把现在的画面BitmapData化，然后选择装备一览
	self.controller.equipmentsShow(self.characterModel.character_id());
};
CharacterDetailedView.prototype.showSkills=function(){
	var self = this;
	var skills = self.characterModel.skills();
	for(var i=0,l=skills.length;i<l;i++){
		var skill = skills[i];
		var icon = skill.icon(new LPoint(80,80));
		icon.x = 10 + i*85;
		icon.y = 50;
		self.tabLayer.addChild(icon);
	}
};
CharacterDetailedView.prototype.showArms=function(){
	var self = this;
	for (var i = 0; i < ArmsConfig.Arms.length; i++) {
		var armId = ArmsConfig.Arms[i].id;
		var arm = {character_id:armId,star:1,level:1};
		var charaArm = new CharacterModel(self.controller,arm);
		var face = charaArm.minFace(70);
		if(self.characterModel.soldiers().indexOf(armId) >= 0){
			face.bitmapData.setCoordinate(0,face.bitmapData.y);
		}else{
			face.bitmapData.setCoordinate(60,face.bitmapData.y);
		}
		face.x = 2 + i*75;
		face.y = 60;
		self.tabLayer.addChildAt(face);
	}
};
CharacterDetailedView.prototype.showLineups=function(){
	var self = this;
	var lineups = self.characterModel.lineups();
	for(var i=0;i<lineupsConfig.length;i++){
		var lineupChild = lineupsConfig[i];
		var lineup = lineups.find(function(child){
			return child == lineupChild.id;
		});
		var rect = lineupChild.rect;
		var lineupWidth = 100, lineupHeight = 100;
		var bitmapData = new LBitmapData(LMvc.datalist["lineups"],rect[0],rect[1],rect[2],rect[3]);
		if(lineup){
			bitmapData.setCoordinate(bitmapData.x, bitmapData.height);
		}
		var lineupBitmap = new LBitmap(bitmapData);
		lineupBitmap.id = lineupChild.id;
		lineupBitmap.scaleX = lineupWidth/lineupBitmap.bitmapData.width;
		lineupBitmap.scaleY = lineupHeight/lineupBitmap.bitmapData.height;
		lineupBitmap.x = 10 + (lineupWidth + 10) * (i % 4);
		lineupBitmap.y = 50 + (lineupHeight + 10) * (i / 4 >>> 0);
		self.tabLayer.addChild(lineupBitmap);
	}
};
CharacterDetailedView.prototype.showStatus=function(){
	var self = this;
	var statusLayer = new LSprite();
	var txtHeight = 25, startY = -txtHeight + 5, startX = 5;
	var labels = ["attack","magicAttack","defense","magicDefense","breakout","dodge"];
	var datas = [self.characterModel.attack(),self.characterModel.magicAttack(),self.characterModel.defense(),
	self.characterModel.magicDefense(),self.characterModel.breakout(),self.characterModel.dodge()];
	startY += txtHeight;
	var lblCost = getStrokeLabel(String.format("{0} : {1}",Language.get("cost"), self.characterModel.cost()),20,"#FFFFFF","#000000",4);
	lblCost.x = startX;
	lblCost.y = startY;
	statusLayer.addChild(lblCost);
	
	startY += txtHeight;
	var lblHp = getStrokeLabel(String.format("{0} : {1}","HP", self.characterModel.maxHp()),20,"#FFFFFF","#000000",4);
	lblHp.x = startX;
	lblHp.y = startY;
	statusLayer.addChild(lblHp);
	
	startY += txtHeight;
	var lblAttack = getStrokeLabel(String.format("{0} : {1}",Language.get("attack"), self.characterModel.attack()),20,"#FFFFFF","#000000",4);
	lblAttack.x = startX;
	lblAttack.y = startY;
	statusLayer.addChild(lblAttack);
	
	startY += txtHeight;
	var lblMagicAttack = getStrokeLabel(String.format("{0} : {1}",Language.get("magicAttack"), self.characterModel.magicAttack()),20,"#FFFFFF","#000000",4);
	lblMagicAttack.x = startX;
	lblMagicAttack.y = startY;
	statusLayer.addChild(lblMagicAttack);
	
	startY += txtHeight;
	var lblDefense = getStrokeLabel(String.format("{0} : {1}",Language.get("defense"), self.characterModel.defense()),20,"#FFFFFF","#000000",4);
	lblDefense.x = startX;
	lblDefense.y = startY;
	statusLayer.addChild(lblDefense);
	
	startY += txtHeight;
	var lblMagicDefense = getStrokeLabel(String.format("{0} : {1}",Language.get("magicDefense"), self.characterModel.magicDefense()),20,"#FFFFFF","#000000",4);
	lblMagicDefense.x = startX;
	lblMagicDefense.y = startY;
	statusLayer.addChild(lblMagicDefense);
	
	startY += txtHeight;
	var lblBreakout = getStrokeLabel(String.format("{0} : {1}",Language.get("breakout"), self.characterModel.breakout()),20,"#FFFFFF","#000000",4);
	lblBreakout.x = startX;
	lblBreakout.y = startY;
	statusLayer.addChild(lblBreakout);
	
	startY += txtHeight;
	var lblDodge = getStrokeLabel(String.format("{0} : {1}",Language.get("dodge"), self.characterModel.dodge()),20,"#FFFFFF","#000000",4);
	lblDodge.x = startX;
	lblDodge.y = startY;
	statusLayer.addChild(lblDodge);
	
	startY += txtHeight;
	var lblSpeed = getStrokeLabel(String.format("{0} : {1}",Language.get("speed"), self.characterModel.speed()),20,"#FFFFFF","#000000",4);
	lblSpeed.x = startX;
	lblSpeed.y = startY;
	statusLayer.addChild(lblSpeed);
	
	startY += txtHeight;
	var lblForce = getStrokeLabel(String.format("{0} : {1}",Language.get("force"), self.characterModel.growing().force()),20,"#FFFFFF","#000000",4);
	lblForce.x = startX;
	lblForce.y = startY;
	statusLayer.addChild(lblForce);
	
	startY += txtHeight;
	var lblStrategy = getStrokeLabel(String.format("{0} : {1}",Language.get("strategy"), self.characterModel.growing().strategy()),20,"#FFFFFF","#000000",4);
	lblStrategy.x = startX;
	lblStrategy.y = startY;
	statusLayer.addChild(lblStrategy);
	
	startY += txtHeight;
	var lblCommand = getStrokeLabel(String.format("{0} : {1}",Language.get("command"), self.characterModel.growing().command()),20,"#FFFFFF","#000000",4);
	lblCommand.x = startX;
	lblCommand.y = startY;
	statusLayer.addChild(lblCommand);
	
	startY += txtHeight;
	var lblIntelligence = getStrokeLabel(String.format("{0} : {1}",Language.get("intelligence"), self.characterModel.growing().intelligence()),20,"#FFFFFF","#000000",4);
	lblIntelligence.x = startX;
	lblIntelligence.y = startY;
	statusLayer.addChild(lblIntelligence);
	
	startY += txtHeight;
	var lblAgility = getStrokeLabel(String.format("{0} : {1}",Language.get("agility"), self.characterModel.growing().agility()),20,"#FFFFFF","#000000",4);
	lblAgility.x = startX;
	lblAgility.y = startY;
	statusLayer.addChild(lblAgility);
	
	startY += txtHeight;
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 50, startY]);
	
	var center = new LPoint(280, 145);
	var angle = 360 / labels.length;
	var middleR = 110;
	var bigR = 130;
	var smallList = [];
	var middleList = [];
	var bigList = [];
	var maxStatus = 100;
	for(var i=0;i<labels.length;i++){
		var rotate = (180-angle * i) * Math.PI / 180;
		var x = Math.floor(center.x - bigR*Math.cos(rotate+Math.PI*0.5));
		var y = Math.floor(center.y + bigR*Math.sin(rotate+Math.PI*0.5));
		var text = getStrokeLabel(Language.get(labels[i]),18,"#FFFFFF","#000000",2);
		text.x = x - text.getWidth() * 0.5;
		text.y = y - text.getHeight() * 0.5;
		statusLayer.addChild(text);
		
		var x = Math.floor(center.x - middleR*Math.cos(rotate+Math.PI*0.5));
		var y = Math.floor(center.y + middleR*Math.sin(rotate+Math.PI*0.5));
		middleList.push([x, y]);
		statusLayer.graphics.drawLine(2, "#000000", [center.x, center.y, x, y]);
		
		var smallR = middleR * datas[i] / maxStatus;
		var x = Math.floor(center.x - smallR*Math.cos(rotate+Math.PI*0.5));
		var y = Math.floor(center.y + smallR*Math.sin(rotate+Math.PI*0.5));
		smallList.push([x, y]);
	}
	statusLayer.graphics.drawVertices(2, "#ff0000", smallList);
	statusLayer.graphics.drawVertices(1, "#000000", middleList);
	statusLayer.graphics.drawRect(1, "#000000", [middleList[0][0], middleList[0][1], 5, 5]);
	
	var statusBitmap = getBitmap(statusLayer);
	var backLayer = new LSprite();
	backLayer.addChild(statusBitmap);
	var sc = new LScrollbar(backLayer, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70, 10);
	sc.x = 10;
	sc.y = 50;
	self.tabLayer.addChild(sc);
};

CharacterDetailedView.prototype.ctrlLayerInit=function(){
	var self = this;
	
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.x = 10;
	leftButton.y = self.card.y + (self.card.cardH - leftBitmapData.height) * 0.5;
	self.ctrlLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow.bind(self));
	var rightBitmapData = new LBitmapData(null,0,0,leftBitmapData.width,leftBitmapData.height,LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.scale(-1,1);
	matrix.translate(leftBitmapData.width,0);
	rightBitmapData.draw(left, matrix);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
	rightButton.x = LGlobal.width - leftButton.x - leftBitmapData.width;
	rightButton.y = leftButton.y;
	self.ctrlLayer.addChild(rightButton);
	rightButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickRightArrow.bind(self));
	
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP,self.returnList.bind(self));
};
CharacterDetailedView.prototype.returnList=function(){
	this.controller.view.showCharacterList();
};