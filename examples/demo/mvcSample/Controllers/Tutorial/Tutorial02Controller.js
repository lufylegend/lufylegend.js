function Tutorial02Controller(){
	base(this,MyController,[]);
}
Tutorial02Controller.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
Tutorial02Controller.prototype.init=function(){
	var self = this;
	self.view.init();
};
Tutorial02Controller.prototype.selectWesternNorth=function(){
	var self = this;
	self.model.selectCity("wn",self.selectCityOver);
};
Tutorial02Controller.prototype.selectEastNorth=function(){
	var self = this;
	self.model.selectCity("en",self.selectCityOver);
};
Tutorial02Controller.prototype.selectWesternSouth=function(){
	var self = this;
	self.model.selectCity("ws",self.selectCityOver);
};
Tutorial02Controller.prototype.selectEastSouth=function(){
	var self = this;
	self.model.selectCity("es",self.selectCityOver);
};
Tutorial02Controller.prototype.selectCityOver=function(){
	var self = this;
	self.view.parent.controller.checkStep();
};