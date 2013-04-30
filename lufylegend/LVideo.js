/*
 * LVideo.js 
 **/
function LVideo(u){
	var s = this;
	base(s,LMedia,[]);
	s.type = "LVideo";
	s._type="video";
	s.x=s.y=0;
	s.visible=true;
	s.alpha=1;
	s.scaleX=s.scaleY=1;
	s.data = document.createElement("video");
	s.data.style.display = "none";
	document.body.appendChild(s.data);
	s.data.id="video_"+s.objectindex;
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
p = {
	show:function (cood){
		var s=this,c=LGlobal.canvas;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		if(!s.visible)return;
		s.save = false;
		if(s.alpha*cood.alpha < 1){
			c.save();
			s.save = true;
			c.globalAlpha = s.alpha*cood.alpha;
		}
		if(s.rotate != 0){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x, cood.y + s.y);
			c.rotate(s.rotate);
			c.translate(-(cood.x + s.x), -(cood.y + s.y));
		}
		if(s.scaleX*cood.scaleX != 1 || s.scaleY*cood.scaleY != 1){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x + s.data.videoWidth*0.5, cood.y + s.y + s.data.videoHeight*0.5);
			c.scale(s.scaleX*cood.scaleX,s.scaleY*cood.scaleY);
			c.translate(-(cood.x + s.x + s.data.videoWidth*0.5), -(cood.y + s.y + s.data.videoHeight*0.5));
		}
		if(s.mask != null && s.mask.show){
			s.mask.show(cood);
			c.clip();
		}
		c.drawImage(s.data,s.x+cood.x,s.y+cood.y);
		if(s.save){
			c.restore();
		}
	},
	die:function(){
		var s=this;
		document.body.removeChild(s.data);
		delete s.data;
	}
};
for(var k in p)LVideo.prototype[k]=p[k];