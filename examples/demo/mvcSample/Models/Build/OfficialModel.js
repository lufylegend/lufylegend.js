function OfficialModel(){
	base(this,MyModel,[]);
}
OfficialModel.prototype.getCommonImages=function(){
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
OfficialModel.prototype.getBuild=function(callback){
	var self = this;
	if(self.local){
		var data = {"City":{"id":"1","type":"main","name":"\u4e3b\u57ce","initial":"0",level:1},
		"CityLevel":{"id":"1","city_id":"1","add":"0","upgrade":"50","level":null,"gold":"0","silver":"1000","wood":"400","iron":"400","food":"200","troops":null,"frozen":"1800",battle:18},
		"CityStatus":{"main":0,"main_level":1,"wood":0,"wood_level":1,"iron":0,"iron_level":1,"food":0,"food_level":1,"troops":0,"troops_level":1,"warehouse":0,"warehouse_level":1,"remain":0,"remain_level":1}
		};
		data = {"name":"\u4e3b\u57ce","type":"main","id":"75","user_id":"21","level":1,"upgraded":"2013-11-20 11:55:05",
		"current_value":1,"battle":2000,"value":0,"ability_wood":400,"ability_iron":400,"ability_food":200,"ability_troops":0,"cost_gold":0,"cost_silver":1000,
		"cost_wood":400,"cost_iron":400,"cost_food":200,"cost_troops":0,"next_level":2,"next_value":0,"next_upgrade":"2013-11-20 11:55:15"};
		self.data = data;
		callback.apply(self.controller,[]);
		return;
	}
	self.post(LMvc.API_PATH+"build",{type:"main"},function(data){
		self.data = data;
		console.log("OfficialModel.prototype.getBuild=",self.data);
		callback.apply(self.controller,[]);
	});
};
OfficialModel.prototype.lvUp=function(callback){
	var self = this;
	if(self.local){
		MyModel.prototype.textTutorialStep = MyModel.prototype.textTutorialStep+1;
		callback.apply(self.controller,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"build/update",{type:"main"},function(data){
		if(data.result == "yes"){
			callback.apply(self.controller,[true,null]);
		}else{
			callback.apply(self.controller,[false,data.error]);
		}
	});
};