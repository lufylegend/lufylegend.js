import LNode from '../prefabs/LNode';
import BaseManager from '../managers/BaseManager';
class BaseController extends LNode {
    constructor(data) {
        super(data);
    }
    get isController() {
        return true;
    }
    init() {
        super.init();
        this.dispatcher = this.dispatcher || {};
        setTimeout(() => {
            if (this.widget && BaseManager.currentScene) {
                BaseManager.currentScene.nextFrameExecute(() => {
                    this.widgetInit();
                });
            }
        });
    }
    onLoad(request) {
    }

}
export default BaseController;