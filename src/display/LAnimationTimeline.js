/*
* LAnimationTimeline.js
**/
function LAnimationTimeline(data,list){
	var s = this;
	base(s,LAnimation,[null,data,list]);
	s.type = "LAnimationTimeline";
	s.speed = 0;
	s._speedIndex = 0;
	s.labelList = {};
	s.addEventListener(LEvent.ENTER_FRAME,s._onframe);
};
LAnimationTimeline.prototype.clone = function (){
	var s = this,k,o,cB = s.bitmap.bitmapData.clone(),cI = s.imageArray.slice(0),
	a = new LAnimationTimeline(cB,cI);
	a.copyProperty(s);
	for(k in s.labelList){
		o = s.labelList[k];
		a.labelList[k] = {rowIndex:o.rowIndex,colIndex:o.colIndex,mode:o.mode,isMirror:o.isMirror};
	}
	return a;
};
LAnimationTimeline.prototype._onframe = function (event){
	var self = event.target;
	if(self._speedIndex++<self.speed)return;
	self._speedIndex = 0;
	self.onframe();
};
LAnimationTimeline.prototype.setLabel = function (name,_rowIndex,_colIndex,_mode,_isMirror){
	this.labelList[name] = {rowIndex:_rowIndex,colIndex:_colIndex,mode:_mode,isMirror:_isMirror};
};
LAnimationTimeline.prototype.play = function (){
	this.mode = this.saveMode;
};
LAnimationTimeline.prototype.stop = function (){
	this.saveMode = this.mode;
	this.mode = 0;
};
LAnimationTimeline.prototype.gotoAndPlay = function (name){
	var l = this.labelList[name];
	this.setAction(l.rowIndex,l.colIndex,l.mode,l.isMirror);
};
LAnimationTimeline.prototype.gotoAndStop = function (name){
	var l = this.labelList[name];
	this.setAction(l.rowIndex,l.colIndex,l.mode,l.isMirror);
	this.stop();
};
LAnimationTimeline.prototype.addFrameScript = function (name,func,params){
	var l = this.labelList[name];
	var arr = this.imageArray[l.rowIndex][l.colIndex];
	arr.script = func;
	arr.params = params?params:null;
};
LAnimationTimeline.prototype.removeFrameScript = function (name){
	var l = this.labelList[name];
	this.imageArray[l.rowIndex][l.colIndex].script = null;
};
LAnimationTimeline.prototype.toString = function(){
	return "[LAnimationTimeline]";
};