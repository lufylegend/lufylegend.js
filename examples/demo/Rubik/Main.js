init(50,"mylegend",400,400,main);
var a = 0,b=0,backLayer,step = 20,key = null;
function main(){
	backLayer = new LSprite();
	addChild(backLayer);
	backLayer.x = 120,backLayer.y = 120;
	//后
	for(var x=0;x<3;x++){
		for(var y=0;y<3;y++){
			z = 0;
			var rect = new Rect([-3*step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-step + y*2*step,-3*step + z*2*step],[-3*step + x*2*step,-step + y*2*step,-3*step + z*2*step],0,0,"#FF4500");
			backLayer.addChild(rect);
		}
	}
	//前
	for(var x=0;x<3;x++){
		for(var y=0;y<3;y++){
			z = 3;
			var rect = new Rect([-3*step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-step + y*2*step,-3*step + z*2*step],[-3*step + x*2*step,-step + y*2*step,-3*step + z*2*step],0,0,"#FF0000");
			backLayer.addChild(rect);
		}
	}
	//上
	for(var x=0;x<3;x++){
		for(var z=0;z<3;z++){
			y = 0;
			var rect = new Rect([-3*step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-3*step + y*2*step,-step + z*2*step],[-3*step + x*2*step,-3*step + y*2*step,-step + z*2*step],0,0,"#FFFFFF");
			backLayer.addChild(rect);
		}
	}
	//下
	for(var x=0;x<3;x++){
		for(var z=0;z<3;z++){
			y = 3;
			var rect = new Rect([-3*step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-step + x*2*step,-3*step + y*2*step,-step + z*2*step],[-3*step + x*2*step,-3*step + y*2*step,-step + z*2*step],0,0,"#FFFF00");
			backLayer.addChild(rect);
		}
	}
	//左
	for(var y=0;y<3;y++){
		for(var z=0;z<3;z++){
			x = 0;
			var rect = new Rect([-3*step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-3*step + x*2*step,-3*step + y*2*step,-step + z*2*step],[-3*step + x*2*step,-step + y*2*step,-step + z*2*step],[-3*step + x*2*step,-step + y*2*step,-3*step + z*2*step],0,0,"#008000");
			backLayer.addChild(rect);
		}
	}
	//右
	for(var y=0;y<3;y++){
		for(var z=0;z<3;z++){
			x = 3;
			var rect = new Rect([-3*step + x*2*step,-3*step + y*2*step,-3*step + z*2*step],[-3*step + x*2*step,-3*step + y*2*step,-step + z*2*step],[-3*step + x*2*step,-step + y*2*step,-step + z*2*step],[-3*step + x*2*step,-step + y*2*step,-3*step + z*2*step],0,0,"#0000FF");
			backLayer.addChild(rect);
		}
	}
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
}
function onframe(){
	a += 0.1 , b += 0.1;
	backLayer.childList = backLayer.childList.sort(function(a,b){return a.z - b.z;});
	for(var i=0;i<backLayer.childList.length;i++){
		backLayer.childList[i].setAngle(a,b);
		backLayer.childList[i].draw(backLayer);
   }
}