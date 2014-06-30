/** @language chinese
 * <p>LMedia 类是LSound对象和LVideo对象的基类。</p>
 * <p>LMedia 是一种抽象基类；因此，不能直接调用 LMedia。</p>
 * <p>LMedia 类是可以包含子对象的所有对象的抽象基类。无法直接对其进行实例化。</p>
 * @class LMedia
 * @extends LDisplayObject
 * @constructor
 * @since 1.7.0
 * @public
 */
/** @language english
 * <p>The LMedia class is the base class for LSound object and LVideo object.</p>
 * <p>LMedia is an abstract base class; therefore, you cannot call LMedia directly. </p>
 * <p>The LMedia class is an abstract base class for all objects that can contain child objects. It cannot be instantiated directly.</p>
 * @class LMedia
 * @extends LDisplayObject
 * @constructor
 * @since 1.7.0
 * @public
 */
/** @language japanese
 * <p>LMedia クラスは、LSoundオブジェクトとLVideoオブジェクトの基本クラスです。</p>
 * <p>LMedia は抽象基本クラスであるため、LMedia を直接呼び出すことはできません。</p>
 * <p>LMedia クラスは、子オブジェクトを持つすべてのオブジェクトの抽象基本クラスです。これは直接インスタンス化することはできません。</p>
 * @class LMedia
 * @extends LDisplayObject
 * @constructor
 * @since 1.7.0
 * @public
 */
