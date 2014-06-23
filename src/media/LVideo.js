/** @language chinese
 * 此类创建播放视频的 LVideo 对象。
 * @class LVideo
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
 * 	function onup (e) {
 * 		......
 * 		var url = "./sample.";
 * 		video.load(url+"mp4,"+url+"3gp,"+url+"mov,"+url+"3g2,"+url+"ogv,"+url+"webm");
 * 		video.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function loadOver (e) {
 * 		var layer = new LSprite();
 * 		layer.addChild(video);
 * 		backLayer.addChild(layer);
 * 		video.play();
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * This class creates a LVideo object.
 * @class LVideo
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
 * 	function onup (e) {
 * 		......
 * 		var url = "./sample.";
 * 		video.load(url+"mp4,"+url+"3gp,"+url+"mov,"+url+"3g2,"+url+"ogv,"+url+"webm");
 * 		video.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function loadOver (e) {
 * 		var layer = new LSprite();
 * 		layer.addChild(video);
 * 		backLayer.addChild(layer);
 * 		video.play();
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * このクラスは、サーバーまたはローカルに保存された録画済みビデオファイルを再生する LVideo オブジェクト。
 * @class LVideo
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
 * 	function onup (e) {
 * 		......
 * 		var url = "./sample.";
 * 		video.load(url+"mp4,"+url+"3gp,"+url+"mov,"+url+"3g2,"+url+"ogv,"+url+"webm");
 * 		video.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function loadOver (e) {
 * 		var layer = new LSprite();
 * 		layer.addChild(video);
 * 		backLayer.addChild(layer);
 * 		video.play();
 * 	}
 * @examplelink <p><a href="../../../api/LVideo/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LVideo = (function () {
	function LVideo (u) {
		var s = this;
		LExtends(s, LMedia, []);
		s.type = "LVideo";
		s._type = "video";
		s.rotatex = 0;
		s.rotatey = 0;
		s.data = document.createElement("video");
		s.data.style.display = "none";
		document.body.appendChild(s.data);
		s.data.id = "video_" + s.objectIndex;
		s.data.loop = false;
		s.data.autoplay = false;
		if (u) {
			s.load(u);
		}
	}
	var p = {
		_ll_show : function (c) {
			var s = this;
			c.drawImage(s.data, s.x, s.y);
		},
		die : function () {
			var s = this;
			document.body.removeChild(s.data);
			delete s.data;
		},
		getWidth : function () {
			return this.data.width;
		},
		getHeight : function () {
			return this.data.height;
		}
	};
	for (var k in p) {
		LVideo.prototype[k] = p[k];
	}
	return LVideo;
})();