/*
 * LMouseEvent.js
 **/
var LMouseEvent = function (){throw "LMouseEvent cannot be instantiated";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OUT = "mouseout";
LMouseEvent.DOUBLE_CLICK = "dblclick";

var LMultitouchInputMode = {"NONE":"none","GESTURE":"gesture","TOUCH_POINT":"touchPoint"};
var LMultitouch = function (){throw "LMultitouch cannot be instantiated";};
LMultitouch.inputMode = "none";
LMultitouch.touchs = [];
