/** @language chinese
 * LURLLoader 类以文本、二进制数据或 URL 编码变量的形式从 URL 下载数据，LURLLoader 类读取文本数据时无法在本地环境下运行。
 * @class LURLLoader
 * @extends LEventDispatcher
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language english
 * The URLLoader class downloads data from a URL as text, binary data, or URL-encoded variables. When you download a text data, can not be run on the local environment.
 * @class LURLLoader
 * @extends LEventDispatcher
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * LURLLoader クラスは、指定した URL からテキスト、バイナリデータ、または URL エンコード形式の変数をダウンロードする際に使用します。テキストデーターをダウンロードする時、ローカル環境で実行できません。
 * @class LURLLoader
 * @extends LEventDispatcher
 * @constructor
 * @since 1.0.0
 * @public
 */
var LURLLoader = (function () {
	function LURLLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LURLLoader";
		s.loadtype = "";
		s.content = null;
		s.event = {};
	}
	LURLLoader.TYPE_TEXT = "text";
	LURLLoader.TYPE_JS = "js";
	/** @language chinese
	 * 从指定的 URL 发送和加载数据。
	 * @method load
	 * @param {String} url 所请求的 URL。
	 * @param {String} type 读取文件种类，目前支持"text","js"。
	 * @example
	 * 	LInit(1000/50,"legend",800,450,main);
	 * 	var loader;
	 * 	function main(){
	 * 		LGlobal.setDebug(true);
	 * 		loader = new LURLLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadTxt); 
	 * 		loader.load("test.txt", "text");
	 * 	}
	 * 	function loadTxt (event) {
	 * 		trace(loader.objectIndex == event.currentTarget.objectIndex);//true
	 * 		trace(event.currentTarget.data == event.target);//true
	 * 		trace("event.target = " + event.target);
	 * 	}
	 * @examplelink <p><a href="../../../api/LURLLoader/index.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language english
	 * Sends and loads data from the specified URL.
	 * @method load
	 * @param {String} url The URL to be requested.
	 * @param {String} type file type，Currently supports "text","js".
	 * @example
	 * 	LInit(1000/50,"legend",800,450,main);
	 * 	var loader;
	 * 	function main(){
	 * 		LGlobal.setDebug(true);
	 * 		loader = new LURLLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadTxt); 
	 * 		loader.load("test.txt", "text");
	 * 	}
	 * 	function loadTxt (event) {
	 * 		trace(loader.objectIndex == event.currentTarget.objectIndex);//true
	 * 		trace(event.currentTarget.data == event.target);//true
	 * 		trace("event.target = " + event.target);
	 * 	}
	 * @examplelink <p><a href="../../../api/LURLLoader/index.html" target="_blank">Try it »</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language japanese
	 * 指定された URL からデータを送信およびロードします。
	 * @method load
	 * @param {String} url リクエストされる URL です。
	 * @param {String} type ファイルのタイプです，今は"text","js"をサポートされています。
	 * @example
	 * 	LInit(1000/50,"legend",800,450,main);
	 * 	var loader;
	 * 	function main(){
	 * 		LGlobal.setDebug(true);
	 * 		loader = new LURLLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadTxt); 
	 * 		loader.load("test.txt", "text");
	 * 	}
	 * 	function loadTxt (event) {
	 * 		trace(loader.objectIndex == event.currentTarget.objectIndex);//true
	 * 		trace(event.currentTarget.data == event.target);//true
	 * 		trace("event.target = " + event.target);
	 * 	}
	 * @examplelink <p><a href="../../../api/LURLLoader/index.html" target="_blank">実際のサンプルを見る</a></p>
	 * @public
	 * @since 1.0.0
	 */
	LURLLoader.prototype.load = function (u, t) {
		var s = this, event, ext;
		if (!t) {
			ext = getExtension(u);
			if (ext == "txt") {
				t = LURLLoader.TYPE_TEXT;
			} else if (ext == "js") {
				t = LURLLoader.TYPE_JS;
			}
		}
		s.loadtype = t;
		if (t == LURLLoader.TYPE_TEXT) {
			LAjax.progress = function(e){
				var event = new LEvent(LEvent.PROGRESS);
				event.currentTarget = s;
				event.target = e.currentTarget;
				event.loaded = e.loaded;
				event.total = e.total;
				event.responseURL = e.responseURL;
				s.dispatchEvent(event);
			};
			LAjax.get(u, {}, function (data) {
				event = new LEvent(LEvent.COMPLETE);
				s.data = data;
				event.currentTarget = s;
				event.target = data;
				s.dispatchEvent(event);
				delete s.content;
				delete s.data;
			}, function(request){
				var event = new LEvent(LEvent.ERROR);
				event.currentTarget = s;
				event.target = request;
				event.responseURL = request.responseURL;
				s.dispatchEvent(event);
			});
		} else if (t == LURLLoader.TYPE_JS) {
			if(LGlobal.wx){
				setTimeout(function(){
					event = new LEvent(LEvent.COMPLETE);
					event.currentTarget = s;
					event.target = s;
					s.dispatchEvent(event);
					delete s.content;
				});
			}else{
				var script = document.createElement("script");
				script.onerror = function(e){
					var event = new LEvent(LEvent.ERROR);
					event.currentTarget = s;
					event.target = e.target;
					event.responseURL = u;
					s.dispatchEvent(event);
				};
				script.onload = function () {
					event = new LEvent(LEvent.COMPLETE);
					event.currentTarget = s;
					event.target = s;
					s.dispatchEvent(event);
					delete s.content;
				};
				script.src = u;
				script.type = "text/javascript";
				document.querySelector('head').appendChild(script);
			}
		}
	};
	return LURLLoader;
})();
/** @language chinese
 * js文件或者文本文件加载完成事件。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 * @since 1.0.0
 */
/** @language english
 * when the text file or js file is loaded.
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 * @since 1.0.0
 */
/** @language japanese
 * jsファイルまたはテキストファイルロード完了。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 * @since 1.0.0
 */
/** @language chinese
 * js文件或者文本文件加载进度事件。
 * <p><a href="LEvent.html#property_PROGRESS">LEvent.PROGRESS</a></p>
 * @event LEvent.PROGRESS
 * @since 1.10.1
 */
/** @language chinese
 * js文件或者文本文件加载异常事件。
 * <p><a href="LEvent.html#property_ERROR">LEvent.ERROR</a></p>
 * @event LEvent.ERROR
 * @since 1.10.1
 */
