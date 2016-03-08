function AreaModel(){
	base(this,MyModel,[]);
}
AreaModel.prototype.construct=function(){
	var self = this;
	self.areas = [];
};
AreaModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"area-map-"+self.mapIndex,path:LMvc.IMG_PATH+"area/map-"+self.mapIndex+".png"});
	list.push({name:"lock",path:LMvc.IMG_PATH+"icon/lock.png"});
	for(var i=0,l=self.areas.length;i<l;i++){
		var areaStatus = self.areas[i];
		list.push({name:"area-"+areaStatus.master().img(),path:areaStatus.master().imgPath()});
	}
	
	return list;
};
AreaModel.prototype.getAreaData=function(callback){
	var self = this;
	self.callback = callback;
	self.mapIndex = LMvc.chapterId;
	LRequestQuestAreaList({"chapter_id":LMvc.chapterId},self.getAreaDataComplete.bind(self));
};
AreaModel.prototype.getAreaDataComplete=function(data){
	var self = this;
	
	//AreaModel.setMaster(LMvc.chapterId,data);
	var lock = false;
	for(var i=0,l=data.areas.length;i<l;i++){
		data.areas[i].lock = lock;
		if(data.areas[i].star == 0){
			lock = true;
		}
		var area = new AreaStatusModel(self.controller,data.areas[i]);
		self.areas.push(area);
	}
	var callback = self.callback;
	delete self.callback;
	callback.apply(self.controller,[]);
};