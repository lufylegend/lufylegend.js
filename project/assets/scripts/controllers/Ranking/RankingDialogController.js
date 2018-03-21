import PrefabContainer from '../../../plugin/mvc/prefabs/PrefabContainer';
import DialogController from '../../../plugin/mvc/controllers/DialogController';
import BaseManager from '../../../plugin/mvc/managers/BaseManager';
class RankingDialogController extends DialogController {
    onLoad() {
        super.onLoad();
        this.dispatcher.title = 'ListView测试';
        this.dispatcher.users = [{ name: '龙', icon: 'dragon' }, { name: '老虎', icon: 'tiger' }, { name: '马', icon: 'horse' }, { name: '猴子', icon: 'monkey' }];
    }
    showRankingDialog() {
        BaseManager.showDialog('prefabs/dialog/RankingDialog');
    }
}
PrefabContainer.set('RankingDialogController', RankingDialogController);
export default RankingDialogController;