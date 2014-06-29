/**
 * QueryRoad
 **/
function QueryRoad(){
	base(this,LSprite,[]);
	var self = this;
};
QueryRoad.prototype.queryCheck = function(){
	var self = this;
	var checkResult = false; 
	var x1 = _clickArr[0].pointx;
	var y1 = _clickArr[0].pointy;
	var x2 = _clickArr[1].pointx;
	var y2 = _clickArr[1].pointy;
	//逐步进行检查,如果两个图片可以相连,则将画线需要经过的折点存入_lineArr数组，准备画线
  
	//横向检查
	checkResult = self.checkRow(x1,y1,x2,y2);
	if(checkResult){
		_lineArr.push(_clickArr[0]);
		_lineArr.push(_clickArr[1]);
		return;
	}
	//纵向检查
	checkResult = self.checkCol(x1,y1,x2,y2);
	if(checkResult){
		_lineArr.push(_clickArr[0]);
		_lineArr.push(_clickArr[1]);
		return;
	}
	//一次折线检查
	checkResult = self.checkOnce(x1,y1,x2,y2);
	if(checkResult){
		_lineArr.unshift(_clickArr[0]);
		_lineArr.push(_clickArr[1]);
		return;
	}
	//二次折线检查横向检测	
	checkResult = self.checkTwiceRow(x1,y1,x2,y2);	
	if(checkResult){
		_lineArr.unshift(_clickArr[0]);
		_lineArr.push(_clickArr[1]);
		return;
	}
	//二次折线检查纵向检测	
	checkResult = self.checkTwiceCol(x1,y1,x2,y2);
	if(checkResult){
		_lineArr.unshift(_clickArr[0]);
		_lineArr.push(_clickArr[1]);
		return;
	}
};
 /**
  * 二次折线检查横向检测
  *判断四种情况,
  *1表示点击图片,0表示检索路径,3表示其他图片
  *一
  *0000
  *0330
  *1331
  *二
  *1331
  *0330
  *0000
  *三
  *1333
  *0333
  *0000
  *3330
  *3331
  *四
  *3331
  *3330
  *0000
  *0333
  *1333
  */
QueryRoad.prototype.checkTwiceRow = function (x1,y1,x2,y2){	
	if(x1 == x2)return false;
	var self = this;	
	var checkResult = false;
	for(var i = 0;i<_mapC + 2;i++){
		if(x1<=x2){
			if(self.checkRow(x1-1,i,x2 + 1,i)){
				if(self.checkCol(x1,y1,x1,i)&&self.checkCol(x2,y2,x2,i)){
					checkResult = true;
					_lineArr.push(_boxArr[i][x1]);
					_lineArr.push(_boxArr[i][x2]);
					break;
				}
			}
		}else{
			if(self.checkRow(x2-1,i,x1 + 1,i)){
				if(self.checkCol(x1,y1,x1,i)&&self.checkCol(x2,y2,x2,i)){
					checkResult = true;
					_lineArr.push(_boxArr[i][x1]);
					_lineArr.push(_boxArr[i][x2]);
					break;
				}
			}
		}
	}
	return checkResult;
};
 /**
  * 二次折线检查纵向检测
  *判断四种情况,
  *1表示点击图片,0表示检索路径,3表示其他图片
  *一
  *1000
  *3330
  *1000
  *二
  *0001
  *0333
  *0001
  *三
  *10033
  *33033
  *33033
  *33033
  *33001
  *四
  *33001
  *33033
  *33033
  *33033
  *10033
  */
QueryRoad.prototype.checkTwiceCol = function(x1,y1,x2,y2){	if(y1 == y2)return false; 
	var self = this;	var checkResult = false;
	for(var i = 0;i<_mapC + 2;i++){		
		if(y1<y2){			
			if(self.checkCol(i,y1-1,i,y2 + 1)){				
				if(self.checkRow(x1,y1,i,y1)&&self.checkRow(x2,y2,i,y2)){
					checkResult = true;
					_lineArr.push(_boxArr[y1][i]);
					_lineArr.push(_boxArr[y2][i]);
					break;
				}
			}
		}else{
			if(self.checkCol(i,y2-1,i,y1 + 1)){
				if(self.checkRow(x1,y1,i,y1)&&self.checkRow(x2,y2,i,y2)){
					checkResult = true;
					_lineArr.push(_boxArr[y1][i]);
					_lineArr.push(_boxArr[y2][i]);
					break;
				}
			}
		}
	}
	return checkResult;
};
 /**
  * 一次折线检查
  *判断四种情况,
  *1表示点击图片,0表示检索路径,3表示其他图片
  *一
  *1000
  *3330
  *3331
  *二
  *0001
  *0333
  *1333
  *三
  *1333
  *0333
  *0001
  *四
  *3331
  *3330
  *1000
  */
QueryRoad.prototype.checkOnce = function(x1,y1,x2,y2){
	var self=this;
	var checkResult = false;
	if(x1<x2){
		checkResult = self.checkRow(x1,y1,x2+1,y1)&&self.checkCol(x2,y1,x2,y2);
		if(checkResult){
			_lineArr.push(_boxArr[y1][x2]);
		}else{
			checkResult = self.checkRow(x1 - 1,y2,x2,y2)&&self.checkCol(x1,y1,x1,y2);
			if(checkResult){
				_lineArr.push(_boxArr[y2][x1]);
			}
		}
	}else{
		checkResult = self.checkRow(x1,y2,x1,y1)&&self.checkCol(x1 + 1,y2,x2,y2);
		if(checkResult){
			_lineArr.push(_boxArr[y2][x1]);
		}else{
			checkResult = self.checkRow(x2 - 1,y1,x1,y1)&&self.checkCol(x2,y2,x2,y1);
			if(checkResult){
				_lineArr.push(_boxArr[y1][x2]);
			}
		}
	}
	return checkResult;
};
 
/**
 * 横向检查
 *这个简单，只需要判断两个图片中间是否有其他图片即可
*/   
QueryRoad.prototype.checkRow = function (x1,y1,x2,y2){	
	var checkResult = false;
	if(y1 >= _boxArr.length)return checkResult;
	var i  ;
	if(y1 != y2){
		return false;
	}else if(Math.abs(x1 - x2) == 1){
		return true;
	}
	for(i = Math.min(x1,x2) +1;i<Math.max(x1,x2);i++){
		if(i >= _boxArr[0].length)continue;
		if(_boxArr[y1][i]._index==0){
			checkResult = true;
		} else{
			checkResult = false;
			break;
		}
	}
	return checkResult;
};
 
 /**
 * 纵向检查
 *这个简单，只需要判断两个图片中间是否有其他图片即可
 */
QueryRoad.prototype.checkCol = function (x1,y1,x2,y2){	
	var checkResult = false;
	if(x1 >= _boxArr[0].length)return checkResult;
	var i; 
	if(x1 != x2){
		return false;
	}else if(Math.abs(y1 - y2) == 1){
		return true;
	}
	for(i = Math.min(y1,y2) +1;i<Math.max(y1,y2);i++){
		if(i >= _boxArr.length)continue;
		if(_boxArr[i][x1]._index==0){
			checkResult = true;
		} else{
			checkResult = false;
			break;
		}
	}
	return checkResult;
};