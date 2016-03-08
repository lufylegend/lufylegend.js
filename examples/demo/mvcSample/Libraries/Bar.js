function Bar(w,h){
	var self = this;
	base(self,LSprite,[]);
	var barWidth = 500,barHeight = 380;
	var img;
	if(w > barWidth + 30){
		for(var i=15;i<15 + (w-barWidth -30)*0.5 + 1;i+=100){
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-up'],0,0,100,15));
			img.x = i;
			self.addChild(img);
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-down'],0,0,100,15));
			img.x = i;
			img.y = h - 15;
			self.addChild(img);
		}
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-up'],0,0,barWidth,15));
		img.x = (w-barWidth)*0.5;
		self.addChild(img);
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-down'],0,0,barWidth,15));
		img.x = (w-barWidth)*0.5;
		img.y = h - 15;
		self.addChild(img);
		for(var i=w-15;i>(w+barWidth+30)*0.5 - 15;i-=100){
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-up'],400,0,100,15));
			img.x = i - 100;
			self.addChild(img);
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-down'],400,0,100,15));
			img.x = i - 100;
			img.y = h - 15;
			self.addChild(img);
		}
	}else{
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-up'],(barWidth + 30 - w)*0.5,0,w-30,15));
		img.x = 15;
		self.addChild(img);
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-down'],(barWidth + 30 - w)*0.5,0,w-30,15));
		img.y = h - 15;
		img.x = 15;
		self.addChild(img);
	}
	
	if(h > barHeight + 30){
		for(var i=15;i<(h-barHeight - 30)*0.5 + 1;i+=50){
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-left'],0,0,15,50));
			img.y = i;
			self.addChild(img);
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-right'],0,0,15,50));
			img.y = i;
			img.x = w - 15;
			self.addChild(img);
		}
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-left'],0,0,15,barHeight));
		img.y = (h-barHeight)*0.5;
		self.addChild(img);
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-right'],0,0,15,barHeight));
		img.y = (h-barHeight)*0.5;
		img.x = w - 15;
		self.addChild(img);
		for(var i=h-15;i>(h+barHeight+30)*0.5;i-=50){
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-left'],0,330,15,50));
			img.y = i - 50;
			self.addChild(img);
			img = new LBitmap(new LBitmapData(LMvc.datalist['bar-right'],0,330,15,50));
			img.y = i - 50;
			img.x = w - 15;
			self.addChild(img);
		}
	}else{
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-left'],0,(410 - h)*0.5,15,h-30));
		img.y = 15;
		self.addChild(img);
		img = new LBitmap(new LBitmapData(LMvc.datalist['bar-right'],0,(410 - h)*0.5,15,h-30));
		img.x = w - 15;
		img.y = 15;
		self.addChild(img);
	}
	img = new LBitmap(new LBitmapData(LMvc.datalist['bar-left-up'],0,0,15,15));
	self.addChild(img);
	img = new LBitmap(new LBitmapData(LMvc.datalist['bar-right-up'],0,0,15,15));
	img.x = w - 15;
	self.addChild(img);
	img = new LBitmap(new LBitmapData(LMvc.datalist['bar-left-down'],0,0,15,15));
	img.y = h - 15;
	self.addChild(img);
	img = new LBitmap(new LBitmapData(LMvc.datalist['bar-right-down'],0,0,15,15));
	img.x = w - 15;
	img.y = h - 15;
	self.addChild(img);
};
