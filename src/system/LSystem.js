var LSystem = {
	sv:0,
	sleep:function(s){
		var d = new Date();   
		while((new Date().getTime()-d.getTime()) < s){}
	},
	screen:function(a){
		LSystem.sv = a;
		if(LGlobal.stage){LGlobal.resize();}
	}
};