var LLoadManage = (function () {
	function LoadManage(){
		this.llname="ll.file.";
		this.llload="ll.load.";
	}
	LoadManage.prototype = {
		load : function (l, u, c) {
			var s = this;
			s.list = l, s.onupdate = u, s.oncomplete = c;
			s.loader = s, s.index = 0, s.loadIndex = 0, s.result = [], s.lresult = [];
			s.loadInit();
		},
		loadInit : function () {
			var s = this;
			if(s.index >= s.list.length){
				return;
			}
			s.loadIndex = 0;
			s.loadStart();
			s.reloadtime = setTimeout(s.loadInit.bind(s), 10000);
		},
		loadStart : function () {
			var s = this, d;
			if (s.loadIndex >= s.list.length) {
				return;
			}
			d = s.list[s.loadIndex];
			if (!d.name) {
				d.name = s.llname + s.loadIndex;
			}
			if (!s.lresult[s.llload + d.name]) {
				if (d["type"] == "text" || d["type"] == "js") {
					s.loader = new LURLLoader();
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.COMPLETE, s.loadComplete.bind(s));
					s.loader.load(s.url(d.path), d["type"]);
				} else if (d["type"] == "sound") {
					s.loader = new LSound();
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.COMPLETE, s.loadComplete.bind(s));
					s.loader.load(s.url(d.path));
				}else{
					s.loader = new LLoader();
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.COMPLETE, s.loadComplete.bind(s));
					s.loader.load(s.url(d.path), "bitmapData");
				}
			}
			s.loadIndex++;
			s.loadStart();
		},
		loadComplete : function (e) {
			var s = this;
			if (e  && e.currentTarget && e.currentTarget.name) {
				if (e.currentTarget.name.indexOf(s.llname) >= 0) {
					e.target = 1;
				}
				if (s.lresult[s.llload + e.currentTarget.name]) {
					return;
				}
				s.result[e.currentTarget.name] = e.target;
				s.lresult[s.llload + e.currentTarget.name] = 1;
			}
			s.index++;
			if (s.onupdate) {
				s.onupdate(Math.floor(s.index * 100 / s.list.length));
			}
			if (s.index >= s.list.length) {
				if (s.reloadtime) {
					clearTimeout(s.reloadtime);
				}
				s.loader = null;
				var r = s.result;
				s.oncomplete(r);
			}
		},
		url : function (u) {
			if (!LGlobal.traceDebug) {
				return u;
			}
			return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + (new Date()).getTime();
		}
	};
	return new LoadManage();
})();