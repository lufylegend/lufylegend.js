/*
* LURLLoader.js
**/
var LURLLoader = (function () {
	function LURLLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LURLLoader";
		s.loadtype = "";
		s.content = null;
		s.event = {};
	}
	LURLLoader.prototype.load = function (u, t) {
		var s = this, event;
		s.loadtype = t;
		if (!t || t == "text") {
			LAjax.get(u, {}, function (data) {
				event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = data;
				s.dispatchEvent(event);
				delete s.content;
			});
		} else if (t == "js") {
			var script = document.createElement("script");
			script.onload = function () {
				event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = s;
				s.dispatchEvent(event);
				delete s.content;
			};
			script.src = u;
			script.type = "text/javascript";
			document.querySelector('head').appendChild(script);
		}
	};
	return LURLLoader;
})();