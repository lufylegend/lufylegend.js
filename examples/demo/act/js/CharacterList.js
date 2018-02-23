var CharacterList = {
	huangzhong:function(){
		//图片数据
		var dataList = new Array();
		dataList.push(new LBitmapData(imglist["player_stand"],0,0,106,77));
		dataList.push(new LBitmapData(imglist["player_move"],0,0,115,85));
		dataList.push(new LBitmapData(imglist["player_run"],0,0,125,87));
		dataList.push(new LBitmapData(imglist["player_jump"],0,0,131,134));
		dataList.push(new LBitmapData(imglist["player_attack"],0,0,242,143));
		dataList.push(new LBitmapData(imglist["player_big_attack"],0,0,232,143));
		dataList.push(new LBitmapData(imglist["player_jump_attack"],0,0,232,143));
		dataList.push(new LBitmapData(imglist["player_hit"],0,0,161,88));
		dataList.push(new LBitmapData(imglist["player_skill"],0,0,324,140));
		dataList.push(new LBitmapData(imglist["player_big_skill"],0,0,441,166));
		dataList.push(new LBitmapData(imglist["player_hert"],0,0,179,87));
		dataList.push(new LBitmapData(imglist["player_fall"],0,0,298,157));
		//图片分割数据
		var coordinateList = new Array();
		coordinateList.push(LGlobal.divideCoordinate(1272,77,1,12));
		coordinateList.push(LGlobal.divideCoordinate(920,85,1,8));
		coordinateList.push(LGlobal.divideCoordinate(750,87,1,6));
		var jumpList = LGlobal.divideCoordinate(655,134,1,5);
		coordinateList.push([[jumpList[0][0],jumpList[0][0],jumpList[0][1],jumpList[0][1],jumpList[0][2],jumpList[0][2],jumpList[0][3],jumpList[0][3],jumpList[0][4],jumpList[0][4]]]);
		var attackList = LGlobal.divideCoordinate(484,143,1,2);
		coordinateList.push([[attackList[0][0],attackList[0][1],attackList[0][1],attackList[0][1]]]);
		var bigattackList = LGlobal.divideCoordinate(927,143,1,4);
		coordinateList.push(bigattackList);
		var jumpattackList = LGlobal.divideCoordinate(927,143,1,4);
		coordinateList.push(jumpattackList);
		coordinateList.push(LGlobal.divideCoordinate(966,88,1,6));
		coordinateList.push(LGlobal.divideCoordinate(2268,140,1,7));
		var bigskillList = LGlobal.divideCoordinate(2205,830,5,5);
		coordinateList.push([[bigskillList[0][0],bigskillList[0][1],bigskillList[0][2],bigskillList[0][3],bigskillList[0][4]
				,bigskillList[1][0],bigskillList[1][1],bigskillList[1][2],bigskillList[1][3],bigskillList[1][4]
				,bigskillList[2][0],bigskillList[2][1],bigskillList[2][2],bigskillList[2][3],bigskillList[2][4]
				,bigskillList[3][0],bigskillList[3][1],bigskillList[3][2],bigskillList[3][3],bigskillList[3][4]
				,bigskillList[4][0],bigskillList[4][1],bigskillList[4][2],bigskillList[4][3],bigskillList[4][4]]]);
		var hertList = LGlobal.divideCoordinate(358,87,1,2);
		coordinateList.push([[hertList[0][0],hertList[0][0],hertList[0][1],hertList[0][1]]]);
		var fallList = LGlobal.divideCoordinate(2682,157,1,9);
		coordinateList.push([[fallList[0][0],fallList[0][1],fallList[0][2],fallList[0][3],fallList[0][4],fallList[0][5],fallList[0][6],fallList[0][6],fallList[0][6],fallList[0][7],fallList[0][7],fallList[0][6],fallList[0][6],fallList[0][7],fallList[0][8]]]);
		//图片位置数据
		var locationList = new Array();
		locationList.push({x:0,y:0});
		locationList.push({x:0,y:0});
		locationList.push({x:0,y:0});
		locationList.push({x:0,y:0});
		locationList.push({x:20,y:20});
		locationList.push({x:20,y:20});
		locationList.push({x:20,y:20});
		locationList.push({x:0,y:0});
		locationList.push({x:100,y:0});
		locationList.push({x:150,y:20});
		locationList.push({x:5,y:0});
		locationList.push({x:-30,y:10});
		//被攻击范围
		var hertList = [[[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50],[-30,-60,60,50]],
		[[-30,-70,50,60],[-30,-70,50,60],[-30,-70,50,60],[-30,-70,50,60],[-30,-70,50,60],[-30,-70,50,60],[-30,-70,50,60],[-30,-70,50,60]],
		[[-30,-70,60,60],[-30,-70,60,60],[-30,-70,60,60],[-30,-70,60,60],[-30,-70,60,60],[-30,-70,60,60]],
		[[-25,-70,50,60],[-25,-70,50,60],[-25,-70,50,60],[-25,-70,50,60],[-25,-70,50,60]],
		[[-10,-60,30,60],[-10,-60,30,60],[-30,-60,30,60],[-30,-60,30,60]],
		[[0,-60,40,60],[0,-60,40,60],[-20,-60,30,60],[-20,-60,30,60]],
		[],
		[[-20,-60,30,60],[-20,-60,30,60],[-20,-60,30,60],[-20,-60,30,60],[-20,-60,30,60],[-20,-60,30,60]],
		[[0,-70,40,60],[0,-70,40,60]],
		[],[],[]
		];
		//攻击范围
		var attackList = [[],[],[],[],
		[[0,0,0,0],[0,0,0,0],[-10,-70,115,60],[-10,-70,115,60]],
		[[0,0,0,0],[0,0,0,0],[-10,-100,140,90],[-10,-100,140,90]],
		[[0,0,0,0],[0,0,0,0],[-10,-130,115,60],[-10,-110,140,120]],
		[[10,-70,30,70],[10,-70,30,70],[10,-70,30,70],[10,-70,30,70],[10,-70,30,70],[10,-70,30,70]],
		[[0,0,0,0],[0,0,0,0],[-40,-70,80,60],[-60,-100,80,60],[20,-100,130,100],[20,-100,130,100]],
		[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
		[50,-105,50,20],[60,-100,120,40],[60,-90,150,40],[50,-80,190,40],[50,-80,210,40],
		[50,-75,310,60],[50,-75,310,60],[50,-75,310,60],[50,-75,310,80]],[],[]
		];
		return [dataList,coordinateList,locationList,hertList,attackList];
	},
	sunji:function(){
		//图片数据
		var dataList = new Array();
		dataList.push(new LBitmapData(imglist["sunji_stand"],0,0,129,89));
		dataList.push(new LBitmapData(imglist["sunji_move"],0,0,128,97));
		dataList.push(new LBitmapData(imglist["sunji_run"],0,0,125,77));
		dataList.push(new LBitmapData(imglist["sunji_jump"],0,0,131,134));
		dataList.push(new LBitmapData(imglist["sunji_attack"],0,0,197,103));
		dataList.push(new LBitmapData(imglist["sunji_big_attack"],0,0,198,103));
		dataList.push(new LBitmapData(imglist["sunji_jump_attack"],0,0,182,143));
		dataList.push(new LBitmapData(imglist["sunji_hit"],0,0,238,86));
		dataList.push(new LBitmapData(imglist["sunji_skill"],0,0,215,102));
		dataList.push(new LBitmapData(imglist["sunji_big_skill"],0,0,275,139));
		dataList.push(new LBitmapData(imglist["sunji_hert"],0,0,131,79));
		dataList.push(new LBitmapData(imglist["sunji_fall"],0,0,249,136));
		//图片分割数据
		var coordinateList = new Array();
		coordinateList.push(LGlobal.divideCoordinate(1548,89,1,12));
		coordinateList.push(LGlobal.divideCoordinate(640,97,1,5));
		coordinateList.push(LGlobal.divideCoordinate(1000,77,1,8));
		var jumpList = LGlobal.divideCoordinate(655,134,1,5);
		coordinateList.push([[jumpList[0][0],jumpList[0][0],jumpList[0][1],jumpList[0][1],jumpList[0][2],jumpList[0][2],jumpList[0][3],jumpList[0][3],jumpList[0][4],jumpList[0][4]]]);
		var attackList = LGlobal.divideCoordinate(394,103,1,2);
		coordinateList.push([[attackList[0][0],attackList[0][1],attackList[0][1],attackList[0][1]]]);
		var bigattackList = LGlobal.divideCoordinate(792,103,1,4);
		coordinateList.push(bigattackList);
		var jumpattackList = LGlobal.divideCoordinate(728,143,1,4);
		coordinateList.push(jumpattackList);
		coordinateList.push(LGlobal.divideCoordinate(1428,86,1,6));
		coordinateList.push(LGlobal.divideCoordinate(2365,102,1,11));
		var bigskillList = LGlobal.divideCoordinate(1650,695,5,6);
		coordinateList.push([[bigskillList[0][0],bigskillList[0][1],bigskillList[0][2],bigskillList[0][3],bigskillList[0][4],bigskillList[0][5]
				,bigskillList[1][0],bigskillList[1][1],bigskillList[1][2],bigskillList[1][3],bigskillList[1][4],bigskillList[1][5]
				,bigskillList[2][0],bigskillList[2][1],bigskillList[2][2],bigskillList[2][3],bigskillList[2][4],bigskillList[2][5]
				,bigskillList[3][0],bigskillList[3][1],bigskillList[3][2],bigskillList[3][3],bigskillList[3][4],bigskillList[3][5]
				,bigskillList[4][0],bigskillList[4][1],bigskillList[4][2],bigskillList[4][3],bigskillList[4][4],bigskillList[4][5]]]);
		var hertList = LGlobal.divideCoordinate(262,79,1,2);
		coordinateList.push([[hertList[0][0],hertList[0][0],hertList[0][1],hertList[0][1]]]);
		var fallList = LGlobal.divideCoordinate(1245,544,4,5);
		coordinateList.push([[fallList[0][0],fallList[0][1],fallList[0][2],fallList[0][3],fallList[0][4],fallList[1][0],fallList[1][1],fallList[1][2],fallList[1][3],fallList[1][4],fallList[2][0],fallList[2][1],fallList[2][2],fallList[2][3],fallList[2][4],fallList[3][0],fallList[3][1],fallList[3][2],fallList[3][3],fallList[3][4]]]);
		//图片位置数据
		var locationList = new Array();
		locationList.push({x:0,y:0});
		locationList.push({x:0,y:0});
		locationList.push({x:0,y:0});
		locationList.push({x:0,y:0});
		locationList.push({x:40,y:8});
		locationList.push({x:20,y:0});
		locationList.push({x:20,y:20});
		locationList.push({x:0,y:0});
		locationList.push({x:0,y:0});
		locationList.push({x:70,y:10});
		locationList.push({x:5,y:0});
		locationList.push({x:-35,y:0});
		//被攻击范围
		var hertList = [[[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60],[-25,-70,60,60]],
		        		[[-25,-90,50,80],[-25,-90,50,80],[-25,-90,50,80],[-25,-90,50,80],[-25,-90,50,80],[-25,-90,50,80],[-25,-90,50,80],[-25,-90,50,80]],
		        		[[-30,-60,70,40],[-30,-60,70,40],[-30,-60,70,40],[-30,-60,70,40],[-30,-60,70,40],[-30,-60,70,40]],
		        		[[-25,-90,50,70],[-25,-90,50,70],[-25,-90,50,70],[-25,-90,50,70],[-25,-90,50,70]],
		        		[[-20,-80,50,70],[-20,-80,50,70],[-10,-60,70,50],[-10,-60,70,50]],
		        		[[-10,-80,50,60],[-10,-80,50,60],[-10,-80,50,60],[-10,-80,50,60]],
		        		[[-30,-80,50,70],[-30,-80,50,70],[-30,-80,50,70],[-30,-80,50,70]],
		        		[[-20,-70,60,60],[-20,-70,60,60],[-20,-70,60,60],[-20,-70,60,60],[-20,-70,60,60],[-20,-70,60,60]],
		        		[[-10,-80,40,70],[-10,-80,40,70]],
		        		[],[],[]
		        		];
		//攻击范围
		var attackList = [[],[],[],[],
			          		[[0,0,0,0],[0,0,0,0],[30,-70,75,60],[30,-70,75,60]],
			          		[[0,0,0,0],[0,0,0,0],[20,-100,80,90],[20,-100,80,90]],
			          		[[0,0,0,0],[0,0,0,0],[-10,-90,100,80],[-10,-90,100,80]],
			          		[[10,-70,50,70],[10,-70,50,70],[10,-70,50,70],[10,-70,50,70],[10,-70,50,70],[10,-70,50,70]],
			          		[[0,0,0,0],[0,0,0,0],[-30,-70,90,60],[-90,-70,130,60],[-100,-80,140,70],[-40,-80,140,70]],
			          		[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,-100,100,40],[0,-110,100,50],[0,-110,100,50],
			          		[0,0,0,0],[20,-120,140,120],[20,-120,130,120],[-50,-120,160,120],[-60,-80,180,80],
			          		[-20,-50,150,60],[-10,-60,150,60],[50,-60,90,60],[50,-75,150,70],[50,-75,150,70],
			          		[50,-75,150,70],[50,-75,150,70]],[],[]
			          		];
		return [dataList,coordinateList,locationList,hertList,attackList];
	}
}