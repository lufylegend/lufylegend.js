function getStrokeLabel(txt,size,color,lineColor,lineWidth,type){
	var label = new LTextField();
	label.text = txt;
	label.size = size;
	label.color = color;
	label.lineColor = lineColor;
	label.stroke = true;
	label.lineWidth = lineWidth;
	label.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	if(type == "bitmap"){
		var layer = new LSprite();
		layer.addChild(label);
		return getBitmap(label);
	}
	return label;
}