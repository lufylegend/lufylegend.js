/** @language chinese
 * 创建一个新的 LAnimation 实例。
 * LAnimation 类可以利用一组精灵图表来制作动画。
 * @class LAnimation
 * @extends LSprite
 * @constructor
 * @param {LSprite} layer 一个LSprite对象。
 * @param {LBitmapData | Array} data 一个LBitmapData对象，既包含一组或多组frame的精灵图表。或者是一个LBitmapData对象的数组。
 * @param {Array} list <p>每个frame的属性值。</p>
 * <p>每个数组元素格式为{x : 0, y : 0, width : 100, height : 100, sx : 0, sy : 0, dataIndex : 0}。 x, y, width, height分别对应LBitmapData对象的属性值，sx, sy是图像显示时的起始点坐标，当data是一个LBitmapData对象的数组的时候，dataIndex表示该数组的索引，用来指定使用哪个LBitmapData对象。</p>
 * <p>如果精灵图表中的每个frame大小都是一样的，你可以使用LGlobal.divideCoordinate函数来直接对图表进行分割。</p>
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
 * 		loader.load("player.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata(event){
 * 		var backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
 * 		var data = new LBitmapData(event.target,0,0,120,210);
 * 		player = new LAnimation(backLayer,data,list);
 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
 * 	}
 * 	function onframe(){
 * 		player.onframe();
 * 	}
 * @examplelink <p><a href="../../../api/LAnimation/index.html" target="_blank">测试链接</a></p>
 * @since 1.3.1
 * @public
 */
/** @language english
 * Creates a new LAnimation instance.
 * The LAnimation class can update the image to each frame of the animation.
 * @class LAnimation
 * @extends LSprite
 * @constructor
 * @param {LSprite} layer a LSprite object。
 * @param {LBitmapData} data a LBitmapData object(SpriteSheet).
 * @param {Array} list <p>A frame's Setting。</p>
 * <p>The Setting's format is like this : {x : 0, y : 0, width : 100, height : 100, sx : 0, sy : 0}。 ［x, y, width, height］ is the LBitmapData object's property，［sx, sy］is the start coordinate.</p>
 * <p>If the frames all of the same size, you can use LGlobal.divideCoordinate function to split the SpriteSheets.</p>
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
 * 		loader.load("player.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata(event){
 * 		var backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
 * 		var data = new LBitmapData(event.target,0,0,120,210);
 * 		player = new LAnimation(backLayer,data,list);
 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
 * 	}
 * 	function onframe(){
 * 		player.onframe();
 * 	}
 * @examplelink <p><a href="../../../api/LAnimation/index.html" target="_blank">Try it »</a></p>
 * @since 1.3.1
 * @public
 */
/** @language japanese
 * 新しい LAnimation インスタンスを作成します。
 * LAnimation クラスは、スプライトシートでアニメーションをつくる。。
 * @class LAnimation
 * @extends LSprite
 * @constructor
 * @param {LSprite} layer LSprite オブジェクト。
 * @param {LBitmapData} data LBitmapData オブジェクト（スプライトシート），アニメーションのひとコマひとコマをひとつにまとめた画像ファイルです。
 * @param {Array} list <p>frameごとの属性。</p>
 * <p>フォーマットは{x : 0, y : 0, width : 100, height : 100, sx : 0, sy : 0}の通りです。 x, y, width, heightはLBitmapData オブジェクトの各属性の値です，sx, syはひとコマのアニメーションを表示する時の座標です。</p>
 * <p>もしスプライトシートのframeの大きさが全部同じであれば、LGlobal.divideCoordinate関数を使って画像を分割することができます。</p>
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
 * 		loader.load("player.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata(event){
 * 		var backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
 * 		var data = new LBitmapData(event.target,0,0,120,210);
 * 		player = new LAnimation(backLayer,data,list);
 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
 * 	}
 * 	function onframe(){
 * 		player.onframe();
 * 	}
 * @examplelink <p><a href="../../../api/LAnimation/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.3.1
 * @public
 */
