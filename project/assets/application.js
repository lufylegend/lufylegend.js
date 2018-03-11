
import BaseManager from './scripts/core/managers/BaseManager';
import LGlobal from './scripts/lufylegend/utils/LGlobal';
import LAtlas from './scripts/core/prefabs/LAtlas';
import { LInit } from './scripts/lufylegend/utils/Function';
import LEvent from './scripts/lufylegend/events/LEvent';
import LogoController from './scripts/controllers/LogoController';
import BindSpriteView from './scripts/core/views/BindSpriteView';
import BindTextView from './scripts/core/views/BindTextView';
import BindListView from './scripts/core/views/BindListView';
import BindListChildView from './scripts/core/views/BindListChildView';
//import BindListChildView from './scripts/core/views/BindListChildView';
LInit(50, 'legend', 800, 800, main);
function main() {
    LGlobal.debug = true;
    let atlas = new LAtlas();
    atlas.addEventListener(LEvent.COMPLETE, () => {
        BaseManager.showDialog('Logo');
    });
    atlas.load('resources/atlas', 'Card');
}