/** @language chinese
 * <p>LDisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时中显示的所有对象。使用 LDisplayObjectContainer 类排列显示列表中的显示对象。LDisplayObjectContainer 对象可以有子显示对象，而其他显示对象（如 LShape 和 LTextField 对象）是“叶”节点，只有父级和同级，没有子级。</p>
 * <p>LDisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵）。</p>
 * <p>LDisplayObject 是一种抽象基类；因此，不能直接调用 LDisplayObject。</p>
 * <p>所有显示对象都继承自 LDisplayObject 类。</p>
 * @class LDisplayObject
 * @extends LEventDispatcher
 * @constructor
 * @since 1.6.0
 * @public
 */
/** @language english
 * <p>The LDisplayObject class is the base class for all objects that can be placed on the display list. The display list manages all objects displayed in the runtimes. Use the LDisplayObjectContainer class to arrange the display objects in the display list. LDisplayObjectContainer objects can have child display objects, while other display objects, such as LShape and LTextField objects, are "leaf" nodes that have only parents and siblings, no children.</p>
 * <p>The LDisplayObject class supports basic functionality like the x and y position of an object, as well as more advanced properties of the object such as its transformation matrix.</p>
 * <p>LDisplayObject is an abstract base class; therefore, you cannot call LDisplayObject directly. </p>
 * <p>All display objects inherit from the LDisplayObject class.</p>
 * @class LDisplayObject
 * @extends LEventDispatcher
 * @constructor
 * @since 1.6.0
 * @public
 */
/** @language japanese
 * <p>LDisplayObject クラスは、表示リストに含めることのできるすべてのオブジェクトに関する基本クラスです。表示リストでは、ランタイムに表示されるすべてのオブジェクトを管理します。LDisplayObjectContainer クラスは、表示リスト内で表示オブジェクトを配置するために使用します。LDisplayObjectContainer オブジェクトは子表示オブジェクトを持つことができます。これに対して、他の表示オブジェクト（例えば LShape、LTextField オブジェクト）は「リーフ」ノードです。つまり、親と兄弟だけを持ち、子はありません。</p>
 * <p>LDisplayObject クラスは、基本機能（例えばオブジェクトの x 方向および y 方向の位置）に加えて、オブジェクトの拡張プロパティ（例えば変換マトリックス）をサポートします。</p>
 * <p>LDisplayObject は抽象基本クラスであるため、LDisplayObject を直接呼び出すことはできません。</p>
 * <p>すべての表示オブジェクトは LDisplayObject クラスから継承します。</p>
 * @class LDisplayObject
 * @extends LEventDispatcher
 * @constructor
 * @since 1.6.0
 * @public
 */
