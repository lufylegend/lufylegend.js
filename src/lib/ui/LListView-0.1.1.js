/** @language chinese
 * <p>lufylegend.js专用UI，list列表。</p>
 * <p>※此组件不可以添加LMouseEvent事件，如果需要使用点击事件，需要重写子项的onClick函数，具体做法参照 LListChildView。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListView
 * @constructor
 * @extends LSprite
 * @since 1.10.0
 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
 * @public
 */
var LListView = (function () {
	function LListView(){
		var self = this;
		base(self,LSprite,[]);
		/** @language chinese
		 * [只读]LListView列表的画布，为了提升LListView的效率，LListView的所有子项都会被draw到这个LBitmapData对象上，由LListView内部控制刷新，所以是只读属性，外部不可操作。
		 * @property bitmapData
		 * @type LBitmapData
		 * @since 1.10.0
		 * @public
		 */
		var bitmapData = new LBitmapData(null, 0, 0, 100, 100, LBitmapData.DATA_CANVAS);
		self.bitmap = new LBitmap(bitmapData);
		self.addChild(self.bitmap);
		/** @language chinese
		 * LListView列表的可视范围，即大小。
		 * @property clipping
		 * @type LRectangle
		 * @default new LRectangle (0, 0, 100, 100)
		 * @since 1.10.0
		 * @public
		 */
		self.clipping = new LRectangle (0, 0, 100, 100);
		self.clipping.parent = self;
		/** @language chinese
		 * 单位宽度
		 * @property cellWidth
		 * @type float
		 * @default 100
		 * @since 1.10.0
		 * @public
		 */
		self.cellWidth = 100;
		/** @language chinese
		 * 单位高度
		 * @property cellHeight
		 * @type float
		 * @default 100
		 * @since 1.10.0
		 * @public
		 */
		self.cellHeight = 100;
		/** @language chinese
		 * 子单位平铺方向（只能是LListView.Direction.Horizontal或者LListView.Direction.Vertical中的一个）
		 * @property arrangement
		 * @type LListView.Direction
		 * @default LListView.Direction.Horizontal
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_arrangement.html" target="_blank">测试链接</a></p>
		 */
		self.arrangement = LListView.Direction.Horizontal;
		/** @language chinese
		 * 可拖动的方向
		 * @property movement
		 * @type LListView.Direction
		 * @default LListView.Direction.Vertical
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_movement.html" target="_blank">测试链接</a></p>
		 */
		self.movement = LListView.Direction.Vertical;
		/** @language chinese
		 * 拖动时的效果
		 * @property dragEffect
		 * @type LListView.DragEffects
		 * @default LListView.DragEffects.MomentumAndSpring
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_DragEffects.html" target="_blank">测试链接</a></p>
		 */
		self.dragEffect = LListView.DragEffects.MomentumAndSpring;
	
		self.scrollBarVertical = new LListScrollBar();
		self.addChild(self.scrollBarVertical);
		self.scrollBarHorizontal = new LListScrollBar();
		self.addChild(self.scrollBarHorizontal);
		/** @language chinese
		 * <p>每行(列)的单位个数</p>
		 * <p>如果arrangement为LListView.Direction.Horizontal，则表示每行的单位个数</p>
		 * <p>如果arrangement为LListView.Direction.Vertical，则表示每列的单位个数</p>
		 * @property maxPerLine
		 * @type int
		 * @default 1
		 * @since 1.10.0
		 * @public
		 * @examplelink <p><a href="../../../api/ui/LListView_maxPerLine.html" target="_blank">测试链接</a></p>
		 */
		self.maxPerLine = 1;/*每组长度*/
		self._ll_items = [];
		self._ll_x = Number.MAX_VALUE;
		self._ll_y = 0;
		self.addEventListener(LEvent.ENTER_FRAME,self._ll_onframe);
		self.addEventListener(LMouseEvent.MOUSE_DOWN,self._ll_ondown);
	}
	LListView.DragEffects = {
		None:"none",/*无效果*/
		Momentum:"momentum",/*拖动惯性*/
		MomentumAndSpring:"momentumAndSpring"/*拖动惯性+边界惯性*/
	};
	LListView.Direction = {
		Horizontal:"horizontal",/*水平*/
		Vertical:"vertical",/*垂直*/
		Unrestricted:"unrestricted"/*无限制*/
	};
	LListView.ScrollBarCondition = {
		Always:"always",
		OnlyIfNeeded:"onlyIfNeeded",
		WhenDragging:"whenDragging"
	};
	/** @language chinese
	 * 定义LListView 列表的垂直方向的滚动条。
	 * @method setVerticalScrollBar
	 * @param {LListScrollBar} scrollBar 滚动条
	 * @examplelink <p><a href="../../../api/ui/LListScrollBar.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.setVerticalScrollBar = function(value){
		var self = this;
		self.scrollBarVertical.remove();
		self.scrollBarVertical = value;
		self.addChild(self.scrollBarVertical);
		self.scrollBarVertical.resizeHeight(self.clipping.height);
	};
	/** @language chinese
	 * 定义LListView 列表的水平方向的滚动条。
	 * @method setHorizontalScrollBar
	 * @param {LListScrollBar} scrollBar 滚动条
	 * @examplelink <p><a href="../../../api/ui/LListScrollBar.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.setHorizontalScrollBar = function(value){
		var self = this;
		self.scrollBarHorizontal.remove();
		self.scrollBarHorizontal = value;
		self.addChild(self.scrollBarHorizontal);
		self.scrollBarHorizontal.resizeWidth(self.clipping.width);
	};
	/** @language chinese
	 * 设置LListView 列表的显示范围。
	 * @method resize
	 * @param {int} width 宽
	 * @param {int} height 高
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.resize = function(w, h){
		var self = this;
		w = w >>> 0;
		h = h >>> 0;
		var bitmapData = self.bitmap.bitmapData;
		bitmapData.image.height = bitmapData.height = h;
		bitmapData.image.width = bitmapData.width = w;
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
		self.clickOnChild(event.selfX, event.selfY, "touch");
	};
	/** @language chinese
	 * 刷新LListView 列表
	 * @method updateView
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.updateView = function(){
		var self = this;
		self._ll_x = Number.MAX_VALUE;
	};
	LListView.prototype.getItems = function(){
		return this._ll_items;
	};
	LListView.prototype.isInClipping = function(index){
		var self = this, x, y;
		if(self.arrangement == LListView.Direction.Horizontal){
			x = (index % self.maxPerLine) * self.cellWidth;
			y = (index / self.maxPerLine >>> 0) * self.cellHeight;
		}else{
			x = (index / self.maxPerLine >>> 0) * self.cellWidth;
			y = (index % self.maxPerLine) * self.cellHeight;
		}
		return self.clipping.x <= x && self.clipping.x + self.clipping.width > x && self.clipping.y <= y && self.clipping.y + self.clipping.height > y;
	};
	LListView.prototype._ll_onframe = function(event){
		var self = event.currentTarget;
		if(self.clipping.x == self._ll_x && self.clipping.y == self._ll_y){
			return;
		}
		self.bitmap.bitmapData.clear();
		var length = self._ll_items.length;
		var startX = self.clipping.x / self.cellWidth >> 0;
		var startY = self.clipping.y / self.cellHeight >> 0;
		var addX;
		var addY;
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
					item.updateView(self.bitmap, new LRectangle(0, 0, self.cellWidth, self.cellHeight), new LPoint(x - self.clipping.x, y - self.clipping.y));
				}
			}
		}else{
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
					item.updateView(self.bitmap, new LRectangle(0, 0, self.cellWidth, self.cellHeight), new LPoint(x - self.clipping.x, y - self.clipping.y));
				}
			}
		}
		self.setScrollBarsPositon();
		self._ll_x = self.clipping.x;
		self._ll_y = self.clipping.y;
	};
	LListView.prototype.clickOnChild = function(selfX, selfY, type){
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
			var child = self._ll_items[index];
			var event = {currentTarget:self,target:child,offsetX:mouseX,offsetY:mouseY,selfX:(x % self.cellWidth),selfY:(y % self.cellHeight)};
			if(type == "touch"){
				child.onTouch(event);
			}else{
				child.onClick(event);
			}
		}
	};
	/** @language chinese
	 * 为LListView 列表增加一个子项。
	 * @method insertChildView
	 * @param {LListChildView} child 单元子项
	 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.insertChildView = function(child, index){
		var self = this;
		if(typeof index == UNDEFINED){
			self._ll_items.push(child);
		}else{
			self._ll_items.splice(index, 0, child);
		}
		self.resizeScrollBar();
	};
	/** @language chinese
	 * 从LListView 列表中删除一个子项。
	 * @method deleteChildView
	 * @param {LListChildView} child 单元子项
	 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListView.prototype.deleteChildView = function(child){
		var self = this, c = self._ll_items, i, l;
		for (i = 0, l = c.length; i < l; i++) {
			if (child.objectIndex == c[i].objectIndex) {
				self._ll_items.splice(i, 1);
				break;
			}
		}
		self.resizeScrollBar();
	};
	/** @language chinese
	 * LListView 列表不可以添加LMouseEvent事件，如果需要使用点击事件，需要重写子项的onClick函数。
	 * @method updateList
	 * @param {Array} list 单元子项的数组
	 * @example
	 * 	var list = [new ListChildView()];
	 * 	var listView = new LListView();
	 * 	listView.updateList(list);
	 * @public
	 * @since 1.10.0
	 */
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
	LListView.prototype.die = function(){
		var self = this;
		for(var i=0,l=self._ll_items.length;i<l;i++){
			self._ll_items[i].die();
		}
		self._ll_items = null;
		self.callParent("die",arguments);
	};
	return LListView;
})();
/** @language chinese
 * <p>lufylegend.js专用UI，LListView 列表的专用滚动条。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListScrollBar
 * @constructor
 * @extends LSprite
 * @since 1.10.0
 * @param {LPanel} background 滚动条背景。
 * @param {LPanel} foreground 滚动条样式。
 * @param {LListView.ScrollBarCondition} showCondition 滚动条的种类。
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
/** @language chinese
 * <p>lufylegend.js专用UI，LListView 列表的一个单元子项。</p>
 * <p>在使用LListView的子项的时候，需要先从LListChildView继承。</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LListChildView
 * @constructor
 * @extends LSprite
 * @since 1.10.0
 * @examplelink <p><a href="../../../api/ui/LListView.html" target="_blank">测试链接</a></p>
 * @public
 */
