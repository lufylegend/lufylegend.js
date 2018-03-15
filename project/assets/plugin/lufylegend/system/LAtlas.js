import LEventDispatcher from '../../lufylegend/events/LEventDispatcher';
import LLoadManage from '../../lufylegend/system/LLoadManage';
import LEvent from '../../lufylegend/events/LEvent';
import LSprite from '../../lufylegend/display/LSprite';
import LBitmapData from '../../lufylegend/display/LBitmapData';
import LBitmap from '../../lufylegend/display/LBitmap';
class LAtlas extends LEventDispatcher {
    destroy() {
        delete LAtlas._container[name];
    }
    load(path, name) {
        let loadData = [
            { name: `${path}/${name}.png`, path: `${path}/${name}.png` },
            { name: `${path}/${name}.plist`, path: `${path}/${name}.plist`, type: 'text' }
        ];
        LLoadManage.load( 
            loadData, null, (datalist) => {
                this._loadComplete(datalist, path, name);
            }
        );
    }
    _loadComplete(datalist, path, name) {
        let resourcesPath = 'resources/';
        let resourcesIndex = path.indexOf(resourcesPath);
        this._atlasKey = path.substring(resourcesIndex + resourcesPath.length) + '/' + name;
        LAtlas._container[this._atlasKey] = this;
        let texture = datalist[`${path}/${name}.png`];
        let xml = datalist[`${path}/${name}.plist`];
        this.set(xml, texture);
        let event = new LEvent(LEvent.COMPLETE);
        event.currentTarget = this;
        event.target = this;
        this.dispatchEvent(event);
    }
    set(xml, texture) {
        this._texture = texture;
        this._initData(xml);
    }
    _initData(xml) {
        let parser = new DOMParser();
        this.xmlDom = parser.parseFromString(xml, 'text/xml');
        let plistDom = this.xmlDom.querySelector('plist').querySelector('dict');
        let children = plistDom.children;
        let frames;
        for (let i = 0;i < children.length; i++) {
            let child = children[i];
            if (child.tagName === 'key' && child.textContent === 'frames') {
                frames = children[i + 1].children;
                break;
            }
        }
        this._textureData = {};
        for (let i = 0;i < frames.length; i += 2) {
            let key = frames[i].textContent.replace('.png', '');
            let value = frames[i + 1];
            let data = this._getTextureData(value.children);
            this._textureData[key] = this._textureToSprite(data);
        }
    }
    getSprite(name) {
        return this._textureData[name];
    }
    _textureToSprite(data) {
        let x = data.frame[0][0];
        let y = data.frame[0][1];
        let width = data.frame[1][data.rotated ? 1 : 0];
        let height = data.frame[1][data.rotated ? 0 : 1];
        let bitmapData = new LBitmapData(this._texture, x, y, width, height);
        let bitmap = new LBitmap(bitmapData);
        bitmap.rotateCenter = false;
        if (data.rotated) {
            bitmap.y = width;
            bitmap.rotate = -90;
        }
        let sprite = new LSprite();
        sprite.addChild(bitmap);
        return sprite;
    }
    _getTextureData(children) {
        let data = {};
        for (let i = 0;i < children.length; i += 2) {
            let key = children[i].textContent;
            let tict = children[i + 1];
            let value = JSON.parse(tict.tagName === 'string' ? tict.textContent.replace(/\{/g, '[').replace(/\}/g, ']') : tict.tagName);
            data[key] = value;
        }
        return data;
    }
}
LAtlas.TYPE_PLIST = 'type_plist';
LAtlas._container = {};
LAtlas.get = function(name) {
    return LAtlas._container[name] || new LAtlas();
};
export default LAtlas;