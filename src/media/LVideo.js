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
	s.rotatex = 0;
	s.rotatey = 0;
	s.rotate = 0;
	s.data = document.createElement("video");
	s.data.style.display = "none";
	document.body.appendChild(s.data);
	s.data.id="video_"+s.objectIndex;
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
p = {
	show:function (){
		var s=this,c=LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		//scale
		s._transformScale();
		//rotate
		s._transformRotate();
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}
		c.drawImage(s.data,s.x,s.y);
		c.restore();
	},
	die:function(){
		var s=this;
		document.body.removeChild(s.data);
		delete s.data;
	},
	getWidth:function(){
		return this.data.width;
	},
	getHeight:function(){
		return this.data.height;
	},
	toString:function(){
		return "[LVideo]";
	}
};
for(var k in p)LVideo.prototype[k]=p[k];