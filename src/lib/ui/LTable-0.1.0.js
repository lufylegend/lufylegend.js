/** @language chinese
 * <p>lufylegend.js专用UI，表格</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * <p>*此类由网友Yorhom提供，表示感谢。</p>
 * @class UI:LTable
 * @constructor
 * @extends LSprite
 * @param {int} row 表格行数。
 * @param {int} col 表格列数。
 * @param {Object} style 表格样式，是一个Object。包含cellWidth（单元格宽度），cellHeight（单元格高度），borderWidth（表格边框宽度），borderColor（表格边框颜色），backgroundColor（表格背景颜色），selectColor（鼠标盘旋在单元格上时，单元格的背景颜色），indentX（单元格内容与边框的x方向上的间距），indentY（单元格内容与边框的y方向上的间距）。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LTable.html" target="_blank">测试链接</a></p>
 * @public
 */
function LTable(row, col, style){
	var s = this;
	base(s, LSprite, []);
	s.type = "LTable";
	s.row = row||0;
	s.col = col||0;
	if(!style)style = {};
	if(!style.cellWidth)style.cellWidth = 100;
	if(!style.cellHeight)style.cellHeight = 30;
	if(!style.borderWidth)style.borderWidth = 1;
	if(!style.borderColor)style.borderColor = "black";
	if(!style.backgroundColor)style.backgroundColor = "white";
	if(!style.selectColor)style.selectColor = "#E0E0E0";
	if(!style.indentX)style.indentX = 10;
	if(!style.indentY)style.indentY = 10;
	s.style = style;
	s._tableSizeData = new Array();
	s._createTableData();
	s._isChange = true;

	s._createOriginalTable();
	s.addEventListener(LEvent.ENTER_FRAME, s._onDraw);
}
	/** @language chinese
	 * 加入一行单元格
	 * @method addRow
	 * @since 0.1.0
	 * @public
	 */
LTable.prototype.addRow = function(){
	var s = this;
	var t = s._tableSizeData;
	var st = s.style;
	var rowItem = new Array();

	var rowLayer = new LSprite();
	rowLayer.y = s.getHeight();
	s.addChild(rowLayer);
	var toX = 0;
	var w = 0, h = 0;
	for (var i=0; i<s.col; i++) {
		w = t[s.row-1][i].width,
		h = st.cellHeight;

		var upLayer = new LSprite();
		upLayer.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.backgroundColor);
		var overLayer = new LSprite();
		overLayer.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.selectColor);

		var colLayer = new LButton(upLayer, overLayer);
		colLayer.setCursorEnabled(false);
		colLayer.staticMode = true;
		colLayer.x = toX;
		rowLayer.addChild(colLayer);
		colLayer.child = new LSprite();
		colLayer.addChild(colLayer.child);

		var colItem = {
			width:w,
			height:h,
		};
		rowItem.push(colItem);

		toX += w;
	}

	t.push(rowItem);
	s.row++;
};
	/** @language chinese
	 * 加入一列单元格
	 * @method addCol
	 * @since 0.1.0
	 * @public
	 */
LTable.prototype.addCol = function(){
	var s = this;
	var t = s._tableSizeData;
	var st = s.style;

	var w = 0, h = 0;
	for (var i=0; i<s.row; i++) {
		var rowLayer = s.getChildAt(i);
		w = st.cellWidth,
		h = t[i][s.col-1].height;

		var upLayer = new LSprite();
		upLayer.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.backgroundColor);
		var overLayer = new LSprite();
		overLayer.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.selectColor);

		var colLayer = new LButton(upLayer, overLayer);
		colLayer.setCursorEnabled(false);
		colLayer.staticMode = true;
		colLayer.x = rowLayer.getWidth();
		rowLayer.addChild(colLayer);
		colLayer.child = new LSprite();
		colLayer.addChild(colLayer.child);

		var colItem = {
			width:w,
			height:h,
		};
		t[i].push(colItem);
	}

	s.col++;
};
	/** @language chinese
	 * 将child加到第row行，第col列这个单元格里上
	 * @method setCell
	 * @param {LDisplayObject} child 一个LDisplayObject对象。
	 * @param {int} row 行索引。
	 * @param {int} col 列索引。
	 * @since 0.1.0
	 * @public
	 */
