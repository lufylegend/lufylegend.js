/** @language chinese
 * LMatrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
 * @class LMatrix
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language english
 * The LMatrix class represents a transformation matrix that determines how to map points from one coordinate space to another. 
 * @class LMatrix
 * @constructor
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * LMatrix クラスは、2 つの座標空間の間におけるポイントのマッピング方法を決定する変換マトリックスを表します。
 * @class LMatrix
 * @constructor
 * @since 1.0.0
 * @public
 */
var LMatrix = (function () {
	function LMatrix (a, b, c, d, tx, ty, u, v, w) {
		var s = this;
		s.a = a || 1;
		s.b = b || 0;
		s.u = u || 0;
		s.c = c || 0;
		s.d = d || 1;
		s.v = v || 0;
		s.tx = tx || 0;
		s.ty = ty || 0;
		s.w = w || 1;
	}
	LMatrix.prototype = {
		setTo : function (a, b, c, d, tx, ty, u, v, w) {
			var s = this;
			s.a = a || s.a;
			s.b = b || s.b;
			s.u = u || s.u;
			s.c = c || s.c;
			s.d = d || s.d;
			s.v = v || s.v;
			s.tx = tx || s.tx;
			s.ty = ty || s.ty;
			s.w = w || s.w;
			return s;
		},
		isIdentity : function () {
			var s = this;
			return (s.a == 1 && s.b == 0 && s.c == 0 && s.d == 1 && s.tx == 0 && s.ty == 0 && u == 0 && v == 0 && w == 1);
		},
		transform : function (c) {
			var s = this;
			c.transform(s.a, s.b, s.c, s.d, s.tx, s.ty);
			return s;
		},
		toString : function () {
			return "[object LMatrix]";
		},
		identity : function () {
			this.setTo(1, 0, 0, 1, 0, 0, 0, 0, 1);
		},
		rotate : function (q) {
			var s = this,
			radian = q * Math.PI / 180,
	        cos = Math.cos(radian),
	        sin = Math.sin(radian),
	        mtx = new LMatrix(cos, sin, -sin, cos, 0, 0, 0, 0, 1);
	        s.add(mtx);
		},
		scale : function (sx, sy) {
			var s = this,
			mtx = new LMatrix(sx, 0, 0, sy, 0, 0, 0, 0, 1);
	        s.add(mtx);
		},
		translate : function (tx, ty) {
			var s = this,
			mtx = new LMatrix(1, 0, 0, 1, tx, ty, 0, 0, 1);
	        s.add(mtx);
		},
		skew : function (kx, ky) {
			mtx = new LMatrix(0, ky, kx, 0, 0, 0, 0, 0, 1);
	        s.add(mtx);
		},
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
		clone : function () {
			var s = this;
			return new LMatrix(s.a, s.b, s.c, s.d, s.tx, s.ty, s.u, s.v, s.w);
		}
	};
	return LMatrix;
})();