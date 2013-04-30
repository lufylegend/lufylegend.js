var LSystem = {
	sv:0,
	sleep:function(s){
		var d = new Date();   
		while((new Date().getTime()-d.getTime()) < s){}
	},
	screen:function(a){
		LSystem.sv = a;
	},
	screenInit:function(){
		if(!LGlobal.canTouch)return 0;
		var is,ns,xs,d='',w,v = "meta[name=viewport]",meta = document.querySelector(v),content = 'width=device-width, height=device-height, user-scalable=no, minimum-scale=1, maximum-scale=1, initial-scale=1, target-densitydpi=device-dpi';
		if(!meta){
			meta = document.createElement("meta");
			meta.setAttribute("name", "viewport");
			document.head.appendChild(meta);
		}
		w = window.innerWidth;
		if(LSystem.sv == LStage.FULL_SCREEN){
			if(LGlobal.width > LGlobal.height && w < window.innerHeight){
				meta.setAttribute("content", content);
				return 1;
			}else if(LGlobal.width < LGlobal.height && w > window.innerHeight){
				meta.setAttribute("content", content);
				return 2;
			}
			if(LGlobal.ios){
				is = ns = xs = 1 / window.devicePixelRatio;
			}else if(LGlobal.android){
				if(window.name == location.href && window.localStorage.getItem(window.name)){
					window.name=location.href;
					w = parseInt(window.localStorage.getItem(window.name));
				}else{
					setTimeout(function(){
						window.name = location.href;
						window.localStorage.setItem(window.name, window.innerWidth);
						location.href=location.href;
					},10);
					meta.setAttribute("content", content);
					return 3;
				}
				is = ns = xs = 1;
				if(w<=LGlobal.width){
					d=',target-densitydpi=device-dpi';
					is = ns = xs = (w/LGlobal.width);
				}
			}
		}else if(LSystem.sv > 0){
			is = ns = xs = LSystem.sv;
		}else{
			is = ns = xs = 1;
		}
		content =  'width=device-width,initial-scale='+is+', minimum-scale='+ns+', maximum-scale='+xs+',user-scallable=no'+d;
		meta.setAttribute("content", content);
		return 0;
	}
};