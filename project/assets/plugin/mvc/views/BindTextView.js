import BaseBindView from './BaseBindView';
import LTextField from '../../lufylegend/text/LTextField';
import PrefabContainer from '../prefabs/PrefabContainer';
class BindTextView extends BaseBindView {
    init() {
        super.init();
        this.label = new LTextField();
        this.addChild(this.label);
    }
    updateView() {
        super.updateView();
        let value = this.getByPath(this.bind.key);
        if (value !== null) {
            this.label.text = value;
        }
    }
}
PrefabContainer.set('BindTextView', BindTextView);
export default BindTextView;