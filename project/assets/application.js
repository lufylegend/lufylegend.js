
import BaseManager from './plugin/mvc/managers/BaseManager';
import LGlobal from './plugin/lufylegend/utils/LGlobal';
import { LInit } from './plugin/lufylegend/utils/Function';
import LAtlas from './plugin/lufylegend/system/LAtlas';
import LEvent from './plugin/lufylegend/events/LEvent';


LInit(50, 'legend', 800, 800, main);

function main() {
    /*
    let loader = new LLoader();
    loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
    loader.load('http://lufylegend.com/api/api/LBitmapData/face.jpg', 'bitmapData');
}

function loadBitmapdata(event) {
    window.bitmapData = new LBitmapData(event.target);*/
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