function MyModel(controller){
	var self = this;
	base(self,LModel,[controller]);
	self.API_URL = "";
	self.local = true;
}
MyModel.prototype.textTutorialStep = 1;
MyModel.prototype.construct=function(){
};
MyModel.prototype.post=function(url,params,callback){
	var self = this;
	console.log(self.API_URL+url,params);
	LAjax.post(self.API_URL+url,params,function(data){
		console.log("api = ",data);
		try{
			callback.apply(self,[JSON.parse(data)]);
		}catch(e){
			throw "the result must be json";
		}
	});
};
MyModel.prototype.get=function(url,params,callback){
	var self = this;
	LAjax.get(self.API_URL+url,params,function(data){
		try{
			callback.apply(self,[JSON.parse(data)]);
		}catch(e){
			throw "the result must be json";
		}
	});
};
MyModel.prototype.getTutorialStep=function(callback){
	var self = this;
	if(self.local){
		callback.apply(self.controller,[MyModel.prototype.textTutorialStep]);
		return;
	}
	self.post(LMvc.API_PATH+"tutorial/index",{},function(data){
		LMvc.tutorialIndex = data.step;
		callback.apply(self.controller,[data.step]);
	});
};
MyModel.prototype.getStatus=function(callback){
	var self = this;
	if(self.local){
		self.userStatus = {
			face:1,name:"lufy",gold:20,silver:100,food:150,wood:250,iron:140
		};
		/*var data = {"result":"invalid","error":"\u30ed\u30b0\u30a4\u30f3\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f"};
		if(data.result == "invalid"){
			self.userStatus = null;
		}else{
			self.userStatus = data.status;
		}*/
		callback.apply(self.controller,[]);
		return;
	}
	self.post(LMvc.API_PATH+"users/auth",{},function(data){
		if(data.result == "invalid"){
			self.userStatus = null;
		}else{
			self.userStatus = data.status;
		}
		
		callback.apply(self.controller,[]);
	});
};