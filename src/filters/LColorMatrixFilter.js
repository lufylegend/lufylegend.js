/** @language chinese
 * <p>使用 LColorMatrixFilter 类可以将 4 x 5 矩阵转换应用于输入图像上的每个像素的 RGBA 颜色和 Alpha 值，以生成具有一组新的 RGBA 颜色和 Alpha 值的结果。该类允许饱和度更改、色相旋转、亮度为 Alpha 以及各种其他效果。您可以将滤镜应用于任何显示对象（即，从 LDisplayObject 类继承的对象），以及 LBitmapData 对象。</p>
 * <p>注意：对于 RGBA 值，最高有效字节代表红色通道值，其后的有效字节分别代表绿色、蓝色和 Alpha 通道值。</p>
 * <p>要创建新的颜色矩阵滤镜，请使用 new LColorMatrixFilter() 语法。滤镜的具体使用取决于要应用滤镜的对象：</p>
 * <p>・要对影片剪辑、文本字段、按钮应用滤镜，请使用 filters 属性（继承自 LDisplayObject）。设置对象的 filters 属性不会修改相应的对象，而清除 filters 属性可以删除相应的滤镜。</p>
 * <p>・要对 LBitmapData 对象应用滤镜，请使用 LBitmapData.applyFilter() 方法。对 LBitmapData 对象调用 applyFilter() 会取得源 LBitmapData 对象和滤镜对象，并最终生成一个过滤图像。</p>
 * <p>如果对显示对象应用滤镜，则会自动调用该对象的 cacheAsBitmap(true) 。</p>
 * @class LColorMatrixFilter
 * @extends LBitmapFilter
 * @constructor
 * @param {Array} matrix <p>由 20 个项目（排列成 4 x 5 矩阵）组成的数组。</p>
 * <p>由 20 个项目组成的数组，适用于 4 x 5 颜色转换。matrix 属性不能通过直接修改它的值来更改（例如 myFilter.matrix[2] = 1;）。相反，必须先获取对数组的引用，对引用进行更改，然后重置该值。</p>
 * <p>颜色矩阵滤镜将每个源像素分离成它的红色、绿色、蓝色和 Alpha 成分，分别以 srcR、srcG、srcB 和 srcA 表示。要计算四个通道中每个通道的结果，可将图像中每个像素的值乘以转换矩阵中的值。（可选）可以将偏移量（介于 -255 至 255 之间）添加到每个结果（矩阵的每行中的第五项）中。滤镜将各颜色成分重新组合为单一像素，并写出结果。</p>
 * <p>在下列公式中，a[0] 到 a[19] 对应于由 20 个项目组成的数组中的条目 0 至 19，该数组已传递到 matrix 属性：</p>
 * <p>如果对显示对象应用滤镜，则会自动调用该对象的 cacheAsBitmap(true) 。</p>
 * <p>・redResult   = (a[0]  * srcR) + (a[1]  * srcG) + (a[2]  * srcB) + (a[3]  * srcA) + a[4]</p>
 * <p>・greenResult = (a[5]  * srcR) + (a[6]  * srcG) + (a[7]  * srcB) + (a[8]  * srcA) + a[9]</p>
 * <p>・blueResult  = (a[10] * srcR) + (a[11] * srcG) + (a[12] * srcB) + (a[13] * srcA) + a[14]</p>
 * <p>・alphaResult = (a[15] * srcR) + (a[16] * srcG) + (a[17] * srcB) + (a[18] * srcA) + a[19]</p>
 * <p>对于数组中的每个颜色值，值 1 等于正发送到输出的通道的 100%，同时保留颜色通道的值。</p>
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
 * 		layer.filters = [new LColorMatrixFilter([0.3086,0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0])];
 * 	}
 * @examplelink <p><a href="../../../api/LColorMatrixFilter/index.html" target="_blank">测试链接</a></p>
 * @since 1.9.11
 * @public
 */
var LColorMatrixFilter = (function () {
	function LColorMatrixFilter (matrix) {
		var s = this;
		LExtends(s, LBitmapFilter, []);
		s.type = "LColorMatrixFilter";
		s.matrix = matrix;
	}
	var p = {
		filter : function(olddata, w, c){
			var s = this;
			c = c || LGlobal.canvas;
			var oldpx = olddata.data;
			var newdata = c.createImageData(olddata);
			var newpx = newdata.data;
			var len = newpx.length;
			var a = s.matrix;
			for (var i = 0; i < len; i+=4) {
				newpx[i] = (a[0]  * oldpx[i]) + (a[1]  * oldpx[i+1]) + (a[2]  * oldpx[i+2]) + (a[3]  * oldpx[i+3]) + a[4];
				newpx[i+1] = (a[5]  * oldpx[i]) + (a[6]  * oldpx[i+1]) + (a[7]  * oldpx[i+2]) + (a[8]  * oldpx[i+3]) + a[9];
				newpx[i+2] = (a[10]  * oldpx[i]) + (a[11]  * oldpx[i+1]) + (a[12]  * oldpx[i+2]) + (a[13]  * oldpx[i+3]) + a[14];
				newpx[i+3] = (a[15]  * oldpx[i]) + (a[16]  * oldpx[i+1]) + (a[17]  * oldpx[i+2]) + (a[18]  * oldpx[i+3]) + a[19];
			}
			return newdata;
		}
	};
	for (var k in p) {
		LColorMatrixFilter.prototype[k] = p[k];
	}
	return LColorMatrixFilter;
})();