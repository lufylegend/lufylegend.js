/** @language chinese
 * 确认FPS
 * @class FPS
 * @extends LSprite
 * @constructor
 * @example
 * 	addChild(new FPS());
 * @examplelink <p><a href="../../../api/FPS/index.html" target="_blank">测试链接</a></p>
 * @since 1.7.6
 * @public
 */
/** @language english
 * Show the FPS
 * @class LShape
 * @extends LSprite
 * @constructor
 * @example
 * 	addChild(new FPS());
 * @examplelink <p><a href="../../../api/FPS/index.html" target="_blank">Try it »</a></p>
 * @since 1.7.6
 * @public
 */
/** @language japanese
 * FPSを確認する
 * @class FPS
 * @extends LSprite
 * @constructor
 * @example
 * 	addChild(new FPS());
 * @examplelink <p><a href="../../../api/FPS/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.7.6
 * @public
 */
var FPS = (function () {
	function FPS(){
		var s = this;
		LExtends(s,LSprite,[]);
		s.fps = new LTextField();
		s.fpsCount = 0;
		s.fpsTime = (new Date()).getTime();
		s.fps.color = "#ffffff";
		s.addChild(s.fps);
		s.addEventListener(LEvent.ENTER_FRAME,s.showFPS);
	}
	FPS.prototype.showFPS = function(s){
		s.fpsCount++;
		var t = (new Date()).getTime();
		if(t - s.fpsTime < 1000)return;
		s.fps.text = Math.round(s.fpsCount*10000 / (t-s.fpsTime))/10; 
		s.fpsTime = t;
		s.fpsCount = 0;
		s.graphics.clear();
		s.graphics.drawRect(0,"#000000",[0,0,s.fps.getWidth(),20],true,"#000000");
	};
	return FPS;
})();