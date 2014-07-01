/**
 * Main类
 * @author lufy
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/

if(LGlobal.canTouch){
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LSystem.screen(LStage.FULL_SCREEN);
}

function doScroll() {
	if(window.pageYOffset === 0) {
		window.scrollTo(0, 1);
	}
}
window.onload = function() {
	setTimeout(doScroll, 100);
	init(20,"legend",480,800,main,LEvent.INIT);
}
window.onorientationchange = function() {
	setTimeout(doScroll, 100);
};
window.onresize = function() {
	setTimeout(doScroll, 100);
}
var loadingLayer;
var stageLayer;
var backLayer;
var gemLayer;
var bulletLayer;
var getLayer;
var rankingLayer;
var loadData = [
{name:"M1_Piano_C0",path:"./music/M1_Piano_C0.wav",type:"sound"},
{name:"M1_Piano_C1",path:"./music/M1_Piano_C1.wav",type:"sound"},
{name:"M1_Piano_C2",path:"./music/M1_Piano_C2.wav",type:"sound"},
{name:"M1_Piano_C3",path:"./music/M1_Piano_C3.wav",type:"sound"},
{name:"M1_Piano_C4",path:"./music/M1_Piano_C4.wav",type:"sound"},
{name:"M1_Piano_C5",path:"./music/M1_Piano_C5.wav",type:"sound"},
{name:"M1_Piano_C6",path:"./music/M1_Piano_C6.wav",type:"sound"},
{name:"M1_Piano_C7",path:"./music/M1_Piano_C7.wav",type:"sound"}
];
var list = [],clearList,datalist;
var mouse_down_obj = {x:0,y:0,isMouseDown:false,time:0,cx:0,cy:0};
var hiddenObj;
var direction;
var preMove;
var point;
var continuous;
var clock;
var stage;

function main(){
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
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
function gameInit(){
	console.log(datalist);
}
