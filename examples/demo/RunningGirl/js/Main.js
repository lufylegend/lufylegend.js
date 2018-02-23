LGlobal.aspectRatio = LANDSCAPE;
init(1000/30, "legend", 800, 480, main);
var dataList;
var stageLayer;
var stageIndex = 0;
var MOVE_STEP = 8;
var MOVE_STEP_SLOW = 8;
var MOVE_STEP_FAST = 12;
var g = 3;
var stopFlag;
var gameBody;
var runMap;
var runCharacter;
var npcLayer;
var itemLayer;
var MySoundPlayer;
var starCtrl;
var loadData = [
{name : "num_0",path : "images/num_0.png"}, 
{name : "num_1",path : "images/num_1.png"}, 
{name : "num_2",path : "images/num_2.png"}, 
{name : "num_3",path : "images/num_3.png"}, 
{name : "num_4",path : "images/num_4.png"}, 
{name : "num_5",path : "images/num_5.png"}, 
{name : "num_6",path : "images/num_6.png"}, 
{name : "num_7",path : "images/num_7.png"}, 
{name : "num_8",path : "images/num_8.png"}, 
{name : "num_9",path : "images/num_9.png"}, 
{name : "effect",path : "images/effect.png"}, 
{name : "logo",path : "images/logo.png"}, 
{name : "inputbox",path : "images/inputbox.png"}, 
{name : "spiritEffect",path : "images/spiritEffect.png"}, 
{name : "b_background",path : "images/b_background.png"}, 
{name : "m_background",path : "images/m_background.png"}, 
{name : "stage",path : "images/stage.png"}, 
{name : "chara",path : "images/chara.png"}, 
{name : "bird",path : "images/bird.png"}, 
{name : "gui",path : "images/gui.png"}, 
{name : "window",path : "images/window.png"}, 
{name : "HP_bg",path : "images/hp_bg.png"},  
{name : "HP_value",path : "images/hp_value.png"},
{name:"ico_sina",path:"./images/ico_sina.gif"},
{name:"ico_qq",path:"./images/ico_qq.gif"},
{name:"ico_facebook",path:"./images/ico_facebook.png"},
{name:"ico_twitter",path:"./images/ico_twitter.png"}, 
{type : "js",path : "js/Background.js"}, 
{type : "js",path : "js/Character.js"}, 
{type : "js",path : "js/Logo.js"}, 
{type : "js",path : "js/Map.js"}, 
{type : "js",path : "js/StageData.js"}, 
{type : "js",path : "js/GameBody.js"}, 
{type : "js",path : "js/Floor.js"}, 
{type : "js",path : "js/HP.js"}, 
{type : "js",path : "js/Num.js"}, 
{type : "js",path : "js/Npc.js"}, 
{type : "js",path : "js/Item.js"}, 
{type : "js",path : "js/SoundPlayer.js"}, 
{type : "js",path : "js/Star.js"}, 
{type : "js",path : "js/share.js"}, 
{type : "js",path : "js/GameOver.js"}
];
function main() {
	//预读取音频
	var loadsound = true;
	var protocol = location.protocol;
	if (protocol == "http:" || protocol == "https:") {
		if (LGlobal.ios && !LSound.webAudioEnabled){
			//如果IOS环境，并且不支持WebAudio，则无法预先读取
			loadsound = false;
		}
	} else if (LGlobal.mobile) {
		//如果是移动浏览器本地访问，则无法预先读取
		loadsound = false;
	}
	if(loadsound){
		loadData.push({name : "sound_background",path : "sound/background.mp3"});
		if(LSound.webAudioEnabled || LGlobal.os == OS_PC){
			//浏览器支持WebAudio，或者环境为PC，则预先读取所有音频
			loadData.push({name : "sound_fly",path : "sound/fly.mp3"});
			loadData.push({name : "sound_gameover",path : "sound/gameover.mp3"});
			loadData.push({name : "sound_get",path : "sound/get.mp3"});
			loadData.push({name : "sound_jump",path : "sound/jump.mp3"});
		}
	}
	if(LGlobal.mobile){
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
		LSystem.screen(LStage.FULL_SCREEN);
	}
	//LGlobal.setDebug(true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	
	loadingLayer = new LoadingSample4();
	addChild(loadingLayer);
	LLoadManage.load(loadData, function(progress) {
		loadingLayer.setProgress(progress);
	}, imgLoadComplete);
}
function imgLoadComplete(result){
	dataList = result;
	removeChild(loadingLayer);
	loadingLayer = null;
	
	MySoundPlayer = new SoundPlayer();
	
	stageLayer = new LSprite();
	addChild(stageLayer);
	
	//gameStart();
	
	var logo = new Logo();
	stageLayer.addChild(logo);

	return;
	var fps = new FPS();
	addChild(fps);
}
function gameStart(){
	if(gameBody){
		MySoundPlayer.playSound("background");
	}
	stageLayer.die();
	stageLayer.removeAllChild();
	LTweenLite.removeAll();
	MOVE_STEP = MOVE_STEP_SLOW;
	gameBody = new GameBody();
	stageLayer.addChild(gameBody);
	
	return;
	//debug
	var sprite = new LSprite();
	addChild(sprite);
    sprite.graphics.add(function (){
    	var c = LGlobal.canvas;
    	var w = 32,h = 32;
    	var l1 = LGlobal.width/w;
    	var l2 = LGlobal.height/h; 
		c.beginPath();
		c.strokeStyle = "#000000";
		for(var i=1;i<l1;i++){
			c.moveTo(w*i,0);
			c.lineTo(w*i,LGlobal.height);
		}
		for(var i=1;i<l2;i++){
			c.moveTo(0,h*i);
			c.lineTo(LGlobal.width,h*i);
		}
		c.stroke();
	});
}
LGlobal.horizontalError = function(){
	LGlobal.object.innerHTML='<img src="./images/screenchange.png" style="width:100%" />';
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};