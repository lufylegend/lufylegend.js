function checkClear(){
	var i,j,checkList,gem;
	clearList = [];
	//横向检索
	for(i=0;i<8;i++){
		checkList = [list[i][0]];
		for(j=1;j<8;j++){
			if(checkList[checkList.length - 1].num == list[i][j].num){
				checkList.push(list[i][j]);
			}else{
				clearList = addClearList(clearList,checkList);
				checkList = [list[i][j]];
			}
		}
		clearList = addClearList(clearList,checkList);
	}
	//纵向检索
	for(i=0;i<8;i++){
		checkList = [list[0][i]];
		for(j=1;j<8;j++){
			if(checkList[checkList.length - 1].num == list[j][i].num){
				checkList.push(list[j][i]);
			}else{
				clearList = addClearList(clearList,checkList);
				checkList = [list[j][i]];
			}
		}
		clearList = addClearList(clearList,checkList);
	}
	if(typeof direction == UNDEFINED || direction == ""){
		return clearList;
	}
	if(clearList.length == 0){
		mouse_down_obj.isMouseDown = false;
		return;
	}
	preMove = {};
	for(i=0;i<clearList.length;i++){
		gem = clearList[i];
		addBullet(gem,i==clearList.length-1);
	}
	
	var plot = 1 + 0.5 * continuous;
	continuous++;
	var get = clearList.length*10;
	if(clearList.length >= 4){
		get += 10;
	}
	if(clearList.length >= 6){
		get += 20;
	}
	if(clearList.length >= 8){
		get += 30;
	}
	get = get*plot >>> 0;
	var getpoint = new GetPoint(get,200,300);
	getLayer.addChild(getpoint);
	point.setPoint(point.num + get);
	bulletLayer.addEventListener(LEvent.ENTER_FRAME,onBullet);
}
function addClearList(clearList,checkList){
	if(checkList.length >= 3){
		clearList = clearList.concat(checkList)
	}
	return clearList;
}

