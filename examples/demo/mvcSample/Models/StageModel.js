function StageModel(){
	base(this,MyModel,[]);
}
StageModel.getArea = function(){
	return AreaMasterModel.getMaster(LMvc.areaId);
};
StageModel.getMaster = function(chapterId,areaId){
	var area = StageModel._getArea(chapterId,areaId);
	return area.stageData;
};
StageModel.setMaster = function(chapterId,areaId,data){
	var areaData = AreaModel.getMaster(chapterId);
	var areaList = areaData.areas;
	var area;
	for(var i=0,l=areaList.length;i<l;i++){
		area = areaList[i];
		if(area.id != areaId)continue;
		area.stageData = data;
	}
};
StageModel.prototype.construct=function(){
	var self = this;
	self.stageList = [];
};
StageModel.prototype.getImages=function(){
	var list = [
		{name:"stageBackground",path:LMvc.IMG_PATH+"stage/stageBackground.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"icon-refresh",path:LMvc.IMG_PATH+"icon/refresh.png"},
		{name:"icon-go",path:LMvc.IMG_PATH+"icon/go.png"},
		{name:"icon-star",path:LMvc.IMG_PATH+"icon/star.png"},
		{name:"item-character-stone",path:LMvc.IMG_PATH+"item/character_stone.png"},
		{name:"item-character-fragment",path:LMvc.IMG_PATH+"item/character_fragment.png"}
	];
	return list;
};
StageModel.prototype.getStageData=function(callback){
	var self = this;
	self.callback = callback;
console.log("model getStageData");
	LRequestQuestStageList({"area_id":LMvc.areaId},self.getStageDataComplete.bind(self));
	/*return;
	var stageDatas = [
	{id:1,name:"涿郡之战1",
		enemy:{id:51,star:3,level:1}
	},
	{id:2,name:"涿郡之战2",
		enemy:{id:51,star:3,level:1}
	},
	{id:3,name:"涿郡之战3",
		enemy:{id:51,star:3,level:1}
	},
	{id:4,name:"涿郡之战4",
		enemy:{id:51,star:3,level:1}
	},
	{id:5,name:"涿郡之战5",
		enemy:{id:51,star:3,level:1}
	},
	{id:6,name:"涿郡之战6",
		enemy:{id:51,star:3,level:1}
	}
	];
	for(var i=0,l=stageDatas.length;i<l;i++){
		var stage = new StageStatusModel(self.controller,stageDatas[i]);
		self.stageList.push(stage);
	}

	callback.apply(self.controller,[]);*/
};
StageModel.prototype.getStageDataComplete=function(data){
	var self = this;
	//StageModel.setMaster(LMvc.chapterId,LMvc.areaId,data.stages);
	/*var area = AreaModel.getMaster(LMvc.chapterId);*/
	console.log("model stage get:"+data.stages);
	var lock = false;
	for(var i=0,l=data.stages.length;i<l;i++){
	console.log("data.stages:"+data.stages[i]);
		data.stages[i].lock = lock;
		if(data.stages[i].star == 0){
			lock = true;
		}
		var stage = new StageStatusModel(self.controller,data.stages[i]);
		self.stageList.push(stage);
	}
	console.log("model stage get over");
	/*for(var i=0,l=data.areas.length;i<l;i++){
		data.areas[i].lock = lock;
		if(data.areas[i].star == 0){
			lock = true;
		}
		var area = new AreaStatusModel(self.controller,data.areas[i]);
		self.areaList.push(area);
	}*/
	var callback = self.callback;
	delete self.callback;
	callback.apply(self.controller,[]);
};