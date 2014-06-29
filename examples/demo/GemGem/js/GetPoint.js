
function GetPoint(num,x,y){
	var self = this;
	base(self,LSprite,[]);
	var numString = "+"+num;
	for(var i=0;i<numString.length;i++){
		var bitmap = new LBitmap(new LBitmapData(datalist["num."+numString.substr(i,1)]));
		bitmap.x = i*30;
		bitmap.y = (30-bitmap.getHeight())*0.5;
		self.addChild(bitmap);
	}
	self.x = x;
	self.y = y;
	LTweenLite.to(self,2,
	{ 
		y:y-60,
		alpha:0,
		delay:0.3,
		onComplete:function(obj){
			obj.parent.removeChild(obj);
		},
		ease:Strong.easeOut
	});
}