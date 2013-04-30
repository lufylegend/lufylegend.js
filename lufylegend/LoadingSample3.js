function LoadingSample3(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	
	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.screenWidth = LGlobal.width*0.75;
	s.screenHeight = height==null?LGlobal.height*0.1:height;
	if(s.screenHeight > 5)s.screenHeight=5;
	s.screenX = (LGlobal.width - s.screenWidth)/2;
	s.screenY = (LGlobal.height - s.screenHeight)/2;
	s.back = new LSprite();
	s.addChild(s.back);
	s.label = new LTextField();
	s.label.color="#ffffff";
	s.label.weight="bolder";
	s.label.size = s.screenHeight * 2;
	s.label.x = s.screenX + (s.screenWidth - s.label.getWidth())*0.5;
	s.label.y = s.screenY - s.screenHeight * 4;
	s.addChild(s.label);
	s.star = new Array();
	LGlobal.LoadingSample3 = s;
	s.interval = setInterval(s.onframe,LGlobal.speed<50?50:LGlobal.speed);
	s.setProgress(s.progress);
}
LoadingSample3.prototype.onframe = function(){
	var s = LGlobal.LoadingSample3;
	var i,star;
	if(s.progress>=100){
		if(s.star.length > 0){
			for(i=0;i<s.star.length;i++){
				s.removeChild(s.star[i]);
			}
			s.star.splice(0,s.star.length);
		}
		return;
	}
	for(i=0;i<s.star.length;i++){
		star = s.star[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			s.star.splice(i,1);
			s.removeChild(star);
			i--;
		}
	}
	if(s.star.length < 10)s.addStar();
};
LoadingSample3.prototype.die = function (){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	clearInterval(s.interval);
	LGlobal.LoadingSample3=null;
};
LoadingSample3.prototype.addStar = function(){
	var s = this,c = LGlobal.canvas;
	var star = new LSprite();
	var step = 1 + Math.floor(Math.random()*4);
	star.graphics.add(function (coodx,coody){
		c.beginPath();
		c.fillStyle = "#ffffff";
		c.lineTo(coodx + step*2,coody + step);
		c.lineTo(coodx + step*4,coody);
		c.lineTo(coodx + step*3,coody + step*2);
		c.lineTo(coodx + step*4,coody + step*4);
		c.lineTo(coodx + step*2,coody + step*3);
		c.lineTo(coodx,coody + step*4);
		c.lineTo(coodx + step,coody + step*2);
		c.lineTo(coodx,coody);
		c.fill();
	});
	star.x = s.screenX + s.screenWidth*s.progress*0.01;
	star.y=s.screenY;
	star.speedx = 4 - 8*Math.random();
	star.speedy = 4 - 8*Math.random();
	s.star.push(star);
	s.addChild(star);
};
LoadingSample3.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	if(value > 100)value=100;
	s.progress = value;
	s.back.graphics.clear();
	s.back.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#00FFFF";
		c.rect(s.screenX - 3, s.screenY - 3, s.screenWidth + 6, s.screenHeight + 6);
		c.fill();
		c.beginPath();
		c.fillStyle = "#990033";
		c.rect(s.screenX, s.screenY, s.screenWidth, s.screenHeight);
		c.fill();
		c.beginPath();
		c.fillStyle = s.color;
		c.rect(s.screenX, s.screenY, s.screenWidth*value*0.01, s.screenHeight);
		c.fill();
	});
	s.label.text = value + "%";
};