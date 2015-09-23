function Talk(){
	if(arguments.length == 6){
		TalkRun.apply(this,arguments);
	}else if(arguments.length == 4){
		TalkRun.call(this,LMvc.layer,385,arguments[0],arguments[1],arguments[2],arguments[3]);
	}else{
		TalkRun.call(this,arguments[0],385,arguments[1],arguments[2],arguments[3],arguments[4]);
	}
}
function TalkRun(layer,y,chara,index,msg,callback){
	if(LGlobal.talkLayer && LGlobal.talkLayer.parent){
		LGlobal.talkLayer.parent.removeChild(LGlobal.talkLayer);
	}
	var talkLayer = new LSprite();
	talkLayer.y = y;
	var charaLayer = new Character(chara,index);
	charaLayer.x = 200;
	talkLayer.addChild(charaLayer);
	
	var back = new LBitmap(new LBitmapData(LMvc.datalist["talkbox"]));
	//var back = new LSprite();
	//back.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,102],true,"#000000");
	back.y = 200;
	back.alpha = 0.7;
	talkLayer.addChild(back);
	//var bar = new Bar2(LGlobal.width,102);
	//bar.y = 200;
	///talkLayer.addChild(bar);
	
	var msgText = new LTextField();
	msgText.x = 20;
	msgText.y = 225;
	msgText.text = msg;
	msgText.size = 16;
	msgText.color = "#FFFFFF";
	msgText.width = LGlobal.width - 50;
	msgText.setWordWrap(true,35);
	msgText.wind(callback);
	talkLayer.addChild(msgText);
	layer.addChild(talkLayer);
	LGlobal.talkLayer = talkLayer;
}