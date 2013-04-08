var list,nowBoxList,stageList=[],boxList=[],playerList=[];

var stageMenu = [
{x:0,y:0,flag:0,times:0,index:0,lv:0,open:true},
{x:1,y:0,flag:0,times:0,index:1,lv:1,open:false},
{x:0,y:1,flag:0,times:0,index:2,lv:2,open:false},
{x:1,y:1,flag:0,times:0,index:3,lv:3,open:false},
{x:0,y:2,flag:1,times:0,index:4,lv:4,open:false},
{x:1,y:2,flag:1,times:0,index:5,lv:5,open:false}
];
if(window.localStorage.getItem("lufylegend_sudoku_stageMenu"))
stageMenu=JSON.parse(window.localStorage.getItem("lufylegend_sudoku_stageMenu"));