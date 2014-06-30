/** @language chinese
 * <p>LWebAudio 类是LSound对象的基类。可以让LSound对象使用Web Audio Api来播放音频文件，可以解决IOS下无法多声道的问题。</p>
 * <p>LWebAudio 是一种抽象基类；因此，不能直接调用 LWebAudio。</p>
 * <p>LWebAudio 类是可以包含子对象的所有对象的抽象基类。无法直接对其进行实例化。</p>
 * @class LWebAudio
 * @extends LEventDispatcher
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language english
 * <p>The LWebAudio class is the base class for LSound object.</p>
 * <p>LWebAudio is an abstract base class; therefore, you cannot call LWebAudio directly. </p>
 * <p>The LWebAudio class is an abstract base class for all objects that can contain child objects. It cannot be instantiated directly.</p>
 * @class LWebAudio
 * @extends LEventDispatcher
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * <p>LWebAudio クラスは、LSoundオブジェクトの基本クラスです。</p>
 * <p>LWebAudio は抽象基本クラスであるため、LWebAudio を直接呼び出すことはできません。</p>
 * <p>LWebAudio クラスは、子オブジェクトを持つすべてのオブジェクトの抽象基本クラスです。これは直接インスタンス化することはできません。</p>
 * @class LWebAudio
 * @extends LEventDispatcher
 * @constructor
 * @since 1.9.0
 * @public
 */
