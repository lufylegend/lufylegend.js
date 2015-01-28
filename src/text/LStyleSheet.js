LStyleSheet = (function() {
	function LStyleSheet() {
		var s = this;
		LExtends(s, LObject, []);
		s.fontFamily = "Arial";
		s.size = 11;
		s.color = "#000000";
		this._cssList = [];
	}
	LStyleSheet.prototype.setStyle = function(key, obj) {
		this._cssList[key] = obj;
	};
	LStyleSheet.prototype.getTextList = function(text, cssList) {
		var s = this, list = [];
		var oldCharStr = "";
		for (var i = 0, l = text.length; i < l; i++) {
			var charStr = text.charAt(i);
			if (charStr == "<" && oldCharStr != "\\") {
				var closeIndex = text.indexOf(">", i + 1);
				var tabName = text.substr(i + 1, closeIndex - i - 1);
				console.log(tabName);
			}
		}
		return list;
	};
	LStyleSheet.prototype.getTextBitmap = function(textField) {
		var s = this;
		var layer = new LSprite();
		var text = textField.htmlText;
		var oldCharStr = "";
		for (var i = 0, l = text.length; i < l; i++) {
			var charStr = text.charAt(i);
			if (charStr == "<" && oldCharStr != "\\") {
				var closeIndex = text.indexOf(">", i + 1);
				var tabName = text.substr(i + 1, closeIndex - i - 1);
				console.log(tabName);
			}
		}
		var txt = new LTextField();
		txt.text = textField.htmlText;
		txt.heightMode = LTextField.HEIGHT_MODE_BASELINE;
		layer.addChild(txt);
		var bitmapData = new LBitmapData(null, 0, 0, layer.getWidth(), layer.getHeight());
		bitmapData.draw(layer);
		var bitmap = new LBitmap(bitmapData);
		return bitmap;
	};
	LStyleSheet.prototype._ll_show = function(textField) {
		var s = this;
		if (s.width != textField.width || s.htmlText != textField.htmlText) {
			s.htmlText = textField.htmlText;
			s.width = textField.width;
			s.textBitmap = s.getTextBitmap(textField);
		}
		s.textBitmap._ll_show();
	};
	return LStyleSheet;
})(); 