var ll = (LGlobal && LGlobal.wx) ? window : {};
 //utils
ll.OS_PC = OS_PC;
ll.OS_IPHONE = OS_IPHONE;
ll.OS_IPOD = OS_IPOD;
ll.OS_IPAD = OS_IPAD;
ll.OS_ANDROID = OS_ANDROID;
ll.OS_WINDOWS_PHONE = OS_WINDOWS_PHONE;
ll.OS_BLACK_BERRY = OS_BLACK_BERRY;
ll.NONE = NONE;
ll.UNDEFINED = UNDEFINED;
ll.LANDSCAPE = LANDSCAPE;
ll.PORTRAIT = PORTRAIT;
ll.mouseX = mouseX;
ll.mouseY = mouseY;

ll.trace = trace;
ll.addChild = addChild;
ll.removeChild = removeChild;
ll.init = init;
ll.LInit = LInit;
ll.base = base;
ll.LExtends = LExtends;
ll.getTimer = getTimer;
ll.getExtension = getExtension;
ll.getTimer = getTimer;

ll.LStage = ll.LSystem = ll.LGlobal = LGlobal;
ll.LObject = LObject;
ll.LTimer = LTimer;

//events
ll.LAccelerometerEvent = LAccelerometerEvent;
ll.LEvent = LEvent;
ll.LEventDispatcher = LEventDispatcher;
ll.LFocusEvent = LFocusEvent;
ll.LKeyboardEvent = LKeyboardEvent;
ll.LMouseEvent = LMouseEvent;
ll.LMouseEventContainer = LMouseEventContainer;
ll.LTextEvent = LTextEvent;
ll.LTimerEvent = LTimerEvent;

//display
ll.FPS = FPS;
ll.LAnimation = LAnimation;
ll.LAnimationTimeline = LAnimationTimeline;
ll.LBitmap = LBitmap;
ll.LBitmapData = LBitmapData;
ll.LBlendMode = LBlendMode;
ll.LButton = LButton;
ll.LDisplayObject = LDisplayObject;
ll.LDisplayObjectContainer = LDisplayObjectContainer;
ll.LGraphics = LGraphics;
ll.LInteractiveObject = LInteractiveObject;
ll.LLoader = LLoader;
ll.LShape = LShape;
ll.LSprite = LSprite;
ll.LStageAlign = LStageAlign;
ll.LStageScaleMode = LStageScaleMode;

//filters
ll.LBitmapFilter = LBitmapFilter;
ll.LColorMatrixFilter = LColorMatrixFilter;
ll.LConvolutionFilter = LConvolutionFilter;
ll.LDropShadowFilter = LDropShadowFilter;

//geom
ll.LColorTransform = LColorTransform;
ll.LMatrix = LMatrix;
ll.LPoint = LPoint;
ll.LRectangle = LRectangle;
ll.LTransform = LTransform;
ll.LVec2 = LVec2;

//lib
if(typeof InteractivePNG != "undefined"){
    ll.InteractivePNG = InteractivePNG;
}
if(typeof LQuadTree != "undefined"){
    ll.LQuadTree = LQuadTree;
}
if(typeof LoadingSample1 != "undefined"){
    ll.LoadingSample1 = LoadingSample1;
    ll.LoadingSample2 = LoadingSample2;
    ll.LoadingSample3 = LoadingSample3;
    ll.LoadingSample4 = LoadingSample4;
    ll.LoadingSample5 = LoadingSample5;
    ll.LoadingSample6 = LoadingSample6;
    ll.LoadingSample7 = LoadingSample7;
    ll.LCheckBox = LCheckBox;
    ll.LComboBox = LComboBox;
    ll.LListView = LListView;
    ll.LMenubar = LMenubar;
    ll.LMessageBox = LMessageBox;
    ll.LPanel = LPanel;
    ll.LRadioChild = LRadioChild;
    ll.LRadio = LRadio;
    ll.LRange = LRange;
    ll.LScrollbar = LScrollbar;
    ll.LTable = LTable;
    ll.LTreeWidget = LTreeWidget;
    ll.LWindow = LWindow;
    ll.LString = LString;
    ll.LTransition = LTransition;
    ll.LIris = LIris;
    ll.LTransitionManager = LTransitionManager;
    ll.LFlash = LFlash;
    ll.LBox2d = LBox2d;
}

//media
ll.LMedia = LMedia;
ll.LSound = LSound;
ll.LWebAudio = LWebAudio;
ll.LStageWebView = LStageWebView;
ll.LVideo = LVideo;

//net
ll.LAjax = LAjax;
ll.LFontLoader = LFontLoader;
ll.LURLLoader = LURLLoader;

//system
ll.LLoadManage = LLoadManage;

//text
ll.LStyleSheet = LStyleSheet;
ll.LTextField = LTextField;
ll.LTextFieldType = LTextFieldType;
ll.LTextFormat = LTextFormat;

//transitions
ll.LEasing = LEasing;
ll.LTweenLite = LTweenLite;

//ui
ll.LMultitouch = LMultitouch;
ll.LMultitouchInputMode = LMultitouchInputMode;

var lufylegend = ll;