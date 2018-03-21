import PrefabContainer from '../../../plugin/mvc/prefabs/PrefabContainer';
import PanelController from '../../../plugin/mvc/controllers/PanelController';
class TeamPanelController extends PanelController {
    onLoad() {
        super.onLoad();
        this.dispatcher.title = 'Team测试';
    }
}
PrefabContainer.set('TeamPanelController', TeamPanelController);
export default TeamPanelController;