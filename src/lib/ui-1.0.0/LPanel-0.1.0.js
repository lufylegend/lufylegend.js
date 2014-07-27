/** @language chinese
 * lufylegend.js专用UI，Panel
 * @class UI:LPanel
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LPanel.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, Panel
 * @class UI:LPanel
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LPanel.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、コントロールパネル
 * @class UI:LPanel
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LPanel.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LPanel(bitmapData,w,h,x1,x2,y1,y2){
	var s = this;
	base(s,LSprite,[]);
	s.type = "LPanel";
	if(typeof bitmapData == "string"){
		var d = new LShape();
		d.graphics.drawRoundRect(1,"#000000",[0,0,20,20,5],true,bitmapData);
		bitmapData = new LBitmapData(null,0,0,20,20);
		bitmapData.draw(d);
	}
	s.x1 = x1?x1:bitmapData.width*0.4;
	s.x2 = x2?x2:bitmapData.width*0.6;
	s.y1 = y1?y1:bitmapData.height*0.4;
	s.y2 = y2?y2:bitmapData.height*0.6;
	s.bitmapData = bitmapData;
	var ltData=new LBitmapData(bitmapData.image,bitmapData.x,bitmapData.y,s.x1,s.y1);
	var mtData=new LBitmapData(bitmapData.image,bitmapData.x+s.x1,bitmapData.y,s.x2-s.x1,s.y1);
	var rtData=new LBitmapData(bitmapData.image,bitmapData.x+s.x2,bitmapData.y,bitmapData.width-s.x2,s.y1);
	var lmData=new LBitmapData(bitmapData.image,bitmapData.x,bitmapData.y+s.y1,s.x1,s.y2-s.y1);
	var mmData=new LBitmapData(bitmapData.image,bitmapData.x+s.x1,bitmapData.y+s.y1,s.x2-s.x1,s.y2-s.y1);
	var rmData=new LBitmapData(bitmapData.image,bitmapData.x+s.x2,bitmapData.y+s.y1,bitmapData.width-s.x2,s.y2-s.y1);
	var lbData=new LBitmapData(bitmapData.image,bitmapData.x,bitmapData.y+s.y2,s.x1,bitmapData.height-s.y2);
	var mbData=new LBitmapData(bitmapData.image,bitmapData.x+s.x1,bitmapData.y+s.y2,s.x2-s.x1,bitmapData.height-s.y2);
	var rbData=new LBitmapData(bitmapData.image,bitmapData.x+s.x2,bitmapData.y+s.y2,bitmapData.width-s.x2,bitmapData.height-s.y2);
	s.ltBitmap = new LBitmap(ltData);
	s.addChild(s.ltBitmap);
	s.mtBitmap = new LBitmap(mtData);
	s.mtBitmap.x = s.x1 - 1;
	s.addChild(s.mtBitmap);
	s.rtBitmap = new LBitmap(rtData);
	s.addChild(s.rtBitmap);
	
	s.lmBitmap = new LBitmap(lmData);
	s.lmBitmap.y = s.y1 - 1;
	s.addChild(s.lmBitmap);
	s.mmBitmap = new LBitmap(mmData);
	s.mmBitmap.x = s.x1 - 1;
	s.mmBitmap.y = s.y1 - 1;
	s.addChild(s.mmBitmap);
	s.rmBitmap = new LBitmap(rmData);
	s.rmBitmap.y = s.y1 - 1;
	s.addChild(s.rmBitmap);
	
	s.lbBitmap = new LBitmap(lbData);
	s.addChild(s.lbBitmap);
	s.mbBitmap = new LBitmap(mbData);
	s.mbBitmap.x = s.x1 - 1;
	s.addChild(s.mbBitmap);
	s.rbBitmap = new LBitmap(rbData);
	s.addChild(s.rbBitmap);
	
	s.resize(w,h);
}
LPanel.prototype.resize = function(w,h){
	var s = this;
	s.rtBitmap.x = s.rmBitmap.x = s.rbBitmap.x = w - (s.bitmapData.width-s.x2);
	s.lbBitmap.y = s.mbBitmap.y = s.rbBitmap.y = h - (s.bitmapData.height-s.y2);
	s.lmBitmap.scaleY=s.mmBitmap.scaleY=s.rmBitmap.scaleY = (h - s.y1 - (s.bitmapData.height - s.y2) + 2)/(s.y2 - s.y1);
	s.mtBitmap.scaleX=s.mmBitmap.scaleX=s.mbBitmap.scaleX = (w - s.x1 - (s.bitmapData.width - s.x2) + 2)/(s.x2 - s.x1);
};