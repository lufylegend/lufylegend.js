import BaseBindView from './BaseBindView';
import BaseManager from '../managers/BaseManager';
import { LListView, LListChildView } from '../../lufylegend/lib/ui/LListView';
import LNode from '../prefabs/LNode';
import PrefabContainer from '../prefabs/PrefabContainer';
class BindListView extends BaseBindView {
    init() {
        super.init();
        this.listView = new LListView();
        this.addChild(this.listView);
    }
    updateView() {
        super.updateView();
        let value = this.getByPath(this.bind.key);
        if (value === null) {
            return;
        }
        let listView = this.listView;
        listView.scrollBarHorizontal.showCondition === LListView.ScrollBarCondition.Always;
        listView.scrollBarVertical.showCondition === LListView.ScrollBarCondition.Always;
        listView.maxPerLine = 1;
        listView.cellWidth = 100;
        listView.cellHeight = 100;
        listView.resize(300, 200);
        listView.arrangement = LListView.Direction.Horizontal;
        listView.movement = LListView.Direction.Vertical;

        let childPrefab = this.bind.childPrefab;
        let path = `resources/${childPrefab}.json`;
        return BaseManager.loadPrefab(path)
            .then((data) => {
                for (let child of value) {
                    this.createListObject(data, child);
                }
            });
    }
    createListObject(data, model) {
        let listChild = new LListChildView();
        this.model = model;
        let node = LNode.create(data);
        listChild.addChild(node);
        this.listView.insertChildView(listChild);
        node.updateWidget(model);
    }
}
PrefabContainer.set('BindListView', BindListView);
export default BindListView;