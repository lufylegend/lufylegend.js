function LStageWebView(){
	var s = this;
	base(s,LObject,[]);
	s.display = document.createElement("div");
	s.iframe = document.createElement("iframe");
	s.display.style.position = "absolute";
	s.display.style.marginTop = "0px";
	s.display.style.marginLeft = "0px";
	s.display.style["z-index"] = 11;
	s.display.style.overflow = "auto";
	s.display.appendChild(s.iframe);
}
LStageWebView.prototype = {
	loadURL:function(u){
		this.iframe.src=u;
	},
	show:function(){
		LGlobal.object.appendChild(this.display);
	},
	die:function(){
		LGlobal.object.removeChild(this.display);
	},
	setViewPort:function(r){
		var s = this;
		s.display.style.marginTop = r.y+"px";
		s.display.style.marginLeft = r.x+"px";
		s.display.style.width = r.width+"px";
		s.display.style.height = r.height+"px";
	}
};