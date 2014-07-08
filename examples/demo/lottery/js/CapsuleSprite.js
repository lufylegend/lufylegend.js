function CapsuleSprite(bitmap){
	base(this,LSprite,[]);
	var self = this;
	self.type = "CapsuleSprite";
	self.mode = "";
	self.dong = 0;
	self.sx = 0;
	self.sy = 0;
	self.rotateType = Math.random()>0.5?1:-1;
	self.bitmap = bitmap;
	self.addChild(bitmap);
}

CapsuleSprite.prototype.onframe = function (){
	var self = this;
	self.x = self.sx;
	self.y = self.sy;
	if(self.mode == "dong"){
		self.dong = parseInt(Math.random()*4);
		self.bitmap.rotate += 5*self.rotateType;
		
		if(self.dong == 0){
			self.x -= 5;
			self.y -= 5;
		}else if(self.dong == 1){
			self.x -= 5;
			self.y += 5;
		}else if(self.dong == 2){
			self.x += 5;
			self.y += 5;
		}else if(self.dong == 3){
			self.x += 5;
			self.y -= 5;
		}
	}else if(self.mode == "move"){
		self.dong = parseInt(Math.random()*4);
		if(self.dong == 0){
			self.x -= 5;
			self.y -= 5;
		}else if(self.dong == 1){
			self.x -= 5;
			self.y += 5;
		}else if(self.dong == 2){
			self.x += 5;
			self.y += 5;
		}else if(self.dong == 3){
			self.x += 5;
			self.y -= 5;
		}
	}
	/*
	self.animeIndex++;
	if(self.animeIndex >= self.imageArray[0].length){
		self.animeIndex = 0;
	}
	var markx = 0,marky = 0;
	var l = 3;
	if(self.x > self.toCoordinate.x){
		self.x -= l;
		markx = -1;
	}else if(self.x < self.toCoordinate.x){
		self.x += l;
		markx = 1;
	}
	if(self.y > self.toCoordinate.y){
		self.y -= l;
		marky = -1;
	}else if(self.y < self.toCoordinate.y){
		self.y += l;
		marky = 1;
	}
	if(markx !=0 || marky != 0){
		var mark = markx+","+marky;
		self.dirindex = self.dirmark[mark];
	}else if(!self.ishero){
		if(self.index > 0){
			self.index -= 1;
		}else{
			self.index = parseInt(Math.random()*300);
			self.toCoordinate.x = parseInt(Math.random()*800/3)*3;
			self.toCoordinate.y = parseInt(Math.random()*480/3)*3;
		}
	}
	self.bitmap.bitmapData.setCoordinate(self.imageArray[self.dirindex][self.animeIndex].x,self.imageArray[self.dirindex][self.animeIndex].y);
	*/
}