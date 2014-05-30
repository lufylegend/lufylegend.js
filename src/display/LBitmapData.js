
/** @language chinese
 * 创建一个具有指定的宽度和高度的 LBitmapData 对象。
 * 使用 LBitmapData 类，您可以处理 LBitmap 对象的数据（像素）。可以使用 LBitmapData 类的方法创建任意大小的Image对象，并在运行时采用多种方式操作这些图像。也可以访问使用 LLoader 类加载的Image对象。
 * @class LBitmapData
 * @extends LObject
 * @constructor
 * @param {Image} image 一个Image对象。
 * @param {int} x Image可视范围x坐标（该参数可省略）。
 * @param {int} y Image可视范围y坐标（该参数可省略）。
 * @param {int} width Image可视范围宽（该参数可省略）。
 * @param {int} height Image可视范围高（该参数可省略）。
 * @param {String} dataType 指定数据格式，可以使用LBitmapData.DATA_IMAGE（Image对象）和LBitmapData.DATA_CANVAS（Canvas对象）（该参数可省略）。
 * @example
 * 	var loader;
 * 	Linit(50,"mylegend",800,480,main);
 * 	function main(){
 * 	    loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE,loadBitmapdata); 
 * 		loader.load("img.png","bitmapData");
 * 	}
 * 	function loadBitmapdata(event){
 * 		var bitmapdata = new LBitmapData(event.currentTarget,0,0,64,64);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @since 1.0.0
 * @public
*/
/** @language english
 * Creates a BitmapData object with a specified width and height.
 * The BitmapData class lets you work with the data (pixels) of a Bitmap object . You can use the methods of the BitmapData class to create arbitrarily sized an Image object. And You can use an Image object with LLoader。
 * @class LBitmapData
 * @extends LObject
 * @constructor
 * @param {Image} image The Image object。
 * @param {int} x The x coordinate of the image.
 * @param {int} y The y coordinate of the image.
 * @param {int} width The width of the bitmap image in pixels.
 * @param {int} height The height of the bitmap image in pixels.
 * @param {String} dataType You can use the type with LBitmapData.DATA_IMAGE（Image object）or LBitmapData.DATA_CANVAS（Canvas object）。
 * @example
 * 	var loader;
 * 	Linit(50,"mylegend",800,480,main);
 * 	function main(){
 * 	    loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE,loadBitmapdata); 
 * 		loader.load("img.png","bitmapData");
 * 	}
 * 	function loadBitmapdata(event){
 * 		var bitmapdata = new LBitmapData(event.currentTarget,0,0,64,64);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 指定された幅と高さで BitmapData オブジェクトを作成します。
 * LBitmapData クラスを使用すると、LBitmap オブジェクトのデータ (ピクセル) を処理できます。LBitmapData クラスのメソッドを使用して、任意のサイズのImageを作成し、実行時に様々な方法で操作できます。LLoaderを使ってロードしたImageも利用することができます。
 * @class LBitmapData
 * @extends LObject
 * @constructor
 * @param {Image} image Image型オブジェクト。
 * @param {int} x Imageの表示範囲の座標x.
 * @param {int} y Imageの表示範囲の座標y.
 * @param {int} width Imageの表示範囲の幅。
 * @param {int} height Imageの表示範囲の高さ。
 * @param {String} dataType データータイプを指定する，使えるタイプはLBitmapData.DATA_IMAGE（Imageオブジェクト）とLBitmapData.DATA_CANVAS（Canvasオブジェクト）です。
 * @example
 * 	var loader;
 * 	Linit(50,"mylegend",800,480,main);
 * 	function main(){
 * 	    loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE,loadBitmapdata); 
 * 		loader.load("img.png","bitmapData");
 * 	}
 * 	function loadBitmapdata(event){
 * 		var bitmapdata = new LBitmapData(event.currentTarget,0,0,64,64);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @since 1.0.0
 * @public
 */
