/*
 * LMouseEventContainer.js
 **/
function $LMouseEventContainer(){
	var s = this;
	s.dispatchAllEvent = false;
	s.mouseDownContainer = [];
	s.mouseUpContainer = [];
	s.mouseMoveContainer = [];
	s.mouseOverContainer = [];
	s.mouseOutContainer = [];
	s.mouseDblContainer = [];
	s.textFieldInputContainer = [];
};
$LMouseEventContainer.prototype = {
	pushInputBox:function(d){
		var s  = this,c = s.textFieldInputContainer;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex)return;
		}
		s.textFieldInputContainer.push(d);
	}
	,removeInputBox:function(d){
		var s  = this,c = s.textFieldInputContainer;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex){
				s.textFieldInputContainer.splice(i,1);
				break;
			}
		}
	}
	,addEvent:function(o,list,f){
		var s = this;
		list.push({container:o,listener:f});
	}
	,removeEvent:function(o,list,f){
		var s = this;
		for(var i=0,l=list.length;i<l;i++){
			if(list[i].container.objectIndex === o.objectIndex && (!f || list[i].listener == f)){
				list.splice(i,1);
				break;
			}
		}
	}
	,addMouseDownEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseDownContainer,f);
	}
	,addMouseUpEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseUpContainer,f);
	}
	,addMouseMoveEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseMoveContainer,f);
	}
	,addMouseOverEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseOverContainer,f);
	}
	,addMouseOutEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseOutContainer,f);
	}
	,addMouseDblEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseDblContainer,f);
	}
	,addMouseEvent:function(o,t,f){
		var s = this;
		if(t == LMouseEvent.MOUSE_DOWN){
			s.addMouseDownEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_UP){
			s.addMouseUpEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OVER){
			s.addMouseOverEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OUT){
			s.addMouseOutEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_MOVE){
			s.addMouseMoveEvent(o,f);
		}else{
			s.addMouseDblEvent(o,f);
		}
	}
	,hasEvent:function(o,list){
		for(var i=0,l=list.length;i<l;i++){
			if(list[i].container.objectIndex === o.objectIndex)return true;
		}
		return false;
	}
	,removeMouseDownEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseDownContainer,f);
	}
	,removeMouseUpEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseUpContainer,f);
	}
	,removeMouseMoveEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseMoveContainer,f);
	}
	,removeMouseOverEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseOverContainer,f);
	}
	,removeMouseOutEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseOutContainer,f);
	}
	,removeMouseDblEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseDblContainer,f);
	}
	,removeMouseEvent:function(o,t,f){
		var s = this;
		if(t == LMouseEvent.MOUSE_DOWN){
			s.removeMouseDownEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_UP){
			s.removeMouseUpEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OVER){
			s.removeMouseOverEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OUT){
			s.removeMouseOutEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_MOVE){
			s.removeMouseMoveEvent(o,f);
		}else{
			s.removeMouseDblEvent(o,f);
		}
	}
	,dispatchMouseEvent:function(event,type){
		var s = this;
		if(type == LMouseEvent.MOUSE_DOWN){
			s.dispatchEvent(event,s.mouseDownContainer,LMouseEvent.MOUSE_DOWN);
			s.dispatchEvent(event,s.textFieldInputContainer);
		}else if(type == LMouseEvent.MOUSE_UP){
			s.dispatchEvent(event,s.mouseUpContainer,LMouseEvent.MOUSE_UP);
		}else if(type == LMouseEvent.DOUBLE_CLICK){
			s.dispatchEvent(event,s.mouseDblContainer,LMouseEvent.DOUBLE_CLICK);
		}else{
			s.dispatchEvent(event,s.mouseOutContainer,LMouseEvent.MOUSE_OUT);
			s.dispatchEvent(event,s.mouseOverContainer,LMouseEvent.MOUSE_OVER);
			s.dispatchEvent(event,s.mouseMoveContainer,LMouseEvent.MOUSE_MOVE);
		}
	}
    ,getRootParams:function(s){
		var p = s.parent,r = {x:0,y:0,scaleX:1,scaleY:1};
		while(p != "root"){
			r.x *= p.scaleX;
			r.y *= p.scaleY;
			r.x += p.x;
			r.y += p.y;
			r.scaleX *= p.scaleX;
			r.scaleY *= p.scaleY;
			p = p.parent;
		}
		return r;
    }
    ,_mouseEnabled:function(sp){
    	var self = this;
    	if(!sp || !sp.parent || sp.parent == "root"){
    		return false;
    	}
    	if(!sp.visible || (typeof sp.mouseEnabled != UNDEFINED && !sp.mouseEnabled)){
    		return false;
    	}
    	var p = sp.parent;
		while(p != "root"){
			if(!p.mouseEnabled || !p.mouseChildren)return false;
			p = p.parent;
			if(!p)return false;
		}
		return true;
    }
	,dispatchEvent:function(event,list,type){
		var self = this,sp,co,st=[],o,i,l;
		for(i=0,l=list.length;i<l;i++){
			sp = list[i].container || list[i];
			if(!self._mouseEnabled(sp))continue;
            co = self.getRootParams(sp);
            if(!type && sp.mouseEvent){
				sp.mouseEvent(event,LMouseEvent.MOUSE_DOWN,co);
            	continue;
            }
            if(sp.ismouseon(event,co)){
            	if(type == LMouseEvent.MOUSE_OUT){
            		continue;
            	}
            	if(type==LMouseEvent.MOUSE_OVER){
            		if(sp.ll_mousein){
            			continue;
            		}
            	}
            	if(type != LMouseEvent.MOUSE_UP){
            		sp.ll_mousein = true;
            	}
            	st.push({sp:sp,co:co,listener:list[i].listener});
            }else{
            	if(type != LMouseEvent.MOUSE_OUT && type != LMouseEvent.MOUSE_OVER){
            		continue;
            	}
            	if(!sp.ll_mousein){
            		continue;
            	}
            	sp.ll_mousein = false;
            	st.push({sp:sp,co:co,listener:list[i].listener});
            }
		}
		if(st.length == 0)return;
		if(st.length > 1){
			st = st.sort(self._sort);
		}
		l = self.dispatchAllEvent?st.length:1;
		for(i=0;i<l&&i<st.length;i++){
			o = st[i];
			event.currentTarget = event.clickTarget = o.sp;
			if (!event.target) {
				event.target = o.sp;
			}
			event.event_type = type;
			event.selfX = (event.offsetX - o.co.x - o.sp.x)/(o.co.scaleX*o.sp.scaleX);
			event.selfY = (event.offsetY - o.co.y - o.sp.y)/(o.co.scaleY*o.sp.scaleY);
			o.listener(event);
			if(l==1 && i<st.length-1 && o.sp.objectIndex == st[i+1].sp.objectIndex){
				st.splice(i,1);
				i--;
			}
		}
	}
	,set:function(t,v){
		LGlobal.mouseEventContainer[t] = v;
	}
	,_sort:function(a,b){
		var s = LMouseEventContainer,o1,o2,p;
		var al=s._getSort(a.sp),bl=s._getSort(b.sp);
		for(var i=0,l1=al.length,l2=bl.length;i<l1 && i<l2;i++){
			o1 = al[i],o2 = bl[i];
			if(o1.objectIndex == o2.objectIndex){
				p = o1;
				continue;
			}
			return o1.parent.getChildIndex(o1) < o2.parent.getChildIndex(o2);
		}
		return al.length < bl.length;
	}
	,_getSort:function(layer){
		var p = layer.parent,list=[layer];
		while(p != "root"){
	        list.unshift(p);
			p = p.parent;
		}
		return list;
	}
};
var LMouseEventContainer = new $LMouseEventContainer();
