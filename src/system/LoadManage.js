function $LoadManage(){}
$LoadManage.prototype={
	load:function(l,u,c){
		var s = this;
		s.list=l,s.onupdate=u,s.oncomplete=c;
		s.loader=s,s.index=0,s.loadIndex=0,s.result=[];
		s.loadStart();
	},
	loadStart:function(){
		var s = LLoadManage,d;
		if(s.loadIndex >= s.list.length)return;
		d = s.list[s.loadIndex];
		if(d["type"] == "text" || d["type"] == "js"){
			s.loader = new LURLLoader();
			s.loader.name = s.list[s.loadIndex].name;
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path),d["type"]);
		}else if(d["type"] == "sound"){
			s.loader = new LSound();
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path));
		}else{
			s.loader = new LLoader();
			s.loader.name = s.list[s.loadIndex].name;
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path),"bitmapData");
		}
		s.loadIndex++;
		s.loadStart();
	},
	loadComplete:function(e){
		var s = LLoadManage;
		if(e  && e.target && e.target.name)s.result[e.target.name] = e.currentTarget;
		s.index++;
		if(s.onupdate){
			s.onupdate(Math.floor(s.index*100/s.list.length));
		}
		if(s.index >= s.list.length){
			s.loader = null;
			s.oncomplete(s.result);
		}
	},
	url:function(u){
		if(!LGlobal.traceDebug)return u;
		return u+(u.indexOf('?')>=0?'&':'?')+'t='+(new Date()).getTime();
	}
};