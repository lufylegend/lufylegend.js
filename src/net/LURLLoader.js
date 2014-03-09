/*
* LURLLoader.js
**/
function LURLLoader(){
	var s = this;
	base(s,LObject,[]);
	s.type="LURLLoader";
	s.loadtype = "";
	s.content = null;
	s.oncomplete = null;
	s.event = {};
}
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}
	},
	load:function (u,t){
		var s = this;
		s.loadtype = t;
		if(!t || t == "text"){
			LAjax.get(u,{},function(data){
				if(s.oncomplete){
					s.event.currentTarget = data;
					s.event.target = s;
					s.data = data;
					if(s.oncomplete)s.oncomplete(s.event);
				}
			});
		}else if(t=="js"){
			var script = document.createElement("script");
			script.onload = function (){
				s.event.target = s;
				if(s.oncomplete)s.oncomplete(s.event);
			};
			script.src = u;
			script.type = "text/javascript";
			document.querySelector('head').appendChild(script);
		}
	}
};
for(var k in p)LURLLoader.prototype[k]=p[k];