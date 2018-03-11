import BaseBindView from './BaseBindView';
import PrefabContainer from '../prefabs/PrefabContainer';
class BindListChildView extends BaseBindView {
    updateWidget(model) {
        console.log('BindListChildView updateWidget,', model);
        this.graphics.drawRect(2, '#00ff00', [0, 0, 20, 20], true, '#00ff00');
        this.model = model;
        for (let child of this.childList) {
            child.updateView();
        }
    }
}
PrefabContainer.set('BindListChildView', BindListChildView);
export default BindListChildView;