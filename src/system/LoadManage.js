function $LoadManage(){this.llname="ll.file.";}
$LoadManage.prototype={
	load:function(l,u,c){
		var s = this;
		s.list=l,s.onupdate=u,s.oncomplete=c;
		s.loader=s,s.index=0,s.loadIndex=0,s.result=[];
		s.loadInit();
	},
	loadInit:function(){
		var s = LLoadManage;
		if(s.index >= s.list.length){
			return;
		}
		s.loadIndex = 0;
		s.loadStart();
		s.reloadtime = setTimeout(s.loadInit,10000);
	},
	loadStart:function(){
		var s = LLoadManage,d;
		if(s.loadIndex >= s.list.length)return;
		d = s.list[s.loadIndex];
		if(!d.name){
			d.name = s.llname+s.loadIndex;
		}
		if(!s.result[d.name]){
			if(d["type"] == "text" || d["type"] == "js"){
				s.loader = new LURLLoader();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path),d["type"]);
			}else if(d["type"] == "sound"){
				s.loader = new LSound();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path));
			}else{
				s.loader = new LLoader();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path),"bitmapData");
			}
		}
		s.loadIndex++;
		s.loadStart();
	},
	loadComplete:function(e){
		var s = LLoadManage;
		if(e  && e.target && e.target.name){
			if(e.target.name.indexOf(s.llname) >= 0){
				e.currentTarget = 1;
			}
			if(s.result[e.target.name]){
				return;
			}
			s.result[e.target.name] = e.currentTarget;
		}
		s.index++;
		if(s.onupdate){
			s.onupdate(Math.floor(s.index*100/s.list.length));
		}
		if(s.index >= s.list.length){
			if(s.reloadtime){
				clearTimeout(s.reloadtime);
			}
			s.loader = null;
			var r = s.result;
			s.oncomplete(r);
		}
	},
	url:function(u){
		if(!LGlobal.traceDebug)return u;
		return u+(u.indexOf('?')>=0?'&':'?')+'t='+(new Date()).getTime();
	}
};