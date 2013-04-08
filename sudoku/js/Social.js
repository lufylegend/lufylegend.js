function Social(){
	base(this,LSprite,[]);
	var self = this;
	var sina_btn = new LSprite();
	sina_btn.graphics.drawRect(1,"#006400",[0,0,50,50],true,"#ffffff");
	var sina_icon = new LBitmap(new LBitmapData(imglist["ico_sina"]));
	sina_icon.x = sina_icon.y = 17;
	sina_btn.addChild(sina_icon);
	self.addChild(sina_btn);
	sina_btn.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		share("xlwb");
	});
	
	var qq_btn = new LSprite();
	qq_btn.graphics.drawRect(1,"#006400",[0,0,50,50],true,"#ffffff");
	var qq_icon = new LBitmap(new LBitmapData(imglist["ico_qq"]));
	qq_icon.x = qq_icon.y = 17;
	qq_btn.addChild(qq_icon);
	qq_btn.x = 100;
	self.addChild(qq_btn);
	qq_btn.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		share("txwb");
	});
	
	var facebook_btn = new LSprite();
	facebook_btn.graphics.drawRect(1,"#006400",[0,0,50,50],true,"#ffffff");
	var facebook_icon = new LBitmap(new LBitmapData(imglist["ico_facebook"]));
	facebook_icon.x = facebook_icon.y = 17;
	facebook_btn.addChild(facebook_icon);
	facebook_btn.x = 200;
	self.addChild(facebook_btn);
	facebook_btn.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		share("facebook");
	});
	
	var twitter_btn = new LSprite();
	twitter_btn.graphics.drawRect(1,"#006400",[0,0,50,50],true,"#ffffff");
	var twitter_icon = new LBitmap(new LBitmapData(imglist["ico_twitter"]));
	twitter_icon.x = twitter_icon.y = 17;
	twitter_btn.addChild(twitter_icon);
	twitter_btn.x = 300;
	self.addChild(twitter_btn);
	twitter_btn.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		share("twitter");
	});
};