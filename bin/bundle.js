const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const baseDir = path.resolve(__dirname, '../src');


function getCombinedCode(files) {
  let combinedCode = '';
  for (const relativePath of files) {
    const filePath = path.join(baseDir, relativePath);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ 文件不存在: ${relativePath}`);
      continue;
    }
    const code = fs.readFileSync(filePath, 'utf-8');
    combinedCode += `\n// ${relativePath}\n` + code + '\n';
  }
  return combinedCode;
}
const version = "2.0.0.beta5";
const uiVersion = "0.18.0";
const ex = `/**
* lufylegend
* @version ".$v."
* @Explain lufylegend是一个HTML5开源引擎，利用它可以快速方便的进行HTML5的开发
* @author lufy(lufy_legend)
* @blog http://blog.csdn.net/lufy_Legend
* @email lufy.legend@gmail.com
* @homepage http://lufylegend.com/lufylegend
* @github https://github.com/lufylegend/lufylegend.js
*/
`;
const fullFiles = [
  "utils/LConstant.js",
  "events/LEvent.js",
  "events/LMouseEvent.js",
  "ui/LMultitouchInputMode.js",
  "ui/LMultitouch.js",
  "events/LTimerEvent.js",
  "events/LTextEvent.js",
  "events/LFocusEvent.js",
  "events/LMouseEventContainer.js",
  "events/LKeyboardEvent.js",
  "events/LAccelerometerEvent.js",
  "display/LStageAlign.js",
  "display/LStageScaleMode.js",
  "utils/LGlobal.js",
  "utils/Function.js",
  "utils/LObject.js",
  "utils/LTimer.js",
  "geom/LColorTransform.js",
  "geom/LTransform.js",
  "geom/LMatrix.js",
  "geom/LVec2.js",
  "events/LEventDispatcher.js",
  "display/LDisplayObject.js",
  "display/LInteractiveObject.js",
  "display/LDisplayObjectContainer.js",
  "display/LLoader.js",
  "net/LURLLoader.js",
  "net/LFontLoader.js",
  "media/LWebAudio.js",
  "media/LMedia.js",
  "media/LSound.js",
  "media/LVideo.js",
  "geom/LPoint.js",
  "geom/LRectangle.js",
  "display/LGraphics.js",
  "display/LShape.js",
  "display/LSprite.js",
  "display/LAtlasSprite.js",
  "display/LButton.js",
  "display/LBlendMode.js",
  "text/LTextFieldType.js",
  "text/LStyleSheet.js",
  "text/LTextFormat.js",
  "text/LTextField.js",
  "display/LBitmap.js",
  "display/LBitmapData.js",
  "filters/LBitmapFilter.js",
  "filters/LDropShadowFilter.js",
  "filters/LColorMatrixFilter.js",
  "filters/LConvolutionFilter.js",
  "display/LAnimation.js",
  "display/LAnimationTimeline.js",
  "system/LSpriteAtlasType.js",
  "system/LAtlas.js",
  "system/LLoadManage.js",
  "transitions/LEasing.js",
  "transitions/LTweenLite.js",
  "net/WxLocalRequest.js",
  "net/LAjax.js",
  "media/LStageWebView.js",
  "display/FPS.js",
  "lib/LQuadTree-0.1.1.js",
  "lib/LoadingSample1-0.1.1.js",
  "lib/LoadingSample2-0.1.0.js",
  "lib/LoadingSample3-0.1.0.js",
  "lib/LoadingSample4-0.1.0.js",
  "lib/LoadingSample5-0.1.0.js",
  "lib/LoadingSample6-0.1.1.js",
  "lib/LoadingSample7-0.1.0.js",
  "lib/LBox2d-0.4.0.js",
  "lib/LTransitionManager-0.1.1.js",
  "lib/LFlash-0.1.0.js",
  "lib/LString-0.1.0.js"
];
const simpleFiles = [
  "utils/LConstant.js"
  , "events/LEvent.js"
  , "events/LMouseEvent.js"
  , "ui/LMultitouchInputMode.js"
  , "ui/LMultitouch.js"
  , "events/LTimerEvent.js"
  , "events/LTextEvent.js"
  , "events/LFocusEvent.js"
  , "events/LMouseEventContainer.js"
  , "events/LKeyboardEvent.js"
  , "events/LAccelerometerEvent.js"
  , "display/LStageAlign.js"
  , "display/LStageScaleMode.js"
  , "utils/LGlobal.js"
  , "utils/Function.js"
  , "utils/LObject.js"
  , "utils/LTimer.js"
  , "geom/LColorTransform.js"
  , "geom/LTransform.js"
  , "geom/LMatrix.js"
  , "geom/LVec2.js"
  , "events/LEventDispatcher.js"
  , "display/LDisplayObject.js"
  , "display/LInteractiveObject.js"
  , "display/LDisplayObjectContainer.js"
  , "display/LLoader.js"
  , "net/LURLLoader.js"
  , "net/LFontLoader.js"
  , "media/LWebAudio.js"
  , "media/LMedia.js"
  , "media/LSound.js"
  , "media/LVideo.js"
  , "geom/LPoint.js"
  , "geom/LRectangle.js"
  , "display/LGraphics.js"
  , "display/LShape.js"
  , "display/LSprite.js"
  , "display/LAtlasSprite.js"
  , "display/LButton.js"
  , "display/LBlendMode.js"
  , "text/LTextFieldType.js"
  , "text/LStyleSheet.js"
  , "text/LTextFormat.js"
  , "text/LTextField.js"
  , "display/LBitmap.js"
  , "display/LBitmapData.js"
  , "filters/LBitmapFilter.js"
  , "filters/LDropShadowFilter.js"
  , "filters/LColorMatrixFilter.js"
  , "filters/LConvolutionFilter.js"
  , "display/LAnimation.js"
  , "display/LAnimationTimeline.js"
  , "system/LSpriteAtlasType.js"
  , "system/LAtlas.js"
  , "system/LLoadManage.js"
  , "transitions/LEasing.js"
  , "transitions/LTweenLite.js"
  , "net/WxLocalRequest.js"
  , "net/LAjax.js"
  , "media/LStageWebView.js"
  , "display/FPS.js"
];
const uiFiles = [
  "lib/ui/LButtonSample-0.1.0.js"
  , "lib/ui/LCheckBox-0.1.1.js"
  , "lib/ui/LComboBox-0.1.3.js"
  , "lib/ui/LMenubar-0.1.1.js"
  , "lib/ui/LMessageBox-0.1.1.js"
  , "lib/ui/LPanel-0.1.2.js"
  , "lib/ui/LRadio-0.1.1.js"
  , "lib/ui/LRange-0.1.1.js"
  , "lib/ui/LScrollbar-0.1.4.js"
  , "lib/ui/LWindow-0.1.2.js"
  , "lib/ui/LTable-0.1.0.js"
  , "lib/ui/LTreeWidget-0.1.0.js"
  , "lib/ui/LListView-0.1.3.js"
];
const libFiles = [
  "lib/LQuadTree-0.1.1"
  , "lib/LTransitionManager-0.1.1"
  , "lib/LBox2d-0.4.0"
  , "lib/LoadingSample1-0.1.1"
  , "lib/LoadingSample2-0.1.0"
  , "lib/LoadingSample3-0.1.0"
  , "lib/LoadingSample4-0.1.0"
  , "lib/LoadingSample5-0.1.0"
  , "lib/LoadingSample6-0.1.1"
  , "lib/LoadingSample7-0.1.0"
  , "lib/LFlash-0.1.0"
  , "lib/LString-0.1.0"
  , "lib/LEvent.added-0.1.2"
  , "lib/InteractivePNG-0.1.1"
];

