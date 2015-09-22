function LRequestLocal(controller,action,params,callback){

	switch(controller){
		case "master":
			LRequestMasterLocal(action,params,callback);
			break;
		case "user":
			LRequestUserLocal(action,params,callback);
			break;
		case "character":
			LRequestCharacterLocal(action,params,callback);
			break;
		case "item":
			LRequestItemLocal(action,params,callback);
			break;
		case "quest":
			LRequestQuestLocal(action,params,callback);
			break;
		case "equipment":
			LRequestEquipmentLocal(action,params,callback);
			break;
	}
}
//quest
function LRequestQuestLocal(action,params,callback){
	switch(action){
		case "chapter_list":
			LRequestQuestChapterListLocal(params,callback);
			break;
		case "area_list":
			LRequestQuestAreaListLocal(params,callback);
			break;
		case "stage_list":
			LRequestQuestStageListLocal(params,callback);
			break;
	}
}
function LRequestQuestChapterListLocal(params,callback){
	var obj = {"result":1,"data":{"chapters":[{"id":"11","star":0},{"id":"12","star":0}],"now":"2015-04-26 23:10:44"}};
	callback(obj.data);
}
function LRequestQuestAreaListLocal(params,callback){
	var obj = {"result":1,"data":{"areas":[{"id":"1101","star":"0"},{"id":"1102","star":"0"}],"now":"2015-04-26 23:13:30"}};
	callback(obj.data);
}
function LRequestQuestStageListLocal(params,callback){
	var obj = {"result":1,"data":{"stages":[{"id":"1101001","star":"0"},{"id":"1101002","star":"0"}],"area_reward":[{"item_id":"1"},{"item_id":"2"}],"now":"2015-04-26 23:12:09"}};
	callback(obj.data);
}
//character
function LRequestCharacterLocal(action,params,callback){
	switch(action){
		case "get":
			LRequestCharacterGetLocal(params,callback);
			break;
	}
}
function LRequestCharacterGetLocal(params,callback){
	var obj = {"result":1,"data":{"characters":[{"id":"24","character_id":"51","exp":"0","level":"1","star":"1","skill_levels":"[2, 0, 0, 0, 0]","equipments":[{"id":"5","equipment_id":"2"},{"id":"4","equipment_id":"3"}]},{"id":"25","character_id":"52","exp":"0","level":"1","star":"1","skill_levels":"[1, 0, 0, 0, 0]","equipments":[{"id":"1","equipment_id":"1"}]}],"now":"2015-04-26 22:27:52"}};
	callback(obj.data);
}
//user
function LRequestUserLocal(action,params,callback){
	switch(action){
		case "login":
			LRequestUserLoginLocal(params,callback);
			break;
	}
}
function LRequestUserRegisterLocal(params,callback){
	var obj = {"result":1,"data":{"user":{"id":"1","name":"aaa","nickname":"aaa","level":"1","gold":"6000","silver":"800","junling":"10"},"versions":[{"name":"character","ver":"14"},{"name":"character_star","ver":"2"},{"name":"equipment","ver":"9"},{"name":"exp","ver":"2"},{"name":"growing","ver":"2"},{"name":"item","ver":"9"},{"name":"skill","ver":"2"}],"ssid":"5e80027bf73c04989ade9c174d887754","now":"2015-04-26 07:13:40"}};
	callback(obj.data);
}
function LRequestUserLoginLocal(params,callback){
	var obj = {"result":1,"data":{"user":{"id":"1","name":"aaa","nickname":"aaa","level":"1","gold":"6000","silver":"800","junling":"10"},"versions":[{"name":"character","ver":"14"},{"name":"character_star","ver":"2"},{"name":"equipment","ver":"9"},{"name":"exp","ver":"2"},{"name":"growing","ver":"2"},{"name":"item","ver":"9"},{"name":"skill","ver":"2"}],"ssid":"5e80027bf73c04989ade9c174d887754","now":"2015-04-26 07:13:40"}};
	callback(obj.data);
}
//item
function LRequestItemLocal(action,params,callback){
	switch(action){
		case "item_list":
			LRequestItemItemListLocal(params,callback);
			break;
		case "sale":
			LRequestItemSaleLocal(params,callback);
			break;
		case "use_item":
			LRequestItemUseLocal(params,callback);
			break;
	}
}
function LRequestItemItemListLocal(params,callback){
	var obj = {"result":1,"data":{"items":[{"item_id":"1","cnt":"2"},{"item_id":"2","cnt":"330"}],"now":"2015-04-26 22:15:43"}};
	callback(obj.data);
}
function LRequestItemSaleLocal(params,callback){
	var obj = {"result":1,"data":{"items":[{"item_id":"1","cnt":"8"},{"item_id":"2","cnt":"330"}],"user":{"id":"1","name":"aaa","nickname":"aaa","level":"1","gold":"6000","silver":"900","junling":"10"},"now":"2015-04-26 22:21:55"}};
	callback(obj.data);
}
function LRequestItemUseLocal(params,callback){
	LRequestItem("use_item",params,callback);
}
//Equipment
function LRequestEquipmentLocal(action,params,callback){
	switch(action){
		case "equipment_list":
			LRequestEquipmentListLocal(params,callback);
			break;
		case "sale":
			LRequestEquipmentSaleLocal(params,callback);
			break;
		case "equip":
			LRequestEquipmentEquipLocal(params,callback);
			break;
	}
}
function LRequestEquipmentListLocal(params,callback){
	var obj = {"result":1,"data":{"equipments":[{"id":"3","character_id":"0","equipment_id":"1"},{"id":"2","character_id":"0","equipment_id":"2"},{"id":"5","character_id":"51","equipment_id":"2"},{"id":"4","character_id":"51","equipment_id":"3"},{"id":"1","character_id":"52","equipment_id":"1"}],"now":"2015-04-26 22:12:22"}};
	callback(obj.data);
}
function LRequestEquipmentSaleLocal(params,callback){
	
}
function LRequestEquipmentEquipLocal(params,callback){
	var obj = {"result":1,"data":{"characters":[{"id":"24","character_id":"51","exp":"0","level":"1","star":"4","skill_levels":"[2, 0, 0, 0, 0]","equipments":[{"id":"5","equipment_id":"2"},{"id":"4","equipment_id":"3"}]}],"now":"2015-04-26 22:13:28"}};
	callback(obj.data);
}

