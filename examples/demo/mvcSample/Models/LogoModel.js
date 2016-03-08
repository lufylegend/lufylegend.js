function LogoModel(){
	base(this,MyModel,[]);
}
LogoModel.prototype.construct=function(){
};
LogoModel.prototype.getImages=function(){
	var list = [
		{name:"icon-star",path:LMvc.IMG_PATH+"icon/star.png"},
		{name:"common-black",path:LMvc.IMG_PATH+"common/black.png"},
		{name:"translucent",path:LMvc.IMG_PATH+"common/translucent.png"},
		{name:"inputbox",path:LMvc.IMG_PATH+"logo/inputbox.png"},
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"face-background",path:LMvc.IMG_PATH+"face/background.png"}
	];
	return list;
};
LogoModel.prototype.getBackMusic=function(){
	return LMvc.SOUND_PATH+"M03.mp3";
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
