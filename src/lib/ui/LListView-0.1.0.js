function LListView(){
	var self = this;
	base(self,LSprite,[]);
	self.bitmapData = new LBitmapData(null, 0, 0, 100, 100, LBitmapData.DATA_CANVAS);
	self.addChild(new LBitmap(self.bitmapData));
	self.clipping = new LRectangle (0, 0, 100, 100);//范围
	self.clipping.parent = self;
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

	self.scrollBarVertical = new LListScrollBar();
	self.addChild(self.scrollBarVertical);
	self.scrollBarHorizontal = new LListScrollBar();
	self.addChild(self.scrollBarHorizontal);
	/// Maximum children per line.
	/// If the arrangement is horizontal, this denotes the number of columns.
	/// If the arrangement is vertical, this stands for the number of rows.
	self.maxPerLine = 1;//每组长度
	self._ll_items = [];
	self._ll_x = Number.MAX_VALUE;
	self._ll_y = 0;
	self.addEventListener(LEvent.ENTER_FRAME,self._ll_onframe);
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self._ll_ondown);
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
LListView.ScrollBarCondition = {
	Always:"always",
	OnlyIfNeeded:"onlyIfNeeded",
	WhenDragging:"whenDragging"
};
LListView.prototype.setVerticalScrollBar = function(value){
	var self = this;
	self.scrollBarVertical = value;
	self.scrollBarVertical.resizeHeight(self.clipping.height);
};
LListView.prototype.setHorizontalScrollBar = function(value){
	var self = this;
	self.scrollBarHorizontal = value;
	self.scrollBarHorizontal.resizeWidth(self.clipping.width);
};
LListView.prototype.resize = function(w, h){
	var self = this;
	self.bitmapData.image.height = self.bitmapData.height = h;
	self.bitmapData.image.width = self.bitmapData.width = w;
	self.clipping.width = w;
	self.clipping.height = h;
	self.scrollBarVertical.x = self.clipping.width;
	self.scrollBarHorizontal.y = self.clipping.height;
	//self.scrollBarVertical.visible = false;
	//self.scrollBarHorizontal.visible = false;
	self.scrollBarVertical.resizeHeight(self.clipping.height);
	self.scrollBarHorizontal.resizeWidth(self.clipping.width);
	self.resizeScrollBar();
};
LListView.prototype._ll_ondown = function(event){
	var self = event.currentTarget;
	var dragObject = new LListViewDragObject(self);
	LGlobal.stage.addChild(dragObject);
	dragObject.startDrag(event.touchPointID);
};
LListView.prototype._ll_onframe = function(event){
	var self = event.currentTarget;
	if(self.clipping.x == self._ll_x && self.clipping.y == self._ll_y){
		return;
	}
	self.bitmapData.clear();
	var length = self._ll_items.length;
	var startX = self.clipping.x / self.cellWidth >> 0;
	var startY = self.clipping.y / self.cellHeight >> 0;
	if(self.arrangement == LListView.Direction.Horizontal){
		for(var i = 0, l = Math.ceil(self.clipping.height / self.cellHeight); i < l; i++){
			var xIndex = (startY + i) * self.maxPerLine + startX;
			for(var j = 0, jl = Math.ceil(self.clipping.width / self.cellWidth);j < self.maxPerLine && j < jl; j++){
				var index = xIndex + j;
				if(index < 0)continue;
				if(index >= length){
					break;
				}
				var item = self._ll_items[index];
				var x = (index % self.maxPerLine) * self.cellWidth;
				var y = (index / self.maxPerLine >>> 0) * self.cellHeight;
				item.updateView(self.bitmapData, new LRectangle(0, 0, self.cellWidth, self.cellHeight), new LPoint(x - self.clipping.x, y - self.clipping.y));
			}
		}
	}else{
		for(var i = 0, l = Math.ceil(self.clipping.width / self.cellWidth); i < l; i++){
			var yIndex = (startX + i) * self.maxPerLine + startY;
			for(var j = 0, jl = Math.ceil(self.clipping.height / self.cellHeight);j < self.maxPerLine && j < jl; j++){
				var index = yIndex + j;
				if(index < 0)continue;
				if(index >= length){
					break;
				}
				var item = self._ll_items[index];
				var y = (index % self.maxPerLine) * self.cellHeight;
				var x = (index / self.maxPerLine >>> 0) * self.cellWidth;
				item.updateView(self.bitmapData, new LRectangle(0, 0, self.cellWidth, self.cellHeight), new LPoint(x - self.clipping.x, y - self.clipping.y));
			}
		}
	}
	self.setScrollBarsPositon();
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
	self.resizeScrollBar();
};
LListView.prototype.updateList = function(list){
	var self = this;
	self._ll_items = list;
	self.resizeScrollBar();
};
LListView.prototype.setScrollBarsPositon = function(){
	var self = this;
	if(self.allWidth > 0){
		self.scrollBarHorizontal.setX(self.clipping.x / self.allWidth);
	}
	if(self.allHeight > 0){
		self.scrollBarVertical.setY(self.clipping.y / self.allHeight);
	}
};
LListView.prototype.dragStart = function(){
	var self = this;
	if(self.scrollBarHorizontal.showCondition == LListView.ScrollBarCondition.WhenDragging){
		self.scrollBarHorizontal.visible = true;
	}
	if(self.scrollBarVertical.showCondition == LListView.ScrollBarCondition.WhenDragging){
		self.scrollBarVertical.visible = true;
	}
};
LListView.prototype.dragEnd = function(){
	var self = this;
	if(self.scrollBarHorizontal.showCondition == LListView.ScrollBarCondition.WhenDragging){
		self.scrollBarHorizontal.visible = false;
	}
	if(self.scrollBarVertical.showCondition == LListView.ScrollBarCondition.WhenDragging){
		self.scrollBarVertical.visible = false;
	}
};
LListView.prototype.resizeScrollBar = function(){
	var self = this, scaleX, scaleY, w, h;
	var length = self._ll_items.length;
	if(self.arrangement == LListView.Direction.Horizontal){
		w = self.cellWidth * (length > self.maxPerLine ? self.maxPerLine : length);
		h = self.cellHeight * (length / self.maxPerLine >>> 0);
	}else{
		h = self.cellHeight * (length > self.maxPerLine ? self.maxPerLine : length);
		w = self.cellWidth * (length / self.maxPerLine >>> 0);
	}
	scaleX = self.clipping.width < w ? self.clipping.width / w : 1;
	scaleY = self.clipping.height < h ? self.clipping.height / h : 1;
	self.allWidth = w - self.clipping.width;
	self.allHeight = h - self.clipping.height;
	console.log(w,h,scaleX,scaleY);
	self.scrollBarHorizontal.setWidthScale(scaleX);
	self.setScrollBarVisible(self.scrollBarHorizontal, scaleX);
	self.scrollBarVertical.setHeightScale(scaleY);
	self.setScrollBarVisible(self.scrollBarVertical, scaleY);
};
LListView.prototype.setScrollBarVisible = function(bar, scale){
	if(bar.showCondition == LListView.ScrollBarCondition.Always){
		bar.visible = true;
	}else if(bar.showCondition == LListView.ScrollBarCondition.OnlyIfNeeded){
		if(scale > 1){
			bar.visible = false;
		}else{
			bar.visible = true;
		}
	}else{
		bar.visible = false;
	}
};
function LListScrollBar(background, foreground, showCondition){
	var self = this;
	base(self,LSprite,[]);
	self.background = background ? background : new LPanel("#CCCCCC", 8, 8);
	self.addChild(self.background);
	self.foreground = foreground ? foreground : new LPanel("#333333", 8, 8);
	self.addChild(self.foreground);
	self.showCondition = showCondition ? showCondition : LListView.ScrollBarCondition.OnlyIfNeeded;
}
LListScrollBar.prototype.resizeWidth = function(value){
	var self = this;
	self.background.resize(value, self.background.getHeight());
};
LListScrollBar.prototype.resizeHeight = function(value){
	var self = this;
	self.background.resize(self.background.getWidth(), value);
};
LListScrollBar.prototype.setWidthScale = function(value){
	var self = this;
	self.foreground.resize(self.background.getWidth() * value, self.foreground.getHeight());
};
LListScrollBar.prototype.setHeightScale = function(value){
	var self = this;
	self.foreground.resize(self.foreground.getWidth(), self.background.getHeight() * value);
};
LListScrollBar.prototype.setX = function(scaleX){
	var self = this;
	if(scaleX < 0){
		scaleX = 0;
	}else if(scaleX > 1){
		scaleX = 1;
	}
	self.foreground.x = (self.background.getWidth() - self.foreground.getWidth()) * scaleX;
};
LListScrollBar.prototype.setY = function(scaleY){
	var self = this;
	if(scaleY < 0){
		scaleY = 0;
	}else if(scaleY > 1){
		scaleY = 1;
	}
	self.foreground.y = (self.background.getHeight() - self.foreground.getHeight()) * scaleY;
};
function LListChildView(){
	var self = this;
	base(self,LSprite,[]);
	
}
LListChildView.prototype.updateView = function(bitmapData, rectangle, point){
	var self = this;
	if(!self._ll_cacheAsBitmap){
		self.cacheAsBitmap(true);
	}//console.log("updateView ",self.i, point);
	bitmapData.copyPixels(self._ll_cacheAsBitmap.bitmapData, rectangle, point);
};
function LListViewDragObject(listView){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(0, "#000000", [-10, -10, 20, 20]);
	self.listView = listView;
	self.sx = self.x = mouseX;
	self.sy = self.y = mouseY;
	self.vx = self.listView.clipping.x;
	self.vy = self.listView.clipping.y;
	if(LGlobal.listViewDragObject){
		LGlobal.listViewDragObject.remove();
	}
	listView.dragStart();
	LGlobal.listViewDragObject = self;
	self.addEventListener(LMouseEvent.MOUSE_UP, self._ll_onup);
	self.addEventListener(LEvent.ENTER_FRAME,self._ll_onframe);
	LGlobal.stage.addEventListener(LFocusEvent.FOCUS_OUT, self._ll_focusout);
}
LListViewDragObject.prototype._ll_onup = function(event){
	var self = event.currentTarget;
	self._ll_stop();
};
LListViewDragObject.prototype._ll_focusout = function(event){
	var self = LGlobal.listViewDragObject;
	if(self){
		self._ll_stop();
	}
};
LListViewDragObject.prototype._ll_stop = function(){
	var self = this;
	self.listView.dragEnd();
	self.stopDrag();
	self.isDeleted = true;
	var move = self.inertia();
	if(move || (self.fX == self.toX && self.fY == self.toY)){
		return;
	}
	self._ll_tween();
};
LListViewDragObject.prototype.inertia = function(){
	var self = this;
	var listView = self.listView;
	var mx = listView.clipping.x - self.fX;
	var my = listView.clipping.y - self.fY;
	if(Math.abs(mx) < 5){
		mx = 0;
	}
	if(Math.abs(my) < 5){
		my = 0;
	}
	if(mx == 0 && my == 0){
		return false;
	}
	var tx = listView.clipping.x;
	var ty = listView.clipping.y;
	if(mx != 0){
		tx += mx * 5;
	}
	if(my != 0){
		ty += my * 5;
	}
	LTweenLite.to(self.listView.clipping,0.3,{x:tx,y:ty,ease:LEasing.Sine.easeOut,onComplete:self.tweenComplete});
	return true;
};
LListViewDragObject.prototype.tweenComplete = function(event){
	var self = event.target;
	LListViewDragObject.prototype.dragAmend.apply(self, []);
};
LListViewDragObject.prototype._ll_tween = function(){
	var self = this;
	LTweenLite.to(self.listView.clipping,0.3,{x:self.toX,y:self.toY,ease:LEasing.Sine.easeOut});
};
LListViewDragObject.prototype._ll_onframe = function(event){
	var self = event.currentTarget;
	if(self.isDeleted){
		self.remove();
		LGlobal.listViewDragObject = null;
		return;
	}
	var listView = self.listView;
	self.fX = self.toX = listView.clipping.x;
	self.fY = self.toY = listView.clipping.y;
	listView.clipping.x = self.sx - self.x + self.vx;
	listView.clipping.y = self.sy - self.y + self.vy;
	LListViewDragObject.prototype.dragAmend.apply(self, []);
};
LListViewDragObject.prototype.dragAmend = function(){
	var self = this, listView, dragObject = false;
	if(self.listView){
		listView = self.listView;
		dragObject = true;
	}else{
		listView = self.parent;
	}
	var tx = listView.clipping.x;
	var ty = listView.clipping.y;
	if(listView.clipping.x < 0){
		if(!dragObject){
			tx = 0;
		}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
			listView.clipping.x *= 0.5;
			self.toX = 0;
		}else{
			listView.clipping.x = 0;
		}
	}else{
		var length = listView._ll_items.length, width;
		if(self.arrangement == LListView.Direction.Horizontal){
			width = (length > listView.maxPerLine ? listView.maxPerLine : length) * listView.cellWidth;
		}else{
			width = Math.ceil(length / listView.maxPerLine) * listView.cellWidth;
		}
		if(listView.clipping.x > width - listView.clipping.width){
			if(!dragObject){
				tx = width - listView.clipping.width;
			}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
				self.toX = width - listView.clipping.width;
				listView.clipping.x = self.toX + (listView.clipping.x - width + listView.clipping.width) * 0.5;
			}else{
				listView.clipping.x = width - listView.clipping.width;
			}
		}
	}
	if(listView.clipping.y < 0){
		if(!dragObject){
			ty = 0;
		}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
			listView.clipping.y *= 0.5;
			self.toY = 0;
		}else{
			listView.clipping.y = 0;
		}
	}else{
		var length = listView._ll_items.length, height;
		if(self.arrangement == LListView.Direction.Horizontal){
			height = Math.ceil(length / listView.maxPerLine) * listView.cellHeight;
		}else{
			height = (length > listView.maxPerLine ? listView.maxPerLine : length) * listView.cellHeight;
		}
		if(listView.clipping.y > height - listView.clipping.height){
			if(!dragObject){
				ty = height - listView.clipping.height;
			}else if(listView.dragEffect == LListView.DragEffects.MomentumAndSpring){
				self.toY = height - listView.clipping.height;
				listView.clipping.y = self.toY + (listView.clipping.y - height + listView.clipping.height) * 0.5;
			}else{
				listView.clipping.y = height - listView.clipping.height;
			}
		}
	}
	if(!dragObject && (tx != listView.clipping.x || ty != listView.clipping.y)){
		LTweenLite.to(listView.clipping,0.3,{x:tx,y:ty,ease:LEasing.Sine.easeOut});
	}
};