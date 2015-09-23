function TranslucentLoading(data){
	base(this,LSprite,[]);
	var s = this;
	var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = LGlobal.width / backgroundData.width;
	background.scaleY = LGlobal.height / backgroundData.height;
	s.addChild(background);
	var loadingData = new LBitmapData(LMvc.datalist["common-loading"]);
	var anime = new LAnimationTimeline(loadingData,LGlobal.divideCoordinate(loadingData.width,loadingData.height,1,loadingData.width/loadingData.height >>> 0));
	anime.x = (LGlobal.width - loadingData.height)*0.5;
	anime.y = (LGlobal.height - loadingData.height)*0.5;
	s.addChild(anime);
}
TranslucentLoading.prototype.setProgress = function (value){};