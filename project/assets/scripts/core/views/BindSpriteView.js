import BaseBindView from './BaseBindView';
export default ll.LClass(BaseBindView, 'BindSpriteView', {
	init(){
	},
	updateView(){
		let value = this.getByPath(this.bind.key);
		if(value !== null){
			let atlas = ll.LAtlas.get(this.bind.atlas);
			this.removeAllChild();
			let sprite = atlas.getSprite(value);
			if(sprite){
				console.log("BindSpriteView updateView", this.bind.key);
				this.addChild(sprite);
			}
		}
	}
});