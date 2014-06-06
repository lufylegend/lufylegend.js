/*
* LAnimation.js
**/
var LAnimation = (function () {
	function LAnimation(layer, data, list){
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LAnimation";
		s.rowIndex = 0;
		s.colIndex = 0;
		s.mode = 1;
		s.isMirror = false;
		s.bitmap =  new LBitmap(data);
		s.imageArray = list;
		s.addChild(s.bitmap);
		if (layer != null) {
			layer.addChild(s);
		}
		s.onframe();
		s.colIndex = 0;
	}
	var p = {
		setAction : function (rowIndex,colIndex,mode,isMirror){
			var s = this;
			if (rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length) {
				s.rowIndex = rowIndex;
			}
			if (colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length) {
				s.colIndex = colIndex;
			}
			if (mode != null) {
				s.mode = mode;
			}
			if (isMirror != null) {
				s.isMirror = isMirror;
				if (s.isMirror) {
					s.bitmap.x = s.bitmap.getWidth();
					s.bitmap.scaleX = -1 * Math.abs(s.bitmap.scaleX);
				}else{
					s.bitmap.x = 0;
					s.bitmap.scaleX = Math.abs(s.bitmap.scaleX);
				}
			}
		},
		getAction = function () {
			var s = this;
			return [s.rowIndex, s.colIndex, s.mode, s.isMirror];
		},
		onframe = function (){
			var s = this, arr = s.imageArray[s.rowIndex][s.colIndex];
			if (typeof arr.width != UNDEFINED && typeof arr.height != UNDEFINED) {
				s.bitmap.bitmapData.setProperties(arr.x, arr.y, arr.width, arr.height);
			} else {
				s.bitmap.bitmapData.setCoordinate(arr.x, arr.y);
			}
			if (typeof arr.sx != UNDEFINED) {
				s.bitmap.x = arr.sx;
			}
			if (typeof arr.sy != UNDEFINED) {
				s.bitmap.y = arr.sy;
			}
			if (typeof arr.script == "function") {
				arr.script(s, arr.params);
			}
			s.colIndex += s.mode;
			if (s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0) {
				s.colIndex = s.mode > 0 ? 0 : s.imageArray[s.rowIndex].length - 1;
				s.dispatchEvent(LEvent.COMPLETE);
			}
		},
		clone : function () {
			var s = this, cB = s.bitmap.bitmapData.clone(), cI = s.imageArray.slice(0),
			a = new LAnimation(null, cB, cI);
			a.copyProperty(s);
			return a;
		}
	};
	for (var k in p) {
		LAnimation.prototype[k] = p[k];
	}
	return LAnimation;
})();