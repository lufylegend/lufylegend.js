LTextFormat = (function() {
	function LTextFormat(font, size, color, bold, italic, underline) {
		var s = this;
		LExtends(s, LObject, []);
		s.font = font ? font : "Arial";
		s.size = size ? size : 11;
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
	return LTextFormat;
})(); 