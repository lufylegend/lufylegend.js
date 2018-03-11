import LSprite from '../../lufylegend/display/LSprite';
import LDisplayObject from '../../lufylegend/display/LDisplayObject';
import PrefabContainer from './PrefabContainer';
class LNode extends LSprite {
    constructor(data) {
        super();
        this.type = 'LNode';
        if (data) {
            this._initDataProperty(data);
            this.init();
            this._initDataChildNodes(data);
        }
    }
    _initDataProperty(data) {
        let property = data.property;
        if (!property) {
            return;
        }
        for (let key in property) {
            this[key] = property[key];
        }
    }
    _initDataChildNodes(data) {
        if (!data.childNodes) {
            return;
        }
        for (let childNode of data.childNodes) {
            let child = LNode.create(childNode);
            if (child instanceof LDisplayObject) {
                this.addChild(child);
            }
            if (child instanceof LNode) {
                child.lateInit();
            }
        }
    }
    init() {
        
    }
    lateInit() {
        
    }
}
LNode.create = function(data) {
    let className = data.class;
    let node, cls = PrefabContainer.get(className);
    if (cls) {
        node = new cls(data);
    }
    return node;
};
PrefabContainer.set('LNode', LNode);
export default LNode;