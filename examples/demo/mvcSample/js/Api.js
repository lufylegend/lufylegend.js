function SetData(key,data){
	window.localStorage.setItem(key, JSON.stringify(data));
}
function GetData(key){
	var data = window.localStorage.getItem(key);
	if(!data){
		return null;
	}
	return JSON.parse(data);
}
function LRequest(controller,action,params,callback){
	var protocol = location.protocol;
	if (false && (protocol == "http:" || protocol == "https:")) {
		LAPI = "api.php";
		LAjax.responseType = LAjax.JSON;
		if(LMvc.ssid)params["ssid"] = LMvc.ssid;
		LAjax.post(LAPI + "?controller=" + controller + "&action=" + action, params, function(responseData){
			if(responseData.result){
				callback(responseData.data);
			}else{
				alert("error"+responseData.data.message);
			}
		});
	}else{
		//测试
		LRequestLocal(controller,action,params,callback);
	}
}
//master
function LRequestMaster(action,params,callback){
	LRequest("master",action,params,callback);
}
function LRequestMasterAll(params,callback){
	LRequestMaster("all",params,callback);
}
//character
function LRequestCharacter(action,params,callback){
	LRequest("character",action,params,callback);
}
function LRequestCharacterGet(params,callback){
	LRequestCharacter("get",params,callback);
}
//user
function LRequestUser(action,params,callback){
	LRequest("user",action,params,callback);
}
function LRequestUserRegister(params,callback){
	LRequestUser("register",params,callback);
}
function LRequestUserLogin(params,callback){
	LRequestUser("login",params,callback);
}
//quest
function LRequestQuest(action,params,callback){
	LRequest("quest",action,params,callback);
}
function LRequestQuestChapterList(params,callback){
	LRequestQuest("chapter_list",params,callback);
}
function LRequestQuestAreaList(params,callback){
	LRequestQuest("area_list",params,callback);
}
function LRequestQuestStageList(params,callback){
	LRequestQuest("stage_list",params,callback);
}
//item
function LRequestItem(action,params,callback){
	LRequest("item",action,params,callback);
}
function LRequestItemItemList(params,callback){
	LRequestItem("item_list",params,callback);
}
function LRequestItemSale(params,callback){
	LRequestItem("sale",params,callback);
}
function LRequestItemUse(params,callback){
	LRequestItem("use_item",params,callback);
}
//Equipment
function LRequestEquipment(action,params,callback){
	LRequest("equipment",action,params,callback);
}
function LRequestEquipmentList(params,callback){
	LRequestEquipment("equipment_list",params,callback);
}
function LRequestEquipmentSale(params,callback){
	LRequestEquipment("sale",params,callback);
}
function LRequestEquipmentEquip(params,callback){
	LRequestEquipment("equip",params,callback);
}
