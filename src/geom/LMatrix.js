function LMatrix(a,b,c,d,tx,ty){
	var s = this;
	if(typeof a != UNDEFINED)s.a = a;
	if(typeof b != UNDEFINED)s.b = b;
	if(typeof c != UNDEFINED)s.c = c;
	if(typeof d != UNDEFINED)s.d = d;
	if(typeof tx != UNDEFINED)s.tx = tx;
	if(typeof ty != UNDEFINED)s.ty = ty;
}
LMatrix.prototype = {
	a:1,
	b:0,
	c:0,
	d:1,
	tx:0,
	ty:0,
	setTo:function(a,b,c,d,tx,ty){
		var s = this;
		if(typeof a != UNDEFINED)s.a = a;
		if(typeof b != UNDEFINED)s.b = b;
		if(typeof c != UNDEFINED)s.c = c;
		if(typeof d != UNDEFINED)s.d = d;
		if(typeof tx != UNDEFINED)s.tx = tx;
		if(typeof ty != UNDEFINED)s.ty = ty;
		return s;
	},
	isIdentity:function(){
		var s = this;
		return (s.a == 1 && s.b == 0 && s.c == 0 && s.d == 1 && s.tx == 0 && s.ty == 0);
	},
	transform:function(c){
		var s = this;
		c.transform(s.a,s.b,s.c,s.d,s.tx,s.ty);
		return s;
	},
	toString:function(){
		return "[LMatrix]";
	}
};