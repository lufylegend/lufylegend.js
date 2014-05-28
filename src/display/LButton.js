/*
* LButton.js
**/
function LButton(d_up,d_over){
	base(this,LSprite,[]);
	var s = this;
	s.type = "LButton";
	s.bitmap_up = d_up;
	s.addChild(d_up);
	if(d_over == null){
		d_over = d_up;
	}else{
		s.addChild(d_over);
	}
	s.bitmap_over = d_over;
	s.bitmap_over.visible = false;
	s.bitmap_up.visible = true;
	LGlobal.buttonList.push(s);
}
LButton.prototype.clone = function (){
	var s = this,d_up = s.bitmap_up.clone(),d_over = s.bitmap_over.clone(),
	a = new LButton(d_up,d_over);
	return a;
};
//改用内部事件类型
LButton.prototype.buttonModeChange = function (){
	var s = this;
	var cood={x:0,y:0,scaleX:1,scaleY:1};
	var parent = s.parent;
	while(parent && parent != "root"){
		cood.scaleX *= parent.scaleX;
		cood.scaleY *= parent.scaleY;
		cood.x *= parent.scaleX;
		cood.y *= parent.scaleY;
		cood.x += parent.x;
		cood.y += parent.y;
		parent = parent.parent;
	}
	if(s.buttonMode && s.ismouseon(LGlobal.buttonStatusEvent,cood)){
		s.bitmap_up.visible = false;
		s.bitmap_over.visible = true;
	}else{
		s.bitmap_over.visible = false;
		s.bitmap_up.visible = true;
	}
};
LButton.prototype.die = function (){
	var s = this;
	s.graphics.clear();
	s.removeAllEventListener();
	if(s.box2dBody)s.clearBody();
	for(var i=0,c=s.childList,l=c.length;i<l;i++){
		if(c[i].die)c[i].die();
	}
	for(var i=0,b=LGlobal.buttonList,l=b.length;i<l;i++){
		if(b[i].objectIndex == s.objectIndex){
			LGlobal.buttonList.splice(i,1);
			break;
		}
	}
};