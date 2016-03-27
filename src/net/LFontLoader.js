/** @language chinese
 * LFontLoader 类可用于加载外部Font文件。使用 load() 方法来启动加载。
 * @class LFontLoader
 * @extends LEventDispatcher
 * @constructor
 * @since 1.10.0
 * @public
 */
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
		font.onerror = function(e){
			var event = new LEvent(LEvent.ERROR);
			event.currentTarget = s;
			event.target = e.target;
			event.responseURL = u;
			s.dispatchEvent(event);
		};
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
/** @language chinese
 * Font文件加载完成事件。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 * @since 1.10.0
 */
/** @language chinese
 * Font文件加载异常事件。
 * <p><a href="LEvent.html#property_ERROR">LEvent.ERROR</a></p>
 * @event LEvent.ERROR
 * @since 1.10.1
 */