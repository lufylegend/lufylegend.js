/**
 * Main类
 * @author lufy
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/
LSystem.screen(LStage.FULL_SCREEN);

function doScroll() {
	if(window.pageYOffset === 0) {
		window.scrollTo(0, 1);
	}
}
window.onload = function() {
	setTimeout(doScroll, 100);
	init(50,"legend",480,800,main,LEvent.INIT);
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
{path:"./js/share.js",type:"js"},
{path:"./js/Social.js",type:"js"},
{path:"./js/GameRanking.js",type:"js"},
{path:"./js/GameLogo.js",type:"js"},
{path:"./js/GameClear.js",type:"js"},
{path:"./js/Gem.js",type:"js"},
{path:"./js/Stage.js",type:"js"},
{path:"./js/Clock.js",type:"js"},
{path:"./js/Point.js",type:"js"},
{path:"./js/GetPoint.js",type:"js"},
{path:"./js/Bullet.js",type:"js"},
{path:"./js/Event.js",type:"js"},
{path:"./js/function.js",type:"js"},
{path:"./js/GameBody.js",type:"js"},
{name:"num.+",path:"./images/plus.png"},
{name:"num.0",path:"./images/0.png"},
{name:"num.1",path:"./images/1.png"},
{name:"num.2",path:"./images/2.png"},
{name:"num.3",path:"./images/3.png"},
{name:"num.4",path:"./images/4.png"},
{name:"num.5",path:"./images/5.png"},
{name:"num.6",path:"./images/6.png"},
{name:"num.7",path:"./images/7.png"},
{name:"num.8",path:"./images/8.png"},
{name:"num.9",path:"./images/9.png"},
{name:"back",path:"./images/back.png"},
{name:"line",path:"./images/line.png"},
{name:"clear",path:"./images/clear.png"},
{name:"gem01",path:"./images/gem01.png"},
{name:"gem02",path:"./images/gem02.png"},
{name:"gem03",path:"./images/gem03.png"},
{name:"gem04",path:"./images/gem04.png"},
{name:"gem05",path:"./images/gem05.png"},
{name:"gem06",path:"./images/gem06.png"},
{name:"gem07",path:"./images/gem07.png"},
{name:"gem08",path:"./images/gem08.png"},
{name:"gem09",path:"./images/gem09.png"},
{name:"ico_sina",path:"./images/ico_sina.gif"},
{name:"ico_qq",path:"./images/ico_qq.gif"},
{name:"ico_facebook",path:"./images/ico_facebook.png"},
{name:"ico_twitter",path:"./images/ico_twitter.png"}
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