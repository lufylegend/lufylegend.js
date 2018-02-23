function AreaMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "AreaMasterModel";
	self.data = data;
	
}

AreaMasterModel.master = [];
AreaMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var area = new AreaMasterModel(null,list[i]);
		AreaMasterModel.master.push(area);
	}
};
AreaMasterModel.getMaster=function(area_id){
	var self = this;
	for(var i=0,l=AreaMasterModel.master.length;i<l;i++){
		var area = AreaMasterModel.master[i];
		if(area.id() != area_id){
			continue;
		}
		return area;
	}
	return null;
};
AreaMasterModel.prototype.name = function(){
	return Language.get("area_name_"+this.data.id);
};
AreaMasterModel.prototype.id = function(){
	return this.data.id;
};
AreaMasterModel.prototype.icon=function(){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["area-"+self.img()]);
	self.iconWidth(bitmapData.width * 0.5);
	bitmapData.setProperties(0, 0, self.iconWidth(), bitmapData.height);
	var bitmap = new LBitmap(bitmapData);	
	return bitmap;
};
AreaMasterModel.prototype.iconWidth=function(w){
	if(w){
		this._width = w;
	}else{
		return this._width;
	}
};
AreaMasterModel.prototype.imgPath=function(){
	return LMvc.IMG_PATH + "area/area-" + this.img() + ".png";
};
AreaMasterModel.prototype.img=function(){
	return this.data.img;
};
AreaMasterModel.prototype.x=function(){
	return this.data.x;
};
AreaMasterModel.prototype.y=function(){
	return this.data.y;
};
