/** @language chinese
 * LMatrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
 * @class LMatrix
 * @constructor
 * @since 1.8.0
 * @public
 */
/** @language english
 * The LMatrix class represents a transformation matrix that determines how to map points from one coordinate space to another. 
 * @class LMatrix
 * @constructor
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * LMatrix クラスは、2 つの座標空間の間におけるポイントのマッピング方法を決定する変換マトリックスを表します。
 * @class LMatrix
 * @constructor
 * @since 1.8.0
 * @public
 */
var LMatrix = (function () {
	function LMatrix (a, b, c, d, tx, ty, u, v, w) {
		var s = this;
		LExtends (s, LObject, []);
		s.a = 1;
		s.b = 0;
		s.u = 0;
		s.c = 0;
		s.d = 1;
		s.v = 0;
		s.tx = 0;
		s.ty = 0;
		s.w = 1;
		if (typeof a != UNDEFINED) {
			s.a = a;
		}
		if (typeof b != UNDEFINED) {
			s.b = b;
		}
		if (typeof c != UNDEFINED) {
			s.c = c;
		}
		if (typeof d != UNDEFINED) {
			s.d = d;
		}
		if (typeof tx != UNDEFINED) {
			s.tx = tx;
		}
		if (typeof ty != UNDEFINED) {
			s.ty = ty;
		}
		if (typeof u != UNDEFINED) {
			s.u = u;
		}
		if (typeof v != UNDEFINED) {
			s.v = v;
		}
		if (typeof w != UNDEFINED) {
			s.w = w;
		}
	}
	var p = {
		setTo : function (a, b, c, d, tx, ty, u, v, w) {
			var s = this;
			if (typeof a != UNDEFINED) {
				s.a = a;
			}
			if (typeof b != UNDEFINED) {
				s.b = b;
			}
			if (typeof c != UNDEFINED) {
				s.c = c;
			}
			if (typeof d != UNDEFINED) {
				s.d = d;
			}
			if (typeof tx != UNDEFINED) {
				s.tx = tx;
			}
			if (typeof ty != UNDEFINED) {
				s.ty = ty;
			}
			if (typeof u != UNDEFINED) {
				s.u = u;
			}
			if (typeof v != UNDEFINED) {
				s.v = v;
			}
			if (typeof w != UNDEFINED) {
				s.w = w;
			}
			return s;
		},
		/** @language chinese
		 * 检验矩阵是否是空，即不发生变换。
		 * @method isIdentity
		 * @return {Boolean} 返回矩阵是否是空。
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method isIdentity
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method isIdentity
		 * @since 1.9.8
		 * @public
		 */
		isIdentity : function () {
			var s = this;
			return (s.a === 1 && s.b === 0 && s.c === 0 && s.d === 1 && s.tx === 0 && s.ty === 0 && s.u === 0 && s.v === 0 && s.w === 1);
		},
		transform : function (c) {
			var s = this;
			c.transform(s.a, s.b, s.c, s.d, s.tx, s.ty);
			return s;
		},
		/** @language chinese
		 * 为每个矩阵属性设置一个值，该值将导致 null 转换。
		 * @method identity
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method identity
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method identity
		 * @since 1.9.8
		 * @public
		 */
		identity : function () {
			this.setTo(1, 0, 0, 1, 0, 0, 0, 0, 1);
		},
		/** @language chinese
		 * 对 LMatrix 对象应用旋转转换。
		 * @method rotate
		 * @param {float} angle 旋转角度。
		 * @return {LMatrix} 矩阵本身。
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method rotate
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method rotate
		 * @since 1.9.8
		 * @public
		 */
		rotate : function (q) {
			var s = this,
			radian = q * Math.PI / 180,
			cos = Math.cos(radian),
			sin = Math.sin(radian),
			mtx = new LMatrix(cos, sin, -sin, cos, 0, 0, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		/** @language chinese
		 * 对 LMatrix 对矩阵应用缩放转换。
		 * @method scale
		 * @param {float} sx 用于沿 x 轴缩放对象的乘数。
		 * @param {float} sy 用于沿 y 轴缩放对象的乘数。
		 * @return {LMatrix} 矩阵本身。
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method scale
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method scale
		 * @since 1.9.8
		 * @public
		 */
		scale : function (sx, sy) {
			var s = this,
			mtx = new LMatrix(sx, 0, 0, sy, 0, 0, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		/** @language chinese
		 * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
		 * @method translate
		 * @param {float} dx 沿 x 轴向右移动的量（以像素为单位）。
		 * @param {float} dy 沿 y 轴向下移动的量（以像素为单位）。
		 * @return {LMatrix} 矩阵本身。
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method translate
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method translate
		 * @since 1.9.8
		 * @public
		 */
		translate : function (tx, ty) {
			var s = this,
			mtx = new LMatrix(1, 0, 0, 1, tx, ty, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		/** @language chinese
		 * 沿 x 和 y 轴倾斜。
		 * @method skew
		 * @param {float} kx 沿 x 轴倾斜的量。
		 * @param {float} ky 沿 y 轴倾斜的量。
		 * @return {LMatrix} 矩阵本身。
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method skew
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method skew
		 * @since 1.9.8
		 * @public
		 */
		skew : function (kx, ky) {
			var s = this,
			mtx = new LMatrix(1, ky, kx, 1, 0, 0, 0, 0, 1);
			s.add(mtx);
			return s;
		},
		/** @language chinese
		 * 与另一个矩阵相加。
		 * @method add
		 * @param {LMatrix} matrix 一个LMatrix对象。
		 * @return {LMatrix} 矩阵本身。
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method add
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method add
		 * @since 1.9.8
		 * @public
		 */
		add : function (mtx) {
			var s = this, a, b, c, d, tx, ty, u, v, w;
			a = s.a * mtx.a + s.b * mtx.c + s.u * mtx.tx;
			b = s.a * mtx.b + s.b * mtx.d + s.u * mtx.ty;
			u = s.a * mtx.u + s.b * mtx.v + s.u * mtx.w;
			c = s.c * mtx.a + s.d * mtx.c + s.v * mtx.tx;
			d = s.c * mtx.b + s.d * mtx.d + s.v * mtx.ty;
			v = s.c * mtx.u + s.d * mtx.v + s.v * mtx.w;
			tx = s.tx * mtx.a + s.ty * mtx.c + s.w * mtx.tx;
			ty = s.tx * mtx.b + s.ty * mtx.d + s.w * mtx.ty;
			w = s.tx * mtx.u + s.ty * mtx.v + s.w * mtx.w;
			s.setTo(a, b, c, d, tx, ty, u, v, w);
		},
		toArray : function (mtx) {
			var s = this;
			if (Array.isArray(mtx) && mtx.length == 3) {
				var m = mtx[0] * s.a + mtx[1] * s.c + mtx[2] * s.tx,
				n = mtx[0] * s.b + mtx[1] * s.d + mtx[2] * s.ty,
				k = mtx[0] * s.u + mtx[1] * s.v + mtx[2] * s.w;
				return [m, n, k];
			} else {
				var a = s.a * mtx.a + s.b * mtx.c + s.u * mtx.tx,
				b = s.a * mtx.b + s.b * mtx.d + s.u * mtx.ty,
				u = s.a * mtx.u + s.b * mtx.v + s.u * mtx.w,
				c = s.c * mtx.a + s.d * mtx.c + s.v * mtx.tx,
				d = s.c * mtx.b + s.d * mtx.d + s.v * mtx.ty,
				v = s.c * mtx.u + s.d * mtx.v + s.v * mtx.w,
				tx = s.tx * mtx.a + s.ty * mtx.c + s.w * mtx.tx,
				ty = s.tx * mtx.b + s.ty * mtx.d + s.w * mtx.ty,
				w = s.tx * mtx.u + s.ty * mtx.v + s.w * mtx.w;
				return [a, b, c, d, tx, ty, u, v, w];
			}
		},
		/** @language chinese
		 * 对象复制。
		 * @method clone
		 * @return {LMatrix} 一个LMatrix对象。
		 * @since 1.9.8
		 * @public
		 */
		/** @language english
		 * ......
		 * @method clone
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @method clone
		 * @since 1.9.8
		 * @public
		 */
		clone : function () {
			var s = this;
			return new LMatrix(s.a, s.b, s.c, s.d, s.tx, s.ty, s.u, s.v, s.w);
		}
	};
	for (var k in p) {
		LMatrix.prototype[k] = p[k];
	}
	return LMatrix;
})();