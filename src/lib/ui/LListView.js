function LListView(){
	var self = this;
	base(self,LSprite,[]);
	self.bitmapData = new LBitmapData(null, 0, 0, 100, 100, LBitmapData.DATA_CANVAS);
	self.addChild(new LBitmap(self.bitmapData));
	self.clipping = new LRectangle (0, 0, 100, 100);//范围
	/// The width of each of the cells.
	self.cellWidth = 100;//单位宽度
	/// The height of each of the cells.
	self.cellHeight = 100;//单位高度
	/// Type of arrangement -- vertical or horizontal.
	self.arrangement = LListView.Direction.Horizontal;//排列方向
	/// Type of movement allowed
	self.movement = LListView.Direction.Vertical;//运动方向
	/// Effect to apply when dragging.
	self.dragEffect = LListView.DragEffects.MomentumAndSpring;

	/// Maximum children per line.
	/// If the arrangement is horizontal, this denotes the number of columns.
	/// If the arrangement is vertical, this stands for the number of rows.
	self.maxPerLine = 1;//每组长度
	self._ll_items = [];
	self._ll_x = Number.MAX_VALUE;
	self._ll_y = 0;
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
LListView.DragEffects = {
	None:"none",//无效果
	Momentum:"momentum",//拖动惯性
	MomentumAndSpring:"momentumAndSpring"//拖动惯性+边界惯性
};
LListView.Direction = {
	Horizontal:"horizontal",//水平
	Vertical:"vertical",//垂直
	Unrestricted:"unrestricted"//无限制
};
LListView.prototype.onframe = function(event){
	var self = event.currentTarget;
	if(self.clipping.x == self._ll_x && self.clipping.y == self._ll_y){
		return;
	}
	self.bitmapData.clear();
	var length = self._ll_items.length;
	var startX = self.clipping.x / self.cellWidth >>> 0;
	var startY = self.clipping.y / self.cellHeight >>> 0;
	console.log("startX,startY",startX,startY);
	for(var i = 0, l = Math.ceil(self.clipping.height / self.cellHeight); i < l; i++){
		var xIndex = (startY + i) * self.maxPerLine + startX;
		for(var j = 0, jl = Math.ceil(self.clipping.width / self.cellWidth);j < self.maxPerLine && j < jl; j++){
			var index = xIndex + j;
			if(index >= length){
				break;
			}
			var item = self._ll_items[index];
			var x = (index % self.maxPerLine) * self.cellWidth;
			var y = (index / self.maxPerLine >>> 0) * self.cellHeight;
			item.updateView(self.bitmapData, new LRectangle(0, 0, self.cellWidth, self.cellHeight), new LPoint(x - self.clipping.x, y - self.clipping.y));
			//console.log(j+1,jl,self.maxPerLine);
		}
	}
	
	self._ll_x = self.clipping.x;
	self._ll_y = self.clipping.y;
};
LListView.prototype.insert = function(child, index){
	var self = this;
	if(typeof index == UNDEFINED){
		self._ll_items.push(child);
	}else{
		self._ll_items.splice(index, 0, child);
	}
};
LListView.prototype.resize = function(w, h){
	var self = this;
	self.bitmapData.image.height = self.bitmapData.height = h;
	self.bitmapData.image.width = self.bitmapData.width = w;
	self.clipping.width = w;
	self.clipping.height = h;
};
LListView.prototype.updateList = function(list){
	this._ll_items = list;
};
LListView.prototype.updateView = function(list){
	var self = this;
};
function LListChildView(){
	var self = this;
	base(self,LSprite,[]);
	
}
LListChildView.prototype.updateView = function(bitmapData, rectangle, point){
	var self = this;
	if(!self._ll_cacheAsBitmap){
		self.cacheAsBitmap(true);
	}console.log("updateView ",self.i, point);
	bitmapData.copyPixels(self._ll_cacheAsBitmap.bitmapData, rectangle, point);
};