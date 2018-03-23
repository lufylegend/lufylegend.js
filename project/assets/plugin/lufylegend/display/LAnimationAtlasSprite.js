import LSprite from './LSprite';
import LEvent from '../events/LEvent';
import { UNDEFINED } from '../utils/LConstant';
import LAtlas from '../system/LAtlas';
import LSpriteAtlasType from '../system/LSpriteAtlasType';
class LAnimationAtlasSprite extends LSprite {
    constructor(list) {
        super();
        this.type = 'LAnimationAtlasSprite';
        this.rowIndex = 0;
        this.colIndex = 0;
        this._ll_stepIndex = 0;
        this._ll_stepArray = [];
        this.mode = 1;
        this.isMirror = false;
        //{atlas:"",sprite:"",x:0,y:0,width:1,height:1,label,isMirror}
        this.spriteList = list.concat();
        this.onframe();
        this.colIndex = 0;
        this.addEventListener(LEvent.ENTER_FRAME, this._ll_onframe);
    }
    setFrameSpeedAt(rowIndex, colIndex, speed) {
        if (!this._ll_stepArray[rowIndex]) {
            this._ll_stepArray[rowIndex] = [];
        }
        this._ll_stepArray[rowIndex][colIndex] = speed;
    }
    _ll_onframe(event) {
        let self = event.target;
        if (self._ll_stop) {
            return;
        }
        if (self._speedIndex++ < self.speed) {
            return;
        }
        if (self._send_complete) {
            self.dispatchEvent(LEvent.COMPLETE);
            self._send_complete = false;
            if (self._ll_stop) {
                return;
            }
        }
        self._speedIndex = 0;
        self.onframe();
    }
    onframe() {
        let arr, stepFrame = null;
        if (this.colIndex >= this.spriteList[this.rowIndex].length) {
            this.colIndex = 0;
        }
        arr = this.spriteList[this.rowIndex][this.colIndex];
        if (this._ll_stepArray[this.rowIndex] && this._ll_stepArray[this.rowIndex][this.colIndex]) {
            stepFrame = this._ll_stepArray[this.rowIndex][this.colIndex];
        } else {
            stepFrame = 0;
        }
        if (this.currentDisplayObject && this.currentDisplayObject.visible) {
            this.currentDisplayObject.visible = false;
        }
        if (this._ll_stepIndex === 0) {
            if (!arr._displayObject) {
                let atlas = LAtlas.get(arr.atlas);
                arr._displayObject = atlas.getSprite(arr.sprite, LSpriteAtlasType.SIMPLE, arr.width, arr.height);
                arr._displayObject.x = arr.x;
                arr._displayObject.y = arr.y;
                this.addChild(arr._displayObject);
            }
            this.currentDisplayObject = arr._displayObject;
            this.currentDisplayObject.visible = true;
            if (arr.script) {
                for (let i = 0; i < arr.script.length; i++) {
                    let obj = arr.script[i];
                    let l = this.ll_labelList[obj.name];
                    if (l && l.rowIndex === this.rowIndex && l.colIndex === this.colIndex 
                        && l.mode === this.mode && l.isMirror === (this.currentDisplayObject.scaleX === -1)) {
                        obj.func(this, obj.params);
                    }
                }
            }
            if (typeof arr.mirror !== UNDEFINED) {
                this.currentDisplayObject.scaleX = arr.mirror ? -1 : 1;
            }
            this.currentDisplayObject.x = arr.x + this.currentDisplayObject.scaleX === 1 ? 0 : arr.width;
        }
        if (this._ll_stepIndex++ < stepFrame) {
            return;
        }
        this._ll_stepIndex = 0;
        this.colIndex += this.mode;
        if (this.colIndex >= this.spriteList[this.rowIndex].length || this.colIndex < 0) {
            this.colIndex = this.mode > 0 ? 0 : this.spriteList[this.rowIndex].length - 1;
            this._send_complete = true;
        }
    }
    setLabel(name, _rowIndex, _colIndex, _mode, _isMirror) {
        this.ll_labelList[name] = {
            rowIndex: _rowIndex,
            colIndex: _colIndex,
            mode: (typeof _mode === UNDEFINED ? 1 : _mode),
            isMirror: (typeof _isMirror === UNDEFINED ? false : _isMirror)
        };
    }
    play() {
        this._ll_stop = false;
    }
    stop() {
        this._ll_stop = true;
    }
    gotoAndPlay(name) {
        let s = this, l = s.ll_labelList[name];
        s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
        s.play();
        s.onframe();
    }
    gotoAndStop(name) {
        let s = this, l = s.ll_labelList[name];
        s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
        s.stop();
        s.onframe();
    }
    addFrameScript(name, func, params) {
        let l = this.ll_labelList[name];
        let arr = this.imageArray[l.rowIndex][l.colIndex];
        if (!arr.script) {
            arr.script = [];
        }
        arr.script.push({ func: func, params: params, name: name });
    }
    removeFrameScript(name) {
        let l = this.ll_labelList[name], obj, script, i;
        script = this.imageArray[l.rowIndex][l.colIndex].script;
        if (!script) {
            return;
        }
        for (i = 0; i < script.length; i++) {
            obj = script[i];
            if (obj.name === name) {
                script.splice(i, 1);
                break;
            }
        }
    }
}

export default LAnimationAtlasSprite;
