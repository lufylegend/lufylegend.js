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
			if(!s._eventList[i])continue;
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
		var i,length = s._eventList.length,ctype = (typeof type == "string") ? type : type.eventType;
		for(i=0;i<length;i++){
			if(!s._eventList[i])continue;
			if(ctype == s._eventList[i].type){
				if(typeof type == "string"){
					s.currentTarget = s.target = s;
					s.eventType = s.event_type = ctype;
					s._eventList[i].listener(s);
				}else{
					type.currentTarget = type.target = s;
					s._eventList[i].listener(type);
				}
			}
		}
	},
	hasEventListener:function(type){
		var s = this,i,length = s._eventList.length;
		for(i=0;i<length;i++){
			if(!s._eventList[i])continue;
			if(type == s._eventList[i].type)return true;
		}
		return false;
	}
};
for(var k in p)LEventDispatcher.prototype[k]=p[k];