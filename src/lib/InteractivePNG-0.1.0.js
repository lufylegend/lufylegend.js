/** @language chinese
 * <p>Library:lufylegend.InteractivePNG-x.x.x.min.js</p>
 * <p>在相应鼠标事件的时候，过滤图片中的透明区域，使用上和LSprite没有区别，只是子对象只能是LBitmap。</p>
 * @class InteractivePNG
 * @extends LSprite
 * @constructor
 * @since 1.9.12
 * @examplelink <p><a href="../../../api/InteractivePNG/index.html" target="_blank">测试链接</a></p>
 * @public
 */
var InteractivePNG = (function() {
	function InteractivePNG() {
		LExtends(this, LSprite, []);
	}
	InteractivePNG.prototype.hitTestPoint = function(x, y) {
		var self = this;
		var point = self.getRootCoordinate();
		point.x = x - point.x;
		point.y = y - point.y;
		for (var i = 0, l = self.childList.length; i < l; i++) {
			var child = self.childList[0];
			if (!child.bitmapData._locked) {
				child.bitmapData.lock();
			}
			var cx = point.x - child.x;
			var cy = point.y - child.y;
			if(cx < 0 || cx > child.bitmapData.width || cy < 0 || cy > child.bitmapData.height){
				continue;
			}
			var pixel = child.bitmapData.getPixel(point.x - child.x, point.y - child.y);
			if (pixel && (pixel[0] > 0 || pixel[1] > 0 || pixel[2] > 0 || pixel[3] > 0)) {
				return true;
			}
		}
		return false;
	};
	InteractivePNG.prototype.ismouseon = function(e, cd) {
		return this.hitTestPoint(e.offsetX, e.offsetY);
	};
	InteractivePNG.prototype.addChild = function(d) {
		if (d.type != "LBitmap") {
			console.error("Only support LBitmap！");
			return;
		}
		/*为了保证hitTestPoint的效率，提前将bitmapData锁定*/
		d.bitmapData.lock();
		this.callParent("addChild", arguments);
	};
	InteractivePNG.prototype.addChildAt = function(d, i) {
		if (d.type != "LBitmap") {
			console.error("Only support LBitmap！");
			return;
		}
		/*为了保证hitTestPoint的效率，提前将bitmapData锁定*/
		d.bitmapData.lock();
		this.callParent("addChildAt", arguments);
	};
	return InteractivePNG;
})();