/*
* LTextField.js
**/
function LTextField(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LTextField";
	s.texttype = null;
	s.x = 0;
	s.y = 0;
	s.text = "";
	s.font = "utf-8";
	s.size = "11";
	s.color = "#000000";
	s.weight = "normal";
	s.textAlign = "left";
	s.textBaseline = "top";
	s.lineWidth = 1;
	s.width = 150;
	s.height = s.size;
	s.stroke = false;
	s.visible=true;
	s.scaleX=1;
	s.scaleY=1;
	s.alpha=1;
	s.rotate=0;
	s.displayAsPassword = false;
	s.wordWrap=false;
}
p = {
	show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		c.font = s.weight + " " + s.size+"pt "+s.font;  
		c.textAlign = s.textAlign;
		c.textBaseline = s.textBaseline;
		c.lineWidth = s.lineWidth;  
		if(s.filters){
			s.setShadow();
		}
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}
		//scale
		s._transformScale();
		//rotate
		s._transformRotate();
		if(s.x != 0 || s.y != 0)c.transform(1,0,0,1,s.x,s.y);
		if(s.texttype == LTextFieldType.INPUT){
			if(s.x != 0 || s.y != 0){
				s.inputBackLayer.show();
			}
			var rc = s.getRootCoordinate();
		    if(LGlobal.inputBox.name == "input"+s.objectIndex){
		    	LGlobal.inputBox.style.marginTop = (rc.y) + "px";
		    	LGlobal.inputBox.style.marginLeft = (rc.x) + "px";
		    }
		}
		var lbl = s.text;
		if(s.displayAsPassword){
			lbl = '';
			for(var i=0,l=s.text.length;i<l;i++)lbl+='*';
		}
		var d;
		if(s.stroke){
			c.strokeStyle = s.color;
			d = c.strokeText;
		}else{
			c.fillStyle = s.color;
			d = c.fillText;
		}
		if(s.wordWrap){
			var i,l,j=0,k=0,m=0;
			for(i=0,l=s.text.length;i<l;i++){
				j = c.measureText(s.text.substr(k,i-k)).width;
				if(j > s.width){
					j = 0;
					k = i;
					m++;
				}
				d.apply(c,[lbl.substr(i,1),j,m*s.wordHeight,c.measureText(lbl).width]);
			}
			s.height = m*s.wordHeight;
		}else{
			d.apply(c,[lbl,0,0,c.measureText(lbl).width]);
		}
		if(s.wind_flag){
			s.windRun();
		}
		c.restore();
	},
	setWordWrap:function(v,h){
		var s = this;
		if(v){
			if(h>0){
				s.wordHeight = h;
			}else{
				s.wordWrap = false;
				s.wordHeight = s.getHeight();
			}
		}
		s.wordWrap = v;
	},
	setType:function(type,inputBackLayer){
		var s = this;
		if(s.texttype != type && type == LTextFieldType.INPUT){
			if(inputBackLayer==null || inputBackLayer.type != "LSprite"){
				s.inputBackLayer = new LSprite();
				s.inputBackLayer.graphics.drawRect(1,"#000000",[0, -s.getHeight()*0.4, s.width, s.getHeight()*1.5]);
			}else{
				s.inputBackLayer = inputBackLayer;
			}
			s.inputBackLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
				if(s.texttype != LTextFieldType.INPUT)return;
				LGlobal.inputBox.style.display = "";
				LGlobal.inputBox.name = "input"+s.objectIndex;
				LGlobal.inputTextField = s;
				LGlobal.inputTextBoxObj.style.display = NONE;
				LGlobal.passwordBoxObj.style.display = NONE;
				if(s.displayAsPassword){
					LGlobal.inputTextBox = LGlobal.passwordBoxObj;
				}else{
					LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
				}
				LGlobal.inputTextBox.style.display = "";
				LGlobal.inputTextBox.value = s.text;
				LGlobal.inputTextBox.style.height = s.height+"px";
				LGlobal.inputTextBox.style.width = s.width+"px";
			});
		}else{
			s.inputBackLayer = null;
		}
		s.texttype = type;
	},
	ismouseon:function(e,cood){
		var s = this,ox,oy;
		if(e==null || e == UNDEFINED)return false;
		if(!s.visible)return false;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1};
		cood={x:s.x+cood.x,y:s.y+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY};
		if(s.inputBackLayer){
			return s.inputBackLayer.ismouseon(e,cood);
		}
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		if(ox >= s.x + cood.x && ox <= s.x + cood.x + s.getWidth()*s.scaleX*cood.scaleX && 
			oy >= s.y + cood.y && oy <= s.y + cood.y + s.getHeight()*s.scaleY*cood.scaleY){
			return true;
		}else{
			return false;
		}
	},
	clone:function(){
		var s = this,a = new LTextField();
		a.copyProperty(s);
		a.texttype = null;
		if(s.texttype ==  LTextFieldType.INPUT){
			a.setType( LTextFieldType.INPUT);
		}
		return a;
	},
	mouseEvent:function (event,type,cood){
		if(cood==null)cood={x:0,y:0};
		var s = this;
		if(s.inputBackLayer == null)return;
		s.inputBackLayer.mouseEvent(event,type,{x:s.x+cood.x,y:s.y+cood.y});
	},
	getWidth:function(){
		var s = this;
		if(s.wordWrap)return s.width;
		LGlobal.canvas.font = s.size+"pt "+s.font;
		return LGlobal.canvas.measureText(s.text).width;
	},
	getHeight:function(){
		var s = this,c = LGlobal.canvas;
		if(s.wordWrap)return s.height;
		c.font = s.weight + " " + s.size+"pt "+s.font; 
		return c.measureText("O").width*1.2;
	},
	wind:function(listener){
		var s = this;
		s.wind_over_function = listener;
		s.wind_flag = true;
		s.wind_text = s.text;
		s.text = "";
		s.wind_length = 0;
	},
	windRun:function(){
		var s = this;
		if(s.wind_length > s.wind_text.length){
			s.wind_flag = false;
			if(s.wind_over_function)s.wind_over_function();
			return;
		}
		s.text = s.wind_text.substring(0,s.wind_length);
		s.wind_length++;
	},
	toString:function(){
		return "[LTextField]";
	}
};
for(var k in p)LTextField.prototype[k]=p[k];
/*
* LLabel.js
**/
function LLabel(){
	var s = this;
	base(s,LTextField,[]);
	s.width = LGlobal.width;
}