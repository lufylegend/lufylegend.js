
import BaseManager from './plugin/mvc/managers/BaseManager';
import LGlobal from './plugin/lufylegend/utils/LGlobal';
import { LInit } from './plugin/lufylegend/utils/Function';

LInit(50, 'legend', 480, 800, main);

function main() {
    LGlobal.debug = true;
    BaseManager.showDialog('prefabs/Logo');
}