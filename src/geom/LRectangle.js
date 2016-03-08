/** @language chinese
 * <p>LRectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。</p>
 * <p>LRectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。</p>
 * @class LRectangle
 * @constructor
 * @param {float} x 矩形左上角的 x 坐标。
 * @param {float} y 矩形左上角的 y 坐标。
 * @param {float} width 矩形的宽度（以像素为单位）。
 * @param {float} height 矩形的高度（以像素为单位）。
 * @since 1.4.1
 * @public
 */
/** @language english
 * <p>A LRectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.</p>
 * <p>The x, y, width, and height properties of the LRectangle class are independent of each other; changing the value of one property has no effect on the others. However, the right and bottom properties are integrally related to those four properties. For example, if you change the value of the right property, the value of the width property changes; if you change the bottom property, the value of the height property changes.</p>
 * @class LRectangle
 * @constructor
 * @param {float} x The x coordinate of the top-left corner of the rectangle.
 * @param {float} y The y coordinate of the top-left corner of the rectangle.
 * @param {float} width The width of the rectangle, in pixels.
 * @param {float} height The height of the rectangle, in pixels.
 * @since 1.4.1
 * @public
 */
/** @language japanese
 * <p>LRectangle オブジェクトは、その位置（左上隅のポイント (x, y) で示される)、および幅と高さで定義される領域です。</p>
 * <p>LRectangle クラスの x、y、width、および height の各プロパティは、互いに独立しているため、あるプロパティの値を変更しても、他のプロパティに影響はありません。ただし、right プロパティと bottom プロパティはこれら 4 つのプロパティと不可分に関連しています。例えば、right プロパティの値を変更すると width プロパティの値も変更されます。bottom プロパティの値を変更すると、height プロパティの値も変更されます。</p>
 * @class LRectangle
 * @constructor
 * @param {float} x 矩形の左上隅の x 座標です。
 * @param {float} y 矩形の左上隅の y 座標です。
 * @param {float} width 矩形の幅（ピクセル単位）です。
 * @param {float} height 矩形の高さ（ピクセル単位）です。
 * @since 1.4.1
 * @public
 */