var LListChildView = (function () {
	function LListChildView(){
		var self = this;
		base(self,LSprite,[]);
	}
	/** @language chinese
	 * 当LListView 列表的子项LListChildView内容有改变的时候，需要使用调用updateView来刷新，如果被改变的对象在LListView的可视范围以外的话，则无需刷新。
	 * @method updateView
	 * @examplelink <p><a href="../../../api/ui/LListView_onClick.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListChildView.prototype.die = function(){
		this.ll_baseBitmap = null;
		this.ll_baseRectangle = null;
		this.ll_basePoint = null;
		this._ll_cacheAsBitmap = null;
		this._canvas = null;
		this._context = null;
	};
	LListChildView.prototype.updateView = function(bitmap, rectangle, point){
		var self = this;
		if(!self._ll_cacheAsBitmap){
			self.cacheAsBitmap(true);
		}
		if(bitmap){
			self.ll_baseBitmap = bitmap;
			self.ll_baseRectangle = rectangle;
			self.ll_basePoint = point;
		}
		if(!self.ll_baseBitmap){
			return;
		}
		if(self.ll_basePoint.x > self.ll_baseBitmap.bitmapData.width || self.ll_basePoint.y > self.ll_baseBitmap.bitmapData.height || self.ll_basePoint.x + self.ll_baseRectangle.width < 0 || self.ll_basePoint.y + self.ll_baseRectangle.height < 0){
			return;
		}
		if(!bitmap){
			var listView = self.ll_baseBitmap.parent;
			var index = -1, items = listView.getItems(), x, y;
			for(var i=0,l=items.length;i<l;i++){
				if(items[i] && items[i].objectIndex == self.objectIndex){
					index = i;
					break;
				}
			}
			if(index < 0){
				return;
			}
			if(listView.arrangement == LListView.Direction.Horizontal){
				x = (index % listView.maxPerLine) * listView.cellWidth;
				y = (index / listView.maxPerLine >>> 0) * listView.cellHeight;
			}else{
				x = (index / listView.maxPerLine >>> 0) * listView.cellWidth;
				y = (index % listView.maxPerLine) * listView.cellHeight;
			}
			var isIn = (listView.clipping.x <= x && listView.clipping.x + listView.clipping.width > x && listView.clipping.y <= y && listView.clipping.y + listView.clipping.height > y);
			if(!isIn){
				return;
			}
			self.ll_basePoint.x = x - listView.clipping.x;
			self.ll_basePoint.y = y - listView.clipping.y;
			self.ll_baseBitmap.bitmapData.clear(new LRectangle(self.ll_basePoint.x, self.ll_basePoint.y, self.ll_baseRectangle.width, self.ll_baseRectangle.height));
		}
		self.ll_baseBitmap.bitmapData.copyPixels(self._ll_cacheAsBitmap.bitmapData, self.ll_baseRectangle, self.ll_basePoint);
	};
	/** @language chinese
	 * LListView 列表不可以添加LMouseEvent事件，如果需要使用点击事件，需要重写子项的onClick函数。
	 * @method onClick
	 * @param {Object} event {currentTarget:LListView对象,target:LListChildView自身,offsetX:同LMouseEvent,offsetY:同LMouseEvent,selfX:同LMouseEvent,selfY:同LMouseEvent}
	 * @example
	 * 	function MyListChildView(){
	 * 		var self = this;
	 * 		base(self,LListChildView,[]);
	 * 		//处理
	 * 	}
	 * 	MyListChildView.prototype.onClick = function(event){
	 * 		var self = event.target;
	 * 		//处理
	 * 	}
	 * @examplelink <p><a href="../../../api/ui/LListView_onClick.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LListChildView.prototype.onClick = function(event){};
	LListChildView.prototype.onTouch = function(event){};
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
		if(self.isDeleted){
			return;
		}
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
		if(typeof self.fX == UNDEFINED){
			self.fX = listView.clipping.x;
			self.fY = listView.clipping.y;
		}
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
			if(width <= listView.clipping.width){
				if(dragObject){
					listView.clipping.x = 0;
				}else{
					tx = 0;
				}
			}else if(listView.clipping.x > width - listView.clipping.width){
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
			if(height <= listView.clipping.height){
				if(dragObject){
					listView.clipping.y = 0;
				}else{
					ty = 0;
				}
			}else if(listView.clipping.y > height - listView.clipping.height){
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