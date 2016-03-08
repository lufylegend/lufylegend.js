function gameStop(){
	LMvc.stop = true;
	LTweenLite.pauseAll();
	LMvc.battleController.view.charaLayer.visible = false;
}
function gamePlay(){
	LMvc.stop = false;
	LMvc.battleController.view.charaLayer.visible = true;
	LTweenLite.resumeAll();
}