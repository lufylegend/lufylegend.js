/*
* LAnimation.js
**/
function LAnimation(layer,data,list){
	base(this,LSprite,[]);
	var s = this;
	s.rowIndex = 0;
	s.colIndex = 0;
	s.overActionFun = null;
	s.mode = 1;
	s.isMirror = false;
	s.bitmap =  new LBitmap(data);
	s.imageArray = list;
	s.addChild(s.bitmap);
	if(layer != null)layer.addChild(s);
};
LAnimation.prototype.setAction = function (rowIndex,colIndex,mode,isMirror){
	var s = this;
	if(rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length)s.rowIndex = rowIndex;
	if(colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length)s.colIndex = colIndex;
	if(mode != null)s.mode = mode;
	if(isMirror != null){
		s.isMirror = isMirror;
		if(s.isMirror){
			s.bitmap.scaleX = -1*Math.abs(s.bitmap.scaleX);
		}else{
			s.bitmap.scaleX = 1*Math.abs(s.bitmap.scaleX);
		}
	}
};
LAnimation.prototype.getAction = function (){
	var s = this;
	return [s.rowIndex,s.colIndex,s.mode,s.isMirror];
};
LAnimation.prototype.onframe = function (){
	var s = this;
	s.bitmap.bitmapData.setCoordinate(s.imageArray[s.rowIndex][s.colIndex].x,s.imageArray[s.rowIndex][s.colIndex].y);
	s.colIndex += s.mode;
	if(s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0){
		s.colIndex = s.mode>0?0:s.imageArray[s.rowIndex].length - 1;
		if(s.overActionFun != null)s.overActionFun(s);
	}
};
LAnimation.prototype.addEventListener = function (type,listener){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	if(type == LEvent.COMPLETE){
		s.overActionFun = listener;
	}
};
LAnimation.prototype.removeEventListener = function (type,listener){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	if(type == LEvent.COMPLETE){
		s.overActionFun = null;
	}
};