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
 * @since 1.6.0
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
 * @since 1.6.0
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
 * @since 1.6.0
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
		var strTag = "";
		if(LGlobal.os == OS_IPHONE && LGlobal.iOSversion[0] >= 10){
			s.sound = new LSound();
			strTag = " muted playsinline ";
		}
		var div = document.createElement("div");
		div.id = "div_video_" + s.objectIndex;
		div.innerHTML = '<video id="video_'+s.objectIndex+'" '+strTag+' style="opacity: 1;width:0px;height:0px;position:absolute;index-z:-999;">';
		document.body.appendChild(div);
		s.data = document.getElementById("video_" + s.objectIndex);
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
		load : function(u){
			var s = this;
			s.callParent("load", arguments);
			if(s.sound){
				s.sound.load(u);
			}
		},
		play : function (c, l, to) {
			var s = this;
			s.callParent("play", arguments);
			if(s.sound){
				s.sound.play(c, l, to);
			}
		},
		stop : function () {
			var s = this;
			s.callParent("stop", arguments);
			if(s.sound){
				s.sound.stop();
			}
		},
		setVolume : function (v) {
			var s = this;
			if(s.sound){
				s.sound.setVolume(v);
			}else{
				s.callParent("setVolume", arguments);
			}
		},
		getVolume : function () {
			var s = this;
			if(s.sound){
				return s.sound.getVolume();
			}else{
				return s.callParent("getVolume", arguments);
			}
		},
		close : function () {
			var s = this;
			s.callParent("close", arguments);
			if(s.sound){
				s.sound.close();
			}
		},
		die : function () {
			var s = this;
			document.body.removeChild(document.getElementById("div_video_" + s.objectIndex));
			delete s.data;
			delete s.sound;
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