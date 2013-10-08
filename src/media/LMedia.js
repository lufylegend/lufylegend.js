/*
 * LMedia.js 
 **/
function LMedia(){
	var s = this;
	base(this,LDisplayObject,[]);
	s.length=0;
	s.loopIndex=0;
	s.loopLength = 1;
	s.playing=false;
	s.event = {};
	s.oncomplete = null;
	s.onsoundcomplete = null;
}
LMedia.CANPLAYTHROUGH_EVENT = "canplaythrough";
LMedia.ENDED_EVENT = "ended";
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}else if(t == LEvent.SOUND_COMPLETE){
			this.onsoundcomplete = l;
		}
	},
	removeEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = null;
		}else if(t == LEvent.SOUND_COMPLETE){
			this.onsoundcomplete = null;
		}
	},
	onload:function(){
		var s=this;
		if(s.data.readyState || (LGlobal.ios && LGlobal.canTouch)){
			s.length=s.data.duration;
			if(s.oncomplete){
				s.event.currentTarget = s;
				s.oncomplete(s.event);
			}
			return;
		}
		s.data.addEventListener(LMedia.CANPLAYTHROUGH_EVENT, function () {
			s.onload();
		}, false);
	},
	_onended:function(){
		var s=this;
		if(s.data.ended){
			if(s.onsoundcomplete)s.onsoundcomplete();
			if(++s.loopIndex < s.loopLength){
				s.data.currentTime=0;
				s.data.play();
			}else{
				s.close();
			}
		}
	},
	load:function(u){
		var s = this,a,b,k,d,q={"mov":"quicktime","3gp":"3gpp","ogv":"ogg","m4a":"mpeg","mp3":"mpeg","wave":"wav","aac":"mp4"};
		a = u.split(',');
		for(k in a){
			b = a[k].split('.');
			d=b[b.length-1];
			if(q[d])d=q[d];
			if(s.data.canPlayType(s._type+"/"+d)){
				s.data.src = a[k];
				s.onload();
				s.data.addEventListener(LMedia.ENDED_EVENT, function(){
					s._onended();
				}, false);
				s.data.load();
				return;
			}
		}
		if(s.oncomplete)s.oncomplete({});
	},
	setVolume:function(v){
		this.data.volume=v;
	},
	getVolume:function(){
		return this.data.volume;
	},
	play:function(c,l){
		var s=this;
		if(typeof l == UNDEFINED)l=1;
		if(typeof c == UNDEFINED)c=0;
		if(c>0)s.data.currentTime=c;
		s.data.loop = false;
		s.loopIndex=0;
		s.loopLength = l;
		s.playing=true;
		s.data.play();
		s._onended();
	},
	stop:function(){
		this.playing=false;
		this.data.pause();
	},
	close:function(){
		var s=this;
		s.playing=false;
		s.data.pause();
		s.data.currentTime=0;
	}
};
for(var k in p)LMedia.prototype[k]=p[k];