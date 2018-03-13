import BaseBindView from './BaseBindView';
import LAtlas from '../../lufylegend/system/LAtlas';
import PrefabContainer from '../prefabs/PrefabContainer';
class BindSpriteView extends BaseBindView {
    constructor(data) {
        super(data);
    }
    updateView() {
        super.updateView();
        if (!this.bind) {
            return;
        }
        let value = this.getByPath(this.bind.key);
        if (value === null) {
            return;
        }
        let atlas = LAtlas.get(this.bind.atlas);
        this.removeAllChild();
        let sprite = atlas.getSprite(value);
        if (sprite) {
            this.addChild(sprite.clone());
        }
    }
}
PrefabContainer.set('BindSpriteView', BindSpriteView);
export default BindSpriteView;