/** @language chinese
 * <p>LConvolutionFilter 类应用矩阵盘绕滤镜效果。卷积将输入图像的像素与相邻的像素合并以生成图像。通过卷积，可以实现大量的图像效果，包括模糊、边缘检测、锐化、浮雕和斜角。您可以将滤镜应用于任何显示对象（即，从 LDisplayObject 类继承的对象）</p>
 * <p>・要对影片剪辑、文本字段、按钮应用滤镜，请使用 filters 属性（继承自 LDisplayObject）。设置对象的 filters 属性不会修改相应的对象，而清除 filters 属性可以删除相应的滤镜。</p>
 * <p>・要对 LBitmapData 对象应用滤镜，请使用 LBitmapData.applyFilter() 方法。对 LBitmapData 对象调用 applyFilter() 会取得源 LBitmapData 对象和滤镜对象，并最终生成一个过滤图像。</p>
 * <p>如果对显示对象应用滤镜，则会自动调用该对象的 cacheAsBitmap(true) 。</p>
 * @class LConvolutionFilter
 * @extends LBitmapFilter
 * @constructor
 * @param {int} matrixX 矩阵的 x 维度（矩阵中列的数目）。默认值为 0。
 * @param {int} matrixY 矩阵的 y 维度（矩阵中行的数目）。默认值为 0。
 * @param {Array} matrix 用于矩阵转换的值的数组。数组中的项数必须等于 matrixX * matrixY。
 * @param {int} divisor 矩阵转换中使用的除数。默认值为 1。
 * @param {int} bias 要添加到矩阵转换结果的偏差。默认值为 0。
 * @example
 * 	LInit(1000/60, "legend", 800, 480, main);
 * 	function main () {
 * 		loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("face.jpg", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var layer = new LSprite();
 * 		layer.x = layer.y = 100;
 * 		addChild(layer);
 * 		var bitmapdata = new LBitmapData(event.target);	
 * 		var bitmap = new LBitmap(bitmapdata);	
 * 		layer.addChild(bitmap);	
 * 		var sprite = new LSprite();	
 * 		sprite.graphics.drawRect(3, "#000000", [0, 0, 190, 100],true,"#00FF00");	
 * 		sprite.x = -100;		
 * 		layer.addChild(sprite);		
 * 		layer.filters = [new LConvolutionFilter(3,3,[-5, 0, 0, 0, 0, 0, 0, 0, 5])];		
 * 	}
 * @examplelink <p><a href="../../../api/LConvolutionFilter/index.html" target="_blank">测试链接</a></p>
 * @since 1.9.11
 * @public
 */
var LConvolutionFilter = (function () {
	function LConvolutionFilter (matrixX, matrixY, matrix, divisor, bias, preserveAlpha, clamp, color, alpha) {
		var s = this;
		LExtends(s, LBitmapFilter, []);
		s.type = "LConvolutionFilter";
		s.matrixX = matrixX ? matrixX : 0;
		s.matrixY = matrixY ? matrixY : 0;
		s.matrix = matrix;
		if (!divisor) {
			divisor = matrix.reduce(function(a, b) {return a + b;}) || 1;
		}
		s.divisor = divisor;
		s.bias = bias ? bias : 0;
	}
	var p = {
		filter : function(olddata, w, c){
			var s = this;
			c = c || LGlobal.canvas;
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
		}
	};
	for (var k in p) {
		LConvolutionFilter.prototype[k] = p[k];
	}
	return LConvolutionFilter;
})();