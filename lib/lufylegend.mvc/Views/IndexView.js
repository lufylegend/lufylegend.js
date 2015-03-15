function IndexView(){
	base(this,LView,[]);
}
IndexView.prototype.construct=function(){
	var self = this;
	LMvc.layer.addChild(self);
	
	var title = new LTextField();
	title.text = "LMvc是lufylegend.js引擎专用MVC框架";
	self.addChild(title);
};
