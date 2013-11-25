function Tutorial01Controller(){
	base(this,MyController,[]);
}
Tutorial01Controller.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
Tutorial01Controller.prototype.init=function(){
	var self = this;
	self.view.init();
};
Tutorial01Controller.prototype.selectLeft=function(){
	var self = this;
	self.model.selectLeft();
	self.view.showCharacter(self.model.selectIndex);
};
Tutorial01Controller.prototype.selectRight=function(){
	var self = this;
	self.model.selectRight();
	self.view.showCharacter(self.model.selectIndex);
};
Tutorial01Controller.prototype.selectCharacter=function(){
	var self = this;
	self.model.selectCharacter(self.selectCharacterOver);
};
Tutorial01Controller.prototype.selectCharacterOver=function(){
	var self = this;
	self.view.parent.controller.checkStep();
};