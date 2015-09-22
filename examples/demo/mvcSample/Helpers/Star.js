function getStar(value){
	var data = new LBitmapData(LMvc.datalist["icon-star"],0,value*29,29,29);
	var bitmap = new LBitmap(data);
	bitmap.rotateCenter = false;
	return bitmap;
}