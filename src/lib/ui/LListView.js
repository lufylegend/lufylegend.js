function LListView(){
	var self = this;
	base(self,LSprite,[]);
	self.size = new LPoint(100,100);//单位高度
	self.rectangle = new LRectangle (0, 0, 100, 100);//范围
	self.childWidth = 100;//单位宽度
	self.childHeight = 100;//单位高度
	self.direction = LListView.HORIZONTAL;//排列方向
	self.number = 1;//每组长度
	self._ll_items = [];
	self._ll_x = 0;
	self._ll_y = 0;
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
LListView.VERTICAL = "vertical";//垂直方向
LListView.HORIZONTAL = "horizontal";//水平方向
LListView.prototype.onframe = function(event){
	var self = event.target;
	if(self.rectangle.x == self._ll_x && self.rectangle.y == self._ll_y){
		return;
	}
	var startX = self.rectangle.x / self.rectangle.width >>> 0;
	var startY = self.rectangle.y / self.rectangle.height >>> 0;
	for(var i = 0, l = Math.ceil(self.rectangle.height / self.childHeight); i < l; i++){
		var xIndex = (startY + i) * self.number + startX;
		
	}
	
	self._ll_x = self.rectangle.x;
	self._ll_y = self.rectangle.y;
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
	self.bitmapData = new LBitmapData(null, 0, 0, w, h);
	self.rectangle.width = w;
	self.rectangle.height = h;
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
LListChildView.prototype.updateView = function(){
	
};
LListChildView.prototype.updateView1 = function(){
	
};