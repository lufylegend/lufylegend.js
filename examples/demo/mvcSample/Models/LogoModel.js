function LogoModel(){
	base(this,MyModel,[]);
}
LogoModel.prototype.construct=function(){
};
LogoModel.prototype.getBackMusic=function(){
	return LMvc.SOUND_PATH+"M03.mp3";
};
LogoModel.prototype.getCommonImages=function(){
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
LogoModel.prototype.login=function(name,pass,callback){
	var self = this;
	if(self.local){
		callback.apply(self,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"users/login",{name:name,pass:pass},function(data){
		if(data.result == "valid"){
			callback.apply(self,[true,null]);
		}else{
			callback.apply(self,[false,data.error]);
		}
	});
};
LogoModel.prototype.insert=function(name,pass,callback){
	var self = this;
	if(self.local){
		callback.apply(self,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"users/register",{name:name,pass:pass},function(data){
		if(data.result == "valid"){
			callback.apply(self,[true,null]);
		}else{
			callback.apply(self,[false,data.error]);
		}
	});
};
