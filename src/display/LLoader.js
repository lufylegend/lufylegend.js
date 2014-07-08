/** @language chinese
 * LLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。
 * @class LLoader
 * @extends LEventDispatcher
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language english
 * The LLoader class is used to load image (JPG, PNG, or GIF) files. Use the load() method to initiate loading.
 * @class LLoader
 * @extends LEventDispatcher
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * LLoader クラスは、イメージ（JPG、PNG、または GIF）ファイルを読み込むために使用します。読み込みを開始するには load() メソッドを使用します。
 * @class LLoader
 * @extends LEventDispatcher
 * @constructor
 * @since 1.0.0
 * @public
 */
var LLoader = (function () {
	function LLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LLoader";
	}
	/** @language chinese
	 * 将 JPEG、渐进式 JPEG、非动画 GIF 或 PNG 文件加载到此 LLoader 对象的子对象中。如果加载 GIF 动画文件，将仅显示第一帧。
	 * @method load
	 * @param {String} url 所请求的 URL。
	 * @param {String} type 读取文件种类，目前只支持"bitmapData"。
	 * @example
	 * 	LInit(1000/50,"legend",800,450,main);
	 * 	var loader;
	 * 	function main(){
	 * 		LGlobal.setDebug(true);
	 * 		loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("lufylegend.js.png", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		trace(loader.objectIndex == event.target.objectIndex);//true
	 * 		trace(event.target.content == event.currentTarget);//true
	 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LLoader/index.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language english
	 * Loads a JPEG, progressive JPEG, unanimated GIF, or PNG file into an object that is a child of this Loader object.
	 * @method load
	 * @param {String} url The URL to be requested.
	 * @param {String} type file type，Currently only supports "bitmapData"。
	 * @example
	 * 	LInit(1000/50,"legend",800,450,main);
	 * 	var loader;
	 * 	function main(){
	 * 		LGlobal.setDebug(true);
	 * 		loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("lufylegend.js.png", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		trace(loader.objectIndex == event.target.objectIndex);//true
	 * 		trace(event.target.content == event.currentTarget);//true
	 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LLoader/index.html" target="_blank">Try it »</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language japanese
	 * JPEG、プログレッシブ JPEG、非アニメーション GIF、または PNG ファイルを、この Loader オブジェクトの子であるオブジェクトにロードします。
	 * @method load
	 * @param {String} url リクエストされる URL です。
	 * @param {String} type ファイルのタイプです，今は"bitmapData"しかサポートされていません。
	 * @example
	 * 	LInit(1000/50,"legend",800,450,main);
	 * 	var loader;
	 * 	function main(){
	 * 		LGlobal.setDebug(true);
	 * 		loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("lufylegend.js.png", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		trace(loader.objectIndex == event.target.objectIndex);//true
	 * 		trace(event.target.content == event.currentTarget);//true
	 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LLoader/index.html" target="_blank">実際のサンプルを見る</a></p>
	 * @public
	 * @since 1.0.0
	 */
	LLoader.prototype.load = function (u, t) {
		var s = this;
		s.loadtype = t;
		if (!t || t == "bitmapData") {
			s.content = new Image();
			s.content.onload = function () {
				s.content.onload = null;
				var event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = s.content;
				s.dispatchEvent(event);
				delete s.content;
			};
			s.content.src = u; 
		}
	};
	return LLoader;
})();