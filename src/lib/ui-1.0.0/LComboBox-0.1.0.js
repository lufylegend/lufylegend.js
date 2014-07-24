
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
	s.selectIndex = 0;
	s.value = null;
	s.selectWidth = 100;
	if(!size)size=16;
	if(!color)color = "black";
	if(!font)font = "黑体";
	s.size = size;
	s.color = color;
	s.font = font;
	s.refreshFlag = false;
	
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
	label.text = "测试一";
	label.size = s.size;
	label.color = s.color;
	label.font = s.font;
	layer.addChild(label);
	s.label = label;
	s.layer = layer;
	s.addEventListener(LMouseEvent.MOUSE_UP,s._showChildList);
}
LComboBox.prototype.setChild = function(child){
	var s = this;
	if(!child || typeof child.value == UNDEFINED || typeof child.label == UNDEFINED){throw "the child must be an object like:{label:a,value:b}"};
	s.list.push(child);
};
LComboBox.prototype._showChildList = function(event){
	var s = event.currentTarget;
	s.showChildList();
};
LComboBox.prototype.showChildList = function(){
	var s = this,i,l,child;
	var textLayer = new LSprite();
	textLayer.graphics.drawRect(1,"#999999",[0,0,200,100],true,"#f5f5f9");
	selectLayer = new LSprite();
	textLayer.addChild(selectLayer);
	selectLayer.graphics.drawRect(0,"#CCCCCC",[2,2,196,26],true,"#CCCCCC");
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
		text.y = 5 + (s.size * 1.5 >>> 0) * i;
		textLayer.addChild(text);
	}
	var coordinate = s.getRootCoordinate();
	textLayer.x = coordinate.x;
	textLayer.y = coordinate.y + s.layer.getHeight();
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
	
	LGlobal.stage.addChild(textLayer);
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
	var textLayer = event.currentTarget, i;
	i = event.selfY/textLayer.childHeight >>> 0;
	textLayer.comboBox.label.text = textLayer.comboBox.list[i].label;
	var cnt = LGlobal.stage.numChildren;
	LGlobal.stage.removeChildAt(cnt - 1);
	LGlobal.stage.removeChildAt(cnt - 2);
};
/*
LComboBox.ON_CHANGE = "onchange";
LComboBox.prototype.refresh = function(){
	var s = this,k=null;

	for(var k=0,l=s.list.length;k<l;k++){
		s.textLayer.childList[k].visible = false;
		if(s.value == s.list[k].value)s.textLayer.childList[k].visible = true;
		if(s.selectWidth < s.textLayer.childList[k].getWidth() + s.size){
			s.selectWidth = s.textLayer.childList[k].getWidth() + s.size;
		}
	}
	
	s.layer.graphics.clear();
	s.layerUp.graphics.clear();
	s.layerDown.graphics.clear();
	s.layer.graphics.drawRect(2,"#000000",[0,0,s.selectWidth,s.size*2],true,"#D3D3D3");
	s.layerUp.x = s.selectWidth;
	s.layerUp.graphics.drawRect(2,"#000000",[0,0,s.size*2,s.size]);
	s.layerUp.graphics.drawVertices(2,"#000000",[[s.size*0.5*2,s.size*0.2],[s.size*0.2*2,s.size*0.8],[s.size*0.8*2,s.size*0.8]],true,"#000000");
	s.layerDown.x = s.selectWidth;
	s.layerDown.y = s.size;
	s.layerDown.graphics.drawRect(2,"#000000",[0,0,s.size*2,s.size]);
	s.layerDown.graphics.drawVertices(2,"#000000",[[s.size*0.5*2,s.size*0.8],[s.size*0.2*2,s.size*0.2],[s.size*0.8*2,s.size*0.2]],true,"#000000");
};
LComboBox.prototype._onChangeDown = function(e){
	var b = e.clickTarget,s = b.parent;
	if(s.runing)return;
	if(s.selectIndex >= s.list.length - 1)return;
	s.runing = true;
	for(k in s.list){
		s.textLayer.childList[k].visible = true;
	}
	s.selectIndex++;
	s.value = s.list[s.selectIndex].value;
	var mask = new LSprite();
	mask.graphics.drawRect(2,"#000000",[0,0,s.selectWidth,s.size*2]);
	s.textLayer.mask = mask;
	var my = s.textLayer.y - (s.size * 1.5 >>> 0);
	var fun = function(layer){
		var s = layer.parent;
		layer.mask = null;
		s.runing = false;
		s.refresh();
		s.dispatchEvent(LComboBox.ON_CHANGE);
	};
	LTweenLite.to(s.textLayer,0.3,
	{ 
		y:my,
		onComplete:fun,
		ease:Strong.easeOut
	});
};
LComboBox.prototype._onChangeUp = function(e){
	var b = e.clickTarget,s = b.parent;
	if(s.runing)return;
	if(s.selectIndex <= 0)return;
	s.runing = true;
	for(k in s.list){
		s.textLayer.childList[k].visible = true;
	}
	s.selectIndex--;
	s.value = s.list[s.selectIndex].value;
	var mask = new LSprite();
	mask.graphics.drawRect(2,"#000000",[0,0,s.selectWidth,s.size*2]);
	s.textLayer.mask = mask;
	var my = s.textLayer.y + (s.size * 1.5 >>> 0);
	var fun = function(layer){
		var s = layer.parent;
		layer.mask = null;
		s.runing = false;
		s.refresh();
		s.dispatchEvent(LComboBox.ON_CHANGE);
	};
	LTweenLite.to(s.textLayer,0.3,
	{ 
		y:my,
		onComplete:fun,
		ease:Strong.easeOut
	});
};
LComboBox.prototype.setValue = function(value){
	var s = this,c=s.list;
	for(var i=0,l=c.length;i<l;i++){
		if(c[i].value == value){
			s.textLayer.y = s._sy-s.size * 1.5*i;
			s.selectIndex=i;
			s.value = s.list[s.selectIndex].value;
			s.refresh();
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
};*/