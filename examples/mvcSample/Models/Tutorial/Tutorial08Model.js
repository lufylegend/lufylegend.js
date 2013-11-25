function Tutorial08Model(){
	base(this,MyModel,[]);
}
Tutorial08Model.prototype.construct=function(){
	var self = this;
	self.arms = [
	{id:0,index:2,action:"down_stand",x:100,y:180},
	{id:1,index:2,action:"down_stand",x:200,y:180},
	{id:2,index:2,action:"down_stand",x:300,y:180},
	{id:3,index:2,action:"down_stand",x:200,y:240},
	{id:4,index:2,action:"down_stand",x:200,y:300},
	{id:5,index:4,action:"up_stand",x:100,y:480},
	{id:6,index:2,action:"up_stand",x:200,y:480},
	{id:7,index:3,action:"up_stand",x:200,y:540},
	{id:8,index:1,action:"up_stand",x:300,y:480},
	{id:9,index:5,action:"up_stand",x:200,y:420}
	];
	
	self.actions = [
	{type:"action",chara:[{index:1,action:"down_attack"}]},
	{type:"action",chara:[{index:1,action:"down_stand"}]},
	{type:"effect",effect:"Effect02",chara:6},
	{type:"action",chara:[{index:6,action:"hert",num:100}]},
	{type:"action",chara:[{index:6,action:"up_stand"}]},

	{type:"action",chara:[{index:5,action:"up_attack"}]},
	{type:"action",chara:[{index:5,action:"up_stand"}]},
	{type:"effect",effect:"Effect02",chara:3},
	{type:"action",chara:[{index:3,action:"hert",num:100}]},
	{type:"action",chara:[{index:3,action:"down_stand"}]},
	
	{type:"action",chara:[{index:4,action:"down_attack"}]},
	{type:"action",chara:[{index:4,action:"down_stand"}]},
	{type:"effect",effect:"Effect02",chara:7},
	{type:"action",chara:[{index:7,action:"hert",num:100}]},
	{type:"action",chara:[{index:7,action:"up_stand"}]},
	
	
	{type:"action",chara:[{index:8,action:"up_attack"}]},
	{type:"action",chara:[{index:8,action:"up_stand"}]},
	{type:"action",chara:[{index:8,action:"up_attack"}]},
	{type:"action",chara:[{index:8,action:"up_stand"}]},
	{type:"effect",effect:"Qinglong",chara:3},
	{type:"action",chara:[{index:1,action:"hert",num:870},{index:2,action:"hert",num:870},{index:3,action:"hert",num:870},{index:4,action:"hert",num:870},{index:0,action:"hert",num:870}]},
	
	
	{type:"action",chara:[{index:1,action:"down_stand"},{index:2,action:"down_stand"},{index:3,action:"down_stand"},{index:4,action:"down_stand"},{index:0,action:"down_stand"}]},
	
	{type:"action",chara:[{index:9,action:"up_attack"}]},
	{type:"action",chara:[{index:9,action:"up_stand"}]},
	{type:"action",chara:[{index:9,action:"up_attack"}]},
	{type:"action",chara:[{index:9,action:"up_stand"}]},
	{type:"effect",effect:"Baihu",chara:3},
	{type:"action",chara:[{index:1,action:"hert",num:870},{index:2,action:"hert",num:870},{index:3,action:"hert",num:870},{index:4,action:"hert",num:870},{index:0,action:"hert",num:870}]},
	
	{type:"action",chara:[{index:1,action:"down_stand"},{index:2,action:"down_stand"},{index:3,action:"down_stand"},{index:4,action:"down_stand"},{index:0,action:"down_stand"}]},
	
	{type:"die",chara:[{index:1},{index:2},{index:3},{index:4},{index:0}]},
	{type:"over",result:1}
	];
	
	
	self.actionIndex = 0;
};
Tutorial08Model.prototype.getImages=function(){
	var i,list = [
		{name:"attack_back",path:LMvc.IMG_PATH+"attack/attack_back.png"},
		{name:"effect01",path:LMvc.IMG_PATH+"effect/effect01.png"},
		{name:"effect02",path:LMvc.IMG_PATH+"effect/effect02.png"}
	];
	for(i=1;i<=21;i++){
		list.push({name:"qinglong-"+i,path:LMvc.IMG_PATH+"effect/qinglong/"+i+"-1.png"});
	}
	for(i=1;i<=32;i++){
		list.push({name:"baihu-"+i,path:LMvc.IMG_PATH+"effect/baihu/"+i+"-1.png"});
	}
	return list;
};
Tutorial08Model.prototype.getCharaList=function(){
	var self = this;
	return self.arms;
};
Tutorial08Model.prototype.getAction=function(){
	var self = this;
	if(self.actionIndex > self.actions.length){
		return null;
	}
	
	var action = self.actions[self.actionIndex];
	self.actionIndex++;
	return action;
};

Tutorial08Model.prototype.toAttack=function(callback){
	var self = this;
	if(self.local){
		MyModel.prototype.textTutorialStep = MyModel.prototype.textTutorialStep+1;
		callback.apply(self.controller,[true]);
		return;
	}
	self.post(LMvc.API_PATH+"tutorial/update",{step:9},function(data){
		if(data.result == "yes"){
			callback.apply(self.controller,[true,null]);
		}else{
			callback.apply(self.controller,[false,data.error]);
		}
	});
};