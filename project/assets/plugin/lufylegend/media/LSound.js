import LWebAudio from './LWebAudio';
import LMedia from './LMedia';
import lufylegend from '../ll';
import { UNDEFINED } from '../utils/LConstant';
class LSoundMedia extends LMedia {
    constructor(u) {
        super(u);
        this.type = 'LSound';
        this._type = 'audio';
        try {
            this.data = new Audio();
        } catch (e) {
            console.warn('ReferenceError: Can\'t find variable: Audio');
            this.data = {};
        }
        this.data.loop = false;
        this.data.autoplay = false;
        if (u) {
            this.load(u);
        }
    }
}
class LSoundWebAudio extends LWebAudio {
    constructor(u) {
        super(u);
        this.type = 'LSound';
        this._type = 'audio';
        if (u) {
            this.load(u);
        }
    }
}
function _webAudioEnabled() {
    LWebAudio._context = null;
    let protocol = location.protocol;
    if (!lufylegend.LGlobal.wx && (protocol === 'http:' || protocol === 'https:')) {
        if (typeof AudioContext !== UNDEFINED) {
            try {
                LWebAudio._context = new AudioContext();
            } catch (e) {
            //
            }
        } else if (typeof webkitAudioContext !== UNDEFINED) {
            try {
                LWebAudio._context = new webkitAudioContext();
            } catch (e) {
            //
            }
        }
        if (LWebAudio._context) {
            return true;
        }
    }
    return false;
}
let LSound;
if (!lufylegend.LGlobal.wx && _webAudioEnabled()) {
    LSound = LSoundWebAudio;
} else {
    LSound = LSoundMedia;
}
LSound.TYPE_SOUND = 'sound';
LSound.webAudioEnabled = false;
LSound._waitSounds = [];
LSound.addWait = function(sound, path) {
    LSound._waitSounds.push({ sound: sound, path: path });
};
LSound.startLoad = function(sound) {
    if (LSound._waitSounds.length === 0) {
        return;
    }
    LSound._waitSounds.forEach(function(child) {
        child.sound.load(child.path);
    });
    LSound._waitSounds.length = 0;
};
LSound.Container = {
    ll_save: 0,
    time: 0,
    list: [],
    ll_show: function() {
        let c = LSound.Container;
        let t = (new Date()).getTime();
        c.time = t - (c.ll_save ? c.ll_save : t);
        c.ll_save = t;
        let l = c.list;
        for (let i = l.length - 1; i >= 0; i--) {
            if (l[i]) {
                l[i].ll_check();
            }
        }
    },
    add: function(obj) {
        if (LSound.Container.list.indexOf(obj) >= 0) {
            return;
        } 
        LSound.Container.list.push(obj);
    },
    remove: function(obj) {
        let l = LSound.Container.list;
        for (let i = l.length - 1; i >= 0; i--) {
            if (l[i].objectIndex === obj.objectIndex) {
                l.splice(i, 1);
                break;
            }
        }
    },
    stopOther: function(obj) {
        let l = LSound.Container.list;
        for (let i = l.length - 1; i >= 0; i--) {
            if (l[i].objectIndex !== obj.objectIndex) {
                l[i].stop();
            }
        }
    }
};
setTimeout(() => {
    lufylegend.LGlobal.childList.push(LSound.Container);
    if (LWebAudio._context) {
        LWebAudio.container.push(LWebAudio._context);
        LSound.webAudioEnabled = true;
    }
});
lufylegend.LSound = LSound;
export default LSound;