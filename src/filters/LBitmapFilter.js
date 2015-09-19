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
	return LBitmapFilter;
})();