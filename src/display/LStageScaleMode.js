/** @language chinese
 * 一个 LStageScaleMode 类中指定要使用哪种缩放模式的值。
 * @class LStageScaleMode
 * @constructor
 * @example
 * 	LInit(50, "legend", 240, 240, main);
 * 	function main () {
 * 		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
 * 		LSystem.screen(LStage.FULL_SCREEN);
 * 		var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("face.jpg", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LStageScaleMode/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * A value from the LStageScaleMode class that specifies which scale mode to use. 
 * @class LStageScaleMode
 * @constructor
 * @example
 * 	LInit(50, "legend", 240, 240, main);
 * 	function main () {
 * 		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
 * 		LSystem.screen(LStage.FULL_SCREEN);
 * 		var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("face.jpg", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LStageScaleMode/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 使用する拡大 / 縮小モードを指定する LStageScaleMode クラスの値です。
 * @class LStageScaleMode
 * @constructor
 * @example
 * 	LInit(50, "legend", 240, 240, main);
 * 	function main () {
 * 		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
 * 		LSystem.screen(LStage.FULL_SCREEN);
 * 		var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("face.jpg", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LStageScaleMode/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
function LStageScaleMode () {throw "LStageScaleMode cannot be instantiated";}
/** @language chinese
 * [静态] 指定整个应用程序在指定区域中可见，但不尝试保持原始高宽比。
 * @property EXACT_FIT
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language english
 * [static] Specifies that the entire application be visible in the specified area without trying to preserve the original aspect ratio.
 * @property EXACT_FIT
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * [静的] 指定された領域内にアプリケーション全体が、元の縦横比を維持しないで表示されるよう指定します。
 * @property EXACT_FIT
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LStageScaleMode.EXACT_FIT = "exactFit";
/** @language chinese
 * [静态] 指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
 * @property SHOW_ALL
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language english
 * [static] Specifies that the entire application be visible in the specified area without distortion while maintaining the original aspect ratio of the application.
 * @property SHOW_ALL
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * [静的] 指定された領域内にアプリケーション全体が、アプリケーションの元の縦横比を維持したまま、歪まずに表示されるよう指定します。
 * @property SHOW_ALL
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LStageScaleMode.SHOW_ALL = "showAll";
/** @language chinese
 * [静态] 指定整个应用程序填满指定区域，不会发生扭曲，但有可能会进行一些裁切，同时保持应用程序的原始高宽比。
 * @property NO_BORDER
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language english
 * [static] Specifies that the entire application fill the specified area, without distortion but possibly with some cropping, while maintaining the original aspect ratio of the application.
 * @property NO_BORDER
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * [静的] 指定された領域いっぱいにアプリケーション全体が歪まずに表示されるように指定します。ただし、アプリケーションの元の縦横比を保つために、ある程度トリミングされることがあります。
 * @property NO_BORDER
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LStageScaleMode.NO_BORDER = "noBorder";
/** @language chinese
 * [静态] 指定应用程序的大小是固定的，因此，即使在更改播放器窗口大小时，它仍然保持不变。
 * @property NO_BORDER
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language english
 * [static] Specifies that the size of the application be fixed, so that it remains unchanged even as the size of the player window changes.
 * @property NO_BORDER
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * [静的] アプリケーションのサイズが固定され、Flash Player のウィンドウのサイズが変更された場合でも、サイズが維持されるように指定します。
 * @property NO_BORDER
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LStageScaleMode.NO_SCALE = "noScale";