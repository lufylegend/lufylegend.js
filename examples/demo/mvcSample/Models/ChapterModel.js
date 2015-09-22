function ChapterModel(){
	base(this,MyModel,[]);
}
//ChapterModel.master = null;
ChapterModel.prototype.construct=function(){
	var self = this;
	self.chapters = [];
};
ChapterModel.prototype.getImages=function(){
	var list = [
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"arrow",path:LMvc.IMG_PATH+"icon/arrow.png"},
		{name:"common-loading",path:LMvc.IMG_PATH+"common/loading.png"},
		{name:"icon-return",path:LMvc.IMG_PATH+"icon/return.png"}
	];
	return list;
};
ChapterModel.prototype.getChapterData=function(callback){
	var self = this;
	if(!ChapterModel.master){
		self.callback = callback;
		LRequestQuestChapterList({},self.getChapterDataComplete.bind(self));
	}else{
		self.chapterMaster = ChapterModel.master;
		callback.apply(self.controller,[]);
	}
};
ChapterModel.prototype.getChapterDataComplete=function(data){
	var self = this;
	//self.chapters = [];
	for(var i=0;i<data.chapters.length;i++){
		data.chapters[i].index = i;
		var chapter = new ChapterStatusModel(self.controller,data.chapters[i]);
		self.chapters.push(chapter);
	}
	//ChapterModel.master = self.chapterMaster;
	var callback = self.callback;
	delete self.callback;
	callback.apply(self.controller,[]);
};