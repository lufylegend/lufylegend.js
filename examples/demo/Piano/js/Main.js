/**
 * Main类
 * @author lufy
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/

if(true || LGlobal.canTouch){
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LSystem.screen(LStage.FULL_SCREEN);
}
LInit(20,"legend",480,320,main);
var loadingLayer,backLayer;
var loadData = [
{name:"background",path:"../RunningGirl/sound/background.mp3",type:"sound"},
{name:"M1_Piano_C0",path:"./music/M1_Piano_C0.wav",type:"sound"},
{name:"M1_Piano_C1",path:"./music/M1_Piano_C1.wav",type:"sound"},
{name:"M1_Piano_C2",path:"./music/M1_Piano_C2.wav",type:"sound"},
{name:"M1_Piano_C3",path:"./music/M1_Piano_C3.wav",type:"sound"},
{name:"M1_Piano_C4",path:"./music/M1_Piano_C4.wav",type:"sound"},
{name:"M1_Piano_C5",path:"./music/M1_Piano_C5.wav",type:"sound"},
{name:"M1_Piano_C6",path:"./music/M1_Piano_C6.wav",type:"sound"},
{name:"M1_Piano_C7",path:"./music/M1_Piano_C7.wav",type:"sound"}
];
var datalist,pianos = {};
function main(){
	if(!LSound.webAudioEnabled){
		var label = new LTextField();
		label.x = 40;
		label.y = 50;
		label.width = 400;
		label.setWordWrap(true,50);
		var protocol = location.protocol;
		if (protocol == "http:" || protocol == "https:") {
			label.text = "这是一个简单的WebAudio多声道测试，\n您的浏览器不支持WebAudio,请更换浏览器。";
		} else {
			label.text = "这是一个简单的WebAudio多声道测试，\n您无法在本地运行此demo，请先将demo上传至服务器，再进行测试。";
		}
		addChild(label);
		return;
	}
	loadingLayer = new LoadingSample3();
	addChild(loadingLayer);	
	LLoadManage.load(
		loadData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result){
			LGlobal.setDebug(true);
			datalist = result;
			removeChild(loadingLayer);
			loadingLayer = null;
			gameInit();
		}
	);
}
function playPiano(e){
	var piano;
	if(pianos[e.currentTarget.name]){
		piano = pianos[e.currentTarget.name];
	}else{
		piano = new LSound();
		piano.load(datalist[e.currentTarget.name]);
		pianos[e.currentTarget.name] = piano;
	}
	piano.play();
}
function gameInit(){
	try{
		var a;
		if(typeof webkitAudioContext !== "undefined"){
			a = new webkitAudioContext();
		}else{
			a = new AudioContext();
			a.createGainNode = a.createGain;
		}
	}catch(e){
		alert("This browser is not SUPPORT Web Audio API");
	}
	backLayer = new LSprite();
	backLayer.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#ffffff");
	addChild(backLayer);
	var label = new LTextField();
	label.x = 50;
	label.y = 50;
	label.text = "这是一个简单的多声道测试，请点击页面开始测试！";
	backLayer.addChild(label);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,pianoStart);
}
function pianoStart(e){
	backLayer.removeAllChild();
	backLayer.die();
	
	var background = new LSound();
	background.load(datalist["background"]);
	//background.play(0,100);
	background.play();
	var names = ["do", "re", "mi", "fa", "so", "la", "si", "do"];
	for(var i=0;i<=7;i++){
		var pChild = new LSprite();
		pChild.name = "M1_Piano_C" + i;
		pChild.graphics.drawRect(1,"#000000",[0,0,50,200],true,"#ffffff");
		pChild.x = 40 + 50 * i;
		backLayer.addChild(pChild);
		var name = new LTextField();
		name.text = names[i];
		name.x = 10;
		name.y = 90;
		pChild.addChild(name);
		pChild.addEventListener(LMouseEvent.MOUSE_DOWN,playPiano);
	}
	var label = new LTextField();
	label.x = 50;
	label.y = 250;
	label.text = "这是一个简单的多声道测试，请点击上面的琴键";
	backLayer.addChild(label);
}