const fullCombinedCode = getCombinedCode(fullFiles);
const simpleCombinedCode = getCombinedCode(simpleFiles);
const uiCombinedCode = getCombinedCode(uiFiles);
const fullName = `lufylegend-${version}.js`;
const fullMinName = `lufylegend-${version}.min.js`;
const simpleName = `lufylegend-${version}.simple.js`;
const simpleMinName = `lufylegend-${version}.simple.min.js`;
const uiMinName = `lib/lufylegend.ui-${uiVersion}.min.js`;
function removeCommentsAndExtraLines(code) {
  return code
    .replace(/\/\/.*(?=[\n\r])/g, '')       // 去掉单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '')       // 去掉多行注释
    .split('\n')                            // 按行分割
    .map(line => line.trimEnd())           // 清理行尾空格
    .filter(line => line.trim() !== '')     // 去掉空行
    .join('\n');                            // 重新拼接
}
fs.writeFileSync(fullName, removeCommentsAndExtraLines(fullCombinedCode), 'utf-8');
minify(fullCombinedCode, {
  compress: true,
  mangle: false
}).then(result => {
  fs.writeFileSync(fullMinName, result.code, 'utf-8');
  console.log(`打包完成: ${fullMinName}`);
  fs.writeFileSync(simpleName, removeCommentsAndExtraLines(simpleCombinedCode), 'utf-8');
  return minify(simpleCombinedCode, {
    compress: true,
    mangle: false
  });
}).then(result => {
  fs.writeFileSync(simpleMinName, result.code, 'utf-8');
  console.log(`打包完成: ${simpleMinName}`);
  return minify(uiCombinedCode, {
    compress: true,
    mangle: false
  });
}).then(result => {
  fs.writeFileSync(uiMinName, result.code, 'utf-8');
  console.log(`打包完成: ${uiMinName}`);
}).catch(err => {
  console.error('打包失败:', err);
});
