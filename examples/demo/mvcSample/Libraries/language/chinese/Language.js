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
	"send":"发送",
	
	"tab_equipment":"装备",
	"tab_skill":"技能",
	"tab_arms":"兵种",
	"tab_lineups":"阵型",
	"tab_status":"属性",
	
	"attack":"物攻",
	"defense":"物防",
	"magicAttack":"法攻",
	"magicDefense":"法防",
	"speed":"速度",
	"dodge":"躲闪",
	"breakout":"爆发",
	"cost":"召唤",
	"force":"武力",
	"strategy":"谋略",
	"command":"统率",
	"intelligence":"智力",
	"agility":"敏捷",
	
	"label_equip":"装备",
	"label_use":"使用",
	"label_sale":"出售",
	
	"character_name_1":"刀步兵",
	"character_name_2":"刀骑兵",
	"character_name_3":"枪步兵",
	"character_name_4":"枪骑兵",
	"character_name_5":"弓步兵",
	"character_name_6":"弓骑兵",
	"character_name_51":"崇侯虎",
	"character_name_52":"崇应彪",
	"character_name_53":"崇黑虎",
	
	"equipment_name_1":"木剑",
	"equipment_name_2":"布帽",
	"equipment_name_3":"布衣",
	
	"chapter_name_11":"冀州苏户反商",
	"chapter_name_12":"兵伐崇侯虎",
	
	"area_name_1101":"冀州",
	"area_name_1102":"冀州2",
	
	"stage_name_1101001":"一战崇黑虎",
	"stage_name_1101002":"二战崇黑虎",
	
	"jingyanguo":"经验果",
	"explanation_jingyanguo":"可以用来提升英雄的经验。",
	"yuanshen_suipian":"元神碎片",
	"explanation_yuanshen_suipian":"元神碎片可以用来合成元神，或者提升英雄的能力。",
	"yuanshen":"元神",
	"explanation_yuanshen":"此元神可以用来兑换英雄[{0}]。",
	
	"null":"无",
	
	"gameover":"游戏结束"
};
