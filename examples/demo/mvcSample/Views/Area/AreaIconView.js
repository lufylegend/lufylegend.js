function AreaIconView(controller,areaStatus){
	var self = this;
	base(self,LView,[controller]);
	self.areaStatus = areaStatus;
	self.x = self.areaStatus.master().x();
	self.y = self.areaStatus.master().y();
	self.set();
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN, self.onDown);
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onUp);
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	
}
AreaIconView.prototype.onDown=function(event){
	var self = event.currentTarget;
	self.onTouching = true;
	self.saveTouch = {dx:mouseX,dy:mouseY,touchMove:false};
	var baseView = self.parent.parent;
	baseView.startDrag(event.touchPointID);
};
AreaIconView.prototype.onUp=function(event){
	var self = event.currentTarget;
	self.onTouching = false;
	var baseView = self.parent.parent;
	baseView.stopDrag();
	if(!self.lock.visible && !self.saveTouch.touchMove){
		self.controller.showStage(self.areaStatus.id());
	}
};
AreaIconView.prototype.onframe=function(event){
	var self = event.currentTarget;
	var point = self.getRootCoordinate();
	if(point.x > LGlobal.width || point.x < -self.getWidth() || point.y > LGlobal.height || point.y < -self.getHeight()){
		self.layer.visible = false;
	}else{
		self.layer.visible = true;
	}
	if(!self.onTouching){
		return;
	}
	if(!self.saveTouch.touchMove && (Math.abs(self.saveTouch.dx - mouseX) > 5 || Math.abs(self.saveTouch.dy - mouseY) > 5)){
		self.saveTouch.touchMove = true;
	}
};
AreaIconView.prototype.set=function(){
	var self = this;
	
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	/*var bitmapData = new LBitmapData(LMvc.datalist["area-"+self.areaStatus.img()]);
	self.iconWidth = bitmapData.width * 0.5;
	bitmapData.setProperties(0, 0, self.iconWidth, bitmapData.height);
	var bitmap = new LBitmap(bitmapData);
	self.icon = bitmap;
	self.layer.addChild(bitmap);*/
	
	self.icon = self.areaStatus.master().icon();
	self.layer.addChild(self.icon);
	
	var name = new LTextField();
	name.text = self.areaStatus.master().name();
	name.size = 25;
	name.color = "#FFFFFF";
	name.lineColor = "#000000";
	name.stroke = true;
	name.lineWidth = 4;
	name.x = (self.icon.getWidth() - name.getWidth())*0.5;
	name.y = self.icon.getHeight() - name.getHeight();
	self.layer.addChild(name);
	
	self.lock = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
	//self.lock.scaleX = self.lock.scaleY = 0.5;
	self.lock.x = (self.getWidth() - self.lock.getWidth()) * 0.5;
	self.lock.y = (self.getHeight() - self.lock.getHeight()) * 0.5;
	self.addChild(self.lock);
	self.setLock(self.areaStatus.lock());
};
AreaIconView.prototype.setLock = function(value){
	var self = this;
	self.lock.visible = value;
	self.icon.bitmapData.setCoordinate(value ? self.areaStatus.master().iconWidth() : 0, 0);
};
