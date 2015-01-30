LTextFormat = (function() {
	function LTextFormat(font, size, color, bold, italic, underline) {
		var s = this;
		LExtends(s, LObject, []);
		s.font = font ? font : "Arial";
		s.size = size ? size : 15;
		s.color = color ? color : "#000000";
		s.bold = bold ? bold : false;
		s.italic = italic ? italic : false;
		s.underline = underline ? underline : false;
	}
	LTextFormat.prototype.clone = function() {
		var s = this, a = new s.constructor();
		a.copyProperty(s);
		return a;
	};
	LTextFormat.prototype.getFontText = function() {
		var s = this;
		return (s.italic ? "italic " : "") + (s.bold ? "bold " : "") + s.size + "px " + s.font;
	};
	LTextFormat.prototype.setCss = function(css) {
		var s = this;
	};
	return LTextFormat;
})(); 