var LDisplayObject = (function () {
	function LDisplayObject () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		/** @language chinese
		 * 表示 LDisplayObject 实例相对于父级 LDisplayObjectContainer 本地坐标的 x 坐标。如果该对象位于具有变形的 LDisplayObjectContainer 内，则它也位于包含 LDisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 LDisplayObjectContainer，该 LDisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。对象的坐标指的是注册点的位置。
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Indicates the x coordinate of the LDisplayObject instance relative to the local coordinates of the parent LDisplayObjectContainer. If the object is inside a LDisplayObjectContainer that has transformations, it is in the local coordinate system of the enclosing LDisplayObjectContainer. Thus, for a LDisplayObjectContainer rotated 90° counterclockwise, the LDisplayObjectContainer's children inherit a coordinate system that is rotated 90° counterclockwise. The object's coordinates refer to the registration point position.
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * 親 LDisplayObjectContainer のローカル座標を基準にした LDisplayObject インスタンスの x 座標を示します。変形されている LDisplayObjectContainer にオブジェクトが含まれる場合、そのオブジェクトの座標系は、それを囲む LDisplayObjectContainer のローカル座標系になります。したがって、反時計回りに 90 度回転した LDisplayObjectContainer の場合、その LDisplayObjectContainer の子は、反時計回りに 90 度回転した座標系を継承します。オブジェクトの座標は、基準点の位置を参照します。
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		s.x = 0;
		/** @language chinese
		 * 表示 LDisplayObject 实例相对于父级 LDisplayObjectContainer 本地坐标的 y 坐标。如果该对象位于具有变形的 LDisplayObjectContainer 内，则它也位于包含 LDisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 LDisplayObjectContainer，该 LDisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。对象的坐标指的是注册点的位置。
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Indicates the y coordinate of the LDisplayObject instance relative to the local coordinates of the parent LDisplayObjectContainer. If the object is inside a LDisplayObjectContainer that has transformations, it is in the local coordinate system of the enclosing LDisplayObjectContainer. Thus, for a LDisplayObjectContainer rotated 90° counterclockwise, the LDisplayObjectContainer's children inherit a coordinate system that is rotated 90° counterclockwise. The object's coordinates refer to the registration point position.
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * 親 LDisplayObjectContainer のローカル座標を基準にした LDisplayObject インスタンスの y 座標を示します。変形されている LDisplayObjectContainer にオブジェクトが含まれる場合、そのオブジェクトの座標系は、それを囲む LDisplayObjectContainer のローカル座標系になります。したがって、反時計回りに 90 度回転した LDisplayObjectContainer の場合、その LDisplayObjectContainer の子は、反時計回りに 90 度回転した座標系を継承します。オブジェクトの座標は、基準点の位置を参照します。
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		s.y = 0;
		s.width = 0;
		s.height = 0;
		/** @language chinese
		 * 表示从注册点开始应用的对象的水平缩放比例（百分比）。默认注册点为 (0,0)。1.0 等于 100% 缩放。
		 * @property scaleX
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Indicates the horizontal scale (percentage) of the object as applied from the registration point. The default registration point is (0,0). 1.0 equals 100% scale.
		 * @property scaleX
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * 基準点から適用されるオブジェクトの水平スケール（パーセンテージ）を示します。 デフォルトの基準点は (0,0) です。1.0 は縮尺 100% と同等です。
		 * @property scaleX
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		s.scaleX = 1;
		/** @language chinese
		 * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。默认注册点为 (0,0)。1.0 是 100% 缩放。
		 * @property scaleY
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object. The default registration point is (0,0). 1.0 is 100% scale.
		 * @property scaleY
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトの基準点から適用されるオブジェクトの垂直スケール（パーセンテージ）を示します。 デフォルトの基準点は (0,0) です。1.0 は縮尺 100% です。
		 * @property scaleY
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		s.scaleY = 1;
		/** @language chinese
		 * 表示指定对象的 Alpha 透明度值。有效值为 0（完全透明）到 1（完全不透明）。默认值为 1。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
		 * @property alpha
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent) to 1 (fully opaque). The default value is 1. Display objects with alpha set to 0 are active, even though they are invisible.
		 * @property alpha
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * 指定されたオブジェクトのアルファ透明度値を示します。有効な値は 0（完全な透明）～ 1（完全な不透明）です。デフォルト値は 1 です。alpha が 0 に設定されている表示オブジェクトは、表示されない場合でも、アクティブです。
		 * @property alpha
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		s.alpha = 1;
		/** @language chinese
		 * 显示对象是否可见。不可见的显示对象已被禁用。例如，如果 LInteractiveObject 实例的 visible=false，则无法单击该对象。
		 * @property visible
		 * @type Boolean
		 * @default true
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Whether or not the display object is visible. Display objects that are not visible are disabled. For example, if visible=false for an LInteractiveObject instance, it cannot be clicked.
		 * @property visible
		 * @type Boolean
		 * @default true
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * 表示オブジェクトが可視かどうかを示します。非可視の表示オブジェクトは無効になります。例えば、ある LInteractiveObject インスタンスが visible=false に設定されている場合、これをクリックすることはできません。
		 * @property visible
		 * @type Boolean
		 * @default true
		 * @since 1.6.0
		 * @public
		 */
		s.visible = true;
		/** @language chinese
		 * 表示 LDisplayObject 实例距其原始方向的旋转程度，以度为单位。从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或减去 360 获得该范围内的值。例如，my_video.rotate = 450语句与 my_video.rotate = 90 是相同的。
		 * @property rotate
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * Indicates the rotation of the LDisplayObject instance, in degrees, from its original orientation. Values from 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation. Values outside this range are added to or subtracted from 360 to obtain a value within the range. For example, the statement my_video.rotate = 450 is the same as my_video.rotate = 90.
		 * @property rotate
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * LDisplayObject インスタンスの元の位置からの回転角を度単位で示します。時計回りに回転させる場合は 0 ～ 180 の値を指定します。反時計回りに回転させる場合は 0 ～ -180 の値を指定します。この範囲を超える値は、360 を加算または減算して、範囲内に収まる値になるように調整されます。例えば、my_video.rotate = 450 というステートメントは my_video.rotate = 90 と同義です。
		 * @property rotate
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		s.rotate = 0;
		/** @language chinese
		 * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。
		 * @property mask
		 * @type LDisplayObject
		 * @default null
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * The calling display object is masked by the specified mask object. To ensure that masking works when the Stage is scaled, the mask display object must be in an active part of the display list. The mask object itself is not drawn. Set mask to null to remove the mask.
		 * @property mask
		 * @type LDisplayObject
		 * @default null
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * 呼び出し元の表示オブジェクトは、指定された mask オブジェクトによってマスクされます。ステージの拡大および縮小時にマスクが確実に機能するためには、表示リストのアクティブな部分に mask 表示オブジェクトが含まれている必要があります。mask オブジェクト自体は描画されません。マスクを除去するには mask を null に設定します。
		 * @property mask
		 * @type LDisplayObject
		 * @default null
		 * @since 1.6.0
		 * @public
		 */
		s.mask = null;
		/** @language chinese
		 * LBlendMode 类中的一个值，用于指定要使用的混合模式。 内部绘制位图的方法有两种。 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。 如果尝试将此属性设置为无效值，运行时会将此值设置为 LBlendMode.NORMAL。
		 * @property blendMode
		 * @type String
		 * @default null
		 * @since 1.8.0
		 * @public
		 */
		/** @language english
		 * A value from the LBlendMode class that specifies which blend mode to use. A bitmap can be drawn internally in two ways. If you have a blend mode enabled or an external clipping mask, the bitmap is drawn by adding a bitmap-filled square shape to the vector render. If you attempt to set this property to an invalid value, runtimes set the value to LBlendMode.NORMAL.
		 * @property blendMode
		 * @type String
		 * @default null
		 * @since 1.8.0
		 * @public
		 */
		/** @language japanese
		 * 使用するブレンドモードを指定する LBlendMode クラスの値です。内部的には、2 つの方法でビットマップを描画できます。ブレンドモードを有効にした場合、または外部クリッピングマスクを使用する場合には、ビットマップで塗りつぶされた四角形シェイプをベクターレンダーに追加することによってビットマップが描画されます。このプロパティを無効な値に設定しようとすると、ランタイムは値を LBlendMode.NORMAL に設定します。
		 * @property blendMode
		 * @type String
		 * @default null
		 * @since 1.8.0
		 * @public
		 */
		s.blendMode = null;
		/** @language chinese
		 * 包含当前与显示对象关联的每个滤镜对象的索引数组。
		 * @property filters
		 * @type Array
		 * @default null
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * An indexed array that contains each filter object currently associated with the display object. 
		 * @property filters
		 * @type Array
		 * @default null
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * 表示オブジェクトに現在関連付けられている各フィルターオブジェクトが格納されているインデックス付きの配列です。
		 * @property filters
		 * @type Array
		 * @default null
		 * @since 1.6.0
		 * @public
		 */
		s.filters = null;
	}
	var p = {
		_createCanvas:function(){
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		ll_show : function () {
			var s = this, c = LGlobal.canvas;
			if (!s._canShow()) {
				return;
			}
			if (typeof s._ll_loopframe == "function") {
				s._ll_loopframe();
			}
			c.save();
			s._showReady(c);
			if (s.blendMode) {
				c.globalCompositeOperation = s.blendMode;
			}
			if (s.filters) {
				s._ll_setShadow();
			}
			s._rotateReady();
			if (s.mask != null && s.mask.ll_show) {
				s.mask.ll_show();
				c.clip();
			}
			s._transformRotate();
			s._transformScale();
			s._coordinate(c);
			if (s.alpha < 1) {
				c.globalAlpha = s.alpha;
			}
			s._ll_show(c);
			c.restore();
		},
		_canShow : function () {
			return this.visible;
		},
		_coordinate : function (c) {
			var s = this;
			if (s.x != 0 || s.y != 0) {
				c.transform(1, 0, 0, 1, s.x, s.y);
			}
		},
		_rotateReady : function () {},
		_showReady : function (c) {},
		_ll_show : function (c) {},
		_ll_setShadow : function () {
			var s = this, f = s.filters, i, l;
			if (!f) {
				return;
			}
			for (i = 0, l = f.length; i < l; i++) {
				f[i].ll_show();
			}
		},
		_transformRotate : function () {
			var s = this, c;
			if (s.rotate == 0) {
				return;
			}
			c = LGlobal.canvas, rotateFlag = Math.PI / 180, rotateObj = new LMatrix();
			if ((typeof s.rotatex) == UNDEFINED) {
				s.rotatex = 0;
				s.rotatey = 0;
			}
			if (s.box2dBody) {
				rotateFlag = 1;
			}
			rotateObj.a = Math.cos(s.rotate * rotateFlag);
			rotateObj.b = Math.sin(s.rotate * rotateFlag);
			rotateObj.c = -rotateObj.b;
			rotateObj.d = rotateObj.a;
			rotateObj.tx = s.x + s.rotatex;
			rotateObj.ty = s.y + s.rotatey;
			rotateObj.transform(c).setTo(1, 0, 0, 1, -rotateObj.tx, -rotateObj.ty).transform(c);
		},
		_transformScale : function () {
			var s = this,c = LGlobal.canvas, scaleObj;
			if (s.scaleX == 1 && s.scaleY == 1) {
				return;
			}
			scaleObj = new LMatrix();
			if (s.scaleX != 1) {
				scaleObj.tx = s.x;
			}
			if (s.scaleY != 1) {
				scaleObj.ty = s.y;
			}
			scaleObj.a = s.scaleX;
			scaleObj.d = s.scaleY;
			scaleObj.transform(c).setTo(1, 0, 0, 1, -scaleObj.tx, -scaleObj.ty).transform(c);
		},
		copyProperty : function (a) {
			var s = this, k;
			for (k in a) {
				if (typeof a[k] == "number" || typeof a[k] == "string" || typeof a[k] == "boolean") {
					if (k == "objectindex" || k == "objectIndex") {
						continue;
					}
					s[k] = a[k];
				} else if (Array.isArray(a[k])) {
					s[k] = a[k].slice();
				} 
			}
			if (a.mask) {
				s.mask = a.mask.clone();
			}
		},
		getAbsoluteScale : function () {
			var s = this, sX, sY, p;
			sX = s.scaleX;
			sY = s.scaleY;
			p = s.parent;
			while (p != "root") {
				sX *= p.scaleX;
				sY *= p.scaleY;
				p = p.parent;
			}
			return {scaleX : sX, scaleY : sY};
		},
		/** @language chinese
		 * 得到一个可显示对象相对于canvas标签左上点的坐标。
		 * @method getRootCoordinate
		 * @return {LPoint} 一个LPoint对象。
		 * @since 1.7.7
		 * @public
		 */
		/** @language english
		 * Get the coordinates (Relative to the canvas).
		 * @method getRootCoordinate
		 * @return {LPoint} a LPoint object。
		 * @since 1.7.7
		 * @public
		 */
		/** @language japanese
		 * canvasの左上からの座標を取得する。
		 * @method getRootCoordinate
		 * @return {LPoint} LPointプロジェクット。
		 * @since 1.7.7
		 * @public
		 */
		getRootCoordinate : function () {
			var s = this, sx, sy, p;
			sx=s.x;
			sy=s.y;
			p = s.parent;
			while (p != "root") {
				sx *= p.scaleX;
				sy *= p.scaleY;
				sx += p.x;
				sy += p.y;
				p = p.parent;
			}
			return new LPoint(sx,sy);
		},
		/** @language chinese
		 * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
		 * @method getBounds
		 * @param {LDisplayObject} targetCoordinateSpace 定义要使用的坐标系的显示对象。
		 * @return {LRectangle} 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
		 * @since 1.7.7
		 * @public
		 */
		/** @language english
		 * Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
		 * @method getBounds
		 * @param {LDisplayObject} targetCoordinateSpace The display object that defines the coordinate system to use.
		 * @return {LRectangle} The rectangle that defines the area of the display object relative to the targetCoordinateSpace object's coordinate system.
		 * @since 1.7.7
		 * @public
		 */
		/** @language japanese
		 * targetCoordinateSpace オブジェクトの座標系を基準にして、表示オブジェクトの領域を定義する矩形を返します。
		 * @method getBounds
		 * @param {LDisplayObject} targetCoordinateSpace 使用する座標系を定義する表示オブジェクトです。
		 * @return {LRectangle} targetCoordinateSpace オブジェクトの座標系を基準とする、表示オブジェクトの領域を定義する矩形です。
		 * @since 1.7.7
		 * @public
		 */
		getBounds : function (d) {
			if (typeof d == UNDEFINED) {
				return new LRectangle(0, 0, 0, 0);
			}
			var s = this, x = 0, y = 0, w = 0, h = 0, sp, dp;
			if (s.objectIndex != d.objectIndex) {
				sp = s.getRootCoordinate();
				dp = d.getRootCoordinate();
				x = sp.x - dp.x;
				y = sp.y - dp.y;
			}
			if (d.getWidth) {
				w = d.getWidth();
			}
			if (d.getHeight) {
				h = d.getHeight();
			}
			return new LRectangle(x, y, w, h);
		},
		getDataCanvas : function () {
			var s = this, _o, o, _c, c;
			s._createCanvas();
			o = LGlobal.canvasObj;
			c = LGlobal.canvas;
			_o = s._canvas;
			_c = s._context;
			s.width = s.getWidth();
			s.height = s.getHeight();
			_o.width = s.width;
			_o.height = s.height;
			_c.clearRect(0, 0, s.width, s.height);
			LGlobal.canvasObj = s._canvas;
			LGlobal.canvas = s._context;
			s.ll_show();
			s._canvas = _o;
			s._context = _c;
			LGlobal.canvasObj = o;
			LGlobal.canvas = c;
			return s._canvas;
		},
		/** @language chinese
		 * 将该对象转换成base64编码的image字符串。
		 * @method getDataURL
		 * @return {Base64 Image} base64编码的image字符串。
		 * @since 1.7.7
		 * @public
		 */
		/** @language english
		 * Get a string of base64-encoded image.
		 * @method getDataURL
		 * @return {Base64 Image} a string of base64-encoded image.
		 * @since 1.7.7
		 * @public
		 */
		/** @language japanese
		 * base64でエンコードされた画像の文字列を取得する。
		 * @method getDataURL
		 * @return {Base64 Image} base64でエンコードされた画像の文字列。
		 * @since 1.7.7
		 * @public
		 */
		getDataURL : function () {
			var s = this, r = s.getDataCanvas();
			return r.toDataURL();
		},
		ismouseonShapes : function (shapes, mx, my) {
			var s = this, parent = s, m, child, j, v, arg;
			if (typeof shapes == UNDEFINED) {
				shapes = s.shapes;
			}
			m = s.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				arg = child.arg;
				v = s._changeShape(child.type, arg, m);
				if (child.type == LShape.VERTICES) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.RECT) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.ARC) {
					if ((v[0] - mx) * (v[0] - mx) + (v[1] - my) * (v[1] - my) < v[3]) {
						return true;
					}
				}
			}
			return false;
		},
		_changeShape : function (type, arg, m) {
			var v, arg = arg, r2, i, l, v1, v2;
			if (type == LShape.VERTICES) {
				v = [];
				for (i = 0, l = arg.length; i < l; i++) {
					v[i] = m.toArray([arg[i][0], arg[i][1], 1]);
				}
			} else if (type == LShape.RECT) {
				v = [[arg[0], arg[1]], [arg[0] + arg[2], arg[1]], [arg[0] + arg[2], arg[1] + arg[3]], [arg[0], arg[1] + arg[3]]];
				for (i = 0, l = v.length; i < l; i++) {
					v[i] = m.toArray([v[i][0], v[i][1],1]);
				}
			} else if (type == LShape.ARC) {
				v1 = m.toArray([arg[0], arg[1], 1]);
				v2 = m.toArray([arg[0] + arg[2], arg[1], 1]);
				r2 = (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
				v = [v1[0], v1[1], Math.sqrt(r2), r2];
			}
			return v;
		},
		getRootMatrix : function () {
			var parent = this, m = new LMatrix();
			while (parent && parent != "root") {
				if (parent.scaleX != 1 || parent.scaleY != 1) {
					m.scale(parent.scaleX, parent.scaleY);
				}
				if (parent.rotate != 0) {
					m.rotate(parent.rotate);
				}
				if (parent.x != 0 || parent.y != 0) {
					m.translate(parent.x, parent.y);
				}
				parent = parent.parent;
			}
			return m;
		},
		/** @language chinese
		 * 将对象自己从父容器中移除。
		 * @method remove
		 * @since 1.7.7
		 * @public
		 */
		/** @language english
		 * Remove self from the parent container.
		 * @method remove
		 * @since 1.7.7
		 * @public
		 */
		/** @language japanese
		 * オブジェクト自体は、親コンテナから除去される。
		 * @method remove
		 * @since 1.7.7
		 * @public
		 */
		remove : function () {
			var s = this, p = s.parent;
			if (!p || p == "root") {
				return;
			}
			p.removeChild(s);
		}
	};
	for (var k in p) {
		LDisplayObject.prototype[k] = p[k];
	}
	return LDisplayObject;
})();