/*
 * LObject.js
 **/
function LObject(){
	this.type = "LObject";
	this.objectIndex = ++LGlobal.objectIndex;
	this.objectindex = this.objectIndex;
}
LObject.prototype = {
	callParent:function(f_n,args){
		if(!args || !f_n)return;
		return args.callee[SUPER][f_n].apply(this,args);
	},
	toString:function(){
		return "[LObject]";
	}
};