
import BaseManager from './plugin/mvc/managers/BaseManager';
import LGlobal from './plugin/lufylegend/utils/LGlobal';
import { LInit } from './plugin/lufylegend/utils/Function';
import LStageScaleMode from './plugin/lufylegend/display/LStageScaleMode';
import LStageAlign from './plugin/lufylegend/display/LStageAlign';

LGlobal.width = 640;
LGlobal.height = LGlobal.width * window.innerHeight / window.innerWidth;

LInit(50, 'legend', LGlobal.width, LGlobal.height, main);

function main() {
    LGlobal.align = LStageAlign.TOP_LEFT;
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    LGlobal.screen(LGlobal.FULL_SCREEN);
    LGlobal.debug = true;
    BaseManager.loadScene('prefabs/Scene/Top');
}