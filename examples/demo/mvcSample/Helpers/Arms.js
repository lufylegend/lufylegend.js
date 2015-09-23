function getArmsFromCharacters(characterList,controller){
	var soldiers = [0,0,0,0,0,0];
	characterList.forEach(function(child) {
		soldiers = child.soldiers(soldiers);
	});
	var charaList = [];
	for(var i=0;i<ArmsConfig.Arms.length;i++){
		if(!soldiers[i]){
			continue;
		}
		var child = ArmsConfig.Arms[i];
		var arm = {character_id:child.id,star:1,level:1,skills:[]};
		var chara = new CharacterModel(controller,arm);
		charaList.push(chara);
	}
	return charaList;
}
