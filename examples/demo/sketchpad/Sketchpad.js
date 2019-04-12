
function Sketchpad(width, height, movingStep) {
	var self = this;
	LExtends(self, LSprite, []);
	this._movingStep = movingStep || 1;
	self._bitmapData = new LBitmapData(null, 0, 0, width, height, LBitmapData.DATA_CANVAS);
	var bitmap = new LBitmap(this._bitmapData);
	self.addChild(bitmap);
	self._brushList = [];
	self.addEventListener(LEvent.ENTER_FRAME, self._onframe);
}
Sketchpad.prototype._onframe = function (event) {
	var self = event.currentTarget;
	for (var i = 0; i < self._brushList.length; i++) {
		self._draw(self._brushList[i]);
	}
};
Sketchpad.prototype._draw = function (brush) {
	var child = brush.child;
	var point = brush.point;
	if (child.x === point.x && child.y === point.y) {
		return;
	}
	var length = LPoint.distance2(child.x, child.y, point.x, point.y);
	var count = Math.ceil(length / this._movingStep);
	var countX = (child.x - point.x) / count;
	var countY = (child.y - point.y) / count;
	var bitmapData = child._ll_cacheAsBitmap.bitmapData;
	while (count-- >= 0) {
		point.x += countX;
		point.y += countY;
		this._bitmapData._context.drawImage(bitmapData.image, 0, 0, brush.width, brush.height, point.x, point.y, brush.width, brush.height);
	}
	point.x = child.x;
	point.y = child.y;
};
Sketchpad.prototype.addBrush = function (displayObject) {
	displayObject.cacheAsBitmap(true);
	var width = displayObject.getWidth();
	var height = displayObject.getHeight();
	this._brushList.push({ child: displayObject, point: { x: displayObject.x, y: displayObject.y }, width: width, height: height });
	var bitmapData = displayObject._ll_cacheAsBitmap.bitmapData;
	this._bitmapData._context.drawImage(bitmapData.image, 0, 0, width, height, displayObject.x, displayObject.y, width, height);
};
Sketchpad.prototype.clearBrush = function (displayObject) {
	this._brushList.length = 0;
};
Sketchpad.prototype.clear = function (displayObject) {
	self._bitmapData = new LBitmapData(null, 0, 0, width, height, LBitmapData.DATA_CANVAS);
	this.getChildAt(0).bitmapData = self._bitmapData;
};