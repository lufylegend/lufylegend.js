function getNumList(){
	var stage = stageMenu[stageIndex];
	if(stage.flag == 0){
		return randomNum01(stage.lv);
	}else{
		return randomNum02(stage.lv);
	}
}
function randomNum01(lv){
	var i,j,list = new Array(),result = new Array();
	for(i=0;i<9;i++){
		list.push([1,2,3,4,5,6,7,8,9]);
		for(j=0;j<i;j++)list[i].push(list[i].shift());
		result.push([]);
	}
	list = list.sort(function(a,b){return Math.random()>.5?-1:1;});
	var rand = new Array(0,1,2,3,4,5,6,7,8).sort(function(a,b){return Math.random()>.5?-1:1;});
	for(i=0;i<9;i++){
		for(j=0;j<9;j++){
			result[i].push(list[i][rand[j]]);
		}
	}

	for(i=0;i<9;i++){
		for(j=0;j<lv + 1;j++){
			var ran1 = Math.random()*9 >>> 0;
			result[i][ran1] = 0;
			ran1 = Math.random()*9 >>> 0;
			result[ran1][i] = 0;
		}
	}
	return result;
}
function randomNum02(lv){
	var i,j,k,list = [],result = [],rand;
	for(i=0;i<9;i++){
		list.push([1,2,3,4,5,6,7,8,9]);
		for(j=0;j<i;j++)list[i].push(list[i].shift());
	}
	list = [list[0],list[3],list[6],list[1],list[4],list[7],list[2],list[5],list[8]];
	
	rand = new Array(0,1,2).sort(function(a,b){return Math.random()>.5?-1:1;}).concat(
			new Array(3,4,5).sort(function(a,b){return Math.random()>.5?-1:1;}),
			new Array(6,7,8).sort(function(a,b){return Math.random()>.5?-1:1;})
		);
	for(i=0;i<9;i++)result.push(list[rand[i]]);
	list = result;
	rand = new Array(0,1,2).sort(function(a,b){return Math.random()>.5?-1:1;}).concat(
			new Array(3,4,5).sort(function(a,b){return Math.random()>.5?-1:1;}),
			new Array(6,7,8).sort(function(a,b){return Math.random()>.5?-1:1;})
		);
	result = [];
	for(i=0;i<9;i++){
		result.push([]);
		for(j=0;j<9;j++){
			result[i].push(list[i][rand[j]]);
		}
	}

	for(i=0;i<9;i++){
		for(j=0;j<lv + 1;j++){
			var ran1 = Math.random()*9 >>> 0;
			result[i][ran1] = 0;
			ran1 = Math.random()*9 >>> 0;
			result[ran1][i] = 0;
		}
	}
	return result;
}
function checkWin(){
	var check01,check02;
	for(var i=0;i<9;i++){
		check01 = [];
		check02 = [];
		for(var j=0;j<9;j++){
			if(stageNumList[i][j].value > 0)check01.push(stageNumList[i][j].value);
			if(stageNumList[j][i].value > 0)check02.push(stageNumList[j][i].value);
		}
		check01 = deleteEleReg(check01);
		check02 = deleteEleReg(check02);
		if(check01.length < 9)return false;
		if(check02.length < 9)return false;
	}
	var stage = stageMenu[stageIndex];
	if(stage.flag){
		return checkWin02();
	}
	return true;
}
function checkWin02(){
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(!check_mini(i,j))return false;
		}
	}
	return true;
}
function check_mini(i2,j2){
	var check_arr = [];
	for(var i=i2*3;i<i2*3+3;i++){
		for(var j=j2*3;j<j2*3+3;j++){
			if(check_arr[stageNumList[i][j].value])return false;
			check_arr[stageNumList[i][j].value] = 1;
		}
	}
	return true;
}
function deleteEleReg(s){     
	var a = {};   
  	var len = s.length;   
  	for(var i=0; i < len; i++)  {     
    	if(typeof a[s[i]] == "undefined")     
    	a[s[i]] = 1;     
  	}     
  	s.length = 0;     
  	for(var i in a)     
  	s[s.length] = i;     
  	return s;     
} 