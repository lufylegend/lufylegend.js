import BaseBindView from './BaseBindView';
import LTextField from '../../lufylegend/text/LTextField';
import PrefabContainer from '../prefabs/PrefabContainer';
class BindTextView extends BaseBindView {
    init() {
        super.init();
        this._label = new LTextField();
        this.addChild(this._label);
        if (this.textField) {
            for (let key in this.textField) {
                this._label[key] = this.textField[key];
            }
        }
    }
    updateView() {
        super.updateView();
        let value = this.getByPath(this.bind.key);
        if (value !== null) {
            this._label.text = value;
        }
    }
}
PrefabContainer.set('BindTextView', BindTextView);
export default BindTextView;