function LVec2(x,y){
	this.x = x?x:0;
	this.y = y?y:0;
}
LVec2.prototype.length = function(){
	var s = this;
	return Math.sqrt(s.x * s.x + s.y * s.y);
};
LVec2.prototype.normalize = function(){
	var s = this,l=s.length();
	return new LVec2(s.x/l,s.y/l);
};
//[x*cosA-y*sinA  x*sinA+y*cosA] 
LVec2.prototype.normR = function(){
	return new LVec2(-this.y,this.x);
};
LVec2.prototype.normL = function(){
	return new LVec2(this.y,-this.x);
};
//|a||b|Cosθ
LVec2.dot = function(a,b){
	return a.x * b.x + a.y * b.y;
};
//|a||b|Sinθ
LVec2.cross = function(a,b){
	return a.x * b.y - a.y * b.x;
};
LVec2.distance = function(a,b){
	var x = a.x - b.x;
	var y = a.y - b.y;
	return Math.sqrt(x * x + y * y);
};
LVec2.getMinMax = function(vecs,axis){
	var min_o = LVec2.dot(vecs[0],axis);
	var max_o = LVec2.dot(vecs[0],axis);
	var min_i = 0;
	var max_i = 0;
	for(var i=1;i<vecs.length;i++){
		var this_o = LVec2.dot(vecs[i],axis);
		if(min_o > this_o){
			min_o = this_o;
			min_i = i;
		}
		if(max_o < this_o){
			max_o = this_o;
			max_i = i;
		}
	}
	return {"min_o":min_o,"min_i":min_i,"max_o":max_o,"max_i":max_i};
};