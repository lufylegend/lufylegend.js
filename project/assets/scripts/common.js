import { addChild } from '../plugin/lufylegend/utils/Function';

import LTextField from '../plugin/lufylegend/text/LTextField';
import LAnimationAtlasSprite from '../plugin/lufylegend/display/LAnimationAtlasSprite';

export function gameInit() {
    LAnimationAtlasSprite;
    let textField = new LTextField();
    textField.text = 'es6 demo';
    textField.x = 100;
    textField.y = 10;
    addChild(textField);
    let list = [
        [
            { atlas: 'atlas/characters/00001', sprite: 'move_down_0', x: 0, y: 0, width: 64, height: 64 },
            { atlas: 'atlas/characters/00001', sprite: 'move_down_1', x: 0, y: 0, width: 64, height: 64 },
            { atlas: 'atlas/characters/00001', sprite: 'move_down_2', x: 0, y: 0, width: 64, height: 64 },
            { atlas: 'atlas/characters/00001', sprite: 'move_down_3', x: 0, y: 0, width: 64, height: 64 },
            { atlas: 'atlas/characters/00001', sprite: 'move_down_4', x: 0, y: 0, width: 64, height: 64 },
            { atlas: 'atlas/characters/00001', sprite: 'move_down_5', x: 0, y: 0, width: 64, height: 64 },
            { atlas: 'atlas/characters/00001', sprite: 'move_down_6', x: 0, y: 0, width: 64, height: 64 },
            { atlas: 'atlas/characters/00001', sprite: 'move_down_7', x: 0, y: 0, width: 64, height: 64 }//, label, isMirror
        ]
    ];
    let animation = new LAnimationAtlasSprite(list);
    animation.x = 100;
    animation.y = 100;
    addChild(animation);
}