var LWebAudio = (function () {
	function LWebAudio () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		if(LWebAudio.containerCount > 0){
			s.data = LWebAudio.container.shift();
		} else {
			if (typeof AudioContext !== UNDEFINED) {
				try {
					s.data = new AudioContext();
				} catch (e) {
					LWebAudio.containerCount = LWebAudio.container.length;
					s.data = LWebAudio.container.shift();
				}
			} else if (typeof webkitAudioContext !== UNDEFINED) {
				try {
					s.data = new webkitAudioContext();
				} catch (e) {
					LWebAudio.containerCount = LWebAudio.container.length;
					s.data = LWebAudio.container.shift();
				}
			} else {
				throw "AudioContext not supported. :(";
			}
		}
		LWebAudio.container.push(s.data);
		s.audioTag = new Audio();
		s.currentTime = 0;
		s.currentStart = 0;
		s.currentSave = 0;
		/** @language chinese
		 * LSound对象的长度
		 * @property length
		 * @type int
		 * @since 1.9.0
		 * @public
		 */
		/** @language english
		 * The length of LSound object
		 * @property length
		 * @type int
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * LSoundオブジェクトの長さ
		 * @property length
		 * @type int
		 * @since 1.9.0
		 * @public
		 */
		s.length = 0;
		s.loopStart = 0;
		s.loopEnd = 0;
		s.loopIndex = 0;
		s.loopLength = 1;
		/** @language chinese
		 * LSound对象是否正在播放
		 * @property playing
		 * @type Boolean
		 * @since 1.9.0
		 * @public
		 */
		/** @language english
		 * The LSound object is playing.
		 * @property playing
		 * @type Boolean
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * LSoundオブジェクトは再生中かどうか
		 * @property playing
		 * @type Boolean
		 * @since 1.9.0
		 * @public
		 */
		s.playing = false;
		s.volume = 1;
	}
	LWebAudio.container = [];
	LWebAudio.containerCount = 0;
	var p = {
		onload : function (data) {
			var s = this;
			s.buffer = s.data.createBuffer(data,true);
			s.length = s.buffer.duration;
			s.dispatchEvent(LEvent.COMPLETE);
		},
		_onended : function () {
			var s = this;
			s.dispatchEvent(LEvent.SOUND_COMPLETE);
			s.close();
			if (++s.loopIndex < s.loopLength) {
				s.play(undefined, undefined, s.currentTimeTo);
			}
		},
		/** @language chinese
		 * <p>启动从指定 URL 加载外部 音频 文件的过程。</p>
		 * <p>为了支持不同浏览器，可以像下面这样，同时传入多个多媒体类型文件。</p>
		 * <p>medio.load("medias/a.mp3,medias/a.wav,medias/a.ogg");</p>
		 * @method load
		 * @param {String} url 指向外部 音频 文件的 URL。(也可以直接使用AudioBuffer或者ArrayBuffer类型的数据)
		 * @since 1.9.0
		 * @public
		 */
		/** @language english
		 * <p>Initiates loading of an external sound file from the specified URL. </p>
		 * <p>To support different browsers, you can look like this</p>
		 * <p>medio.load("medias/a.mp3,medias/a.wav,medias/a.ogg");</p>
		 * @method load
		 * @param {String} url A URL that points to an external sound file.(Can also use a ArrayBuffer or AudioBuffer)
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>指定した URL から外部 音声 ファイルのロードを開始します。</p>
		 * <p>複数のブラウザをサポートするため、下記のように、複数なファイルを使うことができます。</p>
		 * <p>medio.load("medias/a.mp3,medias/a.wav,medias/a.ogg");</p>
		 * @method load
		 * @param {String} url 外部の 音声 ファイルを指定する URL です。(AudioBufferデーターまたはArrayBufferデーターも使えます。)
		 * @since 1.9.0
		 * @public
		 */
		load : function (u) {
			var s = this;
			if (typeof u !== "string") {
				if (Object.prototype.toString.apply(u) == '[object AudioBuffer]') {
					s.buffer = u;
				} else if (Object.prototype.toString.apply(u) == '[object ArrayBuffer]') {
					s.buffer = s.data.createBuffer(u,true);
				}
				s.length = s.buffer.duration;
				s.dispatchEvent(LEvent.COMPLETE);
				return;
			}
			var a, b, k, d, q = {"mov" : "quicktime", "3gp" : "3gpp", "ogv" : "ogg", "m4a" : "mpeg", "mp3" : "mpeg", "wave" : "wav", "aac" : "mp4"};
			a = u.split(',');
			for (k in a) {
				b = a[k].split('.');
				d = b[b.length - 1];
				if (q[d]) {
					d = q[d];
				}
				if (s.audioTag.canPlayType(s._type + "/" + d)) {
					LAjax.responseType = LAjax.ARRAY_BUFFER;
					LAjax.get(a[k], {}, s.onload.bind(s));
					return;
				}
			}
		},
		/** @language japanese
		 * <p>获取已经播放的时间。</p>
		 * @method getCurrentTime
		 * @return {int} 已经播放的时间。
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>Get the time of reproducing.</p>
		 * @method getCurrentTime
		 * @return {int} the time of reproducing.
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>再生した時間を取得。</p>
		 * @method getCurrentTime
		 * @return {int} 再生した時間。
		 * @since 1.9.0
		 * @public
		 */
		getCurrentTime : function () {
			var s = this;
			if (s.playing) {
				return s.data.currentTime - s.currentSave + s.currentTime;
			} else {
				return s.currentSave;
			}
		},
		/** @language japanese
		 * <p>设定音量。</p>
		 * @method setVolume
		 * @param {float} value 音量。
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>Set the volume of media.</p>
		 * @method setVolume
		 * @param {float} value the volume。
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>音量変更。</p>
		 * @method setVolume
		 * @param {float} value 音量。
		 * @since 1.9.0
		 * @public
		 */
		setVolume : function (v) {
			this.volume = v;
			if (s.playing) {
				s.volumeNode.gain.value = v;
			}
		},
		/** @language japanese
		 * <p>获取音量。</p>
		 * @method getVolume
		 * @return {float} 音量。
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>Get the volume of media.</p>
		 * @method getVolume
		 * @return {float} the volume.
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>音量を取得。</p>
		 * @method getVolume
		 * @return {float} 音量。
		 * @since 1.9.0
		 * @public
		 */
		getVolume : function () {
			return this.volume;
		},
		/** @language japanese
		 * <p>播放该音频对象。</p>
		 * @method play
		 * @param {float} startTime 应开始播放的初始位置（以毫秒为单位）。
		 * @param {float} loops 定义在声道停止播放之前，声音循环回 startTime 值的次数。
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>play the audio file.</p>
		 * @method play
		 * @param {float} startTime The initial position in milliseconds at which playback should start.
		 * @param {float} loops Defines the number of times a sound loops back to the startTime value before the sound channel stops playback.
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>音声オブジェクトを再生する。</p>
		 * @method play
		 * @param {float} startTime 再生を開始する初期位置（ミリ秒単位）です。
		 * @param {float} loops サウンドチャネルの再生が停止するまで startTime 値に戻ってサウンドの再生を繰り返す回数を定義します。
		 * @since 1.9.0
		 * @public
		 */
		play : function (c, l, to) {
			var s = this;
			if (s.length == 0) {
				return;
			}
			if (typeof l !== UNDEFINED) {
				s.loopIndex = 0;
				s.loopLength = l;
			}
			if (typeof c !== UNDEFINED) {
				s.currentTime = c;
				s.currentStart = c;
			}
			if (typeof to !== UNDEFINED) {
				s.currentTimeTo = to > s.length ? s.length : to;
			} else {
				s.currentTimeTo = s.length;
			}
			s.data.loop = false;
			s.playing = true;
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			s.timeout = setTimeout(s._onended.bind(s), (s.currentTimeTo - s.currentTime) * 1000);
			s.bufferSource = s.data.createBufferSource();
			s.bufferSource.buffer = s.buffer;
			s.volumeNode = s.data.createGainNode();
			s.volumeNode.gain.value = s.volume;
			s.volumeNode.connect(s.data.destination);
			s.bufferSource.connect(s.volumeNode);
			s.currentSave = s.data.currentTime;
			if (s.bufferSource.start) {
				s.bufferSource.start(0, s.currentTime, s.length - s.currentTime);
			} else {
				s.bufferSource.noteGrainOn(0, s.currentTime, s.length - s.currentTime);
			}
		},
		playSegment : function (c, seg, l) {
			this.playTo(c, c + seg, l);
		},
		playTo : function (c, to, l) {
			this.play(c, l, to);
		},
		/** @language japanese
		 * <p>暂停当前播放的音频。</p>
		 * @method stop
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>Pauses the currently playing audio.</p>
		 * @method stop
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>再生を一時停止する。</p>
		 * @method stop
		 * @since 1.9.0
		 * @public
		 */
		stop : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			clearTimeout(s.timeout);
			delete s.timeout;
			if (s.bufferSource.stop) {
				s.bufferSource.stop(0);
			} else {
				s.bufferSource.noteOff(0);
			}
			s.currentSave = s.getCurrentTime();
			s.currentTime = s.currentSave;
			s.playing = false;
		},
		/** @language japanese
		 * <p>关闭当前播放的音频。</p>
		 * @method close
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>Close the currently playing audio.</p>
		 * @method close
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>再生を一時クローズする。</p>
		 * @method close
		 * @since 1.9.0
		 * @public
		 */
		close : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			clearTimeout(s.timeout);
			delete s.timeout;
			if (s.bufferSource.stop) {
				s.bufferSource.stop(0);
			} else {
				s.bufferSource.noteOff(0);
			}
			s.playing = false;
			s.currentTime = s.currentStart;
			s.currentSave = s.currentStart;
		}
	};
	for (var k in p) {
		LWebAudio.prototype[k] = p[k];
	}
	return LWebAudio;
})();