/** @language chinese
 * lufylegend.js专用UI，区域范围对象
 * @class UI:LRange
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LRange.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Range
 * @class UI:LRange
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LRange.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、範囲オブジェクト
 * @class UI:LRange
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LRange.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LRange(){
	var s = this, w, h ,param;
	LExtends(s,LSprite);
	s.type = "LRange";
	s.value = 0;
	if(arguments.length == 0){
		param = {width:200};
	}else if(arguments.length == 1 && typeof arguments[0] == "number"){
		param = {width:arguments[0]};
	}else if(arguments.length == 2){
		param = {backLayer:arguments[0],selectLayer:arguments[1]};
	}else{
		throw "LRange's param is wrong";
	}
	if(param["backLayer"] && param["selectLayer"]){
		var backLayer = param["backLayer"];
		s.sign = param["selectLayer"];
		h = backLayer.getHeight() > s.sign.getHeight() ? backLayer.getHeight() : s.sign.getHeight();
		backLayer.y = (h - backLayer.getHeight())*0.5;
		s.w = backLayer.getWidth();
		s.graphics.drawRect(0,"#FFFFFF",[-50,0,s.w+100,h]);
		s.addChild(backLayer);
	}else{
		s.w = param["width"];
		s.graphics.drawRect(0,"#FFFFFF",[-50,0,s.w+100,s.w*0.13]);
		var grd=LGlobal.canvas.createLinearGradient(0,0,0,s.w*0.13);
		grd.addColorStop(0,"#FFFFFF");
		grd.addColorStop(1,"#CCCCCC");
		s.color = grd;
		s.graphics.drawRect(1,"#CCCCCC",[0,s.w*0.04,s.w,s.w*0.03],true,s.color);
		s.sign = new LSprite();
		s.sign.graphics.drawVertices(1,"#CCCCCC",[[0,0],[s.w*0.05,0],[s.w*0.05,s.w*0.1],[s.w*0.025,s.w*0.13],[0,s.w*0.1]],true,s.color);
	}
	s.addChild(s.sign);
	s.sign.x = -s.sign.getWidth()*0.5;
	s.addEventListener(LMouseEvent.MOUSE_DOWN,s._onDown);
}
LRange.prototype.clone = function(){
	var s = this,a = new LRange(s.w);
	a.copyProperty(s);
	return a;
};
LRange.prototype._onDown = function(event){
	var s = event.clickTarget;
	if(event.selfX < -s.sign.getWidth()*0.5 || event.selfX>s.w+s.sign.getWidth()*0.5)return;
	if(s.down)return;
	s.down = true;
	s.sign.x = event.selfX - s.sign.getWidth()*0.5;
	if(s.sign.x < -s.sign.getWidth()*0.5)s.sign.x = -s.sign.getWidth()*0.5;
	if(s.sign.x > s.w-s.sign.getWidth()*0.5)s.sign.x = s.w-s.sign.getWidth()*0.5;
	s._DownX = s.sign.x;
	s._OffsetX = event.selfX;
	s._getValue();
	s.addEventListener(LMouseEvent.MOUSE_MOVE,s._onMove);
	LGlobal.stage._ll_range = s;
	LGlobal.stage.addEventListener(LMouseEvent.MOUSE_UP,s._onUp);
};
LRange.prototype._getValue = function(){
	var s = this;
	s.value = Math.floor((s.sign.x + s.sign.getWidth()*0.5)*100/s.w);
};
LRange.prototype._onMove = function(event){
	var s = event.clickTarget;
	s.sign.x = s._DownX + event.selfX - s._OffsetX;
	if(s.sign.x < -s.sign.getWidth()*0.5)s.sign.x = -s.sign.getWidth()*0.5;
	if(s.sign.x > s.w-s.sign.getWidth()*0.5)s.sign.x = s.w-s.sign.getWidth()*0.5;
	s._getValue();
};
LRange.prototype._onUp = function(event){
	var s = LGlobal.stage._ll_range;
	s.down = false;
	s.removeEventListener(LMouseEvent.MOUSE_MOVE,s._onMove);
	LGlobal.stage.removeEventListener(LMouseEvent.MOUSE_UP,s._onUp);
};