//master
function LRequestMasterLocal(action,params,callback){
	switch(action){
		case "all":
			LRequestMasterAllLocal(params,callback);
			break;
	}
}
function LRequestMasterAllLocal(params,callback){

	var obj = {"result":1,"data":{"master_data":{
	"chapter":[{"id":"11"},{"id":"12"}],
	"area":[{"id":"1101","chapter_id":"11","img":"1","x":"50","y":"50"},{"id":"1102","chapter_id":"11","img":"1","x":"300","y":"300"}],
	"stage":[{"id":"1101001","area_id":"1101","characters":[{"id":"1","character_id":"51","index":"1","star":"1","level":"1"},{"id":"2","character_id":"52","index":"2","star":"1","level":"1"},{"id":"3","character_id":"53","index":"3","star":"1","level":"1"}],"items":[{"item_id":"1"},{"item_id":"2"}]},{"id":"1101002","area_id":"1101","characters":[{"id":"4","character_id":"51","index":"1","star":"1","level":"1"},{"id":"5","character_id":"52","index":"2","star":"1","level":"1"},{"id":"6","character_id":"53","index":"3","star":"1","level":"1"}],"items":null}],
	"character":[
	{"id":"1","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"1","faceImg":"1","minFace":"[0,0,60,60]","actions":"bu_dao","soldiers":"[]","lineups":"[]","skills":"[0, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},
	{"id":"2","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"2","faceImg":"1","minFace":"[0,60,60,60]","actions":"qi_dao","soldiers":"[]","lineups":"[]","skills":"[0, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},
	{"id":"3","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"3","faceImg":"1","minFace":"[0,120,60,60]","actions":"bu_qiang","soldiers":"[]","lineups":"[]","skills":"[0, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},{"id":"4","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"1","faceImg":"1","minFace":"[0,180,60,60]","actions":"qi_qiang","soldiers":"[]","lineups":"[]","skills":"[0, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},{"id":"5","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"1","faceImg":"1","minFace":"[0,240,60,60]","actions":"bu_gong","soldiers":"[]","lineups":"[]","skills":"[0, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},{"id":"6","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"1","faceImg":"1","minFace":"[0,300,60,60]","actions":"qi_gong","soldiers":"[]","lineups":"[]","skills":"[0, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},{"id":"51","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"2","faceImg":"6","minFace":"[0,23,151,151]","actions":"bu_qiang","soldiers":"[1]","lineups":"[1]","skills":"[1, 2, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},{"id":"52","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"1","faceImg":"3","minFace":"[19,39,110,110]","actions":"qi_qiang","soldiers":"[2]","lineups":"[2]","skills":"[2, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"},{"id":"53","arms":"0","armsKind":"1","cost":"10","five":"1","start_star":"1","faceImg":"4","minFace":"[49,64,100,100]","actions":"bu_gong","soldiers":"[3]","lineups":"[3]","skills":"[1, 0, 0, 0, 0]","initialHp":"100","initialAttack":"20","initialMagic":"20","initialDef":"20","initialMagicDef":"20","initialSpeed":"50","initialDodge":"20","initialBreakout":"20"}],
	"character_star":[{"grade":"1","star":"1","cost":"30"},{"grade":"2","star":"2","cost":"50"},{"grade":"3","star":"3","cost":"80"},{"grade":"4","star":"4","cost":"100"},{"grade":"5","star":"5","cost":"130"},{"grade":"6","star":"6","cost":"150"},{"grade":"7","star":"7","cost":"200"}],"item":[{"id":"1","name":"jingyanguo","type":"exp","child_id":"1","price":"100","explanation":"explanation_jingyanguo"},{"id":"2","name":"yuanshen_suipian","type":"character_fragment","child_id":"51","price":"200","explanation":"explanation_yuanshen_suipian"},{"id":"3","name":"yuanshen","type":"character_stone","child_id":"51","price":"5000","explanation":"explanation_yuanshen"},{"id":"4","name":"yuanshen","type":"character_stone","child_id":"52","price":"5000","explanation":"explanation_yuanshen"}],"exp":[{"id":"1","value":"30"},{"id":"2","value":"300"},{"id":"3","value":"30"},{"id":"4","value":"100"}],"growing":[{"id":"1","character_id":"1","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"2","character_id":"1","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"3","character_id":"1","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"4","character_id":"1","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"5","character_id":"1","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"6","character_id":"1","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"7","character_id":"1","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"8","character_id":"2","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"9","character_id":"2","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"10","character_id":"2","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"11","character_id":"2","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"12","character_id":"2","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"13","character_id":"2","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"14","character_id":"2","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"15","character_id":"3","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"16","character_id":"3","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"17","character_id":"3","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"18","character_id":"3","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"19","character_id":"3","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"20","character_id":"3","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"21","character_id":"3","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"22","character_id":"4","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"23","character_id":"4","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"24","character_id":"4","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"25","character_id":"4","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"26","character_id":"4","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"27","character_id":"4","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"28","character_id":"4","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"29","character_id":"5","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"30","character_id":"5","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"31","character_id":"5","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"32","character_id":"5","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"33","character_id":"5","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"34","character_id":"5","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"35","character_id":"5","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"36","character_id":"6","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"37","character_id":"6","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"38","character_id":"6","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"39","character_id":"6","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"40","character_id":"6","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"41","character_id":"6","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"42","character_id":"6","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"43","character_id":"51","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"44","character_id":"51","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"45","character_id":"51","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"46","character_id":"51","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"47","character_id":"51","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"48","character_id":"51","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"49","character_id":"51","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"50","character_id":"52","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"51","character_id":"52","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"52","character_id":"52","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"53","character_id":"52","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"54","character_id":"52","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"55","character_id":"52","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"56","character_id":"52","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"57","character_id":"53","star":"1","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"58","character_id":"53","star":"2","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"59","character_id":"53","star":"3","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"60","character_id":"53","star":"4","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"61","character_id":"53","star":"5","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"62","character_id":"53","star":"6","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"},{"id":"63","character_id":"53","star":"7","strength":"10","force":"10","strategy":"30","command":"20","intelligence":"27","agility":"20"}],"equipment":[{"id":"1","arms":"[1,2,3,4,5,6]","level":"1","star":"1","position":"1","img":"1","explanation":"null","five1":"0","five2":"0","five3":"0","five4":"0","five5":"0","hp":"0","attack":"5","magic":"0","def":"0","magicDef":"0","speed":"0","dodge":"0","breakout":"0","strength":"0","force":"0","strategy":"0","command":"0","intelligence":"0","agility":"0"},{"id":"2","arms":"[1,2,3,4,5,6]","level":"1","star":"1","position":"0","img":"1","explanation":"null","five1":"0","five2":"0","five3":"0","five4":"0","five5":"0","hp":"0","attack":"0","magic":"0","def":"0","magicDef":"30","speed":"0","dodge":"0","breakout":"0","strength":"0","force":"0","strategy":"0","command":"0","intelligence":"0","agility":"0"},{"id":"3","arms":"[1,2,3,4,5,6]","level":"1","star":"1","position":"2","img":"1","explanation":"null","five1":"0","five2":"0","five3":"0","five4":"0","five5":"0","hp":"0","attack":"0","magic":"0","def":"40","magicDef":"0","speed":"0","dodge":"0","breakout":"0","strength":"0","force":"0","strategy":"0","command":"0","intelligence":"0","agility":"0"}],"skill":[{"id":"1","five":"0"},{"id":"2","five":"1"}]},"now":"2015-04-26 07:51:53"}};
	
	callback(obj.data);
}