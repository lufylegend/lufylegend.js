
/** @language chinese
 * <p>创建一个具有指定的宽度和高度的 LBitmapData 对象。</p>
 * <p>使用 LBitmapData 类，您可以处理 LBitmap 对象的数据（像素）。可以使用 LBitmapData 类的方法创建任意大小的Image对象，并在运行时采用多种方式操作这些图像。也可以访问使用 LLoader 类加载的Image对象。</p>
 * @class LBitmapData
 * @extends LObject
 * @constructor
 * @param {Image} image 一个Image对象。
 * @param {float} x Image可视范围x坐标（该参数可省略）。
 * @param {float} y Image可视范围y坐标（该参数可省略）。
 * @param {float} width Image可视范围宽（该参数可省略）。
 * @param {float} height Image可视范围高（该参数可省略）。
 * @param {String} dataType 指定数据格式，可以使用LBitmapData.DATA_IMAGE（Image对象）和LBitmapData.DATA_CANVAS（Canvas对象）（该参数可省略）。
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 		
 * 		var bitmapdata2 = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bitmap2 = new LBitmap(bitmapdata2);
 * 		bitmap2.x = 200;
 * 		addChild(bitmap2);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmapData/index.html" target="_blank">测试链接</a></p>
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
 * @param {float} x The x coordinate of the image.(Optional).
 * @param {float} y The y coordinate of the image.(Optional).
 * @param {float} width The width of the bitmap image in pixels.(Optional).
 * @param {float} height The height of the bitmap image in pixels.(Optional).
 * @param {String} dataType You can use the type with LBitmapData.DATA_IMAGE（Image object）or LBitmapData.DATA_CANVAS（Canvas object）。(Optional).
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 		
 * 		var bitmapdata2 = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bitmap2 = new LBitmap(bitmapdata2);
 * 		bitmap2.x = 200;
 * 		addChild(bitmap2);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmapData/index.html" target="_blank">Try it »</a></p>
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
 * @param {float} x Imageの表示範囲の座標x.(省略可).
 * @param {float} y Imageの表示範囲の座標y.(省略可).
 * @param {float} width Imageの表示範囲の幅。(省略可).
 * @param {float} height Imageの表示範囲の高さ。(省略可).
 * @param {String} dataType データータイプを指定する，使えるタイプはLBitmapData.DATA_IMAGE（Imageオブジェクト）とLBitmapData.DATA_CANVAS（Canvasオブジェクト）です。(省略可).
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 		
 * 		var bitmapdata2 = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bitmap2 = new LBitmap(bitmapdata2);
 * 		bitmap2.x = 200;
 * 		addChild(bitmap2);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmapData/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LBitmapData = (function () {
	function LBitmapData (image, x, y, width, height, dataType) {
		var s = this;
		LExtends (s, LObject, []);
		s.type = "LBitmapData";
		if (typeof dataType == UNDEFINED) {
			dataType = LBitmapData.DATA_IMAGE;
		}
		s.oncomplete = null;
		s._locked = false;
		s._setPixel = false;
		/** @language chinese
		 * 位图图像的位置x，以像素为单位。
		 * @property x
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * The location x of the bitmap image in pixels.
		 * @property x
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * ビットマップイメージの位置x（ピクセル単位）です。
		 * @property x
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		s.x = (x == null ? 0 : x);
		/** @language chinese
		 * 位图图像的位置y，以像素为单位。
		 * @property y
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * The location y of the bitmap image in pixels.
		 * @property y
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * ビットマップイメージの位置y（ピクセル単位）です。
		 * @property y
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		s.y = (y == null ? 0 : y);
		/** @language chinese
		 * 位图图像的宽度，以像素为单位。
		 * @property width
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * The width of the bitmap image in pixels.
		 * @property width
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * ビットマップイメージの幅（ピクセル単位）です。
		 * @property width
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		s.width = 0;
		/** @language chinese
		 * 位图图像的高度，以像素为单位。
		 * @property height
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * The height of the bitmap image in pixels.
		 * @property height
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * ビットマップイメージの高さ（ピクセル単位）です。
		 * @property height
		 * @type float
		 * @since 1.0.0
		 * @public
		 */
		s.height = 0;
		/** @language chinese
		 * 数据格式，LBitmapData.DATA_IMAGE（Image对象）或者LBitmapData.DATA_CANVAS（Canvas对象）
		 * @property dataType
		 * @type String
		 * @since 1.8.8
		 * @public
		 */
		/** @language english
		 * data type, LBitmapData.DATA_IMAGE（Image object）or LBitmapData.DATA_CANVAS（Canvas object）。
		 * @property dataType
		 * @type String
		 * @since 1.8.8
		 * @public
		 */
		/** @language japanese
		 * データータイプ，値はLBitmapData.DATA_IMAGE（Imageオブジェクト）またはLBitmapData.DATA_CANVAS（Canvasオブジェクト）です。
		 * @property dataType
		 * @type String
		 * @since 1.8.8
		 * @public
		 */
		s.dataType = null;
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
			if (typeof image == "string") {
				image = parseInt(image.replace("#","0x"));
			}
			if (typeof image == "number") {
				var d = s._context.createImageData(s.width, s.height);
				for (var i = 0; i < d.data.length; i += 4) {
					d.data[i + 0] = image >> 16 & 0xFF;
					d.data[i + 1] = image >> 8 & 0xFF;
					d.data[i + 2] = image & 0xFF;
					d.data[i + 3] = 255;
				}
				s._context.putImageData(d, 0, 0);
			}
			
			s.image = s._canvas;
			if (dataType == LBitmapData.DATA_IMAGE) {
				s._setDataType(dataType);
			}
		}
		s.resize();
	}
	/** @language chinese
	 * LBitmapData数据保存形式的一种，以Image对象形式保存。
	 * @property LBitmapData.DATA_IMAGE
	 * @type String
	 * @since 1.8.8
	 * @static
	 * @public
	*/
	/** @language english
	 * data type of the LBitmapData. Image object。
	 * @property LBitmapData.DATA_IMAGE
	 * @type String
	 * @since 1.8.8
	 * @static
	 * @public
	 */
	/** @language japanese
	 * LBitmapDataのデーターの保存形式です，Image オブジェクト。
	 * @property LBitmapData.DATA_IMAGE
	 * @type String
	 * @since 1.8.8
	 * @static
	 * @public
	 */
	LBitmapData.DATA_IMAGE = "data_image";
	/** @language chinese
	 * LBitmapData数据保存形式的一种，以Canvas对象形式保存。
	 * @property LBitmapData.DATA_CANVAS
	 * @type String
	 * @since 1.8.8
	 * @static
	 * @public
	*/
	/** @language english
	 * data type of the LBitmapData. Canvas object。
	 * @property LBitmapData.DATA_CANVAS
	 * @type String
	 * @since 1.8.8
	 * @static
	 * @public
	 */
	/** @language japanese
	 * LBitmapDataのデーターの保存形式です，Canvas オブジェクト。
	 * @property LBitmapData.DATA_CANVAS
	 * @type String
	 * @since 1.8.8
	 * @static
	 * @public
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
		},
		_createCanvas : function () {
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		/** @language chinese
		 * 用来改变LBitmapData内Image的可视范围
		 * @method setProperties
		 * @param {float} x Image可视范围x坐标。
		 * @param {float} y Image可视范围y坐标。
		 * @param {float} width Image可视范围宽。
		 * @param {float} height Image可视范围高。
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 0, 0, 200, 200);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget);
		 * 	bitmapdata2.setProperties(50, 100, 200, 50);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 240;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setProperties.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.0.0
		 */
		/** @language english
		 * Change the Image's visual range
		 * @method setProperties
		 * @param {float} x The x coordinate of the image.
		 * @param {float} y The y coordinate of the image.
		 * @param {float} width The width of the bitmap image in pixels.
		 * @param {float} height The height of the bitmap image in pixels.
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 0, 0, 200, 200);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget);
		 * 	bitmapdata2.setProperties(50, 100, 200, 50);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 240;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setProperties.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.0.0
		 */
		/** @language japanese
		 * LBitmapData内のImageの表示範囲を変更する
		 * @method setProperties
		 * @param {float} x Imageの表示範囲の座標x.
		 * @param {float} y Imageの表示範囲の座標y.
		 * @param {float} width Imageの表示範囲の幅。
		 * @param {float} height Imageの表示範囲の高さ。
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 0, 0, 200, 200);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget);
		 * 	bitmapdata2.setProperties(50, 100, 200, 50);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 240;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setProperties.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.0.0
		 */
		setProperties : function (x, y, width, height) {
			var s = this;
			s.x = x;
			s.y = y;
			s.width = width;
			s.height = height;
			s.resize();
		},
		/** @language chinese
		 * 用来改变LBitmapData内Image的可视范围的起点位置坐标
		 * @method setCoordinate
		 * @param {float} x Image可视范围x坐标。
		 * @param {float} y Image可视范围y坐标。
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	bitmapdata2.setCoordinate(100, 100);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 120;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setCoordinate.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * Change coordinate of the Image's visual range
		 * @method setCoordinate
		 * @param {float} x The x coordinate of the image.
		 * @param {float} y The y coordinate of the image.
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	bitmapdata2.setCoordinate(100, 100);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 120;
		 * 	addChild(bitmap2);
		 * @since 1.0.0
		 * @public
		 * @examplelink <p><a href="../../../api/LBitmapData/setCoordinate.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData内のImageの表示範囲の座標を変更する
		 * @method setCoordinate
		 * @param {float} x Imageの表示範囲の座標x.
		 * @param {float} y Imageの表示範囲の座標y.
		 * @example
		 * 	var bitmapdata1 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	var bitmap1 = new LBitmap(bitmapdata1);
		 * 	addChild(bitmap1);
		 * 	
		 * 	var bitmapdata2 = new LBitmapData(event.currentTarget, 20, 20, 100, 100);
		 * 	bitmapdata2.setCoordinate(100, 100);
		 * 	var bitmap2 = new LBitmap(bitmapdata2);
		 * 	bitmap2.x = 120;
		 * 	addChild(bitmap2);
		 * @since 1.0.0
		 * @public
		 * @examplelink <p><a href="../../../api/LBitmapData/setCoordinate.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setCoordinate : function (x, y) {
			var s = this;
			s.x = x;
			s.y = y;
			s.resize();
		},
		/** @language chinese
		 * 返回一个LBitmapData的克隆对象。
		 * @method clone
		 * @return {LBitmapData} 一个新的 LBitmapData 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd1 = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd1);
		 * 	addChild(bm1);
		 * 	
		 * 	var bmd2 = bmd1.clone();
		 * 	var bm2 = new LBitmap(bmd2);
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmapData/clone.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns a new BitmapData object that is a clone of the original instance with an exact copy of the contained bitmap.
		 * @method clone
		 * @return {LBitmapData} A new BitmapData object that is identical to the original.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd1 = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd1);
		 * 	addChild(bm1);
		 * 	
		 * 	var bmd2 = bmd1.clone();
		 * 	var bm2 = new LBitmap(bmd2);
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmapData/clone.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 新しい BitmapData オブジェクトとして、元のインスタンスのクローンを返します。含まれるビットマップはまったく同じコピーになります。
		 * @method clone
		 * @return {LBitmapData} 元のオブジェクトと同一の新しい LBitmapData オブジェクトです。
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd1 = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd1);
		 * 	addChild(bm1);
		 * 	
		 * 	var bmd2 = bmd1.clone();
		 * 	var bm2 = new LBitmap(bmd2);
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmapData/clone.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		clone : function () {
			var s = this;
			return new LBitmapData(s.image, s.x, s.y, s.width, s.height, s.dataType);
		},
		_ready : function () {
			var s = this;
			s._dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			s._data = s._context.getImageData(s.x, s.y, s.width, s.height);
		},
		_update : function () {
			var s = this;
			s._context.putImageData(s._data, s.x, s.y, 0, 0, s.width, s.height);
			s._setDataType(s._dataType);
			s._data = null;
		},
		/** @language chinese
		 * 返回一个数组，它表示 LBitmapData 对象中在特定点 (x, y) 处的 RGB 像素数据。
		 * @method getPixel
		 * @param {int} x 指定坐标点x坐标。
		 * @param {int} y 指定坐标点y坐标。
		 * @param {String} colorType 指定获取的颜色种类。[number|array]（可省略）。
		 * @return {Array} 像素数据。
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img, imgs = [], arr;
		 * 	bitmapData.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		 arr = [];
		 * 		 for (var j = 0; j < 50; j++) {
		 * 			img = bitmapData.getPixel(100 + i, 100 + j);
		 * 			arr.push(img);
		 * 		}
		 * 		imgs.push(arr);
		 * 	}
		 * 	bitmapData.unlock();
		 * 	bitmapData2.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		arr = imgs[i];
		 * 		for (var j = 0; j < 50; j++) {
		 * 			img = arr[j];
		 * 			bitmapData2.setPixel(i, j, img);
		 * 		}
		 * 	}
		 * 	bitmapData2.unlock();
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.x = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixel.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns an integer that represents an RGB pixel value from a BitmapData object at a specific point (x, y).
		 * @method getPixel
		 * @param {int} x The x position of the pixel.
		 * @param {int} y The y position of the pixel.
		 * @param {String} colorType the color type. [number|array].(Optional).
		 * @return {Array} A array that represents an RGB pixel value.
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img, imgs = [], arr;
		 * 	bitmapData.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		 arr = [];
		 * 		 for (var j = 0; j < 50; j++) {
		 * 			img = bitmapData.getPixel(100 + i, 100 + j);
		 * 			arr.push(img);
		 * 		}
		 * 		imgs.push(arr);
		 * 	}
		 * 	bitmapData.unlock();
		 * 	bitmapData2.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		arr = imgs[i];
		 * 		for (var j = 0; j < 50; j++) {
		 * 			img = arr[j];
		 * 			bitmapData2.setPixel(i, j, img);
		 * 		}
		 * 	}
		 * 	bitmapData2.unlock();
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.x = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixel.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData オブジェクトの特定ポイント (x, y) の RGB ピクセル値を表す整数を返します。
		 * @method getPixel
		 * @param {int} x ピクセルの x 座標です。
		 * @param {int} y ピクセルの y 座標です。
		 * @param {String} colorType 取得するカラータイプを指定する。[number|array]（省略可）。
		 * @return {Array} RGB ピクセル値を表す数値。
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img, imgs = [], arr;
		 * 	bitmapData.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		 arr = [];
		 * 		 for (var j = 0; j < 50; j++) {
		 * 			img = bitmapData.getPixel(100 + i, 100 + j);
		 * 			arr.push(img);
		 * 		}
		 * 		imgs.push(arr);
		 * 	}
		 * 	bitmapData.unlock();
		 * 	bitmapData2.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		arr = imgs[i];
		 * 		for (var j = 0; j < 50; j++) {
		 * 			img = arr[j];
		 * 			bitmapData2.setPixel(i, j, img);
		 * 		}
		 * 	}
		 * 	bitmapData2.unlock();
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.x = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixel.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getPixel : function (x, y, colorType) {
			var s = this, i, d;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			i = s.width * 4 * y + x * 4;
			d = s._data.data;
			if (!s._locked) {
				s._update();
			}
			if (colorType == "number") {
				return d[i] << 16 | d[i + 1] << 8 | d[i + 2];
			} else {
				return [d[i], d[i + 1], d[i + 2], d[i + 3]];
			}
		},
		/** @language chinese
		 * 返回一个数组，它表示 LBitmapData 对象中在特定点 (x, y) 处的 RGB 像素数据。
		 * @method setPixel
		 * @param {int} x 指定坐标点x坐标。
		 * @param {int} y 指定坐标点y坐标。
		 * @param {Array} data 像素数据。
		 * @return {Array} 像素数据。
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img, imgs = [], arr;
		 * 	bitmapData.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		 arr = [];
		 * 		 for (var j = 0; j < 50; j++) {
		 * 			img = bitmapData.getPixel(100 + i, 100 + j);
		 * 			arr.push(img);
		 * 		}
		 * 		imgs.push(arr);
		 * 	}
		 * 	bitmapData.unlock();
		 * 	bitmapData2.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		arr = imgs[i];
		 * 		for (var j = 0; j < 50; j++) {
		 * 			img = arr[j];
		 * 			bitmapData2.setPixel(i, j, img);
		 * 		}
		 * 	}
		 * 	bitmapData2.unlock();
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.x = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixel.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns an integer that represents an RGB pixel value from a BitmapData object at a specific point (x, y).
		 * @method setPixel
		 * @param {int} x The x position of the pixel whose value changes.
		 * @param {int} y The y position of the pixel whose value changes.
		 * @param {Array} data The resulting pixel data for the pixel.
		 * @return {Array} A array that represents an RGB pixel value.
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img, imgs = [], arr;
		 * 	bitmapData.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		 arr = [];
		 * 		 for (var j = 0; j < 50; j++) {
		 * 			img = bitmapData.getPixel(100 + i, 100 + j);
		 * 			arr.push(img);
		 * 		}
		 * 		imgs.push(arr);
		 * 	}
		 * 	bitmapData.unlock();
		 * 	bitmapData2.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		arr = imgs[i];
		 * 		for (var j = 0; j < 50; j++) {
		 * 			img = arr[j];
		 * 			bitmapData2.setPixel(i, j, img);
		 * 		}
		 * 	}
		 * 	bitmapData2.unlock();
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.x = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixel.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData オブジェクトの特定ポイント (x, y) の RGB ピクセル値を表す整数を返します。
		 * @method setPixel
		 * @param {int} x 値が変更されるピクセルの x 座標です。
		 * @param {int} y 値が変更されるピクセルの y 座標です。
		 * @param {Array} data 結果として生成される、ピクセルの RGB カラーデータです。
		 * @return {Array} RGB ピクセル値を表す数値。
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img, imgs = [], arr;
		 * 	bitmapData.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		 arr = [];
		 * 		 for (var j = 0; j < 50; j++) {
		 * 			img = bitmapData.getPixel(100 + i, 100 + j);
		 * 			arr.push(img);
		 * 		}
		 * 		imgs.push(arr);
		 * 	}
		 * 	bitmapData.unlock();
		 * 	bitmapData2.lock();
		 * 	for (var i = 0; i < 50; i++) {
		 * 		arr = imgs[i];
		 * 		for (var j = 0; j < 50; j++) {
		 * 			img = arr[j];
		 * 			bitmapData2.setPixel(i, j, img);
		 * 		}
		 * 	}
		 * 	bitmapData2.unlock();
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.x = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixel.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setPixel : function (x, y, data) {
			var s = this;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			var d = s._data, i = s.width * 4 * y + x * 4;
			if (typeof data == "object") {
				d.data[i + 0] = data[0];
				d.data[i + 1] = data[1];
				d.data[i + 2] = data[2];
				d.data[i + 3] = data[3];
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
		},
		/** @language chinese
		 * 返回一个数组，它表示 LBitmapData 对象中在特定矩形区域rect中的像素数据。
		 * @method getPixels
		 * @param {LRectangle} rect 指定矩形。
		 * @return {Array} 返回该矩形区域的像素数据。
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData2.lock();
		 * 	bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 * 	bitmapData2.unlock(); 
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixels.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Generates an array from a rectangular region of pixel data.
		 * @method getPixels
		 * @param {LRectangle} rect A rectangular area in the current BitmapData object.
		 * @return {Array} the pixels in the given Rectangle.
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData2.lock();
		 * 	bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 * 	bitmapData2.unlock(); 
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixels.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * ピクセルデータの矩形領域からバイト配列を生成します。
		 * @method getPixels
		 * @param {LRectangle} rect 現在の BitmapData オブジェクト内の矩形領域です。
		 * @return {Array} 特定の矩形内のピクセルを表す配列です
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData2.lock();
		 * 	bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 * 	bitmapData2.unlock(); 
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/getPixels.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getPixels : function (rect) {
			var s = this, r;
			if (!s._locked) {
				s._ready();
			}
			r = s._context.getImageData(s.x + rect.x, s.y + rect.y, rect.width, rect.height);
			if (!s._locked) {
				s._update();
			}
			return r;
		},
		/** @language chinese
		 * 设置 LBitmapData 对象的指定区域的像素数据。
		 * @method setPixels
		 * @param {LRectangle} rect 指定矩形。
		 * @param {Array} data 像素数据。（ImageData对象 | 字符串"#000000" | 数值0x000000）
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData2.lock();
		 * 	bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 * 	bitmapData2.unlock(); 
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixels.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Sets rect pixels of a LBitmapData object.
		 * @method setPixels
		 * @param {LRectangle} rect Specifies the rectangular region of the BitmapData object.
		 * @param {Array} data the values to be used in the rectangular region.(ImageData object | String"#000000" | Number0x000000)
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData2.lock();
		 * 	bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 * 	bitmapData2.unlock(); 
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixels.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LBitmapData オブジェクトの指定する矩形領域のピクセルを設定します。
		 * @method setPixels
		 * @param {LRectangle} rect LBitmapData オブジェクトの矩形領域を指定します。
		 * @param {Array} data 矩形領域で使用されるピクセル値です。(ImageDataオブジェクト | String"#000000" | Number0x000000)
		 * @since 1.5.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400);
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData2.lock();
		 * 	bitmapData2.setPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(100, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(150, 30, 50, 50), img);
		 * 	bitmapData2.setPixels(new LRectangle(200, 30, 50, 50), img);
		 * 	bitmapData2.unlock(); 
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/setPixels.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setPixels : function (rect, data) {
			var s = this, i, j, d, w, sd, x, y;
			if (!s._locked) {
				s._ready();
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
						d.data[i + 3] = data.data[j + 3];
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
		},
		/** @language chinese
		 * <p>设置 LBitmapData 对象的指定区域的像素数据。使用条件如下：</p>
		 * <p>1，数据保存形式为LBitmapData.DATA_CANVAS。</p>
		 * <p>2，每桢单次或少量次数操作，且不与setPixel,setPixels,getPixel,getPixels等函数同时进行。</p>
		 * <p>满足以上两个条件，可以使用putPixels来代替setPixels来更快速的设置像素，且不需要lock和unlock。</p>
		 * @method putPixels
		 * @param {LRectangle} rect 指定矩形。
		 * @param {Array} data 像素数据。（ImageData对象）
		 * @since 1.9.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400,LBitmapData.DATA_CANVAS);
		 * 	bitmapData.lock();
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData.unlock();
		 * 	
		 * 	bitmapData2.putPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/putPixels.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Sets a single pixel of a LBitmapData object.
		 * <p>Sets rect pixels of a LBitmapData object. Conditions：</p>
		 * <p>1，The data type of the LBitmapData is Canvas object。</p>
		 * <p>2，Operate only once or a small number，Do not using setPixel, setPixels, getPixel, getPixels at the same time。</p>
		 * <p>You can use putPixels instead setPixels, but fast，and do not need to lock and unlock.</p>
		 * @method putPixels
		 * @param {LRectangle} rect Specifies the rectangular region of the BitmapData object.
		 * @param {Array} data the values to be used in the rectangular region.(ImageData object)
		 * @since 1.9.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400,LBitmapData.DATA_CANVAS);
		 * 	bitmapData.lock();
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData.unlock();
		 * 	
		 * 	bitmapData2.putPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/putPixels.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>LBitmapData オブジェクトの指定する矩形領域のピクセルを設定します。使う条件は下記となります：</p>
		 * <p>1，LBitmapDataのデーターの保存形式はCanvas オブジェクトである。</p>
		 * <p>2，フレームごと一回か数回だけ使う，そしてsetPixel,setPixels,getPixel,getPixelsなどと同時に使わない。</p>
		 * <p>上記の二つの条件を満足したら、setPixelsの代わりにputPixelsを使って、速く処理することができます，そしてlockとunlockは要りません。</p>
		 * @method putPixels
		 * @param {LRectangle} rect LBitmapData オブジェクトの矩形領域を指定します。
		 * @param {Array} data 矩形領域で使用されるピクセル値です。(ImageData オブジェクト)
		 * @since 1.9.1
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);
		 * 	bitmapData2 = new LBitmapData(null, 0, 0, 500, 400,LBitmapData.DATA_CANVAS);
		 * 	bitmapData.lock();
		 * 	var img = bitmapData.getPixels(new LRectangle(75, 50, 100, 100));
		 * 	bitmapData.unlock();
		 * 	
		 * 	bitmapData2.putPixels(new LRectangle(50, 30, 50, 50), img);
		 * 	
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	addChild(bitmap);
		 * 	
		 * 	var bitmap2 = new LBitmap(bitmapData2);
		 * 	bitmap2.y = 250;
		 * 	addChild(bitmap2);
		 * @examplelink <p><a href="../../../api/LBitmapData/putPixels.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		putPixels : function (rect, data) {
			var s = this;
			if (s.dataType != LBitmapData.DATA_CANVAS || typeof data != "object") {
				return;
			}
			s._context.putImageData(data, s.x + rect.x, s.y + rect.y, 0, 0, rect.width, rect.height);
		},
		/** @language chinese
		 * 此函数将操作对象锁定，保证操作对象在另一个临时操作的canvas上只绘制一遍。
		 * @method lock
		 * @since 1.5.1
		 * @public
		 */
		/** @language english
		 * Locks an image so that any objects that reference the BitmapData object, such as Bitmap objects, are not updated when this BitmapData object changes.
		 * @method lock
		 * @since 1.5.1
		 * @public
		 */
		/** @language japanese
		 * ピクセルデータを操作する時、もう一つの非表示canvasを使っています、この関数使うと、LBitmapDataをロックして、一回しか描けないですから、効率が高くすることができます。
		 * @method lock
		 * @since 1.5.1
		 * @public
		 */
		lock : function () {
			var s = this;
			s._locked = true;
			s._ready();
		},
		/** @language chinese
		 * 拷贝像素等操作结束后，解除对操作对象的锁定。
		 * @method unlock
		 * @since 1.5.1
		 * @public
		 */
		/** @language english
		 * Unlocks an image so that any objects that reference the BitmapData object, such as Bitmap objects, are updated when this BitmapData object changes.
		 * @method unlock
		 * @since 1.5.1
		 * @public
		 */
		/** @language japanese
		 * ピクセルデータの操作が終わったら、LBitmapDataのロックを解除します。
		 * @method unlock
		 * @since 1.5.1
		 * @public
		 */
		unlock : function () {
			var s = this;
			s._locked = false;
			s._update();
		},
		/** @language chinese
		 * 在LBitmapData位图图像上绘制 source 显示对象。可以指定 matrix、colorTransform、blendMode 和目标 clipRect 参数来控制呈现的执行方式。您可以根据需要指定是否应在缩放时对位图进行平滑处理。
		 * @method draw
		 * @param {LDisplayObject|LBitmapData} source 要绘制到 LBitmapData 对象的显示对象或 LBitmapData 对象。
		 * @param {LMatrix} matrix 一个 Matrix 对象，用于缩放、旋转位图或转换位图的坐标。如果不想将矩阵转换应用于图像，请将此参数设置为恒等矩阵（使用默认 new LMatrix() 构造函数创建），或传递 null 值。
		 * @param {LColorTransform} colorTransform 一个 LColorTransform 对象，用于调整位图的颜色值。如果没有提供任何对象，则不会转换位图图像的颜色。如果必须传递此参数但又不想转换图像，请将此参数设置为使用默认 new LColorTransform() 构造函数创建的 LColorTransform 对象。<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">测试链接</a></p>
		 * @param {string} blendMode 来自 LBlendMode 类的一个字符串值，指定要应用于所生成位图的混合模式。<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">测试链接</a></p>
		 * @param {LRectangle} clipRect 一个 LRectangle 对象，定义要绘制的源对象的区域。 如果不提供此值，则不会进行剪裁，并且将绘制整个源对象。<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">测试链接</a></p>
		 * @since 1.7.7
		 * @public
		 * @example
		 * 	var layer = new LSprite();
		 * 	layer.graphics.drawRect(1, "#000000", [0, 0, 100, 100], true, "#000000");
		 * 	layer.graphics.drawRect(1, "#FF0000", [100, 0, 100, 100], true, "#FF0000");
		 * 	addChild(layer);
		 * 	
		 * 	var bitmapData = new LBitmapData(null, 0, 0, 500, 400);
		 * 	bitmapData.draw(layer);
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	bitmap.y = 150;
		 * 	addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LBitmapData/draw.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Draws the source display object onto the bitmap image, using the Flash runtime vector renderer.
		 * @method draw
		 * @param {LDisplayObject|LBitmapData} [source] The display object or LBitmapData object to draw to the LBitmapData object.
		 * @param {LMatrix} matrix A LMatrix object used to scale, rotate, or translate the coordinates of the bitmap. If you do not want to apply a matrix transformation to the image, set this parameter to an identity matrix, created with the default new LMatrix() constructor, or pass a null value.
		 * @param {LColorTransform} colorTransform A ColorTransform object that you use to adjust the color values of the bitmap. If no object is supplied, the bitmap image's colors are not transformed. If you must pass this parameter but you do not want to transform the image, set this parameter to a ColorTransform object created with the default new ColorTransform() constructor.<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">Try it »</a></p>
		 * @param {string} blendMode A string value, from the flash.display.BlendMode class, specifying the blend mode to be applied to the resulting bitmap.<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">Try it »</a></p>
		 * @param {LRectangle} clipRect A Rectangle object that defines the area of the source object to draw. If you do not supply this value, no clipping occurs and the entire source object is drawn.<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">Try it »</a></p>
		 * @since 1.7.7
		 * @public
		 * @example
		 * 	var layer = new LSprite();
		 * 	layer.graphics.drawRect(1, "#000000", [0, 0, 100, 100], true, "#000000");
		 * 	layer.graphics.drawRect(1, "#FF0000", [100, 0, 100, 100], true, "#FF0000");
		 * 	addChild(layer);
		 * 	
		 * 	var bitmapData = new LBitmapData(null, 0, 0, 500, 400);
		 * 	bitmapData.draw(layer);
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	bitmap.y = 150;
		 * 	addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LBitmapData/draw.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * source 表示オブジェクトをビットマップイメージ上に描画します。
		 * @method draw
		 * @param {LDisplayObject|LBitmapData} [source] LBitmapData オブジェクトに描画される表示オブジェクトまたは LBitmapData オブジェクトです。
		 * @param {LMatrix} matrix ビットマップの座標を拡大 / 縮小、回転、または平行移動するために使われる LMatrix オブジェクトです。マトリックス変換をイメージに適用したくない場合は、（デフォルト new LMatrix() コンストラクターを使って作成される）単位マトリックスにこのパラメーターを設定するか、null 値を渡してください。
		 * @param {LColorTransform} colorTransform ビットマップのカラー値を調整するために使用する ColorTransform オブジェクトです。オブジェクトが提供されない場合、ビットマップイメージのカラーは変換されません。このパラメーターを渡す必要があるが、イメージを変換したくない場合、このパラメーターを、デフォルトの new ColorTransform() コンストラクターを使って作成される ColorTransform オブジェクトに設定します。<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">実際のサンプルを見る</a></p>
		 * @param {string} blendMode 結果として生成されるビットマップに適用されるブレンドモードを指定する、flash.display.BlendMode クラスのストリング値です。<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">実際のサンプルを見る</a></p>
		 * @param {LRectangle} clipRect 描画するソースオブジェクトの領域を定義する矩形オブジェクトです。この値を指定しない場合、クリッピングは発生せず、ソースオブジェクト全体が描画されます。<p><a href="../../../api/LBitmapData/draw2.html" target="_blank">実際のサンプルを見る</a></p>
		 * @since 1.7.7
		 * @public
		 * @example
		 * 	var layer = new LSprite();
		 * 	layer.graphics.drawRect(1, "#000000", [0, 0, 100, 100], true, "#000000");
		 * 	layer.graphics.drawRect(1, "#FF0000", [100, 0, 100, 100], true, "#FF0000");
		 * 	addChild(layer);
		 * 	
		 * 	var bitmapData = new LBitmapData(null, 0, 0, 500, 400);
		 * 	bitmapData.draw(layer);
		 * 	var bitmap = new LBitmap(bitmapData);
		 * 	bitmap.y = 150;
		 * 	addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LBitmapData/draw.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		draw : function (source, matrix, colorTransform, blendMode, clipRect) {
			var s = this, c, bd = source, x, y, w, h, save = false;
			var _dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			if (matrix || colorTransform || blendMode || clipRect) {
				s._context.save();
				save = true;
			}
			if (clipRect) {
				if (!(bd instanceof LBitmapData)) {
					x = y = 0;
				} else {
					x = bd.x;
					y = bd.y;
				}
				bd = new LBitmapData(bd.getDataCanvas(), x + clipRect.x, y + clipRect.y, clipRect.width, clipRect.height, LBitmapData.DATA_CANVAS);
			}
			w = bd.getWidth();
			h = bd.getHeight();
			if (w == 0 || h == 0) {
				s._setDataType(_dataType);
				return;
			}
			c = bd.getDataCanvas();
			if (colorTransform) {
				bd.colorTransform(new LRectangle(0, 0, w, h), colorTransform);
				c = bd.image;
			}
			if (matrix) {
				s._context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
			}
			if (blendMode) {
				s._context.globalCompositeOperation = blendMode;
			}
			s._context.drawImage(c,
				bd.x,
				bd.y,
				w,
				h,
				0,
				0,
				w,
				h
			);
			if (save) {
				s._context.restore();
			}
			s._setDataType(_dataType);
			s.resize();
		},
		getDataCanvas : function () {
			var s = this;
			var _dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			s._setDataType(_dataType);
			return s._canvas;
		},
		getWidth : function () {
			return this.width;
		},
		getHeight : function () {
			return this.height;
		},
		resize : function () {
			var s = this, w = s.image.width - s.x, h = s.image.height - s.y;
			s.width = s.width < w ? s.width : w;
			s.height = s.height < h ? s.height : h;
		},
		/** @language chinese
		 * <p>使用 LColorTransform 对象调整位图图像的指定区域中的颜色值。如果矩形与位图图像的边界匹配，则此方法将转换整个图像的颜色值。</p>
		 * <p>使用条件：数据保存形式为LBitmapData.DATA_CANVAS。</p>
		 * @method colorTransform
		 * @param {LRectangle} rect 一个 LRectangle 对象，它定义在其中应用 LColorTransform 对象的图像区域。
		 * @param {LColorTransform} colorTransform 一个 LColorTransform 对象，它描述要应用的颜色转换值。
		 * @since 1.9.4
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapData = new LBitmapData(event.target, 0, 0, 240, 240, LBitmapData.DATA_CANVAS);
		 * 		var rect = new LRectangle(50, 50, 90, 90);
		 * 		var colorTransform = new LColorTransform(0.5, 0.7, 0.4, 1, 0, 0, 0, 0);
		 * 		bitmapData.colorTransform(rect, colorTransform);
		 * 		var bitmap = new LBitmap(bitmapData);
		 * 		addChild(bitmap);
		 * 	}
		 * @examplelink <p><a href="../../../api/LBitmapData/colorTransform.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>This method copies a rectangular area of a source image to a rectangular area of the same size at the destination point of the destination LBitmapData object.</p>
		 * <p>Conditions：The data type of the LBitmapData is Canvas object。</p>
		 * @method colorTransform
		 * @param {LRectangle} rect A LRectangle object that defines the area of the image in which the LColorTransform object is applied.
		 * @param {LColorTransform} colorTransform A LColorTransform object that describes the color transformation values to apply.
		 * @since 1.9.4
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapData = new LBitmapData(event.target, 0, 0, 240, 240, LBitmapData.DATA_CANVAS);
		 * 		var rect = new LRectangle(50, 50, 90, 90);
		 * 		var colorTransform = new LColorTransform(0.5, 0.7, 0.4, 1, 0, 0, 0, 0);
		 * 		bitmapData.colorTransform(rect, colorTransform);
		 * 		var bitmap = new LBitmap(bitmapData);
		 * 		addChild(bitmap);
		 * 	}
		 * @examplelink <p><a href="../../../api/LBitmapData/colorTransform.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>source このメソッドは、ソースイメージの矩形領域を、ターゲット LBitmapData オブジェクトのターゲットポイントにある同じサイズの矩形領域にコピーします。</p>
		 * <p>利用条件：LBitmapDataのデーターの保存形式はCanvas オブジェクトである。</p>
		 * @method colorTransform
		 * @param {LRectangle} rect LColorTransform オブジェクトが適用されるイメージの領域を定義する LRectangle オブジェクトです。
		 * @param {LColorTransform} colorTransform 適用されるカラー変換値を記述する LColorTransform オブジェクトです。
		 * @since 1.9.4
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapData = new LBitmapData(event.target, 0, 0, 240, 240, LBitmapData.DATA_CANVAS);
		 * 		var rect = new LRectangle(50, 50, 90, 90);
		 * 		var colorTransform = new LColorTransform(0.5, 0.7, 0.4, 1, 0, 0, 0, 0);
		 * 		bitmapData.colorTransform(rect, colorTransform);
		 * 		var bitmap = new LBitmap(bitmapData);
		 * 		addChild(bitmap);
		 * 	}
		 * @examplelink <p><a href="../../../api/LBitmapData/colorTransform.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		colorTransform : function (rect, colorTransform) {
			var s = this;
			if (s.dataType != LBitmapData.DATA_CANVAS) {
				return;
			}
			var x = rect.x >> 0, y = rect.y >> 0, w = rect.width >> 0, h = rect.height >> 0;
			var img = s._context.getImageData(s.x + rect.x, s.y + rect.y, rect.width, rect.height);
			var data = img.data;
			for (var i = 0, l = data.length; i < l; i += 4) {
				var r = i, g = i + 1, b = i + 2, a = i + 3;
				data[r] = data[r] * colorTransform.redMultiplier + colorTransform.redOffset;
				data[g] = data[g] * colorTransform.greenMultiplier + colorTransform.greenOffset;
				data[b] = data[b] * colorTransform.blueMultiplier + colorTransform.blueOffset;
				data[a] = data[a] * colorTransform.alphaMultiplier + colorTransform.alphaOffset;
			}
			s._context.putImageData(img, s.x + rect.x, s.y + rect.y, 0, 0, rect.width, rect.height);
		},
		/** @language chinese
		 * <p>此方法在目标 LBitmapData 对象的目标点将源图像的矩形区域复制为同样大小的矩形区域。</p>
		 * <p>使用条件：数据保存形式为LBitmapData.DATA_CANVAS。</p>
		 * @method copyPixels
		 * @param {LBitmapData} sourceBitmapData 要从中复制像素的输入位图图像。源图像可以是另一个 LBitmapData 实例，也可以指当前 LBitmapData 实例。
		 * @param {LRectangle} sourceRect 定义要用作输入的源图像区域的矩形。
		 * @param {LPoint} destPoint 目标点，它表示将在其中放置新像素的矩形区域的左上角。
		 * @since 1.9.4
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapData = new LBitmapData(event.target);
		 * 		bitmapData2 = new LBitmapData(null, 0, 0, 240, 240, LBitmapData.DATA_CANVAS);
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(0, 0, 240, 240), new LPoint(0,0));
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(50, 50, 100, 100), new LPoint(0,50));
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(100, 50, 100, 100), new LPoint(50,150));
		 * 		
		 * 		var bitmap = new LBitmap(bitmapData);
		 * 		addChild(bitmap);
		 * 		
		 * 		var bitmap2 = new LBitmap(bitmapData2);
		 * 		bitmap2.y = 250;
		 * 		addChild(bitmap2);
		 * 	}
		 * @examplelink <p><a href="../../../api/LBitmapData/copyPixels.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>This method copies a rectangular area of a source image to a rectangular area of the same size at the destination point of the destination LBitmapData object.</p>
		 * <p>Conditions：The data type of the LBitmapData is Canvas object。</p>
		 * @method copyPixels
		 * @param {LBitmapData} sourceBitmapData The input bitmap image from which to copy pixels. The source image can be a different LBitmapData instance, or it can refer to the current LBitmapData instance.
		 * @param {LRectangle} sourceRect A rectangle that defines the area of the source image to use as input.
		 * @param {LPoint} destPoint The destination point that represents the upper-left corner of the rectangular area where the new pixels are placed.
		 * @since 1.9.4
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapData = new LBitmapData(event.target);
		 * 		bitmapData2 = new LBitmapData(null, 0, 0, 240, 240, LBitmapData.DATA_CANVAS);
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(0, 0, 240, 240), new LPoint(0,0));
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(50, 50, 100, 100), new LPoint(0,50));
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(100, 50, 100, 100), new LPoint(50,150));
		 * 		
		 * 		var bitmap = new LBitmap(bitmapData);
		 * 		addChild(bitmap);
		 * 		
		 * 		var bitmap2 = new LBitmap(bitmapData2);
		 * 		bitmap2.y = 250;
		 * 		addChild(bitmap2);
		 * 	}
		 * @examplelink <p><a href="../../../api/LBitmapData/copyPixels.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>source このメソッドは、ソースイメージの矩形領域を、ターゲット LBitmapData オブジェクトのターゲットポイントにある同じサイズの矩形領域にコピーします。</p>
		 * <p>利用条件：LBitmapDataのデーターの保存形式はCanvas オブジェクトである。</p>
		 * @method copyPixels
		 * @param {LBitmapData} sourceBitmapData ピクセルのコピー元となる入力ビットマップイメージです。ソースイメージは、別の LBitmapData インスタンスにすることも、現在の LBitmapData インスタンスを参照することもできます。
		 * @param {LRectangle} sourceRect 入力として使用するソースイメージの領域を定義する矩形です。
		 * @param {LPoint} destPoint ターゲットポイントです。新しいピクセルが配置される矩形領域の左上隅を表します。
		 * @since 1.9.4
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapData = new LBitmapData(event.target);
		 * 		bitmapData2 = new LBitmapData(null, 0, 0, 240, 240, LBitmapData.DATA_CANVAS);
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(0, 0, 240, 240), new LPoint(0,0));
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(50, 50, 100, 100), new LPoint(0,50));
		 * 		bitmapData2.copyPixels(bitmapData, new LRectangle(100, 50, 100, 100), new LPoint(50,150));
		 * 		
		 * 		var bitmap = new LBitmap(bitmapData);
		 * 		addChild(bitmap);
		 * 		
		 * 		var bitmap2 = new LBitmap(bitmapData2);
		 * 		bitmap2.y = 250;
		 * 		addChild(bitmap2);
		 * 	}
		 * @examplelink <p><a href="../../../api/LBitmapData/copyPixels.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		copyPixels : function (sourceBitmapData, sourceRect, destPoint) {
			var s = this, left, top, width, height, bd = sourceBitmapData;
			if (s.dataType != LBitmapData.DATA_CANVAS) {
				return;
			}
			left = bd.x;
			top = bd.y;
			width = bd.width;
			height = bd.height;
			bd.setProperties(sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height);
			s._context.drawImage(bd.image,
				bd.x,
				bd.y,
				bd.width,
				bd.height,
				destPoint.x,
				destPoint.y,
				bd.width,
				bd.height
			);
			bd.x = left;
			bd.y = top;
			bd.width = width;
			bd.height = height;
		}
	};
	for (var k in p) {
		LBitmapData.prototype[k] = p[k];
	}
	return LBitmapData;
})();