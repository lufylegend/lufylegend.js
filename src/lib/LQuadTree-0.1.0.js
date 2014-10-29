/** @language chinese
 * <p>四叉树类，可拥有高速检测矩形碰撞。下面两个demo可以说明LQuadTree的强大</p>
 * <p><a href="../../../api/LQuadTree/index.html" target="_blank">碰撞检测 一般方法</a></p>
 * <p><a href="../../../api/LQuadTree/index2.html" target="_blank">碰撞检测 四叉树方法</a></p>
 * @class LQuadTree
 * @extends LObject
 * @constructor
 * @param {LRectangle} rect 矩形区域，是一个LRectangle对象。
 * @since 1.4.1
 * @public
*/
var LQuadTree = (function() {
	function LQuadTree(rect) {
		var s = this;
		LExtends (s, LObject, []);
		s.q1 = null;
		s.q2 = null;
		s.q3 = null;
		s.q4 = null;
		s.parent = null;
		s.data = [];
		s.rect = rect;
		s.root = s;
	}
	LQuadTree.prototype = {
		/** @language chinese
		 * 矩形分割
		 * @method createChildren
		 * @param {int} deep 将检测的矩形区域分割的深度(次数)
		 * @public
		 * @since 1.4.1
		 */
		createChildren : function(deep) {
			if (deep == 0) {
				return;
			}
			var s = this;
			var hw = s.rect.width / 2, hh = s.rect.height / 2;
			s.q1 = new LQuadTree(new LRectangle(s.rect.x + hw, s.rect.y, hw, hh));
			s.q2 = new LQuadTree(new LRectangle(s.rect.x + hw, s.rect.y + hh, hw, hh));
			s.q3 = new LQuadTree(new LRectangle(s.rect.x, s.rect.y + hh, hw, hh));
			s.q4 = new LQuadTree(new LRectangle(s.rect.x, s.rect.y, hw, hh));
			s.q1.parent = s.q2.parent = s.q3.parent = s.q4.parent = s;
			s.q1.root = s.q2.root = s.q3.root = s.q4.root = s.root;
			s.q1.createChildren(deep - 1);
			s.q2.createChildren(deep - 1);
			s.q3.createChildren(deep - 1);
			s.q4.createChildren(deep - 1);
		},
		/** @language chinese
		 * 检测矩形区域内是否继续被分割
		 * @method hasChildren
		 * @return {Boolean} 如果被检测的矩形区域有被继续分割，则返回true，否则返回false。
		 * @public
		 * @since 1.4.1
		 */
		hasChildren : function() {
			var s = this;
			return s.q1 && s.q2 && s.q3 && s.q4;
		},
		/** @language chinese
		 * 将检测矩形区域清空
		 * @method clear
		 * @return {LQuadTree} 一个空的LQuadTree对象。
		 * @public
		 * @since 1.4.1
		 */
		clear : function() {
			var s = this;
			if (s.hasChildren()) {
				return s.q1.clear() || s.q2.clear() || s.q3.clear() || s.q4.clear();
			} else {
				s.q1 = null;
				s.q2 = null;
				s.q3 = null;
				s.q4 = null;
				s.parent = null;
				s.data = [];
				return s;
			}
		},
		/** @language chinese
		 * 将检测对象加入到LQuadTree对象内
		 * @method add
		 * @param {Object} value 检测对象
		 * @param {float} x 检测对象的x坐标
		 * @param {float} y 检测对象的y坐标
		 * @return {LQuadTree} 一个装有传入的检测对象的LQuadTree对象，如果传入坐标超出检测区域，则返回null。
		 * @public
		 * @since 1.4.1
		 */
		add : function(v, x, y) {
			var s = this;
			if (!s.isIn(x, y)) {
				return null;
			}

			if (s.hasChildren()) {
				return s.q1.add(v, x, y) || s.q2.add(v, x, y) || s.q3.add(v, x, y) || s.q4.add(v, x, y);
			} else {
				s.data.push(v);
				return s;
			}
		},
		/** @language chinese
		 * 将检测对象从LQuadTree对象内移除
		 * @method remove
		 * @param {Object} value 检测对象
		 * @param {float} x 检测对象的x坐标(可选)
		 * @param {float} y 检测对象的y坐标(可选)
		 * @return {LQuadTree} 一个装有传入的检测对象的LQuadTree对象，如果传入坐标超出检测区域，则返回null。
		 * @public
		 * @since 1.4.1
		 */
		remove : function(v, x, y) {
			var s = this;
			if (!s.isIn(x, y)) {
				return null;
			}

			if (s.hasChildren()) {
				return s.q1.remove(v, x, y) || s.q2.remove(v, x, y) || s.q3.remove(v, x, y) || s.q4.remove(v, x, y);
			} else {
				var index = s.data.indexOf(v);
				if (index != -1) {
					s.data.splice(index, 1);
					return s;
				} else {
					return null;
				}
			}
		},
		/** @language chinese
		 * 检测坐标是否在LQuadTree对象内
		 * @method isIn
		 * @param {float} x 检测的x坐标
		 * @param {float} y 检测的y坐标
		 * @return {Boolean} 检测结果。
		 * @public
		 * @since 1.4.1
		 */
		isIn : function(x, y) {
			var s = this;
			return ( typeof x == UNDEFINED || (x >= s.rect.x && x < s.rect.right)) && ( typeof y == UNDEFINED || (y >= s.rect.y && y < s.rect.bottom));
		},
		/** @language chinese
		 * 返回指定矩形区域内的所有对象
		 * @method getDataInRect
		 * @param {LRectangle} rect 指定矩形区域
		 * @return {Array} 获取到的对象数组。
		 * @public
		 * @since 1.4.1
		 */
		getDataInRect : function(rect) {
			var s = this;
			if (!s.rect.intersects(rect)) {
				return [];
			}

			var r = s.data.concat();
			if (s.hasChildren()) {
				r.push.apply(r, s.q1.getDataInRect(rect));
				r.push.apply(r, s.q2.getDataInRect(rect));
				r.push.apply(r, s.q3.getDataInRect(rect));
				r.push.apply(r, s.q4.getDataInRect(rect));
			}
			return r;
		}
	};
	return LQuadTree;
})();
