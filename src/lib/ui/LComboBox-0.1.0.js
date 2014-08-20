
/** @language chinese
 * lufylegend.js专用UI，组合框
 * @class UI:LComboBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LComboBox.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, ComboBox
 * @class UI:LComboBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LComboBox.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、コンボボックス
 * @class UI:LComboBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LComboBox.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LComboBox(size,color,font,layer,layerUp,layerDown){
	var s = this;
	base(s,LSprite,[]);
	s.type = "LComboBox";
	s.list = [];
	s.selectIndex = -1;
	s.value = null;
	s.selectWidth = 100;
	if(!size)size=16;
	if(!color)color = "black";
	if(!font)font = "黑体";
	s.size = size;
	s.color = color;
	s.font = font;
	s.maxIndex = 5;
	if(!layer){
		s.refreshFlag = true;
		grd=LGlobal.canvas.createLinearGradient(0,-20,0,40);
		grd.addColorStop(0,"#FFFFFF");
		grd.addColorStop(1,"#CCCCCC");
		var layer1 = new LSprite();
		layer1.graphics.drawRoundRect(1,"#999999",[0,0,200,30,4],true,"#f5f5f9");
		layer1.graphics.drawRoundRect(1,"#CCCCCC",[174,4,22,22,2],true,grd);
		layer1.graphics.drawVertices(1,"#CCCCCC",[[180,10],[190,10],[185,22]],true,"#008000");
		var layer2 = new LSprite();
		layer2.graphics.drawRoundRect(1,"#999999",[0,0,200,30,4],true,"#f5f5f9");
		layer2.graphics.drawRoundRect(1,"#CCCCCC",[174,4,22,22,2],true,grd);
		layer2.graphics.drawVertices(1,"#CCCCCC",[[180,10],[190,10],[185,22]],true,"#32CD32");
		layer = new LButton(layer1,layer2);
		layer.cursorEnabled = false;
		layer.staticMode = true;
	}
	s.addChild(layer);
	var label = new LTextField();
	label.x = 4;
	label.y = 4;
	label.text = "";
	label.size = s.size;
	label.color = s.color;
	label.font = s.font;
	layer.addChild(label);
	s.label = label;
	s.layer = layer;
	s.addEventListener(LMouseEvent.MOUSE_UP,s._showChildList);
}
LComboBox.ON_CHANGE = "onchange";
LComboBox.prototype.deleteChild = function(value){
	var s = this, i, l, delIndex = -1;
	for(i=0,l=s.list.length;i<l;i++){
		if(s.list[i].value === value) {
			delIndex = i
			break;
		}
	}
	if(delIndex == -1){
		return;
	}
	s.list.splice(delIndex,1);
	if(s.value !== value){
		return;
	}
	if(s.list.length > 0){
		s.setValue(s.list[delIndex > 0 ? delIndex - 1 : 0]);
	}else{
		s.selectIndex = -1;
		s.value = null;
	}
};
LComboBox.prototype.setChild = function(child){
	var s = this, i, l;
	if(!child || typeof child.value == UNDEFINED || typeof child.label == UNDEFINED){
		throw "the child must be an object like:{label:a,value:b}";
	}
	
	for(i=0,l=s.list.length;i<l;i++){
		if(s.list[i].value === child.value) {
			return;
		}
	}
	s.list.push(child);
	if(s.list.length == 1){
		s.setValue(child.value);
	}
};
LComboBox.prototype._showChildList = function(event){
	var s = event.currentTarget;
	s.showChildList();
};
LComboBox.prototype.showChildList = function(){
	var s = this,i,l,child,w;
	var textLayer = new LSprite();
	selectLayer = new LSprite();
	textLayer.addChild(selectLayer);
	textLayer.selectLayer = selectLayer;
	textLayer.childHeight = s.size * 1.5 >>> 0;
	for(i=0,l=s.list.length;i<l;i++){
		child = s.list[i];
		var text = new LTextField();
		text.size = s.size;
		text.color = s.color;
		text.font = s.font;
		text.text = child.label;
		text.x = 5;
		text.y = 5 + textLayer.childHeight * i;
		textLayer.addChild(text);
	}
	w = textLayer.getWidth();
	if(w < 196) {
		w = 196;
	}
	textLayer.graphics.drawRect(1,"#999999",[0,0,w + 4,textLayer.childHeight * s.list.length + 4],true,"#f5f5f9");
	selectLayer.graphics.drawRect(0,"#CCCCCC",[2,2,w,textLayer.childHeight],true,"#CCCCCC");
	selectLayer.y = textLayer.childHeight * s.selectIndex;
	var coordinate = s.getRootCoordinate();
	textLayer.comboBox = s;
	var translucent = new LSprite();
	translucent.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	translucent.alpha = 0;
	LGlobal.stage.addChild(translucent);
	translucent.addEventListener(LMouseEvent.MOUSE_UP,function(e){
		var cnt = LGlobal.stage.numChildren;
		LGlobal.stage.removeChildAt(cnt - 1);
		LGlobal.stage.removeChildAt(cnt - 2);
	});
	translucent.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){});
	translucent.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){});
	translucent.addEventListener(LMouseEvent.MOUSE_OVER,function(e){});
	translucent.addEventListener(LMouseEvent.MOUSE_OUT,function(e){});
	if(s.list.length > s.maxIndex){
		var sc = new LScrollbar(textLayer,w,textLayer.childHeight * s.maxIndex,20,false);
		sc.x = coordinate.x;
		sc.y = coordinate.y + s.layer.getHeight();
		if (sc.y + textLayer.childHeight * s.maxIndex > LGlobal.height){
			sc.y = LGlobal.height - textLayer.childHeight * s.maxIndex;
		}
		sc.resizeHeight(sc._maskH);
		sc._key["down"] = true;
		sc._key["up"] = false;
		sc._tager = {x:0,y:40};
		sc._speed = Math.abs(sc._tager.y - sc._showObject.y);
		sc.setSpeed();
		sc.setScrollY(textLayer.childHeight*s.selectIndex);
		LGlobal.stage.addChild(sc);
	}else{
		textLayer.x = coordinate.x;
		textLayer.y = coordinate.y + s.layer.getHeight();
		if (textLayer.y + textLayer.getHeight() > LGlobal.height){
			textLayer.y = LGlobal.height - textLayer.getHeight();
		}
		LGlobal.stage.addChild(textLayer);
	}
	textLayer.addEventListener(LMouseEvent.MOUSE_MOVE,s._childSelecting);
	textLayer.addEventListener(LMouseEvent.MOUSE_UP,s._childSelected);
};
LComboBox.prototype._childSelecting = function(event){
	var textLayer = event.currentTarget, i;
	i = event.selfY/textLayer.childHeight >>> 0;
	if(i >= textLayer.comboBox.list.length){
		return;
	}
	textLayer.selectLayer.y = textLayer.childHeight * i;
};
LComboBox.prototype._childSelected = function(event){
	var textLayer = event.currentTarget, i, v;
	i = event.selfY/textLayer.childHeight >>> 0;
	textLayer.comboBox.setValue(textLayer.comboBox.list[i].value);
	var cnt = LGlobal.stage.numChildren;
	LGlobal.stage.removeChildAt(cnt - 1);
	LGlobal.stage.removeChildAt(cnt - 2);
};
LComboBox.prototype.setValue = function(value, noEvent){
	var s = this, c, i, l;
	if(s.value == value){
		return;
	}
	c=s.list;
	for(i=0,l=c.length;i<l;i++){
		if(c[i].value == value){
			s.selectIndex=i;
			s.value = s.list[s.selectIndex].value;
			s.label.text = s.list[s.selectIndex].label;
			if(!noEvent){
				s.dispatchEvent(LComboBox.ON_CHANGE);
			}
			break;
		}
	}
};
LComboBox.prototype.clone = function(){
	var s = this,a = new LComboBox(),k,c;
	for(k in s.list){
		c = s.list[k];
		a.setChild({label:c.label,value:c.value});
	}	
	a.setValue(s.value);
	return a;
};