var LRectangle = (function () {
	function LRectangle (x, y, w, h) {
		var s = this;
		s.x = x;
		s.y = y;
		s.width = w;
		s.height = h;
		s.setRectangle();
	}
	LRectangle.prototype = {
		setRectangle : function () {
			var s = this;
			s.bottom = s.y + s.height;
			s.right = s.x + s.width;
			s.left = s.x;
			s.top = s.y;
		},
		/** @language chinese
		 * 返回一个新的 LRectangle 对象，其 x、y、width 和 height 属性的值与原始 LRectangle 对象的对应值相同。
		 * @method clone
		 * @return {LRectangle} 新的 LRectangle 对象，其 x、y、width 和 height 属性的值与原始 LRectangle 对象的对应值相同。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Returns a new LRectangle object with the same values for the x, y, width, and height properties as the original LRectangle object.
		 * @method clone
		 * @return {LRectangle} A new LRectangle object with the same values for the x, y, width, and height properties as the original LRectangle object.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * 元の LRectangle オブジェクトと x、y、width、および height の各プロパティの値が同じである、新しい LRectangle オブジェクトを返します。
		 * @method clone
		 * @return {LRectangle} 元の LRectangle オブジェクトと x、y、width、および height の各プロパティの値が同じである、新しい LRectangle オブジェクトです。
		 * @since 1.4.1
		 * @public
		 */
		clone : function () {
			var s = this;
			return new LRectangle(s.x, s.y, s.width, s.height);
		},
		/** @language chinese
		 * 确定由此 LRectangle 对象定义的矩形区域内是否包含指定的点。
		 * @method contains
		 * @param {float} x 点的 x 坐标（水平位置）。
		 * @param {float} y 点的 y 坐标（垂直位置）。
		 * @return {Boolean} 如果 LRectangle 对象包含指定的点，则值为 true；否则为 false。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Determines whether the specified point is contained within the rectangular region defined by this LRectangle object.
		 * @method contains
		 * @param {float} x The x coordinate (horizontal position) of the point.
		 * @param {float} y The y coordinate (vertical position) of the point.
		 * @return {Boolean} A value of true if the LRectangle object contains the specified point; otherwise false.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * 指定されたポイントがこの LRectangle オブジェクトで定義される矩形領域内にあるかどうかを判別します。
		 * @method contains
		 * @param {float} x ポイントの x 座標（水平位置）です。
		 * @param {float} y ポイントの y 座標（垂直位置）です。
		 * @return {Boolean} LRectangle オブジェクトに指定されたオブジェクトが含まれる場合は true を返します。含まれない場合は false を返します。
		 * @since 1.4.1
		 * @public
		 */
		contains : function (x, y) {
			var s = this;
			return x >= s.x && x <= s.right && y >= s.y && y <= s.bottom;
		},
		/** @language chinese
		 * 确定此 LRectangle 对象内是否包含由 rect 参数指定的 LRectangle 对象。如果一个 LRectangle 对象完全在另一个 LRectangle 的边界内，我们说第二个 LRectangle 包含第一个 LRectangle。
		 * @method containsRect
		 * @param {LRectangle} rect 所检查的 LRectangle 对象。
		 * @return {Boolean} 如果此 LRectangle 对象包含您指定的 LRectangle 对象，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Determines whether the LRectangle object specified by the rect parameter is contained within this LRectangle object. A LRectangle object is said to contain another if the second LRectangle object falls entirely within the boundaries of the first.
		 * @method containsRect
		 * @param {LRectangle} rect The LRectangle object being checked.
		 * @return {Boolean} A value of true if the LRectangle object that you specify is contained by this LRectangle object; otherwise false.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * rect パラメーターで指定された LRectangle オブジェクトがこの LRectangle オブジェクト内にあるかどうかを判別します。2 番目の LRectangle オブジェクトが最初の LRectangle オブジェクトの境界内に完全に収まる場合、最初の LRectangle オブジェクトは 2 番目の LRectangle オブジェクトを包含していると言います。
		 * @method containsRect
		 * @param {LRectangle} rect チェック対象の LRectangle オブジェクトです。
		 * @return {Boolean} 指定した LRectangle オブジェクトがこの LRectangle オブジェクトに含まれる場合は true を返します。含まれない場合は false を返します。
		 * @since 1.4.1
		 * @public
		 */
		containsRect : function (rect) {
			var s = this;
			return rect.x >= s.x && rect.right <= s.right && rect.y >= s.y && rect.bottom <= s.bottom;
		},
		/** @language chinese
		 * 确定在 toCompare 参数中指定的对象是否等于此 LRectangle 对象。此方法将某个对象的 x、y、width 和 height 属性与此 LRectangle 对象所对应的相同属性进行比较。
		 * @method equals
		 * @param {LRectangle} toCompare 要与此 LRectangle 对象进行比较的矩形。
		 * @return {Boolean} 如果对象具有与此 LRectangle 对象完全相同的 x、y、width 和 height 属性值，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Determines whether the LRectangle object specified by the rect parameter is contained within this LRectangle object. A LRectangle object is said to contain another if the second LRectangle object falls entirely within the boundaries of the first.
		 * @method equals
		 * @param {LRectangle} toCompare The LRectangle object being checked.
		 * @return {Boolean} A value of true if the LRectangle object that you specify is contained by this LRectangle object; otherwise false.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * rect パラメーターで指定された LRectangle オブジェクトがこの LRectangle オブジェクト内にあるかどうかを判別します。2 番目の LRectangle オブジェクトが最初の LRectangle オブジェクトの境界内に完全に収まる場合、最初の LRectangle オブジェクトは 2 番目の LRectangle オブジェクトを包含していると言います。
		 * @method equals
		 * @param {LRectangle} toCompare チェック対象の LRectangle オブジェクトです。
		 * @return {Boolean} 指定した LRectangle オブジェクトがこの LRectangle オブジェクトに含まれる場合は true を返します。含まれない場合は false を返します。
		 * @since 1.4.1
		 * @public
		 */
		equals : function (v) {
			var s = this;
			return v.x == s.x && v.width == s.width && v.y == s.y && v.height == s.height;
		},
		/** @language chinese
		 * 按指定量增加 LRectangle 对象的大小（以像素为单位）。保持 LRectangle 对象的中心点不变，使用 dx 值横向增加它的大小，使用 dy 值纵向增加它的大小。
		 * @method inflate
		 * @param {float} dx LRectangle 对象横向增加的值。
		 * @param {float} dy LRectangle 纵向增加的值。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Increases the size of the LRectangle object by the specified amounts, in pixels. The center point of the LRectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
		 * @method inflate
		 * @param {float} dx The value to be added to the left and the right of the LRectangle object.
		 * @param {float} dy The value to be added to the top and the bottom of the LRectangle object. 
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * LRectangle オブジェクトのサイズを、指定された量（ピクセル単位）だけ大きくします。LRectangle オブジェクトの中心点は変わりませんが、サイズは dx 値に応じて左右に大きくなり、dy 値に応じて上下に大きくなります。
		 * @method inflate
		 * @param {float} dx LRectangle オブジェクトの左右に加わる値です。
		 * @param {float} dy LRectangle オブジェクトの上下に加わる値です。
		 * @since 1.4.1
		 * @public
		 */
		inflate : function (dx, dy) {
			var s = this;
			s.width += dx;
			s.height += dy;
			s.setRectangle();
		},
		/** @language chinese
		 * 如果在 toIntersect 参数中指定的 LRectangle 对象与此 LRectangle 对象相交，则返回交集区域作为 LRectangle 对象。如果矩形不相交，则此方法返回一个空的 LRectangle 对象，其属性设置为 0。
		 * @method intersection
		 * @param {LRectangle} toIntersect 要对照比较以查看其是否与此 LRectangle 对象相交的 LRectangle 对象。
		 * @return {Boolean} 等于交集区域的 LRectangle 对象。如果该矩形不相交，则此方法返回一个空的 LRectangle 对象；即，其 x、y、width 和 height 属性均设置为 0 的矩形。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * If the LRectangle object specified in the toIntersect parameter intersects with this LRectangle object, returns the area of intersection as a LRectangle object. If the rectangles do not intersect, this method returns an empty LRectangle object with its properties set to 0.
		 * @method intersection
		 * @param {LRectangle} toIntersect The LRectangle object to compare against to see if it intersects with this LRectangle object.
		 * @return {Boolean} A LRectangle object that equals the area of intersection. If the rectangles do not intersect, this method returns an empty LRectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * toIntersect パラメーターで指定された LRectangle オブジェクトがこの LRectangle オブジェクトと交差する場合に、交差領域を LRectangle オブジェクトとして返します。矩形が交差しない場合、このメソッドは、プロパティが 0 に設定された空の LRectangle オブジェクトを返します。
		 * @method intersection
		 * @param {LRectangle} toIntersect この LRectangle オブジェクトと交差するかどうかを調べる対象の LRectangle オブジェクトです。
		 * @return {Boolean} 交差領域と等しい LRectangle オブジェクトです。矩形が交差しない場合、このメソッドは x、y、width、および height の各プロパティが 0 に設定された空の LRectangle オブジェクトを返します。
		 * @since 1.4.1
		 * @public
		 */
		intersection : function (t) {
			var s = this;
			var ix = s.x > t.x ? s.x : t.x;
			var iy = s.y > t.y ? s.y : t.y;
			var ax = s.right > t.right ? t.right : s.right;
			var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
			if (ix <= ax && iy <= ay) {
				return new LRectangle(ix, iy, ax, ay);
			}else{
				return new LRectangle(0, 0, 0, 0);
			}
		},
		/** @language chinese
		 * 确定在 toIntersect 参数中指定的对象是否与此 LRectangle 对象相交。此方法检查指定的 LRectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 LRectangle 对象相交。
		 * @method intersects
		 * @param {LRectangle} toIntersect 要与此 LRectangle 对象比较的 LRectangle 对象。
		 * @return {Boolean} 如果指定的对象与此 LRectangle 对象相交，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Determines whether the object specified in the toIntersect parameter intersects with this LRectangle object. This method checks the x, y, width, and height properties of the specified LRectangle object to see if it intersects with this LRectangle object.
		 * @method intersects
		 * @param {LRectangle} toIntersect The LRectangle object to compare against this LRectangle object.
		 * @return {Boolean} A value of true if the specified object intersects with this LRectangle object; otherwise false.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * toIntersect パラメーターで指定されたオブジェクトがこの LRectangle オブジェクトと交差するかどうかを判別します。このメソッドは、指定された LRectangle オブジェクトの x、y、width、および height の各プロパティをチェックして、この LRectangle オブジェクトと交差するかどうかを調べます。
		 * @method intersects
		 * @param {LRectangle} toIntersect この LRectangle オブジェクトと比較する LRectangle オブジェクトです。
		 * @return {Boolean} 指定されたオブジェクトがこの LRectangle オブジェクトと交差する場合は true を返します。交差しない場合は false を返します。
		 * @since 1.4.1
		 * @public
		 */
		intersects : function (t) {
			var s = this;
			var ix = s.x > t.x ? s.x : t.x;
			var iy = s.y > t.y ? s.y : t.y;
			var ax = s.right > t.right ? t.right : s.right;
			var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
			return ix <= ax && iy <= ay;
		},
		/** @language chinese
		 * 确定此 LRectangle 对象是否为空。
		 * @method isEmpty
		 * @return {Boolean} 如果 LRectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Determines whether or not this LRectangle object is empty.
		 * @method isEmpty
		 * @return {Boolean} A value of true if the LRectangle object's width or height is less than or equal to 0; otherwise false.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * この LRectangle オブジェクトが空かどうかを判別します。
		 * @method isEmpty
		 * @return {Boolean} LRectangle オブジェクトの幅と高さが 0 以下の場合は true を返します。それ以外の場合は false を返します。
		 * @since 1.4.1
		 * @public
		 */
		isEmpty : function () {
			var s = this;
			return s.x == 0 && s.y == 0 && s.width == 0 && s.height == 0;
		},
		/** @language chinese
		 * 按指定量调整 LRectangle 对象的位置（由其左上角确定）。
		 * @method offset
		 * @param {float} dx 将 LRectangle 对象的 x 值移动此数量。
		 * @param {float} dy 将 LRectangle 对象的 y 值移动此数量。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Adjusts the location of the LRectangle object, as determined by its top-left corner, by the specified amounts.
		 * @method offset
		 * @param {float} dx Moves the x value of the LRectangle object by this amount.
		 * @param {float} dy Moves the y value of the LRectangle object by this amount.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * LRectangle オブジェクトの位置（左上隅で決定される）を、指定された量だけ調整します。
		 * @method offset
		 * @param {float} dx LRectangle オブジェクトの x 値をこの量だけ移動します。
		 * @param {float} dy LRectangle オブジェクトの y 値をこの量だけ移動します。
		 * @since 1.4.1
		 * @public
		 */
		offset : function (dx, dy) {
			var s = this;
			s.x += dx;
			s.y += dy;
			s.setRectangle();
		},
		/** @language chinese
		 * 将 LRectangle 对象的所有属性设置为 0。如果 LRectangle 对象的宽度或高度小于或等于 0，则该对象为空。此方法将 x、y、width 和 height 属性设置为 0。
		 * @method setEmpty
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Sets all of the LRectangle object's properties to 0. A LRectangle object is empty if its width or height is less than or equal to 0. This method sets the values of the x, y, width, and height properties to 0.
		 * @method setEmpty
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * LRectangle オブジェクトのすべてのプロパティを 0 に設定します。その幅または高さが 0 以下の場合、LRectangle オブジェクトは空です。このメソッドは、x、y、width、および height の各プロパティの値を 0 に設定します。
		 * @method setEmpty
		 * @since 1.4.1
		 * @public
		 */
		setEmpty : function () {
			var s = this;
			s.x = 0;
			s.y = 0;
			s.width = 0;
			s.height = 0;
			s.setRectangle();
		},
		/** @language chinese
		 * 将 LRectangle 的成员设置为指定值。
		 * @method setTo
		 * @param {float} xa 要将 LRectangle 设置为的值。
		 * @param {float} ya 要将 LRectangle 设置为的值。
		 * @param {float} widtha 要将 LRectangle 设置为的值。
		 * @param {float} heighta 要将 LRectangle 设置为的值。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Sets the members of LRectangle to the specified values
		 * @method setTo
		 * @param {float} xa the values to set the rectangle to.
		 * @param {float} ya the values to set the rectangle to.
		 * @param {float} widtha the values to set the rectangle to.
		 * @param {float} heighta the values to set the rectangle to.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * LRectangle のメンバーを指定の値に設定します。
		 * @method setTo
		 * @param {float} xa 矩形に設定する値です。
		 * @param {float} ya 矩形に設定する値です。
		 * @param {float} widtha 矩形に設定する値です。
		 * @param {float} heighta 矩形に設定する値です。
		 * @since 1.4.1
		 * @public
		 */
		setTo : function (xa, ya, w, h) {
			var s = this;
			s.x = xa;
			s.y = ya;
			s.width = w;
			s.height = h;
			s.setRectangle();
		},
		toString : function () {
			var s = this;
			return "[object LRectangle(" + s.x + "," + s.y + "," + s.width + "," + s.height + ")]";
		},
		/** @language chinese
		 * 通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 LRectangle 对象。
		 * @method union
		 * @param {LRectangle} toUnion 要将 LRectangle 设置为的值。
		 * @return {LRectangle} 充当两个矩形的联合的新 LRectangle 对象。
		 * @since 1.4.1
		 * @public
		 */
		/** @language english
		 * Adds two rectangles together to create a new LRectangle object, by filling in the horizontal and vertical space between the two rectangles.
		 * @method union
		 * @param {LRectangle} toUnion A LRectangle object to add to this Rectangle object.
		 * @return {LRectangle}  A new LRectangle object that is the union of the two rectangles.
		 * @since 1.4.1
		 * @public
		 */
		/** @language japanese
		 * 2 つの矩形間の水平と垂直の空間を塗りつぶすことにより、2 つの矩形を加算して新しい LRectangle オブジェクトを作成します。
		 * @method union
		 * @param {LRectangle} toUnion この LRectangle オブジェクトに追加する LRectangle オブジェクトです。
		 * @return {LRectangle} 2 つの矩形の和集合である新しい LRectangle オブジェクトです。
		 * @since 1.4.1
		 * @public
		 */
		union : function (t) {
			var s = this;
			return new LRectangle(s.x > t.x ? t.x : s.x, s.y > t.y ? t.y : s.y, s.right > t.right ? s.right : t.right, s.bottom > t.bottom ? s.bottom : t.bottom);
		}
	};
	return LRectangle;
})();