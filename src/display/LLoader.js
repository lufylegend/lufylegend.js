/*
* LLoader.js
**/
function LLoader(){
	base(this,LEventDispatcher,[]);
	var s = this;
	s.type="LLoader";
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
		if(!t || t == "bitmapData"){
			s.content = new Image();
			s.content.onload = function(){
				s.content.onload = null;
				if(s.oncomplete){
					s.event.currentTarget = s.content;
					s.event.target = s;
					s.oncomplete(s.event);
				}
			};
			s.content.src = u; 
		}
	},
	toString:function(){
		return "[LLoader]";
	}
};
for(var k in p)LLoader.prototype[k]=p[k];