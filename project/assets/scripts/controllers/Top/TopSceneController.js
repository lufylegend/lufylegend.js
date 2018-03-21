import PrefabContainer from '../../../plugin/mvc/prefabs/PrefabContainer';
import SceneController from '../../../plugin/mvc/controllers/SceneController';
import BaseManager from '../../../plugin/mvc/managers/BaseManager';
import FooterMenuButtonView from '../../views/FooterMenuButtonView';
class TopSceneController extends SceneController {
    onLoad(request) {
        super.onLoad(request);
        this.dispatcher.username = '测试';
        this.dispatcher.avatar = 'stone';
        this.dispatcher.cards = [{ name: '老虎', icon: 'dog' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }];
    }
    onLoadEnd() {
        super.onLoadEnd();
        this.footerButtons = this.childList.filter((child) => {
            return child instanceof FooterMenuButtonView;
        });
        this.changePanel(null, 'Home');
    }
    changePanel(event, param) {
        let oldIndex = this.footerButtons.findIndex((child) => {
            return child.focus;
        });
        if (oldIndex >= 0) {
            this.footerButtons[oldIndex].focusOff();
        }
        let newIndex = this.footerButtons.findIndex((child) => {
            return child.name === param;
        });
        let focusButton = this.footerButtons[newIndex];
        focusButton.focusOn();
        let x = 0;
        this.footerButtons.forEach((child) => {
            child.x = x;
            x += child.focus ? 190 : 150;
        });
        BaseManager.loadPanel('prefabs/panel/' + param, {}, newIndex > oldIndex ? 'right' : 'left');
    }
    gotoBattleScene(event, param) {
        console.error('gotoBattleScene', event, param);
        BaseManager.loadScene('prefabs/scene/Battle');
    }
}
PrefabContainer.set('TopSceneController', TopSceneController);
export default TopSceneController;