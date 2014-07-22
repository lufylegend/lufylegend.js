
/** @language chinese
 * lufylegend.js专用UI，多选按钮
 * @class UI:LCheckBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LCheckBox.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, checkbox button
 * @class UI:LCheckBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LCheckBox.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、チェックボックス
 * @class UI:LCheckBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LCheckBox.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LCheckBox(layer,layerSelect){
	var s = this, grd;
	base(s,LSprite,[]);
	s.type = "LCheckBox";
	if(!layer){
		grd=LGlobal.canvas.createLinearGradient(0,-20,0,40);
		grd.addColorStop(0,"#FFFFFF");
		grd.addColorStop(1,"#CCCCCC");
		layer = new LSprite();
		layer.graphics.drawRoundRect(1,"#CCCCCC",[0,0,20,20,4],true,grd);
	}else{
		layer = layer.clone();
	}
	if(!layerSelect){
		grd=LGlobal.canvas.createLinearGradient(0,-20,0,20);
		grd.addColorStop(0,"#FFFFFF");
		grd.addColorStop(1,"#008000");
		layerSelect = new LSprite();
		layerSelect.graphics.drawLine(5,grd,[4,10,12,16]);
		layerSelect.graphics.drawLine(5,grd,[10,16,16,4]);
	}else{
		layerSelect = layerSelect.clone();
	}
	s.layer = layer;
	s.layerSelect = layerSelect;
	s.addChild(s.layer);
	s.addChild(s.layerSelect);
	s.layerSelect.visible = s.checked = false;
	s.addEventListener(LMouseEvent.MOUSE_UP,s._onChange);
}
LCheckBox.prototype._onChange = function(e){
	var s = e.clickTarget;
	s.checked = !s.checked;
	s.layerSelect.visible = s.checked;
};
LCheckBox.prototype.setChecked = function(value){
	var s=this;
	s.checked = value;
	s.layerSelect.visible = s.checked;
};
LCheckBox.prototype.clone = function(){
	var s = this,a = new LCheckBox();
	a.setChecked(s.checked);
	return a;
};