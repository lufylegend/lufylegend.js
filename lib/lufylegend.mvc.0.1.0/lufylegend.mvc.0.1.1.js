var LMvc = {
	JS_PATH:"",
	IMG_PATH:"",
	MVC_PATH:"",
	API_PATH:"",
	SOUND_PATH:"",
	loadingLock:false,
	layer:null,
	loading:null,
	datalist:null
};
LMvc.loadClass = function(name,callback,lastClass){
	if(typeof window[name+"Controller"] == "function"){
		callback.apply(lastClass,[]);
		return;
	}
	LMvc.loading.visible = true;
	var loader = new LMvcLoader();
	loader.controller(name,function(){
		loader.model(name,function(){
			loader.view(name,function(){
				callback.apply(lastClass,[]);
				if(!LMvc.loadingLock)LMvc.loading.visible = false;
			});
		});
	});
};
LMvc.init = function(){
	LMvc.layer = new LSprite();
	addChild(LMvc.layer);
	LMvc.loading = new LoadingSample5();
	LMvc.loading.alpha = 0.5;
	addChild(LMvc.loading);
	LMvc.loading.visible = false;
	LMvc.loadClass("Index",function(){
		LMvc.loading.visible = true;
		var controller = new IndexController();
		LMvc.loading.visible = false;
	});
};
LMvc.keepLoading = function(value){
	LMvc.loadingLock = LMvc.loading.visible = value;
};
function LMvcLoader(controller){
	this.controllerClass = controller;
}
LMvcLoader.prototype={
	controller:function(names,callback){
		var self = this;
		self.loadJs("Controllers","Controller",names,callback);
	},
	model:function(names,callback){
		var self = this;
		self.loadJs("Models","Model",names,callback);
	},
	view:function(names,callback){
		var self = this;
		self.loadJs("Views","View",names,callback);
	},
	image:function(loadData,callback){
		var self = this;
		LMvc.loading.visible = true;
		LLoadManage.load(
			loadData,function(progress){
				LMvc.loading.visible = true;
				LMvc.loading.setProgress(progress);
			},
			function(result){
				for(var k in result){
					LMvc.datalist[k] = result[k];
				}
				callback.apply(self.controllerClass,[]);
				if(!LMvc.loadingLock)LMvc.loading.visible = false;
			}
		);
	},
	library:function(names,callback){
		var self = this;
		self.loadJs("Libraries",null,names,callback);
	},
	helper:function(names,callback){
		var self = this;
		self.loadJs("Helpers",null,names,callback);
	},
	loadJs:function(type,classType,names,callback){
		var self = this,list=[],i,l;
		if(typeof names == "string")names = [names];
		for(i=0,l=names.length;i<l;i++){
			list.push({path:LMvc.MVC_PATH+type+"/"+names[i]+(classType?classType:"")+".js",type:"js"});
		}
		LMvc.loading.visible = true;
		LLoadManage.load(
			list,function(progress){
				LMvc.loading.visible = true;
				LMvc.loading.setProgress(progress);
			},
			function(result){
				if(result>0){
					for(var k in result){
						LMvc.datalist[k] = result[k];
					}
				}
				callback.apply(self.controllerClass,[]);
				if(!LMvc.loadingLock)LMvc.loading.visible = false;
			}
		);
	}
};
function LMvcObject(){
}
LMvcObject.prototype={
	construct:function(){
	},
	loadMvc:function(name,callback){
		var self = this;
		LMvc.loadClass.apply(self,[name,callback,self]);
	}
};
function LController(){
	var self = this;
	self.mvcType = "controller";
	base(self,LMvcObject,[]);
	var conName = self.constructor.name,length = conName.length;name = conName.substr(0,length - 10);
	self.load = new LMvcLoader(self);
	self.model = eval("new "+name+"Model");
	self.view = eval("new "+name+"View");
	self.model.controller = self;
	self.model.view = self.view;
	self.view.controller = self;
	self.view.model = self.model;
	self.model.construct();
	self.view.construct();
	self.construct();
}

function LModel(){
	var self = this;
	self.mvcType = "model";
	base(self,LMvcObject,[]);
}
function LView(){
	var self = this;
	self.mvcType = "view";
	base(self,LMvcObject,[]);
	base(self,LSprite,[]);
}