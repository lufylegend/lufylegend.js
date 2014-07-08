function Tutorial02Model(){
	base(this,MyModel,[]);
}
Tutorial02Model.prototype.construct=function(){
	var self = this;
};
Tutorial02Model.prototype.getImages=function(){
	var list = [
		{name:"bigmap",path:LMvc.IMG_PATH+"map/bigmap.png"}
	];
	return list;
};
Tutorial02Model.prototype.selectCity=function(cityIndex,callback){
	var self = this;
	if(self.local){
		MyModel.prototype.textTutorialStep = MyModel.prototype.textTutorialStep+1;
		callback.apply(self.controller,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"tutorial/update",{step:3,selectCity:cityIndex},function(data){
		if(data.result == "yes"){
			callback.apply(self.controller,[true,null]);
		}else{
			callback.apply(self.controller,[false,data.error]);
		}
	});
};