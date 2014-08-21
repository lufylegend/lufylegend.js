/** @language chinese
 * 创建一个新点。LPoint 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
 * @class LPoint
 * @constructor
 * @param {float} x 水平坐标。
 * @param {float} y 垂直坐标。
 * @example
 * 	var myPoint = new LPoint(100,100);
 * @since 1.7.7
 * @public
 */
/** @language english
 * Creates a new point. The LPoint object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @class LPoint
 * @constructor
 * @param {float} x The horizontal coordinate.
 * @param {float} y The vertical coordinate.
 * @example
 * 	var myPoint = new LPoint(100,100);
 * @since 1.7.7
 * @public
 */
/** @language japanese
 * 新しいポイントを作成します。LPoint オブジェクトは 2 次元の座標系の位置を表します。x は水平方向の軸を表し、y は垂直方向の軸を表します。
 * @class LPoint
 * @constructor
 * @param {float} x 水平座標です。
 * @param {float} y 垂直座標です。
 * @example
 * 	var myPoint = new LPoint(100,100);
 * @since 1.7.7
 * @public
 */
var LPoint = (function () {
	function LPoint (x, y) {
		var s = this;
		/** @language chinese
		 * 该点的水平坐标。
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		/** @language english
		 * The horizontal coordinate of the point.
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		/** @language japanese
		 * ポイントの水平座標です。
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		s.x = x;
		/** @language chinese
		 * 该点的垂直坐标。
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		/** @language english
		 * The vertical coordinate of the point.
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		/** @language japanese
		 * ポイントの垂直座標です。
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		s.y = y;
	}
	/** @language chinese
	 * [静态]返回 p1 和 p2 之间的距离。
	 * @method distance
	 * @static
	 * @param {LPoint} p1 第一个点
	 * @param {LPoint} p2 第二个点。
	 * @return {float} 第一个点和第二个点之间的距离。
	 * @since 1.8.5
	 * @public
	 */
	/** @language english
	 * [static]Returns the distance between p1 and p2.
	 * @method distance
	 * @static
	 * @param {LPoint} p1 The first point.
	 * @param {LPoint} p2 The second point.
	 * @return {float} The distance between the first and second points.
	 * @since 1.8.5
	 * @public
	 */
	/** @language japanese
	 * [静的]p1 と p2 との距離を返します。
	 * @method distance
	 * @static
	 * @param {LPoint} p1 最初のポイントです。
	 * @param {LPoint} p2 2 番目のポイントです。
	 * @return {float} 最初のポイントと 2 番目のポイント間の距離です。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.distance = function (p1, p2) {
		return LPoint.distance2(p1.x, p1.y, p2.x, p2.y);
	};
	/** @language chinese
	 * [静态]返回 p1 和 p2 之间的距离。
	 * @method distance2
	 * @static
	 * @param {LPoint} x1 第一个点的水平坐标。
	 * @param {LPoint} y1 第一个点的垂直坐标。
	 * @param {LPoint} x2 第二个点的水平坐标。
	 * @param {LPoint} y2 第二个点的垂直坐标。
	 * @return {float} 第一个点和第二个点之间的距离。
	 * @since 1.8.5
	 * @public
	 */
	/** @language english
	 * [static]Returns the distance between p1 and p2.
	 * @method distance2
	 * @static
	 * @param {LPoint} x1 The horizontal coordinate of the first point.
	 * @param {LPoint} y1 The vertical coordinate of the first point.
	 * @param {LPoint} x2 2 The horizontal coordinate of the second point.
	 * @param {LPoint} y2 2 The vertical coordinate of the second point.
	 * @return {float} The distance between the first and second points.
	 * @since 1.8.5
	 * @public
	 */
	/** @language japanese
	 * [静的]p1 と p2 との距離を返します。
	 * @method distance2
	 * @static
	 * @param {LPoint} x1 最初のポイントの水平x座標です。
	 * @param {LPoint} y1 最初のポイントの水平y座標です。
	 * @param {LPoint} x2 2 番目のポイントの水平x座標です。
	 * @param {LPoint} y2 2 番目のポイントの水平y座標です。
	 * @return {float} 最初のポイントと 2 番目のポイント間の距離です。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.distance2 = function (x1, y1, x2, y2) {
		var x = x1 - x2, y = x1 - x2;
		return Math.sqrt(x * x + y * y);
	};
	/** @language chinese
	 * [静态]确定两个指定点之间的点。参数 f 确定新的内插点相对于参数 p1 和 p2 指定的两个端点所处的位置。参数 f 的值越接近 1.0，则内插点就越接近第一个点（参数 p1）。参数 f 的值越接近 0，则内插点就越接近第二个点（参数 p2）。
	 * @method interpolate
	 * @static
	 * @param {LPoint} p1 第一个点
	 * @param {LPoint} p2 第二个点。
	 * @param {float} f 两个点之间的内插级别。表示新点将位于 p1 和 p2 连成的直线上的什么位置。如果 f=1，则返回 p1；如果 f=0，则返回 p2。
	 * @return {LPoint} 新的内插点。
	 * @since 1.8.5
	 * @public
	 */
	/** @language english
	 * [static]Determines a point between two specified points. The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2. The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter p1). The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter p2).
	 * @method interpolate
	 * @static
	 * @param {LPoint} p1 The first point.
	 * @param {LPoint} p2 The second point.
	 * @param {float} f The level of interpolation between the two points. Indicates where the new point will be, along the line between p1 and p2. If f=1, p1 is returned; if f=0, p2 is returned.
	 * @return {LPoint} The new, interpolated point.
	 * @since 1.8.5
	 * @public
	 */
	/** @language japanese
	 * [静的]2 つの指定されたポイント間にあるポイントを判別します。パラメーター f はパラメーター pt1 および pt2 で指定された 2 つの端点に対する、新しい補間ポイントの場所を決定します。パラメーター f の値が 1.0 に近づくほど、補間ポイントは最初のポイント（パラメーター p1）に近づきます。パラメーター f の値が 0 に近づくほど、補間ポイントは 2 番目のポイント（パラメーター p2）に近づきます。
	 * @method interpolate
	 * @static
	 * @param {LPoint} p1 最初のポイントです。
	 * @param {LPoint} p2 2 番目のポイントです。
	 * @param {float} f 2 つのポイント間の補間のレベルです。p1 と p2 間の線に沿って新しいポイントがある位置を示します。f=1 の場合は p1 が返されます。f=0 の場合は p2 が返されます。
	 * @return {LPoint} 新しい補間ポイントです。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.interpolate = function (p1, p2, f) {
		return new LPoint(p1.x + (p2.x - p1.x) * (1 - f), p1.y + (p2.y - p1.y) * (1 - f));
	};
	/** @language chinese
	 * [静态]将一对极坐标转换为笛卡尔点坐标。
	 * @method polar
	 * @static
	 * @param {float} len 极坐标对的长度。
	 * @param {float} angle 极坐标对的角度（以弧度表示）。
	 * @return {LPoint} 笛卡尔点。
	 * @since 1.8.5
	 * @public
	 */
	/** @language english
	 * [static]Converts a pair of polar coordinates to a Cartesian point coordinate.
	 * @method polar
	 * @static
	 * @param {float} len The length coordinate of the polar pair.
	 * @param {float} angle The angle, in radians, of the polar pair.
	 * @return {LPoint} The Cartesian point.
	 * @since 1.8.5
	 * @public
	 */
	/** @language japanese
	 * [静的]極座標ペアを直交点座標に変換します。
	 * @method polar
	 * @static
	 * @param {float} len 極座標ペアの長さ座標です。
	 * @param {float} angle 極座標ペアの角度（ラジアン単位）です。
	 * @return {LPoint} 直交ポイントです。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.polar = function (l, a) {
		return new LPoint(l * Math.cos(a), l * Math.sin(a));
	};
	LPoint.prototype = {
		toString : function () {
			return '[object LPoint(' + this.x + ',' + this.y + ')]';
		},
		/** @language chinese
		 * 返回从 (0,0) 到此点的线段长度。
		 * @method length
		 * @return {float} 从 (0,0) 到此点的线段长度。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Returns the length of the line segment from (0,0) to this point.
		 * @method length
		 * @return {float} The length of the line segment from (0,0) to this point.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * (0,0) からこのポイントまでの線のセグメントの長さを戻す。
		 * @method length
		 * @return {float} (0,0) からこのポイントまでの線のセグメントの長さです。
		 * @since 1.8.5
		 * @public
		 */
		length : function () {
			return LPoint.distance2(this.x, this.y, 0, 0);
		},
		/** @language chinese
		 * 将另一个点的坐标添加到此点的坐标以创建一个新点。
		 * @method add
		 * @param {LPoint} v 要添加的点。
		 * @return {LPoint} 新点。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Adds the coordinates of another point to the coordinates of this point to create a new point.
		 * @method add
		 * @param {LPoint} v The point to be added.
		 * @return {LPoint} The new point.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * このポイントの座標に他のポイントの座標を加算して、新しいポイントを作成します。
		 * @method add
		 * @param {LPoint} v 追加するポイントです。
		 * @return {LPoint} 新しいポイントです。
		 * @since 1.8.5
		 * @public
		 */
		add : function (v) {
			return LPoint(this.x + v.x, this.y + v.y);
		},
		/** @language chinese
		 * 创建此 LPoint 对象的副本。
		 * @method clone
		 * @return {LPoint} 新的 LPoint 对象。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Creates a copy of this LPoint object.
		 * @method clone
		 * @return {LPoint} The new LPoint object.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * この LPoint オブジェクトのコピーを作成します。
		 * @method clone
		 * @return {LPoint} 新しい LPoint オブジェクトです。
		 * @since 1.8.5
		 * @public
		 */
		clone : function () {
			return new LPoint(this.x, this.y);
		},
		/** @language chinese
		 * 将 LPoint 的成员设置为指定值。
		 * @method setTo
		 * @param {float} x 要将 LPoint 设置为的x坐标值。
		 * @param {float} y 要将 LPoint 设置为的y坐标值。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Sets the members of LPoint to the specified values
		 * @method setTo
		 * @param {float} x the x values to set the point to.
		 * @param {float} y the y values to set the point to.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * LPoint のメンバーを指定の値に設定します。
		 * @method setTo
		 * @param {float} x ポイントに設定するx座標値です。
		 * @param {float} y ポイントに設定するy座標値です。
		 * @since 1.8.5
		 * @public
		 */
		setTo : function (x, y) {
			this.x = x, this.y = y;
		},
		/** @language chinese
		 * 将源 LPoint 对象中的所有点数据复制到调用方 LPoint 对象中。
		 * @method copyFrom
		 * @param {LPoint} sourcePoint 要从中复制数据的 Point 对象。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Copies all of the point data from the source LPoint object into the calling LPoint object.
		 * @method copyFrom
		 * @param {LPoint} sourcePoint The LPoint object from which to copy the data.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * すべてのポイントデータを、ソース LPoint オブジェクトから、呼び出し元の LPoint オブジェクトにコピーします。
		 * @method copyFrom
		 * @param {LPoint} sourcePoint データのコピー元となる LPoint オブジェクトです。
		 * @since 1.8.5
		 * @public
		 */
		copyFrom : function (s) {
			this.setTo(s.x, s.y);
		},
		/** @language chinese
		 * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
		 * @method equals
		 * @param {LPoint} toCompare 要比较的点。
		 * @return {Boolean} 如果该对象与此 LPoint 对象相同，则为 true 值，如果不相同，则为 false。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Determines whether two points are equal. Two points are equal if they have the same x and y values.
		 * @method equals
		 * @param {LPoint} The point to be compared.
		 * @return {Boolean}  A value of true if the object is equal to this Point object; false if it is not equal.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * 2 つのポイントが等しいかどうかを判別します。x 値と y 値が同じ場合、2 つのポイントは等しいことになります。
		 * @method equals
		 * @param {LPoint} toCompare 比較するポイントです。
		 * @return {Boolean} オブジェクトがこの LPoint オブジェクトと等しい場合は true を返します。等しくない場合は false を返します。
		 * @since 1.8.5
		 * @public
		 */
		equals : function (t) {
			return this.x == t.x && this.y == t.y;
		},
		/** @language chinese
		 * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
		 * @method normalize
		 * @param {float} thickness 缩放值。例如，如果当前点为 (0,5) 并且您将它规范化为 1，则返回的点位于 (0,1) 处。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Scales the line segment between (0,0) and the current point to a set length.
		 * @method normalize
		 * @param {float} thickness The scaling value. For example, if the current point is (0,5), and you normalize it to 1, the point returned is at (0,1).
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * (0,0) と現在のポイント間の線のセグメントを設定された長さに拡大 / 縮小します。
		 * @method normalize
		 * @param {float} thickness 拡大 / 縮小値です。例えば、現在のポイントが (0,5) で、1 に正規化すると、返されるポイントは (0,1) になります。
		 * @since 1.8.5
		 * @public
		 */
		normalize : function (t) {
			var s = this, scale = t / s.length();
			s.x *= scale, s.y *= scale;
		},
		/** @language chinese
		 * 按指定量偏移 LPoint 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
		 * @method offset
		 * @param {float} dx 水平坐标 x 的偏移量。
		 * @param {float} dy 垂直坐标 y 的偏移量。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Offsets the LPoint object by the specified amount. The value of dx is added to the original value of x to create the new x value. The value of dy is added to the original value of y to create the new y value.
		 * @method offset
		 * @param {float} dx The amount by which to offset the horizontal coordinate, x
		 * @param {float} dy The amount by which to offset the vertical coordinate, y.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * LPoint オブジェクトを指定された量だけオフセットします。dx の値を x の元の値に加算して、新しい x 値を作成します。dy の値を y の元の値に加算して、新しい y 値を作成します。
		 * @method offset
		 * @param {float} dx 水平座標 x をオフセットする量です。
		 * @param {float} dy 垂直座標 y をオフセットする量です。
		 * @since 1.8.5
		 * @public
		 */
		offset : function (dx, dy) {
			this.x += dx;
			this.y += dy;
		},
		/** @language chinese
		 * 从此点的坐标中减去另一个点的坐标以创建一个新点。
		 * @method subtract
		 * @param {LPoint} v 要减去的点。
		 * @return {LPoint} 新点。
		 * @since 1.8.5
		 * @public
		 */
		/** @language english
		 * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
		 * @method subtract
		 * @param {LPoint} v The point to be subtracted.
		 * @return {LPoint} The new point.
		 * @since 1.8.5
		 * @public
		 */
		/** @language japanese
		 * このポイントの座標から他のポイントの座標を減算して、新しいポイントを作成します。
		 * @method subtract
		 * @param {LPoint} v 減算するポイントです
		 * @return {LPoint} 新しいポイントです。
		 * @since 1.8.5
		 * @public
		 */
		subtract : function (v) {
			return new LPoint(this.x  - v.x, this.y - v.y);
		}
	};
	return LPoint;
})();