import PrefabContainer from '../../plugin/mvc/prefabs/PrefabContainer';
import PanelController from '../../plugin/mvc/controllers/PanelController';
class HomePanelController extends PanelController {
    onLoad() {
        super.onLoad();
        this.dispatcher.title = 'Home测试';
        //this.dispatcher.avatar = 'stone';
        //this.dispatcher.cards = [{ name: '老虎', icon: 'dog' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }];
    }
}
PrefabContainer.set('HomePanelController', HomePanelController);
export default HomePanelController;