var LMedia = (function () {
	function LMedia () {
		var s = this;
		LExtends(s, LDisplayObject, []);
		/** @language chinese
		 * LSound对象或LVideo对象的长度
		 * @property length
		 * @type int
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
		 * The length of LSound object or LVideo object
		 * @property length
		 * @type int
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * LSoundオブジェクトまたはLVideoオブジェクトの長さ
		 * @property length
		 * @type int
		 * @since 1.7.0
		 * @public
		 */
		s.length = 0;
		s.loopIndex = 0;
		s.loopLength = 1;
		/** @language chinese
		 * LSound对象或LVideo对象是否正在播放
		 * @property playing
		 * @type Boolean
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
		 * The LSound object or LVideo object is playing.
		 * @property playing
		 * @type Boolean
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * LSoundオブジェクトまたはLVideoオブジェクトは再生中かどうか
		 * @property playing
		 * @type Boolean
		 * @since 1.7.0
		 * @public
		 */
		s.playing = false;
		s.oncomplete = null;
		s.onsoundcomplete = null;
		s.currentStart = 0;
	}
	var p = {
		onload : function () {
			var s = this;
			if (s.data.readyState) {
				s.length = s.data.duration;
				var e = new LEvent(LEvent.COMPLETE);
				e.currentTarget = s;
				e.target = s.data;
				s.dispatchEvent(e);
				return;
			}
			s.data.addEventListener("canplaythrough", function () {
				s.onload();
			}, false);
		},
		_onended : function () {
			var s = this;
			if (s.data.ended) {
				s.dispatchEvent(LEvent.SOUND_COMPLETE);
			}
			if (++s.loopIndex < s.loopLength) {
				s.data.currentTime = s.currentStart;
				if (s.timeout) {
					clearTimeout(s.timeout);
					s.timeout = setTimeout(s._onended.bind(s), (s.currentTimeTo - s.data.currentTime) * 1000);
				}
				s.data.play();
			} else {
				s.close();
			}
		},
		/** @language chinese
		 * <p>启动从指定 URL 加载外部 多媒体 文件的过程。</p>
		 * <p>为了支持不同浏览器，可以像下面这样，同时传入多个多媒体类型文件。</p>
		 * <p>medio.load("medias/a.mp3,medias/a.wav,medias/a.ogg");</p>
		 * @method load
		 * @param {String} url 指向外部 多媒体 文件的 URL。
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
		 * <p>Initiates loading of an external media file from the specified URL. </p>
		 * <p>To support different browsers, you can look like this</p>
		 * <p>medio.load("medias/a.mp3,medias/a.wav,medias/a.ogg");</p>
		 * @method load
		 * @param {String} url A URL that points to an external media file.
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>指定した URL から外部 メディア ファイルのロードを開始します。</p>
		 * <p>複数のブラウザをサポートするため、下記のように、複数なファイルを使うことができます。</p>
		 * <p>medio.load("medias/a.mp3,medias/a.wav,medias/a.ogg");</p>
		 * @method load
		 * @param {String} url 外部の メディア ファイルを指定する URL です。
		 * @since 1.7.0
		 * @public
		 */
		load : function (u) {
			var s = this;
			if (Object.prototype.toString.apply(u) == "[object HTMLAudioElement]") {
				s.data = u;
				s.onload();
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
				if (s.data.canPlayType(s._type + "/" + d)) {
					s.data.src = a[k];
					s.onload();
					s.data.addEventListener("ended", function () {
						s._onended();
					}, false);
					s.data.load();
					return;
				}
			}
			if (s.oncomplete) {
				s.oncomplete({});
			}
		},
		/** @language japanese
		 * <p>获取已经播放的时间。</p>
		 * @method getCurrentTime
		 * @return {int} 已经播放的时间。
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>Get the time of reproducing.</p>
		 * @method getCurrentTime
		 * @return {int} the time of reproducing.
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>再生した時間を取得。</p>
		 * @method getCurrentTime
		 * @return {int} 再生した時間。
		 * @since 1.7.0
		 * @public
		 */
		getCurrentTime : function () {
			return this.data.currentTime;
		},
		/** @language japanese
		 * <p>设定音量。</p>
		 * @method setVolume
		 * @param {float} value 音量。
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>Set the volume of media.</p>
		 * @method setVolume
		 * @param {float} value the volume。
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>音量変更。</p>
		 * @method setVolume
		 * @param {float} value 音量。
		 * @since 1.7.0
		 * @public
		 */
		setVolume : function (v) {
			this.data.volume = v;
		},
		/** @language japanese
		 * <p>获取音量。</p>
		 * @method getVolume
		 * @return {float} 音量。
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>Get the volume of media.</p>
		 * @method getVolume
		 * @return {float} the volume.
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>音量を取得。</p>
		 * @method getVolume
		 * @return {float} 音量。
		 * @since 1.7.0
		 * @public
		 */
		getVolume : function () {
			return this.data.volume;
		},
		/** @language japanese
		 * <p>播放该多媒体对象。</p>
		 * @method play
		 * @param {float} startTime 应开始播放的初始位置（以毫秒为单位）。
		 * @param {float} loops 定义在声道停止播放之前，声音循环回 startTime 值的次数。
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>play the media file.</p>
		 * @method play
		 * @param {float} startTime The initial position in milliseconds at which playback should start.
		 * @param {float} loops Defines the number of times a sound loops back to the startTime value before the sound channel stops playback.
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>メディアオブジェクトを再生する。</p>
		 * @method play
		 * @param {float} startTime 再生を開始する初期位置（ミリ秒単位）です。
		 * @param {float} loops サウンドチャネルの再生が停止するまで startTime 値に戻ってサウンドの再生を繰り返す回数を定義します。
		 * @since 1.7.0
		 * @public
		 */
		play : function (c, l, to) {
			var s = this;
			if (s.length == 0) {
				return;
			}
			if (typeof l == UNDEFINED) {
				l = 1;
			}
			if (typeof c == UNDEFINED) {
				c = 0;
			}
			if (c > 0) {
				s.data.currentTime = c;
				s.currentStart = c;
			}
			if (typeof to !== UNDEFINED) {
				s.currentTimeTo = to > s.length ? s.length : to;
				if (s.timeout) {
					clearTimeout(s.timeout);
					delete s.timeout;
				}
				s.timeout = setTimeout(s._onended.bind(s), (s.currentTimeTo - s.data.currentTime) * 1000);
			}
			s.data.loop = false;
			s.loopIndex = 0;
			s.loopLength = l;
			s.playing = true;
			s.data.play();
		},
		playSegment : function (c, seg, l) {
			this.playTo(c, c + seg, l);
		},
		playTo : function (c, to, l) {
			this.play(c, l, to);
		},
		/** @language japanese
		 * <p>暂停当前播放的音频/视频。</p>
		 * @method stop
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>Pauses the currently playing audio/video.</p>
		 * @method stop
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>再生を一時停止する。</p>
		 * @method stop
		 * @since 1.7.0
		 * @public
		 */
		stop : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			s.playing = false;
			s.data.pause();
		},
		/** @language japanese
		 * <p>关闭当前播放的音频/视频。</p>
		 * @method close
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>Close the currently playing audio/video.</p>
		 * @method close
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>再生を一時クローズする。</p>
		 * @method close
		 * @since 1.7.0
		 * @public
		 */
		close : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.timeout) {
				clearTimeout(s.timeout);
				delete s.timeout;
			}
			s.playing = false;
			s.data.pause();
			s.data.currentTime = 0;
			s.currentSave = 0;
		}
	};
	for (var k in p) {
		LMedia.prototype[k] = p[k];
	}
	return LMedia;
})();