var _stop;
var _box;
var nowBox,nextBox;
var point={x:0,y:0};
var map;
var speedMax;
var speed;
var speedLabel;
var score;
var scoreLabel;
var myKey = {keyControl:0,speedCotrol:0,changeOver:false};
var nodeArray;
var nextNodeArray;
function gameStart(){
	_box = new Box();
	map=[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];
	nodeArray = [];
	var i,j,node,nArr,bitmap,bitmapdata,boxl = 15;
	for(i=0;i<map.length;i++){
		nArr = [];
		for(j=0;j<map[0].length;j++){
			node = {};
			if(i==0 || i==map.length-1 || j==0 || j==map[0].length -1){
				bitmapdata = new LBitmapData(imglist["b10"]);
				bitmap = new LBitmap(bitmapdata);
				bitmap.x = boxl*j+boxl;
				bitmap.y = boxl*i+boxl;
				node["value"] = 10;
				node["bitmap"] = bitmap;
				graphicsMap.addChild(bitmap);
			}else{
				bitmapdata = new LBitmapData(imglist["b"+map[i][j]]);
				bitmap = new LBitmap(bitmapdata);
				bitmap.x = boxl*j+boxl;
				bitmap.y = boxl*i+boxl;
				node["value"] = map[i][j];
				node["bitmap"] = bitmap;
				graphicsMap.addChild(bitmap);
			}
			nArr[j] = node;
		}
		nodeArray[i] = nArr;
	}
	speedMax = 15;
	speed=speedMax;
	speedLabel.text="速度:" +(16-speedMax)+ "";
	score = 0;
	scoreLabel.text="得分:" +score+"";
	getNewBox();
	plusBox();
	drawMap();
	_stop = false;
}
function getNewBox(){
	if (nextBox==null){
		nextBox=_box.getBox();
	}
	if(nextNodeArray == null){
		nextNodeArray = [];
		var i,j,node,nArr,bitmap,bitmapdata,boxl = 15;
		for(i=0;i<nextBox.length;i++){
			nArr = [];
			for(j=0;j<nextBox[0].length;j++){
				node = {};
					bitmapdata = new LBitmapData(imglist["b"+nextBox[i][j]]);
					bitmap = new LBitmap(bitmapdata);
					bitmap.x = 220 + boxl*j+boxl;
					bitmap.y = 50 + boxl*i+boxl;
					node["value"] = nextBox[i][j];
					node["bitmap"] = bitmap;
					graphicsMap.addChild(bitmap);
				nArr[j] = node;
			}
			nextNodeArray[i] = nArr;
		}
	}
	nowBox=nextBox;
	point.x=5;
	point.y=1;
	nextBox=_box.getBox();
}
function plusBox(){
	var i,j;
	for(i=0;i<nowBox.length;i++){
		for(j=0;j<nowBox[i].length;j++){
			map[i+point.y][j+point.x]=nowBox[i][j]+map[i+point.y][j+point.x];
		}
			
	}
}
function drawMap(){
	var i,j,boxl = 15;
	for(i=0;i<map.length;i++){
		for(j=0;j<map[0].length;j++){
			if(i==0 || i==map.length-1 || j==0 || j==map[0].length -1){
			}else{
				if(nodeArray[i][j]["value"] != map[i][j] && imglist["b"+map[i][j]]){
					nodeArray[i][j]["bitmap"].bitmapData.image = imglist["b"+map[i][j]];
					nodeArray[i][j]["value"] = map[i][j];
				}
			}
		}
		
	}
	drawNextBox();
}
function drawNextBox(){
	if(nextBox!=null){
		var i,j,boxl = 15;
		for(i=0;i<nextBox.length;i++){
			for(j=0;j<nextBox[i].length;j++){
				if(nextNodeArray[i][j]["value"] != nextBox[i][j]){
					nextNodeArray[i][j]["bitmap"].bitmapData.image = imglist["b"+nextBox[i][j]];
					nextNodeArray[i][j]["value"] = nextBox[i][j];
				}
			}
		
		}
	
	}
}
function minusBox(){
	var i,j;
	for(i=0;i<nowBox.length;i++){
		for(j=0;j<nowBox[i].length;j++){
			map[i+point.y][j+point.x]=map[i+point.y][j+point.x]-nowBox[i][j];
		}
			
	}
}

function changeBox(){
	var saveBox = nowBox;
	nowBox = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
	];
	var i,j;
	for(i=0;i<saveBox.length;i++){
		for(j=0;j<saveBox[1].length;j++){
			nowBox[i][j]=saveBox[(3-j)][i];
		}
	}
	if (!checkPlus(0,0)){
		nowBox = saveBox;
	}else{
		myKey.changeOver = true;
	}
	
}
function checkPlus(nx,ny){
	var i,j;
	for(i=0;i<nowBox.length;i++){
		for(j=0;j<nowBox[i].length;j++){
			if(nowBox[i][j]+map[i+point.y + ny][j+point.x + nx] > 1){
				return false;
			}
		}
			
	}
	return true;
}
function moveLine(line){
	var i;
	for(i=line;i>1 ;i--){
	    map[i]=map[i-1];
	}
	map[1] = [1,0,0,0,0,0,0,0,0,0,0,0,0,1];
}
function removeBox(){
	var i,j,count = 0;
	for(i=point.y;i<(point.y+4);i++){
		for(j=1;j<(map[1].length-1);j++){
			if(map[i][j]==0){
				break;
			}
			if(j==(map[1].length-2) && i < map.length - 1){
				moveLine(i);
				count++;
			}
		}
	}
	if(count == 1){
		score += 1;
	}else if(count == 2){
		score += 3;
	}else if(count == 3){
		score += 6;
	}else if(count == 4){
		score += 10;
	}
	if(count > 0){
		scoreLabel.text="得分:" +score+"";
		var showSpeed = 1;
		if(score > 1000){
			speedMax = 1;
			showSpeed = 11;
		
		}else if(score > 900){
			speedMax = 2;
			showSpeed = 10;
		
		}else if(score > 800){
			speedMax = 3;
			showSpeed = 9;
		
		}else if(score > 700){
			speedMax = 4;
			showSpeed = 8;
		
		}else if(score > 600){
			speedMax = 5;
			showSpeed = 7;
		
		}else if(score > 500){
			speedMax = 6;
			showSpeed = 6;
		
		}else if(score > 400){
			speedMax = 7;
			showSpeed = 5;
		
		}else if(score > 300){
			speedMax = 9;
			showSpeed = 4;
		
		}else if(score > 200){
			speedMax = 11;
			showSpeed = 3;
		}else if(score > 100){
			speedMax = 13;
			showSpeed = 2;
		}
		speedLabel.text="速度:" +showSpeed+ "";
	}
}
