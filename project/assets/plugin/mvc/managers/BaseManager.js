import { addChild } from '../../lufylegend/utils/Function';
import LNode from '../prefabs/LNode';
import LLoadManage from '../../lufylegend/system/LLoadManage';
import LURLLoader from '../../lufylegend/net/LURLLoader';
import LAtlas from '../../lufylegend/system/LAtlas';
class BaseManager {
    constructor() {
    }
    showDialog(prefabName, request) {
        let prefab;
        return this.loadPrefab(prefabName)
            .then((res) => {
                prefab = JSON.parse(res['prefab']);
                console.error('loadPrefab res', res);
                console.error('loadPrefab prefab', prefab);
                let meta = JSON.parse(res['meta']);
                return this.loadResources(meta);
            })
            .then(() => {
                let node = LNode.create(prefab);
                addChild(node);
            });
    }
    loadPrefab(prefabPath) {
        prefabPath = `resources/${prefabPath}.prefab`;
        let metaPath = `${prefabPath}.meta`;
        return new Promise(function(resolve, reject) {
            LLoadManage.load([
                { name: 'prefab', path: prefabPath, type: LURLLoader.TYPE_TEXT },
                { name: 'meta', path: metaPath, type: LURLLoader.TYPE_TEXT }
            ], null, (res) => {
                resolve(res);
            });
        });
    }
    loadResources(meta) {
        let dataList = [];
        if (meta.atlas) {
            for (let atlas of meta.atlas) {
                dataList.push({ name: atlas.name, path: `resources/${atlas.path}`, type: LAtlas.TYPE_PLIST });
            }
        }
        return new Promise(function(resolve, reject) {
            LLoadManage.load(dataList, null, (res) => {
                resolve(res);
            });
        });
    }
}
export default new BaseManager();