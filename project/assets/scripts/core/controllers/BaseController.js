import LNode from '../prefabs/LNode';
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
        this.onLoad();
    }
    onLoad() {
    }

}
export default BaseController;