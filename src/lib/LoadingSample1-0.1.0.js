/** @language chinese
 * <p>Library:lufylegend.LoadingSampleX-x.x.x.min.js</p>
 * <p>用来显示进度条的对象。</p>
 * <p>引擎中目前提供的进度条类有：LoadingSample1～7</p>
 * <p>你可以制作自己的进度条，自制进度条类中要包含setProgress函数。</p>
 * @class LoadingSample
 * @extends LSprite
 * @constructor
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
 * 	}
 * @since 1.4.0
 * @public
 */
var LoadingSample1 = (function() {
	function LoadingSample1(step, b, c) {
		base(this, LSprite, []);
		var s = this;
		s.numberList = new Array([1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]);
		s.backgroundColor = b == null ? "#000000" : b;
		s.color = c == null ? "#ffffff" : c;
		s.progress = 0;
		s.step = step == null ? LGlobal.width * 0.5 / 15 : step;
		s.back = new LSprite();
		s.addChild(s.back);
		s.num = new LSprite();
		s.addChild(s.num);
		s.num.mask = new LSprite();
		s.screenX = (LGlobal.width - s.step * 15) / 2;
		s.screenY = (LGlobal.height - s.step * 5) / 2;
		s.num.x = s.screenX;
		s.num.y = s.screenY;
		s.setProgress(s.progress);
	}

	/** @language chinese
	 * 设置进度条的长度百分比
	 * @method setProgress
	 * @param {int} value 长度百分比(0〜100)
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
	 * 	}
	 * @public
	 * @since 1.4.0
	 */
	LoadingSample1.prototype.setProgress = function(value) {
		var s = this, c = LGlobal.canvas;
		var num_0 = "", num_1, num_2, i;
		var s_x = s.step;
		if (value >= 100) {
			num_0 = s.getNumber(1);
			num_1 = s.getNumber(0);
			num_2 = s.getNumber(0);
			s_x = s.step * 3;
		} else if (value >= 10) {
			num_1 = s.getNumber(Math.floor(value / 10));
			num_2 = s.getNumber(value % 10);
		} else {
			num_1 = s.getNumber(0);
			num_2 = s.getNumber(value);
		}
		s.back.graphics.clear();
		s.back.graphics.add(function() {
			c.beginPath();
			c.fillStyle = s.backgroundColor;
			c.fillRect(0, 0, LGlobal.width, LGlobal.height);
			c.closePath();
			c.fillStyle = s.color;
			if (value >= 100) {
				for ( i = 0; i < num_0.length; i++) {
					if (num_0[i] == 0) {
						continue;
					}
					c.fillRect(s.screenX + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
				}
			}
			for ( i = 0; i < num_1.length; i++) {
				if (num_1[i] == 0) {
					continue;
				}
				c.fillRect(s.screenX + s_x + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
			for ( i = 0; i < num_2.length; i++) {
				if (num_2[i] == 0) {
					continue;
				}
				c.fillRect(s.screenX + s_x + Math.floor(i % 3) * s.step + s.step * 4, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
			c.moveTo(s.screenX + s_x + s.step * 9.7, s.screenY);
			c.lineTo(s.screenX + s_x + s.step * 10.5, s.screenY);
			c.lineTo(s.screenX + s_x + s.step * 9.3, s.screenY + s.step * 5);
			c.lineTo(s.screenX + s_x + s.step * 8.5, s.screenY + s.step * 5);
			c.lineTo(s.screenX + s_x + s.step * 9.7, s.screenY);
			c.fill();
			c.moveTo(s.screenX + s_x + s.step * 8.5, s.screenY + s.step);
			c.arc(s.screenX + s_x + s.step * 8.5, s.screenY + s.step, s.step * 0.6, 0, 360 + Math.PI / 180);
			c.moveTo(s.screenX + s_x + s.step * 10.5, s.screenY + s.step * 4);
			c.arc(s.screenX + s_x + s.step * 10.5, s.screenY + s.step * 4, s.step * 0.6, 0, 360 + Math.PI / 180);
			c.fill();

		});
		s.num.mask.graphics.clear();
		s.num.mask.graphics.add(function() {
			if (value >= 100) {
				for ( i = 0; i < num_0.length; i++) {
					if (num_0[i] == 0) {
						continue;
					}
					c.rect(s.screenX + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
				}
			}
			for (var i = 0; i < num_1.length; i++) {
				if (num_1[i] == 0) {
					continue;
				}
				c.rect(s.screenX + s_x + Math.floor(i % 3) * s.step, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
			for (var i = 0; i < num_2.length; i++) {
				if (num_2[i] == 0) {
					continue;
				}
				c.rect(s.screenX + s_x + Math.floor(i % 3) * s.step + s.step * 4, s.screenY + Math.floor(i / 3) * s.step, s.step, s.step);
			}
		});
		c.fillStyle = LGlobal._create_loading_color();
		s.num.graphics.clear();
		s.num.graphics.drawRect(1, c.fillStyle, [0, s.step * 5 * (100 - value) * 0.01, LGlobal.width, LGlobal.height], true, c.fillStyle);
	};
	LoadingSample1.prototype.getNumber = function(value) {
		return this.numberList[value];
	};
	return LoadingSample1;
})();