function setMovePre(gem){
	var cx,cy,index;
	gem.alpha = 0.5;
	gem.visible = false;
	var num = (Math.random()*9 >>> 0)+1;
	gem.change(num);
	cx = gem.x/60 >>> 0; 
	cy = (gem.y - 120)/60 >>> 0; 
	switch(direction){
		case "left":
			index = cy;
			if(typeof preMove[index] == UNDEFINED)preMove[index] = 420;
			preMove[index] += 60;
			gem.x = preMove[index];
			break;
		case "right":
			index = cy;
			if(typeof preMove[index] == UNDEFINED)preMove[index] = 0;
			preMove[index] -= 60;
			gem.x = preMove[index];
			break;
		case "up":
			index = cx;
			if(typeof preMove[index] == UNDEFINED)preMove[index] = 560;
			preMove[index] += 60;
			gem.y = preMove[index];
			break;
		case "down":
			index = cx;
			if(typeof preMove[index] == UNDEFINED)preMove[index] = 120;
			preMove[index] -= 60;
			gem.y = preMove[index];
			break;
	}
}
function addBullet(gem,flag){
	var bullet = new Bullet(gem.x,gem.y,flag);
	bulletLayer.addChild(bullet);
	setMovePre(gem);
}
function onBullet(){
	var key,bullet;
	for(var i=0;i<bulletLayer.childList.length;i++){
		bullet = bulletLayer.childList[i];
		bullet.onframe();
	}
}
function moveList(){
	var gem,time,maxTime,mx,my,fun;
	maxTime = 0;
	switch(direction){
		case "left":
			for(i=0;i<8;i++){
				for(j=0;j<8;j++){
					gem = list[i][j];
					mx = 60*j;
					if(gem.x > mx){
						time = 0.3*((gem.x-mx) / 60 >>> 0);
						if(maxTime < time)maxTime = time;
						fun = null;
						if(gem.x > 420){
							fun = function(gem){
								if(gem.x <= 420)gem.visible = true;
							}
						}
						LTweenLite.to(gem,time,
						{ 
							x:mx,
							onUpdate:fun,
							onComplete:fun,
							ease:Strong.easeOut
						});
					}
				}
			}
			break;
		case "right":
			for(i=0;i<8;i++){
				for(j=0;j<8;j++){
					gem = list[i][j];
					mx = 60*j;
					if(gem.x < mx){
						time = 0.3*((mx-gem.x) / 60 >>> 0);
						if(maxTime < time)maxTime = time;
						fun = null;
						if(gem.x < 0){
							fun = function(gem){
								if(gem.x >= 0)gem.visible = true;
							}
						}
						LTweenLite.to(gem,time,
						{ 
							x:mx,
							onUpdate:fun,
							onComplete:fun,
							ease:Strong.easeOut
						});
					}
				}
			}
			break;
		case "up":
			for(i=0;i<8;i++){
				for(j=0;j<8;j++){
					gem = list[j][i];
					my = 120+60*j;
					if(gem.y > my){
						time = 0.3*((gem.y-my) / 60 >>> 0);
						if(maxTime < time)maxTime = time;
						fun = null;
						if(gem.y > 560){
							fun = function(gem){
								if(gem.y <= 560)gem.visible = true;
							}
						}
						LTweenLite.to(gem,time,
						{ 
							y:my,
							onUpdate:fun,
							onComplete:fun,
							ease:Strong.easeOut
						});
					}
				}
			}
			break;
		case "down":
			for(i=0;i<8;i++){
				for(j=0;j<8;j++){
					gem = list[j][i];
					my = 120+60*j;
					if(gem.y < my){
						time = 0.3*((my-gem.y) / 60 >>> 0);
						if(maxTime < time)maxTime = time;
						fun = null;
						if(gem.y < 120){
							fun = function(gem){
								if(gem.y >= 120)gem.visible = true;
							}
						}
						LTweenLite.to(gem,time,
						{ 
							y:my,
							onUpdate:fun,
							onComplete:fun,
							ease:Strong.easeOut
						});
					}
				}
			}
			break;
	}
	LTweenLite.to({},maxTime*1.5,
	{ 
		onComplete:checkStageClear,
		ease:Strong.easeOut
	});
}
function checkStageClear(){
	var isclear = true;
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			if(list[i][j].alpha == 1){
				isclear = false;
				break;
			}
		}
		if(!isclear)break;
	}
	if(isclear){
		direction = "";
		clock.timer = 0;
		clock.addTimer += 0.05;
		addGem();
		var bullet = new Bullet(240,360);
		bulletLayer.addChild(bullet);
		LTweenLite.to(bullet,2,
		{ 
			scaleX:60,
			scaleY:60,
			alpha:0.1,
			onUpdate:function(bullet){
				bullet.x = (LGlobal.width - bullet.getWidth()*bullet.scaleX) * 0.5;
				bullet.y = bullet.x + 120;
			},
			onComplete:function(bullet){
				bullet.parent.removeChild(bullet);
				mouse_down_obj.isMouseDown = false;
			},
			ease:Strong.easeOut
		});
		
		return;
	}
	mouse_down_obj.isMouseDown = false;
	checkClear();
}
function sortList(){
	var gem;
	switch(direction){
		case "left":
		case "right":
			for(i=0;i<8;i++){
				for(j=0;j<7;j++){
					for(k=j+1;k<8;k++){
						if(list[i][j].x > list[i][k].x){
							gem = list[i][j];
							list[i][j] = list[i][k];
							list[i][k] = gem;
						}
					}
				}
			}
			break;
		case "up":
		case "down":
			for(i=0;i<8;i++){
				for(j=0;j<7;j++){
					for(k=j+1;k<8;k++){
						if(list[j][i].y > list[k][i].y){
							gem = list[j][i];
							list[j][i] = list[k][i];
							list[k][i] = gem;
						}
					}
				}
			}
			break;
	}
}
function clearBullet(){
	bulletLayer.removeAllChild();
	bulletLayer.die();
	sortList();
	moveList();
}
function moveGem(dir,index){
	var mx=0,my=0;
	if(dir=="right"){
		mx = 60;
		hiddenObj = list[mouse_down_obj.cy][index-1];
		for(var i=index-1;i>=0;i--){
			if(i>0)list[mouse_down_obj.cy][i] = list[mouse_down_obj.cy][i-1];
		}
		hiddenObj.x=list[mouse_down_obj.cy][0].x-60;
		list[mouse_down_obj.cy][0] = hiddenObj;
	}else if(dir=="left"){
		mx = -60;
		hiddenObj = list[mouse_down_obj.cy][0];
		for(var i=8-index;i<8;i++){
			if(i<7)list[mouse_down_obj.cy][i] = list[mouse_down_obj.cy][i+1];
		}
		hiddenObj.x = list[mouse_down_obj.cy][7].x + 60;
		list[mouse_down_obj.cy][7] = hiddenObj;
	}else if(dir=="down"){
		my = 60;
		hiddenObj = list[index-1][mouse_down_obj.cx];
		for(var i=index-1;i>=0;i--){
			if(i>0)list[i][mouse_down_obj.cx] = list[i-1][mouse_down_obj.cx];
		}
		hiddenObj.y = list[0][mouse_down_obj.cx].y - 60;
		list[0][mouse_down_obj.cx] = hiddenObj;
	}else if(dir=="up"){
		my = -60;
		hiddenObj = list[8-index][mouse_down_obj.cx];
		for(var i=8-index;i<8;i++){
			if(i<7)list[i][mouse_down_obj.cx] = list[i+1][mouse_down_obj.cx];
		}
		hiddenObj.y = list[7][mouse_down_obj.cx].y + 60;
		list[7][mouse_down_obj.cx] = hiddenObj;
	}
	//hiddenObj.visible = false;
	return [mx,my];
}
