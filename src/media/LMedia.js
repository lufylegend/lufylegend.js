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
		LSound.Container.add(this);
	}
	var p = {
		onload : function () {
			var s = this;
			if (s.data.readyState) {
				s.length = s.data.duration - 0.1;
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
			var s = this, i, l;
			if (s.data.ended) {
				s.dispatchEvent(LEvent.SOUND_COMPLETE);
			}
			if (++s.loopIndex < s.loopLength) {
				i = s.loopIndex;
				l = s.loopLength;
				s.close();
				s.play(s.currentStart, s.loopLength, s.currentTimeTo);
				s.loopIndex = i;
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
			var a, b, c, k, d, q = {"mov" : ["quicktime"], "3gp" : ["3gpp"], "ogv" : ["ogg"], "m4a" : ["mpeg"], "mp3" : ["mpeg"], "wav" : ["wav", "x-wav", "wave"], "wave" : ["wav", "x-wav", "wave"], "aac" : ["mp4"]};
			a = u.split(',');
			for (k in a) {
				b = a[k].split('.');
				d = b[b.length - 1];
				if (q[d]) {
					d = q[d];
				} else {
					d = [d];
				}
				c = d.some(function (element, index, array) {
					return s.data.canPlayType(s._type + "/" + element);
				});
				if (c) {
					s.data.src = a[k];
					s.onload();
					s.data.load();
					return;
				}
			}
			if (s.oncomplete) {
				s.oncomplete({});
			}
		},
		/** @language chinese
		 * <p>获取已经播放的时间。</p>
		 * @method getCurrentTime
		 * @return {int} 已经播放的时间。
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
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
		/** @language chinese
		 * <p>设定音量。</p>
		 * @method setVolume
		 * @param {float} value 音量。
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
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
		/** @language chinese
		 * <p>获取音量。</p>
		 * @method getVolume
		 * @return {float} 音量。
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
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
		/** @language chinese
		 * <p>播放该多媒体对象。</p>
		 * @method play
		 * @param {float} startTime 应开始播放的初始位置（以毫秒为单位）。
		 * @param {int} loops 定义在声道停止播放之前，声音循环回 startTime 值的次数。
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
		 * <p>play the media file.</p>
		 * @method play
		 * @param {float} startTime The initial position in milliseconds at which playback should start.
		 * @param {int} loops Defines the number of times a sound loops back to the startTime value before the sound channel stops playback.
		 * @since 1.7.0
		 * @public
		 */
		/** @language japanese
		 * <p>メディアオブジェクトを再生する。</p>
		 * @method play
		 * @param {float} startTime 再生を開始する初期位置（ミリ秒単位）です。
		 * @param {int} loops サウンドチャネルの再生が停止するまで startTime 値に戻ってサウンドの再生を繰り返す回数を定義します。
		 * @since 1.7.0
		 * @public
		 */
		play : function (c, l, to) {
			var s = this;
			if (s.length == 0) {
				return;
			}
			if (typeof c != UNDEFINED) {
				s.data.currentTime = c;
				s.currentStart = c;
			}
			if (typeof l != UNDEFINED) {
				s.loopLength = l;
			}
			if (typeof to !== UNDEFINED) {
				s.currentTimeTo = to > s.length ? s.length : to;
			} else {
				s.currentTimeTo = s.length;
			}
			s.data.loop = false;
			s.loopIndex = 0;
			s.playing = true;
			s.data.play();
		},
		/** @language chinese
		 * <p>播放指定长度的其中的一段音频。</p>
		 * @method playSegment
		 * @param {float} startTime 应开始播放的初始位置（以秒为单位）。
		 * @param {float} segment 指定长度（以秒为单位）。
		 * @param {int} loops 定义在声道停止播放之前，声音循环回 startTime 值的次数。
		 * @since 1.9.0
		 * @public
		 */
		/** @language english
		 * <p>play segment of audio.</p>
		 * @method playSegment
		 * @param {float} startTime The initial position in milliseconds at which playback should start.
		 * @param {float} segment length。
		 * @param {int} loops Defines the number of times a sound loops back to the startTime value before the sound channel stops playback.
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>指定する長さの音声オブジェクトを再生する。</p>
		 * @method playSegment
		 * @param {float} startTime 再生を開始する初期位置（秒単位）です。
		 * @param {float} segment 指定する長さ（秒単位）。
		 * @param {int} loops サウンドチャネルの再生が停止するまで startTime 値に戻ってサウンドの再生を繰り返す回数を定義します。
		 * @since 1.9.0
		 * @public
		 */
		playSegment : function (c, seg, l) {
			this.playTo(c, c + seg, l);
		},
		/** @language chinese
		 * <p>播放指定区间内的一段音频。</p>
		 * @method playTo
		 * @param {float} startTime 应开始播放的初始位置（以秒为单位）。
		 * @param {float} endTime 停止播放的位置（以秒为单位）。
		 * @param {int} loops 定义在声道停止播放之前，声音循环回 startTime 值的次数。
		 * @since 1.9.0
		 * @public
		 */
		/** @language english
		 * <p>play segment of audio.</p>
		 * @method playTo
		 * @param {float} startTime start time.
		 * @param {float} endTime end time.
		 * @param {int} loops Defines the number of times a sound loops back to the startTime value before the sound channel stops playback.
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * <p>指定する長さの音声オブジェクトを再生する。</p>
		 * @method playTo
		 * @param {float} startTime 再生を開始する初期位置（秒単位）です。
		 * @param {float} endTime 再生を終了する位置（秒単位）。
		 * @param {int} loops サウンドチャネルの再生が停止するまで startTime 値に戻ってサウンドの再生を繰り返す回数を定義します。
		 * @since 1.9.0
		 * @public
		 */
		playTo : function (c, to, l) {
			this.play(c, l, to);
		},
		/** @language chinese
		 * <p>暂停当前播放的音频/视频。</p>
		 * @method stop
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
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
			s.playing = false;
			s.data.pause();
		},
		/** @language chinese
		 * <p>关闭当前播放的音频/视频。</p>
		 * @method close
		 * @since 1.7.0
		 * @public
		 */
		/** @language english
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
			s.playing = false;
			s.data.pause();
			s.data.currentTime = 0;
			s.currentSave = 0;
		},
		ll_check : function () {
			var s = this;
			if (!s.playing) {
				return;
			}
			if (s.currentTimeTo < s.data.currentTime + LSound.Container.time * 0.005) {
				s._onended();
			}
		},
		die : function () {
			LSound.Container.remove(this);
		}
	};
	for (var k in p) {
		LMedia.prototype[k] = p[k];
	}
	return LMedia;
})();
/** @language chinese
 * 多媒体文件加载完成事件。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 */
/** @language english
 * when the media is loaded
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 */
/** @language japanese
 * audioまたはvideoファイルロード完了。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 */
/** @language chinese
 * 播放结束事件，一个音频文件播放完之后调度。
 * @event LEvent.SOUND_COMPLETE
 * @since 1.7.0
 * @public
 */
