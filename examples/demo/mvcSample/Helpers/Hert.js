//兵种相克 0.8 - 1.2
//物理攻击 骑兵克步兵 攻击加强 +1.1
//法术攻击 步兵克骑兵 攻击加强 +1.1
//金0木1水2火3土4 顺序循环相克
//阵法相克
function NormalHert(characterModel, targetModel) {
	var r;
	var lv = characterModel.level();
	var atk = characterModel.attack();
	var del = targetModel.defense();

	if (atk > del) {
		r = lv + 25 + (atk - del) / 2;
	} else {
		r = lv + 25 - (del - atk) / 2;
	}
	var restraint = BattleModel.armsRestraint[characterModel.arms() + "-" + targetModel.arms()];
	restraint = restraint ? restraint : 1;
	r *= restraint;
	var kindRestraint = BattleModel.armsKindRestraint[characterModel.armsKind() + "-" + targetModel.armsKind()];
	kindRestraint = kindRestraint ? kindRestraint : 1;
	r *= kindRestraint;
	r *= getFiveRestraint(characterModel, targetModel);
	if(r <= 1){
		r = 1;
	}
	return r >>> 0;
}
function getFiveRestraint(characterModel, targetModel){
	//console.log("getFiveRestraint",characterModel,targetModel);
	if(characterModel.five() == 0 && targetModel.five() == 4){
		return BattleModel.fiveRestraint.strong;
	}else if(characterModel.five() == 4 && targetModel.five() == 0){
		return BattleModel.fiveRestraint.weak;
	}else if(characterModel.five() > targetModel.five()){
		return BattleModel.fiveRestraint.strong;
	}else{
		return BattleModel.fiveRestraint.weak;
	}
}
function CastleHert(characterModel, targetModel) {
	return 10;
}
