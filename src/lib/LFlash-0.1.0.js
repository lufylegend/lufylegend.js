/** @language chinese
 * <p>Library:lufylegend.LFlash-x.x.x.min.js</p>
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
	 * 	var loader;
	 * 	var jData = {"frames": [
	 * 	{
	 * 	    "filename": "fairy_base0000",
	 * 	    "frame": {"x":0,"y":0,"w":169,"h":182},
	 * 	    "rotated": false,
	 * 	    "trimmed": true,
	 * 	    "spriteSourceSize": {"x":245,"y":433,"w":527,"h":616},
	 * 	    "sourceSize": {"w":527,"h":616}
	 * 	}
	 * 	,{
	 * 	    "filename": "fairy_base0001",
	 * 	    "frame": {"x":169,"y":0,"w":164,"h":182},
	 * 	    "rotated": false,
	 * 	    "trimmed": true,
	 * 	    "spriteSourceSize": {"x":247,"y":433,"w":527,"h":616},
	 * 	    "sourceSize": {"w":527,"h":616}
	 * 	}
	 * 	......
	 * 	],
	 * 	"meta": {
	 * 	    "app": "Adobe Flash Professional",
	 * 	    "version": "13.1.0.226",
	 * 	    "image": "Pet2.png",
	 * 	    "format": "RGBA8888",
	 * 	    "size": {"w":4096,"h":4096},
	 * 	    "scale": "1"
	 * 	}
	 * 	};
	 * 	LInit(50,"legend",527,616,main);
	 * 	function main(){
	 * 	    loader = new LLoader();  
	 * 		loader.addEventListener(LEvent.COMPLETE,loadBitmapdata);  
	 * 		loader.load("Pet2.png","bitmapData");
	 * 	}
	 * 	function loadBitmapdata(event){
	 * 		var bitmapdata = new LBitmapData(loader.content,0,0,jData.frames[0].frame.w,jData.frames[0].frame.h);
	 * 		var list = LFlash.SpriteSheetConvert(jData.frames);
	 * 		var ppbing = new LAnimationTimeline(bitmapdata,[list]);
	 * 		addChild(ppbing);
	 * 	}
	 * @examplelink <p><a href="../../../api/LFlash/SpriteSheetConvert.html" target="_blank">测试链接</a></p>
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