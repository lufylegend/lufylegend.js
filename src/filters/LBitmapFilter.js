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
	LBitmapFilter.prototype.convolve = function (olddata, w) {
		var s = this, c = LGlobal.canvas;
		var oldpx = olddata.data;
		var newdata = c.createImageData(olddata);
		var newpx = newdata.data;
		var len = newpx.length;
		for (var i = 0; i < len; i++) {
			if ((i + 1) % 4 === 0) {
				newpx[i] = oldpx[i];
				continue;
			}
			res = 0;
			var these = [
				oldpx[i - w * 4 - 4] || oldpx[i],
				oldpx[i - w * 4]     || oldpx[i],
				oldpx[i - w * 4 + 4] || oldpx[i],
				oldpx[i - 4]         || oldpx[i],
				oldpx[i],
				oldpx[i + 4]         || oldpx[i],
				oldpx[i + w * 4 - 4] || oldpx[i],
				oldpx[i + w * 4]     || oldpx[i],
				oldpx[i + w * 4 + 4] || oldpx[i]
			];
			for (var j = 0; j < 9; j++) {
				res += these[j] * s.matrix[j];
			}
			res /= s.divisor;
			if (s.bias) {
				res += s.bias;
			}
			newpx[i] = res;
		}
		return newdata;
	};
	return LBitmapFilter;
})();