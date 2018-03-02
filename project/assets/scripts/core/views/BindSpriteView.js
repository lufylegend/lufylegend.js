import BaseBindView from './BaseBindView';
export default ll.LClass(BaseBindView, 'BindSpriteView', {
	init(){
	},
	updateView(){
		let value = this.getByPath(this.bind.key);
		if(value !== null){
            let atlas = ll.LAtlas.get(this.bind.atlas);
            this.removeAllChild();
            this.addChild(atlas.getSprite(value));
		}
	}
});