function LStageWebView(){
	var s = this;
	base(s,LObject,[]);
	s.display = document.createElement("div");
	s.iframe = document.createElement("iframe");
	s.display.style.position = "absolute";
	s.display.style.marginTop = "0px";
	s.display.style.marginLeft = "0px";
	s.display.style.zIndex = 11;
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
		var s = this,sx = parseInt(LGlobal.canvasObj.style.width)/LGlobal.canvasObj.width,sy = parseInt(LGlobal.canvasObj.style.height)/LGlobal.canvasObj.height;
		s.display.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + ((r.y*sy) >>> 0)) + "px";
		s.display.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + ((r.x*sx) >>> 0)) + "px";
		s.iframe.style.width = s.display.style.width = (r.width*sx >>> 0)+"px";
		s.iframe.style.height = s.display.style.height = (r.height*sy >>> 0)+"px";
	}
};