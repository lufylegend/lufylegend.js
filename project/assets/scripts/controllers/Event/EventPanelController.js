import PrefabContainer from '../../../plugin/mvc/prefabs/PrefabContainer';
import PanelController from '../../../plugin/mvc/controllers/PanelController';
class EventPanelController extends PanelController {
    onLoad() {
        super.onLoad();
        this.dispatcher.title = 'Event测试';
    }
}
PrefabContainer.set('EventPanelController', EventPanelController);
export default EventPanelController;