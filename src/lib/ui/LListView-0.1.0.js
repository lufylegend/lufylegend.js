/** @language chinese
 * <p>lufylegend.js专用UI，list列表。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListView
 * @constructor
 * @extends LSprite
 * @since 1.9.12
 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
 * @public
 */
var LListView = (function () {
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
		self.scrollBarVertical.resizeHeight(self.clipping.height);
		self.scrollBarHorizontal.resizeWidth(self.clipping.width);
		self.resizeScrollBar();
	};
	LListView.prototype._ll_ondown = function(event){
		var self = event.currentTarget;
		var dragObject = new LListViewDragObject(self, event.selfX, event.selfY);
		LGlobal.stage.addChild(dragObject);
		dragObject.startDrag(event.touchPointID);
	};
	LListView.prototype.updateView = function(){
		var self = this;
		self._ll_x = Number.MAX_VALUE;
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
		var addX = self.clipping.width % self.cellWidth == 0 ? 0 : 1;
		var addY = self.clipping.height % self.cellHeight == 0 ? 0 : 1;
		addX = addY = 1;
		if(self.arrangement == LListView.Direction.Horizontal){
			for(var i = 0, l = Math.ceil(self.clipping.height / self.cellHeight) + addY; i < l; i++){
				var xIndex = (startY + i) * self.maxPerLine + startX;
				for(var j = 0, jl = Math.ceil(self.clipping.width / self.cellWidth) + addX;j < self.maxPerLine && j < jl; j++){
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
			var add = self.clipping.width % self.cellWidth == 0 ? 0 : 1;
			for(var i = 0, l = Math.ceil(self.clipping.width / self.cellWidth) + addX; i < l; i++){
				var yIndex = (startX + i) * self.maxPerLine + startY;
				for(var j = 0, jl = Math.ceil(self.clipping.height / self.cellHeight) + addY;j < self.maxPerLine && j < jl; j++){
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
	LListView.prototype.clickOnChild = function(selfX, selfY){
		var self = this;
		var x = self.clipping.x + selfX;
		var y = self.clipping.y + selfY;
		var index;
		if(self.arrangement == LListView.Direction.Horizontal){
			index = (y / self.cellHeight >>> 0) * self.maxPerLine + (x / self.cellWidth >>> 0);
		}else{
			index = (y / self.cellHeight >>> 0) + (x / self.cellWidth >>> 0) * self.maxPerLine;
		}
		if(index < self._ll_items.length){
			var event = {listView:self,offsetX:mouseX,offsetY:mouseY,selfX:(x % self.cellWidth),selfY:(y % self.cellHeight)};
			self._ll_items[index].onClick(event);
		}
	};
	LListView.prototype.insertChild = function(child, index){
		var self = this;
		if(typeof index == UNDEFINED){
			self._ll_items.push(child);
		}else{
			self._ll_items.splice(index, 0, child);
		}
		self.resizeScrollBar();
	};
	LListView.prototype.removeChild = function(child){
		var self = this, c = self._ll_items, i, l;
		for (i = 0, l = c.length; i < l; i++) {
			if (child.objectIndex == c[i].objectIndex) {
				self._ll_items.splice(i, 1);
				break;
			}
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
			h = self.cellHeight * Math.ceil(length / self.maxPerLine);
		}else{
			h = self.cellHeight * (length > self.maxPerLine ? self.maxPerLine : length);
			w = self.cellWidth * Math.ceil(length / self.maxPerLine);
		}
		scaleX = self.clipping.width < w ? self.clipping.width / w : 1;
		scaleY = self.clipping.height < h ? self.clipping.height / h : 1;
		self.allWidth = w - self.clipping.width;
		self.allHeight = h - self.clipping.height;
		self.scrollBarHorizontal.setWidthScale(scaleX);
		self.setScrollBarVisible(self.scrollBarHorizontal, scaleX);
		self.scrollBarVertical.setHeightScale(scaleY);
		self.setScrollBarVisible(self.scrollBarVertical, scaleY);
		self.updateView();
	};
	LListView.prototype.setScrollBarVisible = function(bar, scale){
		if(bar.showCondition == LListView.ScrollBarCondition.Always){
			bar.visible = true;
		}else if(bar.showCondition == LListView.ScrollBarCondition.OnlyIfNeeded){
			if(scale >= 1){
				bar.visible = false;
			}else{
				bar.visible = true;
			}
		}else{
			bar.visible = false;
		}
	};
	return LListView;
})();
/** @language chinese
 * <p>lufylegend.js专用UI，list列表。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListScrollBar
 * @constructor
 * @extends LSprite
 * @since 1.9.12
 * @param {LPanel} background 滚动条背景。
 * @param {LPanel} foreground 滚动条样式。
 * @param {LListView.ScrollBarCondition} showCondition 滚动条样式。
 * @examplelink <p><a href="../../../api/ui/LListScrollBar.html" target="_blank">测试链接</a></p>
 * @public
 */
var LListScrollBar = (function () {
	function LListScrollBar(background, foreground, showCondition){
		var self = this;
		base(self,LSprite,[]);
		self.background = background ? background : new LPanel("#333333", 8, 8);
		self.addChild(self.background);
		self.foreground = foreground ? foreground : new LPanel("#CCCCCC", 8, 8);
		self.addChild(self.foreground);
		self.showCondition = showCondition ? showCondition : LListView.ScrollBarCondition.OnlyIfNeeded;
	}
	LListScrollBar.prototype.resizeWidth = function(value){
		var self = this;
		self.background.cacheAsBitmap(false);
		self.background.resize(value, self.background.getSize().height);
		self.background.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.resizeHeight = function(value){
		var self = this;
		self.background.cacheAsBitmap(false);
		self.background.resize(self.background.getSize().width, value);
		self.background.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.setWidthScale = function(value){
		var self = this;
		self.foreground.cacheAsBitmap(false);
		self.foreground.resize(self.background.getSize().width * value, self.foreground.getSize().height);
		self.foreground.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.setHeightScale = function(value){
		var self = this;
		self.foreground.cacheAsBitmap(false);
		self.foreground.resize(self.foreground.getSize().width, self.background.getSize().height * value);
		self.foreground.cacheAsBitmap(true);
	};
	LListScrollBar.prototype.setX = function(scaleX){
		var self = this;
		if(scaleX < 0){
			scaleX = 0;
		}else if(scaleX > 1){
			scaleX = 1;
		}
		self.foreground.x = (self.background.getSize().width - self.foreground.getSize().width) * scaleX;
	};
	LListScrollBar.prototype.setY = function(scaleY){
		var self = this;
		if(scaleY < 0){
			scaleY = 0;
		}else if(scaleY > 1){
			scaleY = 1;
		}
		self.foreground.y = (self.background.getSize().height - self.foreground.getSize().height) * scaleY;
	};
	return LListScrollBar;
})();
var LListChildView = (function () {
	function LListChildView(){
		var self = this;
		base(self,LSprite,[]);
		
	}
	LListChildView.prototype.updateView = function(bitmapData, rectangle, point){
		var self = this;
		if(!self._ll_cacheAsBitmap){
			self.cacheAsBitmap(true);
		}
		if(bitmapData){
			self.ll_baseBitmapData = bitmapData;
			self.ll_baseRectangle = rectangle;
			self.ll_basePoint = point;
		}
		self.ll_baseBitmapData.copyPixels(self._ll_cacheAsBitmap.bitmapData, self.ll_baseRectangle, self.ll_basePoint);
	};
	LListChildView.prototype.onClick = function(event){};
	return LListChildView;
})();
var LListViewDragObject = (function () {
	function LListViewDragObject(listView, selfX, selfY){
		var self = this;
		base(self,LSprite,[]);
		self.graphics.drawRect(0, "#000000", [-10, -10, 20, 20]);
		self.listView = listView;
		self.sx = self.x = mouseX;
		self.sy = self.y = mouseY;
		self.vx = self.listView.clipping.x;
		self.vy = self.listView.clipping.y;
		self.selfX = selfX;
		self.selfY = selfY;
		if(LGlobal.listViewDragObject){
			LGlobal.listViewDragObject.remove();
		}
		
		
		self.horizontalStop = true, self.verticalStop = true;
		if(listView.movement == LListView.Direction.Unrestricted){
			self.horizontalStop = self.verticalStop = false;
		}else if(listView.movement == LListView.Direction.Horizontal){
			self.horizontalStop = false;
			self.verticalStop = true;
		}else if(listView.movement == LListView.Direction.Vertical){
			self.horizontalStop = true;
			self.verticalStop = false;
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
		if(Math.abs(mouseX - self.sx) < 5 && Math.abs(mouseY - self.sy) < 5){
			self.listView.clickOnChild(mouseX - self.sx + self.selfX, mouseY - self.sy + self.selfY);
		}
		
		if(self.listView.dragEffect == LListView.DragEffects.None){
			return;
		}
		var move = self.inertia();
		if(move){
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
		if(listView.dragEffect == LListView.DragEffects.Momentum){
			if(tx < 0){
				tx = 0;
			}else if(tx > listView.allWidth){
				tx = listView.allWidth;
			}
			if(ty < 0){
				ty = 0;
			}else if(ty > listView.allHeight){
				ty = listView.allHeight;
			}
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
		if(!self.horizontalStop){
			listView.clipping.x = self.sx - self.x + self.vx;
		}
		if(!self.verticalStop){
			listView.clipping.y = self.sy - self.y + self.vy;
		}
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
			if(listView.arrangement == LListView.Direction.Horizontal){
				width = (length > listView.maxPerLine ? listView.maxPerLine : length) * listView.cellWidth;
			}else{
				width = Math.ceil(length / listView.maxPerLine) * listView.cellWidth;
			}
			if(width > listView.clipping.width && listView.clipping.x > width - listView.clipping.width){
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
			if(listView.arrangement == LListView.Direction.Horizontal){
				height = Math.ceil(length / listView.maxPerLine) * listView.cellHeight;
			}else{
				height = (length > listView.maxPerLine ? listView.maxPerLine : length) * listView.cellHeight;
			}
			if(height > listView.clipping.height && listView.clipping.y > height - listView.clipping.height){
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
	return LListViewDragObject;
})();