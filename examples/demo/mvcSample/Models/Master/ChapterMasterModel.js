function ChapterMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "ChapterMasterModel";
	self.data = data;
	
}

ChapterMasterModel.master = [];
ChapterMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var chapter = new ChapterMasterModel(null,list[i]);
		ChapterMasterModel.master.push(chapter);
	}
};
ChapterMasterModel.getMaster=function(chapter_id){
	var self = this;
	//alert("chaptermaster "+ChapterMasterModel.master.length);
	for(var i=0,l=ChapterMasterModel.master.length;i<l;i++){
		var chapter = ChapterMasterModel.master[i];
		//alert("chaptermaster "+chapter+","+chapter.id+"="+chapter_id);
		if(chapter.id() != chapter_id){
			continue;
		}
		return chapter;
	}
	return null;
};
ChapterMasterModel.prototype.name = function(){
	return Language.get("chapter_name_"+this.data.id);
};
ChapterMasterModel.prototype.id = function(){
	return this.data.id;
};
ChapterMasterModel.prototype.img=function(){
	var icon = new BitmapSprite(LMvc.IMG_PATH + "chapter/chapter-" + this.id() + ".png", null,null);
	return icon;
};