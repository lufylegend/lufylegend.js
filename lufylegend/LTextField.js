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
	s.sclaeY=1;
	s.alpha=1;
	s.rotate=0;
	s.wordWrap=false;
}
p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this,c = LGlobal.canvas,rotateFlag = Math.PI / 180;
		if(!s.visible)return;
		s.save = false;
		if(s.alpha*cood.alpha < 1){
			c.save();
			s.save = true;
			c.globalAlpha = s.alpha*cood.alpha;
		}
		c.font = s.weight + " " + s.size+"pt "+s.font;  
		c.textAlign = s.textAlign;
		c.textBaseline = s.textBaseline;
		c.lineWidth = s.lineWidth;  
		if(s.filters){
			if(!s.save)c.save();
			s.save = true;
			s.setShadow();
		}
		if(s.rotate != 0){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x + c.measureText(s.text).width*0.5, cood.y + s.y + s.size*0.5);
			c.rotate(s.rotate * rotateFlag);
			c.translate(-(cood.x + s.x + c.measureText(s.text).width*0.5), -(cood.y + s.y + s.size*0.5));
		}
		if(s.scaleX*cood.scaleX != 1 || s.scaleY*cood.scaleY != 1){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x + c.measureText(s.text).width*0.5, cood.y + s.y + s.size*0.5);
			c.scale(s.scaleX*cood.scaleX,s.scaleY*cood.scaleY);
			c.translate(-(cood.x + s.x + c.measureText(s.text).width*0.5), -(cood.y + s.y + s.size*0.5));
		}
		if(s.mask != null && s.mask.show){
			c.beginPath();
			if(!s.save)c.save();  
			s.mask.show(cood);
			c.clip();
		}
		if(s.texttype == LTextFieldType.INPUT){
			s.inputBackLayer.show({x:s.x+cood.x,y:s.y+cood.y});
	    	if(LGlobal.inputBox.name == "input"+s.objectindex){
	    		LGlobal.inputBox.style.marginTop = (s.y+cood.y) + "px";
	    		LGlobal.inputBox.style.marginLeft = (s.x+cood.x) + "px";
	    	}
		}

	    if(s.stroke){
		    c.strokeStyle = s.color;
		    if(s.wordWrap){
		    	var i,j=0,k=0,m=0;
		    	for(i=0;i<s.text.length;i++){
			    	j = c.measureText(s.text.substr(k,i-k)).width;
			    	if(j > s.width){
			    		j = 0;
			    		k = i;
			    		m++;
			    	}
	    			c.strokeText(s.text.substr(i,1),parseFloat(cood.x) + parseFloat(s.x) + j,
			    		parseFloat(cood.y) + parseFloat(s.y) + m*s.wordHeight,
			    		c.measureText(s.text).width);
		    	}
			s.height = m*s.wordHeight;
		    }else{
	    		c.strokeText(s.text,parseFloat(cood.x) + parseFloat(s.x),
		    		parseFloat(cood.y) + parseFloat(s.y),
		    		c.measureText(s.text).width);  
	    	}
	    }else{
		    c.fillStyle = s.color;
		    if(s.wordWrap){
		    	var i,j=0,k=0,m=0;
		    	for(i=0;i<s.text.length;i++){
			    	j = c.measureText(s.text.substr(k,i-k)).width;
			    	if(j > s.width){
			    		j = 0;
			    		k = i;
			    		m++;
			    	}
	    			c.fillText(s.text.substr(i,1),parseFloat(cood.x) + parseFloat(s.x) + j,
			    		parseFloat(cood.y) + parseFloat(s.y) + m*s.wordHeight,
			    		c.measureText(s.text).width);
		    	}
			s.height = m*s.wordHeight;
		    }else{
	    		c.fillText(s.text,parseFloat(cood.x) + parseFloat(s.x),
		    		parseFloat(cood.y) + parseFloat(s.y),
		    		c.measureText(s.text).width);
		    }
	    }
	    if(s.wind_flag){
	    	s.windRun();
	    }

		if(s.save){
			c.restore();
		}
	},
	setWordWrap:function(v,h){
		var s = this;
		s.wordWrap = v;
		s.wordHeight = h;
	},
	setType:function(type,inputBackLayer){
		var s = this;
		if(s.texttype != type && type == LTextFieldType.INPUT){
			if(inputBackLayer==null || inputBackLayer.type != "LSprite"){
				s.inputBackLayer = new LSprite();
				s.inputBackLayer.graphics.drawRect(1,"black",[0, 0, s.width, s.height],true,"#cccccc");
			}else{
				s.inputBackLayer = inputBackLayer;
			}
			s.inputBackLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
				if(s.texttype != LTextFieldType.INPUT)return;
				LGlobal.inputBox.style.display = "";
				LGlobal.inputBox.name = "input"+s.objectindex;
	    		LGlobal.inputTextField = s;
	    		LGlobal.inputTextBox.value = s.text;
	    		LGlobal.inputTextBox.style.height = s.height+"px";
	    		LGlobal.inputTextBox.style.width = s.width+"px";
			});
		}else{
			s.inputBackLayer = null;
		}
		s.texttype = type;
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
		var s = this;
		if(s.wordWrap)return s.height;
		return s.size;
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
	callParent:function(function_name,args){
		args.callee[SUPER][function_name].call(this);
	}
};
for(var k in p)LTextField.prototype[k]=p[k];