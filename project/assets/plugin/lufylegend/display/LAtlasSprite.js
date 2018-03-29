import LSprite from './LSprite';
import LBitmapData from './LBitmapData';
import LBitmap from './LBitmap';
import LSpriteAtlasType from '../system/LSpriteAtlasType';
import LPanel from '../lib/ui/LPanel';
class LAtlasSprite extends LSprite {
    constructor(texture, setting, data, atlasType) {
        super();
        this.atlasType = atlasType;
        this._rotated = data.rotated;
        if (atlasType === LSpriteAtlasType.SIMPLE || !setting) {
            this.atlasType = LSpriteAtlasType.SIMPLE;
            let bitmap = this._getBitmap(texture, data);
            this.addChild(bitmap);
        } else if (atlasType === LSpriteAtlasType.SLICED) {
            let panel = this._getPanel(texture, setting, data);
            this.addChild(panel);
        }
    }
    resize(width, height) {
        if (this.atlasType === LSpriteAtlasType.SIMPLE) {
            let sprite = this.getChildAt(0);
            sprite.scaleX = width / this._sourceSize[0];
            sprite.scaleY = height / this._sourceSize[1];
        } else if (this.atlasType === LSpriteAtlasType.SLICED) {
            let sprite = this.getChildAt(0);
            let panel = sprite.getChildAt(0);
            width -= this._minusWidth;
            height -= this._minusHeight;
            if (this._rotated) {
                panel.resize(height, width);
                panel.y = height;
            } else {
                panel.resize(width, height);
            }
        }
    }
    _getBitmapData(texture, data) {
        let x = data.frame[0][0];
        let y = data.frame[0][1];
        let width = data.frame[1][data.rotated ? 1 : 0];
        let height = data.frame[1][data.rotated ? 0 : 1];
        let bitmapData = new LBitmapData(texture, x, y, width, height);
        this._sourceSize = data.sourceSize;
        return bitmapData;
    } 
    _getBitmap(texture, data) {
        let bitmapData = this._getBitmapData(texture, data);
        let bitmap = new LBitmap(bitmapData);
        let w, h;
        bitmap.rotateCenter = false;
        if (data.rotated) {
            w = bitmapData.getHeight();
            h = bitmapData.getWidth();
            bitmap.y = h;
            bitmap.rotate = -90;
        } else {
            w = bitmapData.getWidth();
            h = bitmapData.getHeight();
        }
        bitmap.x += (this._sourceSize[0] - w) * 0.5 + data.offset[0];
        bitmap.y += (this._sourceSize[1] - h) * 0.5 - data.offset[1];
        let sprite = new LSprite();
        sprite.addChild(bitmap);
        return sprite;
    }
    _getPanel(texture, setting, data) {
        let bitmapData = this._getBitmapData(texture, data);
        let w, h;
        let width = bitmapData.getWidth();
        let height = bitmapData.getHeight();
        let left = data.rotated ? setting.bottom : setting.left;
        let right = data.rotated ? setting.top : setting.right;
        let top = data.rotated ? setting.left : setting.top;
        let bottom = data.rotated ? setting.right : setting.bottom;
        let x1 = left;
        let x2 = width - right;
        let y1 = top;
        let y2 = height - bottom;
        let panel = new LPanel(bitmapData, width, height, x1, x2, y1, y2);
        if (data.rotated) {
            w = height;
            h = width;
            panel.y = h;
            panel.rotate = -90;
        } else {
            w = width;
            h = height;
        }
        this._minusWidth = this._sourceSize[0] - w;
        this._minusHeight = this._sourceSize[1] - h;
        panel.x += this._minusWidth * 0.5 + data.offset[0];
        panel.y += this._minusHeight * 0.5 - data.offset[1];
        let sprite = new LSprite();
        sprite.addChild(panel);
        return sprite;
    }
}
export default LAtlasSprite;