/** @language chinese
 * <p>为adobe flash cs导出的纹理提供动画转换支持。</p>
 * @class LFlash
 * @constructor
 * @since 1.8.11
 * @public
 */
var LFlash = (function () {
	function LFlash(){}
	/** @language chinese
	 * <p>[静态] 将Flash Professional工具导出的JSON Array格式的数据转换为可被LAnimation直接使用的数组</p>
	 * @method LFlash.SpriteSheetConvert
	 * @static
	 * @param {Array} jsonArray 通过Flash Professional工具导出的SpriteSheet对象的json数组，导出时需要以JSON Array格式导出。
	 * @return {Array} 返回一个可被LAnimation直接使用的数组。 
	 * @example
	 * 	LInit(1000/50,"legend",800,450,main);
	 * 	function main(){
	 * 		LGlobal.setDebug(true);
	 * 		var circle = new LSprite();
	 * 		circle.x = 50;
	 * 		circle.y = 50;
	 * 		circle.graphics.drawArc("#FF0000",1,[0,0,20,0,Math.PI*2],true,"#FF0000");
	 * 		addChild(circle);
	 * 		var rect = new LSprite();
	 * 		rect.x = 50;
	 * 		rect.y = 100;
	 * 		rect.graphics.drawRect("#FF00FF",1,[0,0,20,20],true,"#FF00FF");
	 * 		addChild(rect);
	 * 		LTweenLite.to(circle,2,{x:500,y:400,scaleX:3,scaleY:3,ease:LEasing.Strong.easeInOut})
	 * 		.to(circle,2,{x:700,y:50,scaleX:1,scaleY:1,ease:LEasing.Quint.easeIn,onComplete:function(e){
	 * 			trace(e.currentTarget);
	 * 			trace(e.target);//circle
	 * 		}});
	 * 		LTweenLite.to(rect,1,{x:500,loop:true,ease:LEasing.Sine.easeInOut})
	 * 		.to(rect,1,{x:50,ease:LEasing.Quad.easeInOut});
	 * 	}
	 * @examplelink <p><a href="../../../api/LTweenLite/to.html" target="_blank">测试链接</a></p>
	 * @since 1.8.11
	 * @public
	 */
	LFlash.SpriteSheetConvert = function(frames){
		var result = [],child;
		for(var i=0;i<frames.length;i++){
			child = frames[i];
			result.push({x:child.frame.x,sx:child.spriteSourceSize.x,y:child.frame.y,sy:child.spriteSourceSize.y,width:child.frame.w,height:child.frame.h});
		}
		return result;
	};
	return LFlash;
})();