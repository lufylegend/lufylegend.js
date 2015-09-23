function ItemMasterModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
}
ItemMasterModel.master = [];
ItemMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var item = new ItemMasterModel(null,list[i]);
		ItemMasterModel.master.push(item);
	}
};
ItemMasterModel.getMaster=function(item_id){
	var self = this;
	for(var i=0,l=ItemMasterModel.master.length;i<l;i++){
		var item = ItemMasterModel.master[i];
		if(item.id() != item_id){
			continue;
		}
		return item;
	}
	return null;
};
ItemMasterModel.prototype.id = function(){
	return this.data.id;
};
ItemMasterModel.prototype.name = function(){
	return Language.get(this.data.name);
};
ItemMasterModel.prototype.type = function(){
	return this.data.type;
};
ItemMasterModel.prototype.child_id = function(){
	return this.data.child_id;
};
ItemMasterModel.prototype.price = function(){
	return this.data.price;
};
ItemMasterModel.prototype.explanation = function(){
	return Language.get(this.data.explanation);
};
ItemMasterModel.prototype.icon=function(size){
	var self = this;
	if(!size){
		size = new LPoint(100,100);
	}
	var icon;
	if(self.type() == ItemType.CHARACTER_STONE || self.type() == ItemType.CHARACTER_FRAGMENT){
		icon = new LSprite();
		var bitmap = new LBitmap(new LBitmapData(LMvc.datalist[self.type() == ItemType.CHARACTER_STONE ? "item-character-stone" : "item-character-fragment"]));
		bitmap.scaleX = size.x/bitmap.getWidth();
		bitmap.scaleY = size.y/bitmap.getHeight();
		icon.addChild(bitmap);
		var chara = CharacterMasterModel.getMaster(self.child_id());
		var face = chara.minFace(self.type() == ItemType.CHARACTER_STONE ? size.x*0.7 : size.y*0.5);
		
		face.x = face.y = self.type() == ItemType.CHARACTER_STONE ? size.x*0.15 : size.y*0.25;
		
		face.alpha = 0.7;
		icon.addChild(face);
	}else{
		icon = new BitmapSprite(LMvc.IMG_PATH + "item/" + this.id() + ".png", null,size);
	}
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	icon.addChild(getBitmap(winPanel));
	return icon;
};