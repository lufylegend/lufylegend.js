/*
* 根据英雄的等级，以及基础属性计算攻击力，防御力等
* 基础属性：索引，姓名，等级，兵种，初始数据(HP，速度，躲闪，物攻，法攻，护甲，法抗)，力量，武力，智力，统率，敏捷，士气
* id,name,level,initialHp,initialMp,
* 计算属性：物攻，法攻，护甲，法抗，躲闪，速度，爆发
* 
* 成长相关
* 力量－HP
* 武力－物攻
* 谋略－法攻
* 统率－护甲
* 智力－法抗
* 躲闪－躲闪－无计算
* 速度－速度－无计算
* 敏捷－爆发

* 索引，姓名，兵种, 骑步兵种，军粮，五行，头像，头像范围，动作图片，HP，物攻，法攻，护甲，法抗，速度，躲闪, 爆发, 力量，武力，谋略,统率，智力，敏捷
* id,name,arms,armsKind,cost，five,faceImg，minFace，actions，initialHp,initialAttack,initialMagic,initialDef,initialMagicDef,initialSpeed,initialDodge,initialBreakout, strength, force, strategy, command, intelligence, agility
* */
var characterList = [
	{id:1,name:"刀步兵",arms:0,armsKind:1,cost:10,five:1,faceImg:1,minFace:[0,0,60,60],actions:"bu_dao",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[],soldiers:[],lineups:[]},
	{id:2,name:"刀骑兵",arms:0,armsKind:1,cost:10,five:1,faceImg:1,minFace:[0,60,60,60],actions:"qi_dao",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[],soldiers:[],lineups:[]},
	{id:3,name:"枪步兵",arms:0,armsKind:1,cost:10,five:1,faceImg:1,minFace:[0,120,60,60],actions:"bu_qiang",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[],soldiers:[],lineups:[]},
	{id:4,name:"枪骑兵",arms:0,armsKind:1,cost:10,five:1,faceImg:1,minFace:[0,180,60,60],actions:"qi_qiang",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[],soldiers:[],lineups:[]},
	{id:5,name:"弓步兵",arms:0,armsKind:1,cost:10,five:1,faceImg:1,minFace:[0,240,60,60],actions:"bu_gong",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[],soldiers:[],lineups:[]},
	{id:6,name:"弓骑兵",arms:0,armsKind:1,cost:10,five:1,faceImg:1,minFace:[0,300,60,60],actions:"qi_gong",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[],soldiers:[],lineups:[]},
	{id:51,name:"刘备",arms:0,armsKind:1,cost:50,five:1,faceImg:6,minFace:[0,23,151,151],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[1]},
	{id:52,name:"关羽",arms:0,armsKind:1,cost:60,five:1,faceImg:7,minFace:[15,67,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[2,3]},
	{id:53,name:"甄氏",arms:0,armsKind:1,cost:50,five:1,faceImg:2,minFace:[0,50,135,135],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[0,1,1,0,0,0],lineups:[1,2]},
	{id:54,name:"陆逊",arms:0,armsKind:1,cost:10,five:1,faceImg:3,minFace:[19,39,110,110],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[0,0,0,1,1,0],lineups:[1,3]},
	{id:55,name:"吕布",arms:0,armsKind:1,cost:10,five:1,faceImg:4,minFace:[49,64,100,100],actions:"bu_dao",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[0,0,0,0,1,1],lineups:[2]},
	{id:56,name:"诸葛亮",arms:0,armsKind:1,cost:10,five:1,faceImg:5,minFace:[8,47,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[3]},
	{id:57,name:"张飞",arms:0,armsKind:1,cost:10,five:1,faceImg:8,minFace:[19,69,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[1,4]},
	{id:58,name:"董卓",arms:0,armsKind:1,cost:10,five:1,faceImg:9,minFace:[29,47,110,110],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[2,4]},
	{id:59,name:"法正",arms:0,armsKind:1,cost:10,five:1,faceImg:10,minFace:[10,48,118,118],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[3,4]},
	{id:60,name:"貂蝉",arms:0,armsKind:1,cost:10,five:1,faceImg:11,minFace:[17,66,110,110],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[5]},
	{id:61,name:"曹操",arms:0,armsKind:1,cost:10,five:1,faceImg:12,minFace:[21,64,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[3,5]},
	{id:62,name:"张角",arms:0,armsKind:1,cost:10,five:1,faceImg:13,minFace:[15,41,110,110],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[3]},
	{id:63,name:"张宝",arms:0,armsKind:1,cost:10,five:1,faceImg:14,minFace:[31,55,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[4]},
	{id:64,name:"张梁",arms:0,armsKind:1,cost:10,five:1,faceImg:15,minFace:[19,63,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[5]},
	{id:65,name:"周仓",arms:0,armsKind:1,cost:10,five:1,faceImg:16,minFace:[9,21,115,115],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[4,5]},
	{id:66,name:"周瑜",arms:0,armsKind:1,cost:10,five:1,faceImg:17,minFace:[33,57,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[3,4]},
	{id:67,name:"许褚",arms:0,armsKind:1,cost:10,five:1,faceImg:18,minFace:[5,72,100,100],actions:"guanyu",initialHp:100,initialAttack:20,initialMagic:20,initialDef:20,initialMagicDef:20,initialSpeed:51,initialDodge:20,initialBreakout:20,
		growing:[
			{strength:10, force:10, strategy:30, command:20, intelligence:27, agility:20},
			{strength:20, force:20, strategy:40, command:30, intelligence:37, agility:30},
			{strength:30, force:30, strategy:50, command:40, intelligence:47, agility:40},
			{strength:40, force:40, strategy:60, command:50, intelligence:57, agility:50},
			{strength:50, force:60, strategy:70, command:60, intelligence:67, agility:60},
			{strength:60, force:80, strategy:80, command:70, intelligence:77, agility:70},
			{strength:70, force:100, strategy:90, command:90, intelligence:87, agility:80}
		],skills:[1,2,3,4,5],soldiers:[1,1,0,0,0,0],lineups:[1]}

];
var government = [
	{id:1,name:"校尉",rating:1,type:0},
	{id:2,name:"中郎将",rating:2,type:0},
	{id:3,name:"骁骑将军",rating:3,type:0},
	{id:4,name:"前将军",rating:4,type:0},
	{id:5,name:"镇国将军",rating:5,type:0},
	{id:6,name:"大将军",rating:6,type:0},
	
	{id:7,name:"从事",rating:1,type:1},
	{id:8,name:"长史",rating:2,type:1},
	{id:9,name:"主簿",rating:3,type:1},
	{id:10,name:"尚书",rating:4,type:1},
	{id:11,name:"太常",rating:5,type:1},
	{id:12,name:"丞相",rating:6,type:1}
];