/** @language chinese
 * lufylegend.js专用UI，按钮类
 * @class UI:LButtonSample1
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LButtonSampleX.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, button class
 * @class UI:LButtonSample1
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LButtonSampleX.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、ボタンクラス
 * @class UI:LButtonSample1
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LButtonSampleX.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LButtonSample1(name,size,font,color){
	var s = this;
	if(!size)size=16;
	if(!color)color = "white";
	if(!font)font = "黑体";
	s.backgroundColor = "black";
	var btn_up = new LSprite();
	btn_up.shadow = new LSprite();
	btn_up.back = new LSprite();
	btn_up.addChild(btn_up.shadow);
	btn_up.addChild(btn_up.back);
	labelText = new LTextField();
	labelText.color = color;
	labelText.font = font;
	labelText.size = size;
	labelText.x = size*0.5;
	labelText.y = size*0.5;
	labelText.text = name;
	s.labelText = labelText;
	btn_up.back.addChild(labelText);
	var shadow = new LDropShadowFilter(4,45,"#000000",10);
	btn_up.shadow.filters = [shadow];
	var btn_down = new LSprite();
	btn_down.x = btn_down.y = 1;
	labelText = labelText.clone();
	btn_down.addChild(labelText);
	var btn_disable = btn_down.clone();
	btn_disable.alpha = 0.5;
	base(s,LButton,[btn_up,btn_down,null,btn_disable]);
	s.type = "LButtonSample1";
	s.baseWidth = s.width = labelText.getWidth() + size;
	s.baseHeight = s.height = 2.2*size;
	s.backgroundSet = null;
	s.widthSet = null;
	s.heightSet = null;
	s.xSet = null;
	s.ySet = null;
	s.addEventListener(LEvent.ENTER_FRAME,s._onDraw);
}
LButtonSample1.prototype.clone = function(){
	var s = this,name = s.labelText.text,size = s.labelText.size,font = s.labelText.font,color = s.labelText.color,
	a = new LButtonSample1(name,size,font,color);
	a.backgroundColor = s.backgroundColor;
	return a;
};
LButtonSample1.prototype.setLabel = function(text){
	var s = this;
	s.bitmap_over.getChildAt(0).text = s.bitmap_up.back.getChildAt(0).text = text;
	s.baseWidth = s.width = s.bitmap_up.back.getChildAt(0).getWidth() + s.bitmap_up.back.getChildAt(0).size;
	s.backgroundSet = null;
};
LButtonSample1.prototype._onDraw = function(s){
	var co = s.getRootCoordinate(),labelText;
	if(s.backgroundSet == s.backgroundColor && s.widthSet == s.width && s.heightSet == s.height && s.xSet == co.x && s.ySet == co.y)return;
	s.backgroundSet = s.backgroundColor;
	s.widthSet = s.width>s.baseWidth?s.width:s.baseWidth;
	s.heightSet = s.height>s.baseHeight?s.height:s.baseHeight;
	s.width = s.widthSet;
	s.height = s.heightSet;
	s.xSet = co.x;
	s.ySet = co.y;
	labelText = s.bitmap_up.back.getChildAt(0);
	labelText.x = (s.width - s.baseWidth + labelText.size)*0.5;
	labelText.y = (s.height - s.baseHeight + labelText.size)*0.5;
	labelText = s.bitmap_over.getChildAt(0);
	labelText.x = (s.width - s.baseWidth + labelText.size)*0.5;
	labelText.y = (s.height - s.baseHeight + labelText.size)*0.5;
	var grd=LGlobal.canvas.createLinearGradient(0,-s.height*0.5,0,s.height*2);
	grd.addColorStop(0,"white");
	grd.addColorStop(1,s.backgroundColor);
	var grd2=LGlobal.canvas.createLinearGradient(0,-s.height,0,s.height*2);
	grd2.addColorStop(0,"white");
	grd2.addColorStop(1,s.backgroundColor);
	s.bitmap_up.back.graphics.clear();
	s.bitmap_over.graphics.clear();
	s.bitmap_up.shadow.graphics.clear();
	s.bitmap_up.shadow.graphics.drawRoundRect(0,"#000000",[1,1,s.widthSet-2,s.heightSet-2,s.heightSet*0.1],true,"#000000");
	s.bitmap_up.back.graphics.drawRect(1,s.backgroundColor,[0,0,s.widthSet,s.heightSet],true,grd);
	s.bitmap_up.back.graphics.drawRect(0,s.backgroundColor,[1,s.heightSet*0.5,s.widthSet-2,s.heightSet*0.5-1],true,grd2);
	s.bitmap_over.graphics.drawRect(1,s.backgroundColor,[0,0,s.widthSet,s.heightSet],true,grd);
	s.bitmap_over.graphics.drawRect(0,s.backgroundColor,[1,s.heightSet*0.5,s.widthSet-2,s.heightSet*0.5-1],true,grd2);
	s.disableState.graphics.drawRect(1,s.backgroundColor,[0,0,s.widthSet,s.heightSet],true,grd);
	s.disableState.graphics.drawRect(0,s.backgroundColor,[1,s.heightSet*0.5,s.widthSet-2,s.heightSet*0.5-1],true,grd2);
};
/** @language chinese
 * lufylegend.js专用UI，按钮类
 * @class UI:LButtonSample2
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LButtonSampleX.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, button class
 * @class UI:LButtonSample2
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LButtonSampleX.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、ボタンクラス
 * @class UI:LButtonSample2
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LButtonSampleX.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LButtonSample2(name,size,font,color){
	var s = this;
	base(s,LButtonSample1,[name,size,font,color]);
	s.type = "LButtonSample2";
}
LButtonSample2.prototype.clone = function(){
	var s = this,name = s.labelText.text,size = s.labelText.size,font = s.labelText.font,color = s.labelText.color,
	a = new LButtonSample2(name,size,font,color);
	a.backgroundColor = s.backgroundColor;
	return a;
};
LButtonSample2.prototype._onDraw = function(s){
	var co = s.getRootCoordinate(),labelText;
	if(s.backgroundSet == s.backgroundColor && s.widthSet == s.width && s.heightSet == s.height && s.xSet == co.x && s.ySet == co.y)return;
	s.backgroundSet = s.backgroundColor;
	s.widthSet = s.width>s.baseWidth?s.width:s.baseWidth;
	s.heightSet = s.height>s.baseHeight?s.height:s.baseHeight;
	s.width = s.widthSet;
	s.height = s.heightSet;
	s.xSet = co.x;
	s.ySet = co.y;
	labelText = s.bitmap_up.back.getChildAt(0);
	labelText.x = (s.width - s.baseWidth + labelText.size)*0.5;
	labelText.y = (s.height - s.baseHeight + labelText.size)*0.5;
	labelText = s.bitmap_over.getChildAt(0);
	labelText.x = (s.width - s.baseWidth + labelText.size)*0.5;
	labelText.y = (s.height - s.baseHeight + labelText.size)*0.5;
	var grd=LGlobal.canvas.createLinearGradient(0,-s.height*0.5,0,s.height*2);
	grd.addColorStop(0,"white");
	grd.addColorStop(1,s.backgroundColor);
	var grd2=LGlobal.canvas.createLinearGradient(0,-s.height,0,s.height*2);
	grd2.addColorStop(0,"white");
	grd2.addColorStop(1,s.backgroundColor);
	s.bitmap_up.back.graphics.clear();
	s.bitmap_over.graphics.clear();
	s.bitmap_up.shadow.graphics.clear();
	s.bitmap_up.back.graphics.drawRoundRect(1,s.backgroundColor,[0,0,s.width,s.height,s.height*0.1],true,grd);
	s.bitmap_up.back.graphics.drawRoundRect(0,s.backgroundColor,[1,s.height*0.5,s.width-2,s.height*0.5-1,s.height*0.1],true,grd2);
	s.bitmap_over.graphics.drawRoundRect(1,s.backgroundColor,[0,0,s.width,s.height,s.height*0.1],true,grd);
	s.bitmap_over.graphics.drawRoundRect(0,s.backgroundColor,[1,s.height*0.5,s.width-2,s.height*0.5-1,s.height*0.1],true,grd2);
	s.disableState.graphics.drawRoundRect(1,s.backgroundColor,[0,0,s.width,s.height,s.height*0.1],true,grd);
	s.disableState.graphics.drawRoundRect(0,s.backgroundColor,[1,s.height*0.5,s.width-2,s.height*0.5-1,s.height*0.1],true,grd2);
};