LTable.prototype.setCell = function(child, row, col){
	var s = this;
	if(!child || !s.childList[row] || !s.childList[row].childList[col])return -1;
	s.childList[row].childList[col].child.addChild(child);
	var t = s._tableSizeData;
	if(child.getWidth() >= t[row][col].width){
		for(var i=0,l=t.length; i<l; i++){
			t[i][col].width = child.getWidth() + s.style.indentX*2;
		}
	}
	if(child.getHeight() >= t[row][col].height){
		for(var i=0,l=t[row].length; i<l; i++){
			t[row][i].height = child.getHeight() + s.style.indentY*2;
		}
	}
};
LTable.prototype._onDraw = function(e){
	var s = e.target;
	if(!s.childList.length > 0)return;
	var st = s.style;
	var t = s._tableSizeData;
	var toY = 0;
	for(var i=0; i<s.row; i++){
		var w = 0, h = 0;
		var rowLayer = s.getChildAt(i);
		rowLayer.y = toY;

		if(rowLayer.childList.length > 0){
			var toX = 0;
			for(var j=0; j<s.col; j++){
				w = t[i][j].width,
				h = t[i][j].height;

				var colLayer = rowLayer.getChildAt(j);
				if(w!=colLayer.getWidth() || h!=colLayer.getHeight()){
					colLayer.bitmap_up.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.backgroundColor);
					colLayer.bitmap_over.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.selectColor);
				}
				colLayer.x = toX;

				var child = colLayer.child;
				if(child){
					if(child.getWidth() >= w){
						for(var k=0,l=t.length; k<l; k++){
							t[k][j].width = child.getWidth() + s.style.indentX*2;
						}
					}
					if(child.getHeight() >= h){
						for(var k=0,l=t[row].length; k<l; k++){
							t[i][k].height = child.getHeight() + s.style.indentY*2;
						}
					}
					w = t[i][j].width,
					h = t[i][j].height;
					child.x = (w - child.getWidth())*0.5;
					child.y = (h - child.getHeight())*0.5;
				}

				toX += w;
			}
		}

		toY += h;
	}
};
LTable.prototype._createOriginalTable = function(){
	var s = this;
	var st = s.style;
	var t = s._tableSizeData;
	var toY = 0;
	for(var i=0; i<s.row; i++){
		var w = 0, h = 0;
		var rowLayer = new LSprite();
		rowLayer.y = toY;
		s.addChild(rowLayer);

		var toX = 0;
		for (var j=0; j<s.col; j++) {
			w = t[i][j].width,
			h = t[i][j].height;

			var upLayer = new LSprite();
			upLayer.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.backgroundColor);
			var overLayer = new LSprite();
			overLayer.graphics.drawRect(st.borderWidth, st.borderColor, [0,0,w,h], true, st.selectColor);

			var colLayer = new LButton(upLayer, overLayer);
			colLayer.setCursorEnabled(false);
			colLayer.staticMode = true;
			colLayer.x = toX;
			rowLayer.addChild(colLayer);
			colLayer.child = new LSprite();
			colLayer.addChild(colLayer.child);

			toX += w;
		}

		toY += h;
	}
};
LTable.prototype._createTableData = function (){
	var s = this;
	for(var i=0; i<s.row; i++){
		var rowItem = new Array();
		for(var j=0; j<s.col; j++){
			var colItem = {
				width:s.style.cellWidth,
				height:s.style.cellHeight,
			};
			rowItem.push(colItem);
		}
		s._tableSizeData.push(rowItem);
	}
};