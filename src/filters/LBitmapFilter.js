/** @language chinese
 * <p>LBitmapFilter 类是所有图像滤镜效果的基类。</p>
 * <p>ColorMatrixFilter、LConvolutionFilter、LDropShadowFilter都扩展了 LBitmapFilter 类。</p>
 * <p>不可以直接实例化或扩展 LBitmapFilter。</p>
 * @class LBitmapFilter
 * @extends LObject
 * @constructor
 * @since 1.9.11
 * @public
 */
var LBitmapFilter = (function () {
	function LBitmapFilter () {
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LBitmapFilter";
	}
	LBitmapFilter.prototype.ll_show = function (displayObject, c) {
		var s = this;
		if(s.cacheMaking){
			return;
		}
		c = c || LGlobal.canvas;
		var d = displayObject, bitmapData;
		if(d.constructor.name == "LBitmap"){
			bitmapData = d.bitmapData;
		}else{
			if(!d._ll_cacheAsBitmap){
				s.cacheMaking = true;
				d.cacheAsBitmap(true);
				s.cacheMaking = false;
			}
			bitmapData = d._ll_cacheAsBitmap.bitmapData;
		}
		if(s.bitmapDataIndex === bitmapData.objectIndex){
			return;
		}
		s.bitmapDataIndex = bitmapData.objectIndex;
		bitmapData.applyFilter(bitmapData, new LRectangle(0,0,bitmapData.width,bitmapData.height), new LPoint(0,0), s, c);
	};
	return LBitmapFilter;
})();