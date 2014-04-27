function $LTweenLiteChild($target,$duration,$vars){
	var s = this;
	s.objectIndex = s.objectindex = ++LGlobal.objectIndex;
	s.toNew=[];
	s.init($target,$duration,$vars);
}
$LTweenLiteChild.prototype = {
	init:function($target,$duration,$vars){
		var s = this,k=null;
		s.target=$target;s.duration=$duration || 0.001;s.vars=$vars;
		s.currentTime = (new Date()).getTime() / 1000;
		s.delay = s.vars.delay || 0;
		s.combinedTimeScale = s.vars.timeScale || 1;
		s.active = s.duration == 0 && s.delay == 0;
		s.varsto={};
		s.varsfrom={};
		if (typeof(s.vars.ease) != "function") {
			s.vars.ease = LEasing.None.easeIn;
		}
		s.ease = s.vars.ease;
		delete s.vars.ease;
		if(s.vars.onComplete){
			s.onComplete = s.vars.onComplete;
			delete s.vars.onComplete;
		}
		if(s.vars.onUpdate){
			s.onUpdate = s.vars.onUpdate;
			delete s.vars.onUpdate;
		}
		if(s.vars.onStart){
			s.onStart = s.vars.onStart;
			delete s.vars.onStart;
		}
		for(k in s.vars){
			s.varsto[k] = s.vars[k];
			s.varsfrom[k] = s.target[k];
		}
		s.initTime = s.currentTime;
		s.startTime = s.initTime + s.delay;
	},
	tween:function(){
		var s = this;
		var time = (new Date()).getTime() / 1000 , etime;
		etime = (time - s.startTime);
		if(etime < 0)return;
		var tweentype=null;
		for(tweentype in s.varsto){
			var v = s.ease(etime,s.varsfrom[tweentype],s.varsto[tweentype]-s.varsfrom[tweentype],s.duration);
			s.target[tweentype] = v;
		}
		if(s.onStart){
			s.onStart(s.target);
			delete s.onStart;
		}
		if (etime >= s.duration){
			for(tweentype in s.varsto)s.target[tweentype] = s.varsto[tweentype];
			if(s.onComplete)s.onComplete(s.target);
			return true;
		}else if(s.onUpdate){
			s.onUpdate(s.target);
		}
		return false;
	},
	to:function($target,$duration,$vars){
		var s = this;
		s.toNew.push({target:$target,duration:$duration,vars:$vars});
		return s;
	},
	keep:function(){
		var s = this;
		if(s.toNew.length > 0){
			var t = s.toNew.shift();
			if(t.vars.loop)s.loop = true;
			if(s.loop){
				var vs = {},k;
				for(k in t.vars)vs[k]=t.vars[k];
				s.to(t.target,t.duration,vs);
			}
			s.init(t.target,t.duration,t.vars);
			return true;
		}
		return false;
	}
};
function $LTweenLite(){}
$LTweenLite.prototype = {
	tweens:[],
	ll_show:null,
	frame:function(){
		var s = this;
		var i,length=s.tweens.length,t;
		for(i=0;i < length;i++){
			t = s.tweens[i];
			if(t && t.tween && t.tween()){
				s.tweens.splice(i,1);
				i--,length=s.tweens.length;
				if(t.keep())s.add(t);
			}
		}
		if(s.tweens.length == 0)s.ll_show = null;
	},
	to:function($target,$duration,$vars){
		if(!$target)return;
		var s = this;
		var tween = new $LTweenLiteChild({},0,{});
		s.tweens.push(tween);
		s.ll_show = s.frame;
		tween.to($target,$duration,$vars);
		return tween;
	},
	add:function(tween){
		this.tweens.push(tween);
	},
	remove:function(tween){
		var s = this;
		if(typeof tween == UNDEFINED)return;
		for(i=0,l=s.tweens.length;i < l;i++){
			if(tween.objectIndex == s.tweens[i].objectIndex){
				s.tweens.splice(i,1);
				break;
			}
		}
	},
	removeAll:function(){
		this.tweens.splice(0,this.tweens.length);
	}
};