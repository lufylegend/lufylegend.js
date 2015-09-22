function getBitmap(displayObject){
	var bitmapData = new LBitmapData(null,0,0,displayObject.getWidth(),displayObject.getHeight(),LBitmapData.DATA_CANVAS);
	bitmapData.draw(displayObject);
	return new LBitmap(bitmapData);
}
function getButton(text,width,type){
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win01"]),width,50);
	var textLabel = getStrokeLabel(text,18,"#FFFFFF","#000000",3);
	textLabel.x = (width - textLabel.getWidth()) * 0.5;
	textLabel.y = (50 - textLabel.getHeight()) * 0.5;
	bitmapWin.addChild(textLabel);
	return new LButton(getBitmap(bitmapWin));
}
function getTranslucentBitmap(){
	var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = LGlobal.width / backgroundData.width;
	background.scaleY = LGlobal.height / backgroundData.height;
	return background;
}
/**
 *title,message,okEvent,cancelEvent 
 */
function ConfirmWindow(obj){
	console.log("ConfirmWindow",obj);
	var windowLayer = new LSprite();
	windowLayer.addChild(getTranslucentBitmap());
	windowLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_OVER, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_OUT, function(){});
	
	var backgroundData = new LBitmapData(LMvc.datalist["win07"]);
	var panel = getBitmap(new LPanel(backgroundData,320,300));
	panel.x = (LGlobal.width - panel.getWidth()) * 0.5;
	panel.y = (LGlobal.height - panel.getHeight()) * 0.5;
	windowLayer.addChild(panel);
	
	var title = getStrokeLabel(obj.title,20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = panel.y + 8;
	windowLayer.addChild(title);
	
	var msg = getStrokeLabel(obj.message,16,"#FFFFFF","#000000",4);
	msg.width = 260;
	msg.setWordWrap(true,27);
	msg.x = panel.x + 30;
	msg.y = panel.y + 80;
	windowLayer.addChild(msg);
	
	var okData = new LBitmapData(LMvc.datalist["win01"]);
	var okPanel = new LPanel(okData,120,50);
	okPanel.y = panel.y + panel.getHeight() - okPanel.getHeight() - 20;
	windowLayer.addChild(okPanel);
	
	var buttonTitle = getStrokeLabel(obj.okText,15,"#FFFFFF","#000000",2);
	buttonTitle.x = (okPanel.getWidth() - buttonTitle.getWidth()) * 0.5;
	buttonTitle.y = (okPanel.getHeight() - buttonTitle.getHeight()) * 0.5;
	okPanel.addChild(buttonTitle);
	
	if(obj.cancelEvent){
		var cancelData = new LBitmapData(LMvc.datalist["win01"]);
		var cancelPanel = new LPanel(okData,120,50);
		cancelPanel.y = panel.y + panel.getHeight() - cancelPanel.getHeight() - 20;
		windowLayer.addChild(cancelPanel);
		
		buttonTitle = getStrokeLabel(obj.cancelText,15,"#FFFFFF","#000000",2);
		buttonTitle.x = (cancelPanel.getWidth() - buttonTitle.getWidth()) * 0.5;
		buttonTitle.y = (cancelPanel.getHeight() - buttonTitle.getHeight()) * 0.5;
		cancelPanel.addChild(buttonTitle);
		cancelPanel.addEventListener(LMouseEvent.MOUSE_UP, obj.cancelEvent);
	
		okPanel.x = LGlobal.width*0.5 - okPanel.getWidth() - 10;
		cancelPanel.x = LGlobal.width*0.5 + 10;
	}else{
		okPanel.x = (LGlobal.width - okPanel.getWidth())*0.5;
	}
	okPanel.addEventListener(LMouseEvent.MOUSE_UP, obj.okEvent);
	
	return windowLayer;
}
