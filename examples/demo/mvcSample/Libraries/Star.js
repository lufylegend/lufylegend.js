function Star(value, maxValue, type){
	var self = this;
	base(self,LSprite,[]);
	self.maxValue = maxValue;
	self.type = type;
	self.setValue(value);
}
Star.TYPE_CARD = "typeCard";
Star.TYPE_RESULT = "typeResult";
Star.prototype.setValue = function(value){
	var self = this;
	self.removeAllChild();
	var layer = new LSprite();
	var p = 1.2;
	if(self.type == Star.TYPE_CARD){
		p = 0.7;
	}
	for(var i=0;i<self.maxValue;i++){
		var star = getStar(i<value?1:0);
		star.x = star.getWidth() * p * i;
		layer.addChild(star);
	}
	self.addChild(getBitmap(layer));
}