var LBitmapData = (function () {
	function LBitmapData (image, x, y, width, height, dataType) {
		base (this, LObject, []);
		var s = this;
		s.type = "LBitmapData";
		if (typeof dataType == UNDEFINED) {
			dataType = LBitmapData.DATA_IMAGE;
		}
		s.oncomplete = null;
		s._locked = false;
		s._setPixel = false;
		s.x = (x == null ? 0 : x);  
		s.y = (y == null ? 0 : y);
		if (image && typeof image == "object") {
			s.image = image;
			s.dataType = LBitmapData.DATA_IMAGE;
			s.width = (width == null ? s.image.width : width);  
			s.height = (height == null ? s.image.height : height);
			s._setDataType(dataType);
		} else {
			s._createCanvas();
			s.dataType = LBitmapData.DATA_CANVAS;
			s._canvas.width = s.width = (width == null ? 1 : width); 
			s._canvas.height = s.height = (height == null ? 1 : height);
			var d = s._context.createImageData(s.width, s.height);
			if (typeof image == "string") {
				image = parseInt(image.replace("#","0x"));
			}
			if (typeof image == "number") {
				for (var i = 0; i < d.data.length; i += 4) {
					d.data[i + 0] = image >> 16 & 0xFF;
					d.data[i + 1] = image >> 8 & 0xFF;
					d.data[i + 2] = image & 0xFF;
					d.data[i + 3] = 255;
				}
			}
			s._context.putImageData(d, 0, 0);
			s.image = s._canvas;
			if (dataType == LBitmapData.DATA_IMAGE) {
				s._setDataType(dataType);
			}
		}
		s.resize();
	}
	/** @language chinese
	 * 位图图像的位置x，以像素为单位。
	 * @property x
	 * @type Number
	*/
	/** @language chinese
	 * 位图图像的位置y，以像素为单位。
	 * @property y
	 * @type Number
	*/
	/** @language chinese
	 * 位图图像的宽度，以像素为单位。
	 * @property width
	 * @type Number
	*/
	/** @language chinese
	 * 位图图像的高度，以像素为单位。
	 * @property height
	 * @type Number
	*/
	
	/** @language chinese
	 * LBitmapData数据保存形式的一种，以Image对象形式保存。
	 * @property LBitmapData.DATA_IMAGE
	 * @type String
	 * @final
	 * @static
	 * @readOnly
	*/
	LBitmapData.DATA_IMAGE = "data_image";
	/** @language chinese
	 * LBitmapData数据保存形式的一种，以Canvas对象形式保存。
	 * @property LBitmapData.DATA_CANVAS
	 * @type String
	 * @final
	 * @static
	 * @readOnly
	*/
	LBitmapData.DATA_CANVAS = "data_canvas";
	var p = {
		_setDataType : function (dataType) {
			var s = this;
			if (s.dataType == dataType) {
				return;
			}
			if (dataType == LBitmapData.DATA_CANVAS) {
				s._createCanvas();
				s._canvas.width = s.image.width;
				s._canvas.height = s.image.height;
				s._context.clearRect(0, 0, s._canvas.width, s._canvas.height);
				s._context.drawImage(s.image, 0, 0);
				s.image = s._canvas;
			} else if (dataType == LBitmapData.DATA_IMAGE) {
				s.image = new Image();
				s.image.width = s._canvas.width;
				s.image.height = s._canvas.height;
				s.image.src = s._canvas.toDataURL();
			}
			s.dataType = dataType;
		}
		, _createCanvas : function () {
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		}
		/** @language chinese
		 * 用来改变LBitmapData内Image的可视范围
		 * @method setProperties
		 * @param {int} x Image可视范围x坐标。
		 * @param {int} y Image可视范围y坐标。
		 * @param {int} width Image可视范围宽。
		 * @param {int} height Image可视范围高。
		 * @example
		 * 	var loader;
		 * 	Linit(50,"mylegend",800,480,main);
		 * 	function main(){
		 * 	    loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE,loadBitmapdata); 
		 * 		loader.load("img.png","bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var bitmapdata = new LBitmapData(event.currentTarget,0,0,64,64);  
		 * 		bitmapdata.setProperties(50,100,200,50);
		 * 		var bitmap = new LBitmap(bitmapdata);
		 * 		addChild(bitmap);
		 * 	}
		 * @public
		 * @since 1.0.0
		*/
		, setProperties : function (x, y, width, height) {
			var s = this;
			s.x = x;
			s.y = y;
			s.width = width;
			s.height = height;
			s.resize();
		}
		/** @language chinese
		 * 用来改变LBitmapData内Image的可视范围的起点位置坐标
		 * @method setCoordinate
		 * @param {int} [x] Image可视范围x坐标。
		 * @param {int} [y] Image可视范围y坐标。
		 * @example
		 * 	var loader;
		 * 	Linit(50,"mylegend",800,480,main);
		 * 	function main(){
		 * 	    loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE,loadBitmapdata); 
		 * 		loader.load("img.png","bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var bitmapdata = new LBitmapData(event.currentTarget,0,0,64,64);  
		 * 		bitmapdata.setCoordinate(50,100);
		 * 		var bitmap = new LBitmap(bitmapdata);
		 * 		addChild(bitmap);
		 * 	}
		 * @since 1.0.0
		 * @public
		*/
		, setCoordinate : function (x, y) {
			var s = this;
			s.x = x;
			s.y = y;
			s.resize();
		}
		, clone : function () {
			var s = this;
			return new LBitmapData(s.image, s.x, s.y, s.width, s.height, s.dataType);
		}
		, ready : function () {
			var s = this;
			s._dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			s._data = s._context.getImageData(s.x, s.y, s.width, s.height);
		}
		, _update : function () {
			var s = this;
			s._context.putImageData(s._data, s.x, s.y, 0, 0, s.width, s.height);
			s._setDataType(s._dataType);
		}
		, getPixel : function (x, y, colorType) {
			var s = this, i, d;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s.ready();
			}
			i = s._canvas.width * 4 * (s.y + y) + (s.x + x) * 4;
			d = s._data.data;
			if (!s._locked) {
				s._update();
			}
			if (colorType == "number") {
				return d[i] << 16 | d[i + 1] << 8 | d[i + 2];
			} else {
				return [d[i], d[i + 1], d[i + 2], d[i + 3]];
			}
		}
		, getPixels : function (rect) {
			var s = this, r;
			if (!s._locked) {
				s.ready();
			}
			r = s._context.getImageData(rect.x, rect.y, rect.width, rect.height);
			if (!s._locked) {
				s._update();
			}
			return r;
		}
		, lock : function () {
			var s = this;
			s._locked = true;
			s.ready();
		}
		, unlock : function () {
			var s = this;
			s._locked = false;
			s._update();
		}
		, setPixel : function (x, y, data) {
			var s = this;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s.ready();
			}
			var d = s._data, i = s._canvas.width * 4 * (s.y + y) + (s.x + x) * 4;
			if (typeof data == "object") {
				d.data[i + 0] = data[0];
				d.data[i + 1] = data[1];
				d.data[i + 2] = data[2];
				d.data[i + 3] = 255;
			} else {
				if (typeof data == "string") {
					data = parseInt(data.replace("#", "0x"));
				}
				d.data[i + 0] = data >> 16 & 0xFF;
				d.data[i + 1] = data >> 8 & 0xFF;
				d.data[i + 2] = data & 0xFF;
				d.data[i + 3] = 255;
			}
			if (!s._locked) {
				s._update();
			}
		}
		, setPixels : function (rect, data) {
			var s = this, i, j, d, w, sd, x, y;
			if (!s._locked) {
				s.ready();
			}
			d = s._data;
			if (typeof data == "object") {
				w = s._canvas.width;
				for (x = rect.x; x < rect.right; x++) {
					for (y = rect.y; y < rect.bottom; y++) {
						i = w * 4 * (s.y + y) + (s.x + x) * 4;
						j = data.width * 4 * (y - rect.y) + (x - rect.x) * 4;
						d.data[i + 0] = data.data[j + 0];
						d.data[i + 1] = data.data[j + 1];
						d.data[i + 2] = data.data[j + 2];
						d.data[i + 3] = 255;
					}
				}
			} else {
				if (typeof data == "string") {
					data = parseInt(data.replace("#", "0x"));
				}
				data = [data >> 16 & 0xFF, data >> 8 & 0xFF, data & 0xFF];
				w = s._canvas.width;
				for (x = rect.x; x < rect.right; x++) {
					for (y = rect.y; y < rect.bottom; y++) {
						i = w * 4 * (s.y + y) + (s.x + x) * 4;
						d.data[i + 0] = data[0];
						d.data[i + 1] = data[1];
						d.data[i + 2] = data[2];
						d.data[i + 3] = 255;
					}
				}
			}
			if (!s._locked) {
				s._update();
			}
		}
		, draw : function (source) {
			var s = this;
			if (s.dataType == LBitmapData.DATA_CANVAS) {
				s._context.clearRect(0, 0, s.width, s.height);
				s._context.drawImage(source.getDataCanvas(), 0, 0);
			} else if (s.dataType == LBitmapData.DATA_IMAGE) {
				s.image.src = source.getDataURL();
			}
			s.resize();
		}
		, resize : function () {
			var s = this, w = s.image.width - s.x, h = s.image.height - s.y;
			s.width = s.width < w ? s.width : w;
			s.height = s.height < h ? s.height : h;
		}
	};
	for (var k in p) {
		LBitmapData.prototype[k] = p[k];
	}
	return LBitmapData;
})();