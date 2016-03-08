var LFontLoader = (function () {
	function LFontLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LFontLoader";
	}
	LFontLoader.TYPE_FONT = "font";
	LFontLoader.prototype.load = function (u, name) {
		var s = this, font, tff, eot, a, b, d, t = "";
		font = document.createElement("style");
		a = u.split(',');
		for (var i = 0; i < a.length; i++) {
			b = a[i].split('.');
			d = b[b.length - 1];
			if(d == "ttf"){
				tff = a[i];
			}else if(d == "eot"){
				eot = a[i];
			}
		}
		t = "@font-face { font-family:'" + name + "';";
		if(eot){
			t += "src: url(" + eot + ");"; 
		}
		if(tff){
			t += "src: local('lufy'),url(" + tff + ") format('opentype');"; 
		}
		font.innerHTML = t;
		document.querySelector('head').appendChild(font);
		setTimeout(function(){
			var event = new LEvent(LEvent.COMPLETE);
			event.currentTarget = s;
			event.target = s;
			s.dispatchEvent(event);
		},1);
	};
	return LFontLoader;
})();