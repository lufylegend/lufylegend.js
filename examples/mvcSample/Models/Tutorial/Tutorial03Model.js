function Tutorial03Model(){
	base(this,MyModel,[]);
}
Tutorial03Model.prototype.construct=function(){
	var self = this;
	self.talkIndex = 0;
};
Tutorial03Model.prototype.getImages=function(){
	var list = [
		{name:"arm-1",path:LMvc.IMG_PATH+"attack/1.png"},
		{name:"arm-2",path:LMvc.IMG_PATH+"attack/2.png"},
		{name:"effect02",path:LMvc.IMG_PATH+"effect/effect02.png"},
		{name:"world_bg",path:LMvc.IMG_PATH+"sub_map/world_bg.jpg"}
	];
	return list;
};
Tutorial03Model.prototype.getTalkMessage=function(){
	var self = this,result,list = [
		{index:0,sub_index:1,message:"快看，那边好像发生了战事。"},
		{index:"player",sub_index:1,message:"嗯，好像是官兵强盗正在激战。"},
		{index:0,sub_index:1,message:"不好了，强盗兵力太强了，这样下去的话，官兵很快就被打败了。"},
		{index:"player",sub_index:1,message:"我们赶快过去帮忙吧，从后面向强盗进行攻击。"}
	];
	if(self.talkIndex < list.length){
		result = list[self.talkIndex];
	}
	self.talkIndex++;
	return result;
};
Tutorial03Model.prototype.setAttackShowOver=function(callback){
	var self = this;
	if(self.local){
		MyModel.prototype.textTutorialStep = MyModel.prototype.textTutorialStep+1;
		callback.apply(self.controller,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"tutorial/update",{step:4},function(data){
		if(data.result == "yes"){
			callback.apply(self.controller,[true,null]);
		}else{
			callback.apply(self.controller,[false,data.error]);
		}
	});
};