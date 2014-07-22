
function LRadioChild(value,layer,layerSelect){
	var s = this, grd;
	base(s,LSprite,[]);
	s.type = "LRadioChild";
	s.value = value;
	
	if(!layer){
		grd=LGlobal.canvas.createLinearGradient(0,-20,0,40);
		grd.addColorStop(0,"#FFFFFF");
		grd.addColorStop(1,"#CCCCCC");
		layer = new LSprite();
		layer.graphics.drawArc(1,"#CCCCCC",[0,0,10,0,2*Math.PI],true,grd);
	}else{
		layer = layer.clone();
	}
	if(!layerSelect){
		grd=LGlobal.canvas.createLinearGradient(0,-20,0,20);
		grd.addColorStop(0,"#FFFFFF");
		grd.addColorStop(1,"#008000");
		layerSelect = new LSprite();
		layerSelect.graphics.drawArc(1,grd,[0,0,5,0,2*Math.PI],true,grd);
	}else{
		layerSelect = layerSelect.clone();
	}
	s.layer = layer;
	s.layerSelect = layerSelect;
	s.addChild(s.layer);
	s.addChild(s.layerSelect);
	s.layerSelect.visible = false;
	s.checked = false;
	s.addEventListener(LMouseEvent.MOUSE_UP,s._onChange);
}
LRadioChild.prototype.clone = function(){
	var s = this,
	a = new LRadioChild(s.value,s.layer,s.layerSelect);
	a.copyProperty(s);
	return a;
};
LRadioChild.prototype._onChange = function(e){
	var s = e.clickTarget;
	s.parent.setValue(s.value);
};
LRadioChild.prototype.setChecked = function(v){
	this.layerSelect.visible = this.checked = v;
};
/** @language chinese
 * lufylegend.js专用UI，单选按钮
 * @class UI:LRadio
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Radio button
 * @class UI:LRadio
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、ラジオボタン
 * @class UI:LRadio
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LRadio.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LRadio(){
	var s = this;
	base(s,LSprite,[]);
	s.type = "LRadio";
}
LRadio.prototype.setChildRadio = function(value,x,y,layer,layerSelect){
	var s = this;
	var child = new LRadioChild(value,layer,layerSelect);
	child.x = x;
	child.y = y;
	s.addChild(child);
};
LRadio.prototype.push = function(value){
	this.addChild(value);
};
LRadio.prototype.setValue = function(value){
    var s=this,child,k=null;
    for(k in s.childList){
    	child = s.childList[k];
        if(child.setChecked)child.setChecked(false);
        if(child.value == value){
        	s.value = value;
        	child.setChecked(true);
        }
    }
};
LRadio.prototype.clone = function(){
	var s = this,a = new LRadio(),child,k=null;
    for(k in s.childList){
    	child = s.childList[k].clone();
    	a.push(child);
    }
	a.setValue(s.value);
	return a;
};