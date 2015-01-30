LStyleSheet = (function() {
	function LStyleSheet() {
		var s = this;
		LExtends(s, LObject, []);
		s.textFormat = new LTextFormat();
		this._cssList = {};
	}
	LStyleSheet.prototype.clone = function() {
		var s = this, a = new s.constructor();
		a.copyProperty(s);
		a.textFormat = s.textFormat.clone();
		return a;
	};
	LStyleSheet.prototype.setStyle = function(styleName, styleObject) {
		this._cssList[styleName] = styleObject;
	};
	LStyleSheet.prototype.getStyle = function(styleName) {
		return this._cssList[styleName];
	};
	LStyleSheet.prototype.getTextBitmap = function(textField) {
	};
	return LStyleSheet;
})(); 