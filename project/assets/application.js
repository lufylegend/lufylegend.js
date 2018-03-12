
import BaseManager from './scripts/core/managers/BaseManager';
import LGlobal from './scripts/lufylegend/utils/LGlobal';
import LLoader from './scripts/lufylegend/display/LLoader';
import LBitmapData from './scripts/lufylegend/display/LBitmapData';
import LBitmap from './scripts/lufylegend/display/LBitmap';
import LSprite from './scripts/lufylegend/display/LSprite';
import LAtlas from './scripts/core/prefabs/LAtlas';
import { LInit, addChild } from './scripts/lufylegend/utils/Function';
import LEvent from './scripts/lufylegend/events/LEvent';
import LMouseEvent from './scripts/lufylegend/events/LMouseEvent';
import LRectangle from './scripts/lufylegend/geom/LRectangle';
import LPoint from './scripts/lufylegend/geom/LPoint';
import LTweenLite from './scripts/lufylegend/transitions/LTweenLite';
import LEasing from './scripts/lufylegend/transitions/LEasing';
import LogoController from './scripts/controllers/LogoController';
import BindSpriteView from './scripts/core/views/BindSpriteView';
import BindTextView from './scripts/core/views/BindTextView';
import BindListView from './scripts/core/views/BindListView';
import BindListChildView from './scripts/core/views/BindListChildView';
//import BindListChildView from './scripts/core/views/BindListChildView';
LInit(50, 'legend', 800, 800, main);

function main() {

    let loader = new LLoader();
    loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
    loader.load('http://lufylegend.com/api/api/LBitmapData/face.jpg', 'bitmapData');
}

function loadBitmapdata(event) {
    window.bitmapData = new LBitmapData(event.target);
    /*let bitmapData2 = new LBitmapData(null, 0, 0, 240, 240, LBitmapData.DATA_CANVAS);
    bitmapData2.copyPixels(bitmapData, new LRectangle(0, 0, 240, 240), new LPoint(0, 0));
    bitmapData2.copyPixels(bitmapData, new LRectangle(50, 50, 100, 100), new LPoint(0, 50));
    bitmapData2.copyPixels(bitmapData, new LRectangle(100, 50, 100, 100), new LPoint(50, 150));

    let bitmap = new LBitmap(bitmapData);
    addChild(bitmap);

    let bitmap2 = new LBitmap(bitmapData2);
    bitmap2.y = 250;
    addChild(bitmap2);*/
    LGlobal.debug = true;
    let atlas = new LAtlas();
    atlas.addEventListener(LEvent.COMPLETE, () => {
        BaseManager.showDialog('Logo');
    });
    atlas.load('resources/atlas', 'Card');
}
/*
function main() {
    LGlobal.debug = true;
    let atlas = new LAtlas();
    atlas.addEventListener(LEvent.COMPLETE, () => {
        BaseManager.showDialog('Logo');
    });
    atlas.load('resources/atlas', 'Card');
}*/