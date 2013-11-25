function Tutorial01Model(){
	base(this,MyModel,[]);
}
Tutorial01Model.prototype.construct=function(){
	var self = this;
	self.selectIndex = 1;
};
Tutorial01Model.prototype.selectLeft=function(){
	var self = this;
	self.selectIndex--;
	if(self.selectIndex < 1){
		self.selectIndex = 4;
	}
};
Tutorial01Model.prototype.selectRight=function(){
	var self = this;
	self.selectIndex++;
	if(self.selectIndex > 4){
		self.selectIndex = 1;
	}
};
Tutorial01Model.prototype.getImages=function(){
	var list = [
		{name:"bigmap",path:LMvc.IMG_PATH+"map/bigmap.png"},
		{name:"button-01",path:LMvc.IMG_PATH+"common/button-01.png"},
		{name:"arrow-left",path:LMvc.IMG_PATH+"common/arrow-left.png"},
		{name:"arrow-right",path:LMvc.IMG_PATH+"common/arrow-right.png"},
		{name:"face-1",path:LMvc.IMG_PATH+"face/face-1.png"},
		{name:"face-2",path:LMvc.IMG_PATH+"face/face-2.png"},
		{name:"face-3",path:LMvc.IMG_PATH+"face/face-3.png"},
		{name:"face-4",path:LMvc.IMG_PATH+"face/face-4.png"}
	];
	return list;
};
Tutorial01Model.prototype.selectCharacter=function(callback){
	var self = this;
	if(self.local){
		MyModel.prototype.textTutorialStep = MyModel.prototype.textTutorialStep+1;
		callback.apply(self.controller,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"tutorial/update",{step:2,selectCharacter:self.selectIndex},function(data){
		if(data.result == "yes"){
			callback.apply(self.controller,[true,null]);
		}else{
			callback.apply(self.controller,[false,data.error]);
		}
	});
};