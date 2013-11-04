/*
 * LEventDispatcher.js
 **/
function LEventDispatcher(){
	var s = this;
	base(s,LObject,[]);
	s._eventList = new Array();
}
p = {
	addEventListener:function(type,listener){
		this._eventList.push({listener:listener,type:type});
	},
	removeEventListener:function(type,listener){
		var s = this,i,length;
		length = s._eventList.length;
		for(i=0;i<length;i++){
			if(type == s._eventList[i].type && s._eventList[i].listener == listener){
				s._eventList.splice(i,1);
				return;
			}
		}
	},
	removeAllEventListener:function (){
		this._eventList = [];
	},
	dispatchEvent:function(type){
		var s = this;
		var i,length = s._eventList.length;
		for(i=0;i<length;i++){
			if(type == s._eventList[i].type){
				s.target = s;
				s.event_type = type;
				s._eventList[i].listener(s);
				return;
			}
		}
	},
	hasEventListener:function(type){
		var s = this,i,length = s._eventList.length;
		for(i=0;i<length;i++){
			if(type == s._eventList[i].type)return true;
		}
		return false;
	},
	toString:function(){
		return "[LEventDispatcher]";
	}
};
for(var k in p)LEventDispatcher.prototype[k]=p[k];