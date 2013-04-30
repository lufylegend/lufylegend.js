/*
 * LDisplayObject.js
 **/
function LDisplayObject(){
	base(this,LObject,[]);
	this.mouseChildren = true;
}
LDisplayObject.prototype = {
	setShadow:function(){
		var s=this,f=s.filters;
		if(!f)return;
		for(var i=0;i<f.length;i++)f[i].show();
	}
};