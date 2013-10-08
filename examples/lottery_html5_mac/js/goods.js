var goodsView;
function goodsShow(){
	goodsView = new LSprite();

	var goods_view = new LBitmap(new LBitmapData(imglist["goods_view"]));
	goods_view.x = 20;
	goods_view.y = 50;
	goodsView.addChild(goods_view);
	backLayer.addChild(goodsView);

	playButton = new LButton(new LBitmap(new LBitmapData(imglist["toTop_up"])),new LBitmap(new LBitmapData(imglist["toTop_over"])));
	playButton.x = 350;
	playButton.y = 390;
	goodsView.addChild(playButton);
	playButton.addEventListener(LMouseEvent.MOUSE_DOWN, function(){backLayer.removeChild(goodsView);});
}