var LAnimation = (function() {
	function LAnimation(layer, data, list) {
		var s = this;
		LExtends(s, LSprite, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LAnimation
		 * @since 1.3.1
		 * @public
		 */
		/** @language english
		 * type of the object
		 * @property type
		 * @type String
		 * @default LAnimation
		 * @since 1.3.1
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのタイプ
		 * @property type
		 * @type String
		 * @default LAnimation
		 * @since 1.3.1
		 * @public
		 */
		s.type = "LAnimation";
		s.rowIndex = 0;
		s.colIndex = 0;
		s._ll_stepIndex = 0;
		s._ll_stepArray = [];
		s.mode = 1;
		s.isMirror = false;
		if (Array.isArray(data)) {
			s.bitmapList = data;
		} else {
			s.bitmapList = [data];
		}
		/** @language chinese
		 * 一个LBitmap对象，LAnimation对象用它来显示纹理图
		 * @property bitmap
		 * @type LBitmap
		 * @since 1.3.1
		 * @public
		 */
		/** @language english
		 * a LBitmap object
		 * @property bitmap
		 * @type LBitmap
		 * @since 1.3.1
		 * @public
		 */
		/** @language japanese
		 * LBitmapオブジェクト
		 * @property bitmap
		 * @type LBitmap
		 * @since 1.3.1
		 * @public
		 */
		s.bitmap = new LBitmap(s.bitmapList[0]);
		s.imageArray = list;
		s.addChild(s.bitmap);
		if (layer != null) {
			layer.addChild(s);
		}
		s.onframe();
		s.colIndex = 0;
	}

	var p = {
		/** @language chinese
		 * 设置播放的贞动画。
		 * @method setAction
		 * @param {int} rowIndex 播放动画的行号。
		 * @param {int} colIndex 播放动画的列号。
		 * @param {int} mode (1,0,-1)分别代表(正序播放,静止,倒序播放)。
		 * @param {Boolean} isMirror 是否使用镜像来水平翻转显示对象。
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	var player2;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		player2 = new LAnimation(backLayer,data.clone(),list);
		 * 		player.setAction(2,0,1,true);
		 * 		player2.setAction(2,0,1,false);
		 * 		player2.x = 150;
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 		player2.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/setAction.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Set the frame and show.
		 * @method setAction
		 * @param {int} rowIndex Row index.
		 * @param {int} colIndex Column index.
		 * @param {int} mode You can set the value like this. (1,0,-1)：(Promote positive sequence ,Stop, Promote reverse sequence).
		 * @param {Boolean} isMirror Flip Horizontal.
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	var player2;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		player2 = new LAnimation(backLayer,data.clone(),list);
		 * 		player.setAction(2,0,1,true);
		 * 		player2.setAction(2,0,1,false);
		 * 		player2.x = 150;
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 		player2.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/setAction.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 再生するフレームを設定します。
		 * @method setAction
		 * @param {int} rowIndex 行番号。
		 * @param {int} colIndex 列番号。
		 * @param {int} mode 下記の三つの値を設定することができます。(1,0,-1)：(正シーケンス進める,ストップ,逆シーケンス進める)。
		 * @param {Boolean} isMirror 水平方向に反転するかどうか。
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	var player2;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		player2 = new LAnimation(backLayer,data.clone(),list);
		 * 		player.setAction(2,0,1,true);
		 * 		player2.setAction(2,0,1,false);
		 * 		player2.x = 150;
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 		player2.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/setAction.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setAction : function(rowIndex, colIndex, mode, isMirror) {
			var s = this, changed = false;
			if (rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length) {
				s.rowIndex = rowIndex;
				changed = true;
			}
			if (colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length) {
				s.colIndex = colIndex;
				changed = true;
			}
			if (mode != null) {
				s.mode = mode;
				changed = true;
			}
			if (isMirror != null) {
				s.isMirror = isMirror;
				if (s.isMirror) {
					s.bitmap.x = s.bitmap.getWidth();
					s.bitmap.scaleX = -1 * Math.abs(s.bitmap.scaleX);
				} else {
					s.bitmap.x = 0;
					s.bitmap.scaleX = Math.abs(s.bitmap.scaleX);
				}
				changed = true;
			}
			if (changed) {
				s._ll_stepIndex = 0;
			}
		},
		/** @language chinese
		 * 获取当前播放的贞动画的属性。
		 * @method getAction
		 * @return {Array} 当前播放的贞动画的属性:[rowIndex,colIndex,mode,isMirror]([行号,列号,播放模式,是否为镜像])。
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 		var result = player.getAction();
		 * 		trace(result);
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/getAction.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the frame's property.
		 * @method getAction
		 * @return {Array} The frame's property:[rowIndex,colIndex,mode,isMirror]([Row index,Column index,mode,Flip Horizontal])。
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 		var result = player.getAction();
		 * 		trace(result);
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/getAction.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 今動いているフレームのプロパティを取得。
		 * @method getAction
		 * @return {Array} フレームのプロパティ:[rowIndex,colIndex,mode,isMirror]([行番号,列番号,(正|逆)モード,水平方向に反転するかどうか])。
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 		var result = player.getAction();
		 * 		trace(result);
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/getAction.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getAction : function() {
			var s = this;
			return [s.rowIndex, s.colIndex, s.mode, s.isMirror];
		},
		/** @language chinese
		 * 播放下一贞动画。
		 * @method onframe
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/onframe.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Show the next frame.
		 * @method onframe
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/onframe.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 次のフレームのアニメーションを表示します。
		 * @method onframe
		 * @since 1.3.1
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(){
		 * 		player.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/onframe.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		onframe : function() {
			var s = this, arr, sx = 0, stepFrame = null;
			if (s.colIndex >= s.imageArray[s.rowIndex].length) {
				s.colIndex = 0;
			}
			arr = s.imageArray[s.rowIndex][s.colIndex];
			if (s._ll_stepArray[s.rowIndex] && s._ll_stepArray[s.rowIndex][s.colIndex]) {
				stepFrame = s._ll_stepArray[s.rowIndex][s.colIndex];
			} else {
				stepFrame = 0;
			}
			if (s._ll_stepIndex == 0) {
				if ( typeof arr.dataIndex == "number" && Array.isArray(s.bitmapList) && arr.dataIndex < s.bitmapList.length) {
					s.bitmap.bitmapData = s.bitmapList[arr.dataIndex];
				}
				if (arr.script) {
					for(i = 0; i < arr.script.length; i++){
						obj = arr.script[i];
						l = s.ll_labelList[obj.name];
						console.log(arr.mode , arr.mode , l.isMirror, arr.mirror);
						if(l && l.rowIndex == s.rowIndex && l.colIndex == s.colIndex && arr.mode == arr.mode && l.isMirror == arr.mirror){
							obj.func(s, obj.params);
						}
					}
				}
				if ( typeof arr.width != UNDEFINED && typeof arr.height != UNDEFINED) {
					s.bitmap.bitmapData.setProperties(arr.x, arr.y, arr.width, arr.height);
				} else {
					s.bitmap.bitmapData.setCoordinate(arr.x, arr.y);
				}
				if ( typeof arr.sx != UNDEFINED) {
					sx = arr.sx;
				}
				if ( typeof arr.sy != UNDEFINED) {
					s.bitmap.y = arr.sy;
				}
				if ( typeof arr.mirror != UNDEFINED) {
					s.bitmap.rotateCenter = false;
					if (arr.mirror) {
						s.bitmap.scaleX = -1;
					} else {
						s.bitmap.scaleX = 1;
					}
				}
				s.bitmap.x = sx + (s.bitmap.scaleX == 1 ? 0 : s.bitmap.getWidth());
			}
			if (s._ll_stepIndex++ < stepFrame) {
				return;
			}
			s._ll_stepIndex = 0;
			s.colIndex += s.mode;
			if (s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0) {
				s.colIndex = s.mode > 0 ? 0 : s.imageArray[s.rowIndex].length - 1;
				s.dispatchEvent(LEvent.COMPLETE);
			}
		},
		/** @language chinese
		 * 返回一个LAnimation的克隆对象。
		 * @method clone
		 * @return {LAnimation} 一个新的 LAnimation 对象，它与原始对象相同.
		 * @since 1.8.8
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	var player2;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		player2 = player.clone();
		 * 		player2.setAction(2,0);
		 * 		player2.x = 150;
		 * 		backLayer.addChild(player2);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(event){
		 * 		player.onframe();
		 * 		player2.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/clone.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns a new LAnimation object that is a clone of the original instance with an exact copy of the object.
		 * @method clone
		 * @return {LAnimation} A new LAnimation object that is identical to the original.
		 * @since 1.8.8
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	var player2;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		player2 = player.clone();
		 * 		player2.setAction(2,0);
		 * 		player2.x = 150;
		 * 		backLayer.addChild(player2);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(event){
		 * 		player.onframe();
		 * 		player2.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/clone.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 新しい LAnimation オブジェクトとして、元のインスタンスのクローンを返します。オブジェクトはまったく同じコピーになります。
		 * @method clone
		 * @return {LAnimation} 元のオブジェクトと同一の新しい LAnimation オブジェクトです。
		 * @since 1.8.8
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	var player2;
		 * 	function main(){
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata);
		 * 		loader.load("player.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		player = new LAnimation(backLayer,data,list);
		 * 		player2 = player.clone();
		 * 		player2.setAction(2,0);
		 * 		player2.x = 150;
		 * 		backLayer.addChild(player2);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(event){
		 * 		player.onframe();
		 * 		player2.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimation/clone.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		clone : function() {
			var s = this, a = new LAnimation(null, s.bitmap.bitmapData, s.imageArray.slice(0));
			a.copyProperty(s);
			a.childList.length = 0;
			a.bitmap = s.bitmap.clone();
			a.addChild(a.bitmap);
			return a;
		}
	};
	for (var k in p) {
		LAnimation.prototype[k] = p[k];
	}
	return LAnimation;
})();
/** @language chinese
 * 一组动画播放完成事件。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 */
/** @language english
 * when the animation is on the last frame.
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 */
/** @language japanese
 * アニメーションは最後のフレームを実行する時。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 */
