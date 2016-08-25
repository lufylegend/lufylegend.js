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
	function LLoadManage(){
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.llname="ll.file.";
		s.llload="ll.load.";
	}
	p = {
		/** @language chinese
		 * 从指定的 list 加载数据。
		 * @method load
		 * @param {Array} list 指定的需要加载数据的数组。
		 * <p>list元素的格式如下</p>
		 * <table>
		 * <tr><th>文件类型</th><th>格式</th></tr>
		 * <tr><td>js文件</td><td>{path:"./js/GameBody.js",type:"js"}。1.9.1以上版本，type可以省略。</td></tr>
		 * <tr><td>图片文件</td><td>{name:"testimg",path:"./images/testimg.png"}。</td></tr>
		 * <tr><td>图片文件</td><td>{name:"testimg",path:"./images/testimg.png",useXHR:true}</td></tr>
		 * <tr><td>文本文件</td><td>{name:"testfile",path:"./files/testfile.txt",type:"text"}。1.9.1以上版本，扩展名为"txt"的时候,type可以省略。</td></tr>
		 * <tr><td>音频文件（需要服务器支持）</td><td>{name:"testSound",path:"./sounds/testsound.wav",type:"sound"}。1.9.1以上版本，音频文件扩展名为"mp3", "ogg", "wav", "m4a"的时候，type可以省略。</td></tr>
		 * </table>
		 * @example
		 * 	var loadData = [
		 * 		{path:"./js/jsfile01.js",type:"js"},
		 * 		{path:"./js/jsfile02.js",type:"js"},
		 * 		{name:"img0",path:"./images/img0.png"},
		 * 		{name:"img1",path:"./images/img1.png"},
		 * 		{name:"myFont",path:"NotoSans.eot,NotoSans.ttf",type:"font"},
		 * 		{name:"text01",path:"./files/text01.txt",type:"text"},
		 * 		{name:"text02",path:"./files/text02.txt",type:"text"},
		 * 		{name:"sound01",path:"./sounds/sound01.wav",type:"sound"},
		 * 		{name:"sound02",path:"./sounds/sound02.wav",type:"sound"}
		 * 	];
		 * 	var loadingLayer; 
		 * 	var datalist=[]; 
		 * 	function main(){
		 * 		loadingLayer = new LoadingSample4(); 
		 * 		addChild(loadingLayer); 
		 * 		var loadManage = new LLoadManage();
		 * 		loadManage.addEventListener(LEvent.PROGRESS, progressFunc);
		 * 		loadManage.addEventListener(LEvent.ERROR, errorFunc);
		 * 		loadManage.addEventListener(LEvent.COMPLETE, completeFunc);
		 * 		loadManage.load(loadData);
		 * 	}
		 * 	function completeFunc (event) {
		 * 		datalist = event.target; 
		 * 		removeChild(loadingLayer); 
		 * 		loadingLayer = null; 
		 * 		//do something
		 * 		var bitmapData = new LBitmapData(datalist["img0"]);
		 * 		var txt = datalist["text01"];
		 * 		var sound = new LSound();
		 * 		sound.load(datalist["sound01"]);
		 * 		sound.play();
		 * 	}
		 * 	function progressFunc (event) {
		 * 		var progress = (event.loaded * 100 / event.total).toFixed(2);
		 * 		loadingLayer.setProgress(progress); 
		 * 	}
		 * 	function errorFunc (event) {
		 * 		trace("error url:" + event.responseURL);
		 * 	}
		 * @public
		 * @since 1.4.0
		 * @examplelink <p><a href="../../../api/LLoadManage/load.html" target="_blank">测试链接</a></p>
		 */
		load : function (l, u, c) {
			var s = this;
			if (!l || l.length == 0) {
				var event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = {};
				s.dispatchEvent(event);
				return;
			}
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
			d.progress = 0;
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
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(s.url(d.path), d["type"]);
				} else if (d["type"] == LSound.TYPE_SOUND) {
					s.loader = new LSound();
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(d.path);
				} else if (d["type"] == LFontLoader.TYPE_FONT) {
					s.loader = new LFontLoader();
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(d.path, d.name);
				} else {
					s.loader = new LLoader();
					s.loader.parent = s;
					s.loader.name = d.name;
					s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
					s.loader.addEventListener(LEvent.ERROR, s._loadError);
					s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
					s.loader.load(s.url(d.path), LLoader.TYPE_BITMAPDATE, d.useXHR);
				}
				s.loader._loadIndex = s.loadIndex;
			}
			s.loadIndex++;
			s.loadStart();
		},
		_loadProgress : function (e) {
			var loader = e.currentTarget;
			var s = loader.parent;
			d = s.list[loader._loadIndex];
			d.progress = e.loaded / e.total;
			var progress = 0;
			for(var i = 0, l=s.list.length;i<l;i++){
				progress += s.list[i].progress;
			}
			var event = new LEvent(LEvent.PROGRESS);
			event.currentTarget = s;
			event.target = e.currentTarget;
			event.loaded = progress;
			event.total = s.list.length;
			event.responseURL = e.responseURL;
			s.dispatchEvent(event);
		},
		_loadError : function (e) {
			var loader = e.currentTarget;
			var s = loader.parent;
			delete loader.parent;
			loader.removeEventListener(LEvent.ERROR, s._loadError);
			var event = new LEvent(LEvent.ERROR);
			event.currentTarget = s;
			event.target = e.target;
			event.responseURL = e.responseURL;
			s.dispatchEvent(event);
		},
		_loadComplete : function (e) {
			var s = e.currentTarget.parent;
			if(!s){
				return;
			}
			if (e  && e.currentTarget.name) {
				e.currentTarget.removeEventListener(LEvent.COMPLETE, s._loadComplete);
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
			e.loaded = e.total = 1;
			s._loadProgress(e);
			delete e.currentTarget.parent;
			if (s.index >= s.list.length) {
				if (s.reloadtime) {
					clearTimeout(s.reloadtime);
				}
				var event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = s.result;
				s.dispatchEvent(event);
				LGlobal.forceRefresh = true;
			}
		},
		url : function (u) {
			if (!LGlobal.traceDebug) {
				return u;
			}
			return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + (new Date()).getTime();
		}
	};
	for (var k in p) {
		LLoadManage.prototype[k] = p[k];
	}
	/** @language chinese
	 * 从指定的 list 加载数据。
	 * @method LLoadManage.load
	 * @param {Array} list 指定的需要加载数据的数组。
	 * <p>list元素的格式如下</p>
	 * <table>
	 * <tr><th>文件类型</th><th>格式</th></tr>
	 * <tr><td>js文件</td><td>{path:"./js/GameBody.js",type:"js"}。1.9.1以上版本，type可以省略。</td></tr>
	 * <tr><td>图片文件</td><td>{name:"testimg",path:"./images/testimg.png"}。</td></tr>
	 * <tr><td>图片文件</td><td>{name:"testimg",path:"./images/testimg.png",useXHR:true}</td></tr>
	 * <tr><td>文本文件</td><td>{name:"testfile",path:"./files/testfile.txt",type:"text"}。1.9.1以上版本，扩展名为"txt"的时候,type可以省略。</td></tr>
	 * <tr><td>音频文件（需要服务器支持）</td><td>{name:"testSound",path:"./sounds/testsound.wav",type:"sound"}。1.9.1以上版本，音频文件扩展名为"mp3", "ogg", "wav", "m4a"的时候，type可以省略。</td></tr>
	 * </table>
	 * @param {function} onUpdate 加载过程中调用的函数，一般用来显示游戏进度。
	 * @param {function} onComplete list中全部文件加载完成时调用此函数
	 * @example
	 * 	var loadData = [
	 * 		{path:"./js/jsfile01.js",type:"js"},
	 * 		{path:"./js/jsfile02.js",type:"js"},
	 * 		{name:"img0",path:"./images/img0.png"},
	 * 		{name:"img1",path:"./images/img1.png"},
	 * 		{name:"myFont",path:"NotoSans.eot,NotoSans.ttf",type:"font"},
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
	 * 			loadData, 
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
	 * 		var sound = new LSound();
	 * 		sound.load(datalist["sound01"]);
	 * 		sound.play();
	 * 	}
	 * @public
	 * @static
	 * @since 1.4.0
	 * @examplelink <p><a href="../../../api/LLoadManage/index.html" target="_blank">测试链接</a></p>
	 */
	/** @language english
	 * loads data from the specified list.
	 * @method LLoadManage.load
	 * @param {Array} list The list to be requested.
	 * <p>list's format is like this</p>
	 * <table>
	 * <tr><th>File Type</th><th>format</th></tr>
	 * <tr><td>js file</td><td>{path:"./js/GameBody.js",type:"js"}</td></tr>
	 * <tr><td>image file</td><td>{name:"testimg",path:"./images/testimg.png"}</td></tr>
	 * <tr><td>image file</td><td>{name:"testimg",path:"./images/testimg.png",useXHR:true}</td></tr>
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
	 * 		{name:"myFont",path:"NotoSans.eot,NotoSans.ttf",type:"font"},
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
	 * 			loadData, 
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
	 * 		var sound = new LSound();
	 * 		sound.load(datalist["sound01"]);
	 * 		sound.play();
	 * 	}
	 * @public
	 * @static
	 * @since 1.4.0
	 */
	/** @language japanese
	 * 指定された リスト からデータをロードします。
	 * @method LLoadManage.load
	 * @param {Array} list リクエストされる リスト です。
	 * <p>listは下記のように使わなければなりません</p>
	 * <table>
	 * <tr><th>ファイルタイプ</th><th>フォーマット</th></tr>
	 * <tr><td>jsファイル</td><td>{path:"./js/GameBody.js",type:"js"}</td></tr>
	 * <tr><td>画像ファイル</td><td>{name:"testimg",path:"./images/testimg.png"}</td></tr>
	 * <tr><td>画像ファイル</td><td>{name:"testimg",path:"./images/testimg.png",useXHR:true}</td></tr>
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
	 * 		{name:"myFont",path:"NotoSans.eot,NotoSans.ttf",type:"font"},
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
	 * 			loadData, 
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
	 * 		var sound = new LSound();
	 * 		sound.load(datalist["sound01"]);
	 * 		sound.play();
	 * 	}
	 * @public
	 * @static
	 * @since 1.4.0
	 */
	LLoadManage.load = function(l, u, c, e){
		var loadObj = new LLoadManage();
		if(u){
			loadObj.addEventListener(LEvent.PROGRESS, function(event){
				u((event.loaded * 100 / event.total).toFixed(2));
			});
		}
		if(c){
			loadObj.addEventListener(LEvent.COMPLETE, function(event){
				c(event.target);
			});
		}
		if(e){
			loadObj.addEventListener(LEvent.ERROR, e);
		}
		loadObj.load(l);
	};
	return LLoadManage;
})();