function JiuguanModel(){
	base(this,MyModel,[]);
}
JiuguanModel.prototype.getCommonImages=function(){
	var list = [
		{name:"bar-up",path:LMvc.IMG_PATH+"common/bar-up.png"},
		{name:"bar-right-up",path:LMvc.IMG_PATH+"common/bar-right-up.png"},
		{name:"bar-right-down",path:LMvc.IMG_PATH+"common/bar-right-down.png"},
		{name:"bar-right",path:LMvc.IMG_PATH+"common/bar-left.png"},
		{name:"bar-left-up",path:LMvc.IMG_PATH+"common/bar-left-up.png"},
		{name:"bar-left-down",path:LMvc.IMG_PATH+"common/bar-left-down.png"},
		{name:"bar-left",path:LMvc.IMG_PATH+"common/bar-left.png"},
		{name:"bar-down",path:LMvc.IMG_PATH+"common/bar-down.png"},
		{name:"inputbox-1",path:LMvc.IMG_PATH+"common/inputbox-1.png"}
	];
	return list;
};
JiuguanModel.prototype.getCharaList=function(callback){
	var self = this;
	console.log("JiuguanModel.prototype.getCharaList = ",LMvc.tutorialIndex, LMvc.tutorialMax);
	if(self.local || LMvc.tutorialIndex < LMvc.tutorialMax){
		var data = [
		//{index:1,name:"孫尚香",arm:"女兵",force:83,intelligence:77,command:82,gold:10,silver:1000,skill:"火計"},
		//{index:1,name:"孫尚香",arm:"女兵",force:83,intelligence:77,command:82,gold:10,silver:1000,skill:"火計"},
		{index:1,name:"孫尚香",arm:"女兵",force:83,intelligence:77,command:82,gold:10,silver:1000,skill:"火計"}
		];
		self.data = data;
		callback.apply(self.controller,[]);
		return;
	}
	self.post(LMvc.API_PATH+"build",{type:"restaurant"},function(data){
		self.data = data;
		callback.apply(self.controller,[]);
	});
};
JiuguanModel.prototype.getChara=function(callback){
	var self = this;
	if(self.local){
		MyModel.prototype.textTutorialStep = MyModel.prototype.textTutorialStep+1;
		callback.apply(self.controller,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"tutorial/update",{step:6},function(data){
		if(data.result == "yes"){
			callback.apply(self.controller,[true,null]);
		}else{
			callback.apply(self.controller,[false,data.error]);
		}
	});
};