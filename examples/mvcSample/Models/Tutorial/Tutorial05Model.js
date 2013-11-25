function Tutorial05Model(){
	base(this,MyModel,[]);
}
Tutorial05Model.prototype.construct=function(){
	var self = this;
	self.talkIndex = 0;
};
Tutorial05Model.prototype.getImages=function(){console.log("Tutorial05Model.prototype.getImages");
	var list = [
		{name:"background",path:LMvc.IMG_PATH+"main/background.png"},
		{name:"build_bingying",path:LMvc.IMG_PATH+"main/build_bingying.png"},
		{name:"build_cangku",path:LMvc.IMG_PATH+"main/build_cangku.png"},
		{name:"build_chengmen",path:LMvc.IMG_PATH+"main/build_chengmen.png"},
		{name:"build_gacha",path:LMvc.IMG_PATH+"main/build_gacha.png"},
		{name:"build_guanfu",path:LMvc.IMG_PATH+"main/build_guanfu.png"},
		{name:"build_jiuguan",path:LMvc.IMG_PATH+"main/build_jiuguan.png"},
		{name:"build_shichang",path:LMvc.IMG_PATH+"main/build_shichang.png"},
		{name:"build_taixueyuan",path:LMvc.IMG_PATH+"main/build_taixueyuan.png"},
		{name:"build_tiechang",path:LMvc.IMG_PATH+"main/build_tiechang.png"},
		{name:"build_tunsuo",path:LMvc.IMG_PATH+"main/build_tunsuo.png"},
		{name:"statusBack",path:LMvc.IMG_PATH+"main/statusBack.png"},
		{name:"icon_gold",path:LMvc.IMG_PATH+"main/icon_gold.png"},
		{name:"icon_silver",path:LMvc.IMG_PATH+"main/icon_silver.png"},
		{name:"icon_food",path:LMvc.IMG_PATH+"main/icon_food.png"},
		{name:"icon_wood",path:LMvc.IMG_PATH+"main/icon_wood.png"},
		{name:"icon_iron",path:LMvc.IMG_PATH+"main/icon_iron.png"}
	];
	return list;
};
Tutorial05Model.prototype.getCloudsPath = function(){
	return "common/domestic_clouds.png";
};
Tutorial05Model.prototype.getBuildList = function(){
	var self = this;
	var buildList = [
	{rect:new LRectangle(540,45,120,120),path:"main/build_guanfu.png",point:new LPoint(530,42),name:"官府",type:"main",lv:1,clickMode:false},
	{rect:new LRectangle(200,42,100,70),path:"main/build_shichang.png",point:new LPoint(200,42),name:"市場",type:"shichang",lv:-1,clickMode:false},
	{rect:new LRectangle(50,100,100,70),path:"main/build_gacha.png",point:new LPoint(40,100),name:"占星台",type:"zhanxingtai",lv:-1,clickMode:false},
	{rect:new LRectangle(140,190,100,70),path:"main/build_taixueyuan.png",point:new LPoint(140,190),name:"技術所",type:"jishusuo",lv:-1,clickMode:false},
	{rect:new LRectangle(280,130,90,70),path:"main/build_jiuguan.png",point:new LPoint(280,130),name:"酒館",type:"jiuguan",lv:-1,clickMode:true},
	{rect:new LRectangle(400,230,90,70),path:"main/build_cangku.png",point:new LPoint(390,230),name:"倉庫",type:"warehouse",lv:1,clickMode:false},
	{rect:new LRectangle(415,330,90,70),path:"main/build_tunsuo.png",point:new LPoint(410,330),name:"屯所",type:"remain",lv:1,clickMode:false},
	{rect:new LRectangle(560,220,100,60),path:"main/build_tiechang.png",point:new LPoint(560,220),name:"鉄場",type:"iron",lv:1,clickMode:false},
	{rect:new LRectangle(600,300,100,80),path:"main/build_nongchang.png",point:new LPoint(600,300),name:"农場",type:"food",lv:1,clickMode:false},
	{rect:new LRectangle(560,400,100,80),path:"main/build_nongchang.png",point:new LPoint(560,400),name:"木場",type:"wood",lv:1,clickMode:false},
	{rect:new LRectangle(150,380,100,70),path:"main/build_bingying.png",point:new LPoint(150,380),name:"兵営",type:"troops",lv:1,clickMode:false},
	{rect:new LRectangle(60,470,160,130),path:"main/build_chengmen.png",point:new LPoint(0,450),name:"城門",type:"chengmen",lv:1,clickMode:false}
	];
	return buildList;
};