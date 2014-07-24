
/** @language chinese
 * lufylegend.js专用UI，滚动条
 * @class UI:LScrollbar
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LScrollbar.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Scroll bar
 * @class UI:LScrollbar
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LScrollbar.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、スクロール バー
 * @class UI:LScrollbar
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LScrollbar.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LScrollbar(showObject,maskW,maskH,scrollWidth,wVisible){
	var s = this;
	base(s,LSprite,[]);
	s.type = "LScrollbar";
	s._showLayer = new LSprite();
	s._mask = new LGraphics();
	s._mask.drawRect(1,"#ffffff",[0,0,maskW,maskH],true,"#ffffff");
	s._showLayer.graphics.drawRect(1,"#ffffff",[0,0,maskW,maskH],true,"#ffffff");
	s._wVisible = typeof wVisible == UNDEFINED?true:wVisible;
	s.addChild(s._showLayer);
	s._width = 0;
	s._height = 0;
	s._showObject = showObject;
	s._showLayer.addChild(showObject);
	s._showObject.mask = s._mask;
	s._scrollWidth = scrollWidth?scrollWidth:20;
	s._tager = {x:0,y:0};
	s._maskW = maskW;
	s._maskH = maskH;
	s.addEventListener(LEvent.ENTER_FRAME,s.onFrame);
}
LScrollbar.prototype.clone = function(){
	var s = this,a = new LScrollbar(s._showObject.clone(),s._maskW,s._maskH,s._scrollWidth,s.wVisible);
	a.copyProperty(s);
	return a;
};
LScrollbar.prototype.onFrame = function(s){
	if(s._wVisible && s._width != s._showObject.getWidth()){
		s._width = s._showObject.getWidth();
		if(s._width > s._mask.getWidth()){
			s.resizeWidth(true);
			s.moveLeft();
		}else{
			s.resizeWidth(false);
		}
	}
	if(s._height != s._showObject.getHeight()){
		s._height = s._showObject.getHeight();
		if(s._height > s._mask.getHeight()){
			s.resizeHeight(true);
			s.moveUp();
		}else{
			s.resizeHeight(false);
		}
	}
	if(s._key == null)return;
	if(s._key["up"]){
		s.moveUp();
	}
	if(s._key["down"]){
		s.moveDown();
	}
	if(s._key["left"]){
		s.moveLeft();
	}
	if(s._key["right"]){
		s.moveRight();
	}
};

LScrollbar.prototype.resizeWidth = function(value){
	var s = this;
	if(!value){
		if(s._scroll_w != null){
			s._scroll_w.parent.removeChild(s._scroll_w);
			s._scroll_w_bar.parent.removeChild(s._scroll_w_bar);
			s._scroll_w = null;
			s._scroll_w_bar = null;
		}
		return;
	}
	var i;
	if(s._scroll_w_bar == null){
		if(s._key == null)s._key = [];
		s._scroll_w = new LSprite();
		s._scroll_w_bar = new LSprite();
		s.addChild(s._scroll_w);
		s.addChild(s._scroll_w_bar);
		var ny = s._scrollWidth*1.5;
		s._scroll_w.x = 0;
		s._scroll_w.y = s._mask.getHeight();
		s._scroll_w_bar.x = s._scrollWidth;
		s._scroll_w_bar.y = s._mask.getHeight();
		s._scroll_w_bar.graphics.drawRect(1,"#000000",[0,0,ny,s._scrollWidth],true,"#cccccc");
		s._scroll_w_bar.graphics.drawLine(1,"#000000",[ny*0.5,s._scrollWidth*0.25,ny*0.5,s._scrollWidth*0.75]);
		s._scroll_w_bar.graphics.drawLine(1,"#000000",[ny*0.5-3,s._scrollWidth*0.25,ny*0.5-3,s._scrollWidth*0.75]);
		s._scroll_w_bar.graphics.drawLine(1,"#000000",[ny*0.5+3,s._scrollWidth*0.25,ny*0.5+3,s._scrollWidth*0.75]);
		s._scroll_w.graphics.drawRect(1,"#000000",[0,0,s._mask.getWidth(),s._scrollWidth],true,"#292929");
		s._scroll_w.graphics.drawRect(1,"#000000",[0,0,s._scrollWidth,s._scrollWidth],true,"#ffffff");
		s._scroll_w.graphics.drawRect(1,"#000000",[s._mask.getWidth() - s._scrollWidth,0,s._scrollWidth,s._scrollWidth],true,"#ffffff");
		s._scroll_w.graphics.drawVertices(1,"#000000",[[s._scrollWidth*0.75,s._scrollWidth*0.25],
			[s._scrollWidth*0.75,s._scrollWidth*0.75],
			[s._scrollWidth*0.25,s._scrollWidth*0.5]],true,"#000000");
		s._scroll_w.graphics.drawVertices(1,"#000000",[[s._mask.getWidth() - s._scrollWidth*0.75,s._scrollWidth*0.25],
			[s._mask.getWidth() - s._scrollWidth*0.75,s._scrollWidth*0.75],
			[s._mask.getWidth() - s._scrollWidth*0.25,s._scrollWidth*0.5]],true,"#000000");
		s._scroll_w.graphics.drawRect(1,"#000000",[0,0,s._mask.getWidth(),s._scrollWidth]);
		s._scroll_w.graphics.drawRect(1,"#000000",[0,0,s._scrollWidth,s._scrollWidth]);
		s._scroll_w.graphics.drawRect(1,"#000000",[s._mask.getWidth() - s._scrollWidth,0,s._scrollWidth,s._scrollWidth]);
		var mouseDownHave = false;
		for(i=0;i<s.mouseList.length;i++){
 			if(s.mouseList[i][0] == LMouseEvent.MOUSE_DOWN){
				mouseDownHave = true;
  				break;
			}
		}
    	if(!mouseDownHave)s.addEventListener(LMouseEvent.MOUSE_DOWN,s.mouseDown);
	}
};
LScrollbar.prototype.resizeHeight = function(value){
	var s = this;
	if(!value){
		if(s._scroll_h != null){
			s._scroll_h.parent.removeChild(s._scroll_h);
			s._scroll_h_bar.parent.removeChild(s._scroll_h_bar);
			s._scroll_h = null;
			s._scroll_h_bar = null;
		}
		return;
	}
	var i;
	if(s._scroll_h_bar == null){
		if(s._key == null)s._key = [];
		s._scroll_h = new LSprite();
		s._scroll_h_bar = new LSprite();
		s.addChild(s._scroll_h);
		s.addChild(s._scroll_h_bar);
		var ny = s._scrollWidth*1.5;
		s._scroll_h.x = s._mask.getWidth();
		s._scroll_h.y = 0;
		s._scroll_h_bar.x = s._mask.getWidth();
		s._scroll_h_bar.y = s._scrollWidth;
		s._scroll_h_bar.graphics.drawRect(1,"#000000",[0,0,s._scrollWidth,s._scrollWidth*1.5],true,"#cccccc");
		s._scroll_h_bar.graphics.drawRect(1,"#000000",[0,0,s._scrollWidth,ny]);
		s._scroll_h_bar.graphics.drawLine(1,"#000000",[s._scrollWidth*0.25,ny*0.5,s._scrollWidth*0.75,ny*0.5]);
		s._scroll_h_bar.graphics.drawLine(1,"#000000",[s._scrollWidth*0.25,ny*0.5-3,s._scrollWidth*0.75,ny*0.5-3]);
		s._scroll_h_bar.graphics.drawLine(1,"#000000",[s._scrollWidth*0.25,ny*0.5+3,s._scrollWidth*0.75,ny*0.5+3]);
		s._scroll_h.graphics.drawRect(1,"#000000",[0,0,s._scrollWidth,s._mask.getHeight()],true,"#292929");
		s._scroll_h.graphics.drawRect(1,"#000000",[0,0,s._scrollWidth,s._scrollWidth],true,"#ffffff");
		s._scroll_h.graphics.drawRect(1,"#000000",[0,s._mask.getHeight() - s._scrollWidth,s._scrollWidth,s._scrollWidth],true,"#ffffff");
		s._scroll_h.graphics.drawVertices(1,"#000000",[[s._scrollWidth/4,s._scrollWidth*0.75],
			[s._scrollWidth/2,s._scrollWidth/4],
			[s._scrollWidth*0.75,s._scrollWidth*0.75]],true,"#000000");
		s._scroll_h.graphics.drawVertices(1,"#000000",[[s._scrollWidth/4,s._mask.getHeight() - s._scrollWidth*0.75],
			[s._scrollWidth/2,s._mask.getHeight() - s._scrollWidth*0.25],
			[s._scrollWidth*0.75,s._mask.getHeight() - s._scrollWidth*0.75]],true,"#000000");
		s._scroll_h.graphics.drawRect(1,"#000000",[0,0,s._scrollWidth,s._mask.getHeight()]);
		s._scroll_h.graphics.drawRect(1,"#000000",[0,0,0,0,s._scrollWidth,s._scrollWidth]);
		s._scroll_h.graphics.drawRect(1,"#000000",[0,s._mask.getHeight() - s._scrollWidth,s._scrollWidth,s._scrollWidth]);
		var mouseDownHave = false;
  		for(i=0;i<s.mouseList.length;i++){
      		if(s.mouseList[i][0] == LMouseEvent.MOUSE_DOWN){
				mouseDownHave = true;
			}
		}
		if(!mouseDownHave){
			s.addEventListener(LMouseEvent.MOUSE_DOWN,s.mouseDown);
		}
	}
};
LScrollbar.prototype.moveLeft = function(){
	var s = this;
	if(!s._key["Dkey"] && s._showObject.x >= s._tager.x){
		s._key["left"] = false;
		s.setScroll_w();
		return;
	}else if(s._showObject.x >= 0){
		s._showObject.x = 0;
		s._key["left"] = false;
		s.setScroll_w();
		return;
	}
	if(s._key["Dkey"])s._speed = 5;
	s._showObject.x += s._speed;
	s.setScroll_w();
	s.setSpeed();
};
LScrollbar.prototype.setScroll_h = function(){
	var s = this;
	var sy = (s._mask.getHeight() - s._scrollWidth*3.5)*s._showObject.y/(s._mask.getHeight() - s._showObject.getHeight());
	if(s._scroll_h_bar){
		s._scroll_h_bar.x = s._mask.getWidth();
		s._scroll_h_bar.y = s._scrollWidth + sy;
	}
};
LScrollbar.prototype.setScroll_w = function(){
	var s = this;
	var sx = (s._mask.getWidth() - s._scrollWidth*3.5)*s._showObject.x/(s._mask.getWidth() - s._showObject.getWidth());
	if(s._scroll_w_bar){
		s._scroll_w_bar.x = s._scrollWidth + sx;
		s._scroll_w_bar.y = s._mask.getHeight();
	}
};
LScrollbar.prototype.moveUp = function(){
	var s = this;
	if(!s._key["Dkey"] && s._showObject.y >= s._tager.y){
		s._key["up"] = false;
		s.setScroll_h();
		return;
	}else if(s._showObject.y >= 0){
		s._showObject.y = 0;
		s._key["up"] = false;
		s.setScroll_h();
		return;
	}
	if(s._key["Dkey"])s._speed = 5;
	s._showObject.y += s._speed;
	s.setScroll_h();
	s.setSpeed();
};
LScrollbar.prototype.moveDown = function(){
	var s = this;
	if(!s._key["Dkey"] && s._showObject.y <= s._tager.y){
		s._key["down"] = false;
		s.setScroll_h();
		return;
	}else if(s._showObject.y <= s._mask.getHeight() - s._showObject.getHeight()){
		s._showObject.y = s._mask.getHeight() - s._showObject.getHeight();
		s._key["down"] = false;
		s.setScroll_h();
		return;
	}
	if(s._key["Dkey"])s._speed = 5;
	s._showObject.y -= s._speed;
	s.setScroll_h();
	s.setSpeed();
};
LScrollbar.prototype.getScrollY = function(){
	return this._showObject.y;
};
LScrollbar.prototype.setScrollY = function(value){
	this._showObject.y = value;
	this.setScroll_h();
};
LScrollbar.prototype.getScrollX = function(){
	return this._showObject.x;
};
LScrollbar.prototype.setScrollX = function(value){
	this._showObject.x = value;
	this.setScroll_w();
};
LScrollbar.prototype.scrollToTop = function(){
	this._showObject.y = 0;
	this.setScroll_h();
};
LScrollbar.prototype.scrollToBottom = function(){
	var s = this;
	s._showObject.y = s._showObject.getHeight()>s._mask.getHeight()?s._mask.getHeight()-s._showObject.getHeight():0;
	s.setScroll_h();
};
LScrollbar.prototype.scrollToLeft = function(){
	this._showObject.x = 0;
	this.setScroll_w();
};
LScrollbar.prototype.scrollToRight = function(){
	var s = this;
	s._showObject.x = s._showObject.getWidth()>s._mask.getWidth()?s._mask.getWidth()-s._showObject.getWidth():0;
	s.setScroll_w();
};
LScrollbar.prototype.moveRight = function(){
	var s = this;
	if(!s._key["Dkey"] && s._showObject.x <= s._tager.x){
		s._key["right"] = false;
		s.setScroll_w();
		return;
	}else if(s._showObject.x <= s._mask.getWidth() - s._showObject.getWidth()){
		s._showObject.x = s._mask.getWidth() - s._showObject.getWidth();
		s._key["right"] = false;
		s.setScroll_w();
		return;
	}
	if(s._key["Dkey"])s._speed = 5;
	s._showObject.x -= s._speed;
	s.setScroll_w();
	s.setSpeed();
};
LScrollbar.prototype.mouseDown = function(event){
	var s = event.clickTarget;
	if(s._scroll_h != null && event.selfX >= s._scroll_h.x && event.selfX <= s._scroll_h.x + s._scrollWidth){
		s.mouseDownH(event,s);
	}
	if(s._scroll_w != null && event.selfY >= s._scroll_w.y && event.selfY <= s._scroll_w.y + s._scrollWidth){
		s.mouseDownW(event,s);
	}
};
LScrollbar.prototype.mouseMoveH = function(event){
	var s = event.clickTarget;
	if(event.selfY < s._scrollWidth || event.selfY > s._mask.getHeight())return;
	var mx = event.selfY - s._key["scroll_y"];
	s._key["up"] = false;
	s._key["down"] = false;
	s._tager.y = (s._mask.getHeight() - s._showObject.getHeight())*(mx - s._scrollWidth)/(s._mask.getHeight() - s._scrollWidth*3.5);
	if(s._tager.y > s._showObject.y){
		s._key["up"] = true;
	}else{
		s._key["down"] = true;
	}
	s._speed = Math.abs(s._tager.y - s._showObject.y);
	s.setSpeed();
};
LScrollbar.prototype.mouseUpH = function(event){
	var s = event.clickTarget;
	s.removeEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);
	if(s._key["Dkey"]){
		s._key["Dkey"] = false;
	}else{
		s.removeEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveH);
		if(s._key["scroll_h"])s._key["scroll_h"] = false;
	}
};
LScrollbar.prototype.mouseUpW = function(event){
	var s = event.clickTarget;
	s.removeEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);
	if(s._key["Dkey"]){
		s._key["Dkey"] = false;
	}else{
		s.removeEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveW);
		if(s._key["scroll_w"])s._key["scroll_w"] = false;
	}
};
LScrollbar.prototype.mouseMoveW = function(event){
	var s = event.clickTarget;
	if(event.selfX < s._scrollWidth || event.selfX > s._mask.getWidth())return;
	var my = event.selfX - s._key["scroll_x"];
	s._key["left"] = false;
	s._key["right"] = false;
	s._tager.x = (s._mask.getWidth()- s._showObject.getWidth())*(my - s._scrollWidth)/(s._mask.getWidth() - s._scrollWidth*3.5);
	if(s._tager.x > s._showObject.x){
		s._key["left"] = true;
	}else{
		s._key["right"] = true;
	}
	s._speed = Math.abs(s._tager.x - s._showObject.x);
	s.setSpeed();
};
LScrollbar.prototype.setSpeed = function(){
	var s = this;
	s._speed = Math.floor(s._speed/2);
	if(s._speed == 0)s._speed = 1;
};
LScrollbar.prototype.mouseDownW = function(event){
	var s = event.clickTarget;
	if(event.selfX >= 0 && event.selfX <= s._scrollWidth){
		if(s._showObject.x >= 0 || s._key["left"])return;
		s._distance = 10;
		if(s._showObject.x + s._distance > 0)s._distance = s._showObject.x;
		s._tager.x = s._showObject.x + s._distance;
		s._key["left"] = true;
		s._key["right"] = false;
		s._key["Dkey"] = true;
		s._speed = s._distance;
		s.setSpeed();
		s.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);
	}else if(event.selfX >= s._mask.getWidth() - s._scrollWidth && event.selfX <= s._mask.getWidth()){
		if(s._showObject.x <= s._mask.getWidth() - s._showObject.getWidth() || s._key["left"])return;
		s._distance = 10;
		if(s._showObject.x-s._distance<s._mask.getWidth()-s._showObject.getWidth())s._distance = s._showObject.x - s._mask.getWidth() + s._showObject.getWidth();
		s._tager.x = s._showObject.x - s._distance;
		s._key["right"] = true;
		s._key["left"] = false;
		s._key["Dkey"] = true;
		s._speed = this._distance;
		s.setSpeed();
		s.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);
	}else if(event.selfX >= s._scroll_w_bar.x && event.selfX <= s._scroll_w_bar.x + s._scroll_w_bar.getWidth() && !s._key["scroll_w"]){
		s._key["scroll_w"] = true;
		s._key["scroll_x"] = event.selfX - s._scroll_w_bar.x;
		s._key["mouseX"] = event.selfX;
       		s.addEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveW);
		s.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpW);
	}else if(event.selfX > 0 && event.selfX < s._mask.getWidth()){
		s._key["left"] = false;
		s._key["right"] = false;
		s._tager.x = (s._mask.getWidth() - s._showObject.getWidth())*(event.selfX - s._scrollWidth)/(s._mask.getWidth() - s._scrollWidth*3.5);
		if(s._tager.x > s._showObject.x){
			s._key["left"] = true;
		}else{
			s._key["right"] = true;
		}
		s._speed = Math.abs(s._tager.x - s._showObject.x);
		s.setSpeed();
	}
};
LScrollbar.prototype.mouseDownH = function(event){
	var s = event.clickTarget;
	console.log(event,s);
	if(event.selfY >= 0 && event.selfY <= s._scrollWidth){
		if(s._showObject.y >= 0)return;
		s._distance = 10;
		if(s._showObject.y + s._distance > 0)s._distance = s._showObject.y;
		s._tager.y = s._showObject.y + s._distance;
		s._key["up"] = true;
		s._key["down"] = false;
		s._key["Dkey"] = true;
		s._speed = s._distance;
		s.setSpeed();
		s.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);
	}else if(event.selfY >= s._mask.getHeight() - s._scrollWidth && event.selfY <= s._mask.getHeight()){
		if(s._showObject.y <= s._mask.getHeight() - s._showObject.getHeight())return;
		s._distance = 10;
		if(s._showObject.y-s._distance<s._mask.getHeight()-s._showObject.getHeight())s._distance=s._showObject.y-s._mask.getHeight()+s._showObject.getHeight();
		s._tager.y = s._showObject.y - s._distance;
		s._key["down"] = true;
		s._key["up"] = false;
		s._key["Dkey"] = true;
		s._speed = s._distance;
		s.setSpeed();
		s.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);
	}else if(event.selfY >= s._scroll_h_bar.y && event.selfY <= s._scroll_h_bar.y + s._scroll_h_bar.getHeight() && !s._key["scroll_h"]){
		s._key["scroll_h"] = true;
		s._key["scroll_y"] = event.selfY - s._scroll_h_bar.y;
		s._key["mouseY"] = event.selfY;
		s.addEventListener(LMouseEvent.MOUSE_MOVE,s.mouseMoveH);
		s.addEventListener(LMouseEvent.MOUSE_UP,s.mouseUpH);
	}else if(event.selfY > 0 && event.selfY < s._mask.getHeight()){
		s._key["up"] = false;
		s._key["down"] = false;
		s._tager.y = (s._mask.getHeight() - s._showObject.getHeight())*(event.selfY - s._scrollWidth)/(s._mask.getHeight() - s._scrollWidth*3.5);
		if(s._tager.y > s._showObject.y){
			s._key["up"] = true;
		}else{
			s._key["down"] = true;
		}
		s._speed = Math.abs(s._tager.y - s._showObject.y);
		s.setSpeed();console.log(s._key,s._tager);
	}
};