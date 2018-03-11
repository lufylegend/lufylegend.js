import LMedia from './LMedia';
import LGlobal from '../utils/LGlobal';
import OS_IPHONE from '../utils/LConstant';
import LSound from './LSound';
class LVideo extends LMedia {
    constructor(u) {
        super();
        let s = this;
        s.type = 'LVideo';
        s._type = 'video';
        s.rotatex = 0;
        s.rotatey = 0;
        let strTag = '';
        if (LGlobal.os === OS_IPHONE && LGlobal.iOSversion[0] >= 10) {
            s.sound = new LSound();
            strTag = ' muted playsinline ';
        }
        let div = document.createElement('div');
        div.id = 'div_video_' + s.objectIndex;
        div.innerHTML = '<video id="video_' + s.objectIndex + '" ' + strTag + ' style="opacity: 1;width:0px;height:0px;position:absolute;index-z:-999;">';
        document.body.appendChild(div);
        s.data = document.getElementById('video_' + s.objectIndex);
        s.data.loop = false;
        s.data.autoplay = false;
        if (u) {
            s.load(u);
        }
    }
	
    _ll_show(c) {
        let s = this;
        c.drawImage(s.data, s.x, s.y);
    }
    load(u) {
        let s = this;
        s.callParent('load', arguments);
        if (s.sound) {
            s.sound.load(u);
        }
    }
    play(c, l, to) {
        let s = this;
        s.callParent('play', arguments);
        if (s.sound) {
            s.sound.play(c, l, to);
        }
    }
    stop() {
        let s = this;
        s.callParent('stop', arguments);
        if (s.sound) {
            s.sound.stop();
        }
    }
    setVolume(v) {
        let s = this;
        if (s.sound) {
            s.sound.setVolume(v);
        } else {
            s.callParent('setVolume', arguments);
        }
    }
    getVolume() {
        let s = this;
        if (s.sound) {
            return s.sound.getVolume();
        } else {
            return s.callParent('getVolume', arguments);
        }
    }
    close() {
        let s = this;
        s.callParent('close', arguments);
        if (s.sound) {
            s.sound.close();
        }
    }
    die() {
        let s = this;
        document.body.removeChild(document.getElementById('div_video_' + s.objectIndex));
        delete s.data;
        delete s.sound;
    }
    getWidth() {
        return this.data.width;
    }
    getHeight() {
        return this.data.height;
    }
}
export default LVideo;