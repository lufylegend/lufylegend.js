/** @language chinese
 * 此类创建播放下列任一类型视频的 LVideo 对象。
 * @class LSound(LMedia)
 * @extends LMedia
 * @constructor
 * @example
 * 	var backLayer;
 * 	var video;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		video = new LVideo();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * This class creates a LVideo object that plays either of the following kinds of video.
 * @class LSound(LMedia)
 * @extends LMedia
 * @constructor
 * @example
 * 	var backLayer;
 * 	var video;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		video = new LVideo();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * このクラスは、サーバーまたはローカルに保存された録画済みビデオファイルを再生する LVideo オブジェクト。
 * @class LSound(LMedia)
 * @extends LMedia
 * @constructor
 * @example
 * 	var backLayer;
 * 	var video;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		video = new LVideo();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 *//** @language chinese
 * 此类创建播放下列任一类型视频的 LVideo 对象。
 * @class LSound(LWebAudio)
 * @extends LWebAudio
 * @constructor
 * @example
 * 	var backLayer;
 * 	var video;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		video = new LVideo();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * This class creates a LVideo object that plays either of the following kinds of video.
 * @class LSound(LWebAudio)
 * @extends LWebAudio
 * @constructor
 * @example
 * 	var backLayer;
 * 	var video;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		video = new LVideo();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * このクラスは、サーバーまたはローカルに保存された録画済みビデオファイルを再生する LVideo オブジェクト。
 * @class LSound(LWebAudio)
 * @extends LWebAudio
 * @constructor
 * @example
 * 	var backLayer;
 * 	var video;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		video = new LVideo();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
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
	LSound.webAudioEnabled = false;
	if (typeof AudioContext !== UNDEFINED || typeof webkitAudioContext !== UNDEFINED) {
		var protocol = location.protocol;
		if (protocol == "http:" || protocol == "https:") {
			LSound.webAudioEnabled = true;
		}
	}
	return LSound;
})();