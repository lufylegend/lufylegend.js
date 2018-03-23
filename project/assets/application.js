
import LGlobal from './plugin/lufylegend/utils/LGlobal';
import { LInit } from './plugin/lufylegend/utils/Function';
import LStageScaleMode from './plugin/lufylegend/display/LStageScaleMode';
import LStageAlign from './plugin/lufylegend/display/LStageAlign';
import LAtlas from './plugin/lufylegend/system/LAtlas';
import LLoadManage from './plugin/lufylegend/system/LLoadManage';
import { gameInit } from './scripts/common';

LGlobal.width = 640;
LGlobal.height = LGlobal.width * window.innerHeight / window.innerWidth;

let loadData = [
    { name: '00001', type: LAtlas.TYPE_PLIST, path: './resources/atlas/characters' },
    { name: '00002', type: LAtlas.TYPE_PLIST, path: './resources/atlas/characters' }
];
LInit(50, 'legend', LGlobal.width, LGlobal.height, main);

function main() {
    LGlobal.align = LStageAlign.TOP_LEFT;
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    LGlobal.screen(LGlobal.FULL_SCREEN);
    LLoadManage.load(
        loadData,
        function(progress) {
        },
        function(result) {
            LGlobal.setDebug(true);
            gameInit();
        }
    );
}