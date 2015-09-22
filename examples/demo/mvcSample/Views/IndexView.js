function IndexView(){
	base(this,LView,[]);
}
IndexView.prototype.construct=function(){
	var self = this;
	LMvc.layer.addChild(self);
};
