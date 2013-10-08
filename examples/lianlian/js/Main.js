LSystem.screen(LStage.FULL_SCREEN);
init(50,"mylegend",800,480,main);

var loadingLayer;
var loadIndex = 0;
//底层Sprite
var _spriteImage;
//线Sprite
var _spriteLine;
var _box;
var _boxArr = new Array();
var _lineArr = new Array();
var _clickArr = new Array();
var loader;
var loadIndex = 0;
var imglist = {};
var _mapR = 6;
var _mapC = 10;
var imgData = new Array(
		{name:"image",path:"./images/image.jpg"}
		);
var _query = new QueryRoad();
//画线时间控制
var _lineCtrl;
//画线笔刷
var _shapes;
//得分
var getpoint;
var getpointNum = 0;
//剩余时间
var lefttime = 500;
var windowOver ;
function main(){
	loadingLayer = new LSprite();
	loadingLayer.graphics.drawRect(1,"black",[200, 200, 400, 20],true,"#ffffff");
	addChild(loadingLayer);
	loadImage();
}
function loadImage(){
	if(loadIndex >= imgData.length){
		removeChild(loadingLayer);
		gameInit();
		return;
	}
	loader = new LLoader();
	loader.addEventListener(LEvent.COMPLETE,loadComplete);
	loader.load(imgData[loadIndex].path,"bitmapData");
}
function loadComplete(event){
	loadingLayer.graphics.clear();
	loadingLayer.graphics.drawRect(1,"black",[200, 200, 400, 20],true,"#ffffff");
	loadingLayer.graphics.drawRect(1,"black",[200, 203, 400*(loadIndex/imgData.length), 14],true,"#000000");
	imglist[imgData[loadIndex].name] = loader.content;
	loadIndex++;
	loadImage();
}
function gameInit(event){
	LGlobal.setDebug(true);
	_spriteImage = new LSprite();
	addChild(_spriteImage);
	_spriteLine = new LSprite();
	addChild(_spriteLine);	
	var title = new LTextField();
	title.x = 650;
	title.y = 50;
	title.color = "#ffffff";
	title.text = "得分";
	addChild(title);
	getpoint = new LTextField();
	getpoint.x = 650;
	getpoint.y = 100;
	getpoint.color = "#ffffff";
	getpoint.text = "0";
	addChild(getpoint);	

	//随机数组生成与显示
	setMapArr();
	_spriteImage.addEventListener(LEvent.ENTER_FRAME, onFrame);
	_spriteImage.addEventListener(LMouseEvent.MOUSE_UP,onUp);
}
function onUp(event){	
	if(windowOver != null){
		setMapArr();
		_spriteImage.removeChild(windowOver);
		windowOver = null;
		lefttime = 500;
		return;
	}
	if(_clickArr.length >= 2)return;
	var i,j,checkImg;
	for(i=0;i<_mapR;i++){
		for(j=0;j<_mapC;j++){
			checkImg = _boxArr[i+1][j+1];
			if(checkImg._index > 0 && event.offsetX >= checkImg.x && event.offsetX < checkImg.x + checkImg.width && 
					event.offsetY >= checkImg.y && event.offsetY < checkImg.y + checkImg.height){
				if(_clickArr.length > 0 && _clickArr[0].objectindex == checkImg.objectindex)return;
				checkImg.alpha = 0.3;
				_clickArr.push(checkImg);
				checkClick();
			}
		}
	}
}
/**
*连接判断
*返回值:无
*/
function checkClick(){
	//点击图片数小于2的时候，无处理
	if(_clickArr.length < 2)return;
	//开始检索判断
	//判断两个图片是否相同
	if(_clickArr[0]._index != _clickArr[1]._index){
		//如果两个图片无法消去
		_clickArr[0].alpha = 1;
		_clickArr.splice(0,1);
		return;
	}
	//进行搜索
	_query.queryCheck();
	//如果两个图片可以消去
	if(_lineArr.length > 0){
		_lineCtrl = 0;
	}else{
		//如果两个图片无法消去
		_clickArr[0].alpha = 1;
		_clickArr.splice(0,1);
	}
}
function showGameOver(){
	windowOver = new LSprite();
	windowOver.graphics.drawRect(1,"black",[0, 0, 800, 480],true,"#999999");
	windowOver.alpha = 0.7;
	var winTitle = new LTextField();
	winTitle.x = 300;
	winTitle.y = 100;
	winTitle.size = 50;
	winTitle.color = "#ffffff";
	winTitle.text = "GAME OVER";
	windowOver.addChild(winTitle);
	_spriteImage.addChild(windowOver);
}
function showGameClear(){
	windowOver = new LSprite();
	windowOver.graphics.drawRect(1,"black",[0, 0, 800, 480],true,"#999999");
	windowOver.alpha = 0.7;
	var winTitle = new LTextField();
	winTitle.x = 200;
	winTitle.y = 100;
	winTitle.size = 50;
	winTitle.color = "#ffffff";
	winTitle.text = "GAME CLEAR";
	windowOver.addChild(winTitle);
	_spriteImage.addChild(windowOver);
}
/**
*贞函数
*/
function onFrame(event) {
	if(windowOver)return;
	_spriteImage.graphics.clear();
	_spriteImage.graphics.drawRect(1,"#ffffff",[50, 10, lefttime, 10],true,"#ff0000");
	lefttime -= 0.3;
	if(lefttime <= 0){
		showGameOver();
		return;
	}
	if(_lineCtrl < 0)return;
	//画线
	if(_lineCtrl == 0){
		_shapes = new LSprite();
		for(var i = 0;i<_lineArr.length - 1;i++){
			_shapes.graphics.drawLine(2,"#FF0000",[_lineArr[i].pointx*50 + 25,_lineArr[i].pointy*50 + 25, _lineArr[i + 1].pointx*50 + 25,_lineArr[i + 1].pointy*50 + 25]);
		}
		_spriteLine.addChild(_shapes); 
	}
	//清除线，并消去相同图片
	if(_lineCtrl >= 5){
		_spriteLine.removeChildAt( 0 );
		_clickArr[0].setImageData(0);
		_clickArr[1].setImageData(0);
		_clickArr.splice(0,_clickArr.length);
		_lineArr.splice(0,_lineArr.length);
		_spriteLine.removeChild(_shapes); 
		_lineCtrl = -100;
		getpointNum += 2;
		getpoint.text = getpointNum + "";
		lefttime += 5;
		checkCan();
	}
	_lineCtrl ++;
}
/**
*检查是否还继续可以消去
*/
function checkCan(){
	$isCan = false;
	$isWin = 0;
	var i1,i2,j1,j2,box1,box2;
	for(i1=1;!$isCan && i1<_mapR + 1;i1++){
		for(j1=1;!$isCan && j1<_mapC + 1;j1++){
			box1 = _boxArr[i1][j1];
			if(box1._index == 0)continue;
			$isWin++;
			for(i2=1;!$isCan && i2<_mapR + 1;i2++){
				for(j2=1;!$isCan && j2<_mapC + 1;j2++){
					box2 = _boxArr[i2][j2];
					if(box1.objectindex == box2.objectindex)continue;
					if(box2._index == 0)continue;
					_clickArr.push(box1);
					_clickArr.push(box2);
					//进行搜索
					_query.queryCheck();
					_clickArr.splice(0,2);
					//如果两个图片可以消去
					if(_lineArr.length > 0){
						$isCan = true;
						_lineArr.splice(0,_lineArr.length);
						break;
					}
				}
			}
		}
	}
	if($isWin == 0){
		showGameClear();
		return;
	}
	if(!$isCan)resetBox();
}
/**
*数据数组reset
*/
function resetBox(){
	//reset
	var arr = [];
	var i1,j1,box1,v1,v2,v3;
	for(i1=1;!$isCan && i1<_mapR + 1;i1++){
		for(j1=1;!$isCan && j1<_mapC + 1;j1++){
			box1 = _boxArr[i1][j1];
			if(box1._index > 0)arr.push(box1);
		}
	}
	var i = 0;
	while(i < arr.length){
		i1 = Math.floor(Math.random()*arr.length);
		j1 = Math.floor(Math.random()*arr.length);
		v1 = arr[i1]._index;
		v2 = arr[j1]._index;
		v3 = v1;
		v1 = v2;
		v2 = v3;
		arr[i1].setImageData(v1);
		arr[j1].setImageData(v2);
		i++;
	}
	checkCan();
}
/**
*数据数组ＧＥＴ
*参数
* 数组长度
*/
function setMapArr(){
	var arr = new Array();
	//得到总图片数
	var leng = _mapR*_mapC;
	
	var i;
	var ran_value;
	//成对生成随机数据
	for(i=0;i<leng/2;i++){
		ran_value = Math.floor(Math.random()*15 + 1);
		arr.push(ran_value);
		arr.push(ran_value);
	}
	if(!windowOver)getDataArr();
	//将成对数组乱序抽出，生成数据数组
	for(i=0;i<leng;i++){
		ran_value = Math.floor(Math.random()*arr.length);
		_box = _boxArr[Math.floor(i/_mapC) + 1][i%_mapC + 1];
		
		_box.setImageData(arr[ran_value]);
		//删除已经添加的数据
		arr.splice(ran_value,1);
	}
}
/**
 *空数据数组ＧＥＴ
 *参数
 * 数组长度
 *返回值:空数据数组
 */
function getDataArr(len){
	var i;
	var j;
	var arr;
	for(i=0;i<_mapR + 2;i++){
		arr = new Array();
		for(j=0;j<_mapC + 2;j++){
			_box = new ImageBox(j,i);
			_box.x = j*50;
			_box.y = i*50;
			_spriteImage.addChild(_box);
			arr.push(_box);
		}
		_boxArr.push(arr);
	}
}
function onframe(){	
}