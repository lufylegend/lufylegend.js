/** @language chinese
 * <p>lufylegend.js专用UI，树形组件</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * <p>*此类由网友Yorhom提供，表示感谢。</p>
 * @class UI:LTreeWidget
 * @constructor
 * @extends LSprite
 * @param {Array} list 列表，列表的具体格式请看下面的使用举例。
 * @param {Object} 树形组件样式。包含textColor，textSize，textWeight，textFont，branchIndent（节点间的间隔），branchButtonColor（展开/关闭节点的按钮的颜色）
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LTreeWidget.html" target="_blank">测试链接</a></p>
 * @public
 */
function LTreeWidget(list, style){
	var s = this;
	base(s, LSprite, []);
	s.list = list;
	if(!style){
		style = {};
	}
	if(!style.textColor){
		style.textColor = "black";
	}
	if(!style.textSize){
		style.textSize = 11;
	}
	if(!style.textFont){
		style.textFont = "Arial";
	}
	if(!style.textWeight){
		style.textWeight = "normal";
	}
	if(!style.branchIndent){
		style.branchIndent = 10;
	}
	if(!style.branchButtonColor){
		style.branchButtonColor = "black";
	}
	s.style = style;
	s._branchBtnSize = style.textSize-1;
	s._createBranch(s, s, 0, s.list);
};
LTreeWidget.BRANCH_OPEN = "branch_open";
LTreeWidget.BRANCH_CLOSE = "branch_close";
LTreeWidget.prototype._createBranch = function(layer, parentBranch, deep, list){
	var s = this;
	var toY = 0;
	for(var i=0, l=list.length; i<l; i++){
		var item = list[i];
		var branchLayer = new LSprite();
		branchLayer.parentBranch = parentBranch;
		branchLayer.y = toY;
		layer.addChild(branchLayer);
		var textLayer = new LSprite();
		textLayer.x = s._branchBtnSize+5;
		branchLayer.addChild(textLayer);
		if(item.click){textLayer.addEventListener(LMouseEvent.MOUSE_UP, item.click);}
		var textObj = new LTextField();
		textObj.text = item.label;
		textObj.color = s.style.textColor;
		textObj.size = s.style.textSize;
		textObj.weight = s.style.textWeight;
		textObj.font = s.style.textFont;
		textLayer.addChild(textObj);

		if(item.branch && item.branch.length>0){
			branchLayer.branch = new LSprite();
			branchLayer.branch.x = 30;
			branchLayer.branch.y = branchLayer.getHeight()+s.style.branchIndent;
			branchLayer.branch.visible = false;
			branchLayer.addChild(branchLayer.branch);

			var branchBtn = new LSprite();
			branchBtn.root = s;
			branchBtn.status = LTreeWidget.BRANCH_CLOSE;
			branchBtn.y = (textLayer.getHeight()-s._branchBtnSize)/2;
			branchBtn.graphics.drawRect(0, "", [0, 0, s._branchBtnSize, s._branchBtnSize]);
			branchBtn.graphics.drawVertices(0, "", [[0, 0], [s._branchBtnSize, s._branchBtnSize/2], [0, s._branchBtnSize]], true, s.style.branchButtonColor);
			branchLayer.addChild(branchBtn);
			branchBtn.addEventListener(LMouseEvent.MOUSE_UP, s._openOrCloseBranch);

			s._createBranch(branchLayer.branch, branchLayer, deep+1, item.branch);
		}

		toY += branchLayer.getHeight()+s.style.branchIndent;
	}
};
LTreeWidget.prototype._openOrCloseBranch = function(event){
	var branchBtn = event.currentTarget;
	var s = branchBtn.root;
	var branchLayer = branchBtn.parent;
	var p = branchLayer.parent;
	var currentBranchIndex = p.getChildIndex(branchLayer);

	if(branchBtn.status == LTreeWidget.BRANCH_CLOSE){
		branchLayer.branch.visible = true;
		branchBtn.graphics.clear();
		branchBtn.graphics.drawRect(0, "", [0, 0, s._branchBtnSize, s._branchBtnSize]);
		branchBtn.graphics.drawVertices(0, "", [[0, 0], [s._branchBtnSize, 0], [s._branchBtnSize/2, s._branchBtnSize]], true, s.style.branchButtonColor);
		branchBtn.status = LTreeWidget.BRANCH_OPEN;
	}else{
		branchLayer.branch.visible = false;
		branchBtn.graphics.clear();
		branchBtn.graphics.drawRect(0, "", [0, 0, s._branchBtnSize, s._branchBtnSize]);
		branchBtn.graphics.drawVertices(0, "", [[0, 0], [s._branchBtnSize, s._branchBtnSize/2], [0, s._branchBtnSize]], true, s.style.branchButtonColor);
		branchBtn.status = LTreeWidget.BRANCH_CLOSE;
	}

	while(p.objectIndex != s.parent.objectIndex){
		var toY = branchLayer.y;
		for(var i=currentBranchIndex; i<p.childList.length; i++){
			var currentBranch = p.childList[i];
			currentBranch.y = toY;
			toY += currentBranch.getHeight()+s.style.branchIndent;
		}
		branchLayer = branchLayer.parentBranch;
		p = branchLayer.parent;
		currentBranchIndex = p.getChildIndex(branchLayer);
	}
};