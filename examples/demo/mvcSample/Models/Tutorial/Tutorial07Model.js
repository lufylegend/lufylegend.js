function Tutorial07Model(){
	base(this,MyModel,[]);
}
Tutorial07Model.prototype.construct=function(){
	var self = this;
	self.talkIndex = 0;
};
Tutorial07Model.prototype.getImages=function(){
	var list = [
		{name:"arm-1",path:LMvc.IMG_PATH+"attack/1.png"},
		{name:"arm-2",path:LMvc.IMG_PATH+"attack/2.png"},
		{name:"effect02",path:LMvc.IMG_PATH+"effect/effect02.png"},
		{name:"world_bg",path:LMvc.IMG_PATH+"sub_map/world_bg.jpg"}
	];
	return list;
};
Tutorial07Model.prototype.toAttack=function(callback){
	var self = this;
	if(self.local){
		MyModel.prototype.textTutorialStep = MyModel.prototype.textTutorialStep+1;
		callback.apply(self.controller,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"tutorial/update",{step:8},function(data){
		if(data.result == "yes"){
			callback.apply(self.controller,[true,null]);
		}else{
			callback.apply(self.controller,[false,data.error]);
		}
	});
};