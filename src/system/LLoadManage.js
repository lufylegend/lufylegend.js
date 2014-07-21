/** @language chinese
 * LLoadManage类是可以用来同时读取图片，文本以及js多种类型的文件。
 * @class LLoadManage	
 * @constructor
 * @since 1.4.0
 * @public
 */
/** @language english
 * LLoadManage class can be used to simultaneously read multiple types of images files, text files and js files.
 * @class LLoadManage
 * @constructor
 * @since 1.4.0
 * @public
 */
/** @language japanese
 * LLoadManageクラスは同時的に画像ファイル、テキストファイル、jsファイルを読み込むことができます。
 * @class LLoadManage
 * @constructor
 * @since 1.4.0
 * @public
 */
var LLoadManage = (function () {
	function LoadManage(){
		this.llname="ll.file.";
		this.llload="ll.load.";
	}
	LoadManage.prototype = {
		/** @language chinese
		 * 从指定的 list 加载数据。
		 * @method load
		 * @param {Array} list 指定的需要加载数据的数组。
		 * <p>list元素的格式如下</p>
		 * <table>
		 * <tr><th>文件类型</th><th>格式</th></tr>
		 * <tr><td>js文件</td><td>{path:"./js/GameBody.js",type:"js"}</td></tr>
		 * <tr><td>图片文件</td><td>{name:"testimg",path:"./images/testimg.png"}</td></tr>
		 * <tr><td>文本文件</td><td>{name:"testfile",path:"./files/testfile.txt",type:"text"}</td></tr>
		 * <tr><td>音频文件（需要服务器支持）</td><td>{name:"testSound",path:"./sounds/testsound.wav",type:"sound"}</td></tr>
		 * </table>
		 * @param {function} onUpdate 加载过程中调用的函数，一般用来显示游戏进度。
		 * @param {function} onComplete list中全部文件加载完成时调用此函数
		 * @example
		 * 	var loadData = [
		 * 		{path:"./js/jsfile01.js",type:"js"},
		 * 		{path:"./js/jsfile02.js",type:"js"},
		 * 		{name:"img0",path:"./images/img0.png"},
		 * 		{name:"img1",path:"./images/img1.png"},
		 * 		{name:"text01",path:"./files/text01.txt",type:"text"},
		 * 		{name:"text02",path:"./files/text02.txt",type:"text"},
		 * 		{name:"sound01",path:"./sounds/sound01.wav",type:"sound"},
		 * 		{name:"sound02",path:"./sounds/sound02.wav",type:"sound"}
		 * 	];
		 * 	var loadingLayer; 
		 * 	var datalist=[]; 
		 * 	function main(){
		 * 		loadingLayer = new LoadingSample1(); 
		 * 		addChild(loadingLayer); 
		 * 		LLoadManage.load( 
		 * 			imgData, 
		 * 			function(progress){ 
		 * 			    loadingLayer.setProgress(progress); 
		 * 			 }, 
		 * 			gameInit
		 * 		);
		 * 	}
		 * 	function gameInit (result) {
		 * 		datalist = result; 
		 * 		removeChild(loadingLayer); 
		 * 		loadingLayer = null; 
		 * 		//do something
		 * 		var bitmapData = new LBitmapData(datalist["img0"]);
		 * 		var txt = datalist["text01"];
		 * 	}
		 * @public
		 * @since 1.4.0
		 */
		/** @language english
		 * loads data from the specified list.
		 * @method load
		 * @param {Array} list The list to be requested.
		 * <p>list's format is like this</p>
		 * <table>
		 * <tr><th>File Type</th><th>format</th></tr>
		 * <tr><td>js file</td><td>{path:"./js/GameBody.js",type:"js"}</td></tr>
		 * <tr><td>image file</td><td>{name:"testimg",path:"./images/testimg.png"}</td></tr>
		 * <tr><td>text file</td><td>{name:"testfile",path:"./images/testfile.txt",type:"text"}</td></tr>
		 * <tr><td>sound file（need web server）</td><td>{name:"testSound",path:"./sounds/testsound.wav",type:"sound"}</td></tr>
		 * </table>
		 * @param {function} onUpdate This function is called in the loading process
		 * @param {function} onComplete This function is called when the all files is loaded
		 * @example
		 * 	var loadData = [
		 * 		{path:"./js/jsfile01.js",type:"js"},
		 * 		{path:"./js/jsfile02.js",type:"js"},
		 * 		{name:"img0",path:"./images/img0.png"},
		 * 		{name:"img1",path:"./images/img1.png"},
		 * 		{name:"text01",path:"./files/text01.txt",type:"text"},
		 * 		{name:"text02",path:"./files/text02.txt",type:"text"},
		 * 		{name:"sound01",path:"./sounds/sound01.wav",type:"sound"},
		 * 		{name:"sound02",path:"./sounds/sound02.wav",type:"sound"}
		 * 	];
		 * 	var loadingLayer; 
		 * 	var datalist=[]; 
		 * 	function main(){
		 * 		loadingLayer = new LoadingSample1(); 
		 * 		addChild(loadingLayer); 
		 * 		LLoadManage.load( 
		 * 			imgData, 
		 * 			function(progress){ 
		 * 			    loadingLayer.setProgress(progress); 
		 * 			 }, 
		 * 			gameInit
		 * 		);
		 * 	}
		 * 	function gameInit (result) {
		 * 		datalist = result; 
		 * 		removeChild(loadingLayer); 
		 * 		loadingLayer = null; 
		 * 		//do something
		 * 		var bitmapData = new LBitmapData(datalist["img0"]);
		 * 		var txt = datalist["text01"];
		 * 	}
		 * @public
		 * @since 1.4.0
		 */
		/** @language japanese
		 * 指定された リスト からデータをロードします。
		 * @method load
		 * @param {Array} list リクエストされる リスト です。
		 * <p>listは下記のように使わなければなりません</p>
		 * <table>
		 * <tr><th>ファイルタイプ</th><th>フォーマット</th></tr>
		 * <tr><td>jsファイル</td><td>{path:"./js/GameBody.js",type:"js"}</td></tr>
		 * <tr><td>画像ファイル</td><td>{name:"testimg",path:"./images/testimg.png"}</td></tr>
		 * <tr><td>テキストファイル</td><td>{name:"testfile",path:"./images/testfile.txt",type:"text"}</td></tr>
		 * <tr><td>音声ファイル（サーバーが必要になります）</td><td>{name:"testSound",path:"./sounds/testsound.wav",type:"sound"}</td></tr>
		 * </table>
		 * @param {function} onUpdate ロード中、この関数を呼び出す。
		 * @param {function} onComplete 全てのファイルがロード終わったら、この関数を呼び出す。
		 * @example
		 * 	var loadData = [
		 * 		{path:"./js/jsfile01.js",type:"js"},
		 * 		{path:"./js/jsfile02.js",type:"js"},
		 * 		{name:"img0",path:"./images/img0.png"},
		 * 		{name:"img1",path:"./images/img1.png"},
		 * 		{name:"text01",path:"./files/text01.txt",type:"text"},
		 * 		{name:"text02",path:"./files/text02.txt",type:"text"},
		 * 		{name:"sound01",path:"./sounds/sound01.wav",type:"sound"},
		 * 		{name:"sound02",path:"./sounds/sound02.wav",type:"sound"}
		 * 	];
		 * 	var loadingLayer; 
		 * 	var datalist=[]; 
		 * 	function main(){
		 * 		loadingLayer = new LoadingSample1(); 
		 * 		addChild(loadingLayer); 
		 * 		LLoadManage.load( 
		 * 			imgData, 
		 * 			function(progress){ 
		 * 			    loadingLayer.setProgress(progress); 
		 * 			 }, 
		 * 			gameInit
		 * 		);
		 * 	}
		 * 	function gameInit (result) {
		 * 		datalist = result; 
		 * 		removeChild(loadingLayer); 
		 * 		loadingLayer = null; 
		 * 		//do something
		 * 		var bitmapData = new LBitmapData(datalist["img0"]);
		 * 		var txt = datalist["text01"];
		 * 	}
		 * @public
		 * @since 1.4.0
		 */
		load : function (l, u, c) {
			var s = this;
			s.list = l, s.onupdate = u, s.oncomplete = c;
			s.loader = s, s.index = 0, s.loadIndex = 0, s.result = [], s.lresult = [];
			s.loadInit();
		},
		loadInit : function () {
			var s = this;
			if(s.index >= s.list.length){
				return;
			}
			s.loadIndex = 0;
			s.loadStart();
			s.reloadtime = setTimeout(s.loadInit.bind(s), 10000);
		},
		loadStart : function () {
			var s = this, d, ph, phs, ext;
			if (s.loadIndex >= s.list.length) {
				return;
			}
			d = s.list[s.loadIndex];
			if (!d.name) {
				d.name = s.llname + s.loadIndex;
			}
			if (!s.lresult[s.llload + d.name]) {
				if (!d["type"]) {
					ext = getExtension(d.path);
					if (ext == "txt") {
						d["type"] = LURLLoader.TYPE_TEXT;
					} else if (ext == "js") {
						d["type"] = LURLLoader.TYPE_JS;
					} else if ((new Array("mp3", "ogg", "wav", "m4a")).indexOf(ext) >= 0) {
						d["type"] = LSound.TYPE_SOUND;
					}
				}
				if (d["type"] == LURLLoader.TYPE_TEXT || d["type"] == LURLLoader.TYPE_JS) {
					s.loader = new LURLLoader();
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.COMPLETE, s.loadComplete.bind(s));
					s.loader.load(s.url(d.path), d["type"]);
				} else if (d["type"] == LSound.TYPE_SOUND) {
					s.loader = new LSound();
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.COMPLETE, s.loadComplete.bind(s));
					s.loader.load(s.url(d.path));
				} else {
					s.loader = new LLoader();
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.COMPLETE, s.loadComplete.bind(s));
					s.loader.load(s.url(d.path), LLoader.TYPE_BITMAPDATE);
				}
			}
			s.loadIndex++;
			s.loadStart();
		},
		loadComplete : function (e) {
			var s = this;
			if (e  && e.currentTarget && e.currentTarget.name) {
				e.currentTarget.removeEventListener(LEvent.COMPLETE, s.loadComplete);
				if (e.currentTarget.name.indexOf(s.llname) >= 0) {
					e.target = 1;
				}
				if (s.lresult[s.llload + e.currentTarget.name]) {
					return;
				}
				s.result[e.currentTarget.name] = e.target;
				s.lresult[s.llload + e.currentTarget.name] = 1;
			}
			s.index++;
			if (s.onupdate) {
				s.onupdate(Math.floor(s.index * 100 / s.list.length));
			}
			if (s.index >= s.list.length) {
				if (s.reloadtime) {
					clearTimeout(s.reloadtime);
				}
				s.loader = null;
				var r = s.result;
				s.oncomplete(r);
			}
		},
		url : function (u) {
			if (!LGlobal.traceDebug) {
				return u;
			}
			return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + (new Date()).getTime();
		}
	};
	return new LoadManage();
})();