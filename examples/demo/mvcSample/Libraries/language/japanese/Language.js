function Language(){
	var self = this;
	self.data = LMvc.datalist["language"];
	delete LMvc.datalist["language"];
}
Language.get = function(key){
	return Language.data[key];
};
Language.set = function(key,value){
	Language.data[key] = value;
};
Language.data = {
	"official":"官府",
	"tavern":"酒馆",
	"shop":"商店",
	"citygateOut":"城外",
	"trainingGround":"训练场",
	"yuanbao":"元宝",
	"money":"银两",
	"junling":"军令",
	"send":"发送"
};
