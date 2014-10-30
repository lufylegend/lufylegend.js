/** @language chinese
 * <p>此类创建和播放音频的 LSound 对象。</p>
 * <p>当浏览器不支持Web Audio Api或者设置LGlobal.webAudio = false的时候，LSound会自动继承LMedia对象。</p>
 * <p>当LSound继承LMedia的时候，IOS浏览器下加载音频需要在点击事件中进行，并且同一时间只能播放一个音频文件。</p>
 * @class LSound(LMedia)
 * @extends LMedia
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function loadOver (e) {
 * 		sound.play();
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LMedia.html" target="_blank">测试链接</a></p>
 * @since 1.7.0
 * @public
 */
/** @language english
 * <p>This class creates a LSound object.</p>
 * <p>When the browser does not support Web Audio Api or set LGlobal.webAudio = false, LSound will automatically inherit LMedia object.</p>
 * <p>When LSound inherited LMedia, if use the ios browser,must loading audio files in the click event, and only allow one audio file to play at a time.</p>
 * @class LSound(LMedia)
 * @extends LMedia
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function loadOver (e) {
 * 		sound.play();
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LMedia.html" target="_blank">Try it »</a></p>
 * @since 1.7.0
 * @public
 */
/** @language japanese
 * <p>このクラスは、サーバーまたはローカルに保存された録音済みビデオファイルを再生する LSound オブジェクト。</p>
 * <p>使っているブラウザはWeb Audio ApiにサポートされないまたはLGlobal.webAudio = falseを設定した場合、LSoundはLMediaを継承します。</p>
 * <p>LSoundはLMediaを継承した場合、IOSブラウザを使ったら、音声ファイルのロードはクリックイベントの中にしか実行できません，そして同じタイミングは一つの音声ファイルしか再生できません。</p>
 * @class LSound(LMedia)
 * @extends LMedia
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function loadOver (e) {
 * 		sound.play();
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LMedia.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.7.0
 * @public
 */
/** @language chinese
 * <p>当前浏览器是否支持Web Audio。</p>
 * @property LSound.webAudioEnabled
 * @type Boolean
 * @static
 * @since 1.9.0
 * @public
 */
/** @language english
 * <p>The browser supports the Web Audio.</p>
 * @property LSound.webAudioEnabled
 * @type Boolean
 * @static
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * <p>現在のブラウザはWeb audioサポートされているかどうか。</p>
 * @property LSound.webAudioEnabled
 * @type Boolean
 * @static
 * @since 1.9.0
 * @public
 */
/*LSound.webAudioEnabled = false;*/

/** @language chinese
 * <p>此类创建和播放音频的 LSound 对象。</p>
 * <p>当浏览器支持Web Audio Api并且设置LGlobal.webAudio = true(默认值是true)的时候，LSound会自动继承LWebAudio对象。</p>
 * <p>当LSound继承LWebAudio的时候，IOS浏览器下可以预先加载音频文件，但是播放音频必须在点击事件中进行。</p>
 * <p>当LSound继承LWebAudio的时候，IOS浏览器下可以同时播放多个音频文件，但是有上线，IOS浏览器的播放上限大约为4个。</p>
 * @class LSound(LWebAudio)
 * @extends LWebAudio
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		sound.play();
 * 	}
 * 	function loadOver (e) {
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LWebAudio.html" target="_blank">测试链接</a></p>
 * @since 1.9.0
 * @public
 */
/** @language english
 * <p>This class creates a LSound object.</p>
 * <p>When the browser does support Web Audio Api and set LGlobal.webAudio = true(default is true), LSound will automatically inherit LWebAudio object.</p>
 * <p>When LSound inherited LWebAudio, the audio files can be loaded without the click event, but playing audio must in clicke event.</p>
 * <p>When LSound inherited LWebAudio, allow multiple audio files to play at a time.</p>
 * @class LSound(LWebAudio)
 * @extends LWebAudio
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		sound.play();
 * 	}
 * 	function loadOver (e) {
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LWebAudio.html" target="_blank">Try it »</a></p>
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * <p>このクラスは、サーバーまたはローカルに保存された録音済みビデオファイルを再生する LSound オブジェクト。</p>
 * <p>使っているブラウザはWeb Audio Apiにサポートされている、そしてLGlobal.webAudio = true(ディフォルトは true)を設定した場合、LSoundはLWebAudioを継承します。</p>
 * <p>LSoundはLWebAudioを継承した場合、IOSブラウザを使っても、音声ファイルは事前ロードできます、でも音声ファイルの再生はクリックイベントの中にしか実行できません。</p>
 * <p>LSoundはLWebAudioを継承した場合、同じタイミングに複数の音声ファイルしが再生することができます。でも上限があります，IOSブラウザだと上限は４つになります。</p>
 * @class LSound(LWebAudio)
 * @extends LWebAudio
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		sound.play();
 * 	}
 * 	function loadOver (e) {
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LWebAudio.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.9.0
 * @public
 */
var LSound = (function () {
	function LSound (u) {
		var s = this;
		s.type = "LSound";
		s._type="audio";
		if (LSound.webAudioEnabled && LGlobal.webAudio) {
			LExtends(s, LWebAudio, []);
		} else {
			LExtends(s, LMedia, []);
			s.data = new Audio();
			s.data.loop = false;
			s.data.autoplay = false;
		}
		if (u) {
			s.load(u);
		}
	}
	LSound.TYPE_SOUND = "sound";
	/** @language chinese
	 * <p>当前浏览器是否支持Web Audio。</p>
	 * @property LSound.webAudioEnabled
	 * @type Boolean
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language english
	 * <p>The browser supports the Web Audio.</p>
	 * @property LSound.webAudioEnabled
	 * @type Boolean
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language japanese
	 * <p>現在のブラウザはWeb audioサポートされているかどうか。</p>
	 * @property LSound.webAudioEnabled
	 * @type Boolean
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	LSound.webAudioEnabled = false;
	var protocol = location.protocol;
	if (protocol == "http:" || protocol == "https:") {
		if (typeof webkitAudioContext !== UNDEFINED) {
			try {
				LWebAudio._context = new webkitAudioContext();
			} catch (e) {
			}
		} else if (typeof AudioContext !== UNDEFINED) {
			try {
				LWebAudio._context = new AudioContext();
			} catch (e) {
			}
		}
		if (LWebAudio._context) {
			LWebAudio.container.push(LWebAudio._context);
			LSound.webAudioEnabled = true;
		}
	}
	LSound.Container = {
		list : [],
		ll_show : function () {
			var l = LSound.Container.list;
			for (var i = l.length; i >= 0; i--) {
				if (l[i]) {
					l[i].ll_check();
				}
			}
		},
		add : function (obj) {
			if (LSound.Container.list.indexOf(obj) >= 0) {
				return;
			} 
			LSound.Container.list.push(obj);
		},
		remove : function (obj) {
			var l = LSound.Container.list;
			for (var i = l.length; i >= 0; i--) {
				if (l[i].objectIndex == obj.objectIndex) {
					l.splice(i,1);
					break;
				}
			}
		}
	};
	LGlobal.childList.push(LSound.Container);
	return LSound;
})();