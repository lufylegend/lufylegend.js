import LGlobal from './LGlobal';
/** @language chinese
 * LObject 类位于 lufylegend.js 类层次结构的根处。
 * @class LObject
 * @constructor
 * @since 1.6.0
 * @public
 */
/** @language english
 * The LObject class is at the root of the lufylegend.js class hierarchy.
 * @class LObject
 * @constructor
 * @since 1.6.0
 * @public
 */
/** @language japanese
 * LObject クラスは、lufylegend.js クラス階層のルートにあります。
 * @class LObject
 * @constructor
 * @since 1.6.0
 * @public
 */
class LObject {
    constructor() {
		this.type = "LObject";
		/** @language chinese
		 * 对象的ID
		 * @property objectIndex
		 * @type int
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * ID of the object
		 * @property objectIndex
		 * @type int
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのID
		 * @property objectIndex
		 * @type int
		 * @since 1.6.0
		 * @public
		 */
		this.objectIndex = ++LGlobal.objectIndex;
		this.objectindex = this.objectIndex;
    }
    copyProperty(target) {
		for (let k in target) {
			if (typeof target[k] == "number" || typeof target[k] == "string" || typeof target[k] == "boolean") {
				if (k == "objectindex" || k == "objectIndex") {
					continue;
				}
				this[k] = target[k];
			} else if (Array.isArray(target[k])) {
				this[k] = target[k].slice();
			} 
		}
		if (target.mask) {
			this.mask = target.mask.clone();
		}
    }
    toString() {
		return "[object " + this.constructor.name + "]";
    }
}
export default LObject;