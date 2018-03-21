import PrefabContainer from '../../../plugin/mvc/prefabs/PrefabContainer';
import PanelController from '../../../plugin/mvc/controllers/PanelController';
class ShopPanelController extends PanelController {
    onLoad() {
        super.onLoad();
        this.dispatcher.title = 'Shop测试';
    }
}
PrefabContainer.set('ShopPanelController', ShopPanelController);
export default ShopPanelController;