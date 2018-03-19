import PrefabContainer from '../../plugin/mvc/prefabs/PrefabContainer';
import DialogController from '../../plugin/mvc/controllers/DialogController';
import BaseManager from '../../plugin/mvc/managers/BaseManager';
class RankingDialogController extends DialogController {
    onLoad() {
        super.onLoad();
        this.dispatcher.title = 'Home测试';
        console.log('Home测试');
        //this.dispatcher.avatar = 'stone';
        //this.dispatcher.cards = [{ name: '老虎', icon: 'dog' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }, { name: '狮子', icon: 'dragon' }];
    }
    showRankingDialog() {
        BaseManager.showDialog('prefabs/dialog/Ranking.prefab');
    }
}
PrefabContainer.set('RankingDialogController', RankingDialogController);
export default RankingDialogController;