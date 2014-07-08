
function onDown(e){
	if(mouse_down_obj.isMouseDown)return;
	continuous = 0;
	mouse_down_obj.x = e.offsetX;
	mouse_down_obj.y = e.offsetY;
	mouse_down_obj.time = new Date().getTime();
	mouse_down_obj.cx = e.offsetX/60 >>> 0;
	mouse_down_obj.cy = (e.offsetY - 120)/60 >>> 0;
	if(mouse_down_obj.cy >= list.length || mouse_down_obj.cx >= list[0].length)return;
	mouse_down_obj.isMouseDown = true;
	list[mouse_down_obj.cy][mouse_down_obj.cx].graphics.drawRect(1,"black",[0, 0, 60, 60],true,"#000000");
}
function onUp(e){
	if(!mouse_down_obj.isMouseDown)return;
	list[mouse_down_obj.cy][mouse_down_obj.cx].graphics.clear();
	if(new Date().getTime() - mouse_down_obj.time > 500){
		mouse_down_obj.isMouseDown = false;
		return;
	}
	var mx = e.offsetX - mouse_down_obj.x;
	var my = e.offsetY - mouse_down_obj.y;
	if(Math.abs(mx) > Math.abs(my)){
		if(mx > 50){
			move("right");
			return;
		}else if(mx < -50){
			move("left");
			return;
		}
	}else{
		if(my > 50){
			move("down");	
			return;
		}else if(my < -50){
			move("up");
			return;
		}
	}
	mouse_down_obj.isMouseDown = false;
}
function move(dir){
	direction = dir;
	var m = moveGem(dir,8);
	var mx = m[0],my = m[1];
	var obj,fun;
	for(var i=0;i<8;i++){
		if(mx == 0){
			obj = list[i][mouse_down_obj.cx];
		}else{
			obj = list[mouse_down_obj.cy][i];
		}
		if(i < 7){
			fun = null;
		}else{
			fun = function(){
				hiddenObj.visible = true;
				checkClear();
			};
		}
		LTweenLite.to(obj,0.3,
		{ 
			x:obj.x+mx,
			y:obj.y+my,
			onComplete:fun,
			ease:Strong.easeOut
		});
	
	}
}