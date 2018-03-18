import PrefabContainer from '../../plugin/mvc/prefabs/PrefabContainer';
import SceneController from '../../plugin/mvc/controllers/SceneController';
import BaseManager from '../../plugin/mvc/managers/BaseManager';
import FooterMenuButtonView from '../views/FooterMenuButtonView';
class TopSceneController extends SceneController {
    onLoad(request) {
        super.onLoad(request);
        this.footerButtons = this.childList.filter((child) => {
            return child instanceof FooterMenuButtonView;
        });
        this.changePanel(null, 'Home');
        this.dispatcher.username = '测试';
        this.dispatcher.avatar = 'stone';
        this.dispatcher.cards = [{ name: '老虎', icon: 'dog' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }];
    }
    changePanel(event, param) {
        console.error('changePanel', event, param);
        let focusButton = this.footerButtons.find((child) => {
            return child.focus;
        });
        if (focusButton) {
            focusButton.focusOff();
        }
        focusButton = this.footerButtons.find((child) => {
            return child.name === param;
        });
        focusButton.focusOn();
        let x = 0;
        this.footerButtons.forEach((child) => {
            child.x = x;
            x += child.focus ? 190 : 150;
        });
        BaseManager.loadPanel('prefabs/panel/Home');
    }
    gotoBattleScene(event, param) {
        console.error('gotoBattleScene', event, param);
        BaseManager.loadScene('prefabs/scene/Battle');
    }
}
PrefabContainer.set('TopSceneController', TopSceneController);
export default TopSceneController;