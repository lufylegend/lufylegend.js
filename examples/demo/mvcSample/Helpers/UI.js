function getButton01(txt){
	var w = 194,h = 71;
	var img = LMvc.datalist['button-01'];
	var btn,up,down,upBitmap,downBitmap,upTxt,downTxt;
	up = new LSprite();
	upBitmap = new LBitmap(new LBitmapData(img,0,0,w,h));
	up.addChild(upBitmap);
	upTxt = new LTextField();
	upTxt.text = txt;
	upTxt.color = "#FFFFFF";
	upTxt.size = 22;
	upTxt.x = (upBitmap.getWidth() - upTxt.getWidth())*0.5;
	upTxt.y = 19;
	up.addChild(upTxt);
	
	down = new LSprite();
	downBitmap = new LBitmap(new LBitmapData(img,0,h,w,h));
	down.addChild(downBitmap);
	downTxt = new LTextField();
	downTxt.text = txt;
	downTxt.color = "#FFFFFF";
	downTxt.size = 22;
	downTxt.x = (downBitmap.getWidth() - downTxt.getWidth())*0.5 + 1;
	downTxt.y = 20;
	down.addChild(downTxt);
	var m = new LSprite();
	m.graphics.drawRect(0,"#000000",[0,0,downBitmap.getWidth(),downBitmap.getHeight()],true,"#000000");
	m.alpha = 0.1;
	down.addChild(m);
	return new LButton(up,down);
}
function getButton02(txt){
	var w = 81,h = 79;
	var img = datalist['button-02'];
	var btn,up,down,upBitmap,downBitmap,upTxt,downTxt;
	up = new LSprite();
	upBitmap = new LBitmap(new LBitmapData(img,0,0,w,h));
	up.addChild(upBitmap);
	upTxt = new LTextField();
	upTxt.text = txt;
	upTxt.color = "#FFFFFF";
	upTxt.size = 22;
	upTxt.x = (upBitmap.getWidth() - upTxt.getWidth())*0.5;
	upTxt.y = 5;
	up.addChild(upTxt);
	
	down = new LSprite();
	downBitmap = new LBitmap(new LBitmapData(img,0,h,w,h));
	down.addChild(downBitmap);
	downTxt = new LTextField();
	downTxt.text = txt;
	downTxt.color = "#FFFFFF";
	downTxt.size = 22;
	downTxt.x = (downBitmap.getWidth() - downTxt.getWidth())*0.5 + 1;
	downTxt.y = 6;
	down.addChild(downTxt);
	return new LButton(up,down);
}
function getButton03(txt){
	var w = 56,h = 32;
	var img = datalist['btnImg-3'];
	var btn,up,down,upBitmap,downBitmap,upTxt,downTxt;
	up = new LSprite();
	upBitmap = new LBitmap(new LBitmapData(img,0,0,w,h));
	up.addChild(upBitmap);
	upTxt = new LTextField();
	upTxt.text = txt;
	upTxt.color = "#FFFFFF";
	upTxt.size = 12;
	upTxt.x = (upBitmap.getWidth() - upTxt.getWidth())*0.5;
	upTxt.y = 7;
	up.addChild(upTxt);
	
	down = new LSprite();
	downBitmap = new LBitmap(new LBitmapData(img,w,0,w,h));
	down.addChild(downBitmap);
	downTxt = new LTextField();
	downTxt.text = txt;
	downTxt.color = "#FFFFFF";
	downTxt.size = 12;
	downTxt.x = (downBitmap.getWidth() - downTxt.getWidth())*0.5 + 1;
	downTxt.y = 8;
	down.addChild(downTxt);
	return new LButton(up,down);
}
function getButton04(txt){
	var w = 87,h = 44;
	var img = datalist['btnImg-4'];
	var btn,up,down,upBitmap,downBitmap,upTxt,downTxt;
	up = new LSprite();
	upBitmap = new LBitmap(new LBitmapData(img,0,0,w,h));
	up.addChild(upBitmap);
	upTxt = new LTextField();
	upTxt.text = txt;
	upTxt.color = "#FFFFFF";
	upTxt.size = 12;
	upTxt.x = (upBitmap.getWidth() - upTxt.getWidth())*0.5;
	upTxt.y = 14;
	up.addChild(upTxt);
	
	down = new LSprite();
	downBitmap = new LBitmap(new LBitmapData(img,w,0,w,h));
	down.addChild(downBitmap);
	downTxt = new LTextField();
	downTxt.text = txt;
	downTxt.color = "#FFFFFF";
	downTxt.size = 12;
	downTxt.x = (downBitmap.getWidth() - downTxt.getWidth())*0.5 + 1;
	downTxt.y = 15;
	down.addChild(downTxt);
	return new LButton(up,down);
}